import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Icon } from "../components/icons";
import type { IconName } from "../components/icons";

const semesterMetrics = [
  {
    label: "Pounds of food collected",
    value: "24,381",
    unit: "lbs",
    change: "↑ 11.4%",
    detail: "vs. Spring 2024",
    color: "bg-[#efd09e]/50",
    icon: "upload" as IconName,
  },
  {
    label: "Pounds of food distributed",
    value: "22,847",
    unit: "lbs",
    change: "↑ 9.8%",
    detail: "93.7% distribution rate",
    color: "bg-[#d2d8b3]/50",
    icon: "pantry" as IconName,
  },
  {
    label: "People impacted",
    value: "1,634",
    unit: "people",
    change: "↑ 7.2%",
    detail: "unique community members",
    color: "bg-[#90a9b7]/30",
    icon: "students" as IconName,
  },
  {
    label: "Avg. weight per visit",
    value: "14.0",
    unit: "lbs",
    change: "↑ 2.3%",
    detail: "per pantry transaction",
    color: "bg-[#d4aa7d]/25",
    icon: "scale" as IconName,
  },
];

const categoryData = [
  { name: "Undergraduate Student", value: 874, percent: 53.5 },
  { name: "Graduate Student", value: 312, percent: 19.1 },
  { name: "Community Member", value: 261, percent: 16.0 },
  { name: "Faculty / Staff", value: 134, percent: 8.2 },
  { name: "Other / Unreported", value: 53, percent: 3.2 },
];

const COLORS = ["#d4aa7d", "#272727", "#90a9b7", "#d2d8b3", "#efd09e"];

const weeklyVisits = [
  { week: "Aug 26", visits: 68, lbs: 918 },
  { week: "Sep 02", visits: 94, lbs: 1287 },
  { week: "Sep 09", visits: 121, lbs: 1673 },
  { week: "Sep 16", visits: 138, lbs: 1942 },
  { week: "Sep 23", visits: 152, lbs: 2196 },
];

const maxVisits = Math.max(...weeklyVisits.map((w) => w.visits));

interface TooltipPayload {
  name: string;
  value: number;
  payload: { percent: number };
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-lg border border-black/10 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold text-[#272727]">{d.name}</p>
      <p className="mt-0.5 text-black/50">{d.value.toLocaleString()} people · {d.payload.percent}%</p>
    </div>
  );
}

