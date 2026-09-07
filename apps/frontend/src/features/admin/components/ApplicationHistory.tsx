import { useMemo, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { filterAndSortHistory, historyColumns, historyValue, historyEmailOptions, HistoryDecision, invalidHistoryRange } from "./historyTable";
import type { ApplicationHistoryEntry, HistoryColumn, HistoryFilters } from "./historyTable";

export default function ApplicationHistory({ entries, loading, busy, onViewDocument }: {
    entries: ApplicationHistoryEntry[];
    loading: boolean;
    busy: boolean;
    onViewDocument: (entry: ApplicationHistoryEntry) => void;
}) {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState<HistoryFilters>({});
    const [sortKey, setSortKey] = useState<HistoryColumn>("reviewedAt");
    const [direction, setDirection] = useState<"asc" | "desc">("desc");
    const [page, setPage] = useState(0);
    const emailOptions = useMemo(() => ({
        applicantEmail: historyEmailOptions(entries, "applicantEmail"),
        reviewerEmail: historyEmailOptions(entries, "reviewerEmail"),
    }), [entries]);
    const filtered = useMemo(() => filterAndSortHistory(entries, query, filters, sortKey, direction), [entries, query, filters, sortKey, direction]);
    const pageSize = 20;
    const lastPage = Math.max(0, Math.ceil(filtered.length / pageSize) - 1);
    const currentPage = Math.min(page, lastPage);
    const rows = filtered.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

    const sort = (key: HistoryColumn) => {
        setDirection(key === sortKey && direction === "asc" ? "desc" : "asc");
        setSortKey(key);
        setPage(0);
    };

    return (
        <section className="min-w-0 rounded-md border p-4 shadow-sm" aria-labelledby="approval-history-title">
            <h2 id="approval-history-title" className="text-lg font-bold">Approval history</h2>
            <p className="mt-1 text-sm text-gray-600">Approved and disapproved applications. Times are shown in your local timezone.</p>
            <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="min-w-0 flex-1">
                    <label htmlFor="history-search" className="mb-1 block text-sm font-medium">Search all columns</label>
                    <Input id="history-search" type="search" placeholder="Email, date, decision, or attachment name" value={query} onChange={(e) => { setQuery(e.target.value); setPage(0); }} />
                </div>
                <Button variant="outline" onClick={() => { setQuery(""); setFilters({}); setPage(0); }}>Clear filters</Button>
            </div>
            <div className="min-w-0">
                <table className="block w-full text-left text-sm xl:table xl:table-fixed" role="table">
                    <caption className="sr-only">Instructor application approval and disapproval history</caption>
                    <thead className="block xl:table-header-group" role="rowgroup">
                        <tr className="grid grid-cols-1 gap-3 rounded-md bg-gray-50 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:table-row xl:rounded-none xl:border-b xl:p-0" role="row">
                            {historyColumns.map(({ key, label }) => (
                                <th key={key} scope="col" role="columnheader" className="block min-w-0 align-top xl:table-cell xl:p-3" aria-sort={sortKey === key ? direction === "asc" ? "ascending" : "descending" : "none"}>
                                    <button type="button" className="flex items-center gap-2 text-left font-semibold hover:text-main" onClick={() => sort(key)} aria-label={`Sort by ${label} ${sortKey === key && direction === "asc" ? "descending" : "ascending"}`}>
                                        {label}
                                        {sortKey !== key ? <ChevronsUpDownIcon className="size-4 shrink-0" /> : direction === "asc" ? <ArrowUpIcon className="size-4 shrink-0" /> : <ArrowDownIcon className="size-4 shrink-0" />}
                                    </button>
                                    {key === "applicantEmail" || key === "reviewerEmail" ? (
                                        <select className="mt-2 h-9 w-full min-w-0 max-w-full rounded-md border bg-white px-2 font-normal" aria-label={`Filter ${label}`} value={filters[key] ?? ""} onChange={(e) => { setFilters((current) => ({ ...current, [key]: e.target.value })); setPage(0); }}>
                                            <option value="">All emails</option>
                                            {emailOptions[key].map((email) => <option key={email} value={email}>{email}</option>)}
                                        </select>
                                    ) : key === "status" ? (
                                        <select className="mt-2 h-9 w-full min-w-0 max-w-full rounded-md border bg-white px-2 font-normal" aria-label="Filter Decision" value={filters.status ?? ""} onChange={(e) => { setFilters((current) => ({ ...current, status: e.target.value as HistoryDecision | "" })); setPage(0); }}>
                                            <option value="">All decisions</option>
                                            {Object.values(HistoryDecision).map((decision) => <option key={decision} value={decision}>{decision === HistoryDecision.APPROVED ? "Approved" : "Disapproved"}</option>)}
                                        </select>
                                    ) : key === "submittedAt" || key === "reviewedAt" ? (
                                        <div className="mt-2 space-y-2 font-normal">
                                            {(["from", "to"] as const).map((bound) => (
                                                <label key={bound} className="block text-xs">
                                                    {bound === "from" ? "From" : "To"}
                                                    <Input className="mt-1 min-w-0 max-w-full bg-white px-1 text-xs" type="datetime-local" step="1" aria-label={`${label} ${bound}`} aria-invalid={invalidHistoryRange(filters[key])} aria-describedby={invalidHistoryRange(filters[key]) ? `history-${key}-error` : undefined} value={filters[key]?.[bound] ?? ""} onChange={(e) => { setFilters((current) => ({ ...current, [key]: { ...current[key], [bound]: e.target.value } })); setPage(0); }} />
                                                </label>
                                            ))}
                                            {invalidHistoryRange(filters[key]) && <p id={`history-${key}-error`} className="text-xs text-red-700" role="alert">From must be before or equal to To.</p>}
                                        </div>
                                    ) : null}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="mt-3 block space-y-3 xl:table-row-group xl:space-y-0" role="rowgroup">
                        {loading ? <tr className="block xl:table-row" role="row"><td role="cell" colSpan={6} className="block p-8 text-center text-gray-500 xl:table-cell">Loading history...</td></tr> : rows.length === 0 ? (
                            <tr className="block xl:table-row" role="row"><td role="cell" colSpan={6} className="block p-8 text-center text-gray-500 xl:table-cell">{entries.length === 0 ? "No applications have been reviewed yet." : "No applications match your search."}</td></tr>
                        ) : rows.map((entry) => (
                            <tr key={entry.id} role="row" className="grid grid-cols-1 rounded-md border sm:grid-cols-2 xl:table-row xl:rounded-none xl:border-x-0 xl:border-t-0 xl:last:border-b-0 hover:bg-gray-50">
                                {historyColumns.map(({ key, label }) => (
                                    <td key={key} role="cell" className="block min-w-0 p-3 align-top [overflow-wrap:anywhere] xl:table-cell">
                                        <span className="mb-1 block text-xs font-semibold text-gray-500 xl:hidden" aria-hidden="true">{label}</span>
                                        {key === "idDocumentName" ? (
                                            <button type="button" className="inline-flex items-center gap-1 break-all text-left text-main underline disabled:opacity-50" disabled={busy} onClick={() => onViewDocument(entry)} aria-label={`Open attachment ${entry.idDocumentName} for ${entry.applicantEmail}`}>
                                                {entry.idDocumentName}<ExternalLinkIcon className="size-4 shrink-0" />
                                            </button>
                                        ) : key === "status" ? (
                                            <span className={`inline-block rounded-full px-2 py-1 text-xs font-semibold ${entry.status === "APPROVED" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{historyValue(entry, key)}</span>
                                        ) : key.endsWith("At") && entry[key] ? (
                                            <time dateTime={entry[key] ?? undefined}>{historyValue(entry, key)}</time>
                                        ) : historyValue(entry, key)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-gray-600" aria-live="polite">{filtered.length === 0 ? "0" : `${currentPage * pageSize + 1}–${Math.min((currentPage + 1) * pageSize, filtered.length)}`} of {filtered.length} matching applications ({entries.length} total)</p>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" disabled={currentPage === 0} onClick={() => setPage(currentPage - 1)}>Previous</Button>
                    <span className="text-sm">Page {currentPage + 1} of {lastPage + 1}</span>
                    <Button variant="outline" disabled={currentPage === lastPage} onClick={() => setPage(currentPage + 1)}>Next</Button>
                </div>
            </div>
        </section>
    );
}
