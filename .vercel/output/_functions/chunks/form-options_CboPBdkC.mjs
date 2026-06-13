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
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Form Options", "subtitle": "Manage dropdown options for valuation forms", "role": "admin", "activePage": "form-options", "data-astro-cid-7er374i4": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header" data-astro-cid-7er374i4> <h1 data-astro-cid-7er374i4>Form Options</h1> <p data-astro-cid-7er374i4>Add and manage options for all form dropdown fields</p> </div>   <div style="background:#fff;border:1px solid var(--neutral-200);margin-bottom:24px;box-shadow:var(--shadow-sm);" data-astro-cid-7er374i4> <div style="padding:16px 24px;" data-astro-cid-7er374i4> <ul style="column-count:5;column-gap:24px;list-style-type:disc;margin:0;padding-left:16px;font-size:0.75rem;color:var(--neutral-700);line-height:1.8;" data-astro-cid-7er374i4> ${optionTypes.map((t) => renderTemplate`<li class="cat-item"${addAttribute(`selectCategory('${t}', this)`, "onclick")} data-astro-cid-7er374i4>${t}</li>`)} </ul> </div> </div> <div style="display:grid;grid-template-columns:320px 1fr;gap:20px;align-items:start;" data-astro-cid-7er374i4> <!-- Left: Add Option --> <div class="card" style="position:sticky;top:80px;" data-astro-cid-7er374i4> <div class="card-header" data-astro-cid-7er374i4> <div class="card-title" id="formCardTitle" data-astro-cid-7er374i4> <div class="icon" style="background:var(--primary-100);color:var(--primary-600);" data-astro-cid-7er374i4>${renderComponent($$result2, "Icon", $$Icon, { "name": "plus", "data-astro-cid-7er374i4": true })}</div> <span data-astro-cid-7er374i4>Add New Option</span> </div> </div> <div class="card-body" data-astro-cid-7er374i4> <form onsubmit="addOption(event)" style="display:flex;flex-direction:column;gap:14px;" data-astro-cid-7er374i4> <input type="hidden" id="opt_id" value="" data-astro-cid-7er374i4> <div class="form-group" data-astro-cid-7er374i4> <label data-astro-cid-7er374i4>Option Type <span class="required" data-astro-cid-7er374i4>*</span></label> <select class="form-control" id="sel_type" required data-astro-cid-7er374i4> <option value="" data-astro-cid-7er374i4>— Select option type —</option> ${optionTypes.map((t) => renderTemplate`<option data-astro-cid-7er374i4>${t}</option>`)} </select> </div> <div class="form-group" data-astro-cid-7er374i4> <label data-astro-cid-7er374i4>Option Value <span class="required" data-astro-cid-7er374i4>*</span></label> <input type="text" class="form-control" id="opt_value" placeholder="Enter option value" required data-astro-cid-7er374i4> </div> <div class="form-group" data-astro-cid-7er374i4> <label data-astro-cid-7er374i4>Option Label</label> <input type="text" class="form-control" id="opt_label" placeholder="Enter display name/label" data-astro-cid-7er374i4> </div> <div class="form-group" data-astro-cid-7er374i4> <label data-astro-cid-7er374i4>Sort Order</label> <input type="number" class="form-control" id="opt_sort" placeholder="e.g. 10" min="0" data-astro-cid-7er374i4> </div> <div id="addMsg" style="display:none;" data-astro-cid-7er374i4></div> <div style="display:flex;gap:10px;" data-astro-cid-7er374i4> <button type="submit" class="btn btn-primary" id="saveOptBtn" style="flex:1;" data-astro-cid-7er374i4>${renderComponent($$result2, "Icon", $$Icon, { "name": "check", "size": "16", "data-astro-cid-7er374i4": true })} Add Option</button> <button type="button" class="btn btn-ghost" id="cancelEditBtn" style="display:none;flex:1;" onclick="cancelEdit()" data-astro-cid-7er374i4>Cancel Edit</button> </div> </form> </div> </div> <!-- Right: Options List --> <div class="card" id="optionsCard" style="display:none;" data-astro-cid-7er374i4> <div class="card-header" data-astro-cid-7er374i4> <div class="card-title" id="optionsCardTitle" data-astro-cid-7er374i4> <div class="icon" style="background:var(--neutral-100);color:var(--neutral-600);" data-astro-cid-7er374i4>${renderComponent($$result2, "Icon", $$Icon, { "name": "cog", "data-astro-cid-7er374i4": true })}</div> <span data-astro-cid-7er374i4>Select a Category</span> </div> <div class="search-bar" data-astro-cid-7er374i4> <span class="search-icon" data-astro-cid-7er374i4>${renderComponent($$result2, "Icon", $$Icon, { "name": "search", "size": "14", "data-astro-cid-7er374i4": true })}</span> <input type="text" class="form-control" id="optSearch" placeholder="Search options..." style="width:200px;" oninput="searchOptions()" data-astro-cid-7er374i4> </div> </div> <div class="table-wrapper" style="border:none;border-radius:0;" data-astro-cid-7er374i4> <table id="optTable" data-astro-cid-7er374i4> <thead data-astro-cid-7er374i4> <tr data-astro-cid-7er374i4> <th data-astro-cid-7er374i4>Option Value</th> <th data-astro-cid-7er374i4>Option Label</th> <th data-astro-cid-7er374i4>Sort</th> <th data-astro-cid-7er374i4>Actions</th> </tr> </thead> <tbody id="optTbody" data-astro-cid-7er374i4> <!-- Populated by JS --> </tbody> </table> </div> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/form-options.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/form-options.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/admin/form-options.astro";
const $$url = "/admin/form-options";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$FormOptions,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
