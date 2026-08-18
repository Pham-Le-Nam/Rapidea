export function FormatDate(dateString?: string) {
    if (!dateString) {
        return 'Current';
    }

    const date = new Date(dateString);

    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${month} ${year}`;
}

export function FormatDateInput(dateString?: string) {
    if (!dateString) return "";

    const date = new Date(dateString);

    return date.toISOString().split("T")[0]; 
}