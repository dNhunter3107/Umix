const fs = require('fs');

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
let wincount = 0;
function getRandomNumber() {
    let probabilities = [0.35, 0.35, 0.3];
    if (wincount > 5) {
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

function getWinnerOrLooser(check) {
    if (check == 1) {
        return 'Principled'
    } else if (check == 2) {
        return 'Prankster'
    } else if (check == 3) {
        wincount++;
        return 'winner'
    }
}

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

const getWinningUrl = function () {
    const filePath = 'testjson.json';

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const jsonData = JSON.parse(data);
        // console.log(jsonData);
        return jsonData
    });
}

module.exports = { getWinnerOrLooser, getRandomImageFromFolder, getRandomNumber }