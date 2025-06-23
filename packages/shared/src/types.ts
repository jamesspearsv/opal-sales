/* DATA INTERFACES */
export interface Item {
  id: number;
  name: string;
  purchase_cost: number;
  list_price: number;
  item_desc: string | null;
  sale_date?: string | null;
  sale_id?: number | null;
}

export interface Sale {
  id: number;
  sale_price: number;
  sale_date: string;
  item_id: number;
  purchase_cost: number | null;
}

/* UTILITY TYPES */
export interface SuccessResponse<T> {
  data: T;
}

export interface ErrorResponse {
  message: string;
}

export type Result<T> =
  | {
      success: true;
      data: T;
    }
  | { success: false; message: string };
