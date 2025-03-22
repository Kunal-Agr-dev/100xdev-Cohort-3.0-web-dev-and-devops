function setTimeoutPromisified(ms){
    return new Promise((resolve) => (setTimeout(resolve,ms)));
}

//promise chaining
setTimeoutPromisified(1000).then(function(){
    console.log("hi (1 second has passed)");
    return setTimeoutPromisified(3000);
}).then(function(){
    console.log("Hi there (3 seconds have passed)");
    return setTimeoutPromisified(5000);
}).then(function(){
    console.log("Hello (5 seconds have passed)");
});
