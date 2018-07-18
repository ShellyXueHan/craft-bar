const request = require('supertest');
const app = require('../app');

describe('Test the root path', () => {
  it('should response the GET method', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject({
      title: 'Craft Beer World!',
    });
  });
});
