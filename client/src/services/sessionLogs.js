import axios from "axios"

export default user = {
    authorized: false,
    name: "гость",
    email: "",
    jwt: "",
    id: 0
}

export function generateLocalId(user)
{
    axios.get("http://localhost:3001/pregeneratedId")
    .then(res => user.id = res.data.id);
}