import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { validToken} from './mocks/Users.mock';
import { allMatches, newMatch} from './mocks/Matches.mock';
import SequelizeMatches from '../database/models/SequelizeMatches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /matches route', () => {
  it('should return all Matches', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
    const { status, body } = await chai.request(app).get('/matches')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });
  it('should return all matches with progress true', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
    const { status, body } = await chai.request(app).get("/matches?inProgress=true")

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });
  it('should return all matches with progress false', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(allMatches as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=false')

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allMatches);
  });
  it('should finish a match', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves(allMatches as any);
    const { status, body } = await chai.request(app).patch('/matches/48/finish')
    .set('authorization', validToken)
    expect(status).to.equal(200);
    expect(body).to.deep.equal({message: 'Finished'});
  });
  it('should update a match', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves(allMatches as any);
    const { status, body } = await chai.request(app).patch('/matches/48')
    .set('authorization', validToken)
    .send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    })
    expect(status).to.equal(200);
    expect(body).to.deep.equal({message: 'Updated'});
  });
  it('should create a new match', async function() {
    sinon.stub(SequelizeMatches, 'create').resolves(newMatch as any);
    const { status, body } = await chai.request(app).post('/matches')
    .set('authorization', validToken)
    .send({
      "homeTeamId": 13,
      "awayTeamId": 2,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1
    })
    expect(status).to.equal(201);
    expect(body).to.deep.equal(newMatch);
  });
  it('should create give an error using the same team', async function() {
    const { status, body } = await chai.request(app).post('/matches')
    .set('authorization', validToken)
    .send({
      "homeTeamId": 2,
      "awayTeamId": 2,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1
    })
    expect(status).to.equal(422);
    expect(body).to.deep.equal({message: "It is not possible to create a match with two equal teams"});
  });
  it('should create give an error using an invalid team', async function() {
    const { status, body } = await chai.request(app).post('/matches')
    .set('authorization', validToken)
    .send({
      "homeTeamId": 2,
      "awayTeamId": 152,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1
    })
    expect(status).to.equal(404);
    expect(body).to.deep.equal({message: "There is no team with such id!"});
  });
  it('failed to create a match', async function() {
    sinon.stub(SequelizeMatches, 'create').resolves();
    const { status, body } = await chai.request(app).post('/matches')
    .set('authorization', validToken)
    .send({
      "homeTeamId": 2,
      "awayTeamId": 12,
      "homeTeamGoals": 1,
      "awayTeamGoals": 1
    })
    expect(status).to.equal(404);
    expect(body).to.deep.equal({message: "Failed to create the match"});
  });
  
  afterEach(sinon.restore);
});

