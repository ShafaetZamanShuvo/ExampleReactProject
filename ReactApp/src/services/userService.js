import axios from "axios";

const USER_API_BASE_LOGIN_URL = "http://localhost:8080/api/auth/signin";

class UserService {

    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    };


    async login(loginRequest) {
        return axios.post(USER_API_BASE_LOGIN_URL, loginRequest).then((res) => {
            console.log(res.data);
            if (res.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(res.data));
                return res.data;
            } else {
                alert('Invalid credentials');
            }
        });
    }

    logout() {
        localStorage.removeItem('user');
    }
}

const userService = new UserService();
export default userService;