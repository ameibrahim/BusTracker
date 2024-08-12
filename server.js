// server.js
import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';
import { GeoJSON } from './GeoJSON.js';
import { features } from 'process';

const app = express();  
const PORT = 3000;
 
let coordinates = {
  lat: 35.2268056,
  lng: 33.3202778
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let roads = GeoJSON.features.filter(feature => feature.geometry.type === 'LineString');
let stops = GeoJSON.features.filter(feature => feature.geometry.type === 'Point');

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static(path.join(__dirname, 'public')));   

app.get('/', (req, res) => {
   res.render("index.ejs"); 
});  

 

app.get("/geo", (req, res) =>{
  const route1Stops = filterByRouteId(stops, 10); 
  res.json(route1Stops);
})

//Usage of WHEREISTHEISS API as a Dummy GPS
/*app.get('/track', async (req, res) => {
  try{
    const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    console.log("API response:", response.data.latitude);
    let latitude = response.data.latitude;
    let longitude = response.data.longitude;
    /*let coordinates = {
        lat: latitude,
        lng: longitude
      };
      res.render("index.ejs", { coordinates }); star backslash here
    res.json({lat: latitude, lng: longitude});

  } catch(error){
    console.error("Failed to make request:", error.message);
    throw error;
  } 
});*/

app.get('/track', async (req, res) => {
  try{
    const response = await axios.post("http://localhost:4000/locate");
    console.log(response.data);
    res.json(response.data);  
  }catch(err){
    console.log(err);
  }
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
 


async function getCoordinates(){
  try{
    const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    console.log("API response:", response.data);
    return response.data;
    
  } catch(error){
    console.error("Failed to make request:", error.message);
    throw error;
  }
}  

function filterByRouteId(data, routeId) {
  return data.filter(element => element.properties.route_id === routeId);
}