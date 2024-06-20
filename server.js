// server.js
import express from 'express';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

let coordinates = {
  lat: 35.2268056,
  lng: 33.3202778
};
// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render("index.ejs", { coordinates });
});

app.get('/track', async (req, res) => {
  try{
    const response = await axios.get("https://api.wheretheiss.at/v1/satellites/25544");
    console.log("API response:", response.data.latitude);
    let latitude = response.data.latitude;
    let longitude = response.data.longitude;
    let coordinates = {
        lat: latitude,
        lng: longitude
      };
      res.render("index.ejs", { coordinates });  

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