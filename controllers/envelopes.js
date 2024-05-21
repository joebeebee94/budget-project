const { createID, findById, commitToDb, deleteById } = require('../utils/db-utils');
const db = require('../config/db.json');


// @desc		Get all envelopes
// @route		GET /api/v1/envelopes
exports.getEnvelopes = async (req, res, next) => {

  };


// @desc        Create new envelope record
// @route       POST /api/v1/envelopes
exports.createEnvelope = async (req, res, next) => {

};

// @desc        Get specific envelope by ID
// @route       GET /api/v1/envelopes/:id
exports.getEnvelopeById = async (req, res, next) => {

};

// @desc        Update envelope with matching ID
// @route       PUT /api/v1/envelopes/:id
exports.updateEnvelope = async (req, res, next) => {

};

// @desc        Delete envelope record by ID
// @route       DELETE /api/v1/envelopes/:id
exports.deleteEnvelope = async (req, res, next) => {

};

// @desc        Transfer budget from one envelope to another
// @route       POST /api/v1/envelopes/:fromId/:toId
exports.transfer = async (req, res, next) => {

};
