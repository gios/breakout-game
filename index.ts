import {Ball} from "./src/Ball";
import {CanvasContext} from "./src/CanvasContext";
import {Paddle} from "./src/Paddle";

let ball = new Ball(10, CanvasContext.getCanvasWidth() / 2, CanvasContext.getCanvasHeight() - 30, 2, -2);
let paddle = new Paddle(10, 140, (CanvasContext.getCanvasWidth() - 140) / 2);

CanvasContext.setItem(ball);
CanvasContext.setItem(paddle);
CanvasContext.renderingFactoryStart();
