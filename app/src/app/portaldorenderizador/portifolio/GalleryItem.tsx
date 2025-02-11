"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const GalleryItem = () => {

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

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 text-white">

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHwwfHx8MTcyMTgyMjE3OXww&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
          <span className="absolute bottom-4 left-3 opacity-0 group-hover:opacity-100">Imagem 1</span>
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw1fHxjYXR8ZW58MHwwfHx8MTcyMTgyMjE3OXww&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1668491195456-9341d9cf3977?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxjYXQlMjB3aGl0ZXxlbnwwfDF8fHwxNzIxODIyMzU3fDA&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxM3x8Y2F0fGVufDB8MHx8fDE3MjE4MjIxNzl8MA&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1511044568932-338cba0ad803?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHxjYXR8ZW58MHwwfHx8MTcyMTgyMjE3OXww&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1475518112798-86ae358241eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMHx8Y2F0fGVufDB8MHx8fDE3MjE4MjIxNzl8MA&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <svg
              className=""
              width="20"
              height="20"
              viewBox="0 0 26 26"
              fill="white"
              xmlns="http://www.w3.org/2000/svg mb-4"
            >
              <path fill="currentColor" d="M11.5-.031c-1.958 0-3.531 1.627-3.531 3.594V4H4c-.551 0-1 .449-1 1v1H2v2h2v15c0 1.645 1.355 3 3 3h12c1.645 0 3-1.355 3-3V8h2V6h-1V5c0-.551-.449-1-1-1h-3.969v-.438c0-1.966-1.573-3.593-3.531-3.593h-3zm0 2.062h3c.804 0 1.469.656 1.469 1.531V4H10.03v-.438c0-.875.665-1.53 1.469-1.53zM6 8h5.125c.124.013.247.031.375.031h3c.128 0 .25-.018.375-.031H20v15c0 .563-.437 1-1 1H7c-.563 0-1-.437-1-1V8zm2 2v12h2V10H8zm4 0v12h2V10h-2zm4 0v12h2V10h-2z" />
            </svg>
          </button>
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1498100152307-ce63fd6c5424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMXx8Y2F0fGVufDB8MHx8fDE3MjE4MjIxNzl8MA&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1503777119540-ce54b422baff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjYXQlMjB3aGl0ZXxlbnwwfDF8fHwxNzIxODIyMzU3fDA&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjYXR8ZW58MHwwfHx8MTcyMTgyMjE3OXww&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1502083896352-259ab9e342d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8Y2F0fGVufDB8MHx8fDE3MjE4MjIxNzl8MA&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1708791793972-cf97ef3c01c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxjYXQlMjB3aGl0ZXxlbnwwfDB8fHwxNzIxODIyMjkwfDA&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group mb-4">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1516470544373-df3edeb89d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjYXQlMjB3aGl0ZXxlbnwwfDB8fHwxNzIxODIyMjkwfDA&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>

        <div key={1} className="relative group">
          <img className="rounded-lg" src="https://images.unsplash.com/photo-1472491235688-bdc81a63246e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHwwfHx8MTcyMTgyMjE3OXww&ixlib=rb-4.0.3&q=80&w=1080" />
          <button className="absolute p-2 top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
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
        </div>
      </div>

    </>
  );
};

export default GalleryItem;
