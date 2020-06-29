const request = require('supertest');
const server = 'http://localhost:3000';

// eslint-disable-next-line no-undef
describe('Route integration', () => {
	describe('/', () => {
		describe('GET', () => {
			it('responds with 200 status and text/html content type', () => {
				return request(server).get('/').expect('Content-Type', /text\/html/).expect(200);
			});
		});
	});
});

// describe('/markets', () => {
// 	describe('GET', () => {
// 		xit('responds with 200 status and application/json content type', () => {
// 			return request(server).get('/markets').expect('Content-Type', /json/).expect(200);
// 		});
//   });
// });
