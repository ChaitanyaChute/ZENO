"use client";

import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import { Mail, Plus, ShieldCheck, UserRound, Workflow } from "lucide-react";
import WorkflowCanvas from "./workflow-canvas";
import { DashboardView } from "./dashboard-view";

// â”€â”€ THEME â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const C = {
  bg:      "#080808",
  surface: "#0D0D0D",
  border:  "#1A1A1A",
  border2: "#242424",
  lime:    "#C8FF00",
  lime2:   "#A8D600",
  mint:    "#00E882",
  blue:    "#229EFF",
  pink:    "#FF4FA3",
  muted:   "#444",
  muted2:  "#333",
  text:    "#E0E0E0",
  text2:   "#888",
  text3:   "#444",
};

type TagProps = { children: ReactNode; color?: string; bg?: string };
type BadgeProps = { children: ReactNode; color?: string };
type BtnProps = { children?: ReactNode; onClick?: () => void; primary?: boolean; small?: boolean; icon?: ReactNode; disabled?: boolean };
type CardProps = { children?: ReactNode; style?: CSSProperties; onClick?: () => void };
type PillProps = { label: string; value: string; color?: string };
type SidebarProps = { active: string; setActive: (id: string) => void };
type PageProps = { setPage?: (page: string) => void };

const Tag = ({ children, color = C.lime, bg }: TagProps) => (
  <span style={{
    fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:1.5,
    padding:"3px 8px", borderRadius:20, border:`0.5px solid ${color}44`,
    background: bg || `${color}12`, color, textTransform:"uppercase",
  }}>{children}</span>
);

const Badge = ({ children, color = C.mint }: BadgeProps) => (
  <span style={{
    fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:1,
    padding:"2px 7px", borderRadius:10, border:`0.5px solid ${color}55`,
    background:`${color}15`, color,
  }}>{children}</span>
);

const Btn = ({ children, onClick, primary, small, icon, disabled }: BtnProps) => (
  <button onClick={onClick} disabled={disabled} style={{
    display:"inline-flex", alignItems:"center", gap:6,
    background: primary ? C.lime : "transparent",
    border:`0.5px solid ${primary ? C.lime : C.border2}`,
    color: primary ? "#080808" : C.text2,
    padding: small ? "5px 12px" : "8px 18px",
    borderRadius: 6, fontSize: small ? 11 : 12,
    fontWeight: 500, cursor: disabled ? "not-allowed" : "pointer",
    fontFamily:"'Syne',sans-serif", letterSpacing:.3, opacity: disabled ? .5 : 1,
    transition:"all .2s",
  }}>{icon && <span>{icon}</span>}{children}</button>
);

const Card = ({ children, style, onClick }: CardProps) => (
  <div onClick={onClick} style={{
    background: C.surface, border:`0.5px solid ${C.border}`,
    borderRadius:8, padding:16, ...style,
    cursor: onClick ? "pointer" : "default",
    transition: onClick ? "border-color .2s" : undefined,
  }}>{children}</div>
);

const Pill = ({ label, value, color = C.lime }: PillProps) => (
  <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:C.text3, letterSpacing:1.5, textTransform:"uppercase" }}>{label}</span>
    <span style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:700, color }}>{value}</span>
  </div>
);

const Sidebar = ({ active, setActive }: SidebarProps) => {
  const items = [
    { id:"dashboard",    icon:"â¬¡", label:"Dashboard"    },
    { id:"builder",      icon:"â¬¡", label:"Builder"      },
    { id:"templates",    icon:"â¬¡", label:"Templates"    },
    { id:"history",      icon:"â¬¡", label:"Run History"  },
    { id:"visualizer",   icon:"â¬¡", label:"Live Run"     },
    { id:"team",         icon:"â¬¡", label:"Team"         },
    { id:"settings",     icon:"â¬¡", label:"Settings"     },
  ];
  const icons: Record<string, string> = {
    dashboard: "â—ˆ", builder: "â¬¡", templates: "â–¦",
    history: "â—Ž", visualizer: "â–¶", team: "â—‰", settings: "âš™",
  };
  return (
    <div style={{
      width:56, background:C.surface, borderRight:`0.5px solid ${C.border}`,
      display:"flex", flexDirection:"column", alignItems:"center",
      padding:"12px 0", gap:2, flexShrink:0, height:"100vh", position:"sticky", top:0,
    }}>
      <div style={{ width:32, height:32, borderRadius:8, background:C.lime, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, flexShrink:0 }}>
        <span style={{ color:"#080808", fontSize:16, fontWeight:800 }}>âš¡</span>
      </div>
      {items.map(it => (
        <button key={it.id} onClick={() => setActive(it.id)} title={it.label} style={{
          width:36, height:36, borderRadius:8, border:"none",
          background: active === it.id ? `${C.lime}18` : "transparent",
          color: active === it.id ? C.lime : C.text3,
          fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          transition:"all .2s",
        }}>{icons[it.id]}</button>
      ))}
      <div style={{ flex:1 }} />
      <div style={{ width:28, height:28, borderRadius:"50%", background:C.border2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:C.text3, marginBottom:4, cursor:"pointer" }}>CC</div>
    </div>
  );
};

