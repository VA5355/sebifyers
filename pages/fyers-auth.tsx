import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LogIn,
  AlertTriangle,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import Script from "next/script";
import { StorageUtils } from '@/libs/cache';
import { CommonConstants } from '@/utils/constants';
import {FYERSAUTHORISEURL } from "@/libs/client"
type Props = {
  clientId: string;
  redirectUri: string;
};
function isValidJwtStructure(token: unknown): boolean {
  if (typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const [header, payload] = parts;

    const decode = (str: string) =>
      JSON.parse(
        decodeURIComponent(
          atob(str.replace(/-/g, "+").replace(/_/g, "/"))
            .split("")
            .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
        )
      );

    decode(header);
    decode(payload);

    return true;
  } catch {
    return false;
  }
}

export default function FyersAuth({ clientId, redirectUri }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [showRelogin, setShowRelogin] = useState(false);
const [loading, setLoading] = useState(true);
  const processAuth = async () => {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("auth_code");
        if (!authCode) {         console.error("No auth code");        return;      }
        sessionStorage.setItem("fyers_auth_code", authCode );
        try {  const res = await fetch( `${FYERSAUTHORISEURL}/generate-token`,
            {  method: "POST",  headers: {  "Content-Type": "application/json" }, body: JSON.stringify({ auth_code: authCode  })
            } );
          const tokenData = await res.json();
          /*console.log(tokenData);
          console.log('processAuth worked Access Token availalbe ');
          localStorage.setItem("fyers_access_token",tokenData.access_token);
          localStorage.setItem("fyers_refresh_token",tokenData.refresh_token || "");
          localStorage.setItem("fyers_token_data",JSON.stringify(tokenData));*/
              if(tokenData !== undefined && tokenData.access_token !== undefined && tokenData.access_token !== null ){
             if( tokenData.access_token !== '' ){
                  localStorage.setItem("fyers_access_token",tokenData.access_token);
                  localStorage.setItem(CommonConstants.fyersAccessToken,tokenData.access_token);
             }
             if( tokenData.refresh_token !== '' ){
                   localStorage.setItem("fyers_refresh_token",tokenData.refresh_token  );
             }
             if( tokenData.refresh_token !== '' && tokenData.access_token !== ''){
                    localStorage.setItem("fyers_token_data",JSON.stringify(tokenData));
                     console.log('menu component processAuth :::  processAuth worked Access Token availalbe ');
             }
           
          }
        


        // navigate("/dashboard");
        } catch (err) {   console.log ('process Auth error :: ' + JSON.stringify(err));
          setError('process Auth error :: ' + JSON.stringify(err))
        }
      };


  // on component mount / onload
  useEffect(() => {
    processAuth();
      (async () =>  {
         let pythonAuthUrl = await authLocalFyers();   
          console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                           console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                           console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                           console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                           console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                           console.log('FYERS-ERROR TSX pythonAuthUrl  '+pythonAuthUrl);
                            console.log('pythonAuthUrl  '+pythonAuthUrl);
                             console.log('pythonAuthUrl  '+pythonAuthUrl);
                            console.log('pythonAuthUrl  '+pythonAuthUrl);
                             console.log('pythonAuthUrl  '+pythonAuthUrl);
                            console.log('pythonAuthUrl  '+pythonAuthUrl);
         /* window.location.assign(
            "https://api-t1.fyers.in/api/v3/generate-authcode?" +
              params.toString()
          );*/
          window.location.assign(pythonAuthUrl );

      })();
  }, [error]);

  useEffect(() => {
    try {
    
         processAuth();
      if (!clientId || !redirectUri) {
        setError("Configuration error. Please try later.");
            setLoading(false);
        return;
      }

      const attempted = localStorage.getItem("fyers-auth-attempted");
     //const token = localStorage.getItem("fyersToken");
      const token =    StorageUtils._retrieve(CommonConstants.fyersToken);



      // ✅ Already authenticated → go to fallback
      if (token) {
          if (
              token?.isValid &&
              token?.data &&
              typeof token.data.auth_code === "string" &&
              isValidJwtStructure(token.data.auth_code)
        ) {
            let  auth_code = token.data.auth_code;
          console.log("Valid JWT structure detected");
        } else {
          console.warn("Invalid or garbage auth_code received");
        }

        window.location.replace("/fyers-fallback");
        return;
      }
     const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: "code",
        state: "sample_state",
      });
    
      // 🔴 Attempted before but no token → stop loop
      if (attempted && !token) {
        setShowRelogin(true); setLoading(false);
        return;
      }

      // 🟢 First-time OAuth initiation
      localStorage.setItem("fyers-auth-attempted", "true");

    
     
    } catch (e) {
      console.error("FYERS auth error:", e);
      setError("Unexpected error. Please try again.");  setLoading(false);
    }
  }, [clientId, redirectUri]);

  const authLocalFyers = async () => {
             try {

          const res = await fetch(
            `${FYERSAUTHORISEURL}/generate-auth-url`
          );
           
          const data = await res.json();
             console.log('python generated auth url for LOCAL authorization ' );
             console.log('  ' +data.auth_url);
          return data.auth_url;

        } catch (err) {
             console.error(err);
        }

  }
  const handleRelogin = () => {
    try {
      localStorage.removeItem("fyers-auth-attempted");
      //localStorage.removeItem("fyersToken");
      window.location.reload();
    } catch {
      setError("Unable to reset session.");
    }
  };

  return (
    <>
      <Head>
        <title>FYERS Authentication</title>
           
       
           {/*   FYERS   UI   AND   JS    IMPORTANT   SCRIPT  LINK */}
        
          </Head>
                     <Script
            src="/js/bootstrap.min.js"
             
            strategy="afterInteractive"
          />
        <Script
          src="https://assets.fyers.in/Lib/intlTelInput.min.js"
          strategy="afterInteractive"
        />
           <Script
            src="https://trade.fyers.in/Prod/1.2/fyers-widget.min.js"
            strategy="afterInteractive"
          />
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-black px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-700 shadow-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-4"
          >
            <ShieldCheck className="w-14 h-14  text-brandgreen-400" />
          </motion.div>
        
        <h1>FYERS Login</h1>
          <p className="text-slate-400 mt-2 text-sm">
            Connecting securely to your FYERS account
          </p>
        {/* 🔴 Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 flex items-center gap-2 justify-center  text-brandgreen-400"
            >
              <AlertTriangle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </motion.div>
          )}

         {/* 🔁 Relogin */}
          {showRelogin && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <p className=" text-brandgreen-400 text-sm mb-4">
                Previous login attempt detected without completion.
              </p>

              <button
                onClick={handleRelogin}
                className="w-full flex items-center justify-center gap-2 bg-brandgreen-500 hover:bg-brandgreen-400 text-black font-medium py-3 rounded-xl transition"
              >
                <RefreshCcw className="w-5 h-5" />
                Re-login to FYERS
              </button>
            </motion.div>
          )}


              {/* ⏳ Loading */}
          {loading && !error && !showRelogin && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex flex-col items-center gap-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "linear",
                }}
                className="w-10 h-10 border-4 border-emerald-400 border-t-transparent rounded-full"
              />
              <p className="text-slate-400 text-sm flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Redirecting to FYERS…
              </p>
            </motion.div>
          )}
        </motion.div>

       </div>

      
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      clientId: process.env.FYERS_CLIENT_ID ?? "",
      redirectUri: process.env.FYERS_REDIRECT_URI ?? "",
    },
  };
};
