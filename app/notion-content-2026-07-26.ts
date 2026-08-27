export const notionTopicContent20260726 = {
  "jp-measurable-nonfunctional-requirements": {
    title: "非機能要件を測定可能な形に落とし込む",
    sourceId: "3a9d34cbae198195a9b4cd8688f2d6d6",
    markdown: String.raw`## 今日のテーマと学習目標
今天的主题是：把「高性能」「稳定运行」「出现问题时尽快恢复」等模糊要求，转换为可以测量、验证并取得共识的非功能性需求。
学习目标：
- 区分愿望、目标值、验收条件和设计前提
- 使用数值、负载条件和统计口径描述性能与可用性
- 在信息不足时指出无法判断的部分，而不是凭经验承诺
- 在设计评审中确认“什么情况下、达到什么程度、如何验证”
## 実用的な語彙・表現
### 1. 非機能要件
**读音：** ひきのうようけん
**中文：** 非功能性需求
**语感与场景：** 指性能、可用性、安全性、运维性、扩展性等“系统如何运行”的要求。不能简单理解为“不重要的功能以外要求”。
> 非機能要件は後から追加すると設計全体に影響するため、基本設計の段階で合意しておく必要があります。
非功能性需求如果后期追加，会影响整体设计，因此需要在基本设计阶段达成一致。
### 2. 数値に落とし込む
**读音：** すうちにおとしこむ
**中文：** 转化为具体数值
**语感与场景：** 将「速い」「大量」「ほぼ停止しない」等主观表达变成可测量的指标，是评审和需求定义中的常用说法。
> 「応答を速くする」だけでは検証できないため、対象処理と応答時間を数値に落とし込みましょう。
仅仅要求“加快响应”无法验证，因此应把目标处理和响应时间转化为具体数值。
### 3. 許容範囲
**读音：** きょようはんい
**中文：** 可接受范围、容许区间
**语感与场景：** 不只定义理想状态，还要明确业务能够接受的上限、波动或失败比例。
> 月末のピーク時間帯では、応答時間が通常時より二秒程度延びることを許容範囲とします。
月末高峰时段，允许响应时间比平时延长两秒左右。
### 4. ピーク時
**读音：** ピークじ
**中文：** 高峰时段、峰值负载时
**语感与场景：** 性能要求必须说明是在平均负载还是峰值负载下成立。「ピーク時でも」常用于提出较严格的条件。
> ピーク時に同時接続数がどこまで増える想定なのか、前提を確認させてください。
请允许我确认一下，预计高峰时的并发连接数会增加到什么程度。
### 5. ばらつき
**读音：** ばらつき
**中文：** 波动、离散程度、不均匀
**语感与场景：** 平均值看起来正常时，部分请求仍可能很慢。说明延迟或处理时间差异时非常实用。
> 平均値だけでなく、応答時間のばらつきと上位パーセンタイルも確認する必要があります。
除了平均值，也需要确认响应时间的波动和高百分位数值。
### 6. 劣化する
**读音：** れっかする
**中文：** 性能或品质下降、退化
**语感与场景：** 比「悪くなる」更正式、技术性更强。可用于性能、连接质量、数据质量和用户体验。
> データ量の増加に伴って検索性能がどの程度劣化するかを事前に検証します。
我们将事先验证搜索性能会随着数据量增加而下降到什么程度。
### 7. 担保する
**读音：** たんぽする
**中文：** 确保、提供保证
**语感与场景：** 商务和技术文件中常见，但不宜轻易用于无法绝对控制的目标。应说明担保的条件和范围。
> この構成だけで99.99％の可用性を担保できるわけではありません。
仅凭这一架构并不能保证99.99%的可用性。
### 8. 検証可能である
**读音：** けんしょうかのうである
**中文：** 可以验证
**语感与场景：** 一个好的验收条件，应由不同人员按照同一方法得到相近结论。
> 合否を客観的に判断できるよう、要件は検証可能な形で記述してください。
为了能够客观判断是否合格，请用可验证的形式描述需求。
### 9. 前提条件をそろえる
**读音：** ぜんていじょうけんをそろえる
**中文：** 统一前提条件
**语感与场景：** 如果数据量、测量区间、缓存状态等不同，同一个性能数值没有可比性。
> 性能試験の結果を比較する前に、データ量やキャッシュの状態などの前提条件をそろえましょう。
在比较性能测试结果之前，先统一数据量和缓存状态等前提条件。
### 10. ボトルネックを見極める
**读音：** ボトルネックをみきわめる
**中文：** 准确判断瓶颈所在
**语感与场景：** 「見つける」只是找到；「見極める」强调经过分析后确定真正限制整体性能的因素。
> 負荷を段階的に上げ、アプリケーションとデータベースのどちらが先に限界に達するかを見て、ボトルネックを見極めます。
我们将逐步提高负载，观察应用和数据库哪一方先达到极限，从而确定瓶颈。
### 11. 目安にすぎない
**读音：** めやすにすぎない
**中文：** 只不过是参考标准
**语感与场景：** 用于防止将估算、经验值或初步测试结果误认为正式承诺。
> 現時点の数値は小規模な検証環境で得た目安にすぎず、本番性能を保証するものではありません。
目前的数值只是在小规模验证环境中得到的参考值，并不保证生产环境性能。
## 高階文法・文型
### 1. ～を前提として／～を前提に
表示某个结论、设计或判断成立所依赖的条件。
> 一日当たり百万人の利用を前提として、キャパシティを見積もっています。
我们以每天一百万用户为前提估算容量。
与「～に基づいて」相比：
- 「～を前提として」强调结论成立所需的假设条件；前提变化时，结论也可能变化
- 「～に基づいて」强调以事实、数据或规则作为判断依据
- 设计讨论中应明确区分“尚未确认的前提”和“已经取得的数据”
### 2. ～ないことには、～ない
表示如果前项条件不成立，后项就无法进行或判断。
> 想定トラフィックが分からないことには、この構成で十分かどうか判断できません。
如果不知道预计流量，就无法判断这一架构是否足够。
与「～なければ」相比：
- 「～なければ」是普通条件
- 「～ないことには、～ない」更强调前项是不可缺少的先决条件
- 适合在评审中说明“目前为什么不能承诺”
### 3. ～に堪える
表示具备足以承受某种使用、评价或环境的质量。通常接名词。
> この方式が本番運用に堪えるかどうか、障害時の復旧手順も含めて評価する必要があります。
需要连同故障时的恢复流程一起评估这一方式是否足以用于生产运维。
与「～に耐える」相比：
- 「耐える」主要强调承受物理或数量上的压力，如高负载、热量
- 「～に堪える」还包含“质量足以胜任”的评价，如「実用に堪える」「鑑賞に堪える」
- 技术场景中两者有时都能使用，但「本番運用に堪える」更强调综合质量
### 4. ～をもって
表示以某个时点、数值、方法或结果作为界线或判断依据，语气正式。
> 連続三回の負荷試験ですべて基準値を満たしたことをもって、性能要件を満たしたと判断します。
以连续三次负载测试全部满足基准值，作为判定符合性能要求的依据。
与「～によって」相比：
- 「～によって」广泛表示方法、原因或依据
- 「～をもって」更正式，强调把某项结果作为明确的界线或认定标准
- 日常会话中使用会显得过于郑重，主要用于规则、通知和验收条件
## 自然な会話
**场景：架构评审中，业务方提出“画面必须很快打开”。**
**業務担当：**
> 利用者を待たせたくないので、どの画面も三秒以内に表示できるようにしてください。
**アーキテクト：**
> 承知しました。検証可能な要件にするため、いくつか前提を確認させてください。「三秒以内」は、検索ボタンを押してから結果がすべて表示されるまで、という理解で合っていますか。
**業務担当：**
> はい。ただ、月末は利用者がかなり増えます。
**アーキテクト：**
> ピーク時の同時利用者数と検索対象の最大データ量は分かりますか。それが分からないことには、必要な構成や試験条件を決められません。
**業務担当：**
> 同時利用は通常二百人程度で、月末は五百人ほどです。データは最大で三年分を検索します。
**アーキテクト：**
> ありがとうございます。もう一点、すべてのリクエストを三秒以内とするのか、例えば95パーセンタイルで三秒以内とするのかも合意が必要です。外部サービスの遅延まで含めて100％を担保するのは現実的ではありません。
**業務担当：**
> 大半の利用者が三秒以内であれば問題ありません。遅くても五秒を超えると問い合わせが増えると思います。
**アーキテクト：**
> では、ピーク時五百人、最大三年分のデータを前提として、95パーセンタイルは三秒以内、99パーセンタイルは五秒以内という案はいかがでしょうか。あわせて、外部サービスが正常に応答していることを測定条件に含めます。
**業務担当：**
> その条件であれば、業務側でも判断しやすいです。
**アーキテクト：**
> では、この数値と測定条件を非機能要件に落とし込み、負荷試験の合否基準まで明記します。
## よくある中式・不自然な表現の修正
### 1. 「性能很好」をそのまま表現する
❌ このシステムの性能はとてもいいです。
✅ ピーク時でも、検索処理の95パーセンタイルは三秒以内です。
✅ 現行システムと比べ、同一条件での処理時間を約30％短縮しています。
「性能がいい」只表达评价，没有说明测量对象、条件和程度。
### 2. 「三秒以内」を無条件で約束する
❌ 必ず三秒以内に返します。
✅ 想定負荷と外部サービスが正常な状態を前提として、95パーセンタイル三秒以内を目標とします。
系统工程中的承诺应明确负载、依赖状态和统计口径。除非经过严格定义，不要轻易使用「必ず」。
### 3. 「データが多い」を曖昧なまま使う
❌ データが多い場合、遅くなる可能性があります。
✅ 検索対象が三年分、または一千万件を超える場合、応答時間が基準値を上回る可能性があります。
将「多い」替换成具体范围，听者才能判断风险是否与自己相关。
### 4. 平均値だけで問題ないと判断する
❌ 平均応答時間は一秒なので、性能に問題ありません。
✅ 平均応答時間は一秒ですが、一部のリクエストで十秒を超えているため、上位パーセンタイルとばらつきを確認する必要があります。
平均值可能掩盖少量但严重的慢请求。技术沟通中要避免仅凭平均值下结论。
### 5. 「保証」と「目標」を混同する
❌ この構成なら可用性99.99％を保証できます。
✅ 99.99％を目標とした構成ですが、達成には監視、運用体制、障害復旧時間を含めた検証が必要です。
设计目标、预测值和合同级保证不是同一个概念。「担保する」「保証する」应谨慎使用。
## 口頭・作文練習
客户提出以下要求：
> 大量员工同时访问时，SuccessFactors联携接口也必须稳定运行，出现故障后要尽快恢复。
请用日语进行约60秒的需求确认说明，并把模糊要求转换为需要进一步确认的项目。至少包含：
- 峰值时的员工人数或请求数
- 「稳定运行」的判断指标
- 可接受的失败率或处理延迟
- 故障检测时间和目标恢复时间
- 外部系统异常时是否包含在本系统的责任范围内
请至少使用以下三个表达：
- 数値に落とし込む
- 許容範囲
- ～を前提として
- ～ないことには、～ない
- 検証可能な形
## 参考答案
> ご要望の意図は理解しましたが、設計と試験の基準にするためには、「安定して動作する」「速やかに復旧する」という表現を、検証可能な形で数値に落とし込む必要があります。まず、ピーク時の従業員数、一分当たりの最大リクエスト数、対象データ量を確認させてください。想定負荷が分からないことには、必要な処理能力を判断できません。また、安定稼働の基準として、許容するエラー率と処理遅延の上限を合意したいと考えています。障害対応については、検知までの時間と目標復旧時間を分けて定義する必要があります。SuccessFactorsが正常に応答することを前提とするのか、外部システム側の障害も可用性計算に含めるのかについても、責任範囲とあわせて確認させてください。
## 今日のポイント
- 非功能性需求应同时包含：**测量对象、负载条件、目标值、统计口径和验证方法**
- 「高性能」「稳定」「尽快恢复」属于愿望，不是可以直接验收的需求
- 无法判断时，应说明缺少哪个前提，而不是凭经验给出承诺
- 平均值不能完整反映用户体验，还需要关注百分位数和波动
- 「目標」「見込み」「担保」代表不同强度的承诺，技术沟通中必须区分`,
  },
  "en-progressive-delivery": {
    title: "Reducing Release Risk with Progressive Delivery",
    sourceId: "3a9d34cbae1981f2b918c31db49ac4b3",
    markdown: String.raw`## 1. Architecture Review
**Less precise**
> We can release to everyone and roll back if there is a problem.
**Senior-architect phrasing**
> Rollback is an important recovery control, but it should not be our only release-risk strategy.
> I recommend a progressive rollout with an explicit initial cohort, measurable success criteria, guardrail metrics, and a predefined stop condition.
> Before approval, we also need to confirm that the old and new versions can safely coexist, particularly across database schemas, message formats, and cached state.
## 2. Technical Design Discussion
> Let’s separate deployment from release. The code can be deployed broadly while the new behavior remains restricted behind a feature flag.
> The first cohort should be representative enough to reveal production behavior but small enough to contain the impact of a defect.
> Define both success metrics and guardrail metrics. Adoption may increase while latency, error rate, or support volume deteriorates.
> The rollout controller should pause automatically when a threshold is breached. Resuming should require evidence that the failure mode is understood and the corrective action has been verified.
> Database and event-schema changes must remain backward and forward compatible throughout the mixed-version window.
## 3. Incident / Debugging
**Less natural**
> The canary had errors, so we stopped it.
**More natural**
> The canary cohort breached the error-rate guardrail while the control cohort remained stable, so we paused the rollout and reverted the feature exposure.
> This comparison suggests that the regression is associated with the new behavior rather than a platform-wide condition.
> Before resuming, let’s identify the failing request pattern, verify the mitigation against representative traffic, and reset the observation window.
## 4. Stakeholder Update
> We paused the rollout after the initial cohort showed an elevated error rate. The issue was contained to a limited group, and the existing service remains stable for other users. The team has disabled the new behavior and is validating a correction. We will resume only after the error rate returns below the agreed threshold and the fix completes a new observation period.
## 5. Code Review / Mentoring
> Please test both the enabled and disabled paths. A feature flag is a runtime branch, and both branches remain production code until the flag is retired.
> Add the rollout variant and cohort identifier to the telemetry so that we can compare exposed and unexposed traffic.
> This migration removes a column immediately, which makes rollback unsafe for the previous application version. Use an expand-and-contract sequence instead.
> Please add an owner and retirement date for the flag. Long-lived flags create hidden complexity and increase the number of states we must test.
## Corrections
❌ Only five percent of users are affected, so the risk is low.
✅ The rollout limits the affected population, but we must also consider failure severity, cohort representativeness, and whether the impact is reversible.
❌ The metrics look good, so we can continue.
✅ The success and guardrail metrics have remained within their thresholds for the agreed observation window, so we can proceed to the next stage.
❌ We can always roll back the database change.
✅ Application code may be reversible, but destructive schema and data migrations require a separate recovery plan.
❌ The feature flag makes the change safe.
✅ The feature flag gives us control over exposure; safety still depends on tested fallback behavior, reliable telemetry, and a clear stop condition.
## Vocabulary Notes
- **progressive delivery**：渐进式交付；分阶段扩大新版本或新功能的暴露范围
- **canary cohort**：金丝雀群组；最先接触新行为的一小部分用户或流量
- **control cohort**：对照群组；继续使用原有行为，用于判断变化是否由新版本引起
- **guardrail metric**：护栏指标；一旦恶化就应暂停发布的错误率、延迟等安全指标
- **stop condition**：停止条件；触发暂停或回滚的预先约定标准
- **observation window**：观察窗口；扩大发布前持续评估指标的时间范围
- **mixed-version window**：多版本并存期；旧版与新版应用同时运行的阶段
- **feature exposure**：功能暴露；决定哪些用户或流量能够使用新行为
- **expand-and-contract migration**：扩展—收缩式迁移；先兼容新旧结构，再迁移，最后删除旧结构
- **blast radius**：影响半径；一次故障可能影响的用户、数据或系统范围
## Speaking Drill
用约 45 秒回答：
> A team wants to roll out a new authentication flow to all users because the staging tests passed. What would you recommend?
依次说明：
1. Why staging success is insufficient
2. The initial production cohort
3. Success and guardrail metrics
4. The condition for expanding or stopping the rollout
**Model answer**
> Staging results are necessary, but they cannot reproduce the full diversity of production identities, clients, and traffic patterns. I recommend starting with a small internal or low-risk cohort while keeping the existing authentication flow available as a fallback. We should measure successful sign-ins and adoption, with authentication failures, latency, lockouts, and support contacts as guardrails. If those signals remain within the agreed thresholds for the full observation window, we can expand the cohort gradually. If any guardrail is breached, we should pause exposure immediately and resume only after the failure mode and mitigation have been verified.`,
  },
} as const;
