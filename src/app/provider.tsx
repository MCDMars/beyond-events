"use client";

import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "@/lib/auth/msalConfig";
import { useEffect, useState } from "react";

function getPca() {
  if (typeof window !== "undefined") {
    // @ts-ignore
    if (!window.__PCA__) window.__PCA__ = new PublicClientApplication(msalConfig);
    // @ts-ignore
    return window.__PCA__;
  }
  return new PublicClientApplication(msalConfig);
}
const pca = getPca();

export default function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    pca.initialize().then(() => mounted && setReady(true));
    return () => { mounted = false; };
  }, []);

  if (!ready) return null;

  return <MsalProvider instance={pca}>{children}</MsalProvider>;
}
