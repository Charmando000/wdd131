// contact.js — handle contact form, validation, and save latest message to localStorage
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');

  // Prefill form if previous submission exists
  const saved = JSON.parse(localStorage.getItem('lastContact') || 'null');
  if (saved) {
    document.getElementById('name').value = saved.name || '';
    document.getElementById('email').value = saved.email || '';
    document.getElementById('message').value = saved.message || '';
    status.textContent = `Loaded last message saved on ${new Date(saved.timestamp).toLocaleString()}`;
  }

  // Simple submit handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // native validation
    if (!form.checkValidity()) {
      status.style.color = 'crimson';
      status.textContent = 'Please fill in all fields correctly.';
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      timestamp: Date.now()
    };

    // save to localStorage
    localStorage.setItem('lastContact', JSON.stringify(data));

    // show confirmation
    status.style.color = 'green';
    status.textContent = `Thanks ${data.name}, your message was saved (see localStorage).`;

    // optionally reset form after saving
    // form.reset();
  });
});
