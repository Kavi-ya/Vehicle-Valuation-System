import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$Users = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "User Management", "subtitle": "Manage system users and permissions", "role": "admin", "activePage": "users" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;"> <div> <h1>User Management</h1> <p>Create, view and manage system users — Admin only</p> </div> <a href="/admin/create-user" class="btn btn-primary">${renderComponent($$result2, "Icon", $$Icon, { "name": "user-plus" })} Create User</a> </div>  <div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:22px;"> <div class="stat-card blue"> <div class="stat-icon blue">${renderComponent($$result2, "Icon", $$Icon, { "name": "users" })}</div> <div><div class="stat-value" id="uTotal">—</div><div class="stat-label">Total Users</div></div> </div> <div class="stat-card green"> <div class="stat-icon green">${renderComponent($$result2, "Icon", $$Icon, { "name": "checkcircle" })}</div> <div><div class="stat-value" id="uActive">—</div><div class="stat-label">Active</div></div> </div> <div class="stat-card amber"> <div class="stat-icon amber">${renderComponent($$result2, "Icon", $$Icon, { "name": "clock" })}</div> <div><div class="stat-value" id="uPending">—</div><div class="stat-label">Pending</div></div> </div> <div class="stat-card purple"> <div class="stat-icon purple">${renderComponent($$result2, "Icon", $$Icon, { "name": "shield" })}</div> <div><div class="stat-value" id="uAdmins">—</div><div class="stat-label">Admins</div></div> </div> </div>  <div class="card"> <div class="card-header"> <div class="card-title"> <div class="icon" style="background:var(--blue-50);color:var(--blue-700);">${renderComponent($$result2, "Icon", $$Icon, { "name": "users" })}</div>
All Users
</div> <div style="display:flex;gap:10px;align-items:center;"> <div class="search-bar"> <span class="search-icon">${renderComponent($$result2, "Icon", $$Icon, { "name": "search", "size": "14" })}</span> <input type="text" class="form-control" placeholder="Search users..." id="userSearch" style="width:210px;"> </div> <a href="/admin/create-user" class="btn btn-primary btn-sm">${renderComponent($$result2, "Icon", $$Icon, { "name": "user-plus", "size": "14" })} New User</a> </div> </div> <!-- Filter bar --> <div style="padding:10px 20px;border-bottom:1px solid var(--ink-100);display:flex;gap:7px;flex-wrap:wrap;"> <button class="btn btn-sm btn-primary" id="filter-all" onclick="filterUsers('all')">All</button> <button class="btn btn-sm btn-secondary" id="filter-admin" onclick="filterUsers('admin')">Admin</button> <button class="btn btn-sm btn-secondary" id="filter-valuer" onclick="filterUsers('valuer')">Valuer</button> <button class="btn btn-sm btn-secondary" id="filter-dataentry" onclick="filterUsers('dataentry')">Data Entry</button> <button class="btn btn-sm btn-secondary" id="filter-confirm" onclick="filterUsers('confirm')">Active</button> <button class="btn btn-sm btn-secondary" id="filter-pending" onclick="filterUsers('pending')">Pending</button> </div> <div class="table-wrapper" style="border:none;border-radius:0;"> <table id="usersTable"> <thead> <tr> <th>ID</th><th>Username</th><th>Full Name</th><th>Role</th> <th>Branch</th><th>Joined</th><th>Status</th><th>Actions</th> </tr> </thead> <tbody id="usersBody"> <tr><td colspan="8" style="text-align:center;padding:28px;color:#9ca3af;">Loading…</td></tr> </tbody> </table> </div> <div id="paginationBar" style="padding:14px 20px;border-top:1px solid var(--blue-50);display:flex;align-items:center;justify-content:space-between;"> <div style="font-size:.79rem;color:var(--neutral-500);" id="countLabel"></div> <div id="pageButtons" style="display:flex;gap:5px;"></div> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/users.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/users.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/admin/users.astro";
const $$url = "/admin/users";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Users,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
