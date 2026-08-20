const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  academic_profile: {
    institution: { type: String, default: 'SRM Institute of Science and Technology' },
    degree: { type: String, default: 'B.Tech' },
    department: { type: String, default: 'CSE (AI & ML)' },
    year_of_study: { type: Number, min: 1, max: 5, default: 2 },
    cgpa: { type: Number, min: 0.0, max: 10.0, required: true, default: 9.60 }
  },
  preferences: {
    categories: [{ type: String, trim: true }],
    min_funding_threshold: { type: Number, default: 0 },
    notify_schedule_conflicts: { type: Boolean, default: true }
  },
  saved_opportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);