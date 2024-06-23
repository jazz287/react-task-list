class DateFormatter{
    static monthsShort = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    static formatToYMD(date){
        // return "yyyy-MM-dd"
        const date = new Date(this.dueDate);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }

    static formateToMD(date){
        // return "MMM dd"
        const date = new Date(this.dueDate);
        return `${this.monthsShort[date.getMonth()]} ${date.getDate()}`;
    }
}