import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeams from '../database/models/SequelizeTeams';
import { findTeam, teams } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /team route', function() {
  it('should return all teams', async () => {
    sinon.stub(SequelizeTeams, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
  it('should return a team by id', async () => {
    sinon.stub(SequelizeTeams, 'findByPk').resolves(teams[0] as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(findTeam);
  });

  it('should return not found if the team doesn\'t exists', async () => {
    sinon.stub(SequelizeTeams, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 1 not found');
  });
  afterEach(sinon.restore);
});
