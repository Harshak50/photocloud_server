
var cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
var cloudinary = require('cloudinary');
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors()); 
const router = express.Router();
const port = process.env.PORT||9000;






const  fetchImagesInCloudinary = async  (req,res)=> {
  await  cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key:process.env.API_KEY, 
        api_secret:process.env.API_SECRET,
        secure: true
      });

  var response =   await  cloudinary.v2.api.resources(
        function(error, result) {console.log(result, error); });
    if(response){
        return res.status(200).json(response);
    }    

}
fetchImagesInCloudinary()
router.get('/getAllImages',fetchImagesInCloudinary);
app.use(router);
app.listen(port,() => {
    console.log("Server is  running up and healthy");
  });

