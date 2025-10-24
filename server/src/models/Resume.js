import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    summary: {
      type: String
    }
  },
  education: [
    {
      institution: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      field: {
        type: String
      },
      startDate: {
        type: String,
        required: true
      },
      endDate: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  experience: [
    {
      company: {
        type: String,
        required: true
      },
      position: {
        type: String,
        required: true
      },
      startDate: {
        type: String,
        required: true
      },
      endDate: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  skills: [
    {
      type: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Resume', ResumeSchema);