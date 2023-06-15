// -------To read data from db.json
const fs = require("fs/promises")

// readData() is a promise as fs.readFile() is a promise which is getting returned to it's parent so will need to resolve it while calling it in the app.get()
function readData(){
    return fs.readFile("db.json", "utf-8")
    .then((data)=>{
        // readFile reads the array/JSON object{} from the db.json in string format so to return in JSON form we do JSON.parse
        // and data.toString() for safety so that a string is converted to JSON as JSON parsing can throw error if string is not proper
        return JSON.parse(data.toString())
    })
}

module.exports = {
    // readData: readData
    // same key same value shortcut 
    readData
}