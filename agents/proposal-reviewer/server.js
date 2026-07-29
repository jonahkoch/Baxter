import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const PORT = process.env.PORT || 8080;
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:3001/api/v1';
const PAYMENT_API_KEY = process.env.PAYMENT_API_KEY || 'masumi-admin-key-very-secure-2024';
const PRICE_LOVELACE = process.env.PRICE_LOVELACE || '3500000'; // 3.5 ADA
const AGENT_IDENTIFIER = process.env.AGENT_IDENTIFIER || '7e8bdaf2b2b919a3a4b94002cafb50086c0c845fe535d07a77ab7f77545d7326645aba0b34944c7cc7e4eccaa95f1c22549d4a3f465d103b3ceb2264';

// In-memory job store
const jobs = new Map();

// MIP-003 Input Schema
const INPUT_SCHEMA = {
  type: "object",
  properties: {
    proposal_text: {
      type: "string",
      description: "Full text of the Cardano governance proposal (govAction)",
      maxLength: 500000
    },
    proposal_id: {
      type: "string",
      description: "Cardano govAction ID (e.g., gov_action1...)",
      maxLength: 128
    },
    proposal_type: {
      type: "string",
      enum: ["TreasuryWithdrawals", "ParameterChange", "HardForkInitiation", "NoConfidence", "NewCommittee", "NewConstitution", "InfoAction"],
      description: "Type of governance action"
    },
    requested_ada: {
      type: "string",
      description: "Amount of ADA requested (if TreasuryWithdrawals)"
    },
    applicant: {
      type: "string",
      description: "Name of the applicant/team"
    }
  },
  required: ["proposal_text", "proposal_type"]
};

// Rubric assessment logic
function assessProposal(data) {
  const text = data.proposal_text || '';
  const type = data.proposal_type || '';
  const requestedAda = parseFloat(data.requested_ada || '0');
  
  // Layer 0: Priority & Fit
  const layer0 = {
    real_priority: scoreRealPriority(text, type),
    public_value: scorePublicValue(text),
    instrument_fit: scoreInstrumentFit(text, type),
    decentralization_delta: scoreDecentralization(text),
    opportunity_cost: scoreOpportunityCost(text, requestedAda)
  };
  
  // Layer 1: Proposal Quality
  const layer1 = {
    basics: scoreBasics(text, data),
    value_impact: scoreValueImpact(text, type),
    execution_accountability: scoreExecution(text),
    commercial_terms: scoreCommercialTerms(text, type, requestedAda)
  };
  
  // Layer 2: Scoring
  const scores = calculateScores(layer0, layer1);
  
  // Verdict
  const verdict = determineVerdict(scores, layer0, layer1);
  
  return {
    summary: {
      overall_score: scores.overall,
      max_score: 100,
      verdict: verdict.verdict,
      confidence: verdict.confidence,
      recommendation: verdict.recommendation
    },
    layer0_priority_fit: {
      score: scores.layer0,
      max: 25,
      breakdown: layer0,
      verdict: scores.layer0 >= 15 ? "PASS" : "FAIL"
    },
    layer1_quality: {
      score: scores.layer1,
      max: 50,
      breakdown: layer1,
      verdict: scores.layer1 >= 30 ? "PASS" : "FAIL"
    },
    layer2_scoring: {
      score: scores.layer2,
      max: 25,
      breakdown: scores.layer2_breakdown,
      verdict: scores.layer2 >= 15 ? "PASS" : "FAIL"
    },
    risk_flags: verdict.risks,
    conditions_for_support: verdict.conditions,
    rubric_version: "1.2"
  };
}

// Scoring helpers
function scoreRealPriority(text, type) {
  const keywords = ['infrastructure', 'security', 'education', 'developer tooling', 'core protocol', 'decentralization'];
  const score = keywords.reduce((s, kw) => s + (text.toLowerCase().includes(kw) ? 1 : 0), 0);
  if (type === 'TreasuryWithdrawals') return Math.min(5, 2 + score * 0.5);
  return Math.min(5, 3 + score * 0.4);
}

