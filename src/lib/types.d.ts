export interface Item {
  id: number;
  name: string;
  list_price: number;
}

export interface Sale {
  id: number;
  sale_price: number;
  sale_date: string;
  item_id: number;
}
