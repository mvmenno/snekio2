import { Color3, Vector2 } from "babylonjs";
import { Circle } from "./circle";

export class SnakePart {
    private position : Vector2;
    private color:Color3;
    private radius: number;
    private geometry : Circle;


    constructor(position : Vector2, radius: number, color: Color3) {
        this.position = position;
        this.radius = radius;
        this.color = color;

        this.geometry = new Circle();
    }

    draw(){
        this.geometry.draw(this.position, this.radius, this.color);
    }
}