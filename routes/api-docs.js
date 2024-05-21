// import modules
const express = require('express');
const swagger = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// create router
const router = express.Router();

// set options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Personal Envelope Budgeting Tool',
      version: '1.0.0',
      description:
        'This API allows uers to manage budget envelopes and track the balance of each envelope, and has been built following best pratices regarding RESTful API implementation and Git/Github version control.'
    },
    components: {
      schemas: {}
    },
  },
  apis: ["./routes/envelopes.js"]
};

// set Envelope schema
swaggerOptions.swaggerDefinition.components.schemas.Envelope = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      description: 'The envelope ID'
    },
    name: {
      type: 'string',
      description: 'The name of the envelope'
    },
    budget_remaining: {
      type: 'number',
      description: 'The budget amount for the envelope'
    }
  },
  required: ['name', 'budget'],
};

swaggerOptions.swaggerDefinition.components.schemas.Transfer = {
  type: 'object',
  properties: {
    amount: {
      type: 'number',
      description: 'The amount of money to be transferred from one envelope to the other'
    }
  },
  required: ['amount'],
};

const specs = swagger(swaggerOptions);

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(specs, {explorer: true}));

module.exports = router;
