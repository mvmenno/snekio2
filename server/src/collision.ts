import { Food } from "./food";
import { Helper } from "./helper";
import { PlayerState } from "../../interfaces/playerState";
import { World } from "../../interfaces/world";

export class Collision {

    private helper;
    private world;
    constructor(world: World) {
        this.helper = new Helper();
        this.world = world;
    }

    checkCollisionFood(player: PlayerState, food: Food): number {
        var snakeHead = player.snake.getParts()[0];
        var chunkCoord = this.helper.getChunkFromCoord(snakeHead, this.world);

        var foodPoints = food.getFood();
        var collisionCount = 0;

        if (!foodPoints[chunkCoord]) return 0;

        for (var i = 0; i < foodPoints[chunkCoord].length; i++) {
            var distance = Math.sqrt(Math.pow(snakeHead.x - foodPoints[chunkCoord][i].x, 2) + Math.pow(snakeHead.y - foodPoints[chunkCoord][i].y, 2));

            if (distance < 0.15) {
                food.eat(chunkCoord, i);
                collisionCount++;
            }
        }
        return collisionCount;
    }

    checkCollisionPlayer(player: PlayerState, players: PlayerState[]): string|false {
        var playerSnakeHead = player.snake.getParts()[0];
        for (var key in players) {
            if (players[key].id !== player.id) {
                for (var i = 0; i < players[key].snake.getParts().length; i++) {
                    var otherSnakePart = players[key].snake.getParts()[i];

                    var distance = Math.sqrt(
                        Math.pow(playerSnakeHead.x - otherSnakePart.x, 2) +
                        Math.pow(playerSnakeHead.y - otherSnakePart.y, 2)
                    );

                    if (distance < 0.025) {
                        console.log('PLAYER DIED!'+player.id);

                        return players[key].id;
                    }
                }
            }
        }
        return false;
    }

    checkCollisionIsOOB(player: PlayerState): boolean {
        var snakeHead = player.snake.getParts()[0];

        if (snakeHead.x > this.world.width || snakeHead.x < -this.world.width) {
            return true;
        }
        if (snakeHead.y > this.world.height || snakeHead.y < -this.world.height) {
            return true;
        }
        return false;
    }
}