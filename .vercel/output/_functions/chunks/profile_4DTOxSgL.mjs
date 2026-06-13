import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Profile", "subtitle": "View and edit your account", "role": "user", "activePage": "profile" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <h1>My Profile</h1> <p>Manage your account information</p> </div> <div style="display:grid;grid-template-columns:280px 1fr;gap:20px;align-items:start;"> <div> <div class="card" style="text-align:center;"> <div class="card-body"> <div id="profInitial" style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--primary-400),var(--primary-700));display:grid;place-items:center;font-size:1.6rem;font-weight:700;color:#fff;margin:0 auto 12px;">U</div> <div id="profName" style="font-size:1rem;font-weight:700;">User</div> <div id="profEmail" style="font-size:.8rem;color:var(--neutral-500);margin-top:3px;"></div> <div style="margin-top:10px;"><span id="profRole" class="badge badge-neutral">${renderComponent($$result2, "Icon", $$Icon, { "name": "edit", "size": "12" })} Role</span></div> <div id="profBranch" style="margin-top:6px;font-size:.78rem;color:var(--neutral-400);">Branch: </div> </div> </div> <div class="card" style="margin-top:14px;"> <div class="card-body" style="padding:14px 18px;"> ${[{ label: "My Valuations", val: "156" }, { label: "Approved", val: "132" }, { label: "Pending", val: "18" }, { label: "Rejected", val: "6" }].map((s) => renderTemplate`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--neutral-100);font-size:.83rem;"> <span style="color:var(--neutral-500);">${s.label}</span> <span style="font-weight:600;">${s.val}</span> </div>`)} </div> </div> </div> <div class="card"> <div class="card-header"> <div class="card-title"><div class="icon" style="background:var(--primary-100);color:var(--primary-600);">${renderComponent($$result2, "Icon", $$Icon, { "name": "edit" })}</div>Edit Profile</div> </div> <div class="card-body"> <form id="profileForm" style="display:flex;flex-direction:column;gap:18px;"> <div class="divider-label">Personal Information</div> <div class="form-grid" style="grid-template-columns:repeat(2,1fr);"> <div class="form-group"><label>First Name</label><input type="text" class="form-control" name="first_name"></div> <div class="form-group"><label>Last Name</label><input type="text" class="form-control" name="last_name"></div> <div class="form-group"><label>Email</label><input type="email" class="form-control" name="email"></div> <div class="form-group"><label>Phone</label><input type="tel" class="form-control" name="phone"></div> </div> <div class="divider-label">Change Password</div> <div class="form-grid" style="grid-template-columns:repeat(3,1fr);"> <div class="form-group"><label>Current Password</label><input type="password" class="form-control" name="cur_pwd" placeholder="Current password"></div> <div class="form-group"><label>New Password</label><input type="password" class="form-control" name="new_pwd" placeholder="New password"></div> <div class="form-group"><label>Confirm</label><input type="password" class="form-control" name="conf_pwd" placeholder="Confirm password"></div> </div> <div id="profileMsg" style="display:none;"></div> <div style="display:flex;gap:10px;border-top:1px solid var(--neutral-100);padding-top:14px;"> <button type="submit" class="btn btn-primary">${renderComponent($$result2, "Icon", $$Icon, { "name": "save", "size": "16" })} Save Changes</button> <button type="button" class="btn btn-secondary" onclick="loadProfileData()">Reset</button> </div> </form> </div> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/user/profile.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/user/profile.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/user/profile.astro";
const $$url = "/user/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
