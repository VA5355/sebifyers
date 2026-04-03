import { useEffect, useState, useRef } from "react";


type Status = "connecting" | "connected" | "disconnected" | "error" | "ssl_error";


export const useMarketSocket = () => {

  const [nseData, setNseData] = useState<any>(null);
    const [status, setStatus] = useState<Status>("connecting");

      const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);

 const connect = () => {
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";

    const ws = new WebSocket(`${protocol}://nseyahooindices.onrender.com`);
    wsRef.current = ws;

    setStatus("connecting");

    ws.onopen = () => {
      console.log("✅ WS Connected");
      setStatus("connected");
      retryRef.current = 0;
    };

    ws.onmessage = (event) => {
      setNseData(JSON.parse(event.data));
    };

    ws.onerror = () => {
      console.error("❌ WS Error");

      // 🔥 Detect SSL issue
      if (window.location.protocol === "https:") {
        setStatus("ssl_error");
      } else {
        setStatus("error");
      }
    };

    ws.onclose = () => {
      console.log("⚠️ WS Closed");

      if (retryRef.current < 5) {
        retryRef.current++;

        setStatus("disconnected");

        setTimeout(() => {
          connect(); // 🔁 reconnect
        }, 2000 * retryRef.current); // exponential backoff
      } else {
        setStatus("error");
      }
    };
  };

  useEffect(() => {
    // ✅ Auto-detect protocol
    connect();

  /*  const protocol = window.location.protocol === "https:" ? "wss" : "ws";
     const ws = new WebSocket(
      `${protocol}://localhost:10000`
    );

    ws.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };

    ws.onerror = (err) => {
      console.error("❌ WS error", err);
    };

    ws.onclose = () => {
      console.log("⚠️ WS disconnected");
    };
    */
 

   /* ws.onmessage = (event) => {
      setData(JSON.parse(event.data));
    };*/

   // return () => ws.close();

     return () => {
      wsRef.current?.close();
    };


  }, []);
    return { nseData, status };
 // return data;
};