export default function RetrieverEssentials() {
  const [period, setPeriod] = useState("Fall 2024");

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-7 md:px-8 md:py-9">
      {/* Page header */}
      <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-[#d4aa7d]/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.16em] text-[#8a6a3a]">PantrySoft Integration</span>
          </div>
          <h1 className="text-[30px] font-bold tracking-[-.04em] md:text-[38px]">Retriever Essentials</h1>
          <p className="mt-2 text-sm text-black/50">Food pantry logistics, distribution weight, and community impact — sourced from PantrySoft.</p>
        </div>
        <div className="flex gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-lg border border-black/15 bg-white px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#272727]">
            <option>Fall 2024</option>
            <option>Spring 2024</option>
            <option>Academic year</option>
          </select>
          <button className="flex items-center gap-2 rounded-lg bg-[#272727] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-black/80">
            <Icon name="upload" size={16} /> Export report
          </button>
        </div>
      </section>

      {/* Key metrics */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {semesterMetrics.map((m) => (
          <article key={m.label} className="rounded-xl border border-black/[.08] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,.02)]">
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold text-black/48">{m.label}</p>
              <div className={`grid h-8 w-8 place-items-center rounded-lg ${m.color}`}>
                <Icon name={m.icon} size={16} />
              </div>
            </div>
            <div className="mt-5 flex items-baseline gap-1.5">
              <p className="text-[30px] font-bold tracking-[-.04em]">{m.value}</p>
              <span className="text-sm font-semibold text-black/35">{m.unit}</span>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[10px]">
              <span className="rounded bg-[#d2d8b3]/60 px-1.5 py-1 font-bold text-[#3d5237]">{m.change}</span>
              <span className="text-black/40">{m.detail}</span>
            </div>
          </article>
        ))}
      </section>

      {/* Highlight banner */}
      <section className="mt-3 grid gap-3 md:grid-cols-2">
        <article className="flex items-center justify-between rounded-xl bg-[#d4aa7d] p-5 md:px-6">
          <div>
            <p className="text-xs font-semibold text-black/55">Food utilization rate</p>
            <p className="mt-1 text-[28px] font-bold tracking-[-.04em]">93.7%</p>
            <p className="mt-1 text-[10px] font-semibold">of collected food successfully distributed</p>
          </div>
          <div className="hidden h-14 items-end gap-1.5 sm:flex">
            {[55,62,71,78,87,93,94].map((h, i) => (
              <span key={i} className="w-2 rounded-sm bg-[#272727]/70" style={{ height: `${h}%` }} />
            ))}
          </div>
        </article>
        <article className="flex items-center justify-between rounded-xl bg-[#272727] p-5 text-white md:px-6">
          <div>
            <p className="text-xs font-semibold text-white/50">Total pantry visits this semester</p>
            <p className="mt-1 text-[28px] font-bold tracking-[-.04em]">1,631</p>
            <p className="mt-1 text-[10px] font-semibold text-[#d4aa7d]">avg. 14.0 lbs per visit</p>
          </div>
          <div className="relative grid h-16 w-16 place-items-center rounded-full" style={{ background: "conic-gradient(#d4aa7d 0 93.7%, #404040 93.7% 100%)" }}>
            <div className="grid h-11 w-11 place-items-center rounded-full bg-[#272727] text-[10px] font-bold">93.7%</div>
          </div>
        </article>
      </section>

      {/* Chart row */}
      <section className="mt-3 grid gap-3 xl:grid-cols-[1fr_1.1fr]">
        {/* Pie chart */}
        <article className="rounded-xl border border-black/[.08] bg-white p-5 md:p-6">
          <h2 className="text-sm font-bold">People impacted by category</h2>
          <p className="mt-1 text-[11px] text-black/42">Breakdown of 1,634 unique community members served · {period}</p>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="h-[220px] w-full sm:w-[220px] shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={58}
                    outerRadius={96}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {categoryData.map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="flex-1 text-[12px] text-black/60">{item.name}</span>
                  <span className="text-[12px] font-bold">{item.value.toLocaleString()}</span>
                  <span className="w-10 text-right text-[10px] text-black/40">{item.percent}%</span>
                </div>
              ))}
              <div className="mt-4 rounded-lg bg-[#f8f6f2] p-3 text-[10px] leading-relaxed text-black/48">
                <strong className="text-[#272727]">Undergraduate students</strong> make up the largest share at 53.5%, followed by graduate students at 19.1%.
              </div>
            </div>
          </div>
        </article>

        {/* Weekly visits bar chart */}
        <article className="rounded-xl border border-black/[.08] bg-white p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-bold">Weekly pantry visits</h2>
              <p className="mt-1 text-[11px] text-black/42">Visits and total pounds distributed by week</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-black/50">
              <span className="h-2 w-2 rounded-full bg-[#d4aa7d]" /> Visits
            </div>
          </div>
          <div className="mt-8 flex h-[200px] items-end gap-3">
            {weeklyVisits.map((w) => (
              <div key={w.week} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center gap-1">
                  <span className="text-[9px] font-bold text-black/50">{w.visits}</span>
                  <div
                    className="w-full rounded-t-md bg-[#d4aa7d] transition-all"
                    style={{ height: `${(w.visits / maxVisits) * 160}px` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3">
            {weeklyVisits.map((w) => (
              <div key={w.week} className="flex-1 text-center text-[9px] text-black/35">{w.week}</div>
            ))}
          </div>
          {/* Pounds table */}
          <div className="mt-5 border-t border-black/[.07] pt-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[.12em] text-black/38">Pounds distributed by week</p>
            <div className="space-y-2">
              {weeklyVisits.map((w) => (
                <div key={w.week} className="flex items-center gap-3 text-xs">
                  <span className="w-12 text-black/45">{w.week}</span>
                  <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-black/[.06]">
                    <div className="h-full rounded-full bg-[#272727]" style={{ width: `${(w.lbs / 2196) * 100}%` }} />
                  </div>
                  <span className="w-16 text-right font-semibold">{w.lbs.toLocaleString()} lbs</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      {/* Recent visits table */}
      <section className="mt-3 overflow-hidden rounded-xl border border-black/[.08] bg-white">
        <div className="flex items-center justify-between border-b border-black/[.07] px-5 py-4 md:px-6">
          <div>
            <h2 className="text-sm font-bold">Recent pantry transactions</h2>
            <p className="mt-1 text-[11px] text-black/42">Latest check-ins logged in PantrySoft · Fall 2024</p>
          </div>
          <button className="text-[11px] font-bold hover:underline">View all in PantrySoft →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="bg-[#faf9f6] text-[9px] uppercase tracking-[.12em] text-black/38">
              <tr>
                <th className="px-6 py-3 font-bold">Date</th>
                <th className="px-4 py-3 font-bold">Category</th>
                <th className="px-4 py-3 text-right font-bold">Items taken</th>
                <th className="px-6 py-3 text-right font-bold">Weight (lbs)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: "Sep 23, 2024", category: "Undergraduate Student", items: 12, lbs: 17.4 },
                { date: "Sep 23, 2024", category: "Graduate Student", items: 9, lbs: 12.8 },
                { date: "Sep 23, 2024", category: "Community Member", items: 15, lbs: 21.0 },
                { date: "Sep 22, 2024", category: "Faculty / Staff", items: 7, lbs: 9.6 },
                { date: "Sep 22, 2024", category: "Undergraduate Student", items: 11, lbs: 15.2 },
                { date: "Sep 21, 2024", category: "Undergraduate Student", items: 14, lbs: 19.8 },
              ].map((row, i) => (
                <tr key={i} className="border-t border-black/[.06] text-xs">
                  <td className="px-6 py-4 text-black/50">{row.date}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d4aa7d]" />
                      <span className="font-semibold">{row.category}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right text-black/60">{row.items}</td>
                  <td className="px-6 py-4 text-right font-bold">{row.lbs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-6 text-center text-[10px] text-black/35">Last synced with PantrySoft today at 8:15 AM · Data reflects live pantry records</p>
    </div>
  );
}
