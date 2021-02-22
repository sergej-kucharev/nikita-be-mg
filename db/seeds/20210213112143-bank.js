'use strict';
const { bank } = require('../models');

const data = [{
  id: 1,
  name: 'Privat',
  interestRate: 1,
  maximumLoan: 1,
  minimumDownPayment: 1,
  loanTerm: 1,
}, {
  id: 2,
  name: 'OTP',
  interestRate: 2,
  maximumLoan: 2,
  minimumDownPayment: 2,
  loanTerm: 2,
}];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await bank.bulkCreate(data);
  },

  down: async (queryInterface, Sequelize) => {
    await bank.destroy({
      truncate: {
        cascade: true,
      },
    });
  },
};
