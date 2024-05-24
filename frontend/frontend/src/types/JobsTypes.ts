import { ServiceType } from "./ServicesTypes"

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
    typeOfJob: ServiceType[],
    user: string,
    vehicle: JobVehicleType,
    __v?: number,
    _id: string,
}



export type newJobType = { 
    date: Date,
    hour: string,
    typeOfJob: ServiceType[],
    amount: number,
    vehicle: string | undefined
}






