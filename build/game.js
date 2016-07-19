function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var CanvasContext = (function () {
    function CanvasContext() {
    }
    CanvasContext.getCanvasWidth = function () {
        return this.canvas.width;
    };
    CanvasContext.getCanvasHeight = function () {
        return this.canvas.height;
    };
    CanvasContext.setItem = function (item) {
        this.items.push(item);
    };
    CanvasContext.getItem = function (name) {
        return this.items.filter(function (item) {
            return item.constructor.name === name;
        })[0];
    };
    CanvasContext.renderingFactoryStart = function () {
        this.items.forEach(function (component) {
            component.render();
        });
    };
    CanvasContext.canvas = document.getElementById("game");
    CanvasContext.ctx = CanvasContext.canvas.getContext("2d");
    CanvasContext.items = [];
    return CanvasContext;
}());

var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(radius, positionX, positionY, movingX, movingY) {
        _super.call(this);
        this.radius = radius;
        this.positionX = positionX;
        this.positionY = positionY;
        this.movingX = movingX;
        this.movingY = movingY;
    }
    Ball.prototype.getRadius = function () {
        return this.radius;
    };
    Ball.prototype.setRadius = function (radius) {
        this.radius = radius;
    };
    Ball.prototype.getPositionX = function () {
        return this.positionX;
    };
    Ball.prototype.setPositionX = function (positionX) {
        this.positionX = positionX;
    };
    Ball.prototype.getPositionY = function () {
        return this.positionY;
    };
    Ball.prototype.setPositionY = function (positionY) {
        this.positionY = positionY;
    };
    Ball.prototype.getMovingX = function () {
        return this.movingX;
    };
    Ball.prototype.setMovingX = function (movingX) {
        this.movingX = movingX;
    };
    Ball.prototype.getMovingY = function () {
        return this.movingY;
    };
    Ball.prototype.setMovingY = function (movingY) {
        this.movingY = movingY;
    };
    Ball.prototype.render = function () {
        CanvasContext.ctx.clearRect(0, 0, CanvasContext.getCanvasWidth(), CanvasContext.getCanvasHeight());
        if (this.getPositionX() + this.getMovingX() < this.getRadius() ||
            this.getPositionX() + this.getMovingX() > CanvasContext.getCanvasWidth() - this.getRadius()) {
            this.setMovingX(-this.getMovingX());
        }
        if (this.getPositionY() + this.getMovingY() < this.getRadius()) {
            this.setMovingY(-this.getMovingY());
        }
        else if (this.getPositionY() + this.getMovingY() > CanvasContext.getCanvasHeight() - this.getRadius()) {
            var paddle = CanvasContext.getItem("Paddle");
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
    };
    Ball.prototype.draw = function () {
        var ctx = CanvasContext.ctx;
        ctx.beginPath();
        ctx.arc(this.positionX, this.positionY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#2b7489";
        ctx.fill();
        ctx.closePath();
    };
    return Ball;
}(CanvasContext));

