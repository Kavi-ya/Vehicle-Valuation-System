const m="http://localhost:8080",h=localStorage.getItem("aw_token")||"";let i=[],c=[],d=1,l=10;async function w(){try{const n=await(await fetch(`${m}/api/valuations?per_page=200`,{headers:{Authorization:"Bearer "+h}})).json();i=n.success&&n.data?.items?n.data.items:[]}catch(e){console.error(e),i=[]}r()}function r(){const e=document.getElementById("vsearch").value.toLowerCase(),n=document.getElementById("branchFilter").value.toLowerCase(),s=document.getElementById("statusFilter").value.toLowerCase(),t=document.getElementById("dateFilter").value;c=i.filter(o=>{const a=[o.reg_no,o.make,o.model,o.branch,String(o.id)].join(" ").toLowerCase(),u=o.created_at?o.created_at.substring(0,10):"";return(!e||a.includes(e))&&(!n||(o.branch||"").toLowerCase().includes(n))&&(!s||(o.status||"").toLowerCase()===s)&&(!t||u===t)}),d=1,document.getElementById("countBadge").textContent=c.length+" records",document.getElementById("totalCount").textContent=c.length,b()}function b(){const e=(d-1)*l,n=c.slice(e,e+l),s=document.getElementById("vtbody");if(document.getElementById("showingCount").textContent=Math.min(e+l,c.length),!n.length){s.innerHTML='<tr><td colspan="10" style="text-align:center;padding:32px;color:var(--neutral-400);">No records found</td></tr>',g();return}s.innerHTML=n.map(t=>{const o=t.created_at?t.created_at.substring(0,10):"—",a=t.status||"Pending",u=a==="Approved"?"badge-success":a==="Rejected"?"badge-danger":"badge-warning",p=a==="Approved"?window.ICONS.check:a==="Rejected"?window.ICONS.x:window.ICONS.clock;return`
      <tr>
        <td><input type="checkbox" class="row-cb" style="width:14px;height:14px;" /></td>
        <td class="td-mono">#${t.id}</td>
        <td class="td-mono" style="font-weight:600;">${t.reg_no||"—"}</td>
        <td>
          <div style="font-weight:600;font-size:.85rem;">${t.make||"—"}</div>
          <div style="font-size:.75rem;color:var(--neutral-400);">${t.model||""}</div>
        </td>
        <td class="td-mono">${t.yom||"—"}</td>
        <td>
          <span style="font-size:.79rem;background:var(--blue-50);color:var(--blue-700);padding:2px 9px;border-radius:6px;font-weight:600;">
            ${t.branch||"—"}
          </span>
        </td>
        <td class="td-mono" style="font-weight:700;color:var(--blue-800);">Rs. ${(t.market_value||0).toLocaleString()}</td>
        <td class="td-mono" style="font-size:.78rem;">${o}</td>
        <td><span class="badge ${u}">${p} ${a}</span></td>
        <td>
          <div style="display:flex;gap:4px;">
            <a href="/admin/view-valuation?id=${t.id}" class="btn btn-ghost btn-sm" title="View Details" style="padding:4px;">${window.ICONS.eye}</a>
            <a href="/admin/add-valuation?edit=${t.id}" class="btn btn-ghost btn-sm" title="Edit" style="padding:4px;">${window.ICONS.edit}</a>
            <a href="javascript:void(0)" onclick="window.open('/reports/${t.id}?token=' + encodeURIComponent(localStorage.getItem('aw_token')), '_blank')" class="btn btn-ghost btn-sm" title="Print" style="padding:4px;">${window.ICONS.printer}</a>
            <button class="btn btn-ghost btn-sm" title="Delete"
              style="color:var(--danger-500);padding:4px;"
              onclick="deleteVal(${t.id}, this)">${window.ICONS.trash}</button>
          </div>
        </td>
      </tr>`}).join(""),g()}function g(){const e=Math.ceil(c.length/l),n=document.getElementById("pageButtons");if(e<=1){n.innerHTML="";return}let s=`<button class="btn btn-secondary btn-sm" onclick="goPage(${d-1})" ${d===1?"disabled":""}>‹ Prev</button>`;for(let t=1;t<=e;t++)t===1||t===e||Math.abs(t-d)<=2?s+=`<button class="btn btn-sm ${t===d?"btn-primary":"btn-secondary"}" onclick="goPage(${t})">${t}</button>`:Math.abs(t-d)===3&&(s+='<span style="padding:0 4px;align-self:center;color:var(--neutral-400);">…</span>');s+=`<button class="btn btn-secondary btn-sm" onclick="goPage(${d+1})" ${d===e?"disabled":""}>Next ›</button>`,n.innerHTML=s}window.goPage=function(e){const n=Math.ceil(c.length/l);e<1||e>n||(d=e,b())};document.getElementById("vsearch").addEventListener("input",r);document.getElementById("branchFilter").addEventListener("change",r);document.getElementById("statusFilter").addEventListener("change",r);document.getElementById("dateFilter").addEventListener("change",r);document.getElementById("perPageSel").addEventListener("change",function(){l=parseInt(this.value),r()});document.getElementById("selAll").addEventListener("change",function(){document.querySelectorAll(".row-cb").forEach(e=>e.checked=this.checked)});window.clearFilters=function(){["vsearch","branchFilter","statusFilter","dateFilter"].forEach(e=>{const n=document.getElementById(e);n&&(n.value="")}),r()};window.deleteVal=async function(e,n){if(confirm(`Delete valuation #${e}? This cannot be undone.`))try{const t=await(await fetch(`${m}/api/valuations/${e}`,{method:"DELETE",headers:{Authorization:"Bearer "+h}})).json();t.success?(i=i.filter(o=>o.id!==e),r()):alert(t.message||"Delete failed")}catch{alert("Could not connect to server")}};window.exportCSV=function(){const e=[["ID","Register No","Make","Model","YOM","Branch","Market Value","Date","Status"]];c.forEach(a=>e.push([a.id,a.reg_no,a.make,a.model,a.yom,a.branch,a.market_value,a.created_at?.substring(0,10),a.status]));const n=e.map(a=>a.join(",")).join(`
`),s=new Blob([n],{type:"text/csv"}),t=URL.createObjectURL(s),o=document.createElement("a");o.href=t,o.download="valuations.csv",o.click()};w();
