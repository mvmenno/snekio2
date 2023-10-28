import {AdvancedDynamicTexture, Button, InputText, TextBlock} from "babylonjs-gui";

export class GUIMainMenu {

    private advancedDynamicTexture : AdvancedDynamicTexture;

    
    public shadersEnabled: boolean = true;

    constructor(advancedDynamicTexture: AdvancedDynamicTexture) {
        this.advancedDynamicTexture = advancedDynamicTexture;
    }

    create() {
        this.createTitle();
        this.createFieldNickName();
        this.createButtonPlay();
        this.createToggleShaders();
    }

    createTitle() {
        var title = new TextBlock();

        title.text = "Snek.IO"
        title.color = "#49a0de";
        title.fontSize = "72px";
        title.fontWeight = "bold";
        title.outlineWidth = 5;
        title.top = -100;
        title.shadowBlur = 20;
        title.shadowColor = "#000";
        title.shadowOffsetY = 14;

        this.advancedDynamicTexture.addControl(title);
    }

    createFieldNickName() {
        var textFieldTitle = new TextBlock();
        textFieldTitle.text = "Nickname:";
        textFieldTitle.color = "#fff";
        textFieldTitle.top = -35;
        this.advancedDynamicTexture.addControl(textFieldTitle);

        var textField = new InputText();
        textField.width = "200px";
        textField.height = "40px";
        textField.color = "#fff";
        textField.text = "player";
        if (window.localStorage.getItem('nickName')) {
            textField.text = window.localStorage.getItem('nickName') || "player";
        }
        this.advancedDynamicTexture.addControl(textField);

        textField.onTextChangedObservable.add(() => {
            if (textField.text.length > 0) {
                window.localStorage.setItem('nickName', textField.text);
            }
        });
    }

    createToggleShaders() {
        var textFieldTitle = new TextBlock();
        textFieldTitle.text = "Shaders enabled:";
        textFieldTitle.color = "#ffffff";
        textFieldTitle.top = 110;
        this.advancedDynamicTexture.addControl(textFieldTitle);
        
        var shaderButton = Button.CreateSimpleButton("shader-button", "Toggle shaders: "+this.shadersEnabled ? "on" : "off");
        shaderButton.top = 140;
        shaderButton.width = "120px";
        shaderButton.height = "40px";
        shaderButton.color = this.shadersEnabled ? "#00ff00" : "#ff0000";
        shaderButton.hoverCursor = "pointer";
        this.advancedDynamicTexture.addControl(shaderButton);

        shaderButton.onPointerClickObservable.add(() => {
            this.shadersEnabled = !this.shadersEnabled;
            shaderButton.color = this.shadersEnabled ? "#00f00" : "#ff0000";

            if (!shaderButton.textBlock) return; 
            shaderButton.textBlock.text = this.shadersEnabled ? "on" : "off";
        });
    }

    createButtonPlay() {
        var playButton = Button.CreateSimpleButton("playButton", "Play");
        
        playButton.top = 60;
        playButton.width = "120px";
        playButton.height = "40px";

        playButton.color = "#000";
        playButton.background = "#59e639";

        if(!playButton.textBlock) return;
        playButton.textBlock.fontSize = "24px";
        playButton.textBlock.fontWeight = "bold";

        playButton.onPointerClickObservable.add(() => {
            // TODO: Trigger playState
        });
    
        this.advancedDynamicTexture.addControl(playButton);
    }

    dispose () {
        this.advancedDynamicTexture.dispose();
    }
}