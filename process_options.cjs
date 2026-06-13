const fs = require('fs');

const htmlString = `<option value="0">-- Select --</option>
<option value="3Wheeler Car">3Wheeler Car</option><option value="3Wheeler Truck">3Wheeler Truck</option><option value="ALLU.FULL BODY">ALLU.FULL BODY</option><option value="AZURE BLUE">AZURE BLUE</option><option value="AZURE BLUE">AZURE BLUE</option><option value="blue silver aluminium">blue silver aluminium</option><option value="Boom Truck">Boom Truck</option><option value="BOOM TRUCK ( CRANE )">BOOM TRUCK ( CRANE )</option><option value="BOWSER">BOWSER</option><option value="BOWSER">BOWSER</option><option value="BRONZE">BRONZE</option><option value="BULLDOZER">BULLDOZER</option><option value="BUS">BUS</option><option value="Cab &amp; Closed Aluminium Body">Cab &amp; Closed Aluminium Body</option><option value="Cab &amp; Closed Aluminium Freezer ">Cab &amp; Closed Aluminium Freezer </option><option value="Cab &amp; Container Body">Cab &amp; Container Body</option><option value="Cab &amp; Steel Closed Container Body">Cab &amp; Steel Closed Container Body</option><option value="Cab and Chassis">Cab and Chassis</option><option value="CAB OVER">CAB OVER</option><option value="CASHMERE SILVER">CASHMERE SILVER</option><option value="CHRRY WHITE">CHRRY WHITE</option><option value="CLOSED">CLOSED</option><option value="Closed Aluminum Body (local)">Closed Aluminum Body (local)</option><option value="Closed Glass Panel">Closed Glass Panel</option><option value="Closed Wooden Body">Closed Wooden Body</option><option value="CONVERTIBLE">CONVERTIBLE</option><option value="COUPE CAR">COUPE CAR</option><option value="Cowl Cab &amp; Wooden Body">Cowl Cab &amp; Wooden Body</option><option value="CRANE">CRANE</option><option value="Crew Cab">Crew Cab</option><option value="D/CAB">D/CAB</option><option value="DOUBLE CAB">DOUBLE CAB</option><option value="Double Cab Pick Up">Double Cab Pick Up</option><option value="Dual Cover Freezer Fiber">Dual Cover Freezer Fiber</option><option value="DUAL PURPOSE">DUAL PURPOSE</option><option value="DUAL PURPOSE VAN">DUAL PURPOSE VAN</option><option value="DUMP TRUCK">DUMP TRUCK</option><option value="Dump Truck (Tipper) with 5 Drop side">Dump Truck (Tipper) with 5 Drop side</option><option value="Dumper Truck (Tipper)">Dumper Truck (Tipper)</option><option value="ESTATE CAR">ESTATE CAR</option><option value="Excavator">Excavator</option><option value="Fiber/Aluminium Body">Fiber/Aluminium Body</option><option value="Freezer Fiber Aluminium Body">Freezer Fiber Aluminium Body</option><option value="Freezer Fiber Body">Freezer Fiber Body</option><option value="FREEZER TRUCK">FREEZER TRUCK</option><option value="GARBAGE TRUCK">GARBAGE TRUCK</option><option value="GREY ALLUMINIUM">GREY ALLUMINIUM</option><option value="GRILL BODY">GRILL BODY</option><option value="GULLY BOWSER">GULLY BOWSER</option><option value="HALF BODY">HALF BODY</option><option value="HATCH BACK">HATCH BACK</option><option value="JCB">JCB</option><option value="JCB">JCB</option><option value="JEEP">JEEP</option><option value="LAND VEHICLE">LAND VEHICLE</option><option value="Lorry Trailer Steel Flat Bed">Lorry Trailer Steel Flat Bed</option><option value="METAL FULL BODY">METAL FULL BODY</option><option value="Motor Coach">Motor Coach</option><option value="Motor Cycle Scooter">Motor Cycle Scooter</option><option value="NON AGRICULTURE LAND VEHICLE">NON AGRICULTURE LAND VEHICLE</option><option value="OMINI BUS">OMINI BUS</option><option value="OPEN">OPEN</option><option value="Open 3 Drop Side">Open 3 Drop Side</option><option value="Open 3 Drop Side with Canopy">Open 3 Drop Side with Canopy</option><option value="Open 3 Drop side with steel frame">Open 3 Drop side with steel frame</option><option value="Open 5 Drop Side">Open 5 Drop Side</option><option value="PLATFORM">PLATFORM</option><option value="Prime Mover">Prime Mover</option><option value="PRISTINE BLUE">PRISTINE BLUE</option><option value="Regional Development Bank">Regional Development Bank</option><option value="Saloon">Saloon</option><option value="SALOON">SALOON</option><option value="Saloon Hatch Back">Saloon Hatch Back</option><option value="Saloon Jeep">Saloon Jeep</option><option value="Saloon Jeep SAV">Saloon Jeep SAV</option><option value="Saloon Jeep SUV">Saloon Jeep SUV</option><option value="Saloon Notch Back">Saloon Notch Back</option><option value="SAV">SAV</option><option value="SEDAN">SEDAN</option><option value="Single Cab">Single Cab</option><option value="Single Cab Pick Up">Single Cab Pick Up</option><option value="Skeltal Flat Bed">Skeltal Flat Bed</option><option value="Standard Motor Cycle">Standard Motor Cycle</option><option value="STATION WAGON">STATION WAGON</option><option value="STATION WAGON">STATION WAGON</option><option value="Station Wagon">Station Wagon</option><option value="Station Wagon (SAV)">Station Wagon (SAV)</option><option value="Steel Flat Bed">Steel Flat Bed</option><option value="Steel flat bed with Boom">Steel flat bed with Boom</option><option value="STEEL FRAME">STEEL FRAME</option><option value="STEEL FRAME WITH CANOPY">STEEL FRAME WITH CANOPY</option><option value="SUV">SUV</option><option value="SUV">SUV</option><option value="TANKER">TANKER</option><option value="TEA LEAF">TEA LEAF</option><option value="TIPPING">TIPPING</option><option value="Tractor">Tractor</option><option value="Trail Motor Cycle">Trail Motor Cycle</option><option value="TRUCK">TRUCK</option><option value="TWO DOOR COUPE">TWO DOOR COUPE</option><option value="VEHICLE CARRIER">VEHICLE CARRIER</option><option value="VIOLET">VIOLET</option><option value="WAGON">WAGON</option><option value="WHEEL LOADER">WHEEL LOADER</option><option value="WHITE BLACK">WHITE BLACK</option>`;

