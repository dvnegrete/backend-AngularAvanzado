const { request, response } = require('express');
const Hospital = require('./../models/hospital');

const getHospitales = async (req, res = response ) => {
    try {
        const hospitales = await Hospital.find()
                                        .populate('user img', 'nombre img');
        res.json({
            hospital: hospitales
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }
}

const createHospitales = async (req, res = response ) => {
    const hospital = new Hospital({
        user: req.uid,
        ...req.body
    });
    try {
        const hospitalDB = await hospital.save();
        res.json({
            hospital: hospitalDB
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }    
}

const updateHospitales = async (req = request, res = response ) => {
    try {
        const id = req.params.id;
        const uid = req.uid;
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(400).json({
                msg: 'Hospital no encontrado por ID'
            })
        }
        const updates = {
            ...req.body,
            user: uid
        }
        const updateHospital = await Hospital.findByIdAndUpdate(id, updates, { new: true})

        res.json({
            hospital: updateHospital
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }    
}

const deleteHospitales = async (req, res = response ) => {
    try {
        const id = req.params.id;        
        const hospital = await Hospital.findById(id);
        if (!hospital) {
            return res.status(400).json({
                msg: 'Hospital no encontrado por ID'
            })
        }
        await Hospital.findByIdAndDelete(id);

        res.json({
            msg: 'Hospital Eliminado'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error, contacta al administrador'
        });
    }
}

module.exports = {
    getHospitales,
    createHospitales,
    updateHospitales,
    deleteHospitales
}