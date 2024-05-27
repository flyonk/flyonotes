function isErrorOnMessage(error, message) {
    return error.message.includes(message);
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

export { isErrorOnMessage, formatDateFromTimestamp }