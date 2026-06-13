import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { o as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_BR-gkYlt.mjs';
import { r as renderScript } from './script_PJtCAKhj.mjs';
import { $ as $$DashboardLayout } from './DashboardLayout_CB5tYTB6.mjs';
import { $ as $$Icon } from './Icon_cGRThlRb.mjs';

const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "DashboardLayout", $$DashboardLayout, { "title": "Profile", "subtitle": "View and edit your account details", "role": "admin", "activePage": "profile" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header"> <h1>My Profile</h1> <p>Manage your account information and preferences</p> </div> <div style="display:grid;grid-template-columns:300px 1fr;gap:20px;align-items:start;"> <!-- Profile Card --> <div> <div class="card" style="text-align:center;"> <div class="card-body"> <div id="profInitial" style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--primary-400),var(--primary-700));display:grid;place-items:center;font-size:1.8rem;font-weight:700;color:#fff;margin:0 auto 14px;">P</div> <div id="profName" style="font-size:1.1rem;font-weight:700;color:var(--neutral-900);">Admin</div> <div id="profEmail" style="font-size:.82rem;color:var(--neutral-500);margin-top:3px;"></div> <div style="margin-top:10px;"><span id="profRole" class="badge badge-blue">${renderComponent($$result2, "Icon", $$Icon, { "name": "shield", "size": "12" })} Administrator</span></div> <div id="profBranch" style="margin-top:8px;font-size:.78rem;color:var(--neutral-400);">Branch: </div> <div id="profMember" style="margin-top:4px;font-size:.78rem;color:var(--neutral-400);">Member since: </div> <button class="btn btn-outline btn-sm" style="margin-top:14px;width:100%;">${renderComponent($$result2, "Icon", $$Icon, { "name": "camera", "size": "14" })} Change Photo</button> </div> </div> <div class="card" style="margin-top:16px;"> <div class="card-header"> <div class="card-title" style="font-size:.82rem;">${renderComponent($$result2, "Icon", $$Icon, { "name": "trending", "size": "14" })} Activity</div> </div> <div class="card-body" style="padding:14px 18px;"> ${[
    { label: "Valuations Added", val: "1,842" },
    { label: "Reports Approved", val: "1,201" },
    { label: "Users Created", val: "11" },
    { label: "Last Login", val: "Today 09:42" }
  ].map((s) => renderTemplate`<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--neutral-100);font-size:.83rem;"> <span style="color:var(--neutral-500);">${s.label}</span> <span style="font-weight:600;">${s.val}</span> </div>`)} </div> </div> </div> <!-- Edit Form --> <div class="card"> <div class="card-header"> <div class="card-title"> <div class="icon" style="background:var(--primary-100);color:var(--primary-600);">${renderComponent($$result2, "Icon", $$Icon, { "name": "edit" })}</div>
Edit Profile
</div> </div> <div class="card-body"> <form id="profileForm" style="display:flex;flex-direction:column;gap:20px;"> <div> <div class="divider-label">Personal Information</div> <div class="form-grid" style="grid-template-columns:repeat(2,1fr);"> <div class="form-group"> <label>First Name</label> <input type="text" class="form-control" name="first_name"> </div> <div class="form-group"> <label>Last Name</label> <input type="text" class="form-control" name="last_name" placeholder="Last name"> </div> <div class="form-group"> <label>Email</label> <input type="email" class="form-control" name="email"> </div> <div class="form-group"> <label>Phone</label> <input type="tel" class="form-control" name="phone"> </div> </div> </div> <div> <div class="divider-label">Change Password</div> <div class="form-grid" style="grid-template-columns:repeat(3,1fr);"> <div class="form-group"> <label>Current Password</label> <input type="password" class="form-control" name="cur_pwd" placeholder="Current password"> </div> <div class="form-group"> <label>New Password</label> <input type="password" class="form-control" name="new_pwd" placeholder="Min 8 characters"> </div> <div class="form-group"> <label>Confirm Password</label> <input type="password" class="form-control" name="conf_pwd" placeholder="Re-enter new password"> </div> </div> </div> <div id="profileMsg" style="display:none;"></div> <div style="display:flex;gap:10px;border-top:1px solid var(--neutral-100);padding-top:14px;"> <button type="submit" class="btn btn-primary">${renderComponent($$result2, "Icon", $$Icon, { "name": "save", "size": "16" })} Save Changes</button> <button type="button" class="btn btn-secondary" onclick="loadProfileData()">Reset</button> </div> </form> </div> </div> </div> ` })} ${renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/profile.astro?astro&type=script&index=0&lang.ts")}`;
}, "E:/AW Associate/aw-dashboard-demo/src/pages/admin/profile.astro", void 0);

const $$file = "E:/AW Associate/aw-dashboard-demo/src/pages/admin/profile.astro";
const $$url = "/admin/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
