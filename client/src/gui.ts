import { AdvancedDynamicTexture } from "babylonjs-gui";
import { GUIGame } from "./guiGame";
import { GUIMainMenu } from "./guiMainMenu";

export class GUI {

    private guiMainMenu : GUIMainMenu | undefined;
    private guiGame : GUIGame | undefined;
    private showMainMenu : boolean = true;
    private isMainMenu : boolean = true;
    private advancedDynamicTexture : AdvancedDynamicTexture;

    constructor() {
        this.advancedDynamicTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
        this.advancedDynamicTexture.isForeground = true;
        this.createMainMenu();
    }

    createMainMenu() {
        this.guiMainMenu = new GUIMainMenu(this.advancedDynamicTexture);
        this.guiMainMenu.create();
    }

    disposeMainMenu() {
        this.guiMainMenu?.dispose();
    }

    createGame() {
        this.guiGame = new GUIGame(this.advancedDynamicTexture);
    }

    disposeGame() {
        this.guiGame?.dispose();
    }

    checkState() {
        return;
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