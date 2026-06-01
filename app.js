let tickets = localStorage.getItem("tickets");

if(tickets === null){
    tickets = 0;
}else{
    tickets = Number(tickets);
}

document.getElementById("tickets").innerText = tickets;


let coins = localStorage.getItem("coins");

if (coins === null) {

    coins = 20;

} else {

    coins = Number(coins);

}

let maxDailyAds =
Number(localStorage.getItem("maxDailyAds"));

if (
    isNaN(maxDailyAds)
    ||
    maxDailyAds < 1
) {

    maxDailyAds = 10;

    localStorage.setItem(
        "maxDailyAds",
        10
    );
}

let adsWatchedToday =
Number(localStorage.getItem("adsWatchedToday"));

if (
    isNaN(adsWatchedToday)
    ||
    adsWatchedToday < 0
) {

    adsWatchedToday = 0;

    localStorage.setItem(
        "adsWatchedToday",
        0
    );
}

let loyaltyPoints =
Number(localStorage.getItem("loyaltyPoints"));

if (isNaN(loyaltyPoints)) {

    loyaltyPoints = 0;

    localStorage.setItem(
        "loyaltyPoints",
        0
    );
}

let xp =
Number(localStorage.getItem("xp"));


if (isNaN(xp)) {

    xp = 0;

    localStorage.setItem(
        "xp",
        0
    );
}
let userId =
localStorage.getItem("userId");

if(!userId){

    userId =
    "SK" +
    Date.now();

    localStorage.setItem(
        "userId",
        userId
    );

}
let welcomeXpGiven =
localStorage.getItem(
    "welcomeXpGiven"
);

if(
    welcomeXpGiven !== "yes"
){

    xp += 300;

    localStorage.setItem(
        "xp",
        xp
    );

    localStorage.setItem(
        "welcomeXpGiven",
        "yes"
    );
checkLevel();
}
let missionRewardClaimed =
localStorage.getItem(
    "missionRewardClaimed"
);

if(missionRewardClaimed === null){

    localStorage.setItem(
        "missionRewardClaimed",
        "false"
    );

}

document.getElementById("coins").innerText = coins;

let streak = localStorage.getItem("streak");
let lastVisit = localStorage.getItem("lastVisit");

let today = new Date();
let todayString = today.toDateString();

let lastMissionReset =
localStorage.getItem(
    "lastMissionReset"
);

if(
    lastMissionReset !==
    todayString
){

    localStorage.setItem(
        "missionRewardClaimed",
        "false"
    );

    localStorage.setItem(
        "lastMissionReset",
        todayString
    );

}

if (streak === null) {
    streak = 1;
} else {
    streak = Number(streak);
}

if (lastVisit !== null) {

    let lastDate = new Date(lastVisit);

    let diffTime = today - lastDate;

    let diffDays =
    Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {

        streak++;



        adsWatchedToday = 0;

        localStorage.setItem(
            "adsWatchedToday",
            0
        );

        localStorage.setItem(
            "maxDailyAds",
            maxDailyAds
        );

} else if (diffDays > 1) {

    streak = 1;

}

}

localStorage.setItem("streak", streak);
localStorage.setItem("lastVisit", todayString);
let bestStreak =
Number(localStorage.getItem("bestStreak")) || 0;

if (streak > bestStreak) {

    bestStreak = streak;

    localStorage.setItem(
        "bestStreak",
        bestStreak
    );
}

document.getElementById("streak").innerText =
streak + " روز";

if(document.getElementById("level")){

    document.getElementById("level").innerText =
    localStorage.getItem("level") || 1;

}

function openBox() {

    let lastOpen = localStorage.getItem("lastBoxOpen");

    let today = new Date().toDateString();

    if (lastOpen === today) {

        document.getElementById("result").innerText =
        "امروز جعبه شانس خودت رو باز کردی 🎁";

        return;
    }

    let rewards = [1, 3, 5, 10, 20];

    let reward =
    rewards[Math.floor(Math.random() * rewards.length)];

    coins += reward;
  
  xp += 2;

localStorage.setItem(
    "xp",
    xp
);

checkLevel();

    localStorage.setItem("coins", coins);

    localStorage.setItem("lastBoxOpen", today);

    document.getElementById("coins").innerText = coins;

    alert("تبریک! " + reward + " سکه گرفتی 🎉");

document.getElementById("result").innerText =
"تبریک! " + reward + " سکه گرفتی 🎉";
checkMissions();
}
function watchAd(){

    let remainingAds =
    maxDailyAds - adsWatchedToday;

    if(remainingAds <= 0){

        alert("سهمیه تبلیغات امروز تمام شده");

        document.getElementById(
            "watchAdBtn"
        ).innerText =
        "🎥 سهمیه تکمیل شد";

        return;
    }

    document.getElementById(
        "adModal"
    ).style.display = "block";

    let timeLeft = 15;

    document.getElementById(
        "adTimer"
    ).innerText = timeLeft;

    let timer = setInterval(function(){

        timeLeft--;

        document.getElementById(
            "adTimer"
        ).innerText = timeLeft;

        if(timeLeft <= 0){

            clearInterval(timer);

            document.getElementById(
                "claimRewardBtn"
            ).style.display = "block";
        }

    },1000);
}
function claimAdReward(){
if(adsWatchedToday >= maxDailyAds){
    return;
}
    // جلوگیری از کلیک چندباره
    document.getElementById(
        "claimRewardBtn"
    ).disabled = true;

    adsWatchedToday++;

    // جلوگیری از منفی شدن تعداد تبلیغات
    if(adsWatchedToday > maxDailyAds){
        adsWatchedToday = maxDailyAds;
    }

    coins++;

    xp++;

    localStorage.setItem("xp", xp);

    checkLevel();

    localStorage.setItem(
        "adsWatchedToday",
        adsWatchedToday
    );

    localStorage.setItem(
        "coins",
        coins
    );

    document.getElementById(
        "coins"
    ).innerText = coins;

    document.getElementById(
        "watchAdBtn"
    ).innerText =
    "🎥 مشاهده تبلیغ (" +
    Math.max(0,
        maxDailyAds - adsWatchedToday
    ) +
    " باقی‌مانده)";

    // بستن پنجره
    document.getElementById(
        "adModal"
    ).style.display = "none";

    // ریست تایمر
    document.getElementById(
        "adTimer"
    ).innerText = "15";

    // مخفی کردن دکمه جایزه
    document.getElementById(
        "claimRewardBtn"
    ).style.display = "none";

    // فعال کردن مجدد دکمه تبلیغ
    document.getElementById(
        "watchAdBtn"
    ).disabled = false;

    alert("1 سکه دریافت کردی 🪙");

    checkMissions();
}
function buyTicket(){

    if(coins < 100){

        alert("حداقل 100 سکه نیاز داری");

        return;
    }

    coins -= 100;

    tickets += 1;

    localStorage.setItem("coins", coins);
    localStorage.setItem("tickets", tickets);

    document.getElementById("coins").innerText = coins;
    document.getElementById("tickets").innerText = tickets;

    alert("یک بلیت دریافت کردی 🎟");
}

