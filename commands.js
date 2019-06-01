//import fs library
const fs = require('fs');

//write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

// where we will store our commands
function evaluateCmd(userInput){
    var line;
    var command
    // parses the user input to understand which command was typed
    const userInputArray = userInput.split(" ");
    if(userInputArray .length == 2){
        console.log("if")
         command = userInputArray[0]; 
         line = 10; 
    }else{
        console.log("else1");
         command = userInputArray[0]; 
         line = userInputArray[1]; 
    }
    console.log(command);
    console.log(line);
    
    if(command == "tail"){
        if(line == 10){
            console.log("hello")
            console.log(userInputArray.slice(1))
            commandLibrary.tail(userInputArray.slice(1),line);
        }else{
            console.log("else")
            commandLibrary.tail(userInputArray.slice(2),line);
        }
        
    }else{
        process.stdout.write('Typed command is not accurate');
    }
}

const commandLibrary = { 
    "tail": function (fullPath,line){
        console.log(fullPath);
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
            if (err) throw err;
            var text = data.toString('utf8');
            var slicedText = text.split('\n').slice(-line).join('\n');
            var bufferText = Buffer.from(slicedText, 'utf8');
            done(bufferText);
        })
    }
};