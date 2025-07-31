// プレイヤー状態をまとめたオブジェクト
var player = [];
// 敵の状態
var enemy = [];
// 現在の戦闘ログ配列
var battleLogLive = [];
// セッション履歴ログ
var sessionLogs = [];


// 表示切替
function showSection(sectionIds) {
    const allSections = [
        "startMenu",
        "gameUI",
        "logPanel",
        "sessionLogPanel",
        "restartMenu",
        "instructionsPanel",
        "enemyListPanel",
        "characterListPanel",
        "precureImg"
    ];

    allSections.forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;
        element.style.display = sectionIds.includes(id) ? "block" : "none";
    });
}


// ゲーム開始関数
function startGame() {
    // 名前の取得
    const playerInput = document.getElementById("playerInput").value.trim();
    // キャラクターの取得
    const characterType = document.getElementById("characterSelect").value;

    // 入力チェック
    if (playerInput === "") {
        alert("名前を入力してください！");
        return;
    }

    if (characterType === "") {
        alert("キャラクターを選んでください！");
        return;
    }
    // 選択されたキャラに応じてステータス設定
    player = getCharacterStatus(characterType, playerInput);
    // 名前を画面に表示
    document.getElementById("playerNameLabel").textContent = player.name;
    document.getElementById("playerNameText").textContent = player.name;

    // document.getElementById("playerName").textContent = player.name;

    // 敵生成処理
    generateEnemy();

    // ログの初期化
    battleLogLive = [];
    document.getElementById("battleLog").innerHTML = "";

    // HPバーなど表示更新
    updateDisplay();

    // 表示パネル切り替え
    showSection(["gameUI", "logPanel"]);

    // キャラクターを画面表示
    document.getElementById("charClassLabel").textContent = {
        sky: "キュアスカイ",
        prism: "キュアプリズム",
        wing: "キュアウイング",
        butterfly: "キュアバタフライ",
        majesty: "キュアマジェスティ",
        elle: "エルちゃん",
        shalala: "シャララ隊長"
    }[characterType];
}

// DOMの読み込みが完了したら初期化関数を呼び出す
window.addEventListener("DOMContentLoaded", () => {
    setupInputEnterKey();
    setupCharacterSelector();
});

// プレイヤー名入力欄でEnterキーを押したらゲームを開始
function setupInputEnterKey() {
    const inputEl = document.getElementById("playerInput");
    inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            startGame();
        }
    });
}

// キャラクター選択時に画像を切り替える
function setupCharacterSelector() {
    const characterSelect = document.getElementById("characterSelect");
    const characterImage = document.getElementById("characterImagePlayer");

    // 選択されたキャラクターに応じて画像のパスを設定
    characterSelect.addEventListener("change", () => {
        const type = characterSelect.value;

        let src = "";
        switch (type) {
            case "sky":
                src = "img/cure_sky.png";
                break;
            case "prism":
                src = "img/cure_prizm.png";
                break;
            case "wing":
                src = "img/cure_wing.png";
                break;
            case "butterfly":
                src = "img/cure_butterfly.png";
                break;
            case "majesty":
                src = "img/cure_majesty.png";
                break;
            case "elle":
                src = "img/elle.png";
                break;
            case "shalala":
                src = "img/captain_shalala.png";
                break;
            default:
                src = "";
        }

        if (src) {
            // キャラクター画像を表示し、フェードインアニメーションを適用

            characterImage.src = src;
            characterImage.style.display = "block";
            characterImage.style.opacity = 0;
            characterImage.style.transition = "opacity 0.8s ease-in";
            setTimeout(() => {
                characterImage.style.opacity = 1;
            }, 50);
        } else {
            // 無効な選択肢の場合は画像を非表示にする
            characterImage.style.display = "none";
        }
    });
}

