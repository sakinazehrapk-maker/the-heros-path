const mainMenu=document.getElementById("mainMenu");
const storyScreen=document.getElementById("storyScreen");
const startBtn=document.getElementById("startBtn");
const continueBtn=document.getElementById("continueBtn");
const speaker=document.getElementById("speaker");
const dialogue=document.getElementById("dialogue");
let scenes=[];
let currentScene = "intro_1";
const nameBox=document.getElementById("nameBox");
const heroName=document.getElementById("heroName");
const saveName=document.getElementById("saveName");
let player={
    name:"Hero",
    justice:0,
    mercy:0,
    duty:0,
    ambition:0,
    decisions:[]
};
const portrait=document.getElementById("portrait");
const choices=document.getElementById("choices");
const choice1=document.getElementById("choice1");
const choice2=document.getElementById("choice2");
const hubScreen=document.getElementById("hubScreen");
const castleBtn=document.getElementById("castleBtn");
const barracksBtn=document.getElementById("barracksBtn");
const marketBtn=document.getElementById("marketBtn");
const backToHub=document.getElementById("backToHub");
const investigationScreen=document.getElementById("investigationScreen");
const talkBoy=document.getElementById("talkBoy");
const talkBaker=document.getElementById("talkBaker");
const talkGuard=document.getElementById("talkGuard");
const judgeBtn=document.getElementById("judgeBtn");
let evidence={
    boy:false,
    baker:false,
    guard:false
};

startBtn.addEventListener("click", async()=>{
    mainMenu.classList.add("hidden");
    storyScreen.classList.remove("hidden");
    await loadScenes();
    currentScene="intro_1";
    loadScene();
});
continueBtn.addEventListener("click", () => {
    const scene = getScene(currentScene);
    if(scene.next){
        currentScene = scene.next;
        loadScene();
    }
});

choice1.addEventListener("click",()=>{
    const scene=getScene(currentScene);
    if (!scene.choices) return;
    currentScene=scene.choices[0].next;
    loadScene();
});
choice2.addEventListener("click",()=>{
    const scene=getScene(currentScene);
    if (!scene.choices) return;
    currentScene = scene.choices[1].next;
    loadScene();
});
function getScene(id){
    return scenes.find(scene => scene.id === id);
}
async function loadScenes(){
    const response=await fetch("data/scenes.json");
    scenes=await response.json();
}
function loadScene(){
    const scene=getScene(currentScene);
    speaker.textContent=scene.speaker;
    portrait.src=scene.portrait || "";
    dialogue.textContent=scene.text.replace("{{name}}", player.name);
    continueBtn.classList.add("hidden");
    choices.classList.add("hidden");
    nameBox.classList.add("hidden");
    backToHub.classList.add("hidden");
    if (scene.id === "name_hero") {
        nameBox.classList.remove("hidden");
    }
    else if (scene.choices) {
        choices.classList.remove("hidden");
        choice1.textContent = scene.choices[0].text;
        choice2.textContent = scene.choices[1].text;
    }
    else {
        continueBtn.classList.remove("hidden");
    }
    const hubLocations=["castle", "king_intro", "marketplace", "barracks"];
    if (hubLocations.includes(scene.id)){
    backToHub.classList.remove("hidden");
}
}
saveName.addEventListener("click",()=>{
    if(heroName.value.trim()===""){
        alert("Please enter a name.");
        return;
    }
    player.name=heroName.value.trim();
    currentScene="king_1";
    loadScene();
});
    function openScene(sceneId){
    hubScreen.classList.add("hidden");
    storyScreen.classList.remove("hidden");
    currentScene = sceneId;
    loadScene();
}         
backToHub.addEventListener("click",()=>{
    storyScreen.classList.add("hidden");
    hubScreen.classList.remove("hidden");
});
function rememberDecision(id){
    player.decisions.push(id);
}
choice1.addEventListener("click", () => {
    const scene = getScene(currentScene);
    if (!scene.choices) return;
    if(currentScene === "bread_choice"){
        player.justice += 2;
        player.duty += 1;
        rememberDecision("arrested_child");
    }
    currentScene = scene.choices[0].next;
    loadScene();
});
choice2.addEventListener("click", () => {
    const scene = getScene(currentScene);
    if (!scene.choices) return;
    if(currentScene === "bread_choice"){
        player.mercy += 2;
        rememberDecision("spared_child");
    }
    currentScene = scene.choices[1].next;
    loadScene();
});
if (currentScene==="merchant_choice"){
    player.mercy+=1;
    rememberDecision("helped_merchant");
}
if (currentScene==="merchant_choice"){
    player.duty+=1;
    rememberDecision("ignored_merchant");
}