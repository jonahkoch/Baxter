const { CdpClient } = require('@coinbase/cdp-sdk');

const client = new CdpClient({
  apiKeyId: '245f60d6-d339-4c77-ac85-fb629b78a8e5',
  apiKeySecret: '/wF2tL9l43H7lNAJwzolO8ROQBA0KUqQfjEpZUFiI+UM846XSDqI7ubNnccoH93OpxQ0/Rp0G/uxsUdPYGSUyg==',
});

async function main() {
  try {
    // List EVM accounts
    const accounts = await client.evm.listAccounts();
    console.log('Accounts:', JSON.stringify(accounts, null, 2));
  } catch (err) {
    console.error('Error:', err.message);
    console.error('Full error:', err);
  }
}

main();