// 敵生成
function generateEnemy() {
    // 敵候補リストを定義
    const types = ["カバトン", "バッタモンダー", "ミノトン", "カイゼリン", "スキアヘッド", "カイザー"];

    // ランダムで1体選出
    const selected = types[Math.floor(Math.random() * types.length)];

    // 敵オブジェクトに名前を設定
    enemy.name = selected;

    // HP・攻撃力の設定
    switch (selected) {
        case "カバトン":
            enemy.hp = 60;
            enemy.maxHP = 60;
            enemy.attack = 30;
            break;
        case "バッタモンダー":
            enemy.hp = 100;
            enemy.maxHP = 100;
            enemy.attack = 20;
            break;
        case "ミノトン":
            enemy.hp = 130;
            enemy.maxHP = 130;
            enemy.attack = 45;
            break;
        case "カイゼリン":
            enemy.hp = 90;
            enemy.maxHP = 90;
            enemy.attack = 35;
            break;
        case "スキアヘッド":
            enemy.hp = 250;
            enemy.maxHP = 250;
            enemy.attack = 50;
            break;
        case "カイザー":
            enemy.hp = 800;
            enemy.maxHP = 800;
            enemy.attack = 80;
            break;
    }

    // 画面に敵名を表示
    document.getElementById("enemyName").textContent = enemy.name;
    // 敵画像を切り替える
    const characterImage = document.getElementById("characterImageEnemy");
    let src = "";

    switch (selected) {
        case "カバトン":
            src = "img/kabaton2.png";
            break;
        case "バッタモンダー":
            src = "img/monda.png";
            break;
        case "ミノトン":
            src = "img/minoton.png";
            break;
        case "カイゼリン":
            src = "img/kaizerin.png";
            break;
        case "スキアヘッド":
            src = "img/sukiahead.png";
            break;
        case "カイザー":
            src = "img/kaizer.png";
            break;
    }

    if (src) {
        characterImage.src = src;
        characterImage.style.display = "block";
        characterImage.style.opacity = 0;
        characterImage.style.transition = "opacity 0.8s ease-in";
        setTimeout(() => {
            characterImage.style.opacity = 1;
        }, 30);
    } else {
        characterImage.style.display = "none";
    }
}

// ダメージ計算
function getAttackDamage(base) {
    // 会心の一撃かどうか判定
    const criticalHit = Math.random() < 0.1;
    // 基本ダメージを生成
    let damage = Math.floor(Math.random() * (base - 4)) + 5;
    // 会心の一撃が適用されたら
    if (criticalHit) {
        damage = Math.floor(damage * 1.8);
        log("⚡ 会心の一撃！")
    }
    return damage;
}

// 戦闘ログ
function log(message) {
    // ログ表示エリアを取得
    const logBox = document.getElementById("battleLog");
    // p要素生成
    const p = document.createElement("p");
    // メッセージ代入
    p.textContent = message;
    // 表示領域に追加
    logBox.appendChild(p);

    // スクロールを最下部に移動
    logBox.scrollTop = logBox.scrollHeight;
    battleLogLive.push(message);
}

// プレイヤーの攻撃
function playerAttack() {
    if (player.hp <= 0 || enemy.hp <= 0) {
        return;
    }

    const missed = Math.random() < 0.12;
    // 命中失敗したら
    if (missed) {
        log(`💨 ${enemy.name} は攻撃をかわした！`);
        // 成功
    } else {
        const damage = getAttackDamage(player.attack);
        enemy.hp = Math.max(0, enemy.hp - damage);
        log(`${player.name}の攻撃 → ${enemy.name}に ${damage}ダメージ！`);
    }

    // 表示更新
    updateDisplay();
    if (enemy.hp <= 0) {
        endGame("win");
        return;
    }
    setTimeout(enemyAttack, 600);
}

// 敵からの攻撃
function enemyAttack() {
    const missed = Math.random() < (player.defending ? 0.3 : 0.12);
    if (missed) {
        log(`💨 ${player.name} は攻撃をかわした！`);

        // 防御成功時にHPを5～20のランダム回復
        if (player.defending) {
            const recover = Math.floor(Math.random() * 16) + 5;
            player.hp = Math.min(player.maxHP, player.hp + recover);
            log(`✨ 防御成功！ ${player.name}のHPが${recover}回復！`);
        }
    } else {
        // 敵のダメージ算出
        let damage = Math.floor(Math.random() * (enemy.attack - 4)) + 5;

        // 痛恨の一撃判定
        if (Math.random() < 0.1) {
            damage = Math.floor(damage * 1.8);
            log(`⚠️ ${enemy.name}の痛恨の一撃をくらう！`);
        }

        // 防御中はダメージ半減
        if (player.defending) {
            damage = Math.floor(damage / 2);
        }

        player.hp = Math.max(0, player.hp - damage);
        log(`${enemy.name}の攻撃 → ${player.name}に ${damage}ダメージ！`);

        // 防御フラグを解除
        player.defending = false;
        // HP更新
        updateDisplay();
        // プレイヤーHPが0だったら
        if (player.hp <= 0) {
            endGame("lose");
        }
    }
}

// 防御アクション
function defendAction() {
    // 防御フラグ
    player.defending = true;
    // ログ
    log(`${player.name}は防御の体制に入った！`);
    // 0.6秒後に処理実行
    setTimeout(enemyAttack, 600);
}

