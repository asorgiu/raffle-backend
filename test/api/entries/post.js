// const { expect } = require('chai');
// const request = require('supertest');
// const app = require('../../../app');
// const conn = require('../../../db');

//const supertest = require('supertest');
const app = require('../../../app');
const server = require('../../../server');
//const request = supertest(app);
const { connect, disconnect } = require('../../../db');
//const { expect } = require('chai');

const chai = require('chai');
const request = require('supertest');
const { expect } = require('chai');

// Assertion style
chai.should();

describe('API test', () => {
  before((done) => {
    connect().then(() => {
      done();
    });
  });

  after((done) => {
    // disconnect().then(() => {
    //   server.close();
    //   done();
    // });
  });

  describe('POST /api/entries', () => {
    it('can POST new entry', (done) => {
      request(app)
        .post('/api/entries')
        .send({
          name: 'Test Name',
          email: 'test@gmail.com',
          method: 'YouTube',
        })
        .then((response) => {
          console.log(response);
          expect(response.status).to.eq(400);
          done();
        })
        .catch((error) => {
          console.log(error);
          done();
        });
    });
    // it('can POST new entry', (done) => {
    //   request
    //     .post('/api/entries', {
    //       name: 'Test Name',
    //       email: 'test@gmail.com',
    //       method: 'YouTube',
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       response.should.have.status(201);
    //       done();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       done();
    //     });
    // });
  });
});

/*const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

// Assertion style
chai.should();

chai.use(chaiHttp);

describe('Entries API', () => {
  // Test the GET route
  describe('GET /api/entries', () => {
    it('It should GET all the entries', (done) => {
      chai
        .request('http://127.0.0.1:3001')
        .get('/api/entries')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.eq(6);
          done();
        });
    });
  });
  describe('GET /api/invalid', () => {
    it('It should not GET all the entries', (done) => {
      chai
        .request('http://127.0.0.1:3001')
        .get('/api/invalid')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // Test the GET (by id) route

  // Test the POST route
  describe('POST /api/entries', () => {
    //  before((done) => {
    //     conn
    //       .connect()
    //       .then(() => done())
    //       .catch((err) => done(err));
    //   });
    //   after((done) => {
    //     conn
    //       .close()
    //       .then(() => done())
    //       .catch((err) => done(err));
    //   });
    //   it('Can POST a new entry', (done) => {
    //     request(app)
    //       .post('/api/entries')
    //       .send({ name: 'Test Name', email: 'test@gmail.com', method: 'YouTube' })
    //       .then((res) => {
    //         const body = res.body;
    //         expect(body).to.contain.property('_id');
    //         expect(body).to.contain.property('name');
    //         expect(body).to.contain.property('email');
    //         expect(body).to.contain.property('method');
    //         done();
    //       })
    //       .catch((err) => done(err));
    //   });
    //  })
  });
});
*/
