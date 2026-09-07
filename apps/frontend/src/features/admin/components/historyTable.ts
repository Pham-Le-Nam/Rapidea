export const HistoryDecision = { APPROVED: "APPROVED", DISAPPROVED: "DISAPPROVED" } as const;
export type HistoryDecision = typeof HistoryDecision[keyof typeof HistoryDecision];

export type ApplicationHistoryEntry = {
    id: string;
    status: HistoryDecision;
    applicantEmail: string;
    reviewerEmail: string | null;
    submittedAt: string;
    reviewedAt: string | null;
    idDocumentName: string;
};

export const historyColumns = [
    { key: "applicantEmail", label: "Applicant email" },
    { key: "reviewerEmail", label: "Approver / reviewer email" },
    { key: "submittedAt", label: "Application created" },
    { key: "reviewedAt", label: "Approved / disapproved at" },
    { key: "status", label: "Decision" },
    { key: "idDocumentName", label: "Application attachment" },
] as const;

export type HistoryColumn = typeof historyColumns[number]["key"];
export type HistoryDateRange = { from?: string; to?: string };
export type HistoryFilters = {
    applicantEmail?: string;
    reviewerEmail?: string;
    status?: HistoryDecision | "";
    submittedAt?: HistoryDateRange;
    reviewedAt?: HistoryDateRange;
};

export function historyEmailOptions(entries: ApplicationHistoryEntry[], key: "applicantEmail" | "reviewerEmail") {
    return [...new Set(entries.flatMap((entry) => entry[key] ? [entry[key]] : []))]
        .sort((a, b) => a.localeCompare(b));
}

export function invalidHistoryRange(range?: HistoryDateRange) {
    return !!(range?.from && range.to && new Date(range.from).getTime() > new Date(range.to).getTime());
}

function inDateRange(value: string | null, range?: HistoryDateRange) {
    if (!range?.from && !range?.to) return true;
    if (!value || invalidHistoryRange(range)) return false;
    const time = new Date(value).getTime();
    const from = range.from ? new Date(range.from).getTime() : -Infinity;
    // Include the entire selected final second (or minute when seconds were omitted).
    const to = range.to ? new Date(range.to).getTime() + (range.to.length === 16 ? 59999 : 999) : Infinity;
    return time >= from && time <= to;
}

export function historyValue(entry: ApplicationHistoryEntry, column: HistoryColumn): string {
    const value = entry[column];
    if (value === null) return "Unavailable";
    if (column === "submittedAt" || column === "reviewedAt") return new Date(value).toLocaleString();
    if (column === "status") return value === "APPROVED" ? "Approved" : "Disapproved";
    return value;
}

export function filterAndSortHistory(
    entries: ApplicationHistoryEntry[], query: string, filters: HistoryFilters,
    sortKey: HistoryColumn, direction: "asc" | "desc",
) {
    const searchable = (entry: ApplicationHistoryEntry, key: HistoryColumn) =>
        `${historyValue(entry, key)} ${entry[key] ?? ""}`.toLocaleLowerCase();
    const search = query.trim().toLocaleLowerCase();
    return entries.filter((entry) =>
        (!search || historyColumns.some(({ key }) => searchable(entry, key).includes(search))) &&
        (!filters.applicantEmail || entry.applicantEmail === filters.applicantEmail) &&
        (!filters.reviewerEmail || entry.reviewerEmail === filters.reviewerEmail) &&
        (!filters.status || entry.status === filters.status) &&
        inDateRange(entry.submittedAt, filters.submittedAt) &&
        inDateRange(entry.reviewedAt, filters.reviewedAt),
    ).sort((a, b) => {
        const left = a[sortKey];
        const right = b[sortKey];
        // Keep missing reviewers or decision dates last in either direction.
        if (left === null || right === null) return left === right ? a.id.localeCompare(b.id) : left === null ? 1 : -1;
        const comparison = sortKey === "submittedAt" || sortKey === "reviewedAt"
            ? new Date(left).getTime() - new Date(right).getTime()
            : left.localeCompare(right, undefined, { sensitivity: "base", numeric: true });
        return (direction === "asc" ? comparison : -comparison) || a.id.localeCompare(b.id);
    });
}
