//Prototype
const person = {
    name:'Maxim',
    age:25,
    greet:function () {
        console.log('Greet')
    }
}

Object.prototype.sayHello = function (){
    console.log('Hello')
}

