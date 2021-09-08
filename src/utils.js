export const formatTime = (time) => {
    const shortenedTime = time.slice(11, 16);
    const [hours, minutes] = shortenedTime.split(':');
    return `${(hours > 12) ? hours - 12 : hours}:${minutes}${(hours >= 12) ? 'pm' : 'am'}`;
}

export const formatDate = (date) => {
    const formattedDate = new Date(date);
    const [month, day, year] = [(1 + formattedDate.getMonth()), formattedDate.getDate(), formattedDate.getFullYear()];
    const monthFormat = month > 9 ? month : '0' + month;
    return `${monthFormat}/${(day < 10) ? '0' + day : day}/${year}`;
}