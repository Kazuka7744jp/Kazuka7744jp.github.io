// 【現状のコードの問題点（リファクタリングの余地）】
// グローバル変数・ローカル変数で定義すべきものが途中でよくわからなくなり
// 無駄な定義がありそう
// 繰り返しの処理をより簡略に記述できそう
// データベースとの連携がまだできていない
// （このままだとサイトをリフレッシュした瞬間すべて消える）

// 名前がインプットされるFormの要素を変数に格納
const nameElem = document.getElementById("name");
// 組織が選択されるFormの要素を変数に格納
const orgElem = document.getElementById("org");
// 業務用アプリが選択されるFormの要素を変数に格納
const appElem = document.getElementById("trying_app");

// 業務用アプリ別に、メンバーを登録するリストの要素を変数に格納
// これが追加していく元となるリストになる
// [0]をつけないとタグHtmlcollection（配列そのものを）持ってきてしまう
const appsList = document.getElementsByClassName("apps")[0];
const teamsList = document.getElementsByClassName("teams")[0];
const autoList = document.getElementsByClassName("automate")[0];
const biList = document.getElementsByClassName("bi")[0];
const funcList = document.getElementsByClassName("func")[0];
const macroList = document.getElementsByClassName("macro")[0];
const spoList = document.getElementsByClassName("spo")[0];
const etcList = document.getElementsByClassName("etc")[0];

// メンバーを登録するリストのタイトルの配列。このあとのchangeColorsToBlackのために定義
const appsTitleArr = ["title_teams", "title_apps", "title_automate", "title_bi", "title_func", "title_macro" ,"title_spo","title_etc"];
// リストのタイトル文字をすべて黒くする関数（色を初期化する役割。アロー関数で記載）
const changeColorsToBlack = () => {
    for (const title of appsTitleArr){
        document.getElementById(title).style.color = "black";
    }
}

//メンバーを登録していく関数（関数式＋高階関数＋アロー関数で記載）
const addMember = name => {
    // 追加するリスト要素をまずつくる
    const listElem = document.createElement("li");
    // 選択された組織情報の値を変数に格納
    const selectedOrg = orgElem.value;
    // 選択されたアプリを変数の値を変数に格納
    const selectedApp = appElem.value; 
    // 選ばれたアプリに基づき、リストに組織・名前をいれる
    if(selectedApp === "Teams") {
        const appendedList = teamsList.appendChild(listElem);
        appendedList.innerHTML= selectedOrg  + "  " + name + " ";
        // メンバーが登録されたアプリのタイトルを赤くする
        changeColorsToBlack();
        document.getElementById("title_teams").style.color = "red";
    } else if(selectedApp === "automate") {
        const appendedList = autoList.appendChild(listElem);
        appendedList.innerHTML= selectedOrg  + "  " + name + " ";
        changeColorsToBlack();
        document.getElementById("title_automate").style.color = "red";
    } else if(selectedApp ==="apps") {
        const appendedList = appsList.appendChild(listElem);
        appendedList.innerHTML= selectedOrg  + "  " + name + " ";
        changeColorsToBlack();
        document.getElementById("title_apps").style.color = "red";    
    } else if(selectedApp ==="bi") {
        const appendedList = biList.appendChild(listElem);
        appendedList.innerHTML= selectedOrg  + "  " + name + " ";
        changeColorsToBlack();
        document.getElementById("title_bi").style.color = "red";       
    } else if (selectedApp ==="func") {
        const appendedList = funcList.appendChild(listElem);
        appendedList.innerHTML= selectedOrg  + "  " + name + " ";
        changeColorsToBlack();
        document.getElementById("title_func").style.color = "red"; 
    } else if(selectedApp ==="macro") {
        const appendedList = macroList.appendChild(listElem);
        appendedList.innerHTML= selectedOrg  + "  " + name + " ";
        changeColorsToBlack();
        document.getElementById("title_macro").style.color = "red"; 
    } else if(selectedApp ==="spo") {
        const appendedList = spoList.appendChild(listElem);
        appendedList.innerHTML= selectedOrg  + "  " + name + " ";
        changeColorsToBlack();
        document.getElementById("title_spo").style.color = "red"; 
    } else if(selectedApp ==="etc") {
        const appendedList = etcList.appendChild(listElem);
        appendedList.innerHTML= selectedOrg  + "  " + name + " ";
        changeColorsToBlack();
        document.getElementById("title_etc").style.color = "red"; 
    }

    //登録と同時に削除ボタンをつくる
    // ボタンの要素を変数に格納する
    const deleteButton = document.createElement("button");
    // ボタンの中の文字列を入力
    deleteButton.innerHTML = "削除";
    // 上記で追加した情報に削除ボタンを追加する
    listElem.appendChild(deleteButton);
    //削除ボタンに、クリックした時に発動されるイベントを付与（アロー関数）
    // 関数の仮引数で、コールバック関数を定義
    deleteButton.addEventListener("click", evt => {
        // 「ユーザーエージェントに、
        // イベントが明示的に処理されない場合にその既定のアクションを
        // 通常どおりに行うべきではないことを伝えます。」とMDNに書いてあった。
        // これがいるのかよくわからなかった。
        evt.preventDefault();
        // 登録されたメンバーを削除する関数。以下の関数は、まだ定義していないが、
        // 関数の巻き上げ（ホイスティング）が起きるから大丈夫
        deleteMember(deleteButton);
    });

    // 入力・選択したものを初期化する
    orgElem.value = "unselected";
    appElem.value = "unselected";
    nameElem.value = "";
};

