import Link from "next/link";
import Image from "next/image";
import { Chat } from "@/types/chat";
import { useEffect, useState } from "react";
import dashboardService from "@/services/dashboard";

const chatData: Chat[] = [
  {
    avatar: "/images/user/user-01.png",
    name: "Sala de Jantar",
    text: "Rafaela Souza",
    time: 12,
    textCount: 3,
    dot: 3,
    last: '7 dias',
  },
  {
    avatar: "/images/user/user-02.png",
    name: "Escritório de Advocacia",
    text: "Julia Zabava",
    time: 12,
    textCount: 0,
    dot: 1,
    last: '13 dias'
  }
];

function formatTimestampToDate(timestamp: number): string {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mês começa do zero
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const NextDeliver = () => {

  let id = 1;
  const [proximasEntregas, setProximasEntregas] = useState([
    {
      idRequisicao: 1,
      titulo: "Titulo Renderização",
      dataRegistro: "2025-01-24T03:15:57.000Z",
      status: 1,
      statusDesc: "Descrição Status",
      descricaoPrioridade: "Descrição Baixa",
      dataEntrega: "01/02/2025"
    }
  ]);

  useEffect(() => {

    const buscaTotais = async () => {

      dashboardService.getProximasEntregas(id, 3).then((response) => {

        formatTimestampToDate(response.data.dataEntrega);

        response.data.forEach((element : any) => {
            element.dataEntrega = formatTimestampToDate(element.dataEntrega);
        });

        setProximasEntregas(response.data);

      });

    };

    buscaTotais();

  }, [id]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Próximas Entregas:
      </h4>

      <div>
        {proximasEntregas.map((entrega, key) => (
          <Link
            href="/"
            className="flex items-center gap-5 px-7.5 py-3 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="flex flex-1 items-center justify-between border-b">

              { 
              /*
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" 
                  width="26" 
                  height="26" 
                  viewBox="0 0 26 26">
                  <g fill="none" fill-rule="evenodd">
                    <path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z"/><path fill="currentColor" d="M7.416 3A4.983 4.983 0 0 0 7 5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2c0-.711-.148-1.388-.416-2H18a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1.416ZM12 14H9a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2Zm3-4H9a1 1 0 0 0-.117 1.993L9 12h6a1 1 0 1 0 0-2Zm-3-8a2.99 2.99 0 0 1 2.236 1c.428.478.704 1.093.755 1.772L15 5H9c0-.725.257-1.39.685-1.908L9.764 3c.55-.614 1.348-1 2.236-1Z"/>
                  </g>
                </svg>  
              </div>       
              */
              }
              <div>
                <h5 className="font-medium text-black dark:text-white decoration-solid">
                  {entrega.titulo.substring(0,30)}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {entrega.statusDesc}
                  </span>
                </p>
              </div>

              <div className="flex items-center justify-center">
                <span className="text-sm font-medium text-black text-warning">
                  {"Entrega: "}
                  {entrega.dataEntrega}
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NextDeliver;
