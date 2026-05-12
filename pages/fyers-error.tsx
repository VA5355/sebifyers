import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { StorageUtils } from '@/libs/cache';
import { CommonConstants } from '@/utils/constants';
import { FYERSAUTHORISEURL } from "@/libs/client"
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";
import Head from "next/head";
import Script from "next/script";

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
export default function FyersError({ clientId, redirectUri }: Props) {
  const router = useRouter();
  const { reason } = router.query;
  useEffect(() => {
  /*  try {
         console.log('FyersError passed server paramters  ');
         console.log(`   clientId :::   ${clientId}  `);
         console.log(`   clientId :::   ${clientId}  `);
         console.log(`   clientId :::   ${clientId}  `);
         console.log(`   clientId :::   ${clientId}  `);
         console.log(`   clientId :::   ${clientId}  `);
         console.log(`   redirectUri :::  ${redirectUri} `);
         console.log(`   redirectUri :::  ${redirectUri} `);
         console.log(`   redirectUri :::  ${redirectUri} `);
         console.log(`   redirectUri :::  ${redirectUri} `);
         console.log(`   redirectUri :::  ${redirectUri} `);
         console.log(`   redirectUri :::  ${redirectUri} `);

      const processAuth = async () => {
        const params = new URLSearchParams(window.location.search);
        const authCode = params.get("auth_code");
        if (!authCode) {         console.error("No auth code");        return;      }
        sessionStorage.setItem("fyers_auth_code", authCode );
        try {  const res = await fetch( `${FYERSAUTHORISEURL}/generate-token`,
            {  method: "POST",  headers: {  "Content-Type": "application/json" }, body: JSON.stringify({ auth_code: authCode  })
            } );
          const tokenData = await res.json();
          console.log(tokenData);
          console.log('processAuth worked Access Token availalbe ');
          localStorage.setItem("fyers_access_token",tokenData.access_token);
          localStorage.setItem("fyers_refresh_token",tokenData.refresh_token || "");
          localStorage.setItem("fyers_token_data",JSON.stringify(tokenData));
        // navigate("/dashboard");
        } catch (err) {   console.log ('process Auth error :: ' + JSON.stringify(err));
        }
      };
         processAuth();
      if (!clientId || !redirectUri) {
          console.log("Configuration error. Please try later.");
           // setLoading(false);
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
      (async () =>  {
         let pythonAuthUrl = await authLocalFyers();   

       
          window.location.assign(pythonAuthUrl );

      })();
 
     
    } catch (e) {
      console.error("FYERS auth error:", e);
     
    }*/
  }, []);
  /* window.location.assign(
            "https://api-t1.fyers.in/api/v3/generate-authcode?" +
              params.toString()
          );*/

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
              console.log(' fyers ERROR TSX FAILED authLocalFyers ' );
               console.log('fyers ERROR TSX FAILED authLocalFyers ' );

        }

  }

  return (
      <>
     <Head>
        <title>FYERS Authentication Error</title>
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
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <div className="flex justify-center">
            <AlertTriangle className="w-14 h-14 text-red-500" />
          </div>

          <h1 className="text-2xl font-bold mt-4 bg-brandgreen-600 text-brandgreen-800">
            Authentication Failed
          </h1>
              <div className="container py-5 text-center">
                <p className="text-brandgreen--500 mt-2">
                Something went wrong while logging in to FYERS.
               </p>

                <p className="mt-3 text-muted">
                  Please try again after some time.
                </p>

                {reason && (
                  <p className="mt-3 text-sm text-brandgreen-600 bg-brandgreen-50 px-3 py-2 rounded-lg">
                   Error reason: <strong>{reason}</strong>
                 </p>
                 )}
                       <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={async () => {  

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

                          window.location.assign(pythonAuthUrl );
                          /*
                          const params = new URLSearchParams({
                            client_id: clientId,
                           
                      redirect_uri: redirectUri,
                      response_type: "code",
                      state: "sample_state",
                    });

                          window.location.assign(
                            "https://api-t1.fyers.in/api/v3/generate-authcode?" +
                              params.toString()
                          ); */
                      }
                      }
                      className="mt-6 w-full flex items-center justify-center gap-2 bg-brandgreen-600 hover:bg-brandgreen-700 text-brandgreen py-3 rounded-xl font-bold"
                    >
                   <RotateCcw className="w-5 h-5" />
                      <strong> Retry Login</strong>
                     </motion.button>
             </div>
            
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
