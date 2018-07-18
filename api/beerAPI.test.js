const request = require('supertest');
const app = require('../app');

describe('Test get all beers', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get('/api/v1/beer/list');
    expect(response.status).toEqual(200);
    expect(response.status).toBeGreaterThanOrEqual(1);
  });
});

describe('Test get single beer', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get('/api/v1/beer/8');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      beerID: 8,
    });
  });
});

describe('Test get a beer that does not exist', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get('/api/v1/beer/200');
    expect(response.status).toEqual(404);
    expect(response.body).toMatchObject({
      error: 'Does not exist!',
    });
  });
});

describe('Test get a beer with invalid id format', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get('/api/v1/beer/xxx');
    expect(response.status).toEqual(400);
    expect(response.body).toMatchObject({
      error: 'Invalid beer ID!',
    });
  });
});
