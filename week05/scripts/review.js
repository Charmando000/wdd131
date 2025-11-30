let count = Number(localStorage.getItem("reviews-count")) || 0;

count++;
localStorage.setItem("reviews-count", count);

document.querySelector("#counter").textContent = count;