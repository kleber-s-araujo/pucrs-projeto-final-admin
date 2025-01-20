import http from "../http-common";

const getTest = () => {
    return http.get<any>("/cliente/id/1/en");
};

const doLoginRenderizador = (email: string, senha: string) => {
    const body = { email, senha };
    return http.post<any>("/renderizador/login", body);
}

const loginService = {
    getTest,
    doLoginRenderizador
};

export default loginService;
