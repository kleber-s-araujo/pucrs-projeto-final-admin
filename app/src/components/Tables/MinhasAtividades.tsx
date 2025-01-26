import dashboardService from "@/services/dashboard";
import { useEffect, useState } from "react";


const MinhasAtividades = () => {

  let id = 1; //Alterar para pegar do objeto do usuário
  const [atividades, setAtividades] = useState([{
    idRequisicao: 0,
    titulo: "",
    dataRegistro: "",
    status: 0,
    statusDesc: "",
    descricaoPrioridade: "",
    dataEntrega: "",
    valor: 0
  }]);


  useEffect(() => {

    try {

      dashboardService.getUltimasEntregas(id, 4).then((response) => {

        if (response.status === 200) {

          const data = response.data;
          console.log(data);
          setAtividades(data);

        }

      });

    } catch (error) {
      console.log(error);
    }

  }, [id])

  return (

    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Ultimas Entregas
      </h4>

      <div className="flex flex-col">
        <div className="grid sm:grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 ">

          <div className="flex items-center col-span-1 py-4.5 px-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base font-medium ">
              ID
            </h5>
          </div>
          <div className="flex items-center col-span-3">
            <h5 className="text-sm font-medium uppercase xsm:text-base font-medium ">
              Projeto
            </h5>
          </div>
          <div className="flex items-center col-span-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base font-medium ">
              Status
            </h5>
          </div>
          <div className="flex items-center col-span-1">
            <h5 className="text-sm font-medium uppercase xsm:text-base font-medium ">
              Receita
            </h5>
          </div>
        </div>

        {atividades.map((atividade, key) => (
          <div
            className={`grid sm:grid-cols-8 ${key === atividades.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
              }`}
            key={key}
          >
            <div className="border-b border-[#eee] flex items-center col-span-1 py-4.5 px-4">
              <p className="hidden text-black dark:text-white sm:block font-medium">
                {atividade.idRequisicao}
              </p>
            </div>

            <div className="flex items-center col-span-3">
              <p className="text-black dark:text-white">{atividade.titulo}</p>
            </div>

            <div className="flex items-center col-span-2">
              <p
                className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${atividade.status === 8
                    ? "bg-success text-success"
                    : "bg-warning text-warning"
                  }`}
              >
                {atividade.statusDesc}
              </p>
            </div>

            <div className="flex items-center col-span-2">
              <p className="text-meta-3">R$ {atividade.valor}</p>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default MinhasAtividades;
