class AppointmentFactory {
    Build(simpleAppoitment) {
        var day = simpleAppoitment.date.getDate() + 1;
        var month = simpleAppoitment.date.getMonth();
        var year = simpleAppoitment.date.getFullYear();
        var hour = Number.parseInt(simpleAppoitment.time.split(":")[0]);
        var minutes = Number.parseInt(simpleAppoitment.time.split(":")[1]);

        var startDate = new Date(year, month, day, hour, minutes, 0, 0)
            //startDate.setHours(startDate.getHours() - 3)

        var appo = {
            id: simpleAppoitment._id,
            title: simpleAppoitment.name + " - " + simpleAppoitment.description,
            start: startDate,
            end: startDate,
            notified: simpleAppoitment.notified,
            email: simpleAppoitment.email
        }
        return appo;
    }
}


module.exports = new AppointmentFactory();