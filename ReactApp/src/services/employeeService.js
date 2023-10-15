import axios from "axios";
import authHeader from "./authHeader";

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {
  getEmployees() {
    return axios.get(EMPLOYEE_API_BASE_URL, { headers: authHeader() });
  }

  createEmployee(employee) {
    return axios.post(EMPLOYEE_API_BASE_URL, employee, { headers: authHeader() });
  }

  getEmployeeById(employeeId) {
    return axios.get(EMPLOYEE_API_BASE_URL + "/" + employeeId, { headers: authHeader() });
  }

  updateEmployee(employee) {
    return axios.put(EMPLOYEE_API_BASE_URL + "/" + employee.id, employee, { headers: authHeader() });
  }

  deleteEmployee(employeeId) {
    return axios.delete(EMPLOYEE_API_BASE_URL + "/" + employeeId, { headers: authHeader() });
  }

}

const employeeService = new EmployeeService();
export default employeeService;