//削除ボタンに付与する、登録したメンバーを削除する関数。
// 関数式＋アロー関数で定義
const deleteMember = (deleteButton) => {
    // 確認を表示し、キャンセルの場合は、リターンで処理を中断
    if (!(window.confirm("本当に削除しますか？"))) {
        return;
      }
    //　closest() メソッドは、要素とその親 (文書ルートに向かって) を、
    // 指定されたセレクター文字列に一致するノードが見つかるまで探索（MDNより）
    const selectedMember = deleteButton.closest("li");
    // 選ばれた要素の親要素をparentNodeで特定し、削除する
    selectedMember.parentNode.removeChild(selectedMember);
    
};

// メンバーを登録するFormの要素を変数に格納
const submitElem = document.getElementById("member_submit");

//登録ボタンをクリックした時に発動するイベント（リストに名前などが追加）
submitElem.addEventListener('click', evt => {
    // 入力されている名前のデータを変数に格納
    const enteredName = nameElem.value;
    // 選択された組織のデータを変数に格納
    const selectedOrg = orgElem.value;
    // 選択されたアプリのデータを変数に格納
    const selectedApp = appElem.value;

    // 各登録項目に空欄があった場合、アラームを出し、リターンで処理を中断する
    if (enteredName === "") {
        alert("名前を入力してください");
        return;
    } else if(selectedOrg === "unselected") {
        alert("組織を選択してください");
        return;
    } else if (selectedApp === "unselected") {
        alert("業務用アプリを選択してください");
        return;
    }
    evt.preventDefault();
    // メンバーを登録していく関数    
    addMember(enteredName);
});

// ランダムでアプリの説明を表示する関数
const appName = document.getElementById("app_name");
const appExplanation = document.getElementById("app_explanation");

const geekBoyExample = () => {
    // 0～7までのランダムな数字を生成し、変数に格納する
    const randomNum = Math.random()*7 ;
    if (randomNum < 1) {
        appName.value = "Teams" ;
        appExplanation.value 
        = "Teamsはリモート会議やチャットだけでなく、チームをつくり、そこに様々なアプリを連携させることで、自分オリジナルの城を造れるよ。今日から君も一国一城の主だ！"
        changeColorsToBlack();
        document.getElementById("title_teams").style.color = "red";

    } else if (randomNum < 2) {
        appName.value = "PowerApps" ;
        appExplanation.value 
        = "PowerAppsはみんなが日頃使うようなPC・モバイルアプリを、難しいプログラミングなしでつくることができる。君だけのオリジナルアプリで、養成所を、トヨタを救ってみないかい？"
        changeColorsToBlack();
        document.getElementById("title_apps").style.color = "red";
    
    } else if (randomNum < 3) {
        appName.value = "PowerAutomate" ;
        appExplanation.value 
        = "PowerAutomateは、複数の業務用アプリをまたいで、難しいプロミングなしで自分の業務を自動化できる。朝起きたら自分の仕事を終わらせてくれる、自分だけの妖精を作ってみないかい？"
        changeColorsToBlack();      
        document.getElementById("title_automate").style.color = "red";
        
    } else if (randomNum < 4) {
        appName.value = "PowerBI" ;
        appExplanation.value 
        = "PowerBIは、簡単に言えば、動くExcelだ。「見たかったのはこんなグラフではない」と言われて冷や汗をかいてた君も、その場で見たいデータ項目を選択すれば、PowerBIの魔法で、グラフが生まれ変わるぞ！"
        changeColorsToBlack(); 
        document.getElementById("title_bi").style.color = "red";
        
    } else if (randomNum < 5) {
        appName.value = "Excel(関数)" ;
        appExplanation.value
        = "今やっているExcelの手作業が当たり前だと思っているかもしれないけれど、世の中には、それを一発でやってくれる奇跡の関数が存在するかも。そんな奇跡を見つける旅にでかけてみないかい?"
        changeColorsToBlack();
        document.getElementById("title_func").style.color = "red";

    } else if (randomNum < 6) {
        appName.value = "Excel(マクロ)" ;
        appExplanation.value
        = "Excelはある程度使いこなして来たという君も、マクロという入り口にはなかなか立てていないんじゃないかな？マクロを覚えて、Excel業務などを自動化できれば、君も今日からExcelマスターだ！"
        changeColorsToBlack();
        document.getElementById("title_macro").style.color = "red";
    
    } else if (randomNum < 7) {
        appName.value = "SPO(サイト作り)" ;
        appExplanation.value
        = "SharePointOnlineのWeb作成機能を使えば、プログラミングなしで、トヨタ内に発信するWebページが開発できる。君の伝えたいメッセージ、7万人に届けてみないかい？"
        changeColorsToBlack();
        document.getElementById("title_spo").style.color = "red";
    }
}

// 少年の画像の要素を変数に格納する
const boyElem = document.getElementById("geek_boy");

// 少年の画像にクリックしたときに、説明を表示する関数を付与する
boyElem.addEventListener('click', evt => {
    evt.preventDefault();  
    geekBoyExample();
});
