const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const contactSchema = Schema({

    name: {
        type: String,
        minlength: [5, 'Length minimum of name is 5'],
        required: [true, 'name must be filled']
    },

    picture:{
        type: String,
        required:[true, 'picture must be filled']
    },

    phoneNumber:{
        type: String,
        minlength: [5, 'Length minimum of phone number is 5'],
        required: [true, 'phoneNumber must be filled']
    },

    address:{
        type: String,
        minlength: [5, 'Length minimum of address is 5'],
        required: [true, 'address must be filled']
    }


}, { timestamps: true });

module.exports = model("Contact", contactSchema);