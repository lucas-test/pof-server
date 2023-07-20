const { exec } = require('child_process');
const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    console.log("Get a request");

    let { title, max } = req.query; 
    console.log(title, max);
    if (max === "undefined"){
        max = "5";
    }

    exec("./pop8query --title " + title + "--max " + max, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error.message}`);
          res.send();
          return;
        }
        if (stderr) {
          console.error(`Command error: ${stderr}`);
          res.send();
          return;
        }
        

        // Set the response headers
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="data.csv"');

        // Send the command output as the response
        res.send(stdout);

      });


});

// Start the server
app.listen(6101, () => {
  console.log('Server is running localhost:6101');
});




