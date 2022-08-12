import jwt from 'jsonwebtoken';

const createToken =async (id:number) => {
	const data = {id};
    const jwtKey = process.env.JWT_SECRET

    const token = jwt.sign(data, jwtKey)
    return token
}

export default {
	createToken
}