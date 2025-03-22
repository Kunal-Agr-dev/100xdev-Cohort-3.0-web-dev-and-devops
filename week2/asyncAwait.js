function setTimeoutPromisified(ms){
    return new Promise((resolve) => (setTimeout(resolve,ms)));
}
function setTimeoutPromisified(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function solve() {                  //here async keyword makes the functions asynchromnous
      await setTimeoutPromisified(1000);       
      console.log("hi");
      await setTimeoutPromisified(3000);
      console.log("hello");
      await setTimeoutPromisified(5000);
      console.log("hi there");
  }
  
  solve();