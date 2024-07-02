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
// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let roads = GeoJSON.features.filter(feature => feature.geometry.type === 'LineString');
let stops = GeoJSON.features.filter(feature => feature.geometry.type === 'Point');

// Set EJS as the view engine
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views')); 

app.use(express.static(path.join(__dirname, 'public')));   

app.get('/', (req, res) => {
  /*res.render("index.ejs", { coordinates,
    itinerary: roads[0],
   });*/
   //res.render("leaflet.ejs"); 
   res.render("index.ejs"); 
});  

 

app.get("/geo", (req, res) =>{
  const route1Stops = filterByRouteId(stops, 10); 
  res.json(route1Stops);
})



app.get('/track', async (req, res) => {
  try{
    const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    console.log("API response:", response.data.latitude);
    let latitude = response.data.latitude;
    let longitude = response.data.longitude;
    /*let coordinates = {
        lat: latitude,
        lng: longitude
      };
      res.render("index.ejs", { coordinates });  */
    res.json({lat: latitude, lng: longitude});

  } catch(error){
    console.error("Failed to make request:", error.message);
    throw error;
  } 
});




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