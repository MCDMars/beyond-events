"use client";
import { useMsal } from "@azure/msal-react";
import * as microsoftTeams from "@microsoft/teams-js";
import { apiScopes } from "@/lib/auth/msalConfig";
import { useEffect, useState } from "react";

export default function LoginButton() {
  const { instance, accounts } = useMsal();
  const [inTeams, setInTeams] = useState(false);

  useEffect(() => {
    microsoftTeams.app
      .initialize()
      .then(() => setInTeams(true))
      .catch(() => {});
  }, []);

  const login = async () => {
    if (inTeams) {
      // Teams SSO: get a token from Teams and use it directly the backend API.
      try {
        const token = await microsoftTeams.authentication.getAuthToken();
        await fetch("http://localhost:8080/teams/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        console.error(e);
      }
      return;
    }

    if (accounts.length === 0) {
      await instance.loginPopup({ scopes: apiScopes });
    }
    const result = await instance.acquireTokenSilent({
      scopes: apiScopes,
      account: instance.getAllAccounts()[0],
    });
    await fetch("http://localhost:8080/teams/me", {
      headers: { Authorization: `Bearer ${result.accessToken}` },
    });
  };

  return (
    <button onClick={login} className="px-4 py-2 rounded-xl bg-black text-white">
      Sign in with Microsoft
    </button>
  );
}
