interface QuickSearchOption {
  imageUrl: string;
  title: string;
}

export const quickSearchOptions: QuickSearchOption[] = [
  {
    imageUrl: "/cabelo.svg",
    title: "Cabelo",
  },
  {
    imageUrl: "/barba.svg",
    title: "Barba",
  },
  {
    imageUrl: "/acabamento.svg",
    title: "Acabamento",
  },
  {
    imageUrl: "/massagem.svg",
    title: "Massagem",
  },
  {
    imageUrl: "/sobrancelha.svg",
    title: "Sobrancelha",
  },
  {
    imageUrl: "/hidratacao.svg",
    title: "Hidratação",
  },
];

export const formatPrice = (price: number): string => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};
