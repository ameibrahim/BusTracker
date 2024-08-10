import express from "express";
import axios from "axios";
import env from "dotenv";

const app = express();
const port = 4000;
env.config();

const email = process.env.EMAIL;
const password = process.env.PASSWORD;
const deviceID = process.env.DEVICE_ID;
let token;

async function getAuthenticationToken(){
    try{
        const response = await axios.post(`https://connect.paj-gps.de/api/v1/login?email=${email}&password=${password}`);
        //console.log(response.data.success);
        return response.data.success.token;
    }catch(err){
        console.log(err);
    }
}
async function getLastLocation(token){
    const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    try{
        const response = await axios.get(`https://connect.paj-gps.de/api/v1/trackerdata/${deviceID}/last_points?lastPoints=lastPoints&gps=0&sort=desc` , config);
        //console.log(response.data.success[0]);
        let lastLocation = {
            lat: response.data.success[0].lat,
            lng: response.data.success[0].lng
        }
        return lastLocation;
    }catch(err){
        console.log(err);
    }
}

app.post("/locate", async (req, res)=>{
    token = await getAuthenticationToken();
    //console.log(token);
    const busLocation = await getLastLocation(token);
    res.json(busLocation);
    
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});