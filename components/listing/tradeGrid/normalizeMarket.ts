export function normalizeMarket(data: any) {
  if (!data) return {};

  // NSE format
  if (data.source === "NSE") {
   // const list = data.data?.data || [];
 const list = data.data || [];
    return {
      nifty: list.find((i: any) => i.index === "NIFTY 50"),
      banknifty: list.find((i: any) => i.index === "NIFTY BANK"),
      sensex: list.find((i: any) => i.index === "SENSEX")
    };
  }

  // Yahoo format
  if (data.source === "YAHOO") {
    const list = data.data?.quoteResponse?.result || [];
      
    let yahooList = {};
   try {
         if(list !==undefined && Array.isArray(list) && list.length > 0){


            yahooList =  {
                nifty: list.find((i: any) => i.symbol === "^NSEI"),
                banknifty: list.find((i: any) => i.symbol === "^NSEBANK"),
                sensex: list.find((i: any) => i.symbol === "^BSESN")
              };


         }




   }catch (erer){

        console.log("normalising yahoo indices faces issues "+ JSON.stringify(erer));


   }




    return  yahooList;
  }

  return {};
}

/**
{"key":"INDICES ELIGIBLE IN DERIVATIVES","index":"NIFTY 50","indexSymbol":"NIFTY 50","last":22713.1,"variation":33.7,"percentChange":0.15,"open":22383.4,
"high":22782.3,"low":22182.55,"previousClose":22679.4,"yearHigh":26373.2,"yearLow":21743.65,"indicativeClose":0,"pe":"19.96","pb":"3.1","dy":"1.37",
"declines":"26","advances":"24","unchanged":"0","perChange365d":-2.31,"perChange30d":-8.66,"date365dAgo":"26-Mar-2025","date30dAgo":"24-Feb-2026",
"previousDay":"27-Mar-2026","oneWeekAgo":"20-Mar-2026","oneMonthAgoVal":25424.65,"oneWeekAgoVal":23114.5,"oneYearAgoVal":23486.85,
"previousDayVal":22819.6,"chart365dPath":"https://nsearchives.nseindia.com/365d/NIFTY-50.svg","chart30dPath":"https://nsearchives.nseindia.com/30d/NIFTY-50.svg",
"chartTodayPath":"https://nsearchives.nseindia.com/today/NIFTY-50.svg"} 




 */
