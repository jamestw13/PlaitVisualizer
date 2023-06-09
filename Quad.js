class Quad {
  constructor(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4, leftCord, rightCord) {
    this.renderer = createGraphics(200, 200);
    this.x1 = x1;
    this.y1 = y1;
    this.z1 = z1;
    this.x2 = x2;
    this.y2 = y2;
    this.z2 = z2;
    this.x3 = x3;
    this.y3 = y3;
    this.z3 = z3;
    this.x4 = x4;
    this.y4 = y4;
    this.z4 = z4;
    this.leftCord = leftCord;
    this.rightCord = rightCord;
  }

  drawLeftCord() {
    fill(this.leftCord.color);
    line(this.x1, this.y1, this.z1, this.x4, this.y4, this.z4);
    line(this.x2, this.y2, this.z2, this.x3, this.y3, this.z3);
  }

  drawRightCord() {
    fill(this.rightCord.color);
    line(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2);
    line(this.x4, this.y4, this.z4, this.x3, this.y3, this.z3);
  }

  draw(pattern, row, strand) {
    stroke(125);
    switch (pattern) {
      // Under 2 Over 2
      case 'u2o2':
        if (row % 4 === 0 && strand % 2 === 0) {
          this.drawLeftCord();
        } else if (row % 4 === 1) {
          this.drawLeftCord();
        } else if (row % 4 === 2 && strand % 2 === 1) {
          this.drawLeftCord();
        } else this.drawRightCord();
        break;
      // Under 3 Over 3
      case 'u3o3':
        if (row % 6 === 0 && strand % 3 === 0) {
          this.drawLeftCord();
        } else if (row % 6 === 1 && (strand % 3 === 0 || strand % 3 === 1)) {
          this.drawLeftCord();
        } else if (row % 6 === 2) {
          this.drawLeftCord();
        } else if (row % 6 === 3 && (strand % 3 === 1 || strand % 3 === 2)) {
          this.drawLeftCord();
        } else if (row % 6 === 4 && strand % 3 === 2) {
          this.drawLeftCord();
        } else this.drawRightCord();
        break;
      // Under 4 Over 4
      case 'u4o4':
        if (row % 6 === 0 && strand % 3 === 0) {
          this.drawLeftCord();
        } else if (row % 6 === 1 && (strand % 3 === 0 || strand % 3 === 1)) {
          this.drawLeftCord();
        } else if (row % 6 === 2) {
          this.drawLeftCord();
        } else if (row % 6 === 3 && (strand % 3 === 1 || strand % 3 === 2)) {
          this.drawLeftCord();
        } else if (row % 6 === 4 && strand % 3 === 2) {
          this.drawLeftCord();
        } else this.drawRightCord();
        break;
      default:
        if (row % 2 === 0) {
          this.drawLeftCord();
        } else {
          this.drawRightCord();
        }
        break;
    }
    noStroke();
    quad(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.x3, this.y3, this.z3, this.x4, this.y4, this.z4);
  }
}
