'use strict';

const should = require('should');

describe('Suite of tests for compatible software versions', () => {

    it('node version should be above 6',(done) => {
        process.versions.node.should.be.above('6');
        done();

    });

 
});







   