function scorePublicValue(text) {
  const hasOpenSource = /open.source|MIT|Apache|GPL|github.com/i.test(text);
  const hasPublicGoods = /public good|community|open access|free/i.test(text);
  const hasMetrics = /KPI|metric|measure|outcome|deliverable/i.test(text);
  return (hasOpenSource ? 2 : 0) + (hasPublicGoods ? 2 : 0) + (hasMetrics ? 1 : 0);
}

function scoreInstrumentFit(text, type) {
  if (type === 'TreasuryWithdrawals') {
    const hasReturn = /return|repay|revenue.share|yield|principal/i.test(text);
    const hasMilestones = /milestone|gate|phase|stage/i.test(text);
    return (hasReturn ? 3 : 1) + (hasMilestones ? 2 : 0);
  }
  return 4; // Non-treasury types have different fit criteria
}

function scoreDecentralization(text) {
  const hasMultisig = /multisig|multi.sig|independent.custod/i.test(text);
  const hasOversight = /oversight|committee|third.party|audit/i.test(text);
  const concentrationRisk = /sole.provider|exclusive|monopoly/i.test(text);
  return (hasMultisig ? 2 : 0) + (hasOversight ? 2 : 0) + (concentrationRisk ? -2 : 0);
}

function scoreOpportunityCost(text, requestedAda) {
  if (requestedAda > 10000000) return 1; // >10M ADA
  if (requestedAda > 5000000) return 2;  // >5M
  if (requestedAda > 1000000) return 3;  // >1M
  return 4;
}

function scoreBasics(text, data) {
  const hasName = data.applicant && data.applicant.length > 0;
  const hasAmount = data.requested_ada && parseFloat(data.requested_ada) > 0;
  const hasDuration = /month|year|quarter|duration|timeline/i.test(text);
  const hasTeam = /team|founder|lead|developer/i.test(text);
  return (hasName ? 1 : 0) + (hasAmount ? 1 : 0) + (hasDuration ? 1 : 0) + (hasTeam ? 1 : 0);
}

function scoreValueImpact(text, type) {
  const additionality = /new|first|novel|unique|additional/i.test(text) ? 2 : 0;
  const retained = /sustainable|ongoing|permanent|long.term/i.test(text) ? 2 : 0;
  const tenX = /10x|10X|order.of.magnitude|disruptive|transform/i.test(text) ? 1 : 0;
  return additionality + retained + tenX;
}

function scoreExecution(text) {
  const milestones = /milestone|deliverable|phase|stage|checkpoint/i.test(text) ? 2 : 0;
  const audit = /audit|review|verification|assurance/i.test(text) ? 2 : 0;
  const enforceability = /clawback|penalty|wind.down|termination|fail/i.test(text) ? 1 : 0;
  return milestones + audit + enforceability;
}

function scoreCommercialTerms(text, type, requestedAda) {
  if (type !== 'TreasuryWithdrawals') return 4;
  const hasReturn = /return|repay|yield|revenue|profit/i.test(text) ? 2 : 0;
  const hasEquity = /equity|warrant|token|ownership/i.test(text) ? 1 : 0;
  const hasCap = /cap|limit|maximum|ceiling/i.test(text) ? 1 : 0;
  return hasReturn + hasEquity + hasCap;
}

