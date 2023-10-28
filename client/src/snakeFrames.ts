import { Engine, Vector2 } from "babylonjs";

export class SnakeFrames {
    private engine: Engine;
    private playerFrames: Array<Array<Vector2>> = [];
    private frameDeltaTime: number = 0;
    private frameDeltaTimeSub: number = 0;
    

    constructor (engine: Engine) {
        this.engine = engine;
    }

    public addPlayerFrame (frame: Array<Vector2>): void {
        var deltaTime = this.engine.getDeltaTime();

        this.playerFrames.push(frame);

        if (this.playerFrames.length > 2) {
            this.playerFrames.splice(0 , 1);
        }

        this.frameDeltaTime = deltaTime;
        this.frameDeltaTimeSub = deltaTime;
    }

    public getFractionalTimeframe(): number {
        var fraction = 1;

        this.frameDeltaTimeSub -= this.engine.getDeltaTime();

        if (this.frameDeltaTimeSub > 0){
            fraction = 1 - (this.frameDeltaTimeSub / this.frameDeltaTime)
        }
        return fraction;
    }
}