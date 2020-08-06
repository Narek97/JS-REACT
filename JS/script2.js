// Closure(замыкания)
function createIncrement(n) {
    return function (num) {
        return n + num
    }
}

const addOne = createIncrement(1)
console.log(addOne(10))

//// this + closure
function bind(context,fn) {
    return function (...args) {
        fn.apply(context,args)
    }
}

function logPerson() {
    console.log(`Person:${this.name},${this.age},${this.job}`)
}

const person = {name:'Max',age:22,job:'Frontend'}


bind(person,logPerson)()