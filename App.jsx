import { useState, useMemo } from "react";
import { Layers, Target, Leaf, Check, Wallet, TrendingUp, Tag, Boxes, GitBranch, Globe2, Factory, ClipboardList, Sparkles, ShoppingBag, Truck, Send, RotateCcw, X, Heart, Star, ArrowRight, Baby, FileText, Box, BadgeCheck, MessageCircle, Wrench, Scale, Users, Palette, SpellCheck, Network, UserCog, Crown, Mic, Play, Database, Building2, Handshake, Award, ShieldCheck, TrendingDown, LayoutGrid, Triangle } from "lucide-react";

/* ============================================================
   Thème (fond blanc · bleus Kiabi)
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
   SOURCE UNIQUE : les 12 produits de la collection Bébé (PDF)
   ============================================================ */
const mkScen = (rv) => ([
  { id: "gi", name: "Grand import Asie", mix: "100% grand import", cost: +(rv * 0.92).toFixed(2), lead: 75, rupture: 6, splitProche: 10, usine: "Dhaka · Bangladesh", maitrise: "coût", note: "Coût minimal, mais délai long et empreinte transport élevée." },
  { id: "mx", name: "Mix équilibré", mix: "60% import · 40% proche", cost: +rv.toFixed(2), lead: 45, rupture: 4, splitProche: 40, usine: "Izmir · Turquie", maitrise: "équilibre", note: "Compromis coût / réactivité recommandé en conditions standard.", reco: true },
  { id: "px", name: "Proximité Euromed", mix: "85% sourcing proche", cost: +(rv * 1.12).toFixed(2), lead: 21, rupture: 2, splitProche: 85, usine: "Tanger · Maroc", maitrise: "réactivité & CO₂", note: "Délai court, réassort piloté, empreinte transport minimale." },
]);
const P = (id, name, img, color, segment, pieces, prix, compo, volume, implantation, statut, co2, coloris, persona) => ({
  id, name, img, color, segment, pieces, prix, compo, volume, implantation, statut, co2, persona,
  revient: +(prix * 0.42).toFixed(2), scenarios: mkScen(prix * 0.42), coloris,
});
const PRODUITS_BASE = [
  P("p1", "Lot de 2 dors-bien en maille pointelle épaisse", "🌙", "#c98a5b", "Nuit", 2, 15, "100% coton", 320000, "13-06-2026", "Validée", 1.6, [["Camel pois", "#c98a5b"], ["Écru", "#efe9dc"]], "Client actuel"),
  P("p2", "Pyjama en velours avec pieds et animation devant", "🧸", "#7fae9e", "Nuit", 1, 4, "77% coton · 23% polyester", 410000, "07-06-2026", "En cours", 2.1, [["Vert sauge", "#7fae9e"], ["Vert sapin", "#2e6b4f"], ["Rose", "#e8a7b7"]], "Client actuel"),
  P("p3", "Dors bien 'Renard' avec ouverture pressionnée au dos", "🦊", "#e8e2d2", "Nuit", 1, 9, "100% coton", 385000, "07-06-2026", "Validée", 1.4, [["Beige imprimé", "#e8e2d2"], ["Bleu", "#3a5fd8"], ["Bordeaux", "#8d2f42"]], "Client actuel"),
  P("p4", "Pyjama dors-bien léger zippé à manches courtes", "🚀", "#3a6fd8", "Nuit", 1, 9, "100% coton", 295000, "30-05-2026", "En cours", 1.3, [["Bleu fusée", "#3a6fd8"], ["Rose", "#e8a7b7"], ["Jaune", "#e8d24a"]], "Client trendy"),
  P("p5", "Ensemble de pyjama 2 pièces avec pieds", "🌸", "#f4c9c4", "Nuit", 2, 13, "64% polyester · 33% coton · 3% élasthanne", 265000, "12-06-2026", "En cours", 2.4, [["Rose poudré", "#f4c9c4"], ["Écru fleuri", "#f3ede0"]], "Client actuel"),
  P("p6", "Lot de 3 bodies à manches longues ouverture pressionnée", "🩱", "#d98a9c", "Sous-vêtements", 3, 10, "100% coton", 520000, "06-06-2026", "Validée", 1.2, [["Vieux rose", "#d98a9c"], ["Rayé", "#d9c1c8"], ["Écru fleuri", "#f3ede0"]], "Client rationnel"),
  P("p7", "Lot de 3 bodies sans manches", "🤍", "#e8ddc8", "Sous-vêtements", 3, 9, "100% coton", 480000, "09-06-2026", "Validée", 1.0, [["Terracotta", "#c47a55"], ["Rayé menthe", "#cfe4da"], ["Carreaux", "#e8ddc8"]], "Client rationnel"),
  P("p8", "Bodies évolutif en maille unie - Lot de 3", "🌱", "#b0527a", "Sous-vêtements", 3, 9, "100% coton", 445000, "04-06-2026", "À développer", 1.1, [["Fuchsia", "#b0527a"], ["Vert d'eau", "#a8c8bb"], ["Écru", "#efe9dc"]], "Client rationnel"),
  P("p9", "Body avec collerette en dentelle", "🪞", "#e9c9a8", "Sous-vêtements", 1, 6, "100% coton", 190000, "07-06-2026", "En cours", 0.9, [["Nude", "#e9c9a8"], ["Écru", "#efe9dc"]], "Client trendy"),
  P("p10", "Lot de 2 bodies 'Minnie'", "🎀", "#9fc4ae", "Licences", 2, 12, "100% coton", 210000, "08-06-2026", "En cours", 1.2, [["Vert amande", "#9fc4ae"], ["Écru imprimé", "#f3ede0"]], "Client trendy"),
  P("p11", "Barboteuse sans manches imprimé 'Marvel'", "🕷️", "#8fb6dd", "Licences", 1, 9, "100% coton", 150000, "10-06-2026", "À développer", 1.1, [["Bleu ciel", "#8fb6dd"]], "Client trendy"),
  P("p12", "Ensemble body + chapeau 'Bambi' 'Disney' - 2 pièces", "🦌", "#f0e6da", "Licences", 2, 13, "100% coton", 175000, "10-06-2026", "Validée", 1.5, [["Parme", "#d9cce8"], ["Écru", "#f0e6da"]], "Client actuel"),
];

/* Axes d'équilibre : [focus type de produit, étage de pyramide] */
const AXES = {
  p1: ["Essentiels", "Basiques"],
  p2: ["Coups de cœur", "Seasonal"],
  p3: ["Essentiels", "Permanents"],
  p4: ["Singuliers", "Seasonal"],
  p5: ["Essentiels", "Basiques"],
  p6: ["Best seller", "Permanents"],
  p7: ["Essentiels", "Permanents"],
  p8: ["Best seller", "Permanents"],
  p9: ["Singuliers", "Top"],
  p10: ["Collab", "Top"],
  p11: ["Collab", "Seasonal"],
  p12: ["Collab", "Top"],
};
const PRODUITS = PRODUITS_BASE.map((p) => ({ ...p, focus: AXES[p.id][0], pyramide: AXES[p.id][1] }));

const FOCUS_DEF = [
  { n: "Essentiels", c: "#0053A0", target: "30 – 40 %", min: 30, max: 40, role: "socle de l'offre, disponible en permanence" },
  { n: "Best seller", c: "#4B90CD", target: "22 – 30 %", min: 22, max: 30, role: "moteurs de volume et de trafic" },
  { n: "Coups de cœur", c: "#7fae9e", target: "15 – 22 %", min: 15, max: 22, role: "achat plaisir, animation du rayon" },
  { n: "Singuliers", c: "#c98a5b", target: "8 – 14 %", min: 8, max: 14, role: "pièces différenciantes, signature marque" },
  { n: "Collab", c: "#b0527a", target: "10 – 16 %", min: 10, max: 16, role: "licences et partenariats" },
];
const PYRAMIDE_DEF = [
  { n: "Permanents", c: "#0053A0", target: "40 – 50 %", min: 40, max: 50, role: "base de la pyramide, jamais en rupture" },
  { n: "Basiques", c: "#4B90CD", target: "15 – 22 %", min: 15, max: 22, role: "reconduits d'une saison à l'autre" },
  { n: "Seasonal", c: "#7fa3c4", target: "18 – 28 %", min: 18, max: 28, role: "rythme de la saison, sorties datées" },
  { n: "Top", c: "#d98a9c", target: "≤ 12 %", min: 0, max: 12, role: "sommet de gamme, forte image, faible profondeur" },
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
  { id: "petitprix", name: "Offre petit prix", icon: Tag, color: "#0053A0", desc: "Accessibilité maximale : PVI plancher et lots malins pour toutes les familles." },
  { id: "essentiel", name: "Essentiels du quotidien", icon: Layers, color: "#4B90CD", desc: "Basiques layette incontournables : bodies, dors-bien, disponibilité permanente." },
  { id: "confort", name: "Confort & douceur", icon: Heart, color: "#0053A0", desc: "Matières douces certifiées, coutures plates, bien-être de bébé en priorité." },
  { id: "licences", name: "Licences & personnages", icon: Star, color: "#4B90CD", desc: "Disney, Marvel et héros préférés : différenciation et achat plaisir." },
  { id: "specialiste", name: "Offre spécialiste", icon: Target, color: "#7fa3c4", desc: "Expertise puériculture : évolutif, ouvertures faciles, savoir-faire dédié." },
  { id: "bascarbone", name: "Bas carbone", icon: Leaf, color: "#3fb27f", desc: "Empreinte minimisée : matières recyclées, sourcing proche et procédés sobres." },
];
const AMELIO = [
  { id: "prix", name: "Agent prix de revient", icon: Wallet, color: "#0053A0", levers: [
    { id: "neg", t: "Renégociation matière coton", effect: "−0,18 € /pc", d: { rev: -0.18 } },
    { id: "lot", t: "Optimisation du lot d'achat", effect: "−0,09 € /pc", d: { rev: -0.09 } },
  ]},
  { id: "co2", name: "Agent CO₂", icon: Leaf, color: "#3fb27f", levers: [
    { id: "rec", t: "Coton recyclé 30 %", effect: "−0,3 kg /pc", d: { co2: -0.3 } },
    { id: "mer", t: "Fret maritime lent", effect: "−0,2 kg /pc", d: { co2: -0.2 } },
  ]},
  { id: "appro", name: "Agent approvisionnement", icon: Truck, color: "#4B90CD", levers: [
    { id: "pha", t: "Phasage anticipé matière", effect: "−6 j de délai", d: { lead: -6 } },
    { id: "dbl", t: "Double sourcing", effect: "−1,5 pt de rupture", d: { rup: -1.5 } },
  ]},
];
const ZONES = ["Zone Nord", "Zone Sud", "Zone Maghreb", "Zone Moyen Orient", "Zones Tropiques"];
const SEGMENTS = ["Toutes les structures de collection", "Nuit", "Sous-vêtements", "Licences"];
const EXPERTS = {
  design: { role: "Décideur métier", txt: "Le chef de produit Sécurise les grands équilibres de la structure commerciale de son offre." },
  assistante: { role: "Décideur métier", txt: "L'assistante chef de produit assure le bon référencement des produits créés par la chef de produit, jusqu'à l'écriture complète dans le PLM." },
  directrice: { role: "Décideur métier", txt: "Le chef de marché garantit l'équilibre global de la collection constituée par les chefs de produit." },
  supply: { role: "Décideur métier", txt: "Le leader Go to Market valide les scénarios d'approvisionnement en prenant en compte le coût complet." },
};

/* ---- Données de la collection (périmètre directrice) ---- */
const CDP_CONTRIB = [
  { name: "CDP Bébé (ce cockpit)", ca: 43.8, budget: 60, color: "#0053A0" },
  { name: "CDP Fille 2-14", ca: 48.1, budget: 65, color: "#4B90CD" },
  { name: "CDP Garçon 2-14", ca: 39.5, budget: 55, color: "#7fa3c4" },
];
const COLOR_MIX = [
  { n: "Écru / beige", pct: 30, c: "#efe9dc" }, { n: "Rose", pct: 17, c: "#e8a7b7" },
  { n: "Bleu", pct: 15, c: "#4B90CD" }, { n: "Vert sauge", pct: 13, c: "#7fae9e" },
  { n: "Camel", pct: 10, c: "#c98a5b" }, { n: "Multicolore", pct: 9, c: "#d9cce8" },
  { n: "Noir", pct: 6, c: "#2a2f36" },
];
const TEXTES = [
  { txt: "my baby's cosy snack", prod: "Pyjama en velours", ok: true },
  { txt: "petit ♥ d'amour", prod: "Lot de 2 bodies Saint-valentin", ok: true },
  { txt: "MORE HUGS", prod: "Pyjama en velours avec pieds", ok: true },
  { txt: "Sweet dreams my litle", prod: "Pyjama dors bien à manches longues", ok: false, fix: "« little » — faute détectée, correction à demander au fournisseur" },
  { txt: "POWH !", prod: "Dors-bien croisée 'Winnie'", ok: false, fix: "infographie non conforme au guide de licence — vérifier avec Disney" },
];
const CANAUX = [
  { n: "Omnicanal", pct: 62, target: "≥ 60 %", okv: true },
  { n: "Physique seul", pct: 28, target: "≤ 30 %", okv: true },
  { n: "Speci web", pct: 10, target: "≤ 12 %", okv: true },
  { n: "France", pct: 70, target: "—", okv: true },
  { n: "International", pct: 30, target: "≥ 35 %", okv: false },
];

/* ---- Budget & Arbitrage — rituel budgétaire annuel Kiabi ---- */
const BUDGET_GLOBAL = { budget: 2100, demarque: 28, pvm: 12.9, tme: 58, tmv: 51 };
const BUDGET_DEPTS = [
  { n: "Offres & Collections", resp: "Directrice offre", budget: 1050, demarque: 27, pvm: 12.9, tme: 58, tmv: 51.5 },
  { n: "Opérations", resp: "Directeur opérations", budget: 420, demarque: 29, pvm: 12.5, tme: 57, tmv: 49.8 },
  { n: "KFI - Kiabi Fashion Industry", resp: "Directeur KFI", budget: 210, demarque: 26, pvm: 13.4, tme: 59, tmv: 52.8 },
  { n: "Retail", resp: "Directeur retail", budget: 420, demarque: 30, pvm: 12.7, tme: 58, tmv: 50.6 },
];
/* Copies remontées (bottom-up) : 2 cohérentes, Opérations en écart budget (+15 %, total +3 %), Retail en incohérence de chaîne */
const BUDGET_COPIES = [
  { n: "Offres & Collections", budget: 1050, demarque: 27, pvm: 12.9, tme: 58, tmv: 51.5 },
  { n: "Opérations", budget: 483, demarque: 29, pvm: 12.5, tme: 57, tmv: 49.8 },
  { n: "KFI - Kiabi Fashion Industry", budget: 210, demarque: 26, pvm: 13.4, tme: 59, tmv: 52.8 },
  { n: "Retail", budget: 420, demarque: 30, pvm: 12.7, tme: 58, tmv: 55 },
];
const MOIS = ["Sept.", "Oct.", "Nov.", "Déc.", "Janv.", "Févr.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août"];
const MOIS_LONG = ["septembre", "octobre", "novembre", "décembre", "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août"];
const PHASAGE_CA = [9, 8, 9, 14, 8, 6, 7, 8, 8, 8, 9, 6];          /* % du budget annuel — pics Noël, rentrée, soldes */
const PHASAGE_DEM = [1, -2, -3, -4, 4, 1, -2, -1, 0, 0, 5, 2];     /* ajustement saisonnier de la démarque (points) */
const REEL_DEM_ECART = { "Offres & Collections": () => 0.4, "Opérations": () => 1.2, "KFI - Kiabi Fashion Industry": () => -0.5, "Retail": (m) => (m >= 4 ? 4 : 0.5) };
const REEL_CA_FACTEUR = { "Offres & Collections": () => 1.015, "Opérations": () => 0.985, "KFI - Kiabi Fashion Industry": () => 1.01, "Retail": (m) => (m < 4 ? 0.99 : +(0.99 - 0.01 * (m - 3)).toFixed(3)) };
/* Modèle de chaîne marge Kiabi (simplifié) : la démarque est une part du CA soldé, remise moyenne 50 %
   prix net = PVM × (1 − démarque/2) · coût = PVM × (1 − TME) · TMV = 1 − coût / prix net */
const tmvModel = (tme, dem) => +((1 - (1 - tme / 100) / (1 - dem / 200)) * 100).toFixed(1);
const tmeModel = (tmv, dem) => +((1 - (1 - tmv / 100) * (1 - dem / 200)) * 100).toFixed(1);
const fr1 = (n) => Number(n).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
const fr2 = (n) => Number(n).toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ---- Budget & Arbitrage CO₂ — même rituel appliqué au carbone ----
   Ordres de grandeur cohérents avec l'artefact : ≈ 1,4 kg CO₂e / pièce (collection Bébé 5 376 t pour 3,85 M pièces).
   Budget (t) = volume (M pièces) × intensité (kg/pièce) × 1000. */
const CO2_GLOBAL = { budget: 224000, intensite: 1.4, volume: 160 };
const CO2_DEPTS = [
  { n: "Offres & Collections", resp: "Directrice offre", budget: 112000, intensite: 1.4, volume: 80, mixInt: 1.4 },
  { n: "Opérations", resp: "Directeur opérations", budget: 46400, intensite: 1.45, volume: 32, mixInt: 1.45 },
  { n: "KFI - Kiabi Fashion Industry", resp: "Directeur KFI", budget: 20000, intensite: 1.25, volume: 16, mixInt: 1.25 },
  { n: "Retail", resp: "Directeur retail", budget: 45600, intensite: 1.425, volume: 32, mixInt: 1.425 },
];
/* Copies remontées : 2 cohérentes, Opérations en écart simple (volumes surplanifiés → total +4 %), Retail en incohérence (intensité trop basse vs mix produit → budget sous-estimé) */
const CO2_COPIES = [
  { n: "Offres & Collections", budget: 112000, intensite: 1.4, volume: 80 },
  { n: "Opérations", budget: 61480, intensite: 1.45, volume: 42.4 },
  { n: "KFI - Kiabi Fashion Industry", budget: 20000, intensite: 1.25, volume: 16 },
  { n: "Retail", budget: 40000, intensite: 1.25, volume: 32 },
];
const PHASAGE_CO2 = [9, 11, 12, 6, 6, 7, 9, 8, 10, 10, 6, 6];  /* % des émissions annuelles — pics de production avant Noël et avant les soldes */
const REEL_CO2_FACTEUR = { "Offres & Collections": () => 0.99, "Opérations": (m) => (m >= 6 ? 1.1 : 1.01), "KFI - Kiabi Fashion Industry": () => 0.98, "Retail": (m) => (m >= 9 ? 1.03 : 1.005) };
const CO2_CAUSES = { "Offres & Collections": "part de matière recyclée conforme", "Opérations": "transport aérien en hausse", "KFI - Kiabi Fashion Industry": "process industriel optimisé", "Retail": "consommation énergie magasins en hausse" };
const CO2_LEVIERS = [
  { n: "Matière", desc: "+10 pts de coton recyclé sur les bodies", pct: 6, c: "#3fb27f" },
  { n: "Transport", desc: "bascule aérien → maritime sur 3 flux", pct: 3, c: "#4B90CD" },
  { n: "Énergie", desc: "contrat renouvelable sur 40 magasins", pct: 2, c: "#0053A0" },
];

