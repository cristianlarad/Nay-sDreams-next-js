export interface ItemProductsList {
  collectionId: string;
  collectionName: string;
  created: string;
  description: string;
  id: string;
  images: string[];
  price: number;
  title: string;
  updated: string;
}

export interface IDestacados {
  count: number;
  productTitle: string;
  imageUrl: string;
  id: string;
  productId: string;
}
