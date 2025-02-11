import http from "../http-common";
    
const getTotalizadores = (id: Number) => {
    return http.get<any>(`/dashboard/renderizador/tot/${id}`);
};

const getProximasEntregas = (id: Number, limite: Number) => {
    return http.get<any>(`/dashboard/renderizador/proximas/${id}/limite/${limite}`);
};

const getUltimasEntregas = (id: Number, limite: Number) => {
    return http.get<any>(`/dashboard/renderizador/ultimas/${id}/limite/${limite}`);
};

const dashboardService = {
    getTotalizadores,
    getProximasEntregas,
    getUltimasEntregas
};
export default dashboardService;