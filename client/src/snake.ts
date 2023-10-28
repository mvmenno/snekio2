import { Color3, StandardMaterial, Vector2 } from "babylonjs";
import { SnakePart } from "./snakePart";
import { SnakeFrames } from "./snakeFrames";

export class Snake {

    private material : StandardMaterial;
    private color : Color3;
    //private parts
    private parts : Array<SnakePart> = [];

    private snakeFrames : SnakeFrames;


    constructor() {
        this.createSnake();
    }

    createSnake() {
        // initial render the snake outside the view!
        //this.parts.push(new SnakePart(new Vector2(9999,9999),));
    }

}