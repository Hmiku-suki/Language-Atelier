export const notionTopicContent20260823 = {
  "jp-explain-data-types-message-passing": {
    title: "連携処理でデータ型と受け渡し方法を説明する",
    sourceId: "3c5d34cbae1981fc84e1f1cb51a675f3",
    markdown: `## 今日のテーマと学習目標
今天学习在 SAP Integration Suite、Groovy 或其他系统集成场景中，如何用日语准确说明数据的实际类型、目标组件所要求的类型，以及为什么某个值应该放在 Header、Property 或 Body 中。
学习目标：
- 区分“看起来像字符串”和“实际数据类型是字符串”
- 说明 Header、Property 与 Body 各自承担的角色
- 清楚表达类型不匹配和控制字符导致的错误
- 提出显式转换、传递位置调整和输入验证方案
- 避免用「なぜか動かない」「文字がおかしい」等模糊说法报告问题
## 実用的な語彙・表現
### 1. データ型
**读音：** データがた  
**中文：** 数据类型  
**语感与场景：** 指 String、List、Map、Integer 等程序能够区分的数据类别。技术说明中常简称为「型」。
> 値の見た目だけでなく、実行時のデータ型を確認してください。
请不要只看值的外观，还要确认运行时的数据类型。
### 2. 文字列として扱う
**读音：** もじれつとしてあつかう  
**中文：** 作为字符串处理  
**语感与场景：** 强调处理方式或目标类型，不一定表示原始值本来就是 String。
> 複数のユーザーIDをカンマ区切りの文字列として扱います。
把多个用户 ID 作为以逗号分隔的字符串处理。
### 3. 明示的に変換する
**读音：** めいじてきにへんかんする  
**中文：** 显式转换  
**语感与场景：** 在代码或配置中明确指定类型转换，避免依赖运行环境自动推断。
> Listをそのまま渡さず、必要な形式のStringへ明示的に変換します。
不要直接传递 List，而应显式转换成所需格式的 String。
### 4. 暗黙の型変換
**读音：** あんもくのかたへんかん  
**中文：** 隐式类型转换  
**语感与场景：** 系统在没有明确转换代码的情况下自动改变类型。虽然方便，但可能因组件或版本不同而产生意外行为。
> 暗黙の型変換に依存すると、実行環境によって結果が変わるおそれがあります。
如果依赖隐式类型转换，结果可能会因运行环境而变化。
### 5. 値を受け渡す
**读音：** あたいをうけわたす  
**中文：** 在组件或处理步骤之间传递值  
**语感与场景：** 「渡す」也可以，但「受け渡す」更强调发送方和接收方之间的交接。
> Groovyスクリプトから後続のRequest Replyへ、検索条件をPropertyで受け渡します。
通过 Property 将检索条件从 Groovy 脚本传递到后续的 Request Reply。
### 6. ヘッダーに設定する
**读音：** ヘッダーにせっていする  
**中文：** 设置到消息头中  
**语感与场景：** Header 通常用于路由、协议参数和短小的元数据，不适合无限制地存放多行正文或大型内容。
> Content-Typeやファイル名など、後続処理が参照するメタデータをヘッダーに設定します。
把 Content-Type、文件名等后续处理需要参照的元数据设置到 Header 中。
### 7. プロパティに保持する
**读音：** プロパティにほじする  
**中文：** 保存在消息属性中  
**语感与场景：** 常用于 iFlow 内部步骤之间共享值。能保存什么类型以及后续组件能否读取该类型，需要分别确认。
> 元の本文を後で復元できるよう、一時的にPropertyへ保持します。
为了之后能够恢复原始正文，暂时将其保存在 Property 中。
### 8. 本文に含める
**读音：** ほんぶんにふくめる  
**中文：** 包含在消息正文中  
**语感与场景：** Body 适合承载主要业务数据或多行内容。与 Header 相比，内容限制和用途不同。
> 改行を含む警告メッセージは、ヘッダーではなく本文または添付ファイルの内容に含めます。
包含换行的警告信息应放在正文或附件内容中，而不是 Header 中。
### 9. 期待する型
**读音：** きたいするかた  
**中文：** 组件预期、要求的数据类型  
**语感与场景：** 指接收方 API、适配器或方法根据接口契约要求的类型。
> このパラメーターが期待する型はStringですが、実際にはArrayListが渡されています。
该参数要求的类型是 String，但实际传入的是 ArrayList。
### 10. 型が一致しない
**读音：** かたがいっちしない  
**中文：** 类型不一致  
**语感与场景：** 比笼统的「型が違う」更适合技术报告，也可说「型の不一致」。
> 送信側と受信側で型が一致しないため、処理開始前に例外が発生しました。
由于发送方与接收方的数据类型不一致，处理开始前就发生了异常。
### 11. 制御文字
**读音：** せいぎょもじ  
**中文：** 控制字符  
**语感与场景：** 包括换行、制表符等不直接显示为普通字符的内容。某些协议字段明确禁止其中一部分字符。
> HTTPヘッダーには、CRやLFなどの制御文字を含めることができません。
HTTP Header 中不能包含 CR、LF 等控制字符。
### 12. 改行コード
**读音：** かいぎょうコード  
**中文：** 换行符、换行编码  
**语感与场景：** 常见形式包括 LF 与 CRLF。调查时应确认它出现在哪个字段，而不是只确认文本看起来是否换行。
> 添付ファイルの本文にはCRLFが必要ですが、ヘッダー値には入れられません。
附件正文中需要 CRLF，但 Header 值中不能包含它。
## 高階文法・文型
### 1. ～として扱う
表示按照某种身份、类型或用途处理对象。
> 数値に見える社員番号も、先頭のゼロを保持するため、文字列として扱います。
即使员工编号看起来像数字，为了保留开头的零，也应作为字符串处理。
与「～とみなす」相比：
- 「～として扱う」强调实际采用的处理方式
- 「～とみなす」表示根据规则把对象认定为某种状态
- 类型和数据处理说明通常使用「～として扱う」；规则判断可使用「未回答とみなす」
### 2. ～ない限り
表示只要前项条件不成立，后项就不会实现，常用于说明必要条件。
> ListをStringへ変換しない限り、このパラメーターには設定できません。
只要不把 List 转换成 String，就无法设置到该参数中。
与「～なければ」相比：
- 「～なければ」是一般必要条件
- 「～ない限り」强调前项是解除当前限制的关键条件
- 故障原因已明确时，使用「～ない限り」能突出必须采取的措施
### 3. ～に応じて
表示根据条件、类型或情况选择相应的处理方式。
> データの用途に応じて、Header、Property、Bodyを使い分けます。
根据数据用途，区别使用 Header、Property 和 Body。
与「～によって」相比：
- 「～によって」广泛表示原因、方式或差异
- 「～に応じて」强调针对不同条件采取相应措施
- 说明分支设计或分类处理时，「～に応じて」更贴切
### 4. ～かねない
表示某种不理想的结果有可能发生，属于正式且带警告意味的表达。
> エラーを避けるために改行をすべて削除すると、添付ファイルの可読性を損ないかねません。
如果只是为了避开错误而删除全部换行，可能会损害附件的可读性。
与「～可能性がある」相比：
- 两者都表示可能性
- 「～かねない」专门用于不希望发生的风险
- 技术评审中适合提醒某种临时修复可能造成新的问题
## 自然な会話
**场景：SAP Integration Suite 的 iFlow 中先后出现两个错误：partUserIdList 不是 String，以及邮件发送时 Header 中含有 CR/LF。**
**開発担当：**
> partUserIdListには「'00900680','00900660'」が入っているように見えますが、Request Replyで「Header/Property value is not a String」というエラーになります。
**アーキテクト：**
> 値の表示内容ではなく、実際の型は確認しましたか。ログにクラス名を出すと、StringなのかListなのかを切り分けられます。
**開発担当：**
> 確認したところ、Groovyで作成したArrayListでした。ログにはカンマ区切りで表示されるので、文字列だと思っていました。
**アーキテクト：**
> 見た目が文字列に近くても、ArrayListはStringではありません。後続コンポーネントがStringを期待しているなら、各IDを必要な引用形式に整えたうえで、joinなどを使って明示的に文字列へ変換してください。
**開発担当：**
> toString()で変換してもよいでしょうか。
**アーキテクト：**
> 単にtoString()を使うと、角括弧や空白が入り、ODataの検索条件として不正になる可能性があります。期待する最終形式を先に定義し、その形式を組み立てるほうが安全です。
**開発担当：**
> もう一つ、メール送信時に「Invalid characters (CR/LF) in header」というエラーも出ています。警告メッセージを保持するHeaderに複数行の文字列を設定しています。
**アーキテクト：**
> それが直接の原因とみられます。CRとLFはファイル本文では必要ですが、HTTPや一部のアダプターのHeader値には設定できません。
**開発担当：**
> では、改行を全部削除すればよいですか。
**アーキテクト：**
> Headerとして送る必要がある短い値なら、制御文字を除去できます。ただし、今回の値は添付ファイルの内容ですよね。用途に応じて、内容はBodyまたは対応可能なPropertyに保持し、Headerにはファイル名やMIMEタイプなどのメタデータだけを設定しましょう。
**開発担当：**
> 分かりました。型と受け渡し先を分けて確認し、送信直前にもString型と制御文字の有無を検証します。
## よくある中式・不自然な表現の修正
### 1. 值的外观看起来像字符串，就断定是 String
❌ 値が文字のように見えるので、Stringです。
✅ 表示上は文字列に見えますが、実行時の型はArrayListです。  
✅ クラス名を確認したところ、StringではなくListでした。
程序日志如何显示一个值，与该值的实际类型是两回事。
### 2. 使用「自动变成String」
❌ システムが自動でStringになります。
✅ 暗黙の型変換に依存せず、後続処理が期待する形式へ明示的に変換します。
即使某些场景能够自动转换，也不应把未确认的运行行为说成必然规则。
### 3. 用「类型不同」结束报告
△ 型が違うのでエラーです。
✅ 後続コンポーネントはStringを期待していますが、GroovyからArrayListが渡されたため、型の不一致でエラーになりました。
完整说明应包含预期类型、实际类型、传递路径和错误发生位置。
### 4. 所有数据都放入 Header
❌ 後で使うデータは全部Headerに入れます。
✅ ルーティング情報や短いメタデータはHeader、iFlow内部の一時値はProperty、主要データや多行内容はBodyに保持します。
Header、Property 和 Body 不是单纯容量不同，而是用途和约束不同。
### 5. 为消除 CR/LF 错误而删除全部换行
❌ エラーになるので、添付内容の改行を全部削除します。
✅ 改行が必要な本文はそのまま保持し、CR/LFを許可しないHeaderから本文データを分離します。
如果问题是“内容放错了位置”，删除内容中的换行只是改变数据，并没有修正设计边界。
### 6. 「Error happened because CR/LF exists」的生硬表达
❌ CR/LFが存在するから、エラーが出しました。
✅ Header値にCR/LFが含まれていたため、送信時に例外が発生しました。
「エラーが出る」是自动词表达，过去式是「エラーが出ました」。技术报告中「例外が発生しました」更加正式。
## 口頭・作文練習
请根据以下调查结果，用日语进行约60秒的技术说明：
- Groovy 脚本生成了包含两个用户 ID 的 ArrayList
- 日志中看起来像以逗号分隔的文本
- partUserIdList 的后续使用位置要求 String
- 实际希望的格式是 '00900680','00900660'
- 不能直接依赖 List 的 toString()，因为可能包含方括号和空格
- 应分别加上引号，再使用 join 显式构建 String
- 另一个警告信息包含 CRLF，并被设置到了 Header
- Header 不允许 CR/LF 等控制字符
- 警告正文需要保留换行，因此不应简单删除
- 正文应放入 Body 或合适的 Property
- Header 只保存附件名和 MIME 类型等元数据
- 调用前验证实际类型和控制字符
请至少使用以下四个表达：
- データ型
- 文字列として扱う
- 明示的に変換する
- 値を受け渡す
- 期待する型
- 型が一致しない
- ～ない限り
- ～に応じて
- 制御文字
- ～かねない
## 参考答案
> 調査の結果、partUserIdListにはStringではなく、Groovyで生成したArrayListが設定されていました。ログ上はカンマ区切りの文字列に見えますが、後続コンポーネントが期待する型と一致していません。実際に必要な形式は「'00900680','00900660'」です。ListのtoString()に依存すると、角括弧や空白が含まれかねないため、各IDを引用符で囲み、joinを使ってStringへ明示的に変換します。また、警告メッセージにはCRLFが含まれており、その値をHeaderで受け渡したため、制御文字のエラーが発生しました。警告本文には改行が必要なので、単純に削除すると可読性を損ないかねません。用途に応じて、本文はBodyまたは対応可能なPropertyに保持し、Headerには添付ファイル名やMIMEタイプなどのメタデータだけを設定します。今後は送信直前に、実際のデータ型と制御文字の有無を検証します。
## 今日のポイント
- 技术排查顺序：**值的外观 → 实际类型 → 接收方要求 → 传递位置 → 显式转换 → 输入验证**
- “日志里看起来像字符串”不能证明运行时类型是 String
- List 转 String 时，应根据目标格式构建内容，而不是盲目使用 toString()
- Header 适合短小的协议参数和元数据，不适合多行正文
- CR/LF 在附件内容中可能必要，在 Header 中却可能属于非法控制字符
- 修复“数据放错位置”的问题时，应调整传递边界，而不是破坏数据内容
- 「～かねない」适合说明临时修复可能造成的二次风险`,
  },
  "en-database-connection-pool-capacity-isolation": {
    title: "Designing Database Connection-Pool Capacity and Isolation Boundaries",
    sourceId: "3c5d34cbae1981eea93ce749112825f0",
    markdown: `Today’s focus: treating a database connection pool as a bounded concurrency and failure-containment mechanism, not as a source of additional database capacity.
## Architecture Review
**Less precise**
> Requests are waiting for connections, so we should increase the pool size.
**Senior-architect phrasing**
> A connection pool does not create database capacity; it controls how much client concurrency can consume that capacity.
> Before increasing the pool, we should define the database-wide connection budget, the number of application instances and deployment cohorts, transaction duration, traffic classes, acquisition timeout, reserved operational headroom, and failure behavior under saturation.
> A locally reasonable pool size can be globally unsafe. Fifty connections per instance across twenty instances already represents one thousand possible database sessions before batch jobs, administrative access, or failover capacity are included.
## Technical Design Discussion
> Start with the database’s tested concurrency budget, reserve headroom for operations and failover, and divide the remaining capacity across services, replicas, and workload classes.
> Keep connection acquisition bounded by the caller’s deadline. A request that cannot obtain a connection within its remaining latency budget should fail predictably instead of waiting indefinitely.
> Minimize the time a connection is held. Do not keep a transaction open while calling another service, waiting for user input, or performing unrelated computation.
> Consider separate pools or explicit concurrency limits for interactive traffic and batch workloads when they have different latency objectives. Isolation prevents a large job from consuming every connection required by customer-facing requests.
> Monitor active, idle, pending, timed-out, and leaked connections together with transaction duration and database saturation. Pool utilization alone cannot identify whether the constraint is application demand, slow SQL, lock contention, or database capacity.
## Incident / Debugging
**Less natural**
> The database was slow, and the pool became full.
**More natural**
> A long-running query increased connection hold time, which exhausted the application pool. Immediate retries then increased the acquisition queue and amplified request latency.
> Let’s reconstruct the timeline across pool utilization, acquisition wait, transaction duration, slow queries, lock waits, request retries, instance count, and database session limits.
> The immediate mitigation is to stop or isolate the offending workload, cap retry concurrency, and recover database headroom. Increasing every pool would hide the symptom briefly while increasing pressure on the constrained dependency.
## Stakeholder Update
> A batch workload held database connections longer than expected and reduced the capacity available to customer-facing requests. This caused elevated latency and a limited number of timeouts; we found no evidence of data loss or corruption. We have isolated the batch workload, restored normal service, and are adding workload-specific connection limits and transaction-duration alerts before it resumes.
## Code Review / Mentoring
> This transaction remains open while the code calls an external API. Complete the database work first, or redesign the workflow so the connection is not held across an unpredictable network dependency.
> The acquisition timeout is longer than the HTTP request deadline. Bound it below the remaining request budget so the caller receives a controlled failure before its own timeout expires.
> This creates one pool per tenant without a global cap. Add a shared connection budget or use a bounded routing strategy so tenant growth cannot multiply database sessions without limit.
> The leak detector reports only after several minutes. Set the threshold high enough to avoid normal long transactions, but low enough to produce useful evidence before the pool is exhausted.
## Corrections
❌ The pool is full, so the database needs more connections.
✅ Pool saturation shows that demand exceeds the configured client concurrency; we must determine whether the cause is insufficient allocation, excessive hold time, lock contention, slow SQL, or retry amplification.
❌ A larger pool will make every request faster.
✅ A larger pool may reduce local waiting until the database saturates; beyond that point, it can increase contention, memory use, and tail latency.
❌ Idle connections are wasted, so the minimum pool size should equal the maximum.
✅ Minimum idle capacity should reflect steady demand and connection-establishment cost, while preserving the database-wide capacity budget.
❌ The query timeout protects us from pool exhaustion.
✅ Query timeout limits execution after a connection is obtained; acquisition timeout, transaction boundaries, cancellation, and workload isolation protect the pool itself.
## Vocabulary Notes
- **connection pool**：连接池；复用并限制应用程序数据库连接的一组资源
- **connection budget**：连接预算；数据库可安全承受并分配给各工作负载的连接总量
- **acquisition timeout**：获取连接超时；请求等待可用连接的最长时间
- **connection hold time**：连接占用时长；一次操作从取得连接到归还连接的时间
- **pool saturation**：连接池饱和；所有连接均被占用且新请求开始排队的状态
- **pending borrower**：等待借用连接的请求；尚未取得连接的工作线程或操作
- **operational headroom**：运维余量；为故障转移、管理操作和流量波动预留的容量
- **workload isolation**：工作负载隔离；防止批处理等任务耗尽交互式流量所需资源
- **transaction duration**：事务持续时间；事务从开始到提交或回滚的时间
- **connection leak**：连接泄漏；代码未在规定路径上归还连接
- **retry amplification**：重试放大；失败后的额外请求进一步加重原有资源压力
- **tail latency**：尾部延迟；较慢请求所在高百分位的响应时间，如 p95 或 p99
## Speaking Drill
用约 45 秒回答：
> A service runs on twenty instances, each configured with a maximum pool size of fifty. The database supports three hundred application sessions, and a nightly batch job is causing customer requests to time out while waiting for connections. How would you respond and redesign the limits?
**Model answer**
> I would first stop treating each instance’s pool as an independent setting. The current configuration permits up to one thousand application connections against a database budget of three hundred, before operational headroom is reserved. For immediate mitigation, I would limit or pause the batch workload, cap retries, and identify whether long transactions, slow queries, or lock contention increased connection hold time. The permanent design should reserve database capacity for operations and failover, then allocate explicit budgets across customer traffic and batch processing. I would use separate concurrency limits, set connection acquisition below the request deadline, and alert on pending borrowers, transaction duration, and version-wide connection totals. I would not increase every pool unless database testing proves that the global capacity budget can safely support it.`,
  },
} as const;
