const { Router } = require('express');
const asyncHandler = require('express-async-handler');
const { body, oneOf, param, validator, } = require('../helpers/validator');
const { bank, } = require('../../db/models');

const route = new Router();
const isPercent = (value) => Number.isFinite(value) && value>=0 && value<=100;
const isPositive = (value) => Number.isFinite(value) && value>0;
const bodyName = body('name', 'name is required').isString().notEmpty();
const bodyInterestRate = body('interestRate', 'interest rate expect in range(0, 100)').custom(isPercent);
const bodyMaximumLoan = body('maximumLoan', 'maximum loan expect positive value').custom(isPositive);
const bodyMinimumDownPayment = body('minimumDownPayment', 'minimum down payment expect positive value').custom(isPositive);
const bodyLoanTerm = body('loanTerm', 'loan term expect positive value').custom(isPositive);
const paramId = param('bankId', 'bank id expected').custom((value) => Number.isInteger(+value) && +value>0);

route.post(
  '/',
  bodyName,
  bodyInterestRate,
  bodyMaximumLoan,
  bodyMinimumDownPayment,
  bodyLoanTerm,
  validator,
  asyncHandler(async (req, res) => {
    const created = await bank.create(req.body);
    res.json({ created });
  })
);

route.get(
  '/',
  asyncHandler(async (req, res) => {
    const encode = (value) => Buffer.from(JSON.stringify(value), 'utf-8').toString('base64');
    const decode = (value) => JSON.parse(Buffer.from(value, 'base64').toString('utf-8'));
    const {
      filter = null,
      order = encode([ ['id', 'desc'] ]),
      skip = 0,
      take = 10,
    } = req.query;
    const { count, rows: items, } = await bank.findAndCountAll({
      where: {
        ...filter && decode(filter),
      },
      ...order && { order: decode(order) },
      ...skip && { offset: +skip },
      ...take && { limit: +take },
    });
    res.json({ count, items, });
  })
);

route.get(
  '/:bankId(\\d+)',
  paramId,
  asyncHandler(async (req, res) => {
    const { bankId, } = req.params;
    const item = await bank.findByPk(bankId);
    res.json({ item });
  })
);

route.patch(
  '/:bankId(\\d+)',
  paramId,
  oneOf([
    bodyName,
    bodyInterestRate,
    bodyMaximumLoan,
    bodyMinimumDownPayment,
    bodyLoanTerm,
  ]),
  validator,
  asyncHandler(async(req, res) => {
    const { bankId, } = req.params;
    const updated = await bank.update({ ...req.body, }, { where: { id: bankId, }, });
    res.json({ updated });
  })
);

route.delete(
  '/:bankId(\\d+)',
  paramId,
  validator,
  asyncHandler(async(req, res) => {
    const { bankId, } = req.params;
    const removed = await bank.destroy({ where: { id: bankId, }, });
    res.json({ removed });
  })
);

module.exports = route;
