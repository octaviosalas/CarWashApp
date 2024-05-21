function formatHourToText(dateString: string): string {
    const date = new Date(dateString);

    let hours = date.getHours().toString(); 
    let minutes = date.getMinutes().toString(); 
    
    if (minutes.length < 2) { 
        minutes = '0' + minutes;
    }

    if (hours.length < 2) { 
        hours = '0' + hours;
    }

    return `${hours}:${minutes}`; 
}

export default formatHourToText;