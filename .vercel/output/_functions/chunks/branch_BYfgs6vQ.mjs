import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$Branch = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Branch Summary", "subtitle": "Performance overview per branch", "role": "admin", "activePage": "branch" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <h1>Branch Summary</h1> <p>Valuation performance across all branches</p> </div>  <div class="stats-grid" id="branchCards" style="grid-template-columns:repeat(2,1fr);margin-bottom:24px;"> <div style="padding:32px;text-align:center;color:var(--neutral-400);grid-column:1/-1;">Loading branch data...</div> </div>  <div class="card"> <div class="card-header"> <div class="card-title"> <div class="icon" style="background:var(--primary-100);color:var(--primary-600);">${renderComponent($$result2, "Icon", $$Icon, { "name": "trending" })}</div>
Comparative Summary
</div> <button class="btn btn-secondary btn-sm" onclick="window.print()">${renderComponent($$result2, "Icon", $$Icon, { "name": "printer", "size": "14" })} Print</button> </div> <div class="table-wrapper" style="border:none;border-radius:0;"> <table> <thead> <tr> <th style="text-align:left;">Branch</th> <th style="text-align:center;">Users</th> <th style="text-align:center;">Today</th> <th style="text-align:center;">Monthly</th> <th style="text-align:center;">Total</th> <th style="text-align:center;">Approved</th> <th style="text-align:center;">Pending</th> <th style="text-align:center;">Rejected</th> <th style="text-align:left;">Approval %</th> </tr> </thead> <tbody id="branchTbody"> <tr><td colspan="9" style="text-align:center;padding:24px;color:var(--neutral-400);">Loading records...</td></tr> </tbody> <tfoot id="branchTfoot" style="display:none;"> <tr style="background:var(--neutral-50);font-weight:700;"> <td style="padding:12px 16px;text-align:left;">All Branches</td> <td class="td-mono" id="totUsers" style="text-align:center;">0</td> <td class="td-mono" id="totToday" style="color:var(--primary-600);text-align:center;">0</td> <td class="td-mono" id="totMonthly" style="text-align:center;">0</td> <td class="td-mono" id="totTotal" style="text-align:center;">0</td> <td class="td-mono" id="totApproved" style="color:#16a34a;text-align:center;">0</td> <td class="td-mono" id="totPending" style="color:#d97706;text-align:center;">0</td> <td class="td-mono" id="totRejected" style="color:#dc2626;text-align:center;">0</td> <td></td> </tr> </tfoot> </table> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/reports/branch.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/reports/branch.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/admin/reports/branch.astro";
const $$url = "/admin/reports/branch";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Branch,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
