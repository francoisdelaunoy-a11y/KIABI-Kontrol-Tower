import React, { useState, useMemo } from "react";
import { Layers, Target, Leaf, Check, Wallet, TrendingUp, Tag, Boxes, GitBranch, Globe2, Factory, ClipboardList, Sparkles, ShoppingBag, Truck, Send, RotateCcw, X, Heart, Star, ArrowRight, Baby, FileText, Box, BadgeCheck, MessageCircle, Wrench, Scale, Users, Palette, SpellCheck, Network, UserCog, Crown, Mic, Play, Database, Building2, Handshake, Award, ShieldCheck, TrendingDown, LayoutGrid, Triangle } from "lucide-react";

/* ============================================================
   Theme (white background · Kiabi blues)
   ============================================================ */
const T = {
  bg: "#ffffff", panel: "#ffffff", panel2: "#f4f8fc",
  ink: "#0053A0", sub: "#33689f", faint: "#7fa3c4",
  line: "#d7e4f0", lineSoft: "#e4edf5",
  accent: "#0053A0", human: "#4B90CD", blue: "#4B90CD", silver: "#7fa3c4",
  ok: "#3fb27f", warn: "#dfa93f", bad: "#e05a5a",
};
const MONO = "'JetBrains Mono','SF Mono',Consolas,monospace";
const SANS = "'Inter',system-ui,sans-serif";
const eur = (n) => Number(n).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
const u = (n) => Number(n).toLocaleString("fr-FR");

const KIABI_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='150' height='40' viewBox='0 0 150 40'><text x='4' y='30' font-family='Arial Rounded MT Bold,Arial,Helvetica,sans-serif' font-size='27' font-weight='900' letter-spacing='1' fill='#0053A0'>KIABI</text><circle cx='142' cy='12' r='5' fill='#4B90CD'/></svg>`;
const KIABI_LOGO = "data:image/svg+xml;utf8," + encodeURIComponent(KIABI_SVG);
const CENTRIC_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='210' height='40' viewBox='0 0 210 40'><circle cx='20' cy='20' r='15' fill='none' stroke='#005386' stroke-width='5'/><path d='M27 12 A15 15 0 1 0 27 28' fill='none' stroke='#00a3c4' stroke-width='5' stroke-linecap='round'/><text x='44' y='18' font-family='Arial,Helvetica,sans-serif' font-size='15' font-weight='800' letter-spacing='1' fill='#1a2b4a'>DASSAULT</text><text x='44' y='33' font-family='Arial,Helvetica,sans-serif' font-size='15' font-weight='800' letter-spacing='3' fill='#005386'>CENTRIC</text></svg>`;
const CENTRIC_LOGO = "data:image/svg+xml;utf8," + encodeURIComponent(CENTRIC_SVG);

/* ============================================================
   SINGLE SOURCE: the 12 products of the Baby collection (PDF)
   ============================================================ */
const mkScen = (rv) => ([
  { id: "gi", name: "Far-East import", mix: "100% Far-East import", cost: +(rv * 0.92).toFixed(2), lead: 75, rupture: 6, splitProche: 10, usine: "Shenzhen Garments · China", maitrise: "cost", note: "Lowest cost, but long lead time and high transport footprint." },
  { id: "mx", name: "Balanced mix", mix: "60% import · 40% nearshore", cost: +rv.toFixed(2), lead: 45, rupture: 4, splitProche: 40, usine: "Colombo Apparel · Sri Lanka", maitrise: "balance", note: "Recommended cost / reactivity trade-off under standard conditions.", reco: true },
  { id: "px", name: "Euromed nearshore", mix: "85% nearshore sourcing", cost: +(rv * 1.12).toFixed(2), lead: 21, rupture: 2, splitProche: 85, usine: "Anatolia Textiles · Turkey", maitrise: "reactivity & CO₂", note: "Short lead time, managed replenishment, minimal transport footprint." },
]);
const P = (id, name, img, color, segment, pieces, prix, compo, volume, implantation, statut, co2, coloris, persona) => ({
  id, name, img, color, segment, pieces, prix, compo, volume, implantation, statut, co2, persona,
  revient: +(prix * 0.42).toFixed(2), scenarios: mkScen(prix * 0.42), coloris,
});
const PRODUITS_BASE = [
  P("p1", "Pack of 2 sleepsuits in thick pointelle knit", "🌙", "#c98a5b", "Nightwear", 2, 15, "100% cotton", 320000, "13-06-2026", "Validated", 1.6, [["Camel dots", "#c98a5b"], ["Ecru", "#efe9dc"]], "Current customer"),
  P("p2", "Velour pyjamas with feet and front motif", "🧸", "#7fae9e", "Nightwear", 1, 4, "77% cotton · 23% polyester", 410000, "07-06-2026", "In progress", 2.1, [["Sage green", "#7fae9e"], ["Pine green", "#2e6b4f"], ["Pink", "#e8a7b7"]], "Current customer"),
  P("p3", "'Fox' sleepsuit with snap opening at the back", "🦊", "#e8e2d2", "Nightwear", 1, 9, "100% cotton", 385000, "07-06-2026", "Validated", 1.4, [["Printed beige", "#e8e2d2"], ["Blue", "#3a5fd8"], ["Burgundy", "#8d2f42"]], "Current customer"),
  P("p4", "Lightweight zip-up short-sleeved sleepsuit pyjamas", "🚀", "#3a6fd8", "Nightwear", 1, 9, "100% cotton", 295000, "30-05-2026", "In progress", 1.3, [["Rocket blue", "#3a6fd8"], ["Pink", "#e8a7b7"], ["Yellow", "#e8d24a"]], "Trendy customer"),
  P("p5", "2-piece pyjama set with feet", "🌸", "#f4c9c4", "Nightwear", 2, 13, "64% polyester · 33% cotton · 3% elastane", 265000, "12-06-2026", "In progress", 2.4, [["Powder pink", "#f4c9c4"], ["Floral ecru", "#f3ede0"]], "Current customer"),
  P("p6", "Pack of 3 long-sleeved bodysuits with snap opening", "🩱", "#d98a9c", "Underwear", 3, 10, "100% cotton", 520000, "06-06-2026", "Validated", 1.2, [["Dusty pink", "#d98a9c"], ["Striped", "#d9c1c8"], ["Floral ecru", "#f3ede0"]], "Rational customer"),
  P("p7", "Pack of 3 sleeveless bodysuits", "🤍", "#e8ddc8", "Underwear", 3, 9, "100% cotton", 480000, "09-06-2026", "Validated", 1.0, [["Terracotta", "#c47a55"], ["Mint stripe", "#cfe4da"], ["Check", "#e8ddc8"]], "Rational customer"),
  P("p8", "Grow-with-me bodysuits in plain knit - Pack of 3", "🌱", "#b0527a", "Underwear", 3, 9, "100% cotton", 445000, "04-06-2026", "To develop", 1.1, [["Fuchsia", "#b0527a"], ["Aqua green", "#a8c8bb"], ["Ecru", "#efe9dc"]], "Rational customer"),
  P("p9", "Bodysuit with lace collar", "🪞", "#e9c9a8", "Underwear", 1, 6, "100% cotton", 190000, "07-06-2026", "In progress", 0.9, [["Nude", "#e9c9a8"], ["Ecru", "#efe9dc"]], "Trendy customer"),
  P("p10", "Pack of 2 'Minnie' bodysuits", "🎀", "#9fc4ae", "Licences", 2, 12, "100% cotton", 210000, "08-06-2026", "In progress", 1.2, [["Almond green", "#9fc4ae"], ["Printed ecru", "#f3ede0"]], "Trendy customer"),
  P("p11", "Sleeveless 'Marvel' print romper", "🕷️", "#8fb6dd", "Licences", 1, 9, "100% cotton", 150000, "10-06-2026", "To develop", 1.1, [["Sky blue", "#8fb6dd"]], "Trendy customer"),
  P("p12", "Bodysuit + hat set 'Bambi' 'Disney' - 2 pieces", "🦌", "#f0e6da", "Licences", 2, 13, "100% cotton", 175000, "10-06-2026", "Validated", 1.5, [["Lilac", "#d9cce8"], ["Ecru", "#f0e6da"]], "Current customer"),
];

/* Balance axes: [product-type focus, pyramid tier] */
const AXES = {
  p1: ["Essentials", "Basics"],
  p2: ["Impulse picks", "Seasonal"],
  p3: ["Essentials", "Permanent"],
  p4: ["Signature pieces", "Seasonal"],
  p5: ["Essentials", "Basics"],
  p6: ["Best seller", "Permanent"],
  p7: ["Essentials", "Permanent"],
  p8: ["Best seller", "Permanent"],
  p9: ["Signature pieces", "Top"],
  p10: ["Collab", "Top"],
  p11: ["Collab", "Seasonal"],
  p12: ["Collab", "Top"],
};
const PRODUITS = PRODUITS_BASE.map((p) => ({ ...p, focus: AXES[p.id][0], pyramide: AXES[p.id][1] }));

const FOCUS_DEF = [
  { n: "Essentials", c: "#0053A0", target: "30 – 40 %", min: 30, max: 40, role: "core of the offer, permanently available" },
  { n: "Best seller", c: "#4B90CD", target: "22 – 30 %", min: 22, max: 30, role: "volume and traffic drivers" },
  { n: "Impulse picks", c: "#7fae9e", target: "15 – 22 %", min: 15, max: 22, role: "impulse buys, department animation" },
  { n: "Signature pieces", c: "#c98a5b", target: "8 – 14 %", min: 8, max: 14, role: "differentiating pieces, brand signature" },
  { n: "Collab", c: "#b0527a", target: "10 – 16 %", min: 10, max: 16, role: "licences and partnerships" },
];
const PYRAMIDE_DEF = [
  { n: "Permanent", c: "#0053A0", target: "40 – 50 %", min: 40, max: 50, role: "base of the pyramid, never out of stock" },
  { n: "Basics", c: "#4B90CD", target: "15 – 22 %", min: 15, max: 22, role: "carried over from one season to the next" },
  { n: "Seasonal", c: "#7fa3c4", target: "18 – 28 %", min: 18, max: 28, role: "season rhythm, dated releases" },
  { n: "Top", c: "#d98a9c", target: "≤ 12 %", min: 0, max: 12, role: "top of the range, strong image, shallow depth" },
];
const buildDistrib = (key, defs) => {
  const tot = PRODUITS.reduce((s, p) => s + p.volume, 0);
  return defs.map((d) => {
    const items = PRODUITS.filter((p) => p[key] === d.n);
    const qty = items.reduce((s, p) => s + p.volume, 0);
    const refs = items.reduce((s, p) => s + p.coloris.length, 0);
    const pct = +((qty / tot) * 100).toFixed(1);
    return { ...d, structures: items.length, qty, refs, pct, okv: pct >= d.min && pct <= d.max };
  });
};

const AGENTS = [
  { id: "petitprix", name: "Low-price offer", icon: Tag, color: "#0053A0", desc: "Maximum accessibility: floor PVI and smart packs for every family." },
  { id: "essentiel", name: "Everyday essentials", icon: Layers, color: "#4B90CD", desc: "Must-have layette basics: bodysuits, sleepsuits, permanent availability." },
  { id: "confort", name: "Comfort & softness", icon: Heart, color: "#0053A0", desc: "Certified soft materials, flat seams, baby's well-being first." },
  { id: "licences", name: "Licences & characters", icon: Star, color: "#4B90CD", desc: "Disney, Marvel and favourite heroes: differentiation and impulse buying." },
  { id: "specialiste", name: "Specialist offer", icon: Target, color: "#7fa3c4", desc: "Childcare expertise: grow-with-me fits, easy openings, dedicated know-how." },
  { id: "bascarbone", name: "Low carbon", icon: Leaf, color: "#3fb27f", desc: "Minimised footprint: recycled materials, nearshore sourcing and lean processes." },
];
const AMELIO = [
  { id: "prix", name: "Cost price agent", icon: Wallet, color: "#0053A0", levers: [
    { id: "neg", t: "Cotton material renegotiation", effect: "−0,18 € /pc", d: { rev: -0.18 } },
    { id: "lot", t: "Purchase lot optimisation", effect: "−0,09 € /pc", d: { rev: -0.09 } },
  ]},
  { id: "co2", name: "CO₂ agent", icon: Leaf, color: "#3fb27f", levers: [
    { id: "rec", t: "30 % recycled cotton", effect: "−0,3 kg /pc", d: { co2: -0.3 } },
    { id: "mer", t: "Slow sea freight", effect: "−0,2 kg /pc", d: { co2: -0.2 } },
  ]},
  { id: "appro", name: "Supply agent", icon: Truck, color: "#4B90CD", levers: [
    { id: "pha", t: "Early material phasing", effect: "−6 d lead time", d: { lead: -6 } },
    { id: "dbl", t: "Dual sourcing", effect: "−1,5 pt stock-out", d: { rup: -1.5 } },
  ]},
];
const ZONES = ["North zone", "South zone", "Maghreb zone", "Middle East zone", "Tropical zones"];
const SEGMENTS = ["All collection structures", "Nightwear", "Underwear", "Licences"];
const EXPERTS = {
  design: { role: "Business decision-maker", txt: "The product manager secures the key balances of the commercial structure of their offer." },
  assistante: { role: "Business decision-maker", txt: "The assistant product manager ensures the correct listing of the products created by the product manager, through to full entry in the PLM." },
  directrice: { role: "Business decision-maker", txt: "The market manager guarantees the overall balance of the collection built by the product managers." },
  supply: { role: "Business decision-maker", txt: "The Go to Market lead validates the sourcing scenarios taking the full cost into account." },
};

/* ---- Collection data (director scope) ---- */
const CDP_CONTRIB = [
  { name: "Baby PM (this cockpit)", ca: 43.8, budget: 60, color: "#0053A0" },
  { name: "Girls 2-14 PM", ca: 48.1, budget: 65, color: "#4B90CD" },
  { name: "Boys 2-14 PM", ca: 39.5, budget: 55, color: "#7fa3c4" },
];
const COLOR_MIX = [
  { n: "Ecru / beige", pct: 30, c: "#efe9dc" }, { n: "Pink", pct: 17, c: "#e8a7b7" },
  { n: "Blue", pct: 15, c: "#4B90CD" }, { n: "Sage green", pct: 13, c: "#7fae9e" },
  { n: "Camel", pct: 10, c: "#c98a5b" }, { n: "Multicolour", pct: 9, c: "#d9cce8" },
  { n: "Black", pct: 6, c: "#2a2f36" },
];
const TEXTES = [
  { txt: "my baby's cosy snack", prod: "Velour pyjamas", ok: true },
  { txt: "petit ♥ d'amour", prod: "Pack of 2 Valentine's bodysuits", ok: true },
  { txt: "MORE HUGS", prod: "Velour pyjamas with feet", ok: true },
  { txt: "Sweet dreams my litle", prod: "Long-sleeved sleepsuit pyjamas", ok: false, fix: "“little” — spelling error detected, correction to be requested from the supplier" },
  { txt: "POWH !", prod: "'Winnie' wrap-over sleepsuit", ok: false, fix: "artwork not compliant with the licence style guide — check with Disney" },
];
const CANAUX = [
  { n: "Omnichannel", pct: 62, target: "≥ 60 %", okv: true },
  { n: "Store only", pct: 28, target: "≤ 30 %", okv: true },
  { n: "Web-exclusive", pct: 10, target: "≤ 12 %", okv: true },
  { n: "France", pct: 70, target: "—", okv: true },
  { n: "International", pct: 30, target: "≥ 35 %", okv: false },
];

/* ---- Budget & Arbitration — Kiabi annual budget ritual ---- */
const BUDGET_GLOBAL = { budget: 2100, demarque: 28, pvm: 12.9, tme: 58, tmv: 51 };
const BUDGET_DEPTS = [
  { n: "Offers & Collections", resp: "Offer Director", budget: 1050, demarque: 27, pvm: 12.9, tme: 58, tmv: 51.5 },
  { n: "Operations", resp: "Operations Director", budget: 420, demarque: 29, pvm: 12.5, tme: 57, tmv: 49.8 },
  { n: "KFI - Kiabi Fashion Industry", resp: "KFI Director", budget: 210, demarque: 26, pvm: 13.4, tme: 59, tmv: 52.8 },
  { n: "Retail", resp: "Retail Director", budget: 420, demarque: 30, pvm: 12.7, tme: 58, tmv: 50.6 },
];
/* Submissions received (bottom-up): 2 consistent, Operations with a budget gap (+15 %, total +3 %), Retail with a margin-chain inconsistency */
const BUDGET_COPIES = [
  { n: "Offers & Collections", budget: 1050, demarque: 27, pvm: 12.9, tme: 58, tmv: 51.5 },
  { n: "Operations", budget: 483, demarque: 29, pvm: 12.5, tme: 57, tmv: 49.8 },
  { n: "KFI - Kiabi Fashion Industry", budget: 210, demarque: 26, pvm: 13.4, tme: 59, tmv: 52.8 },
  { n: "Retail", budget: 420, demarque: 30, pvm: 12.7, tme: 58, tmv: 55 },
];
const MOIS = ["Sept.", "Oct.", "Nov.", "Dec.", "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug."];
const MOIS_LONG = ["September", "October", "November", "December", "January", "February", "March", "April", "May", "June", "July", "August"];
const PHASAGE_CA = [9, 8, 9, 14, 8, 6, 7, 8, 8, 8, 9, 6];          /* % of annual budget — peaks at Christmas, back-to-school, sales */
const PHASAGE_DEM = [1, -2, -3, -4, 4, 1, -2, -1, 0, 0, 5, 2];     /* seasonal markdown adjustment (points) */
const REEL_DEM_ECART = { "Offers & Collections": () => 0.4, "Operations": () => 1.2, "KFI - Kiabi Fashion Industry": () => -0.5, "Retail": (m) => (m >= 4 ? 4 : 0.5) };
const REEL_CA_FACTEUR = { "Offers & Collections": () => 1.015, "Operations": () => 0.985, "KFI - Kiabi Fashion Industry": () => 1.01, "Retail": (m) => (m < 4 ? 0.99 : +(0.99 - 0.01 * (m - 3)).toFixed(3)) };
/* Kiabi margin-chain model (simplified): markdown is a share of discounted revenue, average discount 50 %
   net price = PVM × (1 − markdown/2) · cost = PVM × (1 − TME) · TMV = 1 − cost / net price */
const tmvModel = (tme, dem) => +((1 - (1 - tme / 100) / (1 - dem / 200)) * 100).toFixed(1);
const tmeModel = (tmv, dem) => +((1 - (1 - tmv / 100) * (1 - dem / 200)) * 100).toFixed(1);
const fr1 = (n) => Number(n).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
const fr2 = (n) => Number(n).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---- Budget & CO₂ Arbitration — same ritual applied to carbon ----
   Orders of magnitude consistent with the artefact: ≈ 1,4 kg CO₂e / piece (Baby collection 5 376 t for 3,85 M pieces).
   Budget (t) = volume (M pieces) × intensity (kg/piece) × 1000. */
const CO2_GLOBAL = { budget: 224000, intensite: 1.4, volume: 160 };
const CO2_DEPTS = [
  { n: "Offers & Collections", resp: "Offer Director", budget: 112000, intensite: 1.4, volume: 80, mixInt: 1.4 },
  { n: "Operations", resp: "Operations Director", budget: 46400, intensite: 1.45, volume: 32, mixInt: 1.45 },
  { n: "KFI - Kiabi Fashion Industry", resp: "KFI Director", budget: 20000, intensite: 1.25, volume: 16, mixInt: 1.25 },
  { n: "Retail", resp: "Retail Director", budget: 45600, intensite: 1.425, volume: 32, mixInt: 1.425 },
];
/* Submissions received: 2 consistent, Operations with a simple gap (over-planned volumes → total +4 %), Retail with an inconsistency (intensity too low vs product mix → budget under-estimated) */
const CO2_COPIES = [
  { n: "Offers & Collections", budget: 112000, intensite: 1.4, volume: 80 },
  { n: "Operations", budget: 61480, intensite: 1.45, volume: 42.4 },
  { n: "KFI - Kiabi Fashion Industry", budget: 20000, intensite: 1.25, volume: 16 },
  { n: "Retail", budget: 40000, intensite: 1.25, volume: 32 },
];
const PHASAGE_CO2 = [9, 11, 12, 6, 6, 7, 9, 8, 10, 10, 6, 6];  /* % of annual emissions — production peaks before Christmas and before the sales */
const REEL_CO2_FACTEUR = { "Offers & Collections": () => 0.99, "Operations": (m) => (m >= 6 ? 1.1 : 1.01), "KFI - Kiabi Fashion Industry": () => 0.98, "Retail": (m) => (m >= 9 ? 1.03 : 1.005) };
const CO2_CAUSES = { "Offers & Collections": "recycled material share on target", "Operations": "air freight on the rise", "KFI - Kiabi Fashion Industry": "optimised industrial process", "Retail": "store energy consumption on the rise" };
const CO2_LEVIERS = [
  { n: "Material", desc: "+10 pts of recycled cotton on bodysuits", pct: 6, c: "#3fb27f" },
  { n: "Transport", desc: "switch from air → sea on 3 flows", pct: 3, c: "#4B90CD" },
  { n: "Energy", desc: "renewable contract for 40 stores", pct: 2, c: "#0053A0" },
];

/* ============================================================
   Small components
   ============================================================ */
const Chip = ({ color, children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", fontSize: 10.5, fontWeight: 700, fontFamily: MONO, color, background: `${color}1c`, border: `1px solid ${color}55`, padding: "2px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>{children}</span>
);
const StatutChip = ({ s }) => {
  const c = s === "Validated" ? T.ok : s === "In progress" ? T.blue : T.warn;
  return <Chip color={c}>{s}</Chip>;
};
const VerdictChip = ({ v }) => {
  const c = v === "Compliant" ? T.ok : v === "Alert" ? T.warn : T.bad;
  return <Chip color={c}>{v}</Chip>;
};
const microLbl = { display: "block", fontSize: 10, color: T.faint, fontFamily: MONO, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 8 };
const WhiteBadge = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", background: "#ffffff", border: `1px solid ${T.line}`, borderRadius: 9, padding: "5px 10px" }}>{children}</span>
);

function PMGauge({ icon: Icon, label, used, total, unit, fmt, color, rule }) {
  const pct = Math.min(100, (used / total) * 100);
  const f = fmt || ((n) => u(n));
  return (
    <div style={{ flex: "1 1 190px", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, color: T.sub, fontSize: 11.5, fontWeight: 600 }}><Icon size={14} color={color} />{label}</div>
      <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 600, color: T.ink, marginTop: 7 }}>{f(used)} <span style={{ fontSize: 11.5, color: T.faint }}>/ {f(total)} {unit}</span></div>
      <div style={{ height: 6, background: T.line, borderRadius: 99, marginTop: 9, overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 99 }} /></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 10, fontFamily: MONO, color: T.faint }}>
        <span>committed {Math.round(pct)}%</span><span>remaining {f(+(total - used).toFixed(2))} {unit}</span>
      </div>
      {rule && <div style={{ marginTop: 8 }}>{rule}</div>}
    </div>
  );
}

/* ============================================================
   Group-rule compliance next to each KPI — st.breaches is the single
   source of truth (reactive to perfRules); no standalone banner
   ============================================================ */
const RULE_LEVEL_C = { Compliant: "#3fb27f", Watch: "#dfa93f", Breach: "#e05a5a" };
function ruleStatus(breaches, { area, kpi, productId } = {}) {
  const areas = area ? (Array.isArray(area) ? area : [area]) : null;
  const list = (breaches || []).filter((b) => (!areas || areas.includes(b.area)) && (!kpi || (b.kpis || []).includes(kpi)) && (!productId || !b.productId || b.productId === productId));
  const level = list.some((b) => b.level !== "watch") ? "Breach" : list.length ? "Watch" : "Compliant";
  return { level, c: RULE_LEVEL_C[level], list };
}
function RuleStatus({ st, area, kpi, productId, label, action = true }) {
  const r = ruleStatus(st.breaches, { area, kpi, productId });
  const first = r.list[0];
  return (
    <span title={first ? `${first.label} — arbitration: ${first.action}` : `${label || "Group rule"}: consistent with the Group rules`} style={{ display: "inline-flex", alignItems: "center", gap: 6, flexWrap: "wrap", maxWidth: "100%" }}>
      <Chip color={r.c}>{label ? `${label} · ` : ""}{r.level}</Chip>
      {action && first && <span style={{ fontSize: 10.5, color: r.c, lineHeight: 1.35 }}>{first.action}</span>}
    </span>
  );
}

function PageHeader({ title, desc, expert }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontSize: 19, fontWeight: 800, color: T.ink }}>{title}</h2>
      <p style={{ margin: "4px 0 10px", fontSize: 12.5, color: T.sub }}>{desc}</p>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "10px 13px" }}>
        <Sparkles size={15} color={T.human} style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontSize: 12, color: T.ink, lineHeight: 1.5 }}><strong>{expert.role} —</strong> {expert.txt}</span>
      </div>
    </div>
  );
}

function LowCarbonBanner({ st, context, prod }) {
  if (!st.lowCarbon) return null;
  const lc = prod.scenarios.find((s) => s.id === "px");
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 11, background: `${T.ok}14`, border: `1px solid ${T.ok}66`, borderRadius: 12, padding: "12px 15px", marginBottom: 16 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, background: `${T.ok}1c`, border: `1px solid ${T.ok}55`, display: "grid", placeItems: "center" }}><Leaf size={16} color={T.ok} /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>“Low carbon” strategy active on the Baby offer</span>
          <Chip color={T.ok}>Low carbon offer agent</Chip>
        </div>
        <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.5, marginTop: 3 }}>
          {context === "gtm"
            ? <>The arbitration favours the most local sourcing: scenario “{lc.name}” ({lc.mix}) prioritised · footprint brought down to <span style={{ fontFamily: MONO }}>{st.co2Of(prod)} kg/pc</span>.</>
            : <>The supply recommendation is biased towards the most local scenario “{lc.name}” · landed cost <span style={{ fontFamily: MONO }}>{eur(lc.cost)}/pc</span> · priority {lc.maitrise}.</>}
        </div>
      </div>
    </div>
  );
}

function Bar({ pct, color, max = 35 }) {
  return (
    <div style={{ flex: 1, height: 8, background: T.line, borderRadius: 99, overflow: "hidden" }}>
      <div style={{ width: Math.min(100, (pct / max) * 100) + "%", height: "100%", background: color, borderRadius: 99 }} />
    </div>
  );
}

/* ============================================================
   Product Manager tab (existing page)
   ============================================================ */
const SORT_FIELDS = [
  { k: "name", label: "Collection structure" }, { k: "segment", label: "Segment" },
  { k: "pieces", label: "Pieces" }, { k: "prix", label: "PVI" }, { k: "volume", label: "Volume" },
  { k: "implantation", label: "Store launch" }, { k: "statut", label: "Status" },
];
const dateKey = (d) => d.split("-").reverse().join("");

function ChefPage({ st }) {
  const [sortK, setSortK] = useState("implantation");
  const [target, setTarget] = useState(SEGMENTS[0]);
  const sorted = useMemo(() => {
    const arr = [...PRODUITS];
    arr.sort((a, b) => {
      if (sortK === "implantation") return dateKey(b.implantation).localeCompare(dateKey(a.implantation));
      if (typeof a[sortK] === "number") return b[sortK] - a[sortK];
      if (sortK === "statut") return st.statutOf(a).localeCompare(st.statutOf(b));
      return String(a[sortK]).localeCompare(String(b[sortK]), "fr");
    });
    return arr;
  }, [sortK, st]);
  const sel = st.sel;
  const agent = AGENTS.find((a) => a.id === st.agentId);
  const agentApplies = agent && (target === SEGMENTS[0] || target === sel.segment);
  const reco = st.recoFor(sel);
  const marge = Math.round(((st.pvcOf(sel) - st.revOf(sel)) / st.pvcOf(sel)) * 100);
  /* Approved offers are frozen: every displayed choice comes from the approval snapshot and controls are disabled */
  const locked = st.isLocked(sel.id);
  const snap = locked ? st.snapshotOf(sel.id) : null;
  const vAgent = locked ? snap.agentId : st.agentId;
  const vTerr = locked ? snap.territoire : st.territoire;
  const vZone = locked ? snap.zone : st.zone;
  const vCol = locked ? snap.colIdx : st.colIdx;
  const vLevers = locked ? new Set(snap.levers) : st.levers;
  const shownAgent = locked ? AGENTS.find((a) => a.id === snap.agentId) || null : agentApplies ? agent : null;
  const lockStyle = locked ? { opacity: 0.55, cursor: "not-allowed" } : {};

  return (
    <div>
      {/* ---- Product manager cockpit ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Baby size={16} color={T.accent} /><span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Product manager cockpit — Baby Offer</span>
        </div>
        <span style={microLbl}>Budget status</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <PMGauge icon={Wallet} label="Revenue budget" used={43.8} total={st.perfRules.caEnvelope} unit="M€" fmt={(n) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} color={T.accent} rule={<RuleStatus st={st} area="Offer & Collection" kpi="revenue" label="Group rule" action={false} />} />
          <PMGauge icon={Leaf} label="CO₂ budget" used={st.collectionCO2} total={st.perfRules.carbonEnvelope} unit="t CO₂e" fmt={(n) => u(Math.round(n))} color={st.collectionCO2 > st.perfRules.carbonEnvelope ? T.bad : T.ok} rule={<RuleStatus st={st} area="Go to Market" kpi="carbon" label="Group rule" action={false} />} />
        </div>
        <span style={microLbl}>Current offer</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <PMGauge icon={TrendingUp} label="TME — entry margin rate" used={55} total={60} unit="%" fmt={(n) => n.toLocaleString("fr-FR")} color={T.human} rule={<RuleStatus st={st} area="Supply" kpi="margin" label="Group rule" action={false} />} />
          <PMGauge icon={Tag} label="PVI — initial selling price" used={7} total={8.5} unit="€" fmt={(n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} color={T.accent} rule={<RuleStatus st={st} area="Supply" kpi="price" label="Group rule" action={false} />} />
          <PMGauge icon={Boxes} label="Quantities" used={8.5} total={10} unit="M" fmt={(n) => n.toLocaleString("fr-FR")} color={T.blue} rule={<RuleStatus st={st} area="Go to Market" kpi="volume" label="Group rule" action={false} />} />
          <PMGauge icon={Layers} label="Number of colourway references" used={500} total={600} unit="colourway refs" fmt={(n) => u(n)} color={T.human} />
          <PMGauge icon={GitBranch} label="Quantities per colourway reference" used={20000} total={24000} unit="p" fmt={(n) => u(n)} color={T.silver} />
        </div>
      </div>

      {/* ---- Approved offer: frozen summary (read only) ---- */}
      {locked && (
        <div style={{ background: T.panel, border: `1px solid ${T.ok}66`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <BadgeCheck size={16} color={T.ok} /><span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>{snap.name}</span>
            <Chip color={T.ok}>Approved - read only</Chip>
            <span style={{ fontSize: 10.5, fontFamily: MONO, color: T.faint }}>approved on {snap.at.toLocaleDateString("fr-FR")} at {snap.at.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
            <button onClick={() => st.reopen(sel.id)} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 800, fontFamily: SANS }}><Wrench size={13} /> Edit offer again</button>
          </div>
          <div style={{ fontSize: 11.5, color: T.sub, marginBottom: 10, lineHeight: 1.5 }}>All choices are frozen as they were at approval. Selecting the offer does not unlock it: only “Edit offer again” reopens editing and restores these choices.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 8 }}>
            {[["Collection structure", snap.name], ["Segment", snap.segment], ["PVI", eur(snap.pvi)], ["Volume", `${u(snap.volume)} units`], ["Territory / zone", snap.territoire === "Specific" ? `Specific · ${snap.zone || "no zone"}` : "Core"], ["Offer agent", snap.agentName || "none"], ["Sourcing scenario", snap.scenName], ["Colourway", snap.coloris || "—"], ["Improvement levers", snap.leverNames.length ? snap.leverNames.join(" · ") : "none"], ["Product sheet", snap.sheet ? `${snap.sheet.filled} / ${snap.sheet.total} fields${snap.sheet.codif ? ` · ${snap.sheet.codif}` : ""}${snap.sheet.written ? " · written to PLM" : ""}` : "not generated"]].map(([l, v]) => (
              <div key={l} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "8px 11px" }}>
                <div style={{ fontSize: 10, color: T.faint, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginTop: 3, lineHeight: 1.4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---- Offer structuring ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <ClipboardList size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Offer structuring — Offer status</span>
          <span style={{ fontSize: 11, color: T.faint }}>click a collection structure to see the applied agent and break it down into products</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: T.faint, fontFamily: MONO }}>Sort by:
            <select value={sortK} onChange={(e) => setSortK(e.target.value)} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 7, padding: "4px 8px", color: T.ink, fontSize: 11, fontFamily: SANS, fontWeight: 700, cursor: "pointer", outline: "none" }}>
              {SORT_FIELDS.map((f) => <option key={f.k} value={f.k}>{f.label}</option>)}
            </select>
          </span>
        </div>
        <div style={{ maxHeight: 330, overflowY: "auto", overflowX: "auto", border: `1px solid ${T.lineSoft}`, borderRadius: 10 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr>
              {["Collection structure", "Segment", "Pieces", "Volume", "Store launch", "Status"].map((c, j) => (
                <th key={c} style={{ position: "sticky", top: 0, background: T.panel, zIndex: 1, textAlign: j === 0 ? "left" : "center", padding: "8px 10px", fontSize: 10, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>{c}</th>
              ))}
            </tr></thead>
            <tbody>
              {sorted.map((p) => {
                const on = p.id === st.selId;
                return (
                  <tr key={p.id} onClick={() => st.setSelId(p.id)} style={{ cursor: "pointer", background: on ? `${T.accent}10` : "transparent" }}>
                    <td style={{ padding: "9px 10px", borderBottom: `1px solid ${T.lineSoft}` }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
                        <span style={{ width: 30, height: 30, borderRadius: 8, flexShrink: 0, display: "grid", placeItems: "center", fontSize: 15, background: `${p.color}33`, border: `1px solid ${p.color}88` }}>{p.img}</span>
                        <span>
                          <span style={{ display: "block", fontWeight: 700, color: T.ink, maxWidth: 280 }}>{p.name}</span>
                          <span style={{ display: "block", fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{eur(p.prix)} · {p.compo}</span>
                        </span>
                      </span>
                    </td>
                    <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}><Chip color={p.segment === "Nightwear" ? T.accent : p.segment === "Licences" ? T.human : T.silver}>{p.segment}</Chip></td>
                    <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{p.pieces}</td>
                    <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{u(p.volume)}</td>
                    <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{p.implantation}</td>
                    <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}><StatutChip s={st.statutOf(p)} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: T.faint, fontFamily: MONO }}>{sorted.length} collection structures in the Baby collection · scroll to see all</div>

        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          <Sparkles size={15} color={T.human} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Offer agents — only one active at a time</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: T.faint, fontFamily: MONO }}>Apply to:
            <select value={target} disabled={locked} onChange={(e) => setTarget(e.target.value)} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 7, padding: "4px 8px", color: T.ink, fontSize: 11, fontFamily: SANS, fontWeight: 700, cursor: "pointer", outline: "none" }}>
              {SEGMENTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(215px,1fr))", gap: 10 }}>
          {AGENTS.map((a) => {
            const on = vAgent === a.id;
            return (
              <button key={a.id} disabled={locked} onClick={() => !locked && st.setAgentId(on ? null : a.id)} style={{ textAlign: "left", cursor: "pointer", background: on ? `${a.color}12` : T.panel2, border: `1px solid ${on ? a.color : T.line}`, borderRadius: 11, padding: "11px 12px", ...lockStyle }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 26, height: 26, borderRadius: 7, display: "grid", placeItems: "center", background: `${a.color}1c`, border: `1px solid ${a.color}55` }}><a.icon size={14} color={a.color} /></span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>{a.name}</span>
                  {on && <Check size={14} color={a.color} style={{ marginLeft: "auto" }} />}
                </div>
                <div style={{ fontSize: 10.5, color: T.faint, marginTop: 6, lineHeight: 1.45 }}>{a.desc}</div>
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 14, background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 11, padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <Globe2 size={15} color={T.human} /><span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>International Assortment</span>
            <span style={{ fontSize: 11, color: T.faint }}>offer roll-out across the store network</span>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Core", "Specific"].map((opt) => {
              const on = vTerr === opt;
              return (
                <button key={opt} disabled={locked} onClick={() => { if (locked) return; st.setTerritoire(opt); if (opt === "Core") st.setZone(null); }} style={{ ...lockStyle, flex: "1 1 220px", textAlign: "left", cursor: locked ? "not-allowed" : "pointer", display: "flex", alignItems: "flex-start", gap: 10, background: on ? `${T.human}12` : T.panel2, border: `1px solid ${on ? T.human : T.line}`, borderRadius: 10, padding: "11px 12px" }}>
                  <span style={{ width: 18, height: 18, borderRadius: 6, flexShrink: 0, marginTop: 1, display: "grid", placeItems: "center", background: on ? T.human : "transparent", border: `1.5px solid ${on ? T.human : T.faint}` }}>{on && <Check size={12} color="#ffffff" />}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{opt}</div>
                    <div style={{ fontSize: 10.5, color: T.faint, marginTop: 2, lineHeight: 1.4 }}>{opt === "Core" ? "Offer shared across the whole network, with no regional variation." : "Offer adapted for a specific geographical zone."}</div>
                  </div>
                </button>
              );
            })}
          </div>
          {vTerr === "Specific" && (
            <div style={{ marginTop: 12 }}>
              <span style={microLbl}>Target zone — only one at a time</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ZONES.map((z) => {
                  const on = vZone === z;
                  return (
                    <button key={z} disabled={locked} onClick={() => !locked && st.setZone(on ? null : z)} style={{ ...lockStyle, display: "inline-flex", alignItems: "center", gap: 8, cursor: locked ? "not-allowed" : "pointer", background: on ? `${T.human}12` : T.panel2, border: `1px solid ${on ? T.human : T.line}`, borderRadius: 999, padding: "7px 13px", fontSize: 12, fontWeight: 700, fontFamily: SANS, color: on ? T.ink : T.sub }}>
                      <span style={{ width: 15, height: 15, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: on ? T.human : "transparent", border: `1.5px solid ${on ? T.human : T.faint}` }}>{on && <Check size={10} color="#ffffff" />}</span>
                      {z}
                    </button>
                  );
                })}
              </div>
              {!vZone && !locked && <div style={{ fontSize: 11, color: T.faint, marginTop: 8 }}>Select a zone to adapt the offer.</div>}
            </div>
          )}
        </div>

        <div style={{ marginTop: 12, padding: "11px 13px", background: T.panel, border: `1px solid ${T.accent}55`, borderRadius: 10, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: T.ink }}>Agent applied to <strong>“{sel.name}”</strong>:</span>
          {shownAgent ? <Chip color={shownAgent.color}>{shownAgent.name}</Chip> : <span style={{ fontSize: 11.5, color: T.faint }}>no active agent on this segment</span>}
          {locked && <Chip color={T.ok}>Approved - read only</Chip>}
          <span style={{ marginLeft: "auto", fontSize: 11, color: T.faint, fontFamily: MONO }}>→ broken down into {sel.coloris.length} colourway refs in “Work in progress”</span>
        </div>
      </div>

      {/* ---- Work in progress ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Layers size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Work in progress</span>
          <span style={{ fontSize: 11.5, color: T.faint }}>colourway breakdown of the selected collection structure</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center", fontSize: 20, background: `${sel.color}33`, border: `1px solid ${sel.color}88` }}>{sel.img}</span>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Collection structure: {sel.name}</div>
            <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{sel.segment} · {sel.compo} · store launch {sel.implantation} · {sel.persona}</div>
          </div>
        </div>
        <span style={microLbl}>Colourway references — select the one that drives the offer</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {sel.coloris.map(([n, c], i) => {
            const on = vCol === i;
            return (
              <button key={n} disabled={locked} onClick={() => !locked && st.setColIdx(i)} style={{ ...lockStyle, display: "inline-flex", alignItems: "center", gap: 8, cursor: locked ? "not-allowed" : "pointer", background: on ? `${T.accent}10` : T.panel2, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 999, padding: "7px 13px", fontSize: 12, fontWeight: 700, color: on ? T.ink : T.sub }}>
                <span style={{ width: 14, height: 14, borderRadius: 99, background: c, border: `1px solid ${T.line}` }} />{n}
                <span style={{ fontFamily: MONO, fontSize: 10, color: T.faint }}>{sel.id.toUpperCase()}-{String(i + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
        <span style={microLbl}>Collection structure indicators</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "PVI", val: eur(locked ? snap.pvi : st.pvcOf(sel)), icon: Tag, color: T.accent, rule: <RuleStatus st={st} area="Supply" kpi="price" /> },
            { label: "Cost price", val: eur(locked ? snap.revient : st.revOf(sel)), icon: Wallet, color: T.blue, rule: <RuleStatus st={st} area="Supply" kpi="margin" /> },
            { label: "Margin", val: (locked ? snap.marge : marge) + " %", icon: TrendingUp, color: T.human, rule: <RuleStatus st={st} area="Supply" kpi="margin" /> },
            { label: "CO₂ weight / piece", val: (locked ? snap.co2 : st.co2Of(sel)) + " kg", icon: Leaf, color: T.ok, rule: <RuleStatus st={st} area="Offer & Collection" kpi="footprint" productId={sel.id} /> },
            { label: "Supply lead time", val: (locked ? snap.lead : st.leadOf(reco)) + " d", icon: Truck, color: T.silver, rule: <RuleStatus st={st} area="Supply" kpi="sourcing" action={false} /> },
            { label: "Volume", val: u(locked ? snap.volume : st.volOf(sel)) + " units", icon: Boxes, color: T.silver, rule: <RuleStatus st={st} area="Go to Market" kpi="volume" /> },
          ].map((s) => (
            <div key={s.label} style={{ flex: "1 1 130px", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "11px 13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: T.sub, fontSize: 11, fontWeight: 600 }}><s.icon size={13} color={s.color} />{s.label}</div>
              <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 600, color: T.ink, marginTop: 5 }}>{s.val}</div>
              {s.rule && <div style={{ marginTop: 6 }}>{s.rule}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* ---- Improvement agents ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Wrench size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Improvement agents</span>
        </div>
        <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, margin: "0 0 12px" }}>Three agents scan the selected product and suggest levers to improve cost price, CO₂ impact and supply lead time. Toggle a lever on / off to see the simulated effect on the indicators above.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
          {AMELIO.map((ag) => (
            <div key={ag.id} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 26, height: 26, borderRadius: 7, display: "grid", placeItems: "center", background: `${ag.color}1c`, border: `1px solid ${ag.color}55` }}><ag.icon size={14} color={ag.color} /></span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>{ag.name}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {ag.levers.map((lv) => {
                  const on = vLevers.has(lv.id);
                  return (
                    <button key={lv.id} disabled={locked} onClick={() => !locked && st.toggleLever(lv.id)} style={{ ...lockStyle, textAlign: "left", cursor: locked ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: 9, background: on ? `${ag.color}12` : T.panel, border: `1px solid ${on ? ag.color : T.line}`, borderRadius: 9, padding: "8px 10px" }}>
                      <span style={{ width: 16, height: 16, borderRadius: 5, flexShrink: 0, display: "grid", placeItems: "center", background: on ? ag.color : "transparent", border: `1.5px solid ${on ? ag.color : T.faint}` }}>{on && <Check size={11} color="#ffffff" />}</span>
                      <span style={{ flex: 1, fontSize: 11.5, fontWeight: 600, color: T.ink }}>{lv.t}</span>
                      <span style={{ fontFamily: MONO, fontSize: 10.5, color: ag.color, whiteSpace: "nowrap" }}>{lv.effect}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Product sheet assistant: at the end of the product brief, a voice note generates the sheet ---- */}
      <ProductSheetAssistant st={st} locked={locked} />

      {/* ---- Product development validation ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <BadgeCheck size={15} color={T.ok} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Product development validation</span>
          <Chip color={T.accent}>{sel.name}</Chip>
        </div>
        <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, margin: "0 0 12px" }}>The product manager approves or rejects the development of the selected collection structure. Approval publishes the deliverables to the PLM.</p>
        {!st.approved.has(sel.id) || st.isReopened(sel.id) ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            {st.isReopened(sel.id) && <span style={{ flexBasis: "100%", fontSize: 11.5, color: T.warn, fontFamily: MONO }}>Offer reopened for editing — approve again to freeze the new choices.</span>}
            <button onClick={() => st.approve(sel.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.ok, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Check size={14} /> Approve</button>
            <button onClick={() => st.reject(sel.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.panel2, color: T.bad, border: `1px solid ${T.bad}66`, borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 700, fontFamily: SANS }}><X size={14} /> Reject</button>
            {st.rejected.has(sel.id) && <span style={{ fontSize: 11.5, color: T.bad, fontFamily: MONO }}>Development rejected — sent back to design for rework.</span>}
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <Check size={15} color={T.ok} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Product development finalised — deliverables available</span>
              <Chip color={T.ok}>Approved - read only</Chip>
              <button onClick={() => st.reopen(sel.id)} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: "transparent", color: T.accent, border: `1px solid ${T.accent}55`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}><Wrench size={12} /> Edit offer again</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: T.panel2, border: `1px solid #00a3c455`, borderRadius: 12, padding: "13px 16px", marginBottom: 14 }}>
              <WhiteBadge><img src={CENTRIC_LOGO} alt="Dassault Centric" style={{ height: 30, width: "auto", display: "block" }} /></WhiteBadge>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Deliverables published in the Dassault Centric PLM</span>
                  <Chip color="#005386">PLM synced</Chip>
                </div>
                <div style={{ fontSize: 11.5, color: T.faint, marginTop: 3, lineHeight: 1.45 }}>3D render, tech-pack and product sheet are available in the Dassault Centric project space, ready to be sent to suppliers.</div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: MONO, fontWeight: 700, color: T.ok, background: `${T.ok}1c`, border: `1px solid ${T.ok}55`, padding: "5px 11px", borderRadius: 999, flexShrink: 0 }}><Check size={13} /> Available</span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { icon: Box, t: "Interactive 3D render", n: "→ Opening the 3D render from the Dassault Centric PLM…" },
                { icon: FileText, t: "Tech-pack PDF", n: "→ Tech-pack retrieved from Dassault Centric — ready to send to the supplier." },
                { icon: BadgeCheck, t: "Ks product sheet", n: "→ Product sheet synced with Dassault Centric." },
              ].map((d) => (
                <button key={d.t} onClick={() => st.setNote(d.n)} style={{ flex: "1 1 180px", textAlign: "left", cursor: "pointer", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "11px 13px", display: "flex", alignItems: "center", gap: 9 }}>
                  <d.icon size={16} color="#005386" /><span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>{d.t}</span><ArrowRight size={13} color={T.faint} style={{ marginLeft: "auto" }} />
                </button>
              ))}
            </div>
            {st.note && <div style={{ marginTop: 10, fontSize: 11.5, fontFamily: MONO, color: T.sub }}>{st.note}</div>}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Collection director tab
   ============================================================ */
/* ---- Optimisation scenarios & simulation per control ---- */
const OPTI = {
  prix: [
    { id: "p1", t: "Smooth 2 structures from the 9 € price point down to 7 – 8 €", sim: [["Density at the 9 € PVI", "5 refs", "3 refs"], ["Price ladder", "gap 6→9 €", "continuous 4→15 €"], ["Estimated revenue", "43,8 M€", "44,2 M€"]] },
    { id: "p2", t: "Raise the ruffle-collar bodysuit from 6 € to 7 €", sim: [["Collection average PVI", "9,83 €", "9,92 €"], ["Structure margin", "58 %", "61 %"], ["Volume risk", "—", "−3 %"]] },
  ],
  personas: [
    { id: "r1", t: "Switch the light zip pyjamas from “current” to “trendy”", sim: [["Current customer", "40 %", "33 %"], ["Trendy customer", "22 %", "29 %"], ["Target compliance", "2 / 3", "3 / 3"]] },
    { id: "r2", t: "Strengthen trendy through a licences capsule (+60 000 pcs)", sim: [["Trendy customer", "22 %", "26 %"], ["Collection volume", "3,85 M pcs", "3,91 M pcs"], ["Revenue budget", "43,8 M€", "44,5 M€"]] },
  ],
  couleurs: [
    { id: "c1", t: "Push sage green onto 2 additional colourway variants", sim: [["Sage green", "13 %", "18 %"], ["Ecru / beige", "30 %", "27 %"], ["S1 2027 fashion objective", "not met", "met"]] },
    { id: "c2", t: "Cap black at 5 % (transfer to camel)", sim: [["Black", "6 %", "5 %"], ["Camel", "10 %", "11 %"], ["Margin vs black threshold", "2 pts", "3 pts"]] },
  ],
  ortho: [
    { id: "o1", t: "Fix “litle” → “little” before production launch", sim: [["Infographic anomalies", "2", "1"], ["Correction cost", "—", "0 € (before prod)"], ["Shelf withdrawal risk", "high", "averted"]] },
    { id: "o2", t: "Submit “POWH !” to the Disney licence guide", sim: [["Infographic anomalies", "2", "0"], ["Licence validation lead time", "—", "+5 d"], ["Licence compliance", "80 %", "100 %"]] },
  ],
  canaux: [
    { id: "k1", t: "Open 3 Core structures to the South & Maghreb zones", sim: [["International", "30 %", "36 %"], ["Objective ≥ 35 %", "not met", "met"], ["Export volume", "—", "+180 000 pcs"]] },
    { id: "k2", t: "Switch 2 physical-only structures to omnichannel", sim: [["Omnichannel", "62 %", "68 %"], ["Physical only", "28 %", "22 %"], ["E-com coverage", "—", "+6 pts"]] },
  ],
};
function BalanceActions({ ck }) {
  const [selId, setSelId] = useState(null);
  const [mail, setMail] = useState(false);
  const [sent, setSent] = useState(false);
  const scs = OPTI[ck] || [];
  const s = scs.find((x) => x.id === selId);
  const pick = (id) => { setSelId(id === selId ? null : id); setMail(false); setSent(false); };
  return (
    <div style={{ marginTop: 12, borderTop: `1px dashed ${T.line}`, paddingTop: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <Sparkles size={13} color={T.human} /><span style={{ fontSize: 11.5, fontWeight: 800, color: T.ink }}>Optimisation scenarios proposed by the agent</span>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: s ? 10 : 0 }}>
        {scs.map((x) => {
          const on = x.id === selId;
          return (
            <button key={x.id} onClick={() => pick(x.id)} style={{ textAlign: "left", cursor: "pointer", flex: "1 1 240px", background: on ? `${T.human}12` : T.panel, border: `1px solid ${on ? T.human : T.line}`, borderRadius: 9, padding: "9px 12px", fontSize: 11.5, fontWeight: 700, color: T.ink, fontFamily: SANS, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 15, height: 15, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: on ? T.human : "transparent", border: `1.5px solid ${on ? T.human : T.faint}` }}>{on && <Check size={10} color="#ffffff" />}</span>
              {x.t}
            </button>
          );
        })}
      </div>
      {s && (
        <div style={{ background: T.panel, border: `1px solid ${T.blue}44`, borderRadius: 10, padding: "10px 13px", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
            <TrendingUp size={13} color={T.blue} /><span style={{ fontSize: 11, fontWeight: 800, color: T.ink, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5 }}>Simulated impact</span>
          </div>
          {s.sim.map(([l, av, ap]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", borderBottom: `1px solid ${T.lineSoft}` }}>
              <span style={{ flex: 1, fontSize: 11.5, color: T.sub }}>{l}</span>
              <span style={{ fontFamily: MONO, fontSize: 11, color: T.faint }}>{av}</span>
              <ArrowRight size={11} color={T.faint} />
              <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 800, color: T.blue }}>{ap}</span>
            </div>
          ))}
        </div>
      )}
      {s && !mail && !sent && (
        <button onClick={() => setMail(true)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 11.5, fontWeight: 800, fontFamily: SANS }}><Send size={13} /> Validate change request</button>
      )}
      {s && mail && !sent && (
        <div style={{ background: T.panel, border: `1px solid ${T.accent}44`, borderRadius: 10, padding: "11px 13px" }}>
          <div style={{ fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 7 }}>Email preview</div>
          <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.6 }}>
            <div><strong style={{ color: T.ink }}>To:</strong> Baby Product Manager &lt;cdp.bebe@kiabi.fr&gt;</div>
            <div><strong style={{ color: T.ink }}>Subject:</strong> Change request — {s.t}</div>
            <div style={{ marginTop: 6 }}>Hello, following the analysis by the collection balance agent, please validate the following change: <em>{s.t}</em>. Simulated impact: {s.sim.map(([l, av, ap]) => `${l} ${av} → ${ap}`).join(" · ")}. Thanks for your feedback. — Market manager</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={() => setSent(true)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.ok, color: "#ffffff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 11.5, fontWeight: 800, fontFamily: SANS }}><Send size={13} /> Send email</button>
            <button onClick={() => setMail(false)} style={{ cursor: "pointer", background: T.panel2, color: T.sub, border: `1px solid ${T.line}`, borderRadius: 9, padding: "8px 14px", fontSize: 11.5, fontWeight: 700, fontFamily: SANS }}>Cancel</button>
          </div>
        </div>
      )}
      {sent && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${T.ok}14`, border: `1px solid ${T.ok}55`, borderRadius: 9, padding: "8px 13px", fontSize: 11.5, fontWeight: 700, color: T.ok }}>
          <BadgeCheck size={14} /> Email sent to the Baby product manager — change request pending validation.
        </div>
      )}
    </div>
  );
}

/* ---- Distribution block (product focus & pyramid) ---- */
function DistribBlock({ icon: Icon, title, hint, verdict, rows, colLabel, msg, ck }) {
  const totQty = rows.reduce((s, r) => s + r.qty, 0);
  const totRefs = rows.reduce((s, r) => s + r.refs, 0);
  return (
    <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
        <Icon size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{title}</span><VerdictChip v={verdict} />
      </div>
      <div style={{ fontSize: 11, color: T.faint, marginBottom: 10 }}>{hint}</div>
      <div style={{ display: "flex", height: 22, borderRadius: 8, overflow: "hidden", border: `1px solid ${T.line}`, marginBottom: 10 }}>
        {rows.map((r) => (
          <div key={r.n} title={`${r.n} — ${r.pct} % · ${u(r.qty)} pcs`} style={{ width: r.pct + "%", background: r.c }} />
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr>
            {[colLabel, "Structures", "Colourway refs", "Quantities", "% volume", "Target", ""].map((c, j) => (
              <th key={c + j} style={{ textAlign: j === 0 ? "left" : j === 6 ? "center" : "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{c}</th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.n}>
                <td style={{ padding: "8px 8px", borderBottom: `1px solid ${T.lineSoft}` }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: r.c, border: `1px solid ${T.line}`, flexShrink: 0 }} />
                    <span>
                      <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.ink }}>{r.n}</span>
                      <span style={{ display: "block", fontSize: 10, color: T.faint }}>{r.role}</span>
                    </span>
                  </span>
                </td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{r.structures}</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}>{r.refs} col. refs</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, fontWeight: 700, color: T.ink, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}>{u(r.qty)} pcs</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, fontWeight: 800, color: r.okv ? T.ink : T.warn, borderBottom: `1px solid ${T.lineSoft}` }}>{r.pct.toLocaleString("fr-FR")} %</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 10.5, color: T.faint, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}>{r.target}</td>
                <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}>{r.okv ? <Check size={13} color={T.ok} /> : <X size={13} color={T.warn} />}</td>
              </tr>
            ))}
            <tr>
              <td style={{ padding: "8px 8px", fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase", letterSpacing: 0.5 }}>Collection total</td>
              <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub }}>{PRODUITS.length}</td>
              <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, whiteSpace: "nowrap" }}>{totRefs} col. refs</td>
              <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, fontWeight: 800, color: T.ink, whiteSpace: "nowrap" }}>{u(totQty)} pcs</td>
              <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub }}>100 %</td>
              <td /><td />
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5, marginTop: 8 }}>{msg}</div>
      <BalanceActions ck={ck} />
    </div>
  );
}

function DirectricePage({ st }) {
  const [ran, setRan] = useState(true);

  /* Price coherence computed from the single source */
  const priceRows = useMemo(() => {
    const m = {};
    PRODUITS.forEach((p) => { m[p.prix] = (m[p.prix] || 0) + 1; });
    return Object.entries(m).map(([k, v]) => ({ prix: +k, n: v })).sort((a, b) => a.prix - b.prix);
  }, []);
  const maxN = Math.max(...priceRows.map((r) => r.n));
  const focusRows = useMemo(() => buildDistrib("focus", FOCUS_DEF), []);
  const pyrRows = useMemo(() => buildDistrib("pyramide", PYRAMIDE_DEF), []);
  const verdictOf = (rows) => (rows.every((r) => r.okv) ? "Compliant" : rows.filter((r) => !r.okv).length > 1 ? "To fix" : "Alert");

  /* Personas computed by volume from the single source */
  const personas = useMemo(() => {
    const tot = PRODUITS.reduce((s, p) => s + p.volume, 0);
    const g = {};
    PRODUITS.forEach((p) => { g[p.persona] = (g[p.persona] || 0) + p.volume; });
    return [
      { n: "Rational customer", pct: Math.round((g["Rational customer"] / tot) * 100), target: "35 – 45 %", okv: true, c: "#0053A0" },
      { n: "Current customer", pct: Math.round((g["Current customer"] / tot) * 100), target: "30 – 40 %", okv: false, c: "#4B90CD" },
      { n: "Trendy customer", pct: Math.round((g["Trendy customer"] / tot) * 100), target: "20 – 30 %", okv: true, c: "#7fa3c4" },
    ];
  }, []);

  const checks = [
    { id: "pyramide", icon: Triangle, title: "Collection pyramid", verdict: verdictOf(pyrRows), msg: "The Top accounts for 15,0 % of volume (575 000 pcs across 6 colourway refs) against a 12 % ceiling. The Permanent base (47,6 %) and Basics (15,2 %) are within their targets: the adjustment concerns the Top only, where the end-of-season markdown risk is highest." },
    { id: "focus", icon: LayoutGrid, title: "Product type focus", verdict: verdictOf(focusRows), msg: "Impulse picks account for only 10,7 % of volume (410 000 pcs across 3 colourway refs) against a 15 – 22 % target, while Essentials climb to 37,7 %. The offer lacks animation products against a very broad base." },
    { id: "prix", icon: Scale, title: "Price coherence", verdict: "Alert", msg: "Over-density at the 9,00 € PVI (5 structures out of 12). Recommendation: smooth part of the offer towards the 7 – 8 € price points to restore the 4 → 15 € price ladder." },
    { id: "personas", icon: Users, title: "Target split", verdict: "Alert", msg: "The current customer slightly exceeds its target (above 40 %). Rebalance in favour of the trendy customer on the next store launches." },
    { id: "couleurs", icon: Palette, title: "Colour balance", verdict: "Compliant", msg: "Black at 6 % — below the 8 % threshold. S1 2027 fashion colour “Sage green” at 13 %: to push towards 18 % (season objective)." },
    { id: "ortho", icon: SpellCheck, title: "Garment text infographics", verdict: "To fix", msg: "2 anomalies detected across 5 checked texts — corrections to request before production launch." },
    { id: "canaux", icon: Network, title: "Channel & geography split", verdict: "Alert", msg: "International at 30 % vs ≥ 35 % objective. Strengthen the export-eligible Core structures in the South and Maghreb zones." },
  ];
  const ck = (id) => checks.find((c) => c.id === id);

  return (
    <div>
      <MarketBriefEditor st={st} />

      {/* ---- Collection director cockpit ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Crown size={16} color={T.accent} /><span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Market manager cockpit — Kids collection S1 2027</span>
        </div>
        <span style={microLbl}>Collection budget status</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <PMGauge icon={Wallet} label="Collection revenue budget" used={131.4} total={st.perfRules.caEnvelope * 3} unit="M€" fmt={(n) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} color={T.accent} rule={<RuleStatus st={st} area="Offer & Collection" kpi="revenue" label="Group rule" action={false} />} />
          <PMGauge icon={Leaf} label="Collection CO₂ budget" used={+(st.collectionCO2 * 3).toFixed(1)} total={st.perfRules.carbonEnvelope * 3} unit="t CO₂e" fmt={(n) => u(Math.round(n))} color={st.collectionCO2 > st.perfRules.carbonEnvelope ? T.bad : T.ok} rule={<RuleStatus st={st} area="Go to Market" kpi="carbon" label="Group rule" action={false} />} />
        </div>
        <span style={microLbl}>Collection objectives (consolidated from the product managers)</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <PMGauge icon={TrendingUp} label="Collection TME" used={54} total={58} unit="%" fmt={(n) => n.toLocaleString("fr-FR")} color={T.human} rule={<RuleStatus st={st} area="Supply" kpi="margin" label="Group rule" action={false} />} />
          <PMGauge icon={Tag} label="Collection average PVI" used={8.2} total={9} unit="€" fmt={(n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} color={T.accent} rule={<RuleStatus st={st} area="Supply" kpi="price" label="Group rule" action={false} />} />
          <PMGauge icon={Boxes} label="Collection quantities" used={21} total={25.5} unit="M" fmt={(n) => n.toLocaleString("fr-FR")} color={T.blue} rule={<RuleStatus st={st} area="Go to Market" kpi="volume" label="Group rule" action={false} />} />
          <PMGauge icon={Layers} label="Collection colourway references" used={1260} total={1500} unit="col. refs" fmt={(n) => u(n)} color={T.human} />
        </div>
        <span style={microLbl}>Group rules — computed on the indicators above (single source: the Group-rule breach engine)</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          <RuleStatus st={st} area="Supply" kpi="price" label="Price" /><RuleStatus st={st} area="Supply" kpi="margin" label="Margin" /><RuleStatus st={st} area="Go to Market" kpi="volume" label="Volume" /><RuleStatus st={st} area="Offer & Collection" kpi="footprint" label="Product footprint" />
        </div>
        <span style={microLbl}>Product manager contributions</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {CDP_CONTRIB.map((c) => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "9px 13px" }}>
              <UserCog size={14} color={c.color} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, minWidth: 170 }}>{c.name}</span>
              <Bar pct={(c.ca / c.budget) * 100} color={c.color} max={100} />
              <span style={{ fontFamily: MONO, fontSize: 11, color: T.sub, whiteSpace: "nowrap" }}>{c.ca.toLocaleString("fr-FR")} / {c.budget} M€</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Collection balance agent ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <Scale size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Collection balance agent</span>
          <button onClick={() => setRan(true)} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 8, padding: "6px 13px", fontSize: 11.5, fontWeight: 800, fontFamily: SANS }}><Sparkles size={13} /> Re-run analysis</button>
        </div>
        <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, margin: "0 0 14px" }}>The agent scans the whole collection and checks the balance of the offer: collection pyramid, product type focus, price coherence, target split, colours, garment text infographics and channel split. Each control proposes optimisation scenarios, simulates their impact and forwards the change request to the product manager.</p>

        {ran && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Summary */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {checks.map((c) => (
                <span key={c.id} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 999, padding: "6px 12px" }}>
                  <c.icon size={13} color={T.accent} /><span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink }}>{c.title}</span><VerdictChip v={c.verdict} />
                </span>
              ))}
            </div>

            <DistribBlock icon={Triangle} title="Collection pyramid" hint="Split of volume and colourway references by pyramid tier" verdict={ck("pyramide").verdict} rows={pyrRows} colLabel="Tier" msg={ck("pyramide").msg} ck="pyramide" />
            <DistribBlock icon={LayoutGrid} title="Product type focus" hint="Split of volume and colourway references by the product's role in the offer" verdict={ck("focus").verdict} rows={focusRows} colLabel="Focus" msg={ck("focus").msg} ck="focus" />

            {/* 1. Price coherence */}
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><Scale size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Price coherence</span><VerdictChip v="Alert" /></div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 70, marginBottom: 8 }}>
                {priceRows.map((r) => (
                  <div key={r.prix} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                    <span style={{ fontFamily: MONO, fontSize: 9.5, color: T.faint }}>{r.n}</span>
                    <div style={{ width: "70%", height: (r.n / maxN) * 44 + 6, background: r.n >= 4 ? T.warn : T.blue, borderRadius: 4 }} />
                    <span style={{ fontFamily: MONO, fontSize: 9.5, color: T.sub }}>{r.prix}€</span>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{ck("prix").msg}</div>
              <BalanceActions ck="prix" />
            </div>

            {/* 2. Personas */}
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Users size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Target split (% of volume)</span><VerdictChip v="Alert" /></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
                {personas.map((p) => (
                  <div key={p.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink, minWidth: 120 }}>{p.n}</span>
                    <Bar pct={p.pct} color={p.c} max={50} />
                    <span style={{ fontFamily: MONO, fontSize: 11, color: T.sub, minWidth: 38, textAlign: "right" }}>{p.pct} %</span>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: T.faint, minWidth: 70 }}>target {p.target}</span>
                    {p.okv ? <Check size={13} color={T.ok} /> : <X size={13} color={T.warn} />}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{ck("personas").msg}</div>
              <BalanceActions ck="personas" />
            </div>

            {/* 3. Colours */}
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Palette size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Colour balance</span><VerdictChip v="Compliant" /></div>
              <div style={{ display: "flex", height: 22, borderRadius: 8, overflow: "hidden", border: `1px solid ${T.line}`, marginBottom: 8 }}>
                {COLOR_MIX.map((c) => (
                  <div key={c.n} title={`${c.n} ${c.pct}%`} style={{ width: c.pct + "%", background: c.c }} />
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 8 }}>
                {COLOR_MIX.map((c) => (
                  <span key={c.n} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10.5, color: T.sub }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: c.c, border: `1px solid ${T.line}` }} />{c.n} <span style={{ fontFamily: MONO }}>{c.pct}%</span>
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <Chip color={T.ok}>Black 6 % — 8 % threshold met</Chip>
                <Chip color={T.warn}>Sage green 13 % → push to 18 % (S1 2027 fashion colour)</Chip>
              </div>
              <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{ck("couleurs").msg}</div>
              <BalanceActions ck="couleurs" />
            </div>

            {/* 4. Spelling */}
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><SpellCheck size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Garment text infographics</span><VerdictChip v="To fix" /></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 8 }}>
                {TEXTES.map((t) => (
                  <div key={t.txt} style={{ display: "flex", alignItems: "flex-start", gap: 9, background: T.panel, border: `1px solid ${t.ok ? T.line : T.bad + "66"}`, borderRadius: 9, padding: "8px 11px" }}>
                    {t.ok ? <Check size={14} color={T.ok} style={{ flexShrink: 0, marginTop: 1 }} /> : <X size={14} color={T.bad} style={{ flexShrink: 0, marginTop: 1 }} />}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, fontStyle: "italic" }}>“{t.txt}”</span>
                      <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}> — {t.prod}</span>
                      {!t.ok && <div style={{ fontSize: 11, color: T.bad, marginTop: 3 }}>{t.fix}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{ck("ortho").msg}</div>
              <BalanceActions ck="ortho" />
            </div>

            {/* 5. Channels */}
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Network size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Channel & geography split</span><VerdictChip v="Alert" /></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
                {CANAUX.map((c) => (
                  <div key={c.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink, minWidth: 120 }}>{c.n}</span>
                    <Bar pct={c.pct} color={c.okv ? T.blue : T.warn} max={80} />
                    <span style={{ fontFamily: MONO, fontSize: 11, color: T.sub, minWidth: 38, textAlign: "right" }}>{c.pct} %</span>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: T.faint, minWidth: 60 }}>{c.target}</span>
                    {c.okv ? <Check size={13} color={T.ok} /> : <X size={13} color={T.warn} />}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{ck("canaux").msg}</div>
              <BalanceActions ck="canaux" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   Product sheet assistant (voice-based referencing, integrated in the Product Manager journey)
   ============================================================ */
const catOf = (n) => { const s = n.toLowerCase(); if (s.includes("bod")) return "Bodysuit"; if (s.includes("pyjama") || s.includes("sleepsuit")) return "Sleepsuit / Pyjamas"; if (s.includes("romper")) return "Romper"; return "Set"; };

/* ============================================================
   Market brief — written in Market Framework, copied read-only to
   Collection Framework and Product Manager (local simulation, no network)
   ============================================================ */
const STYLE3D_NAME = "Style3D"; /* transcribed as "Steel 3D" in the voice brief — most likely Style3D; adjust here if needed */
const MARKET_SOURCES = [
  { id: "style3d", name: STYLE3D_NAME, desc: "3D styling & material trend library", signal: "3D material library flags soft velour, pointelle knits and matte ribs rising in baby nightwear" },
  { id: "search", name: "Search trends", desc: "search interest by product family", signal: "search interest up for sleepsuits and bodysuit packs, flat on licensed characters" },
  { id: "social", name: "Social listening", desc: "social conversations and creator content", signal: "sage green, ecru and dusty pink dominate baby content; comfort and easy dressing are the top themes" },
  { id: "sales", name: "Sales history", desc: "S1 2025-2026 sell-through by collection structure", signal: "permanent bodysuit packs and nightwear drive 65 % of volume; the 9 € price point is saturated" },
];
const BRIEF_THEMES = [
  { re: /comfort|soft|cosy|cozy|gentle/i, theme: "Comfort & softness", guidance: "prioritise soft certified materials, flat seams and easy-dressing openings" },
  { re: /price|value|affordab|cheap|budget|accessib/i, theme: "Price accessibility", guidance: "hold the 4 → 15 € price ladder and smart packs on essentials" },
  { re: /carbon|recycl|sustain|eco|planet|footprint/i, theme: "Low-carbon offer", guidance: "recycled cotton and nearshore sourcing on the highest-volume structures" },
  { re: /licen|character|disney|marvel|hero/i, theme: "Licences & characters", guidance: "keep licences as impulse picks within the 10 – 16 % collab share" },
  { re: /colou?r|pastel|sage|palette|tone/i, theme: "Colour direction", guidance: "push the S1 2027 fashion colour towards 18 % of the colour mix" },
  { re: /international|export|zone|maghreb|south|tropic/i, theme: "International reach", guidance: "open export-eligible Core structures to the South and Maghreb zones" },
  { re: /essential|basic|permanent|bodysuit|sleepsuit|nightwear|underwear/i, theme: "Essentials base", guidance: "secure permanent bodysuit packs and nightwear availability all season" },
  { re: /trend|fashion|novelty|capsule|impulse|animation/i, theme: "Fashion animation", guidance: "add impulse picks to reach the 15 – 22 % animation share" },
];
const SAMPLE_MARKET_INTENTION = "For S1 2027 the Baby market must stay the most accessible layette offer on the market: hold the 4 → 15 € price ladder, secure permanent bodysuit packs and nightwear every week of the season, and bring comfort and softness to every essential. We push a low-carbon direction on the biggest volumes with recycled cotton and nearshore sourcing. Colour direction: sage green and ecru as the season signature. Licences remain an impulse animation, not the base. Open the export-eligible Core structures to the South and Maghreb zones.";
/* Pure local synthesis: structured brief derived from the written intention and the selected (simulated) sources */
function synthesizeMarketBrief(text, sourceIds) {
  const clean = text.trim().replace(/\s+/g, " ");
  const sentences = clean.split(/[.!?]+\s+/).map((s) => s.trim()).filter(Boolean);
  const themes = BRIEF_THEMES.filter((t) => t.re.test(clean));
  const sources = MARKET_SOURCES.filter((s) => sourceIds.includes(s.id));
  const priorities = themes.slice(0, 4).map((t) => t.guidance);
  priorities.push("keep every collection within the Financial Framework and CO₂ Framework envelopes");
  return {
    headline: sentences[0] ? sentences[0].replace(/[.!?]+$/, "").slice(0, 180) : "Market intention to be written",
    themes: themes.length ? themes.map((t) => ({ theme: t.theme, guidance: t.guidance })) : [{ theme: "General market direction", guidance: "derive the collection guidelines from the intention above" }],
    signals: sources.map((s) => ({ source: s.name, txt: s.signal })),
    priorities,
    words: clean ? clean.split(" ").filter(Boolean).length : 0,
  };
}

/* Step 1 of Market Framework: the Market Manager writes the intention and synthesizes the brief (editable here only) */
function MarketBriefEditor({ st }) {
  const brief = st.marketBrief;
  const [draft, setDraft] = useState(brief ? brief.text : "");
  const [sources, setSources] = useState(() => new Set(brief ? brief.sourceIds : MARKET_SOURCES.map((s) => s.id)));
  const toggle = (id) => setSources((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const canRun = draft.trim().length >= 20 && sources.size > 0;
  const run = () => { const ids = MARKET_SOURCES.map((s) => s.id).filter((id) => sources.has(id)); st.setMarketBrief({ text: draft, sourceIds: ids, sourceNames: MARKET_SOURCES.filter((s) => ids.includes(s.id)).map((s) => s.name), summary: synthesizeMarketBrief(draft, ids), at: new Date() }); };
  const dirty = brief && brief.text !== draft;
  return (
    <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        <span style={{ width: 26, height: 26, borderRadius: 99, display: "grid", placeItems: "center", background: T.accent, color: "#ffffff", fontFamily: MONO, fontSize: 12, fontWeight: 800 }}>1</span>
        <span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Write the market brief</span>
        <span style={{ fontSize: 11.5, color: T.faint }}>shared orientation for the whole market, then for the collections and the products</span>
        {brief && <span style={{ marginLeft: "auto" }}><Chip color={dirty ? T.warn : T.ok}>{dirty ? "Edited since last synthesis" : "Brief synthesized"}</Chip></span>}
      </div>
      <span style={microLbl}>Trend data connectors — simulated sources, no network call</span>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8, marginBottom: 14 }}>
        {MARKET_SOURCES.map((s) => {
          const on = sources.has(s.id);
          return (
            <button key={s.id} onClick={() => toggle(s.id)} style={{ textAlign: "left", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 9, background: on ? `${T.human}12` : T.panel2, border: `1px solid ${on ? T.human : T.line}`, borderRadius: 10, padding: "10px 12px", fontFamily: SANS }}>
              <span style={{ width: 16, height: 16, borderRadius: 5, flexShrink: 0, marginTop: 1, display: "grid", placeItems: "center", background: on ? T.human : "transparent", border: `1.5px solid ${on ? T.human : T.faint}` }}>{on && <Check size={11} color="#ffffff" />}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}><span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>{s.name}</span><span style={{ fontSize: 9.5, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>simulated</span></span>
                <span style={{ display: "block", fontSize: 10.5, color: T.faint, marginTop: 2, lineHeight: 1.4 }}>{s.desc}</span>
              </span>
              <span style={{ width: 7, height: 7, borderRadius: 99, background: on ? T.ok : T.line, flexShrink: 0, marginTop: 5 }} />
            </button>
          );
        })}
      </div>
      <span style={microLbl}>Market intention — written by the Market Manager</span>
      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={7} placeholder="Describe the market intention for S1 2027: price positioning, essentials to secure, comfort and material direction, low-carbon ambition, colour signature, licences, international reach…" style={{ display: "block", width: "100%", boxSizing: "border-box", resize: "vertical", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "11px 13px", fontSize: 12.5, lineHeight: 1.55, color: T.ink, outline: "none", fontFamily: SANS }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
        <span style={{ fontSize: 11, color: T.faint, fontFamily: MONO }}>{draft.trim() ? `${u(draft.trim().split(/\s+/).length)} words · ${sources.size} source${sources.size > 1 ? "s" : ""} selected` : "empty intention"}</span>
        <button onClick={() => setDraft(SAMPLE_MARKET_INTENTION)} style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: "transparent", color: T.faint, border: `1px solid ${T.line}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}><FileText size={12} /> Insert a sample intention</button>
        <button onClick={run} disabled={!canRun} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, cursor: canRun ? "pointer" : "not-allowed", opacity: canRun ? 1 : 0.5, background: T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "10px 17px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Sparkles size={14} /> Synthesize market brief</button>
      </div>
      {brief && (
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: `${T.ok}14`, border: `1px solid ${T.ok}66`, borderRadius: 11, padding: "11px 14px", marginBottom: 12, flexWrap: "wrap" }}>
            <BadgeCheck size={16} color={T.ok} style={{ flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1, minWidth: 220, fontSize: 12, color: T.ink, lineHeight: 1.5 }}>
              <strong>Market brief synthesized on {brief.at.toLocaleDateString("fr-FR")} at {brief.at.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</strong> — available to Collection Framework and Product Manager as a read-only copy. It stays editable here only.
            </div>
            <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
              <button onClick={() => st.setTab("collection")} style={{ cursor: "pointer", background: T.panel, color: T.accent, border: `1px solid ${T.accent}55`, borderRadius: 8, padding: "6px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}>Collection Framework →</button>
              <button onClick={() => st.setTab("product")} style={{ cursor: "pointer", background: T.panel, color: T.accent, border: `1px solid ${T.accent}55`, borderRadius: 8, padding: "6px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}>Product Manager →</button>
            </span>
          </div>
          <MarketBriefCard st={st} origin={false} />
        </div>
      )}
    </div>
  );
}

/* Read-only copy of the market brief (Collection Framework and Product Manager), with its provenance */
function MarketBriefCard({ st, origin = true }) {
  const b = st.marketBrief;
  if (!b) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: T.panel2, border: `1px dashed ${T.line}`, borderRadius: 12, padding: "12px 14px", marginBottom: 18 }}>
        <FileText size={15} color={T.faint} />
        <span style={{ fontSize: 12, color: T.sub, flex: "1 1 240px" }}>No market brief yet — the Market Manager writes and synthesizes it in Market Framework.</span>
        <button onClick={() => st.setTab("market")} style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: T.panel, color: T.accent, border: `1px solid ${T.accent}55`, borderRadius: 8, padding: "6px 12px", fontSize: 11.5, fontWeight: 700, fontFamily: SANS }}>Go to Market Framework <ArrowRight size={12} /></button>
      </div>
    );
  }
  const s = b.summary;
  return (
    <div style={{ background: origin ? T.panel : T.panel2, border: `1px solid ${origin ? `${T.accent}44` : T.line}`, borderRadius: 12, padding: "14px 16px", marginBottom: origin ? 18 : 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
        <Crown size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Market brief</span>
        {origin ? <Chip color={T.accent}>Read-only copy · from Market Framework</Chip> : <Chip color={T.ok}>Synthesis</Chip>}
        <span style={{ marginLeft: "auto", fontSize: 10.5, fontFamily: MONO, color: T.faint }}>{b.at.toLocaleDateString("fr-FR")} · {b.sourceNames.join(", ")}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, lineHeight: 1.45, marginBottom: 10 }}>{s.headline}.</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12 }}>
        <div>
          <span style={microLbl}>Key themes</span>
          {s.themes.map((t) => (
            <div key={t.theme} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11.5, color: T.sub, lineHeight: 1.45, marginBottom: 5 }}><Chip color={T.human}>{t.theme}</Chip><span>{t.guidance}</span></div>
          ))}
        </div>
        <div>
          <span style={microLbl}>Signals from the selected sources</span>
          {s.signals.length ? s.signals.map((x) => (
            <div key={x.source} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11.5, color: T.sub, lineHeight: 1.45, marginBottom: 5 }}><Check size={13} color={T.ok} style={{ flexShrink: 0, marginTop: 2 }} /><span><strong style={{ color: T.ink }}>{x.source}</strong> — {x.txt}</span></div>
          )) : <div style={{ fontSize: 11.5, color: T.faint }}>no source selected</div>}
        </div>
        <div>
          <span style={microLbl}>Priorities for collections and products</span>
          {s.priorities.map((p, i) => (
            <div key={p} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11.5, color: T.sub, lineHeight: 1.45, marginBottom: 5 }}><span style={{ fontFamily: MONO, fontSize: 10.5, fontWeight: 800, color: T.accent, flexShrink: 0, marginTop: 1 }}>{i + 1}.</span><span>{p}</span></div>
          ))}
        </div>
      </div>
      {origin && <div style={{ fontSize: 10.5, color: T.faint, marginTop: 10 }}>Editable from Market Framework only · {u(s.words)} words in the source intention.</div>}
    </div>
  );
}

/* ============================================================
   Market Framework (Market Manager) · Collection Framework (empty state) · Product Manager
   ============================================================ */
function MarketFrameworkPage({ st }) {
  return (
    <div>
      <PageHeader title="Market Framework" desc="The Market Manager writes the market brief, then checks the overall balance of the collection built by the product managers." expert={EXPERTS.directrice} />
      <DirectricePage st={st} />
      <StoreSubmissionsBlock />
    </div>
  );
}

function CollectionFrameworkPage({ st }) {
  return (
    <div>
      <PageHeader title="Collection Framework" desc="Collection-level framing built from the market brief, confronted with the needs submitted by each country's stores." expert={{ role: "Business decision-maker", txt: "The collection framework translates the market brief into guidelines per collection structure and checks them against the store submissions." }} />
      <span style={microLbl}>Market brief received from Market Framework</span>
      <MarketBriefCard st={st} />
      <StoreSubmissionsBlock />
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 22, marginBottom: 18, textAlign: "center" }}>
        <span style={{ width: 44, height: 44, borderRadius: 12, display: "inline-grid", placeItems: "center", background: `${T.accent}12`, border: `1px solid ${T.accent}44`, marginBottom: 10 }}><LayoutGrid size={20} color={T.accent} /></span>
        <div style={{ fontSize: 14, fontWeight: 800, color: T.ink }}>Collection guidelines not built yet</div>
        <div style={{ fontSize: 12, color: T.sub, marginTop: 4, lineHeight: 1.5 }}>The guidelines per collection structure will be derived from the market brief and the store submissions above.</div>
        <div style={{ display: "inline-block", textAlign: "left", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "11px 14px", marginTop: 14 }}>
          <span style={microLbl}>Coming next</span>
          {["Collection guidelines derived from the market brief", "Framing per collection structure, shared with the product managers", "Hand-off to the Product Manager offer structuring"].map((t) => (
            <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11.5, color: T.sub, lineHeight: 1.45, marginBottom: 4 }}><ArrowRight size={12} color={T.faint} style={{ flexShrink: 0, marginTop: 3 }} />{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductManagerPage({ st }) {
  return (
    <div>
      <PageHeader title="Product Manager" desc="From the market brief to the product sheet: structure the Baby offer, break it down into products, generate the product sheet from a voice note and validate development." expert={EXPERTS.design} />
      <MarketBriefCard st={st} />
      <ChefPage st={st} />
    </div>
  );
}

/* ============================================================
   Product sheet assistant — end of the Product Manager journey:
   a voice note is enough to generate and write the product sheet
   ============================================================ */
function ProductSheetAssistant({ st, locked }) {
  const sel = st.sel;
  const [played, setPlayed] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [fields, setFields] = useState({});
  const [fromVocal, setFromVocal] = useState(new Set());
  const [inp, setInp] = useState("");
  const [written, setWritten] = useState(false);

  const REF_FIELDS = useMemo(() => ([
    { k: "desc", label: "Product description", q: null },
    { k: "prog", label: "Programme", q: "Which programme should this product be attached to?", sug: ["Permanent layette", "S1 2027 capsule", "Licences programme"] },
    { k: "couleurs", label: "Colour references", q: null },
    { k: "tailles", label: "Size ranges", q: null },
    { k: "douane", label: "Associated customs code", q: "Which customs code should be associated?", sug: ["6111 20 90 — babies' garments, cotton, knitted", "6209 20 00 — babies' garments, cotton, woven"] },
    { k: "cat", label: "Product category", q: null },
    { k: "design", label: "Design link", q: "What is the link to the design folder?", sug: [`PLM/DESIGN-S127-${sel.id.toUpperCase()}`, "Studio > Figma layette S1 2027"] },
    { k: "tissu", label: "Fabric type", q: null },
    { k: "process", label: "Industrial process used", q: "Which industrial process is used?", sug: ["Cut & sew knit", "Piece dyeing + making-up", "Placement print + making-up"] },
    { k: "genre", label: "Gender", q: null },
    { k: "codif", label: "Product codification", q: "Which product code should be assigned?", sug: [`KB-BB-${sel.id.toUpperCase()}-S127`] },
    { k: "label", label: "Label type (tag / packaging)", q: "Which type of label should appear on the packaging / tag?", sug: ["Woven label + OEKO-TEX label", "Direct-to-skin print + traceability QR"] },
    { k: "moment", label: "Life moment", q: "Which life moment is this product for?", sug: ["Casual", "Smart"] },
    { k: "event", label: "Event", q: "Is the product tied to an event?", sug: ["No event", "Halloween", "Valentine's Day"] },
    { k: "bom", label: "Material composition (BOM)", q: null },
  ]), [sel]);

  const transcript = `“Hi, this is for the referencing of the ${sel.name}. For the description you can put: ${sel.name.toLowerCase()}, ${sel.compo}, S1 2027 collection. The category is ${catOf(sel.name).toLowerCase()}, knitted, unisex baby. Sizes run from 1 month to 36 months. For the colourways you have ${sel.coloris.map(([n]) => n.toLowerCase()).join(", ")}. You already know the material composition: ${sel.compo}, with polyester thread and nickel-free snaps. Can you fill in the rest in Centric for me? Thanks!”`;

  /* Report the sheet progress to the shared state so an approval snapshot can freeze it */
  const report = (f, w) => st.setSheet(sel.id, { filled: Object.keys(f).length, total: REF_FIELDS.length, codif: f.codif || null, written: w });
  const analyze = () => {
    const f = {
      desc: `${sel.name} — ${sel.compo} — S1 2027 collection`,
      cat: catOf(sel.name),
      tailles: "1M → 36M (7 sizes)",
      couleurs: sel.coloris.map(([n], i) => `${n} (${sel.id.toUpperCase()}-${String(i + 1).padStart(2, "0")})`).join(" · "),
      tissu: "Knitted (jersey)",
      genre: "Unisex baby",
      bom: `${sel.compo} · 100% polyester sewing thread · nickel-free snaps`,
    };
    setFields(f); setFromVocal(new Set(Object.keys(f))); setAnalyzed(true); setWritten(false); report(f, false);
  };
  const reset = () => { setPlayed(false); setAnalyzed(false); setFields({}); setFromVocal(new Set()); setInp(""); setWritten(false); st.setSheet(sel.id, null); };

  const missing = REF_FIELDS.filter((f) => !fields[f.k]);
  const current = missing[0];
  const filled = REF_FIELDS.length - missing.length;
  const complete = analyzed && missing.length === 0;
  const answer = (v) => { if (locked || !v || !v.trim() || !current) return; const f = { ...fields, [current.k]: v.trim() }; setFields(f); setInp(""); report(f, false); };
  const write = () => { setWritten(true); report(fields, true); };
  const dis = (on) => ({ opacity: locked ? 0.5 : 1, cursor: locked ? "not-allowed" : on ? "pointer" : "default" });

  return (
    <div>
      {/* ---- Voice note ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <Mic size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Product sheet from a voice note</span>
          <Chip color={T.accent}>{sel.name}</Chip>
          {locked && <Chip color={T.ok}>Approved - read only</Chip>}
          <button onClick={reset} disabled={locked} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: T.faint, border: `1px solid ${T.line}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS, ...dis(true) }}><RotateCcw size={12} /> Start over</button>
        </div>
        <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, margin: "0 0 12px" }}>At the end of the product brief, a voice note from the Product Manager is enough to generate the product sheet: the agent extracts the referencing details from the note, asks for the missing fields, then writes the sheet to the PLM — one continuous journey, no separate tab.</p>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 11, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px" }}>
          <button onClick={() => !locked && setPlayed(true)} disabled={locked} style={{ width: 36, height: 36, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: T.accent, border: "none", ...dis(true) }}><Play size={16} color="#ffffff" /></button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>Voice note from the Product Manager · 0:42</div>
            {played
              ? <div style={{ fontSize: 12, color: T.sub, fontStyle: "italic", lineHeight: 1.6, marginTop: 6 }}>{transcript}</div>
              : <div style={{ fontSize: 11.5, color: T.faint, marginTop: 4 }}>{locked ? "Offer approved — the voice note journey is frozen." : "Click play to listen and display the transcript."}</div>}
            {played && !analyzed && (
              <button onClick={analyze} disabled={locked} style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 7, background: T.human, color: "#ffffff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 800, fontFamily: SANS, ...dis(true) }}><Sparkles size={13} /> Analyse the voice note with the agent</button>
            )}
          </div>
        </div>
      </div>

      {analyzed && (
        <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <ClipboardList size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>PLM product sheet</span>
            <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: T.sub }}>{filled} / {REF_FIELDS.length} fields</span>
          </div>
          <div style={{ height: 6, background: T.line, borderRadius: 99, marginBottom: 14, overflow: "hidden" }}><div style={{ width: (filled / REF_FIELDS.length) * 100 + "%", height: "100%", background: complete ? T.ok : T.accent, borderRadius: 99 }} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 9 }}>
            {REF_FIELDS.map((f) => {
              const v = fields[f.k];
              return (
                <div key={f.k} style={{ background: T.panel2, border: `1px solid ${v ? T.line : T.warn + "66"}`, borderRadius: 10, padding: "9px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink, flex: 1 }}>{f.label}</span>
                    {v ? <Chip color={fromVocal.has(f.k) ? T.ok : T.blue}>{fromVocal.has(f.k) ? "From voice note" : "Completed"}</Chip> : <Chip color={T.warn}>Missing</Chip>}
                  </div>
                  {v && <div style={{ fontSize: 11, color: T.sub, fontFamily: MONO, marginTop: 5, lineHeight: 1.45, wordBreak: "break-word" }}>{v}</div>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {analyzed && current && (
        <div style={{ background: T.panel, border: `1px solid ${T.human}55`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <MessageCircle size={15} color={T.human} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>The agent collects the missing details</span>
            <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: T.faint }}>{missing.length} question{missing.length > 1 ? "s" : ""} remaining</span>
          </div>
          <div style={{ background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 10, padding: "10px 13px", fontSize: 12.5, color: T.ink, marginBottom: 10 }}>
            <strong>Agent:</strong> {current.q} <span style={{ color: T.faint }}>({current.label})</span>
          </div>
          {current.sug && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {current.sug.map((s) => (
                <button key={s} onClick={() => answer(s)} disabled={locked} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 999, padding: "7px 13px", fontSize: 11.5, fontWeight: 700, color: T.ink, fontFamily: SANS, ...dis(true) }}>{s}</button>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && answer(inp)} disabled={locked} placeholder={locked ? "Offer approved — read only" : "Or type your answer…"} style={{ flex: 1, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 12px", fontSize: 12.5, color: T.ink, outline: "none", fontFamily: SANS, ...dis(false) }} />
            <button onClick={() => answer(inp)} disabled={locked} style={{ background: T.human, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 13px", display: "grid", placeItems: "center", ...dis(true) }}><Send size={14} /></button>
          </div>
        </div>
      )}

      {complete && (
        <div style={{ background: T.panel, border: `1px solid ${T.ok}55`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <BadgeCheck size={15} color={T.ok} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Product sheet complete — ready for the PLM</span>
            <Chip color={T.ok}>{REF_FIELDS.length} / {REF_FIELDS.length} fields</Chip>
          </div>
          {!written ? (
            <button onClick={write} disabled={locked} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#005386", color: "#ffffff", border: "none", borderRadius: 9, padding: "10px 17px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS, ...dis(true) }}><Database size={15} /> Write the product sheet to the Dassault Centric PLM</button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: T.panel2, border: `1px solid #00a3c455`, borderRadius: 12, padding: "13px 16px" }}>
              <WhiteBadge><img src={CENTRIC_LOGO} alt="Dassault Centric" style={{ height: 30, width: "auto", display: "block" }} /></WhiteBadge>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Product sheet written to the Dassault Centric PLM</span>
                  <Chip color="#005386">PLM synced</Chip>
                </div>
                <div style={{ fontSize: 11.5, color: T.faint, marginTop: 3, lineHeight: 1.45 }}>The {REF_FIELDS.length} referencing fields of “{sel.name}” ({fields.codif}) are saved — description, programme, colours, sizes, customs, category, design, fabric, process, gender, codification, label, life moment, event and BOM.</div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: MONO, fontWeight: 700, color: T.ok, background: `${T.ok}1c`, border: `1px solid ${T.ok}55`, padding: "5px 11px", borderRadius: 999, flexShrink: 0 }}><Check size={13} /> Written</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Page 2 — Go to Market
   ============================================================ */
function GTMPage({ st }) {
  const sel = st.sel;
  const scen = st.recoFor(sel);
  const [msgs, setMsgs] = useState([{ me: false, t: "Hello! I'm the supply agent for the Baby offer. Ask me your questions: recommendation, costs, lead times, CO₂, risks…" }]);
  const [inp, setInp] = useState("");
  const answer = (q) => {
    const s = q.toLowerCase();
    if (/(recommand|recommend|conseil|advi|meilleur|best|optimal|choisir|choose|lequel|which|préconis|preconis|suggest)/.test(s))
      return `${st.lowCarbon ? "Low-carbon strategy active → I favour local sourcing. " : ""}I recommend “${scen.name}”: ${eur(scen.cost)}/pc · ${st.leadOf(scen)} d · stock-out ${st.rupOf(scen)} %. ${scen.note}`;
    if (/(prix|price|coût|cout|cost|revient)/.test(s))
      return sel.scenarios.map((x) => `${x.name}: ${eur(x.cost)}/pc`).join(" · ");
    if (/(délai|delai|lead|temps|time)/.test(s))
      return sel.scenarios.map((x) => `${x.name}: ${st.leadOf(x)} d`).join(" · ");
    if (/(co2|carbone|carbon|empreinte|footprint)/.test(s))
      return `Current footprint: ${st.co2Of(sel)} kg/pc${st.lowCarbon ? " (reduced by the Low-carbon strategy)" : ""}. Nearshore sourcing sharply reduces transport.`;
    if (/(risque|risk|rupture|stock-out|stockout|alea|aléa)/.test(s))
      return sel.scenarios.map((x) => `${x.name}: stock-out ${st.rupOf(x)} %`).join(" · ");
    return `For “${sel.name}” (${u(st.volOf(sel))} units · PVI ${eur(st.pvcOf(sel))}), ask me for a recommendation, costs, lead times, the CO₂ footprint or the risks.`;
  };
  const send = () => { if (!inp.trim()) return; const q = inp.trim(); setMsgs((m) => [...m, { me: true, t: q }, { me: false, t: answer(q) }]); setInp(""); };

  return (
    <div>
      <PageHeader title="Go to market" desc="Store launch brief, volume and selling price, then discussion with the supply agent." expert={EXPERTS.supply} />
      <LowCarbonBanner st={st} context="gtm" prod={sel} />

      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <ClipboardList size={15} color={T.blue} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Collection structures awaiting a sourcing scenario</span>
          <span style={{ fontSize: 11.5, color: T.faint }}>click a collection structure to arbitrate it in the panel below</span>
        </div>
        <div style={{ maxHeight: 300, overflowY: "auto", overflowX: "auto", border: `1px solid ${T.lineSoft}`, borderRadius: 10 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr>{["Collection structure", "Segment", "Volume", "PVI", "Supply status"].map((c, j) => (
              <th key={c} style={{ position: "sticky", top: 0, background: T.panel, zIndex: 1, textAlign: j === 0 ? "left" : "center", padding: "8px 10px", fontSize: 10, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>{c}</th>
            ))}</tr></thead>
            <tbody>
              {PRODUITS.map((p) => {
                const on = p.id === st.selId;
                return (
                  <tr key={p.id} onClick={() => st.setSelId(p.id)} style={{ cursor: "pointer", background: on ? `${T.blue}12` : "transparent" }}>
                    <td style={{ padding: "8px 10px", borderBottom: `1px solid ${T.lineSoft}` }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                        <span style={{ width: 26, height: 26, borderRadius: 7, display: "grid", placeItems: "center", fontSize: 13, background: `${p.color}33`, border: `1px solid ${p.color}88` }}>{p.img}</span>
                        <span style={{ fontWeight: 700, color: T.ink, maxWidth: 280, display: "inline-block" }}>{p.name}</span>
                      </span>
                    </td>
                    <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}><Chip color={p.segment === "Nightwear" ? T.accent : p.segment === "Licences" ? T.human : T.silver}>{p.segment}</Chip></td>
                    <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{u(st.volOf(p))}</td>
                    <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{eur(st.pvcOf(p))}</td>
                    <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}>
                      {st.validated.has(p.id) ? <Chip color={T.ok}>KFI validated</Chip> : st.returned.has(p.id) ? <Chip color={T.bad}>Sent back</Chip> : st.submitted.has(p.id) ? <Chip color={T.warn}>Submitted to KFI</Chip> : <Chip color={T.silver}>To arbitrate</Chip>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: T.faint, fontFamily: MONO }}>{PRODUITS.length} collection structures · select one, then pick a scenario to submit it to KFI</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Factory size={15} color={T.blue} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Supply scenario — {sel.name}</span>
          </div>
          <div style={{ fontSize: 12, color: T.sub, marginBottom: 12 }}>
            Collection structure: <strong style={{ color: T.ink }}>{sel.name}</strong> · volume <span style={{ fontFamily: MONO }}>{u(st.volOf(sel))} units</span> · PVI <span style={{ fontFamily: MONO }}>{eur(st.pvcOf(sel))}</span>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <RuleStatus st={st} area="Supply" kpi="price" label="Price" action={false} /><RuleStatus st={st} area="Go to Market" kpi="volume" label="Volume" action={false} /><RuleStatus st={st} area="Supply" kpi="sourcing" label="Sourcing" action={false} /><RuleStatus st={st} area="Offer & Collection" kpi="footprint" productId={sel.id} label="Footprint" action={false} />
          </div>
          {ruleStatus(st.breaches, { area: ["Supply", "Go to Market", "Offer & Collection"], productId: sel.id }).list.slice(0, 2).map((b) => <div key={b.label} style={{ fontSize: 10.5, color: b.level === "watch" ? T.warn : T.bad, marginBottom: 6, lineHeight: 1.4 }}>{b.label} → {b.action}</div>)}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            <label style={{ flex: "1 1 140px", fontSize: 10.5, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Volume (units)
              <input type="number" value={st.volOf(sel)} onChange={(e) => st.setVol(sel.id, +e.target.value || 0)} style={{ display: "block", width: "100%", marginTop: 5, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: MONO, fontSize: 13, color: T.ink, outline: "none", boxSizing: "border-box" }} />
            </label>
            <label style={{ flex: "1 1 140px", fontSize: 10.5, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>PVI (€)
              <input type="number" step="0.5" value={st.pvcOf(sel)} onChange={(e) => st.setPvc(sel.id, +e.target.value || 0)} style={{ display: "block", width: "100%", marginTop: 5, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: MONO, fontSize: 13, color: T.ink, outline: "none", boxSizing: "border-box" }} />
            </label>
          </div>
          <span style={microLbl}>Sourcing scenarios</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {sel.scenarios.map((x) => {
              const chosen = st.scenOf(sel) === x.id;
              const isReco = scen.id === x.id;
              return (
                <button key={x.id} onClick={() => st.setScen(sel.id, x.id)} style={{ textAlign: "left", cursor: "pointer", background: chosen ? `${T.blue}12` : T.panel2, border: `1px solid ${chosen ? T.blue : T.line}`, borderRadius: 10, padding: "11px 13px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <Truck size={14} color={T.blue} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{x.name}</span>
                    {isReco && <Chip color={st.lowCarbon ? T.ok : T.blue}>{st.lowCarbon ? "Low-carbon reco" : "Recommended"}</Chip>}
                    {chosen && <Check size={14} color={T.blue} style={{ marginLeft: "auto" }} />}
                  </div>
                  <div style={{ fontSize: 11, color: T.sub, marginTop: 5, fontFamily: MONO }}>{eur(x.cost)}/pc · {st.leadOf(x)} d · stock-out {st.rupOf(x)} % · {x.splitProche}% nearshore · {x.usine}</div>
                  <div style={{ fontSize: 10.5, color: T.faint, marginTop: 4, lineHeight: 1.4 }}>{x.note}</div>
                </button>
              );
            })}
          </div>
          <button onClick={() => st.submit(sel.id)} disabled={st.submitted.has(sel.id) && !st.returned.has(sel.id)} style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: st.submitted.has(sel.id) && !st.returned.has(sel.id) ? T.line : T.blue, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}>
            <Send size={14} /> {st.submitted.has(sel.id) && !st.returned.has(sel.id) ? "Already submitted to KFI" : "Submit the scenario to KFI"}
          </button>
        </div>

        <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <MessageCircle size={15} color={T.human} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Supply agent — chat</span>
          </div>
          <div style={{ flex: 1, minHeight: 180, maxHeight: 300, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: "85%", background: m.me ? `${T.blue}18` : T.panel2, border: `1px solid ${m.me ? T.blue + "44" : T.line}`, borderRadius: 10, padding: "8px 11px", fontSize: 12, color: T.ink, lineHeight: 1.5 }}>{m.t}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="e.g. what do you recommend?" style={{ flex: 1, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 12px", fontSize: 12.5, color: T.ink, outline: "none", fontFamily: SANS }} />
            <button onClick={send} style={{ cursor: "pointer", background: T.human, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 13px", display: "grid", placeItems: "center" }}><Send size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Page 3 — Supply (ITFAS validation)
   ============================================================ */
function ItfasPage({ st, embedded }) {
  const rows = PRODUITS.filter((p) => st.submitted.has(p.id));
  const sel = rows.find((p) => p.id === st.selId) || rows[0];
  const scen = sel ? (sel.scenarios.find((x) => x.id === st.scenOf(sel)) || st.recoFor(sel)) : null;
  const cap = sel ? (st.volOf(sel) < 250000
    ? { v: "Capacity available", c: T.ok, t: "Volume absorbable by the current supplier network without strain." }
    : st.volOf(sel) < 420000
      ? { v: "Capacity adequate", c: T.warn, t: "Sustained volume: set the production phasing and secure the material." }
      : { v: "Capacity tight", c: T.bad, t: "High volume vs nearshore capacity: Far-East import + managed replenishment mix recommended, secure the material upstream." }) : null;

  return (
    <div>
      <PageHeader title="Supply" desc="Price validations transferred by Go to market — to be carried out by KFI." expert={EXPERTS.supply} />
      <LowCarbonBanner st={st} context="supply" prod={sel || PRODUITS[0]} />

      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <ShoppingBag size={15} color={T.blue} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Files transferred by Go to Market</span>
        </div>
        {rows.length === 0 ? (
          <div style={{ fontSize: 12, color: T.faint }}>No file pending. Submit a scenario from the “Go to market” page.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr>{["Collection structure", "Segment", "Volume", "Selling price", "Status"].map((c, j) => (
                <th key={c} style={{ textAlign: j === 0 ? "left" : "center", padding: "8px 10px", fontSize: 10, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>{c}</th>
              ))}</tr></thead>
              <tbody>
                {rows.map((p) => {
                  const on = sel && p.id === sel.id;
                  return (
                    <tr key={p.id} onClick={() => st.setSelId(p.id)} style={{ cursor: "pointer", background: on ? `${T.blue}12` : "transparent" }}>
                      <td style={{ padding: "8px 10px", borderBottom: `1px solid ${T.lineSoft}`, fontWeight: 700, color: T.ink }}>{p.img} {p.name}</td>
                      <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}><Chip color={p.segment === "Nightwear" ? T.accent : p.segment === "Licences" ? T.human : T.silver}>{p.segment}</Chip></td>
                      <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{u(st.volOf(p))}</td>
                      <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{eur(st.pvcOf(p))}</td>
                      <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}>
                        {st.validated.has(p.id) ? <Chip color={T.ok}>Validated</Chip> : st.returned.has(p.id) ? <Chip color={T.bad}>Sent back</Chip> : <Chip color={T.warn}>Pending</Chip>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {sel && scen && (
        <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <Factory size={15} color={T.blue} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Supply scenario — {sel.name}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12, marginBottom: 14 }}>
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px" }}>
              <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, textTransform: "uppercase", marginBottom: 6 }}>{st.lowCarbon ? "Recommended scenario (Low carbon)" : "Selected scenario"}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>{scen.name}</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: MONO, marginTop: 5 }}>{eur(scen.cost)}/pc · {st.leadOf(scen)} d · stock-out {st.rupOf(scen)} % · {scen.splitProche}% nearshore</div>
              <div style={{ fontSize: 10.5, color: T.faint, marginTop: 5 }}>{scen.usine} · focus: {scen.maitrise}</div>
              <div style={{ marginTop: 8 }}><RuleStatus st={st} area="Supply" kpi="margin" label="Landed cost" /></div>
            </div>
            <div style={{ background: T.panel2, border: `1px solid ${cap.c}55`, borderRadius: 11, padding: "12px 14px" }}>
              <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, textTransform: "uppercase", marginBottom: 6 }}>Capacity verdict</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: cap.c }}>{cap.v}</div>
              <div style={{ fontSize: 11, color: T.sub, marginTop: 5, lineHeight: 1.5 }}>{cap.t}</div>
              <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}><Chip color={cap.c}>Capacity · {cap.c === T.ok ? "Compliant" : cap.c === T.warn ? "Watch" : "Breach"}</Chip><RuleStatus st={st} area="KFI" kpi="supplier" label="Supplier risk" /></div>
            </div>
          </div>
          {!st.validated.has(sel.id) ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => st.validate(sel.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.ok, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Check size={14} /> Validate the price</button>
              <button onClick={() => st.sendBack(sel.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.panel2, color: T.bad, border: `1px solid ${T.bad}66`, borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 700, fontFamily: SANS }}><RotateCcw size={14} /> Send back to Go to Market</button>
            </div>
          ) : (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${T.ok}14`, border: `1px solid ${T.ok}55`, borderRadius: 10, padding: "9px 14px", fontSize: 12.5, fontWeight: 700, color: T.ok }}><BadgeCheck size={15} /> Price validated by KFI — the collection structure switches to “Validated” across the whole cockpit.</div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   KFI tab — Production Panel (faithful to the Venso screens)
   ============================================================ */
const GRADE_C = { A: "#3fb27f", B: "#4B90CD", C: "#dfa93f", D: "#e05a5a", E: "#e05a5a" };
const GradeChip = ({ g }) => (
  <span style={{ display: "inline-grid", placeItems: "center", width: 18, height: 18, borderRadius: 5, fontSize: 10, fontWeight: 800, fontFamily: MONO, color: GRADE_C[g], background: `${GRADE_C[g]}1c`, border: `1px solid ${GRADE_C[g]}55` }}>{g}</span>
);
function Spark({ pts, color }) {
  const w = 120, h = 30, mn = Math.min(...pts), mx = Math.max(...pts);
  const xy = pts.map((v, i) => `${(i / (pts.length - 1)) * w},${h - ((v - mn) / (mx - mn || 1)) * (h - 8) - 4}`).join(" ");
  return <svg width={w} height={h} style={{ display: "block" }}><polyline points={xy} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" /></svg>;
}
/* Which Group rule (perfRules breach) each trajectory axis must stay consistent with */
const KFI_RULE_MAP = { Quality: { area: "KFI", kpi: "supplier" }, Cost: { area: "Supply", kpi: "margin" }, "Lead time": { area: "Supply", kpi: "sourcing" }, "Env. compliance": { area: ["KFI", "Go to Market"], kpi: "carbon" } };
const KPI_TRAJ = [
  { t: "Quality", val: "86%", sub: "above C", c: "#3fb27f", note: "14% of the panel below the threshold — 3 suppliers carrying 12% of the volume", tl: [["6m", "89%"], ["18m", "93%"], ["36m", "95%"]], spark: [3, 4, 5, 6, 8, 10] },
  { t: "Cost", val: "−1.5", sub: "pts vs context", c: "#3fb27f", note: "clear outperformance — context at +5.5%, actual prices at +4%", tl: [["6m", "−1.2"], ["18m", "−0.8"], ["36m", "−1.5"]], spark: [7, 4, 7, 3, 6, 4] },
  { t: "Lead time", val: "3.2", sub: "% shortage", c: "#dfa93f", note: "products unavailable in store — estimated revenue impact €2.1M", tl: [["6m", "2.8"], ["18m", "2.1"], ["36m", "1.5"]], spark: [9, 8, 7, 6, 5, 4] },
  { t: "Env. compliance", val: "12 / 42", sub: "CS3D ready", c: "#0053A0", note: "30 suppliers to requalify by 2027", tl: [["6m", "18 / 42"], ["18m", "31 / 42"], ["36m", "40 / 42"]], spark: [2, 3, 4, 4, 6, 8] },
];
const ALERTES = [
  { dot: "#e05a5a", title: "Quality wall — Shenzhen Garments", tag: "New", tagC: "#4B90CD", txt: "Production stopped · 45K pieces blocked · 2 suppliers available to absorb", cta: "View →" },
  { dot: "#dfa93f", title: "Social audit pending — Ho Chi Minh Textiles", tag: "In progress", tagC: "#dfa93f", txt: "Action plan required within 15 days · minimum threshold not yet evidenced", cta: "View →" },
  { dot: "#dfa93f", title: "Non-conformity batch #4712 — Colombo Apparel", tag: "New", tagC: "#4B90CD", txt: "Defect rate 8% vs 2% threshold · 12K pieces to inspect", cta: "View →" },
];
const DECISIONS = [
  { dot: "#e05a5a", title: "Turkey inflation — Anatolia Textiles", tag: "Macro", tagC: "#e05a5a", txt: "+15% cost · −20% available capacity · 300 kpcs of business plan exposed", cta: "View scenarios →", strong: "+15% cost" },
  { dot: "#7fa3c4", title: "Source 2 low-carbon knit suppliers", tag: "CAPACITY", tagC: "#7fa3c4", txt: "−35% vs certified need at 18 months", cta: "Explore →" },
  { dot: "#7fa3c4", title: "Review Shenzhen Garments' contract", tag: "PANEL", tagC: "#7fa3c4", txt: "Score C for 2 cycles · traceability 78% · 21% of the business plan", cta: "Explore →" },
  { dot: "#dfa93f", title: "S1 2027 orders below Shenzhen Garments' business plan", tag: "BUSINESS PLAN", tagC: "#dfa93f", txt: "130 kpcs ordered vs 220 kpcs contracted · 50 kpcs off-panel to absorb", cta: "Arbitrate →", strong: "130 kpcs" },
];
const PROD_SUPPLIERS = [
  { id: "anatolia", name: "Anatolia Textiles", g: "A", pays: "Turkey", statut: "Open", audit: "Validated", score: 92, prix2027: true },
  { id: "shenzhen", name: "Shenzhen Garments", g: "C", pays: "China", statut: "Open", audit: "Validated", score: 78, prix2027: true },
  { id: "colombo", name: "Colombo Apparel", g: "B", pays: "Sri Lanka", statut: "Open", audit: "Validated", score: 88, prix2027: true },
  { id: "taipei", name: "Taipei Knitworks", g: "A", pays: "Taiwan", statut: "Open", audit: "Validated", score: 95, prix2027: true },
  { id: "hcm", name: "Ho Chi Minh Textiles", g: "B", pays: "Vietnam", statut: "Onboarding", audit: "In progress", score: 84, prix2027: false },
];
const AuditChip = ({ s }) => {
  const c = s === "Validated" ? T.ok : s === "In progress" ? T.blue : T.warn;
  return <Chip color={c}>{s}</Chip>;
};
const VensoTag = ({ txt }) => (
  <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: MONO, fontSize: 11, color: T.human }}><Sparkles size={12} /> {txt}</span>
);

/* ============================================================
   KFI — Partner business plans × in-season forecasts (RELEX)
   (reconciling the long industrial cycle with the short commercial cycle)
   ============================================================ */
const kp = (n) => `${u(Math.round(n / 1000))} kpcs`;
const mp = (n) => `${(n / 1e6).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} M pcs`;
const sg = (n, d = 1) => { const f = 10 ** d, r = Math.round(n * f) / f; return `${r > 0 ? "+" : r < 0 ? "−" : ""}${Math.abs(r).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d })}`; };
const sp = (n, d = 1) => `${sg(n, d)} %`;
const pc = (n, d = 1) => `${Number(n).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d })} %`;

const KFI_HORS = "hors";
/* Aggregated 2027 targets (editable working assumptions) and model parameters */
const KFI_TARGETS = { quality: 95, traceability: 95, flexPremium: 0.02, carbonRushFactor: 0.5 };
const KFI_PARTNER_PLANS = [
  { id: "anatolia", supplier: "Anatolia Textiles", country: "Turkey", grade: "A", family: "Cotton knitwear", plannedVolume: 300000, minCommitment: 270000, maxCapacity: 360000, targetCost: 4.95, qualityTarget: 95, traceability: 100, carbon: 1.3, rseStatus: "Validated", rseOk: true, rseInProgress: false, complianceStatus: "CS3D ready", complianceValidated: true, complianceWatch: false, partnershipHorizon: "36 months", developmentAction: "2027-2029 framework contract with knitwear volume tiers" },
  { id: "taipei", supplier: "Taipei Knitworks", country: "Taiwan", grade: "A", family: "Reactive short runs", plannedVolume: 140000, minCommitment: 120000, maxCapacity: 180000, targetCost: 6.2, qualityTarget: 97, traceability: 100, carbon: 1.6, rseStatus: "Validated · renewable energy", rseOk: true, rseInProgress: false, complianceStatus: "Validated", complianceValidated: true, complianceWatch: false, partnershipHorizon: "36 months", developmentAction: "Reactive line reserved for S1 2027, replenishment within 4 weeks" },
  { id: "colombo", supplier: "Colombo Apparel", country: "Sri Lanka", grade: "B", family: "Velour and nightwear", plannedVolume: 240000, minCommitment: 210000, maxCapacity: 280000, targetCost: 5.25, qualityTarget: 93, traceability: 92, carbon: 1.7, rseStatus: "Environmental progress plan C→B", rseOk: true, rseInProgress: true, complianceStatus: "Validated", complianceValidated: true, complianceWatch: false, partnershipHorizon: "18 months", developmentAction: "Environmental milestone C→B in March 2027, AI coaching" },
  { id: "shenzhen", supplier: "Shenzhen Garments", country: "China", grade: "C", family: "Permanent high volumes", plannedVolume: 220000, minCommitment: 220000, maxCapacity: 330000, targetCost: 4.35, qualityTarget: 91, traceability: 78, carbon: 1.85, rseStatus: "Audit valid", rseOk: true, rseInProgress: false, complianceStatus: "Traceability to strengthen", complianceValidated: true, complianceWatch: true, partnershipHorizon: "12 months", developmentAction: "Yarn traceability at 90% before S2 2027, social audit to reschedule" },
  { id: "hcm", supplier: "Ho Chi Minh Textiles", country: "Vietnam", grade: "B", family: "Underwear and basics", plannedVolume: 150000, minCommitment: 130000, maxCapacity: 200000, targetCost: 4.7, qualityTarget: 94, traceability: 95, carbon: 1.75, rseStatus: "Validated", rseOk: true, rseInProgress: false, complianceStatus: "Social audit in progress", complianceValidated: true, complianceWatch: true, partnershipHorizon: "24 months", developmentAction: "Complete the social audit and the CS3D file before S1 2027" },
];
/* Off-panel route: non-qualified supplier, attractive spot price but compliance and traceability not validated, air freight */
const KFI_OFF_PANEL = { id: KFI_HORS, supplier: "Off-panel — emergency sourcing", targetCost: 5.1, qualityTarget: 86, traceability: 15, carbon: 3.08, complianceValidated: false };

const kfiFam = (family, plan, forecast, lead, confidence, firm) => ({ family, plan, forecast, lead, confidence, firm });
/* Forecast scenarios received from RELEX (pieces) */
const KFI_FORECAST_SCENARIOS = [
  { id: "base", name: "Base", total: 1050000, note: "Initial S1 2027 plan", families: [
    kfiFam("Nightwear", 345000, 345000, "10 wk", "High", 230000),
    kfiFam("Underwear", 425000, 425000, "9 wk", "High", 290000),
    kfiFam("Licences", 170000, 170000, "14 wk", "Medium", 100000),
    kfiFam("Mass-market capsule", 110000, 110000, "7 wk", "Medium", 50000),
  ] },
  { id: "pic", name: "Demand peak", total: 1240000, note: "Acceleration in Nightwear and Underwear, lead time unchanged", families: [
    kfiFam("Nightwear", 345000, 420000, "10 wk", "High", 260000),
    kfiFam("Underwear", 425000, 500000, "9 wk", "High", 310000),
    kfiFam("Licences", 170000, 180000, "14 wk", "Medium", 120000),
    kfiFam("Mass-market capsule", 110000, 140000, "7 wk", "Low", 60000),
  ] },
  { id: "retour", name: "Downturn", total: 890000, note: "Licences decline, risk of missing minimum commitments", families: [
    kfiFam("Nightwear", 345000, 320000, "12 wk", "Medium", 200000),
    kfiFam("Underwear", 425000, 390000, "10 wk", "Medium", 250000),
    kfiFam("Licences", 170000, 110000, "16 wk", "Low", 70000),
    kfiFam("Mass-market capsule", 110000, 70000, "9 wk", "Low", 30000),
  ] },
];
/* Initial sample allocation per scenario (pieces) — family × partner, "hors" = off-panel emergency sourcing */
const KFI_DEFAULT_ALLOC = {
  base: {
    "Nightwear": { anatolia: 85000, taipei: 25000, colombo: 200000, shenzhen: 0, hcm: 35000, hors: 0 },
    "Underwear": { anatolia: 175000, taipei: 30000, colombo: 5000, shenzhen: 100000, hcm: 115000, hors: 0 },
    "Licences": { anatolia: 40000, taipei: 85000, colombo: 30000, shenzhen: 15000, hcm: 0, hors: 0 },
    "Mass-market capsule": { anatolia: 0, taipei: 0, colombo: 5000, shenzhen: 105000, hcm: 0, hors: 0 },
  },
  pic: {
    "Nightwear": { anatolia: 100000, taipei: 30000, colombo: 220000, shenzhen: 0, hcm: 50000, hors: 0 },
    "Underwear": { anatolia: 200000, taipei: 40000, colombo: 10000, shenzhen: 90000, hcm: 110000, hors: 0 },
    "Licences": { anatolia: 45000, taipei: 95000, colombo: 30000, shenzhen: 0, hcm: 0, hors: 0 },
    "Mass-market capsule": { anatolia: 0, taipei: 0, colombo: 10000, shenzhen: 40000, hcm: 0, hors: 50000 },
  },
  retour: {
    "Nightwear": { anatolia: 75000, taipei: 25000, colombo: 190000, shenzhen: 0, hcm: 30000, hors: 0 },
    "Underwear": { anatolia: 160000, taipei: 30000, colombo: 10000, shenzhen: 90000, hcm: 100000, hors: 0 },
    "Licences": { anatolia: 30000, taipei: 65000, colombo: 15000, shenzhen: 0, hcm: 0, hors: 0 },
    "Mass-market capsule": { anatolia: 0, taipei: 0, colombo: 0, shenzhen: 70000, hcm: 0, hors: 0 },
  },
};
const KFI_VERDICT_RANK = { Compliant: 0, "Under pressure": 1, Violation: 2 };
const KFI_VERDICT_C = { Compliant: "#3fb27f", "Under pressure": "#dfa93f", Violation: "#e05a5a" };
const kfiWorst = (...vs) => vs.reduce((w, v) => (KFI_VERDICT_RANK[v] > KFI_VERDICT_RANK[w] ? v : w), "Compliant");
const kfiSum = (arr, f) => arr.reduce((s, x) => s + (f ? f(x) : x), 0);

/* Pure function: confronts partner commitments (plans) with the RELEX forecast (forecast) and the allocation (family × route).
   policy = { derogation: bool (off-panel tolerated), catchUp: { [partnerId]: bool } (contractual catch-up plan formalised),
              targets: { quality, traceability } (editable 2027 targets, defaults to KFI_TARGETS) } */
function computeKfiReconciliation(plans, forecast, allocation, policy = {}) {
  const derogation = !!policy.derogation;
  const catchUp = policy.catchUp || {};
  const targets = { ...KFI_TARGETS, ...(policy.targets || {}) };
  const rows = forecast.families;
  const totalForecast = kfiSum(rows, (x) => x.forecast);
  const totalPlan = kfiSum(rows, (x) => x.plan);
  const totalFirm = kfiSum(rows, (x) => x.firm);
  const planDeltaPct = totalPlan ? ((totalForecast - totalPlan) / totalPlan) * 100 : 0;
  const allocOf = (id) => kfiSum(rows, (x) => (allocation[x.family] || {})[id] || 0);
  const horsPanel = allocOf(KFI_HORS);

  /* --- partner-by-partner reading --- */
  const partners = plans.map((p) => {
    const alloc = allocOf(p.id);
    const overload = Math.max(0, alloc - p.maxCapacity);
    const margin = p.maxCapacity > 0 ? ((p.maxCapacity - alloc) / p.maxCapacity) * 100 : 0;
    const minGap = alloc - p.minCommitment;
    const planGap = alloc - p.plannedVolume;
    const overPlan = Math.max(0, planGap);
    const nearCapacity = overload === 0 && margin < 10;
    const shortfall = minGap < 0;
    const covered = !!catchUp[p.id];
    const issues = [];
    let verdict = "Compliant";
    if (overload > 0) { verdict = "Violation"; issues.push(`capacity exceeded by ${kp(overload)}`); }
    if (alloc > 0 && !p.complianceValidated) { verdict = "Violation"; issues.push("compliance not validated"); }
    if (alloc > 0 && !p.rseOk) { verdict = "Violation"; issues.push("CSR policy not met"); }
    if (verdict !== "Violation") {
      if (nearCapacity) { verdict = "Under pressure"; issues.push(`capacity headroom ${pc(margin)}`); }
      if (shortfall) { verdict = "Under pressure"; issues.push(`minimum commitment under-delivered by ${kp(-minGap)}${covered ? " · catch-up plan formalised" : ""}`); }
      if (alloc > 0 && p.traceability < 90) { verdict = "Under pressure"; issues.push(`traceability ${pc(p.traceability, 0)} below the 90 % threshold`); }
      if (alloc > 0 && p.qualityTarget < targets.quality - 3) { verdict = "Under pressure"; issues.push(`quality target ${pc(p.qualityTarget, 0)} below the ${pc(targets.quality - 3, 0)} floor`); }
      if (p.rseInProgress && nearCapacity) issues.push("CSR plan to protect");
    }
    const capaTxt = overload > 0 ? `Capacity exceeded by ${kp(overload)}` : nearCapacity ? `Close to capacity (headroom ${pc(margin)})` : `Within capacity (headroom ${pc(margin)})`;
    const planTxt = planGap === 0 ? "at business plan" : `${sg(planGap / 1000, 0)} kpcs vs business plan`;
    const text = shortfall ? `${capaTxt} · ${kp(-minGap)} below the minimum commitment` : `${capaTxt} · ${planTxt}`;
    return { ...p, alloc, overload, margin, minGap, planGap, overPlan, nearCapacity, shortfall, catchUp: covered, verdict, issues, text };
  });

  /* --- off-panel and uncovered routes --- */
  const horsVerdict = horsPanel === 0 ? "Compliant" : derogation ? "Under pressure" : "Violation";
  const horsText = horsPanel === 0 ? "No off-panel volume" : derogation ? "Purchasing-director derogation · compliance and traceability not validated" : "Policy violation: non-qualified supplier";
  const families = rows.map((x) => {
    const a = allocation[x.family] || {};
    const allocated = kfiSum(Object.values(a));
    return { family: x.family, forecast: x.forecast, firm: x.firm, allocated, uncovered: x.forecast - allocated };
  });
  const uncovered = kfiSum(families, (f) => Math.max(0, f.uncovered));
  const overAllocated = kfiSum(families, (f) => Math.max(0, -f.uncovered));
  const panelAllocated = kfiSum(partners, (p) => p.alloc);
  const allocated = panelAllocated + horsPanel;
  const coverage = totalForecast ? (panelAllocated / totalForecast) * 100 : 0;
  const offPolicy = horsPanel + kfiSum(partners, (p) => (p.verdict === "Violation" ? p.alloc : 0));
  const offPolicyPct = totalForecast ? (offPolicy / totalForecast) * 100 : 0;

  /* --- allocation-weighted projections --- */
  const sources = [...partners, { ...KFI_OFF_PANEL, alloc: horsPanel, overPlan: 0, plannedVolume: 0 }];
  const planVol = kfiSum(plans, (p) => p.plannedVolume) || 1;
  const wPlan = (k) => kfiSum(plans, (p) => p.plannedVolume * p[k]) / planVol;
  const wProj = (k, extra = 0) => (allocated ? (kfiSum(sources, (s) => s.alloc * s[k]) + extra) / allocated : wPlan(k));
  const premium = KFI_TARGETS.flexPremium * kfiSum(partners, (p) => p.overPlan * p.targetCost);
  const rush = KFI_TARGETS.carbonRushFactor * kfiSum(partners, (p) => p.overPlan * p.carbon);
  const planCost = wPlan("targetCost"), projCost = wProj("targetCost", premium);
  const planQuality = wPlan("qualityTarget"), projQuality = wProj("qualityTarget");
  const planTrace = wPlan("traceability"), projTrace = wProj("traceability");
  const planCarbon = wPlan("carbon"), projCarbon = wProj("carbon", rush);
  const costDeltaPct = planCost ? (projCost / planCost - 1) * 100 : 0;
  const carbonDeltaPct = planCarbon ? (projCarbon / planCarbon - 1) * 100 : 0;
  const nonValidated = kfiSum(sources, (s) => (s.complianceValidated ? 0 : s.alloc));
  const complianceShare = allocated ? ((allocated - nonValidated) / allocated) * 100 : 100;

  /* --- causes: who carries each gap --- */
  const shareA = (s) => (allocated ? s.alloc / allocated : 0);
  const shareP = (s) => (s.plannedVolume || 0) / planVol;
  const label = (s) => (s.id === KFI_HORS ? "emergency sourcing" : s.supplier);
  const mixWord = (s) => { const d = shareA(s) - shareP(s); return d > 0 && s.planGap > 0 ? `${label(s)} up (${sg(s.planGap / 1000, 0)} kpcs` : d > 0 ? `${label(s)} share up (${pc(shareP(s) * 100)} → ${pc(shareA(s) * 100)}` : `${label(s)} down (${sg(s.planGap / 1000, 0)} kpcs`; };
  const costCarriers = sources.map((s) => ({ id: s.id, impact: (shareA(s) - shareP(s)) * (s.targetCost - planCost) + (allocated ? (KFI_TARGETS.flexPremium * (s.overPlan || 0) * s.targetCost) / allocated : 0), s }))
    .filter((c) => c.impact > 0.004).sort((a, b) => b.impact - a.impact)
    .map((c) => ({ id: c.id, txt: `${c.s.id === KFI_HORS ? `${label(c.s)} (${kp(c.s.alloc)} at ${fr2(c.s.targetCost)} €)` : `${mixWord(c.s)} at ${fr2(c.s.targetCost)} €${c.s.overPlan > 0 ? ", flexibility surcharge" : ""})`}: ${sg(c.impact, 2)} €/pc` }));
  const gapCarriers = (k, target, unit) => sources.filter((s) => s.alloc > 0 && s[k] < target)
    .map((s) => ({ id: s.id, pts: (s.alloc * (target - s[k])) / (allocated || 1), s })).sort((a, b) => b.pts - a.pts)
    .map((c) => ({ id: c.id, txt: `${label(c.s)} (${pc(c.s[k], 0)}, ${kp(c.s.alloc)}): ${sg(-c.pts, 1)} ${unit}` }));
  const qualityCarriers = gapCarriers("qualityTarget", targets.quality, "pt");
  const traceCarriers = gapCarriers("traceability", targets.traceability, "pt");
  const complianceCarriers = sources.filter((s) => s.alloc > 0 && (!s.complianceValidated || s.complianceWatch)).map((s) => ({ id: s.id, txt: s.complianceValidated ? `${label(s)}: ${s.complianceStatus} (${kp(s.alloc)})` : `${label(s)}: ${kp(s.alloc)} non-qualified${derogation ? " under derogation" : ""}` }));
  const carbonCarriers = sources.map((s) => ({ id: s.id, impact: (shareA(s) - shareP(s)) * (s.carbon - planCarbon) + (allocated ? (KFI_TARGETS.carbonRushFactor * (s.overPlan || 0) * s.carbon) / allocated : 0), s }))
    .filter((c) => c.impact > 0.004).sort((a, b) => b.impact - a.impact)
    .map((c) => ({ id: c.id, txt: `${c.s.id === KFI_HORS ? `${label(c.s)} by air (${fr2(c.s.carbon)} kg/pc)` : c.s.overPlan > 0 ? `expedited flows on ${kp(c.s.overPlan)} above plan at ${label(c.s)}` : `${mixWord(c.s)} at ${fr2(c.s.carbon)} kg/pc)`}: ${sg((c.impact / (planCarbon || 1)) * 100, 1)} %` }));
  partners.forEach((p) => { if (p.rseInProgress && p.nearCapacity) carbonCarriers.push({ id: p.id, txt: `${p.supplier} saturated: environmental milestone C→B to protect` }); });

  /* --- verdict per dimension: the global verdict is the worst one --- */
  const capaV = partners.some((p) => p.overload > 0) ? "Violation" : partners.some((p) => p.nearCapacity || p.shortfall) ? "Under pressure" : "Compliant";
  const compV = (horsPanel > 0 && !derogation) || partners.some((p) => p.alloc > 0 && !p.complianceValidated) ? "Violation" : horsPanel > 0 || partners.some((p) => p.alloc > 0 && p.complianceWatch) ? "Under pressure" : "Compliant";
  const rseV = partners.some((p) => p.alloc > 0 && !p.rseOk) ? "Violation" : carbonDeltaPct > 5 || partners.some((p) => p.rseInProgress && p.nearCapacity) ? "Under pressure" : "Compliant";
  const qualV = projQuality < targets.quality - 5 ? "Violation" : projQuality < targets.quality ? "Under pressure" : "Compliant";
  const traceV = projTrace < targets.traceability - 5 ? "Violation" : projTrace < targets.traceability ? "Under pressure" : "Compliant";
  const dims = [
    { k: "capacite", label: "Capacity", verdict: capaV, why: capaV === "Compliant" ? "capacities and minimums respected" : partners.filter((p) => p.overload > 0 || p.nearCapacity || p.shortfall).map((p) => `${p.supplier}: ${p.issues[0]}`).join(" · ") },
    { k: "compliance", label: "Compliance", verdict: compV, why: compV === "Compliant" ? "100 % of the volume on qualified partners" : complianceCarriers.map((c) => c.txt).join(" · ") },
    { k: "rse", label: "CSR / carbon", verdict: rseV, why: rseV === "Compliant" ? "carbon trajectory held" : `carbon ${sp(carbonDeltaPct)} vs trajectory${carbonCarriers.length ? " · " + carbonCarriers.map((c) => c.txt).join(" · ") : ""}` },
    { k: "qualite", label: "Quality", verdict: qualV, why: qualV === "Compliant" ? `projected quality ${pc(projQuality)} ≥ target` : `projected quality ${pc(projQuality)} vs target ${pc(targets.quality, 0)}${qualityCarriers.length ? " · " + qualityCarriers.map((c) => c.txt).join(" · ") : " · no volume allocated, projection = business plan"}` },
    { k: "tracabilite", label: "Traceability", verdict: traceV, why: traceV === "Compliant" ? `projected traceability ${pc(projTrace)} ≥ target` : `projected traceability ${pc(projTrace)} vs target ${pc(targets.traceability, 0)}${traceCarriers.length ? " · " + traceCarriers.map((c) => c.txt).join(" · ") : " · no volume allocated, projection = business plan"}` },
  ];
  const globalVerdict = kfiWorst(capaV, compV, rseV, qualV, traceV, horsVerdict);

  /* --- consistency controls (chain) --- */
  const checks = [];
  const dSum = totalForecast - forecast.total;
  checks.push({ id: "sum", ok: dSum === 0, label: `Sum of families ${kp(totalForecast)} = scenario volume ${kp(forecast.total)}`, gap: `${sg(dSum / 1000, 0)} kpcs gap between the families and the total volume`, action: "adjust a family or the scenario total volume" });
  const firmBad = rows.filter((x) => x.firm > x.forecast);
  checks.push({ id: "firm", ok: firmBad.length === 0, label: `Firm orders ${kp(totalFirm)} ≤ forecast per family`, gap: firmBad.map((x) => `${x.family}: firm order ${kp(x.firm)} > forecast ${kp(x.forecast)}`).join(" · "), action: "raise the forecast or correct the firm order" });
  const overFam = families.filter((f) => f.uncovered < 0);
  checks.push({ id: "alloc", ok: overFam.length === 0, label: `Allocations ${kp(allocated)} + uncovered ${kp(uncovered)} = forecast ${kp(totalForecast)}`, gap: overFam.map((f) => `${f.family}: ${kp(f.allocated)} allocated for ${kp(f.forecast)} forecast (${sg(-f.uncovered / 1000, 0)} kpcs)`).join(" · "), action: "remove the over-allocated volume from the family" });
  const overCap = partners.filter((p) => p.overload > 0);
  checks.push({ id: "capa", ok: overCap.length === 0, label: "No allocation exceeds the maximum capacity", gap: overCap.map((p) => `${p.supplier}: ${kp(p.alloc)} > capacity ${kp(p.maxCapacity)} (${sg(p.overload / 1000, 0)} kpcs)`).join(" · "), action: "reduce the allocation or validate a capacity extension" });
  const shortNoPlan = partners.filter((p) => p.shortfall && !p.catchUp);
  const shortAll = partners.filter((p) => p.shortfall);
  checks.push({ id: "min", ok: shortNoPlan.length === 0, label: shortAll.length === 0 ? "Partner minimum commitments respected" : `Minimum commitments flagged: ${shortAll.map((p) => `${p.supplier} ${sg(p.minGap / 1000, 0)} kpcs${p.catchUp ? " (catch-up formalised)" : ""}`).join(", ")}`, gap: shortNoPlan.map((p) => `${p.supplier}: ${kp(p.alloc)} < commitment ${kp(p.minCommitment)} (${sg(p.minGap / 1000, 0)} kpcs)`).join(" · "), action: "reallocate volume or formalise a contractual catch-up plan" });
  checks.push({ id: "hors", ok: horsPanel === 0 || derogation, label: horsPanel === 0 ? "No off-panel allocation" : `Off-panel ${kp(horsPanel)} under derogation`, gap: `${kp(horsPanel)} allocated to a non-qualified off-panel supplier`, action: "remove the off-panel volume or select a derogation" });
  const nonConf = partners.filter((p) => p.alloc > 0 && (!p.complianceValidated || !p.rseOk));
  checks.push({ id: "conf", ok: nonConf.length === 0, label: "Allocated partners compliant (compliance and CSR validated)", gap: nonConf.map((p) => `${p.supplier}: ${kp(p.alloc)} allocated without validated compliance`).join(" · "), action: "suspend the allocation until validation" });
  const chainOk = checks.every((c) => c.ok);

  return {
    totalForecast, totalPlan, totalFirm, planDeltaPct, allocated, panelAllocated, horsPanel, uncovered, overAllocated, coverage, offPolicy, offPolicyPct,
    partners, families, horsVerdict, horsText, targets,
    planCost, projCost, costDeltaPct, planQuality, projQuality, planTrace, projTrace, planCarbon, projCarbon, carbonDeltaPct, complianceShare, nonValidated,
    costCarriers, qualityCarriers, traceCarriers, complianceCarriers, carbonCarriers,
    dims, globalVerdict, checks, chainOk,
  };
}

/* ---- KFI module: display components ---- */
const KFI_STEPS = [["Business plan & target panel", "contractual commitments and partner trajectories"], ["Forecasts received", "demand received from RELEX and variation vs plan"], ["Confrontation & allocation", "RELEX scenarios, capacity, compliance and panel coverage"], ["KFI arbitration", "decision, compensating measures and rationale"]];
const KFI_CONF_C = { High: "#3fb27f", Medium: "#dfa93f", Low: "#e05a5a" };
const KFI_INPUT = { width: 72, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 8, padding: "5px 7px", fontFamily: MONO, fontSize: 12, fontWeight: 700, color: T.ink, outline: "none", textAlign: "right" };
const KFI_TH = { padding: "7px 9px", fontSize: 10, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap", textAlign: "left" };
const KFI_TD = { padding: "7px 9px", borderBottom: `1px solid ${T.lineSoft}`, fontSize: 12, color: T.ink, whiteSpace: "nowrap" };
const KFI_NUM = { ...KFI_TD, fontFamily: MONO, textAlign: "right" };
const kfiClone = (o) => JSON.parse(JSON.stringify(o));
const KfiVerdict = ({ v }) => <Chip color={KFI_VERDICT_C[v]}>{v}</Chip>;
const KfiToggle = ({ on, onClick, children }) => (
  <button onClick={onClick} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: on ? `${T.ok}14` : T.panel, color: on ? T.ok : T.sub, border: `1px solid ${on ? T.ok : T.line}`, borderRadius: 9, padding: "7px 11px", fontSize: 11.5, fontWeight: 700, fontFamily: SANS, textAlign: "left" }}>
    <span style={{ width: 14, height: 14, borderRadius: 4, flexShrink: 0, display: "grid", placeItems: "center", background: on ? T.ok : "transparent", border: `1.5px solid ${on ? T.ok : T.line}`, color: "#ffffff" }}>{on && <Check size={10} />}</span>{children}
  </button>
);
const KfiResetBtn = ({ onClick, children }) => (
  <button onClick={onClick} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: "transparent", color: T.faint, border: `1px solid ${T.line}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}><RotateCcw size={12} /> {children}</button>
);
const KFI_ARBITRATIONS = [
  { id: "proteger", name: "Protect the business plan", desc: (r) => `Honour partner minimums, phase ${kp(r.uncovered)} over four weeks, no off-panel${r.horsPanel > 0 ? ` (${kp(r.horsPanel)} reassigned to partners below commitment)` : ""}.`, effects: [["Coverage", "100 %", "#3fb27f"], ["Lead time", "+12 d", "#dfa93f"], ["Landed cost", "+1,4 %", "#dfa93f"], ["Off-policy", "0 %", "#3fb27f"], ["CSR trajectory", "preserved", "#3fb27f"]],
    actions: (r) => [`Phase ${kp(r.uncovered)} over four weeks with the commercial team`, `Bring partners below commitment back to their contractual minimum${r.horsPanel > 0 ? ` by reassigning the ${kp(r.horsPanel)} off-panel` : ""}`, "Refuse any allocation to emergency sourcing", "Confirm the 2027 minimums with the five partners"] },
  { id: "absorber", name: "Absorb the peak", desc: (r) => `Increase Anatolia Textiles and Taipei Knitworks, keep ${kp(r.horsPanel)} off-panel under derogation.`, effects: [["Service", "96 %", "#3fb27f"], ["Landed cost", "+2,1 %", "#dfa93f"], ["Off-policy", "4 %", "#e05a5a"], ["Traceability", "−4 pts", "#e05a5a"], ["CSR trajectory", "degraded", "#e05a5a"]],
    actions: (r) => ["Load Anatolia Textiles and Taipei Knitworks up to maximum capacity", `Sign a purchasing-director derogation for ${kp(r.horsPanel)} off-panel`, "Launch an express audit of the emergency supplier within 30 days", "Accept the traceability degradation for the season"] },
  { id: "compromis", name: "Recommended compromise", reco: true, desc: (r) => `${kp(Math.max(0, r.uncovered - 50000))} rephased, 50 kpcs transferred to Taipei Knitworks after capacity validation, off-panel removed.`, effects: [["Service", "94 %", "#3fb27f"], ["Landed cost", "+1,8 %", "#dfa93f"], ["Compliance", "100 %", "#3fb27f"], ["Shenzhen commitment", "caught up next cycle", "#dfa93f"]],
    actions: () => ["Reserve additional capacity at Taipei Knitworks", "Rephase 70 kpcs of Mass-market capsule", "Formalise a contractual catch-up plan with Shenzhen Garments", "Maintain Colombo Apparel's environmental milestone", "Forbid any allocation to emergency sourcing until compliance and traceability are validated"] },
];

function KfiReconciliation({ st }) {
  const [kfiStep, setKfiStep] = useState(1);
  const [plans, setPlans] = useState(() => kfiClone(KFI_PARTNER_PLANS));
  const [targets, setTargets] = useState({ quality: KFI_TARGETS.quality, traceability: KFI_TARGETS.traceability });
  const [forecastScenario, setForecastScenario] = useState("pic");
  const [forecast, setForecast] = useState(() => kfiClone(KFI_FORECAST_SCENARIOS.find((s) => s.id === "pic")));
  const [allocation, setAllocation] = useState(() => kfiClone(KFI_DEFAULT_ALLOC.pic));
  const [derogation, setDerogation] = useState(false);
  const [catchUp, setCatchUp] = useState({});
  const [kfiFocus, setKfiFocus] = useState(null);
  const [kfiArbitration, setKfiArbitration] = useState("compromis");
  const [kfiValidated, setKfiValidated] = useState(null);
  const r = useMemo(() => computeKfiReconciliation(plans, forecast, allocation, { derogation, catchUp, targets }), [plans, forecast, allocation, derogation, catchUp, targets]);
  /* Scenario comparison (step 3): the selected scenario uses the live forecast/allocation, the others their RELEX default data */
  const scenarioCompare = useMemo(() => KFI_FORECAST_SCENARIOS.map((s) => {
    const live = s.id === forecastScenario;
    const rr = live ? r : computeKfiReconciliation(plans, s, KFI_DEFAULT_ALLOC[s.id], { targets });
    const shortfall = kfiSum(rr.partners, (p) => (p.shortfall ? -p.minGap : 0));
    const overload = kfiSum(rr.partners, (p) => p.overload);
    const status = rr.globalVerdict === "Violation" || !rr.chainOk ? "Violation" : rr.globalVerdict === "Under pressure" ? "Under pressure" : "Compliant";
    return { s, live, rr, shortfall, overload, status };
  }), [plans, targets, r, forecastScenario]);

  const loadScenario = (id) => {
    setForecastScenario(id);
    setForecast(kfiClone(KFI_FORECAST_SCENARIOS.find((s) => s.id === id)));
    setAllocation(kfiClone(KFI_DEFAULT_ALLOC[id]));
    setDerogation(false); setCatchUp({}); setKfiValidated(null); setKfiFocus(null);
  };
  const setFam = (i, k, v) => { setForecast((f) => ({ ...f, families: f.families.map((row, j) => (j === i ? { ...row, [k]: v } : row)) })); setKfiValidated(null); };
  const setTotal = (v) => { setForecast((f) => ({ ...f, total: v })); setKfiValidated(null); };
  const setAlloc = (family, id, v) => { setAllocation((a) => ({ ...a, [family]: { ...(a[family] || {}), [id]: v } })); setKfiValidated(null); };
  const setPlan = (id, k, v) => { setPlans((ps) => ps.map((p) => (p.id === id ? { ...p, [k]: v } : p))); setKfiValidated(null); };
  const setTarget = (k, v) => { setTargets((t) => ({ ...t, [k]: v })); setKfiValidated(null); };
  const resetPlans = () => { setPlans(kfiClone(KFI_PARTNER_PLANS)); setTargets({ quality: KFI_TARGETS.quality, traceability: KFI_TARGETS.traceability }); setKfiValidated(null); };
  const kNum = (e) => Math.max(0, Math.round(e.target.value === "" ? 0 : +e.target.value)) * 1000;
  const kVal = (n) => Math.round((n || 0) / 1000);
  const dNum = (e, max) => { const v = e.target.value === "" ? 0 : +e.target.value; return Math.min(max === undefined ? Infinity : max, Math.max(0, Math.round(v * 100) / 100)); };
  const gc = KFI_VERDICT_C[r.globalVerdict];
  const chainC = r.chainOk ? T.ok : T.bad;
  const arb = KFI_ARBITRATIONS.find((a) => a.id === kfiArbitration);
  const scenName = KFI_FORECAST_SCENARIOS.find((s) => s.id === forecastScenario).name;

  /* Commitment cards: 2027 target vs projected after allocation */
  const engagement = [
    { k: "prix", label: "Price per minute", target: `${fr2(r.planCost)} €/pc`, targetTxt: "business plan price per minute", proj: `${fr2(r.projCost)} €/pc`, delta: sp(r.costDeltaPct), v: r.costDeltaPct > 3 ? "Violation" : r.costDeltaPct > 0.5 ? "Under pressure" : "Compliant", carriers: r.costCarriers },
    { k: "qualite", label: "Quality", target: pc(targets.quality, 0), targetTxt: `business plan ${pc(r.planQuality)}`, proj: pc(r.projQuality), delta: `${sg(r.projQuality - targets.quality, 1)} pt`, v: r.dims[3].verdict, carriers: r.qualityCarriers },
    { k: "tracabilite", label: "Traceability", target: pc(targets.traceability, 0), targetTxt: `business plan ${pc(r.planTrace)}`, proj: pc(r.projTrace), delta: `${sg(r.projTrace - targets.traceability, 1)} pt`, v: r.dims[4].verdict, carriers: r.traceCarriers },
    { k: "conformite", label: "Compliance", target: "100 %", targetTxt: "volume on qualified partners", proj: pc(r.complianceShare), delta: `${sg(r.complianceShare - 100, 1)} pt`, v: r.dims[1].verdict, carriers: r.complianceCarriers },
    { k: "rse", label: "CSR / carbon", target: `${fr2(r.planCarbon)} kg/pc`, targetTxt: "business plan trajectory", proj: `${fr2(r.projCarbon)} kg/pc`, delta: sp(r.carbonDeltaPct), v: r.dims[2].verdict, carriers: r.carbonCarriers },
  ];
  const focusCard = engagement.find((e) => e.k === kfiFocus);
  const focusIds = focusCard ? new Set(focusCard.carriers.map((c) => c.id).filter((id) => r.partners.some((p) => p.id === id))) : null;

  const synth = [
    { v: `${mp(r.totalForecast)} forecast`, c: T.ink },
    { v: `${sp(r.planDeltaPct, 0)} vs plan`, c: Math.abs(r.planDeltaPct) > 10 ? T.warn : T.ok },
    { v: `${pc(r.coverage, 0)} allocated to the partner panel`, c: r.coverage >= 95 ? T.ok : r.coverage >= 85 ? T.warn : T.bad },
    { v: `${pc(r.offPolicyPct, 0)} off-policy`, c: r.offPolicy === 0 ? T.ok : derogation && r.offPolicy === r.horsPanel ? T.warn : T.bad },
    { v: `${kp(r.uncovered)} uncovered`, c: r.uncovered === 0 ? T.ok : r.uncovered <= r.totalForecast * 0.05 ? T.warn : T.bad },
  ];
  const btn = (on, c = T.accent) => ({ cursor: "pointer", background: on ? c : T.panel, color: on ? "#ffffff" : T.ink, border: `1px solid ${on ? c : T.line}`, borderRadius: 9, padding: "8px 13px", fontSize: 12, fontWeight: 800, fontFamily: SANS });
  const nextBtn = { display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS };

  return (
    <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ width: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center", background: `${T.accent}12`, border: `1px solid ${T.accent}44` }}><Handshake size={17} color={T.accent} /></span>
        <div style={{ flex: "1 1 260px" }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Partner business plans × in-season forecasts</div>
          <div style={{ fontSize: 11.5, color: T.faint }}>The long industrial cycle (commitments, purchasing policy, CSR trajectories) confronted with the short commercial cycle (S1 2027 forecasts and orders received from RELEX).</div>
        </div>
        <VensoTag txt="Venso reconciliation" />
      </div>

      {/* Permanent synthesis banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "10px 13px", marginBottom: 10 }}>
        {synth.map((s, i) => (
          <React.Fragment key={s.v}>
            {i > 0 && <span style={{ color: T.faint, fontFamily: MONO }}>·</span>}
            <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: s.c }}>{s.v}</span>
          </React.Fragment>
        ))}
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}>VERDICT</span><KfiVerdict v={r.globalVerdict} /></span>
      </div>

      {/* Chain control */}
      <div style={{ background: `${chainC}10`, border: `1px solid ${chainC}66`, borderRadius: 11, padding: "10px 13px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <ShieldCheck size={14} color={chainC} />
          <span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>Chain control</span>
          <span style={{ fontSize: 11.5, color: T.sub }}>{r.checks.filter((c) => c.ok).length} / {r.checks.length} rules respected · global verdict = worst verdict across capacity, compliance, CSR, quality and traceability</span>
          {st && <RuleStatus st={st} area={["KFI", "Go to Market"]} label="Group rules" />}
          <span style={{ marginLeft: "auto" }}><Chip color={chainC}>{r.chainOk ? "Allocation reconciled" : "Inconsistent chain"}</Chip></span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 8 }}>
          {r.checks.map((c) => (
            <div key={c.id} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11.5, lineHeight: 1.45, color: c.ok ? T.sub : T.ink }}>
              {c.ok ? <Check size={13} color={T.ok} style={{ flexShrink: 0, marginTop: 2 }} /> : <X size={13} color={T.bad} style={{ flexShrink: 0, marginTop: 2 }} />}
              <span>{c.ok ? c.label : <><strong style={{ color: T.bad }}>{c.gap}</strong> → {c.action}</>}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stepper */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8, marginBottom: 14 }}>
        {KFI_STEPS.map(([t, sub], i) => {
          const n = i + 1, on = kfiStep === n, done = kfiStep > n;
          const c = on ? T.accent : done ? T.ok : T.faint;
          return (
            <button key={t} onClick={() => setKfiStep(n)} style={{ cursor: "pointer", textAlign: "left", background: on ? `${T.accent}10` : T.panel, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 11, padding: "9px 11px", display: "flex", alignItems: "center", gap: 10, fontFamily: SANS }}>
              <span style={{ width: 26, height: 26, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: on || done ? c : "transparent", border: `1.5px solid ${c}`, color: on || done ? "#ffffff" : c, fontFamily: MONO, fontSize: 12, fontWeight: 800 }}>{done ? <Check size={13} /> : n}</span>
              <span><span style={{ display: "block", fontSize: 12, fontWeight: 800, color: T.ink }}>{t}</span><span style={{ display: "block", fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{sub}</span></span>
            </button>
          );
        })}
      </div>

      {/* ---- Step 1: business plan & target panel ---- */}
      {kfiStep === 1 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <span style={{ fontSize: 11.5, color: T.faint, flex: "1 1 320px" }}>Five aggregated business plan commitments: 2027 target compared with the level projected after the current allocation. Click a card to highlight the partners carrying the gap. Every business plan figure below is a working assumption and can be edited.</span>
            <KfiResetBtn onClick={resetPlans}>Reset business plan figures</KfiResetBtn>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "8px 12px", marginBottom: 10 }}>
            <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, letterSpacing: 0.6, textTransform: "uppercase" }}>2027 targets</span>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: T.sub }}>Quality <input type="number" step={1} min={0} max={100} value={targets.quality} onChange={(e) => setTarget("quality", dNum(e, 100))} style={{ ...KFI_INPUT, width: 58 }} /> %</label>
            <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: T.sub }}>Traceability <input type="number" step={1} min={0} max={100} value={targets.traceability} onChange={(e) => setTarget("traceability", dNum(e, 100))} style={{ ...KFI_INPUT, width: 58 }} /> %</label>
            <span style={{ fontSize: 10.5, color: T.faint }}>price, compliance and carbon targets derive from the partner business plans below</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 10, marginBottom: 10 }}>
            {engagement.map((e) => {
              const on = kfiFocus === e.k, c = KFI_VERDICT_C[e.v];
              return (
                <button key={e.k} onClick={() => setKfiFocus(on ? null : e.k)} style={{ cursor: "pointer", textAlign: "left", background: on ? `${c}10` : T.panel2, border: `1px solid ${on ? c : T.lineSoft}`, borderRadius: 11, padding: "10px 12px", fontFamily: SANS }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>{e.label}</span><span style={{ marginLeft: "auto" }}><KfiVerdict v={e.v} /></span></div>
                  <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, marginTop: 6 }}>2027 target · {e.target}</div>
                  <div style={{ fontSize: 10, color: T.faint, fontFamily: MONO }}>{e.targetTxt}</div>
                  <div style={{ marginTop: 6 }}><span style={{ fontFamily: MONO, fontSize: 19, fontWeight: 800, color: c }}>{e.proj}</span><span style={{ fontFamily: MONO, fontSize: 11, color: c, marginLeft: 6 }}>{e.delta}</span></div>
                  <div style={{ fontSize: 10.5, color: T.sub, marginTop: 4, whiteSpace: "normal", lineHeight: 1.4 }}>{e.carriers.length ? `carried by ${e.carriers.map((x) => x.txt.split(" (")[0].split(": ")[0]).slice(0, 2).join(", ")}${e.carriers.length > 2 ? "…" : ""}` : "no gap carried by the panel"}</div>
                </button>
              );
            })}
          </div>
          {focusCard && (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 9, background: `${KFI_VERDICT_C[focusCard.v]}10`, border: `1px solid ${KFI_VERDICT_C[focusCard.v]}55`, borderRadius: 10, padding: "9px 12px", marginBottom: 10, fontSize: 11.5, color: T.ink, lineHeight: 1.5 }}>
              <Target size={14} color={KFI_VERDICT_C[focusCard.v]} style={{ flexShrink: 0, marginTop: 2 }} />
              <span><strong>{focusCard.label} — gap {focusCard.delta} vs 2027 target.</strong> {focusCard.carriers.length ? focusCard.carriers.map((x) => x.txt).join(" · ") : "No partner degrades this commitment with the current allocation."}{focusIds && focusIds.size > 0 && " · partners highlighted in the table."}</span>
            </div>
          )}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Partner", "Family", "Plan commitment", "Minimum", "Max. capacity", "Price per minute", "Quality", "Traceability", "Carbon", "CSR / compliance", "Horizon", "Development action"].map((h, j) => <th key={h} style={{ ...KFI_TH, textAlign: j >= 2 && j <= 8 ? "right" : "left" }}>{h}</th>)}</tr></thead>
              <tbody>
                {r.partners.map((p) => {
                  const hi = focusIds && focusIds.size > 0 ? focusIds.has(p.id) : null;
                  const inp = (k, v, onCh, extra = {}) => <input type="number" value={v} onChange={onCh} style={{ ...KFI_INPUT, width: extra.width || 72 }} step={extra.step} min={0} max={extra.max} />;
                  return (
                    <tr key={p.id} style={{ background: hi ? `${KFI_VERDICT_C[focusCard.v]}12` : "transparent", opacity: hi === false ? 0.45 : 1 }}>
                      <td style={KFI_TD}><span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><span style={{ fontWeight: 800, color: T.accent }}>{p.supplier}</span><GradeChip g={p.grade} /><span style={{ fontSize: 11, fontFamily: MONO, color: T.faint }}>{p.country}</span></span></td>
                      <td style={{ ...KFI_TD, color: T.sub, whiteSpace: "normal", minWidth: 110 }}>{p.family}</td>
                      <td style={KFI_NUM}>{inp("plannedVolume", kVal(p.plannedVolume), (e) => setPlan(p.id, "plannedVolume", kNum(e)), { step: 10 })} <span style={{ fontSize: 10, color: T.faint }}>kpcs</span></td>
                      <td style={KFI_NUM}>{inp("minCommitment", kVal(p.minCommitment), (e) => setPlan(p.id, "minCommitment", kNum(e)), { step: 10 })} <span style={{ fontSize: 10, color: T.faint }}>kpcs</span></td>
                      <td style={KFI_NUM}>{inp("maxCapacity", kVal(p.maxCapacity), (e) => setPlan(p.id, "maxCapacity", kNum(e)), { step: 10 })} <span style={{ fontSize: 10, color: T.faint }}>kpcs</span></td>
                      <td style={KFI_NUM}>{inp("targetCost", p.targetCost, (e) => setPlan(p.id, "targetCost", dNum(e)), { step: 0.05, width: 64 })} <span style={{ fontSize: 10, color: T.faint }}>€/pc</span></td>
                      <td style={KFI_NUM}>≥ {inp("qualityTarget", p.qualityTarget, (e) => setPlan(p.id, "qualityTarget", dNum(e, 100)), { step: 1, max: 100, width: 56 })} <span style={{ fontSize: 10, color: T.faint }}>%</span></td>
                      <td style={{ ...KFI_NUM, color: p.traceability < 90 ? T.warn : T.ink }}>{inp("traceability", p.traceability, (e) => setPlan(p.id, "traceability", dNum(e, 100)), { step: 1, max: 100, width: 56 })} <span style={{ fontSize: 10, color: T.faint }}>%</span></td>
                      <td style={KFI_NUM}>{inp("carbon", p.carbon, (e) => setPlan(p.id, "carbon", dNum(e)), { step: 0.05, width: 60 })} <span style={{ fontSize: 10, color: T.faint }}>kg/pc</span></td>
                      <td style={{ ...KFI_TD, whiteSpace: "normal", minWidth: 150 }}><span style={{ display: "inline-flex", gap: 5, flexWrap: "wrap" }}><Chip color={p.rseInProgress ? T.warn : T.ok}>{p.rseStatus}</Chip><Chip color={p.complianceWatch ? T.warn : T.ok}>{p.complianceStatus}</Chip></span></td>
                      <td style={{ ...KFI_TD, fontFamily: MONO, color: T.sub }}>{p.partnershipHorizon}</td>
                      <td style={{ ...KFI_TD, whiteSpace: "normal", minWidth: 200, color: T.sub, fontSize: 11.5 }}>{p.developmentAction}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td style={{ ...KFI_TD, fontWeight: 800 }} colSpan={2}>S1 2027 target panel</td>
                  <td style={{ ...KFI_NUM, fontWeight: 800 }}>{u(kfiSum(r.partners, (p) => p.plannedVolume))} pcs</td>
                  <td style={KFI_NUM}>{u(kfiSum(r.partners, (p) => p.minCommitment))} pcs</td>
                  <td style={KFI_NUM}>{u(kfiSum(r.partners, (p) => p.maxCapacity))} pcs</td>
                  <td style={KFI_NUM}>{fr2(r.planCost)} €/pc</td>
                  <td style={KFI_NUM}>{pc(r.planQuality)}</td>
                  <td style={KFI_NUM}>{pc(r.planTrace)}</td>
                  <td style={KFI_NUM}>{fr2(r.planCarbon)} kg/pc</td>
                  <td style={{ ...KFI_TD, color: T.sub }} colSpan={3}>weighted by plan commitment · reference trajectory</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: 12 }}><button onClick={() => setKfiStep(2)} style={nextBtn}>Confront with the RELEX forecasts <ArrowRight size={14} /></button></div>
        </div>
      )}

      {/* ---- Step 2: forecasts received from RELEX ---- */}
      {kfiStep === 2 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <Database size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Forecasts received from RELEX</span>
            <Chip color={T.blue}>scenario « {scenName} »</Chip>
            <KfiResetBtn onClick={() => loadScenario(forecastScenario)}>Restore RELEX sample data</KfiResetBtn>
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 10 }}>Latest demand forecast received from RELEX for S1 2027, by family: plan, forecast, variation, requested lead time, confidence and firm orders. Forecast and firm-order figures are editable (in kpcs); the sum of the families must equal the scenario volume. The three RELEX scenarios are compared and selected in step 3.</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Family", "Plan", "Forecast received", "Variation", "Requested lead time", "Confidence", "Firm orders", "Firm / forecast"].map((h, j) => <th key={h} style={{ ...KFI_TH, textAlign: j === 0 || j === 4 || j === 5 ? "left" : "right" }}>{h}</th>)}</tr></thead>
              <tbody>
                {forecast.families.map((f, i) => {
                  const d = f.plan ? ((f.forecast - f.plan) / f.plan) * 100 : 0, firmBad = f.firm > f.forecast;
                  return (
                    <tr key={f.family}>
                      <td style={{ ...KFI_TD, fontWeight: 800 }}>{f.family}</td>
                      <td style={KFI_NUM}>{kp(f.plan)}</td>
                      <td style={KFI_NUM}><input type="number" step={10} min={0} value={kVal(f.forecast)} onChange={(e) => setFam(i, "forecast", kNum(e))} style={KFI_INPUT} /> <span style={{ fontSize: 10, color: T.faint }}>kpcs</span></td>
                      <td style={{ ...KFI_NUM, fontWeight: 800, color: Math.abs(d) > 15 ? T.bad : Math.abs(d) > 5 ? T.warn : T.ok }}>{sp(d, 0)}</td>
                      <td style={{ ...KFI_TD, fontFamily: MONO, color: T.sub }}>{f.lead}</td>
                      <td style={KFI_TD}><Chip color={KFI_CONF_C[f.confidence]}>{f.confidence}</Chip></td>
                      <td style={KFI_NUM}><input type="number" step={10} min={0} value={kVal(f.firm)} onChange={(e) => setFam(i, "firm", kNum(e))} style={{ ...KFI_INPUT, borderColor: firmBad ? T.bad : T.line }} /> <span style={{ fontSize: 10, color: T.faint }}>kpcs</span></td>
                      <td style={{ ...KFI_NUM, color: firmBad ? T.bad : T.sub }}>{f.forecast ? pc((f.firm / f.forecast) * 100, 0) : "—"}</td>
                    </tr>
                  );
                })}
                <tr>
                  <td style={{ ...KFI_TD, fontWeight: 800 }}>Total families</td>
                  <td style={{ ...KFI_NUM, fontWeight: 800 }}>{kp(r.totalPlan)}</td>
                  <td style={{ ...KFI_NUM, fontWeight: 800, color: r.totalForecast === forecast.total ? T.ink : T.bad }}>{kp(r.totalForecast)}</td>
                  <td style={{ ...KFI_NUM, fontWeight: 800 }}>{sp(r.planDeltaPct, 0)}</td>
                  <td style={KFI_TD} colSpan={2}></td>
                  <td style={{ ...KFI_NUM, fontWeight: 800 }}>{kp(r.totalFirm)}</td>
                  <td style={KFI_NUM}>{r.totalForecast ? pc((r.totalFirm / r.totalForecast) * 100, 0) : "—"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginTop: 12, background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 10, padding: "9px 12px" }}>
            <Sparkles size={14} color={T.human} />
            <span style={{ fontSize: 11.5, color: T.ink }}>RELEX scenario volume <input type="number" step={10} min={0} value={kVal(forecast.total)} onChange={(e) => setTotal(kNum(e))} style={{ ...KFI_INPUT, width: 84 }} /> kpcs · sum of families <strong style={{ fontFamily: MONO }}>{kp(r.totalForecast)}</strong> — {r.totalForecast === forecast.total ? "consistent with the scenario." : `${sg((r.totalForecast - forecast.total) / 1000, 0)} kpcs gap to reconcile.`}</span>
            <span style={{ marginLeft: "auto" }}><Chip color={r.totalForecast === forecast.total ? T.ok : T.bad}>{r.totalForecast === forecast.total ? "Sum consistent" : "To fix"}</Chip></span>
          </div>
          <div style={{ marginTop: 12 }}><button onClick={() => setKfiStep(3)} style={nextBtn}>Confront with the partner panel <ArrowRight size={14} /></button></div>
        </div>
      )}

      {/* ---- Step 3: confrontation & allocation ---- */}
      {kfiStep === 3 && (
        <div>
          {/* RELEX scenarios: comparison and selection */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <Database size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>RELEX forecast scenarios × business plan</span>
            <span style={{ fontSize: 11.5, color: T.faint }}>select a scenario to load its forecast and its sample allocation</span>
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 10 }}>For each scenario received from RELEX, the cockpit shows whether the long-term business plan can be reconciled with the forecast, and how: coverage, minimum-commitment gaps, capacity overload, off-panel share, uncovered volume and global verdict. The selected scenario reflects the live allocation below; the others use their RELEX sample data.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 10, marginBottom: 14 }}>
            {scenarioCompare.map(({ s, live, rr, shortfall, overload, status }) => {
              const c = KFI_VERDICT_C[status];
              const d = ((rr.totalForecast - rr.totalPlan) / (rr.totalPlan || 1)) * 100;
              const failing = rr.checks.filter((x) => !x.ok);
              const how = status === "Compliant" ? "The partner panel absorbs the forecast within capacities and minimum commitments: business plan and RELEX forecast are compatible." : status === "Under pressure" ? `Reconcilable with tensions to arbitrate: ${rr.dims.filter((x) => x.verdict !== "Compliant").map((x) => x.label.toLowerCase()).join(", ")}.` : `Not reconciled as is: ${failing.length ? failing.map((x) => x.gap).slice(0, 2).join(" · ") : rr.dims.filter((x) => x.verdict === "Violation").map((x) => x.why).join(" · ")}.`;
              return (
                <div key={s.id} style={{ background: live ? `${T.accent}08` : T.panel, border: `1px solid ${live ? T.accent : T.line}`, borderRadius: 12, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{s.name}</span>
                    <span style={{ fontFamily: MONO, fontSize: 10.5, color: T.sub }}>{mp(rr.totalForecast)} · {sp(d, 0)}</span>
                    <span style={{ marginLeft: "auto" }}><Chip color={c}>{status === "Compliant" ? "Reconciles the business plan" : status === "Under pressure" ? "Tensions to arbitrate" : "Violation"}</Chip></span>
                  </div>
                  <div style={{ fontSize: 11, color: T.faint }}>{s.note}{live ? " · selected · live allocation" : " · RELEX sample allocation"}</div>
                  {[["Panel coverage", pc(rr.coverage, 0), rr.coverage >= 95 ? T.ok : rr.coverage >= 85 ? T.warn : T.bad], ["Minimum commitment gaps", shortfall > 0 ? `−${kp(shortfall)}` : "none", shortfall > 0 ? T.warn : T.ok], ["Capacity overload", overload > 0 ? `+${kp(overload)}` : "none", overload > 0 ? T.bad : T.ok], ["Off-panel share", pc(rr.horsPanel / (rr.totalForecast || 1) * 100, 0), rr.horsPanel > 0 ? T.bad : T.ok], ["Uncovered", kp(rr.uncovered), rr.uncovered > 0 ? T.warn : T.ok]].map(([l2, v, c2]) => (
                    <div key={l2} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "3px 0", borderBottom: `1px solid ${T.lineSoft}` }}>
                      <span style={{ fontSize: 11.5, color: T.sub }}>{l2}</span><span style={{ fontSize: 12, fontFamily: MONO, fontWeight: 800, color: c2 }}>{v}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: T.sub }}>Global verdict <KfiVerdict v={rr.globalVerdict} /> <span style={{ marginLeft: "auto" }}><Chip color={rr.chainOk ? T.ok : T.bad}>{rr.chainOk ? "chain reconciled" : "chain inconsistent"}</Chip></span></div>
                  <div style={{ fontSize: 11, color: T.ink, lineHeight: 1.45, whiteSpace: "normal" }}>{how}</div>
                  <button onClick={() => loadScenario(s.id)} style={{ ...btn(live), marginTop: "auto" }}>{live ? "Scenario selected ✓" : "Select this scenario"}</button>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
            <Layers size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Forecast ↔ partner matrix</span>
            <span style={{ fontSize: 11.5, color: T.faint }}>scenario « {scenName} » · allocation per family and route, in kpcs · uncovered = forecast − allocations</span>
            <KfiResetBtn onClick={() => loadScenario(forecastScenario)}>Restore sample allocation</KfiResetBtn>
          </div>
          <div style={{ overflowX: "auto", marginTop: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>
                <th style={KFI_TH}>Family</th><th style={{ ...KFI_TH, textAlign: "right" }}>Forecast</th>
                {r.partners.map((p) => <th key={p.id} style={{ ...KFI_TH, textAlign: "right" }}>{p.supplier}</th>)}
                <th style={{ ...KFI_TH, textAlign: "right", color: T.bad }}>Off-panel</th><th style={{ ...KFI_TH, textAlign: "right" }}>Uncovered</th>
              </tr></thead>
              <tbody>
                {r.families.map((f) => (
                  <tr key={f.family}>
                    <td style={{ ...KFI_TD, fontWeight: 800 }}>{f.family}</td>
                    <td style={{ ...KFI_NUM, fontWeight: 800 }}>{kp(f.forecast)}</td>
                    {[...r.partners.map((p) => p.id), KFI_HORS].map((id) => (
                      <td key={id} style={KFI_NUM}><input type="number" step={10} min={0} value={kVal((allocation[f.family] || {})[id])} onChange={(e) => setAlloc(f.family, id, kNum(e))} style={{ ...KFI_INPUT, borderColor: id === KFI_HORS && (allocation[f.family] || {})[id] > 0 ? (derogation ? T.warn : T.bad) : T.line }} /></td>
                    ))}
                    <td style={{ ...KFI_NUM, fontWeight: 800, color: f.uncovered < 0 ? T.bad : f.uncovered > 0 ? T.warn : T.ok }}>{f.uncovered < 0 ? `${sg(f.uncovered / 1000, 0)} kpcs` : kp(f.uncovered)}</td>
                  </tr>
                ))}
                <tr style={{ background: T.panel2 }}>
                  <td style={{ ...KFI_TD, fontWeight: 800 }}>Total allocated</td>
                  <td style={{ ...KFI_NUM, fontWeight: 800 }}>{kp(r.totalForecast)}</td>
                  {r.partners.map((p) => <td key={p.id} style={{ ...KFI_NUM, fontWeight: 800, color: KFI_VERDICT_C[p.verdict] }}>{kp(p.alloc)}</td>)}
                  <td style={{ ...KFI_NUM, fontWeight: 800, color: KFI_VERDICT_C[r.horsVerdict] }}>{kp(r.horsPanel)}</td>
                  <td style={{ ...KFI_NUM, fontWeight: 800, color: r.overAllocated > 0 ? T.bad : r.uncovered > 0 ? T.warn : T.ok }}>{r.overAllocated > 0 ? `${sg(-r.overAllocated / 1000, 0)} kpcs` : kp(r.uncovered)}</td>
                </tr>
                <tr>
                  <td style={{ ...KFI_TD, color: T.faint, fontSize: 10.5 }} colSpan={2}>contractual min. · max. capacity</td>
                  {r.partners.map((p) => <td key={p.id} style={{ ...KFI_NUM, color: T.faint, fontSize: 10.5 }}>{kVal(p.minCommitment)} · {kVal(p.maxCapacity)}</td>)}
                  <td style={{ ...KFI_NUM, color: T.faint, fontSize: 10.5 }}>0 expected</td><td style={{ ...KFI_NUM, color: T.faint, fontSize: 10.5 }}>arbitration</td>
                </tr>
                <tr>
                  <td style={{ ...KFI_TD, color: T.faint, fontSize: 10.5 }} colSpan={2}>verdict</td>
                  {r.partners.map((p) => <td key={p.id} style={{ ...KFI_TD, textAlign: "right" }}><KfiVerdict v={p.verdict} /></td>)}
                  <td style={{ ...KFI_TD, textAlign: "right" }}><KfiVerdict v={r.horsVerdict} /></td>
                  <td style={{ ...KFI_TD, textAlign: "right" }}><Chip color={r.overAllocated > 0 ? T.bad : r.uncovered > 0 ? T.warn : T.ok}>{r.overAllocated > 0 ? "Over-allocation" : r.uncovered > 0 ? "Arbitration required" : "Covered"}</Chip></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Policies: derogation and catch-up plans */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginTop: 12 }}>
            <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, letterSpacing: 0.6, textTransform: "uppercase" }}>Policies</span>
            <KfiToggle on={derogation} onClick={() => { setDerogation((d) => !d); setKfiValidated(null); }}>Purchasing-director derogation for the off-panel ({kp(r.horsPanel)})</KfiToggle>
            {r.partners.filter((p) => p.shortfall).map((p) => (
              <KfiToggle key={p.id} on={!!catchUp[p.id]} onClick={() => { setCatchUp((m) => ({ ...m, [p.id]: !m[p.id] })); setKfiValidated(null); }}>Contractual catch-up plan — {p.supplier} ({sg(p.minGap / 1000, 0)} kpcs)</KfiToggle>
            ))}
          </div>

          {/* Tensions per route */}
          <div style={{ fontSize: 13, fontWeight: 800, color: T.ink, margin: "16px 0 3px" }}>Tensions per allocation route</div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 10 }}>Compliant = capacity, contractual minimum and policies respected · Under pressure = capacity headroom &lt; 10 %, commitment under-delivered or quality/traceability objective degraded · Violation = off-panel, compliance not validated, capacity exceeded or CSR policy not met.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 9 }}>
            {[...r.partners.map((p) => ({ id: p.id, name: p.supplier, grade: p.grade, alloc: p.alloc, verdict: p.verdict, text: p.text, issues: p.issues })),
              { id: KFI_HORS, name: "Off-panel — emergency sourcing", alloc: r.horsPanel, verdict: r.horsVerdict, text: r.horsText, issues: [] },
              { id: "uncovered", name: "Uncovered", alloc: r.uncovered, verdict: r.overAllocated > 0 ? "Violation" : r.uncovered > 0 ? "Under pressure" : "Compliant", text: r.overAllocated > 0 ? `Over-allocation of ${kp(r.overAllocated)}: allocations above the forecast` : r.uncovered > 0 ? "Arbitration required: rephase, transfer or forgo" : "Forecast fully covered", issues: [] },
            ].map((v) => {
              const c = KFI_VERDICT_C[v.verdict];
              const extra = v.issues.filter((i) => !i.startsWith("capacity headroom"));
              return (
                <div key={v.id} style={{ background: T.panel, border: `1px solid ${c}55`, borderRadius: 11, padding: "10px 13px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: c, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: T.accent }}>{v.name}</span>{v.grade && <GradeChip g={v.grade} />}
                    <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 800, color: T.ink }}>{kp(v.alloc)}</span>
                    <span style={{ marginLeft: "auto" }}><KfiVerdict v={v.verdict} /></span>
                  </div>
                  <div style={{ fontSize: 11, color: T.sub, fontFamily: MONO, marginTop: 5, lineHeight: 1.45 }}>{v.text}</div>
                  {extra.length > 0 && <div style={{ fontSize: 10.5, color: c, marginTop: 4, lineHeight: 1.45 }}>{extra.join(" · ")}</div>}
                </div>
              );
            })}
          </div>

          {/* Impact on the trajectory */}
          <div style={{ fontSize: 13, fontWeight: 800, color: T.ink, margin: "16px 0 3px" }}>Impact on the trajectory</div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 10 }}>Each projected gap is tied to its cause in the current allocation.</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Dimension", "Projected", "Target", "Gap", "Verdict", "Cause"].map((h, j) => <th key={h} style={{ ...KFI_TH, textAlign: j >= 1 && j <= 3 ? "right" : "left" }}>{h}</th>)}</tr></thead>
              <tbody>
                {[
                  { l: "Landed cost", proj: `${fr2(r.projCost)} €/pc`, target: `${fr2(r.planCost)} €/pc`, delta: sp(r.costDeltaPct), v: engagement[0].v, why: r.costCarriers.length ? r.costCarriers.map((c) => c.txt).join(" · ") : "mix identical to the business plan" },
                  { l: "Projected quality", proj: pc(r.projQuality), target: pc(targets.quality, 0), delta: `${sg(r.projQuality - targets.quality, 1)} pt`, v: r.dims[3].verdict, why: r.qualityCarriers.length ? r.qualityCarriers.map((c) => c.txt).join(" · ") : "every allocated partner meets the target" },
                  { l: "Traceability", proj: pc(r.projTrace), target: pc(targets.traceability, 0), delta: `${sg(r.projTrace - targets.traceability, 1)} pt`, v: r.dims[4].verdict, why: r.traceCarriers.length ? r.traceCarriers.map((c) => c.txt).join(" · ") : "full traceability on the allocated volume" },
                  { l: "Partner coverage", proj: pc(r.coverage, 0), target: "100 %", delta: `${sg(r.coverage - 100, 0)} pt`, v: r.coverage >= 95 ? "Compliant" : r.coverage >= 85 ? "Under pressure" : "Violation", why: `${kp(r.uncovered)} uncovered${r.horsPanel > 0 ? ` · ${kp(r.horsPanel)} off-panel` : ""}${r.overAllocated > 0 ? ` · ${kp(r.overAllocated)} over-allocated` : ""}` },
                  { l: "Carbon", proj: `${fr2(r.projCarbon)} kg/pc`, target: `${fr2(r.planCarbon)} kg/pc`, delta: `${sp(r.carbonDeltaPct)} vs trajectory`, v: r.dims[2].verdict, why: r.carbonCarriers.length ? r.carbonCarriers.map((c) => c.txt).join(" · ") : "carbon mix in line with the trajectory" },
                ].map((x) => (
                  <tr key={x.l}>
                    <td style={{ ...KFI_TD, fontWeight: 800 }}>{x.l}</td>
                    <td style={{ ...KFI_NUM, fontWeight: 800, color: KFI_VERDICT_C[x.v] }}>{x.proj}</td>
                    <td style={KFI_NUM}>{x.target}</td>
                    <td style={{ ...KFI_NUM, color: KFI_VERDICT_C[x.v] }}>{x.delta}</td>
                    <td style={KFI_TD}><KfiVerdict v={x.v} /></td>
                    <td style={{ ...KFI_TD, whiteSpace: "normal", minWidth: 260, color: T.sub, fontSize: 11.5, lineHeight: 1.45 }}>{x.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", marginTop: 10 }}>
            <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, letterSpacing: 0.6, textTransform: "uppercase" }}>Global verdict</span>
            {r.dims.map((d) => <span key={d.k} title={d.why} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: T.sub }}>{d.label} <KfiVerdict v={d.verdict} /></span>)}
            {st && <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: T.sub }}>Group rules <RuleStatus st={st} area={["KFI", "Go to Market"]} action={false} /></span>}
            <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, color: gc }}>= <KfiVerdict v={r.globalVerdict} /></span>
          </div>
          <div style={{ marginTop: 12 }}><button onClick={() => setKfiStep(4)} style={nextBtn}>Go to the KFI arbitration <ArrowRight size={14} /></button></div>
        </div>
      )}

      {/* ---- Step 4: KFI arbitration ---- */}
      {kfiStep === 4 && (
        <div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 10 }}>Scenario « {scenName} » (selected in step 3): three options to absorb {kp(r.uncovered)} uncovered{r.horsPanel > 0 ? ` and ${kp(r.horsPanel)} off-panel` : ""} without silently degrading the long-term commitments. Current chain: <strong style={{ color: chainC }}>{r.chainOk ? "reconciled" : "inconsistent"}</strong> · verdict <strong style={{ color: gc }}>{r.globalVerdict}</strong>.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
            {KFI_ARBITRATIONS.map((a) => {
              const on = kfiArbitration === a.id, c = a.reco ? T.ok : T.accent;
              return (
                <div key={a.id} style={{ background: T.panel, border: `1px solid ${on ? c : T.line}`, borderRadius: 12, padding: "14px 15px", display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{a.name}</span>
                    {a.reco && <span style={{ marginLeft: "auto" }}><Chip color={T.ok}>recommended</Chip></span>}
                  </div>
                  <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.45, marginBottom: 10 }}>{a.desc(r)}</div>
                  {a.effects.map(([l2, v, c2]) => (
                    <div key={l2} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "4px 0", borderBottom: `1px solid ${T.lineSoft}` }}>
                      <span style={{ fontSize: 11.5, color: T.sub }}>{l2}</span><span style={{ fontSize: 12, fontFamily: MONO, fontWeight: 800, color: c2, textAlign: "right" }}>{v}</span>
                    </div>
                  ))}
                  <button onClick={() => { setKfiArbitration(a.id); setKfiValidated(null); }} style={{ marginTop: 12, cursor: "pointer", background: on ? c : `${T.human}12`, color: on ? "#ffffff" : T.human, border: "none", borderRadius: 9, padding: "9px 12px", fontSize: 12, fontWeight: 800, fontFamily: SANS }}>{on ? "Option selected ✓" : "Select this option"}</button>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 14, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px" }}>
            <span style={{ display: "block", fontSize: 10, color: T.faint, fontFamily: MONO, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 8 }}>Associated actions — {arb.name}</span>
            {arb.actions(r).map((a) => (
              <div key={a} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11.5, color: T.ink, lineHeight: 1.45, marginBottom: 5 }}>
                <Check size={13} color={arb.reco ? T.ok : T.accent} style={{ flexShrink: 0, marginTop: 1 }} />{a}
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", borderTop: `1px solid ${T.lineSoft}`, paddingTop: 12, marginTop: 8 }}>
              <span style={{ fontSize: 11.5, color: T.sub }}>Rationale: {r.chainOk ? "chain reconciled, the arbitration protects the partner commitments." : `inconsistent chain (${r.checks.filter((c) => !c.ok).length} rule${r.checks.filter((c) => !c.ok).length > 1 ? "s" : ""} in breach), the arbitration must come with corrective measures.`}</span>
              <button onClick={() => setKfiValidated({ at: new Date(), option: arb.name, scenario: scenName, verdict: r.globalVerdict, chainOk: r.chainOk, total: r.totalForecast, panel: r.panelAllocated, uncovered: r.uncovered, hors: r.horsPanel })} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: kfiValidated ? T.ok : T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "10px 17px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}>
                <Check size={14} /> {kfiValidated ? "Arbitration validated ✓" : "Validate the KFI arbitration"}
              </button>
            </div>
          </div>
          {kfiValidated && (
            <div style={{ marginTop: 12, display: "flex", alignItems: "flex-start", gap: 10, background: `${T.ok}14`, border: `1px solid ${T.ok}66`, borderRadius: 11, padding: "11px 14px" }}>
              <BadgeCheck size={16} color={T.ok} style={{ flexShrink: 0, marginTop: 1 }} />
              <div style={{ fontSize: 12, color: T.ink, lineHeight: 1.55 }}>
                <strong>KFI arbitration validated on {kfiValidated.at.toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })} at {kfiValidated.at.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</strong> — option « {kfiValidated.option} » · scenario {kfiValidated.scenario} · {mp(kfiValidated.total)} forecast · {kp(kfiValidated.panel)} on the partner panel · {kp(kfiValidated.uncovered)} uncovered and {kp(kfiValidated.hors)} off-panel before arbitration · verdict {kfiValidated.verdict} · chain {kfiValidated.chainOk ? "reconciled" : "to fix"}.
                <div style={{ fontSize: 11, color: T.faint, marginTop: 3 }}>Demonstration without persistence: summary kept on the page until reload. <span onClick={() => setKfiValidated(null)} style={{ color: T.blue, fontWeight: 700, cursor: "pointer" }}>Reopen the arbitration</span></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProductionPage({ st }) {
  const auditsTodo = PROD_SUPPLIERS.filter((s) => s.audit !== "Validated").length;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.ink }}>Production Panel</h2>
          <p style={{ margin: "4px 0 0", fontSize: 12.5, color: T.sub }}>Supplier panel performance, reconciliation of partner business plans with in-season RELEX forecasts, allocation and anticipation — continuously.</p>
        </div>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, fontFamily: MONO, fontSize: 11, color: T.sub, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 999, padding: "6px 13px" }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: "#00a3c4" }} /> live field data · <span style={{ color: T.blue, fontWeight: 700 }}>Venso</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "10px 13px", margin: "12px 0 18px" }}>
        <Sparkles size={15} color={T.human} style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontSize: 12, color: T.ink, lineHeight: 1.5 }}><strong>{EXPERTS.supply.role} —</strong> {EXPERTS.supply.txt}</span>
      </div>

      {/* ---- Panel performance — trajectory ---- */}
      <div style={{ fontSize: 13.5, fontWeight: 800, color: T.ink, marginBottom: 10 }}>Panel performance — trajectory</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12, marginBottom: 18 }}>
        {KPI_TRAJ.map((k) => (
          <div key={k.t} style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 13, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,83,160,.06)" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{k.t}</span>
              <TrendingUp size={14} color={k.c} style={{ marginLeft: "auto" }} />
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ fontFamily: MONO, fontSize: 26, fontWeight: 800, color: k.c }}>{k.val}</span>
              <span style={{ fontSize: 11.5, color: T.sub, marginLeft: 6 }}>{k.sub}</span>
            </div>
            <div style={{ margin: "8px 0" }}><Spark pts={k.spark} color={k.c} /></div>
            <div style={{ marginBottom: 8 }}><RuleStatus st={st} area={KFI_RULE_MAP[k.t].area} kpi={KFI_RULE_MAP[k.t].kpi} label="Group rule" /></div>
            <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, lineHeight: 1.5, borderTop: `1px solid ${T.lineSoft}`, paddingTop: 8 }}>{k.note}</div>
            <div style={{ display: "flex", marginTop: 8 }}>
              {k.tl.map(([m, v]) => (
                <div key={m} style={{ flex: 1 }}>
                  <div style={{ fontSize: 9.5, color: T.faint, fontFamily: MONO }}>{m}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, fontFamily: MONO, color: T.ink }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ---- Partner business plans × in-season forecasts (RELEX) ---- */}
      <KfiReconciliation st={st} />

      {/* ---- Supplier panel, followed by "Act now" and "Decisions to make" ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <TrendingUp size={15} color={T.accent} /><span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Supplier panel</span>
          <span style={{ fontSize: 11.5, color: T.faint }}>{PROD_SUPPLIERS.length} suppliers tracked · click for field details</span>
          <span style={{ marginLeft: "auto" }}><Chip color={T.warn}>{auditsTodo} audit{auditsTodo > 1 ? "s" : ""} to finalise</Chip></span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr>{["Supplier", "Country", "Status", "Audit", "Score", "2027 price"].map((c, j) => (
              <th key={c} style={{ textAlign: j === 0 ? "left" : j >= 4 ? "right" : "left", padding: "8px 10px", fontSize: 10, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>{c}</th>
            ))}</tr></thead>
            <tbody>
              {PROD_SUPPLIERS.map((s) => (
                <tr key={s.id} style={{ cursor: "pointer" }}>
                  <td style={{ padding: "11px 10px", borderBottom: `1px solid ${T.lineSoft}` }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                      <span style={{ fontWeight: 800, color: T.accent }}>{s.name}</span><GradeChip g={s.g} />
                    </span>
                  </td>
                  <td style={{ color: T.sub, fontFamily: MONO, borderBottom: `1px solid ${T.lineSoft}` }}>{s.pays}</td>
                  <td style={{ borderBottom: `1px solid ${T.lineSoft}` }}><span style={{ fontFamily: MONO, fontSize: 11.5, color: s.statut === "Open" ? T.sub : T.warn }}>{s.statut}</span></td>
                  <td style={{ borderBottom: `1px solid ${T.lineSoft}` }}><AuditChip s={s.audit} /></td>
                  <td style={{ textAlign: "right", fontFamily: MONO, fontWeight: 800, color: s.score >= 85 ? T.ok : s.score >= 70 ? T.warn : T.bad, borderBottom: `1px solid ${T.lineSoft}` }}>{s.score}</td>
                  <td style={{ textAlign: "right", borderBottom: `1px solid ${T.lineSoft}` }}>{s.prix2027 ? <Check size={15} color={T.ok} /> : <X size={15} color={T.bad} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ---- Act now / Decisions to make (attached to the supplier panel) ---- */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16, marginTop: 18, paddingTop: 16, borderTop: `1px solid ${T.lineSoft}` }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}><span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Act now</span><span style={{ width: 7, height: 7, borderRadius: 99, background: "#e05a5a" }} /></div>
            <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 10 }}>Field alerts raised by the Venso agents on the panel above</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {ALERTES.map((a) => (
                <div key={a.title} style={{ background: T.panel, border: `1px solid ${a.dot}44`, borderRadius: 11, padding: "11px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: a.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{a.title}</span>
                    <span style={{ marginLeft: "auto" }}><Chip color={a.tagC}>{a.tag}</Chip></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <span style={{ flex: 1, fontSize: 11, color: T.sub, fontFamily: MONO }}>{a.txt}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: T.blue, whiteSpace: "nowrap", cursor: "pointer" }}>{a.cta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: T.ink, marginBottom: 3 }}>Decisions to make</div>
            <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 10 }}>Recommendations based on crossing the business plan with field data</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {DECISIONS.map((d) => (
                <div key={d.title} style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 11, padding: "11px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ width: 7, height: 7, borderRadius: 99, background: d.dot, flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{d.title}</span>
                    <span style={{ marginLeft: "auto" }}><Chip color={d.tagC}>{d.tag}</Chip></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                    <span style={{ flex: 1, fontSize: 11, color: T.sub, fontFamily: MONO }}>{d.strong ? <><strong style={{ color: "#e05a5a" }}>{d.strong}</strong>{d.txt.replace(d.strong, "")}</> : d.txt}</span>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: T.blue, whiteSpace: "nowrap", cursor: "pointer" }}>{d.cta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Performance rules — Group cascade & simulation
   ============================================================ */
const CASCADE_SCOPE = {
  "Offer & Collection": "PVI, margin, volumes and product footprint",
  "Go to Market": "price, volume and sourcing scenarios",
  "Supply": "landed cost, capacity and supplier risk",
  "KFI": "industrial allocation, panel trajectory and compliance with partner commitments",
};
const SIM_SCEN = [
  { id: "actuel", name: "Current trajectory", ca: 43.8, co2: 5376, marge: 55, note: "Collection plan unchanged" },
  { id: "proche", name: "Nearshore sourcing", ca: 42.9, co2: 4515, marge: 53.2, note: "−16 % CO₂ · purchase cost +3,4 %" },
  { id: "volumes", name: "Volume reduction", ca: 41.7, co2: 4784, marge: 55.8, note: "−11 % CO₂ · reduced markdown" },
  { id: "mix", name: "Agent-recommended mix", ca: 43.2, co2: 4398, marge: 54.1, note: "Nearshore on 4 at-risk references" },
];
function PerformancePage({ st }) {
  const { perfRules: r, setPerfRules, collectionCO2, breaches } = st;
  const [scen, setScen] = useState("mix");
  const s = SIM_SCEN.find((x) => x.id === scen);
  const [scan, setScan] = useState("idle");
  const runScan = () => { setScan("running"); setTimeout(() => setScan("done"), 1100); };
  const budgetAlerts = useMemo(() => {
    const lvl = (used, total) => (used > total ? "Overrun" : used / total > 0.85 ? "Watch" : "OK");
    const items = [
      { entity: "Baby PM", metric: "Revenue", used: 43.8, total: r.caEnvelope, unit: "M€" },
      { entity: "Baby PM", metric: "Carbon", used: collectionCO2, total: r.carbonEnvelope, unit: "t CO₂e" },
      ...CDP_CONTRIB.slice(1).map((c) => ({ entity: c.name.replace("CDP", "PM"), metric: "Revenue", used: c.ca, total: c.budget, unit: "M€" })),
      { entity: "Market Manager — Kids Collection", metric: "Consolidated carbon (×3)", used: +(collectionCO2 * 3).toFixed(1), total: r.carbonEnvelope * 3, unit: "t CO₂e" },
      { entity: "Market Manager — Kids Collection", metric: "Consolidated revenue (×3)", used: 131.4, total: r.caEnvelope * 3, unit: "M€" },
    ];
    const rank = { "Overrun": 0, "Watch": 1, "OK": 2 };
    return items.map((i) => ({ ...i, pct: Math.round((i.used / i.total) * 100), level: lvl(i.used, i.total) })).sort((a, b) => rank[a.level] - rank[b.level]);
  }, [r, collectionCO2]);
  const nbAlerts = budgetAlerts.filter((a) => a.level !== "OK").length;
  const setR = (k, v) => setPerfRules((p) => ({ ...p, [k]: v }));
  const fields = [
    { k: "caEnvelope", label: "Revenue envelope", unit: "M€", step: 1 },
    { k: "carbonEnvelope", label: "Carbon envelope", unit: "t CO₂e", step: 100 },
    { k: "minMargin", label: "Minimum entry margin", unit: "%", step: 0.5 },
    { k: "maxProductCO2", label: "Maximum product footprint", unit: "kg CO₂e/piece", step: 0.1 },
  ];
  const areas = ["Offer & Collection", "Go to Market", "Supply", "KFI"];
  const kpis = [
    { label: "Financial impact", val: `${s.ca.toLocaleString("fr-FR")} M€`, ok: s.ca <= r.caEnvelope, icon: Wallet },
    { label: "Carbon impact", val: `${u(s.co2)} t CO₂e`, ok: s.co2 <= r.carbonEnvelope, icon: Leaf },
    { label: "Entry margin", val: `${s.marge.toLocaleString("fr-FR")} %`, ok: s.marge >= r.minMargin, icon: TrendingUp },
  ];
  const reco = s.co2 > r.carbonEnvelope
    ? "Carbon exceeds the Group envelope: switch the highest-emitting references to nearshore sourcing to get back under the ceiling."
    : "The carbon trajectory is compatible with the Group envelope: roll-out to operations is possible without further arbitration.";
  const fmtM = (n) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  const fmtT = (n) => u(Math.round(n));
  const card = { background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)" };

  return (
    <div>
      <PageHeader
        title="Performance rules"
        desc="The Group steering cockpit: write the financial and carbon rules, measure their application in real time and arbitrate before rolling out to operations."
        expert={{ role: "Performance leader", txt: "Sets the envelopes and orchestrates Group arbitrations." }}
      />

      {/* B. Rules engine + Instant impact */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16, marginBottom: 18 }}>
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <Scale size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Group rules engine</span>
            <span style={{ marginLeft: "auto" }}><Chip color={T.ok}>Active</Chip></span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {fields.map((f) => (
              <label key={f.k} style={{ display: "flex", alignItems: "center", gap: 10, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "9px 12px" }}>
                <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: T.ink }}>{f.label}</span>
                <input type="number" step={f.step} value={r[f.k]} onChange={(e) => setR(f.k, e.target.value === "" ? 0 : +e.target.value)} style={{ width: 96, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 8, padding: "7px 9px", fontFamily: MONO, fontSize: 13, fontWeight: 700, color: T.ink, outline: "none", textAlign: "right" }} />
                <span style={{ fontSize: 10.5, fontFamily: MONO, color: T.faint, minWidth: 92 }}>{f.unit}</span>
              </label>
            ))}
          </div>
          <div style={{ fontSize: 10.5, color: T.faint, marginTop: 10, fontFamily: MONO }}>Every entry instantly recalculates the gauges, breaches and banners of the 4 operational pages.</div>
        </div>

        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <Sparkles size={15} color={T.human} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Instant impact</span>
            <span style={{ marginLeft: "auto" }}><Chip color={breaches.length ? T.bad : T.ok}>{breaches.length} breach{breaches.length > 1 ? "es" : ""}</Chip></span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
            <PMGauge icon={Wallet} label="Committed revenue / envelope" used={43.8} total={r.caEnvelope} unit="M€" fmt={fmtM} color={T.accent} />
            <PMGauge icon={Leaf} label="Committed CO₂ / envelope" used={collectionCO2} total={r.carbonEnvelope} unit="t CO₂e" fmt={fmtT} color={collectionCO2 > r.carbonEnvelope ? T.bad : T.ok} />
          </div>
          <span style={microLbl}>Proposed arbitrations</span>
          {breaches.length === 0 ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: T.ok }}><Check size={14} /> All rules are met.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {breaches.slice(0, 4).map((b, i) => (
                <div key={i} style={{ background: T.panel2, border: `1px solid ${T.bad}44`, borderRadius: 9, padding: "8px 11px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}><Chip color={T.bad}>{b.area}</Chip><span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink }}>{b.label}</span></div>
                  <div style={{ fontSize: 11, color: T.sub, marginTop: 3 }}>Arbitration: {b.action}</div>
                </div>
              ))}
            </div>
          )}

          {/* Organisation scan — budget alerts */}
          <div style={{ marginTop: 14, borderTop: `1px dashed ${T.line}`, paddingTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: scan === "done" ? 10 : 0 }}>
              <button onClick={runScan} disabled={scan === "running"} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: scan === "running" ? "default" : "pointer", background: scan === "running" ? T.line : T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 15px", fontSize: 12, fontWeight: 800, fontFamily: SANS }}>
                <Network size={14} /> {scan === "idle" ? "Scan the organisation" : scan === "running" ? "Scan in progress…" : "Re-run scan"}
              </button>
              {scan === "running" && <span style={{ fontSize: 11.5, color: T.faint, fontFamily: MONO }}>analysing product manager and market manager cockpits…</span>}
              {scan === "done" && <span style={{ marginLeft: "auto" }}><Chip color={nbAlerts ? T.warn : T.ok}>{nbAlerts ? `${nbAlerts} budget alert${nbAlerts > 1 ? "s" : ""}` : "No budget alerts"}</Chip></span>}
            </div>
            {scan === "done" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {budgetAlerts.map((a, i) => {
                  const c = a.level === "Overrun" ? T.bad : a.level === "Watch" ? T.warn : T.ok;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: T.panel2, border: `1px solid ${c}55`, borderRadius: 9, padding: "8px 11px" }}>
                      <span style={{ width: 7, height: 7, borderRadius: 99, background: c, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: T.ink }}>{a.entity} <span style={{ color: T.faint, fontWeight: 600 }}>· {a.metric}</span></div>
                        <div style={{ fontSize: 10.5, fontFamily: MONO, color: T.sub, marginTop: 2 }}>{a.used.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} / {a.total.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} {a.unit} · {a.pct} % committed</div>
                      </div>
                      <Chip color={c}>{a.level}</Chip>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* C. Operational cascade */}
      <div style={{ ...card, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <GitBranch size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Operational cascade — one rule, four business translations</span>
        </div>
        <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Each Group rule is translated into each team's scope and displayed as a banner on its page.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
          {areas.map((a) => {
            const n = breaches.filter((b) => b.area === a).length;
            const c = n ? T.bad : T.ok;
            return (
              <div key={a} style={{ background: T.panel2, border: `1px solid ${c}55`, borderRadius: 11, padding: "11px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <ShieldCheck size={14} color={c} /><span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{a}</span>
                  <span style={{ marginLeft: "auto" }}><Chip color={c}>{n ? `${n} alert${n > 1 ? "s" : ""}` : "OK"}</Chip></span>
                </div>
                <div style={{ fontSize: 11, color: T.sub, marginTop: 6, lineHeight: 1.45 }}>{CASCADE_SCOPE[a]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* D. Simulation agent */}
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <Sparkles size={15} color={T.human} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Finance + carbon simulation agent</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: MONO, fontSize: 11, color: T.human }}><Sparkles size={12} /> Venso simulation</span>
        </div>
        <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Each scenario is evaluated live against the Group rules in force.</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {SIM_SCEN.map((x) => {
            const on = x.id === scen;
            return (
              <button key={x.id} onClick={() => setScen(x.id)} style={{ cursor: "pointer", background: on ? T.accent : T.panel, color: on ? "#ffffff" : T.ink, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 9, padding: "9px 15px", fontSize: 12, fontWeight: 800, fontFamily: SANS }}>{x.name}</button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 12, marginBottom: 12 }}>
          {kpis.map((k) => {
            const c = k.ok ? T.ok : T.bad;
            return (
              <div key={k.label} style={{ background: T.panel2, border: `1px solid ${c}55`, borderRadius: 11, padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, color: T.sub, fontSize: 11.5, fontWeight: 600 }}><k.icon size={14} color={c} />{k.label}</div>
                <div style={{ fontFamily: MONO, fontSize: 21, fontWeight: 800, color: T.ink, marginTop: 6 }}>{k.val}</div>
                <div style={{ marginTop: 7 }}><Chip color={c}>{k.ok ? "Rule met" : "Rule breached"}</Chip></div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 10, padding: "10px 13px" }}>
          <Sparkles size={14} color={T.human} style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 12, color: T.ink, lineHeight: 1.5 }}><strong>Agent recommendation —</strong> {reco} <span style={{ color: T.faint, fontFamily: MONO, fontSize: 11 }}>({s.note})</span></div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Financial Framework — 3-step budget framing (monitoring moved to the Monitoring tab)
   ============================================================ */
const IND = [
  { k: "budget", label: "Budget", unit: "M€", step: 10, fmt: (v) => `${u(v)} M€` },
  { k: "demarque", label: "Markdown", unit: "%", step: 0.5, fmt: (v) => `${fr1(v)} %` },
  { k: "pvm", label: "Average selling price", unit: "€", step: 0.1, fmt: (v) => `${fr2(v)} €` },
  { k: "tme", label: "TME", unit: "%", step: 0.5, fmt: (v) => `${fr1(v)} %` },
  { k: "tmv", label: "TMV", unit: "%", step: 0.5, fmt: (v) => `${fr1(v)} %` },
];
const numInput = { width: 86, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 8, padding: "6px 8px", fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: T.ink, outline: "none", textAlign: "right" };
const cardB = { background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)", marginBottom: 16 };
const ResetBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: "transparent", color: T.faint, border: `1px solid ${T.line}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}><RotateCcw size={12} /> Reset step</button>
);
const StatusChip = ({ s }) => <Chip color={s === "vert" ? T.ok : s === "orange" ? T.warn : T.bad}>{s === "vert" ? "On track" : s === "orange" ? "Deviation" : "Off track"}</Chip>;

/* Analysis of a department submission against the target sent */
const analyseCopie = (c, obj) => {
  const ecart = c.budget - obj.budget;
  const ecartPct = (ecart / obj.budget) * 100;
  const tmvExp = tmvModel(c.tme, c.demarque);
  const tmeExp = tmeModel(c.tmv, c.demarque);
  const dTmv = +(c.tmv - tmvExp).toFixed(1);
  const dTme = +(c.tme - tmeExp).toFixed(1);
  const chaineOk = Math.abs(dTmv) <= 1.5;
  const prixNet = c.pvm * (1 - c.demarque / 200);
  const cout = c.pvm * (1 - c.tme / 100);
  const verdict = !chaineOk ? "Inconsistency" : Math.abs(ecartPct) > 1 ? "Gap" : "Compliant";
  let txt;
  if (!chaineOk) txt = `With ${fr1(c.demarque)} % markdown and a PVM of ${fr2(c.pvm)} €, the average net price comes out at ${fr2(prixNet)} €; at a TME of ${fr1(c.tme)} %, the average cost is ${fr2(cout)} €, i.e. an expected TMV of ${fr1(tmvExp)} %. The declared TMV of ${fr1(c.tmv)} % does not reconcile (${dTmv > 0 ? "+" : ""}${fr1(dTmv)} pts) — conversely, the TME consistent with this TMV would be ${fr1(tmeExp)} % (${dTme > 0 ? "+" : ""}${fr1(dTme)} pts).`;
  else if (verdict === "Gap") txt = `Margin chain consistent (expected TMV ${fr1(tmvExp)} %, declared ${fr1(c.tmv)} %), but budget submitted at ${u(c.budget)} M€ against a ${u(obj.budget)} M€ target: ${ecart > 0 ? "+" : ""}${u(ecart)} M€ (${ecartPct > 0 ? "+" : ""}${fr1(ecartPct)} %) outside the envelope.`;
  else txt = `Submission compliant: budget aligned with the target (${u(c.budget)} M€), margin chain reconciled (expected TMV ${fr1(tmvExp)} %, declared ${fr1(c.tmv)} %).`;
  return { verdict, txt, ecart, ecartPct, tmvExp, tmeExp, dTmv, chaineOk };
};

/* ============================================================
   Financial Framework — offers under the "Offers & Collections" department.
   Same offer ids are referenced by STORE_SUBMISSIONS (one offer referential).
   ============================================================ */
const BUDGET_OFFERS_DEPT = "Offers & Collections";
const BUDGET_OFFERS = [
  { id: "of-baby-night", name: "Baby nightwear", collection: "Baby S1 2027", budget: 210, demarque: 26, pvm: 11.5, tme: 58, tmv: 51.8 },
  { id: "of-baby-under", name: "Baby underwear & bodysuits", collection: "Baby S1 2027", budget: 260, demarque: 24, pvm: 9.4, tme: 59, tmv: 53.0 },
  { id: "of-baby-licences", name: "Baby licences", collection: "Baby S1 2027", budget: 120, demarque: 31, pvm: 12.2, tme: 56, tmv: 48.6 },
  { id: "of-girls", name: "Girls 2-14 core", collection: "Kids S1 2027", budget: 230, demarque: 28, pvm: 14.1, tme: 58, tmv: 51.4 },
  { id: "of-boys", name: "Boys 2-14 core", collection: "Kids S1 2027", budget: 180, demarque: 29, pvm: 13.6, tme: 57, tmv: 50.2 },
  { id: "of-capsules", name: "Kids capsules & collabs", collection: "Kids S1 2027", budget: 50, demarque: 33, pvm: 15.8, tme: 55, tmv: 49.5 },
];
const OFFER_TOL = { budgetPct: 1, ratePts: 1.5, pvmEur: 0.5 };
/* Pure aggregation of the offers against their department line and the global budget */
function computeOfferBreakdown(offers, dept, glob) {
  const total = offers.reduce((s, o) => s + o.budget, 0);
  const w = (k) => (total ? offers.reduce((s, o) => s + o.budget * o[k], 0) / total : 0);
  const weighted = { demarque: w("demarque"), pvm: w("pvm"), tme: w("tme"), tmv: w("tmv") };
  const rows = offers.map((o) => {
    const tmvExp = tmvModel(o.tme, o.demarque);
    const dTmv = +(o.tmv - tmvExp).toFixed(1);
    return { ...o, shareDept: dept.budget ? (o.budget / dept.budget) * 100 : 0, shareGlobal: glob.budget ? (o.budget / glob.budget) * 100 : 0, tmvExp, dTmv, chainOk: Math.abs(dTmv) <= 1.5 };
  });
  const budgetGap = total - dept.budget;
  const budgetGapPct = dept.budget ? (budgetGap / dept.budget) * 100 : 0;
  const budgetOk = Math.abs(budgetGapPct) <= OFFER_TOL.budgetPct;
  const checks = [
    { k: "demarque", label: "Markdown", offers: weighted.demarque, dept: dept.demarque, diff: weighted.demarque - dept.demarque, tol: OFFER_TOL.ratePts, fmt: (v) => `${fr1(v)} %`, unit: "pts" },
    { k: "pvm", label: "Average selling price", offers: weighted.pvm, dept: dept.pvm, diff: weighted.pvm - dept.pvm, tol: OFFER_TOL.pvmEur, fmt: (v) => `${fr2(v)} €`, unit: "€" },
    { k: "tme", label: "TME", offers: weighted.tme, dept: dept.tme, diff: weighted.tme - dept.tme, tol: OFFER_TOL.ratePts, fmt: (v) => `${fr1(v)} %`, unit: "pts" },
    { k: "tmv", label: "TMV", offers: weighted.tmv, dept: dept.tmv, diff: weighted.tmv - dept.tmv, tol: OFFER_TOL.ratePts, fmt: (v) => `${fr1(v)} %`, unit: "pts" },
  ].map((c) => ({ ...c, ok: Math.abs(c.diff) <= c.tol }));
  return { total, weighted, rows, budgetGap, budgetGapPct, budgetOk, checks, chainBad: rows.filter((r) => !r.chainOk).length, allOk: budgetOk && checks.every((c) => c.ok) && rows.every((r) => r.chainOk) };
}

function OfferBreakdown({ glob, dept, validated, validatedAt }) {
  const [offerId, setOfferId] = useState(BUDGET_OFFERS[0].id);
  const bd = useMemo(() => computeOfferBreakdown(BUDGET_OFFERS, dept, glob), [dept, glob]);
  const th = (j, n) => ({ textAlign: j === 0 ? "left" : "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" });
  const td = { padding: "7px 8px", borderBottom: `1px solid ${T.lineSoft}`, fontSize: 12, whiteSpace: "nowrap" };
  const num = { ...td, textAlign: "right", fontFamily: MONO, color: T.sub };
  const box = { background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 13px" };
  return (
    <div style={{ marginTop: 16, borderTop: `1px solid ${T.lineSoft}`, paddingTop: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
        <ShoppingBag size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>{BUDGET_OFFERS_DEPT} — offer breakdown</span>
        {validated ? <Chip color={T.ok}>Global budget validated · {validatedAt}</Chip> : <Chip color={T.warn}>Validation required</Chip>}
        <span style={{ marginLeft: "auto", fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{BUDGET_OFFERS.length} offers · tolerance {OFFER_TOL.budgetPct} % budget · {fr1(OFFER_TOL.ratePts)} pts rates · {fr2(OFFER_TOL.pvmEur)} € price</span>
      </div>
      {!validated ? (
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: T.panel2, border: `1px dashed ${T.line}`, borderRadius: 11, padding: "14px 16px" }}>
          <Scale size={16} color={T.faint} />
          <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.5 }}><strong style={{ color: T.ink }}>Validate the global budget before breaking it down into offers</strong> — offer figures are not shown as official until the global budget snapshot is validated in step 1.</div>
        </div>
      ) : (() => {
        const o = bd.rows.find((x) => x.id === offerId) || bd.rows[0];
        const contrib = [
          { label: "Budget", val: `${u(o.budget)} M€`, ref: `${u(dept.budget)} M€ department · ${u(glob.budget)} M€ global`, txt: `${fr1(o.shareDept)} % of ${dept.n} · ${fr1(o.shareGlobal)} % of the global budget` },
          { label: "Markdown", val: `${fr1(o.demarque)} %`, ref: `${fr1(dept.demarque)} % department`, txt: `weight ${fr1(o.shareDept)} % → ${fr1((o.demarque * o.shareDept) / 100)} pts of the ${fr1(bd.weighted.demarque)} % weighted markdown` },
          { label: "Average selling price", val: `${fr2(o.pvm)} €`, ref: `${fr2(dept.pvm)} € department`, txt: `weight ${fr1(o.shareDept)} % → ${fr2((o.pvm * o.shareDept) / 100)} € of the ${fr2(bd.weighted.pvm)} € weighted average price` },
          { label: "TME", val: `${fr1(o.tme)} %`, ref: `${fr1(dept.tme)} % department`, txt: `weight ${fr1(o.shareDept)} % → ${fr1((o.tme * o.shareDept) / 100)} pts of the ${fr1(bd.weighted.tme)} % weighted TME` },
          { label: "TMV", val: `${fr1(o.tmv)} %`, ref: `${fr1(dept.tmv)} % department · expected ${fr1(o.tmvExp)} % from TME and markdown`, txt: `weight ${fr1(o.shareDept)} % → ${fr1((o.tmv * o.shareDept) / 100)} pts of the ${fr1(bd.weighted.tmv)} % weighted TMV` },
        ];
        return (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
              <span style={{ fontSize: 11.5, color: T.sub }}>Offer</span>
              <select value={o.id} onChange={(e) => setOfferId(e.target.value)} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "7px 10px", color: T.ink, fontSize: 12, fontFamily: SANS, fontWeight: 700, cursor: "pointer", outline: "none", maxWidth: "100%" }}>
                {BUDGET_OFFERS.map((x) => <option key={x.id} value={x.id}>{x.name} — {x.collection}</option>)}
              </select>
              <Chip color={o.chainOk ? T.ok : T.bad}>{o.chainOk ? "Margin chain consistent" : `Margin chain inconsistency ${o.dTmv > 0 ? "+" : ""}${fr1(o.dTmv)} pts`}</Chip>
              <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{o.collection} · id {o.id}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10, marginBottom: 14 }}>
              {contrib.map((c) => (
                <div key={c.label} style={box}>
                  <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, textTransform: "uppercase" }}>{c.label}</div>
                  <div style={{ fontFamily: MONO, fontSize: 19, fontWeight: 800, color: T.ink, marginTop: 4 }}>{c.val}</div>
                  <div style={{ fontSize: 10.5, color: T.faint, marginTop: 3 }}>reference: {c.ref}</div>
                  <div style={{ fontSize: 11, color: T.sub, marginTop: 5, lineHeight: 1.45 }}>contribution: {c.txt}</div>
                </div>
              ))}
            </div>
            <span style={microLbl}>All offers — budget shares and margin chain</span>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>{["Offer", "Budget", `% of ${dept.n}`, "% of global", "Markdown", "Avg. price", "TME", "TMV", "Chain"].map((h, j) => <th key={h} style={th(j)}>{h}</th>)}</tr></thead>
                <tbody>
                  {bd.rows.map((r) => (
                    <tr key={r.id} onClick={() => setOfferId(r.id)} style={{ cursor: "pointer", background: r.id === o.id ? `${T.accent}10` : "transparent" }}>
                      <td style={td}><div style={{ fontWeight: 800, color: T.ink }}>{r.name}</div><div style={{ fontSize: 10.5, color: T.faint }}>{r.collection}</div></td>
                      <td style={{ ...num, fontWeight: 800, color: T.ink }}>{u(r.budget)} M€</td>
                      <td style={num}>{fr1(r.shareDept)} %</td>
                      <td style={num}>{fr1(r.shareGlobal)} %</td>
                      <td style={num}>{fr1(r.demarque)} %</td>
                      <td style={num}>{fr2(r.pvm)} €</td>
                      <td style={num}>{fr1(r.tme)} %</td>
                      <td style={num}>{fr1(r.tmv)} %</td>
                      <td style={{ ...td, textAlign: "right" }}><Chip color={r.chainOk ? T.ok : T.bad}>{r.chainOk ? "Consistent" : `${r.dTmv > 0 ? "+" : ""}${fr1(r.dTmv)} pts off`}</Chip></td>
                    </tr>
                  ))}
                  <tr style={{ background: T.panel2 }}>
                    <td style={{ ...td, fontWeight: 800, color: T.ink }}>Offers total vs {dept.n}</td>
                    <td style={{ ...num, fontWeight: 800, color: bd.budgetOk ? T.ok : T.bad }}>{u(bd.total)} / {u(dept.budget)} M€</td>
                    <td style={num}>{fr1(bd.rows.reduce((s, r) => s + r.shareDept, 0))} %</td>
                    <td style={num}>{fr1(bd.rows.reduce((s, r) => s + r.shareGlobal, 0))} %</td>
                    <td style={{ ...num, color: bd.checks[0].ok ? T.ok : T.bad }}>{fr1(bd.weighted.demarque)} %</td>
                    <td style={{ ...num, color: bd.checks[1].ok ? T.ok : T.bad }}>{fr2(bd.weighted.pvm)} €</td>
                    <td style={{ ...num, color: bd.checks[2].ok ? T.ok : T.bad }}>{fr1(bd.weighted.tme)} %</td>
                    <td style={{ ...num, color: bd.checks[3].ok ? T.ok : T.bad }}>{fr1(bd.weighted.tmv)} %</td>
                    <td style={{ ...td, textAlign: "right" }}><Chip color={bd.chainBad ? T.bad : T.ok}>{bd.chainBad ? `${bd.chainBad} to fix` : "All consistent"}</Chip></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 12, background: `${bd.allOk ? T.ok : T.warn}10`, border: `1px solid ${bd.allOk ? T.ok : T.warn}66`, borderRadius: 10, padding: "9px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <Sparkles size={14} color={T.human} />
                <span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>Reconciliation with the {dept.n} line</span>
                <span style={{ marginLeft: "auto" }}><Chip color={bd.allOk ? T.ok : T.warn}>{bd.allOk ? "Offers reconciled" : "Gaps to arbitrate"}</Chip></span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 6, fontSize: 11.5, color: T.sub, lineHeight: 1.45 }}>
                <span style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>{bd.budgetOk ? <Check size={13} color={T.ok} style={{ flexShrink: 0, marginTop: 2 }} /> : <X size={13} color={T.bad} style={{ flexShrink: 0, marginTop: 2 }} />}<span>Budget: offers {u(bd.total)} M€ vs department {u(dept.budget)} M€ ({bd.budgetGap > 0 ? "+" : ""}{u(bd.budgetGap)} M€, {bd.budgetGapPct > 0 ? "+" : ""}{fr1(bd.budgetGapPct)} %, tolerance {OFFER_TOL.budgetPct} %)</span></span>
                {bd.checks.map((c) => (
                  <span key={c.k} style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>{c.ok ? <Check size={13} color={T.ok} style={{ flexShrink: 0, marginTop: 2 }} /> : <X size={13} color={T.bad} style={{ flexShrink: 0, marginTop: 2 }} />}<span>{c.label}: offers weighted {c.fmt(c.offers)} vs department {c.fmt(c.dept)} ({c.diff > 0 ? "+" : ""}{c.unit === "€" ? fr2(c.diff) : fr1(c.diff)} {c.unit}, tolerance {c.unit === "€" ? fr2(c.tol) : fr1(c.tol)} {c.unit})</span></span>
                ))}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

function BudgetModule({ fw }) {
  const [step, setStep] = useState(1);
  const { budgetGlob: glob, setBudgetGlob: setGlob, budgetDepts: depts, setBudgetDepts: setDepts } = fw; /* shared with Monitoring */
  const [sentAt, setSentAt] = useState(null);
  const [mailOpen, setMailOpen] = useState(null);
  const [received, setReceived] = useState(false);
  /* Explicit validation of the global budget: snapshot taken when moving to the breakdown; any later change invalidates it */
  const [globValidation, setGlobValidation] = useState(null);
  const globValid = !!globValidation && IND.every((i) => globValidation.snap[i.k] === glob[i.k]);
  const validatedAt = globValidation ? globValidation.at : "";
  const validateGlobal = () => { setGlobValidation({ at: new Date().toLocaleString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }), snap: { ...glob } }); setStep(2); };

  const setG = (k, v) => setGlob((g) => ({ ...g, [k]: v }));
  const setD = (i, k, v) => setDepts((ds) => ds.map((d, j) => (j === i ? { ...d, [k]: v } : d)));
  const num = (e) => (e.target.value === "" ? 0 : +e.target.value);
  const sumDepts = depts.reduce((s, d) => s + d.budget, 0);
  const sumOk = Math.abs(sumDepts - glob.budget) <= glob.budget * 0.01;

  /* Step 3 — analysis */
  const analyses = received ? BUDGET_COPIES.map((c) => ({ c, obj: depts.find((d) => d.n === c.n) || c, a: analyseCopie(c, depts.find((d) => d.n === c.n) || c) })) : [];
  const sumCopies = BUDGET_COPIES.reduce((s, c) => s + c.budget, 0);
  const gapGlobal = sumCopies - glob.budget;
  const gapPct = (gapGlobal / glob.budget) * 100;
  const aReprendre = analyses.filter((x) => x.a.verdict !== "Compliant").sort((x, y) => (x.a.verdict === "Inconsistency" ? -1 : 1));

  const STEPS = [["Global budget", "top-down"], ["Breakdown", "by department"], ["Submissions & arbitration", "bottom-up"]];

  return (
    <div>
      {/* Stepper */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8, marginBottom: 18 }}>
        {STEPS.map(([t, sub], i) => {
          const n = i + 1, on = step === n, done = step > n;
          const c = on ? T.accent : done ? T.ok : T.faint;
          return (
            <button key={t} onClick={() => setStep(n)} style={{ cursor: "pointer", textAlign: "left", background: on ? `${T.accent}10` : T.panel, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 11, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, fontFamily: SANS }}>
              <span style={{ width: 26, height: 26, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: on || done ? c : "transparent", border: `1.5px solid ${c}`, color: on || done ? "#ffffff" : c, fontFamily: MONO, fontSize: 12, fontWeight: 800 }}>{done ? <Check size={13} /> : n}</span>
              <span><span style={{ display: "block", fontSize: 12, fontWeight: 800, color: T.ink }}>{t}</span><span style={{ display: "block", fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{sub}</span></span>
            </button>
          );
        })}
      </div>

      {/* ---- Step 1 ---- */}
      {step === 1 && (
        <div style={cardB}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Wallet size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Kiabi global budget — fiscal year Sept. 2026 → Aug. 2027</span>
            {globValidation && <Chip color={globValid ? T.ok : T.warn}>{globValid ? `Global budget validated · ${validatedAt}` : "Changed since validation — validate again"}</Chip>}
            <ResetBtn onClick={() => setGlob({ ...BUDGET_GLOBAL })} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Indicators set by the Group before breakdown. All values are editable.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
            {[["budget", "Global budget", "M€", 10], ["demarque", "Global markdown rate", "%", 0.5], ["pvm", "Average selling price", "€", 0.1], ["tme", "TME — entry margin rate", "%", 0.5], ["tmv", "TMV — sales margin rate", "%", 0.5]].map(([k, l, unit, stp]) => (
              <label key={k} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "10px 12px" }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.sub, marginBottom: 6 }}>{l}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="number" step={stp} value={glob[k]} onChange={(e) => setG(k, num(e))} style={{ ...numInput, width: 110, fontSize: 15 }} />
                  <span style={{ fontFamily: MONO, fontSize: 11, color: T.faint }}>{unit}</span>
                </span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap", background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 10, padding: "9px 12px" }}>
            <Sparkles size={14} color={T.human} />
            <span style={{ fontSize: 11.5, color: T.ink }}>Chain check: at a TME of {fr1(glob.tme)} % and {fr1(glob.demarque)} % markdown, the expected TMV is <strong>{fr1(tmvModel(glob.tme, glob.demarque))} %</strong> — {Math.abs(tmvModel(glob.tme, glob.demarque) - glob.tmv) <= 1.5 ? "consistent with the TMV set." : "the TMV set does not reconcile."}</span>
            <span style={{ marginLeft: "auto" }}><Chip color={Math.abs(tmvModel(glob.tme, glob.demarque) - glob.tmv) <= 1.5 ? T.ok : T.bad}>{Math.abs(tmvModel(glob.tme, glob.demarque) - glob.tmv) <= 1.5 ? "Chain consistent" : "To fix"}</Chip></span>
          </div>
          <div style={{ marginTop: 14 }}><button onClick={validateGlobal} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}>{globValid ? "Global budget validated — go to the breakdown" : "Validate the global budget and break it down"} <ArrowRight size={14} /></button></div>
        </div>
      )}

      {/* ---- Step 2 ---- */}
      {step === 2 && (
        <div style={cardB}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Layers size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Breakdown by department</span>
            {globValid ? <Chip color={T.ok}>Global budget validated · {validatedAt}</Chip> : <Chip color={T.warn}>{globValidation ? "Global budget changed — validate it again in step 1" : "Global budget not validated"}</Chip>}
            <ResetBtn onClick={() => { setDepts(BUDGET_DEPTS.map((d) => ({ ...d }))); setSentAt(null); setMailOpen(null); }} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Editable split of the 5 indicators. The sum of the budgets must equal the global budget ({u(glob.budget)} M€).</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr>
                <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>Department</th>
                {IND.map((i) => <th key={i.k} style={{ textAlign: "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{i.label} ({i.unit})</th>)}
              </tr></thead>
              <tbody>
                {depts.map((d, i) => (
                  <tr key={d.n}>
                    <td style={{ padding: "7px 8px", borderBottom: `1px solid ${T.lineSoft}` }}><span style={{ display: "block", fontSize: 12, fontWeight: 800, color: T.ink }}>{d.n}</span><span style={{ fontSize: 10, color: T.faint }}>{d.resp}</span></td>
                    {IND.map((ind) => <td key={ind.k} style={{ textAlign: "right", padding: "5px 8px", borderBottom: `1px solid ${T.lineSoft}` }}><input type="number" step={ind.step} value={d[ind.k]} onChange={(e) => setD(i, ind.k, num(e))} style={numInput} /></td>)}
                  </tr>
                ))}
                <tr>
                  <td style={{ padding: "8px 8px", fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Departments total</td>
                  <td style={{ textAlign: "right", padding: "8px 8px", fontFamily: MONO, fontSize: 12.5, fontWeight: 800, color: sumOk ? T.ok : T.bad }}>{u(sumDepts)} M€</td>
                  <td colSpan={4} style={{ textAlign: "right", padding: "8px 8px" }}><Chip color={sumOk ? T.ok : T.bad}>{sumOk ? `= global budget ${u(glob.budget)} M€` : `gap ${sumDepts - glob.budget > 0 ? "+" : ""}${u(sumDepts - glob.budget)} M€ vs global`}</Chip></td>
                </tr>
              </tbody>
            </table>
          </div>
          <OfferBreakdown glob={glob} dept={depts.find((d) => d.n === BUDGET_OFFERS_DEPT) || depts[0]} validated={globValid} validatedAt={validatedAt} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <button onClick={() => setSentAt(new Date().toLocaleDateString("fr-FR"))} disabled={!sumOk} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: sumOk ? "pointer" : "default", background: sumOk ? T.accent : T.line, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Send size={14} /> Send targets to department heads</button>
            {!sumOk && <span style={{ fontSize: 11.5, color: T.bad }}>Adjust the budgets to match the global total before sending.</span>}
            {sentAt && <button onClick={() => setStep(3)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.panel2, color: T.ink, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}>Await submissions <ArrowRight size={14} /></button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 10, marginTop: 14 }}>
            {depts.map((d, i) => (
              <div key={d.n} style={{ background: T.panel2, border: `1px solid ${sentAt ? T.ok + "55" : T.line}`, borderRadius: 11, padding: "11px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{d.n}</span>
                  <span style={{ marginLeft: "auto" }}><Chip color={sentAt ? T.ok : T.faint}>{sentAt ? `Targets sent on ${sentAt}` : "In preparation"}</Chip></span>
                </div>
                <div style={{ fontSize: 10.5, color: T.faint, marginTop: 4 }}>{d.resp} · {u(d.budget)} M€ · TME {fr1(d.tme)} % · TMV {fr1(d.tmv)} %</div>
                {sentAt && <button onClick={() => setMailOpen(mailOpen === i ? null : i)} style={{ marginTop: 8, cursor: "pointer", background: "transparent", color: T.blue, border: "none", padding: 0, fontSize: 11.5, fontWeight: 700, fontFamily: SANS }}>{mailOpen === i ? "Hide email" : "View sent email →"}</button>}
                {sentAt && mailOpen === i && (
                  <div style={{ marginTop: 8, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 11px", fontSize: 11.5, color: T.sub, lineHeight: 1.6 }}>
                    <div><strong style={{ color: T.ink }}>Subject:</strong> Budget targets 2026-2027 — {d.n}</div>
                    <div style={{ marginTop: 5 }}>Hello, here are the targets set for your department within the {u(glob.budget)} M€ Group budget: budget <strong>{u(d.budget)} M€</strong>, markdown <strong>{fr1(d.demarque)} %</strong>, average selling price <strong>{fr2(d.pvm)} €</strong>, TME <strong>{fr1(d.tme)} %</strong>, TMV <strong>{fr1(d.tmv)} %</strong>. Please send back your submission within 15 days. — Performance Leader</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---- Step 3 ---- */}
      {step === 3 && (
        <div style={cardB}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Scale size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Submissions & arbitration — arbitration agent</span>
            <ResetBtn onClick={() => setReceived(false)} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Each department sends back its submission; the agent checks the margin chain (PVM × (1 − markdown) ↔ TMV, TME ↔ TMV & markdown) and the sum of the budgets within a 1 % tolerance.</div>
          {!received ? (
            <button onClick={() => setReceived(true)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.human, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Sparkles size={14} /> Simulate receipt of submissions</button>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 10, marginBottom: 14 }}>
                {analyses.map(({ c, obj, a }) => {
                  const col = a.verdict === "Compliant" ? T.ok : a.verdict === "Gap" ? T.warn : T.bad;
                  return (
                    <div key={c.n} style={{ background: T.panel2, border: `1px solid ${col}66`, borderRadius: 11, padding: "12px 13px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{c.n}</span>
                        <span style={{ marginLeft: "auto" }}><Chip color={col}>{a.verdict === "Gap" ? `Gap ${a.ecart > 0 ? "+" : ""}${u(a.ecart)} M€` : a.verdict}</Chip></span>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 7 }}>
                        {IND.map((ind) => (
                          <span key={ind.k} style={{ fontFamily: MONO, fontSize: 10.5, color: c[ind.k] !== obj[ind.k] ? T.warn : T.sub, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 6, padding: "2px 7px" }}>{ind.label} {ind.fmt(c[ind.k])}</span>
                        ))}
                      </div>
                      <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{a.txt}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 10 }}>
                <div style={{ background: T.panel2, border: `1px solid ${Math.abs(gapPct) <= 1 ? T.ok : T.bad}66`, borderRadius: 11, padding: "12px 13px" }}>
                  <span style={microLbl}>Global gap</span>
                  <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: Math.abs(gapPct) <= 1 ? T.ok : T.bad }}>{gapGlobal > 0 ? "+" : ""}{u(gapGlobal)} M€ <span style={{ fontSize: 12 }}>({gapPct > 0 ? "+" : ""}{fr1(gapPct)} %)</span></div>
                  <div style={{ fontSize: 11.5, color: T.sub, marginTop: 4 }}>Sum of submissions {u(sumCopies)} M€ vs budget set {u(glob.budget)} M€ — 1 % tolerance {Math.abs(gapPct) <= 1 ? "met" : "exceeded"}.</div>
                </div>
                <div style={{ background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "12px 13px" }}>
                  <span style={microLbl}>Arbitration recommendation</span>
                  {aReprendre.length === 0 ? <div style={{ fontSize: 12, color: T.ink }}>All submissions are compliant: the consolidated budget can be validated.</div> : aReprendre.map(({ c, a }) => (
                    <div key={c.n} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: T.ink, lineHeight: 1.5, marginBottom: 6 }}>
                      <ArrowRight size={13} color={T.human} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span><strong>{c.n}</strong> must rework its submission: {a.verdict === "Inconsistency" ? `declared TMV incompatible with its markdown and PVM (${a.dTmv > 0 ? "+" : ""}${fr1(a.dTmv)} pts) — priority 1, the margin chain must be reconciled before any budget arbitration.` : `budget ${a.ecart > 0 ? "+" : ""}${u(a.ecart)} M€ off target, driving the global gap of ${fr1(gapPct)} % — to be brought back within the envelope or justified by a TMV gain.`}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 14, fontSize: 11.5, color: T.faint }}>Monthly steering of this framework lives in the Monitoring tab.</div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

function BudgetPage({ st, fw }) {
  return (
    <div>
      <PageHeader
        title="Financial Framework"
        desc="Kiabi's annual budget framing in three steps: set the global budget, break it down by department and arbitrate the submissions. Monthly steering lives in the Monitoring tab."
        expert={{ role: "Performance Leader", txt: "Frames the envelopes, arbitrates the departments' submissions and orchestrates Group steering." }}
      />
      <BudgetModule fw={fw} />
    </div>
  );
}

/* ============================================================
   CO₂ Framework — 3-step carbon framing (green accent; monitoring moved to the Monitoring tab)
   ============================================================ */
const G = T.ok;
const cardG = { ...cardB, borderColor: `${G}44` };
const CO2_IND = [
  { k: "budget", label: "CO₂ budget", unit: "t CO₂e", step: 100, fmt: (v) => `${u(Math.round(v))} t` },
  { k: "intensite", label: "Intensity", unit: "kg/piece", step: 0.05, fmt: (v) => `${fr2(v)} kg` },
  { k: "volume", label: "Volume", unit: "M pieces", step: 0.5, fmt: (v) => `${fr1(v)} M` },
];
const calcT = (c) => c.volume * c.intensite * 1000;
const analyseCO2 = (c, obj) => {
  const calc = calcT(c);
  const arithOk = Math.abs(c.budget - calc) <= Math.max(1, c.budget) * 0.01;
  const mixDev = (c.intensite - obj.mixInt) / obj.mixInt;
  const mixOk = Math.abs(mixDev) <= 0.08;
  const ecart = c.budget - obj.budget;
  const ecartPct = (ecart / obj.budget) * 100;
  const attendu = c.volume * obj.mixInt * 1000;
  const verdict = !arithOk || !mixOk ? "Inconsistency" : Math.abs(ecartPct) > 1 ? "Gap" : "Compliant";
  let txt;
  if (!arithOk) txt = `The declared budget (${u(Math.round(c.budget))} t) does not match volume × intensity (${fr1(c.volume)} M × ${fr2(c.intensite)} kg = ${u(Math.round(calc))} t).`;
  else if (!mixOk) txt = `The declared intensity of ${fr2(c.intensite)} kg/piece is ${fr1(Math.abs(mixDev) * 100)} % ${mixDev < 0 ? "below" : "above"} the intensity of its product mix (${fr2(obj.mixInt)} kg). On ${fr1(c.volume)} M pieces, the expected budget is ${u(Math.round(attendu))} t: the submission ${mixDev < 0 ? "underestimates" : "overestimates"} emissions by ${u(Math.round(Math.abs(attendu - c.budget)))} t.`;
  else if (verdict === "Gap") txt = `Consistent chain (${fr1(c.volume)} M × ${fr2(c.intensite)} kg = ${u(Math.round(calc))} t), but budget submitted at ${u(Math.round(c.budget))} t against a ${u(Math.round(obj.budget))} t target: ${ecart > 0 ? "+" : ""}${u(Math.round(ecart))} t (${ecartPct > 0 ? "+" : ""}${fr1(ecartPct)} %), driven by ${fr1(c.volume - obj.volume) !== "0" ? `volumes at ${fr1(c.volume)} M vs ${fr1(obj.volume)} M planned` : "intensity"}.`;
  else txt = `Compliant submission: ${fr1(c.volume)} M pieces × ${fr2(c.intensite)} kg = ${u(Math.round(calc))} t, aligned with the ${u(Math.round(obj.budget))} t target.`;
  return { verdict, txt, ecart, ecartPct, attendu, mixOk, arithOk };
};

function CO2Module({ fw }) {
  const [step, setStep] = useState(1);
  const { co2Glob: glob, setCo2Glob: setGlob, co2Depts: depts, setCo2Depts: setDepts } = fw; /* shared with Monitoring */
  const [sentAt, setSentAt] = useState(null);
  const [mailOpen, setMailOpen] = useState(null);
  const [received, setReceived] = useState(false);

  const setG = (k, v) => setGlob((g) => ({ ...g, [k]: v }));
  const setD = (i, k, v) => setDepts((ds) => ds.map((d, j) => (j === i ? { ...d, [k]: v } : d)));
  const num = (e) => (e.target.value === "" ? 0 : +e.target.value);
  const globCalc = calcT(glob);
  const globOk = Math.abs(globCalc - glob.budget) <= glob.budget * 0.01;
  const sumB = depts.reduce((s, d) => s + d.budget, 0);
  const sumV = depts.reduce((s, d) => s + d.volume, 0);
  const sumOk = Math.abs(sumB - glob.budget) <= glob.budget * 0.01;

  /* Step 3 */
  const analyses = received ? CO2_COPIES.map((c) => { const obj = depts.find((d) => d.n === c.n) || { ...c, mixInt: c.intensite }; return { c, obj, a: analyseCO2(c, obj) }; }) : [];
  const sumCB = CO2_COPIES.reduce((s, c) => s + c.budget, 0);
  const sumCV = CO2_COPIES.reduce((s, c) => s + c.volume, 0);
  const gapB = sumCB - glob.budget, gapBPct = (gapB / glob.budget) * 100;
  const gapV = sumCV - glob.volume, gapVPct = (gapV / glob.volume) * 100;
  const intPond = sumCB / (sumCV * 1000);
  const aReprendre = analyses.filter((x) => x.a.verdict !== "Compliant").sort((x) => (x.a.verdict === "Inconsistency" ? -1 : 1));

  const STEPS = [["Global CO₂ budget", "top-down"], ["Breakdown", "by department"], ["Submissions & arbitration", "bottom-up"]];
  const btn = (bg) => ({ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: bg, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS });

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 8, marginBottom: 18 }}>
        {STEPS.map(([t, sub], i) => {
          const n = i + 1, on = step === n, done = step > n;
          const c = on || done ? G : T.faint;
          return (
            <button key={t} onClick={() => setStep(n)} style={{ cursor: "pointer", textAlign: "left", background: on ? `${G}12` : T.panel, border: `1px solid ${on ? G : T.line}`, borderRadius: 11, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, fontFamily: SANS }}>
              <span style={{ width: 26, height: 26, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: on || done ? c : "transparent", border: `1.5px solid ${c}`, color: on || done ? "#ffffff" : c, fontFamily: MONO, fontSize: 12, fontWeight: 800 }}>{done ? <Check size={13} /> : n}</span>
              <span><span style={{ display: "block", fontSize: 12, fontWeight: 800, color: T.ink }}>{t}</span><span style={{ display: "block", fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{sub}</span></span>
            </button>
          );
        })}
      </div>

      {step === 1 && (
        <div style={cardG}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Leaf size={15} color={G} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Kiabi global CO₂ budget — fiscal year Sept. 2026 → Aug. 2027</span>
            <ResetBtn onClick={() => setGlob({ ...CO2_GLOBAL })} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Carbon indicators set by the Group. Check: volume × intensity = budget.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            {[["budget", "Annual CO₂ budget", "t CO₂e", 1000], ["intensite", "Average intensity per product", "kg CO₂e / piece", 0.05], ["volume", "Planned volume", "M pieces", 1]].map(([k, l, unit, stp]) => (
              <label key={k} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "10px 12px" }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.sub, marginBottom: 6 }}>{l}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="number" step={stp} value={glob[k]} onChange={(e) => setG(k, num(e))} style={{ ...numInput, width: 120, fontSize: 15 }} /><span style={{ fontFamily: MONO, fontSize: 11, color: T.faint }}>{unit}</span></span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap", background: `${G}12`, border: `1px solid ${G}44`, borderRadius: 10, padding: "9px 12px" }}>
            <Sparkles size={14} color={G} />
            <span style={{ fontSize: 11.5, color: T.ink }}>Consistency check: {fr1(glob.volume)} M pieces × {fr2(glob.intensite)} kg = <strong>{u(Math.round(globCalc))} t CO₂e</strong> — {globOk ? "consistent with the budget set." : `gap of ${u(Math.round(Math.abs(globCalc - glob.budget)))} t versus the budget set.`}</span>
            <span style={{ marginLeft: "auto" }}><Chip color={globOk ? T.ok : T.bad}>{globOk ? "Consistent" : "To fix"}</Chip></span>
          </div>
          <div style={{ marginTop: 14 }}><button onClick={() => setStep(2)} style={btn(G)}>Break down by department <ArrowRight size={14} /></button></div>
        </div>
      )}

      {step === 2 && (
        <div style={cardG}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Layers size={15} color={G} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Carbon breakdown by department</span>
            <ResetBtn onClick={() => { setDepts(CO2_DEPTS.map((d) => ({ ...d }))); setSentAt(null); setMailOpen(null); }} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Editable split of the CO₂ budget, intensity and volumes. The sum of the budgets must equal {u(glob.budget)} t.</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr>
                <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>Department</th>
                {CO2_IND.map((i) => <th key={i.k} style={{ textAlign: "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{i.label} ({i.unit})</th>)}
                <th style={{ textAlign: "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>Vol × int.</th>
              </tr></thead>
              <tbody>
                {depts.map((d, i) => { const ok = Math.abs(calcT(d) - d.budget) <= Math.max(1, d.budget) * 0.01; return (
                  <tr key={d.n}>
                    <td style={{ padding: "7px 8px", borderBottom: `1px solid ${T.lineSoft}` }}><span style={{ display: "block", fontSize: 12, fontWeight: 800, color: T.ink }}>{d.n}</span><span style={{ fontSize: 10, color: T.faint }}>{d.resp}</span></td>
                    {CO2_IND.map((ind) => <td key={ind.k} style={{ textAlign: "right", padding: "5px 8px", borderBottom: `1px solid ${T.lineSoft}` }}><input type="number" step={ind.step} value={d[ind.k]} onChange={(e) => setD(i, ind.k, num(e))} style={{ ...numInput, width: 96 }} /></td>)}
                    <td style={{ textAlign: "right", padding: "5px 8px", borderBottom: `1px solid ${T.lineSoft}` }}><Chip color={ok ? T.ok : T.warn}>{u(Math.round(calcT(d)))} t</Chip></td>
                  </tr>); })}
                <tr>
                  <td style={{ padding: "8px 8px", fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Departments total</td>
                  <td style={{ textAlign: "right", padding: "8px 8px", fontFamily: MONO, fontSize: 12.5, fontWeight: 800, color: sumOk ? T.ok : T.bad }}>{u(Math.round(sumB))} t</td>
                  <td style={{ textAlign: "right", padding: "8px 8px", fontFamily: MONO, fontSize: 11.5, color: T.sub }}>{fr2(sumB / (sumV * 1000 || 1))} kg</td>
                  <td style={{ textAlign: "right", padding: "8px 8px", fontFamily: MONO, fontSize: 11.5, color: Math.abs(sumV - glob.volume) <= glob.volume * 0.01 ? T.sub : T.warn }}>{fr1(sumV)} M</td>
                  <td style={{ textAlign: "right", padding: "8px 8px" }}><Chip color={sumOk ? T.ok : T.bad}>{sumOk ? `= global budget ${u(glob.budget)} t` : `gap ${sumB - glob.budget > 0 ? "+" : ""}${u(Math.round(sumB - glob.budget))} t`}</Chip></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <button onClick={() => setSentAt(new Date().toLocaleDateString("fr-FR"))} disabled={!sumOk} style={btn(sumOk ? G : T.line)}><Send size={14} /> Send targets to department leads</button>
            {!sumOk && <span style={{ fontSize: 11.5, color: T.bad }}>Adjust the CO₂ budgets to match the global total before sending.</span>}
            {sentAt && <button onClick={() => setStep(3)} style={{ ...btn(T.panel2), color: T.ink, border: `1px solid ${T.line}` }}>Await submissions <ArrowRight size={14} /></button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 10, marginTop: 14 }}>
            {depts.map((d, i) => (
              <div key={d.n} style={{ background: T.panel2, border: `1px solid ${sentAt ? G + "55" : T.line}`, borderRadius: 11, padding: "11px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{d.n}</span>
                  <span style={{ marginLeft: "auto" }}><Chip color={sentAt ? G : T.faint}>{sentAt ? `Targets sent on ${sentAt}` : "In preparation"}</Chip></span>
                </div>
                <div style={{ fontSize: 10.5, color: T.faint, marginTop: 4 }}>{d.resp} · {u(Math.round(d.budget))} t · {fr2(d.intensite)} kg/pc · {fr1(d.volume)} M pcs</div>
                {sentAt && <button onClick={() => setMailOpen(mailOpen === i ? null : i)} style={{ marginTop: 8, cursor: "pointer", background: "transparent", color: T.blue, border: "none", padding: 0, fontSize: 11.5, fontWeight: 700, fontFamily: SANS }}>{mailOpen === i ? "Hide email" : "View sent email →"}</button>}
                {sentAt && mailOpen === i && (
                  <div style={{ marginTop: 8, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 11px", fontSize: 11.5, color: T.sub, lineHeight: 1.6 }}>
                    <div><strong style={{ color: T.ink }}>Subject:</strong> Carbon targets 2026-2027 — {d.n}</div>
                    <div style={{ marginTop: 5 }}>Hello, as part of the Group carbon budget of {u(glob.budget)} t CO₂e, here are your targets: CO₂ budget <strong>{u(Math.round(d.budget))} t</strong>, intensity <strong>{fr2(d.intensite)} kg/piece</strong>, volume <strong>{fr1(d.volume)} M pieces</strong>. Please send back your submission within 15 days. — Performance Leader</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={cardG}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Scale size={15} color={G} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>CO₂ submissions & arbitration — arbitration agent</span>
            <ResetBtn onClick={() => setReceived(false)} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Chained checks: volume × intensity = budget per department · intensity consistent with the product mix · sum of budgets and volumes consistent with the global figure (1 %).</div>
          {!received ? (
            <button onClick={() => setReceived(true)} style={btn(T.human)}><Sparkles size={14} /> Simulate receiving the submissions</button>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 10, marginBottom: 14 }}>
                {analyses.map(({ c, obj, a }) => {
                  const col = a.verdict === "Compliant" ? T.ok : a.verdict === "Gap" ? T.warn : T.bad;
                  return (
                    <div key={c.n} style={{ background: T.panel2, border: `1px solid ${col}66`, borderRadius: 11, padding: "12px 13px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{c.n}</span>
                        <span style={{ marginLeft: "auto" }}><Chip color={col}>{a.verdict === "Gap" ? `Gap ${a.ecart > 0 ? "+" : ""}${u(Math.round(a.ecart))} t` : a.verdict}</Chip></span>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 7 }}>
                        {CO2_IND.map((ind) => <span key={ind.k} style={{ fontFamily: MONO, fontSize: 10.5, color: c[ind.k] !== obj[ind.k] ? T.warn : T.sub, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 6, padding: "2px 7px" }}>{ind.label} {ind.fmt(c[ind.k])}</span>)}
                      </div>
                      <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{a.txt}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 10 }}>
                <div style={{ background: T.panel2, border: `1px solid ${Math.abs(gapBPct) <= 1 ? T.ok : T.bad}66`, borderRadius: 11, padding: "12px 13px" }}>
                  <span style={microLbl}>Global gap</span>
                  <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: Math.abs(gapBPct) <= 1 ? T.ok : T.bad }}>{gapB > 0 ? "+" : ""}{u(Math.round(gapB))} t <span style={{ fontSize: 12 }}>({gapBPct > 0 ? "+" : ""}{fr1(gapBPct)} %)</span></div>
                  <div style={{ fontSize: 11.5, color: T.sub, marginTop: 4, lineHeight: 1.5 }}>Sum of submitted budgets {u(Math.round(sumCB))} t vs {u(glob.budget)} t set. Volumes {fr1(sumCV)} M vs {fr1(glob.volume)} M ({gapVPct > 0 ? "+" : ""}{fr1(gapVPct)} %) · weighted intensity {fr2(intPond)} kg vs {fr2(glob.intensite)} kg.</div>
                </div>
                <div style={{ background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "12px 13px" }}>
                  <span style={microLbl}>Arbitration recommendation</span>
                  {aReprendre.length === 0 ? <div style={{ fontSize: 12, color: T.ink }}>All submissions are compliant: the consolidated carbon budget can be validated.</div> : aReprendre.map(({ c, a }) => (
                    <div key={c.n} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: T.ink, lineHeight: 1.5, marginBottom: 6 }}>
                      <ArrowRight size={13} color={T.human} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span><strong>{c.n}</strong> must rework its submission: {a.verdict === "Inconsistency" ? `intensity incompatible with its product mix, budget underestimated by ${u(Math.round(a.attendu - c.budget))} t — priority 1, the actual trajectory would be outside the envelope from the first quarter.` : `budget ${a.ecart > 0 ? "+" : ""}${u(Math.round(a.ecart))} t off target due to volume over-planning, driving the ${fr1(gapBPct)} % global gap — to be brought back within the envelope or offset by a transport lever.`}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 14, fontSize: 11.5, color: T.faint }}>Monthly emissions steering of this framework lives in the Monitoring tab.</div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

function CO2Page({ fw }) {
  return (
    <div>
      <PageHeader
        title="CO₂ Framework"
        desc="Kiabi's annual carbon framing in three steps: set the global CO₂ budget, break it down by department and arbitrate the submissions. Monthly emissions steering lives in the Monitoring tab."
        expert={{ role: "Performance Leader", txt: "Frames the carbon envelope, arbitrates the departments' submissions and steers the Group CO₂ trajectory." }}
      />
      <CO2Module fw={fw} />
    </div>
  );
}

/* ============================================================
   Monitoring — single annual follow-up for the financial and CO₂ frameworks
   (former step 4 of BudgetModule and CO2Module, fed by the shared framing state)
   ============================================================ */
function FinancialMonitoring({ glob, depts }) {
  const [month, setMonth] = useState(0);
  const [metric, setMetric] = useState("ca");
  const cumPh = PHASAGE_CA.slice(0, month + 1).reduce((s, v) => s + v, 0) / 100;
  const mon = depts.map((d) => {
    const cumPhased = d.budget * cumPh;
    const fac = REEL_CA_FACTEUR[d.n](month);
    const cumReel = cumPhased * fac;
    const demPh = +(d.demarque + PHASAGE_DEM[month]).toFixed(1);
    const demRe = +(demPh + REEL_DEM_ECART[d.n](month)).toFixed(1);
    const tmvPh = tmvModel(d.tme, demPh);
    const tmvRe = tmvModel(d.tme, demRe);
    const devCa = Math.abs(fac - 1) * 100;
    const devTmv = Math.abs(tmvRe - tmvPh);
    const dev = Math.max(devCa, devTmv);
    const status = dev <= 2 ? "vert" : dev <= 4 ? "orange" : "rouge";
    return { d, cumPhased, cumReel, fac, demPh, demRe, tmvPh, tmvRe, devCa, devTmv, dev, status, proj: d.budget * fac };
  });
  const alerts = mon.filter((x) => x.status !== "vert").map((x) => {
    const parts = [];
    if (x.devTmv > 2) parts.push(`markdown at ${fr1(x.demRe)} % in ${MOIS_LONG[month]} vs ${fr1(x.demPh)} % phased, impact ${x.tmvRe - x.tmvPh > 0 ? "+" : "−"}${fr1(Math.abs(x.tmvRe - x.tmvPh))} pt on projected TMV`);
    if (x.devCa > 2) parts.push(`cumulative revenue at ${u(Math.round(x.cumReel))} M€ vs ${u(Math.round(x.cumPhased))} M€ phased (${x.fac > 1 ? "+" : "−"}${fr1(Math.abs(x.fac - 1) * 100)} %)`);
    return { n: x.d.n, status: x.status, txt: parts.join(" · ") };
  });
  const projTotal = mon.reduce((s, x) => s + x.proj, 0);
  const projTmv = mon.reduce((s, x) => s + x.tmvRe * x.d.budget, 0) / Math.max(1, depts.reduce((s, d) => s + d.budget, 0));
  const projGap = projTotal - glob.budget;

  /* Annual series for the curve (phased over 12 months, actual up to the current month) */
  const totB = depts.reduce((s, d) => s + d.budget, 0) || 1;
  const series = MOIS.map((_, m) => {
    const cp = PHASAGE_CA.slice(0, m + 1).reduce((s, v) => s + v, 0) / 100;
    let ph = 0, re = 0;
    depts.forEach((d) => {
      const dp = d.demarque + PHASAGE_DEM[m];
      const dr = dp + REEL_DEM_ECART[d.n](m);
      if (metric === "ca") { ph += d.budget * cp; re += d.budget * cp * REEL_CA_FACTEUR[d.n](m); }
      else if (metric === "dem") { ph += (dp * d.budget) / totB; re += (dr * d.budget) / totB; }
      else { ph += (tmvModel(d.tme, dp) * d.budget) / totB; re += (tmvModel(d.tme, dr) * d.budget) / totB; }
    });
    return { ph: +ph.toFixed(1), re: +re.toFixed(1) };
  });
  const CW = 640, CH = 210, pL = 52, pR = 14, pT = 14, pB = 26;
  const vals = [...series.map((s) => s.ph), ...series.slice(0, month + 1).map((s) => s.re)];
  const yMin = metric === "ca" ? 0 : Math.floor(Math.min(...vals) - 2);
  const yMax = Math.ceil(Math.max(...vals) * (metric === "ca" ? 1.05 : 1) + (metric === "ca" ? 0 : 2));
  const cx = (m) => pL + (m * (CW - pL - pR)) / 11;
  const cy = (v) => pT + (1 - (v - yMin) / (yMax - yMin || 1)) * (CH - pT - pB);
  const phPts = series.map((s, m) => `${cx(m)},${cy(s.ph)}`).join(" ");
  const rePts = series.slice(0, month + 1).map((s, m) => `${cx(m)},${cy(s.re)}`).join(" ");
  const ticks = [0, 1, 2, 3, 4].map((i) => yMin + ((yMax - yMin) * i) / 4);
  const mLabel = { ca: "Cumulative revenue (M€)", dem: "Weighted markdown (%)", tmv: "Weighted TMV (%)" };

  return (
    <div style={cardB}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        <TrendingUp size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Financial monitoring — monitoring agent</span>
        <span style={{ fontSize: 11, color: T.faint, fontFamily: MONO }}>budget {u(glob.budget)} M€ · {depts.length} departments from the Financial Framework</span>
        <ResetBtn onClick={() => setMonth(0)} />
      </div>
      <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Simulated actuals by department vs phased budget trajectory (Christmas peaks, January and July sales, back-to-school). Green ≤ 2 pts · orange 2 – 4 pts · red &gt; 4 pts.</div>
      <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Month</span>
          <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: T.ink }}>{MOIS_LONG[month]} {month < 4 ? 2026 : 2027}</span>
          <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: T.faint }}>{fr1(cumPh * 100)} % of annual budget phased</span>
        </div>
        <input type="range" min={0} max={11} value={month} onChange={(e) => setMonth(+e.target.value)} style={{ width: "100%", accentColor: T.accent }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 9.5, color: T.faint, marginTop: 4 }}>{MOIS.map((m) => <span key={m}>{m}</span>)}</div>
      </div>

      {/* Annual curve: phased trajectory vs cumulative actual up to the current month */}
      <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          <TrendingUp size={14} color={T.accent} /><span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>Fiscal year trajectory — {mLabel[metric]}</span>
          <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            {[["ca", "Cumulative revenue"], ["dem", "Markdown"], ["tmv", "TMV"]].map(([id, l]) => (
              <button key={id} onClick={() => setMetric(id)} style={{ cursor: "pointer", background: metric === id ? T.accent : T.panel, color: metric === id ? "#ffffff" : T.sub, border: `1px solid ${metric === id ? T.accent : T.line}`, borderRadius: 999, padding: "4px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}>{l}</button>
            ))}
          </span>
        </div>
        <svg viewBox={`0 0 ${CW} ${CH}`} style={{ width: "100%", height: "auto", display: "block" }}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={pL} x2={CW - pR} y1={cy(t)} y2={cy(t)} stroke={T.line} strokeWidth="1" />
              <text x={pL - 6} y={cy(t) + 3.5} textAnchor="end" fontSize="9.5" fontFamily={MONO} fill={T.faint}>{metric === "ca" ? u(Math.round(t)) : fr1(t)}</text>
            </g>
          ))}
          {MOIS.map((m, i) => <text key={m} x={cx(i)} y={CH - 8} textAnchor="middle" fontSize="9.5" fontFamily={MONO} fill={i === month ? T.ink : T.faint} fontWeight={i === month ? 800 : 400}>{m}</text>)}
          <line x1={cx(month)} x2={cx(month)} y1={pT} y2={CH - pB} stroke={T.accent} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <polyline points={phPts} fill="none" stroke={T.blue} strokeWidth="2" strokeDasharray="6 4" strokeLinejoin="round" />
          {series.map((s, m) => <circle key={"p" + m} cx={cx(m)} cy={cy(s.ph)} r="2.5" fill={T.blue} />)}
          {month > 0 && <polyline points={rePts} fill="none" stroke={T.accent} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />}
          {series.slice(0, month + 1).map((s, m) => <circle key={"r" + m} cx={cx(m)} cy={cy(s.re)} r={m === month ? 4.5 : 3} fill={T.accent} stroke="#ffffff" strokeWidth="1.5" />)}
          <text x={cx(month) + (month > 8 ? -8 : 8)} y={cy(series[month].re) - 9} textAnchor={month > 8 ? "end" : "start"} fontSize="10.5" fontFamily={MONO} fontWeight="800" fill={T.accent}>{metric === "ca" ? `${u(Math.round(series[month].re))} M€` : `${fr1(series[month].re)} %`}</text>
        </svg>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 6, fontSize: 11, color: T.sub }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, borderTop: `2px dashed ${T.blue}` }} /> Phased budget trajectory (12 months)</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, borderTop: `2.6px solid ${T.accent}` }} /> Simulated actuals up to {MOIS_LONG[month]}</span>
          <span style={{ marginLeft: "auto", fontFamily: MONO, color: T.faint }}>gap {metric === "ca" ? `${series[month].re - series[month].ph > 0 ? "+" : "−"}${u(Math.round(Math.abs(series[month].re - series[month].ph)))} M€` : `${series[month].re - series[month].ph > 0 ? "+" : "−"}${fr1(Math.abs(series[month].re - series[month].ph))} pt`}</span>
        </div>
      </div>
      <div style={{ overflowX: "auto", marginBottom: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr>{["Department", "Status", "Cumulative revenue actual / phased", "Markdown actual / phased", "TMV actual / phased", "Max deviation"].map((c, j) => <th key={c} style={{ textAlign: j === 0 ? "left" : "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{c}</th>)}</tr></thead>
          <tbody>
            {mon.map((x) => (
              <tr key={x.d.n}>
                <td style={{ padding: "8px 8px", fontWeight: 800, color: T.ink, borderBottom: `1px solid ${T.lineSoft}` }}>{x.d.n}</td>
                <td style={{ textAlign: "right", borderBottom: `1px solid ${T.lineSoft}` }}><StatusChip s={x.status} /></td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}><strong style={{ color: T.ink }}>{u(Math.round(x.cumReel))}</strong> / {u(Math.round(x.cumPhased))} M€</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}><strong style={{ color: x.devTmv > 2 ? T.bad : T.ink }}>{fr1(x.demRe)} %</strong> / {fr1(x.demPh)} %</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}><strong style={{ color: T.ink }}>{fr1(x.tmvRe)} %</strong> / {fr1(x.tmvPh)} %</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, fontWeight: 800, color: x.status === "vert" ? T.ok : x.status === "orange" ? T.warn : T.bad, borderBottom: `1px solid ${T.lineSoft}` }}>{fr1(x.dev)} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 10 }}>
        <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 13px" }}>
          <span style={microLbl}>Monitoring agent alerts</span>
          {alerts.length === 0 ? <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: T.ok }}><Check size={14} /> All departments are on track.</div> : alerts.map((a) => (
            <div key={a.n} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 11.5, color: T.ink, lineHeight: 1.5, marginBottom: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, flexShrink: 0, marginTop: 5, background: a.status === "orange" ? T.warn : T.bad }} />
              <span><strong>{a.n}</strong>: {a.txt}</span>
            </div>
          ))}
        </div>
        <div style={{ background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "12px 13px" }}>
          <span style={microLbl}>Year-end projection (at current pace)</span>
          <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: projGap >= 0 ? T.ok : Math.abs(projGap) / glob.budget > 0.02 ? T.bad : T.warn }}>{u(Math.round(projTotal))} M€ <span style={{ fontSize: 12, color: T.sub }}>vs budget {u(glob.budget)} M€ ({projGap > 0 ? "+" : ""}{fr1((projGap / glob.budget) * 100)} %)</span></div>
          <div style={{ fontSize: 11.5, color: T.sub, marginTop: 5, lineHeight: 1.5 }}>Weighted projected TMV <strong style={{ color: T.ink }}>{fr1(projTmv)} %</strong> vs {fr1(glob.tmv)} % budgeted ({projTmv - glob.tmv > 0 ? "+" : "−"}{fr1(Math.abs(projTmv - glob.tmv))} pt). {mon.filter((x) => x.status === "rouge").length ? `${mon.filter((x) => x.status === "rouge").map((x) => x.d.n).join(", ")} carries most of the gap.` : "No department off track."}</div>
        </div>
      </div>
    </div>
  );
}

function CO2Monitoring({ glob, depts }) {
  const [month, setMonth] = useState(0);
  const cumPh = PHASAGE_CO2.slice(0, month + 1).reduce((s, v) => s + v, 0) / 100;
  const cumFac = (n) => PHASAGE_CO2.slice(0, month + 1).reduce((s, v, i) => s + v * REEL_CO2_FACTEUR[n](i), 0) / (cumPh * 100);
  const mon = depts.map((d) => {
    const cumPhased = d.budget * cumPh;
    const fac = cumFac(d.n);
    const cumReel = cumPhased * fac;
    const moisPh = (d.budget * PHASAGE_CO2[month]) / 100;
    const moisRe = moisPh * REEL_CO2_FACTEUR[d.n](month);
    const dev = Math.abs(fac - 1) * 100;
    const status = dev <= 2 ? "vert" : dev <= 4 ? "orange" : "rouge";
    return { d, cumPhased, cumReel, fac, moisPh, moisRe, dev, status, proj: d.budget * fac, cause: CO2_CAUSES[d.n] };
  });
  const alerts = mon.filter((x) => Math.abs(x.moisRe / x.moisPh - 1) > 0.02 || x.status !== "vert").map((x) => ({ n: x.d.n, status: x.status, txt: `${x.moisRe - x.moisPh >= 0 ? "+" : "−"}${u(Math.round(Math.abs(x.moisRe - x.moisPh)))} t CO₂e ${x.moisRe >= x.moisPh ? "above" : "below"} the trajectory in ${MOIS_LONG[month]}, ${x.cause}${x.status !== "vert" ? ` · cumulative ${x.fac > 1 ? "+" : "−"}${fr1(Math.abs(x.fac - 1) * 100)} %` : ""}` }));
  const projTotal = mon.reduce((s, x) => s + x.proj, 0);
  const projGap = projTotal - glob.budget;
  const leviersT = CO2_LEVIERS.map((l) => ({ ...l, t: (projTotal * l.pct) / 100 }));
  const leviersTot = leviersT.reduce((s, l) => s + l.t, 0);

  /* Curve */
  const series = MOIS.map((_, m) => {
    const cp = PHASAGE_CO2.slice(0, m + 1).reduce((s, v) => s + v, 0) / 100;
    let ph = 0, re = 0;
    depts.forEach((d) => { ph += d.budget * cp; re += PHASAGE_CO2.slice(0, m + 1).reduce((s, v, i) => s + (d.budget * v * REEL_CO2_FACTEUR[d.n](i)) / 100, 0); });
    return { ph: Math.round(ph), re: Math.round(re) };
  });
  const CW = 640, CH = 200, pL = 60, pR = 14, pT = 14, pB = 26;
  const yMax = Math.ceil(Math.max(...series.map((s) => s.ph), ...series.slice(0, month + 1).map((s) => s.re)) * 1.05);
  const cx = (m) => pL + (m * (CW - pL - pR)) / 11;
  const cy = (v) => pT + (1 - v / (yMax || 1)) * (CH - pT - pB);
  const ticks = [0, 1, 2, 3, 4].map((i) => (yMax * i) / 4);

  return (
    <div style={cardG}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
        <TrendingUp size={15} color={G} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>CO₂ monitoring — monitoring agent</span>
        <span style={{ fontSize: 11, color: T.faint, fontFamily: MONO }}>budget {u(Math.round(glob.budget))} t CO₂e · {depts.length} departments from the CO₂ Framework</span>
        <ResetBtn onClick={() => setMonth(0)} />
      </div>
      <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Simulated actual emissions vs phased trajectory (production peaks before Christmas and before the sales). Green ≤ 2 % · orange 2 – 4 % · red &gt; 4 % cumulative.</div>
      <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Month</span>
          <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: T.ink }}>{MOIS_LONG[month]} {month < 4 ? 2026 : 2027}</span>
          <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: T.faint }}>{fr1(cumPh * 100)} % of annual emissions phased</span>
        </div>
        <input type="range" min={0} max={11} value={month} onChange={(e) => setMonth(+e.target.value)} style={{ width: "100%", accentColor: G }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 9.5, color: T.faint, marginTop: 4 }}>{MOIS.map((m) => <span key={m}>{m}</span>)}</div>
      </div>
      <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><Leaf size={14} color={G} /><span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>Fiscal-year trajectory — cumulative emissions (t CO₂e)</span></div>
        <svg viewBox={`0 0 ${CW} ${CH}`} style={{ width: "100%", height: "auto", display: "block" }}>
          {ticks.map((t) => <g key={t}><line x1={pL} x2={CW - pR} y1={cy(t)} y2={cy(t)} stroke={T.line} strokeWidth="1" /><text x={pL - 6} y={cy(t) + 3.5} textAnchor="end" fontSize="9.5" fontFamily={MONO} fill={T.faint}>{u(Math.round(t))}</text></g>)}
          {MOIS.map((m, i) => <text key={m} x={cx(i)} y={CH - 8} textAnchor="middle" fontSize="9.5" fontFamily={MONO} fill={i === month ? T.ink : T.faint} fontWeight={i === month ? 800 : 400}>{m}</text>)}
          <line x1={cx(month)} x2={cx(month)} y1={pT} y2={CH - pB} stroke={G} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <polyline points={series.map((s, m) => `${cx(m)},${cy(s.ph)}`).join(" ")} fill="none" stroke={T.blue} strokeWidth="2" strokeDasharray="6 4" strokeLinejoin="round" />
          {month > 0 && <polyline points={series.slice(0, month + 1).map((s, m) => `${cx(m)},${cy(s.re)}`).join(" ")} fill="none" stroke={G} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" />}
          {series.slice(0, month + 1).map((s, m) => <circle key={m} cx={cx(m)} cy={cy(s.re)} r={m === month ? 4.5 : 3} fill={G} stroke="#ffffff" strokeWidth="1.5" />)}
          <text x={cx(month) + (month > 8 ? -8 : 8)} y={cy(series[month].re) - 9} textAnchor={month > 8 ? "end" : "start"} fontSize="10.5" fontFamily={MONO} fontWeight="800" fill={G}>{u(series[month].re)} t</text>
        </svg>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 6, fontSize: 11, color: T.sub }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, borderTop: `2px dashed ${T.blue}` }} /> Phased CO₂ trajectory</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, borderTop: `2.6px solid ${G}` }} /> Actual emissions through {MOIS_LONG[month]}</span>
          <span style={{ marginLeft: "auto", fontFamily: MONO, color: T.faint }}>gap {series[month].re - series[month].ph >= 0 ? "+" : "−"}{u(Math.abs(series[month].re - series[month].ph))} t</span>
        </div>
      </div>
      <div style={{ overflowX: "auto", marginBottom: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr>{["Department", "Status", "Cumulative actual / phased", "Month actual / phased", "Cumulative gap", "Cause"].map((c, j) => <th key={c} style={{ textAlign: j === 0 || j === 5 ? "left" : "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{c}</th>)}</tr></thead>
          <tbody>
            {mon.map((x) => (
              <tr key={x.d.n}>
                <td style={{ padding: "8px 8px", fontWeight: 800, color: T.ink, borderBottom: `1px solid ${T.lineSoft}` }}>{x.d.n}</td>
                <td style={{ textAlign: "right", borderBottom: `1px solid ${T.lineSoft}` }}><StatusChip s={x.status} /></td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}><strong style={{ color: T.ink }}>{u(Math.round(x.cumReel))}</strong> / {u(Math.round(x.cumPhased))} t</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}><strong style={{ color: x.moisRe > x.moisPh * 1.02 ? T.bad : T.ink }}>{u(Math.round(x.moisRe))}</strong> / {u(Math.round(x.moisPh))} t</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, fontWeight: 800, color: x.status === "vert" ? T.ok : x.status === "orange" ? T.warn : T.bad, borderBottom: `1px solid ${T.lineSoft}` }}>{x.fac > 1 ? "+" : "−"}{fr1(x.dev)} %</td>
                <td style={{ padding: "8px 8px", fontSize: 11, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{x.cause}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 10 }}>
        <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 13px" }}>
          <span style={microLbl}>Monitoring agent alerts</span>
          {alerts.length === 0 ? <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: T.ok }}><Check size={14} /> All departments are on the carbon trajectory.</div> : alerts.map((a) => (
            <div key={a.n} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 11.5, color: T.ink, lineHeight: 1.5, marginBottom: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: 99, flexShrink: 0, marginTop: 5, background: a.status === "vert" ? T.warn : a.status === "orange" ? T.warn : T.bad }} />
              <span><strong>{a.n}</strong>: {a.txt}</span>
            </div>
          ))}
        </div>
        <div style={{ background: `${G}12`, border: `1px solid ${G}44`, borderRadius: 11, padding: "12px 13px" }}>
          <span style={microLbl}>Year-end projection (at current pace)</span>
          <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: projGap <= 0 ? T.ok : projGap / glob.budget > 0.02 ? T.bad : T.warn }}>{u(Math.round(projTotal))} t <span style={{ fontSize: 12, color: T.sub }}>vs budget {u(glob.budget)} t ({projGap > 0 ? "+" : ""}{fr1((projGap / glob.budget) * 100)} %)</span></div>
          <span style={{ ...microLbl, marginTop: 10 }}>Available levers</span>
          {leviersT.map((l) => (
            <div key={l.n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${T.lineSoft}` }}>
              <span style={{ width: 9, height: 9, borderRadius: 3, background: l.c, flexShrink: 0 }} />
              <span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink, minWidth: 70 }}>{l.n}</span>
              <span style={{ flex: 1, fontSize: 11, color: T.sub }}>{l.desc}</span>
              <span style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 800, color: T.ok, whiteSpace: "nowrap" }}>−{u(Math.round(l.t))} t</span>
            </div>
          ))}
          <div style={{ fontSize: 11.5, color: T.sub, marginTop: 8, lineHeight: 1.5 }}>Cumulative potential <strong style={{ color: T.ink }}>−{u(Math.round(leviersTot))} t</strong>: {projGap > 0 ? (leviersTot >= projGap ? "sufficient to return within the envelope." : `insufficient, ${u(Math.round(projGap - leviersTot))} t would remain to be arbitrated.`) : "the trajectory is already below the envelope; the levers provide a safety margin."}</div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Business ontology — owned by IT Data (in-memory model, state held in App)
   ============================================================ */
const ONTOLOGY_DOMAINS = ["Finance", "CSR", "Market", "Collection", "Product", "Go to Market", "KFI"];
const ONTOLOGY_TYPES = ["Entity", "Document", "Measure", "Decision"];
const ONTOLOGY_TYPE_C = { Entity: "#0053A0", Document: "#4B90CD", Measure: "#3fb27f", Decision: "#dfa93f" };
const ONTOLOGY_VERBS = ["contains", "contributes to", "requests", "assigns", "is broken down into", "frames", "submits", "drives", "consumes", "constrains", "feeds"];
const ONTOLOGY_OBJECTS = [
  { id: "global-budget", name: "Global Budget", type: "Measure", domain: "Finance", desc: "Group envelope set top-down for the fiscal year (M€, markdown, PVM, TME, TMV)." },
  { id: "dept-budget", name: "Department Budget", type: "Measure", domain: "Finance", desc: "Breakdown of the global budget by department, including Offers & Collections." },
  { id: "business-rule", name: "Business Rule", type: "Decision", domain: "Finance", desc: "Group rule constraining objects: envelopes, thresholds and ceilings." },
  { id: "co2-budget", name: "CO₂ Budget", type: "Measure", domain: "CSR", desc: "Carbon envelope (t CO₂e) = volume × intensity, broken down by department." },
  { id: "market-brief", name: "Market Brief", type: "Document", domain: "Market", desc: "Synthesized market intention, copied read-only to the collection and product levels." },
  { id: "collection", name: "Collection", type: "Entity", domain: "Collection", desc: "Season collection (Baby S1 2027) grouping the collection structures and offers." },
  { id: "offer", name: "Offer", type: "Entity", domain: "Product", desc: "Offer line under Offers & Collections, with its budget, markdown, price and margins." },
  { id: "product", name: "Product", type: "Entity", domain: "Product", desc: "Collection structure broken down into colourway references, with PVI, volume and footprint." },
  { id: "country", name: "Country", type: "Entity", domain: "Go to Market", desc: "Country and its stores; submits requested volumes and prices for each offer." },
  { id: "store-submission", name: "Store Submission", type: "Document", domain: "Go to Market", desc: "Bottom-up needs and desired orders sent by a country's stores for the year." },
  { id: "supplier", name: "Supplier", type: "Entity", domain: "KFI", desc: "Partner of the KFI panel with commitments, capacity, quality and CSR status." },
  { id: "forecast", name: "Forecast", type: "Measure", domain: "KFI", desc: "In-season demand forecast received from RELEX by family." },
  { id: "allocation", name: "Allocation", type: "Decision", domain: "KFI", desc: "Volumes allocated per family and supplier, arbitrated by KFI." },
];
const ONTOLOGY_RELATIONS = [
  { id: "rel-1", source: "global-budget", verb: "is broken down into", target: "dept-budget" },
  { id: "rel-2", source: "offer", verb: "contributes to", target: "dept-budget" },
  { id: "rel-3", source: "collection", verb: "contains", target: "offer" },
  { id: "rel-4", source: "offer", verb: "is broken down into", target: "product" },
  { id: "rel-5", source: "market-brief", verb: "frames", target: "collection" },
  { id: "rel-6", source: "store-submission", verb: "requests", target: "offer" },
  { id: "rel-7", source: "country", verb: "submits", target: "store-submission" },
  { id: "rel-8", source: "forecast", verb: "drives", target: "allocation" },
  { id: "rel-9", source: "allocation", verb: "assigns", target: "supplier" },
  { id: "rel-10", source: "product", verb: "consumes", target: "co2-budget" },
  { id: "rel-11", source: "business-rule", verb: "constrains", target: "product" },
  { id: "rel-12", source: "business-rule", verb: "constrains", target: "co2-budget" },
];
/* Rules backed by perfRules stay reactive: editing their value here updates st.perfRules and every RuleStatus in the cockpit */
const ONTOLOGY_RULES = [
  { id: "rule-ca", name: "Revenue envelope", domain: "Finance", source: "business-rule", target: "global-budget", perf: "caEnvelope", unit: "M€", txt: "Committed revenue of the Baby offer must stay within the Group envelope", status: "Active" },
  { id: "rule-margin", name: "Minimum margin", domain: "Finance", source: "business-rule", target: "offer", perf: "minMargin", unit: "%", txt: "Every sourcing scenario must keep the margin above the floor", status: "Active" },
  { id: "rule-co2", name: "Carbon envelope", domain: "CSR", source: "business-rule", target: "co2-budget", perf: "carbonEnvelope", unit: "t CO₂e", txt: "Collection CO₂ must stay within the Group carbon envelope", status: "Active" },
  { id: "rule-piece", name: "Per-piece footprint ceiling", domain: "CSR", source: "business-rule", target: "product", perf: "maxProductCO2", unit: "kg CO₂e/piece", txt: "No product above the per-piece CO₂ ceiling", status: "Active" },
  { id: "rule-brief", name: "Brief cascade", domain: "Market", source: "market-brief", target: "collection", txt: "A collection brief must reference the latest synthesized market brief", status: "Draft" },
  { id: "rule-5050", name: "France / International 50-50", domain: "Go to Market", source: "country", target: "store-submission", txt: "Requested value must converge towards 50 % France / 50 % international", status: "Draft" },
  { id: "rule-min", name: "Supplier minimum commitments", domain: "KFI", source: "allocation", target: "supplier", txt: "Allocations must respect each partner's minimum commitment or a formalised catch-up plan", status: "Active" },
];
const ONTOLOGY_INITIAL = { objects: ONTOLOGY_OBJECTS, relations: ONTOLOGY_RELATIONS, rules: ONTOLOGY_RULES };
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "object";

function OntologyPage({ st, ontology, setOntology }) {
  const [domain, setDomain] = useState("Finance");
  const [selected, setSelected] = useState(null);
  const [objForm, setObjForm] = useState({ name: "", type: "Entity", desc: "" });
  const [relForm, setRelForm] = useState({ source: "", verb: ONTOLOGY_VERBS[0], target: "" });
  const [ruleForm, setRuleForm] = useState({ name: "", source: "", target: "", txt: "", status: "Draft" });
  const { objects, relations, rules } = ontology;
  const byId = (id) => objects.find((o) => o.id === id);
  const domainObjs = objects.filter((o) => o.domain === domain);
  const domainIds = new Set(domainObjs.map((o) => o.id));
  const domainRels = relations.filter((r) => domainIds.has(r.source) || domainIds.has(r.target));
  const neighbourIds = new Set(domainRels.flatMap((r) => [r.source, r.target]).filter((id) => !domainIds.has(id)));
  const nodes = [...domainObjs, ...objects.filter((o) => neighbourIds.has(o.id))];
  const domainRules = rules.filter((r) => r.domain === domain);
  const inputSt = { background: T.panel, border: `1px solid ${T.line}`, borderRadius: 8, padding: "7px 9px", fontSize: 12, color: T.ink, outline: "none", fontFamily: SANS, minWidth: 0 };
  const selSt = { ...inputSt, cursor: "pointer", fontWeight: 700 };
  const addBtn = (ok) => ({ display: "inline-flex", alignItems: "center", gap: 6, cursor: ok ? "pointer" : "not-allowed", opacity: ok ? 1 : 0.5, background: T.accent, color: "#ffffff", border: "none", borderRadius: 8, padding: "7px 12px", fontSize: 11.5, fontWeight: 800, fontFamily: SANS });

  const addObject = () => {
    const name = objForm.name.trim(); if (!name) return;
    let id = slugify(name); if (byId(id)) id = `${id}-${objects.length + 1}`;
    setOntology((o) => ({ ...o, objects: [...o.objects, { id, name, type: objForm.type, domain, desc: objForm.desc.trim() || "Added by IT Data (simulated object)", added: true }] }));
    setObjForm({ name: "", type: "Entity", desc: "" }); setSelected(id);
  };
  const addRelation = () => {
    if (!relForm.source || !relForm.target || relForm.source === relForm.target || !relForm.verb.trim()) return;
    setOntology((o) => ({ ...o, relations: [...o.relations, { id: `rel-${o.relations.length + 1}-${Date.now() % 1000}`, source: relForm.source, verb: relForm.verb.trim(), target: relForm.target, added: true }] }));
    setRelForm({ source: "", verb: ONTOLOGY_VERBS[0], target: "" });
  };
  const addRule = () => {
    if (!ruleForm.name.trim() || !ruleForm.source || !ruleForm.target) return;
    setOntology((o) => ({ ...o, rules: [...o.rules, { id: `rule-${o.rules.length + 1}-${Date.now() % 1000}`, name: ruleForm.name.trim(), domain, source: ruleForm.source, target: ruleForm.target, txt: ruleForm.txt.trim() || "Rule added by IT Data (simulated)", status: ruleForm.status, added: true }] }));
    setRuleForm({ name: "", source: "", target: "", txt: "", status: "Draft" });
  };
  const toggleRule = (id) => setOntology((o) => ({ ...o, rules: o.rules.map((r) => (r.id === id ? { ...r, status: r.status === "Active" ? "Draft" : "Active" } : r)) }));
  const setRuleValue = (perf, v) => st.setPerfRules((r) => ({ ...r, [perf]: v }));

  /* Light graph: nodes on an ellipse, relations as lines with their verb (SVG, no library) */
  const W = 640, H = 340, cxC = 320, cyC = 170, rx = 250, ry = 120;
  const pos = {}; nodes.forEach((n, i) => { const a = (2 * Math.PI * i) / Math.max(1, nodes.length) - Math.PI / 2; pos[n.id] = { x: cxC + rx * Math.cos(a), y: cyC + ry * Math.sin(a) }; });
  const selObj = selected ? byId(selected) : null;
  const selRels = selObj ? relations.filter((r) => r.source === selObj.id || r.target === selObj.id) : [];

  return (
    <div>
      <PageHeader title="Business ontology" desc="The common model linking the business objects of the Control Tower: budgets, briefs, collections, offers, products, countries, store submissions, suppliers, forecasts, allocations and the Group rules that constrain them." expert={{ role: "IT Data", txt: "IT Data owns the ontology: objects, relations and business rules are maintained here and consumed by every cockpit." }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <Chip color={T.accent}>Owned by IT Data</Chip>
        <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{objects.length} objects · {relations.length} relations · {rules.length} rules · in-memory simulation</span>
        <span style={{ marginLeft: "auto", display: "inline-flex", gap: 8, flexWrap: "wrap", fontSize: 10.5, color: T.sub }}>
          <span style={{ fontWeight: 700, color: T.faint, textTransform: "uppercase", letterSpacing: 0.4 }}>Legend</span>
          {ONTOLOGY_TYPES.map((t) => <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 9, height: 9, borderRadius: 99, background: ONTOLOGY_TYPE_C[t] }} />{t}</span>)}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 16, borderTop: `2px solid ${T.faint}` }} />relation</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 16, borderTop: `2px dashed ${T.warn}` }} />rule</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
        {ONTOLOGY_DOMAINS.map((d) => {
          const on = domain === d;
          return <button key={d} onClick={() => { setDomain(d); setSelected(null); }} style={{ cursor: "pointer", background: on ? T.accent : T.panel, color: on ? "#ffffff" : T.sub, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 999, padding: "7px 13px", fontSize: 12, fontWeight: 700, fontFamily: SANS }}>{d} <span style={{ fontFamily: MONO, fontSize: 10, opacity: 0.8 }}>{objects.filter((o) => o.domain === d).length}</span></button>;
        })}
      </div>

      {/* Graph */}
      <div style={cardB}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
          <Network size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>{domain} — object graph</span>
          <span style={{ fontSize: 11.5, color: T.faint }}>{domainObjs.length} domain objects, {nodes.length - domainObjs.length} linked objects from other domains (dashed) · click a node</span>
        </div>
        <div style={{ overflowX: "auto" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", minWidth: 520, height: "auto", display: "block", maxHeight: 420 }}>
          {domainRels.map((r) => {
            const a = pos[r.source], b = pos[r.target]; if (!a || !b) return null;
            const hi = selected && (r.source === selected || r.target === selected);
            return (
              <g key={r.id}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={hi ? T.accent : T.line} strokeWidth={hi ? 2 : 1.2} />
                <text x={a.x + (b.x - a.x) * 0.36} y={a.y + (b.y - a.y) * 0.36 - 4} textAnchor="middle" fontSize="8.5" fontFamily={MONO} fill={hi ? T.accent : T.faint}>{r.verb}</text>
              </g>
            );
          })}
          {domainRules.map((r) => {
            const a = pos[r.source], b = pos[r.target]; if (!a || !b || r.source === r.target) return null;
            return <line key={r.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={r.status === "Active" ? T.warn : T.line} strokeWidth="1.2" strokeDasharray="5 4" />;
          })}
          {nodes.map((n) => {
            const p = pos[n.id], own = n.domain === domain, on = selected === n.id;
            return (
              <g key={n.id} onClick={() => setSelected(on ? null : n.id)} style={{ cursor: "pointer" }}>
                <circle cx={p.x} cy={p.y} r={on ? 13 : 10} fill={own ? ONTOLOGY_TYPE_C[n.type] : "#ffffff"} stroke={ONTOLOGY_TYPE_C[n.type]} strokeWidth={own ? 1 : 1.5} strokeDasharray={own ? "0" : "3 2"} />
                <text x={p.x} y={p.y + (p.y < cyC ? -16 : 24)} textAnchor="middle" fontSize="10" fontFamily={SANS} fontWeight={on ? 800 : 600} fill={T.ink}>{n.name}</text>
              </g>
            );
          })}
        </svg>
        </div>
        {selObj && (
          <div style={{ marginTop: 8, background: T.panel2, border: `1px solid ${ONTOLOGY_TYPE_C[selObj.type]}66`, borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}><span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{selObj.name}</span><Chip color={ONTOLOGY_TYPE_C[selObj.type]}>{selObj.type}</Chip><span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{selObj.domain} · {selObj.id}{selObj.added ? " · added in session" : ""}</span></div>
            <div style={{ fontSize: 11.5, color: T.sub, marginTop: 4, lineHeight: 1.45 }}>{selObj.desc}</div>
            <div style={{ fontSize: 11, color: T.sub, marginTop: 6 }}>{selRels.length ? selRels.map((r) => <span key={r.id} style={{ display: "inline-block", marginRight: 10 }}><strong style={{ color: T.ink }}>{byId(r.source)?.name}</strong> {r.verb} <strong style={{ color: T.ink }}>{byId(r.target)?.name}</strong></span>) : "no relation yet"}</div>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
        {/* Objects */}
        <div style={{ ...cardB, marginBottom: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><Boxes size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Objects</span><span style={{ fontSize: 11, color: T.faint }}>{domain}</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
            {domainObjs.map((o) => (
              <button key={o.id} onClick={() => setSelected(selected === o.id ? null : o.id)} style={{ textAlign: "left", cursor: "pointer", background: selected === o.id ? `${ONTOLOGY_TYPE_C[o.type]}12` : T.panel2, border: `1px solid ${selected === o.id ? ONTOLOGY_TYPE_C[o.type] : T.line}`, borderRadius: 9, padding: "8px 10px", fontFamily: SANS }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}><span style={{ width: 9, height: 9, borderRadius: 99, background: ONTOLOGY_TYPE_C[o.type] }} /><span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>{o.name}</span><Chip color={ONTOLOGY_TYPE_C[o.type]}>{o.type}</Chip>{o.added && <Chip color={T.human}>new</Chip>}</div>
                <div style={{ fontSize: 10.5, color: T.faint, marginTop: 3, lineHeight: 1.4 }}>{o.desc}</div>
              </button>
            ))}
            {domainObjs.length === 0 && <div style={{ fontSize: 11.5, color: T.faint }}>No object in this domain yet.</div>}
          </div>
          <span style={microLbl}>Add a simulated object to {domain}</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 6, marginBottom: 6 }}>
            <input value={objForm.name} onChange={(e) => setObjForm({ ...objForm, name: e.target.value })} placeholder="Object name" style={inputSt} />
            <select value={objForm.type} onChange={(e) => setObjForm({ ...objForm, type: e.target.value })} style={selSt}>{ONTOLOGY_TYPES.map((t) => <option key={t}>{t}</option>)}</select>
          </div>
          <input value={objForm.desc} onChange={(e) => setObjForm({ ...objForm, desc: e.target.value })} placeholder="Short description" style={{ ...inputSt, width: "100%", boxSizing: "border-box", marginBottom: 8 }} />
          <button onClick={addObject} disabled={!objForm.name.trim()} style={addBtn(!!objForm.name.trim())}><Check size={12} /> Add object</button>
        </div>

        {/* Relations */}
        <div style={{ ...cardB, marginBottom: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><GitBranch size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Relations</span><span style={{ fontSize: 11, color: T.faint }}>{domainRels.length} involving {domain}</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
            {domainRels.map((r) => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", fontSize: 11.5, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 9, padding: "7px 10px" }}>
                <strong style={{ color: T.ink }}>{byId(r.source)?.name || r.source}</strong><span style={{ fontFamily: MONO, fontSize: 10.5, color: T.accent }}>{r.verb}</span><strong style={{ color: T.ink }}>{byId(r.target)?.name || r.target}</strong>{r.added && <Chip color={T.human}>new</Chip>}
              </div>
            ))}
            {domainRels.length === 0 && <div style={{ fontSize: 11.5, color: T.faint }}>No relation yet for this domain.</div>}
          </div>
          <span style={microLbl}>Add a simulated relation between two existing objects</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 6, marginBottom: 8 }}>
            <select value={relForm.source} onChange={(e) => setRelForm({ ...relForm, source: e.target.value })} style={selSt}><option value="">Source object…</option>{objects.map((o) => <option key={o.id} value={o.id}>{o.name} ({o.domain})</option>)}</select>
            <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 6 }}>
              <select value={ONTOLOGY_VERBS.includes(relForm.verb) ? relForm.verb : ""} onChange={(e) => setRelForm({ ...relForm, verb: e.target.value || relForm.verb })} style={selSt}>{ONTOLOGY_VERBS.map((v) => <option key={v}>{v}</option>)}<option value="">custom…</option></select>
              <input value={relForm.verb} onChange={(e) => setRelForm({ ...relForm, verb: e.target.value })} placeholder="verb" style={inputSt} />
            </div>
            <select value={relForm.target} onChange={(e) => setRelForm({ ...relForm, target: e.target.value })} style={selSt}><option value="">Target object…</option>{objects.map((o) => <option key={o.id} value={o.id}>{o.name} ({o.domain})</option>)}</select>
          </div>
          <button onClick={addRelation} disabled={!relForm.source || !relForm.target || relForm.source === relForm.target || !relForm.verb.trim()} style={addBtn(relForm.source && relForm.target && relForm.source !== relForm.target && relForm.verb.trim())}><Check size={12} /> Add relation</button>
        </div>

        {/* Business rules */}
        <div style={{ ...cardB, marginBottom: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><ShieldCheck size={15} color={T.warn} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Business rules</span><span style={{ fontSize: 11, color: T.faint }}>{domainRules.length} in {domain}</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
            {domainRules.map((r) => (
              <div key={r.id} style={{ background: T.panel2, border: `1px dashed ${r.status === "Active" ? T.warn : T.line}`, borderRadius: 9, padding: "8px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>{r.name}</span>
                  <button onClick={() => toggleRule(r.id)} style={{ cursor: "pointer", background: "transparent", border: "none", padding: 0 }}><Chip color={r.status === "Active" ? T.ok : T.faint}>{r.status}</Chip></button>
                  {r.added && <Chip color={T.human}>new</Chip>}
                  {r.perf && <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5 }}><input type="number" value={st.perfRules[r.perf]} onChange={(e) => setRuleValue(r.perf, e.target.value === "" ? 0 : +e.target.value)} step={r.perf === "maxProductCO2" ? 0.1 : r.perf === "minMargin" ? 0.5 : 100} style={{ ...inputSt, width: 84, fontFamily: MONO, fontWeight: 700, textAlign: "right" }} /><span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{r.unit}</span></span>}
                </div>
                <div style={{ fontSize: 11, color: T.sub, marginTop: 4, lineHeight: 1.45 }}><strong style={{ color: T.ink }}>{byId(r.source)?.name || r.source}</strong> → <strong style={{ color: T.ink }}>{byId(r.target)?.name || r.target}</strong> · {r.txt}{r.perf ? ` (current value ${st.perfRules[r.perf].toLocaleString("fr-FR")} ${r.unit}, reactive in every cockpit)` : ""}</div>
              </div>
            ))}
            {domainRules.length === 0 && <div style={{ fontSize: 11.5, color: T.faint }}>No rule in this domain yet.</div>}
          </div>
          <span style={microLbl}>Add a simulated rule to {domain}</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 6, marginBottom: 6 }}>
            <input value={ruleForm.name} onChange={(e) => setRuleForm({ ...ruleForm, name: e.target.value })} placeholder="Rule name" style={inputSt} />
            <select value={ruleForm.status} onChange={(e) => setRuleForm({ ...ruleForm, status: e.target.value })} style={selSt}><option>Draft</option><option>Active</option></select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 6 }}>
            <select value={ruleForm.source} onChange={(e) => setRuleForm({ ...ruleForm, source: e.target.value })} style={selSt}><option value="">Source…</option>{objects.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select>
            <select value={ruleForm.target} onChange={(e) => setRuleForm({ ...ruleForm, target: e.target.value })} style={selSt}><option value="">Target…</option>{objects.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}</select>
          </div>
          <input value={ruleForm.txt} onChange={(e) => setRuleForm({ ...ruleForm, txt: e.target.value })} placeholder="Readable rule (e.g. every offer must keep TMV above 48 %)" style={{ ...inputSt, width: "100%", boxSizing: "border-box", marginBottom: 8 }} />
          <button onClick={addRule} disabled={!ruleForm.name.trim() || !ruleForm.source || !ruleForm.target} style={addBtn(ruleForm.name.trim() && ruleForm.source && ruleForm.target)}><Check size={12} /> Add rule</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Store submissions — bottom-up needs sent by each country's stores,
   confronted with the offer pushed top-down. Single simulated source;
   a future API can replace STORE_SUBMISSIONS without touching the UI.
   offerId references BUDGET_OFFERS (one offer referential).
   ============================================================ */
const STORE_SUBMISSIONS = {
  source: "Simulated store submissions",
  lastSubmission: "18/09/2026",
  target: { france: 50, international: 50 },
  countries: [
    { countryCode: "FR", countryName: "France", region: "France", storeCount: 512, status: "Submitted", submittedAt: "18/09/2026", offers: [
      { offerId: "of-baby-night", pushedVolume: 640000, requestedVolume: 598000, requestedPrice: 11.3 },
      { offerId: "of-baby-under", pushedVolume: 980000, requestedVolume: 905000, requestedPrice: 9.2 },
      { offerId: "of-baby-licences", pushedVolume: 330000, requestedVolume: 352000, requestedPrice: 12.9 },
      { offerId: "of-girls", pushedVolume: 560000, requestedVolume: 512000, requestedPrice: 13.9 },
      { offerId: "of-boys", pushedVolume: 450000, requestedVolume: 421000, requestedPrice: 13.4 },
      { offerId: "of-capsules", pushedVolume: 110000, requestedVolume: 96000, requestedPrice: 15.2 },
    ] },
    { countryCode: "ES", countryName: "Spain", region: "International", storeCount: 68, status: "Submitted", submittedAt: "17/09/2026", offers: [
      { offerId: "of-baby-night", pushedVolume: 90000, requestedVolume: 112000, requestedPrice: 11.9 },
      { offerId: "of-baby-under", pushedVolume: 140000, requestedVolume: 171000, requestedPrice: 9.6 },
      { offerId: "of-baby-licences", pushedVolume: 45000, requestedVolume: 41000, requestedPrice: 12.4 },
      { offerId: "of-girls", pushedVolume: 80000, requestedVolume: 93000, requestedPrice: 14.4 },
      { offerId: "of-boys", pushedVolume: 65000, requestedVolume: 74000, requestedPrice: 13.9 },
      { offerId: "of-capsules", pushedVolume: 15000, requestedVolume: 19000, requestedPrice: 16.1 },
    ] },
    { countryCode: "IT", countryName: "Italy", region: "International", storeCount: 41, status: "Partial", submittedAt: "12/09/2026", offers: [
      { offerId: "of-baby-night", pushedVolume: 55000, requestedVolume: 61000, requestedPrice: 11.8 },
      { offerId: "of-baby-under", pushedVolume: 85000, requestedVolume: 88000, requestedPrice: 9.5 },
      { offerId: "of-baby-licences", pushedVolume: 28000, requestedVolume: null, requestedPrice: null },
      { offerId: "of-girls", pushedVolume: 50000, requestedVolume: 46000, requestedPrice: 14.0 },
      { offerId: "of-boys", pushedVolume: 40000, requestedVolume: null, requestedPrice: null },
      { offerId: "of-capsules", pushedVolume: 9000, requestedVolume: null, requestedPrice: null },
    ] },
    { countryCode: "PL", countryName: "Poland", region: "International", storeCount: 19, status: "Submitted", submittedAt: "16/09/2026", offers: [
      { offerId: "of-baby-night", pushedVolume: 26000, requestedVolume: 34000, requestedPrice: 10.9 },
      { offerId: "of-baby-under", pushedVolume: 40000, requestedVolume: 52000, requestedPrice: 8.9 },
      { offerId: "of-baby-licences", pushedVolume: 12000, requestedVolume: 15000, requestedPrice: 11.6 },
      { offerId: "of-girls", pushedVolume: 22000, requestedVolume: 27000, requestedPrice: 13.2 },
      { offerId: "of-boys", pushedVolume: 18000, requestedVolume: 22000, requestedPrice: 12.8 },
      { offerId: "of-capsules", pushedVolume: 4000, requestedVolume: 5000, requestedPrice: 14.9 },
    ] },
    { countryCode: "BE", countryName: "Belgium", region: "International", storeCount: 27, status: "Submitted", submittedAt: "15/09/2026", offers: [
      { offerId: "of-baby-night", pushedVolume: 34000, requestedVolume: 35000, requestedPrice: 11.6 },
      { offerId: "of-baby-under", pushedVolume: 52000, requestedVolume: 51000, requestedPrice: 9.4 },
      { offerId: "of-baby-licences", pushedVolume: 17000, requestedVolume: 15000, requestedPrice: 12.3 },
      { offerId: "of-girls", pushedVolume: 30000, requestedVolume: 31000, requestedPrice: 14.2 },
      { offerId: "of-boys", pushedVolume: 24000, requestedVolume: 24000, requestedPrice: 13.6 },
      { offerId: "of-capsules", pushedVolume: 6000, requestedVolume: 7000, requestedPrice: 15.9 },
    ] },
    { countryCode: "MA", countryName: "Morocco", region: "International", storeCount: 24, status: "Missing", submittedAt: null, offers: [
      { offerId: "of-baby-night", pushedVolume: 30000, requestedVolume: null, requestedPrice: null },
      { offerId: "of-baby-under", pushedVolume: 46000, requestedVolume: null, requestedPrice: null },
      { offerId: "of-baby-licences", pushedVolume: 15000, requestedVolume: null, requestedPrice: null },
      { offerId: "of-girls", pushedVolume: 26000, requestedVolume: null, requestedPrice: null },
      { offerId: "of-boys", pushedVolume: 21000, requestedVolume: null, requestedPrice: null },
      { offerId: "of-capsules", pushedVolume: 5000, requestedVolume: null, requestedPrice: null },
    ] },
  ],
  /* light monthly evolution: countries that had submitted by the end of each month */
  monthly: [["Jun.", 1], ["Jul.", 2], ["Aug.", 3], ["Sept.", 5]],
};
const STORE_TOL = { volumePct: 5, pricePct: 3 };
const STORE_STATUS_C = { Submitted: "#3fb27f", Partial: "#dfa93f", Missing: "#e05a5a" };
/* Pure confrontation: pushed (top-down) vs requested (bottom-up) per offer and per country */
function computeStoreSubmissions(data, offers, countryCode = "ALL") {
  const offerOf = (id) => offers.find((o) => o.id === id) || { id, name: id, pvm: 0 };
  const volLabel = (pct) => (pct > STORE_TOL.volumePct ? "Over-demand" : pct < -STORE_TOL.volumePct ? "Under-demand" : "Balanced");
  const priceLabel = (pct) => (pct == null ? "No request" : pct > STORE_TOL.pricePct ? "Price above push" : pct < -STORE_TOL.pricePct ? "Price below push" : "Aligned");
  const countries = data.countries.map((c) => {
    const answered = c.offers.filter((x) => x.requestedVolume != null);
    const pushed = c.offers.reduce((s, x) => s + x.pushedVolume, 0);
    const requested = answered.reduce((s, x) => s + x.requestedVolume, 0);
    const pushedValue = c.offers.reduce((s, x) => s + x.pushedVolume * offerOf(x.offerId).pvm, 0) / 1e6;
    const requestedValue = answered.reduce((s, x) => s + x.requestedVolume * x.requestedPrice, 0) / 1e6;
    const pushedAnswered = answered.reduce((s, x) => s + x.pushedVolume, 0);
    const gap = requested - pushedAnswered;
    const gapPct = pushedAnswered ? (gap / pushedAnswered) * 100 : 0;
    const wPrice = requested ? answered.reduce((s, x) => s + x.requestedVolume * x.requestedPrice, 0) / requested : null;
    const wPushPrice = pushedAnswered ? answered.reduce((s, x) => s + x.pushedVolume * offerOf(x.offerId).pvm, 0) / pushedAnswered : null;
    const priceGapPct = wPrice != null && wPushPrice ? (wPrice / wPushPrice - 1) * 100 : null;
    let reco = c.status === "Missing" ? "Chase the submission — no requested volume yet, pushed offer kept as is" : gapPct > STORE_TOL.volumePct ? `Increase the pushed volumes by ${fr1(gapPct)} %` : gapPct < -STORE_TOL.volumePct ? `Reduce the pushed volumes by ${fr1(-gapPct)} %` : "Maintain the pushed volumes";
    if (priceGapPct != null && Math.abs(priceGapPct) > STORE_TOL.pricePct) reco += ` · review the price (requested ${fr2(wPrice)} € vs pushed ${fr2(wPushPrice)} €)`;
    if (c.status === "Partial") reco += ` · ${c.offers.length - answered.length} offer${c.offers.length - answered.length > 1 ? "s" : ""} still missing`;
    return { ...c, answered: answered.length, pushed, requested, pushedAnswered, gap, gapPct, volLabel: c.status === "Missing" ? "No request" : volLabel(gapPct), pushedValue, requestedValue, wPrice, wPushPrice, priceGapPct, priceLabel: priceLabel(priceGapPct), reco };
  });
  const sel = countryCode === "ALL" ? data.countries : data.countries.filter((c) => c.countryCode === countryCode);
  const offerRows = offers.map((o) => {
    const entries = sel.flatMap((c) => c.offers.filter((x) => x.offerId === o.id));
    const answered = entries.filter((x) => x.requestedVolume != null);
    const pushed = entries.reduce((s, x) => s + x.pushedVolume, 0);
    const pushedAnswered = answered.reduce((s, x) => s + x.pushedVolume, 0);
    const requested = answered.reduce((s, x) => s + x.requestedVolume, 0);
    const reqPrice = requested ? answered.reduce((s, x) => s + x.requestedVolume * x.requestedPrice, 0) / requested : null;
    const gap = requested - pushedAnswered;
    const gapPct = pushedAnswered ? (gap / pushedAnswered) * 100 : 0;
    const priceGapPct = reqPrice != null && o.pvm ? (reqPrice / o.pvm - 1) * 100 : null;
    return { ...o, pushed, pushedAnswered, requested, gap, gapPct, volLabel: answered.length ? volLabel(gapPct) : "No request", pushedPrice: o.pvm, reqPrice, priceGapPct, priceLabel: priceLabel(priceGapPct), missing: entries.length - answered.length };
  });
  const franceValue = countries.filter((c) => c.region === "France").reduce((s, c) => s + c.requestedValue, 0);
  const intlValue = countries.filter((c) => c.region !== "France").reduce((s, c) => s + c.requestedValue, 0);
  const totalValue = franceValue + intlValue;
  const franceShare = totalValue ? (franceValue / totalValue) * 100 : 0;
  const pushedFrance = countries.filter((c) => c.region === "France").reduce((s, c) => s + c.pushedValue, 0);
  const pushedTotal = countries.reduce((s, c) => s + c.pushedValue, 0);
  return { countries, offerRows, franceValue, intlValue, totalValue, franceShare, intlShare: 100 - franceShare, pushedFranceShare: pushedTotal ? (pushedFrance / pushedTotal) * 100 : 0, target: data.target, gapToTarget: franceShare - data.target.france, submitted: countries.filter((c) => c.status === "Submitted").length };
}

function StoreSubmissionsBlock({ showMonthly = false, title = "Store submissions by country" }) {
  const [country, setCountry] = useState("ALL");
  const data = STORE_SUBMISSIONS;
  const r = useMemo(() => computeStoreSubmissions(data, BUDGET_OFFERS, country), [country]);
  const selC = country === "ALL" ? null : r.countries.find((c) => c.countryCode === country);
  const th = (align) => ({ textAlign: align, padding: "6px 6px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" });
  const td = { padding: "7px 6px", borderBottom: `1px solid ${T.lineSoft}`, fontSize: 12, whiteSpace: "nowrap" };
  const num = { ...td, textAlign: "right", fontFamily: MONO, color: T.sub };
  const volC = (l) => (l === "Over-demand" ? T.warn : l === "Under-demand" ? T.bad : l === "Balanced" ? T.ok : T.faint);
  const priceC = (l) => (l === "Aligned" ? T.ok : l === "No request" ? T.faint : T.warn);
  const sgn = (n, d = 0) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d })}`;
  const kunits = (n) => `${u(Math.round(n / 1000))} k`;
  return (
    <div style={cardB}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
        <Globe2 size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>{title}</span>
        <Chip color={T.warn}>{data.source}</Chip>
        <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}>last submission {data.lastSubmission} · {r.submitted} / {r.countries.length} countries submitted</span>
        <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ marginLeft: "auto", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "7px 10px", color: T.ink, fontSize: 12, fontFamily: SANS, fontWeight: 700, cursor: "pointer", outline: "none", maxWidth: "100%" }}>
          <option value="ALL">All countries</option>
          {data.countries.map((c) => <option key={c.countryCode} value={c.countryCode}>{c.countryName} ({c.storeCount} stores)</option>)}
        </select>
      </div>
      <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>The offer is pushed top-down by the Product, Market and Collection Managers; each country's stores submit their needs bottom-up. Gaps are computed from the simulated submissions: volume tolerance ±{STORE_TOL.volumePct} %, price tolerance ±{STORE_TOL.pricePct} %.</div>

      {/* 50/50 KPI */}
      <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "11px 13px", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>France / International — requested commercial value</span>
          <span style={{ fontFamily: MONO, fontSize: 11, color: T.sub }}>{fr1(r.franceValue)} M€ France · {fr1(r.intlValue)} M€ international</span>
          <span style={{ marginLeft: "auto" }}><Chip color={Math.abs(r.gapToTarget) <= 5 ? T.ok : Math.abs(r.gapToTarget) <= 15 ? T.warn : T.bad}>{fr1(r.franceShare)} % France vs {r.target.france} % target · gap {sgn(r.gapToTarget, 1)} pts</Chip></span>
        </div>
        <div style={{ display: "flex", height: 12, borderRadius: 99, overflow: "hidden", marginTop: 8, border: `1px solid ${T.line}` }}>
          <div style={{ width: `${r.franceShare}%`, background: T.accent }} title={`France ${fr1(r.franceShare)} %`} />
          <div style={{ flex: 1, background: T.human }} title={`International ${fr1(r.intlShare)} %`} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2px 10px", fontSize: 10.5, fontFamily: MONO, color: T.faint, marginTop: 4 }}>
          <span>France {fr1(r.franceShare)} % (pushed {fr1(r.pushedFranceShare)} %)</span><span>target {r.target.france} / {r.target.international}</span><span>International {fr1(r.intlShare)} %</span>
        </div>
      </div>

      {/* Offers */}
      <span style={microLbl}>Offers — {country === "ALL" ? "all countries" : selC.countryName}{selC ? ` · ${selC.status}${selC.submittedAt ? ` on ${selC.submittedAt}` : ""}` : ""}</span>
      <div style={{ overflowX: "auto", marginBottom: 14 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{[["Offer", "left"], ["Pushed volume", "right"], ["Requested volume", "right"], ["Volume gap", "right"], ["", "left"], ["Pushed price", "right"], ["Requested price", "right"], ["Price gap", "right"], ["", "left"]].map(([h, a], j) => <th key={j} style={th(a)}>{h}</th>)}</tr></thead>
          <tbody>
            {r.offerRows.map((o) => (
              <tr key={o.id}>
                <td style={td}><div style={{ fontWeight: 800, color: T.ink }}>{o.name}</div>{o.missing > 0 && country === "ALL" ? <div style={{ fontSize: 10, color: T.faint, fontFamily: MONO }}>{o.missing} {o.missing > 1 ? "countries" : "country"} missing</div> : null}</td>
                <td style={num}>{kunits(o.pushed)}</td>
                <td style={{ ...num, color: T.ink, fontWeight: 800 }}>{o.requested ? kunits(o.requested) : "—"}</td>
                <td style={{ ...num, fontWeight: 800, color: volC(o.volLabel) }}>{o.requested ? `${sgn(o.gap / 1000)} k (${sgn(o.gapPct, 1)} %)` : "—"}</td>
                <td style={{ ...td, paddingLeft: 4 }}><Chip color={volC(o.volLabel)}>{o.volLabel}</Chip></td>
                <td style={num}>{fr2(o.pushedPrice)} €</td>
                <td style={{ ...num, color: T.ink, fontWeight: 800 }}>{o.reqPrice != null ? `${fr2(o.reqPrice)} €` : "—"}</td>
                <td style={{ ...num, fontWeight: 800, color: priceC(o.priceLabel) }}>{o.priceGapPct != null ? `${sgn(o.reqPrice - o.pushedPrice, 2)} € (${sgn(o.priceGapPct, 1)} %)` : "—"}</td>
                <td style={{ ...td, paddingLeft: 4 }}><Chip color={priceC(o.priceLabel)}>{o.priceLabel}</Chip></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Countries */}
      <span style={microLbl}>Countries — pushed vs requested, value and agent recommendation</span>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{[["Country", "left"], ["Region", "left"], ["Status", "left"], ["Pushed", "right"], ["Requested", "right"], ["Gap", "right"], ["Value", "right"], ["Share", "right"], ["Recommendation", "left"]].map(([h, a]) => <th key={h} style={th(a)}>{h}</th>)}</tr></thead>
          <tbody>
            {r.countries.map((c) => (
              <tr key={c.countryCode} onClick={() => setCountry(country === c.countryCode ? "ALL" : c.countryCode)} style={{ cursor: "pointer", background: country === c.countryCode ? `${T.accent}10` : "transparent" }}>
                <td style={{ ...td, fontWeight: 800, color: T.ink }}>{c.countryName} <span style={{ fontSize: 10, color: T.faint, fontFamily: MONO }}>{c.countryCode} · {c.storeCount} stores</span></td>
                <td style={{ ...td, color: T.sub }}>{c.region}</td>
                <td style={td}><Chip color={STORE_STATUS_C[c.status]}>{c.status}</Chip></td>
                <td style={num}>{kunits(c.pushed)}</td>
                <td style={{ ...num, color: T.ink, fontWeight: 800 }}>{c.requested ? kunits(c.requested) : "—"}</td>
                <td style={{ ...num, fontWeight: 800, color: volC(c.volLabel) }}>{c.requested ? `${sgn(c.gap / 1000)} k (${sgn(c.gapPct, 1)} %)` : "—"}</td>
                <td style={num}>{c.requested ? `${fr1(c.requestedValue)} M€` : "—"}</td>
                <td style={num}>{r.totalValue && c.requested ? `${fr1((c.requestedValue / r.totalValue) * 100)} %` : "—"}</td>
                <td style={{ ...td, whiteSpace: "normal", minWidth: 220, color: T.sub, fontSize: 11.5, lineHeight: 1.4 }}><Sparkles size={11} color={T.human} style={{ verticalAlign: "-2px", marginRight: 4 }} />{c.reco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showMonthly && (
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 10 }}>
          <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "11px 13px" }}>
            <span style={microLbl}>Submission status by country</span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{r.countries.map((c) => <Chip key={c.countryCode} color={STORE_STATUS_C[c.status]}>{c.countryName} · {c.status}{c.status === "Partial" ? ` (${c.answered}/${c.offers.length})` : ""}</Chip>)}</div>
          </div>
          <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "11px 13px" }}>
            <span style={microLbl}>Countries submitted — monthly evolution (simulated)</span>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 64 }}>
              {data.monthly.map(([m, n]) => (
                <div key={m} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ height: `${(n / r.countries.length) * 48}px`, background: T.accent, borderRadius: 4, opacity: 0.85 }} />
                  <div style={{ fontSize: 9.5, fontFamily: MONO, color: T.faint, marginTop: 3 }}>{m} · {n}/{r.countries.length}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div style={{ fontSize: 10.5, color: T.faint, marginTop: 10 }}>Provenance: {data.source} — not real orders. Requested value = requested volume × requested price; pushed price = offer average selling price from the Financial Framework.</div>
    </div>
  );
}

/* ============================================================
   Monitoring — financial, CO₂ and store submissions views; the role view can force a sub-mode
   ============================================================ */
const MONITORING_VIEWS = [
  { id: "financial", label: "Financial monitoring", icon: Wallet, c: T.accent },
  { id: "co2", label: "CO₂ monitoring", icon: Leaf, c: G },
  { id: "store", label: "Store submissions monitoring", icon: Globe2, c: T.human },
];
function MonitoringPage({ fw, views = ["financial", "co2"], initial }) {
  const allowed = MONITORING_VIEWS.filter((v) => views.includes(v.id));
  const [view, setView] = useState(initial && views.includes(initial) ? initial : allowed[0].id);
  const current = allowed.some((v) => v.id === view) ? view : allowed[0].id;
  return (
    <div>
      <PageHeader
        title="Monitoring"
        desc="Single annual follow-up of the fiscal year: financial and CO₂ trajectories month by month, fed live by the Financial Framework and CO₂ Framework, plus the store submissions confrontation."
        expert={{ role: "Performance Leader", txt: "Monitors actuals against the phased frameworks, raises alerts and projects the year-end for the Group." }}
      />
      {allowed.length > 1 && (
        <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
          {allowed.map((v) => {
            const on = current === v.id;
            return (
              <button key={v.id} onClick={() => setView(v.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: on ? v.c : T.panel2, color: on ? "#ffffff" : T.sub, border: `1px solid ${on ? v.c : T.line}`, borderRadius: 999, padding: "8px 15px", fontSize: 12, fontWeight: 700, fontFamily: SANS }}>
                <v.icon size={13} /> {v.label}
              </button>
            );
          })}
        </div>
      )}
      {current === "financial" && <FinancialMonitoring glob={fw.budgetGlob} depts={fw.budgetDepts} />}
      {current === "co2" && <CO2Monitoring glob={fw.co2Glob} depts={fw.co2Depts} />}
      {current === "store" && <StoreSubmissionsBlock showMonthly title="Store submissions monitoring" />}
    </div>
  );
}

/* ============================================================
   App — end-to-end and role-based navigation
   ============================================================ */
const ROLE_VIEWS = {
  "Financial Leader": { tabs: ["financial", "monitoring"], monitoring: { views: ["financial"], initial: "financial" } },
  "CSR Leader": { tabs: ["co2", "monitoring"], monitoring: { views: ["co2"], initial: "co2" } },
  "Market Manager": { tabs: ["market", "monitoring"], monitoring: { views: ["store", "financial", "co2"], initial: "store" } },
  "Collection Manager": { tabs: ["collection", "monitoring"], monitoring: { views: ["store", "financial", "co2"], initial: "store" } },
  "Product Manager": { tabs: ["product"] },
  "IT Data": { tabs: ["ontology"] },
};
/* Revenue committed by the Baby offer (M€) — compared with the Group envelope rule */
const REVENUE_COMMITTED = 43.8;
const ROLES = Object.keys(ROLE_VIEWS);
const APP_TABS = [
  { id: "ontology", label: "Ontology", icon: Database },
  { id: "financial", label: "Financial Framework", icon: Scale },
  { id: "co2", label: "CO₂ Framework", icon: Leaf },
  { id: "market", label: "Market Framework", icon: Crown },
  { id: "collection", label: "Collection Framework", icon: LayoutGrid },
  { id: "product", label: "Product Manager", icon: Baby },
  { id: "gtm", label: "Go to Market", icon: ShoppingBag },
  { id: "itfas", label: "KFI", icon: Factory },
  { id: "monitoring", label: "Monitoring", icon: TrendingUp },
];
const allowedTabs = (mode, role) => (mode === "role" ? ROLE_VIEWS[role].tabs : APP_TABS.map((t) => t.id));

export default function App() {
  const [tab, setTab] = useState("ontology");
  const [viewMode, setViewMode] = useState("endToEnd");
  const [selectedRole, setSelectedRole] = useState("Financial Leader");
  const [ontology, setOntology] = useState(ONTOLOGY_INITIAL);
  const [selId, setSelId] = useState(PRODUITS[0].id);
  const [agentId, setAgentId] = useState("essentiel");
  const [territoire, setTerritoire] = useState("Core");
  const [zone, setZone] = useState(null);
  const [colIdx, setColIdx] = useState(0);
  const [levers, setLevers] = useState(new Set());
  const [pvcMap, setPvcMap] = useState({});
  const [volMap, setVolMap] = useState({});
  const [scenMap, setScenMap] = useState({});
  const [submitted, setSubmitted] = useState(new Set());
  const [validated, setValidated] = useState(new Set());
  const [returned, setReturned] = useState(new Set());
  const [approved, setApproved] = useState(new Set());
  const [rejected, setRejected] = useState(new Set());
  const [note, setNote] = useState("");
  const [perfRules, setPerfRules] = useState({ caEnvelope: 60, carbonEnvelope: 6000, minMargin: 54, maxProductCO2: 2.0 });
  /* Shared framing state (Financial / CO₂ Framework) also read by Monitoring */
  const [budgetGlob, setBudgetGlob] = useState({ ...BUDGET_GLOBAL });
  const [budgetDepts, setBudgetDepts] = useState(BUDGET_DEPTS.map((d) => ({ ...d })));
  const [co2Glob, setCo2Glob] = useState({ ...CO2_GLOBAL });
  const [co2Depts, setCo2Depts] = useState(CO2_DEPTS.map((d) => ({ ...d })));
  /* Market brief (written in Market Framework, read-only elsewhere), product sheet progress, approval snapshots */
  const [marketBrief, setMarketBrief] = useState(null);
  const [sheets, setSheets] = useState({});
  const [snapshots, setSnapshots] = useState({});
  const [reopened, setReopened] = useState(new Set());

  const lowCarbon = agentId === "bascarbone";
  const sel = PRODUITS.find((p) => p.id === selId) || PRODUITS[0];
  const delta = useMemo(() => {
    const d = { rev: 0, co2: 0, lead: 0, rup: 0 };
    AMELIO.forEach((ag) => ag.levers.forEach((lv) => { if (levers.has(lv.id)) Object.entries(lv.d).forEach(([k, v]) => { d[k] += v; }); }));
    return d;
  }, [levers]);
  /* Effective footprint in kg CO₂e / piece (Low-carbon strategy + levers) */
  const co2Eff = (p) => Math.max(0.1, +((p.co2 * (lowCarbon ? 0.72 : 1) + delta.co2).toFixed(1)));
  /* Collection total in t CO₂e = Σ effective volume × effective footprint / 1000 */
  const collectionCO2 = useMemo(
    () => +PRODUITS.reduce((sum, p) => sum + ((volMap[p.id] ?? p.volume) * co2Eff(p)) / 1000, 0).toFixed(1),
    [volMap, lowCarbon, delta]
  );
  /* Reactive breach engine */
  /* Each breach carries a level (breach / watch), the KPIs it affects and, for product rules, the product id, so RuleStatus can sit next to any KPI */
  const breaches = useMemo(() => {
    const b = [];
    PRODUITS.forEach((p) => {
      const v = co2Eff(p);
      const vTxt = v.toLocaleString("fr-FR", { minimumFractionDigits: 1 });
      if (v > perfRules.maxProductCO2) b.push({ area: "Offer & Collection", level: "breach", kpis: ["footprint"], productId: p.id, label: `${p.name} — ${vTxt} kg CO₂e/piece above the ${perfRules.maxProductCO2.toLocaleString("fr-FR")} kg ceiling`, action: "activate a low-carbon material or nearshore sourcing" });
      else if (v > perfRules.maxProductCO2 * 0.9) b.push({ area: "Offer & Collection", level: "watch", kpis: ["footprint"], productId: p.id, label: `${p.name} — ${vTxt} kg CO₂e/piece within 10 % of the ceiling`, action: "watch the material mix before store launch" });
    });
    if (REVENUE_COMMITTED > perfRules.caEnvelope) b.push({ area: "Offer & Collection", level: "breach", kpis: ["revenue"], label: `Committed revenue at ${REVENUE_COMMITTED.toLocaleString("fr-FR")} M€ above the ${perfRules.caEnvelope.toLocaleString("fr-FR")} M€ envelope`, action: "cut the offer breadth or renegotiate the envelope with Finance" });
    else if (REVENUE_COMMITTED > perfRules.caEnvelope * 0.9) b.push({ area: "Offer & Collection", level: "watch", kpis: ["revenue"], label: `Committed revenue at ${REVENUE_COMMITTED.toLocaleString("fr-FR")} M€ within 10 % of the ${perfRules.caEnvelope.toLocaleString("fr-FR")} M€ envelope`, action: "freeze new references until the envelope is confirmed" });
    if (collectionCO2 > perfRules.carbonEnvelope) b.push({ area: "Go to Market", level: "breach", kpis: ["carbon", "volume"], label: `Collection at ${u(Math.round(collectionCO2))} t CO₂e — ${u(Math.round(collectionCO2 - perfRules.carbonEnvelope))} t overrun`, action: "reduce volumes or change the sourcing mix" });
    else if (collectionCO2 > perfRules.carbonEnvelope * 0.9) b.push({ area: "Go to Market", level: "watch", kpis: ["carbon", "volume"], label: `Collection at ${u(Math.round(collectionCO2))} t CO₂e — within 10 % of the ${u(perfRules.carbonEnvelope)} t envelope`, action: "hold volumes and favour nearshore scenarios" });
    if (perfRules.minMargin > 53.2) b.push({ area: "Supply", level: "breach", kpis: ["margin", "price", "sourcing"], label: `Euromed nearshore scenario at 53,2 % below the ${perfRules.minMargin.toLocaleString("fr-FR")} % margin floor`, action: "negotiate the landed cost or keep a balanced mix" });
    else if (perfRules.minMargin > 52.5) b.push({ area: "Supply", level: "watch", kpis: ["margin", "price", "sourcing"], label: `Euromed nearshore scenario at 53,2 % close to the ${perfRules.minMargin.toLocaleString("fr-FR")} % margin floor`, action: "secure the landed cost before submitting to KFI" });
    if (perfRules.carbonEnvelope < 5200) b.push({ area: "KFI", level: "breach", kpis: ["supplier", "carbon"], label: `Supplier trajectory incompatible with the ${u(perfRules.carbonEnvelope)} t carbon target`, action: "allocate 4 references to Anatolia Textiles and Taipei Knitworks" });
    else if (perfRules.carbonEnvelope < 5600) b.push({ area: "KFI", level: "watch", kpis: ["supplier", "carbon"], label: `Supplier trajectory close to the ${u(perfRules.carbonEnvelope)} t carbon target`, action: "secure low-carbon capacity at Anatolia Textiles and Taipei Knitworks" });
    return b;
  }, [perfRules, collectionCO2, lowCarbon, delta]);

  /* Frozen copy of every choice of an offer at approval time (per product id) */
  const buildSnapshot = (p) => {
    const ag = AGENTS.find((a) => a.id === agentId) || null;
    const scId = scenMap[p.id] ?? (lowCarbon ? "px" : "mx");
    const sc = p.scenarios.find((x) => x.id === scId) || p.scenarios[0];
    const pvi = pvcMap[p.id] ?? p.prix, volume = volMap[p.id] ?? p.volume, revient = Math.max(0.1, +((p.revient + delta.rev).toFixed(2)));
    return { at: new Date(), name: p.name, segment: p.segment, pvi, volume, revient, marge: Math.round(((pvi - revient) / pvi) * 100), co2: co2Eff(p), lead: Math.max(7, sc.lead + delta.lead), territoire, zone, agentId, agentName: ag ? ag.name : null, scenId: sc.id, scenName: sc.name, colIdx, coloris: p.coloris[colIdx] ? `${p.coloris[colIdx][0]} (${p.id.toUpperCase()}-${String(colIdx + 1).padStart(2, "0")})` : null, levers: [...levers], leverNames: AMELIO.flatMap((g) => g.levers).filter((lv) => levers.has(lv.id)).map((lv) => lv.t), sheet: sheets[p.id] || null };
  };

  const st = {
    selId, setSelId: (id) => { setSelId(id); setColIdx(0); setNote(""); }, sel,
    agentId, setAgentId, lowCarbon,
    territoire, setTerritoire, zone, setZone,
    colIdx, setColIdx, note, setNote,
    perfRules, setPerfRules, collectionCO2, breaches,
    levers, toggleLever: (id) => setLevers((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; }),
    submitted, validated, returned, approved, rejected,
    co2Of: co2Eff,
    revOf: (p) => Math.max(0.1, +((p.revient + delta.rev).toFixed(2))),
    leadOf: (sc) => Math.max(7, sc.lead + delta.lead),
    rupOf: (sc) => Math.max(0.5, +((sc.rupture + delta.rup).toFixed(1))),
    pvcOf: (p) => pvcMap[p.id] ?? p.prix,
    volOf: (p) => volMap[p.id] ?? p.volume,
    scenOf: (p) => scenMap[p.id] ?? (lowCarbon ? "px" : "mx"),
    recoFor: (p) => p.scenarios.find((x) => x.id === (lowCarbon ? "px" : "mx")),
    statutOf: (p) => (validated.has(p.id) ? "Validated" : p.statut),
    setPvc: (id, v) => setPvcMap((m) => ({ ...m, [id]: v })),
    setVol: (id, v) => setVolMap((m) => ({ ...m, [id]: v })),
    setScen: (id, s) => setScenMap((m) => ({ ...m, [id]: s })),
    submit: (id) => { setSubmitted((s) => new Set(s).add(id)); setReturned((s) => { const n = new Set(s); n.delete(id); return n; }); },
    validate: (id) => setValidated((s) => new Set(s).add(id)),
    sendBack: (id) => { setReturned((s) => new Set(s).add(id)); setSubmitted((s) => { const n = new Set(s); n.delete(id); return n; }); },
    approve: (id) => { const p = PRODUITS.find((x) => x.id === id); if (p) setSnapshots((m) => ({ ...m, [id]: buildSnapshot(p) })); setApproved((s) => new Set(s).add(id)); setRejected((s) => { const n = new Set(s); n.delete(id); return n; }); setReopened((r) => { const n = new Set(r); n.delete(id); return n; }); },
    reject: (id) => setRejected((s) => new Set(s).add(id)),
    unapprove: (id) => { setApproved((s) => { const n = new Set(s); n.delete(id); return n; }); setNote(""); },
    /* approved offers are frozen until explicitly reopened; reopening restores the snapshot choices */
    isLocked: (id) => approved.has(id) && !reopened.has(id),
    isReopened: (id) => approved.has(id) && reopened.has(id),
    snapshotOf: (id) => snapshots[id],
    reopen: (id) => { const sn = snapshots[id]; if (sn) { setAgentId(sn.agentId); setTerritoire(sn.territoire); setZone(sn.zone); setColIdx(sn.colIdx); setLevers(new Set(sn.levers)); setPvcMap((m) => ({ ...m, [id]: sn.pvi })); setVolMap((m) => ({ ...m, [id]: sn.volume })); setScenMap((m) => ({ ...m, [id]: sn.scenId })); } setReopened((r) => new Set(r).add(id)); setNote(""); },
    setSheet: (id, info) => setSheets((m) => ({ ...m, [id]: info })),
    marketBrief, setMarketBrief, setTab,
  };
  const fw = { budgetGlob, setBudgetGlob, budgetDepts, setBudgetDepts, co2Glob, setCo2Glob, co2Depts, setCo2Depts };

  /* Visible tabs: every tab end-to-end, only the role's tabs in role view; the active tab can never be a hidden one */
  const visibleTabs = useMemo(() => APP_TABS.filter((t) => allowedTabs(viewMode, selectedRole).includes(t.id)), [viewMode, selectedRole]);
  const activeTab = visibleTabs.some((t) => t.id === tab) ? tab : visibleTabs[0].id;
  const selectMode = (m) => { setViewMode(m); const a = allowedTabs(m, selectedRole); if (!a.includes(tab)) setTab(a[0]); };
  const selectRole = (r) => { setSelectedRole(r); const a = allowedTabs("role", r); if (!a.includes(tab)) setTab(a[0]); };
  const roleMon = viewMode === "role" ? ROLE_VIEWS[selectedRole].monitoring : null;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: SANS, color: T.ink }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 18px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
          <WhiteBadge><img src={KIABI_LOGO} alt="Kiabi" style={{ height: 26, width: "auto", display: "block" }} /></WhiteBadge>
          <div style={{ fontSize: 16, fontWeight: 800, color: T.ink }}>KIABI Control Tower</div>
          {lowCarbon && <Chip color={T.ok}>🌿 Low-carbon strategy active</Chip>}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", border: `1px solid ${T.line}`, borderRadius: 999, overflow: "hidden" }}>
              {[["endToEnd", "End-to-end view"], ["role", "Role-based view"]].map(([id, l]) => (
                <button key={id} onClick={() => selectMode(id)} style={{ cursor: "pointer", background: viewMode === id ? T.accent : T.panel, color: viewMode === id ? "#ffffff" : T.sub, border: "none", padding: "7px 13px", fontSize: 11.5, fontWeight: 700, fontFamily: SANS }}>{l}</button>
              ))}
            </span>
            {viewMode === "role" && (
              <select value={selectedRole} onChange={(e) => selectRole(e.target.value)} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 999, padding: "7px 12px", color: T.ink, fontSize: 11.5, fontFamily: SANS, fontWeight: 700, cursor: "pointer", outline: "none" }}>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {visibleTabs.map((t) => {
            const on = activeTab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", background: on ? T.accent : T.panel, color: on ? "#ffffff" : T.sub, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 10, padding: "9px 15px", fontSize: 12.5, fontWeight: 700, fontFamily: SANS }}>
                <t.icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>
        {activeTab === "ontology" && <OntologyPage st={st} ontology={ontology} setOntology={setOntology} />}
        {activeTab === "financial" && <BudgetPage st={st} fw={fw} />}
        {activeTab === "co2" && <CO2Page fw={fw} />}
        {activeTab === "market" && <MarketFrameworkPage st={st} />}
        {activeTab === "collection" && <CollectionFrameworkPage st={st} />}
        {activeTab === "product" && <ProductManagerPage st={st} />}
        {activeTab === "gtm" && <GTMPage st={st} />}
        {activeTab === "itfas" && <ProductionPage st={st} />}
        {activeTab === "monitoring" && <MonitoringPage key={viewMode + selectedRole} fw={fw} views={roleMon ? roleMon.views : ["financial", "co2"]} initial={roleMon ? roleMon.initial : "financial"} />}
      </div>
    </div>
  );
}
