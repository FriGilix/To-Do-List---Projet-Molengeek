const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const newTask = todoInput.value;

  if (newTask === '') {
      alert('Veuillez écrire une tâche !');
      return;
  }
  todoInput.value = '';
  addTask(newTask);
});

function addTask(task) {
  const listItem = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;
  listItem.appendChild(taskText);

  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  listItem.appendChild(checkBox);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Supprimer';
  listItem.appendChild(deleteButton);

  todoList.appendChild(listItem);

  const editButton = document.createElement('button');
  editButton.textContent = 'Modifier';
  listItem.appendChild(editButton);

  checkBox.addEventListener('change', function() {
      if (this.checked) {
          taskText.style.textDecoration = 'line-through';
      } else {
          taskText.style.textDecoration = 'none';
      }
  });
 
  deleteButton.addEventListener('click', function() {
      todoList.removeChild(listItem);
  });

  editButton.addEventListener('click', function() {
      const isEditing = listItem.classList.contains('editing');
 
      if (isEditing) {
         
          taskText.textContent = this.previousSibling.value;
          listItem.classList.remove('editing');
          editButton.textContent = 'Edit';
      } else {
         
          const input = document.createElement('input');
          input.type = 'text';
          input.value = taskText.textContent;
          listItem.insertBefore(input, taskText);
          listItem.removeChild(taskText);
          listItem.classList.add('editing');
          editButton.textContent = 'Save';
      }
  });

  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(task => {
      const taskText = task.querySelector('span').textContent;
      const isCompleted = task.classList.contains('completed');
      tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => {
      addTask(task.text);
  });
});

let currentInput = '';
        let operator = '';
        let previousInput = '';

        function toggleCalculator() {
            const calculator = document.getElementById('calculator');
            calculator.style.display = calculator.style.display === 'block' ? 'none' : 'block';
        }

        function appendNumber(number) {
            currentInput += number;
            updateDisplay(currentInput);
        }

        function setOperator(op) {
            if (currentInput === '') return;
            if (previousInput !== '') calculateResult();
            operator = op;
            previousInput = currentInput;
            currentInput = '';
        }

        function calculateResult() {
            if (previousInput === '' || currentInput === '' || operator === '') return;
            let result = 0;
            const num1 = parseInt(previousInput, 10);
            const num2 = parseInt(currentInput, 10);

            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = multiply(num1, num2);
                    break;
                case '/':
                    result = divide(num1, num2);
                    break;
            }
            updateDisplay(result);
            currentInput = result.toString();
            operator = '';
            previousInput = '';
        }

        function multiply(a, b) {
            let result = 0;
            const positiveB = b < 0 ? -b : b;
            for (let i = 0; i < positiveB; i++) {
                result += a;
            }
            return b < 0 ? -result : result;
        }

        function divide(a, b) {
            if (b === 0) return 'Error';
            let quotient = 0;
            let remainder = Math.abs(a);
            const divisor = Math.abs(b);
            while (remainder >= divisor) {
                remainder -= divisor;
                quotient++;
            }
            return (a < 0) ^ (b < 0) ? -quotient : quotient;
        }

        function clearDisplay() {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay('');
        }

        function updateDisplay(value) {
            document.getElementById('display').value = value;
        }