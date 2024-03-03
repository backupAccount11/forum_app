export function dateFormat(date) {
    const temp = new Date(date);
    return temp.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
}