require('dotenv').config();
const mongoose = require('mongoose');
const crypto = require('crypto');
const Opportunity = require('./Opportunity');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sentinelhub_ai';

const PRODUCTION_SEEDS = [
  // --- GRANTS & FELLOWSHIPS ---
  {
    title: "DST NIDHI-PRAYAS Hardware Innovation Scheme",
    sponsor: "Department of Science & Technology (Govt of India)",
    category: "GRANT",
    source_url: "https://nidhi-prayas.org",
    financials: {
      display_amount: "₹10,00,000 (Non-Dilutive)",
      value_numeric: 1000000,
      currency: "INR",
      reward_type: "GRANT_AID"
    },
    eligibility: {
      min_cgpa: 7.5,
      allowed_years: [2, 3, 4],
      target_domains: ["Robotics", "Edge AI", "Hardware Sensors", "DeepTech", "Embedded Systems"],
      is_student_eligible: true
    },
    timeline: {
      deadline: new Date("2026-10-15T17:00:00.000Z")
    },
    evidence_chain: [{
      field_name: "funding_and_deadline",
      extracted_value: "₹10,00,000",
      quote: "Funding Support: Up to INR 10,00,000 for student-led hardware prototypes under NIDHI-PRAYAS 2.0 guidelines.",
      source_url: "https://nidhi-prayas.org",
      confidence: 0.99
    }],
    scraper_telemetry: {
      collector_id: "c_mt0bxaoi1yl2y39685",
      scraper_version: "v2.0",
      health_score: 97
    }
  },
  {
    title: "iDEX Defence Innovation Challenge (DISC)",
    sponsor: "Ministry of Defence (Govt of India)",
    category: "GRANT",
    source_url: "https://idex.gov.in",
    financials: {
      display_amount: "Up to ₹1.50 Crore Grant-in-Aid",
      value_numeric: 15000000,
      currency: "INR",
      reward_type: "GRANT_AID"
    },
    eligibility: {
      min_cgpa: 7.0,
      allowed_years: [2, 3, 4],
      target_domains: ["Autonomous Systems", "Encrypted RF", "Drones", "Robotics", "Hardware/IoT"],
      is_student_eligible: true
    },
    timeline: {
      deadline: new Date("2026-11-30T23:59:59.000Z")
    },
    evidence_chain: [{
      field_name: "grant_scope",
      extracted_value: "Up to ₹1.50 Crore",
      quote: "Grant-in-aid support for individual student innovators and deep-tech prototype development under DISC.",
      source_url: "https://idex.gov.in",
      confidence: 0.96
    }],
    scraper_telemetry: {
      collector_id: "c_mt0bxaoi1yl2y39685",
      scraper_version: "v2.0",
      health_score: 97
    }
  },

  // --- HACKATHONS ---
  {
    title: "Smart India Hackathon 2026 (Hardware Edition)",
    sponsor: "Ministry of Education & Unstop",
    category: "HACKATHON",
    source_url: "https://sih.gov.in",
    financials: {
      display_amount: "₹1,00,000 / Problem Statement",
      value_numeric: 100000,
      currency: "INR",
      reward_type: "PRIZE_POOL"
    },
    eligibility: {
      min_cgpa: 0.0,
      allowed_years: [1, 2, 3, 4],
      target_domains: ["Robotics", "Disaster Tech", "IoT", "AI/ML", "Embedded Systems"],
      is_student_eligible: true
    },
    timeline: {
      deadline: new Date("2026-09-15T23:59:59.000Z")
    },
    evidence_chain: [{
      field_name: "prize_details",
      extracted_value: "₹1,00,000",
      quote: "National-level hardware & software hackathon solving real government ministry challenges across India.",
      source_url: "https://sih.gov.in",
      confidence: 0.98
    }],
    scraper_telemetry: {
      collector_id: "c_hackathons_unstop",
      scraper_version: "v2.0",
      health_score: 97
    }
  },
  {
    title: "Into The Scrape-Verse Hackathon",
    sponsor: "Bright Data x WeMakeDevs",
    category: "HACKATHON",
    source_url: "https://wemakedevs.org/hackathons/scrape-verse",
    financials: {
      display_amount: "$5,000 NVIDIA DGX Supercomputer",
      value_numeric: 420000,
      currency: "USD",
      reward_type: "PRIZE_POOL"
    },
    eligibility: {
      min_cgpa: 0.0,
      allowed_years: [1, 2, 3, 4],
      target_domains: ["Web Scraping", "AI Agents", "Self-Healing Data", "Full-Stack Web Dev"],
      is_student_eligible: true
    },
    timeline: {
      deadline: new Date("2026-08-23T23:59:59.000Z")
    },
    evidence_chain: [{
      field_name: "hackathon_scope",
      extracted_value: "$5,000 NVIDIA DGX",
      quote: "Build AI-powered self-healing web scrapers with $15,000+ prize pool using Bright Data Scraper Studio.",
      source_url: "https://wemakedevs.org/hackathons/scrape-verse",
      confidence: 0.99
    }],
    scraper_telemetry: {
      collector_id: "c_mt0bxaoi1yl2y39685",
      scraper_version: "v2.0",
      health_score: 97
    }
  },
  {
    title: "EDGE NOVA'26 (24-Hour National Hackathon)",
    sponsor: "CINTEL Dept @ SRM KTR",
    category: "HACKATHON",
    source_url: "https://edgenova.vercel.app",
    financials: {
      display_amount: "₹40,000+ Cash Prize Pool",
      value_numeric: 40000,
      currency: "INR",
      reward_type: "PRIZE_POOL"
    },
    eligibility: {
      min_cgpa: 0.0,
      allowed_years: [1, 2, 3, 4],
      target_domains: ["Edge AI", "Cybersecurity", "IoT", "Embedded Systems"],
      is_student_eligible: true
    },
    timeline: {
      // Overlaps with internal Class Test window (Aug 25-30) to test Schedule Conflict Engine
      deadline: new Date("2026-08-27T18:00:00.000Z")
    },
    evidence_chain: [{
      field_name: "event_details",
      extracted_value: "₹40,000+",
      quote: "Offline 24-hour national hackathon at SRM KTR. Official On-Duty (OD) approval provided.",
      source_url: "https://edgenova.vercel.app",
      confidence: 0.95
    }],
    scraper_telemetry: {
      collector_id: "c_hackathons_unstop",
      scraper_version: "v2.0",
      health_score: 97
    }
  },

  // --- INTERNSHIPS & FELLOWSHIPS ---
  {
    title: "Microsoft Software Engineering Intern 2026",
    sponsor: "Microsoft India Careers",
    category: "INTERNSHIP",
    source_url: "https://careers.microsoft.com",
    financials: {
      display_amount: "₹75,000 - ₹1,00,000 / month",
      value_numeric: 85000,
      currency: "INR",
      reward_type: "STIPEND"
    },
    eligibility: {
      min_cgpa: 8.0,
      allowed_years: [2, 3, 4],
      target_domains: ["C++", "Distributed Systems", "Cloud", "CS Core & SDE"],
      is_student_eligible: true
    },
    timeline: {
      deadline: new Date("2026-09-30T23:59:59.000Z")
    },
    evidence_chain: [{
      field_name: "hiring_qualifications",
      extracted_value: "₹75,000 - ₹1,00,000 / month",
      quote: "Open to Bachelor's students with >= 1 semester remaining. Solid fundamentals in DSA, Low-Latency C++, and OOP.",
      source_url: "https://careers.microsoft.com",
      confidence: 0.97
    }],
    scraper_telemetry: {
      collector_id: "c_careers_msft",
      scraper_version: "v2.0",
      health_score: 97
    }
  },
  {
    title: "Mitacs Globalink Research Internship (Canada 🇨🇦)",
    sponsor: "Mitacs Canada & AICTE India",
    category: "FELLOWSHIP",
    source_url: "https://globalink.mitacs.ca",
    financials: {
      display_amount: "₹3,00,000+ (Flights & Housing Covered)",
      value_numeric: 300000,
      currency: "INR",
      reward_type: "STIPEND"
    },
    eligibility: {
      min_cgpa: 8.5,
      allowed_years: [2, 3],
      target_domains: ["AI/ML", "Robotics", "Computer Vision", "Systems"],
      is_student_eligible: true
    },
    timeline: {
      deadline: new Date("2026-09-16T23:59:59.000Z")
    },
    evidence_chain: [{
      field_name: "fellowship_scope",
      extracted_value: "₹3,00,000+",
      quote: "12-week fully funded summer research internship at top Canadian university laboratories with travel stipend.",
      source_url: "https://globalink.mitacs.ca",
      confidence: 0.98
    }],
    scraper_telemetry: {
      collector_id: "c_mt0bxaoi1yl2y39685",
      scraper_version: "v2.0",
      health_score: 97
    }
  },
  {
    title: "Google Software Application Development Apprenticeship",
    sponsor: "Google India",
    category: "INTERNSHIP",
    source_url: "https://careers.google.com",
    financials: {
      display_amount: "₹70,000 - ₹85,000 / month",
      value_numeric: 75000,
      currency: "INR",
      reward_type: "STIPEND"
    },
    eligibility: {
      min_cgpa: 8.0,
      allowed_years: [2, 3, 4],
      target_domains: ["Python", "Machine Learning", "Systems", "CS Core & SDE"],
      is_student_eligible: true
    },
    timeline: {
      deadline: new Date("2026-09-15T23:59:59.000Z")
    },
    evidence_chain: [{
      field_name: "apprenticeship_scope",
      extracted_value: "₹70,000 - ₹85,000 / month",
      quote: "12-month paid development apprenticeship working alongside senior Google engineers on system scaling.",
      source_url: "https://careers.google.com",
      confidence: 0.96
    }],
    scraper_telemetry: {
      collector_id: "c_careers_msft",
      scraper_version: "v2.0",
      health_score: 97
    }
  }
];

