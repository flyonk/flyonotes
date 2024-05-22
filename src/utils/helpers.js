function generateUniqueId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#@$%'
    const idLength = length || 10;
    let id = '';

    for (let i = 0; i < idLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        id += characters.charAt(randomIndex);
    }

    return id;
}

function formatDateFromTimestamp(timestamp) {
    const date = new Date(+timestamp);
    const [day, month, year, hours, minutes, seconds] = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
    ].map(num => String(num).padStart(2, '0'));
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export { generateUniqueId, formatDateFromTimestamp }