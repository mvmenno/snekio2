import { Color3 } from "./color3";
import { Vector2 } from "./vector2";

export class Snake {

    public readonly initSnakeLength: number = 10;
    protected parts: Array<Vector2> = [];
    protected velocity: Vector2 = new Vector2(0, 0)
    protected initRadius: number = 0.05;
    protected radius: number;
    protected color: Color3;

    private distanceOffset: number = 0.01;
    private angularDrag: number = 0.005;
    private radiusIncreaseFactor: number = 1.0002;

    constructor() {
        this.radius = this.initRadius;
        this.color = this.createSnakeColor();
    }

    getParts() {
        return this.parts;
    }

    setParts(parts : Array<Vector2>): void {
        this.parts = parts;
    }

    createSnake() {
        var currentLength = 0;
        var maxWidth = 6 - 0.1;
        var maxHeight = 6 - 0.1;

        var posX = (Math.random() * (maxWidth + maxWidth)) - maxWidth;
        var posY = (Math.random() * (maxHeight + maxHeight)) - maxHeight;

        for (var i = 0; i < this.initSnakeLength; i++) {
            var newVector = new Vector2(posX, posY + currentLength);
            this.parts.push(newVector);
            currentLength += this.distanceOffset;
        }
    }

    createSnakeColor() : Color3 {
        var cr = (Math.random() * 1) + 0.5;
        var cg = (Math.random() * 1) + 0.5;
        var cb = (Math.random() * 1) + 0.5;

        return new Color3(cr, cg, cb);
    }

    
    addLengthPlayerSnake(radius: number, length: number) { 
        for (var i = 0; i < length; i++) {
            var lastSegment = this.parts[this.parts.length - 1];

            var newVector = new Vector2(lastSegment.x, lastSegment.y);
            this.parts.push(newVector);
        }

        var r = this.radius * (this.parts.length * this.radiusIncreaseFactor)

        return r;
    }

    update(angle: number) {
        var getParts = this.getParts();
        var parts : Array<Vector2> = [];
        for (var i =0; i < getParts.length; i++){
            parts.push(new Vector2(
                getParts[i - 1].x - this.distanceOffset * (Math.cos(angle + (angle * this.angularDrag ))),
                getParts[i - 1].y - this.distanceOffset * (Math.sin(angle + (angle * this.angularDrag ))),
            ));
        }
        this.setParts(parts);
    }
}