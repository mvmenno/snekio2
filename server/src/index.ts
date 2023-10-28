import express from "express";
import * as socketIo from 'socket.io';

import { createServer, Server } from "http";
import cors from "cors";
import { PlayerState } from "../../interfaces/playerState";
import { Food } from "./food";
import { Collision } from "./collision";
import { World } from "../../interfaces/world";
import { Snake } from "./snake";

class GameServer {
    private app: express.Application;
    private io: socketIo.Server;
    private port: number = 3000;
    private server: Server;
    private players: Array<PlayerState> = [];
    private serverFPS: number = 20;
    private food: Food;
    private collision: Collision;
    private world: World;

    constructor() {
        this.world = {
            width: 6,
            height: 6
        };

        this.app = express();
        this.server = createServer(this.app);
        this.io = new socketIo.Server(this.server, {
            cors: {
                origin: ["http://localhost:5173"],
                methods: ["GET", "POST"],
                credentials: true
            }
        });

        this.food = new Food(this.world);
        this.collision = new Collision(this.world);

        this.initListeners();
        this.initLoop();
    }

    private initListeners() {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connection', (socket: socketIo.Socket) => {
            console.log('achieved connection with client %s ', socket.id);

            this.onPlayerConnect(socket);
            this.onPlayerDisconnect(socket);
            this.onPlayerMove(socket);
        });
    }

    private onPlayerConnect(socket: socketIo.Socket) {

        socket.on('player-connect', (state: PlayerState) => {
            var player = {} as PlayerState;
            player.id = socket.id;
            player.score = 0;
            player.snake = new Snake();
            this.players.push(player);

            this.io.to(socket.id).emit('player-created', player);
        });
    }

    private findPlayerIndexById(id: string): number {
        return this.players.findIndex((x) => { return x.id === id});
    }

    private onPlayerDisconnect(socket: socketIo.Socket) {
        socket.on('disconnect', () => {
            console.log('client disconnected %s', socket.id);
            delete this.players[this.findPlayerIndexById(socket.id)];
        });
    }
    private onPlayerMove(socket: socketIo.Socket) {
        socket.on('move-player', (state: PlayerState) => {
            this.players[this.findPlayerIndexById(socket.id)].angle = state.angle;
        });
    }

    private update() {
        if (this.players.length === 0) {
            return;
        }

        this.updatePlayerSnakes();

        for (var i = 0; i < this.players.length; i++) {

            var collisionPlayerId = this.collision.checkCollisionPlayer(this.players[i], this.players);
            var isOutOfBounds = this.collision.checkCollisionIsOOB(this.players[i]);

            if (collisionPlayerId) {
                var player = this.players.find(x => x.id === collisionPlayerId);
                if (player) {
                    player.score += Math.floor(this.players[i].snake.getParts().length * .5);
                }
            }

            if (collisionPlayerId || isOutOfBounds) {
                this.io.emit('dead-player', this.players[i]);
                delete this.players[i];
                this.updateScorePlayers();
            }

            var ateFood = this.collision.checkCollisionFood(this.players[i], this.food);

            if (ateFood > 0) {
                this.players[i].score += ateFood;
                this.updateScorePlayers();
            }

            this.io.sockets.emit('update-players', this.players);
        }

        this.food.create();
        this.io.emit('update-food', this.food.getFood());
    }

    private updatePlayerSnakes() {
        var d = 0.01;
        var angularDrag = 0.005;


        for (var i = 0; i < this.players.length; i++) {
            this.players[i].snake.update(this.players[i].angle);


            var player = this.players[i];
            var snakeParts = player.snake.getParts();

            for (var j = snakeParts.length - 1; j >= 1; j--) { 
                snakeParts[i].x = snakeParts[i - 1].x - d * (Math.cos(player.angle + (player.angle * angularDrag)));
                snakeParts[i].y = snakeParts[i - 1].y - d * (Math.sin(player.angle + (player.angle * angularDrag)));
            }
        }
    }

    private updateScorePlayers() {
        var scores: Array<{ nickName: string, score: number }> = [];

        for (var i = 0; i < this.players.length; i++) {
            scores[i] = {
                nickName: this.players[i].nickName,
                score: this.players[i].score
            };
        }
        scores.sort((a, b) => (b.score > a.score) ? 1 : -1);

        this.io.emit('update-players-score', scores);
    }

    private initLoop(): void {
        setInterval(() => {
            this.update()
        }, 1000 / this.serverFPS);
    }
}

var gameServer = new GameServer();


