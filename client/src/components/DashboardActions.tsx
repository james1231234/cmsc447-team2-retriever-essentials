import { useRef, useState, type FormEvent } from "react"
import { Icon } from "./icons"
import Modal from "./Modal"

const offices = [
  "Dean of Students",
  "Retriever Essentials",
  "Campus Life",
  "Student Conduct",
  "Accessibility & Disability Services",
]

export default function DashboardActions({
  defaultOffice = "Dean of Students",
}: {
  defaultOffice?: string
}) {
  const [uploadOpen, setUploadOpen] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [reportComplete, setReportComplete] = useState(false)
  const [fileName, setFileName] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  const finishUpload = (event: FormEvent) => {
    event.preventDefault()
    setUploadComplete(true)
  }

  const finishReport = (event: FormEvent) => {
    event.preventDefault()
    setReportComplete(true)
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setUploadComplete(false)
            setUploadOpen(true)
          }}
          className="flex items-center gap-2 rounded-lg border border-black/15 bg-white px-4 py-2.5 text-xs font-bold transition hover:border-black/30 hover:bg-black/[.02]"
        >
          <Icon name="upload" size={16} /> Upload data
        </button>
        <button
          onClick={() => {
            setReportComplete(false)
            setReportOpen(true)
          }}
          className="flex items-center gap-2 rounded-lg bg-[#272727] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-black/80"
        >
          <Icon name="report" size={16} /> Generate report
        </button>
      </div>

      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload dashboard data"
        description="Add a CSV or Excel export to the selected Dean of Students office."
      >
        {uploadComplete ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#d2d8b3]">
              <Icon name="check" size={22} />
            </div>
            <h3 className="mt-4 text-base font-bold">
              Upload ready for processing
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-black/50">
              This demo has staged {fileName || "your file"}. A future backend
              can validate and import these records.
            </p>
            <button
              onClick={() => setUploadOpen(false)}
              className="mt-6 rounded-lg bg-[#272727] px-5 py-2.5 text-xs font-bold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={finishUpload} className="space-y-5 p-6">
            <label className="block">
              <span className="mb-2 block text-xs font-bold">DoS office</span>
              <select
                defaultValue={defaultOffice}
                className="w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-xs outline-none focus:border-[#272727]"
              >
                {offices.map((office) => (
                  <option key={office}>{office}</option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-bold">Data type</span>
                <select className="w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-xs outline-none focus:border-[#272727]">
                  <option>Program participation</option>
                  <option>Event attendance</option>
                  <option>Pantry transactions</option>
                  <option>Student engagement</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold">
                  Reporting period
                </span>
                <select className="w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-xs outline-none focus:border-[#272727]">
                  <option>Fall 2024</option>
                  <option>Spring 2025</option>
                  <option>Academic year 2024–25</option>
                </select>
              </label>
            </div>
            <div>
              <span className="mb-2 block text-xs font-bold">Data file</span>
              <input
                ref={fileRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                className="hidden"
                onChange={(event) =>
                  setFileName(event.target.files?.[0]?.name || "")
                }
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="flex w-full flex-col items-center rounded-xl border border-dashed border-black/20 bg-white px-5 py-7 text-center transition hover:border-[#d4aa7d] hover:bg-[#efd09e]/10"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#efd09e]/60">
                  <Icon name={fileName ? "check" : "upload"} />
                </span>
                <span className="mt-3 text-xs font-bold">
                  {fileName || "Choose a CSV or Excel file"}
                </span>
                <span className="mt-1 text-[10px] text-black/40">
                  Maximum file size: 25 MB
                </span>
              </button>
            </div>
            <label className="block">
              <span className="mb-2 block text-xs font-bold">
                Import notes{" "}
                <span className="font-normal text-black/35">(optional)</span>
              </span>
              <textarea
                rows={3}
                placeholder="Add context for this dataset..."
                className="w-full resize-none rounded-lg border border-black/15 bg-white px-3 py-3 text-xs outline-none placeholder:text-black/30 focus:border-[#272727]"
              />
            </label>
            <div className="flex justify-end gap-2 border-t border-black/[.07] pt-5">
              <button
                type="button"
                onClick={() => setUploadOpen(false)}
                className="rounded-lg px-4 py-2.5 text-xs font-bold text-black/55 hover:bg-black/[.05]"
              >
                Cancel
              </button>
              <button
                disabled={!fileName}
                className="rounded-lg bg-[#272727] px-5 py-2.5 text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-35"
              >
                Stage upload
              </button>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        title="Generate a report"
        description="Choose a date range and format for a downloadable dashboard summary."
      >
        {reportComplete ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#d2d8b3]">
              <Icon name="report" size={22} />
            </div>
            <h3 className="mt-4 text-base font-bold">
              Your report is being prepared
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-black/50">
              In the connected version, the generated file will download here
              and be saved to your report history.
            </p>
            <button
              onClick={() => setReportOpen(false)}
              className="mt-6 rounded-lg bg-[#272727] px-5 py-2.5 text-xs font-bold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={finishReport} className="space-y-5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-xs font-bold">Start date</span>
                <input
                  required
                  type="date"
                  defaultValue="2024-08-26"
                  className="w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-xs outline-none focus:border-[#272727]"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-xs font-bold">End date</span>
                <input
                  required
                  type="date"
                  defaultValue="2024-12-20"
                  className="w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-xs outline-none focus:border-[#272727]"
                />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-xs font-bold">
                Report format
              </span>
              <select className="w-full rounded-lg border border-black/15 bg-white px-3 py-3 text-xs outline-none focus:border-[#272727]">
                <option>PDF summary</option>
                <option>Excel workbook</option>
                <option>CSV data export</option>
              </select>
            </label>
            <fieldset>
              <legend className="mb-2 text-xs font-bold">
                Include in report
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  "Key metrics",
                  "Charts and trends",
                  "Detailed records",
                  "Methodology notes",
                ].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-3 text-xs"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-[#272727]"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="rounded-lg bg-[#efd09e]/30 p-3 text-[10px] leading-relaxed text-black/55">
              Report values will reflect the dashboard data available within
              your selected date range.
            </div>
            <div className="flex justify-end gap-2 border-t border-black/[.07] pt-5">
              <button
                type="button"
                onClick={() => setReportOpen(false)}
                className="rounded-lg px-4 py-2.5 text-xs font-bold text-black/55 hover:bg-black/[.05]"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-[#272727] px-5 py-2.5 text-xs font-bold text-white">
                <Icon name="report" size={15} /> Generate report
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  )
}
