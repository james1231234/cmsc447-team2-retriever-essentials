import { useState } from "react"
import { Icon } from "../components/icons"

const initialUsers = [
  {
    name: "Test User",
    email: "testuser@umbc.edu",
    role: "Administrator",
    office: "Dean of Students",
    status: "Active",
    initials: "TU",
  },
  {
    name: "Jordan Lee",
    email: "jlee@umbc.edu",
    role: "Editor",
    office: "Retriever Essentials",
    status: "Active",
    initials: "JL",
  },
  {
    name: "Morgan Patel",
    email: "mpatel@umbc.edu",
    role: "Viewer",
    office: "Campus Life",
    status: "Active",
    initials: "MP",
  },
  {
    name: "Alex Rivera",
    email: "arivera@umbc.edu",
    role: "Editor",
    office: "Student Conduct",
    status: "Invited",
    initials: "AR",
  },
  {
    name: "Casey Brown",
    email: "cbrown@umbc.edu",
    role: "Viewer",
    office: "Accessibility Services",
    status: "Inactive",
    initials: "CB",
  },
]

export default function AdminUsers() {
  const [query, setQuery] = useState("")
  const [inviteOpen, setInviteOpen] = useState(false)
  const users = initialUsers.filter((user) =>
    `${user.name} ${user.email} ${user.office}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-[1300px] px-5 py-8 md:px-8 md:py-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8a6a3a]">
            Administration
          </p>
          <h1 className="mt-2 text-[30px] font-bold tracking-[-.04em] md:text-[38px]">
            User management
          </h1>
          <p className="mt-2 text-sm text-black/48">
            Manage access, roles, and office assignments for dashboard users.
          </p>
        </div>
        <button
          onClick={() => setInviteOpen((open) => !open)}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#272727] px-4 py-2.5 text-xs font-bold text-white"
        >
          <Icon name="userPlus" size={16} /> Invite user
        </button>
      </div>
      {inviteOpen && (
        <form className="mt-6 grid gap-3 rounded-xl bg-[#efd09e]/35 p-5 sm:grid-cols-[1fr_1fr_160px_auto]">
          <input
            placeholder="Name"
            className="rounded-lg border border-black/15 bg-white px-3 py-2.5 text-xs outline-none"
          />
          <input
            type="email"
            placeholder="UMBC email"
            className="rounded-lg border border-black/15 bg-white px-3 py-2.5 text-xs outline-none"
          />
          <select className="rounded-lg border border-black/15 bg-white px-3 py-2.5 text-xs">
            <option>Viewer</option>
            <option>Editor</option>
            <option>Administrator</option>
          </select>
          <button
            type="button"
            onClick={() => setInviteOpen(false)}
            className="rounded-lg bg-[#272727] px-4 py-2.5 text-xs font-bold text-white"
          >
            Send invite
          </button>
        </form>
      )}
      <section className="mt-7 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Total users", value: "24", color: "bg-[#efd09e]/50" },
          { label: "Administrators", value: "4", color: "bg-[#d2d8b3]/50" },
          { label: "Pending invites", value: "3", color: "bg-[#90a9b7]/30" },
        ].map((item) => (
          <article
            key={item.label}
            className="rounded-xl border border-black/[.08] bg-white p-5"
          >
            <div
              className={`grid h-9 w-9 place-items-center rounded-lg ${item.color}`}
            >
              <Icon name="students" size={17} />
            </div>
            <p className="mt-4 text-[28px] font-bold">{item.value}</p>
            <p className="text-xs text-black/45">{item.label}</p>
          </article>
        ))}
      </section>
      <section className="mt-4 overflow-hidden rounded-xl border border-black/[.08] bg-white">
        <div className="flex flex-col justify-between gap-3 border-b border-black/[.07] p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-bold">All users</h2>
            <p className="mt-1 text-[11px] text-black/42">
              {users.length} users shown
            </p>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/35">
              <Icon name="search" size={15} />
            </span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search users..."
              className="w-full rounded-lg border border-black/15 py-2.5 pl-9 pr-3 text-xs outline-none focus:border-[#272727] sm:w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left">
            <thead className="bg-[#faf9f6] text-[9px] uppercase tracking-[.12em] text-black/38">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Office</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.email}
                  className="border-t border-black/[.06] text-xs"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#272727] text-[10px] font-bold text-white">
                        {user.initials}
                      </span>
                      <span>
                        <span className="block font-bold">{user.name}</span>
                        <span className="mt-0.5 block text-[10px] text-black/42">
                          {user.email}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <select
                      defaultValue={user.role}
                      className="rounded-md border border-black/10 bg-white px-2 py-1.5 text-[11px]"
                    >
                      <option>Administrator</option>
                      <option>Editor</option>
                      <option>Viewer</option>
                    </select>
                  </td>
                  <td className="px-4 py-4 text-black/52">{user.office}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                        user.status === "Active"
                          ? "bg-[#d2d8b3]/55 text-[#3d5237]"
                          : user.status === "Invited"
                            ? "bg-[#efd09e]/60 text-[#765b2b]"
                            : "bg-black/[.06] text-black/45"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="rounded-md px-2 py-1 text-lg leading-none text-black/35 hover:bg-black/[.05] hover:text-black">
                      ···
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
