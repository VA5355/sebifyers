// spotFyersIndex.js

//import fetch from "node-fetch";

const NSE_URL = "https://scraper-api-eyiz.onrender.com/"; // https://artillery2feed.com/
const NSE_Yahoo_URL = "https://nseyahooindices.onrender.com/"; // "https://localhost:10000/"
//const FYERS_URL = "https://localhost:9384/stream"; // // https://fyersfeed.onrender.com/
const FYERS_URL = "https://onedinaar.com/.netlify/functions/netlifystockfyersticker/fyerslocallive"; // // https://fyersfeed.onrender.com/
const FYERS_RECAL = "https://artilleryfeed.onrender.com/recalculate-option-strikes" ;  //9384  localhost:8443 this is for fyers stream indices no Option Chain publishing 

const FYERS_SYMBOL = "NSE:NIFTY50-INDEX";


/* ---------------------------------------------------------- */
/* FETCH FROM NSEYahooindices SERVICE                                     */
/*{
  "source": "NSE",
  "data": [
    {
      "key": "INDICES ELIGIBLE IN DERIVATIVES",
      "index": "NIFTY 50",
      "indexSymbol": "NIFTY 50",
      "last": 22713.1,
      "variation": 33.7,
      "percentChange": 0.15,
      "open": 22383.4,
      "high": 22782.3,
      "low": 22182.55,
      "previousClose": 22679.4,
      "yearHigh": 26373.2,
      "yearLow": 21743.65,
      "indicativeClose": 0,
      "pe": "19.96",
      "pb": "3.1",
      "dy": "1.37",
      "declines": "26",
      "advances": "24",
      "unchanged": "0",
      "perChange365d": -2.31,
      "perChange30d": -8.66,
      "date365dAgo": "26-Mar-2025",
      "date30dAgo": "24-Feb-2026",
      "previousDay": "27-Mar-2026",
      "oneWeekAgo": "20-Mar-2026",
      "oneMonthAgoVal": 25424.65,
      "oneWeekAgoVal": 23114.5,
      "oneYearAgoVal": 23486.85,
      "previousDayVal": 22819.6,
      "chart365dPath": "https://nsearchives.nseindia.com/365d/NIFTY-50.svg",
      "chart30dPath": "https://nsearchives.nseindia.com/30d/NIFTY-50.svg",
      "chartTodayPath": "https://nsearchives.nseindia.com/today/NIFTY-50.svg"
    },
    {
      "key": "INDICES ELIGIBLE IN DERIVATIVES",
      "index": "NIFTY BANK",
      "indexSymbol": "NIFTY BANK",
      "last": 51548.75,
      "variation": 100.1,
      "percentChange": 0.19,
      "open": 50625.65,
      "high": 51731.95,
      "low": 49954.85,
      "previousClose": 51448.65,
      "yearHigh": 61764.85,
      "yearLow": 49156.95,
      "indicativeClose": 0,
      "pe": "13.72",
      "pb": "1.76",
      "dy": "1.14",
      "declines": "6",
      "advances": "8",
      "unchanged": "0",
      "perChange365d": -0.09,
      "perChange30d": -13.86,
      "date365dAgo": "26-Mar-2025",
      "date30dAgo": "24-Feb-2026",
      "previousDay": "27-Mar-2026",
      "oneWeekAgo": "20-Mar-2026",
      "oneMonthAgoVal": 61047.3,
      "oneWeekAgoVal": 53427.05,
      "oneYearAgoVal": 51209,
      "previousDayVal": 52274.6,
      "chart365dPath": "https://nsearchives.nseindia.com/365d/NIFTY-BANK.svg",
      "chart30dPath": "https://nsearchives.nseindia.com/30d/NIFTY-BANK.svg",
      "chartTodayPath": "https://nsearchives.nseindia.com/today/NIFTY-BANK.svg"
    },
    {
      "key": "INDICES ELIGIBLE IN DERIVATIVES",
      "index": "SENSEX",
      "indexSymbol": "SENSEX",
      "last": 73319.55,
      "variation": 185.229999999996,
      "percentChange": 0.253273702414948,
      "open": "",
      "high": 73568.54,
      "low": 71545.81,
      "previousClose": 73134.32,
      "yearHigh": "",
      "yearLow": "",
      "indicativeClose": 0,
      "pe": "19.96",
      "pb": "3.1",
      "dy": "1.37",
      "declines": "26",
      "advances": "24",
      "unchanged": "0",
      "perChange365d": -2.31,
      "perChange30d": -8.66,
      "date365dAgo": "26-Mar-2025",
      "date30dAgo": "24-Feb-2026",
      "previousDay": "27-Mar-2026",
      "oneWeekAgo": "20-Mar-2026",
      "oneMonthAgoVal": 25424.65,
      "oneWeekAgoVal": 23114.5,
      "oneYearAgoVal": 23486.85,
      "previousDayVal": 22819.6,
      "chart365dPath": "",
      "chart30dPath": "",
      "chartTodayPath": ""
    }
  ]
}
*/


/* ---------------------------------------------------------- */

async function fetchFromNSEYahooindices() {

  try {

    const res = await fetch(NSE_Yahoo_URL, { timeout: 4000 });

    if (!res.ok) throw new Error("NSEYahooindices service failed");

    const json = await res.json();

    const spot =
      json?.data?.find(x => x.index === "NIFTY 50")?.last
   //   || json?.indicativenifty50?.closingValue;

   const bankspot =
      json?.data?.find(x => x.index === "NIFTY BANK")?.last
      const sensexspot =
      json?.data?.find(x => x.index === "SENSEX")?.last

      console.log(" NSEYahooindices fetch ", JSON.stringify( {spot ,bankspot , sensexspot}));


    if (!spot) throw new Error("NIFTY value missing");

    return Number(spot);

  } catch (err) {

    console.log("❌ NSEYahooindices fetch failed:", err.message);
    return null;

  }

}


