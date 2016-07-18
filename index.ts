import {Ball} from "./src/Ball";
import {CanvasContext} from "./src/CanvasContext";

let ball = new Ball(10, CanvasContext.getCanvasWidth() / 2, CanvasContext.getCanvasHeight() - 30, 2, -2);
ball.draw();
ball.render();
