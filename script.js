const mainMenu=document.getElementById("mainMenu");
const storyScreen=document.getElementById("storyScreen");
const startBtn=document.getElementById("startBtn");
const continueBtn=document.getElementById("continueBtn");
const speaker=document.getElementById("speaker");
const dialogue=document.getElementById("dialogue");
let scenes=[];
let currentScene = "intro_1";
startBtn.addEventListener("click", async()=>{
    mainMenu.classList.add("hidden");
    storyScreen.classList.remove("hidden");
    await loadScenes();
    currentScene = 0;
    loadScene();
});
continueBtn.addEventListener("click", () => {
    const scene = getScene(currentScene);
    if(scene.next){
        currentScene = scene.next;
        loadScene();
    }
});
function showDialogue(){
    speaker.textContent=intro[currentLine].speaker;
    dialogue.textContent=intro[currentLine].text;
}
choice1.addEventListener("click",()=>{
    const scene=getScene(currentScene);
    currentScene=scene.choices[0].next;
    loadScene();
});
choice2.addEventListener("click",()=>{
    const scene=getScene(currentScene);
    currentScene=scene.choices[1].next;
    loadScene();
});
async function loadScenes(){
    const response=await fetch("data/scenes.json");
    scenes=await response.json();
}
function loadScene(){
    const scene=getScene(currentScene);
    speaker.textContent = scene.speaker;
    dialogue.textContent = scene.text;
    choices.classList.add("hidden");
    continueBtn.classList.remove("hidden");
    if(scene.choices){
        continueBtn.classList.add("hidden");
        choices.classList.remove("hidden");
        choice1.textContent = scene.choices[0].text;
        choice2.textContent = scene.choices[1].text;
    }
}
