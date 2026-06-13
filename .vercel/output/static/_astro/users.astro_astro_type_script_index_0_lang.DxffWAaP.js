const m="http://localhost:8080",u=localStorage.getItem("aw_token")||"";let s=[];async function d(){try{const a=await(await fetch(`${m}/api/users?per_page=100`,{headers:{Authorization:"Bearer "+u}})).json();a.success&&a.data?.items?s=a.data.items:s=[{id:18,username:"prasanna",first_name:"Prasanna",last_name:"",role:"admin",branch:"Monaragala",created_at:"2021-07-26",status:"confirm"},{id:44,username:"JAYAMINI",first_name:"Jayamini",last_name:"",role:"admin",branch:"Bandarawela",created_at:"2025-03-07",status:"confirm"},{id:36,username:"SILVESTER5",first_name:"Silvester",last_name:"",role:"valuer",branch:"Kendy",created_at:"2024-06-18",status:"confirm"},{id:31,username:"pac1981",first_name:"pac1",last_name:"",role:"dataentry",branch:"Monaragala",created_at:"2023-11-19",status:"confirm"},{id:37,username:"Manoj1214",first_name:"Manoj",last_name:"",role:"dataentry",branch:"Badulla",created_at:"2024-07-30",status:"pending"},{id:43,username:"testuser",first_name:"Test",last_name:"User",role:"dataentry",branch:"Badulla",created_at:"2024-12-09",status:"confirm"}],i(s),g(s)}catch{document.getElementById("usersBody").innerHTML='<tr><td colspan="8" style="text-align:center;padding:28px;color:#9ca3af;">Could not load users</td></tr>'}}function g(t){document.getElementById("uTotal").textContent=t.length,document.getElementById("uActive").textContent=t.filter(a=>a.status==="confirm").length,document.getElementById("uPending").textContent=t.filter(a=>a.status==="pending").length,document.getElementById("uAdmins").textContent=t.filter(a=>a.role==="admin").length}function f(t){const a={admin:["badge-blue","Admin"],valuer:["badge-info",`${window.ICONS.search} Valuer`],dataentry:["badge-neutral",`${window.ICONS.edit} Data Entry`]},[e,n]=a[t]||["badge-neutral",t];return`<span class="badge ${e}">${n}</span>`}function i(t){const a=document.getElementById("usersBody");if(document.getElementById("countLabel").textContent=`Showing ${t.length} user${t.length!==1?"s":""}`,!t.length){a.innerHTML='<tr><td colspan="8" style="text-align:center;padding:28px;color:#9ca3af;">No users found</td></tr>';return}a.innerHTML=t.map(e=>{const n=[e.first_name,e.last_name].filter(Boolean).join(" ")||e.username,r=n.charAt(0).toUpperCase(),o=e.created_at?new Date(e.created_at).toLocaleDateString():"—";return`
      <tr data-role="${e.role}" data-status="${e.status}">
        <td class="td-mono">#${e.id}</td>
        <td>
          <div style="display:flex;align-items:center;gap:9px;">
            <div style="width:30px;height:30px;border-radius:50%;background:var(--blue-500);display:grid;place-items:center;font-size:.72rem;font-weight:700;color:#fff;flex-shrink:0;">${r}</div>
            <span style="font-weight:600;">${e.username}</span>
          </div>
        </td>
        <td>${n}</td>
        <td>${f(e.role)}</td>
        <td style="color:var(--neutral-600);">${e.branch||"—"}</td>
        <td class="td-mono" style="font-size:.77rem;">${o}</td>
        <td>
          <span class="badge ${e.status==="confirm"?"badge-success":"badge-warning"}">
            ${e.status==="confirm"?window.ICONS.check+" Active":window.ICONS.clock+" Pending"}
          </span>
        </td>
        <td>
          <div style="display:flex;gap:4px;">
            <button class="btn btn-ghost btn-sm" title="Edit" style="padding:4px;" onclick="window.editUser(${e.id})">${window.ICONS.edit}</button>
            <button class="btn btn-ghost btn-sm" style="color:var(--danger-500);padding:4px;" title="Delete" onclick="window.deleteUser(${e.id}, this)">${window.ICONS.trash}</button>
          </div>
        </td>
      </tr>
    `}).join("")}let l="all";window.filterUsers=function(t){l=t,document.querySelectorAll('[id^="filter-"]').forEach(n=>n.className="btn btn-sm btn-secondary"),document.getElementById("filter-"+t).className="btn btn-sm btn-primary";const a=document.getElementById("userSearch").value.toLowerCase(),e=s.filter(n=>{const r=t==="all"||n.role===t||n.status===t,o=[n.first_name,n.last_name,n.username].join(" ").toLowerCase(),c=!a||o.includes(a)||(n.branch||"").toLowerCase().includes(a);return r&&c});i(e)};document.getElementById("userSearch").addEventListener("input",()=>window.filterUsers(l));window.editUser=function(t){window.location.href="/admin/create-user?edit="+t};window.deleteUser=async function(t,a){if(confirm("Delete user #"+t+"? This cannot be undone."))try{const n=await(await fetch(`http://localhost:8080/api/users/${t}`,{method:"DELETE",headers:{Authorization:"Bearer "+(localStorage.getItem("aw_token")||"")}})).json();n.success?await d():alert(n.message||"Delete failed")}catch{alert("Could not connect to server")}};d();
