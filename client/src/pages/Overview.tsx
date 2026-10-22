import { useRef, useState } from "react";
import { Icon } from "../components/icons";
import type { IconName } from "../components/icons";

const metrics = [
  { label: "Total students", value: "13,991", change: "1.8%", detail: "vs. last academic year", color: "bg-[#efd09e]/50", icon: "students" as IconName },
  { label: "Undergraduate", value: "10,490", change: "2.1%", detail: "75% of enrollment", color: "bg-[#d2d8b3]/50", icon: "students" as IconName },
  { label: "Graduate", value: "3,501", change: "0.9%", detail: "25% of enrollment", color: "bg-[#90a9b7]/30", icon: "students" as IconName },
  { label: "Events this week", value: "48", change: "12.4%", detail: "5 more than last week", color: "bg-[#d4aa7d]/25", icon: "calendar" as IconName },
];

const events = [
  { name: "Welcome Week Social", dept: "Campus Life", date: "Sep 12", attendance: 384, rate: "92%" },
  { name: "Career Connections", dept: "Career Center", date: "Sep 11", attendance: 241, rate: "81%" },
  { name: "Retriever Pantry Pop-up", dept: "Retriever Essentials", date: "Sep 10", attendance: 186, rate: "88%" },
  { name: "Graduate Coffee Hour", dept: "Graduate Student Life", date: "Sep 09", attendance: 127, rate: "76%" },
];

const engagement = [
  { name: "First-year", percent: 34, color: "bg-[#d4aa7d]" },
  { name: "Sophomore", percent: 26, color: "bg-[#272727]" },
  { name: "Junior", percent: 18, color: "bg-[#90a9b7]" },
  { name: "Senior", percent: 14, color: "bg-[#d2d8b3]" },
  { name: "Graduate", percent: 8, color: "bg-[#efd09e]" },
];

