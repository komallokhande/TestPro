
const commands = require('./commands.js');
const express = require('express');
const app = express();
const fs = require('fs');

port=3000;

process.stdin.on('data', (userInput) => {
    userInput = userInput.toString().trim();
    evaluateCmd(userInput);
}); 


function evaluateCmd(userInput){
    var line;
    var command
    const userInputArray = userInput.split(" ");
    command = userInputArray[0]; 
    if(command == "tail"){
        if(userInputArray.length == 2){
            line = 10;
            commandLibrary.tail(userInputArray.slice(1),line); 
       }else{
            line = userInputArray[1]; 
            commandLibrary.tail(userInputArray.slice(2),line);
       } 
    }else{
        process.stdout.write('Typed command is not accurate');
    }
}

const commandLibrary = { 
    "tail": function (fullPath,line){
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            var text = data.toString('utf8');
            var slicedText = text.split('\n').slice(-line).join('\n');
            var bufferText = Buffer.from(slicedText, 'utf8');
            process.stdout.write(bufferText);
            displayData(slicedText);
            process.stdout.write('\nprompt > '); 
        })
    }
};

function displayData(data) {
    app.get('', (req, res) => {
        res.send(data);
    });
}

eventType="change"
fs.watch('./test.txt', (eventType) => {
    fs.readFile('./test.txt', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log('***file has been changed***');
          console.log(data);
        }
      })
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  process.stdout.write('prompt > ');
})