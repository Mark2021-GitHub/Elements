let elements = [];
let n = 1;
let x = 10;
let y = 15;
let h = 20;
let w = 250;

function setup() {
  createCanvas(300, windowHeight);
  soundFormats("mp3", "ogg");

  setupElements();
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
      elements[i].esound.play();
    }
  }
}

class Element {
  constructor(id, s, ename, kname, x, y, en, ko) {
    this.id = id;
    this.s = s;
    this.ename = ename;
    this.kname = kname;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.tsize = 15;
    this.esound = loadSound(en);
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
}

function setupElements() {
  elements[1] = new Element(1, "H", "Hydrogen", "수소", x, y, "1-en.ogg");
  y += h;
  n++;
  elements[2] = new Element(2, "He", "Helium", "헬륨", x, y, "2-en.ogg");
  y += h;
  n++;
  elements[3] = new Element(3, "Li", "Lithium", "리튬", x, y, "3-en.ogg");
  y += h;
  n++;
  elements[4] = new Element(4, "Be", "Beryllium", "베릴륨", x, y, "4-en.ogg");
  y += h;
  n++;
  elements[5] = new Element(5, "B", "Boron", "붕소", x, y, "5-en.ogg");
  y += h;
  n++;
  elements[6] = new Element(6, "C", "Carbon", "탄소", x, y, "6-en.ogg");
  y += h;
  n++;
  elements[7] = new Element(7, "N", "Nitrogen", "질소", x, y, "7-en.ogg");
  y += h;
  n++;
  elements[8] = new Element(8, "O", "Oxygen", "산소", x, y, "8-en.ogg");
  y += h;
  n++;
  elements[9] = new Element(
    9,
    "F",
    "Fluorine",
    "플루오린/불소",
    x,
    y,
    "9-en.ogg"
  );
  y += h;
  n++;
  elements[10] = new Element(10, "Ne", "Neon", "네온", x, y, "10-en.ogg");
  y += h;
  n++;
  elements[11] = new Element(
    11,
    "Na",
    "Sodium/Natrium",
    "소듐/나트륨",
    x,
    y,
    "11-en.ogg"
  );
  y += h;
  n++;
  elements[12] = new Element(
    12,
    "Mg",
    "Magnesium",
    "마그네슘",
    x,
    y,
    "12-en.ogg"
  );
  y += h;
  n++;
  elements[13] = new Element(
    13,
    "Al",
    "Aluminium",
    "알루미늄",
    x,
    y,
    "13-en.ogg"
  );
  y += h;
  n++;
  elements[14] = new Element(
    14,
    "Si",
    "Silicon",
    "규소/실리콘",
    x,
    y,
    "14-en.ogg"
  );
  y += h;
  n++;
  elements[15] = new Element(15, "P", "Phosphorus", "인", x, y, "15-en.ogg");
  y += h;
  n++;
  elements[16] = new Element(16, "S", "Sulfur", "황", x, y, "16-en.ogg");
  y += h;
  n++;
  elements[17] = new Element(17, "Cl", "Chlorine", "염소", x, y, "17-en.ogg");
  y += h;
  n++;
  elements[18] = new Element(18, "Ar", "Argon", "아르곤", x, y, "18-en.ogg");
  y += h;
  n++;
  elements[19] = new Element(
    19,
    "K",
    "Potassium/Kalium",
    "포타슘/칼륨",
    x,
    y,
    "19-en.ogg"
  );
  y += h;
  n++;
  elements[20] = new Element(20, "Ca", "Calcium", "칼슘", x, y, "20-en.ogg");
  y += h;
  n++;
  elements[n] = new Element(
    25,
    "Mn",
    "Manganese",
    "망가니즈/망간",
    x,
    y,
    "25-en.ogg"
  );
  y += h;
  n++;
  elements[n] = new Element(26, "Fe", "Iron/Ferrum", "철", x, y, "26-en.ogg");
  y += h;
  n++;
  elements[n] = new Element(
    29,
    "Cu",
    "Copper/Cuprum",
    "구리",
    x,
    y,
    "29-en.ogg"
  );
  y += h;
  n++;

  elements[n] = new Element(30, "Zn", "Zinc", "아연", x, y, "30-en.ogg");
  y += h;
  n++;

  elements[n] = new Element(
    38,
    "Sr",
    "Strontium",
    "스트론튬",
    x,
    y,
    "38-en.ogg"
  );
  y += h;
  n++;

  elements[n] = new Element(47, "Ag", "Silver", "은", x, y, "47-en.ogg");
  y += h;
  n++;
  elements[n] = new Element(53, "I", "Iodine", "아이오딘", x, y, "53-en.ogg");
  y += h;
  n++;

  elements[n] = new Element(56, "Ba", "Barium", "바륨", x, y, "56-en.ogg");
  y += h;
  n++;

  elements[n] = new Element(78, "Pt", "Platinum", "백금", x, y, "78-en.ogg");
  y += h;
  n++;

  elements[n] = new Element(79, "Au", "Gold/Aurum", "금", x, y, "79-en.ogg");
  y += h;
  n++;

  elements[n] = new Element(
    80,
    "Hg",
    "Mercury/Hydrargyrum",
    "수은",
    x,
    y,
    "80-en.ogg"
  );
  y += h;
  n++;

  elements[n] = new Element(82, "Pb", "Lead/Plumbum", "납", x, y, "82-en.ogg");
  y += h;
  n++;
}