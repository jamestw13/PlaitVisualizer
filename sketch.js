let numStrands, numRows, rotateSlider;

let leftCordArray = new Array(numRows);
let rightCordArray = new Array(numRows);

function setColors(pos) {
  let array = [];
  for (let i = 0; i < numStrands / 2; i++) {
    const cp = createColorPicker(
      // random(['red', 'yellow', 'blue', 'orange', 'green', 'purple', 'pink'])
      i % 3 === 2 ? 'black' : 'red'
    );

    cp.position(pos === 'left' ? 20 : width - 100, i * 30 + 20);
    array.push(cp);
  }

  return array;
}

function setup() {
  // set number of strands
  const strandNumSlider = createSlider(4, 32, 16, 2);
  strandNumSlider.input(updateStrands);
  strandNumSlider.position(100, 20);
  numStrands = strandNumSlider.value();
  createP('# of cords').position(250, 6);

  // set number of rows
  const rowNumSlider = createSlider(1, 24, numStrands);
  rowNumSlider.input(updateRows);
  rowNumSlider.position(100, 40);
  numRows = rowNumSlider.value();
  createP('# of rows').position(250, 25);

  // set rotation speed
  rotateSlider = createSlider(-1000, 1000, 0, 1000);
  rotateSlider.position(100, 60);
  createP('rotate plaits').position(250, 45);

  randomSeed('whipit');
  createCanvas(windowWidth / 2, windowHeight, WEBGL);

  leftCordArray = setColors('left');
  rightCordArray = setColors('right');
}

function updateStrands() {
  numStrands = this.value();
  leftCordArray, (rightCordArray = []);
  leftCordArray = setColors('left');
  rightCordArray = setColors('right');
}

function updateRows() {
  numRows = this.value();
}
function draw() {
  const R = 75;
  const ARC = TWO_PI / numStrands;

  background(125);
  orbitControl();
  fill(200);
  cylinder(R / 2, 600, 24, 24, false, false);

  rotateX(-HALF_PI);
  rotateZ(rotateSlider.value() === 0 ? 0 : millis() / rotateSlider.value());

  for (let j = 0; j < numRows; j++) {
    for (let i = 0; i < numStrands / 2; i++) {
      const lon1 =
        j % 2 === 0 ? map(i, 0, numStrands / 2, -PI, PI) + ARC * j : map(i, 0, numStrands / 2, PI, -PI) + ARC * -j;
      const lat1 = map(j, 0, numStrands, -R * PI, R * PI);

      // diamond pattern

      fill(j % 2 === 0 ? leftCordArray[i].value() : rightCordArray.at(-(1 + i)).value());
      generateDiamond(lat1, lon1, ARC, R);
    }
  }
}
// }

// export default sketch;

function generateDiamond(lat1, lon1, arc, R) {
  const lon2 = lon1 + arc;
  const lon3 = lon1 - arc;

  const lat2 = lat1 + arc * R;
  const lat3 = lat1 + arc * 2 * R;

  const x1 = R * cos(lon1);
  const y1 = R * sin(lon1);
  const z1 = lat1;

  const x2 = R * cos(lon2);
  const y2 = R * sin(lon2);
  const z2 = lat2;

  const x3 = x1;
  const y3 = y1;
  const z3 = lat3;

  const x4 = R * cos(lon3);
  const y4 = R * sin(lon3);
  const z4 = lat2;

  quad(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4);
  stroke(75);
  line(x1, y1, z1, x2, y2, z2);
  line(x1, y1, z1, x4, y4, z4);
  noStroke();
}
