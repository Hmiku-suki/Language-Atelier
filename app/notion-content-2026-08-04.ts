export const notionTopicContent20260804 = {
  "jp-verify-generative-ai-answers": {
    title: "生成AIの回答を鵜呑みにせず検証する",
    sourceId: "3b2d34cbae1981f9bbcefb7461ed4954",
    markdown: `## 今日のテーマと学習目標

今天学习面对生成式 AI 给出的事实、建议、引用和技术结论时，如何把“看起来合理的回答”转换为可验证的判断依据，并在使用 AI 的同时保护客户数据和公司机密。

学习目标：

- 区分 AI 输出、假设、证据和最终判断
- 通过一次信息、发布日期、适用范围和复现结果核实回答
- 根据错误后果决定核实深度，而不是对所有内容采取相同流程
- 在团队沟通中自然说明“目前能确认什么、尚不能确认什么”
- 避免把客户数据、认证信息或未公开设计直接输入外部 AI

## 最新背景

日本经济产业省于 **2026 年 4 月 1 日**公布了《AI事業者ガイドライン》第 1.2 版的相关资料，继续从风险管理、透明性和治理等角度整理 AI 开发、提供与使用时的注意事项。经济产业省：《AI事業者ガイドライン》（第1.2版）

IPA 于 **2026 年 4 月 2 日**发布面向 AI 使用者的安全提示，并在 **2026 年 7 月 31 日**更新面向安全负责人的生成式 AI 安全资料。后者指出，生成式 AI 和 AI 代理的业务应用正在扩大，但治理可能跟不上，典型风险包括通过未经管理的 AI 服务泄露信息，以及因错误输出造成业务质量下降。IPA：《AI利用者のためのセキュリティ豆知識》／《セキュリティ担当者のための生成AIセキュリティ》

今天的重点不是“AI 能不能用”，而是：**把 AI 当作草案或调查入口，并按照影响程度安排核实与审批。**

## 実用的な語彙・表現

### 1. 鵜呑みにする

**读音：** うのみにする  
**中文：** 不加判断地全盘接受、照单全收  
**语感与场景：** 多用于提醒不要因为回答流畅、对方有权威感或多数人都这样说，就省略核实。

> 生成AIの回答は自然に見えても、根拠を確認せずに鵜呑みにしてはいけません。

即使生成式 AI 的回答看起来自然，也不能在不确认依据的情况下全盘接受。

### 2. 裏を取る

**读音：** うらをとる  
**中文：** 旁证、通过独立来源核实  
**语感与场景：** 原本常用于新闻采访和调查；职场中也可表示从官方资料、系统记录或相关负责人处交叉确认。

> リリース日については、AIの要約だけでなく、公式発表で裏を取ってください。

关于发布日期，请不要只看 AI 摘要，还要通过官方公告核实。

### 3. 一次情報

**读音：** いちじじょうほう  
**中文：** 第一手资料、原始信息  
**语感与场景：** 例如法规原文、官方文档、产品公告、实验数据、会议当事人的说明。博客或 AI 摘要通常属于二次信息。

> APIの上限値を判断する際は、まずベンダーの公式仕様という一次情報を確認します。

判断 API 上限值时，首先确认供应商官方规格这一第一手资料。

### 4. 出典をたどる

**读音：** しゅってんをたどる  
**中文：** 追溯出处  
**语感与场景：** 不只确认“有链接”，还要打开链接，查看原文是否真实存在、是否支持该结论。

> 引用が示されていても、出典をたどり、本文の記述と一致しているか確認しましょう。

即使列出了引用，也应追溯出处，确认是否与原文内容一致。

### 5. 事実関係を確認する

**读音：** じじつかんけいをかくにんする  
**中文：** 核实事实情况  
**语感与场景：** 用于确认谁、何时、做了什么、结果如何。比笼统的「本当か確認する」更正式。

> 障害原因を説明する前に、ログと変更履歴から事実関係を確認します。

在说明故障原因之前，先通过日志和变更记录核实事实情况。

### 6. もっともらしい

**读音：** もっともらしい  
**中文：** 看似合理、说得煞有介事  
**语感与场景：** 表示形式和逻辑像是真的，但事实未必正确。谈论 AI 的错误回答时非常实用。

> 数字が具体的だともっともらしく聞こえますが、具体的であることと正確であることは別です。

数字越具体越显得可信，但具体与准确是两回事。

### 7. ハルシネーション

**读音：** ハルシネーション  
**中文：** AI 幻觉、模型生成并不存在或不准确的信息  
**语感与场景：** 技术场合常用。对非技术人员说明时，最好补充「事実に基づかない内容を生成すること」。

> 存在しない仕様や文献を示すハルシネーションが起こり得るため、引用元の確認が必要です。

由于可能出现编造不存在的规格或文献的 AI 幻觉，因此需要核实引用来源。

### 8. 最新性を確認する

**读音：** さいしんせいをかくにんする  
**中文：** 确认信息是否最新  
**语感与场景：** 产品规格、法律、价格和组织规则容易变化，仅确认内容曾经正确还不够。

> 製品仕様は変更されるため、文書の更新日と対象バージョンから最新性を確認してください。

产品规格可能变化，请通过文档更新日期和适用版本确认信息是否最新。

### 9. 情報源を突き合わせる

**读音：** じょうほうげんをつきあわせる  
**中文：** 对照多个信息来源  
**语感与场景：** 「突き合わせる」强调逐项比较差异，不是简单地多看几个网页。

> 公式文書、実測結果、担当者の回答を突き合わせて、採用可否を判断します。

我们会对照官方文档、实测结果和负责人的答复，判断是否采用。

### 10. 判断を保留する

**读音：** はんだんをほりゅうする  
**中文：** 暂缓判断  
**语感与场景：** 不是逃避决定，而是在关键证据不足时明确说明暂不下结论，并安排下一步核实。

> 根拠となる仕様が見つかるまで、対応方針の最終判断は保留します。

在找到作为依据的规格前，暂缓对处理方针作出最终判断。

### 11. 機密情報を伏せる

**读音：** きみつじょうほうをふせる  
**中文：** 隐去机密信息  
**语感与场景：** 将客户名、员工编号、令牌、未公开代码等删除、替换或抽象化后再用于讨论。

> 外部の生成AIを使う場合は、顧客名や実データなどの機密情報を伏せてください。

使用外部生成式 AI 时，请隐去客户名称和真实数据等机密信息。

## 高階文法・文型

### 1. ～からといって、～とは限らない

表示前项成立，也不能据此断定后项一定成立。

> AIが具体的な数値を示したからといって、その数値が正しいとは限りません。

即使 AI 给出了具体数字，也不代表该数字一定正确。

与「～ても」相比：

- 「～ても」广泛表示让步条件
- 「～からといって、～とは限らない」专门否定“因为有前项，所以当然有后项”的推论
- 适合纠正「回答が流暢だから正しい」「引用があるから可靠」等过早判断

### 2. ～に照らして

表示以规则、标准、事实或证据为参照进行判断，属于正式表达。

> AIが提案した設定を、社内のセキュリティ基準に照らして評価します。

我们将依据公司内部安全标准评估 AI 提出的设置。

与「～に基づいて」相比：

- 「～に基づいて」强调结论或行动直接建立在某个依据之上
- 「～に照らして」强调把对象拿来与标准对照，判断是否合适或合规
- 审查方案、合同、法规适用性时，「～に照らして」更贴切

### 3. ～を踏まえたうえで

表示先充分考虑某项信息，再进行下一步判断或行动。

> 公式仕様と検証結果を踏まえたうえで、設計への採用可否を決めます。

在综合考虑官方规格和验证结果后，再决定是否将其用于设计。

与单独的「～を踏まえて」相比：

- 两者都表示综合考虑
- 「～を踏まえたうえで」更明确地表现“先核实、后判断”的阶段顺序
- 当需要强调不能跳过前置调查时，后者更有力

### 4. ～に足る

表示具备足以达到某种评价或用途的质量，属于 N1 书面表达。

> この回答だけでは、設計判断の根拠に足るとは言えません。

仅凭这份回答，还不能说足以作为设计判断的依据。

与「～に値する」相比：

- 「～に足る」强调能力、可信度或质量达到所需标准，如「信頼に足る」「根拠に足る」
- 「～に値する」强调值得某种评价或行为，如「検討に値する」「称賛に値する」
- AI 输出可能「検討に値する」却仍未必「信頼に足る」

## 自然な会話

**场景：开发成员用生成式 AI 调查 SuccessFactors API 的批量更新上限，并准备把答案直接写入设计书。**

**開発担当：**

> 生成AIに確認したところ、一回のリクエストで最大千件まで更新できるそうです。設計書には千件と記載してよいでしょうか。

**アーキテクト：**

> その数字の出典は確認できていますか。回答が具体的だからといって、正しいとは限りません。

**開発担当：**

> 参考リンクは付いていましたが、二〇二四年の個人ブログでした。公式文書には同じ記載が見つかりませんでした。

**アーキテクト：**

> では、現時点では「千件まで可能」とは断定できませんね。ブログが参照している一次情報まで、出典をたどれますか。

**開発担当：**

> 元のリンクは既に削除されているようです。

**アーキテクト：**

> その場合、この回答だけでは設計判断の根拠に足りません。対象製品のバージョン、APIの種類、同期処理か非同期処理かによっても制限が違う可能性があります。

**開発担当：**

> まず、最新の公式仕様を確認し、見つからなければSAPに問い合わせます。検証環境でも件数を変えて試したほうがよいでしょうか。

**アーキテクト：**

> はい。公式回答と実測結果を突き合わせましょう。ただし、テストが通ったからといって、それが保証上限とは限りません。試験は動作の確認、公式仕様はサポート条件の確認として分けて扱ってください。

**開発担当：**

> 分かりました。ところで、実データの例をAIに渡すと、マッピング案を早く作れそうです。

**アーキテクト：**

> 外部サービスに顧客IDや社員情報を入力してよいか、社内ルールを確認しましたか。未確認なら、機密情報を伏せた架空データに置き換えてください。

**開発担当：**

> 承知しました。設計書には、千件という数字はまだ記載せず、確認中の論点として残します。

**アーキテクト：**

> それがよいと思います。公式仕様、問い合わせ回答、検証結果を踏まえたうえで最終判断しましょう。

## よくある中式・不自然な表現の修正

### 1. 「AI说的，所以是正确的」を直訳する

❌ AIが言ったので、正しいです。

✅ AIがそう回答したからといって、正しいとは限りません。  
✅ AIの回答は仮説として扱い、公式資料で裏を取ります。

AI 对事实不承担权威责任。「言った」也像在描述人类发言，正式场合用「回答した」「生成した」更自然。

### 2. 「这个答案很专业」をそのまま評価する

△ この回答はとても専門的です。

✅ 専門的な表現が使われていますが、根拠の妥当性は別途確認が必要です。

术语丰富、文章流畅只代表形式专业，不足以证明内容准确。

### 3. 「网上确认过了」と曖昧に言う

❌ インターネットで確認したので大丈夫です。

✅ 2026年7月31日更新のIPA公式資料で、対象箇所を確認しました。  
✅ ベンダーの公式文書で、対象バージョンと適用条件を確認しました。

应说明信息源、日期、适用对象和确认到的具体内容，而不是只说“网上看过”。

### 4. 「让AI再确认一次」を核实と考える

❌ 念のため、同じAIにもう一度確認します。

✅ 別の言い方で再質問するだけでなく、一次情報や実測結果で裏を取ります。

向同一模型重复提问可能得到更一致的措辞，但并不构成独立核实。

### 5. 実データをそのまま入力する

❌ 顧客データをAIに入れて、原因を調べます。

✅ 利用規程とデータの取扱条件を確認し、必要であれば機密情報を伏せた再現データで調査します。

是否可以输入数据，取决于公司规则、服务契约、保存方式和数据类型。方便并不等于获得授权。

## 口頭・作文練習

你在设计评审前使用生成式 AI 调查某 API，得到以下情况：

- AI 回答“一次最多可以处理1000条记录”
- 回答引用的是一篇2024年的个人博客
- 当前官方文档中没有找到相同上限
- 尚未在测试环境验证
- 不清楚该数字适用于哪个产品版本和处理方式
- 原本准备把包含客户ID的请求样本交给外部 AI 分析
- 需要向团队说明目前能确认什么、不能确认什么，以及下一步怎么做

请用日语进行约60秒的报告。至少使用以下三个表达：

- 鵜呑みにする
- 一次情報
- 出典をたどる
- ～からといって、～とは限らない
- ～に照らして
- 判断を保留する
- 機密情報を伏せる

## 参考答案

> 生成AIから、一回当たり最大千件を処理できるという回答が得られましたが、現時点ではこの数字を鵜呑みにできません。示された出典は二〇二四年の個人ブログであり、現在の公式文書には同じ記載が見つかっていません。また、対象バージョンと処理方式も不明です。具体的な数字が示されているからといって、正しいとは限らないため、まずブログの出典をたどり、ベンダーの公式仕様という一次情報を確認します。見つからない場合は正式に問い合わせ、検証環境でも件数を変えて動作を確認します。それらの結果を突き合わせるまで、千件を前提とした設計判断は保留します。なお、外部AIには顧客IDを含む実データを入力せず、社内規程に照らして利用可否を確認したうえで、機密情報を伏せた再現データを使用します。

## 今日のポイント

- AI 输出首先是**草案、线索或假设**，不是自动成立的证据
- 核实事实时确认：**一次信息、发布日期、适用版本、适用条件和原文内容**
- “链接存在”不代表引用正确；必须追溯出处，确认原文确实支持结论
- 测试成功只证明某个条件下能够运行，不一定证明官方保证或长期有效
- 核实深度应与错误后果相匹配：聊天措辞和生产设计不能使用同一标准
- 在证据不足时明确暂缓判断，比用「たぶん大丈夫」推进更专业
- 使用外部 AI 前，还要确认输入数据、保存方式、服务契约和公司规则`,
  },
  "en-transaction-boundaries-compensation": {
    title: "Designing Transaction Boundaries and Compensation in Distributed Workflows",
    sourceId: "3b2d34cbae19819c9f22f7ecfe36f12b",
    markdown: `Today’s focus: defining where atomicity ends, how multi-service workflows make progress, and how failed steps are recovered without pretending that distributed operations behave like one database transaction.

## Architecture Review

**Less precise**

> We need the order, payment, and inventory updates to succeed in one transaction.

**Senior-architect phrasing**

> We should first identify the business invariant and the boundary within which atomicity is actually available.

> Across independently deployed services, we cannot assume a single ACID transaction. The design must specify the workflow owner, durable state transitions, compensation policy, timeout behavior, and manual-recovery path.

> A saga coordinates a sequence of local transactions; it does not make the entire workflow atomic or automatically reverse every business effect.

## Technical Design Discussion

> Model the workflow as explicit states such as \`PendingPayment\`, \`InventoryReserved\`, \`Confirmed\`, and \`CompensationRequired\`. Avoid inferring business state from whichever messages happen to be present.

> Persist the workflow transition and the outgoing message reliably, for example through a transactional outbox, so that a process crash cannot leave committed state without its corresponding event.

> Make commands and compensating actions idempotent. Delivery is commonly at least once, so duplicate messages must not create duplicate charges, refunds, or reservations.

> Define whether orchestration or choreography owns the sequence. Orchestration gives one component explicit visibility and control; choreography reduces central coordination but can make the end-to-end flow harder to understand and govern.

> A compensating action is a new business transaction, not a database rollback. It can fail, require approval, or produce a different outcome because the external world has changed.

> Set bounded timeouts for unresolved steps, but do not confuse “no response” with “the operation did not happen.” Reconcile ambiguous outcomes before retrying a non-idempotent external action.

## Incident / Debugging

**Less natural**

> Payment failed, so we rolled back the whole order.

**More natural**

> The payment response timed out, so the outcome is currently ambiguous; we have not confirmed whether the provider captured the funds.

> Let’s inspect the workflow instance, correlation ID, command deduplication record, outbox state, message delivery attempts, and the provider’s authoritative transaction status.

> We should stop automatic retries until we know whether another attempt could create a duplicate charge.

> If payment was captured but inventory cannot be reserved, the workflow should enter a compensation state and request a refund using the original business transaction identifier.

## Stakeholder Update

> Some orders remained in a pending state after the payment provider stopped returning responses. We have paused automatic payment retries to prevent duplicate charges. Confirmed orders continue normally, while the affected transactions are being reconciled against the provider’s records. Where payment was captured but the order cannot be completed, we will issue a compensating refund and track it separately through completion.

## Code Review / Mentoring

> This handler marks the workflow complete before the outbound event is durably recorded. Persist the state transition and outbox record in the same local transaction.

> The retry creates a new payment request ID each time. Reuse a stable idempotency key derived from the business operation so the provider can recognize duplicates.

> This compensation method silently ignores a failed refund. Record compensation as a first-class workflow step with its own status, retry policy, alert, and manual escalation.

> This consumer assumes messages arrive in order. Validate the expected workflow version or sequence number, and handle stale or duplicate events explicitly.

> The code catches every exception and restarts the saga from the beginning. Resume from the last durable state instead; replaying completed side effects can be unsafe.

## Corrections

❌ We use a saga, so all services are eventually consistent.

✅ A saga provides a coordination pattern, but convergence still depends on durable messaging, idempotent handlers, explicit failure states, and successful compensation.

❌ Compensation means undoing the previous transaction.

✅ Compensation applies a new business action that counteracts an earlier effect; it may not restore the exact original state.

❌ If the request timed out, the payment failed.

✅ A timeout means the outcome is unknown until we check an authoritative record or safely repeat the request with the same idempotency key.

❌ We can retry until the workflow succeeds.

✅ Retries should be bounded and state-aware; persistent or ambiguous failures need reconciliation and an operational recovery path.

## Vocabulary Notes

- **transaction boundary**：事务边界；可以保证原子提交或回滚的范围
- **business invariant**：业务不变量；流程在任何有效状态下都必须成立的业务规则
- **saga**：长事务协调模式；通过一系列本地事务与补偿动作完成跨服务流程
- **local transaction**：本地事务；单个服务或数据库内部可原子完成的状态变更
- **compensating action**：补偿动作；通过新的业务操作抵消先前已发生的效果
- **orchestration**：编排；由明确的协调者决定工作流下一步
- **choreography**：协同；各服务通过事件作出反应，没有单一中心协调者
- **transactional outbox**：事务发件箱；将业务状态与待发送消息在同一本地事务中持久化
- **ambiguous outcome**：结果不明；请求方无法判断操作是否已经在对方系统生效
- **reconciliation**：核对；将工作流记录与权威系统状态进行比较并修正差异
- **idempotency key**：幂等键；让接收方识别同一业务操作的重复请求
- **manual recovery**：人工恢复；自动机制无法安全推进时，由人员按受控流程处理

## Speaking Drill

用约 45 秒回答：

> An order workflow reserves inventory, calls a payment provider, and then confirms the order. The payment call times out, and a retry could charge the customer twice. How would you handle the workflow?

依次说明：

1. The transaction and workflow boundaries
2. How to resolve the ambiguous payment outcome
3. Idempotency and durable state
4. Compensation and manual recovery

**Model answer**

> I would treat each service update as a local transaction and keep the end-to-end order as a durable workflow rather than one distributed transaction. A payment timeout is an ambiguous outcome, so I would pause blind retries and query the provider using the original transaction or idempotency key. The workflow state and outgoing messages should be persisted reliably, and every command should tolerate duplicate delivery. If payment was captured, we can continue confirmation or issue a compensating refund if inventory is no longer available. If the provider cannot establish the outcome automatically, the workflow should move to a visible manual-recovery queue instead of guessing or restarting from the beginning.`,
  },
} as const;
