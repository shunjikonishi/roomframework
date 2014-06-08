# Roomframework
RoomframeworkはSPA(Single Page Application)開発のためのアプリケーションフレームワークです。  
最も中核となる機能はWebSocketの扱いを容易にするためのラッパークラスであり他のフレームワークと組み合わせて使用することも容易です。

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

requestメソッドではjQueryのajaxと同じ様にsuccess/error時のコールバックを指定できます。(completeはありません。また今のところDefferedには対応していません。)

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
	data: "Hello world!"
});
```

### コンストラクタ
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

### メソッド



### メッセージ構造
