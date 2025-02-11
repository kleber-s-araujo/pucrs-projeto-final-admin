import http from "../http-common";
import axios from 'axios';

const postNewImage = async (file: File, title: string): Promise<void> => {
    
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);

    try {

        //const response = await http.post<any>('/image/upload', formData);
        const response = await axios.post('http://127.0.0.1:3030/api/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(response);

    }
    catch (error) {
        console.error('Erro ao Upar Imagem', error);
    }
};

const imageService = {
    postNewImage
};

export default imageService;