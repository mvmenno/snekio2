import { Helper } from "./helper";
import { Vector2 } from "./vector2";

export class Food {
    private world : {width: number ,height: number};
    private food:Array<Array<Vector2>> = [];
    private foodCount : number = 0;
    private helper: Helper;

    constructor(world  : {width: number ,height: number}){
        this.world = world;
        this.helper = new Helper();	
    }

    getFood(){
        return this.food;
    }

    eat(chunk:number, index: number) {
        if(!this.food[chunk]) return;

        this.food[chunk].splice(index, 1);
        this.foodCount --;
    }

    create() {
        var posX = (Math.random() * ( this.world.width ))  - this.world.width;
        var posY = (Math.random() * ( this.world.height )) - this.world.height;

        var position = new Vector2(posX , posY)
        var chunkCoord = this.helper.getChunkFromCoord(position, this.world);

        if(!this.food[chunkCoord]) this.food[chunkCoord] = [];

        this.food[chunkCoord].push(position);
        this.foodCount ++;
    }
}