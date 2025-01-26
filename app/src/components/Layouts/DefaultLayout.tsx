"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { renderizador } from "@/types/renderizador";
import ModalProfile from "../Modal/completeProfile";
import { usePathname, useRouter } from "next/navigation";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const editPath = ["/portaldorenderizador/perfil/editar"];
  const router = useRouter();
  const pathname = usePathname();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = async () => {
    setModalOpen(true);
  }
  const handleCloseModal = async () => {
    //setModalOpen(false);
  };

  const confirmAjuste = async () => {
    setModalOpen(false);
    router.push(editPath[0]);
  };

  var currentRenderizador: renderizador;

  useEffect(() => {

    const isEditPage = editPath.some(path => pathname.startsWith(path))

    try {
      currentRenderizador = JSON.parse(localStorage.getItem("renderizador") || "");
      if ( (currentRenderizador.capacidade == null || currentRenderizador.descricao == null) && !isEditPage ) {
        handleOpenModal();
      }
    }
    catch (error) {

    }

  }, []);

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">

        {modalOpen && <ModalProfile modalOpen={modalOpen} setmodalOpen={setModalOpen} onClose={handleCloseModal} onConfirm={confirmAjuste} />}

        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
