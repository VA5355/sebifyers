import axios from "axios";

  const API = axios.create({
      baseURL: 'https://www.alphavantage.co/query',
      timeout: 27000  // netlify times out in 30 secs 
  });
  API.interceptors.request.use((config) => {
    console.log("Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  });


const FYERSAPI = axios.create({
   //   baseURL: 'https://store-stocks.netlify.app/.netlify/functions/netlifystockfyersbridge/api'
  //baseURL: 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api'
  baseURL: 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api'
})
const UPSTOXAPI = axios.create({
   //   baseURL: 'https://store-stocks.netlify.app/.netlify/functions/netlifystockfyersbridge/api'
  //baseURL: 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api'
  baseURL: 'https://fyerssebi.netlify.app/.netlify/functions/netlifyupstoxbridge/api'
})
const ICICDIRECTAPI = axios.create({
   //   baseURL: 'https://store-stocks.netlify.app/.netlify/functions/netlifystockfyersbridge/api'
  //baseURL: 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api'
  baseURL: 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockicicidirectbridge/api'
})
//const FYERSAPILOGINURL = 'https://store-stocks.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyerscallback'
//const FYERSAPINSECSV = 'https://store-stocks.netlify.app';
//const FYERSAPILOGINURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyerscallback'
const FYERSAPILOGINURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyerscallback'
const FYERSAPITRADEBOOKURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgettradebook'
const FYERSAPIPOSITIONBOOKURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgetpositionbook'
const FYERSAPIHOLDINGSURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgetholdings'
const FYERSAPIORDERBOOKSURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgetorderbook'
const FYERSAPICANCELORDER = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyerscancelorder'
const FYERSAPIBUYORDER = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersplacebuyorder'
const FYERSAPISELLORDER = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersplacesellorder'

const FYERSAPITICKERURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersticker/api/fyersgetticker'
const FYERSAPITHREESECQUOTE = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersticker/api/fyersgetbsecequote'

//const FYERSAPIMARKETFEEDRENDER = 'https://fyersmarketfeed.onrender.com/stream' // ?accessToken=
const FYERSAPIMARKETFEEDRENDER_SOCKET = 'https://rendersocketio-k4d8.onrender.com'  // 'https://localhost:9584' // ?accessToken=  'http://localhost:5000/stream' 

//const FYERSAPIMARKETFEEDRENDER = 'https://fyersindicespython.onrender.com/stream' // ?accessToken=  'http://localhost:9384(3000)/stream' 
const FYERSAPIMARKETFEEDRENDER = 'https://fyersbook.onrender.com/stream'    // this for manual SPOT prices in case access token not available 
const FYERSAPIORDERSRENDER = 'http://fyersorders.onrender.com/stream' // ?accessToken=
const FYERSAPIPOSITIONSRENDER = 'http://fyers-positions-socket-git.onrender.com/stream' // ?accessToken=
const FYERSAPIMARKETCUSTOMFEED = 'https://fyersbook.onrender.com/stream' // ?accessToken=
const FYERSOPTIONCHAINWSSFEED = "wss://artilleryfeed.onrender.com/"; //'wss://192.168.1.3:8443/';

const FYERSAPITICKERACCESTOKEN = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersticker/api/fyersaccesstoken'
const FYERSAPITICKERURLCLOSE = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersticker/api/close'
//const FYERSAPINSECSV = 'https://fyerssebi.netlify.app';
const FYERSAPINSECSV = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgetnsecsv'; 
const BASEREF = 'https://fyerssebi.netlify.app'; 


const UPSTOXAPILOGINURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifyupstoxbridge/api/upstoxauthcallback'
const     TRADE_LOGIN_URL = "https://api.icicidirect.com/apiuser/login?api_key="
  // upstoxsdklogin this is internal may be for later use 
/*const FYERSAPITRADEBOOKURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgettradebook'
const FYERSAPIPOSITIONBOOKURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgetpositionbook'
const FYERSAPIHOLDINGSURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgetholdings'
const FYERSAPIORDERBOOKSURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersgetorderbook'
const FYERSAPICANCELORDER = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyerscancelorder'
const FYERSAPIBUYORDER = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersplacebuyorder'
const FYERSAPISELLORDER = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersbridge/api/fyersplacesellorder'

const FYERSAPITICKERURL = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersticker/api/fyersgetticker'
const FYERSAPITHREESECQUOTE = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersticker/api/fyersgetbsecequote'

//const FYERSAPIMARKETFEEDRENDER = 'https://fyersmarketfeed.onrender.com/stream' // ?accessToken=
const FYERSAPIMARKETFEEDRENDER = 'https://localhost:9384/stream' // ?accessToken=  'http://localhost:5000/stream' 

const FYERSAPIORDERSRENDER = 'http://localhost:5002/stream' // ?accessToken=
const FYERSAPIPOSITIONSRENDER = 'http://localhost:5003/stream' // ?accessToken=
const FYERSAPIMARKETCUSTOMFEED = 'https://localhost:9555/stream' // ?accessToken=

const FYERSAPITICKERACCESTOKEN = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersticker/api/fyersaccesstoken'
const FYERSAPITICKERURLCLOSE = 'https://fyerssebi.netlify.app/.netlify/functions/netlifystockfyersticker/api/close'
const FYERSAPINSECSV = 'https://fyerssebi.netlify.app';

*/



export { API , FYERSAPI ,UPSTOXAPI, ICICDIRECTAPI , FYERSAPILOGINURL , FYERSAPINSECSV , FYERSAPITRADEBOOKURL ,FYERSAPIHOLDINGSURL ,
  FYERSAPICANCELORDER,FYERSAPIBUYORDER,FYERSAPISELLORDER
  ,FYERSAPIORDERBOOKSURL ,FYERSAPITICKERURL , FYERSAPITICKERURLCLOSE ,FYERSAPITICKERACCESTOKEN,FYERSAPITHREESECQUOTE,
  FYERSAPIMARKETFEEDRENDER , FYERSAPIMARKETCUSTOMFEED,FYERSAPIORDERSRENDER,FYERSAPIPOSITIONSRENDER,
  FYERSAPIPOSITIONBOOKURL, FYERSAPIMARKETFEEDRENDER_SOCKET,FYERSOPTIONCHAINWSSFEED,

  UPSTOXAPILOGINURL , TRADE_LOGIN_URL
};
