import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router"
import { Icon } from "../components/icons"
import { useAuth, type UserRole } from "../context/AuthContext"

const roles: { value: UserRole detail: string }[] = [
  { value: "User", detail: "Upload data and generate reports." },
  { value: "Viewer", detail: "View dashboards and exported reports." },
  { value: "Leadership", detail: "Review division-wide trends and insights." },
  {
    value: "Administrator",
    detail: "Manage users, access, and all dashboard data.",
  },
]

export default function AuthPage({ mode }: { mode: "login" | "create" }) {
  const navigate = useNavigate()
  const { login, loginWithMyUmbc, createAccount } = useAuth()
  const [role, setRole] = useState<UserRole>("User")
  const [remember, setRemember] = useState(false)

  const submitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    login(String(data.get("email")), remember)
    navigate("/dashboard")
  }

  const submitAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    createAccount(
      {
        name: `${data.get("firstName")} ${data.get("lastName")}`.trim(),
        email: String(data.get("email")),
        role,
      },
      true,
    )
    navigate("/dashboard")
  }

  const useMyUmbc = () => {
    loginWithMyUmbc()
    navigate("/dashboard")
  }

  return (
    <main className="grid min-h-screen bg-[#f8f6f2] text-[#272727] lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden bg-[#272727] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full border-[54px] border-[#d4aa7d]/15" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-[#90a9b7]/10" />
        <div className="relative flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#d4aa7d] text-base font-extrabold text-[#272727]">
            D
          </div>
          <div>
            <p className="text-sm font-bold">Division Impact</p>
            <p className="text-[10px] tracking-[.16em] text-white/45">
              DEAN OF STUDENTS
            </p>
          </div>
        </div>
        <div className="relative max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.05] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#efd09e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4aa7d]" />
            One view of student impact
          </span>
          <h1 className="mt-6 text-[44px] font-bold leading-[1.08] tracking-[-.05em]">
            Turn division data into meaningful action.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/50">
            Monitor engagement, understand service reach, and create reports
            that tell the story of student engagement across UMBC.
          </p>
        </div>
        <p className="relative text-[10px] text-white/30">
          University of Maryland, Baltimore County · Division of Student Affairs
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#272727] text-sm font-extrabold text-white">
              D
            </div>
            <div>
              <p className="text-sm font-bold">Division Impact</p>
              <p className="text-[9px] tracking-[.14em] text-black/40">
                DEAN OF STUDENTS
              </p>
            </div>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#8a6a3a]">
            {mode === "login" ? "Welcome back" : "Get started"}
          </p>
          <h2 className="mt-2 text-[32px] font-bold tracking-[-.04em]">
            {mode === "login"
              ? "Log in to your account"
              : "Create your account"}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-black/48">
            {mode === "login"
              ? "Enter your credentials to access the Division Impact dashboard."
              : "Set up a demo account and choose the access level you want to explore."}
          </p>

          {mode === "login" ? (
            <>
              <form onSubmit={submitLogin} className="mt-8 space-y-5">
                <label className="block text-xs font-bold">
                  Email address
                  <input
                    required
                    name="email"
                    type="email"
                    placeholder="name@umbc.edu"
                    className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3.5 py-3.5 text-xs font-normal outline-none transition placeholder:text-black/28 focus:border-[#272727] focus:ring-2 focus:ring-[#d4aa7d]/25"
                  />
                </label>
                <label className="block text-xs font-bold">
                  Password
                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3.5 py-3.5 text-xs font-normal outline-none transition placeholder:text-black/28 focus:border-[#272727] focus:ring-2 focus:ring-[#d4aa7d]/25"
                  />
                </label>
                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-black/55">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                      className="h-4 w-4 accent-[#272727]"
                    />
                    Remember me
                  </label>
                  <button
                    type="button"
                    className="text-[11px] font-bold text-[#8a6a3a] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#272727] px-4 py-3.5 text-xs font-bold text-white transition hover:bg-black/80">
                  Log in <Icon name="chevron" size={15} />
                </button>
              </form>
              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-black/10" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-black/30">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-black/10" />
              </div>
              <button
                onClick={useMyUmbc}
                className="flex w-full items-center justify-center gap-3 rounded-lg border border-black/15 bg-white px-4 py-3.5 text-xs font-bold transition hover:border-black/30 hover:bg-black/[.02]"
              >
                <span className="grid h-6 w-6 place-items-center rounded bg-[#f6c800] text-[9px] font-extrabold text-black">
                  U
                </span>
                Log in with myUMBC
              </button>
              <p className="mt-8 text-center text-xs text-black/48">
                Don&apos;t have an account?{" "}
                <Link
                  to="/create-account"
                  className="font-bold text-[#272727] underline decoration-[#d4aa7d] decoration-2 underline-offset-4"
                >
                  Create an account
                </Link>
              </p>
            </>
          ) : (
            <form onSubmit={submitAccount} className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-bold">
                  First name
                  <input
                    required
                    name="firstName"
                    className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3.5 py-3 text-xs font-normal outline-none focus:border-[#272727]"
                  />
                </label>
                <label className="block text-xs font-bold">
                  Last name
                  <input
                    required
                    name="lastName"
                    className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3.5 py-3 text-xs font-normal outline-none focus:border-[#272727]"
                  />
                </label>
              </div>
              <label className="block text-xs font-bold">
                Email address
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="name@umbc.edu"
                  className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3.5 py-3 text-xs font-normal outline-none focus:border-[#272727]"
                />
              </label>
              <label className="block text-xs font-bold">
                Password
                <input
                  required
                  name="password"
                  type="password"
                  minLength={8}
                  placeholder="At least 8 characters"
                  className="mt-2 w-full rounded-lg border border-black/15 bg-white px-3.5 py-3 text-xs font-normal outline-none focus:border-[#272727]"
                />
              </label>
              <fieldset>
                <legend className="text-xs font-bold">User type</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {roles.map((item) => (
                    <label
                      key={item.value}
                      className={`cursor-pointer rounded-lg border p-3 transition ${
                        role === item.value
                          ? "border-[#272727] bg-[#efd09e]/25 ring-1 ring-[#272727]"
                          : "border-black/10 bg-white hover:border-black/25"
                      }`}
                    >
                      <span className="flex items-center gap-2 text-xs font-bold">
                        <input
                          type="radio"
                          name="role"
                          value={item.value}
                          checked={role === item.value}
                          onChange={() => setRole(item.value)}
                          className="accent-[#272727]"
                        />
                        {item.value}
                      </span>
                      <span className="mt-1.5 block pl-5 text-[9px] leading-relaxed text-black/42">
                        {item.detail}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button className="w-full rounded-lg bg-[#272727] px-4 py-3.5 text-xs font-bold text-white transition hover:bg-black/80">
                Create account
              </button>
              <p className="text-center text-xs text-black/48">
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-bold text-[#272727] underline decoration-[#d4aa7d] decoration-2 underline-offset-4"
                >
                  Log in
                </Link>
              </p>
            </form>
          )}
          <p className="mt-10 text-center text-[9px] leading-relaxed text-black/30">
            Demo environment · Account details are stored only in this browser.
          </p>
        </div>
      </section>
    </main>
  )
}
