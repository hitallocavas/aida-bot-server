const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./../models/user');
const Cliente = require('./../models/cliente');
const Prestador = require('./../models/prestador');
const config = require('../../config/auth.json')

const router = express.Router();

// SERVIÇOS DE USUÁRIO


function generateToken(params = {}) {
    return jwt.sign(params, config.secret, {
        expiresIn: 86400,
    });
}

router.post("/authenticate", async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).send({ error: 'User not found' })
    }


    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' })
    }

    user.password = undefined;

    res.status(200).send({
        user,
        token: generateToken({ id: user.id })
    })
});

router.post("/register", async (req, res) => {
    try {
        
        const { email } = req.body;
        if (await User.findOne({ email })) {
            res.status(400).send({ error: 'E-mail Já cadastrado' });
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user,token: generateToken({ id: user.id })});
    }
    catch (err) {
        return res.status(400).send({ err: 'Registration Error' });
    }
});

//Get users
router.get('/users', function (req, res) {
    var users = {};
    users = User.find().then(users => {
        res.send(users);
    })
});

//Delete user
router.delete("/user", function (req, res) {
    console.log(req);
    user = User.findOneAndDelete(req.params.email, function (err) {
        if (err) return next(err);
        res.send('Deletado com sucesso');
    })
});
//FIM SERVIÇOS DE USUARIO



// SERVIÇOS RELATIVOS AO CLIENTE

router.post("/cadastroCliente", async (req, res) => {
    try {
        const { email } = req.body;
        if (await Cliente.findOne({ email })) {
            res.status(400).send({ error: 'E-mail Já cadastrado' });
        }

        const cliente = await Cliente.create(req.body);
        return res.send(cliente);

    }
    catch (err) {
        return res.status(400).send({ err: 'Registration Error' });
    }
});

//Get clientes
router.get('/clientes', function (req, res) {
    var clientes = {};
    clientes = Cliente.find().then(clientes => {
        res.send(clientes);
    })
});

//Delete cliente
router.delete("/cliente", function (req, res) {
    console.log(req);
    var cliente;
    cliente = Cliente.findOneAndDelete(req.params.email, function (err) {
        if (err) return next(err);
        res.send('Deletado com sucesso');
    })
});


//FIM SERVIÇOS DO CLIENTE



// SERVIÇOS RELATIVOS AO PRESTADOR

router.post("/cadastroPrestador", async (req, res) => {
    try {
        const { email } = req.body;
        if (await Prestador.findOne({ email })) {
            res.status(400).send({ error: 'E-mail Já cadastrado' });
        }

        const prestador = await Prestador.create(req.body);
        return res.send(prestador);

    }
    catch (err) {
        return res.status(400).send({ err });
    }
});

//Get prestadores
router.get('/Prestadores', function (req, res) {
    var prestadores = {};
    prestadores = Prestador.find().then(prestadores => {
        res.send(prestadores);
    })
});

//Delete prestadores
router.delete("/Prestadores", function (req, res) {
    console.log(req);
    var prestador;
    prestador = Prestador.findOneAndDelete(req.params.email, function (err) {
        if (err) return next(err);
        res.send('Deletado com sucesso');
    })
});

//FIM DEMONSTRAÇÃO USUARIO

//teste dialogflow

router.post("/webhook", async (req, res) => {

    if (req.body.queryResult.intent.displayName == "busca-colaboradores - especialidade") {  // busca por colaboradores 

        try {
            Prestador.find({ profissional: req.body.queryResult.outputContexts[0].parameters.colaborador }).then(
                prestadores => {

                    var texts = [];

                    if (prestadores.length == 0) {
                        res.send({
                            "fulfillmentText": "Infelizmente não há registros de " + req.body.queryResult.outputContexts[0].parameters.colaborador + " em nosso banco de dados"
                        }
                        )
                    }

                    prestadores.forEach(function (prestador) {
                        texts.push("Nome: " + prestador.name + "\n" + "Portfólio: " + prestador.UrlPerfil + "\n" + "Contato: " + prestador.telefone + "\n");
                    })

                    //enviar mensagens

                    res.send(

                        {
                            "fulfillmentMessages":
                                [
                                    {
                                        "text": {
                                            "text": ["Aguarde um momento, estamos procurando os melhores prestadores pra você."]
                                        }
                                    },
                                    {
                                        "text": {
                                            "text": texts
                                        }
                                    },
                                    {
                                        "text": {
                                            "text": ["Aqui estão os prestadores que você pediu. Se precisar de mais alguma coisa, me avise."]
                                        }
                                    }
                                ]

                        }
                    );

                }
            )
        }
        catch (err) {

            return res.status(400).send({ err });
        }

    } else if (req.body.queryResult.intent.displayName == "Obra-feita-avaliacao - yes - select.number") {


        //queryResult.parameters.number[0]


    } else if (null) {

    }



});


module.exports = app => app.use('/auth', router);