export default function Overview() {
  const [period, setPeriod] = useState("This semester");
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-7 md:px-8 md:py-9">
      <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[.18em] text-[#8a6a3a]">Academic year 2024–25</p>
          <h1 className="text-[30px] font-bold tracking-[-.04em] md:text-[38px]">Division impact overview</h1>
          <p className="mt-2 text-sm text-black/50">A current view of student reach, participation, and campus engagement.</p>
        </div>
        <div className="flex gap-2">
          <select value={period} onChange={(e) => setPeriod(e.target.value)} className="rounded-lg border border-black/15 bg-white px-3 py-2.5 text-xs font-semibold outline-none focus:border-[#272727]">
            <option>This semester</option><option>Past 30 days</option><option>Academic year</option>
          </select>
          <input ref={fileRef} type="file" accept=".csv,.xlsx" className="hidden" onChange={(e) => e.target.files?.length && setUploaded(true)} />
          <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 rounded-lg bg-[#272727] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-black/80">
            <Icon name={uploaded ? "check" : "upload"} size={16} /> {uploaded ? "Data added" : "Upload data"}
          </button>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-black/[.08] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,.02)]">
            <div className="flex items-start justify-between"><p className="text-xs font-semibold text-black/48">{metric.label}</p><div className={`grid h-8 w-8 place-items-center rounded-lg ${metric.color}`}><Icon name={metric.icon} size={16} /></div></div>
            <p className="mt-5 text-[30px] font-bold tracking-[-.04em]">{metric.value}</p>
            <div className="mt-3 flex items-center gap-2 text-[10px]"><span className="rounded bg-[#d2d8b3]/60 px-1.5 py-1 font-bold text-[#3d5237]">↑ {metric.change}</span><span className="text-black/40">{metric.detail}</span></div>
          </article>
        ))}
      </section>

      <section className="mt-3 grid gap-3 md:grid-cols-2">
        <article className="flex items-center justify-between rounded-xl bg-[#d4aa7d] p-5 md:px-6">
          <div><p className="text-xs font-semibold text-black/55">Total event attendance</p><p className="mt-1 text-[28px] font-bold tracking-[-.04em]">2,847</p><p className="mt-1 text-[10px] font-semibold">Past 7 days · up 8.2%</p></div>
          <div className="hidden h-14 items-end gap-1.5 sm:flex">{[30,45,34,58,44,68,54,76,64,85].map((h,i)=><span key={i} className="w-2 rounded-sm bg-[#272727]/70" style={{height:`${h}%`}} />)}</div>
        </article>
        <article className="flex items-center justify-between rounded-xl bg-[#272727] p-5 text-white md:px-6">
          <div><p className="text-xs font-semibold text-white/50">Unique students reached</p><p className="mt-1 text-[28px] font-bold tracking-[-.04em]">1,926</p><p className="mt-1 text-[10px] font-semibold text-[#d4aa7d]">13.8% of all students</p></div>
          <div className="relative grid h-16 w-16 place-items-center rounded-full" style={{background:"conic-gradient(#d4aa7d 0 49.7%, #404040 49.7% 100%)"}}><div className="grid h-11 w-11 place-items-center rounded-full bg-[#272727] text-[10px] font-bold">67.6%</div></div>
        </article>
      </section>

      <section className="mt-3 grid gap-3 xl:grid-cols-[1.55fr_1fr]">
        <article className="rounded-xl border border-black/[.08] bg-white p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div><h2 className="text-sm font-bold">Weekly engagement trend</h2><p className="mt-1 text-[11px] text-black/42">Unique students participating across all departments</p></div>
            <div className="flex items-center gap-2 text-[10px] text-black/50"><span className="h-2 w-2 rounded-full bg-[#d4aa7d]" /> This semester</div>
          </div>
          <div className="mt-6 flex h-[205px]">
            <div className="flex w-9 flex-col justify-between pb-6 text-[9px] text-black/35"><span>800</span><span>600</span><span>400</span><span>200</span><span>0</span></div>
            <div className="relative flex-1 overflow-hidden">
              <div className="absolute inset-0 flex flex-col justify-between pb-6">{[1,2,3,4,5].map(n=><div key={n} className="border-t border-dashed border-black/[.08]" />)}</div>
              <svg viewBox="0 0 700 180" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[160px] w-full overflow-visible">
                <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#d4aa7d" stopOpacity=".3"/><stop offset="1" stopColor="#d4aa7d" stopOpacity="0"/></linearGradient></defs>
                <path d="M0 150 C60 142 65 110 120 116 S205 78 260 92 S335 48 400 64 S482 45 535 56 S625 10 700 25 L700 180 L0 180Z" fill="url(#area)" />
                <path d="M0 150 C60 142 65 110 120 116 S205 78 260 92 S335 48 400 64 S482 45 535 56 S625 10 700 25" fill="none" stroke="#c49460" strokeWidth="3" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="absolute inset-x-0 bottom-0 flex justify-between text-[9px] text-black/35"><span>Aug 19</span><span>Aug 26</span><span>Sep 02</span><span>Sep 09</span><span>Sep 16</span></div>
            </div>
          </div>
        </article>

        <article className="rounded-xl border border-black/[.08] bg-white p-5 md:p-6">
          <h2 className="text-sm font-bold">Engagement by student type</h2>
          <p className="mt-1 text-[11px] text-black/42">Share of unique attendees</p>
          <div className="mt-8 flex h-3 overflow-hidden rounded-full">{engagement.map(x=><div key={x.name} className={x.color} style={{width:`${x.percent}%`}} />)}</div>
          <div className="mt-7 space-y-3.5">
            {engagement.map((item) => <div key={item.name} className="flex items-center text-xs"><span className={`mr-3 h-2.5 w-2.5 rounded-full ${item.color}`} /><span className="flex-1 text-black/60">{item.name}</span><span className="font-bold">{item.percent}%</span></div>)}
          </div>
          <div className="mt-6 rounded-lg bg-[#f8f6f2] p-3 text-[10px] leading-relaxed text-black/48"><strong className="text-[#272727]">First-year students</strong> are the most engaged group, accounting for over one-third of attendance.</div>
        </article>
      </section>

      <section className="mt-3 overflow-hidden rounded-xl border border-black/[.08] bg-white">
        <div className="flex items-center justify-between border-b border-black/[.07] px-5 py-4 md:px-6"><div><h2 className="text-sm font-bold">Top events this week</h2><p className="mt-1 text-[11px] text-black/42">Ranked by total attendance</p></div><button className="text-[11px] font-bold hover:underline">View all events →</button></div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead className="bg-[#faf9f6] text-[9px] uppercase tracking-[.12em] text-black/38"><tr><th className="px-6 py-3 font-bold">Event</th><th className="px-4 py-3 font-bold">Department</th><th className="px-4 py-3 font-bold">Date</th><th className="px-4 py-3 text-right font-bold">Attendance</th><th className="px-6 py-3 text-right font-bold">Check-in rate</th></tr></thead>
            <tbody>{events.map((event,i)=><tr key={event.name} className="border-t border-black/[.06] text-xs"><td className="px-6 py-4"><span className="mr-3 inline-grid h-6 w-6 place-items-center rounded-md bg-[#efd09e]/40 text-[9px] font-bold">{i+1}</span><span className="font-semibold">{event.name}</span></td><td className="px-4 py-4 text-black/48">{event.dept}</td><td className="px-4 py-4 text-black/48">{event.date}</td><td className="px-4 py-4 text-right font-bold">{event.attendance}</td><td className="px-6 py-4 text-right"><span className="rounded-full bg-[#d2d8b3]/60 px-2 py-1 text-[10px] font-bold text-[#3d5237]">{event.rate}</span></td></tr>)}</tbody>
          </table>
        </div>
      </section>
      <p className="mt-6 text-center text-[10px] text-black/35">Last updated today at 9:42 AM · Data reflects uploaded division records</p>
    </div>
  );
}