/* ============================================================
   Petits composants
   ============================================================ */
const Chip = ({ color, children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", fontSize: 10.5, fontWeight: 700, fontFamily: MONO, color, background: `${color}1c`, border: `1px solid ${color}55`, padding: "2px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>{children}</span>
);
const StatutChip = ({ s }) => {
  const c = s === "Validée" ? T.ok : s === "En cours" ? T.blue : T.warn;
  return <Chip color={c}>{s}</Chip>;
};
const VerdictChip = ({ v }) => {
  const c = v === "Conforme" ? T.ok : v === "Alerte" ? T.warn : T.bad;
  return <Chip color={c}>{v}</Chip>;
};
const microLbl = { display: "block", fontSize: 10, color: T.faint, fontFamily: MONO, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 8 };
const WhiteBadge = ({ children }) => (
  <span style={{ display: "inline-flex", alignItems: "center", background: "#ffffff", border: `1px solid ${T.line}`, borderRadius: 9, padding: "5px 10px" }}>{children}</span>
);

function PMGauge({ icon: Icon, label, used, total, unit, fmt, color }) {
  const pct = Math.min(100, (used / total) * 100);
  const f = fmt || ((n) => u(n));
  return (
    <div style={{ flex: "1 1 190px", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, color: T.sub, fontSize: 11.5, fontWeight: 600 }}><Icon size={14} color={color} />{label}</div>
      <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 600, color: T.ink, marginTop: 7 }}>{f(used)} <span style={{ fontSize: 11.5, color: T.faint }}>/ {f(total)} {unit}</span></div>
      <div style={{ height: 6, background: T.line, borderRadius: 99, marginTop: 9, overflow: "hidden" }}><div style={{ width: pct + "%", height: "100%", background: color, borderRadius: 99 }} /></div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5, fontSize: 10, fontFamily: MONO, color: T.faint }}>
        <span>engagé {Math.round(pct)}%</span><span>reste {f(+(total - used).toFixed(2))} {unit}</span>
      </div>
    </div>
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
          <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Stratégie « Bas carbone » active sur l'offre Bébé</span>
          <Chip color={T.ok}>Agent d'offre Bas carbone</Chip>
        </div>
        <div style={{ fontSize: 12, color: T.sub, lineHeight: 1.5, marginTop: 3 }}>
          {context === "gtm"
            ? <>L'arbitrage privilégie le sourcing le plus local : scénario « {lc.name} » ({lc.mix}) priorisé · empreinte ramenée à <span style={{ fontFamily: MONO }}>{st.co2Of(prod)} kg/pc</span>.</>
            : <>La recommandation supply est biaisée vers le scénario le plus local « {lc.name} » · coût rendu <span style={{ fontFamily: MONO }}>{eur(lc.cost)}/pc</span> · maîtrise {lc.maitrise}.</>}
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
   Onglet Chef de produit (page existante)
   ============================================================ */
