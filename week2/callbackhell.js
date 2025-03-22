setTimeout(() => {
    console.log("HI");
    setTimeout(() => {
        console.log("HELLO");
        setTimeout(() => {
            console.log("HELLO THERE");
        },5000);
    },3000);
},1000);

//this is callback hell we use promisified version of setTimeout to remove call back hell 
//abhi mei nhi kar raha promise kyuki first i will have to develop mei brain in js and practise more then i will
//be capable of doing so