const { CdpClient } = require('@coinbase/cdp-sdk');

const client = new CdpClient({
  apiKeyId: '245f60d6-d339-4c77-ac85-fb629b78a8e5',
  apiKeySecret: '/wF2tL9l43H7lNAJwzolO8ROQBA0KUqQfjEpZUFiI+UM846XSDqI7ubNnccoH93OpxQ0/Rp0G/uxsUdPYGSUyg==',
  walletSecret: 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgEbQ7GwWc4edVSQepyFq5ObBiSwGpwz50fmP51Xl36+ChRANCAAQSVAOx/L4VT1wtSmYaOJan0vk2gXsGTuLCsp4YbXNRfZkY9Y7sG/070U9ZlDudETiO3vF958tCpDXpVkqXntdD',
});

const ADDRESS = '0xf9b6eF416BAFBf5333B6D1e2c5A3Fb60f7fECE23';

async function main() {
  try {
    console.log('Exporting private key for wallet:', ADDRESS);
    console.log('\n⚠️  SECURITY WARNING: This private key controls ALL funds.');
    console.log('   Treat it like a password - never share it publicly.\n');
    
    const privateKey = await client.evm.exportAccount({
      address: ADDRESS,
    });
    
    console.log('Private Key:', privateKey);
    console.log('\n--- How to access your ETH on Ethereum ---');
    console.log('1. Open MetaMask (or any wallet)');
    console.log('2. Import account → Private Key');
    console.log('3. Paste the key above');
    console.log('4. Switch network to "Ethereum Mainnet"');
    console.log('5. Your ETH should appear!');
    console.log('\nThen you can bridge it to Base using https://bridge.base.org/');
    
  } catch (err) {
    console.error('Error:', err.message);
    console.error('Full error:', err);
  }
}

main();
