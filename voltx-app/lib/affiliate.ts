import type { Product } from "./supabase/types";

/**
 * Single resolver for merchant URLs.
 * Returns affiliate_url if status is 'approved' and URL exists,
 * otherwise returns direct_url.
 * 
 * NEVER hardcode a merchant URL in any component.
 * Every product CTA must call this function.
 */
export function resolveMerchantUrl(product: Product): string {
  if (
    product.affiliate_status === "approved" &&
    product.affiliate_url &&
    product.affiliate_url.trim() !== ""
  ) {
    return product.affiliate_url;
  }
  return product.direct_url;
}

/**
 * Check if a product is affiliate-linked (for displaying badges)
 */
export function isAffiliate(product: Product): boolean {
  return (
    product.affiliate_status === "approved" &&
    product.affiliate_url !== null &&
    product.affiliate_url.trim() !== ""
  );
}
