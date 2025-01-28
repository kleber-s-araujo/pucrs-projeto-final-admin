"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { renderizador } from "@/types/renderizador";
import { capacidade } from "@/types/renderizador";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import renderService from "@/services/renderizador";
import Loader from "@/components/common/Loader";
import Mensagem from "@/components/Modal/Mensagem";

const Settings = () => {

  //Campos
  const [nome, setNome] = useState("");
  const [titulo, setTitulo] = useState("");
  const [capacidade, setCapacidade] = useState(0);
  const [bio, setBio] = useState("");
  const [pais, setPais] = useState("");
  const [cidade, setCidade] = useState("");
  const [site, setSite] = useState("");
  const [capacidadeDefault, setCapaDefault] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const currentUser: renderizador = JSON.parse(localStorage.getItem("renderizador") || "");

  const [tipos, setTipos] = useState<[capacidade]>([{
    id: 1,
    lang: "",
    descricao: "",
  }]);

  const handleChangeSelect = (event: any) => {
    const selected: capacidade | undefined = tipos.find((tipo) => tipo.descricao === event.target.value);
    if (selected !== undefined)
      setCapacidade(selected.id);
  };

  const getLocation = () => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(position => {

        const { latitude, longitude } = position.coords;
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`)
          .then(response => response.json())
          .then(data => {
            setPais(data.countryName);
            setCidade(data.city);
          })
          .catch(error => console.error('Erro ao buscar dados de localização:', error));
      });
    } else {
      console.error('Geolocalização não é suportada pelo seu navegador.');
    }
  }

  /* Atualização de Imagem de Perfil */
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      console.log(event.target.files[0]);
      alert("Não Implementado!");
    }
  };

  /* Modal de Mensagem */
  const [msgTitle, setMsgTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleOpenModal = async () => {
    setIsModalVisible(true);
  }
  const handleCloseModal = () => {
    setIsModalVisible(false);
    router.push("/portaldorenderizador")
  };


  /*  Atualização de Perfil  */
  const handleSubmitUpdate = async (event: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {

    event.preventDefault();

    var changedUser: renderizador = {
      id: currentUser.id,
      nome: nome,
      email: currentUser.email,
      fotoPerfil: currentUser.fotoPerfil,
      titulo: titulo,
      descricao: bio,
      localidade: pais + `/` + cidade,
      dataRegistro: currentUser.dataRegistro,
      capacidade: capacidade,
      site: site
    };

    if (changedUser.nome === "")
      changedUser.nome = currentUser.nome;

    if (changedUser.email === "")
      changedUser.email = currentUser.email;

    if (changedUser.titulo === "")
      changedUser.titulo = currentUser.titulo;

    if (changedUser.descricao === "")
      changedUser.descricao = currentUser.descricao;

    if (changedUser.site === "")
      changedUser.site = currentUser.site;

    if (changedUser.capacidade == null || changedUser.capacidade == 0)
      changedUser.capacidade = currentUser.capacidade;

    console.log("Atual: ", currentUser);
    console.log("Atualizado: ", changedUser);

    try {

      await renderService.updateRenderizador(changedUser).then((response) => {

        if (response.status == 200) {
          
          //console.log("User Atualizado");
          localStorage.setItem("renderizador", JSON.stringify(changedUser));

          setMsgTitle("Perfil Atualizado!");
          setMessage("Suas informações foram atualizadas com sucesso!");
          setError(false);
          handleOpenModal();

        }
        else {
          //console.log("Erro ao atualizar");
          console.log(response);
          setMsgTitle("Erro ao atualizar dados.");
          setMessage("Favor entrar em contato com a equipe da Plataforma...");
          setError(true);
          handleOpenModal();
        }

      });

    } catch (error) {
      console.log(error);
      setMsgTitle("Erro ao atualizar dados.");
      setMessage("Favor entrar em contato com a equipe da Plataforma...");
      setError(true);
      handleOpenModal();
    }
  }

  useEffect(() => {

    //Busca os Tipos de Capacidade
    renderService.getCapacidades().then((response) => {

      if (response.status == 200) {
        const capacidades = response.data.capacidades;
        setTipos(capacidades);

        const selected: capacidade | undefined = tipos.find((tipo) => tipo.id === currentUser.capacidade);
        if (selected !== undefined)
          setCapaDefault(selected.descricao);
      }

    });

    if (currentUser.localidade !== undefined && currentUser.localidade !== "") {
      const split = currentUser.localidade.split('/');
      setPais(split[0]);
      setCidade(split[1]);
    }
    else {
      getLocation();
    }

    setTimeout(() => setLoading(false), 2000);

  }, []);



  return (
    <DefaultLayout>

      {loading ? <Loader /> :

        <div className="mx-auto max-w-270">

          <Breadcrumb pageName="Editar Perfil" />

          <div className="grid grid-cols-10 gap-8">
            <div className="col-span-5 xl:col-span-9">
              <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="p-7">
                  <form onSubmit={handleSubmitUpdate}>

                    <div className="bg-white">

                      <div className="drop-shadow-2 flex justify-center">

                        <label
                          htmlFor="profile"
                          className="flex h-60 w-60 cursor-pointer items-center justify-center rounded-full text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                        >
                          <Image
                            src={"/images/user/user-06.png"}
                            width={200}
                            height={0}
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                            alt="profile"
                          />

                          <input
                            type="file"
                            name="profile"
                            id="profile"
                            onChange={handleFileChange}
                            className="sr-only"
                          >

                          </input>
                        </label>


                        { /*
                        <label
                          htmlFor="profile"
                          className="absolute bottom-0 right-0 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                        >
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                              fill=""
                            />
                          </svg>

                        </label>
                        */}
                      </div>

                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full ">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          Nome *
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">
                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                  fill=""
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                  fill=""
                                />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="nome"
                            id="nome"
                            required
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="José da Silva..."
                            defaultValue={currentUser.nome}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Título *
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="titulo"
                        id="titulo"
                        required
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Renderizador Sênior..."
                        defaultValue={currentUser.titulo}
                      />
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Capacidade de Renderização *
                      </label>

                      <select className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        id="capacidade"
                        name="capacidade"

                        onChange={handleChangeSelect}
                        defaultValue={capacidadeDefault}>

                        {tipos.map((tipo) => (
                          <option key={tipo.id} value={tipo.descricao} >
                            {tipo.descricao}
                          </option>
                        ))}

                      </select>

                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        BIO *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                fill=""
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                fill=""
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_88_10224">
                                <rect width="20" height="20" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>

                        <textarea
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          name="bio"
                          id="bio"
                          rows={6}
                          required
                          onChange={(e) => setBio(e.target.value)}
                          placeholder="Escreva sua BIO aqui...."
                          defaultValue={currentUser.descricao}
                        ></textarea>
                      </div>
                    </div>

                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="fullName"
                        >
                          País *
                        </label>
                        <div className="relative">
                          <span className="absolute left-4.5 top-4">

                            <svg
                              className="fill-current"
                              width="20"
                              height="20"
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g opacity="0.8">
                                <path fill="currentColor" d="M14 2.25A9.75 9.75 0 0 1 23.75 12c0 4.12-2.895 8.61-8.61 13.518a1.75 1.75 0 0 1-2.283-.002l-.378-.328C7.017 20.408 4.25 16.028 4.25 12A9.75 9.75 0 0 1 14 2.25Zm0 1.5A8.25 8.25 0 0 0 5.75 12c0 3.502 2.548 7.537 7.714 12.057l.373.323a.25.25 0 0 0 .326 0c5.416-4.652 8.087-8.795 8.087-12.38A8.25 8.25 0 0 0 14 3.75Zm0 4.5a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5Z" />
                              </g>
                            </svg>
                          </span>
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="pais"
                            id="pai"
                            required
                            onChange={(e) => setPais(e.target.value)}
                            placeholder="Brasil"
                            defaultValue={pais}
                          />
                        </div>
                      </div>

                      <div className="w-full sm:w-1/2">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="phoneNumber"
                        >
                          Cidade *
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="cidade"
                          id="cidade"
                          required
                          onChange={(e) => setCidade(e.target.value)}
                          placeholder="São Paulo..."
                          defaultValue={cidade}
                        />
                      </div>
                    </div>

                    <div className="mb-5.5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="Username"
                      >
                        Site
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="site"
                        id="site"
                        onChange={(e) => setSite(e.target.value)}
                        placeholder="Adicione o seu site para ser exibido no seu Perfil"
                        defaultValue={currentUser.site}
                      />
                    </div>

                    <div className="flex justify-end gap-4.5">
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                        type="submit"
                      >
                        Cancelar
                      </button>
                      <button
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                        type="submit"
                      >
                        Salvar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-span-5 xl:col-span-2">


            </div>
          </div>
        </div>
      }

      {isModalVisible && <Mensagem onClose={handleCloseModal} onConfirm={handleCloseModal} title={msgTitle} isError={isError} message={message} /> }

    </DefaultLayout >
  );
};

export default Settings;