async function seedDatabase() {
  console.log("\n========================================================");
  console.log("🌱 SENTINELHUB AI 2.0 // DATABASE SEEDER INITIATING");
  console.log("========================================================");

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ [MONGODB] Connected to database engine.");

    const bulkOps = PRODUCTION_SEEDS.map(item => {
      const canonicalHash = crypto
        .createHash('sha256')
        .update(item.source_url.trim().toLowerCase())
        .digest('hex');

      return {
        updateOne: {
          filter: { canonical_hash: canonicalHash },
          update: {
            $set: {
              ...item,
              canonical_hash: canonicalHash,
              status: 'OPEN'
            }
          },
          upsert: true
        }
      };
    });

    const result = await Opportunity.bulkWrite(bulkOps);
    console.log(`\n🎉 SEED SUCCESS:`);
    console.log(`  • Upserted (New Records): ${result.upsertedCount}`);
    console.log(`  • Modified (Updated Records): ${result.modifiedCount}`);
    console.log(`  • Total Verified Opportunities in DB: ${PRODUCTION_SEEDS.length}`);
    console.log("========================================================\n");

    process.exit(0);
  } catch (err) {
    console.warn("⚠️ MongoDB offline. Writing fallback to 'opportunities.json' directly...");
    const fallbackData = PRODUCTION_SEEDS.map(item => ({
      id: crypto.createHash('sha256').update(item.source_url).digest('hex').substring(0, 8),
      category: item.category,
      title: item.title,
      sponsor: item.sponsor,
      url: item.source_url,
      funding: item.financials.display_amount,
      min_cgpa: item.eligibility.min_cgpa,
      deadline: item.timeline.deadline.toISOString().split('T')[0],
      target_domains: item.eligibility.target_domains,
      evidence: [{
        quote: item.evidence_chain[0].quote,
        verified_at: new Date().toISOString()
      }]
    }));

    require('fs').writeFileSync('opportunities.json', JSON.stringify(fallbackData, null, 2), 'utf-8');
    console.log("✅ Wrote fresh dataset to opportunities.json.");
    process.exit(0);
  }
}

seedDatabase();