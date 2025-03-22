class Rectangle {
    constructor(width, height, color) {
         this.width = width;
         this.height = height;
         this.color = color; 
    }
    
    area() {
        const area = this.width * this.height;
        return area;
    }
    
    paint() {
             console.log("the color is" + this.color);
    }
    
}
 
const rect = new Rectangle(2, 4,"red") // instance of the rectangle class
console.log(rect.area());
console.log(rect.color);


const date = new Date();
console.log(date.getFullYear());

const map = new Map();
map.set('name', 'Alice');
map.set('Age', 30);
console.log(map.get('name'));
console.log(map.get('Age'));

