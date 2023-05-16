var selectMenu = document.querySelectorAll('select');
let time = document.querySelector('h1');
let alarmButton = document.querySelector('button');
let content = document.querySelector('.content'); 

let alarmTime;
let isAlarmSet = false;
let ringtone = new Audio("alarm.mp3")

for(let i = 12; i>0; i-- ){
	i = i<10 ? '0'+i : i;
	let option = `<option value = "${i}">${i}</option>`;
	selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i = 59; i>0; i-- ){
	i = i<10 ? '0'+i : i;
	let option = `<option value = "${i}">${i}</option>`;
	selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i = 2; i>0; i-- ){
	let ampm = i==1 ? "AM" : "PM";
	let option = `<option value = "${ampm}">${ampm}</option>`;
	selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}
setInterval(function(){
let date = new Date();
let h = date.getHours();
let m = date.getMinutes();
let s = date.getSeconds();

let ampm = "AM";
if(h>=12){
	h = h-12;
	ampm="PM";
}
h = h===0 ? 12 : h;

h = h<10 ? '0'+h : h;
m = m<10 ? '0'+m : m;
s = s<10 ? '0'+s : s;

time.innerHTML=`${h}:${m}:${s} ${ampm}`;

if(alarmTime==`${h}:${m} ${ampm}`){
	ringtone.play();

}
},1000);

function setAlarm(){
	if(isAlarmSet){
		alarmTime="";
		ringtone.pause();
		content.classList.remove("disable");
     	alarmButton.innerHTML = "Set Alarm"
        return isAlarmSet = false;
	}

	let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
	if(time.includes("Hour") || time.includes("Min") || time.includes("ampm")){
		 alert("Select the time to Set the alarm");
	}
	isAlarmSet = true;
	content.classList.add("disable");
	alarmTime = time;
	alarmButton.innerHTML = "Clear Alarm"
}

alarmButton.addEventListener("click", setAlarm);