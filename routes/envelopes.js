// import controllers
const {
    getEnvelopes,
    createEnvelope,
    getEnvelopeById,
    updateEnvelope,
    deleteEnvelope,
    transfer
} = require('../controllers/envelopes')

// import express & create router
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/v1/envelopes:
 *   get:
 *     summary: Get all envelope records
 *     produces:
 *       - application/json
 *     tags:
 *       - Envelopes
 *     responses:
 *       '200':
 *         description: Returns array containing all envelope objects
 * 
 */
router.get('/', getEnvelopes);

/**
 * @swagger
 * /api/v1/envelopes:
 *   post:
 *     summary: Create new envelope record
 *     produces:
 *       - application/json
 *     tags:
 *       - Envelopes
 *     requestBody:
 *       description: Data required to create a new envelope record
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Envelope'
 *     responses:
 *       '201':
 *         description: Returns new envelope record as JSON
 *       '400':
 *         description: Missing parameters
 * 
 */
router.post('/', createEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *   get:
 *     summary: Get envelope with matching ID
 *     produces:
 *       - application/json
 *     tags:
 *       - Envelopes
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID for envelope record
 *         type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Returns envelope record with matching ID as JSON
 *       '404':
 *         description: No matching record found
 * 
 */
router.get('/:id', getEnvelopeById);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *   put:
 *     summary: Update envelope with matching ID
 *     produces:
 *       - application/json
 *     tags:
 *       - Envelopes
 *     requestBody:
 *       description: Data required to update an envelope record
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Envelope'
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID for envelope record to update
 *         type: string
 *         required: true
 *     responses:
 *       '201':
 *         description: Returns updated envelope record as JSON
 *       '404':
 *         description: No matching record found
 * 
 */
router.put('/:id', updateEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/{id}:
 *   delete:
 *     summary: Delete envelope with matching ID
 *     produces:
 *       - application/json
 *     tags:
 *       - Envelopes
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID for envelope record
 *         type: string
 *         required: true
 *     responses:
 *       '204':
 *         description: Deletes record with matching ID
 *       '404':
 *         description: No matching record found
 * 
 */
router.delete('/:id', deleteEnvelope);

/**
 * @swagger
 * /api/v1/envelopes/transfer/{fromId}/{toId}:
 *   post:
 *     summary: Transfer amount from one envelope to another
 *     produces:
 *       - application/json
 *     tags:
 *       - Envelopes
 *     requestBody:
 *       description:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transfer'
 *     parameters:
 *       - in: path
 *         name: fromId
 *         description: ID for original envelope
 *         type: string
 *         required: true
 *       - in: path
 *         name: toId
 *         description: ID for destination envelope
 *         type: string
 *         required: true
 *     responses:
 *       '201':
 *         description: Returns array containing both updated records
 *       '404':
 *         description: No matching record found
 * 
 */
router.post('/:from/:to', transfer);

module.exports = router;