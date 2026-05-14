//useBrokerAuth.ts
import { useCallback, useEffect, useMemo, useState } from "react";

export interface BrokerAuthState {
  loading: boolean;
  authenticated: boolean;
  error: string | null;
  authUrl: string;
  authCode: string | null;
}

interface UseBrokerAuthOptions {
  brokerName: string;
  authEndpoint: string;
  redirectUri?: string;
  autoStart?: boolean;
}

export const useBrokerAuth = ({
  brokerName,
  authEndpoint,
  redirectUri,
  autoStart = true,
}: UseBrokerAuthOptions) => {
  const [loading, setLoading] = useState(false);

  const [authenticated, setAuthenticated] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [authCode, setAuthCode] = useState<string | null>(null);

  // ---------------------------------------------------
  // AUTH URL
  // ---------------------------------------------------

  const authUrl = useMemo(() => {
    const url = new URL(authEndpoint);

    if (redirectUri) {
      url.searchParams.set("redirect_uri", redirectUri);
    }

    return url.toString();
  }, [authEndpoint, redirectUri]);

  // ---------------------------------------------------
  // START AUTH
  // ---------------------------------------------------

  const startAuth = useCallback(() => {
    setLoading(true);
    setError(null);

    console.log(`🚀 Starting ${brokerName} authentication`);
  }, [brokerName]);

  // ---------------------------------------------------
  // HANDLE MESSAGE FROM IFRAME / POPUP
  // ---------------------------------------------------

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        if (!event.data) return;

        const payload = event.data;

        console.log("📩 Broker auth message:", payload);

        // ---------------------------------------------
        // SUCCESS
        // ---------------------------------------------

        if (payload.type === "BROKER_AUTH_SUCCESS") {
          setAuthenticated(true);
          setLoading(false);

          if (payload.code) {
            setAuthCode(payload.code);
          }

          console.log("✅ Broker authenticated");
        }

        // ---------------------------------------------
        // ERROR
        // ---------------------------------------------

        if (payload.type === "BROKER_AUTH_ERROR") {
          setLoading(false);

          setError(
            payload.message || "Broker authentication failed"
          );

          console.error("❌ Broker auth failed");
        }
      } catch (err) {
        console.error("Broker auth parsing failed", err);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // ---------------------------------------------------
  // AUTO START
  // ---------------------------------------------------

  useEffect(() => {
    if (autoStart) {
      startAuth();
    }
  }, [autoStart, startAuth]);

  // ---------------------------------------------------
  // RESET
  // ---------------------------------------------------

  const reset = () => {
    setLoading(false);
    setAuthenticated(false);
    setError(null);
    setAuthCode(null);
  };

  // ---------------------------------------------------
  // RETURN
  // ---------------------------------------------------

  const state: BrokerAuthState = {
    loading,
    authenticated,
    error,
    authUrl,
    authCode,
  };

  return {
    ...state,
    startAuth,
    reset,
  };
};