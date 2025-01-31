"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import ChartOne from "../Charts/ChartOne";
import ChatCard from "../Chat/ChatCard";
import CardDataStats from "../CardDataStats";
import NextDeliver from "../NextDeliver/NextDeliver";
import dashboardService from "@/services/dashboard";
import MinhasAtividades from "../Tables/MinhasAtividades";
import { useRouter } from "next/navigation";
import { renderizador } from "@/types/renderizador";
import Loader from "../common/Loader";
import DefaultLayout from "../Layouts/DefaultLayout";

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const LANG = "pt-BR";
const CURRENCY = "BRL";
function getFormattedCurrency(value: number): string {
  return value.toLocaleString(
    LANG,
    {
      style: "currency",
      currency: CURRENCY,
    }
  );
}

export { getFormattedCurrency }

const ECommerce: React.FC = () => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser: renderizador = JSON.parse(localStorage.getItem("renderizador") || "");

  //Busca Totalizadores
  let id = currentUser.id;
  const [Totalizadores, setTotalizadores] = useState({
    totalRenders: 0,
    valorTotal: 0.00,
    qtdMesAtual: 0,
    valorMesAtual: 0.00,
    qtdMesAnterior: 0,
    valorMesAnterior: 0.00,
    taxaDeAumentoQtdTotal: 0,
    taxaDeAumentoMes: 0,
    taxaAumentoSaldoTotal: 0,
    taxaAumentoSaldoMes: 0
  });

  useEffect(() => {

    setTimeout(() => setLoading(false), 1500);

    const buscaTotais = async () => {

      try {

        dashboardService.getTotalizadores(id).then((response) => {

          if (response.status === 200) {

            // Calcula Porcentagens      
            const data = response.data;
            var saldoAteMesAnterior   = 0.00;
            var taxaDeAumentoQtdTotal = "0";
            var taxaDeAumentoMes      = "0";
            var taxaAumentoSaldoMes   = "0";
            var taxaAumentoSaldoTotal = "0";

            if (data.totalRenders > 0 && data.qtdMesAtual > 0)
               saldoAteMesAnterior = data.totalRenders - data.qtdMesAtual;

            if (data.qtdMesAtual > 0 && saldoAteMesAnterior > 0)
              taxaDeAumentoQtdTotal = ((data.qtdMesAtual / saldoAteMesAnterior) * 100).toFixed(2);
            
            if (data.qtdMesAtual > 0 && data.qtdMesAnterior > 0)
              taxaDeAumentoMes = (((data.qtdMesAtual - data.qtdMesAnterior) / data.qtdMesAnterior) * 100).toFixed(2);
            
            if (data.valorMesAtual > 0 && data.valorMesAnterior)
              taxaAumentoSaldoMes = (((data.valorMesAtual - data.valorMesAnterior) / data.valorMesAnterior) * 100).toFixed(2);

            if (data.valorTotal > 0)
              taxaAumentoSaldoTotal = ((data.valorMesAtual / data.valorTotal) * 100).toFixed(2);

            //Formatar Moeda
            data.valorTotal    = data.valorTotal > 0 ? getFormattedCurrency(parseFloat(data.valorTotal)) : "R$ 0,00";
            data.valorMesAtual = data.valorMesAtual > 0 ? getFormattedCurrency(parseFloat(data.valorMesAtual)) : "R$ 0,00";

            // Seta os valores na estrutura
            setTotalizadores(prevState => ({
              ...prevState,
              ...data,
              taxaDeAumentoQtdTotal,
              taxaDeAumentoMes,
              taxaAumentoSaldoTotal,
              taxaAumentoSaldoMes
            }));

          }

        });

      } catch (error) {
        console.log(error);
      }

    };

    buscaTotais();

  }, [id]);

  return (

    <>

      {loading ? <Loader /> :

        <div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardDataStats title="Total de Renderizações"
              total={Totalizadores.totalRenders.toString()}
              rate={Totalizadores.taxaDeAumentoQtdTotal.toString() + `%`} levelUp>

              <svg xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="currentColor" className="fill-primary dark:fill-white">
                <path d="M5,19 L20,19 C20.5522847,19 21,19.4477153 21,20 C21,20.5522847 20.5522847,21 20,21 L4,21 C3.44771525,21 3,20.5522847 3,20 L3,4 C3,3.44771525 3.44771525,3 4,3 C4.55228475,3 5,3.44771525 5,4 L5,19 Z" fill-rule="nonzero" />
                <path d="M8.7295372,14.6839411 C8.35180695,15.0868534 7.71897114,15.1072675 7.31605887,14.7295372 C6.9131466,14.3518069 6.89273254,13.7189711 7.2704628,13.3160589 L11.0204628,9.31605887 C11.3857725,8.92639521 11.9928179,8.89260288 12.3991193,9.23931335 L15.358855,11.7649545 L19.2151172,6.88035571 C19.5573373,6.44687693 20.1861655,6.37289714 20.6196443,6.71511723 C21.0531231,7.05733733 21.1271029,7.68616551 20.7848828,8.11964429 L16.2848828,13.8196443 C15.9333973,14.2648593 15.2823707,14.3288915 14.8508807,13.9606866 L11.8268294,11.3801628 L8.7295372,14.6839411 Z" fill-rule="nonzero" opacity="0.3" />
              </svg>

            </CardDataStats>
            <CardDataStats title="Ganho Total"
              total={Totalizadores.valorTotal.toString()}
              rate={Totalizadores.taxaAumentoSaldoTotal.toString() + `%`}>
              <svg
                className="fill-primary dark:fill-white"
                width="26"
                height="26"
                viewBox="02 02 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24" />
                  <path fill="#3C50E0" d="M4,4 L20,4 C21.1045695,4 22,4.8954305 22,6 L22,18 C22,19.1045695 21.1045695,20 20,20 L4,20 C2.8954305,20 2,19.1045695 2,18 L2,6 C2,4.8954305 2.8954305,4 4,4 Z" opacity="0.3" />
                  <path fill="#3C50E0" d="M18.5,11 L5.5,11 C4.67157288,11 4,11.6715729 4,12.5 L4,13 L8.58578644,13 C8.85100293,13 9.10535684,13.1053568 9.29289322,13.2928932 L10.2928932,14.2928932 C10.7456461,14.7456461 11.3597108,15 12,15 C12.6402892,15 13.2543539,14.7456461 13.7071068,14.2928932 L14.7071068,13.2928932 C14.8946432,13.1053568 15.1489971,13 15.4142136,13 L20,13 L20,12.5 C20,11.6715729 19.3284271,11 18.5,11 Z" />
                  <path fill="#3C50E0" d="M5.5,6 C4.67157288,6 4,6.67157288 4,7.5 L4,8 L20,8 L20,7.5 C20,6.67157288 19.3284271,6 18.5,6 L5.5,6 Z" />
                </g>
              </svg>
            </CardDataStats>
            <CardDataStats
              title="Ganho do Mês"
              total={Totalizadores.valorMesAtual.toString()}
              rate={Totalizadores.taxaAumentoSaldoMes + `%`} levelUp>
              <svg
                className="fill-primary dark:fill-white"
                width="26"
                height="26"
                viewBox="03 02 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24" />
                  <rect fill="#3C50E0" opacity="0.3" x="11.5" y="2" width="2" height="4" rx="1" />
                  <rect fill="#3C50E0" opacity="0.3" x="11.5" y="16" width="2" height="5" rx="1" />
                  <path fill="#3C50E0" d="M15.493,8.044 C15.2143319,7.68933156 14.8501689,7.40750104 14.4005,7.1985 C13.9508311,6.98949895 13.5170021,6.885 13.099,6.885 C12.8836656,6.885 12.6651678,6.90399981 12.4435,6.942 C12.2218322,6.98000019 12.0223342,7.05283279 11.845,7.1605 C11.6676658,7.2681672 11.5188339,7.40749914 11.3985,7.5785 C11.2781661,7.74950085 11.218,7.96799867 11.218,8.234 C11.218,8.46200114 11.2654995,8.65199924 11.3605,8.804 C11.4555005,8.95600076 11.5948324,9.08899943 11.7785,9.203 C11.9621676,9.31700057 12.1806654,9.42149952 12.434,9.5165 C12.6873346,9.61150047 12.9723317,9.70966616 13.289,9.811 C13.7450023,9.96300076 14.2199975,10.1308324 14.714,10.3145 C15.2080025,10.4981676 15.6576646,10.7419985 16.063,11.046 C16.4683354,11.3500015 16.8039987,11.7268311 17.07,12.1765 C17.3360013,12.6261689 17.469,13.1866633 17.469,13.858 C17.469,14.6306705 17.3265014,15.2988305 17.0415,15.8625 C16.7564986,16.4261695 16.3733357,16.8916648 15.892,17.259 C15.4106643,17.6263352 14.8596698,17.8986658 14.239,18.076 C13.6183302,18.2533342 12.97867,18.342 12.32,18.342 C11.3573285,18.342 10.4263378,18.1741683 9.527,17.8385 C8.62766217,17.5028317 7.88033631,17.0246698 7.285,16.404 L9.413,14.238 C9.74233498,14.6433354 10.176164,14.9821653 10.7145,15.2545 C11.252836,15.5268347 11.7879973,15.663 12.32,15.663 C12.5606679,15.663 12.7949989,15.6376669 13.023,15.587 C13.2510011,15.5363331 13.4504991,15.4540006 13.6215,15.34 C13.7925009,15.2259994 13.9286662,15.0740009 14.03,14.884 C14.1313338,14.693999 14.182,14.4660013 14.182,14.2 C14.182,13.9466654 14.1186673,13.7313342 13.992,13.554 C13.8653327,13.3766658 13.6848345,13.2151674 13.4505,13.0695 C13.2161655,12.9238326 12.9248351,12.7908339 12.5765,12.6705 C12.2281649,12.5501661 11.8323355,12.420334 11.389,12.281 C10.9583312,12.141666 10.5371687,11.9770009 10.1255,11.787 C9.71383127,11.596999 9.34650161,11.3531682 9.0235,11.0555 C8.70049838,10.7578318 8.44083431,10.3968355 8.2445,9.9725 C8.04816568,9.54816454 7.95,9.03200304 7.95,8.424 C7.95,7.67666293 8.10199848,7.03700266 8.406,6.505 C8.71000152,5.97299734 9.10899753,5.53600171 9.603,5.194 C10.0970025,4.85199829 10.6543302,4.60183412 11.275,4.4435 C11.8956698,4.28516587 12.5226635,4.206 13.156,4.206 C13.9160038,4.206 14.6918294,4.34533194 15.4835,4.624 C16.2751706,4.90266806 16.9686637,5.31433061 17.564,5.859 L15.493,8.044 Z" />
                </g>

              </svg>
            </CardDataStats>
            <CardDataStats title="Renders do Mês"
              total={Totalizadores.qtdMesAtual.toString()}
              rate={Totalizadores.taxaDeAumentoMes.toString() + `%`} levelUp>
              <svg
                className="fill-primary dark:fill-white"
                width="24"
                height="24"
                viewBox="01 02 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <rect x="0" y="0" width="24" height="24" />
                  <path fill="#3C50E0" d="M2,13 C2,12.5 2.5,12 3,12 C3.5,12 4,12.5 4,13 C4,13.3333333 4,15 4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 C2,15 2,13.3333333 2,13 Z" fill-rule="nonzero" opacity="0.3" />
                  <rect fill="#3C50E0" opacity="0.3" transform="translate(12.000000, 8.000000) rotate(-180.000000) translate(-12.000000, -8.000000) " x="11" y="1" width="2" height="14" rx="1" />
                  <path d="M7.70710678,15.7071068 C7.31658249,16.0976311 6.68341751,16.0976311 6.29289322,15.7071068 C5.90236893,15.3165825 5.90236893,14.6834175 6.29289322,14.2928932 L11.2928932,9.29289322 C11.6689749,8.91681153 12.2736364,8.90091039 12.6689647,9.25670585 L17.6689647,13.7567059 C18.0794748,14.1261649 18.1127532,14.7584547 17.7432941,15.1689647 C17.3738351,15.5794748 16.7415453,15.6127532 16.3310353,15.2432941 L12.0362375,11.3779761 L7.70710678,15.7071068 Z" fill="#3C50E0" fill-rule="nonzero" transform="translate(12.000004, 12.499999) rotate(-180.000000) translate(-12.000004, -12.499999) " />
                </g>
              </svg>
            </CardDataStats>
          </div>

          <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

            <ChartOne />
            <NextDeliver />

            <div className="col-span-12 xl:col-span-8">
              <MinhasAtividades />
            </div>

            <ChatCard />

          </div>

        </div>
      }

    </>

  );
};

export default ECommerce;
