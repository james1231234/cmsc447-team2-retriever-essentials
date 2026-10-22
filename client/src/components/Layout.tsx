import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { Icon } from "./icons";
import type { IconName } from "./icons";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isOverview = location.pathname === "/";
  const isRetriever = location.pathname === "/retriever-essentials";

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const nav: { label: string; icon: IconName; path: string }[] = [
    { label: "Overview", icon: "grid", path: "/" },
    { label: "Student engagement", icon: "students", path: "/" },
    { label: "Events", icon: "calendar", path: "/" },
  ];

  const breadcrumb = isRetriever ? "Retriever Essentials" : "Overview";

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#272727]">
      <aside className={`fixed inset-y-0 left-0 z-40 w-[254px] border-r border-black/10 bg-[#272727] text-white transition-transform lg:translate-x-0 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#d4aa7d] text-sm font-extrabold text-[#272727]">D</div>
            <div>
              <p className="text-[13px] font-bold leading-tight">Division Impact</p>
              <p className="text-[10px] tracking-wide text-white/50">DEAN OF STUDENTS</p>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu"><Icon name="close" /></button>
        </div>
        <div className="px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold tracking-[.16em] text-white/35">DASHBOARD</p>
          <nav className="space-y-1">
            {nav.map((item) => (
              <button
                key={item.label}
                onClick={() => { navigate(item.path); setMenuOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] transition ${item.label === "Overview" && isOverview ? "bg-white/10 font-semibold text-white" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              >
                <Icon name={item.icon} />
                <span className="flex-1">{item.label}</span>
              </button>
            ))}
            <div>
              <button
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-white/60 transition hover:bg-white/5 hover:text-white"
                onClick={() => setServicesOpen((open) => !open)}
                aria-expanded={servicesOpen}
                aria-controls="services-navigation"
              >
                <Icon name="pantry" />
                <span className="flex-1">Services</span>
                <span className={`transition-transform duration-200 ${servicesOpen ? "rotate-90" : ""}`}>
                  <Icon name="chevron" size={15} />
                </span>
              </button>
              <div
                id="services-navigation"
                className={`grid transition-all duration-200 ${servicesOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <div className="ml-5 border-l border-white/10 py-1 pl-3">
                    <button
                      onClick={() => { navigate("/retriever-essentials"); setMenuOpen(false); }}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[12px] transition hover:bg-white/5 hover:text-white ${isRetriever ? "bg-white/10 font-semibold text-white" : "text-white/65"}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d4aa7d]" />
                      <span className="flex-1">Retriever Essentials</span>
                      <span className="rounded-full bg-[#d4aa7d]/15 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-[#d4aa7d]">Integrated</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <p className="mb-3 mt-8 px-3 text-[10px] font-bold tracking-[.16em] text-white/35">MANAGE</p>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] text-white/60 hover:bg-white/5 hover:text-white">
            <Icon name="upload" /> Data uploads
          </button>
        </div>
        <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
          <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 py-2.5 text-[13px] font-semibold text-white/70 hover:border-[#d4aa7d]/40 hover:bg-white/5 hover:text-[#d4aa7d] transition-colors">
            <Icon name="mail" /> Contact Us
          </button>
          <div className="rounded-xl bg-white/[.06] p-4">
            <p className="text-xs font-semibold">Need help with your data?</p>
            <p className="mt-1 text-[11px] leading-relaxed text-white/45">Review upload guidelines and accepted formats.</p>
            <button className="mt-3 text-[11px] font-bold text-[#d4aa7d]">View data guide →</button>
          </div>
        </div>
      </aside>

      <main className="lg:ml-[254px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-black/10 bg-[#f8f6f2]/95 px-5 backdrop-blur md:px-8">
          <div className="flex items-center gap-3">
            <button className="grid h-9 w-9 place-items-center rounded-lg border border-black/10 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
            <div className="hidden items-center gap-2 text-xs text-black/45 sm:flex">
              <span>Dean of Students</span>
              <Icon name="chevron" size={13} />
              {isRetriever && <><span>Services</span><Icon name="chevron" size={13} /></>}
              <span className="font-semibold text-[#272727]">{breadcrumb}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="grid h-9 w-9 place-items-center rounded-full text-black/55 hover:bg-black/5" aria-label="Search"><Icon name="search" /></button>
            <button className="relative grid h-9 w-9 place-items-center rounded-full text-black/55 hover:bg-black/5" aria-label="Notifications"><Icon name="bell" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#c0614a]" /></button>
            <div className="ml-2 h-8 w-px bg-black/10" />
            <div className="relative ml-2" ref={userMenuRef}>
              <button
                className="flex items-center gap-2 rounded-lg px-1 py-1 hover:bg-black/5 transition-colors"
                onClick={() => setUserMenuOpen((o) => !o)}
                aria-label="User menu"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#272727] text-[11px] font-bold text-white">TU</div>
                <div className="hidden md:block text-left"><p className="text-xs font-bold">Test User</p><p className="text-[10px] text-black/45">Administrator</p></div>
                <svg className={`hidden md:block ml-0.5 transition-transform text-black/35 ${userMenuOpen ? "rotate-180" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-52 rounded-xl border border-black/8 bg-white shadow-xl shadow-black/10 py-1.5">
                  <div className="px-4 py-2.5 border-b border-black/6 mb-1">
                    <p className="text-xs font-bold text-[#272727]">Test User</p>
                    <p className="text-[10px] text-black/45 mt-0.5">testuser@umbc.edu</p>
                  </div>
                  {([
                    { icon: "user" as IconName, label: "Profile" },
                    { icon: "settings" as IconName, label: "Settings" },
                    { icon: "shield" as IconName, label: "Privacy & Security" },
                    { icon: "moon" as IconName, label: "Appearance" },
                    { icon: "help" as IconName, label: "Help & Support" },
                  ]).map(({ icon, label }) => (
                    <button key={label} className="flex w-full items-center gap-3 px-4 py-2 text-[13px] text-black/70 hover:bg-black/[.04] hover:text-black transition-colors">
                      <Icon name={icon} size={15} />{label}
                    </button>
                  ))}
                  <div className="my-1.5 border-t border-black/6" />
                  <button className="flex w-full items-center gap-3 px-4 py-2 text-[13px] text-red-500 hover:bg-red-50 transition-colors">
                    <Icon name="logout" size={15} />Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <Outlet />
      </main>

      {menuOpen && <button className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu overlay" />}
    </div>
  );
}
