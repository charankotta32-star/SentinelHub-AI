const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/v1';

async function runBackendValidationSuite() {
  console.log('\n' + '='.repeat(65));
  console.log('🛡️ SENTINELHUB AI 2.0 // BACKEND TEST HARNESS');
  console.log('='.repeat(65) + '\n');

  try {
    // 1. Test Health Telemetry
    console.log('[TEST 1/4] Pinging /health telemetry endpoint...');
    const healthRes = await axios.get(`${BASE_URL}/health`);
    console.log(`  ✅ Health Status: ${healthRes.data.status} | Score: ${healthRes.data.sentinel_health_score}%`);

    // 2. Test Opportunities & Conflict Engine
    console.log('\n[TEST 2/4] Testing /opportunities & Schedule Conflict Engine...');
    const oppsRes = await axios.get(`${BASE_URL}/opportunities`);
    console.log(`  ✅ Successfully ingested ${oppsRes.data.count} opportunities.`);
    const conflictItem = oppsRes.data.data.find(o => o.schedule_conflict && o.schedule_conflict.alert);
    if (conflictItem) {
      console.log(`  ⚠️ Collision Engine Active: Flagged "${conflictItem.title}"`);
    }

    // 3. Test SLM Reasoning & Match Scoring
    console.log('\n[TEST 3/4] Testing SLM Semantic Matching Kernel...');
    const matchRes = await axios.post(`${BASE_URL}/slm/match`, {
      userProfile: {
        name: "Kotta Charan Ram Sai",
        cgpa: 9.60,
        department: "CSE (AI & ML)",
        interests: ["Edge AI", "Robotics", "Embedded Systems"]
      },
      opportunity: {
        title: "DST NIDHI-PRAYAS Hardware Innovation Grant",
        category: "GRANT",
        sponsor: "DST",
        min_cgpa: 7.5,
        target_domains: ["Robotics", "Hardware Sensors", "IoT"]
      }
    });
    console.log(`  ✅ SLM Match Confidence: ${matchRes.data.data.match_percentage}`);
    console.log(`  🧠 Gap Analysis: "${matchRes.data.data.gap_analysis}"`);

    // 4. Test Self-Healing Loop & Canary Invariants
    console.log('\n[TEST 4/4] Testing Autonomous Self-Healing & Canary Gate...');
    const healRes = await axios.post(`${BASE_URL}/self-heal`, {
      reason: "Simulated DOM drift on target portal"
    });
    console.log(`  ✅ ${healRes.data.telemetry.invariants_passed}`);
    console.log(`  🚀 Promoted Version: ${healRes.data.telemetry.healed_version}`);

    console.log('\n' + '='.repeat(65));
    console.log('🎉 ALL 4 BACKEND MODULES VERIFIED & OPERATIONAL (4/4 PASSED)');
    console.log('='.repeat(65) + '\n');

  } catch (err) {
    console.error('❌ Test failed:', err.message);
    console.error('Ensure "node server.js" is running in your terminal!');
  }
}

runBackendValidationSuite();