function calculateScores(l0, l1) {
  const layer0Score = Math.max(0, l0.real_priority + l0.public_value + l0.instrument_fit + l0.decentralization_delta + l0.opportunity_cost);
  const layer1Score = Math.max(0, l1.basics + l1.value_impact + l1.execution_accountability + l1.commercial_terms);
  
  const l2Breakdown = {
    problem_clarity: textQualityScore(l0),
    solution_quality: l1.value_impact * 2,
    team_credibility: l1.basics * 2,
    risk_management: l1.execution_accountability * 2,
    financial_terms: l1.commercial_terms * 2
  };
  const layer2Score = Object.values(l2Breakdown).reduce((a, b) => a + b, 0);
  
  const overall = Math.round((layer0Score / 20 * 25) + (layer1Score / 16 * 50) + (layer2Score / 50 * 25));
  
  return {
    layer0: Math.round(layer0Score / 20 * 25),
    layer1: Math.round(layer1Score / 16 * 50),
    layer2: Math.round(layer2Score / 50 * 25),
    layer2_breakdown: l2Breakdown,
    overall: Math.min(100, overall)
  };
}

function textQualityScore(l0) {
  return Math.min(10, l0.real_priority + l0.public_value);
}

function determineVerdict(scores, l0, l1) {
  const risks = [];
  if (scores.layer0 < 15) risks.push("Low priority/fit — may not be a real Treasury need");
  if (scores.layer1 < 30) risks.push("Weak proposal quality — missing key elements");
  if (l0.decentralization_delta < 2) risks.push("Decentralization concerns — no independent oversight");
  if (l1.execution_accountability < 3) risks.push("Execution risk — weak milestones or accountability");
  if (l1.commercial_terms < 2) risks.push("Poor commercial terms — no return mechanism or cap");
  
  const conditions = [];
  if (scores.overall < 70) conditions.push("Strengthen milestones and accountability");
  if (l0.public_value < 3) conditions.push("Add open-source commitments or public deliverables");
  if (l1.commercial_terms < 3) conditions.push("Include return mechanism or revenue share");
  if (l0.decentralization_delta < 3) conditions.push("Add independent oversight or multisig");
  
  let verdict, recommendation, confidence;
  
  if (scores.overall >= 75 && risks.length <= 1) {
    verdict = "YES";
    recommendation = "Support this proposal with standard monitoring";
    confidence = "High";
  } else if (scores.overall >= 60 && risks.length <= 2) {
    verdict = "YES_WITH_CONDITIONS";
    recommendation = "Support if conditions are met";
    confidence = "Medium";
  } else if (scores.overall >= 45) {
    verdict = "ABSTAIN";
    recommendation = "Too risky to support, not clearly bad enough to oppose";
    confidence = "Medium";
  } else {
    verdict = "NO";
    recommendation = "Oppose — proposal fails key rubric criteria";
    confidence = "High";
  }
  
  return { verdict, recommendation, confidence, risks, conditions };
}

// MIP-003 Endpoints

// GET /availability
app.get('/availability', (req, res) => {
  res.json({ status: 'available', timestamp: new Date().toISOString() });
});

// GET /input_schema
app.get('/input_schema', (req, res) => {
  res.json(INPUT_SCHEMA);
});

