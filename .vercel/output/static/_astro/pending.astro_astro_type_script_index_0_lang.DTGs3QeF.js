const i="http://localhost:8080",s=localStorage.getItem("aw_token")||"";async function r(){try{const o=await(await fetch(`${i}/api/valuations?per_page=100`,{headers:{Authorization:"Bearer "+s}})).json(),e=document.getElementById("pendingBody");if(o.success&&o.data&&o.data.items){const a=o.data.items.filter(t=>t.status==="Pending"||t.status==="pending"||!t.status);if(document.querySelector(".badge-warning").textContent=a.length,document.querySelector(".page-header p").textContent=`${a.length} valuations awaiting review and approval`,a.length===0){e.innerHTML='<tr><td colspan="9" style="text-align:center;padding:28px;color:#9ca3af;">No pending valuations found</td></tr>';return}e.innerHTML=a.map(t=>{const c=[t.make,t.model].filter(Boolean).join(" ")||"Unknown",d=t.created_at?new Date(t.created_at).toLocaleDateString():"—";return`
          <tr data-id="${t.id}">
            <td><input type="checkbox" class="row-check" value="${t.id}" style="width:14px;height:14px;" /></td>
            <td class="td-mono" style="color:var(--neutral-400);">#${t.id}</td>
            <td class="td-mono" style="font-weight:600;">${t.reg_no||"—"}</td>
            <td>
              <div style="font-weight:500;">${t.make||"—"}</div>
              <div style="font-size:.75rem;color:var(--neutral-400);">${t.model||"—"}</div>
            </td>
            <td style="color:var(--neutral-600);">${t.branch||"—"}</td>
            <td>
              <div style="display:flex;align-items:center;gap:7px;">
                <div style="width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--primary-400),var(--primary-700));display:grid;place-items:center;font-size:.65rem;font-weight:700;color:#fff;">U</div>
                User ${t.created_by||"Unknown"}
              </div>
            </td>
            <td class="td-mono" style="font-size:.8rem;">${d}</td>
            <td class="td-mono" style="font-weight:600;">Rs. ${(t.market_value||0).toLocaleString()}</td>
            <td>
              <div style="display:flex;gap:4px;">
                <button class="btn btn-success btn-sm" onclick="updateStatus(${t.id}, 'Approved', this)" style="padding:4px;" title="Approve"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></button>
                <button class="btn btn-danger btn-sm" onclick="updateStatus(${t.id}, 'Rejected', this)" style="padding:4px;" title="Reject"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></button>
                <a href="/admin/view-valuation?id=${t.id}" class="btn btn-ghost btn-sm" title="View Details" style="padding:4px;">${window.ICONS.eye}</a>
                <a href="javascript:void(0)" onclick="window.open('/reports/${t.id}?token=' + encodeURIComponent(localStorage.getItem('aw_token')), '_blank')" class="btn btn-ghost btn-sm" title="Print" style="padding:4px;">${window.ICONS.printer}</a>
                <a href="/admin/add-valuation?edit=${t.id}" class="btn btn-ghost btn-sm" title="Review / Edit" style="padding:4px;">${window.ICONS.edit}</a>
              </div>
            </td>
          </tr>
        `}).join("")}else e.innerHTML='<tr><td colspan="9" style="text-align:center;padding:28px;color:#9ca3af;">Could not load pending valuations</td></tr>'}catch(n){console.error("Failed to load pending",n),document.getElementById("pendingBody").innerHTML='<tr><td colspan="9" style="text-align:center;padding:28px;color:#9ca3af;">Could not connect to server</td></tr>'}}window.toggleAll=function(n){document.querySelectorAll(".row-check").forEach(o=>o.checked=n.checked)};window.updateStatus=async function(n,o,e){if(confirm(`Are you sure you want to mark valuation #${n} as ${o}?`)){if(e){const a=e.closest("tr");a.style.opacity="0.5",a.style.pointerEvents="none"}try{const t=await(await fetch(`${i}/api/valuations/${n}/status`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+s},body:JSON.stringify({status:o})})).json();t.success?(e&&e.closest("tr").remove(),r()):(alert(t.message||"Failed to update status"),e&&(e.closest("tr").style.opacity="1",e.closest("tr").style.pointerEvents="auto"))}catch{alert("Server error"),e&&(e.closest("tr").style.opacity="1",e.closest("tr").style.pointerEvents="auto")}}};window.approveAll=async function(){const n=document.querySelectorAll(".row-check:checked");if(n.length===0)return alert("No valuations selected");if(confirm(`Approve ${n.length} valuations?`))for(const o of n){const e=o.value,a=o.closest("tr").querySelector(".btn-success");await updateStatus(e,"Approved",a)}};window.rejectAll=async function(){const n=document.querySelectorAll(".row-check:checked");if(n.length===0)return alert("No valuations selected");if(confirm(`Reject ${n.length} valuations?`))for(const o of n){const e=o.value,a=o.closest("tr").querySelector(".btn-danger");await updateStatus(e,"Rejected",a)}};r();
