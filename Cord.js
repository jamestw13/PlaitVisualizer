class Cord {
  constructor(color, x, y) {
    this.color = color;
    this.picker = createColorPicker(color);
    this.picker.position(x, y);
    this.picker.input(e => (this.color = e.target.value));
  }
}
