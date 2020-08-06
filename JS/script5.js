////object.create getters,setters

const person = Object.create(
    {
        calculateAge() {
            console.log('Age', new Date().getFullYear() - this.birthYear)
        }
    },
    {
        name: {
            value: 'Max',
            enumerable: true,
            writable: true
        },
        birthYear: {
            value: 1991,
        },
        age: {
            get() {
                return new Date().getFullYear() - this.birthYear
            },
            set(value) {
                console.log('Set age', value)
            }
        }
    })

// person.name = 'Vlad'

console.log(person)