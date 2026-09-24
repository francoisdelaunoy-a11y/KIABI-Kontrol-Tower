import React, { useState, useMemo, useEffect, useRef } from "react";
import { Layers, Target, Leaf, Check, Wallet, TrendingUp, Tag, Boxes, GitBranch, Globe2, Factory, ClipboardList, Sparkles, ShoppingBag, Truck, Send, RotateCcw, X, Heart, Star, ArrowRight, Baby, FileText, Box, BadgeCheck, MessageCircle, Wrench, Scale, Users, Palette, Network, UserCog, Crown, Mic, Play, Database, Building2, Handshake, Award, ShieldCheck, TrendingDown, LayoutGrid, Triangle, ChevronDown } from "lucide-react";

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
  p2: ["Coup de cœur", "Seasonal"],
  p3: ["Essentials", "Permanent"],
  p4: ["Coup de cœur", "Seasonal"],
  p5: ["Essentials", "Basics"],
  p6: ["Best seller", "Permanent"],
  p7: ["Essentials", "Permanent"],
  p8: ["Best seller", "Permanent"],
  p9: ["Coup de cœur", "Top"],
  p10: ["Collab", "Top"],
  p11: ["Collab", "Seasonal"],
  p12: ["Collab", "Top"],
};
const PRODUITS = PRODUITS_BASE.map((p) => ({ ...p, focus: AXES[p.id][0], pyramide: AXES[p.id][1] }));

/* Product type targets stay mutually consistent: the minima add up to 74 % and the maxima to 106 %, so 100 % can be reached within every range */
const FOCUS_DEF = [
  { n: "Essentials", c: "#0053A0", target: "30 – 40 %", min: 30, max: 40, role: "core of the offer, permanently available" },
  { n: "Best seller", c: "#4B90CD", target: "22 – 30 %", min: 22, max: 30, role: "volume and traffic drivers" },
  { n: "Coup de cœur", c: "#c98a5b", target: "12 – 20 %", min: 12, max: 20, role: "fashion favourites, emotional animation of the offer" },
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

/* Offer agents: two groups built on the collection pyramid and the product type — one active agent per group.
   Name, target and role come from PYRAMIDE_DEF and FOCUS_DEF (single source). */
const agentOf = (defs, n, id, icon, desc) => { const d = defs.find((x) => x.n === n); return { id, name: d.n, icon, color: d.c, target: d.target, role: d.role, desc }; };
const AGENT_GROUPS = [
  { id: "pyramid", title: "Pyramid agents", short: "Pyramid", icon: Triangle, hint: "optimise one tier of the collection pyramid", agents: [
    agentOf(PYRAMIDE_DEF, "Permanent", "permanent", Layers, "Secures never-out-of-stock depth: continuous replenishment, stable colourways and the lowest cost per piece on the base of the offer."),
    agentOf(PYRAMIDE_DEF, "Basics", "basics", RotateCcw, "Maximises carry-over from one season to the next: reuses proven patterns and fabrics, limits new development cost and risk."),
    agentOf(PYRAMIDE_DEF, "Seasonal", "seasonal", Sparkles, "Paces the season: dated drops, fresh prints and colours, depth sized to sell through before the markdown period."),
    agentOf(PYRAMIDE_DEF, "Top", "top", Crown, "Builds image at the top of the range: premium finishes, shallow depth, kept under the 12 % ceiling to limit markdown."),
  ] },
  { id: "type", title: "Product type agents", short: "Product type", icon: LayoutGrid, hint: "optimise the role of the product in the offer", agents: [
    agentOf(FOCUS_DEF, "Essentials", "essentials", Boxes, "Protects availability of the core offer: permanent sizes and colours, sharp entry prices and smart multi-packs."),
    agentOf(FOCUS_DEF, "Best seller", "bestseller", TrendingUp, "Maximises volume and traffic: pushes depth and reorders on proven sellers, holds the key price points."),
    agentOf(FOCUS_DEF, "Coup de cœur", "coupdecoeur", Heart, "Drives the emotional animation of the offer: fashion favourites, prints and details that trigger the purchase."),
    agentOf(FOCUS_DEF, "Collab", "collab", Star, "Optimises licences and partnerships: Disney and Marvel capsules within the Collab share, royalties included in the margin."),
  ] },
];
const agentApplies = (target, p) => target === SEGMENTS[0] || target === p.segment;

/* Material criteria per colourway reference — relative coefficients (default material = 1).
   cost = fabric price index, co2 = garment-level footprint index (fibre + processing). */
const MATERIALS = {
  "Cotton": { cost: 1.0, co2: 1.0 },
  "US cotton": { cost: 1.06, co2: 0.97 },
  "Organic cotton": { cost: 1.22, co2: 0.86 },
  "BCI cotton": { cost: 1.02, co2: 0.96 },
  "Recycled cotton": { cost: 1.08, co2: 0.74 },
  "Recycled polyester": { cost: 0.94, co2: 0.82 },
  "Recycled polyamide": { cost: 1.2, co2: 0.95 },
  "PES": { cost: 0.86, co2: 1.12 },
  "Polyamide": { cost: 1.12, co2: 1.3 },
  "Viscose": { cost: 0.97, co2: 1.06 },
  "Lyocell": { cost: 1.16, co2: 0.9 },
  "Tencel": { cost: 1.26, co2: 0.88 },
  "Linen": { cost: 1.38, co2: 0.84 },
};
const RECYCLED = ["Recycled cotton", "Recycled polyester", "Recycled polyamide"];
/* A certification only applies to the materials it can certify (fits); otherwise it has no effect */
const CERTIFICATIONS = {
  "OEKO-TEX": { cost: 1.0, co2: 1.0, fits: null },
  "GRS": { cost: 1.04, co2: 0.98, fits: RECYCLED },
  "OCS": { cost: 1.05, co2: 1.0, fits: ["Organic cotton"] },
  "GOTS": { cost: 1.12, co2: 0.96, fits: ["Organic cotton"] },
  "RCS": { cost: 1.02, co2: 1.0, fits: RECYCLED },
};
const FABRIC_WEIGHTS = [160, 190, 230, 260, 290, 300];
/* Fabric weight (g/m²): fabric is ~55 % of the cost price and ~75 % of the footprint, both proportional to the mass */
const weightIdx = (w, share) => 1 + share * (w / 190 - 1);
/* Default criteria of each collection structure, read from its composition */
const MATERIAL_DEFAULTS = { p1: ["Cotton", 230], p2: ["Cotton", 290], p3: ["Cotton", 190], p4: ["Cotton", 160], p5: ["PES", 230], p6: ["Cotton", 190], p7: ["Cotton", 160], p8: ["Cotton", 190], p9: ["Cotton", 190], p10: ["Cotton", 160], p11: ["Cotton", 160], p12: ["Cotton", 190] };
const defaultMaterial = (p) => { const [material, weight] = MATERIAL_DEFAULTS[p.id] || ["Cotton", 190]; return { material, cert: "OEKO-TEX", weight }; };
const certApplies = (m) => { const c = CERTIFICATIONS[m.cert]; return !c.fits || c.fits.includes(m.material); };
const materialIdx = (m) => {
  const mat = MATERIALS[m.material], cert = certApplies(m) ? CERTIFICATIONS[m.cert] : { cost: 1, co2: 1 };
  return { cost: mat.cost * cert.cost * weightIdx(m.weight, 0.55), co2: mat.co2 * cert.co2 * weightIdx(m.weight, 0.75) };
};
/* Per colourway reference: cost price and footprint relative to the default criteria of the structure */
const materialRefs = (p, list) => {
  const base = materialIdx(defaultMaterial(p));
  return list.map((m) => { const i = materialIdx(m); return { ...m, fCost: i.cost / base.cost, fCo2: i.co2 / base.co2, cost: +(p.revient * (i.cost / base.cost)).toFixed(2), co2: +(p.co2 * (i.co2 / base.co2)).toFixed(2), applies: certApplies(m) }; });
};
/* Structure level: the volume is split evenly across the colourway references, so the structure takes their average */
const materialStructure = (p, list) => {
  const refs = materialRefs(p, list);
  const avg = (k) => refs.reduce((s, r) => s + r[k], 0) / (refs.length || 1);
  return { refs, rev: +(p.revient * avg("fCost")).toFixed(2), co2: +(p.co2 * avg("fCo2")).toFixed(2) };
};
const materialSummary = (list) => {
  const m = {};
  list.forEach((x) => { const k = `${x.material} · ${x.cert} · ${x.weight} g`; m[k] = (m[k] || 0) + 1; });
  return Object.entries(m).map(([k, n]) => (n > 1 ? `${k} (×${n})` : k)).join(" / ");
};
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
/* Simulated actuals: a monitored line carries its own factors (offer perimeters) or falls back to the department maps */
const caFacOf = (d) => d.caFac || REEL_CA_FACTEUR[d.n] || (() => 1);
const demGapOf = (d) => d.demGap || REEL_DEM_ECART[d.n] || (() => 0);
const co2FacOf = (d) => d.co2Fac || REEL_CO2_FACTEUR[d.n] || (() => 1);
const causeOf = (d) => d.cause || CO2_CAUSES[d.n] || "";
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

/* ============================================================
   Collapsible section — every section of every tab opens closed:
   only its title is visible until clicked. The content stays mounted
   while hidden, so steps and inputs keep their state.
   ============================================================ */
function CollapsibleSection({ title, icon: Icon, iconColor = T.accent, lead, sub, right, accent, nested = false, children, style }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const box = nested
    ? { background: T.panel2, border: `1px solid ${accent ? `${accent}66` : T.line}`, borderRadius: 11, padding: open ? 14 : "11px 14px", marginTop: 16 }
    : { background: T.panel, border: `1px solid ${accent ? `${accent}66` : T.lineSoft}`, borderRadius: 14, padding: open ? 18 : "14px 18px", marginBottom: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)" };
  return (
    <section style={{ ...box, ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <div role="button" tabIndex={0} aria-expanded={open} onClick={toggle} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", userSelect: "none", outline: "none", minWidth: 0, flex: open ? "0 1 auto" : "1 1 auto" }}>
          <ChevronDown size={16} color={T.faint} style={{ flexShrink: 0, transition: "transform .15s", transform: open ? "none" : "rotate(-90deg)" }} />
          {lead}
          {Icon && <Icon size={15} color={iconColor} style={{ flexShrink: 0 }} />}
          <span style={{ fontSize: nested ? 12.5 : 13.5, fontWeight: 800, color: T.ink }}>{title}</span>
        </div>
        {open && sub && <span style={{ fontSize: 11.5, color: T.faint }}>{sub}</span>}
        {open && right}
      </div>
      <div style={{ display: open ? "block" : "none", marginTop: 14 }}>{children}</div>
    </section>
  );
}

/* Number field that can be cleared while typing: an empty field on blur gives the value back to the calculation */
function KpiInput({ value, onCommit, step = 0.01, disabled, width = "100%" }) {
  const [draft, setDraft] = useState(null);
  return (
    <input type="number" size={6} step={step} min={0} disabled={disabled} value={draft ?? String(value)}
      onFocus={() => setDraft(String(value))}
      onChange={(e) => { const v = e.target.value; setDraft(v); if (v !== "" && !Number.isNaN(+v)) onCommit(+v); }}
      onBlur={() => { if (draft === "") onCommit(null); setDraft(null); }}
      style={{ width, minWidth: 0, flex: "1 1 auto", boxSizing: "border-box", background: disabled ? T.panel2 : T.panel, border: `1px solid ${T.line}`, borderRadius: 8, padding: "6px 8px", fontFamily: MONO, fontSize: 15, fontWeight: 600, color: T.ink, outline: "none", cursor: disabled ? "not-allowed" : "text" }} />
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
  const k = st.kpisOf(sel);
  /* Approved offers are frozen: every displayed choice comes from the approval snapshot and controls are disabled */
  const locked = st.isLocked(sel.id);
  const snap = locked ? st.snapshotOf(sel.id) : null;
  const vAgents = locked ? snap.agentIds : st.agentIds;
  const vTargets = locked ? snap.agentTargets : st.agentTargets;
  const vTerr = locked ? snap.territoire : st.territoire;
  const vZone = locked ? snap.zone : st.zone;
  const vCol = locked ? snap.colIdx : st.colIdx;
  const vEdits = locked ? snap.edits : k.edited;
  const mat = materialStructure(sel, locked ? snap.materials : st.materialsOf(sel));
  /* Agent applied to the selected structure, per group: the active agent of the group if its target segment covers the structure */
  const appliedAgent = (g) => {
    const id = locked ? snap.agentApplied[g.id] : agentApplies(vTargets[g.id], sel) ? vAgents[g.id] : null;
    return g.agents.find((a) => a.id === id) || null;
  };
  const lockStyle = locked ? { opacity: 0.55, cursor: "not-allowed" } : {};
  const selSt = { background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 7, padding: "4px 8px", color: T.ink, fontSize: 11, fontFamily: SANS, fontWeight: 700, cursor: locked ? "not-allowed" : "pointer", outline: "none" };
  const matSel = { ...selSt, width: "100%", minWidth: 110, fontSize: 11.5, padding: "5px 7px" };
  const matTd = { padding: "7px 9px", borderBottom: `1px solid ${T.lineSoft}`, verticalAlign: "top" };
  const delta = (f, good) => {
    const d = (f - 1) * 100;
    if (Math.abs(d) < 0.05) return <span style={{ fontSize: 10, color: T.faint }}>base</span>;
    const up = d > 0;
    return <span style={{ fontSize: 10, color: up === good ? T.ok : T.warn }}>{up ? "+" : "−"}{fr1(Math.abs(d))} %</span>;
  };
  const kpiRows = [
    { f: "pvi", label: "PVI", unit: "€", step: 0.1, icon: Tag, color: T.accent, val: locked ? snap.pvi : k.pvi, calc: k.computed.pvi, src: "catalogue price", fmt: eur, rule: <RuleStatus st={st} area="Supply" kpi="price" /> },
    { f: "rev", label: "Cost price", unit: "€", step: 0.01, icon: Wallet, color: T.blue, val: locked ? snap.revient : k.rev, calc: k.computed.rev, src: "from the material criteria", fmt: eur, rule: <RuleStatus st={st} area="Supply" kpi="margin" /> },
    { f: "marge", label: "Margin", unit: "%", step: 1, icon: TrendingUp, color: T.human, val: locked ? snap.marge : k.marge, calc: k.computed.marge, src: "auto from PVI and cost price", fmt: (v) => `${v} %`, rule: <RuleStatus st={st} area="Supply" kpi="margin" /> },
    { f: "co2", label: "CO₂ weight / piece", unit: "kg", step: 0.01, icon: Leaf, color: T.ok, val: locked ? snap.co2 : k.co2, calc: k.computed.co2, src: "from the material criteria", fmt: (v) => `${fr2(v)} kg`, rule: <RuleStatus st={st} area="Offer & Collection" kpi="footprint" productId={sel.id} /> },
    { f: "lead", label: "Supply lead time", unit: "d", step: 1, icon: Truck, color: T.silver, val: locked ? snap.lead : k.lead, calc: k.computed.lead, src: "from the sourcing scenario", fmt: (v) => `${v} d`, rule: <RuleStatus st={st} area="Supply" kpi="sourcing" action={false} /> },
    { f: "vol", label: "Volume", unit: "units", step: 1000, icon: Boxes, color: T.silver, val: locked ? snap.volume : k.vol, calc: k.computed.vol, src: "collection plan", fmt: (v) => `${u(v)} units`, rule: <RuleStatus st={st} area="Go to Market" kpi="volume" /> },
  ];

  return (
    <div>
      {/* ---- Product manager cockpit ---- */}
      <CollapsibleSection title="Product manager cockpit — Baby Offer" icon={Baby}>
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
      </CollapsibleSection>

      {/* ---- Approved offer: frozen summary (read only) ---- */}
      {locked && (
        <CollapsibleSection title={`Approved offer — ${snap.name}`} icon={BadgeCheck} iconColor={T.ok} accent={T.ok}
          right={<>
            <Chip color={T.ok}>Approved - read only</Chip>
            <span style={{ fontSize: 10.5, fontFamily: MONO, color: T.faint }}>approved on {snap.at.toLocaleDateString("fr-FR")} at {snap.at.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</span>
            <button onClick={() => st.reopen(sel.id)} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 800, fontFamily: SANS }}><Wrench size={13} /> Edit offer again</button>
          </>}>
          <div style={{ fontSize: 11.5, color: T.sub, marginBottom: 10, lineHeight: 1.5 }}>All choices are frozen as they were at approval. Selecting the offer does not unlock it: only “Edit offer again” reopens editing and restores these choices.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 8 }}>
            {[["Collection structure", snap.name], ["Segment", snap.segment], ["PVI", eur(snap.pvi)], ["Volume", `${u(snap.volume)} units`], ["Territory / zone", snap.territoire === "Specific" ? `Specific · ${snap.zone || "no zone"}` : "Core"], ...AGENT_GROUPS.map((g) => [`${g.short} agent`, (appliedAgent(g) || {}).name || "none"]), ["Sourcing scenario", snap.scenName], ["Colourway", snap.coloris || "—"], ["Material criteria", materialSummary(snap.materials)], ["Product sheet", snap.sheet ? `${snap.sheet.filled} / ${snap.sheet.total} fields${snap.sheet.codif ? ` · ${snap.sheet.codif}` : ""}${snap.sheet.written ? " · written to PLM" : ""}` : "not generated"]].map(([l, v]) => (
              <div key={l} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "8px 11px" }}>
                <div style={{ fontSize: 10, color: T.faint, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginTop: 3, lineHeight: 1.4 }}>{v}</div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* ---- Offer structuring ---- */}
      <CollapsibleSection title="Offer structuring — Offer status" icon={ClipboardList} sub="click a collection structure to see the applied agents and break it down into products"
        right={<span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: T.faint, fontFamily: MONO }}>Sort by:
          <select value={sortK} onChange={(e) => setSortK(e.target.value)} style={{ ...selSt, cursor: "pointer" }}>
            {SORT_FIELDS.map((f) => <option key={f.k} value={f.k}>{f.label}</option>)}
          </select>
        </span>}>
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

        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Sparkles size={15} color={T.human} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Offer agents — one active agent per group</span>
          <span style={{ fontSize: 11, color: T.faint }}>built on the collection pyramid and the product type</span>
        </div>
        {AGENT_GROUPS.map((g) => (
          <div key={g.id} style={{ marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              <g.icon size={13} color={T.accent} /><span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>{g.title}</span>
              <span style={{ fontSize: 11, color: T.faint }}>{g.hint}</span>
              <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: T.faint, fontFamily: MONO }}>Apply to:
                <select value={vTargets[g.id]} disabled={locked} onChange={(e) => st.setAgentTarget(g.id, e.target.value)} style={selSt}>
                  {SEGMENTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(215px,1fr))", gap: 10 }}>
              {g.agents.map((a) => {
                const on = vAgents[g.id] === a.id;
                return (
                  <button key={a.id} disabled={locked} onClick={() => !locked && st.setAgent(g.id, on ? null : a.id)} style={{ textAlign: "left", cursor: "pointer", background: on ? `${a.color}12` : T.panel2, border: `1px solid ${on ? a.color : T.line}`, borderRadius: 11, padding: "11px 12px", fontFamily: SANS, ...lockStyle }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, display: "grid", placeItems: "center", background: `${a.color}1c`, border: `1px solid ${a.color}55` }}><a.icon size={14} color={a.color} /></span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>{a.name}</span>
                      {on && <Check size={14} color={a.color} style={{ marginLeft: "auto" }} />}
                    </div>
                    <div style={{ fontSize: 10, fontFamily: MONO, color: T.sub, marginTop: 6 }}>target {a.target} · {a.role}</div>
                    <div style={{ fontSize: 10.5, color: T.faint, marginTop: 4, lineHeight: 1.45 }}>{a.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

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
          <span style={{ fontSize: 12, color: T.ink }}>Agents applied to <strong>“{sel.name}”</strong>:</span>
          {AGENT_GROUPS.map((g) => {
            const a = appliedAgent(g);
            return (
              <span key={g.id} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 10.5, fontFamily: MONO, color: T.faint }}>{g.short}</span>
                {a ? <Chip color={a.color}>{a.name}</Chip> : <span style={{ fontSize: 11.5, color: T.faint }}>no active agent on this segment</span>}
              </span>
            );
          })}
          {locked && <Chip color={T.ok}>Approved - read only</Chip>}
          <span style={{ marginLeft: "auto", fontSize: 11, color: T.faint, fontFamily: MONO }}>→ broken down into {sel.coloris.length} colourway refs in “Work in progress”</span>
        </div>
      </CollapsibleSection>

      {/* ---- Work in progress ---- */}
      <CollapsibleSection title="Work in progress" icon={Layers} sub="colourway breakdown of the selected collection structure" right={locked ? <Chip color={T.ok}>Approved - read only</Chip> : null}>
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

        <span style={microLbl}>Material criteria per colourway reference — they drive the cost price and the CO₂ weight</span>
        <div style={{ overflowX: "auto", border: `1px solid ${T.lineSoft}`, borderRadius: 10, marginBottom: 6 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr>
              {["Colourway reference", "Material", "Certification", "Fabric weight", "Cost price", "CO₂ / piece"].map((c, j) => (
                <th key={c} style={{ textAlign: j >= 4 ? "right" : "left", padding: "7px 9px", fontSize: 10, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{c}</th>
              ))}
            </tr></thead>
            <tbody>
              {sel.coloris.map(([n, c], i) => {
                const r = mat.refs[i];
                return (
                  <tr key={n}>
                    <td style={matTd}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, whiteSpace: "nowrap", marginTop: 4 }}>
                        <span style={{ width: 12, height: 12, borderRadius: 99, background: c, border: `1px solid ${T.line}`, flexShrink: 0 }} />
                        <span style={{ fontWeight: 700, color: T.ink }}>{n}</span>
                        <span style={{ fontFamily: MONO, fontSize: 10, color: T.faint }}>{sel.id.toUpperCase()}-{String(i + 1).padStart(2, "0")}</span>
                      </span>
                    </td>
                    <td style={matTd}>
                      <select value={r.material} disabled={locked} onChange={(e) => st.setMaterial(sel.id, i, "material", e.target.value)} style={matSel}>
                        {Object.keys(MATERIALS).map((m) => <option key={m}>{m}</option>)}
                      </select>
                    </td>
                    <td style={matTd}>
                      <select value={r.cert} disabled={locked} onChange={(e) => st.setMaterial(sel.id, i, "cert", e.target.value)} style={matSel}>
                        {Object.keys(CERTIFICATIONS).map((m) => <option key={m}>{m}</option>)}
                      </select>
                      {!r.applies && <div style={{ fontSize: 10, color: T.warn, marginTop: 3, lineHeight: 1.35, maxWidth: 170 }}>{r.cert} does not certify {r.material.toLowerCase()} — no effect</div>}
                    </td>
                    <td style={matTd}>
                      <select value={r.weight} disabled={locked} onChange={(e) => st.setMaterial(sel.id, i, "weight", +e.target.value)} style={matSel}>
                        {FABRIC_WEIGHTS.map((w) => <option key={w} value={w}>{w} g/m²</option>)}
                      </select>
                    </td>
                    <td style={{ ...matTd, textAlign: "right", fontFamily: MONO, whiteSpace: "nowrap" }}><div style={{ marginTop: 4, color: T.ink }}>{eur(r.cost)}</div>{delta(r.fCost, false)}</td>
                    <td style={{ ...matTd, textAlign: "right", fontFamily: MONO, whiteSpace: "nowrap" }}><div style={{ marginTop: 4, color: T.ink }}>{fr2(r.co2)} kg</div>{delta(r.fCo2, false)}</td>
                  </tr>
                );
              })}
              <tr style={{ background: T.panel2 }}>
                <td colSpan={4} style={{ padding: "8px 9px", fontSize: 10.5, fontFamily: MONO, color: T.faint, textTransform: "uppercase", letterSpacing: 0.5 }}>Structure — average of the {sel.coloris.length} colourway refs (volume split evenly)</td>
                <td style={{ padding: "8px 9px", textAlign: "right", fontFamily: MONO, fontWeight: 800, color: T.ink, whiteSpace: "nowrap" }}>{eur(mat.rev)}</td>
                <td style={{ padding: "8px 9px", textAlign: "right", fontFamily: MONO, fontWeight: 800, color: T.ink, whiteSpace: "nowrap" }}>{fr2(mat.co2)} kg</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ fontSize: 10.5, color: T.faint, lineHeight: 1.5, marginBottom: 16 }}>Organic cotton and GOTS raise the cost price; recycled materials lower the CO₂ weight; a heavier fabric raises both. Changing a criterion recalculates the cost price and the CO₂ weight below — they stay editable by hand afterwards.</div>

        <span style={microLbl}>Collection structure indicators — editable by hand, a manual value overrides the calculation</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {kpiRows.map((s) => {
            const manual = vEdits[s.f] != null;
            return (
              <div key={s.f} style={{ flex: "1 1 130px", minWidth: 0, background: T.panel2, border: `1px solid ${manual ? `${T.human}88` : T.line}`, borderRadius: 11, padding: "11px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: T.sub, fontSize: 11, fontWeight: 600 }}>
                  <s.icon size={13} color={s.color} />{s.label}
                  {manual && <span style={{ marginLeft: "auto" }}><Chip color={T.human}>Manual</Chip></span>}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <KpiInput key={`${sel.id}-${s.f}-${locked}`} value={s.val} step={s.step} disabled={locked} onCommit={(v) => st.setKpi(sel.id, s.f, v)} />
                  <span style={{ fontFamily: MONO, fontSize: 11, color: T.faint }}>{s.unit}</span>
                  {manual && !locked && (
                    <button title="Back to the calculated value" onClick={() => st.setKpi(sel.id, s.f, null)} style={{ flexShrink: 0, cursor: "pointer", display: "grid", placeItems: "center", width: 24, height: 24, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 7, padding: 0 }}><RotateCcw size={11} color={T.faint} /></button>
                  )}
                </div>
                <div style={{ fontSize: 10, fontFamily: MONO, color: T.faint, marginTop: 5, lineHeight: 1.4 }}>{locked ? "frozen at approval" : manual ? `manual · calculated ${s.fmt(s.calc)}` : s.src}</div>
                {s.rule && <div style={{ marginTop: 6 }}>{s.rule}</div>}
              </div>
            );
          })}
        </div>
      </CollapsibleSection>

      {/* ---- Product sheet assistant: at the end of the product brief, a voice note generates the sheet ---- */}
      <ProductSheetAssistant st={st} locked={locked} />

      {/* ---- Product development validation ---- */}
      <CollapsibleSection title="Product development validation" icon={BadgeCheck} iconColor={T.ok} right={<Chip color={T.accent}>{sel.name}</Chip>}>
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
      </CollapsibleSection>
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
    { id: "focus", icon: LayoutGrid, title: "Product type focus", verdict: verdictOf(focusRows), msg: "Coup de cœur climbs to 23,3 % of volume (895 000 pcs across 8 colourway refs) against a 12 – 20 % target, carried by the 410 000-piece velour pyjamas. Essentials (37,7 %), Best seller (25,1 %) and Collab (13,9 %) are within their targets: trim the Coup de cœur depth to limit the end-of-season markdown risk." },
    { id: "prix", icon: Scale, title: "Price coherence", verdict: "Alert", msg: "Over-density at the 9,00 € PVI (5 structures out of 12). Recommendation: smooth part of the offer towards the 7 – 8 € price points to restore the 4 → 15 € price ladder." },
    { id: "personas", icon: Users, title: "Target split", verdict: "Alert", msg: "The current customer slightly exceeds its target (above 40 %). Rebalance in favour of the trendy customer on the next store launches." },
    { id: "couleurs", icon: Palette, title: "Colour balance", verdict: "Compliant", msg: "Black at 6 % — below the 8 % threshold. S1 2027 fashion colour “Sage green” at 13 %: to push towards 18 % (season objective)." },
    { id: "canaux", icon: Network, title: "Channel & geography split", verdict: "Alert", msg: "International at 30 % vs ≥ 35 % objective. Strengthen the export-eligible Core structures in the South and Maghreb zones." },
  ];
  const ck = (id) => checks.find((c) => c.id === id);

  return (
    <div>
      <MarketBriefEditor st={st} />

      {/* ---- Collection director cockpit ---- */}
      <CollapsibleSection title="Market manager cockpit — Kids collection S1 2027" icon={Crown}>
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
      </CollapsibleSection>

      {/* ---- Collection balance agent ---- */}
      <CollapsibleSection title="Collection balance agent" icon={Scale}
        right={<button onClick={() => setRan(true)} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 8, padding: "6px 13px", fontSize: 11.5, fontWeight: 800, fontFamily: SANS }}><Sparkles size={13} /> Re-run analysis</button>}>
        <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, margin: "0 0 14px" }}>The agent scans the whole collection and checks the balance of the offer: collection pyramid, product type focus, price coherence, target split, colours and channel split. Each control proposes optimisation scenarios, simulates their impact and forwards the change request to the product manager.</p>

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

            {/* 4. Channels */}
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
      </CollapsibleSection>
    </div>
  );
}

/* ============================================================
   Product sheet assistant (voice-based referencing, integrated in the Product Manager journey)
   ============================================================ */
const catOf = (n) => { const s = n.toLowerCase(); if (s.includes("bod")) return "Bodysuit"; if (s.includes("pyjama") || s.includes("sleepsuit")) return "Sleepsuit / Pyjamas"; if (s.includes("romper")) return "Romper"; return "Set"; };

/* ============================================================
   Market brief — written in Market Framework, copied read-only to
   Product Manager (local simulation, no network)
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
  { re: /licen|character|disney|marvel|hero/i, theme: "Licences & characters", guidance: "keep licences as an animation within the 10 – 16 % Collab share" },
  { re: /colou?r|pastel|sage|palette|tone/i, theme: "Colour direction", guidance: "push the S1 2027 fashion colour towards 18 % of the colour mix" },
  { re: /international|export|zone|maghreb|south|tropic/i, theme: "International reach", guidance: "open export-eligible Core structures to the South and Maghreb zones" },
  { re: /essential|basic|permanent|bodysuit|sleepsuit|nightwear|underwear/i, theme: "Essentials base", guidance: "secure permanent bodysuit packs and nightwear availability all season" },
  { re: /trend|fashion|novelty|capsule|impulse|animation|favourite|coup de c/i, theme: "Fashion animation", guidance: "keep Coup de cœur pieces within their 12 – 20 % animation share" },
];
const SAMPLE_MARKET_INTENTION = "For S1 2027 the Baby market must stay the most accessible layette offer on the market: hold the 4 → 15 € price ladder, secure permanent bodysuit packs and nightwear every week of the season, and bring comfort and softness to every essential. We push a low-carbon direction on the biggest volumes with recycled cotton and nearshore sourcing. Colour direction: sage green and ecru as the season signature. Licences remain an animation of the offer, not the base. Open the export-eligible Core structures to the South and Maghreb zones.";
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
    <CollapsibleSection title="Write the market brief" lead={<span style={{ width: 22, height: 22, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: T.accent, color: "#ffffff", fontFamily: MONO, fontSize: 11, fontWeight: 800 }}>1</span>}
      sub="shared orientation for the whole market, then for the collections and the products"
      right={brief ? <span style={{ marginLeft: "auto" }}><Chip color={dirty ? T.warn : T.ok}>{dirty ? "Edited since last synthesis" : "Brief synthesized"}</Chip></span> : null}>
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
              <strong>Market brief synthesized on {brief.at.toLocaleDateString("fr-FR")} at {brief.at.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</strong> — available to Product Manager as a read-only copy. It stays editable here only.
            </div>
            <span style={{ display: "inline-flex", gap: 6, flexWrap: "wrap" }}>
              <button onClick={() => st.setTab("product")} style={{ cursor: "pointer", background: T.panel, color: T.accent, border: `1px solid ${T.accent}55`, borderRadius: 8, padding: "6px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}>Product Manager →</button>
            </span>
          </div>
          <MarketBriefCard st={st} origin={false} />
        </div>
      )}
    </CollapsibleSection>
  );
}

/* Read-only copy of the market brief (Product Manager), with its provenance; origin = false is the synthesis shown in the editor */
function MarketBriefCard({ st, origin = true }) {
  const b = st.marketBrief;
  const s = b ? b.summary : null;
  const stamp = b ? <span style={{ marginLeft: "auto", fontSize: 10.5, fontFamily: MONO, color: T.faint }}>{b.at.toLocaleDateString("fr-FR")} · {b.sourceNames.join(", ")}</span> : null;
  const body = s && (
    <>
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
    </>
  );
  if (origin) {
    return (
      <CollapsibleSection title="Market brief" icon={Crown} accent={b ? T.accent : null} right={b ? <><Chip color={T.accent}>Read-only copy · from Market Framework</Chip>{stamp}</> : null}>
        {b ? (
          <>
            {body}
            <div style={{ fontSize: 10.5, color: T.faint, marginTop: 10 }}>Editable from Market Framework only · {u(s.words)} words in the source intention.</div>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: T.panel2, border: `1px dashed ${T.line}`, borderRadius: 12, padding: "12px 14px" }}>
            <FileText size={15} color={T.faint} />
            <span style={{ fontSize: 12, color: T.sub, flex: "1 1 240px" }}>No market brief yet — the Market Manager writes and synthesizes it in Market Framework.</span>
            <button onClick={() => st.setTab("market")} style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: T.panel, color: T.accent, border: `1px solid ${T.accent}55`, borderRadius: 8, padding: "6px 12px", fontSize: 11.5, fontWeight: 700, fontFamily: SANS }}>Go to Market Framework <ArrowRight size={12} /></button>
          </div>
        )}
      </CollapsibleSection>
    );
  }
  if (!b) return null;
  return (
    <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
        <Crown size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Market brief</span>
        <Chip color={T.ok}>Synthesis</Chip>
        {stamp}
      </div>
      {body}
    </div>
  );
}