// ポーション使用
function usePotion() {
    // ポーション使用不可
    if (player.potionUsed === true || player.hp <= 0 || enemy.hp <= 0) {
        alert("使用できません！");
        return;
        // ポーション使用可能
    } else {
        // HPを25回復
        player.hp = Math.min(player.maxHP, player.hp + 25);
        // ポーション使用フラグ
        player.potionUsed = true;
        // ログ
        log(`${player.name}はポーションを使った！ HPが25回復！`);
        // HP更新
        updateDisplay();

        // ボタンを無効化
        document.getElementById("potionButton").disabled = true;
    }
}

// HP表示更新
function updateDisplay() {
    // プレイヤーと敵のHP
    const entities = [
        { obj: player, barId: "playerHPBar", textId: "playerHP" },
        { obj: enemy, barId: "enemyHPBar", textId: "enemyHP" }
    ];

    entities.forEach(({ obj, barId, textId }) => {
        const percent = Math.floor(obj.hp / obj.maxHP * 100);
        const barEl = document.getElementById(barId);
        const txtEl = document.getElementById(textId);

        // テキストとバーの幅を更新
        txtEl.textContent = obj.hp;
        barEl.textContent = percent + "%";
        barEl.style.width = percent + "%";

        // 色を変更
        barEl.classList.remove("high", "mid", "low");
        if (percent > 50) barEl.classList.add("high");
        else if (percent > 20) barEl.classList.add("mid");
        else barEl.classList.add("low");
    });
}

// 戦闘終了
function endGame(result) {
    log(result === "win" ? `🎉 勝利！ ${player.name}の勝ち！`
        : `💀 敗北… ${enemy.name}の勝ち。`);

    // 改行区切りでログをテキスト化
    sessionLogs.push(battleLogLive.join("\n"));
    // セッション履歴を表示
    displaySessionLogs();
    // 表示パネル切り替え
    showSection(["restartMenu", "sessionLogPanel"]);
}

// ゲーム再スタート
function restartGame() {
    // 入力欄を空文字にする
    document.getElementById("playerInput").value = "";
    // 戦闘ログを空にする
    battleLogLive = [];
    document.getElementById("battleLog").value = "";

    document.getElementById("characterSelect").value = "";
    // 表示パネル切り替え
    showSection(["startMenu", "precureImg"]);

    document.getElementById("potionButton").disabled = false;
    player.potionUsed = false;
}

// セッション履歴表示
function displaySessionLogs() {
    const currentIndex = sessionLogs.length - 1;
    // セッションログを表示する親要素を取得
    const sessionLogPanel = document.getElementById("sessionLogPanel");
    sessionLogPanel.innerHTML = "";

    // セッション全体の見出し
    const title = document.createElement("h3");
    title.textContent = "セッション履歴";
    title.classList.add("session-title");
    sessionLogPanel.appendChild(title);

    sessionLogs.forEach((log, index) => {
        const logContainer = document.createElement("div");
        logContainer.classList.add("log-container");

        const headerRow = document.createElement("div");
        headerRow.classList.add("log-header");

        const logTitle = document.createElement("h4");
        logTitle.textContent = `戦闘${index + 1}`;

        // 表示／非表示トグルボタン
        const toggleButton = document.createElement("button");
        toggleButton.textContent = "▼ 非表示";

        const logContent = document.createElement("pre");
        logContent.textContent = log;

        logContent.classList.add("log-content");
        // ログ内容を表示状態にしておく
        // logContent.style.display = "block";

        // logContent.style.display を "none" に設定（初期状態）しておく
        logContent.style.display = (index === currentIndex) ? "block" : "none";  // 現在のインデックスだけ表示
        toggleButton.textContent = (index === currentIndex) ? "▼ 非表示" : "▶ 表示";  // ボタンも連動

        // ボタンをクリック
        toggleButton.addEventListener("click", () => {
            const isHidden = logContent.style.display === "none";
            logContent.style.display = isHidden ? "block" : "none";
            toggleButton.textContent = isHidden ? "▼ 非表示" : "▶ 表示";
        });

        // タイトルとボタンをヘッダー行に追加
        headerRow.appendChild(logTitle);
        headerRow.appendChild(toggleButton);

        // ヘッダーとログ本文を1つのログブロックにまとめる
        logContainer.appendChild(headerRow);
        logContainer.appendChild(logContent);
        sessionLogPanel.appendChild(logContainer);
    });

    sessionLogPanel.style.display = "block";
}

