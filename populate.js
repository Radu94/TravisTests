'use strict';

const configFile = require('./test/config.json');
const Client = require('./index.js').Client;
const Promise = require('bluebird');

const rdn = 'cn=testUser';
const dn = configFile.ldapTestEntries.entryDn;
const validEntryObject = [
  {
    attr: 'objectClass',
    vals: ['person'],
  },
  {
    attr: 'description',
    vals: ['testData'],
  },
  {
    attr: 'cn',
    vals: ['test'],
  },
  {
    attr: 'sn',
    vals: ['test'],
  },


];


const ldapClient = new Client(configFile.ldapTestEntries.host);

ldapClient.initialize()
  .then(() => {
    return ldapClient.bind(
      configFile.ldapTestEntries.userDn,
      configFile.ldapTestEntries.userPassword);
  })
  .then(() => {
    ldapClient.add(dn, validEntryObject)
      .then(() => {
        const args = [];
        for (let i = 0; i < 10000; i++) {
          args.push(`${`${rdn + i}`},${dn}`);
        }

        Promise.map(args, (arg) => {
          return ldapClient.add(arg, validEntryObject);
        }, {concurrency: 100});
      });
  });
