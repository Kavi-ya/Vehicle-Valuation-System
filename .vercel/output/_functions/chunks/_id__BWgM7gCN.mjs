import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { p as renderHead, q as renderSlot, k as renderTemplate, m as maybeRenderHead, h as addAttribute, o as renderComponent } from './entrypoint_BR-gkYlt.mjs';
import 'clsx';
import converter from 'number-to-words';

const $$ReportLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ReportLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderHead()}</head> <body> <div class="no-print" style="text-align: center; margin-bottom: 20px;"> <button onclick="window.print()" style="padding: 10px 20px; font-weight: bold; cursor: pointer;">
🖨️ Print / Save as PDF
</button> </div> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "E:/AW Associate/aw-dashboard-demo/src/layouts/ReportLayout.astro", void 0);

const $$HeaderBanner = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$HeaderBanner;
  const { meta } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<img src="/images/header-banner.jpg" alt="A.W. Associates Banner" style="width: 100%; display: block; margin-bottom: 10px;"> <div style="padding: 0 15mm 0 10mm;"> <div style="display: flex; justify-content: space-between; margin-bottom: 10px;"> <div style="font-size: 13px; line-height: 1.4;"> <div>${meta.opinionTo || ".........................."},</div> <div>${meta.financeCompany || ".........................."},</div> <div>${meta.financeBranch || ".........................."}.</div> </div> <div style="font-weight: bold; text-align: left; font-size: 13px;"> <div style="display: grid; grid-template-columns: 80px 1fr;"><span>REF NO</span><span>: ${meta.refNo || "N/A"}</span></div> <div style="display: grid; grid-template-columns: 80px 1fr;"><span>DATE</span><span>: ${meta.date || "N/A"}</span></div> </div> </div> <h2 style="text-align: center; text-decoration: underline; font-size: 16px; margin-bottom: 10px;">VEHICLE INSPECTION AND VALUATION REPORT</h2> <div style="margin-bottom: 5px;"> <div class="data-row" style="border:none;"><span>Date and Time Of Inspection:</span> <strong>${meta.inspectionDate || "N/A"}</strong></div> <div class="data-row" style="border:none;"><span>Place Of Inspection:</span> <strong>${meta.inspectionPlace || "N/A"}</strong></div> </div> </div>`;
}, "E:/AW Associate/aw-dashboard-demo/src/components/HeaderBanner.astro", void 0);

const $$VehicleDetails = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$VehicleDetails;
  const { vehicle, images } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div style="display: grid; grid-template-columns: 63% 32%; gap: 5%;"> <!-- Left Column: Details --> <div> <div class="section-title" style="color: purple; background: transparent; border: none; padding: 0; margin-bottom: 10px; font-size: 14px;">VEHICLE IDENTIFICATION DETAILS</div> <div style="display: flex; flex-direction: column; row-gap: 0px;"> <div class="data-row" style="border:none;"><span>1.1 Make</span> <span>: <strong>${vehicle.make}</strong></span></div> <div class="data-row" style="border:none;"><span>1.2 Model</span> <span>: <strong>${vehicle.model}</strong></span></div> <div class="data-row" style="border:none;"><span>1.3 Classification</span> <span>: <strong>${vehicle.classification}</strong></span></div> <div class="data-row" style="border:none;"><span>1.4 Country of Origin</span> <span>: <strong>${vehicle.origin}</strong></span></div> <div class="data-row" style="border:none;"><span>1.5 Country of Used</span> <span>: <strong>${vehicle.usedCountry}</strong></span></div> <div class="data-row" style="border:none;"><span>1.6 Year of Manufacture</span> <span>: <strong>${vehicle.yom}</strong></span></div> <div class="data-row" style="border:none;"><span>1.7 Registration no</span> <span>: <strong>${vehicle.regNo}</strong></span></div> <div class="data-row" style="border:none;"><span>1.8 Date of Registration</span> <span>: <strong>${vehicle.regDate}</strong></span></div> <div class="data-row" style="border:none;"><span>1.9 Engine No</span> <span>: <strong>${vehicle.engineNo}</strong></span></div> <div class="data-row" style="border:none;"><span>1.10 Fuel System</span> <span>: <strong>${vehicle.fuelSystem}</strong></span></div> <div class="data-row" style="border:none;"><span>1.11 Engine Capacity</span> <span>: <strong>${vehicle.capacity}</strong></span></div> <div class="data-row" style="border:none;"><span>1.12 Chassis No</span> <span>: <strong>${vehicle.chassisNo}</strong></span></div> <div class="data-row" style="border:none;"><span>1.13 Type of fuel</span> <span>: <strong>${vehicle.fuelType}</strong></span></div> <div class="data-row" style="border:none;"><span>1.14 If Converted Date & type</span> <span>: <strong>${vehicle.conversionDetails}</strong></span></div> <div class="data-row" style="border:none;"><span>1.15 Switch Key no</span> <span>: <strong>${vehicle.keyNo}</strong></span></div> <div class="data-row" style="border:none;"><span>1.16 Meter reading</span> <span>: <strong>${vehicle.meterReading}</strong> ${vehicle.meterUnit}</span></div> <div class="data-row" style="border:none;"><span>1.17 Num. of Prev. Owners</span> <span>: <strong>${vehicle.prevOwners}</strong></span></div> <div class="data-row" style="border:none;"><span>1.18 Importers</span> <span>: <strong>${vehicle.importers}</strong></span></div> <div class="data-row" style="border:none;"><span>1.19 Date of Import</span> <span>: <strong>${vehicle.importDate}</strong></span></div> <div class="data-row" style="border:none;"><span>1.20 Date of Clearing</span> <span>: <strong>${vehicle.clearingDate}</strong></span></div> <div class="data-row" style="border:none;"><span>1.21 Color/s</span> <span>: <strong>${vehicle.color}</strong></span></div> <div class="data-row" style="border:none;"><span>1.22 Just Low</span> <span>: <strong>${vehicle.justLow}</strong></span></div> <div class="data-row" style="border:none;"><span>1.23 Seating Capacities</span> <span>: <strong>${vehicle.seating}</strong></span></div> <div class="data-row" style="border:none;"><span>1.24 4x4 Wheel Drive</span> <span>: <strong>${vehicle.fourWheelDrive}</strong></span></div> <div class="data-row" style="border:none; margin-top: 4px;"><span><strong>1.25 Current Owner</strong></span> <span>: <strong>${vehicle.currentOwner}</strong></span></div> <div class="data-row" style="border:none; margin-top: 4px;"><span>1.26 Compliance of above : (1.0-1.24) With CR</span> <span>: <strong>${vehicle.compliance}</strong></span></div> <div class="data-row" style="border:none; padding-left: 20px;"><span>If No Comments</span> <span>: <strong>${vehicle.complianceComments}</strong></span></div> <div class="data-row" style="border:none; margin-top: 4px;"><span><strong>2.0 Road Test</strong> :- <span style="text-decoration: underline; color: blue;">Done</span> on</span> <span>: <strong>${vehicle.roadTestDoneOn}</strong></span></div> <div class="data-row" style="border:none; padding-left: 20px;"><span>Not Done because</span> <span>: <strong>${vehicle.roadTestNotDoneReason}</strong></span></div> <div class="data-row" style="border:none; margin-top: 4px;"><span>2.1 Average Fuel Consumption Per liter:</span> <span><strong>${vehicle.fuelConsumption}</strong></span></div> <div class="data-row" style="border:none; margin-top: 4px;"><span><strong>3.0 Availability of Spares</strong></span> <span>: Body Parts<br>: Engine Parts<br>: Accessories</span></div> <div class="data-row" style="border:none; margin-top: 4px;"><span><strong>3.1 Extra Option</strong></span> <span>: <strong>${vehicle.extraOption}</strong></span></div> </div> </div> <!-- Right Column: Images --> <div style="display: flex; flex-direction: column; gap: 15px;"> <img${addAttribute(images.img4, "src")} alt="Image 4" style="width: 100%; height: auto; object-fit: contain;"> <img${addAttribute(images.img5, "src")} alt="Image 5" style="width: 100%; height: auto; object-fit: contain;"> <img${addAttribute(images.img2, "src")} alt="Image 2" style="width: 100%; height: auto; object-fit: contain;"> <img${addAttribute(images.img1, "src")} alt="Image 1" style="width: 100%; height: auto; object-fit: contain;"> </div> </div>`;
}, "E:/AW Associate/aw-dashboard-demo/src/components/VehicleDetails.astro", void 0);

