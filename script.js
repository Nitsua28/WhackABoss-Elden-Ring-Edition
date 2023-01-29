
let weaponInfo = {};
let bossInfo = {};

let bossName = "";
let wepName = "";

function setBossName(event = new Event()){
    bossName = event.target.value;
}

function setWeaponName(event = new Event()){
    wepName = event.target.value;
}
async function generateInfo(){
    const httpResponseBoss = await fetch("https://eldenring.fanapis.com/api/bosses?name=" + bossName);
    bossInfo = await httpResponseBoss.json();

    const httpResponseWeapon = await fetch("https://eldenring.fanapis.com/api/weapons?name=" + wepName);
    weaponInfo = await httpResponseWeapon.json();
    console.log(bossInfo)
    console.log(weaponInfo)
    renderInfo();
}

function renderInfo(){
    const bossname = bossInfo.data[0].name
    const bosspicture = bossInfo.data[0].image
    const healthPoints = bossInfo.data[0].healthPoints

    const weaponname = weaponInfo.data[0].name
    const weaponpicture = weaponInfo.data[0].image
    const damage = weaponInfo.data[0].attack[0].amount;

    const hp_bar_container = document.getElementsByClassName("hpbar-container")[0];
    const bossname_container = document.getElementsByClassName("bossname-container")[0];
    const bossimage_container = document.getElementsByClassName("bossimage-container")[0];
    
    const damage_splat_container = document.getElementsByClassName("damage-splat-container")[0];
    const weapon_pic_container = document.getElementsByClassName("weapon-pic-container")[0];
    const weapon_name_container = document.getElementsByClassName("weaponname-container")[0];

    bossname_container.append(bossname);
    console.log(bossname)
    bossimage.setAttribute("src", bosspicture);
    
    hp_bar_container.append(healthPoints);

    weapon_name_container.append(weaponname);
    weaponpic.setAttribute("src", weaponpicture);
    damage_splat_container.append(damage);


}