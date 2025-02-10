import express from "express";
import EmployeeModel from "../model/employee.js";

const router = express.Router();

router.post("/employee", async (req, res) => {
  try {
    let data = req.body;

    // Ensure data is always an array for insertMany()
    if (!Array.isArray(data)) {
      data = [data];
    }

    // Convert `joiningDate` to Date format
    data = data.map(emp => ({
      ...emp,
      joiningDate: emp.joiningDate ? new Date(emp.joiningDate) : null,
    }));

    // Use insertMany to save multiple employees at once
    const employeeData = await EmployeeModel.insertMany(data);

    res.status(201).json(employeeData);
  } catch (error) {
    res.status(500).json({ message: "Error inserting employees", error: error.message });
  }
});


router.get("/filters", async (req, res) => {
  try {
    const getFilter = await EmployeeModel.find().select("department designation skills");

    const departments = [...new Set(getFilter.map(el => el.department))];
    const designations = [...new Set(getFilter.map(el => el.designation))];
    const skills = [...new Set(getFilter.flatMap(el => el.skills))];
 const legalEntity=[
  {
    "legalEntity": "Company A",
    "subEntities": ["Division 1", "Division 2", "Division 3"]
  },
  {
    "legalEntity": "Company B",
    "subEntities": ["Division A", "Division B", "Division C"]
  },
  {
    "legalEntity": "Company C",
    "subEntities": ["Division X", "Division Y"]
  }
]
    res.json({ departments, designations, skills, legalEntity });

  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/employees", async (req, res) => {
  try {
    // Extract query parameters
    const {
      department,
      designation,
      skills,
      legalEntity,  // Filter by legal entity name (string)
      subEntity,    // Can be multiple sub-entities (comma-separated)
      sortBy = "createdAt",
      sortOrder = "desc",
      page = 1,
      pageSize = 10,
    } = req.query;

    // Build the filter object dynamically
    const filter = {};

    if (department) filter.department = department;
    if (designation) filter.designation = designation;
    if (skills) filter.skills = { $in: skills.split(",") }; // Convert skills into an array
    if (legalEntity) filter.legalEntity = legalEntity;
    if (subEntity) {
      filter.subEntity = { $in: subEntity.split(",") }; // Convert sub-entities into an array
    }

    // Pagination settings
    const limit = parseInt(pageSize) || 10;
    const skip = (parseInt(page) - 1) * limit;

    // Fetch employees with filtering, sorting, and pagination
    const employees = await EmployeeModel.find(filter)
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    // Count total matching employees
    const totalEmployees = await EmployeeModel.countDocuments(filter);

    res.json({
      totalEmployees,
      page: parseInt(page),
      pageSize: limit,
      totalPages: Math.ceil(totalEmployees / limit),
      employees,
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
