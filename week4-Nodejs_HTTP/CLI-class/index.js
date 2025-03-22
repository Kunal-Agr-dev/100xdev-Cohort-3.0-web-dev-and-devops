const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
    .name('Counter')
    .description('Cli to do file based task')
    .version('0.8.0');

program.command('count')
    .description('Command to count number of words in the file')
    .argument('<file>','string to count')
    .option('-l','count the number of lines in the file')
    .option('-c','count the numbe of charactor in the file')
    .action((file,option) => {
        fs.readFile(file,'utf8', (err,data) => {
            if(err){
                console.log("Error");
            }else{
                if(option.l){
                    const ans = data.split('\n').length; //here when spliting an extra line is considered that is end of the text so we print ans -1
                    console.log(ans-1);
                }
                else if(option.c){
                    const ans = data.length;
                    console.log(ans);
                }
                else{
                    const ans = data.split(' ').length;
                    console.log(ans);
                }
            }
        });
    });

program.parse();















// function main(filepath){
//     fs.readFile(filepath,"UTF-8",function(err,data){
//         if(err){
//             console.log("Error");
//         }
//         else{
//             let total = 0;
//             for(let i=0;i < data.length;i++){
//                 if(i == ' ')
//                     total++;
//             }                
//         }
//         console.log(total+1);
//     });
// }
// // main(process.agrv[2]);
// let value = Date.now();
// console.log(`dadansdasjda ${value} asdadasd`);//new way i got to know now

