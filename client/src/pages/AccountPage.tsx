import { useParams } from "react-router"
import { Icon, type IconName } from "../components/icons"
import { useAuth } from "../context/AuthContext"

const sections: Record<string, {
  title: string
  eyebrow: string
  description: string
  icon: IconName
}> = {
  profile: {
    title: "Profile",
    eyebrow: "Your account",
    description: "Manage your name, contact details, and role information.",
    icon: "user",
  },
  settings: {
    title: "Settings",
    eyebrow: "Preferences",
    description: "Choose how the dashboard behaves and communicates with you.",
    icon: "settings",
  },
  privacy: {
    title: "Privacy & Security",
    eyebrow: "Account protection",
    description: "Review sign-in security and data privacy preferences.",
    icon: "shield",
  },
  appearance: {
    title: "Appearance",
    eyebrow: "Display",
    description: "Personalize the way your dashboard looks and feels.",
    icon: "moon",
  },
  help: {
    title: "Help & Support",
    eyebrow: "Support center",
    description: "Find answers, documentation, and ways to contact our team.",
    icon: "help",
  },
}

function Toggle({
  label,
  detail,
  checked = false,
}: {
  label: string
  detail: string
  checked?: boolean
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-5 border-b border-black/[.07] py-4 last:border-0">
      <span>
        <span className="block text-xs font-bold">{label}</span>
        <span className="mt-1 block text-[11px] text-black/45">{detail}</span>
      </span>
      <input
        type="checkbox"
        defaultChecked={checked}
        className="h-4 w-4 accent-[#272727]"
      />
    </label>
  )
}

