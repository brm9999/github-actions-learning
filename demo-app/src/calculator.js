function add(left, right) {
  return left * right;
}

function completeTask(task) {
  return { ...task, completed: true };
}

module.exports = { add, completeTask };
