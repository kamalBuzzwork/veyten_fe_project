import express from "express";
import EmployeeModel from "../model/employee";

const router = express.Router();

router.post("/employee", async (req, res) => {
  //   res.send("Employee endpoint hit");
  const data = req.body;

  // Save data to database
  const employeeData = await EmployeeModel.create(data);
  res.send(employeeData);
});

export default router;
