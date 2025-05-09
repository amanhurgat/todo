import { useEffect, useState } from "react";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../../Calls/Todos";
import { logoutUser } from "../../Calls/user";

function Dashboard() {
  const [todos, setTodos] = useState<
    {
      _id: number;
      title: string;
      description: string;
      dueDate: string;
      status: string;
    }[]
  >([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTodos();
        console.log(response.todos);
        setTodos(response.todos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [update]);

  const handleAddTodo = async () => {
    if (!newTodo.title || !newTodo.description || !newTodo.dueDate) {
      alert("Please fill in all fields.");
      return;
    }
    const response = await addTodo(
      newTodo.title,
      newTodo.description,
      newTodo.dueDate,
      "pending"
    );
    setUpdate(!update);
    console.log(response);
  };

  const handleUpdateTodo = async (todo: any, updatedTodo: any) => {
    const id = todo._id;
    await updateTodo(id, updatedTodo);
    setUpdate(!update);
  };

  const handleDeleteTodo = async (id: any) => {
    console.log(id._id);
    const response = await deleteTodo(id._id);
    console.log(response);
    setUpdate(!update);
  };

  const handleMarkAsCompleted = async (todo: any) => {
    const id = todo._id;
    todo.status = "completed";
    console.log(todo);
    const response = await updateTodo(id, todo);
    console.log(response);
    setUpdate(!update);
  };

  const filteredTodos =
    filter === "all" ? todos : todos.filter((todo) => todo.status === filter);

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      const response = await logoutUser();
      console.log(response);
      if (response.success) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.error("Logout failed:", response.message);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto p-4 sm:p-6 rounded-lg shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">
            To-Do Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <label className="flex items-center cursor-pointer">
              <span className="mr-2 text-sm">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
              <div
                className={`relative w-10 h-5 rounded-full ${
                  darkMode ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                    darkMode ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
            </label>
            {/* Logout Button */}
            <button
              onClick={(e) => {
                handleLogout(e);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="loader border-t-4 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Add New To-Do */}
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Add New To-Do
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-gray-100 text-gray-900 border-gray-300"
                  }`}
                  value={newTodo.title}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, title: e.target.value })
                  }
                />
                <textarea
                  placeholder="Description"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-gray-100 text-gray-900 border-gray-300"
                  }`}
                  value={newTodo.description}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, description: e.target.value })
                  }
                />
                <input
                  type="date"
                  className={`w-full px-4 py-2 border rounded-lg ${
                    darkMode
                      ? "bg-gray-700 text-white border-gray-600"
                      : "bg-gray-100 text-gray-900 border-gray-300"
                  }`}
                  value={newTodo.dueDate}
                  onChange={(e) =>
                    setNewTodo({ ...newTodo, dueDate: e.target.value })
                  }
                />
                <button
                  onClick={handleAddTodo}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add To-Do
                </button>
              </div>
            </div>

            {/* Filter To-Dos */}
            <div className="mb-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Filter To-Dos
              </h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg ${
                    filter === "all"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-4 py-2 rounded-lg ${
                    filter === "pending"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter("completed")}
                  className={`px-4 py-2 rounded-lg ${
                    filter === "completed"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* To-Do List */}
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-4">
                Your To-Dos
              </h2>
              {filteredTodos.length === 0 ? (
                <p className="text-gray-600">No to-dos found.</p>
              ) : (
                <ul className="space-y-4">
                  {filteredTodos.map((todo) => (
                    <li
                      key={todo._id}
                      className={`p-4 rounded-lg shadow-md ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <h3 className="text-lg font-bold">{todo.title}</h3>
                      <p>{todo.description}</p>
                      <p className="text-sm">
                        Due:{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          month: "short",
                          year: "numeric",
                          day: "2-digit",
                        }).format(new Date(todo.dueDate))}{" "}
                        | Status:{" "}
                        <span
                          className={`font-semibold ${
                            todo.status === "completed"
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {todo.status}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {todo.status === "pending" && (
                          <button
                            onClick={() => handleMarkAsCompleted(todo)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                          >
                            Mark as Completed
                          </button>
                        )}
                        <button
                          onClick={() =>
                            handleUpdateTodo(todo, {
                              ...todo,
                              title:
                                prompt("Update Title", todo.title) ||
                                todo.title,
                              description:
                                prompt(
                                  "Update Description",
                                  todo.description
                                ) || todo.description,
                              dueDate:
                                prompt("Update Due Date", todo.dueDate) ||
                                todo.dueDate,
                            })
                          }
                          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteTodo(todo)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
