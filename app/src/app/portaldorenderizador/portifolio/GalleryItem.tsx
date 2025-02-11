"use client";
import { Imagem } from "@/types/image";
import { useState } from "react";

interface GalleryItemProps {
  itemkey: Number,
  Imagem: Imagem;
  onDelete?: (key: Number) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  itemkey,
  Imagem,
  onDelete
}) => {

  //const { mainImage, title, metadata } = "";
  //
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const openModal = (index: number) => setSelectedImage(index);
  const closeModal = () => setSelectedImage(null);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    //const newIndex = direction === 'next' 
    //  ? (selectedImage + 1) % blog.allImages.length
    //   : (selectedImage - 1 + blog.allImages.length) % blog.allImages.length;

    //setSelectedImage(newIndex);
  };

  const delImage = () => {
    if (onDelete)
      onDelete(itemkey); 
  };

  return (   
    <div className="relative group mb-4">
      <img className="rounded-lg" src={Imagem.url} />
      <button onClick={delImage} className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className=""
          width="20"
          height="20"
          viewBox="0 0 26 26"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="currentColor" d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593h-3zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1V8zm2 2v12h2V10H8zm4 0v12h2V10h-2zm4 0v12h2V10h-2z" />
        </svg>
      </button>
      <span className="absolute bottom-4 left-3 opacity-0 group-hover:opacity-100">
        {Imagem.titulo}
      </span>
    </div>
  );
};

export default GalleryItem;
