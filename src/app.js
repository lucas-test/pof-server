const { exec } = require('child_process');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    console.log("Request");

    let { title, max, yearMin, yearMax } = req.query; 
    console.log(title, max, yearMin, yearMax);
    if (yearMin == undefined){
      yearMin = "1800";
    }
    if (yearMax == undefined){
      yearMax = "2023";
    }
    if (max === undefined){
        max = "5";
    }

    if (title === undefined){
        console.log("No title");
        res.send();
        return;
    }

    const command = `./pop8query --title "${title}" --max ${max} --years ${yearMin}-${yearMax}`
    exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          res.send();
          return;
        }
        if (stderr) {
          console.error(`Command error: ${stderr}`);
        }
        

        // Set the response headers
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

        // Send the command output as the response
        const data = stdout;
        res.send(data);
      });
});

// Start the server
app.listen(6101, () => {
  console.log('Server is running localhost:6101');
});




