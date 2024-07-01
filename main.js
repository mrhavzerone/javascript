function sayHello() {
    return "Hello!"
}
function greating(sayHelloText, name) {
    console.log(sayHelloText() + name)
}
greating(sayHello, "Mr.H.")