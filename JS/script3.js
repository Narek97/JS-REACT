//Promise

//// hin devov
// console.log('Request data...')
// setTimeout(() => {
//     console.log('Preparing data...')
//     const backendData = {
//         server: 'aws',
//         port: 2000,
//         status: 'working'
//     }
//
//     setTimeout(() => {
//         backendData.modified = true
//         console.log('Data received', backendData)
//     }, 2000)
// }, 2000)

//// promise ov
console.log('Request data...')
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Preparing data...')
        const backendData = {
            server: 'aws',
            port: 2000,
            status: 'working'
        }
        resolve(backendData)
    }, 2000)
})

// p.then((e) => {
//     setTimeout(() => {
//         e.modified = true
//         console.log('Data received',e)
//     }, 2000)
// })

// p.then((data) => {
//     const p2 = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(data)
//         })
//     })
//     p2.then(clientData => {
//         console.log('Data received', clientData)
//     })
// })

p.then((data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data)
        }, 2000)
    })
}).then((clientData) => {
    clientData.fromPromise = true
    console.log('Data received', clientData)
}).catch(e => {
    console.log('Error')
})

//.................................................
const sleep = ms => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

// sleep(2000).then(() => console.log('After 2 sec'))
// sleep(3000).then(() => console.log('After 3 sec'))

//// all methody ashxatum bolor promisneri avartveluch heto
//// ays depqum 5000 ms heto
Promise.all([sleep(2000), sleep(5000)])
    .then(() => {
        console.log('All promises')
    })
