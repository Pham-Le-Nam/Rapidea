import assert from 'node:assert/strict';
import { test } from 'node:test';
import { filterAndSortHistory, historyColumns, historyValue, historyEmailOptions, HistoryDecision, invalidHistoryRange } from '../src/features/admin/components/historyTable.ts';

const entries = [
    { id: 'a', applicantEmail: 'zoe@example.com', reviewerEmail: 'admin-b@example.com', submittedAt: '2026-01-30T12:00:00Z', reviewedAt: '2026-02-01T00:00:00Z', status: 'APPROVED', idDocumentName: 'passport10.pdf' },
    { id: 'b', applicantEmail: 'amy@example.com', reviewerEmail: 'admin-a@example.com', submittedAt: '2025-12-31T12:00:00Z', reviewedAt: '2026-01-02T00:00:00Z', status: 'DISAPPROVED', idDocumentName: 'passport2.pdf' },
];
const ids = (rows) => rows.map((row) => row.id);

test('every column remains searchable through global search', () => {
    for (const { key } of historyColumns) {
        const query = historyValue(entries[1], key);
        assert.ok(filterAndSortHistory(entries, query, {}, 'reviewedAt', 'desc').some((row) => row.id === 'b'));
    }
    assert.deepEqual(ids(filterAndSortHistory(entries, '  AMY@EXAMPLE.COM ', {}, 'reviewedAt', 'desc')), ['b']);
});

test('all column filters combine with global search', () => {
    assert.deepEqual(ids(filterAndSortHistory(entries, 'passport', { reviewerEmail: 'admin-a@example.com', status: HistoryDecision.DISAPPROVED }, 'reviewedAt', 'desc')), ['b']);
    assert.deepEqual(filterAndSortHistory(entries, 'zoe', { reviewerEmail: 'admin-a@example.com' }, 'reviewedAt', 'desc'), []);
});

test('email options are unique, sorted, and sourced from all history entries', () => {
    const rows = [...entries, entries[0], { ...entries[1], reviewerEmail: null }];
    assert.deepEqual(historyEmailOptions(rows, 'applicantEmail'), ['amy@example.com', 'zoe@example.com']);
    assert.deepEqual(historyEmailOptions(rows, 'reviewerEmail'), ['admin-a@example.com', 'admin-b@example.com']);
    assert.deepEqual(historyEmailOptions([], 'reviewerEmail'), []);
});

test('dropdown selections match exact email and enum decision values', () => {
    assert.deepEqual(ids(filterAndSortHistory(entries, '', { status: HistoryDecision.APPROVED }, 'reviewedAt', 'desc')), ['a']);
    assert.deepEqual(ids(filterAndSortHistory(entries, '', { applicantEmail: 'amy@example.com' }, 'reviewedAt', 'desc')), ['b']);
    assert.deepEqual(filterAndSortHistory(entries, '', { applicantEmail: 'amy' }, 'reviewedAt', 'desc'), []);
    assert.equal(filterAndSortHistory(entries, '', { status: '', applicantEmail: '', reviewerEmail: '' }, 'reviewedAt', 'desc').length, 2);
});

test('both date columns support inclusive, open-ended and combined ranges', () => {
    for (const key of ['submittedAt', 'reviewedAt']) {
        const boundary = entries[1][key];
        assert.deepEqual(ids(filterAndSortHistory(entries, '', { [key]: { from: boundary, to: boundary } }, 'reviewedAt', 'desc')), ['b']);
        assert.deepEqual(ids(filterAndSortHistory(entries, '', { [key]: { from: entries[0][key] } }, 'reviewedAt', 'desc')), ['a']);
        assert.deepEqual(ids(filterAndSortHistory(entries, '', { [key]: { to: boundary } }, 'reviewedAt', 'desc')), ['b']);
    }
    assert.deepEqual(ids(filterAndSortHistory(entries, '', { submittedAt: { from: '2026-01-01T00:00:00Z' }, reviewedAt: { to: '2026-02-01T00:00:00Z' } }, 'reviewedAt', 'desc')), ['a']);
});

test('local date-time inputs include the entire selected ending second', () => {
    const local = '2026-09-07T12:30:15';
    const time = new Date(local).getTime();
    const rows = [0, 999, 1000].map((offset) => ({ ...entries[0], id: String(offset), reviewedAt: new Date(time + offset).toISOString() }));
    assert.deepEqual(ids(filterAndSortHistory(rows, '', { reviewedAt: { from: local, to: local } }, 'reviewedAt', 'asc')), ['0', '999']);
});

test('invalid ranges return no results and missing dates only match unbounded ranges', () => {
    const reversed = { from: '2026-02-01T00:00:00Z', to: '2026-01-01T00:00:00Z' };
    assert.equal(invalidHistoryRange(reversed), true);
    assert.deepEqual(filterAndSortHistory(entries, '', { reviewedAt: reversed }, 'reviewedAt', 'asc'), []);
    const missing = [{ ...entries[0], reviewedAt: null }];
    assert.equal(filterAndSortHistory(missing, '', {}, 'reviewedAt', 'asc').length, 1);
    assert.deepEqual(filterAndSortHistory(missing, '', { reviewedAt: { from: '2026-01-01T00:00:00Z' } }, 'reviewedAt', 'asc'), []);
});

test('sorts every column in both directions, with chronological dates and natural filenames', () => {
    for (const key of ['applicantEmail', 'reviewerEmail', 'submittedAt', 'reviewedAt', 'idDocumentName']) {
        assert.deepEqual(ids(filterAndSortHistory(entries, '', {}, key, 'asc')), ['b', 'a']);
        assert.deepEqual(ids(filterAndSortHistory(entries, '', {}, key, 'desc')), ['a', 'b']);
    }
    assert.deepEqual(ids(filterAndSortHistory(entries, '', {}, 'status', 'asc')), ['a', 'b']);
    assert.deepEqual(ids(filterAndSortHistory(entries, '', {}, 'status', 'desc')), ['b', 'a']);
    assert.deepEqual(ids(entries), ['a', 'b']);
});

test('keeps missing historical reviewers and review times last without crashing', () => {
    const missing = { ...entries[0], id: 'missing', reviewerEmail: null, reviewedAt: null };
    for (const key of ['reviewerEmail', 'reviewedAt']) {
        for (const direction of ['asc', 'desc']) {
            assert.equal(filterAndSortHistory([missing, ...entries], '', {}, key, direction).at(-1).id, 'missing');
        }
    }
    assert.deepEqual(ids(filterAndSortHistory([missing, ...entries], 'unavailable', {}, 'reviewedAt', 'asc')), ['missing']);
});
