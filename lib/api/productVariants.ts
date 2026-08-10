/**
 * Product-variants data layer, mirroring `lib/api/productTypes.ts`. A variant
 * is the third and last level of the catalogue (Product → ProductType →
 * ProductVariant), authored with the same sections as the levels above it and
 * rendered on its own page at `/products/variant/[id]`.
 *
 * The variants belonging to one type arrive nested on `GET /product-types/:id`,
 * and the Gallery / enquiry-autocomplete layers list `/product-variants`
 * themselves — so the only fetch that belongs here is the single-record one.
 */
import { safeGet } from "./http";
import { API_ROUTES } from "@/utils/apis";
import type { ApiProductVariantDetail } from "./types";

/** A single product variant for the detail page, or `null` if it doesn't exist. */
export async function getProductVariant(
  id: string,
): Promise<ApiProductVariantDetail | null> {
  return safeGet<ApiProductVariantDetail | null>(API_ROUTES.productVariant(id), null);
}
