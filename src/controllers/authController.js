const express = require('express');

const User = require('./../models/user');
const Clinica = require('../models/clinica');
const Especialidade = require('../models/especialidade');
const router = express.Router();

    router.post("/clinica/save", async (req,res) => {
        try {
            const {email} = req.body;
                if(await Clinica.findOne({email})){
                    res.status(400).send({error:'E-mail Já cadastrado'});
                }

            const clinica = await Clinica.create(req.body);
            return res.send(clinica);
            
        } 
        catch (err) {
            return res.status(400).send({err:'Registration Error'});   
        }
    });

    //Get clinicas
    router.get('/clinica/getAll', function(req, res) {
        var clinicas = {};
        clinicas = Clinica.find().then(clinicas => {
            res.send(clinicas);
        })
     });
 
     //Delete clinica
     router.delete("/clinica/delete", function(req,res){
         var clinica;
         clinica = Clinica.findOneAndDelete(req.params._id, function(err){
             if(err) return next(err);
             res.send('Deletado com sucesso');
         })
     });

router.post("/especialidade/save", async (req,res) => {
    try {
        const {clinica} = req.body.clinica;
        const {nome} = req.body.nome;

        if(await Especialidade.findOne({clinica, nome})){
            res.status(400).send({error:'Especialidade Já cadastrada'});
        }

        const especialidade = await Especialidade.create(req.body);
        return res.send(especialidade);

    }
    catch (err) {
        return res.status(400).send({err:'Registration Error'});
    }
});

//Listar especialidades da clinica
router.get("/clinica/especialidades", function(req,res){

    Especialidade.find({clinica:req.body.clinica}).then(
        especialidades => {
            res.send(especialidades);
        }
    )

})

//Delete clinica
router.delete("/especialidade/delete", function(req,res){
    var especialidade;
    especialidade = Especialidade.findOneAndDelete(req.params._id, function(err){
        if(err) return next(err);
        res.send('Deletado com sucesso');
    })
});



     // //Listar prestadores onde e-mail é igual ao cadastrado
     // router.get("/prestadoresByEmail", function(req,res){
     //
     //     Prestador.find({emailUsuario:req.body.email}).then(
     //         prestadores => {
     //             console.log(req.params.email)
     //             res.send(prestadores);
     //         }
     //     )
     //
     // })
     //FIM DEMONSTRAÇÃO USUARIO


module.exports = app => app.use('/api', router);