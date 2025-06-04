const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all';
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
    list.innerHTML = '';
  
    let filtered = todos;
    if (filter === 'active') {
      filtered = todos.filter(todo => !todo.done);
    } else if (filter === 'done') {
      filtered = todos.filter(todo => todo.done);
    }
  
    filtered.forEach((todo, index) => {
        const li = document.createElement('li');
        if (todo.done) li.classList.add('done');
      
        const span = document.createElement('span');
        span.textContent = todo.text;
      
        // ✅ ダブルクリックで編集モードに
        span.addEventListener('dblclick', () => {
          console.log('編集モードに切り替え'); 
          const input = document.createElement('input');
          input.type = 'text';
          input.value = todo.text;
          input.classList.add('edit-input');
      
          input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              todo.text = input.value.trim() || todo.text;
              saveTodos();
              render();
            }
          });
      
          input.addEventListener('blur', () => {
            todo.text = input.value.trim() || todo.text;
            saveTodos();
            render();
          });
      
          li.replaceChild(input, span);
          input.focus();
        });
      
        li.addEventListener('click', () => {
          todo.done = !todo.done;
          saveTodos();
          render();
        });
      
        li.appendChild(span);
      
        const delBtn = document.createElement('button');
        delBtn.textContent = '削除';
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          todos.splice(todos.indexOf(todo), 1);
          saveTodos();
          render();
        });
      
        li.appendChild(delBtn);
        list.appendChild(li);
      });
  }

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, done: false });
    saveTodos();
    render();
    input.value = '';
  }
});
document.getElementById('filters').addEventListener('click', (e) => {
    if (e.target.dataset.filter) {
      filter = e.target.dataset.filter;
      render();
    }
  });
render();
