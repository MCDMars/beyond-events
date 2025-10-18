"use client";
import { useMsal } from "@azure/msal-react";
import * as microsoftTeams from "@microsoft/teams-js";
import { apiScopes } from "@/lib/auth/msalConfig";
import { useEffect, useState } from "react";

export default function LoginButton() {
  const { instance, accounts } = useMsal();
  const [inTeams, setInTeams] = useState(false);

  useEffect(() => {
    // Detect Teams host
    microsoftTeams.app.initialize().then(() => setInTeams(true)).catch(() => {});
  }, []);

  const login = async () => {
    if (inTeams) {
      // Teams SSO: get a token from Teams and use it directly against your API.
      try {
        const token = await microsoftTeams.authentication.getAuthToken();
        // call your API with this token
        await fetch("/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        console.error(e);
      }
      return;
    }

    // Web: use MSAL login + acquire token for your API scope
    if (accounts.length === 0) {
      await instance.loginPopup({ scopes: apiScopes });
    }
    const result = await instance.acquireTokenSilent({ scopes: apiScopes, account: instance.getAllAccounts()[0] });
    await fetch("/api/me", {
      headers: { Authorization: `Bearer ${result.accessToken}` },
    });
  };

  return (
    <button onClick={login} className="px-4 py-2 rounded-xl bg-black text-white">
      Sign in with Microsoft
    </button>
  );
}
