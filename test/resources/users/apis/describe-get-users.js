const chai = require("chai");
const expect = require('chai').expect;
const sinonChai = require('sinon-chai')

chai.use(sinonChai)
const sinon = require('sinon');
const db = require('../../../../src/db/repository');
const GetUsersApi = require('../../../../src/resources/users/apis/get-users')

describe('get users -api', () => {
    let sandbox = sinon.createSandbox();

    beforeEach(() => {
        res = {
            setHeader: sinon.spy(),
            send: sinon.spy(),
            status: sinon.spy(() => {
                return res;
            })
        };
        req = {
        }
    });

    it('returns a list of users', async () => {
        let users = [{
            id: 'userId1'
        }, { id: 'userId2' }]
        sandbox.mock(db).expects('execute').once()
            .returns(Promise.resolve(users));

        await GetUsersApi.get(req, res);

        expect(res.send).to.have.been.calledWith({
            status: true,
            message: 'successfully get users',
            entity: users
        })
    });

    it('return error if failed to execute', async () => {
        sandbox.mock(db).expects('execute').once()
            .returns(Promise.reject('some error'));

        await GetUsersApi.get(req, res);

        expect(res.send).to.have.been.calledWith({
            status: false,
            message: 'Failed to get users',
            entity: null
        })
    });

    afterEach(() => {
        sandbox.verifyAndRestore();
    });
});
