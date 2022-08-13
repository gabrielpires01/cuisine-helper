import axios from "axios"

const baseURL = "http://localhost:5000"

export async function recipes() {
	const response = await axios.get(`${baseURL}/recipes`)
	return response.data
}