/* ============================================================
   Market Framework (Market Manager) · Product Manager
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

/* Single Framework tab (end-to-end view): one sub-tab per framing category */
const FW_SUBS = [{ id: "financial", label: "Financial", icon: Scale }, { id: "co2", label: "CO₂", icon: Leaf }, { id: "market", label: "Market", icon: Crown }];
const FRAMEWORK_IDS = FW_SUBS.map((s) => s.id);
function FrameworkPage({ st, fw, sub, setSub }) {
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {FW_SUBS.map((t) => {
          const on = sub === t.id;
          return (
            <button key={t.id} onClick={() => setSub(t.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: on ? T.human : T.panel2, color: on ? "#ffffff" : T.sub, border: `1px solid ${on ? T.human : T.line}`, borderRadius: 999, padding: "8px 15px", fontSize: 12, fontWeight: 700, fontFamily: SANS }}>
              <t.icon size={13} /> {t.label}
            </button>
          );
        })}
      </div>
      {sub === "financial" && <BudgetPage st={st} fw={fw} />}
      {sub === "co2" && <CO2Page fw={fw} />}
      {sub === "market" && <MarketFrameworkPage st={st} />}
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
    <CollapsibleSection title="Product sheet from a voice note" icon={Mic}
      right={<>
        <Chip color={T.accent}>{sel.name}</Chip>
        {locked && <Chip color={T.ok}>Approved - read only</Chip>}
        <button onClick={reset} disabled={locked} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, background: "transparent", color: T.faint, border: `1px solid ${T.line}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS, ...dis(true) }}><RotateCcw size={12} /> Start over</button>
      </>}>
      {/* ---- Voice note ---- */}
      <div>
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
        <div style={{ background: T.panel, border: `1px solid ${T.line}`, borderRadius: 12, padding: 16, marginTop: 14 }}>
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
        <div style={{ background: T.panel, border: `1px solid ${T.human}55`, borderRadius: 12, padding: 16, marginTop: 14 }}>
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
        <div style={{ background: T.panel, border: `1px solid ${T.ok}55`, borderRadius: 12, padding: 16, marginTop: 14 }}>
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
    </CollapsibleSection>
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
      return `I recommend “${scen.name}”: ${eur(scen.cost)}/pc · ${st.leadOf(scen)} d · stock-out ${st.rupOf(scen)} %. ${scen.note}`;
    if (/(prix|price|coût|cout|cost|revient)/.test(s))
      return sel.scenarios.map((x) => `${x.name}: ${eur(x.cost)}/pc`).join(" · ");
    if (/(délai|delai|lead|temps|time)/.test(s))
      return sel.scenarios.map((x) => `${x.name}: ${st.leadOf(x)} d`).join(" · ");
    if (/(co2|carbone|carbon|empreinte|footprint)/.test(s))
      return `Current footprint: ${st.co2Of(sel)} kg/pc. Nearshore sourcing sharply reduces transport.`;
    if (/(risque|risk|rupture|stock-out|stockout|alea|aléa)/.test(s))
      return sel.scenarios.map((x) => `${x.name}: stock-out ${st.rupOf(x)} %`).join(" · ");
    return `For “${sel.name}” (${u(st.volOf(sel))} units · PVI ${eur(st.pvcOf(sel))}), ask me for a recommendation, costs, lead times, the CO₂ footprint or the risks.`;
  };
  const send = () => { if (!inp.trim()) return; const q = inp.trim(); setMsgs((m) => [...m, { me: true, t: q }, { me: false, t: answer(q) }]); setInp(""); };

  return (
    <div>
      <PageHeader title="Go to market" desc="Store launch brief, volume and selling price, then discussion with the supply agent." expert={EXPERTS.supply} />

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
                    {isReco && <Chip color={T.blue}>Recommended</Chip>}
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
              <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, textTransform: "uppercase", marginBottom: 6 }}>Selected scenario</div>
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
    <CollapsibleSection title="Partner business plans × in-season forecasts" icon={Handshake} right={<VensoTag txt="Venso reconciliation" />}>
      <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>The long industrial cycle (commitments, purchasing policy, CSR trajectories) confronted with the short commercial cycle (S1 2027 forecasts and orders received from RELEX).</div>

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

      {/* ---- Current step: collapsible panel, the stepper above switches its content ---- */}
      <CollapsibleSection nested title={`Step ${kfiStep} · ${KFI_STEPS[kfiStep - 1][0]}`} sub={KFI_STEPS[kfiStep - 1][1]} style={{ marginTop: 0 }}>
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
      </CollapsibleSection>
    </CollapsibleSection>
  );
}

/* ============================================================
   KFI — Supplier compliance: tailored audit grids (Quality Vision).
   Quality audit = the Quality Vision mock-up taken as is (data, scoring, four stages);
   the social, environmental and industrial audits run the same engine on their own data.
   Everything is simulated; no supplier, figure, review or signal refers to a real partner.
   ============================================================ */
/* Cockpit typography and palette (T, SANS, MONO) applied to the Quality Vision layout */
const QV_BLUE = T.accent;
const QV_BLUE_DARK = T.human;
const QV_UNIFORM_TOTAL = 184;
/* Tailwind slate scale of the mock-up, converted to inline styles */
const QV_S = { 50: T.panel2, 100: T.lineSoft, 200: T.line, 300: T.faint, 400: T.faint, 500: T.faint, 600: T.sub, 800: T.ink, 900: T.ink };
const QV_FONT = SANS;
const QV_XS = { fontSize: 11.5, lineHeight: 1.45 };
const QV_SM = { fontSize: 12.5, lineHeight: 1.45 };
const QV_TAB = { fontFamily: MONO };
const QV_TRUNC = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };
const qvName = (id) => PRODUITS_BASE.find((p) => p.id === id).name;

/* ---------------------------------------------------------------- Quality audit (mock-up data) */
const QV_METHODS = {
  lab: { label: "Lab test" },
  inline: { label: "In-line measurement" },
  doc: { label: "Document review" },
  visit: { label: "Unannounced visit" },
};

const QV_FREQ = { frequent: 3, medium: 2, rare: 1 };
const QV_SEV = { severe: 3, minor: 1 };

const QV_COUNTRIES = {
  Italy: { note: "Mature industrial base, short logistics loop, strong regulatory enforcement.", boosts: {} },
  Portugal: { note: "Reliable textile and mold-making ecosystem, moderate audit coverage.", boosts: {} },
  Vietnam: { note: "Fast-growing capacity, frequent subcontracting, variable lab equipment.", boosts: { subcontract: 0.3, visit: 0.2 } },
  China: { note: "Deep supplier tiers, high subcontracting risk, uneven lab capability.", boosts: { subcontract: 0.4, visit: 0.25 } },
  Bangladesh: { note: "Textile-dense, high subcontracting, limited in-house testing.", boosts: { subcontract: 0.5, visit: 0.35, lab: 0.3 } },
};

// Input 1 — history of costs of non-quality events (last three years)
const QV_NQ_COST = {
  low: {
    label: "Low and stable — €18k / €16k / €19k, rework",
    costs: [18, 16, 19], trend: "Stable", type: "In-plant rework",
    score: 12, boosts: { process: 0.15 },
    signal: "Non-quality costs are small and flat. The events stay inside the plant.",
  },
  spike: {
    label: "One spike — €220k recall two years ago, then quiet",
    costs: [220, 24, 20], trend: "Recovered", type: "Recall, then rework",
    score: 40, boosts: { lab: 0.3, final: 0.2 },
    signal: "One recall, then two quiet years. The root cause must be verified as closed.",
  },
  rising: {
    label: "Rising — €42k / €95k / €160k, field returns",
    costs: [42, 95, 160], trend: "Rising", type: "Field returns",
    score: 68, boosts: { final: 0.4, lab: 0.4, inline: 0.3 },
    signal: "Costs have quadrupled in three years and reach the customer. Escapes are not contained at final inspection.",
  },
  degrading: {
    label: "Degrading — €60k / €140k / €310k, field returns and one recall",
    costs: [60, 140, 310], trend: "Degrading", type: "Field returns and recall",
    score: 88, boosts: { final: 0.5, lab: 0.5, inline: 0.4, process: 0.4 },
    signal: "Costs have quintupled, with one recall. Non-quality is now the supplier's dominant cost signal.",
  },
  none: {
    label: "No history — new supplier",
    costs: [], trend: "Unknown", type: "None recorded",
    score: 50, boosts: { doc: 0.3, visit: 0.3 },
    signal: "No non-quality record exists. Absence of data is treated as risk, not as evidence.",
  },
};

// Input 2 — standards already met
const QV_ISO = {
  certified: { label: "ISO 9001 certified", score: 15, boosts: {} },
  expired: { label: "ISO 9001 expired", score: 55, boosts: { doc: 0.4, process: 0.2 } },
  none: { label: "No ISO 9001", score: 80, boosts: { doc: 0.6, process: 0.3 } },
};
const QV_EXTRA_STANDARDS = {
  iso14001: { label: "ISO 14001", relief: 5 },
  iso45001: { label: "ISO 45001", relief: 5 },
  oekotex: { label: "Oeko-Tex 100", relief: 10, families: ["textile"] },
  bsci: { label: "amfori BSCI", relief: 5 },
};

// Input 3a — past KIABI quality audits (last three, scored /100)
const QV_QUALITY_AUDITS = {
  strong: { label: "Strong — 92 / 90 / 93", scores: [92, 90, 93], findings: ["None", "1 minor", "None"], score: 10, boosts: {}, signal: "Three consistent quality audits, no recurring finding." },
  improving: { label: "Weak but improving — 68 / 74 / 80", scores: [68, 74, 80], findings: ["2 major", "1 major", "2 minor"], score: 40, boosts: { process: 0.3 }, signal: "Quality audits are recovering; the last major finding closed only one cycle ago." },
  worsening: { label: "Worsening — 88 / 79 / 71", scores: [88, 79, 71], findings: ["None", "2 minor, process control", "1 major, final inspection"], score: 78, boosts: { process: 0.6, inline: 0.4, final: 0.5 }, signal: "Quality audit scores fall at each cycle and the last one carries a major finding on the final gate." },
  none: { label: "None — new supplier", scores: [], findings: [], score: 55, boosts: { doc: 0.3, visit: 0.4 }, signal: "No KIABI quality audit on record." },
};

// Input 3b — past DPR audits (last three, pass / conditional / fail)
const QV_DPR_AUDITS = {
  compliant: { label: "Compliant — passed 3 of 3", results: ["Pass", "Pass", "Pass"], majors: [0, 0, 0], score: 10, boosts: {}, signal: "DPR audits passed three times, no major finding." },
  conditional: { label: "Conditional — 1 major finding open", results: ["Pass", "Conditional", "Conditional"], majors: [0, 1, 1], score: 45, boosts: { doc: 0.3, process: 0.3 }, signal: "DPR conditional twice, the same major finding remains open." },
  worsening: { label: "Worsening — pass, 2 majors, fail", results: ["Pass", "Conditional", "Fail"], majors: [0, 2, 3], score: 82, boosts: { process: 0.5, doc: 0.4, visit: 0.5, subcontract: 0.3 }, signal: "DPR degraded from pass to fail in three cycles; production requirements are no longer held." },
  none: { label: "None — new supplier", results: [], majors: [], score: 55, boosts: { doc: 0.3, visit: 0.4 }, signal: "No DPR audit on record." },
};

// Score composition — weights are displayed to the user
const QV_SCORE_WEIGHTS = { nq: 0.4, standards: 0.2, audits: 0.4 };

// Each product: tech pack cards, review clusters, candidate checkpoint pool.
// Checkpoint sources: tech (card ids), review (cluster ids), tags (supplier signal hooks).
// Products are four Baby collection structures of the cockpit (PRODUITS_BASE).
const QV_PRODUCTS = {
  p2: {
    name: qvName("p2"),
    short: "Velour pyjamas",
    family: "textile",
    familyLabel: "Baby nightwear",
    context: "Velour knit, cut and sew, front motif print, non-slip sole dots",
    defaults: { country: "Portugal", nq: "degrading", iso: "certified", extras: ["iso14001", "iso45001", "oekotex", "bsci"], qa: "worsening", dpr: "worsening" },
    techPack: [
      { id: "mat", kind: "Material", text: "Velour 77% cotton, 23% polyester, 290 g/m², brushed face, rib cuffs", conf: 0.95 },
      { id: "proc", kind: "Process", text: "Velour knitting and piece dyeing, cut and sew, front motif screen print, sole dots", conf: 0.91 },
      { id: "snap", kind: "Critical characteristic", text: "Snap fastener pull-off above 90 N, no sharp edge", conf: 0.93 },
      { id: "sole", kind: "Critical characteristic", text: "Non-slip sole dots, adhesion and slip resistance after 20 washes", conf: 0.88 },
      { id: "pile", kind: "Critical characteristic", text: "Velour pile retention, pilling grade 3–4 after 20 washes", conf: 0.89 },
      { id: "size", kind: "Critical characteristic", text: "Foot and body length within ±1 cm per size after washing", conf: 0.9 },
      { id: "reg", kind: "Regulatory", text: "EN 14878 nightwear flammability, EN 14682 cords, REACH, OEKO-TEX class I for babies", conf: 0.97 },
    ],
    reviews: [
      { id: "snaps", text: "Snaps pop open or come off", freq: "frequent", sev: "severe", maps: ["snap", "proc"], quote: "Two snaps came off in the first month — one ended up in the cot." },
      { id: "shrink", text: "Shrinks and the feet get too short", freq: "medium", sev: "minor", maps: ["size", "mat"], quote: "After three washes the feet are too tight, we had to go up a size." },
      { id: "slip", text: "Grip dots peel off the soles", freq: "rare", sev: "severe", maps: ["sole", "proc"], quote: "The grip dots flaked off and my toddler slipped on the kitchen floor." },
      { id: "pills", text: "Velour pills and looks worn", freq: "medium", sev: "minor", maps: ["pile", "mat"], quote: "Lovely and soft at first, but bobbly all over after a few weeks." },
    ],
    pool: [
      { id: "v1", label: "Snap pull-off test above 90 N, 10 garments per lot", method: "lab", base: 5, tech: ["snap"], review: ["snaps"], tags: ["lab", "final"] },
      { id: "v2", label: "Snap setting press pressure and die wear logged per shift", method: "inline", base: 5, tech: ["snap", "proc"], review: ["snaps"], tags: ["process", "inline"] },
      { id: "v3", label: "Velour weight and pile height checked on incoming rolls", method: "inline", base: 4, tech: ["pile", "mat"], review: ["pills"], tags: ["process", "inline"] },
      { id: "v4", label: "Dimensional stability after 3 washes, foot and body ±1 cm", method: "lab", base: 4, tech: ["size"], review: ["shrink"], tags: ["lab", "final"] },
      { id: "v5", label: "Sole dot adhesion and slip test after 20 washes", method: "lab", base: 4, tech: ["sole"], review: ["slip"], tags: ["lab", "final"] },
      { id: "v6", label: "Sole dot curing temperature and dwell logged per lot", method: "inline", base: 4, tech: ["sole", "proc"], review: ["slip"], tags: ["process", "inline"] },
      { id: "v7", label: "EN 14878 flammability and REACH reports valid for the fabric lot", method: "doc", base: 4, tech: ["reg"], review: [], tags: ["doc"] },
      { id: "v8", label: "Pilling test grade 3–4 after 20 washes", method: "inline", base: 3, tech: ["pile"], review: ["pills"], tags: ["process"] },
      { id: "v9", label: "Snap component lot traceability to garment lot", method: "doc", base: 3, tech: ["mat", "snap"], review: ["snaps", "slip"], tags: ["doc", "subcontract"] },
      { id: "v10", label: "100% snap tug check at final station, unannounced observation", method: "visit", base: 4, tech: ["snap"], review: ["snaps"], tags: ["final", "visit"] },
      { id: "v11", label: "Compacting and pre-shrink settings on dyed velour", method: "inline", base: 3, tech: ["proc"], review: ["shrink"], tags: ["process", "inline"] },
      { id: "v12", label: "Screen-print ink and sole dot supplier change control", method: "doc", base: 3, tech: ["sole"], review: ["slip"], tags: ["doc", "subcontract"] },
      { id: "v13", label: "Corrective actions from last recall closed and verified", method: "doc", base: 3, tech: [], review: [], tags: ["doc", "process", "final"] },
      { id: "v14", label: "Final inspection sampling plan applied (AQL 1.0)", method: "doc", base: 3, tech: [], review: [], tags: ["final", "doc"] },
      { id: "v15", label: "Night shift snap setting matches day shift settings", method: "visit", base: 2, tech: ["proc"], review: [], tags: ["visit", "process"] },
      { id: "v16", label: "Broken needle policy and 100% metal detection before packing", method: "inline", base: 3, tech: ["mat"], review: [], tags: ["process"] },
      { id: "v17", label: "Calibration of snap pull gauges and wash test equipment", method: "doc", base: 2, tech: ["snap", "size"], review: [], tags: ["doc", "lab"] },
      { id: "v18", label: "Operator training records for snap setting and sole dot stations", method: "doc", base: 2, tech: ["snap"], review: [], tags: ["doc", "process"] },
      { id: "v19", label: "Colour fastness to washing on the green shades", method: "lab", base: 1, tech: [], review: [], tags: ["lab"] },
      { id: "v20", label: "Care label and size label accuracy", method: "lab", base: 1, tech: [], review: [], tags: ["lab"] },
    ],
  },

  p6: {
    name: qvName("p6"),
    short: "Long-sleeved bodysuits",
    family: "textile",
    familyLabel: "Baby bodysuits",
    context: "Cotton interlock, cut and sew, envelope neck, crotch snap tape",
    defaults: { country: "Bangladesh", nq: "rising", iso: "none", extras: ["iso14001", "oekotex", "bsci"], qa: "improving", dpr: "conditional" },
    techPack: [
      { id: "mat", kind: "Material", text: "100% combed cotton interlock, 190 g/m², reactive dyed and printed", conf: 0.95 },
      { id: "proc", kind: "Process", text: "Cut and sew, overlock and flatlock seams, envelope neck binding, crotch snap tape", conf: 0.9 },
      { id: "seam", kind: "Critical characteristic", text: "Seam strength above 100 N at crotch and shoulders", conf: 0.88 },
      { id: "snap", kind: "Critical characteristic", text: "Crotch snap pull-off above 90 N after 20 washes", conf: 0.92 },
      { id: "neck", kind: "Critical characteristic", text: "Envelope neck opening stretches over a head form and recovers", conf: 0.87 },
      { id: "fast", kind: "Critical characteristic", text: "Colour fastness to washing and saliva grade 4", conf: 0.89 },
      { id: "reg", kind: "Regulatory", text: "EN 71-3 on snaps and print, nickel release, REACH, OEKO-TEX class I for babies", conf: 0.96 },
    ],
    reviews: [
      { id: "fade", text: "Colours fade or bleed in the wash", freq: "frequent", sev: "minor", maps: ["fast", "mat"], quote: "The pink one faded after ten washes and stained the white vests." },
      { id: "snapoff", text: "Crotch snaps tear away", freq: "medium", sev: "severe", maps: ["snap", "proc"], quote: "The snap tape tore after a month; one snap was missing." },
      { id: "neckopen", text: "Neck opening too tight over the head", freq: "medium", sev: "minor", maps: ["neck", "mat"], quote: "Nice fabric, but getting it over my baby's head is a struggle." },
      { id: "seamopen", text: "Seams open at the crotch", freq: "rare", sev: "minor", maps: ["seam"], quote: "The crotch seam started to split next to the snaps." },
    ],
    pool: [
      { id: "b1", label: "Crotch snap pull-off above 90 N after 5 washes", method: "lab", base: 5, tech: ["snap"], review: ["snapoff"], tags: ["lab", "final"] },
      { id: "b2", label: "Stitch density and thread tension checked at overlock line", method: "inline", base: 5, tech: ["seam", "proc"], review: ["snapoff"], tags: ["process", "inline"] },
      { id: "b3", label: "Colour fastness to washing and saliva on each colourway", method: "lab", base: 4, tech: ["fast"], review: ["fade"], tags: ["lab", "final"] },
      { id: "b4", label: "Snap setting pressure and snap tape stitching logged per lot", method: "inline", base: 4, tech: ["proc", "snap"], review: ["snapoff"], tags: ["process", "inline"] },
      { id: "b5", label: "Neck extension and recovery on head form after 20 washes", method: "lab", base: 4, tech: ["neck"], review: ["neckopen"], tags: ["lab"] },
      { id: "b6", label: "EN 71-3, nickel release and REACH reports for snap and print lots", method: "doc", base: 4, tech: ["reg"], review: [], tags: ["doc"] },
      { id: "b7", label: "Sewing subcontractor list and on-site verification", method: "visit", base: 4, tech: ["proc"], review: ["snapoff"], tags: ["visit", "subcontract"] },
      { id: "b8", label: "Interlock roll traceability to garment lot", method: "doc", base: 3, tech: ["mat"], review: ["fade"], tags: ["doc", "subcontract"] },
      { id: "b9", label: "Seam strength at crotch and shoulders above 100 N", method: "lab", base: 3, tech: ["seam", "mat"], review: ["seamopen"], tags: ["lab"] },
      { id: "b10", label: "Final inspection sampling plan applied (AQL 2.5)", method: "doc", base: 3, tech: [], review: [], tags: ["final", "doc"] },
      { id: "b11", label: "In-house lab equipment calibrated and used", method: "visit", base: 3, tech: [], review: [], tags: ["visit", "lab"] },
      { id: "b12", label: "Snap and needle specification match tech pack", method: "doc", base: 3, tech: ["snap"], review: ["snapoff"], tags: ["doc", "process"] },
      { id: "b13", label: "Corrective actions on field returns closed and verified", method: "doc", base: 3, tech: [], review: [], tags: ["doc", "process", "final"] },
      { id: "b14", label: "Unannounced production floor walk, night shift", method: "visit", base: 2, tech: ["proc"], review: [], tags: ["visit", "process"] },
      { id: "b15", label: "Fabric weight and width on incoming interlock rolls", method: "inline", base: 3, tech: ["mat"], review: ["neckopen"], tags: ["process"] },
      { id: "b16", label: "Snap supplier source and change control", method: "doc", base: 3, tech: ["snap", "reg"], review: ["snapoff"], tags: ["doc", "subcontract"] },
      { id: "b17", label: "Neck binding tension set per size", method: "inline", base: 2, tech: ["neck"], review: ["neckopen"], tags: ["process"] },
      { id: "b18", label: "Label and care instruction accuracy", method: "doc", base: 1, tech: [], review: [], tags: ["doc"] },
      { id: "b19", label: "Packing and 3-pack poly bag specification", method: "doc", base: 1, tech: [], review: [], tags: ["doc"] },
      { id: "b20", label: "Operator skill matrix for snap setting stations", method: "doc", base: 2, tech: ["snap"], review: [], tags: ["doc", "process"] },
    ],
  },

  p9: {
    name: qvName("p9"),
    short: "Lace-collar bodysuit",
    family: "textile",
    familyLabel: "Baby bodysuits",
    context: "Technical assembly: cotton rib, lace collar setting, back snap placket",
    defaults: { country: "China", nq: "spike", iso: "expired", extras: [], qa: "improving", dpr: "conditional" },
    techPack: [
      { id: "mat", kind: "Material", text: "100% cotton 1×1 rib, 190 g/m², cotton guipure lace collar", conf: 0.94 },
      { id: "proc", kind: "Process", text: "Cut and sew, lace collar set into neck binding, back snap placket", conf: 0.9 },
      { id: "lace", kind: "Critical characteristic", text: "Lace collar attachment above 50 N, no loose loop", conf: 0.89 },
      { id: "soft", kind: "Critical characteristic", text: "Lace edge soft on skin, pH 4.0–7.5 on skin-contact parts", conf: 0.88 },
      { id: "trim", kind: "Critical characteristic", text: "No thread or loop longer than 1 cm near the neck", conf: 0.86 },
      { id: "snap", kind: "Critical characteristic", text: "Back snap pull-off above 90 N, no sharp edge", conf: 0.9 },
      { id: "reg", kind: "Regulatory", text: "EN 14682 cords and loops, EN 71-3 on snaps, REACH on lace dyes", conf: 0.95 },
    ],
    reviews: [
      { id: "lacetear", text: "Lace collar tears or comes unstitched", freq: "medium", sev: "severe", maps: ["lace", "proc"], quote: "Second wash, the lace came loose at the neck." },
      { id: "scratch", text: "Lace scratches the baby's neck", freq: "frequent", sev: "severe", maps: ["soft", "mat"], quote: "Pretty, but it left red marks under my daughter's chin." },
      { id: "threads", text: "Loose threads around the collar", freq: "medium", sev: "minor", maps: ["trim", "proc"], quote: "Lots of loose threads to cut before she could wear it." },
      { id: "snapback", text: "Back snaps stiff to close", freq: "rare", sev: "minor", maps: ["snap"], quote: "The snaps at the back are really hard to do up." },
    ],
    pool: [
      { id: "l1", label: "Lace collar attachment above 50 N after 5 washes", method: "lab", base: 5, tech: ["lace"], review: ["lacetear"], tags: ["lab", "final"] },
      { id: "l2", label: "Lace edge softness and pH on skin-contact parts per lot", method: "lab", base: 5, tech: ["soft"], review: ["scratch"], tags: ["lab", "final"] },
      { id: "l3", label: "Lace trim supplier identity and batch certificate", method: "doc", base: 4, tech: ["mat", "lace"], review: ["lacetear"], tags: ["doc", "subcontract"] },
      { id: "l4", label: "Loose thread and loop length at neck, sampled per lot", method: "lab", base: 4, tech: ["trim"], review: ["threads"], tags: ["lab", "final"] },
      { id: "l5", label: "Collar setting stitch type and seam allowance logs", method: "inline", base: 4, tech: ["proc", "lace"], review: ["lacetear"], tags: ["process", "inline"] },
      { id: "l6", label: "Thread trimming checked at the collar station", method: "inline", base: 4, tech: ["proc", "trim"], review: ["threads"], tags: ["process", "inline"] },
      { id: "l7", label: "Lace edge abrasion against a skin simulant", method: "lab", base: 4, tech: ["soft"], review: ["scratch"], tags: ["lab"] },
      { id: "l8", label: "EN 14682 and REACH certificate valid for lace and fabric lot", method: "doc", base: 4, tech: ["reg"], review: [], tags: ["doc"] },
      { id: "l9", label: "Final inspection: neck stretch and collar pull on 5 bodysuits per lot", method: "visit", base: 4, tech: [], review: ["lacetear", "threads"], tags: ["final", "visit"] },
      { id: "l10", label: "Unannounced visit to the lace subcontractor", method: "visit", base: 3, tech: ["lace"], review: ["lacetear"], tags: ["visit", "subcontract"] },
      { id: "l11", label: "Lace softening finish settings and lot traceability", method: "inline", base: 3, tech: ["mat", "soft"], review: ["scratch"], tags: ["process", "subcontract"] },
      { id: "l12", label: "Corrective actions from recall closed and verified", method: "doc", base: 3, tech: [], review: [], tags: ["doc", "process", "final"] },
      { id: "l13", label: "EN 71-3 report for snaps and lace dyes", method: "doc", base: 3, tech: ["reg", "mat"], review: [], tags: ["doc"] },
      { id: "l14", label: "Final inspection sampling plan applied (AQL 1.0)", method: "doc", base: 3, tech: [], review: [], tags: ["final", "doc"] },
      { id: "l15", label: "Pull gauges for lace and snap tests calibrated", method: "doc", base: 2, tech: ["lace"], review: [], tags: ["doc", "lab"] },
      { id: "l16", label: "Back snap closing force and cycling, 500 open-close", method: "lab", base: 2, tech: ["snap"], review: ["snapback"], tags: ["lab"] },
      { id: "l17", label: "Night shift collar setting matches day shift settings", method: "visit", base: 2, tech: ["proc"], review: [], tags: ["visit", "process"] },
      { id: "l18", label: "Operator training on lace collar setting", method: "doc", base: 2, tech: ["lace"], review: [], tags: ["doc", "process"] },
      { id: "l19", label: "Colour fastness of the nude shade to washing", method: "lab", base: 1, tech: [], review: [], tags: ["lab"] },
      { id: "l20", label: "Hanger and packaging spec", method: "doc", base: 1, tech: [], review: [], tags: ["doc"] },
    ],
  },

  p10: {
    name: qvName("p10"),
    short: "'Minnie' bodysuits",
    family: "textile",
    familyLabel: "Baby licensed bodysuits",
    context: "Cotton jersey with licensed placement print, snap tape assembly",
    defaults: { country: "Vietnam", nq: "spike", iso: "certified", extras: ["oekotex"], qa: "strong", dpr: "compliant" },
    techPack: [
      { id: "mat", kind: "Material", text: "100% cotton single jersey, 160 g/m², almond green and printed ecru, licensed artwork", conf: 0.95 },
      { id: "proc", kind: "Process", text: "Placement print of the licensed artwork, cut and sew, lap shoulders, crotch snap tape", conf: 0.91 },
      { id: "print", kind: "Critical characteristic", text: "Print adhesion, no cracking at grade 4 after 20 washes", conf: 0.94 },
      { id: "snap", kind: "Critical characteristic", text: "Crotch snap pull-off above 90 N, snap tape intact after 20 washes", conf: 0.89 },
      { id: "art", kind: "Critical characteristic", text: "Artwork colours and position match the licence style guide, ±5 mm", conf: 0.88 },
      { id: "dim", kind: "Critical characteristic", text: "Body length and width within ±1 cm per size after washing", conf: 0.9 },
      { id: "reg", kind: "Regulatory", text: "EN 71-3 on print inks and snaps, REACH, licensor product safety requirements", conf: 0.97 },
    ],
    reviews: [
      { id: "crack", text: "Print cracks and flakes after washing", freq: "medium", sev: "severe", maps: ["proc", "print"], quote: "Minnie's face started cracking after a few washes; flakes came off in the cot." },
      { id: "snaps", text: "Crotch snaps loosen or pop open", freq: "frequent", sev: "minor", maps: ["snap", "proc"], quote: "The snaps keep popping open every time she kicks." },
      { id: "shrink", text: "Shrinks and gets too short", freq: "medium", sev: "minor", maps: ["dim"], quote: "Lovely print, but after one wash it is too short in the body." },
      { id: "offtone", text: "Colours differ from the picture", freq: "rare", sev: "minor", maps: ["art"], quote: "The green is much duller than online." },
    ],
    pool: [
      { id: "n1", label: "Print adhesion and crack test after 20 washes, samples per lot", method: "lab", base: 5, tech: ["print"], review: [], tags: ["lab", "final"] },
      { id: "n2", label: "Print curing: dryer temperature, belt speed and dwell logged per lot", method: "inline", base: 5, tech: ["proc", "print"], review: ["crack"], tags: ["process", "inline"] },
      { id: "n3", label: "Crotch snap pull-off above 90 N after 5 washes", method: "lab", base: 5, tech: ["snap"], review: ["snaps"], tags: ["lab", "final"] },
      { id: "n4", label: "Ink film thickness and screen tension checked at the print table", method: "inline", base: 4, tech: ["print", "mat"], review: ["crack"], tags: ["process", "inline"] },
      { id: "n5", label: "Print flexing after heat aging, no crack at the artwork edge", method: "lab", base: 4, tech: ["proc", "mat"], review: ["crack"], tags: ["lab"] },
      { id: "n6", label: "Dimensional stability after 3 washes, ±1 cm", method: "lab", base: 4, tech: ["dim"], review: ["shrink"], tags: ["lab", "final"] },
      { id: "n7", label: "EN 71-3 and REACH reports valid for the ink and snap lots", method: "doc", base: 4, tech: ["reg"], review: [], tags: ["doc"] },
      { id: "n8", label: "Snap tape and snap sub-assembly source and change control", method: "doc", base: 4, tech: ["snap"], review: ["snaps"], tags: ["doc", "subcontract"] },
      { id: "n9", label: "Approved artwork revision in use at the print table, 100% check", method: "visit", base: 4, tech: ["proc", "art"], review: [], tags: ["final", "visit"] },
      { id: "n10", label: "Snap opening and closing, 500 cycles", method: "lab", base: 3, tech: ["snap"], review: ["snaps"], tags: ["lab"] },
      { id: "n11", label: "Ink lot traceability to garment lot", method: "doc", base: 3, tech: ["mat"], review: ["crack"], tags: ["doc", "subcontract"] },
      { id: "n12", label: "Corrective actions from last recall closed and verified", method: "doc", base: 3, tech: [], review: [], tags: ["doc", "process", "final"] },
      { id: "n13", label: "Final inspection sampling plan applied (AQL 1.0)", method: "doc", base: 3, tech: [], review: [], tags: ["final", "doc"] },
      { id: "n14", label: "Colour cabinet and wash test equipment calibrated", method: "doc", base: 2, tech: ["art"], review: [], tags: ["doc", "lab"] },
      { id: "n15", label: "Night shift print line matches day shift settings", method: "visit", base: 2, tech: ["proc"], review: [], tags: ["visit", "process"] },
      { id: "n16", label: "Jersey compacting settings before cutting", method: "inline", base: 2, tech: ["mat"], review: ["shrink"], tags: ["process"] },
      { id: "n17", label: "Operator training records for print and snap stations", method: "doc", base: 2, tech: ["proc"], review: [], tags: ["doc", "process"] },
      { id: "n18", label: "Neck label print legibility after washing", method: "lab", base: 1, tech: [], review: [], tags: ["lab"] },
      { id: "n19", label: "Colour match of the almond green to the standard", method: "lab", base: 1, tech: [], review: [], tags: ["lab"] },
      { id: "n20", label: "Box, licence hangtag and hologram specification", method: "doc", base: 1, tech: [], review: [], tags: ["doc"] },
    ],
  },
};

/* ---------------------------------------------------------------- Social audit (same engine, own data) */
const QV_SOC_METHODS = { interview: { label: "Worker interviews" }, doc: { label: "Document review" }, visit: { label: "Unannounced visit" }, walk: { label: "Site walkthrough" } };
const QV_SOC_COUNTRIES = {
  Italy: { note: "Strong labour law enforcement; risk concentrated in small subcontracted workshops.", boosts: { subcontract: 0.2 } },
  Portugal: { note: "Mature labour framework; seasonal peaks handled with temporary contracts.", boosts: {} },
  Vietnam: { note: "Fast-growing capacity, overtime peaks before shipments, limited freedom of association.", boosts: { hours: 0.3, voice: 0.3 } },
  China: { note: "Deep supplier tiers, overtime and double time records, limited freedom of association.", boosts: { hours: 0.35, doc: 0.3, voice: 0.3 } },
  Bangladesh: { note: "Textile-dense, high subcontracting, building and fire safety under close watch.", boosts: { subcontract: 0.5, ohs: 0.4, wages: 0.3 } },
};
// Input 1 — grievances and external alerts (last three years, number of cases)
const QV_SOC_GRIEVANCES = {
  low: { label: "Low and stable — 2 / 1 / 2 grievances, closed in time", costs: [2, 1, 2], trend: "Stable", type: "Internal grievances", score: 12, boosts: { voice: 0.15 }, signal: "Few grievances, all closed through the internal channel within the deadline." },
  spike: { label: "One spike — NGO alert two years ago, then quiet", costs: [9, 2, 1], trend: "Recovered", type: "NGO alert, then grievances", score: 40, boosts: { remed: 0.3, wages: 0.2 }, signal: "One NGO alert on home-based work, then two quiet years. The remediation must be verified as closed." },
  rising: { label: "Rising — 3 / 7 / 14 hotline reports", costs: [3, 7, 14], trend: "Rising", type: "Worker hotline reports", score: 68, boosts: { hours: 0.4, wages: 0.4, voice: 0.3 }, signal: "Hotline reports have quadrupled in three years and bypass the internal channel. Workers no longer trust local management." },
  degrading: { label: "Degrading — 5 / 12 / 21 cases, one NGO alert", costs: [5, 12, 21], trend: "Degrading", type: "Hotline reports and NGO alert", score: 88, boosts: { hours: 0.5, wages: 0.5, subcontract: 0.4, voice: 0.4 }, signal: "Cases have quadrupled, with one public NGO alert. Social risk is now the supplier's dominant signal." },
  none: { label: "No history — new supplier", costs: [], trend: "Unknown", type: "None recorded", score: 50, boosts: { doc: 0.3, visit: 0.3 }, signal: "No grievance record exists. Absence of data is treated as risk, not as evidence." },
};
// Input 2 — social certification and standards met
const QV_SOC_CERT = {
  certified: { label: "SA8000 certified", score: 15, boosts: {} },
  expired: { label: "SA8000 expired", score: 55, boosts: { doc: 0.4, remed: 0.2 } },
  none: { label: "No SA8000", score: 80, boosts: { doc: 0.6, voice: 0.3 } },
};
const QV_SOC_EXTRAS = {
  bsci: { label: "amfori BSCI", relief: 10 },
  smeta: { label: "SMETA 4-pillar", relief: 10 },
  wrap: { label: "WRAP", relief: 5 },
  ils: { label: "Disney ILS", relief: 10, families: ["licensed"] },
};
// Input 3a — past KIABI social audits (last three, scored /100)
const QV_SOC_AUDITS = {
  strong: { label: "Strong — 91 / 89 / 94", scores: [91, 89, 94], findings: ["None", "1 minor", "None"], score: 10, boosts: {}, signal: "Three consistent social audits, no zero-tolerance finding." },
  improving: { label: "Weak but improving — 62 / 71 / 79", scores: [62, 71, 79], findings: ["2 major, overtime", "1 major, wages", "2 minor"], score: 40, boosts: { hours: 0.3 }, signal: "Social audits are recovering; the last major finding on overtime closed only one cycle ago." },
  worsening: { label: "Worsening — 87 / 76 / 64", scores: [87, 76, 64], findings: ["None", "2 minor, records", "1 major, double books"], score: 78, boosts: { doc: 0.6, hours: 0.4, wages: 0.5 }, signal: "Social audit scores fall at each cycle and the last one found a second set of time records." },
  none: { label: "None — new supplier", scores: [], findings: [], score: 55, boosts: { doc: 0.3, visit: 0.4 }, signal: "No KIABI social audit on record." },
};
// Input 3b — past amfori BSCI audits (last three, rating A to E)
const QV_SOC_BSCI = {
  compliant: { label: "Good — rated A, A, B", results: ["A", "A", "B"], majors: [0, 0, 0], score: 10, boosts: {}, signal: "Third-party audits rated A or B three times, no critical finding." },
  conditional: { label: "Acceptable — rated C, 1 finding open", results: ["B", "C", "C"], majors: [0, 1, 1], score: 45, boosts: { doc: 0.3, hours: 0.3 }, signal: "Rated C twice; the same working-hours finding remains open." },
  worsening: { label: "Worsening — B, D, E", results: ["B", "D", "E"], majors: [0, 2, 3], score: 82, boosts: { hours: 0.5, wages: 0.4, visit: 0.5, subcontract: 0.3 }, signal: "Third-party rating fell from B to E in three cycles; the site is under a remediation obligation." },
  none: { label: "None — new supplier", results: [], majors: [], score: 55, boosts: { doc: 0.3, visit: 0.4 }, signal: "No third-party social audit on record." },
};
const qvSocCards = (proc) => [
  { id: "std", kind: "Standard", text: "amfori BSCI code of conduct, 13 performance areas; SMETA 4-pillar accepted as equivalent", conf: 0.96 },
  { id: "proc", kind: "Site process", text: proc, conf: 0.9 },
  { id: "wage", kind: "Requirement", text: "Legal minimum wage paid on time, overtime paid at the premium rate", conf: 0.91 },
  { id: "hours", kind: "Requirement", text: "Regular week of 48 h maximum, overtime voluntary and capped at 12 h", conf: 0.9 },
  { id: "sub", kind: "Requirement", text: "Every subcontractor declared, approved and bound by the same code", conf: 0.88 },
  { id: "ohs", kind: "Requirement", text: "Fire and building safety, machine guarding, no young worker on hazardous tasks", conf: 0.92 },
  { id: "reg", kind: "Regulatory", text: "National labour law, EU CS3D due diligence, French Duty of Vigilance law", conf: 0.97 },
];
const qvSocPool = (x) => [
  { id: "s1", label: "Confidential worker interviews on hours and overtime, off-site, 10% of the workforce", method: "interview", base: 5, tech: ["hours"], review: ["worker"], tags: ["voice", "hours"] },
  { id: "s2", label: "Payroll, time records and payslips reconciled over three peak months", method: "doc", base: 5, tech: ["wage", "hours"], review: ["worker", "audit"], tags: ["doc", "wages"] },
  { id: "s3", label: `Unannounced visit to the ${x.sub} and any undeclared workshop`, method: "visit", base: 4, tech: ["sub", "proc"], review: ["subcon"], tags: ["visit", "subcontract"] },
  { id: "s4", label: "Declared capacity versus order volume, to detect hidden subcontracting", method: "doc", base: 4, tech: ["sub"], review: ["subcon"], tags: ["doc", "subcontract"] },
  { id: "s5", label: "Fire exits, alarms and building safety walkthrough on every floor", method: "walk", base: 4, tech: ["ohs"], review: ["audit"], tags: ["ohs", "visit"] },
  { id: "s6", label: "Remediation plan from the last alert closed and verified with evidence", method: "doc", base: 4, tech: ["std"], review: ["ngo"], tags: ["remed", "doc"] },
  { id: "s7", label: "Grievance channel tested: anonymous hotline and worker committee", method: "interview", base: 4, tech: ["std"], review: ["worker", "ngo"], tags: ["voice"] },
  { id: "s8", label: "Age verification files for every worker, young worker register", method: "doc", base: 4, tech: ["ohs", "reg"], review: [], tags: ["doc"] },
  { id: "s9", label: "Machine guarding and needle guards on the sewing lines", method: "walk", base: 3, tech: ["ohs", "proc"], review: [], tags: ["ohs"] },
  { id: "s10", label: "Overtime premium applied on the last twelve payrolls", method: "doc", base: 3, tech: ["wage"], review: ["worker"], tags: ["wages", "doc"] },
  { id: "s11", label: "Temporary and migrant workers interviewed on recruitment fees", method: "interview", base: 3, tech: ["wage", "reg"], review: ["ngo"], tags: ["voice", "wages"] },
  { id: "s12", label: "Night and Sunday presence check during the peak season", method: "visit", base: 3, tech: ["hours"], review: ["worker"], tags: ["visit", "hours"] },
  { id: "s13", label: "Previous social audit findings tracked to closure", method: "doc", base: 3, tech: ["std"], review: ["audit"], tags: ["remed", "doc"] },
  { id: "s14", label: "Subcontractor list signed and matched to purchase orders", method: "doc", base: 3, tech: ["sub"], review: ["subcon"], tags: ["doc", "subcontract"] },
  { id: "s15", label: "Canteen, sanitary facilities and dormitories, if provided", method: "walk", base: 2, tech: ["ohs"], review: [], tags: ["ohs"] },
  { id: "s16", label: "Worker representative election records", method: "doc", base: 2, tech: ["std", "reg"], review: ["ngo"], tags: ["voice", "doc"] },
  { id: "s17", label: `Due diligence mapping of tier-2 sites: ${x.tier2}`, method: "doc", base: 2, tech: ["reg", "sub"], review: [], tags: ["doc", "subcontract"] },
  { id: "s18", label: "Supervisor interviews on production targets and piece rates", method: "interview", base: 2, tech: ["wage", "hours"], review: [], tags: ["wages"] },
  { id: "s19", label: "Code of conduct displayed in the local language", method: "doc", base: 1, tech: [], review: [], tags: ["doc"] },
  { id: "s20", label: "Social policy signed by top management", method: "doc", base: 1, tech: [], review: [], tags: ["doc"] },
];
const QV_SOC_PRODUCTS = {
  p2: {
    name: qvName("p2"), short: "Velour pyjamas", family: "textile", familyLabel: "Baby nightwear",
    context: "Velour knitting and dyeing, cut and sew, outsourced printing",
    defaults: { country: "Portugal", grv: "spike", sa: "none", extras: ["bsci"], ksa: "strong", bsci: "compliant" },
    techPack: qvSocCards("Velour knitting and piece dyeing in-house, cut and sew; front motif printing and sole dots outsourced"),
    reviews: [
      { id: "ngo", text: "NGO report on home-based finishing work in the region", freq: "rare", sev: "severe", maps: ["sub", "wage"], quote: "Home-based workers paid per piece to fix non-slip soles, below the legal minimum." },
      { id: "worker", text: "Temporary workers report unpaid overtime in the peak", freq: "medium", sev: "minor", maps: ["hours", "wage"], quote: "In October we stay until 9 pm; the extra hours come as a bonus, not as overtime." },
      { id: "subcon", text: "Front motif printing sent to an undeclared workshop", freq: "medium", sev: "severe", maps: ["sub", "proc"], quote: "Printed panels leave the site on Friday and come back on Monday; no print shop is declared." },
      { id: "audit", text: "Past audits: temporary contracts incomplete", freq: "frequent", sev: "minor", maps: ["std", "reg"], quote: "12 of 40 temporary contracts could not be produced during the last audit." },
    ],
    pool: qvSocPool({ sub: "front-motif print shop", tier2: "dyeing, printing and sole-dot workshops" }),
  },
  p6: {
    name: qvName("p6"), short: "Long-sleeved bodysuits", family: "textile", familyLabel: "Baby bodysuits",
    context: "Vertical knit factory, 12 sewing lines, peak before shipment",
    defaults: { country: "Bangladesh", grv: "rising", sa: "expired", extras: ["bsci", "wrap"], ksa: "improving", bsci: "conditional" },
    techPack: qvSocCards("Vertical site: knitting, dyeing, 12 sewing lines, crotch snap setting, 3-pack packing"),
    reviews: [
      { id: "ngo", text: "NGO alert on forced overtime before shipment", freq: "medium", sev: "severe", maps: ["hours", "reg"], quote: "Workers describe 14-hour days for three weeks before the bodysuit shipment." },
      { id: "worker", text: "Hotline reports on wage deductions", freq: "frequent", sev: "severe", maps: ["wage", "std"], quote: "They cut our pay when the line misses the hourly target." },
      { id: "subcon", text: "Snap setting sent to units not on the list", freq: "rare", sev: "severe", maps: ["sub", "proc"], quote: "Cut panels go out at night for snap setting to a unit nobody declared." },
      { id: "audit", text: "Past audits: fire exits blocked again", freq: "medium", sev: "severe", maps: ["ohs"], quote: "Third-floor fire exit blocked by cartons, the same finding as the previous audit." },
    ],
    pool: qvSocPool({ sub: "snap-setting units", tier2: "yarn spinner and snap supplier" }),
  },
  p9: {
    name: qvName("p9"), short: "Lace-collar bodysuit", family: "textile", familyLabel: "Baby bodysuits",
    context: "Cut and sew with hand lace-collar setting",
    defaults: { country: "China", grv: "degrading", sa: "certified", extras: ["smeta"], ksa: "worsening", bsci: "worsening" },
    techPack: qvSocCards("Rib fabric bought in, cut and sew, lace collars set by hand, back snap placket"),
    reviews: [
      { id: "ngo", text: "NGO report on student interns in local garment factories", freq: "rare", sev: "severe", maps: ["ohs", "reg"], quote: "Vocational students placed on sewing lines during term time, night shifts included." },
      { id: "worker", text: "Workers unsure how piece rates and overtime are paid", freq: "medium", sev: "minor", maps: ["wage"], quote: "Nobody explains the payslip; we only know the total changes every month." },
      { id: "subcon", text: "Lace collars set in an undeclared family workshop", freq: "frequent", sev: "severe", maps: ["sub", "proc"], quote: "Collars are sewn in a small workshop across the street, teenagers included after school." },
      { id: "audit", text: "Past audits: time records do not match the output", freq: "medium", sev: "severe", maps: ["hours", "std"], quote: "The recorded hours cannot explain the lace-collar output of the audited week." },
    ],
    pool: qvSocPool({ sub: "lace collar workshop", tier2: "rib knitter and lace maker" }),
  },
  p10: {
    name: qvName("p10"), short: "'Minnie' bodysuits", family: "licensed", familyLabel: "Baby licensed bodysuits",
    context: "Licensed placement print, cut and sew, snap setting",
    defaults: { country: "Vietnam", grv: "low", sa: "none", extras: ["ils"], ksa: "improving", bsci: "compliant" },
    techPack: qvSocCards("Licensed placement printing, cut and sew, snap setting; the licensor's authorised-facility list applies"),
    reviews: [
      { id: "ngo", text: "Licensor programme flagged overtime at a sister site", freq: "rare", sev: "minor", maps: ["hours", "std"], quote: "A sister factory of the same group received an overtime finding in the licensor programme." },
      { id: "worker", text: "Saturday work when licensed orders arrive", freq: "medium", sev: "minor", maps: ["hours"], quote: "When the licensed order lands, Saturday work becomes the rule for a month." },
      { id: "subcon", text: "Licensed print sent to a non-authorised print shop", freq: "rare", sev: "severe", maps: ["sub", "reg"], quote: "The shop printing the licensed artwork is not on the authorised facility list." },
      { id: "audit", text: "Past audits: protective equipment missing in the print shop", freq: "medium", sev: "minor", maps: ["ohs", "proc"], quote: "Printers handle solvent cleaners without gloves or masks." },
    ],
    pool: qvSocPool({ sub: "licensed print shop", tier2: "fabric mill and ink supplier" }),
  },
};

/* ---------------------------------------------------------------- Environmental audit */
const QV_ENV_METHODS = { lab: { label: "Wastewater test" }, meter: { label: "Meter and data check" }, doc: { label: "Document review" }, visit: { label: "Unannounced visit" } };
const QV_ENV_COUNTRIES = {
  Italy: { note: "Strict discharge permits and regular inspections by the authorities.", boosts: {} },
  Portugal: { note: "EU wastewater rules; dyeing clusters share municipal treatment plants.", boosts: { water: 0.1 } },
  Vietnam: { note: "Fast-growing wet processing, uneven treatment plants in industrial parks.", boosts: { water: 0.3, chem: 0.2 } },
  China: { note: "Deep dyeing and printing tiers, coal-fired steam still common, tightening enforcement.", boosts: { energy: 0.3, chem: 0.3, subcontract: 0.25 } },
  Bangladesh: { note: "Dense dyeing sector, groundwater depletion, treatment plants not always run.", boosts: { water: 0.5, chem: 0.3, visit: 0.35 } },
};
// Input 1 — wastewater and chemical test history (failed parameters per year)
const QV_ENV_HISTORY = {
  low: { label: "Low and stable — 1 / 0 / 1 failed parameters, conventional", costs: [1, 0, 1], trend: "Stable", type: "Conventional parameters", score: 12, boosts: { water: 0.15 }, signal: "Wastewater tests stay within ZDHC limits; isolated deviations on conventional parameters." },
  spike: { label: "One spike — effluent spill two years ago, then quiet", costs: [7, 1, 1], trend: "Recovered", type: "Spill, then conventional", score: 40, boosts: { water: 0.3, waste: 0.2 }, signal: "One effluent spill reported by the authorities, then two quiet years. The treatment upgrade must be verified." },
  rising: { label: "Rising — 2 / 5 / 9 failed parameters, restricted substances", costs: [2, 5, 9], trend: "Rising", type: "MRSL substances detected", score: 68, boosts: { chem: 0.4, lab: 0.4, water: 0.3 }, signal: "Failed parameters have quadrupled and now include restricted substances. Chemical inputs are not under control." },
  degrading: { label: "Degrading — 4 / 9 / 16 failed parameters, one permit breach", costs: [4, 9, 16], trend: "Degrading", type: "MRSL substances and permit breach", score: 88, boosts: { chem: 0.5, water: 0.5, lab: 0.4, waste: 0.4 }, signal: "Failures have quadrupled, with one discharge permit breach. Environmental risk is now the supplier's dominant signal." },
  none: { label: "No history — new supplier", costs: [], trend: "Unknown", type: "None recorded", score: 50, boosts: { doc: 0.3, visit: 0.3 }, signal: "No test record exists. Absence of data is treated as risk, not as evidence." },
};
const QV_ENV_CERT = {
  certified: { label: "ISO 14001 certified", score: 15, boosts: {} },
  expired: { label: "ISO 14001 expired", score: 55, boosts: { doc: 0.4, chem: 0.2 } },
  none: { label: "No ISO 14001", score: 80, boosts: { doc: 0.6, energy: 0.3 } },
};
const QV_ENV_EXTRAS = {
  zdhc: { label: "ZDHC MRSL conformance", relief: 10, families: ["wet"] },
  step: { label: "OEKO-TEX STeP", relief: 10 },
  bluesign: { label: "bluesign", relief: 5, families: ["wet"] },
  iso50001: { label: "ISO 50001", relief: 5 },
};
const QV_ENV_AUDITS = {
  strong: { label: "Strong — 90 / 92 / 93", scores: [90, 92, 93], findings: ["None", "1 minor", "None"], score: 10, boosts: {}, signal: "Three consistent environmental audits, no finding on chemicals or effluent." },
  improving: { label: "Weak but improving — 58 / 69 / 78", scores: [58, 69, 78], findings: ["2 major, chemicals", "1 major, sludge", "2 minor"], score: 40, boosts: { chem: 0.3 }, signal: "Environmental audits are recovering; the chemical inventory finding closed only one cycle ago." },
  worsening: { label: "Worsening — 86 / 74 / 63", scores: [86, 74, 63], findings: ["None", "2 minor, waste", "1 major, effluent bypass"], score: 78, boosts: { water: 0.6, chem: 0.4, waste: 0.5 }, signal: "Environmental audit scores fall at each cycle and the last one found an effluent bypass." },
  none: { label: "None — new supplier", scores: [], findings: [], score: 55, boosts: { doc: 0.3, visit: 0.4 }, signal: "No KIABI environmental audit on record." },
};
const QV_ENV_HIGG = {
  compliant: { label: "Verified — 3 of 3, no gap", results: ["Verified", "Verified", "Verified"], majors: [0, 0, 0], score: 10, boosts: {}, signal: "Higg FEM verified three times; the self-assessment holds on site." },
  conditional: { label: "Gaps — 1 data gap open", results: ["Verified", "Gaps", "Gaps"], majors: [0, 1, 1], score: 45, boosts: { doc: 0.3, energy: 0.3 }, signal: "Higg FEM verification found the same energy data gap twice." },
  worsening: { label: "Worsening — verified, 2 gaps, not verified", results: ["Verified", "Gaps", "Not verified"], majors: [0, 2, 3], score: 82, boosts: { water: 0.5, doc: 0.4, visit: 0.5, chem: 0.3 }, signal: "Higg FEM fell from verified to not verified in three cycles; self-declared data can no longer be trusted." },
  none: { label: "None — new supplier", results: [], majors: [], score: 55, boosts: { doc: 0.3, visit: 0.4 }, signal: "No Higg FEM verification on record." },
};
const qvEnvCards = (proc) => [
  { id: "std", kind: "Standard", text: "ZDHC wastewater guidelines and MRSL; Higg FEM self-assessment verified on site", conf: 0.95 },
  { id: "proc", kind: "Site process", text: proc, conf: 0.9 },
  { id: "chem", kind: "Requirement", text: "Chemical inventory complete, every input checked against the ZDHC MRSL", conf: 0.9 },
  { id: "water", kind: "Requirement", text: "Effluent treated on site, ZDHC foundational limits met", conf: 0.91 },
  { id: "energy", kind: "Requirement", text: "Energy and steam metered by process, coal phase-out plan in place", conf: 0.87 },
  { id: "waste", kind: "Requirement", text: "Sludge and hazardous waste tracked and taken by licensed carriers", conf: 0.88 },
  { id: "reg", kind: "Regulatory", text: "Local discharge permit, REACH restricted substances, EU CS3D environmental due diligence", conf: 0.96 },
];
const qvEnvPool = (x) => [
  { id: "e1", label: "ZDHC wastewater test at the effluent outlet, conventional and MRSL parameters", method: "lab", base: 5, tech: ["water"], review: ["test", "community"], tags: ["lab", "water"] },
  { id: "e2", label: "Chemical inventory reconciled with purchases and checked against the ZDHC MRSL", method: "doc", base: 5, tech: ["chem"], review: ["chemical"], tags: ["doc", "chem"] },
  { id: "e3", label: "Unannounced night visit to the effluent treatment plant", method: "visit", base: 4, tech: ["water", "reg"], review: ["community"], tags: ["visit", "water"] },
  { id: "e4", label: "Treatment plant flow meters, chemical dosing and sludge logs", method: "meter", base: 4, tech: ["water", "waste"], review: ["test"], tags: ["water", "waste"] },
  { id: "e5", label: "Restricted substance test on finished goods, one per colourway", method: "lab", base: 4, tech: ["chem", "reg"], review: ["chemical"], tags: ["lab", "chem"] },
  { id: "e6", label: "Discharge permit valid and matched to the actual volumes", method: "doc", base: 4, tech: ["reg", "water"], review: ["community"], tags: ["doc", "water"] },
  { id: "e7", label: "Energy and steam meters per process, 12 months of data reviewed", method: "meter", base: 4, tech: ["energy"], review: ["energy"], tags: ["energy", "doc"] },
  { id: "e8", label: "Chemical store: segregation, bunding, labels and safety data sheets", method: "visit", base: 3, tech: ["chem"], review: ["chemical"], tags: ["visit", "chem"] },
  { id: "e9", label: `Tier-2 wet-processing sites listed with their own ZDHC tests: ${x.sub}`, method: "doc", base: 3, tech: ["std", "proc"], review: ["test"], tags: ["doc", "subcontract"] },
  { id: "e10", label: "Hazardous waste and sludge handed to licensed carriers, manifests checked", method: "visit", base: 3, tech: ["waste"], review: ["community"], tags: ["visit", "waste"] },
  { id: "e11", label: "Water intake metered, groundwater licence checked", method: "meter", base: 3, tech: ["energy", "reg"], review: ["energy"], tags: ["water", "energy"] },
  { id: "e12", label: "Corrective actions from the last environmental audit closed and verified", method: "doc", base: 3, tech: [], review: [], tags: ["doc", "chem", "water"] },
  { id: "e13", label: "Daily pH and temperature checks on the effluent", method: "lab", base: 3, tech: ["water"], review: ["test"], tags: ["lab", "water"] },
  { id: "e14", label: "Higg FEM self-assessment evidence pack verified", method: "doc", base: 3, tech: ["std"], review: [], tags: ["doc"] },
  { id: "e15", label: "Boiler house: fuel type and coal phase-out plan", method: "visit", base: 2, tech: ["energy"], review: ["energy"], tags: ["visit", "energy"] },
  { id: "e16", label: "Chemical suppliers' ZDHC Gateway certificates", method: "doc", base: 2, tech: ["chem"], review: [], tags: ["doc", "chem"] },
  { id: "e17", label: "Operator training on chemical handling and spill response", method: "doc", base: 2, tech: ["chem", "waste"], review: [], tags: ["doc"] },
  { id: "e18", label: "Dryer and compressor idle time monitored", method: "meter", base: 2, tech: ["energy", "proc"], review: ["energy"], tags: ["energy"] },
  { id: "e19", label: "Environmental policy signed by top management", method: "doc", base: 1, tech: [], review: [], tags: ["doc"] },
  { id: "e20", label: "Recycling of cutting waste and packaging", method: "doc", base: 1, tech: ["waste"], review: [], tags: ["waste"] },
];
const QV_ENV_PRODUCTS = {
  p2: {
    name: qvName("p2"), short: "Velour pyjamas", family: "wet", familyLabel: "Baby nightwear",
    context: "Velour dyeing, finishing and printing",
    defaults: { country: "Portugal", env: "spike", iso14: "certified", extras: ["zdhc"], kea: "strong", higg: "compliant" },
    techPack: qvEnvCards("Velour knitting, jet piece dyeing and softening, stenter drying, front motif screen printing"),
    reviews: [
      { id: "test", text: "Colour in the effluent after dyeing peaks", freq: "medium", sev: "minor", maps: ["water", "proc"], quote: "Treated effluent still tinted green after the pine green batches." },
      { id: "chemical", text: "Dye auxiliaries without safety data sheets", freq: "frequent", sev: "minor", maps: ["chem"], quote: "Four auxiliaries in the dye kitchen have no safety data sheet in Portuguese." },
      { id: "energy", text: "Steam not metered per dyeing machine", freq: "medium", sev: "minor", maps: ["energy"], quote: "One gas meter for the whole site; no split between dyeing and drying." },
      { id: "community", text: "River authority notice after a night discharge", freq: "rare", sev: "severe", maps: ["water", "reg"], quote: "Notice received after a night-time discharge above the permit colour limit." },
    ],
    pool: qvEnvPool({ sub: "sole-dot and print workshops" }),
  },
  p6: {
    name: qvName("p6"), short: "Long-sleeved bodysuits", family: "wet", familyLabel: "Baby bodysuits",
    context: "Vertical knit, dye and print site with effluent plant",
    defaults: { country: "Bangladesh", env: "degrading", iso14: "certified", extras: ["step"], kea: "worsening", higg: "worsening" },
    techPack: qvEnvCards("Vertical site: knitting, reactive dyeing, all-over printing, cut and sew, effluent treatment plant"),
    reviews: [
      { id: "test", text: "Wastewater tests fail on COD and colour", freq: "frequent", sev: "severe", maps: ["water", "std"], quote: "Three of the last four ZDHC tests above the COD foundational limit." },
      { id: "chemical", text: "Restricted substance found in a pink dye lot", freq: "medium", sev: "severe", maps: ["chem", "proc"], quote: "APEO detected in the dusty pink lot; the auxiliary was not on the inventory." },
      { id: "energy", text: "Groundwater pumping and gas boilers not metered", freq: "medium", sev: "minor", maps: ["energy"], quote: "Borehole water use is estimated, never measured." },
      { id: "community", text: "Neighbours complain about night discharges", freq: "medium", sev: "severe", maps: ["water", "waste"], quote: "Villagers report dark water in the canal after midnight." },
    ],
    pool: qvEnvPool({ sub: "yarn dyer and snap plating supplier" }),
  },
  p9: {
    name: qvName("p9"), short: "Lace-collar bodysuit", family: "cutsew", familyLabel: "Baby bodysuits",
    context: "Cut and sew, wet processing at tier 2",
    defaults: { country: "China", env: "low", iso14: "none", extras: [], kea: "improving", higg: "conditional" },
    techPack: qvEnvCards("Cut and sew only; rib fabric and lace trim dyed by tier-2 mills; steam pressing"),
    reviews: [
      { id: "test", text: "No wastewater test from the lace dyer", freq: "medium", sev: "minor", maps: ["water", "proc"], quote: "The lace is dyed by a tier-2 mill that has never shared a ZDHC test." },
      { id: "chemical", text: "Chlorinated spot remover used on the collar line", freq: "frequent", sev: "severe", maps: ["chem"], quote: "Operators use a chlorinated spot remover on lace stains." },
      { id: "energy", text: "Coal-fired steam for pressing", freq: "medium", sev: "minor", maps: ["energy"], quote: "Pressing steam comes from the industrial park's coal boiler." },
      { id: "community", text: "Industrial park under an inspection campaign", freq: "rare", sev: "minor", maps: ["reg"], quote: "The park must upgrade its shared treatment plant by next year." },
    ],
    pool: qvEnvPool({ sub: "rib knitter and lace dyer" }),
  },
  p10: {
    name: qvName("p10"), short: "'Minnie' bodysuits", family: "wet", familyLabel: "Baby licensed bodysuits",
    context: "Screen printing and curing, cut and sew",
    defaults: { country: "Vietnam", env: "rising", iso14: "expired", extras: ["bluesign"], kea: "improving", higg: "conditional" },
    techPack: qvEnvCards("Placement screen printing with water-based and plastisol inks, curing tunnels, cut and sew"),
    reviews: [
      { id: "test", text: "Screen-wash water sent untreated to the park plant", freq: "medium", sev: "minor", maps: ["water", "proc"], quote: "Screen washing water goes straight to the park drain without pre-treatment." },
      { id: "chemical", text: "Plastisol inks with phthalates found in stock", freq: "rare", sev: "severe", maps: ["chem", "reg"], quote: "Old plastisol drums in the store, labelled with phthalate plasticisers." },
      { id: "energy", text: "Curing tunnels left running between lots", freq: "frequent", sev: "minor", maps: ["energy", "proc"], quote: "Both curing tunnels stay on through lunch and changeovers." },
      { id: "community", text: "Waste ink drums stored outdoors", freq: "medium", sev: "minor", maps: ["waste"], quote: "Empty ink drums piled behind the print shop, exposed to rain." },
    ],
    pool: qvEnvPool({ sub: "fabric dyer and ink supplier" }),
  },
};

/* ---------------------------------------------------------------- Industrial audit */
const QV_IND_METHODS = { inline: { label: "Line observation" }, capa: { label: "Capacity check" }, doc: { label: "Document review" }, visit: { label: "Unannounced visit" } };
const QV_IND_COUNTRIES = {
  Italy: { note: "Mature industrial base, skilled labour, limited capacity for mass volumes.", boosts: { capacity: 0.2 } },
  Portugal: { note: "Reliable textile ecosystem, short lead times, capacity tight in the peak season.", boosts: { capacity: 0.2 } },
  Vietnam: { note: "Fast-growing capacity, frequent subcontracting, variable maintenance culture.", boosts: { subcontract: 0.3, maint: 0.2 } },
  China: { note: "Deep supplier tiers, automated large sites, subcontracting in the peaks.", boosts: { subcontract: 0.4, planning: 0.2 } },
  Bangladesh: { note: "High-volume lines, power cuts, limited preventive maintenance.", boosts: { maint: 0.4, capacity: 0.3, subcontract: 0.4 } },
};
// Input 1 — share of late deliveries (last three years)
const QV_IND_DELIVERY = {
  low: { label: "Low and stable — 4 % / 3 % / 4 % late, minor delays", costs: [4, 3, 4], trend: "Stable", type: "Minor delays", score: 12, boosts: { planning: 0.15 }, signal: "Late deliveries stay low and flat; delays are absorbed before shipment." },
  spike: { label: "One spike — 28 % late two years ago, then recovered", costs: [28, 6, 5], trend: "Recovered", type: "Capacity crisis, then minor delays", score: 40, boosts: { capacity: 0.3, maint: 0.2 }, signal: "One capacity crisis, then two quiet years. The capacity plan must be verified as robust." },
  rising: { label: "Rising — 6 % / 13 % / 22 % late, air freight", costs: [6, 13, 22], trend: "Rising", type: "Late orders, air freight", score: 68, boosts: { capacity: 0.4, planning: 0.4, process: 0.3 }, signal: "Late deliveries have nearly quadrupled and force air freight. Capacity is oversold." },
  degrading: { label: "Degrading — 9 % / 21 % / 35 % late, one cancelled order", costs: [9, 21, 35], trend: "Degrading", type: "Late and cancelled orders", score: 88, boosts: { capacity: 0.5, planning: 0.5, maint: 0.4, subcontract: 0.4 }, signal: "Late deliveries have quadrupled, with one cancelled order. Delivery failure is now the supplier's dominant signal." },
  none: { label: "No history — new supplier", costs: [], trend: "Unknown", type: "None recorded", score: 50, boosts: { doc: 0.3, visit: 0.3 }, signal: "No delivery record exists. Absence of data is treated as risk, not as evidence." },
};
const QV_IND_CERT = {
  certified: { label: "ISO 9001 certified", score: 15, boosts: {} },
  expired: { label: "ISO 9001 expired", score: 55, boosts: { doc: 0.4, planning: 0.2 } },
  none: { label: "No ISO 9001", score: 80, boosts: { doc: 0.6, process: 0.3 } },
};
const QV_IND_EXTRAS = {
  iso45001: { label: "ISO 45001", relief: 5 },
  lean: { label: "Lean / 5S programme", relief: 10 },
  tpm: { label: "TPM maintenance", relief: 10 },
  mes: { label: "Digital MES", relief: 5 },
};
const QV_IND_AUDITS = {
  strong: { label: "Strong — 90 / 91 / 94", scores: [90, 91, 94], findings: ["None", "1 minor", "None"], score: 10, boosts: {}, signal: "Three consistent industrial audits, no recurring finding." },
  improving: { label: "Weak but improving — 64 / 72 / 81", scores: [64, 72, 81], findings: ["2 major, maintenance", "1 major, planning", "2 minor"], score: 40, boosts: { maint: 0.3 }, signal: "Industrial audits are recovering; the last major finding on maintenance closed only one cycle ago." },
  worsening: { label: "Worsening — 88 / 77 / 66", scores: [88, 77, 66], findings: ["None", "2 minor, line balancing", "1 major, capacity"], score: 78, boosts: { capacity: 0.6, process: 0.4, planning: 0.5 }, signal: "Industrial audit scores fall at each cycle and the last one carries a major finding on declared capacity." },
  none: { label: "None — new supplier", scores: [], findings: [], score: 55, boosts: { doc: 0.3, visit: 0.4 }, signal: "No KIABI industrial audit on record." },
};
const QV_IND_CAPACITY = {
  compliant: { label: "Confirmed — passed 3 of 3", results: ["Pass", "Pass", "Pass"], majors: [0, 0, 0], score: 10, boosts: {}, signal: "Declared capacity confirmed three times on site." },
  conditional: { label: "Conditional — 1 major finding open", results: ["Pass", "Conditional", "Conditional"], majors: [0, 1, 1], score: 45, boosts: { capacity: 0.3, doc: 0.3 }, signal: "Capacity conditional twice; the same bottleneck finding remains open." },
  worsening: { label: "Worsening — pass, 2 majors, fail", results: ["Pass", "Conditional", "Fail"], majors: [0, 2, 3], score: 82, boosts: { capacity: 0.5, doc: 0.4, visit: 0.5, subcontract: 0.3 }, signal: "Capacity verification fell from pass to fail in three cycles; declared minutes no longer match the lines." },
  none: { label: "None — new supplier", results: [], majors: [], score: 55, boosts: { doc: 0.3, visit: 0.4 }, signal: "No capacity verification on record." },
};
const qvIndCards = (proc) => [
  { id: "std", kind: "Standard", text: "KIABI industrial requirements: capacity declaration, process control plan, preventive maintenance", conf: 0.94 },
  { id: "proc", kind: "Site process", text: proc, conf: 0.9 },
  { id: "cap", kind: "Requirement", text: "Declared capacity matches lines, shifts and efficiency, in minutes per week", conf: 0.9 },
  { id: "ctrl", kind: "Requirement", text: "Process control plan with first-off approval and checks at critical stations", conf: 0.89 },
  { id: "maint", kind: "Requirement", text: "Preventive maintenance executed on plan, critical spare parts in stock", conf: 0.87 },
  { id: "sub", kind: "Requirement", text: "Subcontracted operations declared, approved and capacity-checked", conf: 0.88 },
  { id: "reg", kind: "Regulatory", text: "ISO 9001 quality management, machinery safety rules, contractual lead times", conf: 0.95 },
];
const qvIndPool = (x) => [
  { id: "i1", label: "Capacity check: declared minutes versus lines, shifts and efficiency on site", method: "capa", base: 5, tech: ["cap"], review: ["capacity", "delay"], tags: ["capacity"] },
  { id: "i2", label: `Line balancing observed at the bottleneck: ${x.bottleneck}`, method: "inline", base: 5, tech: ["cap", "proc"], review: ["capacity"], tags: ["process", "capacity"] },
  { id: "i3", label: "Preventive maintenance plan executed on critical machines", method: "doc", base: 4, tech: ["maint"], review: ["breakdown"], tags: ["maint", "doc"] },
  { id: "i4", label: "First-off approval and checks at critical stations", method: "inline", base: 4, tech: ["ctrl"], review: ["delay"], tags: ["process"] },
  { id: "i5", label: "Order book versus capacity for the next 12 weeks", method: "doc", base: 4, tech: ["cap", "reg"], review: ["delay"], tags: ["planning", "capacity"] },
  { id: "i6", label: "Unannounced visit to the declared subcontracted operations", method: "visit", base: 4, tech: ["sub"], review: ["outsourcing"], tags: ["visit", "subcontract"] },
  { id: "i7", label: "Production plan and material call-off reliability", method: "doc", base: 4, tech: ["proc"], review: ["delay"], tags: ["planning", "doc"] },
  { id: "i8", label: "Critical spare parts stock and mean time to repair", method: "capa", base: 3, tech: ["maint"], review: ["breakdown"], tags: ["maint"] },
  { id: "i9", label: "Operator versatility matrix at the bottleneck stations", method: "inline", base: 3, tech: ["ctrl", "cap"], review: ["capacity"], tags: ["skills", "process"] },
  { id: "i10", label: "Subcontractor capacity declared and matched to purchase orders", method: "doc", base: 3, tech: ["sub", "cap"], review: ["outsourcing"], tags: ["subcontract", "doc"] },
  { id: "i11", label: "Night shift output and settings match the day shift", method: "visit", base: 3, tech: ["proc"], review: [], tags: ["visit", "process"] },
  { id: "i12", label: "Corrective actions from the last industrial audit closed and verified", method: "doc", base: 3, tech: [], review: [], tags: ["doc", "process", "capacity"] },
  { id: "i13", label: "Work in progress and flow between cutting and sewing", method: "inline", base: 3, tech: ["proc"], review: ["delay"], tags: ["planning", "process"] },
  { id: "i14", label: "Machine guards and emergency stops checked", method: "doc", base: 3, tech: ["reg", "maint"], review: [], tags: ["doc", "maint"] },
  { id: "i15", label: "Power back-up capacity for critical machines", method: "capa", base: 2, tech: ["maint"], review: ["breakdown"], tags: ["maint", "capacity"] },
  { id: "i16", label: "On-time delivery measurement and shipment records", method: "doc", base: 2, tech: [], review: ["delay"], tags: ["planning", "doc"] },
  { id: "i17", label: "Training records for new operators", method: "doc", base: 2, tech: ["ctrl"], review: [], tags: ["skills", "doc"] },
  { id: "i18", label: "5S and visual management on the shop floor", method: "inline", base: 2, tech: ["std"], review: [], tags: ["process"] },
  { id: "i19", label: "ISO 9001 certificate scope covers the audited site", method: "doc", base: 1, tech: ["reg"], review: [], tags: ["doc"] },
  { id: "i20", label: "Packing and loading plan specification", method: "doc", base: 1, tech: [], review: [], tags: ["doc"] },
];
const QV_IND_PRODUCTS = {
  p2: {
    name: qvName("p2"), short: "Velour pyjamas", family: "textile", familyLabel: "Baby nightwear",
    context: "Vertical velour site, from dyeing to making-up",
    defaults: { country: "Portugal", late: "low", iso9: "certified", extras: ["iso45001", "lean"], kia: "strong", cap: "compliant" },
    techPack: qvIndCards("Velour knitting, jet dyeing, stenter finishing, cutting, 8 sewing lines, sole-dot printing"),
    reviews: [
      { id: "delay", text: "Deliveries slip in the October peak", freq: "medium", sev: "minor", maps: ["cap", "proc"], quote: "Velour pyjama lots shipped one week late two seasons in a row." },
      { id: "capacity", text: "Dyeing machines booked by several brands", freq: "medium", sev: "minor", maps: ["cap"], quote: "The jet dyeing slot for the pine green was postponed twice." },
      { id: "breakdown", text: "Stenter breakdown stops finishing", freq: "rare", sev: "severe", maps: ["maint", "proc"], quote: "Stenter down for four days, no spare burner in stock." },
      { id: "outsourcing", text: "Sole dots printed by a partner in the peak", freq: "rare", sev: "minor", maps: ["sub"], quote: "Sole dots go to a partner when the in-house machine is full." },
    ],
    pool: qvIndPool({ bottleneck: "jet dyeing and stenter" }),
  },
  p6: {
    name: qvName("p6"), short: "Long-sleeved bodysuits", family: "textile", familyLabel: "Baby bodysuits",
    context: "High-volume lines, snap setting bottleneck",
    defaults: { country: "Bangladesh", late: "rising", iso9: "none", extras: [], kia: "improving", cap: "conditional" },
    techPack: qvIndCards("Automatic cutting, 12 sewing lines, 6 snap presses, 3-pack packing"),
    reviews: [
      { id: "delay", text: "Bodysuit 3-packs shipped late and by air", freq: "frequent", sev: "severe", maps: ["cap", "proc"], quote: "Two of the last five lots missed the vessel and flew." },
      { id: "capacity", text: "Declared minutes exceed real line output", freq: "medium", sev: "severe", maps: ["cap", "std"], quote: "Twelve lines declared, nine running on the day of the visit." },
      { id: "breakdown", text: "Power cuts stop the snap presses", freq: "medium", sev: "minor", maps: ["maint"], quote: "Snap presses idle two hours a day during load shedding." },
      { id: "outsourcing", text: "Snap setting sent out to meet shipment", freq: "medium", sev: "severe", maps: ["sub", "ctrl"], quote: "Snap setting is done in an outside unit when the order is late." },
    ],
    pool: qvIndPool({ bottleneck: "snap presses" }),
  },
  p9: {
    name: qvName("p9"), short: "Lace-collar bodysuit", family: "textile", familyLabel: "Baby bodysuits",
    context: "Small lines, hand lace-collar setting",
    defaults: { country: "China", late: "spike", iso9: "expired", extras: [], kia: "improving", cap: "conditional" },
    techPack: qvIndCards("Cutting, 4 sewing lines, hand lace-collar setting, 2 snap presses"),
    reviews: [
      { id: "delay", text: "Collar lots late after lace shortages", freq: "rare", sev: "minor", maps: ["proc", "cap"], quote: "Collars waited ten days for the lace trim delivery." },
      { id: "capacity", text: "Hand collar setting limits the output", freq: "medium", sev: "minor", maps: ["cap", "proc"], quote: "Only six operators can set the lace collar at the right quality." },
      { id: "breakdown", text: "Snap press misaligned after a move", freq: "rare", sev: "minor", maps: ["maint", "ctrl"], quote: "Back snaps misaligned after the press was moved and not recalibrated." },
      { id: "outsourcing", text: "Collar setting sent to a family workshop", freq: "frequent", sev: "severe", maps: ["sub"], quote: "Lace collars are set in a small workshop across the street." },
    ],
    pool: qvIndPool({ bottleneck: "hand lace-collar setting" }),
  },
  p10: {
    name: qvName("p10"), short: "'Minnie' bodysuits", family: "textile", familyLabel: "Baby licensed bodysuits",
    context: "Licensed print and making-up, peak-season loading",
    defaults: { country: "Vietnam", late: "degrading", iso9: "certified", extras: ["tpm"], kia: "worsening", cap: "worsening" },
    techPack: qvIndCards("8 screen-print tables, 2 curing tunnels, cutting, 6 sewing lines, snap presses"),
    reviews: [
      { id: "delay", text: "Licensed orders delivered after the launch date", freq: "frequent", sev: "severe", maps: ["cap", "proc"], quote: "The 2-packs arrived three weeks after the store launch date." },
      { id: "capacity", text: "Print tables overbooked", freq: "medium", sev: "severe", maps: ["cap"], quote: "Eight print tables for three licensed programmes in the same month." },
      { id: "breakdown", text: "Curing tunnels without maintenance log", freq: "medium", sev: "minor", maps: ["maint"], quote: "The belt of tunnel 2 was replaced only after it broke." },
      { id: "outsourcing", text: "Overflow printing at a partner print shop", freq: "rare", sev: "minor", maps: ["sub", "reg"], quote: "Overflow artwork printed by a partner shop during the peak." },
    ],
    pool: qvIndPool({ bottleneck: "print tables and curing tunnels" }),
  },
};

/* ---------------------------------------------------------------- Audit type configurations */
const QV_STAGE_NAMES = ["Reading the standard", "Clustering signals", "Profiling supplier", "Generating grid"];
const qvSiteSub = (product, params) => `${params.country} site, simulated signal base`;
const QV_AUDITS = {
  social: {
    label: "Social audit", icon: Users, kicker: "KIABI · Social Compliance · Vision 2027",
    headline: "From one grid for everyone to mass precision: surgical social strikes.", uniformTotal: 212,
    stages: QV_STAGE_NAMES, productLabel: "Product and supplier site", critKind: "Requirement",
    stageA: { title: "Social standard intake", note: "Source: amfori BSCI code of conduct and the KIABI supplier charter. Requirements are read directly from the standard and applied to the site's processes." },
    stageB: { title: "Social signals", sub: qvSiteSub }, stageC: { title: "Supplier profile and social risk score" }, scoreWord: "social risk score",
    why: { tech: "standard", review: "signals", supplier: "supplier" },
    traceText: "Every line traces to a standard requirement, a signal cluster or a supplier signal",
    footer: "Vision demo. All suppliers, figures and signals are simulated and internally consistent; none refer to real partners.",
    methods: QV_SOC_METHODS, countries: QV_SOC_COUNTRIES,
    tagNames: { wages: "wage and payroll doubt", hours: "excessive hours risk", subcontract: "undeclared subcontracting risk", voice: "grievance channel weakness", doc: "records cannot be assumed", visit: "presence required", ohs: "health and safety exposure", remed: "open remediation" },
    hist: { key: "grv", label: "Grievance and alert history", options: QV_SOC_GRIEVANCES, signalTitle: "Grievances and alerts", segLabel: "Grievances and alerts", blockTitle: "1 · Grievance and alert history", fmt: (c) => `${c} cases` },
    cert: { key: "sa", label: "SA8000 status", options: QV_SOC_CERT }, extras: QV_SOC_EXTRAS,
    audA: { key: "ksa", label: "Past social audits", options: QV_SOC_AUDITS, colTitle: "Social audits", prefix: "Social" },
    audB: { key: "bsci", label: "Past amfori BSCI audits", options: QV_SOC_BSCI, colTitle: "amfori BSCI ratings", prefix: "BSCI", majorWord: "critical", fail: ["D", "E"] },
    weights: { hist: 0.35, standards: 0.15, audits: 0.5 },
    trapText: "SA8000 certified, yet the grievance history and both audit tracks are degrading. The certificate is discounted: it weighs 15 %, the evidence weighs 85 %.",
    products: QV_SOC_PRODUCTS, initialProduct: "p9",
  },
  environmental: {
    label: "Environmental audit", icon: Leaf, kicker: "KIABI · Environmental Compliance · Vision 2027",
    headline: "From one grid for everyone to mass precision: surgical environmental strikes.", uniformTotal: 156,
    stages: QV_STAGE_NAMES, productLabel: "Product and supplier site", critKind: "Requirement",
    stageA: { title: "Environmental standard intake", note: "Source: ZDHC guidelines, the Higg FEM module and the site's discharge permit. Requirements are read directly from the standard and applied to the site's processes." },
    stageB: { title: "Environmental signals", sub: qvSiteSub }, stageC: { title: "Supplier profile and environmental risk score" }, scoreWord: "environmental risk score",
    why: { tech: "standard", review: "signals", supplier: "supplier" },
    traceText: "Every line traces to a standard requirement, a signal cluster or a supplier signal",
    footer: "Vision demo. All suppliers, figures and signals are simulated and internally consistent; none refer to real partners.",
    methods: QV_ENV_METHODS, countries: QV_ENV_COUNTRIES,
    tagNames: { chem: "chemical management gap", water: "wastewater risk", energy: "energy data doubt", doc: "records cannot be assumed", visit: "presence required", subcontract: "wet-processing subcontracting", lab: "test capability doubt", waste: "waste handling gap" },
    hist: { key: "env", label: "Wastewater and chemical test history", options: QV_ENV_HISTORY, signalTitle: "Environmental incidents", segLabel: "Test history", blockTitle: "1 · Wastewater and chemical test history", fmt: (c) => `${c} fail${c === 1 ? "" : "s"}` },
    cert: { key: "iso14", label: "ISO 14001 status", options: QV_ENV_CERT }, extras: QV_ENV_EXTRAS,
    audA: { key: "kea", label: "Past environmental audits", options: QV_ENV_AUDITS, colTitle: "Environmental audits", prefix: "Environmental" },
    audB: { key: "higg", label: "Past Higg FEM verifications", options: QV_ENV_HIGG, colTitle: "Higg FEM verifications", prefix: "Higg FEM", majorWord: (n) => (n === 1 ? "gap" : "gaps"), fail: ["Not verified"] },
    weights: { hist: 0.35, standards: 0.25, audits: 0.4 },
    trapText: "ISO 14001 certified, yet the test history and both audit tracks are degrading. The certificate is discounted: it weighs a quarter, the evidence weighs three quarters.",
    products: QV_ENV_PRODUCTS, initialProduct: "p6",
  },
  industrial: {
    label: "Industrial audit", icon: Factory, kicker: "KIABI · Industrial Performance · Vision 2027",
    headline: "From one grid for everyone to mass precision: surgical industrial strikes.", uniformTotal: 168,
    stages: QV_STAGE_NAMES, productLabel: "Product and supplier site", critKind: "Requirement",
    stageA: { title: "Industrial standard intake", note: "Source: KIABI industrial requirements and the supplier's capacity declaration. Requirements are read directly from the standard and applied to the site's processes." },
    stageB: { title: "Industrial signals", sub: qvSiteSub }, stageC: { title: "Supplier profile and industrial risk score" }, scoreWord: "industrial risk score",
    why: { tech: "standard", review: "signals", supplier: "supplier" },
    traceText: "Every line traces to a standard requirement, a signal cluster or a supplier signal",
    footer: "Vision demo. All suppliers, figures and signals are simulated and internally consistent; none refer to real partners.",
    methods: QV_IND_METHODS, countries: QV_IND_COUNTRIES,
    tagNames: { capacity: "capacity strain", process: "process-control weakness", maint: "maintenance gap", doc: "documentation cannot be assumed", visit: "presence required", subcontract: "subcontracting risk", planning: "planning reliability doubt", skills: "skills gap" },
    hist: { key: "late", label: "Late delivery history", options: QV_IND_DELIVERY, signalTitle: "Delivery performance", segLabel: "Late deliveries", blockTitle: "1 · Late delivery history", fmt: (c) => `${c} %` },
    cert: { key: "iso9", label: "ISO 9001 status", options: QV_IND_CERT }, extras: QV_IND_EXTRAS,
    audA: { key: "kia", label: "Past industrial audits", options: QV_IND_AUDITS, colTitle: "Industrial audits", prefix: "Industrial" },
    audB: { key: "cap", label: "Past capacity verifications", options: QV_IND_CAPACITY, colTitle: "Capacity verifications", prefix: "Capacity", majorWord: "major", fail: ["Fail"] },
    weights: { hist: 0.3, standards: 0.2, audits: 0.5 },
    trapText: "ISO 9001 certified, yet the delivery history and both audit tracks are degrading. The certificate is discounted: it weighs one fifth, the evidence weighs four fifths.",
    products: QV_IND_PRODUCTS, initialProduct: "p10",
  },
  quality: {
    label: "Quality audit", icon: BadgeCheck, kicker: "KIABI · World Quality · Vision 2027",
    headline: "From one grid for everyone to mass precision: surgical quality strikes.", uniformTotal: QV_UNIFORM_TOTAL,
    stages: ["Extracting tech pack", "Clustering reviews", "Profiling supplier", "Generating grid"], productLabel: "Product tech pack", critKind: "Critical characteristic",
    stageA: { title: "Tech pack intake", note: "Source: bill of materials generated by Cognyx. Materials, process and critical characteristics are read directly from the structured BOM." },
    stageB: { title: "Customer reviews", sub: (product) => `${product.familyLabel}, simulated review base` }, stageC: { title: "Supplier profile and quality risk score" }, scoreWord: "quality risk score",
    why: { tech: "tech pack", review: "reviews", supplier: "supplier" },
    traceText: "Every line traces to a tech pack card, a review cluster or a supplier signal",
    footer: "Vision demo. All suppliers, figures and reviews are simulated and internally consistent; none refer to real partners.",
    methods: QV_METHODS, countries: QV_COUNTRIES,
    tagNames: { process: "process-control weakness", inline: "in-line control gap", doc: "documentation cannot be assumed", visit: "presence required", subcontract: "subcontracting risk", lab: "lab capability doubt", final: "final-gate escapes" },
    hist: { key: "nq", label: "Non-quality cost history", options: QV_NQ_COST, signalTitle: "Non-quality costs", segLabel: "Non-quality costs", blockTitle: "1 · Non-quality cost history", fmt: (c) => `€${c}k` },
    cert: { key: "iso", label: "ISO 9001 status", options: QV_ISO }, extras: QV_EXTRA_STANDARDS,
    audA: { key: "qa", label: "Past quality audits", options: QV_QUALITY_AUDITS, colTitle: "Quality audits", prefix: "Quality" },
    audB: { key: "dpr", label: "Past DPR audits", options: QV_DPR_AUDITS, colTitle: "DPR audits", prefix: "DPR", majorWord: "major", fail: ["Fail"] },
    weights: { hist: QV_SCORE_WEIGHTS.nq, standards: QV_SCORE_WEIGHTS.standards, audits: QV_SCORE_WEIGHTS.audits },
    trapText: "ISO 9001 certified, yet the cost history and both audit tracks are degrading. The certificate is discounted: it weighs one fifth, the evidence weighs four fifths.",
    products: QV_PRODUCTS, initialProduct: "p2",
  },
};
/* Stable initial parameters per audit type (Reset goes back to them) */
Object.values(QV_AUDITS).forEach((c) => { c.initial = { product: c.initialProduct, ...c.products[c.initialProduct].defaults }; });
const QV_AUDIT_ORDER = ["social", "environmental", "industrial", "quality"];

// ============================================================================
// GENERATION ENGINE — deterministic, so every re-run is coherent
// ============================================================================

function qvRiskProfile(cfg, p) {
  const nq = cfg.hist.options[p[cfg.hist.key]], iso = cfg.cert.options[p[cfg.cert.key]], qa = cfg.audA.options[p[cfg.audA.key]], dpr = cfg.audB.options[p[cfg.audB.key]];
  const family = cfg.products[p.product].family;
  const relief = p.extras.reduce((s, k) => {
    const e = cfg.extras[k];
    return s + (e.families && !e.families.includes(family) ? 0 : e.relief);
  }, 0);
  const standardsScore = Math.max(5, iso.score - relief);
  const auditsScore = Math.round((qa.score + dpr.score) / 2);

  const parts = {
    nq: Math.round(nq.score * cfg.weights.hist),
    standards: Math.round(standardsScore * cfg.weights.standards),
    audits: Math.round(auditsScore * cfg.weights.audits),
  };
  const score = parts.nq + parts.standards + parts.audits;

  const evidenceBad = nq.score >= 60 && qa.score >= 60 && dpr.score >= 60;
  const trap = p[cfg.cert.key] === "certified" && evidenceBad;

  const signals = [
    { key: "nq", title: cfg.hist.signalTitle, text: nq.signal, sub: nq.score },
    {
      key: "standards", title: "Standards met",
      text: trap
        ? cfg.trapText
        : iso.label + (p.extras.length ? ", plus " + p.extras.map((k) => cfg.extras[k].label).join(", ") : "") + (p[cfg.cert.key] === "certified" ? ". A documented system exists; it is a floor, not a guarantee." : ". Documentation and process discipline cannot be assumed."),
      sub: standardsScore, trap,
    },
    { key: "audits", title: "Past KIABI audits", text: qa.signal + " " + dpr.signal, sub: auditsScore },
  ];

  const boosts = {};
  for (const src of [cfg.countries[p.country].boosts, nq.boosts, iso.boosts, qa.boosts, dpr.boosts]) for (const k in src) boosts[k] = Math.max(boosts[k] || 0, src[k]);
  const level = score >= 60 ? "High" : score >= 40 ? "Elevated" : "Moderate";
  return { score, level, parts, signals, boosts, nq, qa, dpr, standardsScore, auditsScore, trap };
}

function qvTagName(cfg, t) {
  return cfg.tagNames[t] || t;
}

function qvShortTech(cfg, t) {
  return t.kind === cfg.critKind ? t.text.split(",")[0].toLowerCase() : t.kind.toLowerCase();
}

function qvGenerateGrid(cfg, product, profile) {
  const p = cfg.products[product];
  const reviewById = Object.fromEntries(p.reviews.map((r) => [r.id, r]));
  const techById = Object.fromEntries(p.techPack.map((t) => [t.id, t]));
  const scored = p.pool.map((cp) => {
    let score = cp.base * 10;
    for (const rid of cp.review) { const r = reviewById[rid]; score += QV_FREQ[r.freq] * QV_SEV[r.sev] * 2.2; }
    const hits = [];
    for (const tag of cp.tags) if (profile.boosts[tag]) { score += profile.boosts[tag] * 22; hits.push(tag); }
    const why = [];
    if (cp.tech.length) why.push(cfg.why.tech + ": " + cp.tech.map((t) => qvShortTech(cfg, techById[t])).join(", "));
    if (cp.review.length) why.push(cfg.why.review + ": " + cp.review.map((r) => `"${reviewById[r].text.toLowerCase()}"`).join(", "));
    if (hits.length) why.push(cfg.why.supplier + ": " + hits.map((t) => qvTagName(cfg, t)).join(", "));
    return { ...cp, score, why: why.join(" — ") || "baseline control point" };
  });
  scored.sort((a, b) => b.score - a.score);
  const n = 12 + Math.min(4, Math.round(profile.score / 22));
  const max = scored[0].score;
  return scored.slice(0, n).map((cp, i) => ({ ...cp, rank: i + 1, weight: Math.round((cp.score / max) * 100), strike: i < 5 }));
}

// ============================================================================
// UI — Tailwind classes of the mock-up converted to inline styles
// ============================================================================

/* md: breakpoint of the mock-up (min-width 768px) */
function useQvMd() {
  const query = "(min-width: 768px)";
  const [md, setMd] = useState(() => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : true));
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const m = window.matchMedia(query);
    const on = () => setMd(m.matches);
    on();
    if (m.addEventListener) m.addEventListener("change", on); else m.addListener(on);
    return () => { if (m.removeEventListener) m.removeEventListener("change", on); else m.removeListener(on); };
  }, []);
  return md;
}

function QvCockpit({ cfg, autoRun = false }) {
  const [params, setParams] = useState(cfg.initial);
  const [stage, setStage] = useState(4);
  const [running, setRunning] = useState(false);
  const runId = useRef(0);
  const first = useRef(true);
  const md = useQvMd();

  const profile = useMemo(() => qvRiskProfile(cfg, params), [cfg, params]);
  const grid = useMemo(() => qvGenerateGrid(cfg, params.product, profile), [cfg, params.product, profile]);
  const product = cfg.products[params.product];

  const run = () => {
    const id = ++runId.current;
    setRunning(true);
    setStage(0);
    [1, 2, 3, 4].forEach((s, i) => setTimeout(() => { if (runId.current === id) { setStage(s); if (s === 4) setRunning(false); } }, 550 * (i + 1)));
  };
  /* a changed parameter re-runs the four stages; switching the audit type (autoRun) runs them on arrival */
  useEffect(() => { if (first.current) { first.current = false; if (autoRun) run(); return; } run(); }, [params]);

  const setProduct = (product) => setParams({ product, ...cfg.products[product].defaults });
  const reset = () => setParams(cfg.initial);
  const techById = Object.fromEntries(product.techPack.map((t) => [t.id, t]));
  const btn = { display: "flex", alignItems: "center", gap: 6, ...QV_SM, fontWeight: 800, padding: "6px 12px", borderRadius: 10, fontFamily: "inherit", cursor: "pointer" };
  const card = { ...QV_XS, border: `1px solid ${QV_S[200]}`, borderRadius: 10, padding: "8px 12px" };

  return (
    <div style={{ background: "#ffffff", color: QV_S[900], fontFamily: QV_FONT }}>
      <style>{"@keyframes qvPulse{50%{opacity:.5}}"}</style>
      <header style={{ borderBottom: `1px solid ${QV_S[200]}` }}>
        <div style={{ padding: "4px 0 20px", display: "flex", flexDirection: md ? "row" : "column", gap: 16, alignItems: md ? "flex-end" : "stretch", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ display: "inline-block", width: 28, height: 28, borderRadius: 8, background: QV_BLUE }} />
              <span style={{ ...QV_SM, color: QV_S[500] }}>{cfg.kicker}</span>
            </div>
            <h1 style={{ margin: "8px 0 0", fontSize: md ? 19 : 16, lineHeight: 1.3, fontWeight: 800, color: QV_S[900] }}>
              {cfg.headline}
            </h1>
            <p style={{ margin: "4px 0 0", ...QV_SM, color: QV_S[500] }}>Today, one grid of {cfg.uniformTotal} checkpoints for every supplier. Tomorrow, {grid.length} for this one.</p>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
            <button onClick={run} disabled={running} style={{ ...btn, color: "#ffffff", background: QV_BLUE, border: "1px solid transparent", opacity: running ? 0.5 : 1, cursor: running ? "default" : "pointer" }}>
              <Play size={14} /> Re-run
            </button>
            <button onClick={reset} style={{ ...btn, border: `1px solid ${QV_S[200]}`, color: QV_S[600], background: "#ffffff" }}>
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>
      </header>

      <main style={{ padding: "24px 0" }}>
        <QvParamPanel cfg={cfg} params={params} setParams={setParams} setProduct={setProduct} product={product} md={md} />

        {/* Pipeline flow */}
        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 8 }}>
          {cfg.stages.map((s, i) => {
            const done = stage > i, active = running && stage === i;
            return (
              <div key={s} style={{ borderRadius: 10, padding: "8px 12px", ...QV_XS, borderWidth: 1, borderStyle: "solid", transition: "color .15s, background-color .15s, border-color .15s", ...(done ? { borderColor: "transparent", color: "#ffffff", background: QV_BLUE } : active ? { borderColor: QV_S[300], background: QV_S[50] } : { borderColor: QV_S[200], color: QV_S[400] }) }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontWeight: 800, fontFamily: MONO }}>{["A", "B", "C", "D"][i]}</span>
                  <span style={QV_TRUNC}>{active ? s + "…" : s}</span>
                  {done && <Check size={12} style={{ marginLeft: "auto", flexShrink: 0 }} />}
                  {active && <span style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: 999, flexShrink: 0, background: QV_BLUE, animation: "qvPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" }} />}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: md ? "repeat(3, minmax(0, 1fr))" : "minmax(0, 1fr)", gap: 16 }}>
          {/* Stage A */}
          <QvStageCard letter="A" title={cfg.stageA.title} sub={product.name} state={qvStageState(stage, running, 0)}>
            <div style={{ marginBottom: 12, ...QV_XS, borderLeft: `2px solid ${QV_BLUE}`, paddingLeft: 8, color: QV_S[600] }}>
              {cfg.stageA.note}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {product.techPack.map((t) => (
                <div key={t.id} style={card}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: QV_S[500] }}><span>{t.kind}</span><span style={QV_TAB}>{Math.round(t.conf * 100)}% confidence</span></div>
                  <div style={{ marginTop: 2, color: QV_S[800] }}>{t.text}</div>
                  <div style={{ marginTop: 6, height: 4, background: QV_S[100], borderRadius: 99 }}><div style={{ height: 4, borderRadius: 99, width: `${t.conf * 100}%`, background: QV_BLUE }} /></div>
                </div>
              ))}
            </div>
          </QvStageCard>

          {/* Stage B */}
          <QvStageCard letter="B" title={cfg.stageB.title} sub={cfg.stageB.sub(product, params)} state={qvStageState(stage, running, 1)}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {product.reviews.map((r) => (
                <div key={r.id} style={card}>
                  <div style={{ color: QV_S[800], fontWeight: 700 }}>{r.text}</div>
                  <div style={{ marginTop: 4, display: "flex", gap: 8 }}><QvPill>{r.freq}</QvPill><QvPill dark={r.sev === "severe"}>{r.sev}</QvPill></div>
                  <div style={{ marginTop: 6, color: QV_S[500], fontStyle: "italic" }}>“{r.quote}”</div>
                  <div style={{ marginTop: 6, color: QV_S[500] }}>Implicates: {r.maps.map((m) => qvShortTech(cfg, techById[m])).join(", ")}</div>
                </div>
              ))}
            </div>
          </QvStageCard>

          {/* Stage C */}
          <QvStageCard letter="C" title={cfg.stageC.title} sub={`${params.country} · ${product.context}`} state={qvStageState(stage, running, 2)}>
            <QvSupplierProfile cfg={cfg} params={params} profile={profile} />
          </QvStageCard>
        </div>

        {/* Stage D — hero */}
        <div style={{ marginTop: 24 }}>
          <QvStageCard letter="D" title="The tailored grid" sub={`${grid.length} checkpoints instead of ${cfg.uniformTotal}, ranked by ${cfg.scoreWord} ${profile.score}`} state={qvStageState(stage, running, 3)} wide hero>
            {md && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: 12, ...QV_XS, color: QV_S[400], paddingBottom: 8, borderBottom: `1px solid ${QV_S[100]}`, paddingLeft: 15 }}>
                <div style={{ gridColumn: "span 1 / span 1" }}>Rank</div><div style={{ gridColumn: "span 6 / span 6" }}>Checkpoint and why it is here</div><div style={{ gridColumn: "span 2 / span 2" }}>Method</div><div style={{ gridColumn: "span 3 / span 3", textAlign: "right" }}>Weight</div>
              </div>
            )}
            <div>
              {grid.map((cp, i) => (
                <div key={cp.id} style={{ paddingTop: 10, paddingBottom: 10, display: "grid", gridTemplateColumns: "repeat(12, minmax(0, 1fr))", gap: 12, alignItems: "start", borderTop: i ? `1px solid ${QV_S[100]}` : "none", ...(cp.strike ? { boxShadow: `inset 3px 0 0 ${QV_BLUE}`, paddingLeft: 12 } : { paddingLeft: 15 }) }}>
                  <div style={{ gridColumn: "span 1 / span 1", ...QV_SM, ...QV_TAB, color: QV_S[400], paddingTop: 2 }}>{cp.rank}</div>
                  <div style={{ gridColumn: md ? "span 6 / span 6" : "span 11 / span 11" }}>
                    <div style={{ ...QV_SM, fontWeight: 700, color: QV_S[900] }}>{cp.label}{cp.strike && <span style={{ marginLeft: 8 }}><Chip color={T.accent}>surgical strike</Chip></span>}</div>
                    <div style={{ marginTop: 2, ...QV_XS, color: QV_S[500] }}>{cp.why}</div>
                    {!md && <div style={{ marginTop: 4, ...QV_XS, color: QV_S[500] }}>{cfg.methods[cp.method].label} · weight {cp.weight}</div>}
                  </div>
                  {md && <div style={{ gridColumn: "span 2 / span 2", ...QV_XS, color: QV_S[600], paddingTop: 2 }}>{cfg.methods[cp.method].label}</div>}
                  {md && <div style={{ gridColumn: "span 2 / span 2", paddingTop: 6 }}><div style={{ height: 6, background: QV_S[100], borderRadius: 99 }}><div style={{ height: 6, borderRadius: 99, width: `${cp.weight}%`, background: cp.strike ? QV_BLUE : QV_S[400] }} /></div></div>}
                  {md && <div style={{ gridColumn: "span 1 / span 1", ...QV_XS, ...QV_TAB, color: QV_S[600], paddingTop: 2, textAlign: "right" }}>{cp.weight}</div>}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${QV_S[100]}`, display: "flex", flexWrap: "wrap", columnGap: 24, rowGap: 4, ...QV_XS, color: QV_S[500] }}>
              <span>{cfg.uniformTotal - grid.length} uniform checkpoints not applied to this case</span>
              <span>5 surgical strikes concentrate the audit effort</span>
              <span>{cfg.traceText}</span>
            </div>
          </QvStageCard>
        </div>
      </main>

      <footer style={{ ...QV_XS, color: QV_S[400] }}>
        {cfg.footer}
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------- Stage C detail
function QvSupplierProfile({ cfg, params, profile }) {
  const { nq, qa, dpr, parts } = profile;
  const segs = [
    { k: "nq", label: cfg.hist.segLabel, w: cfg.weights.hist, v: parts.nq, color: QV_BLUE_DARK },
    { k: "standards", label: "Standards", w: cfg.weights.standards, v: parts.standards, color: T.silver },
    { k: "audits", label: "KIABI audits", w: cfg.weights.audits, v: parts.audits, color: QV_BLUE },
  ];
  const maxCost = Math.max(1, ...nq.costs);
  const majorWord = (n) => (typeof cfg.audB.majorWord === "function" ? cfg.audB.majorWord(n) : cfg.audB.majorWord);
  return (
    <div style={QV_XS}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 26, lineHeight: 1.2, fontWeight: 800, ...QV_TAB }}>{profile.score}</span>
        <span style={{ ...QV_SM, color: QV_S[600] }}>{cfg.scoreWord} · {profile.level}</span>
      </div>
      <div style={{ marginTop: 8, display: "flex", height: 8, borderRadius: 99, overflow: "hidden", background: QV_S[100] }}>
        {segs.map((s) => <div key={s.k} style={{ width: `${s.v}%`, background: s.color }} title={s.label} />)}
      </div>
      <div style={{ marginTop: 6, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
        {segs.map((s) => (
          <div key={s.k}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 99, flexShrink: 0, background: s.color }} /><span style={{ color: QV_S[600] }}>{s.label}</span></div>
            <div style={{ color: QV_S[800], ...QV_TAB, fontWeight: 500 }}>+{s.v} <span style={{ color: QV_S[400], fontWeight: 400 }}>of {Math.round(s.w * 100)}</span></div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, color: QV_S[500] }}>{cfg.countries[params.country].note}</div>

      {/* Input 1 */}
      <QvBlock title={cfg.hist.blockTitle} value={`${nq.trend} · ${nq.type}`} contribution={parts.nq}>
        {nq.costs.length > 0 && (
          <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "flex-end", height: 48 }}>
            {nq.costs.map((c, i) => (
              <div key={i} style={{ flex: "1 1 0%", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }}>
                <span style={{ color: QV_S[600], ...QV_TAB }}>{cfg.hist.fmt(c)}</span>
                <div style={{ width: "100%", borderRadius: 5, height: `${Math.max(6, (c / maxCost) * 32)}px`, background: QV_BLUE_DARK }} />
                <span style={{ color: QV_S[400] }}>Y-{3 - i}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 6, color: QV_S[600] }}>{profile.signals[0].text}</div>
      </QvBlock>

      {/* Input 2 */}
      <QvBlock title="2 · Standards met" value={cfg.cert.options[params[cfg.cert.key]].label} contribution={parts.standards} trap={profile.trap}>
        <div style={{ marginTop: 4, display: "flex", flexWrap: "wrap", gap: 4 }}>
          {params.extras.map((k) => <QvPill key={k}>{cfg.extras[k].label}</QvPill>)}
          {params.extras.length === 0 && <span style={{ color: QV_S[400] }}>No additional standard</span>}
        </div>
        <div style={{ marginTop: 6, ...(profile.trap ? { color: QV_S[900], borderLeft: `2px solid ${QV_BLUE}`, paddingLeft: 8 } : { color: QV_S[600] }) }}>{profile.signals[1].text}</div>
      </QvBlock>

      {/* Input 3 */}
      <QvBlock title="3 · Past KIABI audits" value={`${cfg.audA.prefix} ${qa.scores.length ? qa.scores.join(" / ") : "none"} · ${cfg.audB.prefix} ${dpr.results.length ? dpr.results.join(" / ") : "none"}`} contribution={parts.audits}>
        <div style={{ marginTop: 6, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 8 }}>
          <div>
            <div style={{ color: QV_S[500] }}>{cfg.audA.colTitle}</div>
            {qa.scores.length ? qa.scores.map((s, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${QV_S[100]}`, padding: "2px 0" }}><span style={{ ...QV_TAB, fontWeight: 500 }}>{s}</span><span style={{ color: QV_S[500], marginLeft: 8, ...QV_TRUNC }}>{qa.findings[i]}</span></div>
            )) : <div style={{ color: QV_S[400] }}>No record</div>}
          </div>
          <div>
            <div style={{ color: QV_S[500] }}>{cfg.audB.colTitle}</div>
            {dpr.results.length ? dpr.results.map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${QV_S[100]}`, padding: "2px 0" }}><span style={{ fontWeight: 500, ...(cfg.audB.fail.includes(r) ? { color: QV_S[900] } : {}) }}>{r}</span><span style={{ color: QV_S[500], marginLeft: 8 }}>{dpr.majors[i]} {majorWord(dpr.majors[i])}</span></div>
            )) : <div style={{ color: QV_S[400] }}>No record</div>}
          </div>
        </div>
        <div style={{ marginTop: 6, color: QV_S[600] }}>{profile.signals[2].text}</div>
      </QvBlock>
    </div>
  );
}

