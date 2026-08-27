export const notionTopicContent20260731 = {
  "jp-api-backward-compatibility": {
    title: "API変更で後方互換性を確保する",
    sourceId: "3aed34cbae19815bb2dfcffa6d947ccd",
    markdown: `## 今日のテーマと学習目標
今天的主题是：在 API 或消息格式发生变化时，如何说明兼容性风险，并通过版本并存、迁移期限和弃用流程，让调用方能够安全迁移。
学习目标：
- 区分向后兼容、破坏性变更与临时兼容措施
- 说明旧版何时停止支持，以及调用方需要完成什么
- 在架构评审中提出迁移路径、验证标准和回退条件
- 避免只说“应该没问题”，改用可验证的条件表达判断
## 実用的な語彙・表現
### 1. 後方互換性
**读音：** こうほうごかんせい  
**中文：** 向后兼容性  
**语感与场景：** 指新版本仍能处理旧版调用方式或旧数据。技术会议中也常简称为「後方互換」。
> 新しい項目を追加しても、既存のクライアントがそのまま動作するよう、後方互換性を維持します。
即使增加新字段，也会保持向后兼容，让现有客户端能够继续运行。
### 2. 破壊的変更
**读音：** はかいてきへんこう  
**中文：** 破坏性变更、不兼容变更  
**语感与场景：** 指删除字段、改变数据类型、修改必填条件等会使现有调用方失效的变更。
> 必須項目の追加は、既存クライアントにとって破壊的変更になり得ます。
增加必填字段可能会成为现有客户端的破坏性变更。
### 3. 既存の呼び出し元
**读音：** きそんのよびだしもと  
**中文：** 现有调用方  
**语感与场景：** 比「APIを使うシステム」更精确，指调用该接口的应用、服务或批处理。
> 既存の呼び出し元をすべて把握してから、変更の影響範囲を判断する必要があります。
需要先掌握所有现有调用方，再判断变更的影响范围。
### 4. 影響を受ける
**读音：** えいきょうをうける  
**中文：** 受到影响  
**语感与场景：** 应具体说明谁在什么条件下受到何种影响，不要只说「影響があります」。
> 旧バージョンのレスポンス形式を前提としている処理が影響を受けます。
以旧版响应格式为前提的处理会受到影响。
### 5. 段階的に移行する
**读音：** だんかいてきにいこうする  
**中文：** 分阶段迁移  
**语感与场景：** 不是一次性切换，而是按调用方、流量或功能逐步转移。
> 一斉切り替えではなく、利用部門ごとに段階的に移行する方針です。
我们的方针不是一次性切换，而是按使用部门分阶段迁移。
### 6. 移行期間を設ける
**读音：** いこうきかんをもうける  
**中文：** 设置迁移期  
**语感与场景：** 「設ける」比「作る」正式，强调有计划地保留新旧版本并存时间。
> 新旧APIを三か月間並行稼働させ、移行期間を設けます。
新旧 API 将并行运行三个月，以提供迁移期。
### 7. 非推奨とする
**读音：** ひすいしょうとする  
**中文：** 标记为不推荐使用、弃用  
**语感与场景：** 对应 deprecate。表示暂时仍可使用，但不建议新开发继续采用，并不等于立即停止。
> 旧エンドポイントは次回リリースから非推奨としますが、すぐには停止しません。
旧端点从下次发布起将标记为不推荐使用，但不会立即停止。
### 8. 廃止予告
**读音：** はいしよこく  
**中文：** 停用预告、弃用通知  
**语感与场景：** 在正式停止前，提前说明对象、日期、替代方案和所需行动。
> 廃止予告には、終了日だけでなく、代替APIと移行手順も明記してください。
停用预告中不仅要写明结束日期，也请明确替代 API 和迁移步骤。
### 9. 並行稼働
**读音：** へいこうかどう  
**中文：** 并行运行  
**语感与场景：** 新旧系统或版本同时运行。并行期越长，运维和测试成本通常越高。
> 並行稼働中は、両バージョンの監視と障害対応が必要になります。
并行运行期间，需要同时监控两个版本并处理故障。
### 10. 切り戻し
**读音：** きりもどし  
**中文：** 回退、切回旧版本  
**语感与场景：** 常用于发布和迁移。不是抽象的「元に戻す」，而是按预定步骤恢复旧路径。
> エラー率が基準値を超えた場合は、旧APIへ切り戻します。
如果错误率超过基准值，就切回旧 API。
### 11. 移行状況を追跡する
**读音：** いこうじょうきょうをついせきする  
**中文：** 跟踪迁移进度  
**语感与场景：** 需要知道哪些调用方已迁移、哪些仍使用旧版，而不只是发布通知后等待。
> アクセスログを用いて、呼び出し元ごとの移行状況を追跡します。
我们将通过访问日志跟踪各调用方的迁移进度。
## 高階文法・文型
### 1. ～を維持したまま
表示在保持某种状态不变的情况下进行另一项改变。
> 後方互換性を維持したまま、新しいレスポンス項目を追加します。
在保持向后兼容的同时，增加新的响应字段。
与「～ながら」相比：
- 「～ながら」主要表示两个动作同时进行，或带有转折
- 「～を維持したまま」强调某项条件在变更过程中不被破坏
- 技术说明中适合表达必须守住的设计约束
### 2. ～に先立って
表示在重要动作之前，预先进行准备或通知，语气正式。
> 旧APIの廃止に先立って、利用状況の確認と移行案内を実施します。
在停用旧 API 之前，将先确认使用情况并发送迁移通知。
与「～前に」相比：
- 「～前に」是普通的时间先后
- 「～に先立って」强调为后续重要事项进行正式准备
- 常用于迁移、发布、制度变更和活动通知
### 3. ～ない限り
表示只要某个条件不成立，后项就不会发生或无法进行。
> すべての呼び出し元の移行が確認できない限り、旧APIは停止しません。
在确认所有调用方完成迁移之前，不会停止旧 API。
与「～まで」相比：
- 「～まで」主要表示时间或状态的终点
- 「～ない限り」强调这是不可缺少的判断条件
- 使用时要注意：如果现实中存在最终强制截止日，就应同时说明例外或期限
### 4. ～をもって
表示以某个日期、结果或条件作为正式界线，常用于通知。
> 九月三十日をもって、旧バージョンのサポートを終了します。
旧版本的支持将于 9 月 30 日正式结束。
与「～から」相比：
- 「～から」只是说明起始时间
- 「～をもって」强调某一时点是制度或服务状态改变的正式界线
- 适合正式通知，但日常口语中会显得过于郑重
## 自然な会話
**场景：团队计划修改员工信息 API 的响应格式，正在进行架构评审。**
**開発担当：**
> 次回リリースで、従業員区分を表す「employeeType」を文字列からオブジェクトに変更したいと考えています。
**アーキテクト：**
> 既存の呼び出し元は、文字列であることを前提に実装されていませんか。形式を直接変更すると、破壊的変更になる可能性があります。
**開発担当：**
> 社内システムだけなので、同じ日に修正すれば問題ないと思います。
**アーキテクト：**
> 呼び出し元と担当者がすべて特定できているなら一斉切り替えも検討できます。ただ、「社内だけ」という理由だけでは安全とは判断できません。夜間バッチや保守ツールを含め、利用状況を確認しましょう。
**開発担当：**
> では、新しい項目を別名で追加し、古い項目もしばらく残す案はどうでしょうか。
**アーキテクト：**
> そのほうが後方互換性を維持しやすいです。まず「employeeTypeDetail」を任意項目として追加し、新規開発ではそちらを利用します。旧項目は非推奨とし、三か月の移行期間を設ける案が現実的だと思います。
**開発担当：**
> 三か月後に旧項目を削除すればよいですか。
**アーキテクト：**
> 日付だけで自動的に削除するのではなく、アクセスログで移行状況を追跡しましょう。廃止に先立って各担当者へ通知し、旧項目へのアクセスがなくなったことを確認したうえで最終判断します。
**開発担当：**
> 移行後に問題が見つかった場合はどうしますか。
**アーキテクト：**
> 並行稼働中であれば旧形式へ切り戻せます。新旧両方のテスト、監視項目、切り戻し条件まで設計に含めてください。
## よくある中式・不自然な表現の修正
### 1. 「兼容」をそのままカタカナにする
❌ このAPIはコンパチできます。
✅ このAPIは旧バージョンとの互換性を維持しています。  
✅ 既存クライアントへの後方互換性があります。
「コンパチ」也有人使用，但较口语且含义不够明确。正式说明中应明确是哪一种兼容性。
### 2. 「影響がない」と早く断定する
❌ 項目を追加するだけなので、影響がありません。
✅ 任意項目の追加であり、既存クライアントが未知の項目を無視できることを確認できれば、影響は限定的です。
即使只是增加字段，如果调用方采用严格模式解析，也可能失败。应说明判断成立的条件。
### 3. 「旧APIを閉じる」と表現する
△ 来月、旧APIを閉じます。
✅ 来月末をもって、旧APIの提供を終了します。  
✅ 移行状況を確認したうえで、旧エンドポイントを廃止します。
「閉じる」可以理解，但在服务停用通知中「提供を終了する」「廃止する」更自然、明确。
### 4. 通知しただけで責任を終える
❌ メールを送ったので、移行は大丈夫です。
✅ 通知後もアクセスログで利用状況を確認し、未移行の呼び出し元には個別に連絡します。
发出通知不代表对方已经阅读或完成迁移。迁移管理需要可观察的完成证据。
### 5. 曖昧な期限を使う
❌ なるべく早く新APIに変更してください。
✅ 九月三十日までに新APIへの移行を完了してください。難しい場合は、八月末までにご相談ください。
「尽快」无法用于管理进度。需要明确完成期限，以及无法按时完成时的联系期限。
## 口頭・作文練習
你负责一个被五个内部系统调用的员工主数据 API。计划进行以下变更：
- 旧版使用字段「departmentCode」
- 新版希望改为包含代码和名称的「department」
- 直接改变数据类型会破坏现有客户端
- 新字段先作为可选字段追加
- 新旧字段并存四个月
- 通过日志确认各系统的迁移情况
- 旧字段停用前一个月再次通知
- 如果仍有调用方未完成迁移，需要判断延期还是提供个别支持
请用日语进行约 60 秒的架构说明。至少使用以下三个表达：
- 後方互換性
- 破壊的変更
- 移行期間を設ける
- ～に先立って
- ～ない限り
- 移行状況を追跡する
## 参考答案
> 今回、従業員マスターAPIの部門情報を拡張します。既存の「departmentCode」を直接オブジェクト型に変更すると、五つの呼び出し元に対する破壊的変更になるため、その方法は採用しません。後方互換性を維持したまま、新しい「department」を任意項目として追加します。そのうえで新旧項目を四か月間並行稼働させ、移行期間を設けます。各システムの移行状況はアクセスログで追跡し、旧項目の廃止に先立って一か月前に再度通知します。原則として、すべての呼び出し元の移行が確認できない限り、旧項目は削除しません。ただし、期限時点で未移行のシステムが残っている場合は、影響と対応計画を確認し、廃止延期または個別支援のどちらが妥当かを判断します。
## 今日のポイント
- API 变更前应确认：**调用方、兼容性、迁移期限、监控方式和回退条件**
- 「非推奨」不是立即停用，而是提醒调用方开始迁移
- “已经通知”不等于“已经迁移”，需要通过日志或确认结果追踪
- 并行运行能降低切换风险，但会增加测试、监控和维护成本
- 对兼容性的判断应写出成立条件，避免使用无依据的「影響ありません」`,
  },
  "en-trust-boundaries-least-privilege": {
    title: "Defining Trust Boundaries and Least-Privilege Service Access",
    sourceId: "3aed34cbae19814cba27c630dfd67a94",
    markdown: `Today’s focus: designing service-to-service access so that identity, authorization, credential scope, and failure behavior are explicit rather than inherited from network location.
## Architecture Review
**Less precise**
> The services are inside our network, so they can trust each other.
**Senior-architect phrasing**
> Network location is not an authorization model.
> Before approving the design, we should identify the trust boundaries, workload identities, allowed operations, credential lifetime, rotation and revocation procedures, and required audit evidence.
> Authenticate the caller and authorize the requested operation separately. A valid token is not blanket permission to access every resource.
## Technical Design Discussion
> Use a distinct workload identity for each service and environment; avoid shared service accounts that make activity difficult to attribute or contain.
> Scope permissions by resource, action, and tenant where possible. Separate read, write, and administrative privileges.
> Prefer short-lived credentials issued through managed identity or token exchange over static secrets stored in configuration.
> Validate the token signature, issuer, audience, expiry, and required scopes or claims—not merely the presence of a token.
> Define behavior when the identity provider or policy engine is unavailable. Security-sensitive operations should fail closed.
> Credential rollover should support a controlled overlap period so that rotation does not create an avoidable outage.
## Incident / Debugging
**Less natural**
> Authentication is okay, but the API returned forbidden.
**More natural**
> The caller was authenticated successfully, but authorization was denied because the token does not include the scope required for this operation.
> Let’s verify the caller identity, token audience, scopes or roles, policy decision, clock skew, and any recent policy or credential changes.
> We should distinguish a 401 authentication failure from a 403 authorization denial; they indicate different causes and recovery paths.
> If a credential may have been exposed, revoke or rotate the affected credential, restrict its permissions, and inspect the audit trail. Do not rotate unrelated credentials blindly.
## Stakeholder Update
> We identified unauthorized use of a service credential outside its intended workload. Access has been revoked, the affected integration is temporarily paused, and no confirmed data modification has been found. We are reviewing audit records and replacing the shared credential with workload-specific, short-lived identities before restoring traffic.
## Code Review / Mentoring
> This client uses a shared static secret embedded in configuration. Replace it with a workload-specific identity and retrieve short-lived credentials at runtime.
> Checking that a JWT is well formed is insufficient. Validate its signature, issuer, audience, expiry, and required scope.
> This permission grants write access to every tenant although the job reads only one dataset. Narrow both the resource and action scope.
> Do not log tokens or secret values. Record the workload identity, authorization decision, policy version, requested resource, and correlation ID.
## Corrections
❌ The request has a token, so it is authorized.
✅ A token establishes claims about the caller; authorization still requires validating those claims against the requested operation.
❌ Internal services do not need strict permissions.
✅ Internal services still cross trust boundaries and should receive only the permissions required for their responsibilities.
❌ We can keep the secret forever if it is encrypted.
✅ Encryption protects stored credentials, but credentials still need a limited lifetime, rotation, revocation, and usage monitoring.
❌ We should return 401 for every access problem.
✅ Use 401 when authentication is missing or invalid, and 403 when an authenticated caller lacks permission.
## Vocabulary Notes
- **trust boundary**：信任边界；身份或权限假设发生变化、必须重新验证的边界
- **workload identity**：工作负载身份；代表服务、任务或运行实例的机器身份
- **least privilege**：最小权限；只授予完成职责所需的最小资源和操作权限
- **credential rotation**：凭据轮换；安全替换密钥、证书或秘密
- **revocation**：撤销；在自然到期前使凭据或权限立即失效
- **token audience**：令牌受众；令牌被签发给哪个目标服务
- **scope**：权限范围；令牌允许执行的操作或访问的资源
- **fail closed**：失败关闭；安全依赖异常时拒绝访问而不是放行
- **shared credential**：共享凭据；多个服务或环境共同使用、难以追踪和撤销的身份凭据
- **policy decision**：策略判定；授权引擎对特定主体、操作和资源的允许或拒绝结果
- **audit trail**：审计轨迹；记录谁在何时以什么身份访问了什么资源
## Speaking Drill
用约 45 秒回答：
> A batch integration and an interactive API share the same service account with broad read and write access. How would you redesign the access model?
依次说明：
1. Separate identities
2. Permission boundaries
3. Credential lifecycle
4. Audit and incident response
**Model answer**
> I would give the batch job and interactive API separate workload identities so that their activity and risk can be isolated. Each identity should receive only the resources and operations it requires: the batch job may need bounded write access, while the interactive API may need tenant-scoped reads. I would replace the long-lived shared secret with short-lived credentials issued at runtime, with documented rotation and revocation procedures. Authorization decisions and resource access should be recorded with the workload identity and correlation ID. If one credential is compromised, we can then revoke that identity without interrupting the other workload.`,
  },
} as const;
