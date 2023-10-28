import { Snake } from "../server/src/snake";

export interface PlayerState {
    id : string,
    score : number
    nickName : string,
    snake : Snake,
    angle : number,
}