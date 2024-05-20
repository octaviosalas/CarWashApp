function transformPrice(value: number) {
    return `$${value.toLocaleString('de-DE')}`;
  }


  export default transformPrice