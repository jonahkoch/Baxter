const { CdpClient } = require('@coinbase/cdp-sdk');
const { createPublicClient, http, parseEther } = require('viem');
const { base } = require('viem/chains');

const client = new CdpClient({
  apiKeyId: '245f60d6-d339-4c77-ac85-fb629b78a8e5',
  apiKeySecret: '/wF2tL9l43H7lNAJwzolO8ROQBA0KUqQfjEpZUFiI+UM846XSDqI7ubNnccoH93OpxQ0/Rp0G/uxsUdPYGSUyg==',
  walletSecret: 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgEbQ7GwWc4edVSQepyFq5ObBiSwGpwz50fmP51Xl36+ChRANCAAQSVAOx/L4VT1wtSmYaOJan0vk2gXsGTuLCsp4YbXNRfZkY9Y7sG/070U9ZlDudETiO3vF958tCpDXpVkqXntdD',
});

const ADDRESS = '0xf9b6eF416BAFBf5333B6D1e2c5A3Fb60f7fECE23';

// ERC-8004 Contract addresses on Base Mainnet
const IDENTITY_REGISTRY = '0x8004A169FB4a3325136EB29fA0ceB6D2e539a432';

async function checkBalance() {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  try {
    const balance = await publicClient.getBalance({ address: ADDRESS });
    console.log('Balance:', balance.toString(), 'wei');
    console.log('Balance:', (Number(balance) / 1e18).toFixed(6), 'ETH');
    return balance;
  } catch (err) {
    console.error('Error checking balance:', err.message);
    return 0n;
  }
}

async function main() {
  console.log('Wallet:', ADDRESS);
  console.log('\n--- Checking Balance ---');
  const balance = await checkBalance();
  
  if (balance === 0n) {
    console.log('\n⚠️  Wallet is empty. You need to fund it with ETH on Base Mainnet.');
    console.log('   Send ETH to: ' + ADDRESS);
    console.log('\n   Once funded, I can register your ERC-8004 agent identity.');
    console.log('   Estimated cost: ~0.001-0.005 ETH for gas + registration fee');
  } else {
    console.log('\n✅ Wallet funded! Ready to register ERC-8004 identity.');
  }
}

main();
