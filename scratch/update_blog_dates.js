const fs = require('fs');
const path = require('path');

const blogsFilePath = path.join(__dirname, '../src/data/blogs.js');
let content = fs.readFileSync(blogsFilePath, 'utf8');

// We have 18 blogs. Start from July 20, 2026 and go backwards by 3 days for each blog.
// This guarantees exactly a 3-day gap, which is ~2 blogs per week, and ensures no duplicate dates.
let currentDate = new Date('2026-07-20T12:00:00Z');
let dates = [];

for (let i = 0; i < 18; i++) {
  // Push the current date
  dates.push(new Date(currentDate));
  // Subtract 3 days (3 * 24 * 60 * 60 * 1000 = 259,200,000 ms)
  currentDate = new Date(currentDate.getTime() - 259200000);
}

// Format dates as "Month DD, YYYY"
const formattedDates = dates.map(d => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
});

// Replace dates in the file (from top to bottom, newest first)
let dateIndex = 0;
content = content.replace(/date:\s*".*?",?/g, (match) => {
  if (dateIndex < formattedDates.length) {
    const newStr = `date: "${formattedDates[dateIndex]}",`;
    dateIndex++;
    return newStr;
  }
  return match;
});

fs.writeFileSync(blogsFilePath, content, 'utf8');
console.log(`Replaced ${dateIndex} dates.`);
console.log('New Dates:', formattedDates);
