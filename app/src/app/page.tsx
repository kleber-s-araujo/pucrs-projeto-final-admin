import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title:
    "Renderizaí Plataforma de Renderizações de Alto Padrão",
  description: "A Renderiza aí garante renders de qualidade e ultra realistas para seus projetos de Arquitetura e Design de Interiores",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
