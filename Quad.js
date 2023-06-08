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
  draw(strand) {
    fill(strand === 'left' ? this.leftCord.color : this.rightCord.color);
    noStroke();
    quad(this.x1, this.y1, this.z1, this.x2, this.y2, this.z2, this.x3, this.y3, this.z3, this.x4, this.y4, this.z4);
  }
}
