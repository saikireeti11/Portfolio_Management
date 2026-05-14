const fundService = require('../services/fund.service');

const createFund = async (req, res, next) => {
  try {
    const fund = await fundService.createFund(req.body);
    res.status(201).json({ message: 'Fund created successfully', fund });
  } catch (err) {
    next(err);
  }
};

const getAllFunds = async (req, res, next) => {
  try {
    const { page, limit, category } = req.query;
    const result = await fundService.getAllFunds({ page, limit, category });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getFundById = async (req, res, next) => {
  try {
    const fund = await fundService.getFundById(req.params.id);
    res.status(200).json({ fund });
  } catch (err) {
    next(err);
  }
};

const updateNav = async (req, res, next) => {
  try {
    const fund = await fundService.updateNav(req.params.id, req.body.latest_nav);
    res.status(200).json({ message: 'NAV updated successfully', fund });
  } catch (err) {
    next(err);
  }
};

module.exports = { createFund, getAllFunds, getFundById, updateNav };
