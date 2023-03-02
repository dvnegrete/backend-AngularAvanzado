const { Schema, model} = require('mongoose');

const HospitalSchema = Schema(
    {
        nombre: {
            type: String,
            required: true
        }, 
        img: {
            type: String,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }, 
    //esta segundo objeto en el esquema permite establecer el nombre que tendra en la Base de datos
    //Esto es util para los nombres en español, por defecto Mongoose añade un s para hacerlo plural, en Ingles.
    { collection: 'hospitales'}
)

HospitalSchema.method('toJSON', function() {
    //en esta parte quitamos o renombramos la data que se enviará como return
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model('Hospital', HospitalSchema);