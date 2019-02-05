const mongoose = require('../database/index');
const bcrypt = require('bcryptjs');

const ClienteSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique:true,
        required: true,
        lowercase: true,
    },
    endereco: {
        type: String,
        require: false,
    },
    fotoPerfil:{
        type: String,
        required: false,
    },
    telefone: {
        type: String,
        required: true,
    },
    descProjeto: {
        type: String,
        require: true,
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
    obras:{
        type: String,
        required: true,
    },
    orcamento:{
        type: Number,
        required:true,
    },
    prazo: {
        type: String,
        required: true,
    },
    visitasAgendadas: {
        type: String,
        required: false,
    }
});



// UserSchema.pre('save', async function (next) {

// const hash = await bcrypt.hash(this.password, 10);
// this.password = hash;
// next();
// })

const Cliente = mongoose.model('Cliente', ClienteSchema);

module.exports = Cliente;