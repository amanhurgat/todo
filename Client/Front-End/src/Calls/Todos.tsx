import { axiosInstance } from "../../Utils";

async function fetchTodos() {
    try {
        const response = await axiosInstance.get("/todos");
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function addTodo(title: string, description: string, dueDate: string,status: string) {
    try {
        const response = await axiosInstance.post("/todos", {
            title,
            description,
            dueDate,
            status
        });
        return response.data;
    }
    catch (error) {
        throw error;
    }
}

async function updateTodo(id: number, updatedTodo: any) {
    try {
        const response = await axiosInstance.put(`/todos/${id}`, updatedTodo);
        return response.data;
    } catch (error) {
        throw error;
    }
}

async function deleteTodo(id: number) {
    try {
        const response = await axiosInstance.delete(`/todos/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export { fetchTodos,addTodo,updateTodo,deleteTodo };