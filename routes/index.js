const fs = require('fs');
const path = require('path');

var express = require('express');
var router = express.Router();
var app = express();
app.use("/static", express.static(path.join(__dirname, 'public')))

/** Random string genrator */
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }
  return randomString; 
}

// Example usage:
// const randomString = generateRandomString(10); // Generates a random string with a length of 10 characters
// console.log(randomString);

/** Random image fetch */


function getRandomImageFromFolder(folderPath) {
  // Get the list of files in the folder
  const files = fs.readdirSync(folderPath);

  // Select a random file from the list
  const randomIndex = Math.floor(Math.random() * files.length);
  const randomImage = files[randomIndex];

  console.log("RandomImage = " + randomImage);

  // Return the path to the random image
  console.log(randomImage)
  return randomImage 
  // return path.join(folderPath, randomImage);
}

// Example usage:


// console.log('Random Image Path:', randomImagePath);


/* GET home page. */
router.get('/', function(req, res, next) {
  const folderPath = path.join(__dirname, '../public/images'); // Path to the folder containing images
  
  // console.log(folderPath)
  const randomImagePath = getRandomImageFromFolder(folderPath);
  // console.log(randomImagePath)

  // res.render('random-image', { imageUrl: randomImagePath });
  res.render('index', { title: 'Team 5: Principled'  , imageUrl:'images/'+randomImagePath, randomC: generateRandomString(10)});
});

module.exports = router;
