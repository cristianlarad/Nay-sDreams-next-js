export interface IPedidos {
  id: string;
  pedidoId: string;
  productId: string;
  user: {
    name: string;
    email: string;
  };
  productTitle: string;
  quantity: number;
  total: number;
  status: string;
  created: string;
  aditional: string;
  imageUrl: string;
}
