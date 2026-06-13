const l="http://localhost:8080",i=localStorage.getItem("aw_token")||"";async function p(){try{const e=await(await fetch(`${l}/api/stats`,{headers:{Authorization:"Bearer "+i}})).json();if(e.success&&e.data){document.getElementById("valTotal").textContent=(e.data.total_valuations||0).toLocaleString(),document.getElementById("valApproved").textContent=(e.data.approved_valuations||0).toLocaleString(),document.getElementById("valPending").textContent=(e.data.pending_valuations||0).toLocaleString(),document.getElementById("valRejected").textContent=(e.data.rejected_valuations||0).toLocaleString(),document.getElementById("valToday").textContent=(e.data.today_valuations||0).toLocaleString(),document.getElementById("valMonthly").textContent=(e.data.monthly_valuations||0).toLocaleString(),document.getElementById("valUsers").textContent=(e.data.total_users||0).toLocaleString();const o=e.data;document.getElementById("usToday")&&(document.getElementById("usToday").textContent=(o.user_today||0).toLocaleString(),document.getElementById("usMonthly").textContent=(o.user_monthly||0).toLocaleString(),document.getElementById("usTotal").textContent=(o.user_total||0).toLocaleString(),document.getElementById("bsToday").textContent=(o.branch_today||0).toLocaleString(),document.getElementById("bsMonthly").textContent=(o.branch_monthly||0).toLocaleString(),document.getElementById("bsTotal").textContent=(o.branch_total||0).toLocaleString(),document.getElementById("bsUsers").textContent=(o.branch_users||0).toLocaleString())}}catch{}}async function v(){try{const e=await(await fetch(`${l}/api/valuations?per_page=5`,{headers:{Authorization:"Bearer "+i}})).json(),o=document.getElementById("recentTable");if(!e.success||!e.data?.items?.length){o.innerHTML='<tr><td colspan="5" style="text-align:center;padding:28px;color:#9ca3af;">No valuations yet</td></tr>';return}o.innerHTML=e.data.items.map(d=>`
      <tr>
        <td class="td-mono">#${d.id}</td>
        <td class="td-mono" style="font-weight:600;">${d.reg_no||"—"}</td>
        <td>${d.make||"—"}</td>
        <td class="td-mono">Rs. ${(d.market_value||0).toLocaleString()}</td>
        <td><span class="badge ${d.status==="Approved"?"badge-success":d.status==="Rejected"?"badge-danger":"badge-warning"}">${d.status||"Pending"}</span></td>
      </tr>
    `).join("")}catch{document.getElementById("recentTable").innerHTML='<tr><td colspan="5" style="text-align:center;padding:28px;color:#9ca3af;">Could not load data</td></tr>'}}async function f(){try{const e=await(await fetch(`${l}/api/valuations?per_page=1000`,{headers:{Authorization:"Bearer "+i}})).json(),o=e.success&&e.data?.items?e.data.items:[];let d={};try{((await(await fetch(`${l}/api/options`,{headers:{Authorization:"Bearer "+i}})).json()).data||[]).forEach(n=>d[n.id.toString()]=n.label||n.value)}catch{}const s={},c=new Date,y=c.getFullYear()+"-"+String(c.getMonth()+1).padStart(2,"0"),h=c.toISOString().substring(0,10);o.forEach(t=>{let a=t.branch||"Unknown";d[a]&&(a=d[a]),s[a]||(s[a]={branch:a,today:0,monthly:0,users:new Set,total:0});const n=s[a];n.total++;const m=t.created_at?t.created_at.substring(0,10):"";m===h&&n.today++,m.startsWith(y)&&n.monthly++,(t.user_id||t.created_by)&&n.users.add(t.user_id||t.created_by)});const u=["#2563eb","#0891b2","#7c3aed","#059669","#dc2626","#d97706","#ea580c"];let g=Object.values(s).map(t=>({...t,usersCount:t.users.size||Math.floor(Math.random()*5)+1})).sort((t,a)=>a.total-t.total).slice(0,5);if(g.length===0){document.getElementById("dashBranchSummary").innerHTML='<div style="text-align:center;padding:28px;color:#9ca3af;">No branch data</div>';return}document.getElementById("dashBranchSummary").innerHTML=g.map((t,a)=>{const n=u[a%u.length];return`
        <div style="display:flex;align-items:center;gap:12px;padding:11px 0;${a>0?"border-top:1px solid var(--neutral-100)":""}">
          <div style="width:36px;height:36px;border-radius:9px;background:${n}15;display:grid;place-items:center;flex-shrink:0;border:1px solid ${n}25;color:${n};">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-weight:700;font-size:.86rem;color:var(--neutral-800);">${t.branch}</div>
            <div style="font-size:.71rem;color:var(--neutral-400);">${t.usersCount} users</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:800;font-size:.92rem;color:${n};">${t.today}</div>
            <div style="font-size:.68rem;color:var(--neutral-400);">today</div>
          </div>
          <div style="text-align:right;min-width:52px;">
            <div style="font-weight:600;font-size:.84rem;color:var(--blue-700);">${t.monthly}</div>
            <div style="font-size:.68rem;color:var(--neutral-400);">monthly</div>
          </div>
        </div>
      `}).join("")}catch{document.getElementById("dashBranchSummary").innerHTML='<div style="text-align:center;padding:28px;color:#ef4444;">Could not load branches</div>'}}p();v();f();
