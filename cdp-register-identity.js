const { CdpClient } = require('@coinbase/cdp-sdk');
const { encodeFunctionData, parseAbi, serializeTransaction } = require('viem');

const client = new CdpClient({
  apiKeyId: '245f60d6-d339-4c77-ac85-fb629b78a8e5',
  apiKeySecret: '/wF2tL9l43H7lNAJwzolO8ROQBA0KUqQfjEpZUFiI+UM846XSDqI7ubNnccoH93OpxQ0/Rp0G/uxsUdPYGSUyg==',
  walletSecret: 'MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgEbQ7GwWc4edVSQepyFq5ObBiSwGpwz50fmP51Xl36+ChRANCAAQSVAOx/L4VT1wtSmYaOJan0vk2gXsGTuLCsp4YbXNRfZkY9Y7sG/070U9ZlDudETiO3vF958tCpDXpVkqXntdD',
});

const ADDRESS = '0xf9b6eF416BAFBf5333B6D1e2c5A3Fb60f7fECE23';
const IDENTITY_REGISTRY = '0x8004A169FB4a3325136EB29fA0ceB6D2e539a432';

// ERC-8004 Identity Registry ABI
const identityRegistryAbi = parseAbi([
  'function register(string memory metadataURI) external returns (uint256)',
]);

async function main() {
  console.log('Registering ERC-8004 agent identity...');
  console.log('Wallet:', ADDRESS);
  console.log('Registry:', IDENTITY_REGISTRY);
  
  try {
    // Metadata for the agent identity
    const metadata = JSON.stringify({
      name: "Baxter",
      description: "AI agent for Jonah - personal assistant and developer",
      version: "1.0",
      capabilities: ["messaging", "research", "coding", "automation"],
      created: new Date().toISOString(),
    });
    
    const metadataURI = `data:application/json;base64,${Buffer.from(metadata).toString('base64')}`;
    
    // Encode the register function call
    const data = encodeFunctionData({
      abi: identityRegistryAbi,
      functionName: 'register',
      args: [metadataURI],
    });
    
    console.log('\nTransaction data prepared');
    console.log('Sending transaction on Base Mainnet...');
    
    // Send the transaction with network specified
    const tx = await client.evm.sendTransaction({
      address: ADDRESS,
      network: 'base',
      transaction: {
        to: IDENTITY_REGISTRY,
        data: data,
        value: 0n,
      },
    });
    
    console.log('\n✅ Transaction sent!');
    console.log('Transaction hash:', tx.transactionHash);
    
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    console.error('Full error:', err);
  }
}

main();
