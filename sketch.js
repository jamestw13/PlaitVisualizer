let braid, rotateSlider;

function setup() {
  createCanvas(windowWidth / 2, windowHeight, WEBGL);

  braid = new Braid();

  // set this.number of strands
  createP('# of cords').position(250, 6);
  const strandNumSlider = createSlider(4, 32, 16, 2);
  strandNumSlider.input(e => braid.updateStrands(undefined, e.target.value));
  strandNumSlider.position(100, 20);

  // set this.number of rows
  const rowNumSlider = createSlider(1, 36, braid.numStrands);
  rowNumSlider.input(e => braid.updateStrands(e.target.value, undefined));
  rowNumSlider.position(100, 40);
  createP('# of rows').position(250, 25);

  // set rotation speed
  rotateSlider = createSlider(-2000, 2000, 0, 1000);
  rotateSlider.position(100, 60);
  createP('rotate plaits').position(250, 45);

  // set density of weave
  const weaveSelect = createSelect();
  weaveSelect.position(100, 80);
  weaveSelect.option('Diamond', 'diamond');
  weaveSelect.option('Under 2 Over 2', 'u2o2');
  weaveSelect.option('Under 3 Over 3', 'u3o3');
  weaveSelect.selected('u3o3');
  weaveSelect.changed(e => (braid.pattern = e.target.value));
  createP('weave pattern').position(250, 65);

  // //color random or not
  // const randomColor = createCheckbox('randomize color', false);
  // randomColor.position(100, 100);
  // randomColor.input(e => console.log(e.target.checked));
}

function draw() {
  background(125);
  orbitControl(2, 0, 1);

  rotateY(rotateSlider.value() === 0 ? 0 : millis() / rotateSlider.value());
  braid.draw();
}
