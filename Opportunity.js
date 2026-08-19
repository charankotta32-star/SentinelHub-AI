const mongoose = require('mongoose');
const crypto = require('crypto');

const EvidenceSchema = new mongoose.Schema({
  field_name: { type: String, required: true }, // e.g., "funding_max", "deadline"
  extracted_value: { type: String, required: true },
  quote: { type: String, required: true },       // Direct text snippet from DOM
  source_url: { type: String, required: true },
  confidence: { type: Number, default: 0.95 },
  verified_at: { type: Date, default: Date.now }
}, { _id: false });

const OpportunitySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true },
  sponsor: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['INTERNSHIP', 'HACKATHON', 'GRANT', 'CAMPUS_EVENT'],
    required: true,
    index: true
  },
  source_url: { type: String, required: true },
  canonical_hash: { type: String, unique: true, index: true }, // SHA256 of source_url for zero duplicates

  // Polymorphic Financial Structure
  financials: {
    display_amount: { type: String, required: true }, // e.g., "₹10,00,000" or "₹75,000 - ₹1,00,000 / month"
    value_numeric: { type: Number, default: 0, index: true }, // Normalized INR value for sorting
    currency: { type: String, default: 'INR' },
    reward_type: {
      type: String,
      enum: ['STIPEND', 'PRIZE_POOL', 'GRANT_AID', 'FREE_ENTRY'],
      required: true
    }
  },

  // Granular Eligibility Engine
  eligibility: {
    min_cgpa: { type: Number, default: 0.0, index: true },
    allowed_years: [{ type: Number }], // e.g. [2, 3, 4] for 2nd, 3rd, 4th years
    target_domains: [{ type: String, index: true }], // ['Embedded Systems', 'Hardware/IoT', 'CS Core', 'AI/ML']
    excluded_domains: [{ type: String }],           // e.g. ['Pure Software'] for hardware grants
    is_student_eligible: { type: Boolean, default: true },
    requires_pi_sponsor: { type: Boolean, default: false } // Faculty PI endorsement required?
  },

  // Deadline & Timeline Risk
  timeline: {
    deadline: { type: Date, required: true, index: true },
    event_start: { type: Date },
    event_end: { type: Date },
    is_rolling: { type: Boolean, default: false }
  },

  // Audit & Reliability Telemetry
  evidence_chain: [EvidenceSchema],
  scraper_telemetry: {
    collector_id: { type: String, required: true },
    scraper_version: { type: String, default: 'v1.0' },
    health_score: { type: Number, min: 0, max: 100, default: 97 },
    last_scraped_at: { type: Date, default: Date.now }
  },

  status: { type: String, enum: ['OPEN', 'EXPIRED', 'FLAGGED_DRIFT'], default: 'OPEN', index: true }
}, { timestamps: true });

// Pre-save hook: Compute deterministic SHA256 canonical hash to prevent duplicates
OpportunitySchema.pre('validate', function(next) {
  if (this.source_url && !this.canonical_hash) {
    this.canonical_hash = crypto.createHash('sha256').update(this.source_url.trim().toLowerCase()).digest('hex');
  }
  next();
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);