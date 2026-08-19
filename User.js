const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  academic_profile: {
    institution: { type: String, default: 'SRM Institute of Science and Technology' },
    degree: { type: String, default: 'B.Tech' },
    department: { type: String, default: 'CSE (AI & ML)' },
    year_of_study: { type: Number, min: 1, max: 5, default: 2 },
    cgpa: { type: Number, min: 0.0, max: 10.0, required: true, default: 9.6 }
  },
  // Comprehensive Multi-Disciplinary Category Preference Matrix
  preferences: {
    categories: [{
      type: String,
      enum: [
        // Deep-Tech & Systems
        'Embedded Systems',
        'Hardware/IoT',
        'Robotics & Automation',
        'Semiconductors & VLSI',
        'Cybersecurity & Infosec',
        'SpaceTech & Aerospace',

        // AI & Data
        'AI/ML & Deep Learning',
        'Data Science & Analytics',
        'Computer Vision',

        // Software & Cloud
        'CS Core & SDE',
        'Full-Stack Web Dev',
        'Cloud Computing & DevOps',
        'Web3 & Blockchain',
        'Mobile App Dev',

        // Interdisciplinary & Core
        'BioTech & HealthTech',
        'CleanTech & Sustainability',

        // Product, Design & Business
        'UI/UX & Product Design',
        'Product Management',
        'Business & Case Competitions',
        'Non-Technical & Creative'
      ],
      default: ['Embedded Systems', 'Hardware/IoT', 'AI/ML & Deep Learning', 'Robotics & Automation']
    }],
    min_funding_threshold: { type: Number, default: 0 },
    notify_schedule_conflicts: { type: Boolean, default: true }
  },
  saved_opportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);