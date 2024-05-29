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