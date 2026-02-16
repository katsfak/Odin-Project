import initContactPage from "./contactPage";
import initHomePage from "./homePage";
import initMenuPage from "./menuPage";
import "./style.css";

// Load home page on initial page load
initHomePage();

// Get the button elements
const homeBtn = document.getElementById("home-btn");
const menuBtn = document.getElementById("menu-btn");
const aboutBtn = document.getElementById("about-btn");
const contentDiv = document.getElementById("content");

// Function to clear the content div
function clearContent() {
  contentDiv.innerHTML = "";
}

// Add event listeners for each button
homeBtn.addEventListener("click", () => {
  clearContent();
  initHomePage();
});

menuBtn.addEventListener("click", () => {
  clearContent();
  initMenuPage();
});

aboutBtn.addEventListener("click", () => {
  clearContent();
  initContactPage();
});
