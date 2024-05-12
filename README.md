# Codecademy Portfolio Project II
## Personal Envelope Budgeting Tool
The objective of this project is to build an API that allows clients to create and manage a personal budget, using [Envelope Budgeting](https://www.thebalance.com/what-is-envelope-budgeting-1293682) principles. This API allows uers to manage budget envelopes and track the balance of each envelope, and has been built following best pratices regarding RESTful API implementation and Git/Github version control.

### Project Objectives:
- Build an API using Node.js and Express
- Be able to create, read, update, and delete envelopes
- Create endpoint(s) to update envelope balances
- Use Git version control to keep track of your work
- Use the command line to navigate your files and folders
- Use Postman to test API endpoints

### Prerequisites:
- Command line and file navigation
- Javascript
- Node.js
- Express
- Git and GitHub
- Postman

## API Routes
The requirements for this API are relatively straighforward with only a handful of endpoints required as detailed below:

- `/envelopes/`
    - GET all envelopes
    - POST to create new envelope and save to json file
    - GET json of specific envelope with id
    - PUT to update specific envelope with id and save to json file
    - DELETE specific envelope with id from json file

- `/envelopes/transfer/`
    - POST to transfer budget from one envelope to another

## Data schema
Only one data object is required for this API, the envelope, with schema detailed below:

- `Envelope`
    - id
    - name
    - budget_max
    - budget_remaining
