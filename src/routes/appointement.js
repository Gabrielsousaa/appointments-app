const AppointmentController = require('../controllers/Appointment')

module.exports = (router) => {
    router.get('/cadastro', AppointmentController.register)
    router.get('/findall', AppointmentController.findAll)
    router.post('/create', AppointmentController.create)
    router.post('/finish', async(req, res) => {
        var id = req.body.id;
        var result = await AppointmentController.finish(id)
        res.redirect('/')
    })
    router.get('/event/:id', async(req, res) => {
        var appointment = await AppointmentController.findById(req.params.id);
        //console.log(appointment)
        res.render('event', { appo: appointment })
    })
    router.get('/list', async(req, res) => {
        //await AppointmentController.search('444-444-444-13');
        var appos = await AppointmentController.findAll(true)
        res.render('list', { appos })
    })
    router.get('/searchresult', async(req, res) => {
        var appos = await AppointmentController.search(req.query.search)
        if (appos.length) {
            res.render('list', { appos })
        } else {
            res.redirect('list')
        }
    })
}