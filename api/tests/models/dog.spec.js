const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
    describe('heightMin', () => {
      it('should throw an error if heightMin is null', (done) => {
        Dog.create({})
        .then(() => done(new Error('It requires a valid height Min')))
        .catch(() => done());
      });
      it('should throw an error if heightMin is greater than heightMax', (done) => {
        Dog.create({})
        .then(() => done(new Error('It requires that Height Min be lower than Height Max')))
        .catch(() => done());
      });
      it('should work when its a valid Height Min', () => {
        Dog.create({ heightMin: '9' });
      });
    });
  });
});