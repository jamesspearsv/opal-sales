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
  purchase_cost: number;
  item_name: string;
}

/* API REQUEST TYPES */
export interface BundleRequest {
  bundle_name: string;
  bundle_desc: string;
  list_price: number;
  purchase_cost: number;
  item_ids: number[];
}

/* API RESPONSE TYPES */
export type GetItemsResponse = SuccessResponse<Item[]>;
export type PostItemsResponse = SuccessResponse<string>;
export type GetSalesResponse = SuccessResponse<Sale[]>;
export type PostSalesResponse = SuccessResponse<string>;
export type PostBundleResponse = SuccessResponse<string>;

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
