import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$Inspection = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Inspection Reports", "subtitle": "Full inspection details per valuation", "role": "admin", "activePage": "inspection" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <h1>Inspection Reports</h1> <p>Detailed inspection condition records for all valuations</p> </div>  <div class="card" style="margin-bottom:20px;"> <div class="card-body"> <div class="form-grid" style="grid-template-columns:repeat(4,1fr);"> <div class="form-group"> <label>Register No.</label> <input type="text" class="form-control" id="q_reg" placeholder="e.g. WP BIA-5292" oninput="filterInsp()"> </div> <div class="form-group"> <label>Inspected By</label> <select class="form-control" id="q_inspector" onchange="filterInsp()"> <option value="">All Inspectors</option> <option>pac1</option><option>Prasanna</option><option>SILVESTER</option><option>JAYAMINI</option> </select> </div> <div class="form-group"> <label>Branch</label> <select class="form-control" id="q_branch" onchange="filterInsp()"> <option value="">All Branches</option> <option>Monaragala</option><option>BADULLA</option><option>BANDARAWELA</option><option>KENDY</option> </select> </div> <div class="form-group"> <label>Date From</label> <input type="date" class="form-control" id="q_date" onchange="filterInsp()"> </div> </div> </div> </div> <div class="card"> <div class="card-header"> <div class="card-title"> <div class="icon" style="background:var(--warning-100);color:#d97706;">${renderComponent($$result2, "Icon", $$Icon, { "name": "wrench" })}</div>
Inspection Records
</div> <button class="btn btn-secondary btn-sm">${renderComponent($$result2, "Icon", $$Icon, { "name": "download", "size": "14" })} Export</button> </div> <div class="table-wrapper" style="border:none;border-radius:0;"> <table id="inspTable"> <thead> <tr> <th>ID</th> <th>Register No.</th> <th>Make / Model</th> <th>Engine Cond.</th> <th>Body Cond.</th> <th>Transmission</th> <th>Overall</th> <th>Inspected By</th> <th>Date</th> <th>Actions</th> </tr> </thead> <tbody id="inspTbody"> <tr><td colspan="10" style="text-align:center;padding:32px;color:var(--neutral-400);">Loading records...</td></tr> </tbody> </table> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/reports/inspection.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/reports/inspection.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/admin/reports/inspection.astro";
const $$url = "/admin/reports/inspection";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Inspection,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
