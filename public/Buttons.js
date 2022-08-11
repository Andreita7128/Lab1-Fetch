class Buttons {

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.b = 100;
    }
    show() {
        noStroke();
        fill(200);
        rect(this.x, this.y, this.b, this.b);
    }
    click() {
        return mouseX > this.x && mouseX < (this.x + this.b) && mouseY > this.y && mouseY < (this.y + this.b);
    }
}