// ログ保存
function downloadSessionLog() {
    // ログを「=== 次戦 ===」という区切りで1つの文字列にする
    const fullLog = sessionLogs.join("\n\n=== 次戦 ===\n\n");
    // 文字列をBlobに変換
    const blob = new Blob([fullLog], { type: "text/plain" });
    // Blobから一時的なURLを生成
    const url = URL.createObjectURL(blob);
    // ダウンロード用のリンク要素を作成
    const link = document.createElement("a");
    link.href = url;
    link.download = "session_log.txt";
    // リンクを自動的にクリックしてダウンロード
    link.click();
    // 使用後のURLオブジェクトを解放
    URL.revokeObjectURL(url);
}


// 操作説明の表示・非表示をトグルする関数
function showInstructions() {
    const panel = document.getElementById("instructionsPanel");

    // トグル処理
    if (panel.style.display === "block") {
        panel.style.display = "none";
        return;
    }

    // 説明テキスト
    const instructions = `
◆ ゲーム操作の説明 ◆

🔰 ゲームの流れ：
1. 名前を入力して、好きなキャラクターを選びます。
2. 「ゲーム開始」ボタンを押します。
3. 敵がランダムに登場します。
4. 下記の行動から選択してターンを進めます。

🎮 プレイヤーの行動：
🗡 攻撃する：敵にダメージを与える。時々「会心の一撃」で大ダメージ！
🛡 防御する：敵の攻撃を避けやすくなり、回避成功時は少し回復します。
🥝 ポーション：HPが20回復（1回のみ使用可能）
👊🏻 必殺技：プリキュアのみ表示される。

👾 敵の行動：
敵は毎ターン攻撃を仕掛けてきます。
稀に「痛恨の一撃」で大ダメージを受けることも…

📜 その他の機能：
- 戦闘ログがリアルタイムで表示されます。
- プレイ履歴はセッションログとして記録されます。
- 戦闘後は「再戦」や「ログ保存」ができます。
`;

    // 表示処理
    panel.textContent = instructions;
    panel.style.display = "block";

    // 表示パネル切り替え
    showSection(["startMenu", "instructionsPanel", "precureImg"]);
}

// 敵情報表示
function showEnemyList() {
    // パネルの要素を取得
    const panel = document.getElementById("enemyListPanel");

    // トグル処理
    if (panel.style.display === "block") {
        panel.style.display = "none";
        return;
    }

    const enemyInfo = `
◆ 敵の種類一覧 ◆

カバトン：
HP: 50 / 攻撃力: 30
アンダーグ帝国の暴れん坊。
強いやつこそが正しいと思っている。口癖は「オレ、TUEEE！」

バッタモンダー：
HP: 80 / 攻撃力: 20
アンダーグ帝国のひねくれもの。じつはすごくプライドが高い。

ミノトン：
HP: 140 / 攻撃力: 50
アンダーグ帝国の武人。プリキュアに正々堂々と戦いを挑んでくる。

カイゼリン：
HP: 100 / 攻撃力: 24
現在のアンダーグ帝国の支配者。300年前の恨みを晴らすため、
プリンセスであるエルちゃんやプリキュアに襲いかかる。

スキアヘッド：
HP: 300 / 攻撃力: 80
何を考えているかわからない、冷たく恐ろしい存在。
ただ一言唱えるだけでアンダーグ・エナジーを様々な形で行使できる。

カイザー：
HP: 1000 / 攻撃力: 100
300年前におけるアンダーグ帝国の前代皇帝で、カイゼリンの父。
「力が全て」を豪語する傲岸不遜な暴君。

それぞれ異なる戦術が求められるよ！
`;

    // テキスト内容をパネルに表示
    panel.textContent = enemyInfo;
    panel.style.display = "block";

    // 表示パネル切り替え
    showSection(["startMenu", "enemyListPanel", "precureImg"]);
}

// キャラクター選択
function getCharacterStatus(characterType, name) {
    switch (characterType) {
        case "sky":
            return {
                name,
                hp: 150,
                maxHP: 150,
                attack: 50,
                defending: false,
                potion: false
            };
        case "prism":
            return {
                name,
                hp: 90,
                maxHP: 90,
                attack: 25,
                defending: false,
                potion: false
            };
        case "wing":
            return {
                name,
                hp: 100,
                maxHP: 100,
                attack: 45,
                defending: false,
                potion: false
            };
        case "butterfly":
            return {
                name,
                hp: 110,
                maxHP: 110,
                attack: 30,
                defending: false,
                potion: false
            };
        case "majesty":
            return {
                name,
                hp: 100,
                maxHP: 100,
                attack: 65,
                defending: false,
                potion: false
            };
        case "elle":
            return {
                name,
                hp: 60,
                maxHP: 60,
                attack: 25,
                defending: false,
                potion: false
            };
        case "shalala":
            return {
                name,
                hp: 300,
                maxHP: 300,
                attack: 100,
                defending: false,
                potion: false
            };
    }
}

