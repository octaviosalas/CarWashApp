export type JobVehicleType = { 
    patent: string,
    description: string, 
    typeOfVehicle: string, 
   _id: string,
}

export type JobClientType = { 
   name: string,
   _id: string,
}


export type JobType = { 
    amount: number,
    client: JobClientType,
    date: string,
    hour: string,
    notified: boolean,
    paid: boolean,
    status: string,
    typeOfJob: string,
    user: string,
    vehicle: JobVehicleType,
    __v?: number,
    _id: string,
}





