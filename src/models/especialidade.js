const mongoose = require('../database/index');
const bcrypt = require('bcryptjs');

const EspecialidadeSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    clinica:{
        type: String,
        required: true,
    },
});



// UserSchema.pre('save', async function (next) {

// const hash = await bcrypt.hash(this.password, 10);
// this.password = hash;
// next();
// })

const Especialidade = mongoose.model('Especialidade', EspecialidadeSchema);

module.exports = Especialidade;