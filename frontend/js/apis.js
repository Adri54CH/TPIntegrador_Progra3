
const BASEURL = "http://localhost:3000/api/"


export async function getProductos() {
    const response = await fetch (BASEURL+"productos")
    return response 
}

export async function authLogin(params) {
    const response = await fetch (BASEURL+"")
    return response 
}