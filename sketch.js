let numStrands = 16;
let numRows = 24;
let leftCordArray = [];
let rightCordArray = [];

// function sketch(p) {
setup = function () {
  // randomSeed('true');
  createCanvas(windowWidth / 2, windowHeight * 2, WEBGL);
  for (let i = 0; i < numStrands / 2; i++) {
    const cp = createColorPicker(
      // random(['red', 'yellow', 'blue', 'orange', 'green', 'purple', 'pink'])
      i % 8 === 1 ? 'black' : 'red'
    );
    cp.position(20, i * 30);
    cp.input(function () {
      leftCordArray[i] = this.value();
    });
    leftCordArray[i] = cp.color();
  }

  for (let i = 0; i < numStrands / 2; i++) {
    const cp = createColorPicker(
      // random(['red', 'yellow', 'blue', 'orange', 'green', 'purple', 'pink'])
      i % 3 === 0 ? 'red' : 'black'
    );
    cp.position(100, i * 30);
    cp.input(function () {
      rightCordArray[i] = this.value();
    });
    rightCordArray[i] = cp.color();
  }

  const strandNumInput = createInput(16, 'number');
  strandNumInput.input(updateStrands);

  const rowNumInput = createInput(4, 'number');
  rowNumInput.input(updateRows);
};

function updateStrands() {
  if (this.value() > 1 && this.value() % 2 === 0) numStrands = this.value();
}

function updateRows() {
  numRows = this.value();
}
draw = function () {
  const R = 75;
  const ARC = TWO_PI / numStrands;

  background(125);
  orbitControl();

  translate(0, -windowHeight + 200);
  rotateX(-HALF_PI);
  rotateZ(millis() / 1000);
  stroke('white');
  point(0, 0, 0);
  noStroke();

  for (let j = 0; j < numRows; j++) {
    for (let i = 0; i < numStrands / 2; i++) {
      fill(j % 2 === 0 ? '#0000FF' : '#FF0000');

      const lon1 =
        j % 2 === 0 ? map(i, 0, numStrands / 2, -PI, PI) + ARC * j : map(i, 0, numStrands / 2, PI, -PI) + ARC * -j;
      const lat1 = map(j, 0, numStrands, 0, 2 * R * PI);

      // diamond pattern
      fill(j % 2 === 0 ? leftCordArray[i] : rightCordArray.at(-(1 + i)));
      generateDiamond(lat1, lon1, ARC, R);
    }
  }
};
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
}
