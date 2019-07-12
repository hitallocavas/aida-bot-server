const mongoose = require('../database/index');
const bcrypt = require('bcryptjs');

const ClinicaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique:true,
        required: true,
        lowercase: true,
    },
    login:{
        type: String,
        unique:true,
        required: true,
        lowercase: true,
    },
    senha:{
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        require: false,
    },
    fotoPerfil:{
        type: String,
        required: false,
    }
});



// UserSchema.pre('save', async function (next) {

// const hash = await bcrypt.hash(this.password, 10);
// this.password = hash;
// next();
// })

const Clinica = mongoose.model('Clinica', ClinicaSchema);

module.exports = Clinica;