export type renderizador = {
    id: number,
    nome: string,
    email: string,
    fotoPerfil: string,
    titulo: string,
    descricao: string,
    dataRegistro: Date,
    capacidade: number,
    localidade: string,
    site: string
  };

  export type capacidade = {
    id: number,
    lang: string,
    descricao: string,
  };