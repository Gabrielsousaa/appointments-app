require('dotenv').config()
const appointment = require('../models/appointment')
const mongoose = require('mongoose')
const Appo = mongoose.model("appointments", appointment)
const AppointmentFactory = require('../factories/AppointmentFactory')
const mailer = require('nodemailer')

class AppointmentController {
    async SendNotification() {
        var appos = await this.findAll(false);
        var transporter = mailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        })
        appos.forEach(async app => {
            var date = app.start.getTime();
            var hour = 1000 * 60 * 60;
            var gap = date - Date.now();

            if (gap <= hour) {
                if (!app.notified) {

                    await Appo.findByIdAndUpdate(app.id, { notified: true })

                    transporter.sendMail({
                        from: "Gabriel souto <teste@gmail.com>",
                        to: app.email,
                        subject: "Sua consulta vai acontecer em breve",
                        text: "Fique atento a sua consulta!"
                    }).then(() => {

                    }).catch(err => {
                        console.log(err)
                    })
                }
            }
        })
    }

    async register(req, res) {
        res.render('register')
    }
    async create(req, res) {

        const { email, name, cpf, description, date, time } = req.body

        var newAppo = new Appo({
            name,
            email,
            cpf,
            description,
            date,
            time,
            finished: false,
            notified: false
        })

        if (email == undefined || email == '' || email == ' ') {
            res.status(400).json({ msg: "Email Vazio" })
            return true
        } else if (name == undefined || name == '' || name == ' ') {
            res.status(400).json({ msg: "Nome Vazio" })
            return true
        } else if (cpf == undefined || cpf == '' || cpf == ' ') {
            res.status(400).json({ msg: "CPF Vazio" })
            return true
        } else if (description == '' || description == ' ') {
            res.status(400).json({ msg: "Descrição Vazio" })
            return true
        }

        try {
            await newAppo.save()
            res.redirect('/')
            return true
        } catch (error) {
            console.log(error)
            res.redirect('/')
            return false
        }

    }
    async findAll(showFinished) {
        if (showFinished) {
            return await Appo.find();
        } else {

            var appos = await Appo.find({ 'finished': false })
            var appointments = [];

            appos.forEach(appointment => {
                if (appointment.date != undefined) {
                    appointments.push(AppointmentFactory.Build(appointment))
                }
            });

            return appointments
        }

    }

    async findById(id) {
        try {
            var event = await Appo.findOne({ '_id': id })
            return event
        } catch (error) {
            console.log(error)
        }

    }
    async finish(id) {
        try {
            await Appo.findByIdAndUpdate(id, { finished: true })
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }

    }
    async search(query) {

        try {
            var appos = await Appo.find().or([{ email: query }, { cpf: query }])

            return appos;


        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = new AppointmentController();