const moment = require('moment');


const formatDate = (date) => moment(date).format('MM/DD/YYYY');

const toCapitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = {
  formatDate,
  toCapitalize,
};