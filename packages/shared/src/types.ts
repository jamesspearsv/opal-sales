export interface Item {
  id: number;
  name: string;
  purchase_cost: number;
  list_price: number;
  item_desc: string | null;
}

export interface Sale {
  id: number;
  sale_price: number;
  sale_date: string;
  item_id: number;
}
