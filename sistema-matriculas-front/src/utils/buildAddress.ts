const buildAddress = (state: string, city: string, neighborhood:string, road: string, houseNumber: string, cep: string ) => {
    const fullAddress = `${road}, ${houseNumber}, ${neighborhood}, ${city} - ${state}, CEP: ${cep}`;
    return fullAddress;
  }

export default buildAddress;