const regex = /<option value="([^"]+)">([^<]+)<\/option>/g;
let match;
const optionsMap = new Map();

while ((match = regex.exec(htmlString)) !== null) {
  const value = match[1].trim();
  const label = match[2].trim();
  if (value !== '0' && value !== '-- Select --') {
    optionsMap.set(value, label);
  }
}

const uniqueOptions = Array.from(optionsMap.entries()).map(([value, label]) => {
  return `<option value="${value}">${label}</option>`;
});

console.log("Unique HTML options:");
console.log(uniqueOptions.join('\n'));

let sqlFile = fs.readFileSync('form_options.sql', 'utf8');
let maxOrder = 0;

const orderRegex = /\('sel_body_type', '[^']+', '[^']+', (\d+)\)/g;
let orderMatch;
while ((orderMatch = orderRegex.exec(sqlFile)) !== null) {
    let order = parseInt(orderMatch[1]);
    if (order > maxOrder) {
        maxOrder = order;
    }
}

const sqlInserts = [];
let idx = maxOrder + 1;
for (const [value, label] of optionsMap.entries()) {
    if (!sqlFile.includes(`'sel_body_type', '${value}'`) && !sqlFile.includes(`'sel_body_type', '${value.replace(/'/g, "''")}'`)) {
        sqlInserts.push(`  ('sel_body_type', '${value.replace(/'/g, "''")}', '${label.replace(/'/g, "''")}', ${idx++})`);
    }
}

if (sqlInserts.length > 0) {
    let insertStmt = `\n-- sel_body_type (new additions)\nINSERT INTO form_options (option_key, value, label, sort_order) VALUES\n`;
    insertStmt += sqlInserts.join(',\n') + ' ON CONFLICT (option_key, value) DO NOTHING;\n\n';
    fs.appendFileSync('form_options.sql', insertStmt);
    console.log(`Added ${sqlInserts.length} new options to form_options.sql`);
} else {
    console.log(`No new options to add to form_options.sql`);
}

const finalSelectHtml = `        <div class="form-group">
          <label>Body Type</label>
          <select class="form-control" name="sel_body_type" id="sel_body_type">
            <option value="" disabled selected hidden>-- Select --</option>
            ${uniqueOptions.join('\n            ')}
          </select>
        </div>`;
fs.writeFileSync('body_select.html', finalSelectHtml);
