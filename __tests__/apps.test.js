const request = require('supertest');
const sinon = require('sinon');
const app = require('../src/app')
const invoiceRepository = require('../src/shared/repositories/invoices');
const userRepository = require('../src/shared/repositories/users');
const clientRepository = require('../src/shared/repositories/clients');
const bcrypt = require('bcrypt');
const assert = require('assert');
const email = 'test@example.com';
const password = 'password1'
const defaultHeader = { email, password };
describe('test', () => {
  afterEach(() => {
    sinon.restore();
  });
  describe('GET: /ping', () => {
    it('pongが返される', async () => {
      const res = await request(app).get('/ping')
      expect(res.status).toEqual(200)
      expect(res.body.status).toEqual('ok')
    });
  });
  describe('GET: /api/invoices', () => {
    it('請求書一覧取得をすることができる', async () => {

      sinon.mock(userRepository).expects('findOneByEmail').resolves(
        {
          companyId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
          userId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
          email: 'test@example.com',
          password: 'disfdsfjdsfdsfjdsf5jn',
          createdAt: '2023-08-30 17:41:54',
          updatedAt: '2023-08-30 17:41:54'
        }
      );
      sinon.mock(bcrypt).expects('compareSync').returns(true);
      sinon.mock(invoiceRepository).expects('findAll').resolves(
        {
          count: 2,
          rows: [
            {
              invoiceId: '12fe7fdf-1786-4620-b91b-242a69cc6113',
              clientId: 'fe38e892-014a-45a7-a35b-8f21ab30b874',
              companyId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
              issuedAt: '2023-10-30T12:36:05.000Z',
              commission: 401,
              commissionRate: 0,
              tax: 41,
              taxRate: 0,
              invoiceAmount: 10442,
              paymentAmount: 10001,
              status: 'pending',
              paymentDeadline: '2023-12-30T23:59:59.000Z',
              createdAt: '2023-10-30T12:36:05.000Z',
              updatedAt: '2023-10-30T12:36:05.000Z'
            },
            {
              invoiceId: '3fe8b1cb-4681-48c7-bb84-b24b62b5e289',
              clientId: 'fe38e892-014a-45a7-a35b-8f21ab30b874',
              companyId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
              issuedAt: '2023-10-30T12:36:00.000Z',
              commission: 401,
              commissionRate: 0,
              tax: 41,
              taxRate: 0,
              invoiceAmount: 10442,
              paymentAmount: 10001,
              status: 'pending',
              paymentDeadline: '2023-12-30T23:59:59.000Z',
              createdAt: '2023-10-30T12:36:00.000Z',
              updatedAt: '2023-10-30T12:36:00.000Z'
            }
          ]
        }
      );
      const res = await request(app).get('/api/invoices').set(defaultHeader);
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.count, 2);
      assert.strictEqual(res.body.rows.length, 2);
    });
  });
  describe('POST: /api/invoices', () => {
    it('請求書を作成することができる', async () => {
      const now = new Date('2023-10-30T00:00:00.000Z')
      sinon.useFakeTimers(now);
      const clientId = 'fe38e892-014a-45a7-a35b-8f21ab30b874';
      const companyId = 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40';
      const paymentAmount = 10000;
      sinon.mock(userRepository).expects('findOneByEmail').resolves(
        {
          companyId,
          userId: 'fe8e9c4e-8ee6-4903-8b54-be57fcb29e40',
          email: 'test@example.com',
          password: 'disfdsfjdsfdsfjdsf5jn',
          createdAt: '2023-08-30 17:41:54',
          updatedAt: '2023-08-30 17:41:54'
        }
      );
      sinon.mock(bcrypt).expects('compareSync').returns(true);

      sinon.mock(clientRepository).expects('findOne').withExactArgs({ where: { clientId, companyId }, raw: true }).resolves(
        {
          clientId,
          companyId,
          name: 'test',
          representativeName: 'test',
          phone: '00000000000',
          postCode: '00000000',
          address: 'test',
          createdAt: '2023-08-30 17:41:54',
          updatedAt: '2023-08-30 17:41:54'
        }
      );
      sinon.mock(invoiceRepository).expects('create').withExactArgs({
        companyId,
        now,
        clientId,
        paymentAmount
      }).resolves(
        {
          invoiceId: '12fe7fdf-1786-4620-b91b-242a69cc6113',
          clientId,
          companyId,
          issuedAt: '2023-10-30T12:36:05.000Z',
          commission: 401,
          commissionRate: 0,
          tax: 41,
          taxRate: 0,
          invoiceAmount: 10442,
          paymentAmount,
          status: 'pending',
          paymentDeadline: '2023-12-30T23:59:59.000Z',
          createdAt: '2023-10-30T12:36:05.000Z',
          updatedAt: '2023-10-30T12:36:05.000Z'
        }
      );
      const res = await request(app).post('/api/invoices').set(defaultHeader).send({
        clientId,
        paymentAmount
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.invoiceId, '12fe7fdf-1786-4620-b91b-242a69cc6113');
    });
  });
});
