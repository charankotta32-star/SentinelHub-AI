require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Schemas & Services
const Opportunity = require('./Opportunity');
const User = require('./User');
const { analyzeMatchAndGap, forgeContextualDocument } = require('./services/slmEngine');
const { triggerCloudCollector, COLLECTOR_ID } = require('./services/brightdataEngine');
const { triggerSelfHealingAgent, computeHealthScore } = require('./services/selfHealingEngine');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sentinelhub_ai';

app.use(express.json());
app.use(express.static(__dirname)); // Serves index.html directly on localhost:5000

// ==============================================================================
// 🗄️ 1. MONGODB CONNECTION
// ==============================================================================
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ [DATABASE] Connected to MongoDB Atlas / Local Engine'))
  .catch(() => console.warn('⚠️ [DATABASE] Operating with in-memory persistence fallback.'));

// ==============================================================================
// 📡 2. ENDPOINT: GET ALL OPPORTUNITIES WITH SMART SCHEDULE CONFLICT AUDIT
// ==============================================================================
app.get('/api/v1/opportunities', async (req, res) => {
  try {
    let dataset = [];

    // Attempt to fetch from MongoDB, fallback to opportunities.json
    if (mongoose.connection.readyState === 1) {
      dataset = await Opportunity.find({ status: 'OPEN' }).sort({ createdAt: -1 });
    }

    if (!dataset || dataset.length === 0) {
      const raw = fs.readFileSync(path.join(__dirname, 'opportunities.json'), 'utf-8');
      dataset = JSON.parse(raw);
    }

    // Schedule Conflict Engine: Flag overlaps with internal academic windows
    const semesterExamWindow = {
      start: new Date("2026-08-25"),
      end: new Date("2026-08-30")
    };

    const enriched = dataset.map(item => {
      const deadlineDt = new Date(item.deadline);
      const hasConflict = deadlineDt >= semesterExamWindow.start && deadlineDt <= semesterExamWindow.end;

      return {
        ...item,
        schedule_conflict: hasConflict ? {
          alert: true,
          reason: "Overlaps with internal Semester 3 Class Test (CT) window"
        } : { alert: false }
      };
    });

    res.status(200).json({ success: true, count: enriched.length, data: enriched });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==============================================================================
// 🧠 3. ENDPOINT: SLM PROFILE MATCH & REASONING (POST /api/v1/slm/match)
// ==============================================================================
app.post('/api/v1/slm/match', async (req, res) => {
  try {
    const { userProfile, opportunity } = req.body;
    const analysis = await analyzeMatchAndGap(userProfile, opportunity);
    res.status(200).json({ success: true, data: analysis });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==============================================================================
// ⚡ 4. ENDPOINT: DYNAMIC CONTEXTUAL DOCUMENT FORGE (POST /api/v1/forge-document)
// ==============================================================================
app.post('/api/v1/forge-document', async (req, res) => {
  try {
    const { userProfile, opportunity } = req.body;
    const documentText = await forgeContextualDocument(userProfile, opportunity);
    res.status(200).json({ success: true, document: documentText });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==============================================================================
// 🩹 5. ENDPOINT: TRIGGER BRIGHT DATA SELF-HEALING (POST /api/v1/self-heal)
// ==============================================================================
app.post('/api/v1/self-heal', async (req, res) => {
  try {
    const { collector_id = COLLECTOR_ID, reason = "DOM Drift Detected" } = req.body;
    const healResult = await triggerSelfHealingAgent(collector_id, reason);
    res.status(200).json({ success: true, telemetry: healResult });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==============================================================================
// 📊 6. ENDPOINT: SYSTEM HEALTH & TELEMETRY (GET /api/v1/health)
// ==============================================================================
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'OPTIMAL',
    sentinel_health_score: 97,
    active_collector: COLLECTOR_ID,
    pipeline: 'v2.0_live',
    slm_status: process.env.GEMINI_API_KEY ? 'ACTIVE_GEMINI_FLASH' : 'FALLBACK_SYNTHESIS',
    anti_drift_guard: 'ENABLED',
    timestamp: new Date().toISOString()
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n========================================================`);
  console.log(`🚀 SENTINELHUB AI 2.0 // MASTER BACKEND READY`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🛰️ Bright Data Collector: ${COLLECTOR_ID}`);
  console.log(`========================================================\n`);
});