/**
 * Product-types data layer, mirroring `lib/api/products.ts`. A product type is
 * a variant of a product ("Sport M Evolution" under "Taraflex") authored with
 * the same sections as a product, and rendered on its own page at
 * `/products/type/[id]`.
 *
 * The types belonging to one product arrive nested on `GET /products/:id`, and
 * the Gallery / enquiry-autocomplete layers list `/product-types` themselves —
 * so the only fetch that belongs here is the single-record one.
 */
import { safeGet } from "./http";
import { API_ROUTES } from "@/utils/apis";
import type { ApiProductTypeDetail } from "./types";

/** A single product type for the detail page, or `null` if it doesn't exist. */
export async function getProductType(id: string): Promise<ApiProductTypeDetail | null> {
  return safeGet<ApiProductTypeDetail | null>(API_ROUTES.productType(id), null);
}
