import bcrypt from "bcrypt"

export const hashPassowrd = async (item: string) => { 
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(item, salt)
}

export const comprarePassword = async (insertedPassword: string, userPassword: string) => { 
    return await bcrypt.compare(insertedPassword, userPassword) 
}