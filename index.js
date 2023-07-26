import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const yourUsername = "abcd";
const yourPassword = "12345";
const yourAPIKey = "cb6440e1-41b5-4c91-8c13-50311b4a475f";
const yourBearerToken = "ef4609de-b728-4c58-b662-8a5f4d58e143";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth",async (req, res) => {
  m

    try {
      const result = await axios.get(API_URL+"/random");
     res.render("index.ejs", {data: JSON.stringify(result.data), 
      }); 
     
     } catch (error) {
      res.status(404).send(error.message);
    }
});

app.get("/basicAuth", async (req, res) => {
 
   try{
  const result = await axios.get(
    API_URL+"/all?page=2",{
      auth: {
        username: 'abcd',
        password: '12345',
      },
    },
  );
  
  res.render("index.ejs",{data:JSON.stringify(result.data),});
   }
   catch (error) {
    res.status(404).send(error.message);
}});

app.get("/apiKey", async (req, res) => {
  
try{

        const result= await axios.get(API_URL+"/filter",{
                    params:{
                          score:5,
                          apiKey:'cb6440e1-41b5-4c91-8c13-50311b4a475f',
                    },
        },
        );
        res.render("index.ejs",{data:JSON.stringify(result.data)});

}
catch(error){
  res.status(404).send(error.message);
}
});

app.get("/bearerToken",async (req, res) => {
 
  const token='ef4609de-b728-4c58-b662-8a5f4d58e143';
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
    try{
    
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs",{data:JSON.stringify(result.data)});
    }
    catch(error){
      res.status(404).send(error.message);

    }


  
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
