export type ServiceType = { 
    service: string,
    user: string,
    price: number,
    __v?: number,
    _id: string,
}

export type newServiceType = Omit<ServiceType, '__v' | '_id' | 'user'>;




