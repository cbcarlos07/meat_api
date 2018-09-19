"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var validators_1 = require("../common/validators");
var bcrypt = require("bcrypt");
var environment_1 = require("../common/environment");
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 80,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    gender: {
        type: String,
        required: false,
        "enum": ['Male', 'Female']
    },
    cpf: {
        type: String,
        required: false,
        validate: {
            validator: validators_1.validateCPF,
            message: '{PATH} Invalid CPF ({VALUE})'
        }
    }
});
userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) {
        next();
    }
    else {
        bcrypt.hash(user.password, environment_1.environment.security.saltRounds)
            .then(function (hash) {
            user.password = hash;
            next();
        })["catch"](next);
    }
});
exports.User = mongoose.model('User', userSchema);
