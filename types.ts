
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

export enum AppTab {
  SIMULATOR = 'SIMULATOR',
  SOURCE_CODE = 'SOURCE_CODE',
  README = 'README'
}

export interface FileContent {
  path: string;
  content: string;
  language: string;
}

export type OrderStatus = 'PENDING' | 'RECEIVED' | 'SHIPPED';

export interface Order {
  id: string;
  items: Product[];
  status: OrderStatus;
  timestamp: number;
}
