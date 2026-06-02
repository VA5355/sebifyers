import express, { json, urlencoded } from "express";
import routes from './routes.mjs';
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
 //let routes = routes1(app);
app.use("/api",routes )
 //process.env.PORT
app.listen(5115, () => {
  console.log("listening on port " + 5115);//process.env.PORT
});

app.get("/", async (req, res) => {
  // const result=await sendMail();
  res.send("Onedinaar user registeration for Fyers with NodeJS");
});

export default app

/**
 curl   http://localhost:8000/api/mail/write -H 'Content-Type:application/json'  -d "{\"email\":\"aadflaereg@gmail.com\"}"
 
  curl -i -X   POST  http://localhost:8000/api/mail/write -H 'Content-Type:application/json'  -d "{\"email\":\"aadflaereg@gmail.com\"}"

  curl -i -X   POST -H 'Content-Type:application/json'  -d "{\"email\": \"aadflaereg@gmail.com\" }"  http://localhost:8000/api/mail/write 

  THIS WORKED
  curl -H "Content-Type: application/json" -X POST  http://localhost:8000/api/mail/write -d "{\"Name\":\"Test Value\"}"
  THIS ALSO WORKED 
  curl -H "Content-Type: application/json" -X POST  http://localhost:8000/api/mail/write -d "{\"email\":\"re@fr.com\"}"

 curl -i -X POST -H "Content-Type:application/json" -d "{\"firstName\": \"Frodo\",  \"lastName\" : \"Baggins\" }" http://localhost:8080/people
 */
 /* 
  SETTIMEOUT  EXACT TEN TIMES 

  https://stackoverflow.com/questions/69241772/get-returned-items-from-function-inside-settimeout-in-javascript

          function myFunc(num) {
            return `Number: ${num}`;
          }
  

        function loop(theNum = 0) {
          if (theNum < 10) {
            console.log(myFunc(theNum));
            setTimeout(loop, 500, ++theNum);
          } else {
            console.log("All done");
          }
        }

        loop();





  GET VALUE OUT OF TIME OUT using PROMISE and async / await 
  
  https://stackoverflow.com/questions/24928846/get-return-value-from-settimeout


  function x() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
       resolve('done!');
      });
     });
  }
  x().then((done) => {
    console.log(done); // --> 'done!'
  });

 */