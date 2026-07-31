const { products } = require('../src/data/products.js');

console.log("Checking coverage area for all products...\n");

products.forEach(p => {
  const coverageField = p.coverage;
  const specCoverage = p.specifications ? (p.specifications["Coverage Area"] || p.specifications["Floor Area Coverage"] || p.specifications["3m Floor Height Applying Area"] || p.specifications["Recommended Area"]) : null;
  
  if (!specCoverage) {
    console.log(`❌ Product: ${p.name} (${p.slug}) is missing a coverage area in specifications!`);
    console.log(`   General coverage: "${coverageField}"`);
  } else {
    console.log(`✅ Product: ${p.name} (${p.slug})`);
    console.log(`   General: "${coverageField}"`);
    console.log(`   Specs: "${specCoverage}"`);
  }
});
