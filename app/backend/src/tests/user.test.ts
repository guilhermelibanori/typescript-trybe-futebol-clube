import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { invalidField, missingField, userFromDB, validToken, validUser } from './mocks/Users.mock';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /login route', () => {
  it('should return a valid token', async function() {
    const { status, body } = await chai.request(app).post('/login')
    .send(validUser)

    expect(status).to.equal(200);
    const token = { token: JWT.sign({ email: validUser.email}) }
    expect(body).to.deep.equal(token);
  });
  it('should return an error using an invalid email', async function() {
    const { status, body } = await chai.request(app).post('/login')
    .send({email: 'user.com', password: validUser.password})

    expect(status).to.equal(401);
    expect(body).to.deep.equal(invalidField);
  });
  it('should return an error using an invalid password', async function() {
    const { status, body } = await chai.request(app).post('/login')
    .send({email: validUser.email, password: '123'})

    expect(status).to.equal(401);
    expect(body).to.deep.equal(invalidField);
  });
  it('should return an error using a wrong password', async function() {
    const { status, body } = await chai.request(app).post('/login')
    .send({email: validUser.email, password: 'secret_admin'})

    expect(status).to.equal(401);
    expect(body).to.deep.equal(invalidField);
  });
  it('should return an error without using email field', async function() {
    const { status, body } = await chai.request(app).post('/login')
    .send({email: '', password: validUser.password})

    expect(status).to.equal(400);
    expect(body).to.deep.equal(missingField);
  });
  it('should return an error without using password field', async function() {
    const { status, body } = await chai.request(app).post('/login')
    .send({email: validUser.email, password: ''})

    expect(status).to.equal(400);
    expect(body).to.deep.equal(missingField);
  });
  it('should return an error if the user dont exists', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).post('/login')
    .send({email: validUser.email, password: validUser.password})

    expect(status).to.equal(401);
    expect(body).to.deep.equal({"message": "Invalid email or password"});
  });
  it('return a valid role using the token', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userFromDB as any);
    const { status, body } = await chai.request(app).get('/login/role')
    .set('authorization', validToken)

    expect(status).to.equal(200);
    expect(body).to.deep.equal({"role": userFromDB.role});
  });
  it('return an error using a invalid token', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userFromDB as any);
    const { status, body } = await chai.request(app).get('/login/role')
    .set('authorization', validToken + 'invalid')

    expect(status).to.equal(401);
    expect(body).to.deep.equal({"message": "Token must be a valid token"});
  });
  it('return an error without using a token', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userFromDB as any);
    const { status, body } = await chai.request(app).get('/login/role')
    .set('authorization', '')

    expect(status).to.equal(401);
    expect(body).to.deep.equal({"message": "Token not found"});
  });
  it('return an error using a invalid User', async function() {
    sinon.stub(SequelizeUsers, 'findOne').resolves(null);
    const { status, body } = await chai.request(app).get('/login/role')
    .set('authorization', validToken)

    expect(status).to.equal(404);
    expect(body).to.deep.equal({"message": "User not found"});
  });


  // it('should return not found if the team doesn\'t exists', async function() {
  //   sinon.stub(SequelizeTeams, 'findOne').resolves(null);

  //   const { status, body } = await chai.request(app).get('/teams/1');

  //   expect(status).to.equal(404);
  //   expect(body.message).to.equal('Team 1 not found');
  // });
  afterEach(sinon.restore);
});

