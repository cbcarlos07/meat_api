import * as mongoose from 'mongoose'

export interface MenuItem extends mongoose.Document {
    name: string,
    price: number
}

export interface Restaurant extends mongoose.Document {
    name: string,
    manu: MenuItem[]
}

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    }
})

const restSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    menu: {
        type: [menuSchema],
        required: false,
        select: false,
        default: []
    }
})

export const Restaurant = mongoose.model<Restaurant>('Restaurant', restSchema)