// POST /start_job
app.post('/start_job', async (req, res) => {
  try {
    const { input_data, identifier_from_purchaser } = req.body;
    
    // Validate input
    if (!input_data || !Array.isArray(input_data)) {
      return res.status(400).json({ error: 'INVALID_INPUT', message: 'input_data array required' });
    }
    
    // Parse input_data key-value pairs
    const data = {};
    for (const item of input_data) {
      if (item.key && item.value !== undefined) {
        data[item.key] = item.value;
      }
    }
    
    // Validate required fields
    if (!data.proposal_text || !data.proposal_type) {
      return res.status(400).json({ 
        error: 'INVALID_INPUT', 
        message: 'proposal_text and proposal_type are required' 
      });
    }
    
    // Calculate input hash
    const inputHash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
    
    // Create payment request via Masumi Payment Service
    const now = new Date();
    const payByTime = new Date(now.getTime() + 5 * 60 * 1000).toISOString(); // 5 min to pay
    const submitResultTime = new Date(now.getTime() + 20 * 60 * 1000).toISOString(); // 20 min to submit
    const unlockTime = new Date(now.getTime() + 40 * 60 * 1000).toISOString(); // 40 min unlock (20+ min diff)
    
    const paymentRes = await fetch(`${PAYMENT_SERVICE_URL}/payment`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'token': PAYMENT_API_KEY 
      },
      body: JSON.stringify({
        network: 'Preprod',
        agentIdentifier: AGENT_IDENTIFIER,
        inputHash: inputHash,
        identifierFromPurchaser: crypto.randomBytes(8).toString('hex'),
        payByTime: payByTime,
        submitResultTime: submitResultTime,
        unlockTime: unlockTime
      })
    });
    
    if (!paymentRes.ok) {
      const err = await paymentRes.text();
      console.error('Payment creation failed:', err);
      return res.status(500).json({ error: 'PAYMENT_CREATION_FAILED', message: err });
    }
    
    const paymentData = await paymentRes.json();
    const blockchainIdentifier = paymentData.data?.blockchainIdentifier || paymentData.blockchainIdentifier;
    const paymentAddress = paymentData.data?.paymentAddress || paymentData.paymentAddress;
    
    // Generate job ID
    const jobId = `prop-review-${crypto.randomBytes(8).toString('hex')}`;
    
    // Store job
    jobs.set(jobId, {
      id: jobId,
      status: 'awaiting_payment',
      blockchainIdentifier,
      paymentAddress,
      amountLovelace: PRICE_LOVELACE,
      inputData: data,
      identifierFromPurchaser: identifier_from_purchaser,
      createdAt: new Date().toISOString(),
      result: null
    });
    
    res.json({
      job_id: jobId,
      identifier_from_seller: jobId,
      blockchain_identifier: blockchainIdentifier,
      payment_address: paymentAddress,
      amount_lovelace: parseInt(PRICE_LOVELACE),
      status: 'awaiting_payment'
    });
    
  } catch (err) {
    console.error('Start job error:', err);
    res.status(500).json({ error: 'JOB_CREATION_FAILED', message: err.message });
  }
});

// GET /status
app.get('/status', (req, res) => {
  const { job_id } = req.query;
  
  if (!job_id || !jobs.has(job_id)) {
    return res.status(404).json({ error: 'JOB_NOT_FOUND' });
  }
  
  const job = jobs.get(job_id);
  
  if (job.status === 'completed') {
    // Calculate hashes for verification
    const inputHash = crypto.createHash('sha256').update(JSON.stringify(job.inputData)).digest('hex');
    const outputHash = crypto.createHash('sha256').update(JSON.stringify(job.result)).digest('hex');
    
    res.json({
      job_id: job.id,
      status: 'completed',
      output: job.result,
      input_hash: inputHash,
      output_hash: outputHash,
      execution_time_seconds: job.executionTime || 0
    });
  } else if (job.status === 'failed') {
    res.json({
      job_id: job.id,
      status: 'failed',
      error: job.error || 'PROCESSING_ERROR',
      message: job.errorMessage || 'Unknown error'
    });
  } else if (job.status === 'running') {
    res.json({
      job_id: job.id,
      status: 'running',
      progress: { current_step: 'Analyzing proposal', percentage: 50 }
    });
  } else {
    res.json({
      job_id: job.id,
      status: 'awaiting_payment',
      payment_address: job.paymentAddress,
      amount_lovelace: parseInt(PRICE_LOVELACE)
    });
  }
});

// GET /demo
app.get('/demo', (req, res) => {
  const demoResult = assessProposal({
    proposal_text: `Sample Treasury Withdrawal Proposal
    
Applicant: Eternl Wallet
Amount: ₳1,000,000
Duration: 12 months

Description: Funding for Eternl wallet infrastructure improvements including:
- Open-source hardware wallet integration
- Multi-sig support improvements
- Public API enhancements
- Security audits by third-party firms

Deliverables:
- Monthly progress reports
- Open-source code releases (MIT license)
- Quarterly security audits
- Community developer documentation

Accountability:
- Milestone-based disbursement
- Independent oversight committee
- Clawback provisions for missed milestones
- 6-month review gate`,
    proposal_type: 'TreasuryWithdrawals',
    proposal_id: 'gov_action_sample_123',
    requested_ada: '1000000',
    applicant: 'Eternl Wallet'
  });
  
  res.json(demoResult);
});

