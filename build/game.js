class CanvasContext {
    static getCanvasWidth() {
        return this.canvas.width;
    }
    static getCanvasHeight() {
        return this.canvas.height;
    }
    static setItem(item) {
        this.items.push(item);
    }
    static getItem(name) {
        return this.items.filter(item => {
            return item.constructor.name === name;
        })[0];
    }
    static renderingFactoryStart() {
        this.items.forEach(component => {
            component.render();
        });
    }
}
CanvasContext.canvas = document.getElementById("game");
CanvasContext.ctx = CanvasContext.canvas.getContext("2d");
CanvasContext.items = [];

class Ball extends CanvasContext {
    constructor(radius, positionX, positionY, movingX, movingY) {
        super();
        this.radius = radius;
        this.positionX = positionX;
        this.positionY = positionY;
        this.movingX = movingX;
        this.movingY = movingY;
    }
    getRadius() {
        return this.radius;
    }
    setRadius(radius) {
        this.radius = radius;
    }
    getPositionX() {
        return this.positionX;
    }
    setPositionX(positionX) {
        this.positionX = positionX;
    }
    getPositionY() {
        return this.positionY;
    }
    setPositionY(positionY) {
        this.positionY = positionY;
    }
    getMovingX() {
        return this.movingX;
    }
    setMovingX(movingX) {
        this.movingX = movingX;
    }
    getMovingY() {
        return this.movingY;
    }
    setMovingY(movingY) {
        this.movingY = movingY;
    }
    render() {
        CanvasContext.ctx.clearRect(0, 0, CanvasContext.getCanvasWidth(), CanvasContext.getCanvasHeight());
        if (this.getPositionX() + this.getMovingX() < this.getRadius() ||
            this.getPositionX() + this.getMovingX() > CanvasContext.getCanvasWidth() - this.getRadius()) {
            this.setMovingX(-this.getMovingX());
        }
        if (this.getPositionY() + this.getMovingY() < this.getRadius()) {
            this.setMovingY(-this.getMovingY());
        }
        else if (this.getPositionY() + this.getMovingY() > CanvasContext.getCanvasHeight() - this.getRadius()) {
            let paddle = CanvasContext.getItem("Paddle");
            if (this.getPositionX() > paddle.getStartPoint() &&
                this.getPositionX() < paddle.getStartPoint() + paddle.getWidth()) {
                this.setMovingY(-this.getMovingY());
            }
            else {
                alert("GAME OVER!");
                document.location.reload();
            }
        }
        this.draw();
        this.setPositionX(this.getPositionX() + this.getMovingX());
        this.setPositionY(this.getPositionY() + this.getMovingY());
        requestAnimationFrame(this.render.bind(this));
    }
    draw() {
        let ctx = CanvasContext.ctx;
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#2b7489";
        ctx.fill();
        ctx.closePath();
    }
}

