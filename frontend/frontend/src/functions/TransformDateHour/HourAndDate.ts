export function getDate() {
    const ahora = new Date();
    let ano = ahora.getFullYear();
    let mes = ahora.getMonth() + 1;
    let dia = ahora.getDate();
    return new Date(ano, mes - 1, dia);
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


export function obtenerFechaHoyArgentinaConObjeto() {
    // Obtener la fecha y hora actuales
    const ahora = new Date();
    
    // Convertir a UTC
    const utcDate = new Date(ahora.toISOString());
    
    // Ajustar el offset de tiempo para Argentina (-3 horas durante el horario estándar, -2 durante el horario de verano)
    let offset = -3; // Durante el horario estándar
    if (ahora >= new Date('2024-10-01') && ahora <= new Date('2024-03-31')) { // Suponiendo que el horario de verano comienza el 1 de octubre y termina el 31 de marzo
        offset = -2; // Durante el horario de verano
    }
    const millisecondsOffset = offset * 60 * 60 * 1000; // Convertir a milisegundos
    const adjustedDate = new Date(utcDate.getTime() + millisecondsOffset);
    
    // Formatear la fecha como string en el formato requerido
    const formattedDate = adjustedDate.toISOString().replace(/Z$/, '+00:00'); // Reemplazar Z por +00:00
    
    // Retornar tanto la cadena formateada como el objeto Date
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