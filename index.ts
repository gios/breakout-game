import {Ball} from "./src/Ball";
import {Brick} from "./src/Brick";
import {CanvasContext} from "./src/CanvasContext";
import {Paddle} from "./src/Paddle";
import {Score} from "./src/Score";

let ball = new Ball(10, CanvasContext.getCanvasWidth() / 2, CanvasContext.getCanvasHeight() - 30, 2, -2);
let paddle = new Paddle(15, 140, (CanvasContext.getCanvasWidth() - 140) / 2);
let brick = new Brick(3, 8, 84, 20, 10, 30, 30);
let score = new Score();

CanvasContext.setItem(ball);
CanvasContext.setItem(paddle);
CanvasContext.setItem(brick);
CanvasContext.setItem(score);
CanvasContext.renderingFactoryStart();
