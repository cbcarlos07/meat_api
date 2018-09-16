"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        select: false
    }
});
exports.User = mongoose.model('User', userSchema);
