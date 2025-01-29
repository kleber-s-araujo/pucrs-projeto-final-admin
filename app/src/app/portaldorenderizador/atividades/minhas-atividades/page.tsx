import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MinhasAtividadesFull from "@/components/Tables/MinhasAtividadesFull";

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
