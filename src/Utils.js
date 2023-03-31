export function convertDateToHebrewString(date) {
    return new Date(date).toLocaleDateString('he-IL', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}