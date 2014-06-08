# Roomframework
RoomframeworkはSPA(Single Page Application)開発のためのアプリケーションフレームワークです。  
最も中核となる機能はWebSocketの扱いを容易にするためのラッパークラスであり他のフレームワークと組み合わせて使用することも簡単です。

## 機能
このライブラリで提供される主な機能は以下です。

- WebSocket関連(room.connection.js)
  - WebSocketラッパー
  - 再接続管理
  - トークン管理
  - Ajaxライクなリクエストハンドリング
  - メッセージハンドラ登録
- Cache関連(room.cache.js)
  - WebStorageラッパー
- Logger関連(room.logger.js)
  - WebSocketLogger

> WebSocket関連の機能を使用するためにはサーバサイドでもそれに合わせた実装が必要です。
> 現在サーバサイドの実装としてはPlayframework用の実装([roomframework-play](https://github.com/shunjikonishi/roomframework-play))があります。

## ファイル構成
- src/room.*.js
- dist/room.*.min.js
- dist/roomframework[.min].js

全機能を含んだファイルはroomframework[.min].jsです。  
WebSocket関連の機能だけ使用するのであればroom.connection[.min].js単体でも使用できます。

## Getting started
ws(s)のURLを引数にroom.Connectionのインスタンスを生成し、requestメソッドでメッセージを送信します。

requestメソッドではjQueryのajaxと同じ様にsuccess/error時のコールバックを指定できます。

また、onメソッドでコマンドに対応するコールバックを登録しておくことができます。

```javascript
var ws = new room.Connection("ws://room-sandbox.herokuapp.com/gettingstarted");
ws.on("chat", function(data) {
	console.log("EventHandler: " + data);
});
ws.request({
	command: "chat",
	data: "Hello world!",
	success: function(data) {
		console.log("Call and response: " + data);
	},
});
ws.request({
	command: "chat",
	data: "Hello world again!"
});
```

[room-sandbox.herokuapp.com](http://shunjikonishi.github.io/room-sandbox/)は同一URLに接続しているすべてのクライアントに送信したメッセージをそのまま投げ返すだけのWebSocketサーバです。  
上記のスクリプトを実行すると以下の結果がconsoleに出力されます。

```
Call and response: Hello world!
EventHandler: Hello world again!
```

最初のリクエストに対するレスポンスはrequestメソッドで指定したsuccess関数で処理され、success関数を指定しなかった２回目のリクエストではonで登録したイベントハンドラによってレスポンスが処理されています。

## メッセージ構造
このフレームワークでは送受信するメッセージを以下のフォーマットに限定しています。  
送信メッセージに付いてはrequestメソッドで自動的に生成されるので特に意識する必要はありません。

サーバサイドの実装を行う場合はメッセージ構造を以下にあわせて実装してください。

#### 送信メッセージ
```
{
  "id" : number,       //メッセージ番号。requestメソッドによって自動的に付加されます。
  "command" : string,  //コマンド名
  "data" : any json    //任意のデータ
}
```
#### 受信メッセージ
```
{
  "id" : number,       //対応するリクエストのメッセージ番号。サーバ発信のメッセージの場合は存在しない
  "command" : string,  //コマンド名
  "type" : string,     //json, html, text, errorのいずれか。errorの場合はエラーメッセージとして処理される
  "data" : any json    //任意のデータ
}
```


## コンストラクタ
コンストラクタの引数はws(s)のURL文字列、またはurlとその他のオプションを含むハッシュです。  
指定できるオプションとそのデフォルト値は以下です。

|パラメータ名|デフォルト値|説明                           |
|:-------|:-------|:------------------------------|
|url|必須|接続するws(s)のURL|
|maxRetry|5|切断時に再接続を試みる回数|
|retryInterval|1000|リトライ間隔(ミリ秒)。切断後、初回のリトライは即時に行われますがその後はリトライ回数 * 指定時間のインターバルをとります。|
|logger|null|デバッグログの出力クラス。通常はconsoleを渡します。|
|authToken|null|指定した場合、接続確立後にこのトークンがauthCommandで送信されます。|
|authCommand|room.auth|authTokenを指定している場合、接続確立後にこのコマンドでトークンが送信されます。|
|authError|null|authCommandがエラーになった場合に実行されるコールバック関数を指定します。<br>関数の引数はレスポンスのdataオブジェクトです。|
|onOpen|null|WebSocket#onopenイベント発生時に実行されるコールバック関数を指定します。<br>関数の引数はeventオブジェクトです。|
|onClose|null|WebSocket#oncloseイベント発生時に実行されるコールバック関数を指定します。<br>関数の引数はeventオブジェクトです。|
|onMessage|null|メッセージ受信時に実行されるコールバック関数を指定します。<br>関数の引数はeventオブジェクトです。|
|onSocketError|null|WebSocket#onerrorイベント発生時に実行されるコールバック関数を指定します。<br>関数の引数はeventオブジェクトです。|
|onRequest|null|requestメソッド実行時に実行されるコールバック関数を指定します。<br>関数の引数はコマンド名とパラメータです。|
|onServerError|null|エラーレスポンス受信時の共通のエラーハンドラ関数を指定します。<br>関数の引数はレスポンスのdataオブジェクトです。|

## メソッド
### request(params): void
- params: object

コマンドメッセージを送信します。  
paramsには以下のキーを含むことができます。

|キー|データ型|説明|
|:--|:--|:--|
|command|string|コマンド名。必須|
|data|any|送信するデータ。任意のJSON化可能なオブジェクト|
|success|function|正常レスポンスのコールバック関数。関数の引数はレスポンスのdata|
|error|function|エラーレスポンスのコールバック関数。関数の引数はレスポンスのdata|

success, errorを指定しなかった場合はonで登録したイベントハンドラ、またはonServerErrorで指定した共通エラーハンドラでレスポンスは処理されます。

### on(name, successFunc[, errorFunc]): this
- name: コマンド名
- successFunc: 正常メッセージのコールバック関数。関数の引数はメッセージのdata
- errorFunc: エラーメッセージのコールバック関数。関数の引数はメッセージのdata(省略可)

サーバからのメッセージに対応するイベントハンドラを登録します。

### off(name): this
- name: コマンド名

onで登録済みのイベントハンドラを削除します。

### isConnected(): boolean
WebSocketが接続済みであるかどうかを返します。

### close(): void
WebSocketをクローズします。

### sendNoop(interval[, sendIfHidden][, commandName]): int
- interval: 定期実行の間隔(ミリ秒)
- sendIfHidden: ブラウザが非アクティブ状態の場合も実行するか。省略時はfalse
- commandName: 送信するメッセージのコマンド名。省略時は「noop」

定期的にnoopメッセージ(何もしないメッセージ)を送信します。
実行を解除する場合は返り値のintをclearIntervalします。

### onOpen(func): this
- func: コールバック関数。引数はeventオブジェクト

WebSocketのonopenイベントで実行するコールバック関数を指定します。

### onClose(func): this
- func: コールバック関数。引数はeventオブジェクト

WebSocketのoncloseイベントで実行するコールバック関数を指定します。

### onMessage(func): this
- func: コールバック関数。引数はeventオブジェクト

WebSocketのonmessageイベントで実行するコールバック関数を指定します。

### onSocketError(func): this
- func: コールバック関数。引数はeventオブジェクト

WebSocketのonerrorイベントで実行するコールバック関数を指定します。

### onRequest(func): this
- func: コールバック関数。引数はrequestメソッドに渡されたcommandとdata

requestメソッド実行時に実行するコールバック関数を指定します。


### onServerError(func): this
- func: コールバック関数。引数はメッセージのdata

共通のエラーメッセージハンドラを指定します。  
requestのerror関数、またはonで登録されたエラーハンドラが実行された場合は実行されません。

