const mainMenu=document.getElementById("mainMenu");
const storyScreen=document.getElementById("storyScreen");
const startBtn=document.getElementById("startBtn");
const continueBtn=document.getElementById("continueBtn");
const speaker=document.getElementById("speaker");
const dialogue=document.getElementById("dialogue");
const intro=[
    {
        speaker: "Narrator",
        text: "Heroes are not born..."
    },
    {
        speaker: "Narrator",
        text: "They are remembered."
    },
    {
        speaker: "Narrator",
        text: "And every legend begins with a single choice."
    }
];
let currentLine=0;
startBtn.addEventListener("click",()=>{
    mainMenu.classList.add("hidden");
    storyScreen.classList.remove("hidden");
    showDialogue();
});
continueBtn.addEventListener("click",()=>{
    currentLine++;
    if(currentLine < intro.length){
        showDialogue();
    }else{
        continueBtn.classList.add("hidden");
        choices.classList.remove("hidden");
        choice1.textContent="Compassion";
        choice2.textContent="Strength";
    }
});
function showDialogue(){
    speaker.textContent=intro[currentLine].speaker;
    dialogue.textContent=intro[currentLine].text;
}
choice1.addEventListener("click",()=>{
    dialogue.textContent=
        "You believe a hero protects every life, no matter the cost.";
    choices.classList.add("hidden");
});
choice2.addEventListener("click",()=>{
    dialogue.textContent=
        "You believe a hero must make difficult sacrifices to save the many.";
    choices.classList.add("hidden");
});