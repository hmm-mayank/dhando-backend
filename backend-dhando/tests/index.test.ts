import * as chai from 'chai';
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
import { Response } from 'superagent';
import { request, expect } from 'chai';

let server ='http://0.0.0.0:3000';

describe('AppController', () => {
    describe('Route GET /app', () => {
        it('Should GET to /app', async () => {
            const res: Response = await request(server).get('/health');
            expect(res).to.have.status(200);
            // expect(res).to.be.a('object');
        });
    });

});