function QvBlock({ title, value, contribution, children }) {
  return (
    <div style={{ marginTop: 12, border: `1px solid ${QV_S[200]}`, borderRadius: 10, padding: "8px 12px" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontWeight: 700, color: QV_S[800] }}>{title}</span>
        <span style={{ ...QV_TAB, flexShrink: 0, color: QV_BLUE }}>+{contribution} to score</span>
      </div>
      <div style={{ color: QV_S[600] }}>{value}</div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------- Shared
function qvStageState(stage, running, i) { return stage > i ? "done" : running && stage === i ? "active" : "waiting"; }

function QvStageCard({ letter, title, sub, state, children, wide, hero }) {
  const done = state === "done";
  return (
    <section style={{ minWidth: 0, borderRadius: 10, borderWidth: hero ? 2 : 1, borderStyle: done ? "solid" : "dashed", borderColor: hero && done ? QV_BLUE : QV_S[200] }}>
      <div style={{ padding: "12px 16px", borderBottom: `1px solid ${QV_S[100]}`, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 24, height: 24, flexShrink: 0, borderRadius: 99, color: "#ffffff", ...QV_XS, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 500, background: done ? QV_BLUE : QV_S[400] }}>{letter}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 800 }}>{title}</div>
          <div style={{ ...QV_XS, color: QV_S[500], ...QV_TRUNC }}>{sub}</div>
        </div>
      </div>
      <div style={{ padding: 16, transition: "opacity .3s", opacity: done ? 1 : 0.3, ...(wide ? {} : { overflowY: "auto", maxHeight: 640 }) }}>
        {state === "waiting" && !wide ? <div style={{ ...QV_XS, color: QV_S[400] }}>Waiting for the previous stage.</div> : children}
      </div>
    </section>
  );
}