// â”€â”€ PAGE: DASHBOARD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export const Dashboard = ({ setPage }: PageProps) => {
  return <DashboardView setPage={setPage} />;
};

export const Builder = ({ setPage }: PageProps) => {
  void setPage;
  return <WorkflowCanvas />;
};

// â”€â”€ PAGE: RUN HISTORY & LOGS (exported as History)

// â”€â”€ PAGE: LIVE RUN VISUALIZER (exported as Visualizer)

// â”€â”€ PAGE: TEAM & SETTINGS (exported above)

export const Settings = () => {
  const tabs = ["integrations", "profile", "workspace", "notifications", "billing"];
  const [tab, setTab] = useState(tabs[0]);

  const apps = [
    { name: "Gmail", status: "connected", info: "chaitanya@gmail.com" },
    { name: "Slack", status: "connected", info: "FlowForge workspace" },
    { name: "Notion", status: "disconnected", info: "Not connected" },
    { name: "Sheets", status: "connected", info: "3 sheets linked" },
  ];

  return (
    <div style={{ padding:28 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:C.text3, letterSpacing:3 }}>SETTINGS</div>
          <h1 style={{ fontWeight:700, fontSize:20 }}>Settings</h1>
        </div>
        <Btn>Save</Btn>
      </div>

      <div style={{ marginTop:16, display:'flex', gap:16 }}>
        <aside style={{ width:220 }}>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ textAlign:'left', padding:'10px 12px', borderRadius:8, border:`0.5px solid ${tab===t?C.lime:C.border2}`, background: tab===t?`${C.lime}10`:'transparent', color: tab===t?C.lime:C.text3, cursor:'pointer' }}>{t}</button>
            ))}
          </div>
        </aside>

        <main style={{ flex:1 }}>
          {tab === 'integrations' && (
            <div style={{ display:'grid', gap:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:10, color:C.text3 }}>Connections</div>
                  <h2 style={{ marginTop:6 }}>Integrations</h2>
                </div>
                <Btn primary>+ Connect App</Btn>
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
                {apps.map(a => (
                  <Card key={a.name}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div>
                        <div style={{ fontWeight:600 }}>{a.name}</div>
                        <div style={{ fontSize:12, color:C.text3 }}>{a.info}</div>
                      </div>
                      <div>
                        <button style={{ padding:'6px 12px', borderRadius:8, border:`0.5px solid ${a.status==='connected'?C.border:'transparent'}`, background: a.status==='connected'? 'transparent' : `${C.lime}10`, color: a.status==='connected'?C.text2:C.lime }}>{a.status==='connected'?'Manage':'Connect'}</button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {tab === 'profile' && (
            <div style={{ maxWidth:720, display:'flex', flexDirection:'column', gap:12 }}>
              <div>
                <div style={{ fontSize:10, color:C.text3 }}>Account</div>
                <h2 style={{ marginTop:6 }}>Profile</h2>
              </div>
              {[
                ['Display name','Chaitanya Chute'],
                ['Email','chaitanya@gmail.com'],
                ['Username','chaitanya'],
              ].map(([label,value]) => (
                <div key={label}>
                  <div style={{ fontSize:12, color:C.text3, marginBottom:6 }}>{label}</div>
                  <input defaultValue={value} style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:`0.5px solid ${C.border}`, background:'transparent', color:C.text }} />
                </div>
              ))}
              <div>
                <Btn primary>Save Changes</Btn>
              </div>
            </div>
          )}

          {tab === 'workspace' && (
            <div style={{ maxWidth:720 }}>
              <div style={{ fontSize:10, color:C.text3 }}>Workspace</div>
              <h2 style={{ marginTop:6 }}>Workspace Settings</h2>
              {[
                ['Workspace Name','FlowForge Team'],
                ['Timezone','Asia/Kolkata'],
                ['Default language','English'],
              ].map(([label,value]) => (
                <div key={label} style={{ marginTop:12 }}>
                  <div style={{ fontSize:12, color:C.text3, marginBottom:6 }}>{label}</div>
                  <input defaultValue={value} style={{ width:'100%', padding:'10px 12px', borderRadius:8, border:`0.5px solid ${C.border}`, background:'transparent', color:C.text }} />
                </div>
              ))}
              <div style={{ marginTop:12 }}><Btn primary>Save</Btn></div>
            </div>
          )}

          {(tab === 'notifications' || tab === 'billing') && (
            <div style={{ padding:20, borderRadius:12, border:`0.5px dashed ${C.border}`, color:C.text3 }}>This section is coming soon.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export const History = ({ setPage }: PageProps) => {
  void setPage;

  const runs = [
    { id:1, wf:'Lead â†’ Gmail + Slack', status:'success', time:'2m ago', dur:'1.2s' },
    { id:2, wf:'New Order â†’ Sheet', status:'success', time:'14s ago', dur:'0.4s' },
    { id:3, wf:'Telegram Bot Reply', status:'failed', time:'1m ago', dur:'2.1s' },
  ];

  return (
    <div style={{ padding:28 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <div style={{ fontSize:10, color:C.text3 }}>RUN HISTORY</div>
          <h2 style={{ marginTop:6 }}>Recent Runs</h2>
        </div>
        <div>
          <Btn>Export</Btn>
        </div>
      </div>

      <div style={{ marginTop:16, display:'grid', gap:8 }}>
        {runs.map(r => (
          <Card key={r.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <div style={{ fontWeight:600 }}>{r.wf}</div>
              <div style={{ fontSize:12, color:C.text3 }}>{r.dur} â€¢ {r.time}</div>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <div style={{ alignSelf:'center', color: r.status==='success'?C.mint:C.pink }}>{r.status}</div>
              <Btn small>Details</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Visualizer = ({ setPage }: PageProps) => {
  void setPage;

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:12 }}>
        <div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:C.text3, letterSpacing:3, marginBottom:4 }}>LIVE</div>
          <h1 style={{ fontWeight:700, fontSize:22, letterSpacing:-.3 }}>Run Visualizer</h1>
          <p style={{ marginTop:6, color:C.text2, fontSize:13, maxWidth:560 }}>Replay a workflow run and watch each node light up as execution advances.</p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <Btn>Reset</Btn>
          <Btn primary>Simulate Run</Btn>
        </div>
      </div>

      <Card style={{ minHeight:280, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:.45, backgroundImage:"radial-gradient(circle at 20% 20%, rgba(200,255,0,0.08), transparent 30%), radial-gradient(circle at 80% 30%, rgba(0,232,130,0.08), transparent 35%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize:"auto, auto, 24px 24px, 24px 24px" }} />
        <div style={{ position:"relative", display:"grid", gap:12, gridTemplateColumns:"repeat(5, minmax(0, 1fr))" }}>
          {[["Webhook", C.lime], ["Enrich", C.mint], ["Score", C.blue], ["Gmail", C.pink], ["Slack", C.blue]].map(([label, color]) => (
            <div key={label as string} style={{ borderRadius:16, border:`0.5px solid ${`${color}55`}`, background:`${`${color}`}12`, padding:14, color:color as string }}>
              <div style={{ fontSize:9, letterSpacing:2, textTransform:"uppercase", color:C.text3 }}>Step</div>
              <div style={{ marginTop:8, fontSize:14, fontWeight:700, color:C.text }}>{label as string}</div>
              <div style={{ marginTop:10, fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:C.text3 }}>ready</div>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(3, minmax(0, 1fr))" }}>
        <Card style={{ padding:"14px 16px" }}>
          <div style={{ fontSize:9, letterSpacing:2, color:C.text3, textTransform:"uppercase" }}>Run state</div>
          <div style={{ marginTop:6, fontSize:16, fontWeight:700, color:C.lime }}>Idle</div>
        </Card>
        <Card style={{ padding:"14px 16px" }}>
          <div style={{ fontSize:9, letterSpacing:2, color:C.text3, textTransform:"uppercase" }}>Average duration</div>
          <div style={{ marginTop:6, fontSize:16, fontWeight:700, color:C.mint }}>1.2s</div>
        </Card>
        <Card style={{ padding:"14px 16px" }}>
          <div style={{ fontSize:9, letterSpacing:2, color:C.text3, textTransform:"uppercase" }}>Failures</div>
          <div style={{ marginTop:6, fontSize:16, fontWeight:700, color:C.pink }}>1 in 24</div>
        </Card>
      </div>
    </div>
  );
};

export const Templates = ({ setPage }: PageProps) => {
  const templates = [
    {
      name: "Lead Scoring Pipeline",
      description: "Collect leads, enrich them, score them, and route the best ones to sales.",
      label: "CRM",
      stats: "6 nodes",
    },
    {
      name: "Weekly Digest",
      description: "Aggregate activity, format the summary, and send it to the team inbox.",
      label: "Reporting",
      stats: "5 nodes",
    },
    {
      name: "Support Triage",
      description: "Classify incoming requests and route urgent issues to the right queue.",
      label: "Ops",
      stats: "7 nodes",
    },
  ];

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center", gap:12 }}>
        <div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:C.text3, letterSpacing:3, marginBottom:4 }}>TEMPLATES</div>
          <h1 style={{ fontWeight:700, fontSize:22, letterSpacing:-.3 }}>Starter workflows</h1>
          <p style={{ marginTop:6, color:C.text2, fontSize:13, maxWidth:560 }}>Pick a prebuilt automation and open it in the builder to customize it for your workspace.</p>
        </div>
        <Btn primary onClick={() => setPage?.("builder")}>Open Builder</Btn>
      </div>

      <div style={{ display:"grid", gap:12, gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))" }}>
        {templates.map((template) => (
          <Card key={template.name} style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>
              <Badge>{template.label}</Badge>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:C.text3 }}>{template.stats}</span>
            </div>
            <div>
              <h2 style={{ fontSize:16, fontWeight:700, color:C.text }}>{template.name}</h2>
              <p style={{ marginTop:8, fontSize:13, lineHeight:1.6, color:C.text2 }}>{template.description}</p>
            </div>
            <div style={{ marginTop:"auto", display:"flex", gap:8 }}>
              <Btn small onClick={() => setPage?.("builder")}>Use Template</Btn>
              <Btn small>Preview</Btn>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const Team = () => {
  const members = [
    { name: "Chaitanya Chute", email: "chaitanya@...", role: "Owner", last: "now", avatar: "CC" },
    { name: "Aryan Mehta", email: "aryan@...", role: "Admin", last: "2h ago", avatar: "AM" },
    { name: "Sneha Kulkarni", email: "sneha@...", role: "Editor", last: "1d ago", avatar: "SK" },
    { name: "Rohan Desai", email: "rohan@...", role: "Viewer", last: "3d ago", avatar: "RD" },
    { name: "Priya Joshi", email: "priya@...", role: "Editor", last: "5h ago", avatar: "PJ" },
  ];

  const perms = [
    { action: "Create workflows", Owner: true, Admin: true, Editor: true, Viewer: false },
    { action: "Edit workflows", Owner: true, Admin: true, Editor: true, Viewer: false },
    { action: "Delete workflows", Owner: true, Admin: true, Editor: false, Viewer: false },
    { action: "Manage integrations", Owner: true, Admin: true, Editor: false, Viewer: false },
    { action: "View run history", Owner: true, Admin: true, Editor: true, Viewer: true },
    { action: "Invite members", Owner: true, Admin: true, Editor: false, Viewer: false },
    { action: "Billing & plans", Owner: true, Admin: false, Editor: false, Viewer: false },
  ];

  const roleColor: Record<string, string> = {
    Owner: C.lime,
    Admin: C.pink,
    Editor: C.mint,
    Viewer: C.blue,
  };

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
        <div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:C.text3, letterSpacing:3, marginBottom:4 }}>WORKSPACE</div>
          <h1 style={{ fontWeight:700, fontSize:22, letterSpacing:-.3 }}>Team & Access</h1>
          <p style={{ marginTop:6, color:C.text2, fontSize:13 }}>Manage member roles and review the workspace permissions matrix.</p>
        </div>
        <Btn primary icon={<Plus size={14} />}>Invite Member</Btn>
      </div>

      <div style={{ display:"grid", gap:16, gridTemplateColumns:"1.4fr 1fr" }}>
        <Card style={{ padding:0, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:`0.5px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:13, fontWeight:600 }}>Members Â· {members.length}</span>
          </div>
          {members.map((member) => (
            <div key={member.name} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 18px", borderBottom:`0.5px solid ${C.border}` }}>
              <div style={{ width:40, height:40, borderRadius:"50%", border:`0.5px solid ${roleColor[member.role]}44`, background:`${roleColor[member.role]}18`, color:roleColor[member.role], display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12 }}>
                {member.avatar}
              </div>
              <div style={{ minWidth:0, flex:1 }}>
                <div style={{ fontWeight:600, color:C.text }}>{member.name}</div>
                <div style={{ fontSize:12, color:C.text3, fontFamily:"'JetBrains Mono',monospace" }}>{member.email}</div>
              </div>
              <Badge color={roleColor[member.role]}>{member.role}</Badge>
              <span style={{ minWidth:52, textAlign:"right", fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:C.text3 }}>{member.last}</span>
            </div>
          ))}
        </Card>

        <Card style={{ padding:0, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:`0.5px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:13, fontWeight:600 }}>Role permissions</span>
          </div>
          <div style={{ padding:"10px 18px", borderBottom:`0.5px solid ${C.border}` }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr repeat(4,48px)", gap:8, alignItems:"center" }}>
              <span style={{ fontSize:10, letterSpacing:2, color:C.text3, textTransform:"uppercase" }}>Action</span>
              {["OWN", "ADM", "EDI", "VIE"].map((role) => (
                <span key={role} style={{ textAlign:"center", fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:2, color:C.text3 }}>{role}</span>
              ))}
            </div>
          </div>
          {perms.map((perm) => (
            <div key={perm.action} style={{ display:"grid", gridTemplateColumns:"1fr repeat(4,48px)", gap:8, alignItems:"center", padding:"12px 18px", borderBottom:`0.5px solid ${C.border}` }}>
              <span style={{ fontSize:13, color:C.text }}>{perm.action}</span>
              {[perm.Owner, perm.Admin, perm.Editor, perm.Viewer].map((value, index) => {
                const tones = [C.lime, C.pink, C.mint, C.blue];
                const tone = tones[index] ?? C.text3;

                return (
                  <div key={index} style={{ display:"flex", justifyContent:"center" }}>
                    <div style={{ width:18, height:18, borderRadius:5, border:`0.5px solid ${value ? `${tone}55` : C.border2}`, background: value ? `${tone}22` : C.muted2, color: value ? tone : C.text3, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9 }}>
                      {value ? "âœ“" : "â€”"}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export const Profile = () => {
  const details = [
    { label: "Display name", value: "Chaitanya Chute" },
    { label: "Email", value: "chaitanya@gmail.com" },
    { label: "Role", value: "Owner" },
    { label: "Workspace", value: "Zeno Flow" },
  ];

  const activity = [
    { title: "Created dashboard", meta: "2h ago" },
    { title: "Updated Gmail integration", meta: "Yesterday" },
    { title: "Invited teammate", meta: "3d ago" },
  ];

  return (
    <div style={{ padding:28, display:"flex", flexDirection:"column", gap:20 }}>
      <Card style={{ padding:20 }}>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ width:56, height:56, borderRadius:18, border:`0.5px solid ${C.lime}33`, background:`${C.lime}12`, color:C.lime, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <UserRound size={24} />
            </div>
            <div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:C.text3, letterSpacing:3, marginBottom:4 }}>ACCOUNT</div>
              <h1 style={{ fontWeight:700, fontSize:22, letterSpacing:-.3 }}>Profile</h1>
              <p style={{ marginTop:6, color:C.text2, fontSize:13 }}>Your account details and recent workspace activity.</p>
            </div>
          </div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            <Btn>Open settings</Btn>
            <Btn primary>Back to dashboard</Btn>
          </div>
        </div>
      </Card>

      <div style={{ display:"grid", gap:16, gridTemplateColumns:"1.2fr 0.8fr" }}>
        <Card>
          <div style={{ display:"flex", alignItems:"center", gap:10, paddingBottom:16, borderBottom:`0.5px solid ${C.border}` }}>
            <div style={{ width:36, height:36, borderRadius:12, border:`0.5px solid ${C.border}`, background:C.surface, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Mail size={14} color={C.text} />
            </div>
            <div>
              <div style={{ fontSize:10, letterSpacing:2, color:C.text3, textTransform:"uppercase" }}>Details</div>
              <div style={{ fontSize:13, color:C.text2 }}>Editable account fields</div>
            </div>
          </div>
          <div style={{ marginTop:16, display:"grid", gap:12, gridTemplateColumns:"repeat(2, minmax(0, 1fr))" }}>
            {details.map((item) => (
              <label key={item.label} style={{ display:"grid", gap:6 }}>
                <span style={{ fontSize:12, color:C.text2 }}>{item.label}</span>
                <input defaultValue={item.value} style={{ width:"100%", borderRadius:12, border:`0.5px solid ${C.border}`, background:"#050505", color:C.text, padding:"10px 12px", outline:"none" }} />
              </label>
            ))}
          </div>
          <div style={{ marginTop:16, display:"flex", flexWrap:"wrap", gap:8 }}>
            <Btn primary>Save profile</Btn>
            <Btn>Change avatar</Btn>
          </div>
        </Card>

        <div style={{ display:"grid", gap:16 }}>
          <Card>
            <div style={{ display:"flex", alignItems:"center", gap:10, paddingBottom:16, borderBottom:`0.5px solid ${C.border}` }}>
              <div style={{ width:36, height:36, borderRadius:12, border:`0.5px solid ${C.lime}33`, background:`${C.lime}12`, color:C.lime, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <ShieldCheck size={14} />
              </div>
              <div>
                <div style={{ fontSize:10, letterSpacing:2, color:C.text3, textTransform:"uppercase" }}>Security</div>
                <div style={{ fontSize:13, color:C.text2 }}>Account protection status</div>
              </div>
            </div>
            <div style={{ marginTop:16, display:"grid", gap:10, fontSize:13 }}>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 12px", borderRadius:12, border:`0.5px solid ${C.border}`, background:C.surface }}>
                <span style={{ color:C.text }}>Two-factor authentication</span>
                <span style={{ color:C.lime }}>Enabled</span>
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 12px", borderRadius:12, border:`0.5px solid ${C.border}`, background:C.surface }}>
                <span style={{ color:C.text }}>Last sign in</span>
                <span style={{ color:C.text3 }}>Today, 09:42</span>
              </div>
            </div>
          </Card>

          <Card>
            <div style={{ display:"flex", alignItems:"center", gap:10, paddingBottom:16, borderBottom:`0.5px solid ${C.border}` }}>
              <div style={{ width:36, height:36, borderRadius:12, border:`0.5px solid ${C.border}`, background:C.surface, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Workflow size={14} color={C.text} />
              </div>
              <div>
                <div style={{ fontSize:10, letterSpacing:2, color:C.text3, textTransform:"uppercase" }}>Recent activity</div>
                <div style={{ fontSize:13, color:C.text2 }}>Latest account actions</div>
              </div>
            </div>
            <div style={{ marginTop:16, display:"grid", gap:10 }}>
              {activity.map((item) => (
                <div key={item.title} style={{ display:"flex", justifyContent:"space-between", gap:12, padding:"10px 12px", borderRadius:12, border:`0.5px solid ${C.border}`, background:C.surface }}>
                  <span style={{ color:C.text }}>{item.title}</span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:C.text3 }}>{item.meta}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { Tag, Badge, Btn, Card, Pill, Sidebar };


