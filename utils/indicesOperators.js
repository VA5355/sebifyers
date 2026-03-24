
 export const localISTDateTimeSec = (inStr) => {
            const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      let  utcDate = new Date();
      try{ 
         if (inStr && inStr !== "null" && inStr !== "undefined") {
            utcDate = new Date(inStr);
           }
                  // If invalid date, fallback to now
        if (!(utcDate instanceof Date) || isNaN(utcDate.getTime())) {
          console.warn("⚠ Invalid date received, using current time:", inStr);
          utcDate = new Date();
        }
     
       }catch(derr){
        utcDate = new Date();
        console.log("ticker time no present, current used ")
       }
    const istTime = new Intl.DateTimeFormat('en-GB', options).format(utcDate);
      return istTime;

   }


 export const setSensex = (tickQuote,tickerMap) => { 
        let el = document.getElementById(SENSEXTICKERDOMID);  // GLOBAL DOM ID sensex-status
        let tickerData = tickQuote;
            const nifty =  (  tickerMap !==null && tickerMap !==undefined &&  tickerMap["BSE:SENSEX-INDEX"] !== undefined)  ? tickerMap["BSE:SENSEX-INDEX"] : tickQuote;
         let {ltp1 , type1 } = tickQuote;
         let {ltp , type } = nifty !== undefined  ? nifty : tickQuote;
        let sym = 'SENSEX-INDEX';  // tickerData["symbol"];
        let price = ltp //  tickerData["lp"];
        
            let time =  localISTDateTimeSec(type) ;// localISTDateTimeSec(tt)//tickerData["tt"]
        sensexQue.push({time:time, price :price});
            console.log('time '+JSON.stringify(time) + "price  "+ price);  
        //  updateBestMatches1(sensexQue);
        console.log("tick  "+JSON.stringify( { sym , price, time  }))
        if(el !==null && el !== undefined){
        // el.textContent = time + " :: "+ sym +" :: "+ price;
            let timeEl = document.getElementById(SENSEXTICKERTIME);
            if(timeEl !==null && timeEl !== undefined){
            timeEl.textContent = time ;
            }
            // SKIPPED AS the HEADING DIV CLARIFY the SYMBOL
            /*let symbolEl = document.getElementById(SENSEXTICKERSYMBOL);
            if(symbolEl !==null && symbolEl !== undefined){
                symbolEl.textContent =   sym ;
            }*/
            // update price and color based on previus price 
        let priceSpan = document.getElementById(SENSEXTICKERPRICE);
            if(priceSpan !==null && priceSpan !== undefined){
            
                 //   priceElement.textContent = price;
                // ALL GOOD SAVE the INDICE into CACHE 
                 let  s = "BSE:SENSEX-INDEX";
                  let priceElement = document.getElementById(SENSEXTICKERPRICE);
                  let  newPrice = parseFloat(price);
                   setNewSENSEXPrice(  newPrice ); // = newPrice;
                  previousPrice = previousSENSEXPrice;
                    if (!isNaN(newSENSEXPrice)) {
                      if (previousSENSEXPrice !== null) {
                        if (newSENSEXPrice > previousSENSEXPrice) {
                            setColorSENSEXClass("bg-green-100 text-green-800"); // price up
                          priceElement.style.backgroundColor= 'green'; //  banknifty-price
                           priceElement.style.color ='white';
                            console.log('Sensex  gree price  '+ newPrice.toFixed(2));  
                             console.log('Sensex  gree price  '+  newPrice.toFixed(2));  
                              console.log('Sensex  gree price  '+  newPrice.toFixed(2));  

                        } else if (newSENSEXPrice < previousSENSEXPrice) {
                           setColorSENSEXClass("bg-red-100 text-red-800"); // price down
                            priceElement.style.backgroundColor= 'red';
                            priceElement.style.color ='white';
                             console.log('Sensex  red  price  '+  newPrice.toFixed(2));  
                              console.log('Sensex  red  price  '+  newPrice.toFixed(2));  
                               console.log('Sensex  red  price  '+  newPrice.toFixed(2));  

                        } else {
                          setColorSENSEXClass("bg-gray-100 text-black"); // no change
                        }
                      }
                        // {tickerMap['BSE:SENSEX-INDEX'].ltp}  used in Position Grid - to show the data.
                    //  priceElement.textContent = newPrice.toFixed(2); // display with 2 decimal places
                      setPreviousSENSEXPrice(  newPrice); // = newPrice;
                    }
                // the bellow causes race and some nifty printed for sensex , jumblling 
                 //   updatePriceFromStream(price, s);
                 StorageUtils._save(CommonConstants.currentSensexDataCacheKey,JSON.stringify({ s , price, time  }));
                     //updatePriceFromStream( price,SYMBOL);

            // SKIPPED FOR NOW 
            // updatePriceFromStream( price, SYMBOL);
            }
        }
  }
    export const setNifty = (tickQuote,tickerMap) => { 
        let el = document.getElementById(NIFTYTICKERDOMID);  // GLOBAL DOM ID sensex-status
        let tickerData = tickQuote;
        const nifty =  (  tickerMap !==null && tickerMap !==undefined &&  tickerMap["NSE:NIFTY50-INDEX"] !== undefined)  ? tickerMap["NSE:NIFTY50-INDEX"] : tickQuote;
         let {ltp1 , type1 } = tickQuote;
         let {ltp , type } = nifty !== undefined  ? nifty : tickQuote;
        let sym = 'NIFTY-INDEX';  // tickerData["symbol"];
        let price = ltp //  tickerData["lp"];
        
            let time =  localISTDateTimeSec(type) ;// localISTDateTimeSec(tt)//tickerData["tt"]
        niftyQue.push({time:time, price :price});
            console.log('time '+JSON.stringify(time) + "price  "+ price);  
        //  updateBestMatches1(niftyQue);
        console.log("tick  "+JSON.stringify( { sym , price, time  }))
        if(el !==null && el !== undefined){
        // el.textContent = time + " :: "+ sym +" :: "+ price;
            let timeEl = document.getElementById(NIFTYTICKERTIME);
            if(timeEl !==null && timeEl !== undefined){
            timeEl.textContent = time ;
            }
            // SKIPPED AS the HEADING DIV CLARIFY the SYMBOL
            /*let symbolEl = document.getElementById(SENSEXTICKERSYMBOL);
            if(symbolEl !==null && symbolEl !== undefined){
                symbolEl.textContent =   sym ;
            }*/
            // update price and color based on previus price 
        let priceSpan = document.getElementById(NIFTYTICKERPRICE);
            if(priceSpan !==null && priceSpan !== undefined){
                 
                   // priceElement.textContent = price;
                       let  s = "NSE:NIFTY50-INDEX";
                  let priceElement2 = document.getElementById(NIFTYTICKERPRICE);
                  let  newPrice = parseFloat(price);
                    setNewNIFTYPrice(  newPrice ); // = newPrice;
                  previousPrice = previousNIFTYPrice;
                    if (!isNaN(newNIFTYPrice)) {
                      if (previousNIFTYPrice !== null) {
                        if (newNIFTYPrice > previousNIFTYPrice) {
                            setColorNIFTYClass("bg-green-100 text-green-800"); // price up
                                priceElement2.style.backgroundColor= 'green'; //  banknifty-price
                           priceElement2.style.color ='white';
                        } else if (newNIFTYPrice < previousNIFTYPrice) {
                           setColorNIFTYClass("bg-red-100 text-red-800"); // price down
                            priceElement2.style.backgroundColor= 'red';
                            priceElement2.style.color ='white';
                        } else {
                            setColorNIFTYClass("bg-gray-100 text-black"); // no change
                        }
                      }
                      //  {tickerMap['NSE:NIFTY50-INDEX'].ltp}
                     // priceElement2.textContent = newNIFTYPrice.toFixed(2); // display with 2 decimal places
                     // previousNIFTYPrice = newPrice;
                       setPreviousNIFTYPrice( newPrice);
                    }


                //          updatePriceFromStream(price, s);
                  StorageUtils._save(CommonConstants.currentNiftyDataCacheKey,JSON.stringify({ s , price, time  }));
            // SKIPPED FOR NOW 
            // updatePriceFromStream( price, SYMBOL);
            }
        }
  }
    export const setBankNifty = (tickQuote,tickerMap) => { 
        let el = document.getElementById(BANKNIFTYTICKERDOMID);  // GLOBAL DOM ID BANKNIFTY-status
        let tickerData = tickQuote;
         const nifty =  (  tickerMap !==null && tickerMap !==undefined &&  tickerMap["NSE:BANKNIFTY-INDEX"] !== undefined)  ? tickerMap["NSE:BANKNIFTY-INDEX"] : tickQuote;
         let {ltp1 , type1 } = tickQuote;
         let {ltp , type } = nifty !== undefined  ? nifty : tickQuote;
        let sym = 'BANKNIFTY-INDEX';  // tickerData["symbol"];
        let price = ltp //  tickerData["lp"];
        
            let time =  localISTDateTimeSec(type) ;// localISTDateTimeSec(tt)//tickerData["tt"]
        bankNiftyQue.push({time:time, price :price});
            console.log('time '+JSON.stringify(time) + "price  "+ price);  
        //  updateBestMatches1(bankNiftyQue);
        console.log("tick  "+JSON.stringify( { sym , price, time  }))
        if(el !==null && el !== undefined){
        // el.textContent = time + " :: "+ sym +" :: "+ price;
            let timeEl = document.getElementById(BANKNIFTYTICKERTIME);
            if(timeEl !==null && timeEl !== undefined){
            timeEl.textContent = time ;
            }
            // SKIPPED AS the HEADING DIV CLARIFY the SYMBOL
            /*let symbolEl = document.getElementById(BANKNIFTYTICKERSYMBOL);
            if(symbolEl !==null && symbolEl !== undefined){
                symbolEl.textContent =   sym ;
            }*/
            // update price and color based on previus price 
        let priceSpan = document.getElementById(BANKNIFTYTICKERPRICE);
            if(priceSpan !==null && priceSpan !== undefined){
                let  s = "NSE:NIFTYBANK-INDEX";
                //     updatePriceFromStream(price, s);
                  //  priceElement.textContent = price;
                 let priceElement3 = document.getElementById(BANKNIFTYTICKERPRICE);
                  let  newPrice = parseFloat(price);
                  setNewBankNIFTYPrice(  newPrice ); // = newPrice;
                  previousPrice = previousBankNIFTYPrice;
                    if (!isNaN(newBankNIFTYPrice)) {
                      if (previousBankNIFTYPrice !== null) {
                        if (newBankNIFTYPrice > previousBankNIFTYPrice) {
                           setColorBankNIFTYClass("bg-green-100 text-green-800"); // price up
                                  priceElement3.style.backgroundColor= 'green'; //  banknifty-price
                           priceElement3.style.color ='white';
                       } else if (newBankNIFTYPrice < previousBankNIFTYPrice) {
                           setColorBankNIFTYClass("bg-red-100 text-red-800"); // price down
                              priceElement3.style.backgroundColor= 'red';
                            priceElement3.style.color ='white';
                        } else {
                          setColorBankNIFTYClass("bg-gray-100 text-black"); // no change
                        }
                      }
                     //  {tickerMap['NSE:NIFTYBANK-INDEX'].ltp}  used in Position Grid - to show the data.
                     // priceElement3.textContent = newBankNIFTYPrice.toFixed(2); // display with 2 decimal places
                     // previousBankNIFTYPrice = newPrice;
                       setPreviousBankNIFTYPrice( newPrice);
                    }
     
                     StorageUtils._save(CommonConstants.currentBankNiftyDataCacheKey,JSON.stringify({ s , price, time  }));
            // SKIPPED FOR NOW 
            // updatePriceFromStream( price, SYMBOL);
            }
        }
  }

