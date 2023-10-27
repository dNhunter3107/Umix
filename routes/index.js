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

wincount = 0;
function getRandomNumber() {
    let probabilities = [0.35, 0.35, 0.3];
    if(wincount > 5) {
        probabilities = [0.475, 0.475, 0.05];
    }
  const randomNumber = Math.random();
  let cumulativeProbability = 0;

  for (let i = 0; i < probabilities.length; i++) {
    cumulativeProbability += probabilities[i];
    if (randomNumber < cumulativeProbability) {
      return i + 1; // Adding 1 to convert index to actual number (1, 2, or 3)
    }
  }

  // Default case (should not be reached with correct probabilities)
  return 1;
}

count3 = 0

function getWinnerOrLooser() {
  var check = getRandomNumber();
  if(check == 1) {
    return 'Principled'
  } else if(check == 2) {
    return 'Prankster'
  } else if(check == 3) {
    wincount++;
    return 'winner'
  }
}
// for (let i = 0; i < 1000; i++) {
//     const selectedNumber = getRandomNumber();
//     if(selectedNumber == 3) {
//         console.log(`3 selected Count: ${count3} - winner`);
//         count3++;
//         wincount++;
//         // if(wincount >= 5)
//         //     break
//     }
//     else {
//         // console.log(`3 selected Count: ${count3} - looser`);
//     }
        
// }
    // console.log(`3 selected Count: ${count3}`);



    
/* GET home page. */
router.get('/', function(req, res, next) {
  const type = getWinnerOrLooser();
  const folderPath = path.join(__dirname, `../public/images/${type}`); // Path to the folder containing images
  
  // console.log(folderPath)
  const randomImagePath = getRandomImageFromFolder(folderPath);
  // console.log(randomImagePath)

  const urlRedirect = '//localhost:3000/prank'
  // res.render('random-image', { imageUrl: randomImagePath });
  res.render('index', { title: 'Team 5: Principled' , urlRedirect:urlRedirect , code: generateRandomString(10), imageUrl:`images/${type}/`+randomImagePath, randomC: generateRandomString(10)});
});

router.get('/prank', function(req, res) {
  console.log('error')
  res.render("prank")
});

module.exports = router;