// POST /test_review — Skip payment, run assessment directly (for testing)
app.post('/test_review', async (req, res) => {
  try {
    const { input_data } = req.body;
    
    if (!input_data || !Array.isArray(input_data)) {
      return res.status(400).json({ error: 'INVALID_INPUT', message: 'input_data array required' });
    }
    
    // Parse input_data key-value pairs
    const data = {};
    for (const item of input_data) {
      if (item.key && item.value !== undefined) data[item.key] = item.value;
    }
    
    if (!data.proposal_text || !data.proposal_type) {
      return res.status(400).json({ error: 'INVALID_INPUT', message: 'proposal_text and proposal_type are required' });
    }
    
    // Run assessment immediately (no payment)
    const startTime = Date.now();
    const result = assessProposal(data);
    const executionTime = Math.round((Date.now() - startTime) / 1000);
    
    // Calculate hashes for verification
    const inputHash = crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
    const outputHash = crypto.createHash('sha256').update(JSON.stringify(result)).digest('hex');
    
    res.json({
      status: 'completed',
      output: result,
      input_hash: inputHash,
      output_hash: outputHash,
      execution_time_seconds: executionTime,
      note: 'TEST MODE — No payment required. For production, use POST /start_job'
    });
    
  } catch (err) {
    console.error('Test review error:', err);
    res.status(500).json({ error: 'PROCESSING_ERROR', message: err.message });
  }
});

// Background: Poll for payments and process jobs
async function pollPayments() {
  try {
    for (const [jobId, job] of jobs) {
      if (job.status !== 'awaiting_payment') continue;
      
      // Check payment status
      const res = await fetch(`${PAYMENT_SERVICE_URL}/payment?blockchainIdentifier=${job.blockchainIdentifier}`, {
        headers: { 'token': PAYMENT_API_KEY }
      });
      
      if (!res.ok) continue;
      
      const data = await res.json();
      const payment = data.data?.Payment?.[0];
      
      if (payment && payment.status === 'FundsLocked') {
        // Payment received — start processing
        job.status = 'running';
        
        // Run assessment
        const startTime = Date.now();
        const result = assessProposal(job.inputData);
        job.executionTime = Math.round((Date.now() - startTime) / 1000);
        
        // Submit result to payment service
        const inputHash = crypto.createHash('sha256').update(JSON.stringify(job.inputData)).digest('hex');
        const outputHash = crypto.createHash('sha256').update(JSON.stringify(result)).digest('hex');
        
        const submitRes = await fetch(`${PAYMENT_SERVICE_URL}/payment/submit-result`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'token': PAYMENT_API_KEY 
          },
          body: JSON.stringify({
            blockchainIdentifier: job.blockchainIdentifier,
            resultHash: outputHash
          })
        });
        
        if (submitRes.ok) {
          job.status = 'completed';
          job.result = result;
          console.log(`Job ${jobId} completed — score: ${result.summary.overall_score}`);
        } else {
          job.status = 'failed';
          job.error = 'SUBMIT_FAILED';
          job.errorMessage = await submitRes.text();
        }
      }
    }
  } catch (err) {
    console.error('Poll error:', err.message);
  }
}

// Poll every 10 seconds
setInterval(pollPayments, 10000);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Proposal Reviewer Agent running on port ${PORT}`);
  console.log(`MIP-003 endpoints:`);
  console.log(`  GET  /availability`);
  console.log(`  GET  /input_schema`);
  console.log(`  POST /start_job`);
  console.log(`  GET  /status?job_id=...`);
  console.log(`  GET  /demo`);
});
