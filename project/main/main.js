const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");

  if (navMenu.classList.contains("open")) {
    menuButton.textContent = "✖";
  } else {
    menuButton.textContent = "☰";
  }
});
// Footer dinámico
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
    "Last Modified: " + document.lastModified;