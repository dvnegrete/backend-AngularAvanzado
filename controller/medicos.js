const { response } = require('express');
const Medico = require('./../models/medico');

const getMedicos = async (req, res = response ) => {
    try {
        const medico = await Medico.find()
                                .populate('hospital', 'nombre img')
                                .populate('user', 'nombre');
        res.json({
            msg: medico
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }
}

const createMedicos = async (req, res = response ) => {
    const medico = new Medico({
        //El user es obligatorio. Su uid viene en el token de acceso. De ahi lo extraigo
        user: req.uid,
        ...req.body
    });
    try {
        const medicoDB = await medico.save();
        res.json({
            medico: medicoDB
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }
}

const updateMedicos = async (req, res = response ) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                msg: 'Medico no encontrado por ID'
            })
        }
        const updates = {
            ...req.body,
            user: uid
        }
        const updatemedico = await Medico.findByIdAndUpdate(id, updates, { new: true})

        res.json({
            medico: updatemedico
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }
    
    res.json({
        msg: 'Actualizar Medicos'
    });
}

const deleteMedicos = async (req, res = response ) => {
    try {
        const id = req.params.id;
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(400).json({
                msg: 'Medico no encontrado por ID'
            })
        }
        await Medico.findByIdAndDelete(id);

        res.json({
            msg: 'Medico Eliminado'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }
}

module.exports = {
    getMedicos,
    createMedicos,
    updateMedicos,
    deleteMedicos
}