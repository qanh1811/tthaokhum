// =======================
// TREASURE GAME DELUXE
// PHẦN 1
// =======================

// Âm thanh
const clickSound = new Audio("assets/audio/click.mp3");
const successSound = new Audio("assets/audio/success.mp3");
const radioSound = new Audio("assets/audio/radio.mp3");
const whaleSound = new Audio("assets/audio/whale.mp3");
const treasureSound = new Audio("assets/audio/treasure.mp3");

// Các màn chơi
const stages = [

{
title:"🔐 MÀN 1",
question:"Nhập mật mã đầu tiên",
hint:"240823",
answer:"240823"
},

{
title:"📡 MÀN 2",
question:"Giải mã Morse dưới đây",
hint:"- .... .- -. ....<br>- .... .- ---",
answer:"THANH THAO"
},

{
title:"🔥 MÀN 3",
question:`
<img src="assets/images/phoenix.png"
style="width:220px;margin-bottom:20px;">
<br>
Tôi chết trong lửa nhưng sinh ra từ lửa.
<br><br>
Tôi là ai?
`,
hint:"",
answer:"PHƯỢNG HOÀNG"
},

{
title:"🐬 MÀN 4",
question:`
<img src="assets/images/dolphin.png"
style="width:220px;margin-bottom:20px;">
<br>
Loài vật thông minh sống dưới biển là gì?
`,
hint:"",
answer:"CÁ HEO"
},

{
title:"📍 MÀN 5",
question:`
<img src="assets/images/map.png"
style="width:300px;margin-bottom:20px;">
<br>
Nhập tọa độ GPS của thành phố Đà Lạt
`,
hint:"",
answer:"11.9404,108.4583"
},

{
title:"🧩 MÀN 6",
question:`
Thời gian chưa từng dừng lại vì bất kỳ ai.

<br><br>

Nhưng luôn có một khoảnh khắc khiến ta vô thức lấy nó làm điểm bắt đầu để đếm mọi điều về sau.

<br><br>

Sáu con số ấy không chỉ là một ngày.

<br>

Mà là nơi một câu chuyện bắt đầu.

<br><br>

Hãy nhập mật mã.
`,
hint:"",
answer:"291224"
},

{
title:"❤️ MÀN 7",
question:`
Nếu tình yêu là ngọn lửa...

<br><br>

Điều gì sẽ giúp nó không bao giờ tắt?
`,
hint:"",
answer:"NIỀM TIN"
},

{
title:"🌱 MÀN 8",
question:`
Điều quý giá nhất mà con người có được

sau những lần vấp ngã là gì?
`,
hint:"",
answer:"TRƯỞNG THÀNH"
},

{
title:"🐋 MÀN 9",
question:`
<img src="assets/images/whale.png"
style="width:240px;margin-bottom:20px;">

<br>

Có những cuộc gặp chỉ kéo dài vài phút nhưng nhớ cả đời.

<br><br>

Có những người ở cạnh nhau nhiều năm nhưng lại xa lạ.

<br><br>

Và cũng có những người...

Dù cách nhau nửa vòng Trái Đất,

vẫn luôn tìm được đường quay về với nhau.

<br><br>

Trong đại dương,

có một loài không ngừng cất tiếng hát.

Không phải vì nó cô đơn...

Mà vì nó luôn tin sẽ có một tiếng hát khác đáp lại.

<br><br>

Đó là loài nào?
`,
hint:"",
answer:"CÁ VOI"
}

];

// Biến
let currentStage = 0;

const content = document.getElementById("content");
const stageText = document.getElementById("stageText");
const progressBar = document.getElementById("progressBar");

// Bắt đầu
document.getElementById("startBtn").onclick = startGame;
// =======================
// PHẦN 2
// =======================

function startGame(){

    currentStage = 0;

    showStage();

}

function showStage(){

    const stage = stages[currentStage];

    stageText.innerHTML = `Màn ${currentStage+1} / ${stages.length}`;

    progressBar.style.width =
    ((currentStage+1)/stages.length*100)+"%";

    content.innerHTML = `

        <h2>${stage.title}</h2>

        <div class="box">

            ${stage.question}

            ${stage.hint!="" ? "<br><br><b>"+stage.hint+"</b>" : ""}

        </div>

        <input
        id="answer"
        placeholder="Nhập đáp án">

        <br><br>

        <button onclick="checkAnswer()">

        XÁC NHẬN

        </button>

        <div id="message"></div>

    `;

}

