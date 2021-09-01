let elements = [];
let n = 1;
let x = 10;
let y = 15;
let h = 20;
let w = 280;

var inputForm = document.querySelector("form");
var inputTxt = document.querySelector(".txt");
var playNextBtton = document.getElementById("playNext");
var radioEn = document.getElementById("en");
var radioKo = document.getElementById("ko");
var radioKodesc = document.getElementById("koDesc");
var bSwitch = document.getElementById("check1");
var dtText = document.getElementById("dt1");
var ddText = document.getElementById("dd1");


// for speechSynthesis;
var synth = window.speechSynthesis;
var voices = [];
let voiceSelect;
let pitchSlider;
let rateSlider;
let enVoice = [];
let kVoice = [];
let bVoice = false;
let next = 1 ;

class Element {
  constructor(id, s, ename, kname, x, y, desc) {
    this.id = id;
    this.s = s;
    this.ename = ename;
    this.kname = kname;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tsize = 15;
    this.str=" "+this.id +" ["+this.s +"] "+this.ename+" ("+this.kname+")";
    this.desc = desc;
  }
  
  show(mx, my) {
    stroke(255);
    if (this.contains(mx, my)) {
      fill(0, 255, 0);
      rect(this.x, this.y, this.w, this.h);
      fill(255, 0, 0);
      dtText.innerText =  this.str;
      ddText.innerText = this.desc;
    } else {
      fill(200);
      rect(this.x, this.y, this.w, this.h);
      fill(0, 0, 255);
    }
    textSize(this.tsize);
    text(this.str,this.x,this.y + this.tsize);
  }

  contains(mx, my) {
    if (
      this.x < mx &&
      mx < this.x + this.w &&
      this.y < my &&
      my < this.y + this.h
    ) {
      return true;
    } else {
      return false;
    }
  }
  speech(lang, vid){
    if(lang == 'ko-KR'){
      textToSpeech(this.kname, vid); 
    } else {
      textToSpeech(this.ename, vid);  
    }
  }
}


function setup() {
  cnv = createCanvas(300, 800);
  
  setupVoices();
  setupElement();
  
}

function draw() {
  background(220);
  for (let i = 1; i < n; i++) {
    elements[i].show(mouseX, mouseY);
  }
}


playNextBtton.onclick = function (){
  playNext();
}

let isNext = false;

function playNext(){
  if(synth.speaking) {
   return;
  }
  
  let sel = voiceSelect.value();
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);
  
    dtText.innerText =  elements[next].str;
    ddText.innerText = elements[next].desc;
  
   if(bSwitch.checked == true){
       if(isNext == false ){
         inputTxt.value = elements[next].ename;
         //elements[next].speech(voices[vnumber].lang, vnumber);
         textToSpeech(elements[next].ename, vnumber);
         isNext = true;
       } else {
         inputTxt.value = elements[next].kname;
         textToSpeech(elements[next].kname, kVoice[0]);
         next ++;
         if(next == n) next = 1;  
         isNext = false;
       }
   } else {
     if(radioEn.checked == true){
       inputTxt.value = elements[next].ename;
       elements[next].speech(voices[vnumber].lang, vnumber);  
     } else if(radioKo.checked == true ){
        inputTxt.value = elements[next].kname; 
       textToSpeech(elements[next].kname, kVoice[0]);
     } else if(radioKodesc.checked == true ){ 
        inputTxt.value = elements[next].kname; 
        textToSpeech(elements[next].kname + " "+elements[next].desc, kVoice[0]);
       
     }
     next ++;
     if(next == n) next = 1;  
   }
   
}

inputForm.onsubmit = function (event) {
  event.preventDefault();
  if(synth.speaking) {
    return;
  }
  
  let sel = voiceSelect.value();
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);  
  
  if(radioEn.checked == true){
    textToSpeech(inputTxt.value, vnumber);
  } else {
    textToSpeech(inputTxt.value, kVoice[0]);
  }
  
  
};


function textToSpeech(txt,vid) {
  if (synth.speaking) {
    //synth.cancel();
    return;
  }
  if (txt !== "") {
    var ut = new SpeechSynthesisUtterance(txt);
   
    ut.voice = voices[vid];
    ut.pitch = pitchSlider.value();
    ut.rate = rateSlider.value();
    //ut.voiceURI = 'native';
    //ut.volume = 1;
    synth.speak(ut);
    ut.onboundary = function(event) {
     // console.log(event.name + ':' + event.elapsedTime);
    }
  }
}


