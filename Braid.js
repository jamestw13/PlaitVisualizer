class Braid {
  constructor(numStrands = 16, numRows = 17) {
    randomSeed('a');
    this.numStrands = numStrands;
    const { leftArr, rightArr } = this.generateCords();
    this.leftCords = leftArr;
    this.rightCords = rightArr;

    this.numRows = numRows;
    this.radius = 75;
    this.arc = TWO_PI / this.numStrands;

    this.pattern = 1;

    this.quadArray = this.generateQuads();
  }

  generateCords() {
    const leftArr = [];
    for (let i = 0; i < this.numStrands / 2; i++) {
      leftArr.push(
        new Cord(
          i % this.numStrands === 0 || i % this.numStrands === 2 ? 'red' : 'black',
          // color(random(255), random(125), random(125)),
          20,
          0 + i * 30 + 20
        )
      );
    }
    const rightArr = [];
    for (let i = 0; i < this.numStrands / 2; i++) {
      rightArr.push(
        new Cord(
          i % this.numStrands === 0 || i % this.numStrands === 2 ? 'red' : 'black',
          // color(random(255), random(125), random(125)),
          width - 100,
          0 + i * 30 + 20
        )
      );
    }
    return { leftArr, rightArr };
  }

  generateQuads() {
    const array = [];
    for (let i = 0; i < this.numRows; i++) {
      const subArray = [];
      for (let j = 0; j < this.numStrands / 2; j++) {
        const lat1 = map(i, 0, this.numStrands, -this.radius * PI, this.radius * PI);
        const lat2 = lat1 + this.arc * this.radius;
        const lat3 = lat1 + this.arc * 2 * this.radius;

        const lon1 = map(j, 0, this.numStrands / 2, PI - HALF_PI, -PI - HALF_PI) + this.arc * i;
        const lon2 = lon1 - this.arc;
        const lon3 = lon1 + this.arc;

        const x1 = this.radius * cos(lon1);
        const y1 = lat1;
        const z1 = this.radius * sin(lon1);

        const x2 = this.radius * cos(lon2);
        const y2 = lat2;
        const z2 = this.radius * sin(lon2);

        const x3 = x1;
        const y3 = lat3;
        const z3 = z1;

        const x4 = this.radius * cos(lon3);
        const y4 = lat2;
        const z4 = this.radius * sin(lon3);

        const quad = new Quad(
          x1,
          y1,
          z1,
          x2,
          y2,
          z2,
          x3,
          y3,
          z3,
          x4,
          y4,
          z4,
          this.leftCords[j],
          this.rightCords[Math.abs(j - i) % (this.numStrands / 2)]
        );

        subArray.push(quad);
      }
      array.push(subArray);
    }
    return array;
  }

  updateStrands(num) {
    this.numStrands = num;
    this.arc = TWO_PI / num;
    this.leftCords = [];
    this.rightCords = [];
    const { leftArr, rightArr } = this.generateCords();
    this.leftCords = leftArr;
    this.rightCords = rightArr;
    this.quadArray = this.generateQuads();
  }

  updateRows(num) {
    this.numRows = num;
  }
  draw() {
    for (let i = 0; i < this.quadArray.length; i++) {
      for (let j = 0; j < this.quadArray[i].length; j++) {
        this.quadArray[i][j].draw(i % 2 === 0 ? 'left' : 'right');
      }
    }
  }
}
