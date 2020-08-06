////this(call,apply,bind)
function hello() {
    console.log("Hello",this)
}

const person = {
    name:'Max',
    age:25,
    sayHello:hello,
    sayHelloWindow:hello.bind(document),
    logInfo:function (job,phone){
        console.log(`Name is ${this.name}`)
        console.log(`Job is ${job}`)
        console.log(`Phone is ${phone}`)
    }
}

const lena = {
    name:'Elena',
    age:25,
}

// const Info =  person.logInfo.bind(lena)
// Info('Frontend','454545')

// person.logInfo.bind(lena,'Frontend','454545')()
// person.logInfo.call(lena,'Frontend','454545')
person.logInfo.apply(lena,['Frontend','454545'])