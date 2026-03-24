import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

type Props = {
  clientId: string;
  redirectUri: string;
};

export default function FyersAuth({ clientId, redirectUri }: Props) {
  useEffect(() => {
    if (!clientId || !redirectUri) return;

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      state: "sample_state",
    });

    window.location.assign(
      "https://api-t1.fyers.in/api/v3/generate-authcode?" + params.toString()
    );
  }, [clientId, redirectUri]);

  return (
    <>
      <Head>
        <title>FYERS Authentication</title>
      </Head>

      <div className="container text-center py-5">
        <h1>GOOD MORNING</h1>
        <img
          src="https://assets.fyers.in/images/logo.svg"
          alt="FYERS"
          width={225}
        />
        <p className="mt-4">Redirecting to FYERS…</p>
      </div>
    </>
  );
}
