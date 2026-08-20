const mongoose = require('mongoose');
const crypto = require('crypto');

const EvidenceSchema = new mongoose.Schema({
  field_name: { type: String, required: true },
  extracted_value: { type: String, required: true },
  quote: { type: String, required: true },
  source_url: { type: String, required: true },
  confidence: { type: Number, default: 0.95 },
  verified_at: { type: Date, default: Date.now }
}, { _id: false });

const OpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true },
  sponsor: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['INTERNSHIP', 'HACKATHON', 'GRANT', 'CAMPUS_EVENT', 'FELLOWSHIP'],
    required: true,
    index: true
  },
  source_url: { type: String, required: true },
  canonical_hash: { type: String, unique: true, index: true },

  financials: {
    display_amount: { type: String, required: true },
    value_numeric: { type: Number, default: 0, index: true },
    currency: { type: String, default: 'INR' },
    reward_type: {
      type: String,
      enum: ['STIPEND', 'PRIZE_POOL', 'GRANT_AID', 'FREE_ENTRY'],
      required: true
    }
  },

  eligibility: {
    min_cgpa: { type: Number, default: 0.0, index: true },
    allowed_years: [{ type: Number }],
    target_domains: [{ type: String, index: true }],
    is_student_eligible: { type: Boolean, default: true }
  },

  timeline: {
    deadline: { type: Date, required: true, index: true },
    event_start: { type: Date },
    event_end: { type: Date }
  },

  evidence_chain: [EvidenceSchema],

  scraper_telemetry: {
    collector_id: { type: String, required: true },
    scraper_version: { type: String, default: 'v1.0' },
    health_score: { type: Number, min: 0, max: 100, default: 97 },
    last_scraped_at: { type: Date, default: Date.now }
  },

  status: { type: String, enum: ['OPEN', 'EXPIRED', 'FLAGGED_DRIFT'], default: 'OPEN', index: true }
}, { timestamps: true });

OpportunitySchema.pre('validate', function(next) {
  if (this.source_url && !this.canonical_hash) {
    this.canonical_hash = crypto.createHash('sha256').update(this.source_url.trim().toLowerCase()).digest('hex');
  }
  next();
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);