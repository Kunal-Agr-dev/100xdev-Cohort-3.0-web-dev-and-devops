//Promisified version of setTimout()  

function setTimeoutPromisified(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));    //instead of this u can use the down one 
                                                               // both are same
}

// function setTimeoutPromisified(ms){
//   return new Promise(function(resolve){
//     setTimeout(resolve,ms);
//   });
// }

function callback() {
  console.log("3 seconds have passed");
}
setTimeoutPromisified(3000).then(callback);

