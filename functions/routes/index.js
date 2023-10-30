
const path = require('path');

var express = require('express');
var router = express.Router();
var app = express();
app.use("/static", express.static(path.join(__dirname, 'public')))

var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
const util = require('./utils');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();


    
/* GET home page. */
router.get('/', function(req, res, next) {
  // get the winner
  let randomNumber = util.getRandomNumber();
  const type = util.getWinnerOrLooser(randomNumber);
  const folderPath = path.join(__dirname, `../public/images/${type}`); // Path to the folder containing images
  const randomImagePath = util.getRandomImageFromFolder(folderPath);
  console.log(res);
  //default is prank
  let urlRedirect = '//localhost:3000/prank';
  // randomNumber = 3
  if(randomNumber == 3) {
    try{
        // const winnerRef = db.collection("winners");
        // winnerRef.get().then(response => {
          
        //   console.log(response.docs[0].data().url)
        //   const requiredUrl  = response.docs[0].data().url
        //   res.render('index', { title: 'Team 5: Principled' , urlRedirect:requiredUrl ,  imageUrl:`images/${type}/`+randomImagePath});      
        // });
        const winnerRef = db.collection("winners");
        winnerRef.where("active", "==", true).limit(1).get()
          .then(querySnapshot => {
            if (!querySnapshot.empty) {
              console.log(querySnapshot.docs[0].data())
              const requiredUrl = querySnapshot.docs[0].data().url;
              res.render('index', { title: 'Team 5: Principled', urlRedirect: requiredUrl, type: 'Principled Prankster', imageUrl: `images/${type}/` + randomImagePath });
            } else {
              res.render('index', { title: 'Team 5: Principled', urlRedirect: urlRedirect, type: type, imageUrl: `images/${type}/` + randomImagePath });
            }
          })
          .catch(error => {
            console.log(error);
            // handle error
          });
      
        // console.log(data[0].data)
        // return data;
      } catch(error) {
        console.log(error)
      }
  }
  else {
    res.render('index', { title: 'Team 5: Principled' , urlRedirect:urlRedirect , type: type, imageUrl:`images/${type}/`+randomImagePath});
  }
  
  // console.log(folderPath)
  // console.log(randomImagePath)


  // const filePath = 'testjson.json';
  // let jsonData
  // try {
  //   const data = fs.readFileSync(filePath, 'utf8');
  //   jsonData = JSON.parse(data);
  //   // console.log(jsonData);
    
  //   // t = jsonData
  // } catch (err) {
  //   console.error(err);
  //   return;
  // }
  // urlRedirect = jsonData[1]['url']
  // console.log(urlRedirect)

  // res.render('random-image', { imageUrl: randomImagePath });
});

router.get('/prank', function(req, res) {
  console.log('error')
  res.render("prank")
});


// router.get('/json', function(req, res) { 
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     const jsonData = JSON.parse(data);
//     console.log(jsonData);
//     res.render("prank")
    
//     return jsonData
//   });
// });


// npm install firebase
  // ```

// 2. Import the Firebase SDK in your Node.js script:

  // ```javascript
  // const { initializeApp } = require('firebase-admin/app');
  // const app = initializeApp();




  // const firebase = require('firebase/app');
  // const db = require('firebase/database');
  // ```

// 3. Initialize the Firebase app with your Firebase project configuration:

  // ```javascript

  // const firebase = require('firebase');


//   const firebaseConfig = {
//     apiKey: "AIzaSyDta60fh38P_ZvQCG-8v7n0pDHC-oJz2ZM",
//     authDomain: "umixo-e8a6a.firebaseapp.com",
//     projectId: "umixo-e8a6a",
//     storageBucket: "umixo-e8a6a.appspot.com",
//     messagingSenderId: "370213188652",
//     appId: "1:370213188652:web:fa30feea7ab1a18e39cd89"
//   };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// var app = firebase.getapp();
// console.log(app);


// var getDatabase = require("firebase-admin/database")





// const data = {
//   'email': 'jay.singh@highradius.com',
//   'name': 'Jay Kishan Singh'
// }
// // db.collection("users").add(data)

//  function getFirstData() {
// try{
//   const userRef = db.collection("winners");
//   userRef.get().then(response => {
//     responseArray = []
//     response.forEach(doc => {
//       console. log(doc.data()) 
//       responseArray.push(doc.data())
//     })
//     return responseArray;
//   });

//   // console.log(data[0].data)
//   // return data;
// } catch(error) {
//   console.log(error)
// }
// }

// console.log( getFirstData())


  // ```

  // db.

// 4. Get a reference to your Firebase database:

  // ```javascript
  // const database = firebase.database
  // ```

// 5. Use the `database` object to read and write data to your Firebase database. For example, to write data to a Firebase database, you can use the `set()` method:

  // ```javascript
  // database.ref('users/123').set({
  //   name: 'John Doe',
  //   email: 'john.doe@example.com',
  // });
  // ```

  // And to read data from a Firebase database, you can use the `once()` method:

  // ```javascript
  // database.ref('users/123').once('value').then((snapshot) => {
  //   const user = snapshot.val();
  //   console.log(user);
  // });
  // ```

// Here's an example of how you can use Firebase database in your existing code:

// import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration


// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);


// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

// console.log(getCities())
module.exports = router;