export default function AccountPage() {
  const { section = "profile" } = useParams()
  const page = sections[section] || sections.profile
  const { user } = useAuth()
  const nameParts = user?.name.split(" ") || ["Demo", "User"]
  const initials = nameParts
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#efd09e]/60">
          <Icon name={page.icon} size={21} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8a6a3a]">
            {page.eyebrow}
          </p>
          <h1 className="mt-1 text-[30px] font-bold tracking-[-.04em]">
            {page.title}
          </h1>
          <p className="mt-1 text-xs text-black/48">{page.description}</p>
        </div>
      </div>

      {section === "profile" && (
        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_2fr]">
          <aside className="rounded-xl bg-[#272727] p-6 text-white">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#d4aa7d] text-lg font-extrabold text-[#272727]">
              {initials}
            </div>
            <p className="mt-4 text-base font-bold">{user?.name}</p>
            <p className="mt-1 text-xs text-white/45">{user?.role}</p>
            <span className="mt-4 inline-block rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold text-[#efd09e]">
              Active account
            </span>
          </aside>
          <form className="rounded-xl border border-black/[.08] bg-white p-6">
            <h2 className="text-sm font-bold">Personal information</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-bold">
                First name
                <input
                  defaultValue={nameParts[0]}
                  className="mt-2 w-full rounded-lg border border-black/15 px-3 py-3 text-xs font-normal outline-none focus:border-[#272727]"
                />
              </label>
              <label className="text-xs font-bold">
                Last name
                <input
                  defaultValue={nameParts.slice(1).join(" ")}
                  className="mt-2 w-full rounded-lg border border-black/15 px-3 py-3 text-xs font-normal outline-none focus:border-[#272727]"
                />
              </label>
              <label className="text-xs font-bold sm:col-span-2">
                Email address
                <input
                  defaultValue={user?.email}
                  className="mt-2 w-full rounded-lg border border-black/15 px-3 py-3 text-xs font-normal outline-none focus:border-[#272727]"
                />
              </label>
              <label className="text-xs font-bold">
                Job title
                <input
                  defaultValue={user?.role}
                  className="mt-2 w-full rounded-lg border border-black/15 px-3 py-3 text-xs font-normal outline-none focus:border-[#272727]"
                />
              </label>
              <label className="text-xs font-bold">
                Office
                <input
                  defaultValue="Dean of Students"
                  className="mt-2 w-full rounded-lg border border-black/15 px-3 py-3 text-xs font-normal outline-none focus:border-[#272727]"
                />
              </label>
            </div>
            <button
              type="button"
              className="mt-6 rounded-lg bg-[#272727] px-5 py-2.5 text-xs font-bold text-white"
            >
              Save changes
            </button>
          </form>
        </div>
      )}

      {section === "settings" && (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="rounded-xl border border-black/[.08] bg-white p-6">
            <h2 className="text-sm font-bold">Notifications</h2>
            <div className="mt-2">
              <Toggle
                label="Upload updates"
                detail="Notify me when imports finish processing."
                checked
              />
              <Toggle
                label="Weekly digest"
                detail="Receive a weekly dashboard summary."
                checked
              />
              <Toggle
                label="Report alerts"
                detail="Notify me when reports are ready."
              />
            </div>
          </section>
          <section className="rounded-xl border border-black/[.08] bg-white p-6">
            <h2 className="text-sm font-bold">Dashboard defaults</h2>
            <label className="mt-5 block text-xs font-bold">
              Default landing page
              <select className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3 py-3 font-normal">
                <option>Overview</option>
                <option>Retriever Essentials</option>
              </select>
            </label>
            <label className="mt-5 block text-xs font-bold">
              Default reporting period
              <select className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3 py-3 font-normal">
                <option>Current semester</option>
                <option>Past 30 days</option>
                <option>Academic year</option>
              </select>
            </label>
          </section>
        </div>
      )}

      {section === "privacy" && (
        <div className="mt-8 grid gap-4 md:grid-cols-[1.35fr_1fr]">
          <section className="rounded-xl border border-black/[.08] bg-white p-6">
            <h2 className="text-sm font-bold">Sign-in security</h2>
            <div className="mt-5 flex items-center justify-between rounded-lg bg-[#d2d8b3]/35 p-4">
              <div>
                <p className="text-xs font-bold">Two-factor authentication</p>
                <p className="mt-1 text-[11px] text-black/45">
                  Add an extra layer of protection.
                </p>
              </div>
              <button className="rounded-lg bg-[#272727] px-4 py-2 text-[11px] font-bold text-white">
                Enable
              </button>
            </div>
            <button className="mt-4 w-full rounded-lg border border-black/15 px-4 py-3 text-left text-xs font-bold">
              Change password{" "}
              <span className="float-right text-black/35">→</span>
            </button>
            <button className="mt-2 w-full rounded-lg border border-black/15 px-4 py-3 text-left text-xs font-bold">
              Review active sessions{" "}
              <span className="float-right text-black/35">→</span>
            </button>
          </section>
          <section className="rounded-xl border border-black/[.08] bg-white p-6">
            <h2 className="text-sm font-bold">Data privacy</h2>
            <div className="mt-2">
              <Toggle
                label="Usage analytics"
                detail="Help improve the dashboard with anonymous usage data."
                checked
              />
              <Toggle
                label="Remember filters"
                detail="Store dashboard filters on this device."
                checked
              />
            </div>
          </section>
        </div>
      )}

      {section === "appearance" && (
        <section className="mt-8 rounded-xl border border-black/[.08] bg-white p-6">
          <h2 className="text-sm font-bold">Theme</h2>
          <p className="mt-1 text-[11px] text-black/45">
            Choose your preferred dashboard appearance.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Light", "System", "Dark"].map((theme, index) => (
              <button
                key={theme}
                className={`rounded-xl border p-3 text-left ${
                  index === 0
                    ? "border-[#272727] ring-1 ring-[#272727]"
                    : "border-black/10"
                }`}
              >
                <span
                  className={`block h-24 rounded-lg ${
                    theme === "Dark"
                      ? "bg-[#272727]"
                      : theme === "System"
                        ? "bg-gradient-to-r from-[#f8f6f2] to-[#272727]"
                        : "bg-[#f8f6f2]"
                  } border border-black/10`}
                />
                <span className="mt-3 block text-xs font-bold">{theme}</span>
              </button>
            ))}
          </div>
          <h2 className="mt-8 text-sm font-bold">Density</h2>
          <div className="mt-3 flex gap-2">
            {["Comfortable", "Compact"].map((item, index) => (
              <button
                key={item}
                className={`rounded-lg px-4 py-2.5 text-xs font-bold ${
                  index === 0
                    ? "bg-[#272727] text-white"
                    : "border border-black/15"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>
      )}

      {section === "help" && (
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Data upload guide",
              detail: "Formatting, file types, and validation requirements.",
              icon: "upload" as IconName,
            },
            {
              title: "Reporting help",
              detail: "Learn how to build and export useful reports.",
              icon: "report" as IconName,
            },
            {
              title: "Contact support",
              detail: "Reach the dashboard support team for assistance.",
              icon: "mail" as IconName,
            },
          ].map((card) => (
            <button
              key={card.title}
              className="rounded-xl border border-black/[.08] bg-white p-6 text-left transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#efd09e]/55">
                <Icon name={card.icon} />
              </span>
              <span className="mt-5 block text-sm font-bold">{card.title}</span>
              <span className="mt-2 block text-[11px] leading-relaxed text-black/45">
                {card.detail}
              </span>
              <span className="mt-5 block text-[11px] font-bold">
                Learn more →
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
