import { axiosInstance } from "../../Utils";

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
    throw error;
  }
}

export { loginUser, registerUser, logoutUser };