if(document.getElementById("watchAdBtn")){

    document.getElementById(
        "watchAdBtn"
    ).innerText =
    "🎥 مشاهده تبلیغ (" +
    (maxDailyAds - adsWatchedToday) +
    " باقی‌مانده)";

}
function checkMissions(){

    if(document.getElementById("missionAds")){

        if(adsWatchedToday >= 10){
    document.getElementById(
        "missionAds"
    ).innerText =
    "✅ مشاهده 10 تبلیغ";

}

        if(
            localStorage.getItem(
                "lastBoxOpen"
            ) ===
            new Date().toDateString()
        ){

            document.getElementById(
                "missionBox"
            ).innerText =
            "✅ باز کردن جعبه شانس";

        }

        let invitedFriends =
        Number(
            localStorage.getItem(
                "invitedFriends"
            )
        ) || 0;

        if(invitedFriends >= 1){

            document.getElementById(
                "missionInvite"
            ).innerText =
            "✅ دعوت از 1 دوست";

        }

        giveMissionReward();

    }

}
function giveMissionReward(){

    let invitedFriends =
    Number(
        localStorage.getItem(
            "invitedFriends"
        )
    ) || 0;

    let allDone =

    adsWatchedToday >= 10 &&

    localStorage.getItem(
        "lastBoxOpen"
    ) ===
    new Date().toDateString()

    &&

    invitedFriends >= 1;

    let claimed =
    localStorage.getItem(
        "missionRewardClaimed"
    );

    if(
        allDone &&
        claimed !== "true"
    ){

        coins += 10;

        localStorage.setItem(
            "coins",
            coins
        );

document.getElementById(
    "coins"
).innerText = coins;

        localStorage.setItem(
            "missionRewardClaimed",
            "true"
        );

        alert(
            "🎉 پاداش مأموریت‌ها دریافت شد (+10 سکه)"
        );

    }

}
checkMissions();
function showMissions(){

    checkMissions();

    document.getElementById(
        "missionsModal"
    ).style.display =
    "block";

}

function closeMissions(){

    document.getElementById(
        "missionsModal"
    ).style.display =
    "none";

}
function checkLevel(){

    let level = 1;
    let levelName = "🌱 تازه‌وارد";

    if(xp >= 800){
        level = 2;
        levelName = "🔹 فعال";
    }

    if(xp >= 1600){
        level = 3;
        levelName = "🔷 پرتلاش";
    }

    if(xp >= 3200){
        level = 4;
        levelName = "⭐ حرفه‌ای";
    }

    if(xp >= 9600){
        level = 5;
        levelName = "🏆 طلایی";
    }

    if(xp >= 28800){
        level = 6;
        levelName = "💎 الماسی";
    }

    if(xp >= 86400){
        level = 7;
        levelName = "🚀 نخبه";
    }

    if(xp >= 259200){
        level = 8;
        levelName = "👑 اسطوره";
    }

    if(xp >= 777600){
        level = 9;
        levelName = "🔥 افسانه‌ای";
    }

    if(xp >= 2332800){
        level = 10;
        levelName = "🌌 جاودانه";
    }

let oldLevel =
Number(
    localStorage.getItem("level")
) || 1;

    localStorage.setItem(
        "level",
        level
    );

    localStorage.setItem(
        "levelName",
        levelName
    );
if(level > oldLevel){

    alert(
        "🎉 تبریک!\n\n" +
        "به سطح " +
        level +
        " رسیدی.\n\n" +
        levelName
    );

}
let dailyAds = 10;

if(level === 2) dailyAds = 12;
if(level === 3) dailyAds = 15;
if(level === 4) dailyAds = 18;
if(level === 5) dailyAds = 22;
if(level === 6) dailyAds = 27;
if(level === 7) dailyAds = 33;
if(level === 8) dailyAds = 40;
if(level === 9) dailyAds = 48;
if(level === 10) dailyAds = 55;

localStorage.setItem(
    "maxDailyAds",
    dailyAds
);
maxDailyAds = dailyAds;
}
checkLevel();
