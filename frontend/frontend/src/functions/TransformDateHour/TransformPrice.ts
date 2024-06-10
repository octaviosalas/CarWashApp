function transformPrice(value: number | undefined) {
     if(value !== undefined) { 
      return `$${value.toLocaleString('de-DE')}`;
     }
  }


  export default transformPrice