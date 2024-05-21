// import modules
const app = require('../app');
const request = require('supertest');
const setupTeardownDb = require('./testSetup');
const db = require('../config/db.json');
const path = require('path');
const assert = require('assert');
const fs = require('fs');


describe('API Endpoints', () => {
  let dbPath;
  before(() => {
    dbPath = path.join(__dirname, '../config/db.json');
  });

  setupTeardownDb();  // restores db to original state after each test

  describe('GET /api/v1/envelopes', () => {
    it('returns json containing all envelopes', async () => {
      // execute & verify
      const response = await request(app)
        .get('/api/v1/envelopes')
        .expect(200)
        .expect('Content-Type', /json/);
    });
  });

  describe('POST /api/v1/envelopes', () => {
    it('returns json containing new record saved to json file', async () => {
      // setup
      const payload = {
        name: 'Gym',
        budget_remaining: '50'
      };
      const expectedDbLength = db.length +1;

      // execute & verify
      const response = await request(app)
        .post('/api/v1/envelopes')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/);

      const updatedDb = JSON.parse(fs.readFileSync(dbPath));
      assert.strictEqual(response.body.name, payload.name);
      assert.strictEqual(updatedDb.length, expectedDbLength);
    });

    it('returns 400 if request is missing params', async () => {
      // setup
      const payload = {
        name: 'Gym'
      };

      // execute & verify
      const response = await request(app)
        .post('/api/v1/envelopes')
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400);
    });
  });

  describe('GET /api/v1/envelopes/:id', () => {
    it('returns json containing record with matching id', async () => {
      // execute & verify
      const response = await request(app)
        .get('/api/v1/envelopes/12345678')
        .expect(200)
        .expect('Content-Type', /json/);
    });

    it('returns 404 if no record with matching id is found', async () => {
      // execute & verify
      const response = await request(app)
        .get('/api/v1/envelopes/xxxxxxxx')
        .expect(404)
        .expect('Content-Type', /json/);
    });
  });

  describe('PUT /api/v1/envelopes/:id', () => {
    it('updates record from request params & returns updated record', async () => {
      // setup
      const payload = {
        budget_remaining: '40'
      };
      const id = '12345678';
      const expectedResponseBody = {
        "id": "12345678",
        "name": "Eating Out",
        "budget_remaining": payload.budget_remaining
      }

      // execute & verify
      const response = await request(app)
        .put(`/api/v1/envelopes/${id}`)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/);
      assert.deepEqual(response.body, expectedResponseBody);
    });
  });

  describe('DELETE /api/v1/envelopes/:id', () => {
    it('deletes record with matching id from db json file', async () => {
      // setup
      const id = '12345678';
      const expectedDbLength = db.length -1;

      // execute & verify
      const response = await request(app)
        .delete(`/api/v1/envelopes/${id}`)
        .expect(204);

      const updatedDb = JSON.parse(fs.readFileSync(dbPath));
      assert.strictEqual(updatedDb.length, expectedDbLength);
    });
  });

  describe('POST /api/v1/envelopes/transfer/:from/:to', () => {
    it('valid transfers budget_remaining from one record to another', async () => {
      // setup
      const fromId = '12345678';
      const toId = '23456789';
      const payload = {amount: 30};
      const expectedResponseBody = [
        {"id": "12345678", "name": "Eating Out", "budget_remaining": "100"},
        {"id": "23456789", "name": "Pub", "budget_remaining": "50"}
      ];

      // execute & verify
      response = await request(app)
        .post(`/api/v1/envelopes/transfer/${fromId}/${toId}`)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/);
      
      assert.deepEqual(response.body, expectedResponseBody);
    });

    it('invalid transfer budget_remaining from one record to another', async () => {
      // setup
      const fromId = '12345678';
      const toId = '23456789';
      const payload = {amount: 300};
      const expectedResponseBody = {message: `Not enough budget in envelope ${fromId}`};

      // execute & verify
      response = await request(app)
        .post(`/api/v1/envelopes/transfer/${fromId}/${toId}`)
        .send(payload)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .expect(400)
        .expect('Content-Type', /json/);

      assert.deepEqual(response.body, expectedResponseBody);
    });
  });
});
