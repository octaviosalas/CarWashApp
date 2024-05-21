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