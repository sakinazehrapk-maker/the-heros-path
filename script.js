const mainMenu=document.getElementById("mainMenu");
const storyScreen=document.getElementById("storyScreen");
const startBtn=document.getElementById("startBtn");
const continueBtn=document.getElementById("continueBtn");
startBtn.addEventListener("click",()=>{
    mainMenu.classList.add("hidden");
    storyScreen.classList.remove("hidden");
});
continueBtn.addEventListener("click",()=>{
    alert("Next scene coming soon!");
});