import { GUIGame } from "./guiGame";
import { GUIMainMenu } from "./guiMainMenu";

export class GUI {

    private guiMainMenu : GUIMainMenu | undefined;
    private guiGame : GUIGame | undefined;
    private showMainMenu : boolean = true;
    private isMainMenu : boolean = true;

    constructor() {
        this.guiMainMenu = new GUIMainMenu();
    }

    createMainMenu() {
        this.guiMainMenu = new GUIMainMenu();
    }

    disposeMainMenu() {
        this.guiMainMenu?.dispose();
    }

    createGame() {
        this.guiGame = new GUIGame();
    }

    disposeGame() {
        this.guiGame?.dispose();
    }

    checkState() {
        if (!this.showMainMenu) {
            this.disposeMainMenu();
            this.createGame();
            this.isMainMenu = false;
            return;
        }

        if(this.isMainMenu) return;
        this.isMainMenu = true;
        this.disposeGame();
        this.createMainMenu();
    }
}