const test = require('node:test');
const assert = require('node:assert/strict');
const { add, completeTask } = require('../src/calculator');

test('adds two numbers', () => {
  assert.equal(add(2, 3), 5);
});

test('marks a task as completed without mutating the original', () => {
  const original = { id: 1, title: 'Write a workflow', completed: false };
  const completed = completeTask(original);

  assert.equal(completed.completed, true);
  assert.equal(original.completed, false);
});
