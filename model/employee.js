import { model, Schema } from "mongoose";

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: "Invalid email format",
    },
  },
  department: {
    type: String,
    required: true,
    enum: ["sde", "production"],
  },
  designation: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  joiningDate: {
    type: Date,
  },
  salary: {
    type: Number,
  },
  skills: {
    type: [String],
  },
  legalEntity: {
    type: String,
  },
  subEntity: {
    type: String,
  },
});

const EmployeeModel = model("Employee", employeeSchema);

export default EmployeeModel;
