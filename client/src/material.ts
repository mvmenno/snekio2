import { Color3, StandardMaterial } from "babylonjs";
import { Scene } from "./scene";


export class Material {

    private scene: Scene;
    private color : Color3;

    constructor(scene: Scene) {
        this.scene = scene;
    }
    createMaterial(name: string) {
        let material = new StandardMaterial(name, this.scene);

        material.diffuseColor = new Color3(0, 0, 0);
        material.emissiveColor = this.color;

        return material;
    }
    setColor(color: Color3) {
        this.color = color;
    }
}