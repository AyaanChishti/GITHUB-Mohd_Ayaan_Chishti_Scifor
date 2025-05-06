function f1(){
    fetch('https://dummyjson.com/products/1')
    .then(res => res.json())
    .then(console.log);
}
    