document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('#favchap');
  const addBtn = document.querySelector('#add-btn');
  const list = document.querySelector('#list');

  function createListItem(text) {
    const li = document.createElement('li');

    const span = document.createElement('span');
    span.textContent = text;
    li.appendChild(span);

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = '❌';
    deleteButton.setAttribute('aria-label', `Remove ${text}`);
    deleteButton.className = 'remove-btn';

    deleteButton.addEventListener('click', () => {
      li.remove();
      input.focus();
    });

    li.appendChild(deleteButton);
    return li;
  }

  addBtn.addEventListener('click', () => {
    const value = input.value.trim();
    if (!value) {
      return;
    }
    const li = createListItem(value);
    list.appendChild(li);
    input.value = '';
    input.focus();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addBtn.click();
    }
  });
});