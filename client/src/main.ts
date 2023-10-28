import { Socket, io } from "socket.io-client";
import { Engine, Vector2, Vector3 } from 'babylonjs';
import { Scene } from "./scene";

import { PlayerState } from '../../interfaces/playerState';
import { World } from '../../interfaces/world';

const socket = io("http://localhost:3000");

class Main {
    private canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;
    private socket: Socket;
    private mouse: Vector3;

    private world: World;

    constructor() {
        this.engine = new Engine(this.canvas, true);


        this.world = {
            width : 6,
            height: 6
        };
        this.scene = new Scene(this.engine, this.world);

        this.initObservables();
        
        this.InitScene();

        this.initSocket();

        this.initServerListeners();
    }

    initObservables() {
        this.scene.onPointerObservable.add((pointerInfo) => {
            if(!pointerInfo.pickInfo?.ray?.direction){
                return;
            }
            this.mouse = pointerInfo.pickInfo?.ray?.direction;
        });
        this.scene.onKeyboardObservable.add((kbInfo) => {
            switch (kbInfo.type) {
                case BABYLON.KeyboardEventTypes.KEYUP:
                    if (kbInfo.event.key === 'esc') {
                        this.toggleMainMenu();
                    }
                break;
            }
        });

    }

    initServerListeners() {

        



        this.socket.on('update-food', (foodData: Array<Array<{ vector: BABYLON.Vector3, color: BABYLON.Color3 }>>) => {
            
        }); 



    }

    toggleMainMenu() {

    }

    initSocket() {
        this.socket = io("http://localhost:3000");

    }

    InitScene(){
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}

var main = new Main();