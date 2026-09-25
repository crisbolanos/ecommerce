export interface Icategory {
  id: number;
  name: string;
  typeImg?: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Icategory;
  taxes?: number;
}

export interface IcreateProductDTO extends Omit<IProduct, 'id' | 'category'> {
  categoryId: number;
}

export interface IupdateProductDTO extends Partial<IcreateProductDTO> {
}
