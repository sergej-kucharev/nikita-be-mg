'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bank', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        field: 'name',
        type: Sequelize.STRING,
      },
      interestRate: {
        allowNull: false,
        field: 'interest_rate',
        type: Sequelize.INTEGER,
      },
      maximumLoan: {
        allowNull: false,
        field: 'maximum_loan',
        type: Sequelize.INTEGER,
      },
      minimumDownPayment: {
        allowNull: false,
        field: 'minimum_down_payment',
        type: Sequelize.INTEGER,
      },
      loanTerm: {
        allowNull: false,
        field: 'loan_term',
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bank');
  }
};