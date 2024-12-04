export  function  formateDateToYYYYMMDD(date: Date) {
    // Convert to IST time zone
    let options: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata", year: 'numeric', month: '2-digit', day: '2-digit' };
    let localDateString = new Intl.DateTimeFormat('en-IN', options).format(date);
    
    // Extract the date parts from the formatted string
    let [day, month, year] = localDateString.split('/');
    
    // Format to YYYY-MM-DD
    return `${year}-${month}-${day}`;
}

export  function  formateDateToDDMMYYYY(date: Date) {
    // Convert to IST time zone
    let options: Intl.DateTimeFormatOptions = { timeZone: "Asia/Kolkata", year: 'numeric', month: '2-digit', day: '2-digit' };
    let localDateString = new Intl.DateTimeFormat('en-IN', options).format(date);
    
    // Extract the date parts from the formatted string
    let [day, month, year] = localDateString.split('/');
    
    // Format to YYYY-MM-DD
    return `${day}-${month}-${year}`;
}

export function formateToYearMonth(date: Date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const yearMonth = `${year}-${month}`;
    return yearMonth;
}

export function daysInThisMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}