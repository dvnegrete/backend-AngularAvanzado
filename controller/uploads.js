const { response, request } = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { updateImagen } = require('../helpers/updateIMG');

const fileUpload = (req = request, res = response) => {
    const { type, id} = req.params;
    const validateTypes = ['hospitales', 'medicos', 'usuarios'];
    if (!validateTypes.includes(type)) {
        return res.status(400).json({
            msg: "No es un tipo correcto"
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: 'No files were uploaded.'
        });
    }

    const file = req.files.imagen;
    const nameFileFirst = file.name.split('.');
    const ext = nameFileFirst[ nameFileFirst.length - 1 ];

    const validateExtensions = ['png', 'jpeg', 'jpg', 'gif'];
    if (!validateExtensions.includes(ext)) {
        return res.status(400).json({
            msg: "Extension de Archivo no permitida"
        });
    }

    const nameFile = `${uuidv4()}.${ext}`;

    const path = `./uploads/${type}/${nameFile}`;
     // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({
                msg: 'Error al mover imagen a Path'
            });
        }
    
        updateImagen(type, id, nameFile)
        res.json({
            msg: "File Uploads",
            nameFile
        })
    });
    

}

const showFileImg = (req = request, res = response) => {
    const { type, foto } = req.params;
    let pathImg = path.join(__dirname, `../uploads/${type}/${foto}`);
    if ( !(fs.existsSync(pathImg)) ) {
        pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    }
    res.sendFile(pathImg)        
}

module.exports = {
    fileUpload, 
    showFileImg
}