function setupVoices(){
  let voicestr;
  let e=0;
  let k=0;
  let isDefault = false;
  let defaultVoice;
  
  voiceSelect = createSelect();
  voiceSelect.position(1, cnv.position().y + height+20);
  
  voices = synth.getVoices();
  for(var i = 0; i < voices.length; i++) {
    let str = i+":" + voices[i].name + "("+ voices[i].lang+")";
    voiceSelect.option(str);
    if(voices[i].lang == "en-US") {
      enVoice[e] = i;
      e ++;
      if(isDefault == false){
        defaultVoice = str;
        isDefault = true;
      }
    } else if( voices[i].lang == "ko-KR"){
      kVoice[k] = i;
      k++;
    }
  }  
  voiceSelect.selected(defaultVoice);
  voiceSelect.changed(changeVoice);
  
  rateSlider = createSlider(0.5, 1, 1, 0.1);
  rateSlider.position(1, voiceSelect.position().y+20);
  rateSlider.style('width', '140px');
  
  pitchSlider = createSlider(0, 2, 1, 0.1);
  pitchSlider.position(rateSlider.position().x + 150, rateSlider.position().y);
  pitchSlider.style('width', '140px');
  
  let div1 = createDiv('음성 속도 조절');
div1.style('font-size', '16px');
div1.position(rateSlider.position().x ,rateSlider.position().y +20 );
  let div2 = createDiv('음성 높이 조절');
div2.style('font-size', '16px');
div2.position(pitchSlider.position().x ,pitchSlider.position().y +20 );
  
}

function changeVoice(){
  let sel = voiceSelect.value();
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);
    
  textToSpeech(inputTxt.value, vnumber);
}

function mousePressed() {
  let sel = voiceSelect.value();
  let str = splitTokens(sel, ':');
  let vnumber = Number(str[0]);
 
  
  for (let i = 1; i < n; i++) {
    if (elements[i].contains(mouseX, mouseY)) {
      
      if(bSwitch.checked == true){
        inputTxt.value = elements[i].ename;
        if( bVoice == false) {
          textToSpeech(elements[i].ename, vnumber);
          bVoice = true;
        } else if(bVoice == true) {
          textToSpeech(elements[i].kname, kVoice[0]);
          bVoice = false;
        }
      } else {
           if(radioEn.checked == true){
              //elements[i].speech(voices[vnumber].lang, vnumber);
              inputTxt.value = elements[i].ename;
              textToSpeech(elements[i].ename, vnumber);
            } else if(radioKo.checked == true ) {
              inputTxt.value = elements[i].kname;
              textToSpeech(elements[i].kname, kVoice[0]);
            }  else if(radioKodesc.checked == true ){ 
               inputTxt.value = elements[i].kname; 
               textToSpeech(elements[i].kname + " "+elements[i].desc, kVoice[0]);
       
     }
        
      }
      
    }
  }
}