const SORT_FIELDS = [
  { k: "name", label: "Structure de collection" }, { k: "segment", label: "Segment" },
  { k: "pieces", label: "Pièces" }, { k: "prix", label: "PVI" }, { k: "volume", label: "Volume" },
  { k: "implantation", label: "Implantation" }, { k: "statut", label: "Statut" },
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

  return (
    <div>
      {/* ---- Cockpit chef de produit ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Baby size={16} color={T.accent} /><span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Cockpit chef de produit — Offre Bébé</span>
        </div>
        <span style={microLbl}>État du budget</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <PMGauge icon={Wallet} label="Budget chiffre d'affaires" used={43.8} total={st.perfRules.caEnvelope} unit="M€" fmt={(n) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} color={T.accent} />
          <PMGauge icon={Leaf} label="Budget CO₂" used={st.collectionCO2} total={st.perfRules.carbonEnvelope} unit="t CO₂e" fmt={(n) => u(Math.round(n))} color={st.collectionCO2 > st.perfRules.carbonEnvelope ? T.bad : T.ok} />
        </div>
        <span style={microLbl}>Offre en cours</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <PMGauge icon={TrendingUp} label="TME — taux de marge entrée" used={55} total={60} unit="%" fmt={(n) => n.toLocaleString("fr-FR")} color={T.human} />
          <PMGauge icon={Tag} label="PVI — prix de vente initial" used={7} total={8.5} unit="€" fmt={(n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} color={T.accent} />
          <PMGauge icon={Boxes} label="Quantités" used={8.5} total={10} unit="M" fmt={(n) => n.toLocaleString("fr-FR")} color={T.blue} />
          <PMGauge icon={Layers} label="Nombre de références coloris" used={500} total={600} unit="réf. co" fmt={(n) => u(n)} color={T.human} />
          <PMGauge icon={GitBranch} label="Quantités à la référence coloris" used={20000} total={24000} unit="p" fmt={(n) => u(n)} color={T.silver} />
        </div>
      </div>

      {/* ---- Structuration de l'offre ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          <ClipboardList size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Structuration de l'offre — Statut de l'offre</span>
          <span style={{ fontSize: 11, color: T.faint }}>cliquez une structure de collection pour voir l'agent appliqué et la décliner en produits</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: T.faint, fontFamily: MONO }}>Trier par :
            <select value={sortK} onChange={(e) => setSortK(e.target.value)} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 7, padding: "4px 8px", color: T.ink, fontSize: 11, fontFamily: SANS, fontWeight: 700, cursor: "pointer", outline: "none" }}>
              {SORT_FIELDS.map((f) => <option key={f.k} value={f.k}>{f.label}</option>)}
            </select>
          </span>
        </div>
        <div style={{ maxHeight: 330, overflowY: "auto", overflowX: "auto", border: `1px solid ${T.lineSoft}`, borderRadius: 10 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr>
              {["Structure de collection", "Segment", "Pièces", "Volume", "Implantation", "Statut"].map((c, j) => (
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
                    <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}><Chip color={p.segment === "Nuit" ? T.accent : p.segment === "Licences" ? T.human : T.silver}>{p.segment}</Chip></td>
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
        <div style={{ marginTop: 8, fontSize: 11, color: T.faint, fontFamily: MONO }}>{sorted.length} structures de collection dans la collection Bébé · faites défiler pour tout voir</div>

        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
          <Sparkles size={15} color={T.human} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Agents d'offre — un seul actif à la fois</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10.5, color: T.faint, fontFamily: MONO }}>Appliquer à :
            <select value={target} onChange={(e) => setTarget(e.target.value)} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 7, padding: "4px 8px", color: T.ink, fontSize: 11, fontFamily: SANS, fontWeight: 700, cursor: "pointer", outline: "none" }}>
              {SEGMENTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(215px,1fr))", gap: 10 }}>
          {AGENTS.map((a) => {
            const on = st.agentId === a.id;
            return (
              <button key={a.id} onClick={() => st.setAgentId(on ? null : a.id)} style={{ textAlign: "left", cursor: "pointer", background: on ? `${a.color}12` : T.panel2, border: `1px solid ${on ? a.color : T.line}`, borderRadius: 11, padding: "11px 12px" }}>
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
            <Globe2 size={15} color={T.human} /><span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>Assortiment International</span>
            <span style={{ fontSize: 11, color: T.faint }}>déploiement de l'offre sur le réseau</span>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Core", "Spécifique"].map((opt) => {
              const on = st.territoire === opt;
              return (
                <button key={opt} onClick={() => { st.setTerritoire(opt); if (opt === "Core") st.setZone(null); }} style={{ flex: "1 1 220px", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "flex-start", gap: 10, background: on ? `${T.human}12` : T.panel2, border: `1px solid ${on ? T.human : T.line}`, borderRadius: 10, padding: "11px 12px" }}>
                  <span style={{ width: 18, height: 18, borderRadius: 6, flexShrink: 0, marginTop: 1, display: "grid", placeItems: "center", background: on ? T.human : "transparent", border: `1.5px solid ${on ? T.human : T.faint}` }}>{on && <Check size={12} color="#ffffff" />}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{opt}</div>
                    <div style={{ fontSize: 10.5, color: T.faint, marginTop: 2, lineHeight: 1.4 }}>{opt === "Core" ? "Offre commune à l'ensemble du réseau, sans déclinaison régionale." : "Offre déclinée pour une zone géographique précise."}</div>
                  </div>
                </button>
              );
            })}
          </div>
          {st.territoire === "Spécifique" && (
            <div style={{ marginTop: 12 }}>
              <span style={microLbl}>Zone ciblée — une seule à la fois</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {ZONES.map((z) => {
                  const on = st.zone === z;
                  return (
                    <button key={z} onClick={() => st.setZone(on ? null : z)} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", background: on ? `${T.human}12` : T.panel2, border: `1px solid ${on ? T.human : T.line}`, borderRadius: 999, padding: "7px 13px", fontSize: 12, fontWeight: 700, fontFamily: SANS, color: on ? T.ink : T.sub }}>
                      <span style={{ width: 15, height: 15, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", background: on ? T.human : "transparent", border: `1.5px solid ${on ? T.human : T.faint}` }}>{on && <Check size={10} color="#ffffff" />}</span>
                      {z}
                    </button>
                  );
                })}
              </div>
              {!st.zone && <div style={{ fontSize: 11, color: T.faint, marginTop: 8 }}>Sélectionnez une zone pour décliner l'offre.</div>}
            </div>
          )}
        </div>

        <div style={{ marginTop: 12, padding: "11px 13px", background: T.panel, border: `1px solid ${T.accent}55`, borderRadius: 10, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, color: T.ink }}>Agent appliqué à <strong>« {sel.name} »</strong> :</span>
          {agentApplies ? <Chip color={agent.color}>{agent.name}</Chip> : <span style={{ fontSize: 11.5, color: T.faint }}>aucun agent actif sur ce segment</span>}
          <span style={{ marginLeft: "auto", fontSize: 11, color: T.faint, fontFamily: MONO }}>→ déclinée en {sel.coloris.length} réf. coloris dans « Travail en cours »</span>
        </div>
      </div>

      {/* ---- Travail en cours ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Layers size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Travail en cours</span>
          <span style={{ fontSize: 11.5, color: T.faint }}>déclinaison coloris de la structure de collection sélectionnée</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: 10, display: "grid", placeItems: "center", fontSize: 20, background: `${sel.color}33`, border: `1px solid ${sel.color}88` }}>{sel.img}</span>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Structure de collection : {sel.name}</div>
            <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}>{sel.segment} · {sel.compo} · implantation {sel.implantation} · {sel.persona}</div>
          </div>
        </div>
        <span style={microLbl}>Références coloris — sélectionnez celle qui pilote l'offre</span>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {sel.coloris.map(([n, c], i) => {
            const on = st.colIdx === i;
            return (
              <button key={n} onClick={() => st.setColIdx(i)} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", background: on ? `${T.accent}10` : T.panel2, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 999, padding: "7px 13px", fontSize: 12, fontWeight: 700, color: on ? T.ink : T.sub }}>
                <span style={{ width: 14, height: 14, borderRadius: 99, background: c, border: `1px solid ${T.line}` }} />{n}
                <span style={{ fontFamily: MONO, fontSize: 10, color: T.faint }}>{sel.id.toUpperCase()}-{String(i + 1).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
        <span style={microLbl}>Indicateurs de la structure de collection</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { label: "PVI", val: eur(st.pvcOf(sel)), icon: Tag, color: T.accent },
            { label: "Prix de revient", val: eur(st.revOf(sel)), icon: Wallet, color: T.blue },
            { label: "Marge", val: marge + " %", icon: TrendingUp, color: T.human },
            { label: "Poids CO₂ / pièce", val: st.co2Of(sel) + " kg", icon: Leaf, color: T.ok },
            { label: "Délai appro", val: st.leadOf(reco) + " j", icon: Truck, color: T.silver },
            { label: "Volume", val: u(st.volOf(sel)) + " u.", icon: Boxes, color: T.silver },
          ].map((s) => (
            <div key={s.label} style={{ flex: "1 1 130px", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "11px 13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: T.sub, fontSize: 11, fontWeight: 600 }}><s.icon size={13} color={s.color} />{s.label}</div>
              <div style={{ fontFamily: MONO, fontSize: 17, fontWeight: 600, color: T.ink, marginTop: 5 }}>{s.val}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Agents d'amélioration ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Wrench size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Agents d'amélioration</span>
        </div>
        <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, margin: "0 0 12px" }}>Trois agents scannent le produit sélectionné et proposent des leviers pour améliorer le prix de revient, l'impact CO₂ et le délai d'approvisionnement. Activez / désactivez une piste pour voir l'effet simulé sur les indicateurs ci-dessus.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 12 }}>
          {AMELIO.map((ag) => (
            <div key={ag.id} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 13px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 26, height: 26, borderRadius: 7, display: "grid", placeItems: "center", background: `${ag.color}1c`, border: `1px solid ${ag.color}55` }}><ag.icon size={14} color={ag.color} /></span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>{ag.name}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {ag.levers.map((lv) => {
                  const on = st.levers.has(lv.id);
                  return (
                    <button key={lv.id} onClick={() => st.toggleLever(lv.id)} style={{ textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: 9, background: on ? `${ag.color}12` : T.panel, border: `1px solid ${on ? ag.color : T.line}`, borderRadius: 9, padding: "8px 10px" }}>
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

      {/* ---- Validation du développement produit ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <BadgeCheck size={15} color={T.ok} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Validation du développement produit</span>
          <Chip color={T.accent}>{sel.name}</Chip>
        </div>
        <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, margin: "0 0 12px" }}>Le chef de produit approuve ou rejette le développement de la structure de collection sélectionnée. L'approbation publie les livrables dans le PLM.</p>
        {!st.approved.has(sel.id) ? (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <button onClick={() => st.approve(sel.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.ok, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Check size={14} /> Approuver</button>
            <button onClick={() => st.reject(sel.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.panel2, color: T.bad, border: `1px solid ${T.bad}66`, borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 700, fontFamily: SANS }}><X size={14} /> Rejeter</button>
            {st.rejected.has(sel.id) && <span style={{ fontSize: 11.5, color: T.bad, fontFamily: MONO }}>Développement rejeté — retour au stylisme pour retravail.</span>}
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
              <Check size={15} color={T.ok} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Développement produit finalisé — livrables disponibles</span>
              <button onClick={() => st.unapprove(sel.id)} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: "transparent", color: T.faint, border: `1px solid ${T.line}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}><X size={12} /> Annuler</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: T.panel2, border: `1px solid #00a3c455`, borderRadius: 12, padding: "13px 16px", marginBottom: 14 }}>
              <WhiteBadge><img src={CENTRIC_LOGO} alt="Dassault Centric" style={{ height: 30, width: "auto", display: "block" }} /></WhiteBadge>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Livrables publiés dans le PLM Dassault Centric</span>
                  <Chip color="#005386">PLM synchronisé</Chip>
                </div>
                <div style={{ fontSize: 11.5, color: T.faint, marginTop: 3, lineHeight: 1.45 }}>Rendu 3D, tech-pack et fiche produit sont disponibles dans l'espace projet Dassault Centric, prêts à être transmis aux fournisseurs.</div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: MONO, fontWeight: 700, color: T.ok, background: `${T.ok}1c`, border: `1px solid ${T.ok}55`, padding: "5px 11px", borderRadius: 999, flexShrink: 0 }}><Check size={13} /> Disponible</span>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { icon: Box, t: "Rendu 3D interactif", n: "→ Ouverture du rendu 3D depuis le PLM Dassault Centric…" },
                { icon: FileText, t: "Tech-pack PDF", n: "→ Tech-pack récupéré depuis Dassault Centric — prêt à transmettre au fournisseur." },
                { icon: BadgeCheck, t: "Fiche produit Ks", n: "→ Fiche produit synchronisée avec Dassault Centric." },
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
   Onglet Directrice de collection
   ============================================================ */
/* ---- Scénarios d'optimisation & simulation par contrôle ---- */
const OPTI = {
  prix: [
    { id: "p1", t: "Lisser 2 structures du palier 9 € vers 7 – 8 €", sim: [["Densité au PVI 9 €", "5 réf", "3 réf"], ["Échelle de prix", "trouée 6→9 €", "continue 4→15 €"], ["CA estimé", "43,8 M€", "44,2 M€"]] },
    { id: "p2", t: "Monter le body collerette de 6 € à 7 €", sim: [["PVI moyen collection", "9,83 €", "9,92 €"], ["Marge structure", "58 %", "61 %"], ["Risque volume", "—", "−3 %"]] },
  ],
  personas: [
    { id: "r1", t: "Basculer le pyjama léger zippé de « actuel » vers « trendy »", sim: [["Client actuel", "40 %", "33 %"], ["Client trendy", "22 %", "29 %"], ["Conformité cibles", "2 / 3", "3 / 3"]] },
    { id: "r2", t: "Renforcer le trendy via une capsule licences (+60 000 u.)", sim: [["Client trendy", "22 %", "26 %"], ["Volume collection", "3,85 M u.", "3,91 M u."], ["Budget CA", "43,8 M€", "44,5 M€"]] },
  ],
  couleurs: [
    { id: "c1", t: "Pousser le vert sauge sur 2 déclinaisons coloris supplémentaires", sim: [["Vert sauge", "13 %", "18 %"], ["Écru / beige", "30 %", "27 %"], ["Objectif mode S1 2027", "non atteint", "atteint"]] },
    { id: "c2", t: "Plafonner le noir à 5 % (transfert vers camel)", sim: [["Noir", "6 %", "5 %"], ["Camel", "10 %", "11 %"], ["Marge vs seuil noir", "2 pts", "3 pts"]] },
  ],
  ortho: [
    { id: "o1", t: "Corriger « litle » → « little » avant lancement production", sim: [["Anomalies infographie", "2", "1"], ["Coût de correction", "—", "0 € (avant prod)"], ["Risque retrait rayon", "élevé", "écarté"]] },
    { id: "o2", t: "Soumettre « POWH ! » au guide de licence Disney", sim: [["Anomalies infographie", "2", "0"], ["Délai validation licence", "—", "+5 j"], ["Conformité licence", "80 %", "100 %"]] },
  ],
  canaux: [
    { id: "k1", t: "Ouvrir 3 structures Core aux zones Sud & Maghreb", sim: [["International", "30 %", "36 %"], ["Objectif ≥ 35 %", "non atteint", "atteint"], ["Volume export", "—", "+180 000 u."]] },
    { id: "k2", t: "Basculer 2 structures physiques en omnicanal", sim: [["Omnicanal", "62 %", "68 %"], ["Physique seul", "28 %", "22 %"], ["Couverture e-com", "—", "+6 pts"]] },
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
        <Sparkles size={13} color={T.human} /><span style={{ fontSize: 11.5, fontWeight: 800, color: T.ink }}>Scénarios d'optimisation proposés par l'agent</span>
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
            <TrendingUp size={13} color={T.blue} /><span style={{ fontSize: 11, fontWeight: 800, color: T.ink, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5 }}>Impact simulé</span>
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
        <button onClick={() => setMail(true)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 11.5, fontWeight: 800, fontFamily: SANS }}><Send size={13} /> Valider la demande de changement</button>
      )}
      {s && mail && !sent && (
        <div style={{ background: T.panel, border: `1px solid ${T.accent}44`, borderRadius: 10, padding: "11px 13px" }}>
          <div style={{ fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 7 }}>Aperçu du mail</div>
          <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.6 }}>
            <div><strong style={{ color: T.ink }}>À :</strong> Chef de produit Bébé &lt;cdp.bebe@kiabi.fr&gt;</div>
            <div><strong style={{ color: T.ink }}>Objet :</strong> Demande de changement — {s.t}</div>
            <div style={{ marginTop: 6 }}>Bonjour, suite à l'analyse de l'agent équilibre de collection, merci de valider le changement suivant : <em>{s.t}</em>. Impact simulé : {s.sim.map(([l, av, ap]) => `${l} ${av} → ${ap}`).join(" · ")}. Merci de ton retour. — Chef de marché</div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button onClick={() => setSent(true)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.ok, color: "#ffffff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 11.5, fontWeight: 800, fontFamily: SANS }}><Send size={13} /> Envoyer le mail</button>
            <button onClick={() => setMail(false)} style={{ cursor: "pointer", background: T.panel2, color: T.sub, border: `1px solid ${T.line}`, borderRadius: 9, padding: "8px 14px", fontSize: 11.5, fontWeight: 700, fontFamily: SANS }}>Annuler</button>
          </div>
        </div>
      )}
      {sent && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${T.ok}14`, border: `1px solid ${T.ok}55`, borderRadius: 9, padding: "8px 13px", fontSize: 11.5, fontWeight: 700, color: T.ok }}>
          <BadgeCheck size={14} /> Mail envoyé au chef de produit Bébé — demande de changement en attente de validation.
        </div>
      )}
    </div>
  );
}

/* ---- Bloc de répartition (focus produit & pyramide) ---- */
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
          <div key={r.n} title={`${r.n} — ${r.pct} % · ${u(r.qty)} u.`} style={{ width: r.pct + "%", background: r.c }} />
        ))}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead><tr>
            {[colLabel, "Structures", "Réf. coloris", "Quantités", "% volume", "Cible", ""].map((c, j) => (
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
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}>{r.refs} réf. co</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, fontWeight: 700, color: T.ink, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}>{u(r.qty)} u.</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, fontWeight: 800, color: r.okv ? T.ink : T.warn, borderBottom: `1px solid ${T.lineSoft}` }}>{r.pct.toLocaleString("fr-FR")} %</td>
                <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 10.5, color: T.faint, borderBottom: `1px solid ${T.lineSoft}`, whiteSpace: "nowrap" }}>{r.target}</td>
                <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}>{r.okv ? <Check size={13} color={T.ok} /> : <X size={13} color={T.warn} />}</td>
              </tr>
            ))}
            <tr>
              <td style={{ padding: "8px 8px", fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase", letterSpacing: 0.5 }}>Total collection</td>
              <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub }}>{PRODUITS.length}</td>
              <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, color: T.sub, whiteSpace: "nowrap" }}>{totRefs} réf. co</td>
              <td style={{ textAlign: "right", fontFamily: MONO, fontSize: 11.5, fontWeight: 800, color: T.ink, whiteSpace: "nowrap" }}>{u(totQty)} u.</td>
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

  /* Cohérence prix calculée depuis la source unique */
  const priceRows = useMemo(() => {
    const m = {};
    PRODUITS.forEach((p) => { m[p.prix] = (m[p.prix] || 0) + 1; });
    return Object.entries(m).map(([k, v]) => ({ prix: +k, n: v })).sort((a, b) => a.prix - b.prix);
  }, []);
  const maxN = Math.max(...priceRows.map((r) => r.n));
  const focusRows = useMemo(() => buildDistrib("focus", FOCUS_DEF), []);
  const pyrRows = useMemo(() => buildDistrib("pyramide", PYRAMIDE_DEF), []);
  const verdictOf = (rows) => (rows.every((r) => r.okv) ? "Conforme" : rows.filter((r) => !r.okv).length > 1 ? "À corriger" : "Alerte");

  /* Personas calculés par volume depuis la source unique */
  const personas = useMemo(() => {
    const tot = PRODUITS.reduce((s, p) => s + p.volume, 0);
    const g = {};
    PRODUITS.forEach((p) => { g[p.persona] = (g[p.persona] || 0) + p.volume; });
    return [
      { n: "Client rationnel", pct: Math.round((g["Client rationnel"] / tot) * 100), target: "35 – 45 %", okv: true, c: "#0053A0" },
      { n: "Client actuel", pct: Math.round((g["Client actuel"] / tot) * 100), target: "30 – 40 %", okv: false, c: "#4B90CD" },
      { n: "Client trendy", pct: Math.round((g["Client trendy"] / tot) * 100), target: "20 – 30 %", okv: true, c: "#7fa3c4" },
    ];
  }, []);

  const checks = [
    { id: "pyramide", icon: Triangle, title: "Pyramide de collection", verdict: verdictOf(pyrRows), msg: "Le sommet pèse 15,0 % du volume (575 000 u. sur 6 réf. coloris) pour un plafond de 12 %. Base permanente (47,6 %) et basiques (15,2 %) sont dans leurs cibles : l'ajustement porte uniquement sur le top, où le risque de démarque de fin de saison est le plus fort." },
    { id: "focus", icon: LayoutGrid, title: "Focus type de produit", verdict: verdictOf(focusRows), msg: "Les coups de cœur ne pèsent que 10,7 % du volume (410 000 u. sur 3 réf. coloris) pour une cible de 15 – 22 %, pendant que les essentiels montent à 37,7 %. L'offre manque de produits d'animation face à un socle très large." },
    { id: "prix", icon: Scale, title: "Cohérence prix", verdict: "Alerte", msg: "Sur-densité au PVI 9,00 € (5 structures sur 12). Recommandation : lisser une partie de l'offre vers les paliers 7 – 8 € pour restaurer l'échelle de prix 4 → 15 €." },
    { id: "personas", icon: Users, title: "Répartition cible", verdict: "Alerte", msg: "Le client actuel dépasse légèrement sa cible (au-dessus de 40 %). Rééquilibrer au profit du trendy sur les prochaines implantations." },
    { id: "couleurs", icon: Palette, title: "Équilibre couleurs", verdict: "Conforme", msg: "Noir à 6 % — sous le seuil de 8 %. Couleur mode S1 2027 « Vert sauge » à 13 % : à pousser vers 18 % (objectif saison)." },
    { id: "ortho", icon: SpellCheck, title: "Infographie des textes vêtements", verdict: "À corriger", msg: "2 anomalies détectées sur 5 textes contrôlés — corrections à demander avant lancement production." },
    { id: "canaux", icon: Network, title: "Répartition canaux & géographie", verdict: "Alerte", msg: "International à 30 % vs objectif ≥ 35 %. Renforcer les structures Core éligibles à l'export sur les zones Sud et Maghreb." },
  ];
  const ck = (id) => checks.find((c) => c.id === id);

  return (
    <div>
      {/* ---- Cockpit directrice de collection ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <Crown size={16} color={T.accent} /><span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Cockpit chef de marché — Collection Enfant S1 2027</span>
        </div>
        <span style={microLbl}>État du budget de la collection</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <PMGauge icon={Wallet} label="Budget chiffre d'affaires collection" used={131.4} total={st.perfRules.caEnvelope * 3} unit="M€" fmt={(n) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} color={T.accent} />
          <PMGauge icon={Leaf} label="Budget CO₂ collection" used={+(st.collectionCO2 * 3).toFixed(1)} total={st.perfRules.carbonEnvelope * 3} unit="t CO₂e" fmt={(n) => u(Math.round(n))} color={st.collectionCO2 > st.perfRules.carbonEnvelope ? T.bad : T.ok} />
        </div>
        <span style={microLbl}>Objectifs de la collection (consolidation des chefs de produit)</span>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <PMGauge icon={TrendingUp} label="TME collection" used={54} total={58} unit="%" fmt={(n) => n.toLocaleString("fr-FR")} color={T.human} />
          <PMGauge icon={Tag} label="PVI moyen collection" used={8.2} total={9} unit="€" fmt={(n) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2 })} color={T.accent} />
          <PMGauge icon={Boxes} label="Quantités collection" used={21} total={25.5} unit="M" fmt={(n) => n.toLocaleString("fr-FR")} color={T.blue} />
          <PMGauge icon={Layers} label="Références coloris collection" used={1260} total={1500} unit="réf. co" fmt={(n) => u(n)} color={T.human} />
        </div>
        <span style={microLbl}>Contribution des chefs de produit</span>
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

      {/* ---- Agent équilibre de collection ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <Scale size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Agent équilibre de collection</span>
          <button onClick={() => setRan(true)} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 8, padding: "6px 13px", fontSize: 11.5, fontWeight: 800, fontFamily: SANS }}><Sparkles size={13} /> Relancer l'analyse</button>
        </div>
        <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, margin: "0 0 14px" }}>L'agent scanne l'ensemble de la collection et vérifie l'équilibre de l'offre : pyramide de collection, focus type de produit, cohérence prix, répartition cible, couleurs, infographie des textes vêtements et répartition des canaux. Chaque contrôle propose des scénarios d'optimisation, simule leur impact et transmet la demande de changement au chef de produit.</p>

        {ran && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Synthèse */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {checks.map((c) => (
                <span key={c.id} style={{ display: "inline-flex", alignItems: "center", gap: 7, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 999, padding: "6px 12px" }}>
                  <c.icon size={13} color={T.accent} /><span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink }}>{c.title}</span><VerdictChip v={c.verdict} />
                </span>
              ))}
            </div>

            <DistribBlock icon={Triangle} title="Pyramide de collection" hint="Répartition du volume et des références coloris par étage de pyramide" verdict={ck("pyramide").verdict} rows={pyrRows} colLabel="Étage" msg={ck("pyramide").msg} ck="pyramide" />
            <DistribBlock icon={LayoutGrid} title="Focus type de produit" hint="Répartition du volume et des références coloris par rôle du produit dans l'offre" verdict={ck("focus").verdict} rows={focusRows} colLabel="Focus" msg={ck("focus").msg} ck="focus" />

            {/* 1. Cohérence prix */}
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><Scale size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Cohérence prix</span><VerdictChip v="Alerte" /></div>
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
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Users size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Répartition cible (% du volume)</span><VerdictChip v="Alerte" /></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
                {personas.map((p) => (
                  <div key={p.n} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink, minWidth: 120 }}>{p.n}</span>
                    <Bar pct={p.pct} color={p.c} max={50} />
                    <span style={{ fontFamily: MONO, fontSize: 11, color: T.sub, minWidth: 38, textAlign: "right" }}>{p.pct} %</span>
                    <span style={{ fontFamily: MONO, fontSize: 10, color: T.faint, minWidth: 70 }}>cible {p.target}</span>
                    {p.okv ? <Check size={13} color={T.ok} /> : <X size={13} color={T.warn} />}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{ck("personas").msg}</div>
              <BalanceActions ck="personas" />
            </div>

            {/* 3. Couleurs */}
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Palette size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Équilibre couleurs</span><VerdictChip v="Conforme" /></div>
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
                <Chip color={T.ok}>Noir 6 % — seuil 8 % respecté</Chip>
                <Chip color={T.warn}>Vert sauge 13 % → pousser à 18 % (mode S1 2027)</Chip>
              </div>
              <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{ck("couleurs").msg}</div>
              <BalanceActions ck="couleurs" />
            </div>

            {/* 4. Orthographe */}
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><SpellCheck size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Infographie des textes vêtements</span><VerdictChip v="À corriger" /></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 8 }}>
                {TEXTES.map((t) => (
                  <div key={t.txt} style={{ display: "flex", alignItems: "flex-start", gap: 9, background: T.panel, border: `1px solid ${t.ok ? T.line : T.bad + "66"}`, borderRadius: 9, padding: "8px 11px" }}>
                    {t.ok ? <Check size={14} color={T.ok} style={{ flexShrink: 0, marginTop: 1 }} /> : <X size={14} color={T.bad} style={{ flexShrink: 0, marginTop: 1 }} />}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: T.ink, fontStyle: "italic" }}>« {t.txt} »</span>
                      <span style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO }}> — {t.prod}</span>
                      {!t.ok && <div style={{ fontSize: 11, color: T.bad, marginTop: 3 }}>{t.fix}</div>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 11.5, color: T.sub, lineHeight: 1.5 }}>{ck("ortho").msg}</div>
              <BalanceActions ck="ortho" />
            </div>

            {/* 5. Canaux */}
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}><Network size={14} color={T.accent} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Répartition canaux & géographie</span><VerdictChip v="Alerte" /></div>
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
   Onglet Assistante chef de produit — référencement par vocal
   ============================================================ */
const catOf = (n) => { const s = n.toLowerCase(); if (s.includes("bod")) return "Body"; if (s.includes("pyjama") || s.includes("dors")) return "Dors-bien / Pyjama"; if (s.includes("barboteuse")) return "Barboteuse"; return "Ensemble"; };

function AssistantePage({ st }) {
  const sel = st.sel;
  const [played, setPlayed] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [fields, setFields] = useState({});
  const [fromVocal, setFromVocal] = useState(new Set());
  const [inp, setInp] = useState("");
  const [written, setWritten] = useState(false);

  const REF_FIELDS = useMemo(() => ([
    { k: "desc", label: "Description produit", q: null },
    { k: "prog", label: "Programme", q: "À quel programme rattacher ce produit ?", sug: ["Layette permanente", "Capsule S1 2027", "Programme licences"] },
    { k: "couleurs", label: "Références couleurs", q: null },
    { k: "tailles", label: "Plages de taille", q: null },
    { k: "douane", label: "Code de douane associé", q: "Quel code de douane associer ?", sug: ["6111 20 90 — vêtements bébé, coton, tricoté", "6209 20 00 — vêtements bébé, coton, tissé"] },
    { k: "cat", label: "Catégorie du produit", q: null },
    { k: "design", label: "Lien design", q: "Quel est le lien vers le dossier design ?", sug: [`PLM/DESIGN-S127-${sel.id.toUpperCase()}`, "Studio > Figma layette S1 2027"] },
    { k: "tissu", label: "Type de tissu", q: null },
    { k: "process", label: "Process industriel utilisé", q: "Quel process industriel est utilisé ?", sug: ["Coupé-cousu maille", "Teinture en pièce + confection", "Impression placée + confection"] },
    { k: "genre", label: "Genre", q: null },
    { k: "codif", label: "Codification du produit", q: "Quelle codification produit attribuer ?", sug: [`KB-BB-${sel.id.toUpperCase()}-S127`] },
    { k: "label", label: "Type de label étiquette / packaging", q: "Quel type de label afficher sur le packaging / l'étiquette ?", sug: ["Étiquette tissée + label OEKO-TEX", "Print direct peau + QR traçabilité"] },
    { k: "moment", label: "Moment de vie", q: "Quel moment de vie pour ce produit ?", sug: ["Casual", "Smart"] },
    { k: "event", label: "Événement", q: "Le produit est-il rattaché à un événement ?", sug: ["Aucun événement", "Halloween", "Saint-Valentin"] },
    { k: "bom", label: "Composition matière (BOM)", q: null },
  ]), [sel]);

  const transcript = `« Salut, c'est pour le référencement du ${sel.name}. Pour la description tu peux mettre : ${sel.name.toLowerCase()}, ${sel.compo}, collection S1 2027. La catégorie c'est ${catOf(sel.name).toLowerCase()}, en tricoté, genre mixte bébé. Les tailles vont du 1 mois au 36 mois. Pour les coloris tu as ${sel.coloris.map(([n]) => n.toLowerCase()).join(", ")}. La compo matière tu la connais : ${sel.compo}, avec fil polyester et pressions nickel-free. Tu me complètes le reste dans Centric ? Merci ! »`;

  const analyze = () => {
    const f = {
      desc: `${sel.name} — ${sel.compo} — collection S1 2027`,
      cat: catOf(sel.name),
      tailles: "1M → 36M (7 tailles)",
      couleurs: sel.coloris.map(([n], i) => `${n} (${sel.id.toUpperCase()}-${String(i + 1).padStart(2, "0")})`).join(" · "),
      tissu: "Tricoté (maille jersey)",
      genre: "Mixte bébé",
      bom: `${sel.compo} · fil à coudre 100% polyester · pressions nickel-free`,
    };
    setFields(f); setFromVocal(new Set(Object.keys(f))); setAnalyzed(true); setWritten(false);
  };
  const reset = () => { setPlayed(false); setAnalyzed(false); setFields({}); setFromVocal(new Set()); setInp(""); setWritten(false); };

  const missing = REF_FIELDS.filter((f) => !fields[f.k]);
  const current = missing[0];
  const filled = REF_FIELDS.length - missing.length;
  const complete = analyzed && missing.length === 0;
  const answer = (v) => { if (!v || !v.trim() || !current) return; setFields((m) => ({ ...m, [current.k]: v.trim() })); setInp(""); };

  return (
    <div>
      {/* ---- Vocal ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
          <Mic size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Référencement par vocal</span>
          <Chip color={T.accent}>{sel.name}</Chip>
          <button onClick={reset} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: "transparent", color: T.faint, border: `1px solid ${T.line}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}><RotateCcw size={12} /> Recommencer</button>
        </div>
        <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.55, margin: "0 0 12px" }}>La chef de produit a laissé un vocal sur le produit sélectionné dans l'onglet « Chef de produit ». L'agent en extrait les éléments de référencement, puis pose des questions pour collecter les champs manquants avant l'écriture dans le PLM.</p>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 11, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px" }}>
          <button onClick={() => setPlayed(true)} style={{ width: 36, height: 36, borderRadius: 99, flexShrink: 0, display: "grid", placeItems: "center", cursor: "pointer", background: T.accent, border: "none" }}><Play size={16} color="#ffffff" /></button>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.ink }}>Vocal de la chef de produit · 0:42</div>
            {played
              ? <div style={{ fontSize: 12, color: T.sub, fontStyle: "italic", lineHeight: 1.6, marginTop: 6 }}>{transcript}</div>
              : <div style={{ fontSize: 11.5, color: T.faint, marginTop: 4 }}>Cliquez sur lecture pour écouter et afficher la transcription.</div>}
            {played && !analyzed && (
              <button onClick={analyze} style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.human, color: "#ffffff", border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 800, fontFamily: SANS }}><Sparkles size={13} /> Analyser le vocal avec l'agent</button>
            )}
          </div>
        </div>
      </div>

      {analyzed && (
        <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <ClipboardList size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Fiche de référencement PLM</span>
            <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: T.sub }}>{filled} / {REF_FIELDS.length} champs</span>
          </div>
          <div style={{ height: 6, background: T.line, borderRadius: 99, marginBottom: 14, overflow: "hidden" }}><div style={{ width: (filled / REF_FIELDS.length) * 100 + "%", height: "100%", background: complete ? T.ok : T.accent, borderRadius: 99 }} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 9 }}>
            {REF_FIELDS.map((f) => {
              const v = fields[f.k];
              return (
                <div key={f.k} style={{ background: T.panel2, border: `1px solid ${v ? T.line : T.warn + "66"}`, borderRadius: 10, padding: "9px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink, flex: 1 }}>{f.label}</span>
                    {v ? <Chip color={fromVocal.has(f.k) ? T.ok : T.blue}>{fromVocal.has(f.k) ? "Extrait du vocal" : "Complété"}</Chip> : <Chip color={T.warn}>Manquant</Chip>}
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
            <MessageCircle size={15} color={T.human} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>L'agent collecte les éléments manquants</span>
            <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: T.faint }}>{missing.length} question{missing.length > 1 ? "s" : ""} restante{missing.length > 1 ? "s" : ""}</span>
          </div>
          <div style={{ background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 10, padding: "10px 13px", fontSize: 12.5, color: T.ink, marginBottom: 10 }}>
            <strong>Agent :</strong> {current.q} <span style={{ color: T.faint }}>({current.label})</span>
          </div>
          {current.sug && (
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
              {current.sug.map((s) => (
                <button key={s} onClick={() => answer(s)} style={{ cursor: "pointer", background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 999, padding: "7px 13px", fontSize: 11.5, fontWeight: 700, color: T.ink, fontFamily: SANS }}>{s}</button>
              ))}
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && answer(inp)} placeholder="Ou saisissez votre réponse…" style={{ flex: 1, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 12px", fontSize: 12.5, color: T.ink, outline: "none", fontFamily: SANS }} />
            <button onClick={() => answer(inp)} style={{ cursor: "pointer", background: T.human, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 13px", display: "grid", placeItems: "center" }}><Send size={14} /></button>
          </div>
        </div>
      )}

      {complete && (
        <div style={{ background: T.panel, border: `1px solid ${T.ok}55`, borderRadius: 14, padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
            <BadgeCheck size={15} color={T.ok} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Référencement complet — prêt pour le PLM</span>
            <Chip color={T.ok}>{REF_FIELDS.length} / {REF_FIELDS.length} champs</Chip>
          </div>
          {!written ? (
            <button onClick={() => setWritten(true)} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", background: "#005386", color: "#ffffff", border: "none", borderRadius: 9, padding: "10px 17px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Database size={15} /> Écrire le référencement dans le PLM Dassault Centric</button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", background: T.panel2, border: `1px solid #00a3c455`, borderRadius: 12, padding: "13px 16px" }}>
              <WhiteBadge><img src={CENTRIC_LOGO} alt="Dassault Centric" style={{ height: 30, width: "auto", display: "block" }} /></WhiteBadge>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>Fiche produit écrite dans le PLM Dassault Centric</span>
                  <Chip color="#005386">PLM synchronisé</Chip>
                </div>
                <div style={{ fontSize: 11.5, color: T.faint, marginTop: 3, lineHeight: 1.45 }}>Les {REF_FIELDS.length} champs de référencement de « {sel.name} » ({fields.codif}) sont enregistrés — description, programme, couleurs, tailles, douane, catégorie, design, tissu, process, genre, codification, label, moment de vie, événement et BOM.</div>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontFamily: MONO, fontWeight: 700, color: T.ok, background: `${T.ok}1c`, border: `1px solid ${T.ok}55`, padding: "5px 11px", borderRadius: 999, flexShrink: 0 }}><Check size={13} /> Écrit</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Page Offre & Collection (2 sous-onglets)
   ============================================================ */
function OffrePage({ st }) {
  const [sub, setSub] = useState("chef");
  return (
    <div>
      <PageHeader
        title="Offre & Collection"
        desc="Trois vues métier : le chef de produit pilote son offre Bébé, l'assistante assure le référencement PLM, le chef de marché garantit l'équilibre global."
        expert={sub === "chef" ? EXPERTS.design : sub === "assist" ? EXPERTS.assistante : EXPERTS.directrice}
      />
      <CascadeBanner st={st} area="Offre & Collection" />
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {[{ id: "chef", label: "Chef de produit", icon: UserCog }, { id: "assist", label: "Assistante chef de produit", icon: Mic }, { id: "dir", label: "Chef de marché", icon: Crown }].map((t) => {
          const on = sub === t.id;
          return (
            <button key={t.id} onClick={() => setSub(t.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: on ? T.human : T.panel2, color: on ? "#ffffff" : T.sub, border: `1px solid ${on ? T.human : T.line}`, borderRadius: 999, padding: "8px 15px", fontSize: 12, fontWeight: 700, fontFamily: SANS }}>
              <t.icon size={13} /> {t.label}
            </button>
          );
        })}
      </div>
      {sub === "chef" ? <ChefPage st={st} /> : sub === "assist" ? <AssistantePage st={st} /> : <DirectricePage st={st} />}
    </div>
  );
}

/* ============================================================
   Page 2 — Go to Market
   ============================================================ */
function GTMPage({ st }) {
  const sel = st.sel;
  const scen = st.recoFor(sel);
  const [msgs, setMsgs] = useState([{ me: false, t: "Bonjour ! Je suis l'agent supply de l'offre Bébé. Posez-moi vos questions : recommandation, coûts, délais, CO₂, risques…" }]);
  const [inp, setInp] = useState("");
  const answer = (q) => {
    const s = q.toLowerCase();
    if (/(recommand|conseil|meilleur|optimal|choisir|lequel|préconis|preconis)/.test(s))
      return `${st.lowCarbon ? "Stratégie Bas carbone active → je privilégie le sourcing local. " : ""}Je recommande « ${scen.name} » : ${eur(scen.cost)}/pc · ${st.leadOf(scen)} j · rupture ${st.rupOf(scen)} %. ${scen.note}`;
    if (/(prix|coût|cout|revient)/.test(s))
      return sel.scenarios.map((x) => `${x.name} : ${eur(x.cost)}/pc`).join(" · ");
    if (/(délai|delai|lead|temps)/.test(s))
      return sel.scenarios.map((x) => `${x.name} : ${st.leadOf(x)} j`).join(" · ");
    if (/(co2|carbone|empreinte)/.test(s))
      return `Empreinte actuelle : ${st.co2Of(sel)} kg/pc${st.lowCarbon ? " (réduite par la stratégie Bas carbone)" : ""}. Le sourcing proche réduit fortement le transport.`;
    if (/(risque|rupture|alea|aléa)/.test(s))
      return sel.scenarios.map((x) => `${x.name} : rupture ${st.rupOf(x)} %`).join(" · ");
    return `Pour « ${sel.name} » (${u(st.volOf(sel))} u. · PVI ${eur(st.pvcOf(sel))}), demandez-moi une recommandation, les coûts, délais, l'empreinte CO₂ ou les risques.`;
  };
  const send = () => { if (!inp.trim()) return; const q = inp.trim(); setMsgs((m) => [...m, { me: true, t: q }, { me: false, t: answer(q) }]); setInp(""); };

  return (
    <div>
      <PageHeader title="Go to market" desc="Brief d'implantation, volume et prix de vente, puis discussion avec l'agent supply." expert={EXPERTS.supply} />
      <CascadeBanner st={st} area="Go to Market" />
      <LowCarbonBanner st={st} context="gtm" prod={sel} />

      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <ClipboardList size={15} color={T.blue} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Structures de collection en attente de scénario d'approvisionnement</span>
          <span style={{ fontSize: 11.5, color: T.faint }}>cliquez une structure de collection pour l'arbitrer dans le panneau ci-dessous</span>
        </div>
        <div style={{ maxHeight: 300, overflowY: "auto", overflowX: "auto", border: `1px solid ${T.lineSoft}`, borderRadius: 10 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr>{["Structure de collection", "Segment", "Volume", "PVI", "Statut supply"].map((c, j) => (
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
                    <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}><Chip color={p.segment === "Nuit" ? T.accent : p.segment === "Licences" ? T.human : T.silver}>{p.segment}</Chip></td>
                    <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{u(st.volOf(p))}</td>
                    <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{eur(st.pvcOf(p))}</td>
                    <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}>
                      {st.validated.has(p.id) ? <Chip color={T.ok}>Validée KFI</Chip> : st.returned.has(p.id) ? <Chip color={T.bad}>Retournée</Chip> : st.submitted.has(p.id) ? <Chip color={T.warn}>Soumise à KFI</Chip> : <Chip color={T.silver}>À arbitrer</Chip>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 8, fontSize: 11, color: T.faint, fontFamily: MONO }}>{PRODUITS.length} structures de collection · sélectionnez-en une, puis retenez un scénario pour la soumettre à KFI</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16 }}>
        <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <Factory size={15} color={T.blue} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Scénario supply — {sel.name}</span>
          </div>
          <div style={{ fontSize: 12, color: T.sub, marginBottom: 12 }}>
            Structure de collection : <strong style={{ color: T.ink }}>{sel.name}</strong> · volume <span style={{ fontFamily: MONO }}>{u(st.volOf(sel))} u.</span> · PVI <span style={{ fontFamily: MONO }}>{eur(st.pvcOf(sel))}</span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            <label style={{ flex: "1 1 140px", fontSize: 10.5, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Volume (u.)
              <input type="number" value={st.volOf(sel)} onChange={(e) => st.setVol(sel.id, +e.target.value || 0)} style={{ display: "block", width: "100%", marginTop: 5, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: MONO, fontSize: 13, color: T.ink, outline: "none", boxSizing: "border-box" }} />
            </label>
            <label style={{ flex: "1 1 140px", fontSize: 10.5, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>PVI (€)
              <input type="number" step="0.5" value={st.pvcOf(sel)} onChange={(e) => st.setPvc(sel.id, +e.target.value || 0)} style={{ display: "block", width: "100%", marginTop: 5, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 8, padding: "8px 10px", fontFamily: MONO, fontSize: 13, color: T.ink, outline: "none", boxSizing: "border-box" }} />
            </label>
          </div>
          <span style={microLbl}>Scénarios d'approvisionnement</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {sel.scenarios.map((x) => {
              const chosen = st.scenOf(sel) === x.id;
              const isReco = scen.id === x.id;
              return (
                <button key={x.id} onClick={() => st.setScen(sel.id, x.id)} style={{ textAlign: "left", cursor: "pointer", background: chosen ? `${T.blue}12` : T.panel2, border: `1px solid ${chosen ? T.blue : T.line}`, borderRadius: 10, padding: "11px 13px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <Truck size={14} color={T.blue} /><span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink }}>{x.name}</span>
                    {isReco && <Chip color={st.lowCarbon ? T.ok : T.blue}>{st.lowCarbon ? "Reco Bas carbone" : "Recommandé"}</Chip>}
                    {chosen && <Check size={14} color={T.blue} style={{ marginLeft: "auto" }} />}
                  </div>
                  <div style={{ fontSize: 11, color: T.sub, marginTop: 5, fontFamily: MONO }}>{eur(x.cost)}/pc · {st.leadOf(x)} j · rupture {st.rupOf(x)} % · {x.splitProche}% proche · {x.usine}</div>
                  <div style={{ fontSize: 10.5, color: T.faint, marginTop: 4, lineHeight: 1.4 }}>{x.note}</div>
                </button>
              );
            })}
          </div>
          <button onClick={() => st.submit(sel.id)} disabled={st.submitted.has(sel.id) && !st.returned.has(sel.id)} style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: st.submitted.has(sel.id) && !st.returned.has(sel.id) ? T.line : T.blue, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}>
            <Send size={14} /> {st.submitted.has(sel.id) && !st.returned.has(sel.id) ? "Déjà soumise à KFI" : "Soumettre le scénario à KFI"}
          </button>
        </div>

        <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <MessageCircle size={15} color={T.human} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Agent supply — discussion</span>
          </div>
          <div style={{ flex: 1, minHeight: 180, maxHeight: 300, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: "85%", background: m.me ? `${T.blue}18` : T.panel2, border: `1px solid ${m.me ? T.blue + "44" : T.line}`, borderRadius: 10, padding: "8px 11px", fontSize: 12, color: T.ink, lineHeight: 1.5 }}>{m.t}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input value={inp} onChange={(e) => setInp(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ex. : que recommandes-tu ?" style={{ flex: 1, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 12px", fontSize: 12.5, color: T.ink, outline: "none", fontFamily: SANS }} />
            <button onClick={send} style={{ cursor: "pointer", background: T.human, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 13px", display: "grid", placeItems: "center" }}><Send size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Page 3 — Supply (validation ITFAS)
   ============================================================ */
function ItfasPage({ st, embedded }) {
  const rows = PRODUITS.filter((p) => st.submitted.has(p.id));
  const sel = rows.find((p) => p.id === st.selId) || rows[0];
  const scen = sel ? (sel.scenarios.find((x) => x.id === st.scenOf(sel)) || st.recoFor(sel)) : null;
  const cap = sel ? (st.volOf(sel) < 250000
    ? { v: "Capacité disponible", c: T.ok, t: "Volume absorbable par le réseau fournisseur actuel sans tension." }
    : st.volOf(sel) < 420000
      ? { v: "Capacité correcte", c: T.warn, t: "Volume soutenu : caler le phasage de production et sécuriser la matière." }
      : { v: "Capacité tendue", c: T.bad, t: "Volume élevé vs capacité proche : mix grand import + réassort piloté recommandé, sécuriser la matière en amont." }) : null;

  return (
    <div>
      <PageHeader title="Supply" desc="Validations de prix transmises par Go to market — à effectuer par KFI." expert={EXPERTS.supply} />
      <CascadeBanner st={st} area="Supply" />
      <LowCarbonBanner st={st} context="supply" prod={sel || PRODUITS[0]} />

      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <ShoppingBag size={15} color={T.blue} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Dossiers transmis par Go to Market</span>
        </div>
        {rows.length === 0 ? (
          <div style={{ fontSize: 12, color: T.faint }}>Aucun dossier en attente. Soumettez un scénario depuis la page « Go to market ».</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr>{["Structure de collection", "Segment", "Volume", "Prix de vente", "Statut"].map((c, j) => (
                <th key={c} style={{ textAlign: j === 0 ? "left" : "center", padding: "8px 10px", fontSize: 10, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>{c}</th>
              ))}</tr></thead>
              <tbody>
                {rows.map((p) => {
                  const on = sel && p.id === sel.id;
                  return (
                    <tr key={p.id} onClick={() => st.setSelId(p.id)} style={{ cursor: "pointer", background: on ? `${T.blue}12` : "transparent" }}>
                      <td style={{ padding: "8px 10px", borderBottom: `1px solid ${T.lineSoft}`, fontWeight: 700, color: T.ink }}>{p.img} {p.name}</td>
                      <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}><Chip color={p.segment === "Nuit" ? T.accent : p.segment === "Licences" ? T.human : T.silver}>{p.segment}</Chip></td>
                      <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{u(st.volOf(p))}</td>
                      <td style={{ textAlign: "center", fontFamily: MONO, color: T.sub, borderBottom: `1px solid ${T.lineSoft}` }}>{eur(st.pvcOf(p))}</td>
                      <td style={{ textAlign: "center", borderBottom: `1px solid ${T.lineSoft}` }}>
                        {st.validated.has(p.id) ? <Chip color={T.ok}>Validée</Chip> : st.returned.has(p.id) ? <Chip color={T.bad}>Retournée</Chip> : <Chip color={T.warn}>En attente</Chip>}
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
            <Factory size={15} color={T.blue} /><span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>Scénario supply — {sel.name}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 12, marginBottom: 14 }}>
            <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px" }}>
              <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, textTransform: "uppercase", marginBottom: 6 }}>{st.lowCarbon ? "Scénario recommandé (Bas carbone)" : "Scénario retenu"}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>{scen.name}</div>
              <div style={{ fontSize: 11, color: T.sub, fontFamily: MONO, marginTop: 5 }}>{eur(scen.cost)}/pc · {st.leadOf(scen)} j · rupture {st.rupOf(scen)} % · {scen.splitProche}% proche</div>
              <div style={{ fontSize: 10.5, color: T.faint, marginTop: 5 }}>{scen.usine} · maîtrise {scen.maitrise}</div>
            </div>
            <div style={{ background: T.panel2, border: `1px solid ${cap.c}55`, borderRadius: 11, padding: "12px 14px" }}>
              <div style={{ fontSize: 10.5, color: T.faint, fontFamily: MONO, textTransform: "uppercase", marginBottom: 6 }}>Verdict capacité</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: cap.c }}>{cap.v}</div>
              <div style={{ fontSize: 11, color: T.sub, marginTop: 5, lineHeight: 1.5 }}>{cap.t}</div>
            </div>
          </div>
          {!st.validated.has(sel.id) ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button onClick={() => st.validate(sel.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.ok, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Check size={14} /> Valider le prix</button>
              <button onClick={() => st.sendBack(sel.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.panel2, color: T.bad, border: `1px solid ${T.bad}66`, borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 700, fontFamily: SANS }}><RotateCcw size={14} /> Retourner à Go to Market</button>
            </div>
          ) : (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${T.ok}14`, border: `1px solid ${T.ok}55`, borderRadius: 10, padding: "9px 14px", fontSize: 12.5, fontWeight: 700, color: T.ok }}><BadgeCheck size={15} /> Prix validé par KFI — la structure de collection passe en « Validée » dans tout le cockpit.</div>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   Onglet ITFAS — Production Panel (fidèle aux écrans Venso)
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
const KPI_TRAJ = [
  { t: "Qualité", val: "86%", sub: "au-dessus de C", c: "#3fb27f", note: "14% du panel sous le seuil — 3 fournisseurs portant 12% du volume", tl: [["6m", "89%"], ["18m", "93%"], ["36m", "95%"]], spark: [3, 4, 5, 6, 8, 10] },
  { t: "Coût", val: "−1.5", sub: "pts vs contexte", c: "#3fb27f", note: "surperformance nette — contexte à +5.5%, prix réels à +4%", tl: [["6m", "−1.2"], ["18m", "−0.8"], ["36m", "−1.5"]], spark: [7, 4, 7, 3, 6, 4] },
  { t: "Délai", val: "3.2", sub: "% shortage", c: "#dfa93f", note: "produits indisponibles en magasin — impact CA estimé €2.1M", tl: [["6m", "2.8"], ["18m", "2.1"], ["36m", "1.5"]], spark: [9, 8, 7, 6, 5, 4] },
  { t: "Compliance env.", val: "12 / 42", sub: "prêts CS3D", c: "#0053A0", note: "30 fournisseurs à requalifier d'ici 2027", tl: [["6m", "18 / 42"], ["18m", "31 / 42"], ["36m", "40 / 42"]], spark: [2, 3, 4, 4, 6, 8] },
];
const ALERTES = [
  { dot: "#e05a5a", title: "Quality wall — Tekstil Ankara", tag: "Nouveau", tagC: "#4B90CD", txt: "Production stoppée · 45K pièces bloquées · 2 fournisseurs dispo pour absorber", cta: "Voir →" },
  { dot: "#dfa93f", title: "Audit HRP dégradé D — Aspen India", tag: "En cours", tagC: "#dfa93f", txt: "Plan d'action requis sous 15 jours · seuil minimum non atteint", cta: "Voir →" },
  { dot: "#dfa93f", title: "Non-conformité lot #4712 — Filateur C", tag: "Nouveau", tagC: "#4B90CD", txt: "Taux de défaut 8% vs seuil 2% · 12K pièces à contrôler", cta: "Voir →" },
];
const DECISIONS = [
  { dot: "#e05a5a", title: "Inflation Turquie", tag: "Macro-éco", tagC: "#e05a5a", txt: "8 fournisseurs · +15% coût · −20% capa dispo", cta: "Voir les scénarios →", strong: "8 fournisseurs" },
  { dot: "#7fa3c4", title: "Sourcer 2 fournisseurs knit bas carbone", tag: "CAPACITÉ", tagC: "#7fa3c4", txt: "−35% vs besoin certifié à 18 mois", cta: "Explorer →" },
  { dot: "#7fa3c4", title: "Fermer 3 fournisseurs sous-performants", tag: "PANEL", tagC: "#7fa3c4", txt: "Score < C depuis 2 cycles · 4% du volume", cta: "Explorer →" },
];
const MATCH_READY = [
  { score: 96, name: "Cankiri A1", g: "A", pays: "Turquie", txt: "Capacité dispo · prix aligné · certifié coton bio · audit A" },
  { score: 91, name: "Roubaix G2", g: "A", pays: "France", txt: "Excellence qualité · délais fiables · capacité partielle" },
];
const MATCH_COND = [
  { score: 84, name: "Izmir D3", g: "B", pays: "Turquie", gap: "Compliance env. C → B", ia: "≈ 3 mois de coaching IA" },
  { score: 76, name: "Fournisseur Asie B", g: "C", pays: "Chine", gap: "Qualité C → B", ia: "≈ 4 mois · audit à reprogrammer" },
];
const SIM_LEVERS = [
  { id: "carbone", label: "Le Comex décide −20% carbone", sc: [
    { k: "OPTIMISTE", c: "#3fb27f", titre: "Montée accélérée du panel existant + 1 sourcing bas carbone", cout: "+2%", coutC: "#dfa93f", capa: "100%", capaC: "#3fb27f", delai: "12 mois", actions: ["Faire monter Izmir D3 (C→B env.) via coaching IA", "Sourcer 1 filateur GRS au Maghreb"] },
    { k: "MÉDIAN", c: "#4B90CD", titre: "Mix montée en compétence + redistribution partielle", cout: "+5%", coutC: "#dfa93f", capa: "85%", capaC: "#dfa93f", delai: "18 mois", actions: ["Redistribuer 20% du volume vers Roubaix G2 & Italie H", "Coaching ciblé sur 3 fournisseurs"] },
    { k: "PESSIMISTE", c: "#e05a5a", titre: "Sortie de 2 fournisseurs non conformes, sourcing lourd", cout: "+9%", coutC: "#e05a5a", capa: "70%", capaC: "#e05a5a", delai: "30 mois", actions: ["Sortir Bangladesh E & Tricoteur I", "Lancer 3 sourcings bas carbone"] },
  ]},
  { id: "cout", label: "Objectif −15% coût", sc: [
    { k: "OPTIMISTE", c: "#3fb27f", titre: "Paliers volume massifiés + standardisation des BOM", cout: "−15%", coutC: "#3fb27f", capa: "100%", capaC: "#3fb27f", delai: "9 mois", actions: ["Activer les paliers volume Bangladesh E & Asie B", "Standardiser les BOM sur 6 structures"] },
    { k: "MÉDIAN", c: "#4B90CD", titre: "Renégociation ciblée + bascule partielle grand import", cout: "−10%", coutC: "#3fb27f", capa: "90%", capaC: "#dfa93f", delai: "14 mois", actions: ["Renégocier 4 contrats cadres 2027", "Basculer 15% du volume vers le grand import"] },
    { k: "PESSIMISTE", c: "#e05a5a", titre: "Pression prix uniforme, risque qualité & délai", cout: "−6%", coutC: "#dfa93f", capa: "75%", capaC: "#e05a5a", delai: "20 mois", actions: ["Baisse tarifaire imposée au panel", "Contrôles qualité renforcés sur 3 fournisseurs"] },
  ]},
  { id: "izmir", label: "Perte d'un fournisseur clé (Izmir D3)", sc: [
    { k: "OPTIMISTE", c: "#3fb27f", titre: "Réallocation immédiate sur le panel existant", cout: "+3%", coutC: "#dfa93f", capa: "95%", capaC: "#3fb27f", delai: "6 mois", actions: ["Transférer le volume vers Cankiri A1 & Roubaix G2", "Sécuriser la matière velours en amont"] },
    { k: "MÉDIAN", c: "#4B90CD", titre: "Réallocation partielle + montée d'un back-up", cout: "+6%", coutC: "#dfa93f", capa: "85%", capaC: "#dfa93f", delai: "12 mois", actions: ["Faire monter Tricoteur I (C→B) via coaching", "Répartir 30% du volume sur 2 sites"] },
    { k: "PESSIMISTE", c: "#e05a5a", titre: "Sourcing d'urgence hors panel qualifié", cout: "+12%", coutC: "#e05a5a", capa: "65%", capaC: "#e05a5a", delai: "24 mois", actions: ["Lancer 2 sourcings d'urgence non audités", "Décaler 2 structures de collection d'une saison"] },
  ]},
];
const PROD_SUPPLIERS = [
  { name: "Cankiri A1", g: "A", pays: "Turquie", statut: "Ouvert", audit: "Validé", score: 92, prix2027: true },
  { name: "Fournisseur Asie B", g: "C", pays: "Chine", statut: "Ouvert", audit: "Validé", score: 78, prix2027: true },
  { name: "Filateur recyclé C", g: "D", pays: "Portugal", statut: "Ouvert", audit: "En cours", score: 64, prix2027: false },
  { name: "Izmir D3", g: "B", pays: "Turquie", statut: "Ouvert", audit: "Validé", score: 88, prix2027: true },
  { name: "Bangladesh E", g: "E", pays: "Bangladesh", statut: "Ouvert", audit: "À planifier", score: 55, prix2027: false },
  { name: "Roubaix G2", g: "A", pays: "France", statut: "Ouvert", audit: "Validé", score: 95, prix2027: true },
  { name: "Filateur Italie H", g: "A", pays: "Italie", statut: "Ouvert", audit: "Validé", score: 90, prix2027: true },
  { name: "Tricoteur I", g: "C", pays: "Tunisie", statut: "En ouverture", audit: "En cours", score: 70, prix2027: false },
];
const AuditChip = ({ s }) => {
  const c = s === "Validé" ? T.ok : s === "En cours" ? T.blue : T.warn;
  return <Chip color={c}>{s}</Chip>;
};
const VensoTag = ({ txt }) => (
  <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: MONO, fontSize: 11, color: T.human }}><Sparkles size={12} /> {txt}</span>
);
function ProductionPage({ st }) {
  const [lever, setLever] = useState("carbone");
  const [chosen, setChosen] = useState({});
  const [alloc, setAlloc] = useState(false);
  const lv = SIM_LEVERS.find((l) => l.id === lever);
  const auditsTodo = PROD_SUPPLIERS.filter((s) => s.audit !== "Validé").length;
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: T.ink }}>Production Panel</h2>
          <p style={{ margin: "4px 0 0", fontSize: 12.5, color: T.sub }}>Performance du panel fournisseurs, allocation des collections et anticipation — en continu.</p>
        </div>
        <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, fontFamily: MONO, fontSize: 11, color: T.sub, background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 999, padding: "6px 13px" }}>
          <span style={{ width: 7, height: 7, borderRadius: 99, background: "#00a3c4" }} /> données terrain en continu · <span style={{ color: T.blue, fontWeight: 700 }}>Venso</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "10px 13px", margin: "12px 0 18px" }}>
        <Sparkles size={15} color={T.human} style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontSize: 12, color: T.ink, lineHeight: 1.5 }}><strong>{EXPERTS.supply.role} —</strong> {EXPERTS.supply.txt}</span>
      </div>
      <CascadeBanner st={st} area="KFI" />

      {/* ---- Performance du panel — trajectoire ---- */}
      <div style={{ fontSize: 13.5, fontWeight: 800, color: T.ink, marginBottom: 10 }}>Performance du panel — trajectoire</div>
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

      {/* ---- Agir maintenant / Décisions à prendre ---- */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16, marginBottom: 18 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}><span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Agir maintenant</span><span style={{ width: 7, height: 7, borderRadius: 99, background: "#e05a5a" }} /></div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 10 }}>Alertes terrain remontées par les agents Venso</div>
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
          <div style={{ fontSize: 13.5, fontWeight: 800, color: T.ink, marginBottom: 3 }}>Décisions à prendre</div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 10 }}>Recommandations basées sur le croisement business plan × données terrain</div>
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

      {/* ---- Allouer une collection au panel ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, flexWrap: "wrap" }}>
          <span style={{ width: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center", background: `${T.accent}12`, border: `1px solid ${T.accent}44` }}><Layers size={17} color={T.accent} /></span>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Allouer une collection au panel</div>
            <div style={{ fontSize: 11.5, color: T.faint }}>Brief entrant → shortlist fournisseurs prêts ou à faire monter.</div>
          </div>
          <VensoTag txt="matching Venso" />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(220px,300px) 1fr", gap: 18, marginTop: 12 }}>
          <div style={{ borderRight: `1px solid ${T.lineSoft}`, paddingRight: 16 }}>
            <span style={microLbl}>Brief entrant</span>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.accent, lineHeight: 1.35, marginBottom: 8 }}>Pyjama bébé — capsule mass market</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              <Chip color={T.human}>mass market</Chip><Chip color={T.human}>bas carbone</Chip>
            </div>
            {[["PV cible", "12,90 €"], ["Marge brute", "58%"], ["Volume", "80 000 pcs"], ["Mise en magasin", "sept. 2027"], ["Qualité min.", "Niveau B"], ["Type produit", "Knit coton"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${T.lineSoft}` }}>
                <span style={{ fontSize: 11.5, color: T.sub }}>{l}</span><span style={{ fontSize: 11.5, fontFamily: MONO, fontWeight: 700, color: T.ink }}>{v}</span>
              </div>
            ))}
            <div style={{ fontSize: 10.5, color: T.faint, marginTop: 10, lineHeight: 1.5 }}>Contraintes héritées des agents ontologiques de la collection.</div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 10.5, fontWeight: 800, color: T.ok, letterSpacing: 0.5, marginBottom: 8 }}><span style={{ width: 7, height: 7, borderRadius: 99, background: T.ok }} /> PRÊT MAINTENANT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
              {MATCH_READY.map((m) => (
                <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 12, background: `${T.ok}0a`, border: `1px solid ${T.ok}44`, borderRadius: 10, padding: "11px 14px" }}>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: T.ok }}>{m.score}</div>
                    <div style={{ fontSize: 8.5, fontFamily: MONO, color: T.faint, letterSpacing: 0.5 }}>MATCH</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: T.accent }}>{m.name}</span><GradeChip g={m.g} /><span style={{ fontSize: 11, fontFamily: MONO, color: T.faint }}>{m.pays}</span>
                    </div>
                    <div style={{ fontSize: 11, color: T.sub, fontFamily: MONO, marginTop: 3 }}>{m.txt}</div>
                  </div>
                  <ArrowRight size={14} color={T.faint} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 10.5, fontWeight: 800, color: T.warn, letterSpacing: 0.5, marginBottom: 8 }}><span style={{ width: 7, height: 7, borderRadius: 99, background: T.warn }} /> POTENTIEL SOUS CONDITION</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
              {MATCH_COND.map((m) => (
                <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 12, background: `${T.warn}0a`, border: `1px solid ${T.warn}44`, borderRadius: 10, padding: "11px 14px" }}>
                  <div style={{ textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: T.warn }}>{m.score}</div>
                    <div style={{ fontSize: 8.5, fontFamily: MONO, color: T.faint, letterSpacing: 0.5 }}>MATCH</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: T.accent }}>{m.name}</span><GradeChip g={m.g} /><span style={{ fontSize: 11, fontFamily: MONO, color: T.faint }}>{m.pays}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginTop: 3 }}>
                      <span style={{ fontSize: 11, color: T.sub, fontFamily: MONO }}>À combler : <strong style={{ color: T.warn }}>{m.gap}</strong></span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10.5, fontFamily: MONO, color: T.human, background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 6, padding: "2px 7px" }}><Sparkles size={10} /> {m.ia}</span>
                    </div>
                  </div>
                  <ArrowRight size={14} color={T.faint} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", borderTop: `1px solid ${T.lineSoft}`, paddingTop: 12 }}>
              <div>
                <span style={microLbl}>Allocation proposée</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: T.accent }}>60 000 chez Cankiri A1 · 20 000 chez Roubaix G2</span>
              </div>
              <button onClick={() => setAlloc(true)} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: alloc ? T.ok : T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "10px 17px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}>
                <Check size={14} /> {alloc ? "Allocation validée" : "Valider l'allocation"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Simuler une décision stratégique ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, marginBottom: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Simuler une décision stratégique</div>
            <div style={{ fontSize: 11.5, color: T.faint }}>Chaque levier génère 3 scénarios avec les actions concrètes sur le panel.</div>
          </div>
          <VensoTag txt="simulation Venso" />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0 14px" }}>
          {SIM_LEVERS.map((l) => {
            const on = lever === l.id;
            return (
              <button key={l.id} onClick={() => setLever(l.id)} style={{ cursor: "pointer", background: on ? T.accent : T.panel, color: on ? "#ffffff" : T.ink, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 9, padding: "9px 15px", fontSize: 12, fontWeight: 800, fontFamily: SANS }}>{l.label}</button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
          {lv.sc.map((s) => {
            const picked = chosen[lever] === s.k;
            return (
              <div key={s.k} style={{ background: T.panel, border: `1px solid ${picked ? s.c : T.line}`, borderRadius: 12, padding: "14px 15px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 10.5, fontWeight: 800, color: s.c, letterSpacing: 0.5, marginBottom: 8 }}><span style={{ width: 7, height: 7, borderRadius: 99, background: s.c }} /> {s.k}</div>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: T.ink, lineHeight: 1.4, marginBottom: 10 }}>{s.titre}</div>
                {[["Coût rendu", s.cout, s.coutC], ["Capa atteinte", s.capa, s.capaC], ["Délai", s.delai, T.ink]].map(([l2, v, c2]) => (
                  <div key={l2} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${T.lineSoft}` }}>
                    <span style={{ fontSize: 11.5, color: T.sub }}>{l2}</span><span style={{ fontSize: 12, fontFamily: MONO, fontWeight: 800, color: c2 }}>{v}</span>
                  </div>
                ))}
                <span style={{ ...microLbl, marginTop: 10 }}>Actions</span>
                {s.actions.map((a) => (
                  <div key={a} style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 11.5, color: T.sub, lineHeight: 1.45, marginBottom: 5 }}>
                    <Check size={13} color={s.c} style={{ flexShrink: 0, marginTop: 1 }} />{a}
                  </div>
                ))}
                <button onClick={() => setChosen((m) => ({ ...m, [lever]: s.k }))} style={{ marginTop: "auto", cursor: "pointer", background: picked ? s.c : `${T.human}12`, color: picked ? "#ffffff" : T.human, border: "none", borderRadius: 9, padding: "9px 12px", fontSize: 12, fontWeight: 800, fontFamily: SANS }}>{picked ? "Scénario retenu ✓" : "Choisir ce scénario"}</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---- Panel fournisseurs ---- */}
      <div style={{ background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
          <TrendingUp size={15} color={T.accent} /><span style={{ fontSize: 13.5, fontWeight: 800, color: T.ink }}>Panel fournisseurs</span>
          <span style={{ fontSize: 11.5, color: T.faint }}>{PROD_SUPPLIERS.length} fournisseurs suivis · cliquer pour le détail terrain</span>
          <span style={{ marginLeft: "auto" }}><Chip color={T.warn}>{auditsTodo} audits à finaliser</Chip></span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead><tr>{["Fournisseur", "Pays", "Statut", "Audit", "Score", "Prix 2027"].map((c, j) => (
              <th key={c} style={{ textAlign: j === 0 ? "left" : j >= 4 ? "right" : "left", padding: "8px 10px", fontSize: 10, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>{c}</th>
            ))}</tr></thead>
            <tbody>
              {PROD_SUPPLIERS.map((s) => (
                <tr key={s.name} style={{ cursor: "pointer" }}>
                  <td style={{ padding: "11px 10px", borderBottom: `1px solid ${T.lineSoft}` }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                      <span style={{ fontWeight: 800, color: T.accent }}>{s.name}</span><GradeChip g={s.g} />
                    </span>
                  </td>
                  <td style={{ color: T.sub, fontFamily: MONO, borderBottom: `1px solid ${T.lineSoft}` }}>{s.pays}</td>
                  <td style={{ borderBottom: `1px solid ${T.lineSoft}` }}><span style={{ fontFamily: MONO, fontSize: 11.5, color: s.statut === "Ouvert" ? T.sub : T.warn }}>{s.statut}</span></td>
                  <td style={{ borderBottom: `1px solid ${T.lineSoft}` }}><AuditChip s={s.audit} /></td>
                  <td style={{ textAlign: "right", fontFamily: MONO, fontWeight: 800, color: s.score >= 85 ? T.ok : s.score >= 70 ? T.warn : T.bad, borderBottom: `1px solid ${T.lineSoft}` }}>{s.score}</td>
                  <td style={{ textAlign: "right", borderBottom: `1px solid ${T.lineSoft}` }}>{s.prix2027 ? <Check size={15} color={T.ok} /> : <X size={15} color={T.bad} />}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Règles de performance — cascade Groupe & simulation
   ============================================================ */
const CASCADE_SCOPE = {
  "Offre & Collection": "PVI, marge, volumes et empreinte produit",
  "Go to Market": "scénarios de prix, volume et sourcing",
  "Supply": "coût rendu, capacité et risque fournisseur",
  "KFI": "allocation industrielle et trajectoire panel",
};
const SIM_SCEN = [
  { id: "actuel", name: "Trajectoire actuelle", ca: 43.8, co2: 5376, marge: 55, note: "Plan de collection inchangé" },
  { id: "proche", name: "Sourcing proche", ca: 42.9, co2: 4515, marge: 53.2, note: "−16 % CO₂ · coût d'achat +3,4 %" },
  { id: "volumes", name: "Réduction des volumes", ca: 41.7, co2: 4784, marge: 55.8, note: "−11 % CO₂ · démarque réduite" },
  { id: "mix", name: "Mix recommandé par l'agent", ca: 43.2, co2: 4398, marge: 54.1, note: "Proche sur 4 références à risque" },
];
function CascadeBanner({ st, area }) {
  const list = st.breaches.filter((b) => b.area === area);
  const ok = list.length === 0;
  const c = ok ? T.ok : T.bad;
  return (
    <div style={{ background: `${c}10`, border: `1px solid ${c}66`, borderRadius: 12, padding: "11px 14px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
        <ShieldCheck size={15} color={c} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>Règles Groupe appliquées</span>
        <span style={{ fontSize: 11.5, color: T.sub }}>{CASCADE_SCOPE[area]}</span>
        <span style={{ marginLeft: "auto" }}><Chip color={c}>{ok ? "Conforme" : `${list.length} infraction${list.length > 1 ? "s" : ""}`}</Chip></span>
      </div>
      {!ok && (
        <div style={{ fontSize: 11.5, color: T.sub, marginTop: 6, lineHeight: 1.5 }}>
          <strong style={{ color: c }}>{list[0].label}</strong> · Arbitrage : {list[0].action}
        </div>
      )}
    </div>
  );
}
function PerformancePage({ st }) {
  const { perfRules: r, setPerfRules, collectionCO2, breaches } = st;
  const [scen, setScen] = useState("mix");
  const s = SIM_SCEN.find((x) => x.id === scen);
  const [scan, setScan] = useState("idle");
  const runScan = () => { setScan("running"); setTimeout(() => setScan("done"), 1100); };
  const budgetAlerts = useMemo(() => {
    const lvl = (used, total) => (used > total ? "Dépassement" : used / total > 0.85 ? "Vigilance" : "OK");
    const items = [
      { entity: "Chef de produit Bébé", metric: "Chiffre d'affaires", used: 43.8, total: r.caEnvelope, unit: "M€" },
      { entity: "Chef de produit Bébé", metric: "Carbone", used: collectionCO2, total: r.carbonEnvelope, unit: "t CO₂e" },
      ...CDP_CONTRIB.slice(1).map((c) => ({ entity: c.name.replace("CDP", "Chef de produit"), metric: "Chiffre d'affaires", used: c.ca, total: c.budget, unit: "M€" })),
      { entity: "Chef de marché — Collection Enfant", metric: "Carbone consolidé (×3)", used: +(collectionCO2 * 3).toFixed(1), total: r.carbonEnvelope * 3, unit: "t CO₂e" },
      { entity: "Chef de marché — Collection Enfant", metric: "Chiffre d'affaires consolidé (×3)", used: 131.4, total: r.caEnvelope * 3, unit: "M€" },
    ];
    const rank = { "Dépassement": 0, "Vigilance": 1, "OK": 2 };
    return items.map((i) => ({ ...i, pct: Math.round((i.used / i.total) * 100), level: lvl(i.used, i.total) })).sort((a, b) => rank[a.level] - rank[b.level]);
  }, [r, collectionCO2]);
  const nbAlerts = budgetAlerts.filter((a) => a.level !== "OK").length;
  const setR = (k, v) => setPerfRules((p) => ({ ...p, [k]: v }));
  const fields = [
    { k: "caEnvelope", label: "Enveloppe chiffre d'affaires", unit: "M€", step: 1 },
    { k: "carbonEnvelope", label: "Enveloppe carbone", unit: "t CO₂e", step: 100 },
    { k: "minMargin", label: "Marge entrée minimale", unit: "%", step: 0.5 },
    { k: "maxProductCO2", label: "Empreinte produit maximale", unit: "kg CO₂e/pièce", step: 0.1 },
  ];
  const areas = ["Offre & Collection", "Go to Market", "Supply", "KFI"];
  const kpis = [
    { label: "Impact financier", val: `${s.ca.toLocaleString("fr-FR")} M€`, ok: s.ca <= r.caEnvelope, icon: Wallet },
    { label: "Impact carbone", val: `${u(s.co2)} t CO₂e`, ok: s.co2 <= r.carbonEnvelope, icon: Leaf },
    { label: "Marge entrée", val: `${s.marge.toLocaleString("fr-FR")} %`, ok: s.marge >= r.minMargin, icon: TrendingUp },
  ];
  const reco = s.co2 > r.carbonEnvelope
    ? "Le carbone dépasse l'enveloppe Groupe : basculer les références les plus émissives vers le sourcing proche pour revenir sous le plafond."
    : "La trajectoire carbone est compatible avec l'enveloppe Groupe : diffusion aux opérations possible sans arbitrage supplémentaire.";
  const fmtM = (n) => n.toLocaleString("fr-FR", { maximumFractionDigits: 1 });
  const fmtT = (n) => u(Math.round(n));
  const card = { background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)" };

  return (
    <div>
      <PageHeader
        title="Règles de performance"
        desc="Le poste de pilotage Groupe : écrire les règles financières et carbone, mesurer leur application en temps réel et arbitrer avant diffusion aux opérations."
        expert={{ role: "Leader performance", txt: "Cadre les enveloppes et orchestre les arbitrages Groupe." }}
      />

      {/* B. Moteur de règles + Impact instantané */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 16, marginBottom: 18 }}>
        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <Scale size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Moteur de règles Groupe</span>
            <span style={{ marginLeft: "auto" }}><Chip color={T.ok}>Actif</Chip></span>
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
          <div style={{ fontSize: 10.5, color: T.faint, marginTop: 10, fontFamily: MONO }}>Toute saisie recalcule instantanément jauges, infractions et bandeaux des 4 pages opérationnelles.</div>
        </div>

        <div style={card}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <Sparkles size={15} color={T.human} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Impact instantané</span>
            <span style={{ marginLeft: "auto" }}><Chip color={breaches.length ? T.bad : T.ok}>{breaches.length} infraction{breaches.length > 1 ? "s" : ""}</Chip></span>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
            <PMGauge icon={Wallet} label="CA engagé / enveloppe" used={43.8} total={r.caEnvelope} unit="M€" fmt={fmtM} color={T.accent} />
            <PMGauge icon={Leaf} label="CO₂ engagé / enveloppe" used={collectionCO2} total={r.carbonEnvelope} unit="t CO₂e" fmt={fmtT} color={collectionCO2 > r.carbonEnvelope ? T.bad : T.ok} />
          </div>
          <span style={microLbl}>Arbitrages proposés</span>
          {breaches.length === 0 ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: T.ok }}><Check size={14} /> Toutes les règles sont respectées.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {breaches.slice(0, 4).map((b, i) => (
                <div key={i} style={{ background: T.panel2, border: `1px solid ${T.bad}44`, borderRadius: 9, padding: "8px 11px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}><Chip color={T.bad}>{b.area}</Chip><span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink }}>{b.label}</span></div>
                  <div style={{ fontSize: 11, color: T.sub, marginTop: 3 }}>Arbitrage : {b.action}</div>
                </div>
              ))}
            </div>
          )}

          {/* Scan de l'organisation — alertes budget */}
          <div style={{ marginTop: 14, borderTop: `1px dashed ${T.line}`, paddingTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: scan === "done" ? 10 : 0 }}>
              <button onClick={runScan} disabled={scan === "running"} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: scan === "running" ? "default" : "pointer", background: scan === "running" ? T.line : T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 15px", fontSize: 12, fontWeight: 800, fontFamily: SANS }}>
                <Network size={14} /> {scan === "idle" ? "Scanner l'organisation" : scan === "running" ? "Scan en cours…" : "Relancer le scan"}
              </button>
              {scan === "running" && <span style={{ fontSize: 11.5, color: T.faint, fontFamily: MONO }}>analyse des cockpits chefs de produit et chef de marché…</span>}
              {scan === "done" && <span style={{ marginLeft: "auto" }}><Chip color={nbAlerts ? T.warn : T.ok}>{nbAlerts ? `${nbAlerts} alerte${nbAlerts > 1 ? "s" : ""} budget` : "Aucune alerte budget"}</Chip></span>}
            </div>
            {scan === "done" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {budgetAlerts.map((a, i) => {
                  const c = a.level === "Dépassement" ? T.bad : a.level === "Vigilance" ? T.warn : T.ok;
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: T.panel2, border: `1px solid ${c}55`, borderRadius: 9, padding: "8px 11px" }}>
                      <span style={{ width: 7, height: 7, borderRadius: 99, background: c, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11.5, fontWeight: 700, color: T.ink }}>{a.entity} <span style={{ color: T.faint, fontWeight: 600 }}>· {a.metric}</span></div>
                        <div style={{ fontSize: 10.5, fontFamily: MONO, color: T.sub, marginTop: 2 }}>{a.used.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} / {a.total.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} {a.unit} · {a.pct} % engagé</div>
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

      {/* C. Cascade opérationnelle */}
      <div style={{ ...card, marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <GitBranch size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Cascade opérationnelle — une règle, quatre traductions métier</span>
        </div>
        <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Chaque règle Groupe est traduite dans le périmètre de chaque équipe et affichée en bandeau sur sa page.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
          {areas.map((a) => {
            const n = breaches.filter((b) => b.area === a).length;
            const c = n ? T.bad : T.ok;
            return (
              <div key={a} style={{ background: T.panel2, border: `1px solid ${c}55`, borderRadius: 11, padding: "11px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <ShieldCheck size={14} color={c} /><span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{a}</span>
                  <span style={{ marginLeft: "auto" }}><Chip color={c}>{n ? `${n} alerte${n > 1 ? "s" : ""}` : "OK"}</Chip></span>
                </div>
                <div style={{ fontSize: 11, color: T.sub, marginTop: 6, lineHeight: 1.45 }}>{CASCADE_SCOPE[a]}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* D. Agent de simulation */}
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <Sparkles size={15} color={T.human} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Agent de simulation finance + carbone</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontFamily: MONO, fontSize: 11, color: T.human }}><Sparkles size={12} /> simulation Venso</span>
        </div>
        <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Chaque scénario est évalué en direct contre les règles Groupe en vigueur.</div>
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
                <div style={{ marginTop: 7 }}><Chip color={c}>{k.ok ? "Dans la règle" : "Hors règle"}</Chip></div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 10, padding: "10px 13px" }}>
          <Sparkles size={14} color={T.human} style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 12, color: T.ink, lineHeight: 1.5 }}><strong>Recommandation de l'agent —</strong> {reco} <span style={{ color: T.faint, fontFamily: MONO, fontSize: 11 }}>({s.note})</span></div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Budget & Arbitrage — rituel budgétaire en 4 étapes
   ============================================================ */
const IND = [
  { k: "budget", label: "Budget", unit: "M€", step: 10, fmt: (v) => `${u(v)} M€` },
  { k: "demarque", label: "Démarque", unit: "%", step: 0.5, fmt: (v) => `${fr1(v)} %` },
  { k: "pvm", label: "Prix de vente moyen", unit: "€", step: 0.1, fmt: (v) => `${fr2(v)} €` },
  { k: "tme", label: "TME", unit: "%", step: 0.5, fmt: (v) => `${fr1(v)} %` },
  { k: "tmv", label: "TMV", unit: "%", step: 0.5, fmt: (v) => `${fr1(v)} %` },
];
const numInput = { width: 86, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 8, padding: "6px 8px", fontFamily: MONO, fontSize: 12.5, fontWeight: 700, color: T.ink, outline: "none", textAlign: "right" };
const cardB = { background: T.panel, border: `1px solid ${T.lineSoft}`, borderRadius: 14, padding: 18, boxShadow: "0 1px 4px rgba(0,83,160,.06)", marginBottom: 16 };
const ResetBtn = ({ onClick }) => (
  <button onClick={onClick} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", background: "transparent", color: T.faint, border: `1px solid ${T.line}`, borderRadius: 8, padding: "5px 11px", fontSize: 11, fontWeight: 700, fontFamily: SANS }}><RotateCcw size={12} /> Réinitialiser l'étape</button>
);
const StatusChip = ({ s }) => <Chip color={s === "vert" ? T.ok : s === "orange" ? T.warn : T.bad}>{s === "vert" ? "Dans la trajectoire" : s === "orange" ? "Déviation" : "Hors trajectoire"}</Chip>;

/* Analyse d'une copie remontée contre l'objectif envoyé */
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
  const verdict = !chaineOk ? "Incohérence" : Math.abs(ecartPct) > 1 ? "Écart" : "Conforme";
  let txt;
  if (!chaineOk) txt = `Avec ${fr1(c.demarque)} % de démarque et un PVM de ${fr2(c.pvm)} €, le prix net moyen ressort à ${fr2(prixNet)} € ; au TME de ${fr1(c.tme)} %, le coût moyen est ${fr2(cout)} €, soit un TMV attendu de ${fr1(tmvExp)} %. Le TMV déclaré de ${fr1(c.tmv)} % ne se réconcilie pas (${dTmv > 0 ? "+" : ""}${fr1(dTmv)} pts) — inversement, le TME cohérent avec ce TMV serait ${fr1(tmeExp)} % (${dTme > 0 ? "+" : ""}${fr1(dTme)} pts).`;
  else if (verdict === "Écart") txt = `Chaîne marge cohérente (TMV attendu ${fr1(tmvExp)} %, déclaré ${fr1(c.tmv)} %), mais budget remonté à ${u(c.budget)} M€ contre ${u(obj.budget)} M€ d'objectif : ${ecart > 0 ? "+" : ""}${u(ecart)} M€ (${ecartPct > 0 ? "+" : ""}${fr1(ecartPct)} %) hors enveloppe.`;
  else txt = `Copie conforme : budget aligné sur l'objectif (${u(c.budget)} M€), chaîne marge réconciliée (TMV attendu ${fr1(tmvExp)} %, déclaré ${fr1(c.tmv)} %).`;
  return { verdict, txt, ecart, ecartPct, tmvExp, tmeExp, dTmv, chaineOk };
};

function BudgetModule() {
  const [step, setStep] = useState(1);
  const [glob, setGlob] = useState({ ...BUDGET_GLOBAL });
  const [depts, setDepts] = useState(BUDGET_DEPTS.map((d) => ({ ...d })));
  const [sentAt, setSentAt] = useState(null);
  const [mailOpen, setMailOpen] = useState(null);
  const [received, setReceived] = useState(false);
  const [month, setMonth] = useState(0);
  const [metric, setMetric] = useState("ca");

  const setG = (k, v) => setGlob((g) => ({ ...g, [k]: v }));
  const setD = (i, k, v) => setDepts((ds) => ds.map((d, j) => (j === i ? { ...d, [k]: v } : d)));
  const num = (e) => (e.target.value === "" ? 0 : +e.target.value);
  const sumDepts = depts.reduce((s, d) => s + d.budget, 0);
  const sumOk = Math.abs(sumDepts - glob.budget) <= glob.budget * 0.01;

  /* Étape 3 — analyse */
  const analyses = received ? BUDGET_COPIES.map((c) => ({ c, obj: depts.find((d) => d.n === c.n) || c, a: analyseCopie(c, depts.find((d) => d.n === c.n) || c) })) : [];
  const sumCopies = BUDGET_COPIES.reduce((s, c) => s + c.budget, 0);
  const gapGlobal = sumCopies - glob.budget;
  const gapPct = (gapGlobal / glob.budget) * 100;
  const aReprendre = analyses.filter((x) => x.a.verdict !== "Conforme").sort((x, y) => (x.a.verdict === "Incohérence" ? -1 : 1));

  /* Étape 4 — monitoring */
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
    if (x.devTmv > 2) parts.push(`démarque à ${fr1(x.demRe)} % en ${MOIS_LONG[month]} vs ${fr1(x.demPh)} % phasé, impact ${x.tmvRe - x.tmvPh > 0 ? "+" : "−"}${fr1(Math.abs(x.tmvRe - x.tmvPh))} point de TMV projeté`);
    if (x.devCa > 2) parts.push(`CA cumulé à ${u(Math.round(x.cumReel))} M€ vs ${u(Math.round(x.cumPhased))} M€ phasé (${x.fac > 1 ? "+" : "−"}${fr1(Math.abs(x.fac - 1) * 100)} %)`);
    return { n: x.d.n, status: x.status, txt: parts.join(" · ") };
  });
  const projTotal = mon.reduce((s, x) => s + x.proj, 0);
  const projTmv = mon.reduce((s, x) => s + x.tmvRe * x.d.budget, 0) / Math.max(1, depts.reduce((s, d) => s + d.budget, 0));
  const projGap = projTotal - glob.budget;

  /* Séries annuelles pour la courbe (phasé sur 12 mois, réel jusqu'au mois courant) */
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
  const mLabel = { ca: "CA cumulé (M€)", dem: "Démarque pondérée (%)", tmv: "TMV pondéré (%)" };

  const STEPS = [["Budget global", "top-down"], ["Déclinaison", "par département"], ["Remontées & arbitrage", "bottom-up"], ["Monitoring", "annuel"]];

  return (
    <div>
      {/* Stepper */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 18 }}>
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

      {/* ---- Étape 1 ---- */}
      {step === 1 && (
        <div style={cardB}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Wallet size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Budget global Kiabi — exercice sept. 2026 → août 2027</span>
            <ResetBtn onClick={() => setGlob({ ...BUDGET_GLOBAL })} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Indicateurs posés par le Groupe avant déclinaison. Toutes les valeurs sont modifiables.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 10 }}>
            {[["budget", "Budget global", "M€", 10], ["demarque", "Taux de démarque global", "%", 0.5], ["pvm", "Prix de vente moyen", "€", 0.1], ["tme", "TME — taux de marge entrée", "%", 0.5], ["tmv", "TMV — taux de marge sur vente", "%", 0.5]].map(([k, l, unit, stp]) => (
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
            <span style={{ fontSize: 11.5, color: T.ink }}>Contrôle de chaîne : au TME de {fr1(glob.tme)} % et {fr1(glob.demarque)} % de démarque, le TMV attendu est <strong>{fr1(tmvModel(glob.tme, glob.demarque))} %</strong> — {Math.abs(tmvModel(glob.tme, glob.demarque) - glob.tmv) <= 1.5 ? "cohérent avec le TMV posé." : "le TMV posé ne se réconcilie pas."}</span>
            <span style={{ marginLeft: "auto" }}><Chip color={Math.abs(tmvModel(glob.tme, glob.demarque) - glob.tmv) <= 1.5 ? T.ok : T.bad}>{Math.abs(tmvModel(glob.tme, glob.demarque) - glob.tmv) <= 1.5 ? "Chaîne cohérente" : "À corriger"}</Chip></span>
          </div>
          <div style={{ marginTop: 14 }}><button onClick={() => setStep(2)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}>Décliner par département <ArrowRight size={14} /></button></div>
        </div>
      )}

      {/* ---- Étape 2 ---- */}
      {step === 2 && (
        <div style={cardB}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Layers size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Déclinaison par département</span>
            <ResetBtn onClick={() => { setDepts(BUDGET_DEPTS.map((d) => ({ ...d }))); setSentAt(null); setMailOpen(null); }} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Répartition éditable des 5 indicateurs. La somme des budgets doit égaler le budget global ({u(glob.budget)} M€).</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr>
                <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>Département</th>
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
                  <td style={{ padding: "8px 8px", fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Total départements</td>
                  <td style={{ textAlign: "right", padding: "8px 8px", fontFamily: MONO, fontSize: 12.5, fontWeight: 800, color: sumOk ? T.ok : T.bad }}>{u(sumDepts)} M€</td>
                  <td colSpan={4} style={{ textAlign: "right", padding: "8px 8px" }}><Chip color={sumOk ? T.ok : T.bad}>{sumOk ? `= budget global ${u(glob.budget)} M€` : `écart ${sumDepts - glob.budget > 0 ? "+" : ""}${u(sumDepts - glob.budget)} M€ vs global`}</Chip></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <button onClick={() => setSentAt(new Date().toLocaleDateString("fr-FR"))} disabled={!sumOk} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: sumOk ? "pointer" : "default", background: sumOk ? T.accent : T.line, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Send size={14} /> Envoyer les objectifs aux responsables</button>
            {!sumOk && <span style={{ fontSize: 11.5, color: T.bad }}>Ajustez les budgets pour retrouver le total global avant envoi.</span>}
            {sentAt && <button onClick={() => setStep(3)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.panel2, color: T.ink, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}>Attendre les remontées <ArrowRight size={14} /></button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 10, marginTop: 14 }}>
            {depts.map((d, i) => (
              <div key={d.n} style={{ background: T.panel2, border: `1px solid ${sentAt ? T.ok + "55" : T.line}`, borderRadius: 11, padding: "11px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{d.n}</span>
                  <span style={{ marginLeft: "auto" }}><Chip color={sentAt ? T.ok : T.faint}>{sentAt ? `Objectifs envoyés le ${sentAt}` : "En préparation"}</Chip></span>
                </div>
                <div style={{ fontSize: 10.5, color: T.faint, marginTop: 4 }}>{d.resp} · {u(d.budget)} M€ · TME {fr1(d.tme)} % · TMV {fr1(d.tmv)} %</div>
                {sentAt && <button onClick={() => setMailOpen(mailOpen === i ? null : i)} style={{ marginTop: 8, cursor: "pointer", background: "transparent", color: T.blue, border: "none", padding: 0, fontSize: 11.5, fontWeight: 700, fontFamily: SANS }}>{mailOpen === i ? "Masquer le mail" : "Voir le mail envoyé →"}</button>}
                {sentAt && mailOpen === i && (
                  <div style={{ marginTop: 8, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 11px", fontSize: 11.5, color: T.sub, lineHeight: 1.6 }}>
                    <div><strong style={{ color: T.ink }}>Objet :</strong> Objectifs budgétaires 2026-2027 — {d.n}</div>
                    <div style={{ marginTop: 5 }}>Bonjour, voici les objectifs posés pour votre département dans le cadre du budget Groupe de {u(glob.budget)} M€ : budget <strong>{u(d.budget)} M€</strong>, démarque <strong>{fr1(d.demarque)} %</strong>, prix de vente moyen <strong>{fr2(d.pvm)} €</strong>, TME <strong>{fr1(d.tme)} %</strong>, TMV <strong>{fr1(d.tmv)} %</strong>. Merci de remonter votre copie sous 15 jours. — Leader performance</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ---- Étape 3 ---- */}
      {step === 3 && (
        <div style={cardB}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Scale size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Remontées & arbitrage — agent d'arbitrage</span>
            <ResetBtn onClick={() => setReceived(false)} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Chaque département remonte sa copie ; l'agent contrôle la chaîne marge (PVM × (1 − démarque) ↔ TMV, TME ↔ TMV & démarque) et la somme des budgets à 1 % de tolérance.</div>
          {!received ? (
            <button onClick={() => setReceived(true)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.human, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}><Sparkles size={14} /> Simuler la réception des copies</button>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 10, marginBottom: 14 }}>
                {analyses.map(({ c, obj, a }) => {
                  const col = a.verdict === "Conforme" ? T.ok : a.verdict === "Écart" ? T.warn : T.bad;
                  return (
                    <div key={c.n} style={{ background: T.panel2, border: `1px solid ${col}66`, borderRadius: 11, padding: "12px 13px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{c.n}</span>
                        <span style={{ marginLeft: "auto" }}><Chip color={col}>{a.verdict === "Écart" ? `Écart ${a.ecart > 0 ? "+" : ""}${u(a.ecart)} M€` : a.verdict}</Chip></span>
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
                  <span style={microLbl}>Écart global</span>
                  <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: Math.abs(gapPct) <= 1 ? T.ok : T.bad }}>{gapGlobal > 0 ? "+" : ""}{u(gapGlobal)} M€ <span style={{ fontSize: 12 }}>({gapPct > 0 ? "+" : ""}{fr1(gapPct)} %)</span></div>
                  <div style={{ fontSize: 11.5, color: T.sub, marginTop: 4 }}>Somme des remontées {u(sumCopies)} M€ vs budget posé {u(glob.budget)} M€ — tolérance 1 % {Math.abs(gapPct) <= 1 ? "respectée" : "dépassée"}.</div>
                </div>
                <div style={{ background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "12px 13px" }}>
                  <span style={microLbl}>Recommandation d'arbitrage</span>
                  {aReprendre.length === 0 ? <div style={{ fontSize: 12, color: T.ink }}>Toutes les copies sont conformes : budget consolidé validable.</div> : aReprendre.map(({ c, a }) => (
                    <div key={c.n} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: T.ink, lineHeight: 1.5, marginBottom: 6 }}>
                      <ArrowRight size={13} color={T.human} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span><strong>{c.n}</strong> doit reprendre sa copie : {a.verdict === "Incohérence" ? `TMV déclaré incompatible avec sa démarque et son PVM (${a.dTmv > 0 ? "+" : ""}${fr1(a.dTmv)} pts) — priorité 1, la chaîne marge doit être réconciliée avant tout arbitrage budgétaire.` : `budget ${a.ecart > 0 ? "+" : ""}${u(a.ecart)} M€ hors objectif, porteur de l'écart global de ${fr1(gapPct)} % — à ramener dans l'enveloppe ou à justifier par un gain de TMV.`}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 14 }}><button onClick={() => setStep(4)} style={{ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: T.accent, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS }}>Passer au monitoring annuel <ArrowRight size={14} /></button></div>
            </div>
          )}
        </div>
      )}

      {/* ---- Étape 4 ---- */}
      {step === 4 && (
        <div style={cardB}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <TrendingUp size={15} color={T.accent} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Monitoring annuel — agent monitoring</span>
            <ResetBtn onClick={() => setMonth(0)} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Réel simulé par département vs trajectoire budgétaire phasée (pics Noël, soldes de janvier et juillet, rentrée). Vert ≤ 2 pts · orange 2 – 4 pts · rouge &gt; 4 pts.</div>
          <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Mois</span>
              <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: T.ink }}>{MOIS_LONG[month]} {month < 4 ? 2026 : 2027}</span>
              <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: T.faint }}>{fr1(cumPh * 100)} % du budget annuel phasé</span>
            </div>
            <input type="range" min={0} max={11} value={month} onChange={(e) => setMonth(+e.target.value)} style={{ width: "100%", accentColor: T.accent }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 9.5, color: T.faint, marginTop: 4 }}>{MOIS.map((m) => <span key={m}>{m}</span>)}</div>
          </div>

          {/* Courbe annuelle : trajectoire phasée vs réel cumulé jusqu'au mois courant */}
          <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
              <TrendingUp size={14} color={T.accent} /><span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>Trajectoire de l'exercice — {mLabel[metric]}</span>
              <span style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                {[["ca", "CA cumulé"], ["dem", "Démarque"], ["tmv", "TMV"]].map(([id, l]) => (
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
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, borderTop: `2px dashed ${T.blue}` }} /> Trajectoire budgétaire phasée (12 mois)</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, borderTop: `2.6px solid ${T.accent}` }} /> Réel simulé jusqu'à {MOIS_LONG[month]}</span>
              <span style={{ marginLeft: "auto", fontFamily: MONO, color: T.faint }}>écart {metric === "ca" ? `${series[month].re - series[month].ph > 0 ? "+" : "−"}${u(Math.round(Math.abs(series[month].re - series[month].ph)))} M€` : `${series[month].re - series[month].ph > 0 ? "+" : "−"}${fr1(Math.abs(series[month].re - series[month].ph))} pt`}</span>
            </div>
          </div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr>{["Département", "Statut", "CA cumulé réel / phasé", "Démarque réel / phasé", "TMV réel / phasé", "Déviation max"].map((c, j) => <th key={c} style={{ textAlign: j === 0 ? "left" : "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{c}</th>)}</tr></thead>
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
              <span style={microLbl}>Alertes de l'agent monitoring</span>
              {alerts.length === 0 ? <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: T.ok }}><Check size={14} /> Tous les départements sont dans la trajectoire.</div> : alerts.map((a) => (
                <div key={a.n} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 11.5, color: T.ink, lineHeight: 1.5, marginBottom: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, flexShrink: 0, marginTop: 5, background: a.status === "orange" ? T.warn : T.bad }} />
                  <span><strong>{a.n}</strong> : {a.txt}</span>
                </div>
              ))}
            </div>
            <div style={{ background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "12px 13px" }}>
              <span style={microLbl}>Projection fin d'exercice (au rythme actuel)</span>
              <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: projGap >= 0 ? T.ok : Math.abs(projGap) / glob.budget > 0.02 ? T.bad : T.warn }}>{u(Math.round(projTotal))} M€ <span style={{ fontSize: 12, color: T.sub }}>vs budget {u(glob.budget)} M€ ({projGap > 0 ? "+" : ""}{fr1((projGap / glob.budget) * 100)} %)</span></div>
              <div style={{ fontSize: 11.5, color: T.sub, marginTop: 5, lineHeight: 1.5 }}>TMV projeté pondéré <strong style={{ color: T.ink }}>{fr1(projTmv)} %</strong> vs {fr1(glob.tmv)} % budgété ({projTmv - glob.tmv > 0 ? "+" : "−"}{fr1(Math.abs(projTmv - glob.tmv))} pt). {mon.filter((x) => x.status === "rouge").length ? `${mon.filter((x) => x.status === "rouge").map((x) => x.d.n).join(", ")} porte l'essentiel de l'écart.` : "Aucun département hors trajectoire."}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BudgetPage({ st }) {
  return (
    <div>
      <PageHeader
        title="Budget & Arbitrage Financier"
        desc="Le rituel budgétaire annuel Kiabi en quatre étapes : poser le budget global, le décliner, arbitrer les remontées et piloter l'exercice mois par mois."
        expert={{ role: "Leader performance", txt: "Cadre les enveloppes, arbitre les copies des départements et orchestre le pilotage Groupe." }}
      />
      <BudgetModule />
    </div>
  );
}

/* ============================================================
   Budget & Arbitrage CO₂ — rituel carbone en 4 étapes (accent vert)
   ============================================================ */
const G = T.ok;
const cardG = { ...cardB, borderColor: `${G}44` };
const CO2_IND = [
  { k: "budget", label: "Budget CO₂", unit: "t CO₂e", step: 100, fmt: (v) => `${u(Math.round(v))} t` },
  { k: "intensite", label: "Intensité", unit: "kg/pièce", step: 0.05, fmt: (v) => `${fr2(v)} kg` },
  { k: "volume", label: "Volume", unit: "M pièces", step: 0.5, fmt: (v) => `${fr1(v)} M` },
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
  const verdict = !arithOk || !mixOk ? "Incohérence" : Math.abs(ecartPct) > 1 ? "Écart" : "Conforme";
  let txt;
  if (!arithOk) txt = `Le budget déclaré (${u(Math.round(c.budget))} t) ne correspond pas à volume × intensité (${fr1(c.volume)} M × ${fr2(c.intensite)} kg = ${u(Math.round(calc))} t).`;
  else if (!mixOk) txt = `L'intensité déclarée de ${fr2(c.intensite)} kg/pièce est ${fr1(Math.abs(mixDev) * 100)} % ${mixDev < 0 ? "en dessous" : "au-dessus"} de l'intensité de son mix produit (${fr2(obj.mixInt)} kg). Sur ${fr1(c.volume)} M pièces, le budget attendu est ${u(Math.round(attendu))} t : la copie ${mixDev < 0 ? "sous-estime" : "surestime"} les émissions de ${u(Math.round(Math.abs(attendu - c.budget)))} t.`;
  else if (verdict === "Écart") txt = `Chaîne cohérente (${fr1(c.volume)} M × ${fr2(c.intensite)} kg = ${u(Math.round(calc))} t), mais budget remonté à ${u(Math.round(c.budget))} t contre ${u(Math.round(obj.budget))} t d'objectif : ${ecart > 0 ? "+" : ""}${u(Math.round(ecart))} t (${ecartPct > 0 ? "+" : ""}${fr1(ecartPct)} %), porté par ${fr1(c.volume - obj.volume) !== "0" ? `des volumes à ${fr1(c.volume)} M vs ${fr1(obj.volume)} M planifiés` : "l'intensité"}.`;
  else txt = `Copie conforme : ${fr1(c.volume)} M pièces × ${fr2(c.intensite)} kg = ${u(Math.round(calc))} t, aligné sur l'objectif de ${u(Math.round(obj.budget))} t.`;
  return { verdict, txt, ecart, ecartPct, attendu, mixOk, arithOk };
};

function CO2Module() {
  const [step, setStep] = useState(1);
  const [glob, setGlob] = useState({ ...CO2_GLOBAL });
  const [depts, setDepts] = useState(CO2_DEPTS.map((d) => ({ ...d })));
  const [sentAt, setSentAt] = useState(null);
  const [mailOpen, setMailOpen] = useState(null);
  const [received, setReceived] = useState(false);
  const [month, setMonth] = useState(0);

  const setG = (k, v) => setGlob((g) => ({ ...g, [k]: v }));
  const setD = (i, k, v) => setDepts((ds) => ds.map((d, j) => (j === i ? { ...d, [k]: v } : d)));
  const num = (e) => (e.target.value === "" ? 0 : +e.target.value);
  const globCalc = calcT(glob);
  const globOk = Math.abs(globCalc - glob.budget) <= glob.budget * 0.01;
  const sumB = depts.reduce((s, d) => s + d.budget, 0);
  const sumV = depts.reduce((s, d) => s + d.volume, 0);
  const sumOk = Math.abs(sumB - glob.budget) <= glob.budget * 0.01;

  /* Étape 3 */
  const analyses = received ? CO2_COPIES.map((c) => { const obj = depts.find((d) => d.n === c.n) || { ...c, mixInt: c.intensite }; return { c, obj, a: analyseCO2(c, obj) }; }) : [];
  const sumCB = CO2_COPIES.reduce((s, c) => s + c.budget, 0);
  const sumCV = CO2_COPIES.reduce((s, c) => s + c.volume, 0);
  const gapB = sumCB - glob.budget, gapBPct = (gapB / glob.budget) * 100;
  const gapV = sumCV - glob.volume, gapVPct = (gapV / glob.volume) * 100;
  const intPond = sumCB / (sumCV * 1000);
  const aReprendre = analyses.filter((x) => x.a.verdict !== "Conforme").sort((x) => (x.a.verdict === "Incohérence" ? -1 : 1));

  /* Étape 4 */
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
  const alerts = mon.filter((x) => Math.abs(x.moisRe / x.moisPh - 1) > 0.02 || x.status !== "vert").map((x) => ({ n: x.d.n, status: x.status, txt: `${x.moisRe - x.moisPh >= 0 ? "+" : "−"}${u(Math.round(Math.abs(x.moisRe - x.moisPh)))} t CO₂e ${x.moisRe >= x.moisPh ? "au-dessus" : "en dessous"} de la trajectoire en ${MOIS_LONG[month]}, ${x.cause}${x.status !== "vert" ? ` · cumul ${x.fac > 1 ? "+" : "−"}${fr1(Math.abs(x.fac - 1) * 100)} %` : ""}` }));
  const projTotal = mon.reduce((s, x) => s + x.proj, 0);
  const projGap = projTotal - glob.budget;
  const leviersT = CO2_LEVIERS.map((l) => ({ ...l, t: (projTotal * l.pct) / 100 }));
  const leviersTot = leviersT.reduce((s, l) => s + l.t, 0);

  /* Courbe */
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

  const STEPS = [["Budget CO₂ global", "top-down"], ["Déclinaison", "par département"], ["Remontées & arbitrage", "bottom-up"], ["Monitoring CO₂", "annuel"]];
  const btn = (bg) => ({ display: "inline-flex", alignItems: "center", gap: 7, cursor: "pointer", background: bg, color: "#ffffff", border: "none", borderRadius: 9, padding: "9px 16px", fontSize: 12.5, fontWeight: 800, fontFamily: SANS });

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 18 }}>
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
            <Leaf size={15} color={G} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Budget CO₂ global Kiabi — exercice sept. 2026 → août 2027</span>
            <ResetBtn onClick={() => setGlob({ ...CO2_GLOBAL })} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Indicateurs carbone posés par le Groupe. Contrôle : volume × intensité = budget.</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 10 }}>
            {[["budget", "Budget CO₂ annuel", "t CO₂e", 1000], ["intensite", "Intensité moyenne par produit", "kg CO₂e / pièce", 0.05], ["volume", "Volume prévu", "M pièces", 1]].map(([k, l, unit, stp]) => (
              <label key={k} style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 10, padding: "10px 12px" }}>
                <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: T.sub, marginBottom: 6 }}>{l}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="number" step={stp} value={glob[k]} onChange={(e) => setG(k, num(e))} style={{ ...numInput, width: 120, fontSize: 15 }} /><span style={{ fontFamily: MONO, fontSize: 11, color: T.faint }}>{unit}</span></span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap", background: `${G}12`, border: `1px solid ${G}44`, borderRadius: 10, padding: "9px 12px" }}>
            <Sparkles size={14} color={G} />
            <span style={{ fontSize: 11.5, color: T.ink }}>Contrôle de cohérence : {fr1(glob.volume)} M pièces × {fr2(glob.intensite)} kg = <strong>{u(Math.round(globCalc))} t CO₂e</strong> — {globOk ? "cohérent avec le budget posé." : `écart de ${u(Math.round(Math.abs(globCalc - glob.budget)))} t avec le budget posé.`}</span>
            <span style={{ marginLeft: "auto" }}><Chip color={globOk ? T.ok : T.bad}>{globOk ? "Cohérent" : "À corriger"}</Chip></span>
          </div>
          <div style={{ marginTop: 14 }}><button onClick={() => setStep(2)} style={btn(G)}>Décliner par département <ArrowRight size={14} /></button></div>
        </div>
      )}

      {step === 2 && (
        <div style={cardG}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <Layers size={15} color={G} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Déclinaison carbone par département</span>
            <ResetBtn onClick={() => { setDepts(CO2_DEPTS.map((d) => ({ ...d }))); setSentAt(null); setMailOpen(null); }} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Répartition éditable du budget CO₂, de l'intensité et des volumes. La somme des budgets doit égaler {u(glob.budget)} t.</div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr>
                <th style={{ textAlign: "left", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}` }}>Département</th>
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
                  <td style={{ padding: "8px 8px", fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Total départements</td>
                  <td style={{ textAlign: "right", padding: "8px 8px", fontFamily: MONO, fontSize: 12.5, fontWeight: 800, color: sumOk ? T.ok : T.bad }}>{u(Math.round(sumB))} t</td>
                  <td style={{ textAlign: "right", padding: "8px 8px", fontFamily: MONO, fontSize: 11.5, color: T.sub }}>{fr2(sumB / (sumV * 1000 || 1))} kg</td>
                  <td style={{ textAlign: "right", padding: "8px 8px", fontFamily: MONO, fontSize: 11.5, color: Math.abs(sumV - glob.volume) <= glob.volume * 0.01 ? T.sub : T.warn }}>{fr1(sumV)} M</td>
                  <td style={{ textAlign: "right", padding: "8px 8px" }}><Chip color={sumOk ? T.ok : T.bad}>{sumOk ? `= budget global ${u(glob.budget)} t` : `écart ${sumB - glob.budget > 0 ? "+" : ""}${u(Math.round(sumB - glob.budget))} t`}</Chip></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
            <button onClick={() => setSentAt(new Date().toLocaleDateString("fr-FR"))} disabled={!sumOk} style={btn(sumOk ? G : T.line)}><Send size={14} /> Envoyer les objectifs aux responsables</button>
            {!sumOk && <span style={{ fontSize: 11.5, color: T.bad }}>Ajustez les budgets CO₂ pour retrouver le total global avant envoi.</span>}
            {sentAt && <button onClick={() => setStep(3)} style={{ ...btn(T.panel2), color: T.ink, border: `1px solid ${T.line}` }}>Attendre les remontées <ArrowRight size={14} /></button>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 10, marginTop: 14 }}>
            {depts.map((d, i) => (
              <div key={d.n} style={{ background: T.panel2, border: `1px solid ${sentAt ? G + "55" : T.line}`, borderRadius: 11, padding: "11px 13px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{d.n}</span>
                  <span style={{ marginLeft: "auto" }}><Chip color={sentAt ? G : T.faint}>{sentAt ? `Objectifs envoyés le ${sentAt}` : "En préparation"}</Chip></span>
                </div>
                <div style={{ fontSize: 10.5, color: T.faint, marginTop: 4 }}>{d.resp} · {u(Math.round(d.budget))} t · {fr2(d.intensite)} kg/pc · {fr1(d.volume)} M pcs</div>
                {sentAt && <button onClick={() => setMailOpen(mailOpen === i ? null : i)} style={{ marginTop: 8, cursor: "pointer", background: "transparent", color: T.blue, border: "none", padding: 0, fontSize: 11.5, fontWeight: 700, fontFamily: SANS }}>{mailOpen === i ? "Masquer le mail" : "Voir le mail envoyé →"}</button>}
                {sentAt && mailOpen === i && (
                  <div style={{ marginTop: 8, background: T.panel, border: `1px solid ${T.line}`, borderRadius: 9, padding: "9px 11px", fontSize: 11.5, color: T.sub, lineHeight: 1.6 }}>
                    <div><strong style={{ color: T.ink }}>Objet :</strong> Objectifs carbone 2026-2027 — {d.n}</div>
                    <div style={{ marginTop: 5 }}>Bonjour, dans le cadre du budget carbone Groupe de {u(glob.budget)} t CO₂e, voici vos objectifs : budget CO₂ <strong>{u(Math.round(d.budget))} t</strong>, intensité <strong>{fr2(d.intensite)} kg/pièce</strong>, volume <strong>{fr1(d.volume)} M pièces</strong>. Merci de remonter votre copie sous 15 jours. — Leader performance</div>
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
            <Scale size={15} color={G} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Remontées & arbitrage CO₂ — agent d'arbitrage</span>
            <ResetBtn onClick={() => setReceived(false)} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Contrôles en chaîne : volume × intensité = budget par département · intensité cohérente avec le mix produit · somme des budgets et des volumes cohérente avec le global (1 %).</div>
          {!received ? (
            <button onClick={() => setReceived(true)} style={btn(T.human)}><Sparkles size={14} /> Simuler la réception des copies</button>
          ) : (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 10, marginBottom: 14 }}>
                {analyses.map(({ c, obj, a }) => {
                  const col = a.verdict === "Conforme" ? T.ok : a.verdict === "Écart" ? T.warn : T.bad;
                  return (
                    <div key={c.n} style={{ background: T.panel2, border: `1px solid ${col}66`, borderRadius: 11, padding: "12px 13px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap", marginBottom: 6 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 800, color: T.ink }}>{c.n}</span>
                        <span style={{ marginLeft: "auto" }}><Chip color={col}>{a.verdict === "Écart" ? `Écart ${a.ecart > 0 ? "+" : ""}${u(Math.round(a.ecart))} t` : a.verdict}</Chip></span>
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
                  <span style={microLbl}>Écart global</span>
                  <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: Math.abs(gapBPct) <= 1 ? T.ok : T.bad }}>{gapB > 0 ? "+" : ""}{u(Math.round(gapB))} t <span style={{ fontSize: 12 }}>({gapBPct > 0 ? "+" : ""}{fr1(gapBPct)} %)</span></div>
                  <div style={{ fontSize: 11.5, color: T.sub, marginTop: 4, lineHeight: 1.5 }}>Somme des budgets remontés {u(Math.round(sumCB))} t vs {u(glob.budget)} t posés. Volumes {fr1(sumCV)} M vs {fr1(glob.volume)} M ({gapVPct > 0 ? "+" : ""}{fr1(gapVPct)} %) · intensité pondérée {fr2(intPond)} kg vs {fr2(glob.intensite)} kg.</div>
                </div>
                <div style={{ background: `${T.human}12`, border: `1px solid ${T.human}44`, borderRadius: 11, padding: "12px 13px" }}>
                  <span style={microLbl}>Recommandation d'arbitrage</span>
                  {aReprendre.length === 0 ? <div style={{ fontSize: 12, color: T.ink }}>Toutes les copies sont conformes : budget carbone consolidé validable.</div> : aReprendre.map(({ c, a }) => (
                    <div key={c.n} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12, color: T.ink, lineHeight: 1.5, marginBottom: 6 }}>
                      <ArrowRight size={13} color={T.human} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span><strong>{c.n}</strong> doit reprendre sa copie : {a.verdict === "Incohérence" ? `intensité incompatible avec son mix produit, budget sous-estimé de ${u(Math.round(a.attendu - c.budget))} t — priorité 1, la trajectoire réelle serait hors enveloppe dès le premier trimestre.` : `budget ${a.ecart > 0 ? "+" : ""}${u(Math.round(a.ecart))} t hors objectif par surplanification de volumes, porteur de l'écart global de ${fr1(gapBPct)} % — à ramener dans l'enveloppe ou à compenser par un levier transport.`}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 14 }}><button onClick={() => setStep(4)} style={btn(G)}>Passer au monitoring CO₂ <ArrowRight size={14} /></button></div>
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div style={cardG}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <TrendingUp size={15} color={G} /><span style={{ fontSize: 13, fontWeight: 800, color: T.ink }}>Monitoring CO₂ annuel — agent monitoring</span>
            <ResetBtn onClick={() => setMonth(0)} />
          </div>
          <div style={{ fontSize: 11.5, color: T.faint, marginBottom: 12 }}>Émissions réelles simulées vs trajectoire phasée (pics de production avant Noël et avant les soldes). Vert ≤ 2 % · orange 2 – 4 % · rouge &gt; 4 % en cumul.</div>
          <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontFamily: MONO, color: T.faint, textTransform: "uppercase" }}>Mois</span>
              <span style={{ fontFamily: MONO, fontSize: 14, fontWeight: 800, color: T.ink }}>{MOIS_LONG[month]} {month < 4 ? 2026 : 2027}</span>
              <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 11, color: T.faint }}>{fr1(cumPh * 100)} % des émissions annuelles phasées</span>
            </div>
            <input type="range" min={0} max={11} value={month} onChange={(e) => setMonth(+e.target.value)} style={{ width: "100%", accentColor: G }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 9.5, color: T.faint, marginTop: 4 }}>{MOIS.map((m) => <span key={m}>{m}</span>)}</div>
          </div>
          <div style={{ background: T.panel2, border: `1px solid ${T.line}`, borderRadius: 11, padding: "12px 14px", marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}><Leaf size={14} color={G} /><span style={{ fontSize: 12, fontWeight: 800, color: T.ink }}>Trajectoire de l'exercice — émissions cumulées (t CO₂e)</span></div>
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
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, borderTop: `2px dashed ${T.blue}` }} /> Trajectoire CO₂ phasée</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={{ width: 18, borderTop: `2.6px solid ${G}` }} /> Émissions réelles jusqu'à {MOIS_LONG[month]}</span>
              <span style={{ marginLeft: "auto", fontFamily: MONO, color: T.faint }}>écart {series[month].re - series[month].ph >= 0 ? "+" : "−"}{u(Math.abs(series[month].re - series[month].ph))} t</span>
            </div>
          </div>
          <div style={{ overflowX: "auto", marginBottom: 14 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead><tr>{["Département", "Statut", "Cumul réel / phasé", "Mois réel / phasé", "Écart cumul", "Cause"].map((c, j) => <th key={c} style={{ textAlign: j === 0 || j === 5 ? "left" : "right", padding: "6px 8px", fontSize: 9.5, fontFamily: MONO, textTransform: "uppercase", letterSpacing: 0.5, color: T.faint, borderBottom: `1px solid ${T.line}`, whiteSpace: "nowrap" }}>{c}</th>)}</tr></thead>
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
              <span style={microLbl}>Alertes de l'agent monitoring</span>
              {alerts.length === 0 ? <div style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: T.ok }}><Check size={14} /> Tous les départements sont dans la trajectoire carbone.</div> : alerts.map((a) => (
                <div key={a.n} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 11.5, color: T.ink, lineHeight: 1.5, marginBottom: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, flexShrink: 0, marginTop: 5, background: a.status === "vert" ? T.warn : a.status === "orange" ? T.warn : T.bad }} />
                  <span><strong>{a.n}</strong> : {a.txt}</span>
                </div>
              ))}
            </div>
            <div style={{ background: `${G}12`, border: `1px solid ${G}44`, borderRadius: 11, padding: "12px 13px" }}>
              <span style={microLbl}>Projection fin d'exercice (au rythme actuel)</span>
              <div style={{ fontFamily: MONO, fontSize: 20, fontWeight: 800, color: projGap <= 0 ? T.ok : projGap / glob.budget > 0.02 ? T.bad : T.warn }}>{u(Math.round(projTotal))} t <span style={{ fontSize: 12, color: T.sub }}>vs budget {u(glob.budget)} t ({projGap > 0 ? "+" : ""}{fr1((projGap / glob.budget) * 100)} %)</span></div>
              <span style={{ ...microLbl, marginTop: 10 }}>Leviers disponibles</span>
              {leviersT.map((l) => (
                <div key={l.n} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: `1px solid ${T.lineSoft}` }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: l.c, flexShrink: 0 }} />
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: T.ink, minWidth: 70 }}>{l.n}</span>
                  <span style={{ flex: 1, fontSize: 11, color: T.sub }}>{l.desc}</span>
                  <span style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 800, color: T.ok, whiteSpace: "nowrap" }}>−{u(Math.round(l.t))} t</span>
                </div>
              ))}
              <div style={{ fontSize: 11.5, color: T.sub, marginTop: 8, lineHeight: 1.5 }}>Potentiel cumulé <strong style={{ color: T.ink }}>−{u(Math.round(leviersTot))} t</strong> : {projGap > 0 ? (leviersTot >= projGap ? "suffisant pour revenir dans l'enveloppe." : `insuffisant, il resterait ${u(Math.round(projGap - leviersTot))} t à arbitrer.`) : "la trajectoire est déjà sous l'enveloppe, les leviers constituent une marge de sécurité."}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CO2Page() {
  return (
    <div>
      <PageHeader
        title="Budget & Arbitrage CO₂"
        desc="Le rituel carbone annuel Kiabi en quatre étapes : poser le budget CO₂ global, le décliner, arbitrer les remontées et piloter les émissions mois par mois."
        expert={{ role: "Leader performance", txt: "Cadre l'enveloppe carbone, arbitre les copies des départements et pilote la trajectoire CO₂ Groupe." }}
      />
      <CO2Module />
    </div>
  );
}

/* ============================================================
   App
   ============================================================ */

export default function App() {
  const [tab, setTab] = useState("performance");
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

  const lowCarbon = agentId === "bascarbone";
  const sel = PRODUITS.find((p) => p.id === selId) || PRODUITS[0];
  const delta = useMemo(() => {
    const d = { rev: 0, co2: 0, lead: 0, rup: 0 };
    AMELIO.forEach((ag) => ag.levers.forEach((lv) => { if (levers.has(lv.id)) Object.entries(lv.d).forEach(([k, v]) => { d[k] += v; }); }));
    return d;
  }, [levers]);
  /* Empreinte effective en kg CO₂e / pièce (stratégie Bas carbone + leviers) */
  const co2Eff = (p) => Math.max(0.1, +((p.co2 * (lowCarbon ? 0.72 : 1) + delta.co2).toFixed(1)));
  /* Total collection en t CO₂e = Σ volume effectif × empreinte effective / 1000 */
  const collectionCO2 = useMemo(
    () => +PRODUITS.reduce((sum, p) => sum + ((volMap[p.id] ?? p.volume) * co2Eff(p)) / 1000, 0).toFixed(1),
    [volMap, lowCarbon, delta]
  );
  /* Moteur d'infractions réactif */
  const breaches = useMemo(() => {
    const b = [];
    PRODUITS.forEach((p) => {
      const v = co2Eff(p);
      if (v > perfRules.maxProductCO2) b.push({ area: "Offre & Collection", label: `${p.name} — ${v.toLocaleString("fr-FR", { minimumFractionDigits: 1 })} kg CO₂e/pièce`, action: "activer matière bas carbone ou sourcing proche" });
    });
    if (collectionCO2 > perfRules.carbonEnvelope) b.push({ area: "Go to Market", label: `Collection à ${u(Math.round(collectionCO2))} t CO₂e — dépassement de ${u(Math.round(collectionCO2 - perfRules.carbonEnvelope))} t`, action: "réduire les volumes ou modifier le mix sourcing" });
    if (perfRules.minMargin > 53.2) b.push({ area: "Supply", label: `Scénario proximité à 53,2 % sous le seuil de ${perfRules.minMargin.toLocaleString("fr-FR")} %`, action: "négocier le coût rendu ou conserver un mix équilibré" });
    if (perfRules.carbonEnvelope < 5200) b.push({ area: "KFI", label: "Trajectoire fournisseurs incompatible avec la cible", action: "allouer 4 références à Cankiri et Roubaix" });
    return b;
  }, [perfRules, collectionCO2, lowCarbon, delta]);

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
    statutOf: (p) => (validated.has(p.id) ? "Validée" : p.statut),
    setPvc: (id, v) => setPvcMap((m) => ({ ...m, [id]: v })),
    setVol: (id, v) => setVolMap((m) => ({ ...m, [id]: v })),
    setScen: (id, s) => setScenMap((m) => ({ ...m, [id]: s })),
    submit: (id) => { setSubmitted((s) => new Set(s).add(id)); setReturned((s) => { const n = new Set(s); n.delete(id); return n; }); },
    validate: (id) => setValidated((s) => new Set(s).add(id)),
    sendBack: (id) => { setReturned((s) => new Set(s).add(id)); setSubmitted((s) => { const n = new Set(s); n.delete(id); return n; }); },
    approve: (id) => { setApproved((s) => new Set(s).add(id)); setRejected((s) => { const n = new Set(s); n.delete(id); return n; }); },
    reject: (id) => setRejected((s) => new Set(s).add(id)),
    unapprove: (id) => { setApproved((s) => { const n = new Set(s); n.delete(id); return n; }); setNote(""); },
  };

  const TABS = [
    { id: "performance", label: "Budget & Arbitrage Financier", icon: Scale },
    { id: "co2", label: "Budget & Arbitrage CO₂", icon: Leaf },
    { id: "design", label: "Offre & Collection", icon: Baby },
    { id: "gtm", label: "Go to Market", icon: ShoppingBag },
    { id: "itfas", label: "KFI", icon: Factory },
  ];

  return (
    <div style={{ minHeight: "100vh", background: T.bg, fontFamily: SANS, color: T.ink }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 18px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, flexWrap: "wrap" }}>
          <WhiteBadge><img src={KIABI_LOGO} alt="Kiabi" style={{ height: 26, width: "auto", display: "block" }} /></WhiteBadge>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.ink }}>Cockpit — Offre Bébé & Collection Enfant</div>
            <div style={{ fontSize: 11, color: T.faint, fontFamily: MONO }}>collection layette · 12 structures de collection · S1 2027</div>
          </div>
          {lowCarbon && <span style={{ marginLeft: "auto" }}><Chip color={T.ok}>🌿 Stratégie Bas carbone active</Chip></span>}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {TABS.map((t) => {
            const on = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", background: on ? T.accent : T.panel, color: on ? "#ffffff" : T.sub, border: `1px solid ${on ? T.accent : T.line}`, borderRadius: 10, padding: "9px 15px", fontSize: 12.5, fontWeight: 700, fontFamily: SANS }}>
                <t.icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>
        {tab === "performance" && <BudgetPage st={st} />}
        {tab === "co2" && <CO2Page />}
        {tab === "design" && <OffrePage st={st} />}
        {tab === "gtm" && <GTMPage st={st} />}
        {tab === "itfas" && <ProductionPage st={st} />}
      </div>
    </div>
  );
}
