import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { currentMatches, leaderboard } from './mocks/Leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing /leaderboards route', () => {
  it('should return the leaderboards', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(currentMatches as any);
    const { status, body } = await chai.request(app).get('/leaderboard')
    expect(status).to.equal(200);
    expect(body).to.deep.equal(leaderboard);
  });

  
  afterEach(sinon.restore);
});

