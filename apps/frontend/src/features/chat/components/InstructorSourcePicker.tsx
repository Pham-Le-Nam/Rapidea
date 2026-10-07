import { useEffect, useState } from "react";
import { getInstructorSourcesApi } from "../api";
import type { AiChatTrustedSourceInput } from "../model/types";
import { Button } from "@/shared/components/ui/button";

export function InstructorSourcePicker({ onSelect }: { onSelect: (source: AiChatTrustedSourceInput) => void }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [sources, setSources] = useState<AiChatTrustedSourceInput[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (!open) return;
        let active = true;
        const timer = window.setTimeout(async () => {
            setLoading(true); setError(false);
            try { const result = await getInstructorSourcesApi(query); if (active) setSources(result); }
            catch { if (active) { setError(true); setSources([]); } }
            finally { if (active) setLoading(false); }
        }, 200);
        return () => { active = false; window.clearTimeout(timer); };
    }, [query, open]);
    return <div className="border-b px-3 py-2">
        <Button variant="outline" size="sm" onClick={() => setOpen(v => !v)}>{open ? "Close source picker" : "Attach your course, post or file"}</Button>
        {open && <div className="mt-2 space-y-2">
            <input aria-label="Search owned sources" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search your sources" className="w-full rounded border p-2 text-sm" />
            <div className="max-h-40 overflow-y-auto text-xs">
                {loading ? "Loading..." : error ? "Couldn't load sources. Try another search." : sources.length === 0 ? "No owned sources found." : sources.map(s => <button
                    key={`${s.sourceType}:${s.sourceId}`} type="button" className="block w-full rounded px-2 py-2 text-left hover:bg-main/10"
                    onClick={() => { onSelect(s); setOpen(false); }}>{s.label} <span className="text-gray-500">({s.sourceType.toLowerCase()})</span></button>)}
            </div>
        </div>}
    </div>;
}
