const { getDb, createId, findById, commitToDb, deleteById } = require('../utils/db-utils');


// @desc		Get all envelopes
// @route		GET /api/v1/envelopes
exports.getEnvelopes = async (req, res, next) => {
    try {
        // mock request to real db
        const envelopes = await getDb();
        res.status(200).send(envelopes);
      } catch (err) {
        res.status(500).send(err);
      }
  };


// @desc        Create new envelope record
// @route       POST /api/v1/envelopes
exports.createEnvelope = async (req, res, next) => {
    try {
        const { name, budget_remaining } = req.body;
        if (!name || !budget_remaining) {
            return res.status(400).send({ message: 'Invalid parameters' });
        }
        // mock request to real db
        const envelopes = await getDb();
        // execute
        const id = createId();
        const newRecord = {
            id,
            name,
            budget_remaining
        };
        envelopes.push(newRecord);
        // mock commit to real db
        await commitToDb(envelopes);
        res.status(201).send(newRecord);

    } catch (err) {
        res.status(500).send(err);
    }
};

// @desc        Get specific envelope by ID
// @route       GET /api/v1/envelopes/:id
exports.getEnvelopeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({message: 'Invalid ID'});
        }
        // mock request to real db
        const envelopes = await getDb();
        const record = findById(envelopes, id);

        if (!record) {
            return res.status(404).send({message: 'Record not found'});
        }
        res.status(200).send(record);

    } catch (err) {
        res.status(500).send(err);
    }
};

// @desc        Update envelope with matching ID
// @route       PUT /api/v1/envelopes/:id
exports.updateEnvelope = async (req, res, next) => {
    try {
        const { name, budget_remaining} = req.body;
        if (!name && !budget_remaining) {
            return res.status(400).send({message: 'Invalid request body'});
        }
        const { id } = req.params;
        // mock request to real db
        const envelopes = await getDb();
        // update record
        const record = findById(envelopes, id);
        if (!record) {
            return res.status(404).send({message: 'Record not found'});
        }
        if (name) {record.name = name};
        if (budget_remaining) {record.budget_remaining = budget_remaining};
        // commit changes
        const updatedEnvelopes = envelopes.map((env) => {
            if (env.id === id) {
                return record;
            }
        });
        commitToDb(updatedEnvelopes);
        res.status(201).send(record);

    } catch (err) {
        res.status(500).send(err);
    }
};

// @desc        Delete envelope record by ID
// @route       DELETE /api/v1/envelopes/:id
exports.deleteEnvelope = async (req, res, next) => {
    try {
        const { id } = req.params;
        // mock request to real db
        const envelopes = await getDb();
        // find record
        const record = findById(envelopes, id);
        if (!record) {
            return res.status(404).send({message: 'Record not found'});
        }
        // execute & commit changes
        const updatedEnvelopes = deleteById(envelopes, id);
        commitToDb(updatedEnvelopes);
        res.status(204).send({});

    } catch (err) {
        res.status(500).send(err);
    }
};

// @desc        Transfer budget from one envelope to another
// @route       POST /api/v1/envelopes/:fromId/:toId
exports.transfer = async (req, res, next) => {
    try {
        const { fromId, toId } = req.params;
        const { amount } = req.body;
        // mock request to real db
        const envelopes = await getDb();
        const fromEnvelope = findById(envelopes, fromId);
        const toEnvelope = findById(envelopes, toId);

        if (!fromEnvelope || !toEnvelope) {
            res.status(404).send({message: 'Record(s) not found'});
        }
        if (fromId === toId) {
            res.status(400).send({message: 'IDs must be different'})
        }
        if (!amount) {
            res.status(400).send({message: 'Transfer amount missing'});
        }
        if (Number(fromEnvelope.budget_remaining) < Number(amount)) {
            res.status(400).send({message: 'Insuffient funds to make transfer'});
        }

        // execute & commit changes
        fromEnvelope.budget_remaining -= amount;
        toEnvelope.budget_remaining += amount;
        const updatedEnvelopes = envelopes.map((env) => {
            if (env.id === fromId) {
                return fromEnvelope;
            } else if (env.id === toId) {
                return toEnvelope;
            }
            return env;
        });
        commitToDb(updatedEnvelopes);
        res.status(201).send([fromEnvelope, toEnvelope]);
    } catch (err) {
        res.status(500).send(err);
    }
};
