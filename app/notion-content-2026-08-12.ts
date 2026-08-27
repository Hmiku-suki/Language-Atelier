export const notionTopicContent20260812 = {
  "jp-spec-change-impact-migration": {
    title: "仕様変更の影響範囲と移行方針を説明する",
    sourceId: "3bad34cbae19815aaefcc03c5a184f5b",
    markdown: `## 今日のテーマと学習目標

今天学习在接口、数据映射或业务规则发生变化时，如何用日语说明：**哪里发生变化、哪些系统和数据会受到影响、如何兼容现有处理，以及以什么步骤完成迁移**。

学习目标：

- 区分「修改内容」与「影响范围」，避免只说明代码改动
- 自然说明现行规格、新规格和不变的部分
- 讨论后方兼容性、迁移期、回滚条件和数据恢复
- 把抽象的「有风险」拆解为输入、处理、数据和运维风险
- 在评审中提出可执行的分阶段切换方案

## 実用的な語彙・表現

### 1. 仕様変更

**读音：** しようへんこう  
**中文：** 规格变更、需求规则变更  
**语感与场景：** 不仅指代码修改，也可能涉及输入定义、业务含义、接口契约和运维规则。

> 空欄項目の扱いを変更するため、単なる実装修正ではなく、インターフェースの仕様変更として管理します。

由于要改变空白字段的处理方式，因此将其作为接口规格变更管理，而不是普通的代码修正。

### 2. 現行仕様

**读音：** げんこうしよう  
**中文：** 现行规格、当前规则  
**语感与场景：** 用于与新规格进行对照。正式说明时最好明确当前实际行为，而不只是引用旧文档。

> 現行仕様では、relUserIdが空欄のレコードは更新対象から除外しています。

按照现行规格，relUserId为空的记录不属于更新对象。

### 3. 変更点

**读音：** へんこうてん  
**中文：** 变更点  
**语感与场景：** 指新旧方案之间具体不同的部分。可以按输入、处理、输出和异常处理分别整理。

> 主な変更点は、空欄を「更新なし」ではなく「関係レコードの削除」と解釈することです。

主要变更点是把空白解释为“删除关系记录”，而不再解释为“不更新”。

### 4. 影響範囲

**读音：** えいきょうはんい  
**中文：** 影响范围  
**语感与场景：** 应具体说明受影响的系统、功能、数据、用户、环境和时间段，不能只说「影響があります」。

> 影響範囲はマッピング処理だけでなく、入力チェック、再実行制御、監査ログにも及びます。

影响范围不仅包括映射处理，也涉及输入检查、重新执行控制和审计日志。

### 5. 後方互換性

**读音：** こうほうごかんせい  
**中文：** 后向兼容性  
**语感与场景：** 指新版本能否继续接受或正确处理旧格式、旧客户端或旧数据。技术讨论中也常直接说「下位互換性」。

> 過去のファイルに意図しない空欄が含まれるため、そのまま切り替えると後方互換性を保てません。

过去的文件中可能包含非故意的空白，因此直接切换无法维持后向兼容性。

### 6. 切り替える

**读音：** きりかえる  
**中文：** 切换、转换到新方式  
**语感与场景：** 可用于版本、系统、连接目标和处理规则。最好同时说明切换单位、时间和完成条件。

> 送信元ごとに確認を行い、準備が整ったものから新仕様へ切り替えます。

我们会逐一确认各发送方，从准备完成的对象开始切换到新规格。

### 7. 段階的に導入する

**读音：** だんかいてきにどうにゅうする  
**中文：** 分阶段导入  
**语感与场景：** 先对部分数据、用户或环境启用，再根据结果扩大范围，与一次性全面上线相对。

> まず検証環境と一つの連携先で有効化し、問題がないことを確認してから段階的に導入します。

首先在验证环境和一个对接方启用，确认没有问题后再分阶段导入。

### 8. 移行期間

**读音：** いこうきかん  
**中文：** 迁移期、过渡期  
**语感与场景：** 旧方式与新方式并存或进行准备的时间段。需要明确期限、允许的行为和结束条件。

> 二週間の移行期間を設け、その間は空欄を検出しても削除せず、警告だけを出します。

我们设置两周迁移期，在此期间即使检测到空白也不执行删除，只发出警告。

### 9. 経過措置

**读音：** けいかそち  
**中文：** 过渡措施、临时适用规则  
**语感与场景：** 比「暫定対応」更强调从旧制度过渡到新制度期间的特别安排，常用于正式通知和规则变更。

> 経過措置として、旧フォーマットの受け付けを月末まで継続します。

作为过渡措施，旧格式将继续受理到本月底。

### 10. ロールバック

**读音：** ロールバック  
**中文：** 回滚、恢复到变更前状态  
**语感与场景：** 必须区分“停止新逻辑”和“恢复已被修改的数据”。关闭功能并不会自动还原已经删除的记录。

> 処理のロールバックは可能ですが、削除済みデータの復元には別途リカバリー手順が必要です。

处理逻辑可以回滚，但恢复已经删除的数据需要单独的恢复流程。

### 11. 判断基準

**读音：** はんだんきじゅん  
**中文：** 判断标准、决策条件  
**语感与场景：** 用于明确何时继续、停止、扩大范围或回滚，避免只凭现场感觉决定。

> 削除件数とエラー率を切り替え後の判断基準として、事前に合意しておきます。

我们会事先约定，以删除数量和错误率作为切换后的判断标准。

## 高階文法・文型

### 1. ～に伴い

表示随着某项变化发生，相关事项也随之变化，常用于正式通知、规格说明和业务报告。

> 削除仕様の追加に伴い、入力チェックと監査ログの設計も見直します。

随着删除规格的增加，我们也将重新审视输入检查和审计日志设计。

与「～につれて」相比：

- 「～につれて」多表示某种程度连续变化，如人数增加、情况逐渐变化
- 「～に伴い」常表示制度、规格或事件变化所带来的相关影响
- 正式说明“因变更而需要采取哪些措施”时，「～に伴い」更自然

### 2. ～にとどまらず

表示影响或范围不局限于前项，还扩展到后项，属于较正式的N1表达。

> 今回の変更は変換ロジックにとどまらず、再実行時の安全性にも影響します。

本次变更不仅限于转换逻辑，还会影响重新执行时的安全性。

与「～だけでなく」相比：

- 两者都表示“不仅”
- 「～だけでなく」口语和书面均可，使用范围广
- 「～にとどまらず」强调影响超出了原先容易想到的范围，适合评审和报告

### 3. ～ない限り

表示只要某个必要条件不成立，后项就不能成立或不会实施。

> 送信元で空欄の意味が統一されない限り、削除処理を本番で有効にはできません。

只要发送方尚未统一空白的含义，就不能在生产环境启用删除处理。

与「～なければ」相比：

- 「～なければ」是一般条件表达
- 「～ない限り」强调前项是后项成立不可缺少的条件
- 用于上线门槛时，应说明如何判断该条件已经满足

### 4. ～を経て

表示经过某个正式阶段或过程之后进入下一阶段，偏书面。

> 影響調査と利用部門の確認を経て、新仕様への切り替え日を決定します。

经过影响调查和业务部门确认后，再决定新规格的切换日期。

与「～たあとで」相比：

- 「～たあとで」只是普通地说明时间顺序
- 「～を経て」强调前项是正式过程、经验或必要阶段
- 设计评审、验证和审批等阶段性流程中使用更自然

## 自然な会話

**场景：SuccessFactors接口新增规则——当relUserId为空时，不再忽略该记录，而是删除既有的EmpJobRelationships记录。团队正在进行变更评审。**

**業務担当：**

> 新しい要件では、relUserIdが空欄の場合、該当する関係レコードを削除してほしいと考えています。修正範囲は大きいでしょうか。

**アーキテクト：**

> 変更するコード自体は限定的ですが、影響範囲は一か所にとどまりません。現行仕様では空欄を更新対象外としているため、まず空欄の業務上の意味を変更する必要があります。

**業務担当：**

> 空欄なら削除、値があれば更新、という理解でよいですか。

**アーキテクト：**

> 基本的にはそうですが、項目自体が存在しない場合、空文字の場合、nullの場合を区別したほうが安全です。例えば、項目なしは「変更なし」、空文字は「削除」、値ありは「登録または更新」と定義する案です。

**開発担当：**

> Upsertの処理を少し変えるだけでは対応できませんか。

**アーキテクト：**

> 削除はUpsertとは別の操作になるため、削除用リクエスト、認証、エラー処理を追加する必要があります。また、タイムアウト後に再実行した場合でも、誤って別のレコードを削除しないようにしなければなりません。

**業務担当：**

> 既存のファイルへの影響はありますか。

**アーキテクト：**

> そこが後方互換性の主な論点です。過去のファイルで、単に値が不明という理由で空欄を送っている場合、新仕様では意図せず削除される可能性があります。送信元で空欄の意味が統一されない限り、すぐに本番で有効にするのは危険です。

**開発担当：**

> では、どのように移行しますか。

**アーキテクト：**

> まず二週間の移行期間を設けます。その間は削除候補をログに記録して警告しますが、実際には削除しません。送信元がデータを確認した後、対象を限定して新仕様へ切り替えます。

**業務担当：**

> 問題があればロールバックできますか。

**アーキテクト：**

> 削除処理を停止することはできます。ただし、すでに削除されたデータは自動では戻りません。そのため、切り替え前のスナップショットと、削除対象を復元する手順も必要です。

**業務担当：**

> 分かりました。影響調査と送信元の確認を経て、正式な切り替え日を決めましょう。

## よくある中式・不自然な表現の修正

### 1. 「影响很大」を抽象的に言う

△ この変更の影響は大きいです。

✅ コード変更は一か所ですが、入力仕様、削除処理、再実行制御、監査ログに影響します。

「影響が大きい」だけでは判断材料になりません。受影响的对象和处理阶段应具体列出。

### 2. 「只改一个地方」を直訳する

❌ 一つの場所だけを直せばいいです。

✅ 実装上の変更箇所は限定的ですが、関連する処理への影響確認が必要です。

代码修改点少，并不代表系统影响小。正式场合应区分「変更箇所」与「影響範囲」。

### 3. 「兼容以前的数据」を不自然に言う

△ 前のデータに互換します。

✅ 既存ファイルとの後方互換性を維持できるか確認します。  
✅ 旧フォーマットも引き続き処理できる設計にします。

「互換する」很少这样单独使用。通常说「互換性がある」「互換性を保つ」。

### 4. 「先上线看看」をそのまま言う

❌ まず本番に出して、様子を見ましょう。

✅ 対象を限定して段階的に導入し、判断基準を満たしたことを確認してから範囲を広げます。

生产环境不是没有条件的试验场。应说明限定范围、观察指标和扩大条件。

### 5. 「有问题就回滚」を簡単に言いすぎる

△ 問題があったら、すぐロールバックします。

✅ エラー率が基準を超えた場合は削除処理を停止します。削除済みデータは、記録に基づいて別途復元します。

“回滚”可能只恢复程序，也可能包含数据恢复。需要明确对象和步骤。

### 6. 「空就是删除」を曖昧に定義する

❌ 空なら削除します。

✅ 項目なしは変更なし、空文字は削除、値ありは登録または更新として扱います。

「空」可能指空字符串、null、空白字符或字段缺失。接口规格必须分别定义。

## 口頭・作文練習

请根据以下情况，用日语进行约60秒的变更说明：

- 现行规格中，relUserId为空的记录会被忽略
- 新规格要求为空时删除既有关系记录
- 字段缺失、空字符串和有值需要分别定义
- 影响输入检查、删除请求、重试、审计日志和测试
- 旧文件可能存在并非表示删除的空白值
- 先设置两周迁移期，只记录警告而不实际删除
- 发送方确认后，从限定对象开始分阶段启用
- 回滚可以停止删除逻辑，但不能自动恢复已删除数据
- 需要切换前快照、恢复步骤和明确的停止标准

请至少使用以下三个表达：

- 現行仕様
- 影響範囲
- 後方互換性
- 段階的に導入する
- ～に伴い
- ～にとどまらず
- ～ない限り
- ～を経て

## 参考答案

> 現行仕様では、relUserIdが空欄のレコードを更新対象から除外していますが、新仕様では既存の関係レコードを削除します。この変更に伴い、項目なしは変更なし、空文字は削除、値ありは登録または更新と定義します。影響範囲は入力チェックにとどまらず、削除リクエスト、再実行制御、監査ログ、テストにも及びます。旧ファイルには削除を意図しない空欄が含まれる可能性があり、後方互換性にも注意が必要です。そのため、まず二週間は削除候補の警告だけを記録します。送信元の確認を経て、対象を限定して段階的に導入します。停止基準を超えた場合は削除処理を無効化しますが、削除済みデータは自動では戻らないため、切り替え前のスナップショットと復元手順も準備します。

## 今日のポイント

- 变更说明的基本顺序：**现行规格 → 新规格 → 不变部分 → 影响范围 → 迁移步骤 → 停止与恢复条件**
- 「修改点少」不等于「影响范围小」
- 空字段必须区分：**字段缺失、空字符串、null、只有空格**
- 后向兼容性不只看格式能否读取，还要看旧数据在新规则下是否改变含义
- 分阶段导入需要明确对象、期间、监控指标和扩大条件
- 回滚程序不等于恢复数据；发生删除或外部副作用时，需要单独的恢复方案
- 专业的风险说明不止说「危険です」，还应提出可以验证和执行的控制措施`,
  },
  "en-data-retention-verifiable-deletion": {
    title: "Designing Data Retention and Verifiable Deletion",
    sourceId: "3bad34cbae19815ca0b2c49923fb56b5",
    markdown: `Today’s focus: defining how long data should exist, where deletion must propagate, which exceptions apply, and what evidence proves completion.

## Architecture Review

**Less precise**

> We delete customer data from the main database after 30 days, so the requirement is covered.

**Senior-architect phrasing**

> A retention policy is an end-to-end data-lifecycle contract, not a scheduled delete against one table.

> Before approving the design, we should enumerate authoritative records, replicas, caches, search indexes, object storage, analytics datasets, messages, exports, backups, and derived data. Each location needs an owner and an explicit retention or deletion rule.

> “Deleted” also needs clear completion semantics: inaccessible to normal processing, removed from active systems, and expired from backups within the documented recovery window.

## Technical Design Discussion

> Classify data by purpose and retention requirement instead of applying one global TTL.

> Model deletion as a durable, idempotent workflow. Give each request a stable identifier, track every in-scope store, retry failed steps, and reconcile incomplete requests.

> Publish a versioned deletion marker so delayed events, stale replicas, or old imports cannot recreate data that has already been deleted.

> Treat a legal hold as a scoped, approved exception—not as indefinite retention for an entire customer or dataset.

> Define a deletion-completion SLA and explicit exception states. The API should distinguish “request accepted” from “deletion completed.”

## Incident / Debugging

**Less natural**

> We deleted the user, but the search system still had old data.

**More natural**

> The primary record was deleted, but the search-index consumer did not apply the deletion event, so the profile remained discoverable after the stated completion window.

> Let’s trace the deletion request ID through the workflow state, outbox, broker delivery, consumer offset, index mutation, cache eviction, and downstream export jobs.

> The immediate containment is to suppress the profile in the query layer, reconcile every deletion step in the affected window, and reject stale events that could recreate the record.

## Stakeholder Update

> We identified that one search projection remained available after the primary customer record had been deleted. The profile has now been removed from search, and the affected query path can no longer return it. We are reconciling all deletion requests within the impacted window and validating the remaining replicas. We will report the confirmed scope and completion evidence separately.

## Code Review / Mentoring

> This endpoint returns success as soon as the database row is removed. Return an accepted status and a workflow ID; report completion only after every required store reaches a terminal state or an approved exception is recorded.

> This consumer applies an old update after receiving a deletion marker. Compare source versions and reject any event older than the tombstone.

> Avoid logging raw personal payloads in the deletion workflow. Keep only the minimum identifiers, status, timestamps, and evidence needed for audit and recovery.

> This cleanup job catches an exception and advances its checkpoint. Record the failed object and store so the step can be retried and reconciled.

## Corrections

❌ We delete everything after 30 days.

✅ Active records are removed within 30 days; backups expire within 90 days, while records under an approved legal hold follow a separately governed policy.

❌ The deletion API returned 200, so deletion is complete.

✅ Request acceptance and deletion completion are distinct; completion requires confirmation from every in-scope store or a documented exception.

❌ Backups cannot be changed, so deletion does not apply to them.

✅ Immutable backups require a defined expiry and a restoration procedure that prevents deleted records from re-entering active systems.

❌ We anonymized the user ID, so the data is no longer personal.

✅ Pseudonymization reduces direct identification, but the data may remain linkable or reversible; assess the retained attributes and re-identification risk.

## Vocabulary Notes

- **data retention**：数据保留；规定某类数据保存多久以及为何保存
- **retention schedule**：保留计划；按数据类别规定保留与清除时间
- **deletion propagation**：删除传播；把删除结果传递到副本、索引、缓存和下游系统
- **deletion workflow**：删除工作流；跟踪多步骤删除状态、重试和完成情况的流程
- **tombstone**：删除标记；表示对象已经删除并阻止旧事件将其恢复
- **legal hold**：法律保全；因诉讼或监管要求暂缓删除特定数据
- **derived data**：派生数据；由原始数据复制、聚合或计算得到的数据
- **backup expiry**：备份到期清除；备份超过规定恢复窗口后的失效与删除
- **verifiable deletion**：可验证删除；能够用状态与审计证据证明删除已按范围完成
- **deletion SLA**：删除服务时限；承诺在多长时间内完成删除
- **pseudonymization**：假名化；用替代标识降低直接识别性，但未必不可逆
- **re-identification**：重新识别；通过其他属性或数据关联再次识别个人

## Speaking Drill

用约 45 秒回答：

> A customer deletion request removes the primary database row immediately. The search index updates asynchronously, backups are retained for 90 days, and an old event can recreate the profile. How would you redesign the process and explain when deletion is complete?

**Model answer**

> I would model deletion as a durable, idempotent workflow rather than a single database operation. The workflow should issue a versioned tombstone, remove or suppress every active copy, track completion by store, and retry or reconcile failures. Consumers must reject updates older than the tombstone, and a backup restoration must replay the deletion ledger before serving traffic. The API should return “accepted” with a status identifier. I would call the request complete only when all active systems have reached a terminal state and backup handling meets the documented 90-day expiry, unless a scoped legal hold applies. The audit record should contain status and timestamps, not the deleted personal content.`,
  },
} as const;
