let elements = [];
let n = 1;
let x = 10;
let y = 15;
let h = 20;
let w = 250;

// for speechSynthesis;
var synth = window.speechSynthesis;
var voices = [];
let voiceSelect;
let kvoice1 = 48; //Yuna(ko-KR)
let kvoice2 = 63; //Google(ko-KR)


function textToSpeech(txt,vid) {
  if (synth.speaking) {
    synth.cancel();
  }
  if (txt !== "") {
    var ut = new SpeechSynthesisUtterance(txt);
    ut.voice = voices[vid];
    synth.speak(ut);
  }
}

function setupVoices(){
  let firstVoice ;
  let voicestr;
  voices = synth.getVoices();
  firstVoice = "0:" + voices[0].name + "("+ voices[0].lang+")";
  print(firstVoice);
  voiceSelect.option(firstVoice);
  for(var i = 1; i < voices.length; i++) {
    let str = i+":" + voices[i].name + "("+ voices[i].lang+")";
    print(str);
    voiceSelect.option(str);
  }  
  voiceSelect.selected(firstVoice);
}

function setup() {
  cnv = createCanvas(300, 700);
  
  voiceSelect = createSelect();
  voiceSelect.position(1, cnv.position().y + height+20);
  
  setupElements();
  setupVoices();
}

function draw() {
  background(220);
  for (let i = 1; i < n; i++) {
    elements[i].show(mouseX, mouseY);
  }
}

function mousePressed() {
  for (let i = 1; i < n; i++) {
    if (elements[i].contains(mouseX, mouseY)) {
      let sel = voiceSelect.value();
      let str = splitTokens(sel, ':');
      let vnumber = Number(str[0]);
      elements[i].speech(vnumber);
    }
  }
}

class Element {
  constructor(id, s, ename, kname, x, y) {
    this.id = id;
    this.s = s;
    this.ename = ename;
    this.kname = kname;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tsize = 15;
   
  }
  show(mx, my) {
    stroke(255);
    if (this.contains(mx, my)) {
      fill(0, 255, 0);
      rect(this.x, this.y, this.w, this.h);

      textSize(this.tsize);
      fill(0, 102, 153);
      text(
        " " +
          this.id +
          " [" +
          this.s +
          "] " +
          this.ename +
          " (" +
          this.kname +
          ")",
        this.x,
        this.y + this.tsize
      );
    } else {
      fill(175);
      rect(this.x, this.y, this.w, this.h);

      textSize(this.tsize);
      fill(0, 102, 153);
      text(
        " " +
          this.id +
          " [" +
          "  " +
          "] " +
          this.ename +
          " (" +
          "         " +
          ")",
        this.x,
        this.y + this.tsize
      );
    }
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
  speech(vid){
    if(vid == kvoice1 || vid == kvoice2){
      textToSpeech(this.kname, vid); 
    } else {
      textToSpeech(this.ename, vid);  
    }
    
  }
}

function setupElements() {
  elements[1] = new Element(1, "H", "Hydrogen", "수소", x, y);
  y += h;
  n++;
  elements[2] = new Element(2, "He", "Helium", "헬륨", x, y);
  y += h;
  n++;
  elements[3] = new Element(3, "Li", "Lithium", "리튬", x, y);
  y += h;
  n++;
  elements[4] = new Element(4, "Be", "Beryllium", "베릴륨", x, y);
  y += h;
  n++;
  elements[5] = new Element(5, "B", "Boron", "붕소", x, y);
  y += h;
  n++;
  elements[6] = new Element(6, "C", "Carbon", "탄소", x, y);
  y += h;
  n++;
  elements[7] = new Element(7, "N", "Nitrogen", "질소", x, y);
  y += h;
  n++;
  elements[8] = new Element(8, "O", "Oxygen", "산소", x, y);
  y += h;
  n++;
  elements[9] = new Element(9, "F", "Fluorine","플루오린/불소",x,y);
  y += h;
  n++;
  elements[10] = new Element(10, "Ne", "Neon", "네온", x, y);
  y += h;
  n++;
  elements[11] = new Element(11,"Na","Sodium/Natrium","소듐/나트륨",x,y);
  y += h;
  n++;
  elements[12] = new Element(12,"Mg","Magnesium","마그네슘",x,y);
  y += h;
  n++;
  elements[13] = new Element(13,"Al","Aluminium","알루미늄",x,y);
  y += h;
  n++;
  elements[14] = new Element(14,"Si","Silicon","규소/실리콘",x,y);
  y += h;
  n++;
  elements[15] = new Element(15, "P", "Phosphorus", "인", x, y);
  y += h;
  n++;
  elements[16] = new Element(16, "S", "Sulfur", "황", x, y);
  y += h;
  n++;
  elements[17] = new Element(17, "Cl", "Chlorine", "염소", x, y);
  y += h;
  n++;
  elements[18] = new Element(18, "Ar", "Argon", "아르곤", x, y);
  y += h;
  n++;
  elements[19] = new Element(19, "K","Potassium/Kalium","포타슘/칼륨",x,y);
  y += h;
  n++;
  elements[20] = new Element(20, "Ca", "Calcium", "칼슘", x, y);
  y += h;
  n++;
  elements[n] = new Element(25,"Mn","Manganese","망가니즈/망간",x,y);
  y += h;
  n++;
  elements[n] = new Element(26, "Fe", "Iron/Ferrum", "철", x, y);
  y += h;
  n++;
  elements[n] = new Element(29,"Cu","Copper/Cuprum","구리",x,y);
  y += h;
  n++;

  elements[n] = new Element(30, "Zn", "Zinc", "아연", x, y);
  y += h;
  n++;

  elements[n] = new Element(38,"Sr","Strontium","스트론튬",x,y);
  y += h;
  n++;

  elements[n] = new Element(47, "Ag", "Silver", "은", x, y);
  y += h;
  n++;
  elements[n] = new Element(53, "I", "Iodine", "아이오딘", x, y);
  y += h;
  n++;

  elements[n] = new Element(56, "Ba", "Barium", "바륨", x, y);
  y += h;
  n++;

  elements[n] = new Element(78, "Pt", "Platinum", "백금", x, y);
  y += h;
  n++;

  elements[n] = new Element(79, "Au", "Gold/Aurum", "금", x, y);
  y += h;
  n++;

  elements[n] = new Element(80,"Hg","Mercury/Hydrargyrum","수은",x,y);
  y += h;
  n++;

  elements[n] = new Element(82, "Pb", "Lead/Plumbum", "납", x, y);
  y += h;
  n++;
}
