const { add, completeTask } = require('./calculator');

const task = { id: 1, title: 'Learn GitHub Actions', completed: false };

console.log('TaskFlow demo application');
console.log(`1 + 2 = ${add(1, 2)}`);
console.log('Completed task:', completeTask(task));
