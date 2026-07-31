const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'src/data/products.js',
  'src/app/products/page.js',
  'src/app/search/SearchClient.js',
  'src/app/industrial-uses/[slug]/page.js',
  'src/components/sections/IndustrialDehumidifierCatalog.js'
];

filesToUpdate.forEach(relPath => {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${relPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let updated = false;

  // Replace case-sensitive and plural forms
  if (content.includes('Industrial Dehumidifiers')) {
    content = content.replaceAll('Industrial Dehumidifiers', 'Commercial/Industrial Dehumidifiers');
    updated = true;
  }
  if (content.includes('Industrial Dehumidifier')) {
    content = content.replaceAll('Industrial Dehumidifier', 'Commercial/Industrial Dehumidifier');
    updated = true;
  }
  if (content.includes('industrial dehumidifiers')) {
    content = content.replaceAll('industrial dehumidifiers', 'commercial/industrial dehumidifiers');
    updated = true;
  }
  if (content.includes('industrial dehumidifier')) {
    content = content.replaceAll('industrial dehumidifier', 'commercial/industrial dehumidifier');
    updated = true;
  }
  if (content.includes('INDUSTRIAL DEHUMIDIFIERS')) {
    content = content.replaceAll('INDUSTRIAL DEHUMIDIFIERS', 'COMMERCIAL/INDUSTRIAL DEHUMIDIFIERS');
    updated = true;
  }

  if (updated) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Successfully updated: ${relPath}`);
  } else {
    console.log(`No replacements needed in: ${relPath}`);
  }
});
