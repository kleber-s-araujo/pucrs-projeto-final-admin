import { renderizador } from "@/types/renderizador";
import http from "../http-common";

const updateRenderizador = (renderizador: renderizador) => {
    const body = { 
        nome: renderizador.nome,
        titulo: renderizador.titulo,
        descricao: renderizador.descricao,
        capacidade: renderizador.capacidade,
        localidade: renderizador.localidade,
        site: renderizador.site
     };
    return http.put<any>(`/renderizador/id/${renderizador.id}`, body);
}

const getCapacidades = () => {
    return http.get<any>("/dadosmestre/capacidade/lang/pt");
}

const renderizadorService = {
    updateRenderizador,
    getCapacidades
}

export default renderizadorService;