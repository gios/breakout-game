import {Ball} from "./src/Ball";
import {CanvasContext} from "./src/CanvasContext";
import {Paddle} from "./src/Paddle";

new Ball(10, CanvasContext.getCanvasWidth() / 2, CanvasContext.getCanvasHeight() - 30, 2, -2).render();
new Paddle(10, 75, (CanvasContext.getCanvasWidth() - 75) / 2).render();
