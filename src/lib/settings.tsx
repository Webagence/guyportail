import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface PortalData {
  logo: string;
  email: string;
  phone: string;
  address: string;
  siteName: string;
  siret: string;
  socialInstagram: string;
  socialFacebook: string;
  nav_universe: string; nav_house: string; nav_values: string; nav_contact: string;
  hero_badge: string; hero_title1: string; hero_title2: string; hero_desc: string;
  hero_cta1: string; hero_cta2: string; hero_scroll: string;
  hero_cta1_url: string; hero_cta2_url: string;
  univ_kicker: string; univ_title1: string; univ_title2: string;
  univ_u1: string; univ_u2: string;
  univ_gems: string; univ_jewelry: string;
  univ_gemsDesc: string; univ_jewelryDesc: string;
  univ_gemsCta: string; univ_jewelryCta: string;
  univ_gemsUrl: string; univ_jewelryUrl: string;
  about_kicker: string; about_title1: string; about_title2: string;
  about_p1: string; about_p2: string;
  about_cert: string; about_certSub: string;
  stats_stonesValue: string; stats_stones: string;
  stats_jewelsValue: string; stats_jewels: string;
  stats_clientsValue: string; stats_clients: string;
  stats_yearsValue: string; stats_years: string;
  values_kicker: string; values_title1: string; values_title2: string;
  values_v1icon: string; values_v1t: string; values_v1d: string;
  values_v2icon: string; values_v2t: string; values_v2d: string;
  values_v3icon: string; values_v3t: string; values_v3d: string;
  values_v4icon: string; values_v4t: string; values_v4d: string;
  footer_tagline: string; footer_universes: string;
  footer_contactTitle: string; footer_rights: string; footer_made: string;
  _locale: string;
}

const API_URL = "https://admin.francegems.com/api";
type Ctx = { content: PortalData | null; loading: boolean };
const PortalContext = createContext<Ctx>({ content: null, loading: true });

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<PortalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/content/portal`, {
      headers: { "X-Locale": localStorage.getItem("portal_locale") || "fr" },
    })
      .then((r) => r.json())
      .then((data) => { if (data?.content) setContent(data.content as PortalData); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <PortalContext.Provider value={{ content, loading }}>
      {children}
    </PortalContext.Provider>
  );
}

export function useSettings() {
  return useContext(PortalContext);
}
