"use client";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import GalleryItem from "./GalleryItem";
import ImageUpload from "./add/page";
import ImagemData from "./ImagemData";
import { Imagem } from "@/types/image";
import imageService from "@/services/images";
import { renderizador } from "@/types/renderizador";

const PortifolioList: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [images, setImages] = useState<Imagem[]>(ImagemData);
    const closeModal = () => setOpenModal(false);
    const currentUser: renderizador = JSON.parse(localStorage.getItem("renderizador") || "");

    const onsubmit = async (title: string, image: File): Promise<void> => {
        
        //const newFile = URL.createObjectURL(image);
        const ret = await imageService.postNewImage(image, title, currentUser);
        const newImage: Imagem = {
            _id: 99,
            titulo: title,
            nome: image.name,
            data: image,
            url: ret?.data.imageUrl
        }
        //console.log(newImage);              
        //console.log(ret);

        /* Send to Server and Upload the new Image to GCloud Storage */
        setImages([...images, newImage]);
    };

    const onDelete = (key: Number): void => {
        const newImages = images.filter((_, i) => i !== key);
        setImages(newImages);
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    return (
        <>
            <DefaultLayout>
                {loading ? <Loader /> :
                    <div>
                        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 text-white">
                            { images.map((Imagem, index) => (
                                <GalleryItem itemkey={index} Imagem={Imagem} onDelete={onDelete} /> 
                            ))}                            
                        </div>                        
                         <button onClick={(e) => { setOpenModal(true)}}>
                            <div className="fixed bottom-8 right-8 z-[99] rounded-full">
                                <div
                                    aria-label="Adicionar Imagens"
                                    className="hover:shadow-signUp flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"/></svg>
                                </div>
                            </div>
                         </button>
                        
                        { /* Modal */ }
                        { openModal !== false && ( <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-[99999]">
                            <ImageUpload onSubmit={onsubmit} onCancel={closeModal} />
                        </div> ) }
                        { /* Fim Modal */ }
                    </div>                    
                }
            </DefaultLayout>
        </>
    );
};

export default PortifolioList;