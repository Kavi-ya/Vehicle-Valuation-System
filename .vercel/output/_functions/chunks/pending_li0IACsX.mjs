import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$Pending = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Pending Reports", "subtitle": "Review and approve pending valuations", "role": "admin", "activePage": "pending" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <h1>Pending Reports</h1> <p>13 valuations awaiting review and approval</p> </div> <div class="alert alert-info" style="margin-bottom:20px;display:flex;align-items:center;gap:8px;"> ${renderComponent($$result2, "Icon", $$Icon, { "name": "info", "size": "18" })} These valuations have been submitted and are awaiting admin approval before being finalized.
</div> <div class="card"> <div class="card-header"> <div class="card-title"> <div class="icon" style="background:var(--warning-100);color:#d97706;">${renderComponent($$result2, "Icon", $$Icon, { "name": "clock" })}</div>
Pending Valuations
<span class="badge badge-warning">13</span> </div> <div style="display:flex;gap:8px;"> <button class="btn btn-success btn-sm" onclick="approveAll()">${renderComponent($$result2, "Icon", $$Icon, { "name": "check", "size": "14" })} Approve Selected</button> <button class="btn btn-danger btn-sm" onclick="rejectAll()">${renderComponent($$result2, "Icon", $$Icon, { "name": "x", "size": "14" })} Reject Selected</button> </div> </div> <div class="table-wrapper" style="border:none;border-radius:0;"> <table id="pendingTable"> <thead> <tr> <th><input type="checkbox" id="selectAll" onchange="toggleAll(this)" style="width:14px;height:14px;"></th> <th>ID</th> <th>Register No.</th> <th>Make / Model</th> <th>Branch</th> <th>Submitted By</th> <th>Date</th> <th>Market Value</th> <th>Actions</th> </tr> </thead> <tbody id="pendingBody"> <tr><td colspan="9" style="text-align:center;padding:28px;color:#9ca3af;">Loading pending valuations…</td></tr> </tbody> </table> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/pending.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/pending.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/admin/pending.astro";
const $$url = "/admin/pending";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Pending,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
