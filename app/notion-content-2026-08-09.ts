export const notionTopicContent20260809 = {
  "jp-production-rollback-criteria": {
    title: "本番変更のロールバック条件を合意する",
    sourceId: "3b7d34cbae1981519677f5adbdbe6182",
    markdown: `## 今日のテーマと学習目標

今天学习在生产发布前，如何用日语与开发、运维和客户明确约定回滚条件、判断负责人、时间界限以及数据恢复方式。

学习目标：

- 区分「ロールバック」「切り戻し」和「復旧」
- 把“出现问题就回滚”转化为可以观测和执行的判断条件
- 区分应用版本回退与已写入业务数据的核对、补偿
- 说明由谁、在什么时间点作出继续或中止的决定
- 在生产变更会议中自然表达风险与退出方案

## 実用的な語彙・表現

### 1. 本番反映

**读音：** ほんばんはんえい  
**中文：** 部署到生产环境、正式上线  
**语感与场景：** 强调把程序、配置或数据变更应用到生产环境。「リリース」范围更广，也可指对外发布产品或功能。

> 本番反映に先立って、切り戻し手順と判断基準を確認します。

在部署到生产环境之前，我们会确认回滚步骤和判断标准。

### 2. ロールバック

**读音：** ロールバック  
**中文：** 回滚、恢复到变更前的版本或状态  
**语感与场景：** 常用于应用版本、数据库事务和配置。具体使用时应说明回滚对象，不能默认所有副作用都会被撤销。

> アプリケーションは直前の安定版へロールバックできますが、更新済みのデータは別途確認が必要です。

应用程序可以回滚到前一个稳定版本，但已经更新的数据需要另行确认。

### 3. 切り戻し

**读音：** きりもどし  
**中文：** 切回原系统或原运行状态  
**语感与场景：** 日本IT现场常用，除了版本回退，还可指把流量、连接目标或运维方式切回变更前状态。

> 新環境で重大な障害が発生した場合は、旧環境へ切り戻します。

如果新环境发生重大故障，就切回旧环境。

### 4. 判断基準

**读音：** はんだんきじゅん  
**中文：** 判断标准  
**语感与场景：** 应尽量包含指标、持续时间和影响对象，而不是只写「問題があった場合」。

> エラー率、処理遅延、データ整合性の三点を切り戻しの判断基準とします。

我们将错误率、处理延迟和数据一致性作为回滚判断标准。

### 5. 判断を下す

**读音：** はんだんをくだす  
**中文：** 作出决定、下判断  
**语感与场景：** 比「判断する」更强调在掌握信息后正式定案。常用于是否继续发布、是否中止或回滚。

> 二十一時の確認時点で、リリース責任者が継続可否の判断を下します。

在21点的确认节点，由发布负责人决定是否继续。

### 6. 見極める

**读音：** みきわめる  
**中文：** 看清并判断、辨明  
**语感与场景：** 表示通过证据区分暂时波动和真正异常，而不是凭感觉判断。

> 一時的な負荷上昇なのか、処理を継続できない障害なのかを見極めます。

我们要判断这究竟是暂时的负载上升，还是无法继续处理的故障。

### 7. 許容範囲

**读音：** きょようはんい  
**中文：** 可接受范围、容许范围  
**语感与场景：** 需要预先由业务和技术共同决定，不应在故障发生后临时扩大。

> 応答時間が一時的に延びても、五分以内に回復すれば許容範囲とします。

即使响应时间暂时变长，只要在五分钟内恢复，就视为在可接受范围内。

### 8. 復旧の見込み

**读音：** ふっきゅうのみこみ  
**中文：** 恢复的预期、预计能否恢复  
**语感与场景：** 不只指预计完成时间，也包括根据当前原因和措施判断能否恢复。

> 十五分以内に復旧の見込みが立たない場合は、切り戻しを開始します。

如果在十五分钟内仍无法判断能够恢复，就开始回滚。

### 9. 影響範囲を特定する

**读音：** えいきょうはんいをとくていする  
**中文：** 确定影响范围  
**语感与场景：** 应明确受影响的用户、数据、功能、环境和时间段。

> 切り戻し後、対象ユーザーと更新データの影響範囲を特定します。

回滚后，我们将确定受影响用户和已更新数据的范围。

### 10. データ整合性

**读音：** データせいごうせい  
**中文：** 数据一致性、数据完整一致状态  
**语感与场景：** 应用恢复正常不代表数据一定正确。跨系统更新时尤其需要单独确认。

> 画面が正常に表示されても、連携先を含むデータ整合性の確認が必要です。

即使页面已经正常显示，也需要确认包括集成目标系统在内的数据一致性。

### 11. 撤退ライン

**读音：** てったいライン  
**中文：** 停止继续并退出的界限  
**语感与场景：** 带有项目现场口语感，指超过什么条件后不再继续尝试修复，而是中止或回滚。正式文档可写「中止基準」「切り戻し基準」。

> 調査を続けるうちに撤退ラインを越えないよう、時刻と数値を事前に決めておきます。

为了避免在持续调查时错过退出时机，我们会预先确定时间和数值界限。

## 高階文法・文型

### 1. ～に先立って

表示在重要事项开始前，先实施必要的准备或确认，较为正式。

> 本番リリースに先立って、切り戻しの責任者と連絡経路を確認します。

在正式发布之前，确认回滚负责人和联络路径。

与「～の前に」相比：

- 「～の前に」只是一般地表示时间先后
- 「～に先立って」强调正式事项开始前的必要准备
- 不适合「昼食に先立って手を洗う」等普通琐事

### 2. ～ない限り

表示只要某个必要条件不成立，后项就不能进行或不会改变。

> データ整合性を確認できない限り、処理の再開は承認できません。

只要无法确认数据一致性，就不能批准重新开始处理。

与「～なければ」相比：

- 「～なければ」是一般条件
- 「～ない限り」强调该条件是继续行动的最低界限
- 用于发布审批时，能清楚表达不可妥协的条件

### 3. ～にかかわらず

表示不受某个条件或差异影响，后项一律成立。

> 経過時間にかかわらず、データ破損が確認された場合は直ちに切り戻します。

无论已经经过多长时间，只要确认发生数据损坏，就立即回滚。

与「～ても」相比：

- 「～ても」表示即使某个条件成立，后项仍成立
- 「～にかかわらず」强调对列出的所有情况采用统一规则
- 适合正式说明严重故障、合规或安全相关的固定处置

### 4. ～をもって

表示以某个时间点、事件或手段作为正式界限，属于书面和商务表达。

> 二十一時の判定会をもって、継続するか切り戻すかを最終決定します。

以21点的判定会议为节点，最终决定继续还是回滚。

与「～で」相比：

- 「～で」只是普通地表示时间或方式
- 「～をもって」强调正式截止、终止或决定节点
- 日常约会说「三時をもって会いましょう」会显得不自然，应说「三時に会いましょう」

## 自然な会話

**场景：SAP Integration Suite的新接口将在20点部署到生产环境，发布负责人、架构师和运维人员确认回滚条件。**

**リリース責任者：**

> テスト結果はすべて合格していますので、予定どおり二十時に本番反映したいと思います。切り戻し条件を最後に確認しましょう。

**アーキテクト：**

> はい。HTTPエラー率が五分間継続して三パーセントを超えた場合、または保留メッセージが五十件を超えた場合を判断基準としています。

**運用担当：**

> エラー率が一時的に上がっても、すぐに下がった場合は監視を継続するという認識でよいでしょうか。

**アーキテクト：**

> その認識です。ただし、従業員マスタに誤更新や重複が確認された場合は、件数や経過時間にかかわらず、直ちに処理を停止します。

**リリース責任者：**

> アプリケーションをロールバックすれば、誤更新されたデータも元に戻りますか。

**アーキテクト：**

> いいえ。アプリケーションの切り戻しとデータの復元は別です。すでにSuccessFactorsへ送信された更新は自動では取り消されません。対象データを特定し、正しい値と突き合わせたうえで補正する必要があります。

**運用担当：**

> では、切り戻し時には新規メッセージの受信も止め、未処理分と処理済み分を分けて記録します。

**アーキテクト：**

> お願いします。また、二十時三十分の時点で復旧の見込みが立たない場合は、原因の調査途中であっても旧バージョンへ切り戻します。

**リリース責任者：**

> 承知しました。二十時三十分の判定会をもって私が最終判断を下します。切り戻し後は、サービス復旧とデータ整合性確認を別々に報告しましょう。

## よくある中式・不自然な表現の修正

### 1. 「有问题就回滚」を曖昧に言う

❌ 問題が出たらロールバックします。

✅ HTTPエラー率が五分間継続して三パーセントを超えた場合は、旧バージョンへロールバックします。

「問題」的范围过大。应说明观察指标、阈值、持续时间和回滚对象。

### 2. 「回到以前的版本」を直訳する

△ 前のバージョンに戻します。

✅ 直前に稼働していた安定版へ切り戻します。

「前のバージョン」可能是任意旧版本。「直前に稼働していた安定版」更明确，也暗示该版本已经验证。

### 3. 把回滚与数据撤销混为一谈

❌ ロールバックすれば、更新したデータも全部なくなります。

✅ アプリケーションをロールバックしても、外部システムに反映済みのデータは自動では取り消されません。

跨系统操作通常不能随着应用版本回退而自动撤销。需要单独说明核对或补偿方式。

### 4. 「影响很大」を抽象地报告

❌ 影響が大きいので、切り戻したほうがいいです。

✅ 全ユーザーのログインが失敗しており、十五分以内の復旧見込みも立たないため、切り戻しを提案します。

应把“影响很大”拆分为对象、现象、持续时间和恢复预期。

### 5. 只说「再判断一下」

❌ あとでロールバックするか判断します。

✅ 二十時三十分に、エラー率と未処理件数を確認し、リリース責任者が継続可否を判断します。

「あとで」没有可执行性。应明确判断时点、依据和负责人。

### 6. 切り戻し成功を障害解決と同一視する

❌ 切り戻しが成功したので、障害は解決しました。

✅ 旧バージョンへの切り戻しによりサービスは復旧しました。データ整合性の確認は継続中です。

服务恢复与数据核对是不同的完成节点，应分别报告。

## 口頭・作文練習

你负责一个SAP Integration Suite接口的生产发布，请用日语进行约60秒的发布前说明，包含以下信息：

- 生产部署时间为20点
- HTTP错误率连续5分钟超过3%时回滚
- 保留消息超过50条时回滚
- 一旦发现员工主数据错误或重复更新，不受经过时间影响，立即停止处理
- 如果20点30分仍无法判断能够恢复，就切回前一个稳定版本
- 发布负责人作出最终决定
- 应用回滚不会自动撤销已经发送到SuccessFactors的数据
- 回滚后分别报告服务恢复与数据一致性确认结果

请至少使用以下三个表达：

- 判断基準
- 復旧の見込み
- データ整合性
- ～に先立って
- ～ない限り
- ～にかかわらず
- ～をもって

## 参考答案

> 二十時の本番反映に先立って、切り戻し条件を共有します。HTTPエラー率が五分間継続して三パーセントを超えた場合、または保留メッセージが五十件を超えた場合は、切り戻しを開始します。また、従業員マスタの誤更新や重複が確認された場合は、経過時間にかかわらず直ちに処理を停止します。二十時三十分までに復旧の見込みが立たない場合は、判定会をもってリリース責任者が最終判断を下し、直前の安定版へ戻します。ただし、アプリケーションをロールバックしても、SuccessFactorsへ送信済みのデータは自動では取り消されません。サービス復旧後もデータ整合性を確認し、必要な補正が完了しない限り、通常処理は再開しません。復旧状況とデータ確認結果は分けて報告します。

## 今日のポイント

- 回滚条件应包括：**观测指标、阈值、持续时间、判断时点和负责人**
- 「ロールバック」必须说明回滚的是应用、配置、数据库事务还是流量
- 应用版本回退不等于外部系统中的业务数据被撤销
- 严重的数据破坏或安全问题可以设置为不受经过时间影响的立即停止条件
- 调查时间越长，越容易错过安全退出窗口，因此应预先决定撤退界限
- 发布后的完成状态至少要分为：**服务恢复、数据核对完成、业务处理重新开始**`,
  },
  "en-rollback-criteria-release-guardrails": {
    title: "Defining Rollback Criteria and Release Guardrails",
    sourceId: "3b7d34cbae1981f39c8adf3a0f0b1726",
    markdown: `Today’s focus: deciding when a production change must stop, roll back, or continue—and separating service recovery from data repair.

## Architecture Review

**Less precise**

> If anything goes wrong, we will roll back.

**Senior-architect phrasing**

> Rollback must be an executable control, not a general intention. Define observable triggers, the decision window, the authorized decision-maker, and the exact state we can safely restore.

> Before approval, we need evidence that the previous version remains deployable, configuration is compatible, data changes are reversible or compensatable, and dependent systems can tolerate the transition.

> A successful application rollback restores code, not necessarily business data, messages already published, or side effects completed in downstream systems.

## Technical Design Discussion

> Define release guardrails using measurable signals: error rate, latency, saturation, backlog growth, data-integrity checks, and critical business outcomes.

> Specify both threshold and duration. A brief transient spike and a sustained failure should not trigger the same response.

> Mark the point of no return. After an irreversible schema or business-data change, rollback may be less safe than roll-forward or controlled compensation.

> Keep the last known-good artifact, configuration, feature-flag state, and deployment procedure available throughout the observation window.

> Assign release authority explicitly. Monitoring can recommend rollback, but one accountable role must make or delegate the final decision.

## Incident / Debugging

**Less natural**

> The release had many errors, so we changed it back.

**More natural**

> The HTTP error rate exceeded three percent for five consecutive minutes, and the message backlog continued to grow. Those conditions met the agreed rollback criteria.

> Let’s separate four questions: Did the service recover? Which requests failed? Which writes reached downstream systems? What reconciliation or compensation remains?

> The immediate action is to stop new processing, preserve evidence, restore the last known-good version, and prevent automatic replay until data integrity is confirmed.

## Stakeholder Update

> We rolled back the production change after the agreed error-rate and backlog thresholds were exceeded. Service availability has recovered on the previous stable version. We are now reconciling transactions processed during the affected window. Application recovery is complete; data verification is still in progress, so normal replay remains paused.

## Code Review / Mentoring

> This migration removes a column in the same release that stops writing to it. Use an expand-and-contract sequence so the previous version remains deployable.

> This retry worker resumes automatically after deployment. Gate replay on a verified data-integrity check and an explicit operational decision.

> The rollback script restores the application but not the feature-flag configuration. Treat code, configuration, and traffic routing as one release state.

> Add a deployment test that proves both forward and rollback paths against representative data. A documented command is not evidence that rollback is safe.

## Corrections

❌ We will roll back when the situation is bad.

✅ We will roll back if the error rate remains above three percent for five minutes, the backlog exceeds fifty messages, or any data-corruption signal is confirmed.

❌ Rollback will return everything to normal.

✅ Rollback restores the previous application state; downstream writes and externally visible side effects require separate verification and repair.

❌ We can keep investigating until we know the root cause.

✅ We will investigate within the agreed decision window. If recovery is not predictable by the cutoff, we will restore the known-good version before continuing the analysis.

❌ The deployment succeeded, so the release is complete.

✅ Deployment completed, but release acceptance depends on the observation window, business metrics, and data-integrity checks.

## Vocabulary Notes

- **rollback criteria**：回滚条件；触发停止当前版本并恢复旧版本的明确规则
- **release guardrail**：发布护栏；限制发布风险的指标、阈值和自动或人工控制
- **rollback trigger**：回滚触发条件；达到后必须启动回滚判断或动作的信号
- **decision window**：决策时间窗；允许观察和调查、但不能无限延长的时间范围
- **known-good version**：已知稳定版本；已经验证可以正常运行、可用于恢复的版本
- **point of no return**：不可逆转点；超过后直接回滚可能比继续修复更危险
- **roll-forward**：向前修复；通过新变更修正问题，而不是恢复旧版本
- **data compensation**：数据补偿；对已完成且无法直接撤销的业务操作实施纠正
- **reconciliation**：核对；比较权威记录、日志和下游结果，确认遗漏或差异
- **blast radius**：影响半径；受故障或变更影响的用户、功能、数据和系统范围
- **release authority**：发布决策权；负责批准继续、暂停或回滚的角色
- **stop-the-line condition**：立即停止条件；无需等待普通观察窗口的严重风险信号

## Speaking Drill

用约 45 秒回答：

> A production integration is deployed at 20:00. Roll back if HTTP errors remain above three percent for five minutes or the backlog exceeds fifty messages. Any duplicate employee-master update requires an immediate stop. If recovery is still uncertain at 20:30, the release owner must decide. How would you present the release guardrails?

**Model answer**

> Before deployment, I would confirm three classes of guardrail. First, we will roll back if the HTTP error rate stays above three percent for five minutes or the backlog exceeds fifty messages. Second, any confirmed duplicate or incorrect employee-master update is a stop-the-line condition, regardless of elapsed time. Third, 20:30 is the decision cutoff: if recovery is still uncertain, the release owner will restore the last known-good version. That rollback restores the application only. We must separately identify changes already sent downstream, reconcile the affected records, and keep replay paused until data integrity is confirmed.`,
  },
} as const;
