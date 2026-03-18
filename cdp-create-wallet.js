const { CdpClient } = require('@coinbase/cdp-sdk');

const client = new CdpClient({
  apiKeyId: '245f60d6-d339-4c77-ac85-fb629b78a8e5',
  apiKeySecret: '/wF2tL9l43H7lNAJwzolO8ROQBA0KUqQfjEpZUFiI+UM846XSDqI7ubNnccoH93OpxQ0/Rp0G/uxsUdPYGSUyg==',
  walletSecret: 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgEbQ7GwWc4edVSQepyFq5ObBiSwGpwz50fmP51Xl36+ChRANCAAQSVAOx/L4VT1wtSmYaOJan0vk2gXsGTuLCsp4YbXNRfZkY9Y7sG/070U9ZlDudETiO3vF958tCpDXpVkqXntdD',
});

async function main() {
  try {
    // Create a new EVM account on Base Mainnet
    console.log('Creating new EVM account on Base Mainnet...');
    const account = await client.evm.createAccount({
      name: 'Baxter-Agent-Wallet',
    });
    console.log('Account created:', JSON.stringify(account, null, 2));
    
    // Get the account address
    console.log('\nWallet Address:', account.address);
    console.log('\nAccount ID:', account.id);
    
  } catch (err) {
    console.error('Error:', err.message);
    console.error('Full error:', err);
  }
}

main();
