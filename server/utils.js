const logMessage = (msg) => {
    var date = new Date();
    var day; (date.getDate() < 10) ? day = "0" + date.getDate() : day = date.getDate();
    var month; ((date.getMonth() + 1) < 10) ? month = "0" + (date.getMonth() + 1) : month = date.getMonth() + 1;
    var hour; (date.getHours() < 10) ? hour = "0" + date.getHours() : hour = date.getHours();
    var minutes; (date.getMinutes() < 10) ? minutes = "0" + date.getMinutes() : minutes = date.getMinutes();
    var seconds; (date.getSeconds() < 10) ? seconds = "0" + date.getSeconds() : seconds = date.getSeconds();
    formatedDate = day + "-" + month + "-" + date.getFullYear() + " " + hour + ":" + minutes + ":" + seconds;
    return formatedDate + " : " + msg;
}

module.exports = {
    logMessage
}