const sipService = require('../services/sip.service');

const createSip = async (req, res, next) => {
  try {
    const sip = await sipService.createSip(req.body);
    res.status(201).json({ message: 'SIP registered successfully', sip });
  } catch (err) {
    next(err);
  }
};

const getAllSips = async (req, res, next) => {
  try {
    const { page, limit, investor_id } = req.query;
    const result = await sipService.getAllSips({ page, limit, investor_id });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getSipById = async (req, res, next) => {
  try {
    const sip = await sipService.getSipById(req.params.id);
    res.status(200).json({ sip });
  } catch (err) {
    next(err);
  }
};

const processSip = async (req, res, next) => {
  try {
    const result = await sipService.processSip(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getSipTransactions = async (req, res, next) => {
  try {
    const transactions = await sipService.getSipTransactions(req.params.id);
    res.status(200).json({ sip_id: parseInt(req.params.id), transactions });
  } catch (err) {
    next(err);
  }
};

module.exports = { createSip, getAllSips, getSipById, processSip, getSipTransactions };