class Brick extends CanvasContext {
    constructor(rowCount, columnCount, width, height, padding, offsetTop, offsetLeft) {
        super();
        this.bricks = [];
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.width = width;
        this.height = height;
        this.padding = padding;
        this.offsetTop = offsetTop;
        this.offsetLeft = offsetLeft;
        this.generateBricks();
    }
    getBricks() {
        return this.bricks;
    }
    getColumnCount() {
        return this.columnCount;
    }
    getRowCount() {
        return this.rowCount;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getPadding() {
        return this.padding;
    }
    getOffsetLeft() {
        return this.offsetLeft;
    }
    getOffsetTop() {
        return this.offsetTop;
    }
    render() {
        this.draw();
        this.collisionDetection();
        requestAnimationFrame(this.render.bind(this));
    }
    draw() {
        let ctx = CanvasContext.ctx;
        for (let column = 0; column < this.getColumnCount(); column++) {
            for (let row = 0; row < this.getRowCount(); row++) {
                if (this.getBricks()[column][row].status === 1) {
                    let brickX = (column * (this.getWidth() + this.getPadding())) + this.getOffsetLeft();
                    let brickY = (row * (this.getHeight() + this.getPadding())) + this.getOffsetTop();
                    this.getBricks()[column][row].x = brickX;
                    this.getBricks()[column][row].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.getWidth(), this.getHeight());
                    ctx.fillStyle = "##2b7489";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    generateBricks() {
        for (let column = 0; column < this.getColumnCount(); column++) {
            this.getBricks()[column] = [];
            for (let row = 0; row < this.getRowCount(); row++) {
                this.getBricks()[column][row] = { status: 1, x: 0, y: 0 };
            }
        }
    }
    collisionDetection() {
        let ball = CanvasContext.getItem("Ball");
        let score = CanvasContext.getItem("Score");
        for (let column = 0; column < this.getColumnCount(); column++) {
            for (let row = 0; row < this.getRowCount(); row++) {
                let brick = this.getBricks()[column][row];
                if (brick.status === 1) {
                    if (ball.getPositionX() > brick.x && ball.getPositionX() < brick.x + this.getWidth() &&
                        ball.getPositionY() > brick.y && ball.getPositionY() < brick.y + this.getHeight()) {
                        ball.setMovingY(-ball.getMovingY());
                        brick.status = 0;
                        score.setScore(score.getScore() + 1);
                        if (score.getScore() === this.getRowCount() * this.getColumnCount()) {
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
}

class Paddle extends CanvasContext {
    constructor(height, width, startPoint) {
        super();
        this.height = height;
        this.width = width;
        this.startPoint = startPoint;
    }
    setRightPressed(rightPressed) {
        this.rightPressed = rightPressed;
    }
    setLeftPressed(leftPressed) {
        this.leftPressed = leftPressed;
    }
    getStartPoint() {
        return this.startPoint;
    }
    getHeight() {
        return this.height;
    }
    getWidth() {
        return this.width;
    }
    render() {
        this.attachListeners();
        if (this.rightPressed && this.startPoint < CanvasContext.getCanvasWidth() - this.width) {
            this.startPoint += 7;
        }
        else if (this.leftPressed && this.startPoint > 0) {
            this.startPoint -= 7;
        }
        this.draw();
        requestAnimationFrame(this.render.bind(this));
    }
    draw() {
        let ctx = CanvasContext.ctx;
        ctx.beginPath();
        ctx.rect(this.startPoint, CanvasContext.getCanvasHeight() - this.height, this.width, this.height);
        ctx.fillStyle = "#2b7489";
        ctx.fill();
        ctx.closePath();
    }
    attachListeners() {
        document.addEventListener("keydown", e => {
            if (e.keyCode === Paddle.rightButtonCode) {
                this.setRightPressed(true);
            }
            else if (e.keyCode === Paddle.leftButtonCode) {
                this.setLeftPressed(true);
            }
        }, false);
        document.addEventListener("keyup", e => {
            if (e.keyCode === Paddle.rightButtonCode) {
                this.setRightPressed(false);
            }
            else if (e.keyCode === Paddle.leftButtonCode) {
                this.setLeftPressed(false);
            }
        }, false);
        document.addEventListener("mousemove", e => {
            let relativeX = e.clientX - CanvasContext.canvas.offsetLeft;
            if (relativeX > 0 && relativeX < CanvasContext.getCanvasWidth()) {
                this.startPoint = relativeX - this.width / 2;
            }
        }, false);
    }
}
Paddle.rightButtonCode = 39;
Paddle.leftButtonCode = 37;

class Score extends CanvasContext {
    constructor(...args) {
        super(...args);
        this.score = 0;
    }
    getScore() {
        return this.score;
    }
    setScore(score) {
        this.score = score;
    }
    render() {
        this.draw();
        requestAnimationFrame(this.render.bind(this));
    }
    draw() {
        let ctx = CanvasContext.ctx;
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(`Score: ${this.score}`, 8, 20);
    }
}

let ball = new Ball(10, CanvasContext.getCanvasWidth() / 2, CanvasContext.getCanvasHeight() - 30, 2, -2);
let paddle = new Paddle(15, 140, (CanvasContext.getCanvasWidth() - 140) / 2);
let brick = new Brick(3, 8, 84, 20, 10, 30, 30);
let score = new Score();
CanvasContext.setItem(ball);
CanvasContext.setItem(paddle);
CanvasContext.setItem(brick);
CanvasContext.setItem(score);
CanvasContext.renderingFactoryStart();