function checkAnswer(){

    clickSound.currentTime = 0;
    clickSound.play();

    const ans = document
    .getElementById("answer")
    .value
    .trim()
    .toUpperCase();

    const correct = stages[currentStage]
    .answer
    .toUpperCase();

    if(ans===correct){

        successSound.currentTime = 0;
        successSound.play();

        currentStage++;

        if(currentStage < stages.length){

            setTimeout(showStage,700);

        }else{

            showFinalSignal();

        }

    }else{

        document
        .getElementById("message")
        .innerHTML =
        "❌ Có lẽ manh mối vẫn còn ở đâu đó...";

    }

}
// =======================
// PHẦN 3
// Radio + Morse
// =======================

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function beep(duration){

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.type = "sine";
    osc.frequency.value = 700;
    gain.gain.value = 0.2;

    osc.start();

    setTimeout(()=>{
        osc.stop();
    },duration);

}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

function showFinalSignal(){

    whaleSound.play();

    content.innerHTML = `

    <h2>📻 TÍN HIỆU CUỐI CÙNG</h2>

    <div class="box">

    Đang kết nối tín hiệu...

    <br><br>

    <div style="
    width:100%;
    height:18px;
    background:#222;
    border-radius:20px;
    overflow:hidden;">

        <div id="loadingBar"
        style="
        width:0%;
        height:100%;
        background:#4dd0ff;">
        </div>

    </div>

    <br>

    <p id="loadingText">

    Đang dò sóng...

    </p>

    </div>

    `;

    connectSignal();

}

async function connectSignal(){

    const bar=document.getElementById("loadingBar");

    for(let i=0;i<=100;i++){

        bar.style.width=i+"%";

        await sleep(30);

    }

    document.getElementById("loadingText").innerHTML=
    "📡 Đã nhận được tín hiệu";

    await sleep(1000);

    playMorse();

}

function playMorse(){

    radioSound.play();

    content.innerHTML=`

    <h2>📻 TÍN HIỆU CUỐI CÚNG</h2>

    <div class="box">

    Nhấn nút bên dưới để nghe mã Morse.

    <br><br>

    Sau khi giải mã hãy nhập thông điệp.

    </div>

    <button onclick="playSignal()">

    ▶ PHÁT TÍN HIỆU

    </button>

    <br><br>

    <input
    id="morseAnswer"
    placeholder="Nhập thông điệp">

    <br><br>

    <button onclick="checkMorse()">

    XÁC NHẬN

    </button>

    <div id="message"></div>

    `;

}

async function playSignal(){

    await sleep(2500);

    const morse="--.- ..- -.-- -. .... / .- -. .... / - .... ..- --- -. --. / . --";
    for(const c of morse){

    if(c=="."){

        beep(300);

        await sleep(650);

    }

    else if(c=="-"){

        beep(900);

        await sleep(1300);

    }

    else if(c==" "){

        await sleep(700);

    }

    else if(c=="/"){

        await sleep(2500);

    }

}
    
}

function checkMorse(){

    const ans=document
    .getElementById("morseAnswer")
    .value
    .trim()
    .toUpperCase();

    if(
        ans=="QUỲNH ANH THƯƠNG EM" ||
        ans=="QUYNH ANH THUONG EM"
    ){

        showTreasure();

    }else{

        document
        .getElementById("message")
        .innerHTML="❌ Giải mã chưa đúng.";

    }

}
// =======================
// PHẦN 4
// Kho báu + Bức thư
// =======================

function showTreasure(){

    treasureSound.play();

    stageText.innerHTML = "🏆 HOÀN THÀNH";

    progressBar.style.width = "100%";

    content.innerHTML = `

    <img
    src="assets/images/treasure.png"
    style="width:260px;animation:zoom 1s;">

    <br><br>

    <img
    src="assets/images/letter.png"
    style="width:180px;">

    <div
    class="box"
    id="letter">

    </div>

    <br>

    <button onclick="restartGame()">

    🔄 CHƠI LẠI

    </button>

    `;

    typeLetter();

}

async function typeLetter(){

    const text=[

    "Chào em.",

    "",

    "Nếu em đọc được những dòng này...",

    "",

    "Có nghĩa là em đã vượt qua tất cả thử thách.",

    "",

    "Kho báu thật sự không phải vàng.",

    "Không phải kim cương.",

    "",

    "Mà là người khiến mình muốn tạo nên cuộc hành trình này.",

    "",

    "Cảm ơn em vì đã đi đến cuối.",

    "",

    "❤️ QUỲNH ANH THƯƠNG EM ❤️"

    ];

    const letter=document.getElementById("letter");

    letter.innerHTML="";

    for(const line of text){

        letter.innerHTML+=line+"<br>";

        await sleep(1200);

    }

}

function restartGame(){

    location.reload();

}