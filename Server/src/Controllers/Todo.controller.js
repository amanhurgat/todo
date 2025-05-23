const Todo = require("../Models/Todo.model");
const jwt = require("jsonwebtoken");
const User = require("../Models/User.model");

const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const token = req.token;
    const decoded =await jwt.verify(token, process.env.JWT_SECRET);
    const owner =await User.findById(decoded.userId);

    const newTodo = new Todo({
      title,
      description,
      dueDate,
      status: status || "pending",
      owner,
    });

    await newTodo.save();
    res
      .status(201)
      .json({ message: "To-do created successfully", todo: newTodo });
  } catch (error) {
    console.error("Error creating to-do:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getTodos = async (req, res) => {
  try {
    const token = req.token;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const owner = decoded.userId;

    const filter = { owner };

    const todos = await Todo.find(filter);
    res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id}, 
      { title, description, dueDate, status },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "To-do not found" });
    }

    res
      .status(200)
      .json({ message: "To-do updated successfully", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.userId;

    const deletedTodo = await Todo.findOneAndDelete({
      _id: id 
    });

    if (!deletedTodo) {
      return res.status(404).json({ message: "To-do not found" });
    }

    res.status(200).json({ message: "To-do deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

const markAsCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.body.token;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const ownerId = decoded.userId
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id },
      { status: "completed" },
      { new: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "To-do not found" });
    }

    res
      .status(200)
      .json({ message: "To-do marked as completed", todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  markAsCompleted,
};
