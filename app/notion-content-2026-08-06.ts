export const notionTopicContent20260806 = {
  "en-authoritative-data-ownership": {
    title: "Defining Authoritative Data Ownership and Single-Writer Boundaries",
    sourceId: "3b4d34cbae19818b8a17ea2bd8cb5b9c",
    markdown: `Today’s focus: deciding which system is authoritative for each business fact and preventing uncontrolled writes across system boundaries.

## Architecture Review

**Less precise**

> Both systems need the employee status, so either system can update it.

**Senior-architect phrasing**

> Data availability does not imply write authority. We should identify the system that owns the business invariant and make every other copy explicitly derived, cached, or proposed.

> Before approving the design, we need a field-level ownership model, an authoritative write path, synchronization semantics, conflict behavior, reconciliation controls, and a transition plan for any existing dual writes.

> “Source of truth” is too vague unless we specify which facts it owns, when they become authoritative, and how downstream systems learn about changes.

## Technical Design Discussion

> Assign write ownership at the smallest stable business boundary. One service may own employment status while another owns payroll calculation; ownership does not need to follow an entire database or application.

> Route commands to the authoritative owner. Other systems should consume events, change-data capture, or read APIs rather than updating replicated fields directly.

> Derived data should include provenance and freshness information. Consumers need to know which source and version produced the value and whether it is current enough for the decision being made.

> If a transition temporarily requires dual writes, define the sequencing, idempotency, failure recovery, divergence detection, and exit criteria. Dual write is migration risk, not a permanent integration pattern.

> Reconciliation should compare business keys, versions, timestamps, and semantic values. A row-count match alone cannot prove that two systems agree.

## Incident / Debugging

**Less natural**

> The two databases had different values because synchronization was broken.

**More natural**

> Two systems accepted authoritative writes for the same employee status. The later synchronization process overwrote a valid update with an older value.

> Let’s reconstruct the write timeline, identify the command origin, compare record versions, inspect delivery and retry history, and confirm which system was authorized to decide the status at each point.

> The immediate mitigation is to suspend the non-authoritative write path, protect the current authoritative state, and reconcile affected records before resuming propagation.

## Stakeholder Update

> We identified conflicting write ownership between the HR and payroll integrations. Both paths could update the same employment-status field, allowing a delayed message to replace a newer value. We have disabled the secondary write path and are reconciling the affected records against the designated HR source. No payroll calculations will be released from unreconciled data. The permanent change will establish field-level ownership and automated divergence monitoring.

## Code Review / Mentoring

> This mapper writes the replicated status back to the source system. Keep the direction explicit: consume the authoritative value and update only the local projection.

> The handler uses arrival time to select the winner. Arrival order is not business order; compare a source-controlled version or effective timestamp instead.

> This retry repeats both writes after either one fails. That can reverse the successful side effect. Persist workflow state and resume only the incomplete step.

> Please include source system, source version, effective time, and correlation ID in the change event so that consumers can detect stale or duplicated updates.

## Corrections

❌ Both databases are sources of truth.

✅ Each business fact should have one authoritative owner; other databases may hold governed replicas or projections.

❌ The newest message always contains the newest data.

✅ The most recently received message may be stale; freshness should be determined from an authoritative version or effective time.

❌ We can keep the systems consistent by updating both in the same method.

✅ Updating two independent systems creates a dual-write failure window; use one authoritative write and reliable propagation where possible.

❌ Reconciliation means copying all values from system A to system B.

✅ Reconciliation detects and classifies divergence before applying an approved repair based on ownership and business rules.

## Vocabulary Notes

- **authoritative source**：权威数据源；对某项业务事实拥有最终决定权的系统
- **system of record**：记录系统；负责保存和维护正式业务记录的系统
- **write ownership**：写入所有权；决定哪个组件有权修改某项数据
- **single-writer boundary**：单写入边界；确保同一业务事实只有一个权威写入方
- **derived data**：派生数据；根据权威数据计算、转换或复制得到的数据
- **data provenance**：数据来源信息；说明数据来自哪里、经过何种处理
- **dual write**：双写；一次业务操作分别写入两个独立系统
- **divergence**：数据分歧；多个副本的内容不再一致
- **reconciliation**：数据核对；比较权威记录与副本并处理差异
- **stale update**：陈旧更新；基于旧状态产生、可能覆盖新数据的更新
- **write fence**：写入防护；阻止旧所有者或未授权路径继续修改数据
- **effective time**：生效时间；业务变更在现实业务中开始有效的时间

## Speaking Drill

用约 45 秒回答：

> HR and payroll can both update an employee’s employment status. A delayed payroll message has overwritten a newer HR update. How would you redesign the integration?

依次说明：

1. Choose the authoritative owner for employment status
2. Remove or fence the secondary write path
3. Propagate versions and effective time reliably
4. Reconcile existing divergence and monitor recurrence

**Model answer**

> I would designate HR as the authoritative owner of employment status and remove direct payroll writes to that field. Payroll should consume a versioned HR event or query the authoritative API, then update only its local projection. Each change should carry the employee key, source version, effective time, and correlation ID so consumers can reject stale or duplicate updates. During the transition, I would fence the old payroll write path and reconcile both systems against HR before releasing dependent calculations. We should also monitor version regressions, propagation lag, and any attempted non-authoritative writes.`,
  },
} as const;
