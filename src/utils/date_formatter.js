class DateFormatter{
    static monthsShort = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    static padZero(n){
        return n < 10 ? `0${n}` : n;
    }

    static formatToYMD(d){
        // return "yyyy-MM-dd"
        const date = new Date(d);
        return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())}`;
    }

    static formateToMD(d){
        // return "MMM dd"
        const date = new Date(d);
        return `${this.monthsShort[date.getMonth()]} ${this.padZero(date.getDate())}`;
    }
}

export default DateFormatter;