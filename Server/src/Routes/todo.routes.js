const todoController = require("../Controllers/Todo.controller");
const {verifyToken} = require("../Middleware/user.middleware")

module.exports = (app) => {

  app.post("/todos", todoController.createTodo);
  app.get("/todos",[verifyToken], todoController.getTodos);
  app.put("/todos/:id",[verifyToken], todoController.updateTodo);
  app.delete("/todos/:id",[verifyToken], todoController.deleteTodo);
}
