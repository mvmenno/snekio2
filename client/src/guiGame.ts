import { AdvancedDynamicTexture, Container, Control, TextBlock } from "babylonjs-gui";

export class GUIGame {
    private advancedDynamicTexture : AdvancedDynamicTexture;

    public scoreText : TextBlock = new TextBlock();
    public highScoreText : TextBlock = new TextBlock();

    constructor(advancedDynamicTexture: AdvancedDynamicTexture) {
        this.advancedDynamicTexture = advancedDynamicTexture;
    }

    createScore() {
        var score = this.scoreText;
        score.text = "Score: "
        score.color = "#fff";

        score.width = "100px";
        score.height = "25px";

        score.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        score.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;

        this.advancedDynamicTexture.addControl(score);
    }

    createHighScores() {
        var highScores = new Container();
        var highScoreTitle = new TextBlock();

        highScoreTitle.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        highScoreTitle.top = 0;
        highScoreTitle.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        highScoreTitle.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;

        highScoreTitle.text = "HighScores:";
        highScoreTitle.color = "#fff";

        highScores.addControl(highScoreTitle);

        var highScoreText = this.highScoreText;
        highScoreText.color = "#fff";
        highScoreText.name = "hs-content";
        highScoreText.fontSize = "12px";
        highScoreText.top = 25;
        highScoreTitle.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        highScoreTitle.textVerticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
        highScoreTitle.textHorizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
        highScores.addControl(highScoreText);

        this.advancedDynamicTexture.addControl(highScores);
    }

    dispose() {
        this.advancedDynamicTexture.dispose();
    }
}