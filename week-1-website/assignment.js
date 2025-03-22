let user={
    name:"kunal",
    age:19,
    gender:"Mr"
}
function greet1(data){
    console.log(data.gender+" "+data.name + " " + data.age);
    if(data.age < 18) console.log("Minor");
    else console.log("adult");
}
greet1(user);