var Brick = (function (_super) {
    __extends(Brick, _super);
    function Brick(rowCount, columnCount, width, height, padding, offsetTop, offsetLeft) {
        _super.call(this);
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
    Brick.prototype.getBricks = function () {
        return this.bricks;
    };
    Brick.prototype.getColumnCount = function () {
        return this.columnCount;
    };
    Brick.prototype.getRowCount = function () {
        return this.rowCount;
    };
    Brick.prototype.getWidth = function () {
        return this.width;
    };
    Brick.prototype.getHeight = function () {
        return this.height;
    };
    Brick.prototype.getPadding = function () {
        return this.padding;
    };
    Brick.prototype.getOffsetLeft = function () {
        return this.offsetLeft;
    };
    Brick.prototype.getOffsetTop = function () {
        return this.offsetTop;
    };
    Brick.prototype.render = function () {
        this.draw();
        this.collisionDetection();
        requestAnimationFrame(this.render.bind(this));
    };
    Brick.prototype.draw = function () {
        var ctx = CanvasContext.ctx;
        for (var column = 0; column < this.getColumnCount(); column++) {
            for (var row = 0; row < this.getRowCount(); row++) {
                if (this.getBricks()[column][row].status === 1) {
                    var brickX = (column * (this.getWidth() + this.getPadding())) + this.getOffsetLeft();
                    var brickY = (row * (this.getHeight() + this.getPadding())) + this.getOffsetTop();
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
    };
    Brick.prototype.generateBricks = function () {
        for (var column = 0; column < this.getColumnCount(); column++) {
            this.getBricks()[column] = [];
            for (var row = 0; row < this.getRowCount(); row++) {
                this.getBricks()[column][row] = { status: 1, x: 0, y: 0 };
            }
        }
    };
    Brick.prototype.collisionDetection = function () {
        var ball = CanvasContext.getItem("Ball");
        var score = CanvasContext.getItem("Score");
        for (var column = 0; column < this.getColumnCount(); column++) {
            for (var row = 0; row < this.getRowCount(); row++) {
                var brick = this.getBricks()[column][row];
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
    };
    return Brick;
}(CanvasContext));

var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle(height, width, startPoint) {
        _super.call(this);
        this.height = height;
        this.width = width;
        this.startPoint = startPoint;
    }
    Paddle.prototype.setRightPressed = function (rightPressed) {
        this.rightPressed = rightPressed;
    };
    Paddle.prototype.setLeftPressed = function (leftPressed) {
        this.leftPressed = leftPressed;
    };
    Paddle.prototype.getStartPoint = function () {
        return this.startPoint;
    };
    Paddle.prototype.getHeight = function () {
        return this.height;
    };
    Paddle.prototype.getWidth = function () {
        return this.width;
    };
    Paddle.prototype.render = function () {
        this.attachListeners();
        if (this.rightPressed && this.startPoint < CanvasContext.getCanvasWidth() - this.width) {
            this.startPoint += 7;
        }
        else if (this.leftPressed && this.startPoint > 0) {
            this.startPoint -= 7;
        }
        this.draw();
        requestAnimationFrame(this.render.bind(this));
    };
    Paddle.prototype.draw = function () {
        var ctx = CanvasContext.ctx;
        ctx.beginPath();
        ctx.rect(this.startPoint, CanvasContext.getCanvasHeight() - this.height, this.width, this.height);
        ctx.fillStyle = "#2b7489";
        ctx.fill();
        ctx.closePath();
    };
    Paddle.prototype.attachListeners = function () {
        var _this = this;
        document.addEventListener("keydown", function (e) {
            if (e.keyCode === Paddle.rightButtonCode) {
                _this.setRightPressed(true);
            }
            else if (e.keyCode === Paddle.leftButtonCode) {
                _this.setLeftPressed(true);
            }
        }, false);
        document.addEventListener("keyup", function (e) {
            if (e.keyCode === Paddle.rightButtonCode) {
                _this.setRightPressed(false);
            }
            else if (e.keyCode === Paddle.leftButtonCode) {
                _this.setLeftPressed(false);
            }
        }, false);
        document.addEventListener("mousemove", function (e) {
            var relativeX = e.clientX - CanvasContext.canvas.offsetLeft;
            if (relativeX > 0 && relativeX < CanvasContext.getCanvasWidth()) {
                _this.startPoint = relativeX - _this.width / 2;
            }
        }, false);
    };
    Paddle.rightButtonCode = 39;
    Paddle.leftButtonCode = 37;
    return Paddle;
}(CanvasContext));

var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        _super.apply(this, arguments);
        this.score = 0;
    }
    Score.prototype.getScore = function () {
        return this.score;
    };
    Score.prototype.setScore = function (score) {
        this.score = score;
    };
    Score.prototype.render = function () {
        this.draw();
        requestAnimationFrame(this.render.bind(this));
    };
    Score.prototype.draw = function () {
        var ctx = CanvasContext.ctx;
        ctx.font = "16px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score: " + this.score, 8, 20);
    };
    return Score;
}(CanvasContext));

var ball = new Ball(10, CanvasContext.getCanvasWidth() / 2, CanvasContext.getCanvasHeight() - 30, 2, -2);
var paddle = new Paddle(15, 140, (CanvasContext.getCanvasWidth() - 140) / 2);
var brick = new Brick(3, 8, 84, 20, 10, 30, 30);
var score = new Score();
CanvasContext.setItem(ball);
CanvasContext.setItem(paddle);
CanvasContext.setItem(brick);
CanvasContext.setItem(score);
CanvasContext.renderingFactoryStart();