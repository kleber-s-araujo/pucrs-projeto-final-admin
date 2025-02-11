import { renderizador } from "@/types/renderizador";
import http from "../http-common";
import axios from 'axios';

const postNewImage = async (file: File, title: string, user: renderizador) => {
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('sender', user.id.toString());

    try {

        //const response = await http.post<any>('/image/upload', formData);
        const response = await axios.post('http://127.0.0.1:3030/api/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response;

    }
    catch (error) {
        console.error('Erro ao Upar Imagem', error);
    }
};

const imageService = {
    postNewImage
};

export default imageService;