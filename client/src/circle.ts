import { Color3, CreateDisc, Curve3, Material, MeshBuilder, StandardMaterial, Vector2, Vector3 } from "babylonjs";

export class Circle {
    private material : StandardMaterial;
    private segments : number = 16;

    constructor(){
        this.material = new StandardMaterial("circleMat");
    }

    draw (position: Vector2, radius: number, color : Color3) {
        this.material.emissiveColor = color;
        var circle = CreateDisc("circle", {
            radius : radius,
            tessellation : this.segments
        });

        circle.position = new Vector3(...position.asArray(),0);
        circle.material = this.material;
    }
}