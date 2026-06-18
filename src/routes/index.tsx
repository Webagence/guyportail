import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-gems.jpg";
import gemsImg from "@/assets/card-gems.jpg";
import jewelryImg from "@/assets/card-jewelry.jpg";
import { ArrowRight, Gem, Sparkles, ShieldCheck, Award, Globe2, Headphones, Instagram, Facebook, Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { useState, type LucideIcon } from "react";
import { useSettings } from "@/lib/settings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "France Gems — Pierres Précieuses & Bijoux d'Exception" },
      { name: "description", content: "Portail officiel France Gems. Découvrez notre univers de pierres précieuses et de bijoux haut de gamme, sélectionnés avec passion et certifiés." },
      { property: "og:title", content: "France Gems — Pierres Précieuses & Bijoux d'Exception" },
      { property: "og:description", content: "Deux univers, une maison. Explorez nos pierres précieuses et notre joaillerie." },
      { property: "og:image", content: "/__l5e/assets-v1/placeholder/hero.jpg" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" },
    ],
  }),
  component: HomePage,
});

const LANGS = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
] as const;

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck, Award, Globe2, Headphones, Gem, Sparkles,
};

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
      <UniverseCards />
      <About />
      <Values />
      <Footer />
    </div>
  );
}

function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("fr");
  const current = LANGS.find((l) => l.code === lang)!;
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs uppercase tracking-widest text-white/80 backdrop-blur transition hover:border-gold hover:text-gold">
        <span className="text-base leading-none">{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-40 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            {LANGS.map((l) => (
              <button key={l.code} onClick={() => { setLang(l.code); setOpen(false); window.location.reload(); }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-accent/10 ${l.code === lang ? "text-gold" : "text-foreground"}`}>
                <span className="text-base leading-none">{l.flag}</span>
                <span>{l.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function c(content: Record<string, string> | null | undefined, key: string, fallback: string): string {
  return content?.[key] || fallback;
}

function Header() {
  const { settings, content } = useSettings();
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <a href="/" className="flex items-center gap-2">
          {settings?.logo ? (
            <img src={settings.logo} alt={settings.siteName || "France Gems"} className="h-14 md:h-20 w-auto object-contain" />
          ) : (
            <><Gem className="h-5 w-5 text-gold" /><span className="font-display text-xl tracking-wide text-white">France <span className="text-gold-gradient">Gems</span></span></>
          )}
        </a>
        <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          <a href="#univers" className="transition hover:text-white">{c(content, "nav_universe", "Univers")}</a>
          <a href="#maison" className="transition hover:text-white">{c(content, "nav_house", "La Maison")}</a>
          <a href="#valeurs" className="transition hover:text-white">{c(content, "nav_values", "Valeurs")}</a>
          <a href="#contact" className="transition hover:text-white">{c(content, "nav_contact", "Contact")}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a href="https://bijoux.francegems.com" className="hidden rounded-full border border-white/30 px-4 py-2 text-xs uppercase tracking-widest text-white/90 transition hover:border-gold hover:text-gold md:inline-block">Espace Pro</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { content } = useSettings();
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <img src={heroImg} alt="" width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover object-center" loading="eager" fetchPriority="high" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-black/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold backdrop-blur">
          <Sparkles className="h-3 w-3" /> {c(content, "hero_badge", "Maison Française depuis 2008")}
        </span>
        <h1 className="font-display text-5xl font-light leading-[1.05] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)] sm:text-6xl md:text-7xl lg:text-8xl">
          {c(content, "hero_title1", "Bienvenue chez")}<br />
          <span className="text-gold-gradient italic">{c(content, "hero_title2", "France Gems")}</span>
        </h1>
        <p className="mt-8 max-w-2xl text-base text-white/90 sm:text-lg">{c(content, "hero_desc", "")}</p>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a href={c(content, "hero_cta1_url", "https://pierres.francegems.com")} className="btn-gold btn-gold-hover inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest">
            {c(content, "hero_cta1", "Explorer les Pierres")} <ArrowRight className="h-4 w-4" />
          </a>
          <a href={c(content, "hero_cta2_url", "https://bijoux.francegems.com")} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white backdrop-blur transition hover:border-gold hover:text-gold">
            {c(content, "hero_cta2", "Découvrir les Bijoux")} <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-white/60">{c(content, "hero_scroll", "Faites défiler")}</div>
      </div>
    </section>
  );
}

function UniverseCards() {
  const { content } = useSettings();
  const cards = [
    { img: gemsImg, kicker: c(content, "univ_u1", "Univers I"), title: c(content, "univ_gems", "Pierres Précieuses"), desc: c(content, "univ_gemsDesc", ""), cta: c(content, "univ_gemsCta", "Accéder au catalogue"), href: c(content, "univ_gemsUrl", "https://pierres.francegems.com") },
    { img: jewelryImg, kicker: c(content, "univ_u2", "Univers II"), title: c(content, "univ_jewelry", "Bijoux"), desc: c(content, "univ_jewelryDesc", ""), cta: c(content, "univ_jewelryCta", "Accéder à la boutique"), href: c(content, "univ_jewelryUrl", "https://bijoux.francegems.com") },
  ];
  return (
    <section id="univers" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-gold">{c(content, "univ_kicker", "Deux Univers")}</span>
          <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">{c(content, "univ_title1", "Choisissez votre")} <em className="text-gold-gradient">{c(content, "univ_title2", "passion")}</em></h2>
          <div className="hairline mx-auto mt-6 h-px w-24" />
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {cards.map((c) => (
            <a key={c.title} href={c.href} className="group relative block overflow-hidden rounded-2xl border border-border bg-card transition hover:border-gold/60 hover:shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={c.img} alt={c.title} width={1024} height={1280} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
                <span className="text-[10px] uppercase tracking-[0.4em] text-gold">{c.kicker}</span>
                <h3 className="mt-3 font-display text-3xl font-light text-white sm:text-4xl">{c.title}</h3>
                <p className="mt-3 max-w-md text-sm text-white/80">{c.desc}</p>
                <div className="mt-6 inline-flex items-center gap-2 border-b border-gold/40 pb-1 text-xs uppercase tracking-widest text-gold transition group-hover:gap-4">{c.cta} <ArrowRight className="h-4 w-4" /></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { content } = useSettings();
  const stats = [
    { n: c(content, "stats_stonesValue", "2 500+"), l: c(content, "stats_stones", "Pierres disponibles") },
    { n: c(content, "stats_jewelsValue", "850+"), l: c(content, "stats_jewels", "Bijoux en collection") },
    { n: c(content, "stats_clientsValue", "12 000"), l: c(content, "stats_clients", "Clients satisfaits") },
    { n: c(content, "stats_yearsValue", "16 ans"), l: c(content, "stats_years", "D'expertise") },
  ];
  return (
    <section id="maison" className="relative border-y border-border bg-card/30 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.4em] text-gold">{c(content, "about_kicker", "La Maison")}</span>
          <h2 className="mt-4 font-display text-4xl font-light leading-tight sm:text-5xl">{c(content, "about_title1", "Un héritage français,")} <em className="text-gold-gradient">{c(content, "about_title2", "une exigence absolue")}</em></h2>
          <p className="mt-6 text-muted-foreground">{c(content, "about_p1", "")}</p>
          <p className="mt-4 text-muted-foreground">{c(content, "about_p2", "")}</p>
          <div className="mt-10 flex items-center gap-4">
            <Award className="h-10 w-10 text-gold" />
            <div>
              <div className="font-display text-lg">{c(content, "about_cert", "Certifié IGI · GIA · LFG")}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{c(content, "about_certSub", "Authenticité garantie")}</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
          {stats.map((s) => (
            <div key={s.l} className="bg-card p-8 text-center sm:p-10">
              <div className="font-display text-4xl text-gold-gradient sm:text-5xl">{s.n}</div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  const { content } = useSettings();
  const valuesData = [
    { icon: c(content, "values_v1icon", "ShieldCheck"), t: c(content, "values_v1t", "Authenticité"), d: c(content, "values_v1d", "") },
    { icon: c(content, "values_v2icon", "Award"), t: c(content, "values_v2t", "Qualité Certifiée"), d: c(content, "values_v2d", "") },
    { icon: c(content, "values_v3icon", "Globe2"), t: c(content, "values_v3t", "Livraison Internationale"), d: c(content, "values_v3d", "") },
    { icon: c(content, "values_v4icon", "Headphones"), t: c(content, "values_v4t", "Service Dédié"), d: c(content, "values_v4d", "") },
  ];
  return (
    <section id="valeurs" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-gold">{c(content, "values_kicker", "Nos Engagements")}</span>
          <h2 className="mt-4 font-display text-4xl font-light sm:text-5xl">{c(content, "values_title1", "Quatre valeurs,")} <em className="text-gold-gradient">{c(content, "values_title2", "une promesse")}</em></h2>
          <div className="hairline mx-auto mt-6 h-px w-24" />
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valuesData.map((v) => {
            const IconComp = iconMap[v.icon] || ShieldCheck;
            return (
              <div key={v.t} className="group rounded-2xl border border-border bg-card p-8 transition hover:border-gold/50 hover:-translate-y-1">
                <IconComp className="h-8 w-8 text-gold" />
                <h3 className="mt-6 font-display text-2xl">{v.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { settings, content } = useSettings();
  const brand = settings?.siteName || "France Gems";
  return (
    <footer id="contact" className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              {settings?.logo ? <img src={settings.logo} alt={brand} className="h-14 md:h-20 w-auto object-contain" /> : <><Gem className="h-5 w-5 text-gold" /><span className="font-display text-2xl">France <span className="text-gold-gradient">Gems</span></span></>}
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">{settings?.tagline || c(content, "footer_tagline", "")}</p>
            <div className="mt-6 flex gap-3">
              {content?.socialInstagram && <a href={content.socialInstagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition"><Instagram className="h-4 w-4" /></a>}
              {content?.socialFacebook && <a href={content.socialFacebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:border-gold hover:text-gold transition"><Facebook className="h-4 w-4" /></a>}
            </div>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold">{c(content, "footer_universes", "Nos Univers")}</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li><a href="https://pierres.francegems.com" className="hover:text-foreground">{c(content, "univ_gems", "Pierres Précieuses")}</a></li>
              <li><a href="https://bijoux.francegems.com" className="hover:text-foreground">{c(content, "univ_jewelry", "Bijoux")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.3em] text-gold">{c(content, "footer_contactTitle", "Contact")}</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> {settings?.email || "contact@francegems.com"}</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-gold" /> {settings?.phone || "+33 1 23 45 67 89"}</li>
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-gold" /> {settings?.address || "Place Vendôme, Paris"}</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} {brand}{settings?.siret ? ` · SIRET ${settings.siret}` : ""} · {c(content, "footer_rights", "Tous droits réservés.")}</p>
          <p className="uppercase tracking-[0.3em]">{c(content, "footer_made", "Made with passion in Paris")}</p>
        </div>
      </div>
    </footer>
  );
}
