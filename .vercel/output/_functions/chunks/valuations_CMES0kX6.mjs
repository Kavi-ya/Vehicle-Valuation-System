import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$Valuations = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "All Valuations", "subtitle": "Browse and manage every valuation record", "role": "admin", "activePage": "valuations" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;"> <div> <h1>All Valuations</h1> <p>Complete list of vehicle valuation records across all branches</p> </div> <div style="display:flex;gap:10px;"> <a href="/admin/add-valuation" class="btn btn-primary">${renderComponent($$result2, "Icon", $$Icon, { "name": "plus" })} Add Valuation</a> <button class="btn btn-secondary" onclick="exportCSV()">${renderComponent($$result2, "Icon", $$Icon, { "name": "download" })} Export CSV</button> </div> </div> <div class="card"> <!-- Card header --> <div class="card-header"> <div class="card-title"> <div class="icon" style="background:var(--blue-100);color:var(--blue-700);">${renderComponent($$result2, "Icon", $$Icon, { "name": "clipboard", "size": "14" })}</div>
Valuation Records
<span class="badge badge-blue" id="countBadge">Loading…</span> </div> <div style="display:flex;gap:8px;align-items:center;"> <div class="search-bar"> <span class="search-icon">${renderComponent($$result2, "Icon", $$Icon, { "name": "search", "size": "14" })}</span> <input type="text" class="form-control" id="vsearch" placeholder="Search by reg, make, model…" style="width:220px;"> </div> <button class="btn btn-secondary btn-sm" onclick="clearFilters()">${renderComponent($$result2, "Icon", $$Icon, { "name": "x", "size": "14" })} Clear</button> </div> </div> <!-- Filter bar --> <div style="padding:10px 22px;border-bottom:1px solid var(--blue-50);display:flex;gap:8px;flex-wrap:wrap;align-items:center;"> <select class="form-control" style="width:auto;height:32px;font-size:.8rem;" id="branchFilter"> <option value="">All Branches</option> <option>Monaragala</option> <option>BADULLA</option> <option>BANDARAWELA</option> <option>KENDY</option> </select> <select class="form-control" style="width:auto;height:32px;font-size:.8rem;" id="statusFilter"> <option value="">All Status</option> <option>Approved</option> <option>Pending</option> <option>Rejected</option> </select> <input type="date" class="form-control" style="width:auto;height:32px;font-size:.8rem;" id="dateFilter"> </div> <!-- Table --> <div class="table-wrapper" style="border:none;border-radius:0;"> <table id="vtable"> <thead> <tr> <th><input type="checkbox" id="selAll" style="width:14px;height:14px;"></th> <th>ID</th> <th>Register No.</th> <th>Make / Model</th> <th>YOM</th> <th>Branch</th> <th>Market Value</th> <th>Date</th> <th>Status</th> <th>Actions</th> </tr> </thead> <tbody id="vtbody"> <tr><td colspan="10" style="text-align:center;padding:32px;color:var(--neutral-400);">Loading valuations…</td></tr> </tbody> </table> </div> <!-- Pagination --> <div style="padding:14px 22px;border-top:1px solid var(--blue-50);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;"> <div style="font-size:.8rem;color:var(--neutral-500);">
Showing <span id="showingCount">0</span> of <span id="totalCount">0</span> records
</div> <div id="pageButtons" style="display:flex;gap:4px;"></div> <div style="display:flex;align-items:center;gap:8px;"> <label style="font-size:.79rem;color:var(--neutral-500);">Per page:</label> <select class="form-control" style="width:70px;height:30px;font-size:.8rem;" id="perPageSel"> <option>10</option><option>25</option><option>50</option><option>100</option> </select> </div> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/valuations.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/valuations.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/admin/valuations.astro";
const $$url = "/admin/valuations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Valuations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
