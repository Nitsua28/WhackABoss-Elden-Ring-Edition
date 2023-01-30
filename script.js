// $(document).ready(function() {
//     var current_progress = 0;
//     var interval = setInterval(function() {
//         current_progress += 10;
//         $("#dynamic")
//         .css("width", current_progress + "%")
//         .attr("aria-valuenow", current_progress)
//         .text(current_progress + "% Complete");
//         if (current_progress >= 100)
//             clearInterval(interval);
//     }, 1000);
//   });

let weaponInfo = {};
let bossInfo = {};

let bossName = "";
let wepName = "";

let bossMaxHp;
let bossCurrentHp;
let damage;

function setBossName(event = new Event()){
    bossName = event.target.value;
}

function setWeaponName(event = new Event()){
    wepName = event.target.value;
}

async function generateInfo(){
    reset();
    const httpResponseBoss = await fetch("https://eldenring.fanapis.com/api/bosses?name=" + bossName);
    bossInfo = await httpResponseBoss.json();

    const httpResponseWeapon = await fetch("https://eldenring.fanapis.com/api/weapons?name=" + wepName);
    weaponInfo = await httpResponseWeapon.json();
    console.log(bossInfo)
    console.log(weaponInfo)
    renderInfo();
}
function reset(){

    const weapon_name_container = document.getElementsByClassName("weaponname-container")[0];
    const bossname_container = document.getElementsByClassName("bossname-container")[0];
    const damage_splat_container = document.getElementsByClassName("bossname-container")[0];

    if (weapon_name_container.firstChild !== null)
        weapon_name_container.removeChild(weapon_name_container.firstChild);
    if (bossname_container.firstChild !== null)
        bossname_container.removeChild(bossname_container.firstChild);
    if (damage_splat_container.firstChild !== null)
        damage_splat_container.removeChild(damage_splat_container.firstChild);
}
function renderInfo(){
    const bossname = bossInfo.data[0].name
    const bosspicture = bossInfo.data[0].image
    const healthPoints = bossInfo.data[0].healthPoints

    const weaponname = weaponInfo.data[0].name
    const weaponpicture = weaponInfo.data[0].image
    damage = weaponInfo.data[0].attack[0].amount;

    const hp_bar_container = document.getElementsByClassName("hpbar-container")[0];
    
    const bossname_container = document.getElementsByClassName("bossname-container")[0];
    const bossimage_container = document.getElementsByClassName("bossimage-container")[0];
    
    const damage_splat_container = document.getElementsByClassName("damage-splat-container")[0];
    const weapon_pic_container = document.getElementsByClassName("weapon-pic-container")[0];
    const weapon_name_container = document.getElementsByClassName("weaponname-container")[0];

    bossname_container.append(bossname);
    console.log(bossname)
    bossimage.setAttribute("src", bosspicture);
    
    //hp_bar_container.append(healthPoints);
    const cleanHealthPoints = healthPoints.replace(/\D/g, "");
    cleanHealthPoints === "" ? 
    bossMaxHp = bossCurrentHp = 1000 :  
    bossMaxHp = bossCurrentHp = parseInt(cleanHealthPoints);
    
    setHpBarInfo(bossCurrentHp,bossMaxHp,bossCurrentHp.toString());

    weapon_name_container.append(weaponname);
    weaponpic.setAttribute("src", weaponpicture);
    damage_splat_container.append(damage);


}


// $(document).ready(function() {
//     var current_progress = 0;
//     var interval = setInterval(function() {
//         current_progress += 10;
//         $("#dynamic")
//         .css("width", current_progress + "%")
//         .attr("aria-valuenow", current_progress)
//         .text(current_progress + "% Complete");
//         if (current_progress >= 100)
//             clearInterval(interval);
//     }, 1000);
//   });

function whack(){
    addDamageSplat()
    bossCurrentHp = bossCurrentHp - damage;

    if (bossCurrentHp > 0){
        setHpBarInfo(bossCurrentHp,bossMaxHp,bossCurrentHp.toString());
    }
    else{
        setHpBarInfo(0,bossMaxHp);
    }
}

function addDamageSplat(){
    const container = document.getElementsByClassName("damage-splat-container")[0]
    const splat = document.createElement("div");
    if (container)
    splat.setAttribute("id", "damage-splat");
    splat.innerHTML = damage.toString();
    container.appendChild(splat);
    
}
function setHpBarInfo(currentHp,maxHp,text = 'DEAD'){
    const hpbar = document.getElementById("dynamic");
    const hpbarText = document.getElementById('current-progress');
    hpbar.style.width = (currentHp / maxHp) * 100 + "%";
    hpbar.setAttribute("aria-valuemax", maxHp);
    hpbar.setAttribute("aria-valuenow", currentHp);
    hpbarText.innerHTML = text;
    console.log(text)
}