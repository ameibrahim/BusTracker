import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
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