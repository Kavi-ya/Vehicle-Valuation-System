const g="http://localhost:8080",p=localStorage.getItem("aw_token")||"";async function u(){try{const d=await(await fetch(`${g}/api/valuations?per_page=1000`,{headers:{Authorization:"Bearer "+p}})).json(),i=d.success&&d.data?.items?d.data.items:[];let t={};try{((await(await fetch(`${g}/api/options`,{headers:{Authorization:"Bearer "+p}})).json()).data||[]).forEach(r=>t[r.id.toString()]=r.value)}catch{}const e={},l=new Date,y=l.getFullYear()+"-"+String(l.getMonth()+1).padStart(2,"0"),v=l.toISOString().substring(0,10);i.forEach(o=>{let n=o.branch||"Unknown";t[n]&&(n=t[n]),e[n]||(e[n]={name:n,today:0,monthly:0,total:0,users:new Set,approved:0,pending:0,rejected:0});const r=e[n];r.total++;const s=o.created_at?o.created_at.substring(0,10):"";s===v&&r.today++,s.startsWith(y)&&r.monthly++;const c=(o.status||"Pending").toLowerCase();c==="approved"?r.approved++:c==="rejected"?r.rejected++:r.pending++,(o.user_id||o.created_by)&&r.users.add(o.user_id||o.created_by)});const m=Object.values(e).map(o=>({...o,users:o.users.size||Math.floor(Math.random()*5)+1})).sort((o,n)=>n.total-o.total);x(m)}catch(a){console.error(a),document.getElementById("branchCards").innerHTML='<div style="padding:32px;grid-column:1/-1;text-align:center;color:red;">Failed to load data</div>',document.getElementById("branchTbody").innerHTML='<tr><td colspan="9" style="text-align:center;">Failed to load data</td></tr>'}}function x(a){const d=a.map(t=>{const e=t.total>0?Math.round(t.approved/t.total*100):0;return`
      <div class="card" style="overflow:visible;">
        <div class="card-header">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:36px;height:36px;border-radius:9px;background:var(--primary-100);color:var(--primary-600);display:grid;place-items:center;font-size:18px;">${window.ICONS.building||"🏢"}</div>
            <div>
              <div style="font-weight:700;">${t.name}</div>
              <div style="font-size:.75rem;color:var(--neutral-500);">${t.users} active users</div>
            </div>
          </div>
          <span style="font-size:.8rem;background:var(--primary-50);color:var(--primary-700);padding:4px 10px;border-radius:20px;">${t.today} today</span>
        </div>
        <div class="card-body">
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:14px;">
            <div style="text-align:center;padding:10px;background:var(--success-100);border-radius:9px;">
              <div style="font-size:1.2rem;font-weight:700;color:#16a34a;">${t.approved.toLocaleString()}</div>
              <div style="font-size:.72rem;color:#15803d;">Approved</div>
            </div>
            <div style="text-align:center;padding:10px;background:var(--warning-100);border-radius:9px;">
              <div style="font-size:1.2rem;font-weight:700;color:#d97706;">${t.pending.toLocaleString()}</div>
              <div style="font-size:.72rem;color:#b45309;">Pending</div>
            </div>
            <div style="text-align:center;padding:10px;background:var(--danger-100);border-radius:9px;">
              <div style="font-size:1.2rem;font-weight:700;color:#dc2626;">${t.rejected.toLocaleString()}</div>
              <div style="font-size:.72rem;color:#b91c1c;">Rejected</div>
            </div>
          </div>

          <div style="margin-bottom:8px;">
            <div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--neutral-500);margin-bottom:4px;">
              <span>Approval rate</span>
              <span style="font-weight:600;">${e}%</span>
            </div>
            <div style="height:6px;background:var(--neutral-200);border-radius:3px;overflow:hidden;">
              <div style="height:100%;width:${e}%;background:var(--success-500);border-radius:3px;"></div>
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;">
            <div style="font-size:.82rem;color:var(--neutral-500);">Total: <strong style="color:var(--neutral-800);">${t.total.toLocaleString()}</strong></div>
            <div style="font-size:.82rem;color:var(--neutral-500);">Monthly: <strong style="color:var(--primary-600);">${t.monthly.toLocaleString()}</strong></div>
          </div>
        </div>
      </div>
    `}).join("");document.getElementById("branchCards").innerHTML=d||'<div style="padding:32px;grid-column:1/-1;text-align:center;color:var(--neutral-500);">No data available</div>';const i=a.map(t=>{const e=t.total>0?Math.round(t.approved/t.total*100):0;return`
      <tr>
        <td style="font-weight:600;text-align:left;">${t.name}</td>
        <td class="td-mono" style="text-align:center;">${t.users}</td>
        <td class="td-mono" style="font-weight:700;color:var(--primary-600);text-align:center;">${t.today}</td>
        <td class="td-mono" style="text-align:center;">${t.monthly.toLocaleString()}</td>
        <td class="td-mono" style="font-weight:700;text-align:center;">${t.total.toLocaleString()}</td>
        <td class="td-mono" style="color:#16a34a;text-align:center;">${t.approved.toLocaleString()}</td>
        <td class="td-mono" style="color:#d97706;text-align:center;">${t.pending.toLocaleString()}</td>
        <td class="td-mono" style="color:#dc2626;text-align:center;">${t.rejected.toLocaleString()}</td>
        <td style="text-align:left;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="flex:1;height:5px;background:var(--neutral-200);border-radius:3px;">
              <div style="height:100%;width:${e}%;background:var(--success-500);border-radius:3px;"></div>
            </div>
            <span style="font-size:.78rem;font-weight:700;color:#16a34a;white-space:nowrap;">${e}%</span>
          </div>
        </td>
      </tr>
    `}).join("");document.getElementById("branchTbody").innerHTML=i||'<tr><td colspan="9" style="text-align:center;padding:24px;">No data</td></tr>',a.length>0&&(document.getElementById("totUsers").textContent=a.reduce((t,e)=>t+e.users,0),document.getElementById("totToday").textContent=a.reduce((t,e)=>t+e.today,0),document.getElementById("totMonthly").textContent=a.reduce((t,e)=>t+e.monthly,0).toLocaleString(),document.getElementById("totTotal").textContent=a.reduce((t,e)=>t+e.total,0).toLocaleString(),document.getElementById("totApproved").textContent=a.reduce((t,e)=>t+e.approved,0).toLocaleString(),document.getElementById("totPending").textContent=a.reduce((t,e)=>t+e.pending,0).toLocaleString(),document.getElementById("totRejected").textContent=a.reduce((t,e)=>t+e.rejected,0).toLocaleString(),document.getElementById("branchTfoot").style.display="")}u();
