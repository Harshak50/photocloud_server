
var cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
var cloudinary = require('cloudinary');
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors()); 
const router = express.Router();
const port = process.env.PORT||9000;


const  fetchImagesInCloudinary = async  (req,res)=> {
    try {
  
  await  cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME, 
        api_key:process.env.API_KEY, 
        api_secret:process.env.API_SECRET,
        secure: true
      });

  var response =   await  cloudinary.v2.api.resources(
        function(error, result) {console.log(result, error); });
    if(response){
        return response;
    }    
          
} catch (error) {
       return console.log(error)
}

}
const getAllImages =  async(req,res)=>{
const response = await fetchImagesInCloudinary();
console.log(response)
return res.status(200).json(response);
}
router.get('/getAllImages',getAllImages);
app.use(router);


app.listen(port,() => {
    console.log("Server is  running up and healthy");
  });

