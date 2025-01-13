// CODIO SOLUTION BEGIN

const { readFile, writeFile } = require('fs').promises;
const path = require('path');

async function appendToJsonObject(filePath, newEntry) {
  try {
    // 1. Read the existing JSON file
    const data = await readFile(filePath, 'utf-8');
    let jsonData;

    try {
      jsonData = JSON.parse(data); 
    } catch (parseError) {
      console.error(`Error parsing JSON file: ${parseError}`);
      return; 
    }

    // 2. Append object and format file
    Object.assign(jsonData, newEntry);
    const updatedJson = JSON.stringify(jsonData, null, 2); // Indent for better readability

    // 3. Write the updated data back to the file
    await writeFile(filePath, updatedJson);
    console.log(`New entry appended to ${filePath}`);

  } catch (err) {
    console.error(`Error appending to JSON file: ${err}`);
  }
}

const filePath = path.resolve(__dirname, 'package.json');
const newEntry = {  "scripts": {
    "app_install": "rm -rf node_modules && npm install",
    "client": "npm start --prefix client",
    "server": "nodemon server/server.js",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
};

appendToJsonObject(filePath, newEntry);

// CODIO SOLUTINO END

