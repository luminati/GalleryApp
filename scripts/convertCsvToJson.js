import fs from 'fs';
import { parse } from 'csv-parse/sync';

const csvContent = fs.readFileSync('GalleryApp.csv', 'utf-8');
const records = parse(csvContent, {
  columns: true,
  delimiter: ';',
  skip_empty_lines: true
});

fs.writeFileSync(
  'public/data/gallery.json',
  JSON.stringify(records, null, 2)
); 