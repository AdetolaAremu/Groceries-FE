interface IAllProducts {
  id: number;
  barcode: string | number;
  brand: string;
  product_name: string;
  status: Boolean;
  quantity: number;
}

export interface IAllProductResponse {
  status: string;
  message: string;
  data?: Partial<IAllProducts[]>;
}

export interface IGetOneProductResponse {
  status: string;
  message: string;
  data: Partial<IAllProducts>;
}

export interface IEditResponse {
  status: string;
  message: string;
  data?: Partial<IAllProducts>;
}

export interface IProduct {
  sortBy: string;
  sortOrder: string;
  search?: string;
}

export interface IEditProduct {
  barcode?: string | number;
  brand?: string;
  product_name?: string;
}
