export type ClientType = { 
    clientOf: string;
    dni: number,
    name: string,
    telephone: number,
    __v?: number,
    _id: string,
    email: string
}

export type newClientType = { 
    dni: number | undefined,
    name: string,
    telephone:  number | undefined,
    email: string,
}







