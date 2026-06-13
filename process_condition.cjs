const fs = require('fs');

const rawOptions = [
  "BOUGHT FROM AUCTION",
  "BOUGHT FROM VEHICLE",
  "Brand New",
  "BRAND NEW",
  "BRAND NEW.L/ASSEMBLE",
  "CONVERTED",
  "INVALID CODE",
  "LAND VEHICLE",
  "LOCAL STAMPED",
  "LOCAL STAMPED",
  "LOCALLY ASSEMBLED",
  "LOCALLY BUILT",
  "NEEDS UPDATING",
  "NEW",
  "RE-CONDITIONED",
  "Tractor -trailer",
  "Used",
  "USED PARTS ASSEMBLED"
];

const uniqueMap = new Map();
for (const opt of rawOptions) {
  const key = opt.toUpperCase().trim();
  if (!uniqueMap.has(key)) {
    uniqueMap.set(key, opt.trim());
  }
}

const uniqueOptions = Array.from(uniqueMap.values());
const htmlOptions = uniqueOptions.map(opt => `<option value="${opt}">${opt}</option>`).join('\n             ');

console.log("HTML Options:\n", htmlOptions);

let sqlFile = fs.readFileSync('form_options.sql', 'utf8');
let maxOrder = 0;
const orderRegex = /\('sel_vehicle_con', '[^']+', '[^']+', (\d+)\)/g;
let orderMatch;
while ((orderMatch = orderRegex.exec(sqlFile)) !== null) {
    let order = parseInt(orderMatch[1]);
    if (order > maxOrder) maxOrder = order;
}

const sqlInserts = [];
let idx = maxOrder + 1;
for (const opt of uniqueOptions) {
    const val = opt.replace(/'/g, "''");
    if (!sqlFile.includes(`'sel_vehicle_con', '${val}'`)) {
        sqlInserts.push(`  ('sel_vehicle_con', '${val}', '${val}', ${idx++})`);
    }
}

if (sqlInserts.length > 0) {
    let insertStmt = `\n-- sel_vehicle_con (new additions)\nINSERT INTO form_options (option_key, value, label, sort_order) VALUES\n`;
    insertStmt += sqlInserts.join(',\n') + ' ON CONFLICT (option_key, value) DO NOTHING;\n\n';
    fs.appendFileSync('form_options.sql', insertStmt);
    console.log(`Added ${sqlInserts.length} new options to form_options.sql`);
} else {
    console.log(`No new options to add to form_options.sql`);
}

fs.writeFileSync('condition_options.html', htmlOptions);
