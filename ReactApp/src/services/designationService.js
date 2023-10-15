import axios from "axios";
import authHeader from "./authHeader";

const DESIGNATION_API_BASE_URL = "http://localhost:8080/api/v1/designations";

class DesignationService {

    getDesignations() {
        return axios.get(DESIGNATION_API_BASE_URL, { headers: authHeader() });
    }

    createDesignation(designation) {
        return axios.post(DESIGNATION_API_BASE_URL, designation, { headers: authHeader() });
    }

    getDesignationById(designationId) {
        return axios.get(DESIGNATION_API_BASE_URL + "/" + designationId, { headers: authHeader() });
    }

    updateDesignation(designation) {
        return axios.put(DESIGNATION_API_BASE_URL, designation, { headers: authHeader() });
    }

    deleteDesignation(designationId) {
        return axios.delete(DESIGNATION_API_BASE_URL + "/" + designationId, { headers: authHeader() });
    }

}

const designationService = new DesignationService();
export default designationService;