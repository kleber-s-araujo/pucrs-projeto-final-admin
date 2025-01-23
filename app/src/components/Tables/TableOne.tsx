import { BRAND } from "@/types/brand";
import Image from "next/image";

const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Projeto 1",
    visitors: "01/06/2025",
    revenues: "5.768,50",
    sales: "Alta",
    conversion: 4.8,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Projeto Externo Prédio",
    visitors: "10/11/2025",
    revenues: "4.635,00",
    sales: "Média",
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Quarto Casal",
    visitors: "10/11/2025",
    revenues: "4.290,90",
    sales: "Baixa",
    conversion: 3.7,
  }
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Ultimos Projetos
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
          
          <div className="p-2.5 xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Projeto
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Data Entrega 
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Prioridade
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Receita
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="border-b border-[#eee] px-4 py-5 pl-4 dark:border-strokedark xl:pl-6">
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}                
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.visitors}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      brand.sales === "Baixa"
                        ? "bg-success text-success"
                        : brand.sales === "Média"
                          ? "bg-danger text-danger"
                          : "bg-warning text-warning"
                    }`}
                  >
                    {brand.sales}

                  </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">R$ {brand.revenues}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
