const mongoose = require('../database/index');
const bcrypt = require('bcryptjs');

const PrestadorSchema = new mongoose.Schema({
    usuario:{
    type:String,
    required: true,
    },
    name: {
        type: String,
        require: true,
    },
    idade: {
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
    profissional: {
        type: String,
        require: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    
    createAt:{
        type: Date,
        default: Date.now,
    },
    portfolio:{
        type: Array,
        required: false,
    },
    av_prazo: {
        type: Number,
        require: false,
    },
    av_atendimento: {
        type: Number,
        require: false,
    },av_orcamento: {
        type: Number,
        require: false,
    },
    avaliacao_geral: {
        type: Number,
        require: false,
    },
    comentarios_clientes: {
        type: Number,
        require: false,
    }
});



// UserSchema.pre('save', async function (next) {

// const hash = await bcrypt.hash(this.password, 10);
// this.password = hash;
// next();
// })

const Prestador = mongoose.model('Prestador', PrestadorSchema);

module.exports = Prestador;