////async-await

const delay = (ms) => {
    return new Promise(r => setTimeout(() => r(), ms))
}

// delay(2000).then(()=>console.log('2 sec'))

const url = 'https://jsonplaceholder.typicode.com/todos'

////promise
/*function fetchTodos() {
    console.log('Start')
    return delay(2000)
        .then(() => fetch(url))
        .then(res => res.json())
}

fetchTodos()
    .then(data => {
        console.log("Data", data)
    })
    .catch(e => console.error(e))*/

////async-await

async function fetchTodos() {
    console.log('Start')
    try {
        await delay(2000)
        const res = await fetch(url)
        const data = await res.json()
        console.log("Data", data)
    }catch (e) {}
}

fetchTodos()

