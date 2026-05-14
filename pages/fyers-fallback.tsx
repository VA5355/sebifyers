import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Script from "next/script";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";

const Header = dynamic(
  () => import("@/app/HeaderStatic"),
  { ssr: false }
);

const TradeTickerBar = dynamic(
  () => import("@/app/TradeTickerStatic"),
  { ssr: false }
);

const Menu = dynamic(
  () => import("@/app/MenuStatic"),
  { ssr: false }
);
const ScreenLoader = dynamic(
  () =>
    import(
      "@/app/ScreenLoaderStatic"
    ),
  { ssr: false }
);

const SubscribePopup = dynamic(
  () =>
    import("@/app/SubscribePopupStatic"),
  { ssr: false }
);


import { GlobalState } from "@/redux/store";
// import   useIsMobile   from "@/components/listing/tradeGrid/useIsMobile";
import { StorageUtils } from "@/libs/cache";
import { CommonConstants } from "@/utils/constants";

import {
  FYERSAUTHORISEURL,
  FYERSMODALCALLBAKURL,
} from "@/libs/client";

type Props = {
  auth_code: string;
  code: string;
  s: string;
  state: string;
  triggerredirectpython: string;
};

export default function FyersFallback(props: Props) {
  const {
    auth_code,
    code,
    s,
    state,
    triggerredirectpython,
  } = props;
const [mounted, setMounted] = useState(false);
 // const isMobile = useIsMobile();
   const [isMobile, setIsMobile] = useState(false);

  /*const isDarkMode = useSelector(
    (state: GlobalState) => state.misc.isDarkMode
  );*/

  const [error, setError] = useState<string | null>(null);

  const [fyersAccessToken, setFyersAccessToken] =
    useState<string | null>(null);

  const [fyersRefreshToken, setFyersRefreshToken] =
    useState<string | null>(null);

  const processAuth = async () => {
    const params = new URLSearchParams(window.location.search);

    const authCode = params.get("auth_code");

    if (!authCode) {
      console.error("No auth code");
      return;
    }

    sessionStorage.setItem(
      "fyers_auth_code",
      authCode
    );

    try {
      const res = await fetch(
        `${FYERSAUTHORISEURL}/generate-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth_code: authCode,
          }),
        }
      );

      const tokenData = await res.json();

      console.log(
        "processAuth worked Access Token available"
      );

      localStorage.setItem(
        "fyers_access_token",
        tokenData.access_token
      );

      setFyersAccessToken(
        tokenData.access_token
      );

      localStorage.setItem(
        "fyers_refresh_token",
        tokenData.refresh_token || ""
      );

      setFyersRefreshToken(
        tokenData.refresh_token
      );

      localStorage.setItem(
        "fyers_token_data",
        JSON.stringify(tokenData)
      );
    } catch (err) {
      console.log(
        "process Auth error :: " +
          JSON.stringify(err)
      );

      setError(
        "process Auth error :: " +
          JSON.stringify(err)
      );
    }
  };
useEffect(() => {
   setMounted(true);
}, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
      const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setIsMobile(true);
      } else if (isTablet) {
      // setDevice('Tablet');
       setIsMobile(false);
      } else {
        //setDevice('Desktop');
        setIsMobile(false);
      }
    };

    handleDeviceDetection();
    window.addEventListener('resize', handleDeviceDetection);

 
    try {
      processAuth();

     //  processAuth();
      if (!auth_code) {
        window.location.replace("/fyers-auth");
        return;
      }

      const data = {
        auth_code,
        code,
        s,
        ttl: Date.now(),
      };

      localStorage.setItem(
        "fyersToken",
        JSON.stringify(data)
      );

      try {
        StorageUtils?._save?.(
          CommonConstants.fyersToken,
          data
        );
      } catch (e) {
        console.warn(
          "StorageUtils failed, localStorage already set"
        );
      }

      localStorage.removeItem(
        "fyers-auth-attempted"
      );
    } catch (e) {
      console.error(
        "Token storage failed:",
        e
      );
    }
       return () => {
      window.removeEventListener('resize', handleDeviceDetection);
    };



  }, []);

  const handleAuthenticated = () => {
    try {
      if (
        triggerredirectpython === "true"
      ) {
        if (state === "python_test") {
          window.location.assign(
            `https://localhost:9384/redirect?auth_code=${auth_code}&state=python_test`
          );
        } else if (
          state === "python_state"
        ) {
          window.location.assign(
            `https://localhost:9384/redirect-start?auth_code=${auth_code}&state=python`
          );
        } else if (
          state === "python_order_state"
        ) {
          window.location.assign(
            `https://localhost:5002/redirect-start?auth_code=${auth_code}&state=python_order`
          );
        }
      } else {
        window.location.assign(
          FYERSMODALCALLBAKURL
        );
      }
    } catch {
      alert("Redirection failed.");
    }
  };
      if (!mounted) return null;


  return (
    <>
      <Head>
        <title>
          FYERS Authentication Success
        </title>
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
        {/** `${
          isDarkMode ? "dark" : ""
        }` */}
      <div
        className={''}
      >
        <div className="bg-white dark:bg-black min-h-screen">
         {/**<ScreenLoader />  */} 

          {/* SAME HEADER */}
          <Header />

          {/* SAME TICKER */}
          <TradeTickerBar />

          {/* OPTIONAL MENU */}
          <Menu />

          {/* AUTH CARD */}
          <div className="px-3 md:px-6 py-8 md:ml-[88px]">
            <div className="flex items-center justify-center">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.4,
                }}
                className="
                  w-full
                  max-w-xl
                  rounded-2xl
                  border
                  border-gray-200
                  dark:border-neutral-800
                  bg-white
                  dark:bg-neutral-900
                  shadow-xl
                  p-8
                  text-center
                "
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    type: "spring",
                  }}
                  className="flex justify-center"
                >
                  <CheckCircle
                    className="
                      w-16
                      h-16
                      text-green-500
                    "
                  />
                </motion.div>

                <h1
                  className="
                    text-2xl
                    font-bold
                    mt-4
                    text-black
                    dark:text-white
                  "
                >
                  FYERS LOGIN UPDATE
                </h1>

                <p
                  className="
                    text-sm
                    mt-3
                    text-gray-500
                    dark:text-gray-400
                  "
                >
                  Authentication  Status 
                </p>

                {auth_code ? (
                  <>
                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={
                        handleAuthenticated
                      }
                      className={` 
                        mt-6
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                       btn-primary ${isMobile  ? 'btn-sm':'btn-lg'}
                        text-white
                        text-sm
                        md:text-base
                        font-semibold
                        rounded-lg
                        px-4
                        py-4
                      `}
                    >
                      Continue
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>

                    <div className="mt-4">
                      {fyersAccessToken ? (
                        <p className="text-green-500 font-bold badge-info w-75 p-3 text-sm">
                          App authorization
                          successful
                        </p>
                      ) : (
                        <p className="text-yellow-500  font-bold  badge-danger  w-75 p-3 text-sm">
                          Token generation
                          pending...
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="mt-6">
                    <p className="text-red-500 font-bold  badge-danger  w-75 p-3 ">
                      Authentication failed.
                    </p>

                    <motion.button
                      whileHover={{
                        scale: 1.03,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={
                        handleAuthenticated
                      }
                      className="
                        mt-6
                        w-full
                        btn-primary 
                        text-white
                        rounded-lg
                        px-4
                        py-3
                        font-semibold
                      "
                    >
                      Retry
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

         {/** <SubscribePopup /> */} 
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps =
  async ({ query }) => {
    if (!query.auth_code) {
      return {
        redirect: {
          destination:
            "/fyers-error?reason=missing_auth_code",
          permanent: false,
        },
      };
    }

    return {
      props: {
        auth_code:
          query.auth_code ?? "",
        code: query.code ?? "",
        s: query.s ?? "",
        state: query.state ?? "",
        triggerredirectpython:
          query.triggerredirectpython ??
          "false",
      },
    };
  };
