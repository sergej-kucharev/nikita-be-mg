'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('bank', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    interestRate: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'interest_rate',
    },
    maximumLoan: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'maximum_loan',
    },
    minimumDownPayment: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'minimum_down_payment',
    },
    loanTerm: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'loan_term',
    },
  }, {
    // https://stackoverflow.com/questions/21114499/how-to-make-sequelize-use-singular-table-names
    freezeTableName: true,
    paranoid: false,
    tableName: 'bank',
    timestamps: false,
    underscored: false,
  });
};