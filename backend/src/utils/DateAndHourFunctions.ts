function obtenerFechaExacta() {
    const ahora = new Date();
    let offsetUTC = -3; 
    const offsetVerano = -2; 

    let mes = ahora.getMonth() + 1; 
    let dia = ahora.getDate();
    let ano = ahora.getFullYear();

    if ((mes > 2 && mes < 10) || (mes == 2 && dia >= 21)) {
        offsetUTC = offsetVerano;
    }

    const fechaArgentina = new Date(ano, mes - 1, dia, offsetUTC);

    return fechaArgentina;
}

console.log(obtenerFechaExacta());


function obtenerHoraExacta() {
    const ahora = new Date();
    let offsetUTC = -3; 
    const offsetVerano = -2; 

    let hora = ahora.getHours();
    let minuto = ahora.getMinutes();
    let segundo = ahora.getSeconds();

    if ((hora >= 0 && hora <= 11) || (hora >= 20 && hora <= 23)) {
        offsetUTC = offsetVerano;
    }

    const horaArgentina = new Date(0, 0, 0, hora + offsetUTC, minuto, segundo);

    return horaArgentina;
}

console.log(obtenerHoraExacta());


const fechaLocal = new Date(obtenerFechaExacta());
const formatter = new Intl.DateTimeFormat('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
});

const fechaFormateada = formatter.format(fechaLocal);
console.log(`Hoy es ${fechaFormateada}.`);



const horaLocal = new Date(obtenerHoraExacta());
const horaFormatter = new Intl.DateTimeFormat('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
});

const horaFormateada = horaFormatter.format(horaLocal);
console.log(`La hora es ${horaFormateada}.`);