function formatDate(fecha: string) {
    const fechaObjeto = new Date(fecha);
    const dia = String(fechaObjeto.getDate()).padStart(2, '0');
    const mes = String(fechaObjeto.getMonth() + 1).padStart(2, '0'); 
    const ano = fechaObjeto.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${ano}`;
    return fechaFormateada;
}

export default formatDate