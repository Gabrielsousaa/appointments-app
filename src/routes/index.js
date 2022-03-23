const IndexController = require('../controllers/Index')
const AppointmentController = require('../controllers/Appointment')


module.exports = router => {
    router.get('/', IndexController.index)
    router.get('/getcalendar', async(req, res) => {
        let result = await AppointmentController.findAll(false);
        if (result) {
            res.json(result)
        } else {
            res.json(result)
        }

    })
    var pooltime = 3000
    setInterval(async() => {
        await AppointmentController.SendNotification();
    }, pooltime);
}