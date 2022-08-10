import { prisma } from "../database.js"

const addSession =async (token:string, userId: number) => {
    await prisma.sessions.create({
        data: {
            token,
            userId
        }
    })
    return
};

const getSession =async (token:string) => {
    return await prisma.sessions.findUnique({
        where: {
            token
        }
    })
}

const getSessionByEmail =async (email: string) => {
    return await prisma.sessions.findFirst({
        where:{
            users:{
                email
            }
        }
    })
}

export {
    addSession,
    getSession,
    getSessionByEmail,
}