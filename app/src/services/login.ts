import http from "../http-common";

const getTest = () => {
    return http.get<any>("/cliente/id/1/en");
};

const loginService = {
    getTest
};

export default loginService;
