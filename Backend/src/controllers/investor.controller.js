const investorService = require('../services/Investor.service');

const createInvestor = async (req, res, next) => {
  try {
    const investor = await investorService.createInvestor(req.body);
    res.status(201).json({ message: 'Investor created successfully', investor });
  } catch (err) {
    next(err);
  }
};

const getAllInvestors = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await investorService.getAllInvestors({ page, limit });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getInvestorById = async (req, res, next) => {
  try {
    const investor = await investorService.getInvestorById(req.params.id);
    res.status(200).json({ investor });
  } catch (err) {
    next(err);
  }
};

const getHoldings = async (req, res, next) => {
  try {
    const holdings = await investorService.getHoldings(req.params.id);
    res.status(200).json({ investor_id: parseInt(req.params.id), holdings });
  } catch (err) {
    next(err);
  }
};

const getNetWorth = async (req, res, next) => {
  try {
    const result = await investorService.getNetWorth(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { createInvestor, getAllInvestors, getInvestorById, getHoldings, getNetWorth };
