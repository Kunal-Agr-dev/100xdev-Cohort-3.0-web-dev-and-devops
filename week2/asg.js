//creating pormisified version of read file

const fs = require("fs");

function readTheFile(resolve){
    fs.readFile("a.txt","UTF-8",function(err,data){
        resolve(data);
    })
}

// function readFile(filename){
//     return new Promise(readTheFile);
// }
function callback(contents)
{
    console.log(contents);
}

const p = new Promise(readTheFile);   // without using the function //if u want to use function then --> const p= readFile();
p.then(callback);                   