import { axiosInstance } from "../../Utils";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

async function loginUser(email: string, password: string) {
    try {
        const response = await axiosInstance.post(`/login`,
        {
            email,
            password,
        },
        { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
}

async function registerUser(email: string, password: string) {
  try {
    const response = await axiosInstance.post(
      `/register`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return { success: false, message: error.response.data.message };
  }
}

async function logoutUser() {
  try {
    const response = await axiosInstance.post(`/logout`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}

export { loginUser, registerUser, logoutUser };
