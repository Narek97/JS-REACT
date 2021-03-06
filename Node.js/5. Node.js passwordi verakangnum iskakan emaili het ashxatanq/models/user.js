const {
    Schema,
    model
} = require('mongoose')

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    resetToken:String,
    resetTokenExp: Date,
    cart: {
        items: [{
            count: {
                type: Number,
                require: true,
                default: 1
            },
            courseId: {
                type: Schema.Types.ObjectId,
                ref: 'Course',
                require: true,
            }
        }]
    }
})

// bazayum pahelu hamar karevora ogtagortel function vor karananq this ogtagortel
userSchema.methods.addToCart = function (course) {

    const clonedItems = [...this.cart.items]
    // stugum enq tvyal coursy arneluch ayd coursy ka arden zambyuxum te voch
    const idx = clonedItems.findIndex(c => {
        return c.courseId.toString() === course._id.toString()
    })
    // ete ka uxaki qanaky avelachnum enq
    if (idx >= 0) {
        clonedItems[idx].count = this.cart.items[idx].count + 1
    }
    // ete chka avelachnum enq zambyuxum
    else {
        clonedItems.push({
            courseId: course._id,
            count: 1
        })
    }
    this.cart = {
        items: clonedItems
    }
    return this.save()

}

userSchema.methods.removeFromCart = function (id) {
    let items = [...this.cart.items]
    const idx = items.findIndex(c => {
        return c.courseId.toString() === id.toString()
    })

    if (items[idx].count === 1) {
        items = items.filter(c => c.courseId.toString() !== id.toString())
    } else {
        items[idx].count--
    }

    this.cart = {
        items
    }
    return this.save()
}

userSchema.methods.clearCart = function(){
    this.cart = {items:[]}
    return this.save()
}

module.exports = model('User', userSchema)