import { axiosInstance } from "../../Utils";

async function fetchTodos() {
    try {
        const response = await axiosInstance.get("http://localhost:5000/todos");
        return response.data;
    } catch (error) {
        console.error("Error fetching todos:", error);
        throw error;
    }
}

async function addTodo(title: string, description: string, dueDate: string,status: string) {
    try {
        const response = await axiosInstance.post("http://localhost:5000/todos", {
            title,
            description,
            dueDate,
            status
        });
        return response.data;
    }
    catch (error) {
        console.error("Error adding todo:", error);
        throw error;
    }
}

async function updateTodo(id: number, updatedTodo: any) {
    try {
        const response = await axiosInstance.put(`http://localhost:5000/todos/${id}`, updatedTodo);
        return response.data;
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
}

async function deleteTodo(id: number) {
    try {
        const response = await axiosInstance.delete(`http://localhost:5000/todos/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting todo:", error);
        throw error;
    }
}

export { fetchTodos,addTodo,updateTodo,deleteTodo };