import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead, h as addAttribute } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$FormOptions = createComponent(async ($$result, $$props, $$slots) => {
  const optionTypes = [
    "Air type",
    "Body Color",
    "Body Conditions",
    "Body type",
    "Brake Conditions",
    "Brake Type",
    "Clutch Conditions",
    "Clutch type",
    "Countries",
    "Differential Condition",
    "Differential Type",
    "Electrical Condition",
    "Finance Branch",
    "Finance Company",
    "Fuel System",
    "Fuel Types",
    "Gearbox Condition",
    "Inspectors",
    "Interior Types",
    "Maintain Conditions",
    "Make Details",
    "Opinion provider",
    "Option Condition",
    "Seat Data",
    "Starter Types",
    "Steering Types",
    "Suspension Conditions",
    "Suspension Type",
    "Test Types",
    "Transmission Types",
    "Types of Vehicle",
    "Tyre Front Type",
    "Tyre Material Type",
    "Tyre Rear Type",
    "Tyre Wheel Type",
    "VAT Status",
    "Vehicle Condition",
    "Wiper Type",
    "Yard Details"
  ];
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Form Options", "subtitle": "View available form options", "role": "user", "activePage": "form-options", "data-astro-cid-tqnb63nk": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header" data-astro-cid-tqnb63nk> <h1 data-astro-cid-tqnb63nk>Form Options</h1> <p data-astro-cid-tqnb63nk>Available options for valuation form fields (read-only)</p> </div>   <div style="background:#fff;border:1px solid var(--neutral-200);margin-bottom:24px;box-shadow:var(--shadow-sm);" data-astro-cid-tqnb63nk> <div style="padding:16px 24px;" data-astro-cid-tqnb63nk> <ul style="column-count:5;column-gap:24px;list-style-type:disc;margin:0;padding-left:16px;font-size:0.75rem;color:var(--neutral-700);line-height:1.8;" data-astro-cid-tqnb63nk> ${optionTypes.map((t) => renderTemplate`<li class="cat-item"${addAttribute(`selectCategory('${t}', this)`, "onclick")} data-astro-cid-tqnb63nk>${t}</li>`)} </ul> </div> </div> <div class="alert alert-info" style="margin-bottom:20px;display:flex;align-items:center;gap:8px;" data-astro-cid-tqnb63nk> ${renderComponent($$result2, "Icon", $$Icon, { "name": "info", "size": "18", "data-astro-cid-tqnb63nk": true })} Form options are managed by administrators. Contact your admin to add or modify options.
</div> <div class="card" id="optionsCard" style="display:none;" data-astro-cid-tqnb63nk> <div class="card-header" data-astro-cid-tqnb63nk> <div class="card-title" id="optionsCardTitle" data-astro-cid-tqnb63nk> <div class="icon" style="background:var(--neutral-100);color:var(--neutral-600);" data-astro-cid-tqnb63nk>${renderComponent($$result2, "Icon", $$Icon, { "name": "cog", "data-astro-cid-tqnb63nk": true })}</div> <span data-astro-cid-tqnb63nk>Select a Category</span> </div> <div class="search-bar" data-astro-cid-tqnb63nk> <span class="search-icon" data-astro-cid-tqnb63nk>${renderComponent($$result2, "Icon", $$Icon, { "name": "search", "size": "14", "data-astro-cid-tqnb63nk": true })}</span> <input type="text" class="form-control" id="optSearch" placeholder="Search options..." style="width:200px;" oninput="searchOptions()" data-astro-cid-tqnb63nk> </div> </div> <div id="optGrid" style="display:grid;grid-template-columns:repeat(auto-fill, minmax(200px, 1fr));gap:12px;padding:20px;" data-astro-cid-tqnb63nk> <!-- Populated by JS --> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/user/form-options.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/user/form-options.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/user/form-options.astro";
const $$url = "/user/form-options";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FormOptions,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
