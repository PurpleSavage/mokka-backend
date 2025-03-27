export function calculateExpirationDate(startDate:Date, days = 30) {
    // 1 día = 24 * 60 * 60 * 1000 milisegundos
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const expirationDate = new Date(startDate.getTime() + days * millisecondsPerDay);
    return expirationDate;
}


