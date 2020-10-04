const getCurrentDate = () => {
    const date = new Date()
    const legibleTime = `${date.getHours()}:${date.getMinutes()}`
    const legibleDate = `${date.getMonth() + 1}/${date.getDate()}`

    return {
        legibleDate,
        legibleTime,
        legibleDateTime: `${legibleDate} ${legibleTime}`,
        month: date.getMonth() + 1,
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
    }
}

module.exports = {
    getCurrentDate,
}