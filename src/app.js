const { exec } = require('child_process');
const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    console.log("Get a request");

    const { title } = req.query; // put { title, attr2 } if other attributes
    console.log(title);

    exec("./pop8query --title " + title + " output.csv", (error, stdout, stderr) => {
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




