"use client";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import GalleryItem from "./GalleryItem";
import ImageUpload from "./add/page";
import { Imagem } from "@/types/image";
import imageService from "@/services/images";
import { renderizador } from "@/types/renderizador";

const PortifolioList: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [images, setImages] = useState<Imagem[]>([]);
    const closeModal = () => setOpenModal(false);
    const currentUser: renderizador = JSON.parse(localStorage.getItem("renderizador") || "");

    /* Envia Imagem para o GCloud e BD */
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
        /* Send to Server and Upload the new Image to GCloud Storage */
        setImages([...images, newImage]);
    };

    /* Remove Imagem da Lista e Deleta do GCloud e BD */
    const onDelete = (key: Number): void => {
        const newImages = images.filter((_, i) => i !== key);
        setImages(newImages);
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    return (
        <>
            <DefaultLayout>
                {loading ? <Loader /> :
                    <div>

                        {  
                            images.length > 0 ?                         
                                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 text-white">
                                    {images.map((Imagem, index) => (
                                        <GalleryItem itemkey={index} Imagem={Imagem} onDelete={onDelete} />
                                    ))}
                                </div>
                            :
                            <div className="mb-6 flex mt-10 flex-col justify-center gap-3 items-center">
                                <h1 className="text-title-md2 justify-center font-semibold text-black dark:text-white">Sem Imagens no Portifólio!</h1>
                                <p><h2 className="font-medium justify-center font-semibold text-black dark:text-white">Clique no Botão + para adicionar imagens ao seu portifólio</h2></p>
                            </div>
                        }

                        { /* Botão Adicionar Imagem */}
                        <button onClick={(e) => { setOpenModal(true) }}>
                            <div className="fixed bottom-8 right-8 z-[99] rounded-full">
                                <div
                                    aria-label="Adicionar Imagens"
                                    className="hover:shadow-signUp flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md transition duration-300 ease-in-out hover:bg-opacity-80"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z" /></svg>
                                </div>
                            </div>
                        </button>
                        { /* Fim Botão Adicionar Imagem */}

                        { /* Modal */}
                        {openModal !== false && (<div className="fixed inset-0 bg-blk bg-opacity-80 flex items-center justify-center z-[99999]">
                            <ImageUpload onSubmit={onsubmit} onCancel={closeModal} />
                        </div>)}
                        { /* Fim Modal */}
                    </div>
                }
            </DefaultLayout>
        </>
    );
};

export default PortifolioList;