const $$TechnicalEvaluation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TechnicalEvaluation;
  const { tech } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="tech-eval-container"> <div class="section-title" style="color: purple; background: transparent; border: none; padding: 0; margin-bottom: 15px; font-size: 14px;">4.0 TECHNICAL EVALUATION</div> <div style="display: grid; grid-template-columns: 1fr 1fr; column-gap: 30px;"> <!-- Left Column --> <div style="display: flex; flex-direction: column; row-gap: 2px;"> <div style="margin-bottom: 15px;"> <div style="font-weight: bold; margin-bottom: 4px;">4.1 Transmission</div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.1.1 Gear Box</span><span>: <strong>${tech.gearBox}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.1.2 Clutch</span><span>: <strong>${tech.clutch}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.1.3 Shafting</span><span>: <strong>${tech.shafting}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.1.4 Differential</span><span>: <strong>${tech.differential}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.1.5 Gear Selection</span><span>: <strong>${tech.gearSelection}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div style="font-weight: bold; margin-bottom: 4px;">4.2 Suspension</div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.2.1 Front</span><span>: <strong>${tech.suspensionFront}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.2.2 Rear</span><span>: <strong>${tech.suspensionRear}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div style="font-weight: bold; margin-bottom: 4px;">4.3 Brakes</div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.3.1 Foot Brakes</span><span>: <strong>${tech.footBrakes}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.3.2 Hand Brakes</span><span>: <strong>${tech.handBrakes}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div class="data-row" style="border:none;"><span style="font-weight: bold;">4.4 Steering</span><span>: <strong>${tech.steering}</strong></span></div> <div class="data-row" style="border:none;"><span style="font-weight: bold;">4.5 Chassis Condition</span><span>: <strong>${tech.chassisCond}</strong></span></div> <div class="data-row" style="border:none;"><span style="font-weight: bold;">4.6 Body Condition</span><span>: <strong>${tech.bodyCond}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div style="font-weight: bold; margin-bottom: 4px;">4.7 Electrical System</div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.7.1 S/Starter</span><span>: <strong>${tech.starter}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.7.2 Wipers</span><span>: <strong>${tech.wipers}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.7.3 Horn</span><span>: <strong>${tech.horn}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.7.4 Lights</span><span>: <strong>${tech.lights}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.7.5 Meters</span><span>: <strong>${tech.meters}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.7.6 Alternator</span><span>: <strong>${tech.alternator}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div style="font-weight: bold; margin-bottom: 4px;">4.8 Engine</div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.8.1 Condition</span><span>: <strong>${tech.engineCond}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.8.2 Status</span><span>: <strong>${tech.engineStatus}</strong></span></div> </div> </div> <!-- Right Column --> <div style="display: flex; flex-direction: column; row-gap: 2px;"> <div style="margin-bottom: 15px;"> <div style="font-weight: bold; margin-bottom: 4px;">4.9 Tires</div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.9.1 Front Size:</span><span>: <strong>${tech.tireFrontPct}</strong> %</span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.9.2 Rear Size:</span><span>: <strong>${tech.tireRearPct}</strong> %</span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.9.3 Spare Size:</span><span>: <strong>${tech.tireSparePct}</strong> %</span></div> <div class="data-row" style="border:none; padding-left: 20px;"><span>Rear Wheels</span><span>: <strong>${tech.rearWheels}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div style="font-weight: bold; margin-bottom: 4px;">4.10 Major Repairs</div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.10.1 Needed Within A Year</span><span>: <strong>${tech.neededWithinYear}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.10.2 Body Parts Replaced</span><span>: <strong>${tech.bodyPartsReplaced}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.10.3 Accident</span><span>: <strong>${tech.accident}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.10.4 Write Off By Insures</span><span>: <strong>${tech.writeOff}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.10.5 Comments</span><span>: <strong>${tech.majorRepairsComments}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div style="border:none; display: flex; gap: 5px; margin-bottom: 2px;"><span style="font-weight: bold;">4.11 Compliance With Environment Regulations:</span> <span><strong>${tech.envCompliance}</strong></span></div> <div class="data-row" style="border:none; padding-left: 30px;"><span>Comments</span><span>: - <strong>${tech.envComplianceComments}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div style="font-weight: bold; margin-bottom: 4px;">4.12 Maintenance</div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.12.1 Mechanical</span><span>: <strong>${tech.maintMechanical}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.12.2 Mirrors</span><span>: <strong>${tech.maintMirrors}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.12.3 Internal Trim</span><span>: <strong>${tech.maintInternalTrim}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div style="font-weight: bold; margin-bottom: 4px;">4.13 Options</div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.13.1 P.Shutters</span><span>: <strong>${tech.optShutters}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.13.2 P.Mirrors</span><span>: <strong>${tech.optMirrors}</strong></span></div> <div class="data-row" style="border:none; padding-left: 10px;"><span>4.13.3 A/C</span><span>: <strong>${tech.optAc}</strong></span></div> </div> <div style="margin-bottom: 15px;"> <div class="data-row" style="border:none;"><span style="font-weight: bold;">4.14 Doors</span><span>: <strong>${tech.doors}</strong></span></div> <div class="data-row" style="border:none;"><span style="font-weight: bold;">4.15 Roof Type</span><span>: <strong>${tech.roofType}</strong></span></div> <div class="data-row" style="border:none;"><span style="font-weight: bold;">4.16 Body</span><span>: <strong>${tech.body}</strong></span></div> </div> </div> </div> </div>`;
}, "E:/AW Associate/aw-dashboard-demo/src/components/TechnicalEvaluation.astro", void 0);

const $$SignatureBlock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$SignatureBlock;
  const { val, tech, images } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div style="margin-top: 15px; margin-bottom: 15px;"> <strong>4.17 Any Adverse remarks including for assessment guidance only</strong> <p style="margin: 5px 0;">${tech.adverseRemarks}</p> </div> <div class="section-title" style="color: black; font-size: 14px; background: transparent; border: none; padding: 0; margin-bottom: 5px;"><strong>5.0 Declaration by supplier</strong></div> <p style="margin: 0 0 20px 0; font-size: 12px;">I hereby declare and affirm that I am the current owner of the vehicle details indicated in The section 1.0 and that the information given concerning it are correct to the best of my knowledge.</p> <div style="display: flex; justify-content: space-between; margin-bottom: 15px; width: 80%;"> <div style="width: 40%;">Date ...................................</div> <div style="width: 40%;">Vendor ...................................</div> </div> <hr style="border: 0; border-top: 1px solid #000; margin-bottom: 15px;"> <div style="margin-bottom: 2px; font-size: 13px;"> <strong style="color: red;">6.0 Market value &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Rs. ${val.marketValue}</strong><br> <strong>${val.marketValueWords}</strong> </div> <div style="margin-bottom: 2px; font-size: 13px;"> <strong style="color: red;">7.0 Forced sale value : Rs. ${val.forcedValue}</strong><br> <strong>${val.forcedValueWords}</strong> </div> <div style="margin-bottom: 15px;"> <strong style="color: red;">(The above prices inclusive of VAT)</strong> </div> <hr style="border: 0; border-top: 1px solid #000; margin-bottom: 10px;"> <div style="page-break-inside: avoid; break-inside: avoid;"> <div class="section-title" style="color: black; font-size: 14px; background: transparent; border: none; padding: 0; margin-bottom: 5px;"><strong>8.0 Declaration of valuer</strong></div> <p style="margin: 0 0 5px 0; font-size: 12px;">I hereby confirm that the information stated is correct as per inspection made by me and to the best of my knowledge. Also have given the above valuation after considering all relevant factors, which affect that value of the vehicle to the best of my expertise and knowledge.</p> <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: end; gap: 20px;"> <!-- Signature Left --> <div> <img src="/images/signature.png" alt="Signature" style="height: 120px; object-fit: contain; margin-bottom: 0px;" onerror="this.style.display='none'"> </div> <!-- Seal Middle --> <div style="text-align: center;"> <img src="/images/seal.png" alt="Seal" style="height: 80px; object-fit: contain;" onerror="this.style.display='none'"> </div> <!-- Odometer Right --> <div style="text-align: right;"> <img${addAttribute(images.img3, "src")} alt="Odometer" style="width: 100%; max-width: 200px; height: 100px; object-fit: cover;"> </div> </div> </div>`;
}, "E:/AW Associate/aw-dashboard-demo/src/components/SignatureBlock.astro", void 0);

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const token = Astro2.url.searchParams.get("token");
  if (!token) {
    return new Response("Unauthorized: Missing token in URL. Please open this from the dashboard.", { status: 401 });
  }
  const response = await fetch(`http://localhost:8080/api/valuations/${id}`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!response.ok) {
    return new Response(`Error fetching report: ${response.statusText}`, { status: response.status });
  }
  const apiData = await response.json();
  if (!apiData.success) {
    return new Response(`Error: ${apiData.message}`, { status: 500 });
  }
  const v = apiData.data;
  let financeCompanyLabel = v.finance_company;
  let financeBranchLabel = v.finance_branch;
  try {
    const optRes = await fetch(`http://localhost:8080/api/options`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (optRes.ok) {
      const optData = await optRes.json();
      if (optData.success && optData.data) {
        const fcMatch = optData.data.find((o) => o.option_type === "Finance Company" && (String(o.value) === String(v.finance_company) || String(o.id) === String(v.finance_company)));
        if (fcMatch) financeCompanyLabel = fcMatch.label || fcMatch.value;
        const fbMatch = optData.data.find((o) => o.option_type === "Finance Branch" && (String(o.value) === String(v.finance_branch) || String(o.id) === String(v.finance_branch)));
        if (fbMatch) financeBranchLabel = fbMatch.label || fbMatch.value;
      }
    }
  } catch (e) {
    console.error("Failed to fetch finance options", e);
  }
  const capitalize = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  const meta = {
    refNo: v.id || "N/A",
    date: v.created_at ? v.created_at.substring(0, 10) : "N/A",
    inspectionDate: v.inspection_date || "N/A",
    inspectionPlace: v.inspect_location || "-",
    opinionTo: v.opinion_to,
    financeCompany: financeCompanyLabel,
    financeBranch: financeBranchLabel
  };
  const vehicle = {
    make: v.make || "-",
    model: v.model || "-",
    classification: v.vehicle_type || "-",
    origin: v.country_origin || "-",
    usedCountry: v.country_used || "-",
    yom: v.yom || "-",
    regNo: v.reg_no || "-",
    regDate: "-",
    engineNo: v.engine_no || "-",
    fuelSystem: v.fuel_system || "-",
    capacity: v.engine_capacity ? v.engine_capacity + " CC" : "-",
    chassisNo: v.chassis_no || "-",
    fuelType: v.fuel_type || "-",
    conversionDetails: "-",
    keyNo: "-",
    meterReading: v.meter_reading || "-",
    meterUnit: v.meter_unit || "",
    prevOwners: "-",
    importers: "-",
    importDate: "-",
    clearingDate: "-",
    color: v.body_color || "-",
    justLow: "-",
    seating: v.seating_cap || "-",
    fourWheelDrive: v.differential_type || "-",
    currentOwner: v.current_owner || "-",
    compliance: v.complience_envir === "1" ? "Yes" : v.complience_envir === "0" ? "No" : v.complience_envir || "-",
    complianceComments: v.if_not_comments || "-",
    roadTestDoneOn: v.road_test_done_on || "-",
    roadTestNotDoneReason: "-",
    // Not in DB
    fuelConsumption: v.fuel_consumption || "-",
    sparesBodyParts: v.spares_body_parts || "-",
    sparesEngineParts: v.spares_engine_parts || "-",
    sparesAccessories: v.spares_accessories || "-",
    extraOption: v.extra_options || "-"
  };
  const technical = {
    gearBox: [v.transmission, v.gearbox_con].filter(Boolean).join(" - ") || "-",
    clutch: [v.clutch_type, v.clutch_con].filter(Boolean).join(" - ") || "-",
    shafting: [v.shaft_type, v.shaft_con].filter(Boolean).join(" - ") || "-",
    differential: [v.differential_type, v.differential_con].filter(Boolean).join(" - ") || "-",
    gearSelection: v.gearbox_con || "-",
    suspensionFront: v.suspen_fr_con || "-",
    suspensionRear: v.suspen_re_con || "-",
    footBrakes: v.foot_brake_con || "-",
    handBrakes: v.parking_brake_con || "-",
    starter: v.starter_con || "-",
    wipers: v.wiper_con || "-",
    horn: v.horn_con || "-",
    lights: v.light_con || "-",
    meters: v.meter_con || "-",
    alternator: v.alternator_con || "-",
    steering: v.steering_con || "-",
    chassisCond: v.chassis_con || "-",
    bodyCond: v.body_con || "-",
    engineCond: v.engine_con || "-",
    engineStatus: v.engine_status || "-",
    tireFrontSize: v.fr_size || "-",
    tireFrontPct: v.tyre_front_type || "-",
    tireRearSize: v.re_size || "-",
    tireRearPct: v.tyre_rear_type || "-",
    tireSpareSize: v.sp_size || "-",
    tireSparePct: "-",
    // Not in DB
    rearWheels: v.re_wheel || "-",
    neededWithinYear: v.need_within_year || "-",
    bodyPartsReplaced: v.body_parts_replaced || "-",
    accident: v.accident || "-",
    writeOff: v.write_off || "-",
    majorRepairsComments: v.comments_1 || "-",
    envCompliance: v.envir_reg === "1" ? "Yes" : v.envir_reg === "0" ? "No" : v.envir_reg || "-",
    envComplianceComments: v.comments_2 || "-",
    maintMechanical: v.maint_mechanical_con || "-",
    maintMirrors: v.pw_mirror_con || "-",
    maintInternalTrim: v.inter_trim || "-",
    optShutters: v.pw_shutter_con || "-",
    optMirrors: v.pw_mirror_con || "-",
    optAc: v.ac_con || "-",
    doors: v.spares_doors || "-",
    roofType: v.spares_roof_type || "-",
    body: v.spares_body || "-",
    adverseRemarks: v.test_comment || "-"
  };
  const valuation = {
    marketValue: v.market_value ? v.market_value.toLocaleString() : "0",
    marketValueWords: v.market_value ? capitalize(converter.toWords(v.market_value)) + " only" : "",
    forcedValue: v.forced_value ? v.forced_value.toLocaleString() : "0",
    forcedValueWords: v.forced_value ? capitalize(converter.toWords(v.forced_value)) + " only" : ""
  };
  const getImgUrl = (p) => {
    if (!p) return "https://placehold.co/600x400?text=No+Image";
    return p.startsWith("http") ? p : p.startsWith("/") ? `http://localhost:8080${p}` : `http://localhost:8080/${p}`;
  };
  const images = {
    img1: getImgUrl(v.image_paths?.[0]),
    img2: getImgUrl(v.image_paths?.[1]),
    img3: getImgUrl(v.image_paths?.[2]),
    img4: getImgUrl(v.image_paths?.[3]),
    img5: getImgUrl(v.image_paths?.[4])
  };
  return renderTemplate`${renderComponent($$result, "ReportLayout", $$ReportLayout, { "title": `Valuation Report - ${vehicle.regNo}` }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="a4-page"> ${renderComponent($$result2, "HeaderBanner", $$HeaderBanner, { "meta": meta })} <div style="padding: 0 15mm 10mm 10mm;"> ${renderComponent($$result2, "VehicleDetails", $$VehicleDetails, { "vehicle": vehicle, "images": images })} </div> </div>  <div class="a4-page page-break"> <div style="padding: 5mm 15mm 15mm 10mm;"> ${renderComponent($$result2, "TechnicalEvaluation", $$TechnicalEvaluation, { "tech": technical })} ${renderComponent($$result2, "SignatureBlock", $$SignatureBlock, { "val": valuation, "tech": technical, "images": images })} </div> </div> ` })}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/reports/[id].astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/reports/[id].astro";
const $$url = "/reports/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
        __proto__: null,
        default: $$id,
        file: $$file,
        prerender,
        url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