/* ---------------------------------------------------------- */
/* FETCH FROM NSE SERVICE                                     */
/* ---------------------------------------------------------- */

async function fetchFromNSE() {

  try {

    const res = await fetch(NSE_URL, { timeout: 4000 });

    if (!res.ok) throw new Error("NSE service failed");

    const json = await res.json();

    const spot =
      json?.marketState?.find(x => x.index === "NIFTY 50")?.last
      || json?.indicativenifty50?.closingValue;

    if (!spot) throw new Error("NIFTY value missing");

    return Number(spot);

  } catch (err) {

    console.log("❌ NSE fetch failed:", err.message);
    return null;

  }

}

/* ---------------------------------------------------------- */
/* FETCH FROM FYERS SSE STREAM                                */
/* ---------------------------------------------------------- */

async function fetchFromFyers(accessToken) {

  try {

    const url = `${FYERS_URL}?accessToken=${accessToken}`;

    const response = await fetch(url,{
          method: 'GET',
          credentials: 'include', // <-- Add this line
          headers: {
            'Content-Type': 'application/json',
          },
        });

    if (!response.body)
      throw new Error("No stream body");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {

      const { value, done } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");

      buffer = lines.pop();

      for (const line of lines) {

        if (!line.startsWith("data:")) continue;

        const payload = line.replace("data:", "").trim();

        try {

          const json = JSON.parse(payload);

          if (json.symbol === FYERS_SYMBOL && json.ltp) {

            return Number(json.ltp);

          }

        } catch {
          // ignore non JSON messages
        }

      }

    }

  } catch (err) {

    console.log("❌ Fyers fetch failed:", err.message);
    return null;

  }

}

/* ---------------------------------------------------------- */
/* MASTER FETCH FUNCTION                                      */
/* ---------------------------------------------------------- */

export async function fetchNiftySpot(accessToken) {

  console.log("🚀 Fetching NIFTY spot...");

  // Try NSE first
  const nseSpot = await fetchFromNSE();

  if (nseSpot) {

    console.log("✅ NIFTY from NSE:", nseSpot);
    return nseSpot;

  }

  console.log("⚠️ NSE unavailable. Trying FYERS...");

  const fyersSpot = await fetchFromFyers(accessToken);

  if (fyersSpot) {

    console.log("✅ NIFTY from FYERS:", fyersSpot);
    return fyersSpot;

  }

  console.log("❌ All sources failed");
  return 24400; 
  //throw new Error("Unable to fetch NIFTY spot");

}
/* ---------------------------------------------------------- */
/* Fairvinay/nseyahooindices FETCH FUNCTION                                      */
/* ---------------------------------------------------------- */
export async function fetchNiftyYahooindices(accessToken) {

  console.log("🚀 Fetching NIFTY nseyahooindices spot...");

  // Try NSE first
  const nseSpot = await fetchFromNSEYahooindices();

  if (nseSpot) {

    console.log("✅ NIFTY from NSEYahooindices:", nseSpot);
    return nseSpot;

  }

  console.log("⚠️ NSEYahooindices unavailable. Trying FYERS...");

  const fyersSpot = await fetchFromFyers(accessToken);

  if (fyersSpot) {

    console.log("✅ NIFTY from FYERS:", fyersSpot);
    return fyersSpot;

  }

  console.log("❌ All sources failed");
  return 24400; 
  //throw new Error("Unable to fetch NIFTY spot");

}








/** 
 *  NIFTY OPTION RECALCULATE STIRKES in Option chain
 
 */
export async function recalculateNiftOptionStrikes(accessToken) {


	/*var config = {
			method: 'get',
			url: FYERS_RECAL ,
			 httpsAgent: agent,  timeout: 8000,
			headers: { 'Content-Type': 'application/json' , "Connection":"close" ,'x-auth-token' : authHeader}, // 'Authorization' :authHeader seems blocked 
			//data : data
		};
   */ 

    try { 
 
    const url = `${FYERS_URL}?accessToken=${accessToken}`;

    const response = await fetch(FYERS_RECAL,{
          method: 'GET',
          
          headers: {
            'Content-Type': 'application/json','x-auth-token' : 'Bearer '+accessToken
          },
        });
          const json = await response.json();
    if (!json){
        totalexpiries = {
							error: "Recalculate Nifty Option strikes totalexpiries JSON not reported ",
							message: 'JSON format error '
						}
      }
      //throw new Error("recalculated artillery backend responded errorlt ");
      totalexpiries =json;
    
		if(totalexpiries !== undefined && Array.isArray(totalexpiries))  {  
      	/*	await   axios(config)
				.then(function (response) {
					console.log("recalculate strike " + JSON.stringify(response.data));
					totalexpiries = response.data;

				})
				.catch(function (error) {
					console.log(error);
					if(error.code === "ECONNABORTED"){
					totalexpiries = 	 {
							error:"Upstream timeout"
							} ;
					}
					else { 
					totalexpiries = {
							error: "Recalculate Nifty Option strikes  Fetch Failed ",
							message: error.message
						}
						 }
				});*/
        return totalexpiries;


       }
        else { 
        console.log("totalexpiries were not published by artilery " );
        	totalexpiries = {
							error: "Recalculate Nifty Option strikes totalexpiries not proper format ",
							message: error.message
						}
            return totalexpiries

        }
      } catch(error){
        	totalexpiries = {
							error: "Recalculate Nifty Option strikes  Fetch Failed ",
							message: error.message
						}
           return totalexpiries
      }

  }
 
