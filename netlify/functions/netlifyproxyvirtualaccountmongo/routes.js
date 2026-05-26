import { Router } from 'express';

 

import { register ,registerUser } from './controllers.mjs'; 
/*const router1 = function (params) {  if(params!==undefined) { let app =  express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    ; return express.Router()  }else  {  return express.Router() } } ;
    let app =  express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true })); */
 const router  = Router()
 
//router.post('/register', register);
//router.post('/mail/write/compose', controllers.writeEmailFromInput);
//export default router;
function withTimeout(promise, ms = 25000) {
  return Promise.race([
    promise,
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          timeout: true
        });
      }, ms);
    })
  ]);
}

export default function(dbConnection) {
   
    /*  THIS MAY CAUSE FUNCTION to CRASH 
    const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
        reject(new Error("SERVER_BUSY"));
    }, 20000);
});*/
    // Use the specific connection to get a model
   //  const User = dbConnection.model('User', require('../models/UserSchema'));
 /*
    router.post('/register', async (req, res) => {
            try { 
          //  return register(req, res,dbConnection)
            return await Promise.race([
                register(req, res,dbConnection),
                timeoutPromise
                ]);
            }
            catch(err){
                 console.error("Registration Error:", err);

                if (err.message === "SERVER_BUSY") {
                    return {
                        statusCode: 503,
                        body: JSON.stringify({
                            success: false,
                            code: "SERVER_BUSY",
                            message: "Server registrations are currently at peak. Please retry after some time."
                        })
                    };
                }

                return {
                    statusCode: 500,
                    body: JSON.stringify({
                        success: false,
                        code: "SERVER_ERROR",
                        message: "Unable to process registration right now."
                    })
                };
            }
    });*/
    router.post('/register', async (req, res) => {
       try {
            if (req.method === "OPTIONS") {

                res.headers.set("Access-Control-Allow-Origin", "*");
                res.headers.append("Access-Control-Allow-Headers", "*");
                res.headers.append("Access-Control-Allow-Methods", "*");
                 res.statusCode = 204; // No Content
                  res.end();
            }
            const result = await withTimeout(
            registerUser(req.body , dbConnection),
            25000
            );

            /**
             * SAFE TIMEOUT RESPONSE
             */
            if (result?.timeout) {

            return res.status(503).json({
                success: false,
                code: "SERVER_BUSY",
                message:
                "Server registrations are at peak. Please retry registration after some time."
            });

            }

            return res.status(200).json({
            success: true,
            data: result
            });

        } catch (err) {

            console.error("REGISTER ERROR", err);

            return res.status(500).json({
            success: false,
            code: "SERVER_ERROR",
            message: err.message || "Internal server error"
            });

        }
    });

    return router;
};
