export type NewUserType = { 
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}

export type errorRegisterMissedDataType = { 
    location: string, 
    msg: string,
    path: string,
    type: string,
    value: string,
}

export type UserType = { 
    _id: string, 
    password: string,
    email: string,
    name: string,
    confirmed: boolean,
    __v: number
}