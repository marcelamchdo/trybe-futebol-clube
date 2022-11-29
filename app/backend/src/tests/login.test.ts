import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Verifica rota de login', () => {
  it('Verifica se email ou senha estão incorretos', async() => {
    const body = {
      email: "string",
      password: "string"
    }
    const returnUsers = await chai.request(app).post('/login').send(body);
    expect(returnUsers.status).to.be.equal(401);
    expect(returnUsers.text).to.be.eq('{"message":"Incorrect email or password"}');
  });
})