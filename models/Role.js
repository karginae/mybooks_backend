import mongoose from 'mongoose';

const RoleScheme = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export default mongoose.model('Role', RoleScheme);
