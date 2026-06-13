import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Search Vehicle", "subtitle": "Search and manage vehicle records", "role": "admin", "activePage": "search" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <h1>Search Vehicle</h1> <p>Search across all vehicle valuation records</p> </div>  <div class="card" style="margin-bottom:20px;"> <div class="card-body" style="display:flex;gap:12px;align-items:center;"> <div class="search-icon-wrapper" style="position:relative;flex:1;max-width:600px;"> <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--neutral-400);">${renderComponent($$result2, "Icon", $$Icon, { "name": "search", "size": "18" })}</span> <input type="text" class="form-control" id="q_all" placeholder="Search by Register No, Make, Model, Engine, Chassis, YOM..." oninput="filterTable()" style="width:100%;padding-left:36px;height:42px;font-size:1rem;"> </div> <button class="btn btn-secondary" onclick="clearSearch()" style="height:42px;">${renderComponent($$result2, "Icon", $$Icon, { "name": "x", "size": "16" })} Clear</button> </div> </div>  <div class="card"> <div class="card-header"> <div class="card-title"> <div class="icon" style="background:var(--primary-100);color:var(--primary-600);">${renderComponent($$result2, "Icon", $$Icon, { "name": "car" })}</div>
Search Results
<span class="badge badge-blue" id="resultCount">Loading...</span> </div> <div style="display:flex;gap:8px;"> <select class="form-control" id="q_status" style="width:auto;height:32px;font-size:.8rem;" onchange="filterTable()"> <option value="">All Status</option> <option value="Approved">Approved</option> <option value="Pending">Pending</option> <option value="Rejected">Rejected</option> </select> </div> </div> <div class="table-wrapper" style="border:none;border-radius:0;"> <table id="vehicleTable"> <thead> <tr> <th>ID</th> <th>Register No.</th> <th>Make</th> <th>Model</th> <th>Engine No.</th> <th>Chassis No.</th> <th>YOM</th> <th>Market Value</th> <th>Status</th> <th>Actions</th> </tr> </thead> <tbody id="vtbody"> <tr><td colspan="10" style="text-align:center;padding:32px;color:var(--neutral-400);">Loading records...</td></tr> </tbody> </table> </div> <div style="padding:14px 22px;display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--neutral-100);"> <div style="font-size:.8rem;color:var(--neutral-500);" id="tableInfo">Showing 0 results</div> <div style="display:flex;gap:4px;" id="pageButtons"></div> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/search.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/search.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/admin/search.astro";
const $$url = "/admin/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
