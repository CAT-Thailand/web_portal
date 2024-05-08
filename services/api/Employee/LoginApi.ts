
import axios from "axios";
export async function apiUserLogin(email: string, password: string): Promise<string | null> {
  try {

    const requestBody = {
      email: email,
      password: password,
    }

    const response = await axios.post(`/login`, requestBody);
    if (response.status === 200) {
      console.log(response.data)
      return String(response.data.AccessToken);
    }

    return null
  } catch (error) {
    console.error(error);
    return null
  }
}
