/**
 * Utility functions for parsing and sorting products by coverage area.
 */

/**
 * Extracts a numeric coverage area value in Square Feet (sq. ft.) for a given product.
 * Handles various formats such as ranges ("900 - 2000 SQFT"), "Up to" strings ("Up to 2,000 Sq feet"),
 * metric floor areas ("30 m² (Floor)"), volume specs, and special text descriptions.
 *
 * @param {Object} product - Product object from data/products.js
 * @returns {number} Coverage area in square feet
 */
export function getCoverageSqFt(product) {
  if (!product) return 0;

  const str =
    product.coverage ||
    (product.specifications && product.specifications["Coverage Area"]) ||
    (product.specifications && product.specifications["Floor Area Coverage"]) ||
    "";

  // Special case overrides for unique product specifications
  if (product.slug === "amf-138dmp") {
    // "Up to 14,000 cu. ft." -> approx 1,400 sq. ft. for 10 ft ceiling height
    return 1400;
  }
  if (str === "Home & Office") {
    return 300;
  }

  // Check for square meters (m²) representation e.g. "30 m² (Floor) / 90 m³ (Volume)" or "120-160 m²"
  const m2Match = str.match(/(\d+(?:\.\d+)?)\s*m²/i);
  if (m2Match) {
    return Math.round(parseFloat(m2Match[1]) * 10.7639);
  }

  // Clean commas out of string for clean digit parsing (e.g., "2,000" -> "2000")
  const cleanStr = str.replace(/,/g, "");

  // Match ranges like "100-120 Sq feet", "900 - 2000 SQFT", or single numbers like "2000"
  const sqftMatch =
    cleanStr.match(/(\d+)\s*(?:-|to)?\s*(\d+)?\s*(?:sq|sft|sqft)/i) ||
    cleanStr.match(/(\d+)/);

  if (sqftMatch) {
    const val1 = parseInt(sqftMatch[1], 10);
    const val2 = sqftMatch[2] ? parseInt(sqftMatch[2], 10) : null;
    // Use upper bound if range provided for accurate upper limit comparisons
    return val2 ? val2 : val1;
  }

  return 999999;
}

/**
 * Sorts an array of products by coverage area.
 * Default is ascending order ('asc') - smallest coverage area to largest.
 *
 * @param {Array} productsList - Array of product objects
 * @param {'asc'|'desc'} [direction='asc'] - Sort direction
 * @returns {Array} New sorted array of products
 */
export function sortByCoverageArea(productsList, direction = "asc") {
  if (!Array.isArray(productsList)) return [];

  return [...productsList].sort((a, b) => {
    const covA = getCoverageSqFt(a);
    const covB = getCoverageSqFt(b);

    if (direction === "desc") {
      return covB - covA;
    }
    return covA - covB;
  });
}
