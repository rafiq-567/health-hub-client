import axios from 'axios'
// save or insert user in the db
export const saveUserInDb = async user => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/user`,
        user
    )

    console.log(data)
}