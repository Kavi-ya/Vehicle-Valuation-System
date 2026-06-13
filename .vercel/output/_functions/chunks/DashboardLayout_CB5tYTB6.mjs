import { c as createComponent } from './astro-component_Dq5eXndm.mjs';
import 'piccolore';
import { k as renderTemplate, q as renderSlot, h as addAttribute, u as unescapeHTML, p as renderHead } from './entrypoint_BR-gkYlt.mjs';
import 'clsx';
import { r as renderScript } from './script_PJtCAKhj.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$DashboardLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$DashboardLayout;
  const { title, subtitle, role, activePage } = Astro2.props;
  const ICONS = {
    dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
    valuations: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    "add-valuation": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>`,
    pending: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    finance: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    inspection: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    branch: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    "create-user": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>`,
    "form-options": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
    profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
  };
  const adminNav = [
    { section: "Main", items: [
      { href: "/admin/dashboard", iconKey: "dashboard", label: "Dashboard", key: "dashboard" }
    ] },
    { section: "Valuations", items: [
      { href: "/admin/valuations", iconKey: "valuations", label: "All Valuations", key: "valuations" },
      { href: "/admin/add-valuation", iconKey: "add-valuation", label: "Add Valuation", key: "add-valuation" },
      { href: "/admin/pending", iconKey: "pending", label: "Pending Reports", key: "pending", badgeId: "sidebarPendingBadge" },
      { href: "/admin/search", iconKey: "search", label: "Search Vehicle", key: "search" }
    ] },
    { section: "Reports", items: [
      { href: "/admin/reports/finance", iconKey: "finance", label: "Finance Summary", key: "finance" },
      { href: "/admin/reports/inspection", iconKey: "inspection", label: "Inspection Reports", key: "inspection" },
      { href: "/admin/reports/branch", iconKey: "branch", label: "Branch Summary", key: "branch" }
    ] },
    { section: "Management", items: [
      { href: "/admin/users", iconKey: "users", label: "User Management", key: "users" },
      { href: "/admin/create-user", iconKey: "create-user", label: "Create User", key: "create-user" },
      { href: "/admin/form-options", iconKey: "form-options", label: "Form Options", key: "form-options" },
      { href: "/admin/profile", iconKey: "profile", label: "Profile", key: "profile" }
    ] }
  ];
  const userNav = [
    { section: "Main", items: [
      { href: "/user/dashboard", iconKey: "dashboard", label: "Dashboard", key: "dashboard" }
    ] },
    { section: "Valuations", items: [
      { href: "/user/valuations", iconKey: "valuations", label: "My Valuations", key: "valuations" },
      { href: "/user/add-valuation", iconKey: "add-valuation", label: "Add Valuation", key: "add-valuation" },
      { href: "/user/search", iconKey: "search", label: "Search Vehicle", key: "search" }
    ] },
    { section: "Account", items: [
      { href: "/user/profile", iconKey: "profile", label: "Profile", key: "profile" },
      { href: "/user/form-options", iconKey: "form-options", label: "Form Options", key: "form-options" }
    ] }
  ];
  const nav = role === "admin" ? adminNav : userNav;
  const userName = role === "admin" ? "Prasanna" : "Staff User";
  const userInitials = role === "admin" ? "PA" : "SU";
  const userRole = role === "admin" ? "Administrator" : "Data Entry";
  return renderTemplate(_a || (_a = __template(['<html lang="en" data-astro-cid-kqx5um5x> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>', ' - AW Associates</title><link rel="stylesheet" href="/styles/global.css"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/choices.js@10.2.0/public/assets/styles/choices.min.css"><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css"><script src="/demo-api.js"><\/script><script src="https://cdn.jsdelivr.net/npm/choices.js@10.2.0/public/assets/scripts/choices.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js"><\/script>', '</head> <body data-astro-cid-kqx5um5x> <!-- Demo mode banner --> <div id="demoBanner" style="position:fixed;top:0;left:0;right:0;z-index:99999;background:linear-gradient(90deg,#7c3aed,#2563eb);color:#fff;font-size:.78rem;font-weight:700;text-align:center;padding:7px 16px;letter-spacing:.02em;" data-astro-cid-kqx5um5x>\n🚀 DEMO MODE &nbsp;&mdash;&nbsp; Sample data only. Changes are not saved. &nbsp;|\n  Use <strong data-astro-cid-kqx5um5x>admin</strong> / <strong data-astro-cid-kqx5um5x>any password</strong> or <strong data-astro-cid-kqx5um5x>user</strong> / <strong data-astro-cid-kqx5um5x>any password</strong> to log in.\n</div> <div class="layout" id="mainLayout" style="margin-top:35px;" data-astro-cid-kqx5um5x> <!-- ═══ Sidebar ═══ --> <aside class="sidebar" id="sidebar" data-astro-cid-kqx5um5x> <div class="sidebar-logo" data-astro-cid-kqx5um5x> <div class="logo-icon" data-astro-cid-kqx5um5x> <img src="/Logo.png" alt="AW Associates Logo" style="width: 100%; height: 100%; object-fit: contain;" data-astro-cid-kqx5um5x> </div> <div class="logo-text" data-astro-cid-kqx5um5x> <span data-astro-cid-kqx5um5x>AW Associates</span> <span data-astro-cid-kqx5um5x>Vehicle Valuation</span> </div> </div> <nav class="sidebar-nav" data-astro-cid-kqx5um5x> ', ' </nav> <div class="sidebar-user" data-astro-cid-kqx5um5x> <div class="user-avatar" id="sidebarAvatar" data-astro-cid-kqx5um5x>', '</div> <div class="user-info" data-astro-cid-kqx5um5x> <span class="user-name" id="sidebarName" data-astro-cid-kqx5um5x>', '</span> <span class="user-role" id="sidebarRole" data-astro-cid-kqx5um5x>', '</span> </div> <!-- Power / logout icon --> <a href="#" class="logout-btn" id="logoutBtn" title="Logout" data-astro-cid-kqx5um5x> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-kqx5um5x> <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" data-astro-cid-kqx5um5x></path> <polyline points="16 17 21 12 16 7" data-astro-cid-kqx5um5x></polyline> <line x1="21" y1="12" x2="9" y2="12" data-astro-cid-kqx5um5x></line> </svg> </a> </div> </aside> <!-- ═══ Main ═══ --> <div class="main-wrapper" data-astro-cid-kqx5um5x> <header class="topbar" data-astro-cid-kqx5um5x> <!-- Menu / hamburger icon --> <button class="topbar-btn" id="menu-toggle" aria-label="Toggle sidebar" data-astro-cid-kqx5um5x> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-kqx5um5x> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-kqx5um5x></line><line x1="3" y1="12" x2="21" y2="12" data-astro-cid-kqx5um5x></line><line x1="3" y1="18" x2="21" y2="18" data-astro-cid-kqx5um5x></line> </svg> </button> <div class="topbar-title" data-astro-cid-kqx5um5x> ', " ", ' </div> <div class="topbar-actions" data-astro-cid-kqx5um5x> <!-- Bell icon --> <button class="topbar-btn" title="Notifications" style="position:relative;" data-astro-cid-kqx5um5x> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-kqx5um5x> <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" data-astro-cid-kqx5um5x></path> <path d="M13.73 21a2 2 0 0 1-3.46 0" data-astro-cid-kqx5um5x></path> </svg> <span id="topbarBellBadge" style="position:absolute;top:6px;right:6px;width:6px;height:6px;background:#ef4444;border-radius:50%;border:1.5px solid #fff;display:none;" data-astro-cid-kqx5um5x></span> </button> <div class="topbar-avatar" id="topbarAvatar" data-astro-cid-kqx5um5x>', '</div> </div> </header> <main class="page-content" data-astro-cid-kqx5um5x> ', " </main> </div> </div>  ", " </body> </html>"])), title, renderHead(), nav.map((section) => renderTemplate`<div class="nav-section" data-astro-cid-kqx5um5x> <div class="nav-section-label" data-astro-cid-kqx5um5x>${section.section}</div> ${section.items.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`nav-item ${activePage === item.key ? "active" : ""}`, "class")} data-astro-cid-kqx5um5x> <span class="nav-icon" data-astro-cid-kqx5um5x>${unescapeHTML(ICONS[item.iconKey] ?? ICONS["valuations"])}</span> <span data-astro-cid-kqx5um5x>${item.label}</span> ${item.badgeId && renderTemplate`<span class="nav-badge"${addAttribute(item.badgeId, "id")} style="display:none;" data-astro-cid-kqx5um5x></span>`} ${item.badge && !item.badgeId && renderTemplate`<span class="nav-badge" data-astro-cid-kqx5um5x>${item.badge}</span>`} </a>`)} </div>`), userInitials, userName, userRole, title, subtitle && renderTemplate`<small data-astro-cid-kqx5um5x>${subtitle}</small>`, userInitials, renderSlot($$result, $$slots["default"]), renderScript($$result, "E:/AW Associate/aw-dashboard-demo/src/layouts/DashboardLayout.astro?astro&type=script&index=0&lang.ts"));
}, "E:/AW Associate/aw-dashboard-demo/src/layouts/DashboardLayout.astro", void 0);

export { $$DashboardLayout as $ };
