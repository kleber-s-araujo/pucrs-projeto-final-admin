"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { usePathname, useRouter } from "next/navigation";
import { metadata } from '../metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {

    setTimeout(() => setLoading(false), 1000);
    
    // Lista de rotas públicas
    const publicPaths = ['/portaldorenderizador/auth/login', '/portaldorenderizador/auth/cadastro'];
    const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

    // Verifica se existe um token no localStorage ou cookie
    const token = localStorage.getItem('auth-token') || document.cookie.includes('auth-token');
    
    if (!token && !isPublicPath) {
      router.push('/portaldorenderizador/auth/login');
    }
    
    if (token && isPublicPath) {
      router.push('/portaldorenderizador');
    }

  }, []);

  return (
    <html lang="en" className="bg-white" >
      <head>
        <title>{metadata.title}</title>
        <meta name='description' content={metadata.description} />
      </head>
      <body className="bg-white" suppressHydrationWarning={true} >
        <div>
          {loading ? <Loader /> : children}
        </div>
      </body>
    </html>
  );
}
