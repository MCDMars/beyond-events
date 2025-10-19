import { Configuration, LogLevel } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!,     // from app registration
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`, // tenant
    redirectUri: process.env.NEXT_PUBLIC_AZURE_AD_REDIRECT_URI || "http://localhost:3000",
  },
  cache: { cacheLocation: "localStorage" },
  system: { loggerOptions: { logLevel: LogLevel.Error } },
};

export const apiScopes = [`api://${process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}/access_as_user`];
export const graphScopes = ["User.Read"]; // optional if you’ll call Graph from frontend
