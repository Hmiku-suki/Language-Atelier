export const notionTopicContent20260803 = {
  "jp-estimation-assumptions-uncertainty": {
    title: "見積もりの前提と不確実性を伝える",
    sourceId: "3b1d34cbae198107991cef00cbabd45a",
    markdown: `## 今日のテーマと学習目標
今天学习在需求尚未完全明确时，如何给出有依据的初步估算，同时说明前提条件、不确定因素、可能的浮动范围，以及何时可以提高估算的准确度。

学习目标：

- 区分概算、正式估算、目标和承诺
- 用前提条件和范围说明估算是如何得出的
- 明确指出可能导致工期或成本变化的因素
- 提出追加调查、重新估算和决策的时间点

## 実用的な語彙・表現

### 1. 概算

**读音：** がいさん  
**中文：** 初步估算、粗略估算  
**语感与场景：** 信息不完整时计算的大致数量。不是随意猜测，但准确度低于正式估算。

> 現時点の概算では、開発とテストを合わせて十五人日から二十人日程度です。

根据目前的初步估算，开发和测试合计约为15至20人日。

### 2. 精査する

**读音：** せいさする  
**中文：** 仔细核查、详细审查  
**语感与场景：** 比「詳しく見る」正式，常用于需求、费用、日志和影响范围。

> インターフェース仕様を精査したうえで、正式な工数を提示します。

详细核查接口规格后，我们会提供正式工时估算。

### 3. 前提条件

**读音：** ぜんていじょうけん  
**中文：** 前提条件  
**语感与场景：** 指估算成立所依赖的范围、人员、环境或外部系统状态。

> この見積もりは、既存の認証方式を変更しないことを前提条件としています。

该估算以不改变现有认证方式为前提条件。

### 4. 不確実性

**读音：** ふかくじつせい  
**中文：** 不确定性  
**语感与场景：** 不是单纯说“不知道”，而是表示哪些信息尚未确定，以及它会怎样影响判断。

> 外部APIの制限が確認できていないため、性能試験の工数には不確実性が残っています。

由于尚未确认外部 API 的限制，性能测试工时仍存在不确定性。

### 5. 振れ幅

**读音：** ふれはば  
**中文：** 波动范围、上下浮动幅度  
**语感与场景：** 用于工时、成本、性能或数值可能变化的范围。

> データ変換の複雑さによって、工数には五人日程度の振れ幅があります。

根据数据转换的复杂程度，工时可能上下浮动约5人日。

### 6. 工数を見積もる

**读音：** こうすうをみつもる  
**中文：** 估算工作量  
**语感与场景：** 「工数」通常以人时、人日或人月表示，不等于日历上的经过时间。

> 設計、実装、単体テストを分けて工数を見積もります。

我们会分别估算设计、实现和单元测试的工作量。

### 7. 確度を上げる

**读音：** かくどをあげる  
**中文：** 提高准确度、可信度  
**语感与场景：** 常用于估算、预测和计划。通过调查减少未知因素后，估算的可信度提高。

> サンプルデータで接続検証を行えば、見積もりの確度を上げられます。

如果使用样本数据进行连接验证，就能提高估算的准确度。

### 8. バッファを持たせる

**读音：** バッファをもたせる  
**中文：** 预留缓冲时间或资源  
**语感与场景：** 缓冲不是为了掩盖估算不准确，而是应对已识别但无法完全消除的风险。

> 外部ベンダーへの問い合わせ期間を考慮し、日程に一週間のバッファを持たせています。

考虑到向外部供应商咨询所需的时间，日程中预留了一周缓冲期。

### 9. 楽観的な見積もり

**读音：** らっかんてきなみつもり  
**中文：** 乐观估算  
**语感与场景：** 假设问题较少、条件顺利时的估算。并非一定“不负责任”，但必须说明条件。

> 最短二週間というのは、追加改修が発生しない場合の楽観的な見積もりです。

最短两周，是在不发生追加改修时的乐观估算。

### 10. 保守的な見積もり

**读音：** ほしゅてきなみつもり  
**中文：** 保守估算  
**语感与场景：** 将可预见风险纳入后，给出相对稳妥的估算，并不等于故意报高。

> 未確定事項を考慮すると、四週間という保守的な見積もりが妥当です。

考虑到尚未确定的事项，保守估算为四周较为合理。

### 11. 再見積もり

**读音：** さいみつもり  
**中文：** 重新估算  
**语感与场景：** 当前提、范围或已知信息发生实质变化时更新估算，不应被视为单纯推翻原计划。

> 要件確定後に再見積もりを行い、正式な納期をご相談します。

需求确定后将重新估算，再就正式交期进行协商。

## 高階文法・文型

### 1. ～を前提とした場合

表示某个结论只在指定条件成立时有效。

> 既存機能を流用できることを前提とした場合、実装は十人日程度で完了する見込みです。

如果以能够复用现有功能为前提，预计实现约需10人日。

与「～なら」相比：

- 「～なら」是一般条件表达
- 「～を前提とした場合」强调该条件是估算或设计成立的基础
- 正式说明时应同时指出前提不成立后的影响

### 2. ～次第で

表示结果会根据某项尚未确定的因素而变化。

> 先方から提供されるデータの品質次第で、変換処理の工数が増える可能性があります。

根据对方提供的数据质量，数据转换工时可能增加。

与「～によって」相比：

- 「～によって」广泛表示原因、方式或差异
- 「～次第で」强调结果取决于尚未确定的内容
- 用于估算时，应尽量说明可能向哪个方向变化

### 3. ～を見込む

表示事先把某种数量、期间或可能性纳入计划。

> 結合テストには、障害修正を含めて二週間を見込んでいます。

集成测试预计需要两周，其中包含故障修正时间。

与「～と思う」相比：

- 「～と思う」只是表达个人判断
- 「～を見込む」表示已将该数值正式纳入计划或估算
- 使用时应有一定依据，不能只是直觉

### 4. ～を余儀なくされる可能性がある

表示由于外部条件，可能不得不改变计划，语气正式。

> API仕様が大きく変更された場合は、設計の見直しを余儀なくされる可能性があります。

如果 API 规格发生较大变更，可能不得不重新审视设计。

与「～なければならないかもしれない」相比：

- 两者都能表示“可能必须”
- 「～を余儀なくされる」强调外部条件迫使计划改变
- 商务说明中适合表达风险，但应同时给出触发条件

## 自然な会話

**场景：客户希望两周内完成 SuccessFactors 新接口，但部分规格尚未确认。**

**お客様：**

> この連携機能は、二週間あれば完成しますか。できれば今月中にリリースしたいです。

**アーキテクト：**

> 現時点の概算では、最短で二週間です。ただし、これは既存の認証方式と共通処理を流用できることを前提とした場合の、楽観的な見積もりです。

**お客様：**

> 二週間で進められる可能性はあるのですね。

**アーキテクト：**

> はい。ただ、確約できる段階ではありません。特に、SuccessFactors側の一回当たりの更新件数と、エラー時の応答形式がまだ確認できていません。この二点次第で、分割処理と再実行制御の追加が必要になります。

**お客様：**

> 追加になった場合、どの程度延びますか。

**アーキテクト：**

> 現時点では、設計とテストを含めて五人日から十人日程度の振れ幅を見込んでいます。そのため、計画上は三週間、外部確認の期間まで含めるなら四週間が保守的な見積もりです。

**お客様：**

> 今月中という目標は維持できますか。

**アーキテクト：**

> 目標としては維持できますが、正式なコミットメントとは分けて管理したいです。水曜日までにサンプルデータで接続検証を行い、金曜日に再見積もりを提示します。その時点で、今月中のリリース可否を判断させてください。

**お客様：**

> 分かりました。それまでは三週間を暫定計画として扱います。

**アーキテクト：**

> ありがとうございます。あわせて、前提条件と未確定事項を見積書に明記します。

## よくある中式・不自然な表現の修正

### 1. 「大概需要两周」を曖昧に伝える

❌ 大体二週間ぐらいだと思います。

✅ 現時点の概算では二週間から三週間ですが、API制限の確認後に再見積もりします。

「大体」「ぐらい」「と思います」叠加后，听者无法判断依据和准确度。应说明范围与更新时点。

### 2. 初步估算を承诺のように言う

❌ 二週間で必ずできます。

✅ 既存機能を流用できることを前提とした場合、最短二週間で完了する見込みです。

在规格未确定时使用「必ず」会把条件性估算变成无条件承诺。

### 3. 风险を「可能性があります」だけで終える

❌ 工数が増える可能性があります。

✅ データ形式が現行仕様と異なる場合、変換処理の追加により、五人日程度増える可能性があります。

风险说明应包含触发条件、影响对象和大致程度。

### 4. バッファを隠す

❌ 実装は二週間ですが、念のため四週間ください。

✅ 実装とテストに三週間、外部問い合わせの回答待ちに一週間のバッファを見込んでいます。

「念のため」无法解释为何多出两周。缓冲时间也应对应具体风险。

### 5. 前提变化后仍坚持原估算

❌ 最初に二週間と言ったので、仕様が増えても二週間で対応します。

✅ 対象範囲が当初の前提から変わったため、追加分を精査し、再見積もりさせてください。

专业性不是永远不改数字，而是在前提变化时透明地更新估算。

## 口頭・作文練習

你正在估算一个新的 SuccessFactors OData 联携功能，当前情况如下：

- 初步范围是设计、实现和测试
- 目前概算为15～25人日
- 尚未确认批量更新的件数限制
- 字段映射中有三个项目等待业务确认
- 如果可以复用现有公共处理，工时接近下限
- 如果需要增加分割、重试和个别错误处理，工时接近上限
- 周四前完成技术验证，周五提供重新估算
- 当前项目计划可暂时按四周安排，但不能作为正式承诺

请用日语进行约60秒的估算说明。至少使用以下三个表达：

- 概算
- 前提条件
- 振れ幅
- 確度を上げる
- ～次第で
- ～を見込む
- 再見積もり

## 参考答案

> 現時点では、設計、実装、テストを合わせて十五人日から二十五人日という概算です。この振れ幅がある主な理由は、SuccessFactors側の一回当たりの更新件数制限が未確認であることと、三項目のマッピングが業務確認中であることです。既存の共通処理を流用できることを前提とした場合は下限に近づきますが、制限内容次第では、分割、リトライ、個別エラー処理の追加が必要となり、上限に近づく見込みです。木曜日までに接続と更新方式を検証し、見積もりの確度を上げます。その結果を反映して金曜日に再見積もりを提示します。それまでは四週間を暫定的な計画として置けますが、現段階では正式な納期の確約ではない点をご理解ください。

## 今日のポイント

- 估算说明应包括：**数值范围、前提、未知因素、变动方向和更新时点**
- 「最短两周」通常是特定条件下的乐观估算，不等于两周内必定完成
- 工时和日历工期不是同一个概念，还需要考虑人员配置、等待时间和并行关系
- 缓冲时间应对应已识别的风险，而不是用「念のため」笼统解释
- 前提或范围发生变化时重新估算，是提高透明度，不是推卸责任`,
  },
  "en-control-plane-data-plane": {
    title: "Separating Control-Plane and Data-Plane Responsibilities",
    sourceId: "3b1d34cbae1981b7a357f9725d61a706",
    markdown: `Today’s focus: preventing administrative operations, configuration failures, and management-plane outages from disrupting the runtime path that serves customer traffic.

## Architecture Review

**Less precise**

> The admin API and customer API are separate endpoints, so they are isolated.

**Senior-architect phrasing**

> Separate endpoints do not prove isolation if both paths share the same identity, compute pool, database connection limits, deployment lifecycle, or failure domain.

> Before approving the design, we should define the control-plane and data-plane responsibilities, shared dependencies, capacity boundaries, authorization model, consistency expectations, and behavior when the control plane is unavailable.

> The data plane should continue serving from the last known valid configuration whenever doing so preserves safety and correctness.

## Technical Design Discussion

> Keep configuration distribution asynchronous. Runtime requests should not synchronously call the control plane for information that can be validated, versioned, and cached locally.

> Treat configuration as a versioned artifact. Validate it before activation, retain the previous known-good version, and make rollback deterministic.

> Separate identities and permissions: control-plane operators may change policy, while data-plane workloads should receive only the configuration required to serve traffic.

> Define propagation semantics explicitly. We need to know whether a change is immediately consistent, eventually consistent, or activated only after a coordinated readiness check.

> Isolate capacity so that a bulk policy update or an administrative query cannot exhaust the workers, connections, or storage throughput required by customer requests.

## Incident / Debugging

**Less natural**

> The management service was down, so all customer requests failed.

**More natural**

> Customer traffic failed because the request path depended synchronously on the control plane for configuration lookup.

> Let’s determine whether the data plane has a valid cached configuration, when it was last refreshed, which version is active, and whether the failure is in distribution, validation, activation, or runtime evaluation.

> The immediate mitigation is to pin the last known-good configuration and remove the unavailable control-plane call from the critical path.

## Stakeholder Update

> An outage in the configuration-management service affected customer requests because one runtime check still depended on that service synchronously. We have restored traffic using the last validated configuration. Administrative changes are temporarily paused, but existing customer operations are available. We are now separating the remaining runtime dependency and adding versioned rollback controls before configuration updates resume.

## Code Review / Mentoring

> This request handler fetches policy from the control plane on every call. Cache a validated version in the data plane and refresh it asynchronously.

> The new configuration becomes active before all required fields are validated. Build and validate the complete snapshot first, then switch versions atomically.

> This fallback accepts an empty policy when configuration retrieval fails. Use the last known-good policy or fail closed where the rule protects a security invariant.

> Please include the configuration version and correlation ID in logs so that incidents can be tied to the exact policy evaluated.

## Corrections

❌ The control plane is not customer-facing, so its availability is not important.

✅ The control plane may tolerate lower availability only if the data plane can continue operating safely without synchronous access to it.

❌ We separated the APIs, so there is no shared failure risk.

✅ The interfaces are separate, but we still need to isolate compute, storage, identity, deployment, and dependency failure domains.

❌ Configuration is small, so we can read it from the database for every request.

✅ Configuration size does not remove the runtime dependency; distribute validated versions and keep database access out of the critical path.

❌ If a configuration update fails, we can use an empty default.

✅ On update failure, retain the last known-good configuration unless an explicit safety requirement requires the data plane to reject traffic.

## Vocabulary Notes

- **control plane**：控制平面；负责配置、策略、部署和管理操作的系统部分
- **data plane**：数据平面；直接处理运行时流量和业务请求的系统部分
- **critical path**：关键路径；完成核心用户请求必须经过的调用链
- **configuration snapshot**：配置快照；在某一版本下完整且一致的一组配置
- **last known-good configuration**：最近已知有效配置；经过验证且可安全继续使用的上一版本
- **configuration propagation**：配置传播；把变更分发到各运行实例的过程
- **atomic activation**：原子激活；完整配置一次性切换生效，避免部分新旧状态混合
- **failure domain**：故障域；可能被同一故障同时影响的一组组件
- **management operation**：管理操作；修改配置、策略、租户或部署状态的操作
- **stale configuration**：陈旧配置；仍可读取但未包含最新变更的配置
- **fail closed**：失败关闭；安全条件无法验证时拒绝操作
- **version pinning**：版本固定；临时锁定在一个已验证版本，阻止自动切换

## Speaking Drill

用约 45 秒回答：

> A customer API calls a central policy service on every request. During a policy-service outage, all customer traffic returns errors even though the policies have not changed. How would you redesign the system?

依次说明：

1. Remove the synchronous dependency
2. Distribute and validate configuration versions
3. Define stale-data and fail-closed behavior
4. Add isolation, rollback, and observability

**Model answer**

> I would remove the policy service from the synchronous request path and distribute versioned policy snapshots to the data-plane instances. Each snapshot should be fully validated before it is activated atomically, and the previous known-good version should remain available for rollback. During a control-plane outage, the data plane can continue using the last validated policy within an agreed staleness window; security-sensitive operations should fail closed if that policy is no longer trustworthy. I would also isolate control-plane capacity and deployment from customer traffic, and record the active policy version with each authorization decision so that incidents are traceable.`,
  },
} as const;
