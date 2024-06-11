export function getDate() {
    const ahora = new Date();
    let ano = ahora.getFullYear();
    let mes = ahora.getMonth() + 1;
    let dia = ahora.getDate();
    return new Date(ano, mes - 1, dia);
}

export const actualMonth = ()  => {
    const fecha = new Date();
    return fecha.getMonth() + 1; 
}

export function getHour() {
    const ahora = new Date();
    let offsetUTC = -3; 
    const offsetVerano = -2; 
    let hora = ahora.getHours() + 3;
    if ((hora >= 0 && hora < 12) || (hora > 19 && hora < 24)) {
        offsetUTC = offsetVerano;
    } else {
        offsetUTC = -3;
    }
    hora += offsetUTC;
    const horaArgentina = new Date(0, 0, 0, hora % 24, ahora.getMinutes(), ahora.getSeconds());
    return horaArgentina;
}

export function getYesterdayDate() {
    const today = new Date();
    today.setDate(today.getDate() - 1); 
    return today;
}


export function obtenerFechaHoyArgentinaConObjeto() {
    const ahora = new Date();
        const utcDate = new Date(ahora.toISOString());
    
    let offset = -3;
    if (ahora >= new Date('2024-10-01') && ahora <= new Date('2024-03-31')) { 
        offset = -2; 
    }
    const millisecondsOffset = offset * 60 * 60 * 1000; 
    const adjustedDate = new Date(utcDate.getTime() + millisecondsOffset);
    
    const formattedDate = adjustedDate.toISOString().replace(/Z$/, '+00:00'); 

    return {
        fechaFormateada: formattedDate,
        fechaObjeto: adjustedDate
    };
}


export const actualMonthName = (numeroMes: number): string => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    return meses[numeroMes - 1];
};


export const actualMonthNow = ()  => {
    const fecha = new Date();
    return fecha.getMonth() + 1; 
}


export const getCurrentYear = (): number => {
    const fecha = new Date();
    return fecha.getFullYear(); 
}