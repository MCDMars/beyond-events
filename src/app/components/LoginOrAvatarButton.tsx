"use client";

import { useEffect, useRef, useState } from "react";
import { useMsal } from "@azure/msal-react";
import * as microsoftTeams from "@microsoft/teams-js";

const GRAPH_SCOPES = ["User.Read"];
const API_SCOPE = `api://${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}/access_as_user`;

export default function LoginOrAvatar() {
  const { instance } = useMsal();
  const [inTeams, setInTeams] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    microsoftTeams.app
      .initialize()
      .then(() => setInTeams(true))
      .catch(() => {});
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (!inTeams) {
      const account =
        instance.getActiveAccount() ?? instance.getAllAccounts()[0];
      if (account) loadWebAvatar().catch(() => {});
    }
  }, [inTeams]);

  async function ensureWebLogin() {
    const accounts = instance.getAllAccounts();
    if (accounts.length === 0) {
      await instance.loginPopup({
        scopes: [...GRAPH_SCOPES, API_SCOPE],
        prompt: "select_account",
      });
    }
    return instance.getActiveAccount() ?? instance.getAllAccounts()[0];
  }

  async function loadWebAvatar() {
    const account = await ensureWebLogin();
    const graphRes = await instance.acquireTokenSilent({
      scopes: GRAPH_SCOPES,
      account,
    });
    const me = await fetch("https://graph.microsoft.com/v1.0/me", {
      headers: { Authorization: `Bearer ${graphRes.accessToken}` },
    }).then((r) => (r.ok ? r.json() : null));
    setDisplayName(me?.displayName ?? "");

    const tryPaths = [
      "/me/photo/$value",
      "/me/photos/64x64/$value",
      "/me/photos/96x96/$value",
    ];
    let url: string | null = null;
    for (const p of tryPaths) {
      const r = await fetch(`https://graph.microsoft.com/v1.0${p}`, {
        headers: { Authorization: `Bearer ${graphRes.accessToken}` },
      });
      if (r.ok) {
        const blob = await r.blob();
        url = URL.createObjectURL(blob);
        break;
      }
      if (r.status !== 404) break;
    }
    if (photoUrl && photoUrl.startsWith("blob:")) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(url);

    const apiRes = await instance.acquireTokenSilent({
      scopes: [API_SCOPE],
      account,
    });
    fetch("http://localhost:8080/teams/me", {
      headers: { Authorization: `Bearer ${apiRes.accessToken}` },
    }).catch(() => {});
  }

  function initialsFrom(name?: string) {
    if (!name) return "U";
    return name
      .split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  async function loadTeamsAvatar() {
    const token = await microsoftTeams.authentication.getAuthToken();

    const r = await fetch("http://localhost:8080/teams/me/photo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (photoUrl && photoUrl.startsWith("blob:")) URL.revokeObjectURL(photoUrl);
    if (r.ok) {
      const blob = await r.blob();
      setPhotoUrl(URL.createObjectURL(blob));
    } else {
      setPhotoUrl(null);
    }

    const ctx = await microsoftTeams.app.getContext();
    setDisplayName(ctx?.user?.displayName ?? "");
  }

  async function handleSignIn() {
    console.log("Sign-in clicked. inTeams =", inTeams);
    try {
      setLoading(true);
      if (inTeams) {
        await loadTeamsAvatar();
      } else {
        await ensureWebLogin();
        await loadWebAvatar();
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      const account =
        instance.getActiveAccount() ?? instance.getAllAccounts()[0];
      if (account) {
        await instance.logoutPopup({
          account,
          postLogoutRedirectUri: window.location.origin,
        });
      } else {
        setPhotoUrl(null);
        setDisplayName("");
      }
    } catch (e) {
      Object.keys(localStorage)
        .filter(
          (k) =>
            k.startsWith("msal.") ||
            k.includes(String(process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID))
        )
        .forEach((k) => localStorage.removeItem(k));
      setPhotoUrl(null);
      setDisplayName("");
    } finally {
      setOpen(false);
    }
  }

  if (photoUrl || displayName) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((x) => !x)}
          className="inline-flex items-center gap-2 focus:outline-none"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border bg-gray-200 flex items-center justify-center text-sm font-semibold">
            {photoUrl ? (
              <img
                className="w-full h-full object-cover"
                src={photoUrl}
                alt="profile"
              />
            ) : (
              <span>{initialsFrom(displayName)}</span>
            )}
          </div>
          <span className="text-sm hidden sm:inline">
            {displayName || "Account"}
          </span>
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-48 rounded-xl border bg-white shadow-lg p-1 z-50"
          >
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      disabled={loading}
      className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
    >
      {loading ? "Signing in…" : "Sign in with Microsoft"}
    </button>
  );
}
