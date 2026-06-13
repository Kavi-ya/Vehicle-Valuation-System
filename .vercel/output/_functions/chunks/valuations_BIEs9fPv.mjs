import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$Valuations = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "My Valuations", "subtitle": "View all your submitted valuations", "role": "user", "activePage": "valuations" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;"> <div> <h1>My Valuations</h1> <p>All valuations submitted by you</p> </div> <a href="/user/add-valuation" class="btn btn-primary">${renderComponent($$result2, "Icon", $$Icon, { "name": "plus" })} Add Valuation</a> </div> <div class="card"> <!-- Card Header --> <div class="card-header"> <div class="card-title"> <div class="icon" style="background:var(--blue-100);color:var(--blue-700);">${renderComponent($$result2, "Icon", $$Icon, { "name": "clipboard", "size": "14" })}</div>
Valuations List
<span class="badge badge-blue" id="countBadge">Loading…</span> </div> <div style="display:flex;gap:8px;"> <div class="search-bar"> <span class="search-icon">${renderComponent($$result2, "Icon", $$Icon, { "name": "search", "size": "14" })}</span> <input type="text" class="form-control" placeholder="Search…" style="width:200px;" id="vsearch"> </div> </div> </div> <!-- Status Filter Tabs --> <div style="padding:10px 22px;border-bottom:1px solid var(--blue-50);display:flex;gap:7px;flex-wrap:wrap;"> <button class="btn btn-sm btn-primary" id="fs-all" onclick="setStatusFilter('all')">All</button> <button class="btn btn-sm btn-secondary" id="fs-approved" onclick="setStatusFilter('approved')">${renderComponent($$result2, "Icon", $$Icon, { "name": "check", "size": "14" })} Approved</button> <button class="btn btn-sm btn-secondary" id="fs-pending" onclick="setStatusFilter('pending')">${renderComponent($$result2, "Icon", $$Icon, { "name": "clock", "size": "14" })} Pending</button> <button class="btn btn-sm btn-secondary" id="fs-rejected" onclick="setStatusFilter('rejected')">${renderComponent($$result2, "Icon", $$Icon, { "name": "x", "size": "14" })} Rejected</button> </div> <!-- Table --> <div class="table-wrapper" style="border:none;border-radius:0;"> <table id="vtable"> <thead> <tr> <th>ID</th> <th>Register No.</th> <th>Make</th> <th>Model</th> <th>YOM</th> <th>Market Value</th> <th>Date</th> <th>Status</th> <th>Actions</th> </tr> </thead> <tbody id="vtbody"> <tr><td colspan="9" style="text-align:center;padding:32px;color:var(--neutral-400);">Loading…</td></tr> </tbody> </table> </div> <!-- Footer --> <div style="padding:12px 22px;border-top:1px solid var(--blue-50);font-size:.79rem;color:var(--neutral-500);">
Showing <span id="showCount">0</span> valuation(s)
</div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/user/valuations.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/user/valuations.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/user/valuations.astro";
const $$url = "/user/valuations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Valuations,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
