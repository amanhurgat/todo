import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to the Todo Application
      </h1>
      <p className="text-lg mb-8 text-center">
        Organize your tasks and boost your productivity!
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 text-lg font-medium bg-white text-blue-600 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 text-lg font-medium bg-white text-purple-600 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Home;