function setupElement() {
  elements[1] = new Element(1, "H", "Hydrogen", "수소", x, y, ": 가장 가볍고 불에 타기 쉬운 기체");
  y += h;
  n++;
  elements[2] = new Element(2, "He", "Helium", "헬륨", x, y, ": 풍선을 뜨게하는 가벼운 기체");
  y += h;
  n++;
  elements[3] = new Element(3, "Li", "Lithium", "리튬", x, y, ": 가장 가벼운 금속");
  y += h;
  n++;
  elements[4] = new Element(4, "Be", "Beryllium", "베릴륨", x, y, ": 알루미늄보다 가볍고 강철보다 단단한 금속");
  y += h;
  n++;
  elements[5] = new Element(5, "B", "Boron", "붕소", x, y, ": 불에 타기 어려워 내열유리, 로켓 엔진 노즐등에 사용되는 반금속");
  y += h;
  n++;
  elements[6] = new Element(6, "C", "Carbon", "탄소", x, y, ": 다이아몬드, 연필심, 유기화합물을 이루는 생명의 원소");
  y += h;
  n++;
  elements[7] = new Element(7, "N", "Nitrogen", "질소", x, y, ": 공기의 78%를 차지하는 기체");
  y += h;
  n++;
  elements[8] = new Element(8, "O", "Oxygen", "산소", x, y, ": 물질을 연소시키거나 산화시키는 기체");
  y += h;
  n++;
  elements[9] = new Element(9, "F", "Fluorine","플루오린/불소",x,y, ": 조리 기구의 코팅제나 치약에 사용되는 반응성이 높은 기체");
  y += h;
  n++;
  elements[10] = new Element(10, "Ne", "Neon", "네온", x, y, ": 전압을 가하면 붉게 빛나는 기체");
  y += h;
  n++;
  elements[11] = new Element(11,"Na","Sodium / Natrium","소듐/나트륨",x,y, ": 바닷물 속 소금에 풍부하게 존재하는 무른 금속");
  y += h;
  n++;
  elements[12] = new Element(12,"Mg","Magnesium","마그네슘",x,y, ": 쉽게 불에 타면서 밝은 백색광을 내고, 경량,고강도의 첨단 합금 소재 금속");
  y += h;
  n++;
  elements[13] = new Element(13,"Al","Aluminium","알루미늄",x,y, ": 가볍고, 열 전도성이 좋아 다양한 합금 소재로 산업에서 널리 활용되는 금속");
  y += h;
  n++;
  elements[14] = new Element(14,"Si","Silicon","규소/실리콘",x,y, ": 지각에 산소 다음으로 풍부하게 존재하는 가장 저렴한 반도체");
  y += h;
  n++;
  elements[15] = new Element(15, "P", "Phosphorus", "인", x, y, ": 소변에서 추출되는 생체 화합물의 필수 원소인 비금속");
  y += h;
  n++;
  elements[16] = new Element(16, "S", "Sulfur", "황", x, y, ": 화산지대에서 직접 채굴 되는 노란색 비금속"); // 황산화물은 특유의 냄새가 나서 천연가스에 황화수소를 첨가해 가스 누출시 냄새로 알아차리게 하는 용도
  y += h;
  n++;
  elements[17] = new Element(17, "Cl", "Chlorine", "염소", x, y, ": 자극적인 냄새가 있는 황록색 기체");
  y += h;
  n++;
  elements[18] = new Element(18, "Ar", "Argon", "아르곤", x, y, ": 반응성이 거의 없는 게으른 기체");
  y += h;
  n++;
  elements[19] = new Element(19, "K","Potassium / Kalium","포타슘/칼륨",x,y, ": 비료의 3대 요소중 하나로 물과 격렬하게 반응하는 무른 금속");
  y += h;
  n++;
  elements[20] = new Element(20, "Ca", "Calcium", "칼슘", x, y, ": 뼈와 치아의 주성분이 되는 금속");
  y += h;
  n++;
  elements[21] = new Element(21, "Sc", "Scandium", "스칸듐", x, y, ": ");
  y += h;
  n++;
  elements[22] = new Element(22, "Ti", "Titanium", "타이타늄", x, y, ": ");
  y += h;
  n++;
  elements[23] = new Element(23, "V", "Vanadium", "바나듐", x, y, ": ");
  y += h;
  n++;
  elements[24] = new Element(24, "Cr", "Chromium", "크로뮴", x, y, ": ");
  y += h;
  n++;
  
  elements[25] = new Element(25,"Mn","Manganese","망가니즈/망간",x,y, ": ");
  y += h;
  n++;
  elements[26] = new Element(26, "Fe", "Iron / Ferrum", "철", x, y, ": ");
  y += h;
  n++;
 elements[27] = new Element(27, "Co", "Cobalt", "코발트", x, y, ": ");
  y += h;
  n++;
  elements[28] = new Element(28, "Ni", "Nickel", "니켈", x, y, ": ");
  y += h;
  n++;
 
  elements[29] = new Element(29,"Cu","Copper / Cuprum","구리",x,y, ": ");
  y += h;
  n++;

  elements[30] = new Element(30, "Zn", "Zinc", "아연", x, y, ": ");
  y += h;
  n++;

  elements[n] = new Element(38,"Sr","Strontium","스트론튬",x,y, ": ");
  y += h;
  n++;

  elements[n] = new Element(47, "Ag", "Silver / Argentum", "은", x, y, ": ");
  y += h;
  n++;
  elements[n] = new Element(53, "I", "Iodine", "아이오딘/요오드", x, y, ": ");
  y += h;
  n++;

  elements[n] = new Element(56, "Ba", "Barium", "바륨", x, y, ": ");
  y += h;
  n++;

  elements[n] = new Element(78, "Pt", "Platinum", "백금/플래티넘", x, y, ": ");
  y += h;
  n++;

  elements[n] = new Element(79, "Au", "Gold / Aurum", "금", x, y, ": ");
  y += h;
  n++;

  elements[n] = new Element(80,"Hg","Mercury / Hydrargyrum","수은",x,y, ": ");
  y += h;
  n++;

  elements[n] = new Element(82, "Pb", "Lead / Plumbum", "납", x, y, ": ");
  y += h;
  n++;
}
