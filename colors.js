const data = require('./data.json');
const fs = require('fs');

var colours = []

console.log("\nSetting Colours...\n");

fs.readFile('./data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return
    }
   
    var data = JSON.parse(jsonString);
    data.forEach(element => {
        fs.appendFileSync('colors-text.txt', "\"color add " + element.name + " " + element.hexString + "\",\n");
    });

})

console.log("\n------------------------------\n");
process.on('SIGINT', function() {
    console.log("ok.");
    process.exit();
});