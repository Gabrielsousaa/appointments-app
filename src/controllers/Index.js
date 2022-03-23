const AppointmentController = require('../controllers/Appointment')

class Index {
    async index(req, res) {
        res.render('index')
    }


}

module.exports = new Index();
