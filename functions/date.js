const moment = require('moment');
module.exports = () => {
        const date = moment().utcOffset(2).format("DD/MM/YYYY HH:mm");
        return date;
} 