// キャラクター情報表示
function showCharacterList() {
    // パネルの要素を取得
    const panel = document.getElementById("characterListPanel");

    // 表示されていれば非表示
    if (panel.style.display === "block") {
        panel.style.display = "none";
        return;
    }

    const characterInfo = `
◆ キャラクターの種類一覧 ◆

🩵キュアスカイ：
HP: 150 / 攻撃力: 50
運動神経抜群なスカイランドの女の子。
幼いころピンチから救ってくれた憧れの人のようなヒーローになるため、
まじめに一生懸命に日々鍛錬中！口癖は「ヒーローの出番です！」

🤍キュアプリズム：
HP: 90 / 攻撃力: 25
優しく思いやりのある女の子。
料理や自然についての知識もたくさんもっていて物知り。あだ名は「ましろん」

🧡キュアウイング：
HP: 100 / 攻撃力: 45
鳥型の妖精・プニバード族の12歳の男の子。
高く飛ぶことはできないが人の姿になることができる種族に生まれた。

🩷キュアバタフライ：
HP: 110 / 攻撃力: 30
常に全力で、誰とでもすぐに仲良くなれるましろの幼馴染。
おしゃれで楽しいコトが大好きな頼りになる明るいお姉さん。
「アゲてくよ！」が口癖。

💜キュアマジェスティ：
HP: 100 / 攻撃力: 65
スカイランドの王女であるエルちゃんが変身するプリキュア。
みんなを守りたいと強く願った時、その祈りに答えるように姿を現した。
淑女らしい落ち着いた雰囲気になり、優雅なふるまいを見せる。

🥰エルちゃん：
HP: 60 / 攻撃力: 25
まだまだ幼いスカイランドの王女さま。
「ぷいきゅあ～！」の叫び声と共にプリキュア変身アイテムである
スカイトーンを生み出すなど未知数の力を持つ。

⚔️シャララ隊長：
HP: 300 / 攻撃力: 100
絶対的なカリスマ性と「スカイランド最強の剣士」の称号に相応しい実力を兼ね備えた、
国民から真のヒーローと慕われている存在。
キュアスカイの憧れのヒーローでもある。
`;
    // テキスト内容をパネルに表示
    panel.textContent = characterInfo;
    panel.style.display = "block";
    // 表示パネル切り替え
    showSection(["startMenu", "characterListPanel", "precureImg"]);
}


// キャラ選択で必殺技ボタンを切り替える
document.getElementById("characterSelect").addEventListener("change", function () {
    const selected = this.value;
    const buttons = document.querySelectorAll(".special-button");

    buttons.forEach((btn) => {
        btn.style.display = "none"; // 一旦すべて非表示
    });

    const selectedBtn = document.getElementById(`${selected}-special`);
    if (selectedBtn) {
        selectedBtn.style.display = "inline-block"; // 選ばれたキャラのボタンだけ表示
    }
});


// キャラ選択時、対応する必殺技ボタンだけ表示
document.getElementById("characterSelect").addEventListener("change", function () {
    const selected = this.value;

    // 全ボタン非表示
    document.querySelectorAll(".special-button").forEach((btn) => {
        btn.style.display = "none";
    });

    // 選ばれたキャラのボタンだけ表示
    const selectedBtn = document.getElementById(`${selected}-special`);
    if (selectedBtn) {
        selectedBtn.style.display = "inline-block";
    }
});

// プレイヤーの必殺技
function playerSkill() {
    if (player.hp <= 0 || enemy.hp <= 0) {
        return;
    }

    // 攻撃失敗：10%の確率
    const failChance = Math.random();
    if (failChance < 0.05) {
        log(`💨 ${enemy.name} は必殺技をかわした！`);
    } else {
        const skillDamage = Math.floor(Math.random() * 51) + 100;
        enemy.hp = Math.max(0, enemy.hp - skillDamage);
        log(`🌟 ${player.name}の必殺技！ → ${enemy.name}に ${skillDamage}ダメージ！`);

        updateDisplay();

        if (enemy.hp <= 0) {
            endGame("win");
            return;
        }
        setTimeout(enemyAttack, 600);
    }
}

// 必殺技ボタンにイベントを設定
document.querySelectorAll(".special-button").forEach((btn) => {
    btn.addEventListener("click", () => {
        playerSkill();
    });
});

// $('select').multipleSelect({
//     width: 200,
//     onOpen: function () {
//         alert("キャラクターを２人まで選べるよ！");
//     },
//     onCheckAll: function () {
//         alert("全選択した際のalert");
//     }
// });




