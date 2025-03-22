const input = [1,2,3,4,5];
const output1 = input.map((a)=>{
    return a*2
});
console.log(output1); 
//Map transforms input data into a new format by applying a specified function,
//filter is used to selectively remove elements from the dataset
const output2 = input.filter((a) =>{
    return(a%2 == 0)
})
console.log(output2);