function QvParamPanel({ cfg, params, setParams, setProduct, product, md }) {
  const sel = { display: "block", width: "100%", boxSizing: "border-box", marginTop: 4, ...QV_SM, border: `1px solid ${QV_S[200]}`, borderRadius: 10, padding: "6px 8px", background: "#ffffff", color: QV_S[900], fontFamily: "inherit", outline: "none" };
  const lbl = { ...QV_XS, color: QV_S[600] };
  const set = (k) => (e) => setParams({ ...params, [k]: e.target.value });
  const toggleExtra = (k) => setParams({ ...params, extras: params.extras.includes(k) ? params.extras.filter((x) => x !== k) : [...params.extras, k] });
  const pick = (input) => (
    <label style={lbl}>{input.label}
      <select style={sel} value={params[input.key]} onChange={set(input.key)}>
        {Object.entries(input.options).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
      </select>
    </label>
  );
  return (
    <div style={{ background: QV_S[50], border: `1px solid ${QV_S[200]}`, borderRadius: 10, padding: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: md ? "repeat(3, minmax(0, 1fr))" : "minmax(0, 1fr)", gap: 12 }}>
        <label style={lbl}>{cfg.productLabel}
          <select style={sel} value={params.product} onChange={(e) => setProduct(e.target.value)}>
            {Object.entries(cfg.products).map(([k, p]) => <option key={k} value={k}>{p.name}</option>)}
          </select>
        </label>
        <label style={lbl}>Supplier country
          <select style={sel} value={params.country} onChange={set("country")}>
            {Object.keys(cfg.countries).map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        {pick(cfg.hist)}
        {pick(cfg.cert)}
        {pick(cfg.audA)}
        {pick(cfg.audB)}
      </div>
      <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, ...QV_XS, color: QV_S[600] }}>
        <span>Other standards met:</span>
        {Object.entries(cfg.extras).map(([k, e]) => {
          const on = params.extras.includes(k);
          const relevant = !e.families || e.families.includes(product.family);
          return (
            <button key={k} onClick={() => toggleExtra(k)} style={{ padding: "4px 8px", borderRadius: 10, ...QV_XS, fontFamily: "inherit", cursor: "pointer", ...(on ? { color: "#ffffff", border: "1px solid transparent", background: QV_BLUE } : { border: `1px solid ${QV_S[200]}`, background: "#ffffff", color: QV_S[600] }) }} title={relevant ? "" : "Not relevant to this product family: no effect on the score"}>
              {e.label}{!relevant && on ? " (no effect)" : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function QvPill({ children, dark }) {
  return <Chip color={dark ? T.bad : T.sub}>{children}</Chip>;
}

/* Supplier compliance section of the KFI tab: one audit type at a time */
function SupplierCompliance() {
  const [type, setType] = useState("quality");
  const [switched, setSwitched] = useState(false);
  return (
    <CollapsibleSection title="Supplier compliance" icon={ShieldCheck} sub="tailored audit grid for one product and one supplier — social, environmental, industrial and quality audits">
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, letterSpacing: 0.6, textTransform: "uppercase" }}>Audit type</span>
        {QV_AUDIT_ORDER.map((id) => {
          const a = QV_AUDITS[id], on = type === id;
          return (
            <button key={id} onClick={() => { if (!on) { setType(id); setSwitched(true); } }} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: on ? T.human : T.panel2, color: on ? "#ffffff" : T.sub, border: `1px solid ${on ? T.human : T.line}`, borderRadius: 999, padding: "8px 15px", fontSize: 12, fontWeight: 700, fontFamily: SANS }}>
              <a.icon size={13} /> {a.label}
            </button>
          );
        })}
      </div>
      <QvCockpit key={type} cfg={QV_AUDITS[type]} autoRun={switched} />
    </CollapsibleSection>
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
      <CollapsibleSection title="Panel performance — trajectory" icon={TrendingUp}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 12 }}>
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
      </CollapsibleSection>

      {/* ---- Partner business plans × in-season forecasts (RELEX) ---- */}
      <KfiReconciliation st={st} />

      {/* ---- Supplier panel, followed by "Act now" and "Decisions to make" ---- */}
      <CollapsibleSection title="Supplier panel" icon={TrendingUp} sub={`${PROD_SUPPLIERS.length} suppliers tracked · click for field details`}
        right={<span style={{ marginLeft: "auto" }}><Chip color={T.warn}>{auditsTodo} audit{auditsTodo > 1 ? "s" : ""} to finalise</Chip></span>}>
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
      </CollapsibleSection>

      {/* ---- Supplier compliance: tailored audit grids (Quality Vision) ---- */}
      <SupplierCompliance />
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
    <CollapsibleSection nested title={`${BUDGET_OFFERS_DEPT} — offer breakdown`} icon={ShoppingBag}
      right={<>
        {validated ? <Chip color={T.ok}>Global budget validated · {validatedAt}</Chip> : <Chip color={T.warn}>Validation required</Chip>}
        <span style={{ marginLeft: "auto", fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{BUDGET_OFFERS.length} offers · tolerance {OFFER_TOL.budgetPct} % budget · {fr1(OFFER_TOL.ratePts)} pts rates · {fr2(OFFER_TOL.pvmEur)} € price</span>
      </>}>
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
    </CollapsibleSection>
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
      <CollapsibleSection title="Budget module — fiscal year Sept. 2026 → Aug. 2027" icon={Wallet} sub="three steps: global budget · breakdown by department · submissions & arbitration">
        <BudgetModule fw={fw} />
      </CollapsibleSection>
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
      <CollapsibleSection title="CO₂ module — fiscal year Sept. 2026 → Aug. 2027" icon={Leaf} iconColor={G} accent={G} sub="three steps: global CO₂ budget · breakdown by department · submissions & arbitration">
        <CO2Module fw={fw} />
      </CollapsibleSection>
    </div>
  );
}

/* ============================================================
   Monitoring — single annual follow-up for the financial and CO₂ frameworks
   (former step 4 of BudgetModule and CO2Module, fed by the shared framing state)
   ============================================================ */
function FinancialMonitoring({ glob, depts, scope }) {
  const [month, setMonth] = useState(0);
  const fm = (v) => (Math.abs(v) < 100 ? fr1(v) : u(Math.round(v)));
  const [metric, setMetric] = useState("ca");
  const cumPh = PHASAGE_CA.slice(0, month + 1).reduce((s, v) => s + v, 0) / 100;
  const mon = depts.map((d) => {
    const cumPhased = d.budget * cumPh;
    const fac = caFacOf(d)(month);
    const cumReel = cumPhased * fac;
    const demPh = +(d.demarque + PHASAGE_DEM[month]).toFixed(1);
    const demRe = +(demPh + demGapOf(d)(month)).toFixed(1);
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
    if (x.devCa > 2) parts.push(`cumulative revenue at ${fm(x.cumReel)} M€ vs ${fm(x.cumPhased)} M€ phased (${x.fac > 1 ? "+" : "−"}${fr1(Math.abs(x.fac - 1) * 100)} %)`);
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
      const dr = dp + demGapOf(d)(m);
      if (metric === "ca") { ph += d.budget * cp; re += d.budget * cp * caFacOf(d)(m); }
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
    <CollapsibleSection title={`Financial monitoring — ${scope ? scope.label : "monitoring agent"}`} icon={TrendingUp}
      right={<>
        <span style={{ fontSize: 11, color: T.faint, fontFamily: MONO }}>budget {u(glob.budget)} M€ · {depts.length} {scope ? scope.lines : "departments"} from the {scope ? scope.source : "Financial Framework"}</span>
        <ResetBtn onClick={() => setMonth(0)} />
      </>}>
      <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Simulated actuals by {scope ? scope.line.toLowerCase() : "department"} vs phased budget trajectory (Christmas peaks, January and July sales, back-to-school). Green ≤ 2 pts · orange 2 – 4 pts · red &gt; 4 pts.</div>
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
          <thead><tr>{[scope ? scope.line : "Department", "Status", "Cumulative revenue actual / phased", "Markdown actual / phased", "TMV actual / phased", "Max deviation"].map((c, j) => <th key={c} style={{ textAlign: j === 0 ? "left" : "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{c}</th>)}</tr></thead>
          <tbody>
            {mon.map((x) => (
              <tr key={x.d.n}>
                <td style={{ padding: "8px 8px", fontWeight: 800, color: T.ink, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}>{x.d.n}{x.d.collection ? <div style={{ fontSize: 10, fontWeight: 400, color: T.faint, fontFamily: MONO }}>{x.d.collection}</div> : null}</td>
                <td style={{ textAlign: "right", borderBottom: `1px solid ${T.lineSoft}` }}><StatusChip s={x.status} /></td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}><strong style={{ color: T.ink }}>{fm(x.cumReel)}</strong> / {fm(x.cumPhased)} M€</td>
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
          {alerts.length === 0 ? <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: T.ok }}><Check size={14} /> All {scope ? scope.lines : "departments"} are on track.</div> : alerts.map((a) => (
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
    </CollapsibleSection>
  );
}

function CO2Monitoring({ glob, depts, scope }) {
  const [month, setMonth] = useState(0);
  const cumPh = PHASAGE_CO2.slice(0, month + 1).reduce((s, v) => s + v, 0) / 100;
  const cumFac = (d) => PHASAGE_CO2.slice(0, month + 1).reduce((s, v, i) => s + v * co2FacOf(d)(i), 0) / (cumPh * 100);
  const mon = depts.map((d) => {
    const cumPhased = d.budget * cumPh;
    const fac = cumFac(d);
    const cumReel = cumPhased * fac;
    const moisPh = (d.budget * PHASAGE_CO2[month]) / 100;
    const moisRe = moisPh * co2FacOf(d)(month);
    const dev = Math.abs(fac - 1) * 100;
    const status = dev <= 2 ? "vert" : dev <= 4 ? "orange" : "rouge";
    return { d, cumPhased, cumReel, fac, moisPh, moisRe, dev, status, proj: d.budget * fac, cause: causeOf(d) };
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
    depts.forEach((d) => { ph += d.budget * cp; re += PHASAGE_CO2.slice(0, m + 1).reduce((s, v, i) => s + (d.budget * v * co2FacOf(d)(i)) / 100, 0); });
    return { ph: Math.round(ph), re: Math.round(re) };
  });
  const CW = 640, CH = 200, pL = 60, pR = 14, pT = 14, pB = 26;
  const yMax = Math.ceil(Math.max(...series.map((s) => s.ph), ...series.slice(0, month + 1).map((s) => s.re)) * 1.05);
  const cx = (m) => pL + (m * (CW - pL - pR)) / 11;
  const cy = (v) => pT + (1 - v / (yMax || 1)) * (CH - pT - pB);
  const ticks = [0, 1, 2, 3, 4].map((i) => (yMax * i) / 4);

  return (
    <CollapsibleSection title={`CO₂ monitoring — ${scope ? scope.label : "monitoring agent"}`} icon={TrendingUp} iconColor={G} accent={G}
      right={<>
        <span style={{ fontSize: 11, color: T.faint, fontFamily: MONO }}>budget {u(Math.round(glob.budget))} t CO₂e · {depts.length} {scope ? scope.lines : "departments"} from the {scope ? scope.co2Source : "CO₂ Framework"}</span>
        <ResetBtn onClick={() => setMonth(0)} />
      </>}>
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
          <thead><tr>{[scope ? scope.line : "Department", "Status", "Cumulative actual / phased", "Month actual / phased", "Cumulative gap", "Cause"].map((c, j) => <th key={c} style={{ textAlign: j === 0 || j === 5 ? "left" : "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{c}</th>)}</tr></thead>
          <tbody>
            {mon.map((x) => (
              <tr key={x.d.n}>
                <td style={{ padding: "8px 8px", fontWeight: 800, color: T.ink, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}>{x.d.n}{x.d.collection ? <div style={{ fontSize: 10, fontWeight: 400, color: T.faint, fontFamily: MONO }}>{x.d.collection}</div> : null}</td>
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
          {alerts.length === 0 ? <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: T.ok }}><Check size={14} /> All {scope ? scope.lines : "departments"} are on the carbon trajectory.</div> : alerts.map((a) => (
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
    </CollapsibleSection>
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
      <CollapsibleSection title={`${domain} — object graph`} icon={Network} sub={`${domainObjs.length} domain objects, ${nodes.length - domainObjs.length} linked objects from other domains (dashed) · click a node`}>
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
      </CollapsibleSection>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16, alignItems: "start" }}>
        {/* Objects */}
        <CollapsibleSection title="Objects" icon={Boxes} sub={domain} style={{ marginBottom: 0 }}>
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
        </CollapsibleSection>

        {/* Relations */}
        <CollapsibleSection title="Relations" icon={GitBranch} sub={`${domainRels.length} involving ${domain}`} style={{ marginBottom: 0 }}>
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
        </CollapsibleSection>

        {/* Business rules */}
        <CollapsibleSection title="Business rules" icon={ShieldCheck} iconColor={T.warn} sub={`${domainRules.length} in ${domain}`} style={{ marginBottom: 0 }}>
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
        </CollapsibleSection>
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
  const inScope = (x) => offers.some((o) => o.id === x.offerId);
  const volLabel = (pct) => (pct > STORE_TOL.volumePct ? "Over-demand" : pct < -STORE_TOL.volumePct ? "Under-demand" : "Balanced");
  const priceLabel = (pct) => (pct == null ? "No request" : pct > STORE_TOL.pricePct ? "Price above push" : pct < -STORE_TOL.pricePct ? "Price below push" : "Aligned");
  const countries = data.countries.map((c0) => {
    const c = { ...c0, offers: c0.offers.filter(inScope) };
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

function StoreSubmissionsBlock({ showMonthly = false, title = "Store submissions by country", offers = BUDGET_OFFERS, scopeLabel }) {
  const [country, setCountry] = useState("ALL");
  const data = STORE_SUBMISSIONS;
  const r = useMemo(() => computeStoreSubmissions(data, offers, country), [country, offers]);
  const selC = country === "ALL" ? null : r.countries.find((c) => c.countryCode === country);
  const th = (align) => ({ textAlign: align, padding: "6px 6px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" });
  const td = { padding: "7px 6px", borderBottom: `1px solid ${T.lineSoft}`, fontSize: 12, whiteSpace: "nowrap" };
  const num = { ...td, textAlign: "right", fontFamily: MONO, color: T.sub };
  const volC = (l) => (l === "Over-demand" ? T.warn : l === "Under-demand" ? T.bad : l === "Balanced" ? T.ok : T.faint);
  const priceC = (l) => (l === "Aligned" ? T.ok : l === "No request" ? T.faint : T.warn);
  const sgn = (n, d = 0) => `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n).toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d })}`;
  const kunits = (n) => `${u(Math.round(n / 1000))} k`;
  return (
    <CollapsibleSection title={title} icon={Globe2}
      right={<>
        {scopeLabel && <Chip color={T.human}>{scopeLabel} · {offers.length} offers</Chip>}
        <Chip color={T.warn}>{data.source}</Chip>
        <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}>last submission {data.lastSubmission} · {r.submitted} / {r.countries.length} countries submitted</span>
        <select value={country} onChange={(e) => setCountry(e.target.value)} style={{ marginLeft: "auto", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "7px 10px", color: T.ink, fontSize: 12, fontFamily: SANS, fontWeight: 700, cursor: "pointer", outline: "none", maxWidth: "100%" }}>
          <option value="ALL">All countries</option>
          {data.countries.map((c) => <option key={c.countryCode} value={c.countryCode}>{c.countryName} ({c.storeCount} stores)</option>)}
        </select>
      </>}>
      <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>The offer is pushed top-down by the Product and Market Managers; each country's stores submit their needs bottom-up. Gaps are computed from the simulated submissions: volume tolerance ±{STORE_TOL.volumePct} %, price tolerance ±{STORE_TOL.pricePct} %.</div>

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
    </CollapsibleSection>
  );
}

/* ============================================================
   Monitoring — financial, CO₂ and store submissions views; the role view can force a sub-mode
   ============================================================ */
/* ============================================================
   Monitoring perimeters — Group (departments), Market (every offer of the
   Offers & Collections line) or Collection (the offers of one collection).
   Offer lines carry their own simulated actuals; CO₂ per offer = volume ×
   intensity, summing to the Offers & Collections CO₂ line (112 000 t).
   ============================================================ */
const OFFER_MONITORING = {
  "of-baby-night": { volume: 16, intensite: 1.35, caFac: () => 1.01, demGap: () => 0.3, co2Fac: () => 0.99, cause: "recycled cotton share on target" },
  "of-baby-under": { volume: 24, intensite: 1.3, caFac: () => 0.975, demGap: () => 1.5, co2Fac: (m) => (m >= 3 ? 1.03 : 1.0), cause: "air freight on two replenishment flows" },
  "of-baby-licences": { volume: 9, intensite: 1.6, caFac: (m) => (m >= 4 ? 1.06 : 1.02), demGap: () => -0.5, co2Fac: (m) => (m >= 4 ? 1.05 : 1.01), cause: "licence volumes above plan" },
  "of-girls": { volume: 15, intensite: 1.45, caFac: () => 1.0, demGap: () => 0.2, co2Fac: () => 0.98, cause: "nearshore sourcing on core lines" },
  "of-boys": { volume: 12.5, intensite: 1.424, caFac: () => 0.96, demGap: () => 2.5, co2Fac: () => 1.0, cause: "volumes phased as planned" },
  "of-capsules": { volume: 3.5, intensite: 1.5, caFac: (m) => (m >= 2 ? 0.93 : 1.0), demGap: () => 3, co2Fac: (m) => (m >= 2 ? 0.95 : 1.0), cause: "capsule launch delayed by one month" },
};
const BUDGET_COLLECTIONS = [...new Set(BUDGET_OFFERS.map((o) => o.collection))];
const offerLines = (offers) => offers.map((o) => { const m = OFFER_MONITORING[o.id] || { volume: 1, intensite: 1.4 }; return { n: o.name, collection: o.collection, budget: o.budget, demarque: o.demarque, pvm: o.pvm, tme: o.tme, tmv: o.tmv, volume: m.volume, intensite: m.intensite, co2Budget: Math.round(m.volume * m.intensite * 1000), caFac: m.caFac, demGap: m.demGap, co2Fac: m.co2Fac, cause: m.cause }; });
function monitoringScope(kind, collection, fw) {
  if (kind !== "market" && kind !== "collection") return null;
  const offers = kind === "market" ? BUDGET_OFFERS : BUDGET_OFFERS.filter((o) => o.collection === collection);
  const lines = offerLines(offers);
  const budget = lines.reduce((s, l) => s + l.budget, 0) || 1;
  const w = (k) => lines.reduce((s, l) => s + l[k] * l.budget, 0) / budget;
  const co2 = lines.reduce((s, l) => s + l.co2Budget, 0);
  const vol = lines.reduce((s, l) => s + l.volume, 0) || 1;
  const deptLine = fw.budgetDepts.find((d) => d.n === BUDGET_OFFERS_DEPT);
  const co2Line = fw.co2Depts.find((d) => d.n === BUDGET_OFFERS_DEPT);
  /* the market is steered against its Financial / CO₂ Framework line (live); a collection against the sum of its offers */
  const finGlob = kind === "market" && deptLine ? deptLine : { budget, demarque: +w("demarque").toFixed(1), pvm: +w("pvm").toFixed(2), tme: +w("tme").toFixed(1), tmv: +w("tmv").toFixed(1) };
  const co2Glob = kind === "market" && co2Line ? co2Line : { budget: co2, intensite: +(co2 / vol / 1000).toFixed(2), volume: vol };
  return {
    kind, offers, collections: [...new Set(offers.map((o) => o.collection))],
    label: kind === "market" ? `${BUDGET_OFFERS_DEPT} market` : `${collection} collection`,
    line: "Offer", lines: "offers",
    source: kind === "market" ? "Financial Framework (Offers & Collections line)" : "Financial Framework (offer breakdown)",
    co2Source: kind === "market" ? "CO₂ Framework (Offers & Collections line)" : "offer volumes × intensities",
    fin: { glob: finGlob, depts: lines },
    co2: { glob: co2Glob, depts: lines.map((l) => ({ n: l.n, collection: l.collection, budget: l.co2Budget, intensite: l.intensite, volume: l.volume, co2Fac: l.co2Fac, cause: l.cause })) },
  };
}
const MONITORING_VIEWS = [
  { id: "financial", label: "Financial monitoring", icon: Wallet, c: T.accent },
  { id: "co2", label: "CO₂ monitoring", icon: Leaf, c: G },
  { id: "store", label: "Store submissions monitoring", icon: Globe2, c: T.human },
];
function MonitoringPage({ fw, views = ["financial", "co2"], initial, scope = "group" }) {
  const allowed = MONITORING_VIEWS.filter((v) => views.includes(v.id));
  const [view, setView] = useState(initial && views.includes(initial) ? initial : allowed[0].id);
  const [collection, setCollection] = useState(BUDGET_COLLECTIONS[0]);
  const current = allowed.some((v) => v.id === view) ? view : allowed[0].id;
  const sc = useMemo(() => monitoringScope(scope, collection, fw), [scope, collection, fw.budgetDepts, fw.co2Depts]);
  const HEADERS = {
    group: { desc: "Single annual follow-up of the fiscal year: financial and CO₂ trajectories month by month, fed live by the Financial Framework and CO₂ Framework, plus the store submissions confrontation.", expert: { role: "Performance Leader", txt: "Monitors actuals against the phased frameworks, raises alerts and projects the year-end for the Group." } },
    market: { desc: "Market follow-up of the fiscal year: revenue, markdown, TMV and CO₂ trajectories of the Offers & Collections market, offer by offer, plus the store submissions of every country.", expert: { role: "Market Manager", txt: "Steers the market's offers against the Offers & Collections line of the Financial and CO₂ Frameworks — never the Group figures." } },
    collection: { desc: "Collection follow-up of the fiscal year: revenue, markdown, TMV and CO₂ trajectories of one collection, offer by offer, plus the store submissions received for that collection.", expert: { role: "Market Manager", txt: "Steers a single collection of the market against its offer breakdown from the Financial Framework and the country submissions received for its offers." } },
  };
  const hd = HEADERS[sc ? sc.kind : "group"];
  return (
    <div>
      <PageHeader title={sc ? `Monitoring — ${sc.label}` : "Monitoring"} desc={hd.desc} expert={hd.expert} />
      {sc && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "10px 14px", marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase", letterSpacing: 0.5 }}>Perimeter</span>
          {sc.kind === "collection" ? (
            <select value={collection} onChange={(e) => setCollection(e.target.value)} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "6px 10px", color: T.ink, fontSize: 12, fontFamily: SANS, fontWeight: 700, cursor: "pointer", outline: "none" }}>
              {BUDGET_COLLECTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          ) : <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{sc.label}</span>}
          <span style={{ fontSize: 11, color: T.sub, fontFamily: MONO }}>{sc.offers.length} offers · {sc.collections.length} collection{sc.collections.length > 1 ? "s" : ""} · {u(sc.fin.glob.budget)} M€ · {u(Math.round(sc.co2.glob.budget))} t CO₂e</span>
          <span style={{ marginLeft: "auto", fontSize: 10.5, color: T.faint }}>Scoped to the {sc.kind} — Group departments are not shown here</span>
        </div>
      )}
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
      {current === "financial" && <FinancialMonitoring key={sc ? sc.label : "group"} glob={sc ? sc.fin.glob : fw.budgetGlob} depts={sc ? sc.fin.depts : fw.budgetDepts} scope={sc} />}
      {current === "co2" && <CO2Monitoring key={sc ? sc.label : "group"} glob={sc ? sc.co2.glob : fw.co2Glob} depts={sc ? sc.co2.depts : fw.co2Depts} scope={sc} />}
      {current === "store" && <StoreSubmissionsBlock showMonthly title="Store submissions monitoring" offers={sc ? sc.offers : BUDGET_OFFERS} scopeLabel={sc ? sc.label : null} />}
    </div>
  );
}

/* ============================================================
   App — end-to-end and role-based navigation
   ============================================================ */
const ROLE_VIEWS = {
  "Financial Leader": { tabs: ["financial", "monitoring"], monitoring: { views: ["financial"], initial: "financial" } },
  "CSR Leader": { tabs: ["co2", "monitoring"], monitoring: { views: ["co2"], initial: "co2" } },
  "Market Manager": { tabs: ["market", "monitoring"], monitoring: { views: ["financial", "co2", "store"], initial: "financial", scope: "market" } },
  "Product Manager": { tabs: ["product"] },
  "KFI Leader": { tabs: ["itfas"] },
  "IT Data": { tabs: ["ontology"] },
};
/* Revenue committed by the Baby offer (M€) — compared with the Group envelope rule */
const REVENUE_COMMITTED = 43.8;
const ROLES = Object.keys(ROLE_VIEWS);
const TAB_DEFS = {
  ontology: { label: "Ontology", icon: Database },
  framework: { label: "Framework", icon: Scale },
  financial: { label: "Financial Framework", icon: Scale },
  co2: { label: "CO₂ Framework", icon: Leaf },
  market: { label: "Market Framework", icon: Crown },
  product: { label: "Product Manager", icon: Baby },
  itfas: { label: "KFI", icon: Factory },
  monitoring: { label: "Monitoring", icon: TrendingUp },
};
/* End-to-end order: the three framing pages live as sub-tabs of the single Framework tab */
const E2E_TABS = ["ontology", "framework", "product", "itfas", "monitoring"];
const allowedTabs = (mode, role) => (mode === "role" ? ROLE_VIEWS[role].tabs : E2E_TABS);
/* A framework page id (financial, co2, market) maps to the Framework tab in the end-to-end view */
const tabKey = (mode, id) => (mode === "endToEnd" && FRAMEWORK_IDS.includes(id) ? "framework" : id);

export default function App() {
  const [tab, setTab] = useState("ontology");
  const [lastSub, setLastSub] = useState("financial");
  /* every navigation goes through go(): a framework page id also becomes the remembered Framework sub-tab */
  const go = (id) => { if (FRAMEWORK_IDS.includes(id)) setLastSub(id); setTab(id); };
  const [viewMode, setViewMode] = useState("endToEnd");
  const [selectedRole, setSelectedRole] = useState("Financial Leader");
  const [ontology, setOntology] = useState(ONTOLOGY_INITIAL);
  const [selId, setSelId] = useState(PRODUITS[0].id);
  /* Offer agents: one active agent per group (pyramid, product type), each with its target segment */
  const [agentIds, setAgentIds] = useState({ pyramid: "permanent", type: "essentials" });
  const [agentTargets, setAgentTargets] = useState({ pyramid: SEGMENTS[0], type: SEGMENTS[0] });
  const [territoire, setTerritoire] = useState("Core");
  const [zone, setZone] = useState(null);
  const [colIdx, setColIdx] = useState(0);
  /* Per collection structure: material criteria of each colourway reference and indicators entered by hand */
  const [materials, setMaterials] = useState({});
  const [kpiEdits, setKpiEdits] = useState({});
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

  const sel = PRODUITS.find((p) => p.id === selId) || PRODUITS[0];
  const materialsOf = (p) => materials[p.id] || p.coloris.map(() => defaultMaterial(p));
  const scenIdOf = (p) => scenMap[p.id] ?? "mx";
  /* Effective indicators of a collection structure: a value entered by hand overrides the calculated one.
     Cost price and CO₂ weight come from the material criteria; the margin follows PVI and cost price unless entered by hand. */
  const kpisOf = (p) => {
    const m = materialStructure(p, materialsOf(p));
    const sc = p.scenarios.find((x) => x.id === scenIdOf(p)) || p.scenarios[0];
    const e = kpiEdits[p.id] || {};
    const pvi = e.pvi ?? p.prix, rev = e.rev ?? m.rev;
    const marge = pvi > 0 ? Math.round(((pvi - rev) / pvi) * 100) : 0;
    return {
      pvi, rev, marge: e.marge ?? marge, co2: e.co2 ?? m.co2, lead: e.lead ?? sc.lead, vol: e.vol ?? p.volume,
      computed: { pvi: p.prix, rev: m.rev, marge, co2: m.co2, lead: sc.lead, vol: p.volume }, edited: e,
    };
  };
  /* Effective footprint in kg CO₂e / piece */
  const co2Eff = (p) => kpisOf(p).co2;
  /* Collection total in t CO₂e = Σ effective volume × effective footprint / 1000 */
  const collectionCO2 = useMemo(
    () => +PRODUITS.reduce((sum, p) => { const k = kpisOf(p); return sum + (k.vol * k.co2) / 1000; }, 0).toFixed(1),
    [materials, kpiEdits, scenMap]
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
  }, [perfRules, collectionCO2, materials, kpiEdits, scenMap]);

  /* Frozen copy of every choice of an offer at approval time (per product id) */
  const buildSnapshot = (p) => {
    const k = kpisOf(p);
    const sc = p.scenarios.find((x) => x.id === scenIdOf(p)) || p.scenarios[0];
    const agentApplied = Object.fromEntries(AGENT_GROUPS.map((g) => [g.id, agentIds[g.id] && agentApplies(agentTargets[g.id], p) ? agentIds[g.id] : null]));
    return { at: new Date(), name: p.name, segment: p.segment, pvi: k.pvi, volume: k.vol, revient: k.rev, marge: k.marge, co2: k.co2, lead: k.lead, territoire, zone, agentIds: { ...agentIds }, agentTargets: { ...agentTargets }, agentApplied, scenId: sc.id, scenName: sc.name, colIdx, coloris: p.coloris[colIdx] ? `${p.coloris[colIdx][0]} (${p.id.toUpperCase()}-${String(colIdx + 1).padStart(2, "0")})` : null, materials: materialsOf(p).map((m) => ({ ...m })), edits: { ...k.edited }, sheet: sheets[p.id] || null };
  };
  const setKpi = (id, f, v) => setKpiEdits((m) => { const e = { ...(m[id] || {}) }; if (v == null) delete e[f]; else e[f] = v; return { ...m, [id]: e }; });

  const st = {
    selId, setSelId: (id) => { setSelId(id); setColIdx(0); setNote(""); }, sel,
    agentIds, setAgent: (g, id) => setAgentIds((m) => ({ ...m, [g]: id })),
    agentTargets, setAgentTarget: (g, t) => setAgentTargets((m) => ({ ...m, [g]: t })),
    territoire, setTerritoire, zone, setZone,
    colIdx, setColIdx, note, setNote,
    perfRules, setPerfRules, collectionCO2, breaches,
    submitted, validated, returned, approved, rejected,
    kpisOf, setKpi,
    materialsOf,
    /* a new material criterion recalculates cost price and CO₂ weight: their manual values give way to the calculation */
    setMaterial: (id, i, f, v) => {
      const p = PRODUITS.find((x) => x.id === id);
      setMaterials((m) => { const list = (m[id] || p.coloris.map(() => defaultMaterial(p))).map((x, j) => (j === i ? { ...x, [f]: v } : x)); return { ...m, [id]: list }; });
      setKpiEdits((m) => { const e = { ...(m[id] || {}) }; delete e.rev; delete e.co2; return { ...m, [id]: e }; });
    },
    co2Of: co2Eff,
    revOf: (p) => kpisOf(p).rev,
    leadOf: (sc) => sc.lead,
    rupOf: (sc) => sc.rupture,
    pvcOf: (p) => kpisOf(p).pvi,
    volOf: (p) => kpisOf(p).vol,
    scenOf: scenIdOf,
    recoFor: (p) => p.scenarios.find((x) => x.id === "mx"),
    statutOf: (p) => (validated.has(p.id) ? "Validated" : p.statut),
    setPvc: (id, v) => setKpi(id, "pvi", v),
    setVol: (id, v) => setKpi(id, "vol", v),
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
    reopen: (id) => { const sn = snapshots[id]; if (sn) { setAgentIds({ ...sn.agentIds }); setAgentTargets({ ...sn.agentTargets }); setTerritoire(sn.territoire); setZone(sn.zone); setColIdx(sn.colIdx); setMaterials((m) => ({ ...m, [id]: sn.materials.map((x) => ({ ...x })) })); setKpiEdits((m) => ({ ...m, [id]: { ...sn.edits } })); setScenMap((m) => ({ ...m, [id]: sn.scenId })); } setReopened((r) => new Set(r).add(id)); setNote(""); },
    setSheet: (id, info) => setSheets((m) => ({ ...m, [id]: info })),
    marketBrief, setMarketBrief, setTab: go,
  };
  const fw = { budgetGlob, setBudgetGlob, budgetDepts, setBudgetDepts, co2Glob, setCo2Glob, co2Depts, setCo2Depts };

  /* Visible tabs: the end-to-end list or only the role's tabs in role view; the active tab can never be a hidden one */
  const visibleTabs = useMemo(() => allowedTabs(viewMode, selectedRole).map((id) => ({ id, ...TAB_DEFS[id] })), [viewMode, selectedRole]);
  const tabId = tabKey(viewMode, tab);
  const activeTab = visibleTabs.some((t) => t.id === tabId) ? tabId : visibleTabs[0].id;
  const frameworkSub = FRAMEWORK_IDS.includes(tab) ? tab : lastSub;
  const selectMode = (m) => { setViewMode(m); const a = allowedTabs(m, selectedRole); if (!a.includes(tabKey(m, tab))) setTab(a[0] === "framework" ? lastSub : a[0]); };
  const selectRole = (r) => { setSelectedRole(r); const a = allowedTabs("role", r); if (!a.includes(tab)) setTab(a[0]); };
  const roleMon = viewMode === "role" ? ROLE_VIEWS[selectedRole].monitoring : null;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: SANS, color: T.ink }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 18px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
          <WhiteBadge><img src={KIABI_LOGO} alt="Kiabi" style={{ height: 26, width: "auto", display: "block" }} /></WhiteBadge>
          <div style={{ fontSize: 16, fontWeight: 800, color: T.ink }}>KIABI Control Tower</div>
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
              <button key={t.id} onClick={() => go(t.id === "framework" ? frameworkSub : t.id)} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", background: on ? T.accent : T.panel, color: on ? "#ffffff" : T.sub, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 10, padding: "9px 15px", fontSize: 12.5, fontWeight: 700, fontFamily: SANS }}>
                <t.icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>
        {activeTab === "ontology" && <OntologyPage st={st} ontology={ontology} setOntology={setOntology} />}
        {activeTab === "framework" && <FrameworkPage st={st} fw={fw} sub={frameworkSub} setSub={go} />}
        {activeTab === "financial" && <BudgetPage st={st} fw={fw} />}
        {activeTab === "co2" && <CO2Page fw={fw} />}
        {activeTab === "market" && <MarketFrameworkPage st={st} />}
        {activeTab === "product" && <ProductManagerPage st={st} />}
        {activeTab === "itfas" && <ProductionPage st={st} />}
        {activeTab === "monitoring" && <MonitoringPage key={viewMode + selectedRole} fw={fw} views={roleMon ? roleMon.views : ["financial", "co2"]} initial={roleMon ? roleMon.initial : "financial"} scope={roleMon ? roleMon.scope || "group" : "group"} />}
      </div>
    </div>
  );
}
