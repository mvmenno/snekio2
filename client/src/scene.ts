import { ArcRotateCamera, Scene as BabylonScene, Engine, MeshBuilder, Vector3 }  from "babylonjs";
import { World } from "../../interfaces/world";
import { Material } from "./material";

export class Scene extends BabylonScene {
    private world: World;
    private material: Material;
    public camera: ArcRotateCamera;

    constructor(engine: Engine, world: World) {
        super(engine);

        this.world = world;
        this.material = new Material(this);
        this.camera = new ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new Vector3(0, 0, 5), this);

        this.createScene();
    }

    createScene() {
    }

    createBoundingBox() {
        var width = 0.02;

        var zIndex = -1;

        var mwidth = this.world.width;
        var mheight = this.world.height;

        var red = 0.8;
        var white = 0.3;
            
            var points = [[
                new Vector3(-mwidth, -mheight, zIndex),
                new Vector3(mwidth, -mheight, zIndex),
                new Vector3(mwidth, mheight, zIndex),
                new Vector3(-mwidth, mheight, zIndex),
                new Vector3(-mwidth, -mheight, zIndex),
                new Vector3(-mwidth - width, -mwidth - width, zIndex),
                new Vector3(mwidth + width, -mwidth - width, zIndex),
                new Vector3(mwidth + width, mwidth + width, zIndex),
                new Vector3(-mwidth - width, mwidth + width, zIndex),
                new Vector3(-mwidth - width, -mwidth - width, zIndex)
            ]];
            if(typeof this === 'undefined'){
                return;
            }

            let ribbon = MeshBuilder.CreateRibbon("boundingHex",{pathArray: points, updatable: false});

            ribbon.material = this.material.createMaterial("MatBoundingHex");
    }
}