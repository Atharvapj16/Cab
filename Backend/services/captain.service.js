const captainModel = require('../models/captain.model');


module.exports.createCaptain = async ({
    firstname, lastname, email, password, color, plate, capacity, vehicleType,vehicleName
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType|| !vehicleName) {
        throw new Error('All fields are required');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType,
            vehicleName
        }
    })

    return captain;
}