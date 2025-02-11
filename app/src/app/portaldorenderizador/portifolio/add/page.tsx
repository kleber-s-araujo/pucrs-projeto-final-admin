"use client"
import React, { useState, useRef, ChangeEvent, FormEvent, DragEvent } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { 
    ImagePlus, 
    Trash2, 
    AlertCircle, 
    FileUp, 
    CheckCircle2, 
    XCircle 
  } from 'lucide-react';

interface ImageUploadProps {
  maxFileSize?: number; // in MB
  allowedFileTypes?: string[];
  onSubmit?: (title: string, image: File) => Promise<void>;
  onCancel?: () => void ;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  maxFileSize = 5, // 5MB default
  allowedFileTypes = ['image/jpeg', 'image/png'],
  onSubmit,
  onCancel
}) => {
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!allowedFileTypes.includes(file.type)) {
      setError(`Imagem Inválida. Extensões permitidas: ${allowedFileTypes.map(type => type.split('/')[1]).join(', ')}`);
      return false;
    }

    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      setError(`A imagem deve conter no máximo ${maxFileSize}MB`);
      return false;
    }

    return true;
  };

  const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setError(null);

    if (!validateFile(file)) {
      return;
    }

    // Remove previous preview if exists
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    const newPreview = URL.createObjectURL(file);
    setPreview(newPreview);
    setImage(file);
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview('');
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const doCancel = () => {
    // Reset form
    setTitle('');
    setImage(null);
    removeImage();
    if (onCancel)
      onCancel();
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Informar o Título da Imagem');
      return;
    }

    if (!image) {
      setError('Faça Upload de uma Imagem');
      return;
    }

    setError(null);
    setUploadStatus('idle');
    setIsSubmitting(true);

    try {
      if (onSubmit) {

        await onSubmit(title, image);
        setUploadStatus('success');
        
        // Reset form
        setTitle('');
        setImage(null);
        if (preview) {
          URL.revokeObjectURL(preview);
        }
        setPreview('');
      }
    } catch (err) {
      setUploadStatus('error');
      setError(err instanceof Error ? err.message : 'Falha no Upload');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Título da Imagem
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter image title"
            maxLength={100}
            required
          />
        </div>

        {/* File Upload Section */}
        <div className="mb-4">
          <div
            ref={dropZoneRef}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`
              border-2 border-dashed rounded-lg p-6 text-center 
              transition-colors duration-300
              ${image 
                ? 'bg-gray-100 border-gray-300' 
                : 'bg-blue-50 border-blue-300 hover:border-blue-500 cursor-pointer'}
            `}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelection}
              accept={allowedFileTypes.join(',')}
              className="hidden"
              id="imageUpload"
            />
            {!preview ? (
              <label 
                htmlFor="imageUpload" 
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <FileUp className="text-blue-500 mb-2" size={40} />
                <p className="text-gray-600">
                  Arraste e Solte a Imagem ou Clique em Upload
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Tipos Permitidos: {allowedFileTypes.map(type => type.split('/')[1]).join(', ')}
                  {` (Max ${maxFileSize}MB)`}
                </p>
              </label>
            ) : (
              <div className="relative group">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-64 mx-auto rounded-lg"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="
                    absolute top-2 right-2
                    bg-red-500 text-white 
                    p-2 rounded-full 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity
                  "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {uploadStatus === 'success' && (
          <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center">
            <CheckCircle2 className="mr-2" size={20} />
            <span>Upload realizado com sucesso!</span>
          </div>
        )}

        {/* Cancel Button */}
        <button 
          onClick={doCancel}
          className={`
            w-50 p-3 m-2
            text-white 
            rounded-lg
            bg-red-500`}>
              Cancelar
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!title || !image || isSubmitting}
          className={`
            w-50 p-3 m-2
            text-white 
            rounded-lg 
            transition-colors duration-300
            ${(!title || !image || isSubmitting)
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary hover:bg-opacity-80'}
          `}
        >
          {isSubmitting ? 'Carregando...' : 'Upload da Imagem'}
        </button>

        

      </form>
    </div>
    
  );
};

export default ImageUpload;