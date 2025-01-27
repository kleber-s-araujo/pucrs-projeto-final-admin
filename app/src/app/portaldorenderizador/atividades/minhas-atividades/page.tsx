import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MinhasAtividadesFull from "@/components/Tables/MinhasAtividadesFull";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Atividades > Minhas Atividades" />

      <div className="flex flex-col gap-10">
        <MinhasAtividadesFull />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
