const fs = require('fs');
const User = require('./../models/user');
const Hospital = require('./../models/hospital');
const Medico = require('./../models/medico');

const deleteImg = (path)=> {
    if (fs.existsSync(path)) {
        //eliminar imagen anterior
        fs.unlinkSync(path)
    }
}

const updateImagen = async (type, id, nameFile) => {
    let beforePath = '';
    switch (type) {
        case 'hospitales':
            const hospitales = await Hospital.findById(id);
            if (!hospitales) {
                console.log('no es hospitales')
                return false;
            }
            beforePath = `./uploads/hospitales/${ hospitales.img }`;
            deleteImg(beforePath);
            
            hospitales.img = nameFile;
            await hospitales.save();
            return true;
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('no es medico')
                return false;
            }
            beforePath = `./uploads/medicos/${ medico.img }`;
            deleteImg(beforePath);
            
            medico.img = nameFile;
            await medico.save();
            return true;            
        case 'usuarios':
            const user = await User.findById(id);
            if (!user) {
                console.log('no es user')
                return false;
            }
            beforePath = `./uploads/usuarios/${ user.img }`;
            deleteImg(beforePath);
            
            user.img = nameFile;
            await user.save();
            return true;
    
        default:
            break;
    }
}


module.exports = {
    updateImagen
}