let fs = require("fs");

// let contents = fs.readFileSync("a.txt", "utf-8");
// console.log(contents);

// let data = fs.readFileSync("b.txt","UTF-8");    //synchronously
// console.log(data);

//asynchronously
function print(err,data){
    console.log(data);
}
fs.readFile("a.txt", "utf-8", print);

fs.readFile("b.txt","UTF-8",print);

console.log("done"); 
