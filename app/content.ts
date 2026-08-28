export type Topic = {
  slug: string;
  title: string;
  date: string;
  description: string;
};

export type LearningTrack = {
  id: string;
  category: "language" | "technology";
  symbol: string;
  eyebrow: string;
  title: string;
  nativeTitle: string;
  level: string;
  purpose: string;
  accent: "sage" | "indigo" | "amber";
  latest: {
    slug: string;
    title: string;
    date: string;
    objective: string;
    highlights: string[];
    drill: string;
  };
  topics: Topic[];
};

export const learningTracks: LearningTrack[] = [
  {
    id: "japanese",
    category: "language",
    symbol: "日",
    eyebrow: "Japanese",
    title: "日语",
    nativeTitle: "日本語",
    level: "高级商务与生活沟通",
    purpose:
      "从真实工作与生活场景出发，练习更准确、更成熟、也更容易被对方接受的表达方式。",
    accent: "sage",
    latest: {
      slug: "jp-confirm-with-alternate-contact-when-owner-absent",
      title: "担当者が不在のとき、別の相手に確認を依頼する",
      date: "2026.08.28",
      objective:
        "说明原担当者不在的联系背景，限定询问范围、交付对象和希望期限，并为对方不负责或不了解预留自然出口。",
      highlights: ["ご不在のようですので", "ご存じの範囲で", "〜であれば、〜だけでも"],
      drill:
        "写一条 180～250 字的 Teams 消息：向另一位客户确认三个 IF 的测试文件能否今天提供，并说明期限、影响和无法回答时的确认出口。",
    },
    topics: [
      {
        slug: "jp-design-review-concerns",
        title: "設計レビューで懸念点を角を立てずに伝える",
        date: "07.16",
        description: "设计评审 · 风险表达",
      },
      {
        slug: "jp-transition-small-talk",
        title: "雑談から本題へ自然につなぐ",
        date: "07.17",
        description: "会议沟通 · 话题转换",
      },
      {
        slug: "jp-clarify-ambiguous-requests",
        title: "曖昧な依頼を具体化する",
        date: "07.18",
        description: "需求澄清 · 商务表达",
      },
      {
        slug: "jp-describe-symptoms",
        title: "体調や症状を正確に伝える",
        date: "07.19",
        description: "生活日语 · 就医沟通",
      },
      {
        slug: "jp-separate-facts-hypotheses",
        title: "障害対応で事実と推測を切り分ける",
        date: "07.20",
        description: "故障应对 · 事实与推测",
      },
      {
        slug: "jp-explain-priority-changes",
        title: "優先順位の変更を納得感のある形で伝える",
        date: "07.21",
        description: "项目沟通 · 优先级调整",
      },
      {
        slug: "jp-refuse-with-alternatives",
        title: "気まずくならない断り方と代替案の出し方",
        date: "07.25",
        description: "商务与生活沟通 · 拒绝与替代方案",
      },
      {
        slug: "jp-measurable-nonfunctional-requirements",
        title: "非機能要件を測定可能な形に落とし込む",
        date: "07.26",
        description: "架构评审 · 可测量的非功能性需求",
      },
      {
        slug: "jp-report-housing-problems",
        title: "住まいの不具合を管理会社に的確に伝える",
        date: "07.27",
        description: "生活日语 · 住宅故障沟通",
      },
      {
        slug: "jp-heat-safety-schedule-change",
        title: "猛暑時に予定変更と安全配慮を提案する",
        date: "07.28",
        description: "安全沟通 · 高温下的日程调整",
      },
      {
        slug: "jp-clarify-meeting-decisions-actions",
        title: "会議で結論・保留・宿題を明確にする",
        date: "07.29",
        description: "会议沟通 · 结论、保留与行动项",
      },
      {
        slug: "jp-clarify-unfamiliar-terms",
        title: "分からない言葉をその場で自然に確認する",
        date: "07.30",
        description: "沟通澄清 · 术语、比喻与意图",
      },
      {
        slug: "jp-api-backward-compatibility",
        title: "API変更で後方互換性を確保する",
        date: "07.31",
        description: "架构沟通 · API 兼容与迁移",
      },
      {
        slug: "jp-child-friendly-outing-requests",
        title: "子ども連れの外出で配慮をお願いする",
        date: "08.01",
        description: "生活日语 · 亲子外出与设施沟通",
      },
      {
        slug: "jp-empathy-with-own-opinion",
        title: "共感しながら自分の意見を伝える",
        date: "08.02",
        description: "沟通表达 · 共感、异议与建设性方案",
      },
      {
        slug: "jp-estimation-assumptions-uncertainty",
        title: "見積もりの前提と不確実性を伝える",
        date: "08.03",
        description: "项目沟通 · 估算前提与不确定性",
      },
      {
        slug: "jp-verify-generative-ai-answers",
        title: "生成AIの回答を鵜呑みにせず検証する",
        date: "08.04",
        description: "AI 素养 · 事实核实与机密保护",
      },
      {
        slug: "jp-api-error-reproduction-isolation",
        title: "APIエラーの再現条件と切り分け結果を伝える",
        date: "08.05",
        description: "技术沟通 · 再现条件、切分与修复说明",
      },
      {
        slug: "jp-ask-for-help-with-childcare",
        title: "育児の負担を具体的に伝えて手助けを頼む",
        date: "08.06",
        description: "生活日语 · 育儿分工与具体求助",
      },
      {
        slug: "jp-follow-up-without-rushing",
        title: "相手を急かさずに進捗を確認する",
        date: "08.07",
        description: "客户沟通 · 进度确认与替代方案",
      },
      {
        slug: "jp-obon-traffic-travel-planning",
        title: "お盆の混雑を見越して移動計画を調整する",
        date: "08.08",
        description: "生活日语 · 交通预测、错峰与家庭出行",
      },
      {
        slug: "jp-production-rollback-criteria",
        title: "本番変更のロールバック条件を合意する",
        date: "08.09",
        description: "技术沟通 · 生产回滚、退出条件与数据恢复",
      },
      {
        slug: "jp-baby-head-shape-pediatric-consultation",
        title: "赤ちゃんの向き癖と頭の形を小児科で相談する",
        date: "08.10",
        description: "医疗问诊 · 向き癖、头形左右差与专科评估",
      },
      {
        slug: "jp-photo-studio-plan-album-inquiry",
        title: "写真館で撮影プランとアルバムの有無を確認する",
        date: "08.11",
        description: "生活日语 · 摄影套餐、实体相册与费用确认",
      },
      {
        slug: "jp-spec-change-impact-migration",
        title: "仕様変更の影響範囲と移行方針を説明する",
        date: "08.12",
        description: "技术沟通 · 规格变更、影响范围与分阶段迁移",
      },
      {
        slug: "jp-prepare-self-addressed-registered-envelope",
        title: "簡易書留用の返信用封筒を準備する",
        date: "08.13",
        description: "生活日语 · 回邮信封、邮资与简易挂号",
      },
      {
        slug: "jp-handoff-review-work",
        title: "レビュー業務を引き継いで対応を依頼する",
        date: "08.14",
        description: "团队协作 · 评审交接、责任边界与支援",
      },
      {
        slug: "jp-adjust-work-plans-extreme-heat",
        title: "猛暑日に外出と仕事の予定を調整する",
        date: "08.15",
        description: "安全沟通 · 高温预警、日程调整与中止标准",
      },
      {
        slug: "jp-choose-outerwear-by-use-and-requirements",
        title: "店員に用途と希望条件を伝えてアウターを選ぶ",
        date: "08.16",
        description: "生活日语 · 外套用途、性能与尺码确认",
      },
      {
        slug: "jp-explain-idempotency-prevent-duplicate-processing",
        title: "重複処理を防ぐための冪等性を説明する",
        date: "08.17",
        description: "技术沟通 · 幂等性、重复检测与安全重试",
      },
      {
        slug: "jp-call-dentist-for-same-day-appointment",
        title: "歯科に当日の診察を電話で相談する",
        date: "08.18",
        description: "生活日语 · 牙龈肿痛、当日预约与急诊咨询",
      },
      {
        slug: "jp-explain-technical-terms-by-audience",
        title: "技術用語を相手に合わせて分かりやすく説明する",
        date: "08.19",
        description: "技术沟通 · 面向对象解释 Object、Map 与键值关系",
      },
      {
        slug: "jp-respond-to-baby-compliments-naturally",
        title: "赤ちゃんを褒められたとき自然に返す",
        date: "08.20",
        description: "生活日语 · 接受称赞、描述相貌与延续话题",
      },
      {
        slug: "jp-annual-review-achievements-growth",
        title: "年度評価で成果と成長を具体的に伝える",
        date: "08.21",
        description: "商务日语 · 年度自评、成果表达与成长规划",
      },
      {
        slug: "jp-thank-family-returning-home",
        title: "帰国する家族に感謝とお礼を伝える",
        date: "08.22",
        description: "生活日语 · 家庭致谢、临别表达与赠送心意",
      },
      {
        slug: "jp-explain-data-types-message-passing",
        title: "連携処理でデータ型と受け渡し方法を説明する",
        date: "08.23",
        description: "技术日语 · 数据类型、消息传递与控制字符",
      },
      {
        slug: "jp-nursery-tour-conditions-daily-routine",
        title: "保育園見学で預かり条件と一日の流れを確認する",
        date: "08.24",
        description: "生活日语 · 保育园见学、适应期与接送条件",
      },
      {
        slug: "jp-align-responsibility-boundaries",
        title: "担当範囲の認識違いを穏やかに修正する",
        date: "08.25",
        description: "商务日语 · 责任边界、认识对齐与跨团队协作",
      },
      {
        slug: "jp-request-post-etl-sample",
        title: "変換前後のデータ差分を確認し再提供を依頼する",
        date: "08.26",
        description: "技术日语 · ETL 转换、格式差异与样本再提供",
      },
      {
        slug: "jp-negotiate-room-temperature-adjustments",
        title: "室温の感じ方が違うとき、相手を否定せず調整を提案する",
        date: "08.27",
        description: "生活日语 · 体感差异、婴儿室温与共同调整",
      },
      {
        slug: "jp-confirm-with-alternate-contact-when-owner-absent",
        title: "担当者が不在のとき、別の相手に確認を依頼する",
        date: "08.28",
        description: "商务日语 · 代理确认、交付预期与期限说明",
      },
    ],
  },
  {
    id: "english",
    category: "language",
    symbol: "A",
    eyebrow: "English",
    title: "英语",
    nativeTitle: "English",
    level: "Senior architect communication",
    purpose:
      "围绕架构评审、技术设计、故障分析和干系人沟通，建立更精确、更自然的资深架构师表达。",
    accent: "indigo",
    latest: {
      slug: "en-data-freshness-staleness-contracts",
      title: "Defining Data Freshness and Staleness Contracts",
      date: "2026.08.28",
      objective:
        "Define data freshness as a measurable end-to-end contract across source, ingestion, processing, cache and presentation boundaries.",
      highlights: ["data freshness", "maximum acceptable data age", "freshness SLO"],
      drill:
        "Give a 60-second response to a stakeholder whose ERP update has not appeared on the dashboard, separating correctness from freshness and tracing each timestamp.",
    },
    topics: [
      {
        slug: "en-runtime-decoupling",
        title: "Runtime Decoupling with Asynchronous Processing",
        date: "07.15",
        description: "Architecture review · Async design",
      },
      {
        slug: "en-managing-design-risk",
        title: "Managing Design Risk",
        date: "07.16",
        description: "Risk framing · Stakeholder update",
      },
      {
        slug: "en-graceful-degradation",
        title: "Designing for Graceful Degradation",
        date: "07.17",
        description: "Resilience · Technical design",
      },
      {
        slug: "en-explicit-tradeoffs",
        title: "Making Architecture Trade-offs Explicit",
        date: "07.18",
        description: "Trade-offs · Architecture review",
      },
      {
        slug: "en-service-ownership",
        title: "Establishing Clear Service Ownership",
        date: "07.19",
        description: "Ownership · Operating model",
      },
      {
        slug: "en-api-evolution",
        title: "Evolving APIs Without Breaking Consumers",
        date: "07.20",
        description: "API evolution · Compatibility",
      },
      {
        slug: "en-idempotent-workflows",
        title: "Designing Idempotent and Retry-Safe Workflows",
        date: "07.21",
        description: "Reliability · Distributed workflows",
      },
      {
        slug: "en-observability-capability",
        title: "Designing Observability as an Architectural Capability",
        date: "07.25",
        description: "Observability · Architecture and operations",
      },
      {
        slug: "en-progressive-delivery",
        title: "Reducing Release Risk with Progressive Delivery",
        date: "07.26",
        description: "Progressive delivery · Release risk",
      },
      {
        slug: "en-safe-data-migrations",
        title: "Designing Safe Data Migrations in Live Systems",
        date: "07.27",
        description: "Data migration · Mixed-version safety",
      },
      {
        slug: "en-backpressure-load-shedding",
        title: "Designing Backpressure and Load Shedding",
        date: "07.28",
        description: "Overload control · System resilience",
      },
      {
        slug: "en-consistency-boundaries",
        title: "Defining Consistency Boundaries in Distributed Systems",
        date: "07.29",
        description: "Distributed systems · Consistency boundaries",
      },
      {
        slug: "en-failure-containment",
        title: "Containing Dependency Failures with Circuit Breakers and Bulkheads",
        date: "07.30",
        description: "Resilience · Failure containment",
      },
      {
        slug: "en-trust-boundaries-least-privilege",
        title: "Defining Trust Boundaries and Least-Privilege Service Access",
        date: "07.31",
        description: "Security architecture · Service identity and access",
      },
      {
        slug: "en-recovery-objectives-dr-readiness",
        title: "Designing Recovery Objectives and Disaster-Recovery Readiness",
        date: "08.01",
        description: "Disaster recovery · RTO, RPO and recovery evidence",
      },
      {
        slug: "en-rate-limits-fair-access",
        title: "Designing Rate Limits and Fair Access Under Shared Capacity",
        date: "08.02",
        description: "Capacity management · Rate limits and tenant fairness",
      },
      {
        slug: "en-control-plane-data-plane",
        title: "Separating Control-Plane and Data-Plane Responsibilities",
        date: "08.03",
        description: "Platform architecture · Control-plane and data-plane isolation",
      },
      {
        slug: "en-transaction-boundaries-compensation",
        title: "Designing Transaction Boundaries and Compensation in Distributed Workflows",
        date: "08.04",
        description: "Distributed workflows · Transaction boundaries and compensation",
      },
      {
        slug: "en-multi-tenant-data-isolation",
        title: "Designing Multi-Tenant Data Isolation and Tenant Context Propagation",
        date: "08.05",
        description: "Security architecture · Tenant isolation and context propagation",
      },
      {
        slug: "en-authoritative-data-ownership",
        title: "Defining Authoritative Data Ownership and Single-Writer Boundaries",
        date: "08.06",
        description: "Data architecture · Authoritative ownership and single-writer boundaries",
      },
      {
        slug: "en-cache-consistency-invalidation",
        title: "Designing Cache Consistency and Invalidation Boundaries",
        date: "08.07",
        description: "Data architecture · Cache consistency and invalidation",
      },
      {
        slug: "en-concurrency-control-optimistic-locking",
        title: "Designing Concurrency Control and Optimistic Locking",
        date: "08.08",
        description: "Data architecture · Concurrency control and optimistic locking",
      },
      {
        slug: "en-rollback-criteria-release-guardrails",
        title: "Defining Rollback Criteria and Release Guardrails",
        date: "08.09",
        description: "Release engineering · Rollback criteria and operational guardrails",
      },
      {
        slug: "en-feature-flags-operational-kill-switches",
        title: "Designing Feature Flags and Operational Kill Switches",
        date: "08.10",
        description: "Release engineering · Feature flags and emergency controls",
      },
      {
        slug: "en-auditable-privileged-operations-break-glass-access",
        title: "Designing Auditable Privileged Operations and Break-Glass Access",
        date: "08.11",
        description: "Security architecture · Privileged access and emergency controls",
      },
      {
        slug: "en-data-retention-verifiable-deletion",
        title: "Designing Data Retention and Verifiable Deletion",
        date: "08.12",
        description: "Data governance · Retention, deletion propagation and completion evidence",
      },
      {
        slug: "en-bulk-processing-partial-failure-semantics",
        title: "Designing Bulk Processing with Explicit Partial-Failure Semantics",
        date: "08.13",
        description: "Distributed workflows · Partial success, retry and reconciliation",
      },
      {
        slug: "en-durable-event-contracts-schema-evolution",
        title: "Designing Durable Event Contracts and Schema Evolution",
        date: "08.14",
        description: "Event-driven architecture · Contract evolution and replay safety",
      },
      {
        slug: "en-end-to-end-latency-budgets-timeout-propagation",
        title: "Designing End-to-End Latency Budgets and Timeout Propagation",
        date: "08.15",
        description: "Reliability architecture · Deadlines, timeouts and cancellation",
      },
      {
        slug: "en-safe-configuration-distribution-dynamic-reload",
        title: "Designing Safe Configuration Distribution and Dynamic Reload",
        date: "08.16",
        description: "Platform architecture · Configuration rollout, reload and recovery",
      },
      {
        slug: "en-safe-scheduled-jobs-distributed-coordination",
        title: "Designing Safe Scheduled Jobs and Distributed Coordination",
        date: "08.17",
        description: "Distributed systems · Leases, fencing and scheduled-work coordination",
      },
      {
        slug: "en-poison-message-dead-letter-recovery",
        title: "Designing Poison-Message Handling and Dead-Letter Recovery",
        date: "08.18",
        description: "Event-driven architecture · Poison messages, DLQ recovery and controlled redrive",
      },
      {
        slug: "en-safe-file-ingestion-delivery-guarantees",
        title: "Designing Safe File-Ingestion Boundaries and Delivery Guarantees",
        date: "08.19",
        description: "Integration architecture · File publication, duplicate delivery and recovery",
      },
      {
        slug: "en-safe-event-replay-reprocessing-boundaries",
        title: "Designing Safe Event Replay and Reprocessing Boundaries",
        date: "08.20",
        description: "Event-driven architecture · Replay scope, side-effect control and reconciliation",
      },
      {
        slug: "en-safe-runtime-framework-upgrade-boundaries",
        title: "Designing Safe Runtime and Framework Upgrade Boundaries",
        date: "08.21",
        description: "Platform architecture · Runtime compatibility, canary validation and rollback",
      },
      {
        slug: "en-secret-rotation-credential-lifecycle-boundaries",
        title: "Designing Secret Rotation and Credential-Lifecycle Boundaries",
        date: "08.22",
        description: "Security architecture · Credential rotation, adoption and revocation",
      },
      {
        slug: "en-database-connection-pool-capacity-isolation",
        title: "Designing Database Connection-Pool Capacity and Isolation Boundaries",
        date: "08.23",
        description: "Data architecture · Connection budgets, saturation and workload isolation",
      },
      {
        slug: "en-explicit-partial-update-field-preservation",
        title: "Designing Explicit Partial-Update and Field-Preservation Semantics",
        date: "08.24",
        description: "API architecture · Partial updates, preservation semantics and concurrency",
      },
      {
        slug: "en-governed-reference-data-value-mapping",
        title: "Designing Governed Reference-Data and Value-Mapping Boundaries",
        date: "08.25",
        description: "Integration architecture · Reference data, composite mappings and governance",
      },
      {
        slug: "en-reliable-file-polling-message-metadata",
        title: "Designing Reliable File-Polling and Message-Metadata Boundaries",
        date: "08.26",
        description: "Integration architecture · SFTP polling, metadata lifecycle and duplicate detection",
      },
      {
        slug: "en-identity-configuration-drift-integration-paths",
        title: "Diagnosing Identity and Configuration Drift Across Integration Paths",
        date: "08.27",
        description: "Integration architecture · Identity, authorization and request-context drift",
      },
      {
        slug: "en-data-freshness-staleness-contracts",
        title: "Defining Data Freshness and Staleness Contracts",
        date: "08.28",
        description: "Data architecture · Freshness SLOs, pipeline lag and stale-state signaling",
      },
    ],
  },
  {
    id: "databricks",
    category: "technology",
    symbol: "DB",
    eyebrow: "Databricks",
    title: "数据工程",
    nativeTitle: "Databricks",
    level: "基础 → 数据工程师",
    purpose:
      "从数据工程基础出发，循序掌握 Spark、Delta Lake、Lakeflow、Unity Catalog 与生产化交付，最终完成端到端项目。",
    accent: "amber",
    latest: {
      slug: "dbx-003-warehouse-lake-lakehouse",
      title: "第003课｜数据仓库、Data Lake 与 Lakehouse 对比",
      date: "2026.07.25",
      objective:
        "从数据形态、Schema、事务、治理和工作负载出发，对比 Data Warehouse、Data Lake 与 Lakehouse，并学会按场景判断架构取舍。",
      highlights: [
        "Schema-on-write / read",
        "Raw → Curated",
        "BI · Streaming · AI/ML",
      ],
      drill:
        "在 Databricks Free Edition 中保存原始 JSON，再解析为面向 BI 的 Delta 汇总表，观察灵活落地与可靠服务如何组合。",
    },
    topics: [
      {
        slug: "dbx-001-data-engineering-lifecycle",
        title: "第001课｜数据工程师职责与端到端数据链路",
        date: "07.25",
        description: "数据工程基础 · 全链路认知",
      },
      {
        slug: "dbx-002-lakehouse-data-intelligence",
        title: "第002课｜Lakehouse 与 Data Intelligence Platform",
        date: "07.25",
        description: "数据工程基础 · 平台架构",
      },
      {
        slug: "dbx-003-warehouse-lake-lakehouse",
        title: "第003课｜数据仓库、Data Lake 与 Lakehouse 对比",
        date: "07.25",
        description: "数据工程基础 · 架构选型",
      },
    ],
  },
];

const databricksTrack = learningTracks.find(
  (track) => track.id === "databricks",
);

if (databricksTrack) {
  databricksTrack.latest = {
    slug: "dbx-004-sql-query-filter-null",
    title: "第004课｜SQL 查询、过滤与 NULL",
    date: "2026.07.26",
    objective:
      "掌握 SELECT、FROM、WHERE、ORDER BY 与 LIMIT 的职责，理解 NULL 三值逻辑，并能正确选择 IS NULL、COALESCE 与 null-safe equality。",
    highlights: [
      "SELECT · FROM · WHERE",
      "TRUE · FALSE · UNKNOWN",
      "IS NULL · COALESCE · <=>",
    ],
    drill:
      "在 Databricks Free Edition 中建立订单测试表，对比 = NULL、IS NULL 与 <=> 的结果，并用计数查询验证过滤逻辑。",
  };
  databricksTrack.topics.push({
    slug: "dbx-004-sql-query-filter-null",
    title: "第004课｜SQL 查询、过滤与 NULL",
    date: "07.26",
    description: "数据工程基础 · SQL 与 NULL 语义",
  });
  databricksTrack.topics.push({
    slug: "dbx-005-sql-aggregation-cte-set-operations",
    title: "第005课｜SQL 聚合、CTE 与集合操作",
    date: "07.26",
    description: "数据工程基础 · 聚合与结果集组合",
  });
  databricksTrack.latest = {
    slug: "dbx-005-sql-aggregation-cte-set-operations",
    title: "第005课｜SQL 聚合、CTE 与集合操作",
    date: "2026.07.26",
    objective:
      "掌握 GROUP BY、聚合函数与 HAVING 的处理阶段，用 CTE 拆解复杂查询，并正确选择 UNION ALL、UNION、INTERSECT 与 EXCEPT。",
    highlights: [
      "GROUP BY · HAVING",
      "WITH · CTE",
      "UNION · INTERSECT · EXCEPT",
    ],
    drill:
      "在 Databricks Free Edition 中构建渠道日报，对比明细过滤与分组过滤，并验证四种集合操作的重复行语义。",
  };
  databricksTrack.topics.push({
    slug: "dbx-006-sql-joins-data-relationships",
    title: "第006课｜SQL JOIN 与数据关系",
    date: "07.26",
    description: "数据工程基础 · 表关系与连接验证",
  });
  databricksTrack.latest = {
    slug: "dbx-006-sql-joins-data-relationships",
    title: "第006课｜SQL JOIN 与数据关系",
    date: "2026.07.26",
    objective:
      "从粒度、键与关系基数出发选择 INNER、OUTER、SEMI 与 ANTI JOIN，理解 ON 和 WHERE 的语义边界，并验证重复匹配与孤儿记录。",
    highlights: [
      "1:1 · 1:N · N:M",
      "INNER · LEFT · FULL",
      "SEMI · ANTI · ON",
    ],
    drill:
      "在 Databricks Free Edition 中连接客户与订单表，对比 ON 和 WHERE 的过滤位置，并用 SEMI、ANTI JOIN 验证覆盖率与孤儿记录。",
  };
  databricksTrack.topics.push({
    slug: "dbx-007-sql-window-functions",
    title: "第007课｜SQL Window Functions",
    date: "07.26",
    description: "数据工程基础 · 排名、累计与移动窗口",
  });
  databricksTrack.latest = {
    slug: "dbx-007-sql-window-functions",
    title: "第007课｜SQL Window Functions",
    date: "2026.07.26",
    objective:
      "掌握 PARTITION BY、窗口内 ORDER BY 与 window frame，用排名、LAG 和窗口聚合实现 Top N、变化检测、累计值与移动指标。",
    highlights: [
      "PARTITION BY · ORDER BY",
      "ROW_NUMBER · RANK · LAG",
      "ROWS · RANGE · QUALIFY",
    ],
    drill:
      "在 Databricks Free Edition 中构建地区销售窗口，比较三种排名、筛选每组 Top N，并手工验证累计金额与移动平均。",
  };
  databricksTrack.topics.push({
    slug: "dbx-008-python-data-structures-functions-exceptions",
    title: "第008课｜Python 数据结构、函数与异常",
    date: "07.26",
    description: "数据工程基础 · 容器、函数与失败契约",
  });
  databricksTrack.latest = {
    slug: "dbx-008-python-data-structures-functions-exceptions",
    title: "第008课｜Python 数据结构、函数与异常",
    date: "2026.07.26",
    objective:
      "按业务语义选择 list、tuple、dict 与 set，编写输入输出清晰的转换函数，并用具体异常和 quarantine 可靠处理坏记录。",
    highlights: [
      "list · tuple · dict · set",
      "function · return · type hints",
      "try · except · raise",
    ],
    drill:
      "在 Databricks Free Edition 的 Python Notebook 中规范化订单记录，将有效数据与坏数据分别写入内存集合，并验证失败原因和客户汇总。",
  };
  databricksTrack.topics.push({
    slug: "dbx-009-python-modules-environments-testing",
    title: "第009课｜Python 模块、环境与测试基础",
    date: "07.26",
    description: "数据工程基础 · 模块化、依赖与单元测试",
  });
  databricksTrack.latest = {
    slug: "dbx-009-python-modules-environments-testing",
    title: "第009课｜Python 模块、环境与测试基础",
    date: "2026.07.26",
    objective:
      "使用 Workspace Files 与 import 分离业务逻辑和 Notebook 编排，理解 Serverless 环境与依赖固定，并用 pytest 约定和 assert 建立最小测试套件。",
    highlights: [
      "module · package · import",
      "environment · dependency",
      "test_*.py · assert",
    ],
    drill:
      "在 Databricks Free Edition 中创建金额模块和测试文件，运行三条单元测试，并通过故意引入回归观察测试如何保护业务规则。",
  };
  databricksTrack.topics.push({
    slug: "dbx-010-git-branches-code-review",
    title: "第010课｜Git、分支与代码评审",
    date: "07.26",
    description: "数据工程基础 · 分支协作、差异检查与评审门禁",
  });
  databricksTrack.latest = {
    slug: "dbx-010-git-branches-code-review",
    title: "第010课｜Git、分支与代码评审",
    date: "2026.07.26",
    objective:
      "用短生命周期 topic branch 隔离变更，通过 staged diff、原子提交、测试和数据工程五维检查表完成可追溯的代码评审。",
    highlights: [
      "working tree · staging · commit",
      "branch · remote · Pull Request",
      "diff · review · merge",
    ],
    drill:
      "在个人练习仓库创建 customer-id-check 分支，制作一个含测试的原子提交，并用正确性、数据安全、测试、性能与运维检查表完成自审。",
  };
  databricksTrack.topics.push({
    slug: "dbx-011-cloud-object-storage-iam-compute-separation",
    title: "第011课｜云对象存储、IAM 与计算存储分离",
    date: "07.26",
    description: "数据工程基础 · 对象存储、最小权限与弹性计算",
  });
  databricksTrack.latest = {
    slug: "dbx-011-cloud-object-storage-iam-compute-separation",
    title: "第011课｜云对象存储、IAM 与计算存储分离",
    date: "2026.07.26",
    objective:
      "理解 object storage 与本地文件系统的差异，用 IAM 四要素和 Unity Catalog 双层门禁保护数据，并验证计算会话变化时 managed Delta table 仍然存在。",
    highlights: [
      "S3 · ADLS Gen2 · GCS",
      "principal · action · resource",
      "storage credential · external location",
    ],
    drill:
      "在 Free Edition 创建 managed Delta table，从新的 query 再次读取，并为订单 landing prefix 设计一条不含长期密钥的最小权限规则。",
  };
  databricksTrack.topics.push({
    slug: "dbx-012-dimensional-modeling-facts-dimensions-star-schema",
    title: "第012课｜数据建模、事实表、维度表与星型模型",
    date: "07.26",
    description: "数据工程基础 · Grain、事实、维度与数据集市",
  });
  databricksTrack.latest = {
    slug: "dbx-012-dimensional-modeling-facts-dimensions-star-schema",
    title: "第012课｜数据建模、事实表、维度表与星型模型",
    date: "2026.07.26",
    objective:
      "从业务过程与一致 grain 出发设计订单行事实表、可复用维度和 surrogate key，并用重复、orphan 与聚合查询验证星型模型。",
    highlights: [
      "business process · grain",
      "fact · dimension · measure",
      "star schema · surrogate key",
    ],
    drill:
      "在 Free Edition 构建订单行星型模型，验证事实粒度、维度 key 唯一性与孤儿外键，并按商品类别计算净销售额。",
  };
  databricksTrack.topics.push({
    slug: "dbx-013-databricks-workspace-panorama",
    title: "第013课｜Databricks Workspace 全景",
    date: "07.26",
    description: "平台基础 · 开发、数据、计算、编排与观测地图",
  });
  databricksTrack.latest = {
    slug: "dbx-013-databricks-workspace-panorama",
    title: "第013课｜Databricks Workspace 全景",
    date: "2026.07.26",
    objective:
      "区分 Workspace 对象、Unity Catalog 数据、compute 与 Lakeflow 运行，以 asset-context-compute-data-orchestration-observation 路径定位工作。",
    highlights: [
      "account · workspace · metastore",
      "Notebook · table · compute",
      "develop · orchestrate · observe",
    ],
    drill:
      "在 Free Edition 记录当前 user/catalog/schema，创建 managed Delta table，并从另一 SQL query 通过 fully qualified name 找到同一资产。",
  };
  databricksTrack.topics.push({
    slug: "dbx-014-notebooks-workspace-files-development",
    title: "第014课｜Notebook、Workspace Files 与开发方式",
    date: "07.26",
    description: "平台基础 · 交互编排、源码模块与渐进开发",
  });
  databricksTrack.latest = {
    slug: "dbx-014-notebooks-workspace-files-development",
    title: "第014课｜Notebook、Workspace Files 与开发方式",
    date: "2026.07.26",
    objective:
      "用 Notebook 承担可重跑的薄编排，把 PySpark 转换抽到 Workspace File，并理解 Git folder 与 Databricks Connect 的进阶开发边界。",
    highlights: [
      "Notebook · clean session",
      "Workspace File · Python module",
      "Git folder · Databricks Connect",
    ],
    drill:
      "在 Free Edition 创建 order_transform.py 与编排 Notebook，从干净 session 运行转换和断言，并把代码与数据输出放到正确位置。",
  };
  databricksTrack.topics.push({
    slug: "dbx-015-serverless-sql-warehouse-photon",
    title: "第015课｜Serverless Compute、SQL Warehouse 与 Photon",
    date: "07.26",
    description: "平台基础 · 资源管理、SQL 服务入口与向量化执行",
  });
  databricksTrack.latest = {
    slug: "dbx-015-serverless-sql-warehouse-photon",
    title: "第015课｜Serverless Compute、SQL Warehouse 与 Photon",
    date: "2026.07.26",
    objective:
      "分清 Serverless 资源管理、SQL Warehouse 工作负载入口与 Photon 执行引擎，并通过双入口运行和 Query History 建立性能诊断路径。",
    highlights: [
      "Serverless · managed compute",
      "SQL Warehouse · SQL / BI endpoint",
      "Photon · vectorized execution",
    ],
    drill:
      "在 Free Edition 的 serverless Notebook 与 SQL Warehouse 各运行同一聚合查询，验证结果一致，并从 Query History/Profile 拆分启动、排队与执行。",
  };
  databricksTrack.topics.push({
    slug: "dbx-016-unity-catalog-three-level-namespace",
    title: "第016课｜Unity Catalog 三级命名空间初识",
    date: "07.26",
    description: "平台基础 · Catalog、Schema、Object 与权限路径",
  });
  databricksTrack.latest = {
    slug: "dbx-016-unity-catalog-three-level-namespace",
    title: "第016课｜Unity Catalog 三级命名空间初识",
    date: "2026.07.26",
    objective:
      "掌握 metastore → catalog → schema → object 层级，理解名称解析、当前上下文与 USE CATALOG / USE SCHEMA / SELECT 三道权限门。",
    highlights: [
      "catalog · schema · object",
      "current context · full name",
      "USE CATALOG · USE SCHEMA · SELECT",
    ],
    drill:
      "在 Free Edition 创建 lesson016 schema/table，从另一 SQL 入口分别用一层、两层和三层名称定位，并解释每次解析与权限要求。",
  };
  databricksTrack.topics.push({
    slug: "dbx-017-catalog-schema-table-view-volume",
    title: "第017课｜Catalog、Schema、Table、View 与 Volume",
    date: "07.26",
    description: "平台基础 · 治理容器、结构化对象与文件边界",
  });
  databricksTrack.latest = {
    slug: "dbx-017-catalog-schema-table-view-volume",
    title: "第017课｜Catalog、Schema、Table、View 与 Volume",
    date: "2026.07.26",
    objective:
      "区分 catalog/schema 容器与 table/view/volume 数据对象，并按行列、保存查询或路径文件三种访问契约选择正确资产。",
    highlights: [
      "catalog / schema · containers",
      "table · structured contract",
      "view · query · volume · files",
    ],
    drill:
      "在 Free Edition 的同一 schema 创建 table、view 与 managed volume，验证 view 随底层 table 更新，并比较 table name 与 /Volumes path。",
  };
  databricksTrack.topics.push({
    slug: "dbx-018-managed-external-data-assets",
    title: "第018课｜Managed 与 External 数据资产",
    date: "07.26",
    description: "平台基础 · 存储位置、文件生命周期与责任边界",
  });
  databricksTrack.latest = {
    slug: "dbx-018-managed-external-data-assets",
    title: "第018课｜Managed 与 External 数据资产",
    date: "2026.07.26",
    objective:
      "从治理、storage location 与 file lifecycle 分清 managed/external tables 和 volumes，理解 DROP 行为与外部访问责任。",
    highlights: [
      "governance · both",
      "managed · UC file lifecycle",
      "external · owner-controlled files",
    ],
    drill:
      "在 Free Edition 创建并检查 managed table/volume；用责任矩阵设计 hypothetical external landing，而不编造不可用的 cloud 配置。",
  };
  databricksTrack.topics.push({
    slug: "dbx-019-file-upload-first-delta-table",
    title: "第019课｜文件上传与首张 Delta 表",
    date: "07.26",
    description: "平台基础 · 文件 onboarding、显式类型与最小验收",
  });
  databricksTrack.latest = {
    slug: "dbx-019-file-upload-first-delta-table",
    title: "第019课｜文件上传与首张 Delta 表",
    date: "2026.07.26",
    objective:
      "完成本地 CSV 到 managed Delta table 的最短链路，以 Raw STRING、try_cast 和行数/NULL/重复/format 检查建立首张表验收习惯。",
    highlights: [
      "upload · preview · raw",
      "try_cast · typed Delta",
      "count · NULL · duplicate · format",
    ],
    drill:
      "在 Free Edition 上传 4 行订单 CSV，创建 raw Delta table，再转换为 3 行 typed table，并明确隔离坏金额与保留重复的原因。",
  };
  databricksTrack.topics.push({
    slug: "dbx-020-medallion-architecture",
    title: "第020课｜Medallion Architecture",
    date: "07.26",
    description: "平台基础 · Bronze、Silver、Gold 的质量与重建契约",
  });
  databricksTrack.latest = {
    slug: "dbx-020-medallion-architecture",
    title: "第020课｜Medallion Architecture",
    date: "2026.07.26",
    objective:
      "用 Bronze 保真、Silver 可信明细、Gold 面向消费的契约设计可重建多跳链路，并以 quarantine 保留坏数据证据。",
    highlights: [
      "Bronze · fidelity · replay",
      "Silver · validity · conformance",
      "Gold · fitness for purpose",
    ],
    drill:
      "在 Free Edition 构建 4→2→1 行的 Bronze-Silver-Gold Delta 流程，补充 quarantine，并从 Bronze 验证规则修正后的可重建性。",
  };
  databricksTrack.topics.push({
    slug: "dbx-021-bronze-layer-design",
    title: "第021课｜Bronze 层设计",
    date: "07.26",
    description: "平台基础 · 摄取保真、来源身份与可重放证据",
  });
  databricksTrack.latest = {
    slug: "dbx-021-bronze-layer-design",
    title: "第021课｜Bronze 层设计",
    date: "2026.07.26",
    objective:
      "以 payload、source identity 与 ingestion metadata 设计可审计、可增量、可重放的 Bronze Delta 契约，并区分 landing、checkpoint 与业务去重。",
    highlights: [
      "payload · source identity",
      "ingestion metadata · replay",
      "schema drift · rescued data",
    ],
    drill:
      "在 Free Edition 用 3 条 raw JSON 和两个 batch 构建 Bronze table，验证来源位置、坏金额与新字段都被完整保留，再从中重建临时 Silver。",
  };
  databricksTrack.topics.push({
    slug: "dbx-022-silver-cleaning-consistency",
    title: "第022课｜Silver 层清洗与一致性",
    date: "07.26",
    description: "平台基础 · 类型、质量、去重、隔离与明细契约",
  });
  databricksTrack.latest = {
    slug: "dbx-022-silver-cleaning-consistency",
    title: "第022课｜Silver 层清洗与一致性",
    date: "2026.07.26",
    objective:
      "按 parse、canonicalize、validate、deduplicate、conform 五道闸门建立 Silver 明细契约，并将 valid 与 quarantine 可守恒地分流。",
    highlights: [
      "grain · schema · validity",
      "deterministic deduplication",
      "valid · quarantine · conservation",
    ],
    drill:
      "在 Free Edition 把 6 行 Bronze 清洗为 2 行 Silver 与 3 行 quarantine，并解释 1 行 dedup loser 的独立去向。",
  };
  databricksTrack.topics.push({
    slug: "dbx-023-gold-data-marts",
    title: "第023课｜Gold 层与数据集市",
    date: "07.26",
    description: "平台基础 · 消费契约、数据集市、指标语义与对账",
  });
  databricksTrack.latest = {
    slug: "dbx-023-gold-data-marts",
    title: "第023课｜Gold 层与数据集市",
    date: "2026.07.26",
    objective:
      "以消费者、grain、dimensions、measures 和 freshness 定义 Gold data product，并通过 Silver↔Gold reconciliation 交付一致 KPI。",
    highlights: [
      "presentation layer · data mart",
      "grain · dimensions · measures",
      "metric semantics · reconciliation",
    ],
    drill:
      "在 Free Edition 把 5 行 Silver 订单聚合为 3 行销售 Gold，验证收入 300.00 对账，并用 view 固化共享 KPI。",
  };
  databricksTrack.topics.push({
    slug: "dbx-024-free-edition-limits-cost-awareness",
    title: "第024课｜Free Edition 能力、限制与成本意识",
    date: "07.26",
    description: "平台基础 · Serverless 边界、quota、查询形状与资源纪律",
  });
  databricksTrack.latest = {
    slug: "dbx-024-free-edition-limits-cost-awareness",
    title: "第024课｜Free Edition 能力、限制与成本意识",
    date: "2026.07.26",
    objective:
      "识别 Free Edition 的 serverless-only 与 fair-usage 边界，以 bounded、selective、observable、clean 的循环建立可迁移成本意识。",
    highlights: [
      "no-cost · quota-limited",
      "serverless boundaries",
      "query profile · resource discipline",
    ],
    drill:
      "在 Free Edition 用 30,000 行比较全表、7 天范围和 90 行汇总的执行形状，记录 Query Profile 并清理练习对象。",
  };
  databricksTrack.topics.push({
    slug: "dbx-025-spark-driver-executor-architecture",
    title: "第025课｜Apache Spark 架构与 Driver/Executor",
    date: "07.26",
    description: "Spark 核心 · 应用进程、控制面、数据面与分区任务",
  });
  databricksTrack.latest = {
    slug: "dbx-025-spark-driver-executor-architecture",
    title: "第025课｜Apache Spark 架构与 Driver/Executor",
    date: "2026.07.26",
    objective:
      "区分 Driver 的计划调度与 Executors 的并行数据处理，用 partition/task 证据定位 Driver 集中压力和 Executor 分布问题。",
    highlights: [
      "application · Driver · Executors",
      "partition · task · core",
      "Spark Connect · bounded results",
    ],
    drill:
      "在 Free Edition 用 8 个 partitions 处理 100,000 行，观察分区行数、Exchange 与 10 行 summary，并只收集有界结果。",
  };
  databricksTrack.topics.push({
    slug: "dbx-026-lazy-dag-job-stage-task",
    title: "第026课｜Lazy Evaluation、DAG、Job、Stage 与 Task",
    date: "07.26",
    description: "Spark 核心 · 惰性计划、执行图、Shuffle 边界与任务层级",
  });
  databricksTrack.latest = {
    slug: "dbx-026-lazy-dag-job-stage-task",
    title: "第026课｜Lazy Evaluation、DAG、Job、Stage 与 Task",
    date: "2026.07.26",
    objective:
      "从 lazy transformations 构建 logical DAG，经 action、physical plan 与 Exchange 边界追踪 Job、Stage、Task 和 Partition 的执行层级。",
    highlights: [
      "transformation · action",
      "logical plan · physical plan",
      "Exchange · Stage · Task",
    ],
    drill:
      "在 Free Edition 用 100,000 行构建 lazy summary，先 explain 再 action，验证 5×10,000 行并观察多次 action 的独立 execution。",
  };
  databricksTrack.topics.push({
    slug: "dbx-027-spark-dataframe-schema",
    title: "第027课｜Spark DataFrame 与 Schema",
    date: "07.26",
    description: "Spark 核心 · Rows、Columns、StructType 与类型契约",
  });
  databricksTrack.latest = {
    slug: "dbx-027-spark-dataframe-schema",
    title: "第027课｜Spark DataFrame 与 Schema",
    date: "2026.07.26",
    objective:
      "用 StructType/StructField 把名称、类型、nullability 和 metadata 变成可测试契约，并从 raw schema 安全收紧为 typed DataFrame。",
    highlights: [
      "DataFrame · rows · columns",
      "StructType · StructField",
      "explicit schema · contract test",
    ],
    drill:
      "在 Free Edition 把 3 行 raw 订单转换为 DECIMAL/TIMESTAMP schema，验证 2 行 invalid，并用 expected/actual map 捕获 schema drift。",
  };
  databricksTrack.topics.push({
    slug: "dbx-028-pyspark-column-expressions",
    title: "第028课｜PySpark Column Expressions",
    date: "07.26",
    description: "Spark 核心 · Column DSL、类型化表达式、NULL 与投影计划",
  });
  databricksTrack.latest = {
    slug: "dbx-028-pyspark-column-expressions",
    title: "第028课｜PySpark Column Expressions",
    date: "2026.07.26",
    objective:
      "把 col、lit、运算符、when、cast 与内置函数组合为可分析的 Column 表达式树，并用一次 select 构建清晰、可测试的投影计划。",
    highlights: [
      "Column · expression tree",
      "col · lit · when · cast",
      "NULL · alias · one projection",
    ],
    drill:
      "在 Free Edition 为订单构建金额、质量状态和 null-safe 对比列，验证 3 行结果，并用 explain 确认多个派生列位于同一 Project。",
  };
  databricksTrack.topics.push({
    slug: "dbx-029-filter-project-derive-aggregate",
    title: "第029课｜过滤、投影、派生列与聚合",
    date: "07.26",
    description: "Spark 核心 · 行选择、列契约、指标口径与结果粒度",
  });
  databricksTrack.latest = {
    slug: "dbx-029-filter-project-derive-aggregate",
    title: "第029课｜过滤、投影、派生列与聚合",
    date: "2026.07.26",
    objective:
      "把订单明细通过 Filter、Project 与 Aggregate 收敛为可验证的日级渠道指标，并同时守住过滤范围、输出列契约和聚合粒度。",
    highlights: [
      "Filter · rows",
      "Project · columns",
      "Aggregate · grain",
    ],
    drill:
      "在 Free Edition 处理 6 行订单，验证有效输入 4 行、3 个日渠道分组和 440.00 总收入，并用 formatted plan 识别 Filter、Project、HashAggregate。",
  };
  databricksTrack.topics.push({
    slug: "dbx-030-complex-types-json",
    title: "第030课｜复杂类型 Array、Map、Struct 与 JSON",
    date: "07.26",
    description: "Spark 核心 · 嵌套契约、半结构化解析、高阶函数与粒度展开",
  });
  databricksTrack.latest = {
    slug: "dbx-030-complex-types-json",
    title: "第030课｜复杂类型 Array、Map、Struct 与 JSON",
    date: "2026.07.26",
    objective:
      "用显式 Schema 把 JSON 字符串解析为 Struct、Array 与 Map，在保留父级粒度的高阶函数和改变粒度的 explode 之间做出可验证选择。",
    highlights: [
      "Struct · Array · Map",
      "from_json · schema",
      "transform · explode_outer",
    ],
    drill:
      "在 Free Edition 解析 3 条 JSON 事件，隔离 1 条坏记录，验证订单级 25.00 总额，并用 explode_outer 将 2 个父事件展开为 3 行。",
  };
  databricksTrack.topics.push({
    slug: "dbx-031-join-strategies-broadcast",
    title: "第031课｜Join 策略与 Broadcast Join",
    date: "07.26",
    description: "Spark 核心 · Join 语义、物理策略、统计信息与小表广播",
  });
  databricksTrack.latest = {
    slug: "dbx-031-join-strategies-broadcast",
    title: "第031课｜Join 策略与 Broadcast Join",
    date: "2026.07.26",
    objective:
      "先验证 Join keys、cardinality 与 NULL 语义，再用统计信息和 formatted plan 判断 BroadcastHashJoin、SortMergeJoin 等物理策略是否符合数据规模。",
    highlights: [
      "join type · cardinality",
      "build side · stream side",
      "BroadcastHashJoin · AQE",
    ],
    drill:
      "在 Free Edition 将 1,000 行事实表与 3 行维表做 broadcast left join，验证 1,000 行输出、250 行 unmatched，并在计划中识别 BroadcastExchange 与 BroadcastHashJoin。",
  };
  databricksTrack.topics.push({
    slug: "dbx-032-shuffle-causes-costs",
    title: "第032课｜Shuffle 的成因与代价",
    date: "07.26",
    description: "Spark 核心 · 全量重分布、Exchange、Stage 边界与成本证据",
  });
  databricksTrack.latest = {
    slug: "dbx-032-shuffle-causes-costs",
    title: "第032课｜Shuffle 的成因与代价",
    date: "2026.07.26",
    objective:
      "从 key 共置需求解释 Shuffle，识别 Exchange 与 Stage 边界，并用 shuffle read/write、spill、task 分布等证据决定应减少数据、改变策略还是交给 AQE。",
    highlights: [
      "narrow · wide dependency",
      "Exchange · map/reduce side",
      "network · spill · skew",
    ],
    drill:
      "在 Free Edition 用 8 个输入 partitions 聚合 100,000 行到 10 个 keys，验证每组 10,000 行，并从 formatted plan 识别 partial aggregate、Exchange 和 final aggregate。",
  };
  databricksTrack.topics.push({
    slug: "dbx-033-data-skew-detection-mitigation",
    title: "第033课｜Data Skew 识别与处理",
    date: "07.26",
    description: "Spark 核心 · 热点键、长尾任务、AQE 与确定性 Salting",
  });
  databricksTrack.latest = {
    slug: "dbx-033-data-skew-detection-mitigation",
    title: "第033课｜Data Skew 识别与处理",
    date: "2026.07.26",
    objective:
      "用 key frequency、partition bytes/rows 与 task 长尾确认 Skew，再按数据质量、预聚合、Broadcast、AQE、hot/cold 拆分和 deterministic salting 逐级处理。",
    highlights: [
      "hot key · long tail",
      "AQE · isSkew",
      "salting · two-stage aggregate",
    ],
    drill:
      "在 Free Edition 构造 90,000 行 HOT + 10,000 行 cold keys，验证热点占 90%，再用 8-way deterministic salt 做两阶段聚合并保持总计 100,000。",
  };
  databricksTrack.topics.push({
    slug: "dbx-034-pyspark-window-functions",
    title: "第034课｜Window Functions in PySpark",
    date: "07.26",
    description: "Spark 核心 · Partition、Order、Frame、排名与累计指标",
  });
  databricksTrack.latest = {
    slug: "dbx-034-pyspark-window-functions",
    title: "第034课｜Window Functions in PySpark",
    date: "2026.07.26",
    objective:
      "用明确的 partition、deterministic order 与 rows frame，在保留明细粒度的同时计算序号、前值和累计金额，并从计划识别 Exchange、Sort 与 Window。",
    highlights: [
      "partitionBy · orderBy",
      "rowsBetween · rangeBetween",
      "row_number · lag · running sum",
    ],
    drill:
      "在 Free Edition 为 A/B 两个客户的 6 笔交易计算序号、lag 与累计金额，验证客户 A 的最终累计值为 100.00，并用 txn_id 打破同一时间戳并列。",
  };
  databricksTrack.topics.push({
    slug: "dbx-035-built-in-functions-vs-udf",
    title: "第035课｜内置函数与 UDF 取舍",
    date: "07.26",
    description: "Spark 核心 · Catalyst 可见性、Python 边界与选择阶梯",
  });
  databricksTrack.latest = {
    slug: "dbx-035-built-in-functions-vs-udf",
    title: "第035课｜内置函数与 UDF 取舍",
    date: "2026.07.26",
    objective:
      "优先用 Spark 内置表达式完成转换；只有原生函数无法表达时，才按 SQL、Arrow/Pandas 与 scalar Python UDF 的执行边界选择，并以等价断言和计划证据验证。",
    highlights: [
      "built-in · Catalyst",
      "Python worker · Arrow",
      "NULL-safe · benchmark",
    ],
    drill:
      "在 Free Edition 用 regexp_replace/lower/trim 与 scalar Python UDF 分别规范化 3 个手机号，验证结果完全等价，并比较 formatted plan 中的原生表达式和 Python evaluation 边界。",
  };
  databricksTrack.topics.push({
    slug: "dbx-036-data-read-write-file-formats",
    title: "第036课｜数据读取、写入与文件格式",
    date: "07.26",
    description: "Spark 核心 · Read/Write Contract、CSV、JSON、Parquet 与 Delta",
  });
  databricksTrack.latest = {
    slug: "dbx-036-data-read-write-file-formats",
    title: "第036课｜数据读取、写入与文件格式",
    date: "2026.07.26",
    objective:
      "把 format、schema、options、bad-record policy、target 与 save mode 组成可验证的读写契约，并区分交换文件、列式分析文件和具备事务日志的 Delta table。",
    highlights: [
      "Reader · Writer contract",
      "CSV · JSON · Parquet · Delta",
      "schema · mode · assertions",
    ],
    drill:
      "在 Free Edition 用显式 schema 从 Volume 读取 CSV，写为 Parquet 并交付 Delta managed table，验证 3 行、总金额 250.00、无 NULL 和主键重复。",
  };
  databricksTrack.topics.push({
    slug: "dbx-037-partitions-parallelism-small-files",
    title: "第037课｜Partition、并行度与小文件问题",
    date: "07.26",
    description: "Spark 核心 · 执行分区、写入布局、Compaction 与自动维护",
  });
  databricksTrack.latest = {
    slug: "dbx-037-partitions-parallelism-small-files",
    title: "第037课｜Partition、并行度与小文件问题",
    date: "2026.07.26",
    objective:
      "区分执行、扫描、Shuffle、静态表目录与输出文件的partition，以task和文件证据平衡并行度，并优先采用liquid clustering及自动化compaction能力。",
    highlights: [
      "repartition · coalesce",
      "task parallelism · file layout",
      "optimized writes · OPTIMIZE",
    ],
    drill:
      "在Free Edition生成100,000行/8个输入partitions，对比hash repartition(4)与coalesce(2)，验证行数不变，并用DESCRIBE DETAIL记录Delta文件数量与大小。",
  };
  databricksTrack.topics.push({
    slug: "dbx-038-explain-spark-ui-execution-plan",
    title: "第038课｜explain、Spark UI 与执行计划",
    date: "07.26",
    description: "Spark 核心 · Logical/Physical Plan、Stage/Task Metrics 与 AQE",
  });
  databricksTrack.latest = {
    slug: "dbx-038-explain-spark-ui-execution-plan",
    title: "第038课｜explain、Spark UI 与执行计划",
    date: "2026.07.26",
    objective:
      "用formatted/extended/cost plan理解Spark准备怎样执行，再将最长stage与task duration、Shuffle、spill、GC、I/O分布映射回operator和数据根因。",
    highlights: [
      "logical · physical plan",
      "stage · task · metrics",
      "AQE initial · final plan",
    ],
    drill:
      "在Free Edition构造BroadcastHashJoin + HashAggregate，验证11,000行、110个keys和总金额1,045,000，并保存action前后formatted plan与诊断记录。",
  };
  databricksTrack.topics.push({
    slug: "dbx-039-cache-persist-correct-usage",
    title: "第039课｜Cache/Persist 的正确使用",
    date: "07.26",
    description: "Spark 核心 · Materialization、StorageLevel、复用证据与资源释放",
  });
  databricksTrack.latest = {
    slug: "dbx-039-cache-persist-correct-usage",
    title: "第039课｜Cache/Persist 的正确使用",
    date: "2026.07.26",
    objective:
      "只缓存昂贵、重复消费且尺寸与生命周期可控的共享结果，明确materialize与StorageLevel，以InMemoryTableScan验证复用并在最后消费者后unpersist。",
    highlights: [
      "cache · persist · materialize",
      "StorageLevel · eviction",
      "InMemoryTableScan · unpersist",
    ],
    drill:
      "在Free Edition缓存1,000,000行输入形成的100-key共享聚合，验证333,334行被三个actions复用，观察InMemoryTableScan并阻塞式释放blocks。",
  };
  databricksTrack.topics.push({
    slug: "dbx-040-pyspark-unit-dataframe-testing",
    title: "第040课｜PySpark 单元测试与 DataFrame 测试",
    date: "07.26",
    description: "Spark 核心 · 纯转换函数、DataFrame等价、Schema与业务不变量",
  });
  databricksTrack.latest = {
    slug: "dbx-040-pyspark-unit-dataframe-testing",
    title: "第040课｜PySpark 单元测试与 DataFrame 测试",
    date: "2026.07.26",
    objective:
      "把转换逻辑拆成DataFrame输入/输出纯函数，用官方assertDataFrameEqual/assertSchemaEqual与业务不变量覆盖NULL、坏类型、顺序和精度边界。",
    highlights: [
      "Arrange · Act · Assert",
      "assertDataFrameEqual",
      "schema · invariants · isolation",
    ],
    drill:
      "在Free Edition用3行显式schema输入测试订单规范化，验证两条有效paid、坏金额转NULL、order_id唯一，并通过故意删除trim观察可读row diff。",
  };
  databricksTrack.topics.push({
    slug: "dbx-041-spark-sql-pyspark-collaboration",
    title: "第041课｜Spark SQL 与 PySpark 协作",
    date: "07.26",
    description: "Spark 核心 · 同一执行引擎、Temp View、Parameter Markers 与等价测试",
  });
  databricksTrack.latest = {
    slug: "dbx-041-spark-sql-pyspark-collaboration",
    title: "第041课｜Spark SQL 与 PySpark 协作",
    date: "2026.07.26",
    objective:
      "理解SQL与PySpark如何汇入同一执行引擎，用Temp View连接两种表达方式，并以Parameter Markers安全传值、用等价测试守住重构结果。",
    highlights: [
      "SQL text · DataFrame API",
      "Temp View · SparkSession",
      "Parameter Markers · IDENTIFIER",
    ],
    drill:
      "在Free Edition用4笔订单分别实现SQL与PySpark聚合，安全传入paid与50.00，验证app/web各1笔、总计2笔与200.00，并比较两份DataFrame。",
  };
  databricksTrack.topics.push({
    slug: "dbx-042-spark-errors-debugging",
    title: "第042课｜Spark 常见错误与调试方法",
    date: "07.26",
    description: "Spark 核心 · 错误分层、结构化异常、最小复现与运行证据",
  });
  databricksTrack.latest = {
    slug: "dbx-042-spark-errors-debugging",
    title: "第042课｜Spark 常见错误与调试方法",
    date: "2026.07.26",
    objective:
      "按构造、分析、执行与分布式资源四层定位Spark故障，用errorClass、最小复现、计划和Query Profile形成可验证的修复闭环。",
    highlights: [
      "errorClass · SQLSTATE",
      "minimal reproduction · action",
      "Query Profile · Spark UI",
    ],
    drill:
      "在Free Edition复现错误列名，提取结构化异常；再用try_divide标记0分母，验证正常2笔150.00、坏数据1笔20.00，并从See performance检查Query Profile。",
  };
  databricksTrack.topics.push({
    slug: "dbx-043-delta-lake-transaction-log",
    title: "第043课｜Delta Lake架构与Transaction Log",
    date: "07.26",
    description: "Delta Lake核心 · Data Files、Log Actions、Snapshot与Checkpoint",
  });
  databricksTrack.latest = {
    slug: "dbx-043-delta-lake-transaction-log",
    title: "第043课｜Delta Lake架构与Transaction Log",
    date: "2026.07.26",
    objective:
      "理解Parquet data files与transaction log如何组成Delta表，用actions重建snapshot，并以history、detail和time travel验证三个版本。",
    highlights: [
      "add · remove · protocol",
      "commit · version · snapshot",
      "checkpoint · log replay",
    ],
    drill:
      "在Free Edition依次CTAS、INSERT、UPDATE生成v0–v2，验证v1与latest同为3行170.00但paid从2变3，并写出checkpoint加后续commits的snapshot重建过程。",
  };
  databricksTrack.topics.push({
    slug: "dbx-044-acid-snapshot-concurrency",
    title: "第044课｜ACID、Snapshot与并发控制",
    date: "07.26",
    description: "Delta Lake核心 · ACID边界、Snapshot Isolation、OCC与安全重试",
  });
  databricksTrack.latest = {
    slug: "dbx-044-acid-snapshot-concurrency",
    title: "第044课｜ACID、Snapshot与并发控制",
    date: "2026.07.26",
    objective:
      "拆解ACID四项边界，理解read snapshot与write isolation，并用OCC的read、stage、validate-and-commit解释冲突和安全重试。",
    highlights: [
      "ACID · business invariants",
      "WriteSerializable · Serializable",
      "OCC · fresh snapshot · retry",
    ],
    drill:
      "在Free Edition用单statement完成70/70转账，再触发DIVIDE_BY_ZERO，验证latest仍为v2且无半更新，并为并发冲突设计最多3次的fresh-read重试。",
  };
  databricksTrack.topics.push({
    slug: "dbx-045-delta-dml-merge",
    title: "第045课｜INSERT、UPDATE、DELETE与MERGE",
    date: "07.26",
    description: "Delta Lake核心 · Append、条件变更、MERGE路由与Source去重",
  });
  databricksTrack.latest = {
    slug: "dbx-045-delta-dml-merge",
    title: "第045课｜INSERT、UPDATE、DELETE与MERGE",
    date: "2026.07.26",
    objective:
      "为新增、修改、删除和同步选择正确Delta DML，把source压成每key唯一winner，并通过MERGE clauses与history metrics交付可重跑结果。",
    highlights: [
      "INSERT · UPDATE · DELETE",
      "MERGE routing · clauses",
      "source dedup · idempotency",
    ],
    drill:
      "在Free Edition执行四类DML，source raw 4行先压成3个keys，再MERGE得到o-101/o-104/o-105共3行210.00，并验证相同批次重跑结果不变。",
  };
  databricksTrack.topics.push({
    slug: "dbx-046-schema-enforcement-evolution",
    title: "第046课｜Schema Enforcement与Schema Evolution",
    date: "07.26",
    description: "Delta Lake核心 · 写入守门、受控加列、类型变化与兼容性验收",
  });
  databricksTrack.latest = {
    slug: "dbx-046-schema-enforcement-evolution",
    title: "第046课｜Schema Enforcement与Schema Evolution",
    date: "2026.07.26",
    objective:
      "区分schema inference、enforcement、evolution与constraints，为add column、rename/drop、type widening和full rewrite选择受控变更路径。",
    highlights: [
      "write boundary · contract gate",
      "ADD COLUMNS · mergeSchema",
      "backfill · consumer compatibility",
    ],
    drill:
      "在Free Edition先触发未知currency列写入失败，再显式ADD COLUMNS、插入与回填，最终验收CNY共2行150.00及完整Delta history。",
  };
  databricksTrack.topics.push({
    slug: "dbx-047-time-travel-restore-history",
    title: "第047课｜Time Travel、RESTORE与历史版本",
    date: "07.26",
    description: "Delta Lake核心 · 版本审计、只读回看、恢复事务与retention边界",
  });
  databricksTrack.latest = {
    slug: "dbx-047-time-travel-restore-history",
    title: "第047课｜Time Travel、RESTORE与历史版本",
    date: "2026.07.26",
    objective:
      "用history定位确定版本，以time travel只读验证恢复目标，再用RESTORE创建新latest并处理retention与streaming风险。",
    highlights: [
      "HISTORY · VERSION AS OF",
      "RESTORE · new latest version",
      "retention · streaming duplicates",
    ],
    drill:
      "在Free Edition构造v0–v3，比较v1的3行17与v3的2行6，RESTORE v1生成v4，并验证v3仍可查询且history完整。",
  };
  databricksTrack.topics.push({
    slug: "dbx-048-change-data-feed",
    title: "第048课｜Change Data Feed",
    date: "07.26",
    description: "Delta Lake核心 · 四类行级变化、版本游标、checkpoint与幂等消费",
  });
  databricksTrack.latest = {
    slug: "dbx-048-change-data-feed",
    title: "第048课｜Change Data Feed",
    date: "2026.07.26",
    objective:
      "读取insert、delete与update前后镜像，用version range或checkpoint管理增量进度，并设计retention内可重放的幂等消费者。",
    highlights: [
      "table_changes · readChangeFeed",
      "preimage · postimage · delete",
      "version cursor · checkpoint",
    ],
    drill:
      "在Free Edition构造v1–v4，验证CDF共6条事件及latest两行190.00，再为batch cursor和latest-state target设计提交顺序。",
  };
  databricksTrack.topics.push({
    slug: "dbx-049-idempotency-dedup-rerunnable",
    title: "第049课｜幂等性、去重与可重跑管道",
    date: "07.26",
    description: "Delta Lake核心 · 分层去重、确定winner、事务标识与重跑证据",
  });
  databricksTrack.latest = {
    slug: "dbx-049-idempotency-dedup-rerunnable",
    title: "第049课｜幂等性、去重与可重跑管道",
    date: "2026.07.26",
    objective:
      "用immutable input、分层dedup、event-time guard与run ledger构造同一batch重复执行后业务状态不变的可靠管道。",
    highlights: [
      "event dedup · business winner",
      "MERGE guard · txn identity",
      "rerun · assertions · ledger",
    ],
    drill:
      "在Free Edition把4条source压成3个events与2个winners，MERGE两次后均保持2行170.00，并记录可审计SUCCESS证据。",
  };
  databricksTrack.topics.push({
    slug: "dbx-050-optimistic-concurrency-control",
    title: "第050课｜Optimistic Concurrency Control",
    date: "07.26",
    description: "Delta Lake核心 · OCC验证门、隔离级别、行级并发与安全重试",
  });
  databricksTrack.latest = {
    slug: "dbx-050-optimistic-concurrency-control",
    title: "第050课｜Optimistic Concurrency Control",
    date: "2026.07.26",
    objective:
      "拆解read、stage、validate-and-commit，用read/write set与隔离级别判断冲突，并采用范围分离和fresh-read有限重试。",
    highlights: [
      "read · stage · validate",
      "WriteSerializable · Serializable",
      "row-level concurrency · retry",
    ],
    drill:
      "在Free Edition对JP/CN范围执行明确predicate更新，验证4行500.00与history，并为同row竞争设计最多3次的fresh-snapshot重试。",
  };
  databricksTrack.topics.push({
    slug: "dbx-051-liquid-clustering",
    title: "第051课｜Liquid Clustering",
    date: "07.26",
    description: "Delta Lake核心 · 可演进数据布局、Data Skipping与自动选key",
  });
  databricksTrack.latest = {
    slug: "dbx-051-liquid-clustering",
    title: "第051课｜Liquid Clustering",
    date: "2026.07.26",
    objective:
      "以真实query filters选择manual或AUTO clustering，理解ALTER只改policy、OPTIMIZE渐进重排，并验证statistics与客户端兼容性。",
    highlights: [
      "CLUSTER BY · AUTO · NONE",
      "data skipping · statistics",
      "OPTIMIZE · protocol compatibility",
    ],
    drill:
      "在Free Edition创建customer/date clustered table，验证8行910.00与c-101三行300.00，再演进为region/date并检查detail与history。",
  };
  databricksTrack.topics.push({
    slug: "dbx-052-predictive-optimization-maintenance",
    title: "第052课｜Predictive Optimization、OPTIMIZE与维护",
    date: "07.26",
    description: "Delta Lake核心 · 自动维护决策、布局、统计、保留与成本证据",
  });
  databricksTrack.latest = {
    slug: "dbx-052-predictive-optimization-maintenance",
    title: "第052课｜Predictive Optimization、OPTIMIZE与维护",
    date: "2026.07.26",
    objective:
      "区分OPTIMIZE、ANALYZE与VACUUM，用retention和budget约束自动维护，再以history、system metrics和query scan验收收益。",
    highlights: [
      "OPTIMIZE · ANALYZE · VACUUM",
      "ENABLE · DISABLE · INHERIT",
      "retention · cost · skip reason",
    ],
    drill:
      "在Free Edition分四批写入1000行，手工维护后仍验收500500.00，并为30天恢复窗口设计先设retention再启用自动优化的顺序。",
  };
  databricksTrack.topics.push({
    slug: "dbx-053-delta-table-performance-diagnostics",
    title: "第053课｜Delta表性能诊断",
    date: "07.26",
    description: "Delta Lake核心 · Query Profile、表快照、历史证据与单变量验收",
  });
  databricksTrack.latest = {
    slug: "dbx-053-delta-table-performance-diagnostics",
    title: "第053课｜Delta表性能诊断",
    date: "2026.07.26",
    objective:
      "串联Query Profile、DESCRIBE DETAIL与HISTORY，区分layout、statistics、SQL和compute根因，并用单变量实验验证优化。",
    highlights: [
      "Query Profile · Top operators",
      "DESCRIBE DETAIL · HISTORY",
      "data skipping · optimizer statistics",
    ],
    drill:
      "在Free Edition分四批写入1000行，记录detail与history，手工OPTIMIZE前后始终验收100行和50300.00，并完成四行诊断记录。",
  };
  databricksTrack.topics.push({
    slug: "dbx-054-delta-bronze-silver-gold",
    title: "第054课｜用Delta实现完整Bronze-Silver-Gold",
    date: "07.26",
    description: "Delta Lake核心 · 保真摄取、质量分流、去重与业务聚合",
  });
  databricksTrack.latest = {
    slug: "dbx-054-delta-bronze-silver-gold",
    title: "第054课｜用Delta实现完整Bronze-Silver-Gold",
    date: "2026.07.26",
    objective:
      "为三层分别定义grain与contract，用Delta实现raw保真、quarantine、dedup、constraints和Gold measure，并完成跨层对账。",
    highlights: [
      "Bronze fidelity · replay",
      "Silver quarantine · dedup",
      "Gold measure · reconciliation",
    ],
    drill:
      "在Free Edition处理7条raw订单，验收4条Silver、2条quarantine和2条Gold，并确认CN 150.00、JP 200.00与重跑一致性。",
  };
  databricksTrack.topics.push({
    slug: "dbx-055-batch-incremental-design",
    title: "第055课｜批处理与增量处理设计",
    date: "07.26",
    description: "批处理与流式工程 · 边界冻结、幂等MERGE与checkpoint协议",
  });
  databricksTrack.latest = {
    slug: "dbx-055-batch-incremental-design",
    title: "第055课｜批处理与增量处理设计",
    date: "2026.07.26",
    objective:
      "区分processing semantics与trigger，用(last, high]边界、dedup MERGE和最后提交checkpoint实现可重放incremental batch。",
    highlights: [
      "full batch · incremental batch",
      "current high · checkpoint",
      "replay · idempotent MERGE",
    ],
    drill:
      "在Free Edition处理两轮source changes，依次验收4行450.00/last_seq 5与5行505.00/last_seq 7，并模拟checkpoint失败重跑。",
  };
  databricksTrack.topics.push({
    slug: "dbx-056-structured-streaming-model",
    title: "第056课｜Structured Streaming基础模型",
    date: "07.26",
    description: "流式数据工程 · Input Table、micro-batch、output与checkpoint",
  });
  databricksTrack.latest = {
    slug: "dbx-056-structured-streaming-model",
    title: "第056课｜Structured Streaming基础模型",
    date: "2026.07.26",
    objective:
      "用Input/Result Table模型理解incremental query、micro-batch与checkpoint，并以AvailableNow验证只处理新rows。",
    highlights: [
      "readStream · writeStream",
      "micro-batch · Result Table",
      "checkpoint · exactly-once boundary",
    ],
    drill:
      "在Free Edition以同一checkpoint运行两轮AvailableNow，依次验收3行60.00与5行150.00，并观察更换checkpoint的重放风险。",
  };
  databricksTrack.topics.push({
    slug: "dbx-057-source-sink-trigger-microbatch",
    title: "第057课｜Source、Sink、Trigger与Micro-batch",
    date: "07.26",
    description: "Structured Streaming执行语义 · progress、admission control、commit与恢复",
  });
  databricksTrack.latest = {
    slug: "dbx-057-source-sink-trigger-microbatch",
    title: "第057课｜Source、Sink、Trigger与Micro-batch",
    date: "2026.07.26",
    objective:
      "分清Source、Sink、Trigger与micro-batch边界，以AvailableNow和admission control完成可观测、可恢复的Delta增量写入。",
    highlights: [
      "Source progress · Sink commit",
      "Trigger cadence · batch admission",
      "lastProgress · recovery evidence",
    ],
    drill:
      "在Free Edition运行两轮AvailableNow，依次验收6行210.00与8行360.00，并从lastProgress读取input rows、duration与sink证据。",
  };
  databricksTrack.topics.push({
    slug: "dbx-058-checkpoint-state-fault-tolerance",
    title: "第058课｜Checkpoint、State与容错",
    date: "07.26",
    description: "Structured Streaming可靠性 · progress、State Store、replay与恢复兼容性",
  });
  databricksTrack.latest = {
    slug: "dbx-058-checkpoint-state-fault-tolerance",
    title: "第058课｜Checkpoint、State与容错",
    date: "2026.07.26",
    objective:
      "理解offsets、commits、state与metadata如何协作恢复，并以两轮streaming aggregation验证State Store与checkpoint兼容边界。",
    highlights: [
      "offsets · commits · metadata",
      "State Store · stateOperators",
      "failure replay · idempotent sink",
    ],
    drill:
      "在Free Edition复用checkpoint运行两轮按region聚合，验收CN 130.00、JP 170.00及总计7笔300.00，并读取stateOperators指标。",
  };
  databricksTrack.topics.push({
    slug: "dbx-059-watermark-late-data",
    title: "第059课｜Watermark与迟到数据",
    date: "07.26",
    description: "事件时间与State生命周期 · lateness threshold、window finalization与补算",
  });
  databricksTrack.latest = {
    slug: "dbx-059-watermark-late-data",
    title: "第059课｜Watermark与迟到数据",
    date: "2026.07.26",
    objective:
      "用max event time减delay推导Watermark，理解window关闭与late-data保证，并以两轮stream验证drop、state和append输出。",
    highlights: [
      "event time · Watermark",
      "window end · append finalize",
      "late drop · reconciliation",
    ],
    drill:
      "在Free Edition先推进10:15 Watermark，再送入10:08、10:18与10:35 events，验收两行final windows、3笔80.00及drop指标。",
  };
  databricksTrack.topics.push({
    slug: "dbx-060-streaming-dedup-stateful-processing",
    title: "第060课｜流式去重与有状态处理",
    date: "07.26",
    description: "Stateful Streaming · dedup key、Watermark记忆边界与transformWithState取舍",
  });
  databricksTrack.latest = {
    slug: "dbx-060-streaming-dedup-stateful-processing",
    title: "第060课｜流式去重与有状态处理",
    date: "2026.07.26",
    objective:
      "区分engine exactly-once与业务重复，以稳定event ID、Watermark和checkpoint构建有界跨批去重，并判断内置与自定义state方案。",
    highlights: [
      "business key · duplicate",
      "Emit · Suppress · Drop",
      "built-in state · transformWithState",
    ],
    drill:
      "在Free Edition跨两轮AvailableNow处理8条source records，验收5个唯一event IDs、150.00及Watermark drop指标。",
  };
  databricksTrack.topics.push({
    slug: "dbx-061-auto-loader",
    title: "第061课｜Auto Loader",
    date: "07.26",
    description: "增量文件摄取 · cloudFiles、file events、schema state与文件级进度",
  });
  databricksTrack.latest = {
    slug: "dbx-061-auto-loader",
    title: "第061课｜Auto Loader",
    date: "2026.07.26",
    objective:
      "用cloudFiles把对象存储转成可恢复的增量Source，分清文件发现、schema state与checkpoint，并构建可观测Bronze入口。",
    highlights: [
      "cloudFiles · file discovery",
      "schemaLocation · checkpoint",
      "rescued data · cloud_files_state",
    ],
    drill:
      "在Free Edition向managed Volume分两轮写入3个JSON文件，验收4行100.00、6行210.00及3个file states。",
  };
  databricksTrack.topics.push({
    slug: "dbx-062-cdc-incremental-ingestion",
    title: "第062课｜CDC 基础与增量摄取",
    date: "07.26",
    description: "变更数据捕获 · I/U/D、source sequence、乱序重放与幂等 current-state 合并",
  });
  databricksTrack.latest = {
    slug: "dbx-062-cdc-incremental-ingestion",
    title: "第062课｜CDC 基础与增量摄取",
    date: "2026.07.26",
    objective:
      "从 key、operation、sequence 与 source position 建立 CDC 契约，区分 snapshot、watermark 与 log-based 增量，并把乱序可重放事件确定地应用到 Delta 当前状态表。",
    highlights: [
      "I / U / D · source sequence",
      "Bronze log · current state",
      "Delta CDF · AUTO CDC",
    ],
    drill:
      "在 Free Edition 分两批应用 10 条 CDC records，验收 3 行/250.00 到 3 行/230.00，并用 table_changes 观察行级变化。",
  };
  databricksTrack.topics.push({
    slug: "dbx-063-scd-type1-type2",
    title: "第063课｜SCD Type 1 与 Type 2",
    date: "07.26",
    description: "维度历史建模 · overwrite、版本有效期、surrogate key 与 point-in-time join",
  });
  databricksTrack.latest = {
    slug: "dbx-063-scd-type1-type2",
    title: "第063课｜SCD Type 1 与 Type 2",
    date: "2026.07.26",
    objective:
      "从业务时间问题选择覆盖或版本化策略，用半开有效期、唯一 current row 与属性变更检测构建可重跑的客户维度，并完成 point-in-time 查询。",
    highlights: [
      "Type 1 · current only",
      "Type 2 · validity timeline",
      "surrogate key · point-in-time",
    ],
    drill:
      "在 Free Edition 同时维护 SCD1 与 SCD2，验收 Alice 两个历史版本、3 个 current rows，并分别查询 2 月 Standard 与 4 月 Gold。",
  };
  databricksTrack.topics.push({
    slug: "dbx-064-lakeflow-connect",
    title: "第064课｜Lakeflow Connect",
    date: "07.26",
    description: "托管数据摄取 · connection、gateway、staging、cursor 与 destination streaming tables",
  });
  databricksTrack.latest = {
    slug: "dbx-064-lakeflow-connect",
    title: "第064课｜Lakeflow Connect",
    date: "2026.07.26",
    objective:
      "按来源与责任边界选择 managed、pipeline 或 Structured Streaming 层，分清 SaaS、CDC 与 query-based 组件，并用 source position 和 freshness 设计恢复证据。",
    highlights: [
      "managed · declarative · custom",
      "connection · gateway · staging",
      "cursor · run evidence · recovery",
    ],
    drill:
      "在 Free Edition 建立四类来源的 connector registry 与 run ledger，验收设计阻断项、1025 条成功写入和 lsn:9025 恢复位置。",
  };
  databricksTrack.topics.push({
    slug: "dbx-065-lakeflow-sdp-concepts",
    title: "第065课｜Lakeflow Spark Declarative Pipelines 概念",
    date: "07.26",
    description: "声明式批流管道 · pipeline、dataset、flow、update、mode 与自动依赖编排",
  });
  databricksTrack.latest = {
    slug: "dbx-065-lakeflow-sdp-concepts",
    title: "第065课｜Lakeflow Spark Declarative Pipelines 概念",
    date: "2026.07.26",
    objective:
      "用 pipeline、dataset、flow、sink、update 与 mode 六个概念读懂声明式 DAG，并构建 streaming table 到 materialized view 的最小 serverless pipeline。",
    highlights: [
      "definitions · DAG · orchestration",
      "default flow · update",
      "triggered · continuous · refresh",
    ],
    drill:
      "在 Free Edition 运行两层 triggered pipeline，验收 Bronze/Gold 依赖、非空汇总与第二次 update 不重复结果，并在完成后停止 active pipeline。",
  };
  databricksTrack.topics.push({
    slug: "dbx-066-streaming-table-materialized-view",
    title: "第066课｜Streaming Table 与 Materialized View",
    date: "07.26",
    description: "Lakeflow dataset 选型 · row checkpoint、batch correctness、增量维护与 full refresh",
  });
  databricksTrack.latest = {
    slug: "dbx-066-streaming-table-materialized-view",
    title: "第066课｜Streaming Table 与 Materialized View",
    date: "2026.07.26",
    objective:
      "从一次性记录处理与当前查询结果维护两种语义选择 ST/MV，理解 checkpoint、batch correctness、refresh fallback 与 source mutation 边界。",
    highlights: [
      "row progress · query answer",
      "append-only · source changes",
      "incremental · full recompute",
    ],
    drill:
      "在 Free Edition 分两轮 append 订单，验收 ST 从3行/60.00变为5行/150.00，MV 将07-26汇总从1/30.00更新为3/120.00。",
  };
  databricksTrack.topics.push({
    slug: "dbx-067-python-dp-api",
    title: "第067课｜Python dp API",
    date: "07.26",
    description: "Lakeflow Python 声明式开发 · decorators、DataFrame plans、DAG 与副作用边界",
  });
  databricksTrack.latest = {
    slug: "dbx-067-python-dp-api",
    title: "第067课｜Python dp API",
    date: "2026.07.26",
    objective:
      "使用当前 pyspark.pipelines API 定义 Streaming Table、Temporary View 与 Materialized View，并把 DataFrame definition 与 action / side effect 清晰分开。",
    highlights: [
      "pyspark.pipelines · dp",
      "decorator · DataFrame plan",
      "pure definition · managed update",
    ],
    drill:
      "在 Free Edition 构建三层 Python DAG，验收 Streaming Table 5行、Materialized View 4笔有效订单/100.00，并确认 Temporary View 不作为持久表发布。",
  };
  databricksTrack.topics.push({
    slug: "dbx-068-sql-declarative-pipelines",
    title: "第068课｜SQL Declarative Pipelines",
    date: "07.26",
    description: "Lakeflow SQL 声明式开发 · CREATE OR REFRESH、STREAM、Temporary View 与 DAG",
  });
  databricksTrack.latest = {
    slug: "dbx-068-sql-declarative-pipelines",
    title: "第068课｜SQL Declarative Pipelines",
    date: "2026.07.26",
    objective:
      "用当前 SQL 语法声明 Streaming Table、Temporary View 与 Materialized View，正确区分 STREAM 读取语义、定义求值顺序与 DAG 执行顺序。",
    highlights: [
      "CREATE OR REFRESH · dataset",
      "STREAM · source semantics",
      "source files · dependency DAG",
    ],
    drill:
      "在 Free Edition 构建三层 SQL DAG，验收 Streaming Table 5行、Materialized View 4笔/100.00，并跨两个source files验证执行不依赖文件排列。",
  };
  databricksTrack.topics.push({
    slug: "dbx-069-pipeline-data-quality-rules",
    title: "第069课｜Pipeline 数据质量规则",
    date: "07.26",
    description: "Lakeflow expectations · warn、drop、fail、质量指标与 quarantine 边界",
  });
  databricksTrack.latest = {
    slug: "dbx-069-pipeline-data-quality-rules",
    title: "第069课｜Pipeline 数据质量规则",
    date: "2026.07.26",
    objective:
      "把业务质量要求写成可观察 expectations，按风险选择 warn、drop、fail，并区分 metrics、target 保护与 quarantine 证据。",
    highlights: [
      "condition · name · policy",
      "warn · drop · fail",
      "metrics · quarantine · SLO",
    ],
    drill:
      "在 Free Edition 对6行订单应用4条规则，验收保留1条warn记录、丢弃2条污染记录、target为4行/110.00，并检查expectation metrics。",
  };
  databricksTrack.topics.push({
    slug: "dbx-070-pipeline-monitoring-event-log",
    title: "第070课｜Pipeline 监控与事件日志",
    date: "07.26",
    description: "Lakeflow 可观测性 · update/flow 关联、状态、吞吐、质量、backlog 与告警",
  });
  databricksTrack.latest = {
    slug: "dbx-070-pipeline-monitoring-event-log",
    title: "第070课｜Pipeline 监控与事件日志",
    date: "2026.07.26",
    objective:
      "使用 Event Log 的 update_id 与 flow_name 串联一次运行，联合状态、输出、质量、积压和时长形成可执行监控证据。",
    highlights: [
      "UI · Event Log · Query History",
      "update_id · flow_name",
      "status · quality · backlog",
    ],
    drill:
      "在 Free Edition 调查第069课最新update，定位orders_checked flow，核对可用metrics与target，并写出含窗口、阈值、owner、runbook的告警草案。",
  };
  databricksTrack.topics.push({
    slug: "dbx-071-lakeflow-jobs-basics",
    title: "第071课｜Lakeflow Jobs 基础",
    date: "07.26",
    description: "工作流基础 · Job、Task、Trigger、Run、serverless compute、参数与幂等",
  });
  databricksTrack.latest = {
    slug: "dbx-071-lakeflow-jobs-basics",
    title: "第071课｜Lakeflow Jobs 基础",
    date: "2026.07.26",
    objective:
      "区分Job配置与Run实例，创建带日期参数的serverless Notebook task，并用run history与持久target完成可重复运行验收。",
    highlights: [
      "job · task · trigger",
      "job run · task run",
      "parameter · idempotency",
    ],
    drill:
      "在 Free Edition 手动运行单任务Job两次，用不同run_date验收target始终1行/3笔/60.00，并记录实际参数、状态与输出。",
  };
  databricksTrack.topics.push({
    slug: "dbx-072-multitask-dependencies-parameters-scheduling",
    title: "第072课｜多任务依赖、参数与调度",
    date: "07.26",
    description: "Lakeflow Jobs DAG · task dependencies、Run if、job parameters、动态值引用与调度时区",
  });
  databricksTrack.latest = {
    slug: "dbx-072-multitask-dependencies-parameters-scheduling",
    title: "第072课｜多任务依赖、参数与调度",
    date: "2026.07.26",
    objective:
      "把摄取、聚合与发布组成三任务DAG，用run_date和job.run_id贯穿同一次Run，并在启用schedule前验证依赖、参数与幂等结果。",
    highlights: [
      "dependency · DAG · leaf task",
      "job parameter · task parameter",
      "dynamic reference · timezone",
    ],
    drill:
      "在Free Edition创建三个串行Notebook tasks，手动运行两次并验收stage/daily/manifest行数为3/1/1，再明确调度时区和下一次预期运行时间。",
  };
  databricksTrack.topics.push({
    slug: "dbx-073-conditional-foreach-repair-run",
    title: "第073课｜条件分支、For each 与 Repair run",
    date: "07.26",
    description: "Lakeflow Jobs 控制流 · If/else、task values、For each、受控并发与安全 Repair run",
  });
  databricksTrack.latest = {
    slug: "dbx-073-conditional-foreach-repair-run",
    title: "第073课｜条件分支、For each 与 Repair run",
    date: "2026.07.26",
    objective:
      "用task value驱动质量分支和区域循环，故意制造末端参数失败，再以幂等证据和参数覆盖完成只恢复失败部分的Repair run。",
    highlights: [
      "Run if · If/else",
      "task value · For each",
      "repair · idempotency",
    ],
    drill:
      "在Free Edition运行三市场控制流，观察错误expected_markets导致末端失败，核对已有3行后将参数修正为3并Repair，确认成功区域不重跑且结果仍为3行。",
  };
  databricksTrack.topics.push({
    slug: "dbx-074-retry-timeout-notification-recovery",
    title: "第074课｜重试、超时、通知与故障恢复",
    date: "07.26",
    description: "Lakeflow Jobs 可靠性 · 故障分级、有界retry、Warning/Timeout、分层通知与恢复runbook",
  });
  databricksTrack.latest = {
    slug: "dbx-074-retry-timeout-notification-recovery",
    title: "第074课｜重试、超时、通知与故障恢复",
    date: "2026.07.26",
    objective:
      "把瞬时与确定性故障分开处理，为task配置有界重试、时长阈值和通知，并用attempt证据、幂等target与runbook闭合恢复流程。",
    highlights: [
      "transient · deterministic",
      "retry · warning · timeout",
      "notification · runbook",
    ],
    drill:
      "在Free Edition让task首次模拟503失败、第二次重试成功并越过Warning，随后模拟永久权限错误，比较自动恢复与人工修复的证据和动作。",
  };
  databricksTrack.topics.push({
    slug: "dbx-075-batch-streaming-end-to-end-lakeflow",
    title: "第075课｜Batch + Streaming 端到端 Lakeflow 管道",
    date: "07.26",
    description: "Lakeflow 综合实战 · batch维表、Streaming Tables、Gold MV、Pipeline task与端到端验收",
  });
  databricksTrack.latest = {
    slug: "dbx-075-batch-streaming-end-to-end-lakeflow",
    title: "第075课｜Batch + Streaming 端到端 Lakeflow 管道",
    date: "2026.07.26",
    objective:
      "用三任务Job编排batch维表、triggered pipeline与Gold验收，在pipeline内用Streaming Tables和Materialized View完成增量、质量与当前结果维护。",
    highlights: [
      "Jobs · pipeline boundary",
      "streaming fact · batch dimension",
      "update · quality · evidence",
    ],
    drill:
      "在Free Edition完成首跑和增量跑，验收Silver有效/丢弃行、Gold三等级4单215.00、Job run与pipeline update，并用无新commit重跑证明结果稳定。",
  };
  databricksTrack.topics.push({
    slug: "dbx-076-unity-catalog-governance-model",
    title: "第076课｜Unity Catalog 治理模型",
    date: "07.27",
    description: "统一治理基础 · metastore、securable hierarchy、principal、privilege、ownership与workspace binding",
  });
  databricksTrack.latest = {
    slug: "dbx-076-unity-catalog-governance-model",
    title: "第076课｜Unity Catalog 治理模型",
    date: "2026.07.27",
    objective:
      "从principal、workspace、securable、privilege、ownership和evidence六个维度解释一次Unity Catalog访问，并用SQL核对当前治理上下文。",
    highlights: [
      "metastore · namespace",
      "principal · privilege · owner",
      "binding · lineage · audit",
    ],
    drill:
      "在Free Edition创建治理探针表，检查CURRENT_METASTORE、命名空间、DESCRIBE与三层SHOW GRANTS，写出从workspace到SELECT的完整访问链。",
  };
  databricksTrack.topics.push({
    slug: "dbx-077-users-groups-service-principals",
    title: "第077课｜用户、组与 Service Principal",
    date: "07.27",
    description: "身份治理 · user、account group、service principal、workspace assignment、Run as与OAuth M2M",
  });
  databricksTrack.latest = {
    slug: "dbx-077-users-groups-service-principals",
    title: "第077课｜用户、组与 Service Principal",
    date: "2026.07.27",
    objective:
      "为人员、团队与生产自动化选择正确principal，把account identity、workspace assignment、group membership、Run as和Unity Catalog privilege串成可审计访问链。",
    highlights: [
      "user · group · service principal",
      "account · workspace · privilege",
      "Run as · OAuth M2M",
    ],
    drill:
      "在Free Edition核对current_user、account group membership与自有表grants，再为分析师、工程师和生产Job画出group-based RBAC及最小权限service principal方案。",
  };
  databricksTrack.topics.push({
    slug: "dbx-078-grant-revoke-least-privilege",
    title: "第078课｜GRANT、REVOKE 与最小权限",
    date: "07.27",
    description: "访问控制实务 · GRANT、REVOKE、SHOW GRANTS、scope、inheritance与effective access",
  });
  databricksTrack.latest = {
    slug: "dbx-078-grant-revoke-least-privilege",
    title: "第078课｜GRANT、REVOKE 与最小权限",
    date: "2026.07.27",
    objective:
      "把业务动作翻译为最小privileges，在最窄可维护scope授予account group，并从explicit、inherited、ownership和MANAGE解释effective access。",
    highlights: [
      "action · scope · principal",
      "explicit · inherited",
      "revoke ≠ deny",
    ],
    drill:
      "在Free Edition对自有表执行GRANT、SHOW GRANTS和REVOKE，观察显式SELECT消失后owner仍可读，再完成分析、开发和生产workload的最小权限矩阵。",
  };
  databricksTrack.topics.push({
    slug: "dbx-079-catalog-schema-isolation-strategy",
    title: "第079课｜Catalog/Schema 隔离策略",
    date: "07.27",
    description: "治理架构 · environment/domain/hybrid patterns、workspace binding、ownership与managed storage边界",
  });
  databricksTrack.latest = {
    slug: "dbx-079-catalog-schema-isolation-strategy",
    title: "第079课｜Catalog/Schema 隔离策略",
    date: "2026.07.27",
    objective:
      "以catalog承载主要隔离边界、schema承载数据产品和用例，把workspace binding、group ownership、privilege inheritance和managed storage对齐。",
    highlights: [
      "catalog · schema",
      "environment · domain · hybrid",
      "binding · ownership · storage",
    ],
    drill:
      "在Free Edition盘点可见catalog/schema并创建三段名探针表，再为Sales/Finance和dev/prod设计hybrid blueprint、read-only BI binding及两个拒绝测试。",
  };
  databricksTrack.topics.push({
    slug: "dbx-080-managed-storage-external-location-credential",
    title: "第080课｜Managed Storage、External Location 与 Storage Credential",
    date: "07.27",
    description: "存储治理 · cloud identity、path boundary、managed root、asset lifecycle与workspace binding",
  });
  databricksTrack.latest = {
    slug: "dbx-080-managed-storage-external-location-credential",
    title: "第080课｜Managed Storage、External Location 与 Storage Credential",
    date: "2026.07.27",
    objective:
      "把cloud IAM、storage credential、external location和managed/external assets串成无旁路授权链，并按schema/catalog/metastore层级选择managed root。",
    highlights: [
      "credential · location · path",
      "managed root · lifecycle",
      "binding · no bypass",
    ],
    drill:
      "在Free Edition用DESCRIBE DETAIL观察自有managed Delta表的location，再为prod设计credential、managed/landing locations、最小privileges和三个拒绝测试。",
  };
  databricksTrack.topics.push({
    slug: "dbx-081-volumes-nontabular-data",
    title: "第081课｜Volumes 与非表数据",
    date: "07.27",
    description: "非表数据治理 · managed/external volume、/Volumes路径、文件权限与files-to-table流程",
  });
  databricksTrack.latest = {
    slug: "dbx-081-volumes-nontabular-data",
    title: "第081课｜Volumes 与非表数据",
    date: "2026.07.27",
    objective:
      "用Unity Catalog Volume治理landing files、文档、媒体和artifacts，通过/Volumes统一访问，并把需分析的文件经schema与quality晋升为Delta table。",
    highlights: [
      "managed · external volume",
      "/Volumes · READ/WRITE",
      "files → governed table",
    ],
    drill:
      "在Free Edition创建managed volume和JSON输入，用Python POSIX path写文件、Spark读取并写入Delta表，验证2行124.5并设计读写group matrix。",
  };
  databricksTrack.topics.push({
    slug: "dbx-082-row-filter-column-mask-dynamic-view",
    title: "第082课｜Row Filter、Column Mask 与 Dynamic View",
    date: "07.27",
    description: "细粒度访问控制 · row predicate、column transformation、identity-aware view与ABAC选型",
  });
  databricksTrack.latest = {
    slug: "dbx-082-row-filter-column-mask-dynamic-view",
    title: "第082课｜Row Filter、Column Mask 与 Dynamic View",
    date: "2026.07.27",
    objective:
      "把对象权限与Row Filter、Column Mask、Dynamic View叠成可验证的细粒度控制，并按局部绑定、组合发布和规模化治理选择方案。",
    highlights: [
      "grant → filter/mask",
      "session_user · account group",
      "table policy · view · ABAC",
    ],
    drill:
      "在Free Edition创建2行客户表和identity-aware Dynamic View，验证普通用户只见PUBLIC行和masked email；有权限时再绑定table-level UDF策略。",
  };
  databricksTrack.topics.push({
    slug: "dbx-083-lineage-data-discovery",
    title: "第083课｜Lineage 与数据发现",
    date: "07.27",
    description: "可信数据发现 · search/comments/tags、table/column lineage、impact analysis与external lineage",
  });
  databricksTrack.latest = {
    slug: "dbx-083-lineage-data-discovery",
    title: "第083课｜Lineage 与数据发现",
    date: "2026.07.27",
    objective:
      "用可搜索metadata找到数据资产，用table/column lineage追踪来源与消费者，并把依赖图转化为变更影响分析和事故根因证据。",
    highlights: [
      "BROWSE · comments · tags",
      "table · column lineage",
      "impact · root cause",
    ],
    drill:
      "在Free Edition创建orders到region revenue链路，验证APAC 145与EMEA 80，浏览Catalog lineage并模拟删除refund_amount的下游影响。",
  };
  databricksTrack.topics.push({
    slug: "dbx-084-audit-logs-system-tables",
    title: "第084课｜Audit Logs 与 System Tables",
    date: "07.27",
    description: "安全可观测性 · system catalog、audit event、regional scope、检测规则与调查证据链",
  });
  databricksTrack.latest = {
    slug: "dbx-084-audit-logs-system-tables",
    title: "第084课｜Audit Logs 与 System Tables",
    date: "2026.07.27",
    objective:
      "用system.access.audit回答who/what/where/result，把日期裁剪、身份上下文和跨表证据关联成可检测、可调查的安全工作流。",
    highlights: [
      "system catalog · read-only",
      "actor · action · response",
      "signal · evidence chain",
    ],
    drill:
      "在Free Edition用5条合成audit events检测bot-sp的3次失败和2个source IP，并为成功的高风险权限变更设计独立告警。",
  };
  databricksTrack.topics.push({
    slug: "dbx-085-delta-sharing",
    title: "第085课｜Delta Sharing",
    date: "07.27",
    description: "跨组织共享 · OpenSharing、Share/Recipient、D2D/Open协议、Dynamic View与可撤销契约",
  });
  databricksTrack.latest = {
    slug: "dbx-085-delta-sharing",
    title: "第085课｜Delta Sharing",
    date: "2026.07.27",
    objective:
      "按当前OpenSharing模型设计provider/share/recipient授权链，选择D2D或Open协议，并用最小asset contract实现只读、可撤销、可审计共享。",
    highlights: [
      "share · recipient · grant",
      "D2D · Open · OIDC",
      "contract · audit · revoke",
    ],
    drill:
      "在Free Edition构建APAC partner slice，验证2行170且无email，再编写Share manifest与row/column/update/revoke四类contract tests。",
  };
  databricksTrack.topics.push({
    slug: "dbx-086-data-classification-tags-sensitive-governance",
    title: "第086课｜数据分类、标签与敏感数据治理",
    date: "07.27",
    description: "敏感数据闭环 · AI classification、governed/system tags、ABAC、samples保护与drift复审",
  });
  databricksTrack.latest = {
    slug: "dbx-086-data-classification-tags-sensitive-governance",
    title: "第086课｜数据分类、标签与敏感数据治理",
    date: "2026.07.27",
    objective:
      "把自动检测与人工验证转化为受控governed tags，再连接ABAC、mask、审计和漂移复审，形成可持续敏感数据治理闭环。",
    highlights: [
      "detect · validate · tag",
      "governed · system tags",
      "protect · monitor · review",
    ],
    drill:
      "在Free Edition为客户表设置table/column tags，用Information Schema验证assignment，并设计四级sensitivity taxonomy与email保护方案。",
  };
  databricksTrack.topics.push({
    slug: "dbx-087-enterprise-unity-catalog-design",
    title: "第087课｜企业级 Unity Catalog 设计案例",
    date: "07.27",
    description: "企业治理蓝图 · region/metastore、domain catalogs、workspace binding、federated ownership与验收",
  });
  databricksTrack.latest = {
    slug: "dbx-087-enterprise-unity-catalog-design",
    title: "第087课｜企业级 Unity Catalog 设计案例",
    date: "2026.07.27",
    objective:
      "把region、workspace、catalog/schema、storage、identity、ABAC和observability组合为可实施、可拒绝测试的企业Unity Catalog蓝图。",
    highlights: [
      "region → metastore",
      "domain/env → catalog",
      "binding · groups · evidence",
    ],
    drill:
      "在Free Edition构建Bronze→Silver→Gold链并验证170/80，再输出三域catalog matrix、workspace bindings、权限职责和五个拒绝测试。",
  };
  databricksTrack.topics.push({
    slug: "dbx-088-databricks-cli-authentication",
    title: "第088课｜Databricks CLI 与认证方式",
    date: "07.27",
    description: "安全命令行工作流 · OAuth U2M/M2M、unified authentication、profiles、endpoint 与 401/403 排错",
  });
  databricksTrack.latest = {
    slug: "dbx-088-databricks-cli-authentication",
    title: "第088课｜Databricks CLI 与认证方式",
    date: "2026.07.27",
    objective:
      "按执行者选择 OAuth U2M 或 Service Principal OAuth M2M，用 unified authentication 与 profiles 安全区分环境，并在授权前验证身份、host 和配置来源。",
    highlights: [
      "human → OAuth U2M",
      "automation → OAuth M2M",
      "profile · endpoint · least privilege",
    ],
    drill:
      "在 Free Edition 使用 FREE profile 完成 OAuth 登录，核对 auth describe、current-user 与 catalogs；再设计 DEV/PROD 的 profile、Service Principal 与 secret 注入矩阵。",
  };
  databricksTrack.topics.push({
    slug: "dbx-089-python-wheel-deployable-project",
    title: "第089课｜Python Wheel 与可部署项目结构",
    date: "07.27",
    description: "从 notebook 到不可变 artifact · pyproject.toml、src layout、entry point、clean install 与 Job 契约",
  });
  databricksTrack.latest = {
    slug: "dbx-089-python-wheel-deployable-project",
    title: "第089课｜Python Wheel 与可部署项目结构",
    date: "2026.07.27",
    objective:
      "把数据工程逻辑组织为 pyproject.toml + src + tests + thin entry point，构建并验证不可变 wheel，再用 package、entry point 和参数形成 Job 执行契约。",
    highlights: [
      "source → test → wheel",
      "clean install → smoke test",
      "same artifact → promote",
    ],
    drill:
      "本机构建 orders_etl wheel，在干净环境安装并检查内容；上传到 Free Edition Volume 后从 notebook 安装，验证三行订单仅保留两行。",
  };
  databricksTrack.topics.push({
    slug: "dbx-090-test-pyramid-integration-testing",
    title: "第090课｜测试金字塔与集成测试",
    date: "07.27",
    description: "分层发布门禁 · unit、Delta/Unity Catalog integration、E2E smoke、临时 schema 隔离与证据链",
  });
  databricksTrack.latest = {
    slug: "dbx-090-test-pyramid-integration-testing",
    title: "第090课｜测试金字塔与集成测试",
    date: "2026.07.27",
    objective:
      "把转换语义、真实 Databricks 边界和部署工作流分配到 unit、integration、E2E 三层，用唯一临时 schema、可清理 fixture 与版本证据形成可靠发布门禁。",
    highlights: [
      "unit → fast semantics",
      "integration → real boundaries",
      "E2E → deployed evidence",
    ],
    drill:
      "用四行订单完成 DataFrame unit test，再在唯一 main.it_l090_<suffix> schema 执行 Delta round-trip；注入失败并验证 finally 清理与差异输出。",
  };
  databricksTrack.topics.push({
    slug: "dbx-091-declarative-automation-bundles",
    title: "第091课｜Declarative Automation Bundles（原 Asset Bundles）",
    date: "07.27",
    description: "项目即代码 · bundle anatomy、DEV/PROD targets、direct deployment engine、plan/deploy/run 与 state 安全",
  });
  databricksTrack.latest = {
    slug: "dbx-091-declarative-automation-bundles",
    title: "第091课｜Declarative Automation Bundles（原 Asset Bundles）",
    date: "2026.07.27",
    objective:
      "把源码、wheel、Lakeflow Job、环境参数和权限组合为同一声明式项目，理解 bundle identity/state，并用 validate、plan、deploy、run 建立可重复发布链。",
    highlights: [
      "source + artifact + resources",
      "dev/prod target isolation",
      "validate → plan → deploy → run",
    ],
    drill:
      "用 default-python 模板生成个人 DEV Bundle，完成本地测试、summary/plan、serverless Job 部署与运行；逐项核对 host、root、identity、resource 与清理范围。",
  };
  databricksTrack.topics.push({
    slug: "dbx-092-dev-test-prod-isolation",
    title: "第092课｜dev/test/prod 环境隔离",
    date: "07.27",
    description: "多层环境契约 · Workspace/Catalog/身份/存储/Bundle state 隔离、同一 artifact 单向晋级与负向验证",
  });
  databricksTrack.latest = {
    slug: "dbx-092-dev-test-prod-isolation",
    title: "第092课｜dev/test/prod 环境隔离",
    date: "2026.07.27",
    objective:
      "把 DEV、TEST、PROD 从命名约定升级为可验证的 Workspace、数据、身份、存储、compute 与部署状态边界，并让同一 commit/artifact 经门禁单向晋级。",
    highlights: [
      "seven-layer isolation contract",
      "separate run_as + bundle state",
      "same artifact → promote",
    ],
    drill:
      "在 Free Edition 用隔离 schema 写入 environment probe，完成一次允许路径与一次写前拒绝；再设计 DEV/TEST/PROD 七层矩阵并核对三个 Bundle target 的 host、root 和 identity。",
  };
  databricksTrack.topics.push({
    slug: "dbx-093-ci-cd-workflow",
    title: "第093课｜CI/CD 流程",
    date: "07.27",
    description: "PR/TEST/PROD 质量门禁 · Bundle validate/plan/deploy、OIDC federation、同一制品晋级、smoke 与双平面恢复",
  });
  databricksTrack.latest = {
    slug: "dbx-093-ci-cd-workflow",
    title: "第093课｜CI/CD 流程",
    date: "2026.07.27",
    objective:
      "把 PR 验证、TEST 部署、PROD 审批和上线 smoke 连接成可审计交付链，使用短期 federated identity 与同一 artifact，让每次晋级都有计划、测试和运行证据。",
    highlights: [
      "PR → TEST → PROD gates",
      "workload identity federation",
      "validate → plan → deploy → smoke",
    ],
    drill:
      "创建三行 Gold 样例并运行只读 smoke，注入 NULL 验证 fail closed；构建 wheel、记录 commit/hash，再为四道门禁写出输入、通过证据与失败动作。",
  };
  databricksTrack.topics.push({
    slug: "dbx-094-jobs-pipelines-observability",
    title: "第094课｜Jobs 与 Pipeline 可观测性",
    date: "07.27",
    description: "运行级证据链 · Job run/task/timeline、Pipeline event log、flow/backlog/quality 指标、关联 ID 与可行动 SLO",
  });
  databricksTrack.latest = {
    slug: "dbx-094-jobs-pipelines-observability",
    title: "第094课｜Jobs 与 Pipeline 可观测性",
    date: "2026.07.27",
    objective:
      "把 Job 控制流、task 执行、Pipeline update/flow 与数据质量信号连接成可追踪证据链，用关联 ID、结构化事件和可行动 SLO 快速定位异常。",
    highlights: [
      "run → task → flow drill-down",
      "event log + backlog + quality",
      "correlation IDs → actionable SLO",
    ],
    drill:
      "输出一条包含 Job/task correlation IDs 的结构化事件，注入错误验证 fail closed；查询或模拟最新 Pipeline update，再为业务 freshness 写出阈值、owner 与第一响应动作。",
  };
  databricksTrack.topics.push({
    slug: "dbx-095-system-tables-monitoring",
    title: "第095课｜System Tables 监控",
    date: "07.27",
    description: "账户级历史语义层 · Lakeflow SCD2/timeline、hourly slices、复合键、运行健康、billing 归因与最小权限 views",
  });
  databricksTrack.latest = {
    slug: "dbx-095-system-tables-monitoring",
    title: "第095课｜System Tables 监控",
    date: "2026.07.27",
    objective:
      "把 system.lakeflow、billing 和 query 元数据规范化为每个资源与运行一行的可靠事实，正确处理 SCD2、小时切片、区域与权限，再生成成功率、p95 和成本 KPI。",
    highlights: [
      "SCD2 dimension + timeline facts",
      "hourly slices → one run",
      "governed KPI views + cost joins",
    ],
    drill:
      "用模拟 timeline 证明四条 slice 只代表两次业务 run，再用 QUALIFY 取最新 Job 配置；设计 dashboard 指标 grain、窗口、owner 与受控访问方案。",
  };
  databricksTrack.topics.push({
    slug: "dbx-096-spark-performance-tuning-methodology",
    title: "第096课｜Spark 性能调优方法论",
    date: "07.27",
    description: "证据驱动调优闭环 · 性能契约、可复现基线、critical path、scan/shuffle/skew/spill/UDF 分类与单变量验证",
  });
  databricksTrack.latest = {
    slug: "dbx-096-spark-performance-tuning-methodology",
    title: "第096课｜Spark 性能调优方法论",
    date: "2026.07.27",
    objective:
      "用性能契约、可复现基线、关键路径证据和单变量实验定位 Spark 瓶颈，按消除工作量、减少数据移动、优化表达式、布局与 compute 的顺序验证收益。",
    highlights: [
      "contract → baseline → evidence",
      "classify scan/shuffle/skew/spill",
      "one hypothesis → measured result",
    ],
    drill:
      "在 Free Edition 比较 Python UDF 与 native Column expression，交替运行至少三次并验证结果一致；记录 plan difference、median 与可推广边界。",
  };
  databricksTrack.topics.push({
    slug: "dbx-097-sql-query-profile-photon-optimization",
    title: "第097课｜SQL Query Profile 与 Photon 优化",
    date: "07.27",
    description: "SQL 关键路径诊断 · wall-clock 分解、Top operators、DAG 基数形状、Photon coverage/fallback 与语义等价 A/B 实验",
  });
  databricksTrack.latest = {
    slug: "dbx-097-sql-query-profile-photon-optimization",
    title: "第097课｜SQL Query Profile 与 Photon 优化",
    date: "2026.07.27",
    objective:
      "从 Query History 分离 queue、planning/pruning 与 execution，沿 Top operators 和 DAG 用 rows、bytes、memory、spill 与 Photon task time 定位 SQL 瓶颈并验证等价改写。",
    highlights: [
      "wall-clock → top operator → DAG",
      "rows/bytes ratios expose bad shape",
      "Photon coverage + fallback evidence",
    ],
    drill:
      "用 20 万订单和三版本客户维表对比 DISTINCT JOIN 与 LEFT SEMI JOIN；保存两个 statement ID、Join input/output rows、Photon coverage 和相同结果证据。",
  };
  databricksTrack.topics.push({
    slug: "dbx-098-serverless-cost-performance-tradeoffs",
    title: "第098课｜Serverless 成本与性能权衡",
    date: "07.27",
    description: "单位结果经济学 · Jobs/Pipelines performance target、SQL IWM、时间有效价格、usage 归因、SLO guardrail 与成本治理闭环",
  });
  databricksTrack.latest = {
    slug: "dbx-098-serverless-cost-performance-tradeoffs",
    title: "第098课｜Serverless 成本与性能权衡",
    date: "2026.07.27",
    objective:
      "按 workload intent 与 SLO 区分 performance mode、SQL IWM、warehouse size 和 max clusters，并用完整 billing usage、时间有效 list price 与业务分母评估单位成功结果成本。",
    highlights: [
      "SLO slack → performance target",
      "usage × effective price → unit cost",
      "tags + budget + alert + timeout",
    ],
    drill:
      "用模拟 Performance optimized/Standard 运行记录比较 20 分钟和 15 分钟 SLO；加入一次失败，计算 DBU/success 与 DBU/million rows，再设计四个稳定成本标签。",
  };
  databricksTrack.topics.push({
    slug: "dbx-099-data-quality-sla-alerting",
    title: "第099课｜数据质量、SLA 与告警",
    date: "07.27",
    description: "质量可靠性闭环 · Data contract、SLI/SLO/SLA/error budget、expectations 动作、跨层对账、SQL Alert 与 incident recovery",
  });
  databricksTrack.latest = {
    slug: "dbx-099-data-quality-sla-alerting",
    title: "第099课｜数据质量、SLA 与告警",
    date: "2026.07.27",
    objective:
      "把 validity、completeness、uniqueness、consistency、freshness 与 volume 转成分母明确的 SLI/SLO，选择 warn/drop/fail/quarantine，并把 SQL Alert、owner、runbook 和恢复证据连成闭环。",
    highlights: [
      "contract → SLI → SLO → error budget",
      "warn / drop / quarantine / fail",
      "detect → notify → mitigate → recover",
    ],
    drill:
      "用六行订单构建单行质量 SLI，验证 TRIGGERED、修复后的 OK 与空输入 EMPTY_INPUT；再设计三条不同动作的 expectations 和一份带恢复条件的 alert contract。",
  };
  databricksTrack.topics.push({
    slug: "dbx-100-production-incident-response-postmortem",
    title: "第100课｜生产事故排查与复盘",
    date: "07.27",
    description: "Incident Response 闭环 · 影响分级、UTC 证据链、分诊决策、幂等 Repair、恢复闸门与无责复盘",
  });
  databricksTrack.latest = {
    slug: "dbx-100-production-incident-response-postmortem",
    title: "第100课｜生产事故排查与复盘",
    date: "2026.07.27",
    objective:
      "从消费者影响出发建立 run/update/statement/table/release 身份链，以证据分诊并安全执行 Repair、回滚或重放，最后通过恢复闸门和无责复盘把事故转成可验证的系统改进。",
    highlights: [
      "impact → evidence → hypothesis",
      "idempotency before Repair run",
      "restore → verify → learn",
    ],
    drill:
      "用合成 UTC 事件计算 MTTA/MTTM/MTTR，把五项恢复检查编译为 RECOVERED/NOT_RECOVERED；再设计 Repair 安全清单和带 owner、期限、验证方法的复盘行动表。",
  };
  databricksTrack.topics.push({
    slug: "dbx-101-graduation-project-requirements-architecture",
    title: "第101课｜毕业项目需求与架构设计",
    date: "07.27",
    description: "毕业项目蓝图 · 订单到收入需求、源契约、Batch + Streaming Medallion、横切控制面、ADR 与验收矩阵",
  });
  databricksTrack.latest = {
    slug: "dbx-101-graduation-project-requirements-architecture",
    title: "第101课｜毕业项目需求与架构设计",
    date: "2026.07.27",
    objective:
      "把订单到收入数据产品拆成 grain、key、时间与变化语义明确的源契约，设计 Batch + Streaming Medallion 与 Unity Catalog/Lakeflow/CI/CD 横切控制，并让每项需求绑定验收证据。",
    highlights: [
      "requirement → decision → asset → evidence",
      "Bronze replay → Silver trust → Gold serve",
      "ADR + SLO + Free Edition boundary",
    ],
    drill:
      "用 SQL 构建七域需求追踪矩阵和三源契约闸门，验证 ARCH_READY/CONTRACT_READY；再完成表清单、数据流标注和 Gold grain、退款日期、客户 SCD 三条 ADR。",
  };
  databricksTrack.topics.push({
    slug: "dbx-102-build-order-bronze-ingestion",
    title: "第102课｜构建订单数据 Bronze 摄取",
    date: "07.27",
    description: "可重放入口 · Auto Loader cloudFiles、schema/checkpoint 双状态、精确 file metadata、rescued data 与 availableNow 增量批",
  });
  databricksTrack.latest = {
    slug: "dbx-102-build-order-bronze-ingestion",
    title: "第102课｜构建订单数据 Bronze 摄取",
    date: "2026.07.27",
    objective:
      "用 Auto Loader 增量摄取不可变订单 JSON，分离 source/schema/checkpoint/Bronze 四种状态，保存精确文件元数据与 rescued data，并以 availableNow 构建可审计、可重启、可重放的入口。",
    highlights: [
      "source ≠ schema state ≠ file state",
      "metadata + rescued data = evidence",
      "availableNow + checkpoint = incremental batch",
    ],
    drill:
      "在 managed Volume 生成三行含源端重复的订单 JSON，用 cloudFiles 写入 Bronze；验证同 checkpoint 重跑仍为三行，再比较 addNewColumns 与 rescue 对 coupon_code 的处理。",
  };
  databricksTrack.topics.push({
    slug: "dbx-103-build-silver-clean-dedup-cdc",
    title: "第103课｜构建 Silver 清洗、去重与 CDC",
    date: "07.27",
    description: "可信当前态 · parse/normalize/validate/quarantine 分层、event 去重、total order 与 Lakeflow AUTO CDC Type 1",
  });
  databricksTrack.latest = {
    slug: "dbx-103-build-silver-clean-dedup-cdc",
    title: "第103课｜构建 Silver 清洗、去重与 CDC",
    date: "2026.07.27",
    objective:
      "把 Bronze 订单依次解析、标准化、验证并隔离，区分 event dedup 与 entity CDC，以 key + total ordering 驱动当前 AUTO CDC API，产出可重跑、可对账的 Silver 当前态。",
    highlights: [
      "parse → validate → quarantine",
      "event identity ≠ business key",
      "AUTO CDC + total ordering",
    ],
    drill:
      "用六条乱序、重复、delete 与坏记录构建 prepared/quarantine/winner，验证 INVALID_QUANTITY、最新数量与 DELETE；再设计幂等 MERGE 和 Type 2 target schema。",
  };
  databricksTrack.topics.push({
    slug: "dbx-104-build-gold-sales-subject-model",
    title: "第104课｜构建 Gold 销售主题模型",
    date: "07.27",
    description: "销售消费契约 · fact_order_line grain、维度关系、可加性、net revenue/AOV 口径、Materialized View 与 Gold gate",
  });
  databricksTrack.latest = {
    slug: "dbx-104-build-gold-sales-subject-model",
    title: "第104课｜构建 Gold 销售主题模型",
    date: "2026.07.27",
    objective:
      "以订单行 grain 构建销售事实与客户/日期维度，区分指标可加性，固定 net revenue、order count 与 AOV 口径，并用 Materialized View 和独立对账 gate 形成 Gold 消费契约。",
    highlights: [
      "grain → key → metric contract",
      "facts + dimensions → data mart",
      "batch-equivalent MV + Gold gate",
    ],
    drill:
      "用四行 Silver 数据构建订单行事实和日×渠道×地区数据集市，验证 web/east AOV=49、总 net revenue=79 与 GOLD_READY；再比较退款时间归属和错误 COUNT(*)。",
  };
  databricksTrack.topics.push({
    slug: "dbx-105-add-real-time-event-stream",
    title: "第105课｜加入实时事件流",
    date: "07.27",
    description: "事件时间状态 · message-bus envelope、Kafka Bronze、watermark 去重、stream-static join、触发模式与有限时长 rate 实验",
  });
  databricksTrack.latest = {
    slug: "dbx-105-add-real-time-event-stream",
    title: "第105课｜加入实时事件流",
    date: "2026.07.27",
    objective:
      "为订单事件建立带 event ID/time/sequence 与 source offset 的契约，从 message bus 进入 Bronze，使用 watermark 有界去重，并理解 stream-static join、checkpoint/state 与触发模式的恢复和成本语义。",
    highlights: [
      "event time ≠ ingest time",
      "watermark + event ID → bounded state",
      "stream-static join → latest dimension",
    ],
    drill:
      "用内置 rate source 每秒生成两条事件并 union 成重复流，运行 15 秒后停止；验证 unique_events=distinct_event_ids，再移除去重对照 state、时间延迟和重复率。",
  };
  databricksTrack.topics.push({
    slug: "dbx-106-add-data-quality-quarantine",
    title: "第106课｜加入数据质量与隔离区",
    date: "07.27",
    description: "质量控制闭环 · 规则注册表、Lakeflow expectations、valid/quarantine 双流、Event Log 指标、幂等重放与 Gold 发布门禁",
  });
  databricksTrack.latest = {
    slug: "dbx-106-add-data-quality-quarantine",
    title: "第106课｜加入数据质量与隔离区",
    date: "2026.07.27",
    objective:
      "把数据质量从零散过滤升级为可版本化契约：一次计算规则原因，分别写入可信 Silver 与可审计隔离区，用 Event Log 和 backlog 指标监控，并通过幂等重放与 Gold gate 形成修复闭环。",
    highlights: [
      "rule registry → stable reason IDs",
      "valid path + quarantine path",
      "measure → repair → replay → reconcile",
    ],
    drill:
      "用六条订单样本构造结构、取值域和金额错误，生成 `_quality_reasons`，验证 2 条 valid、4 条 quarantine 与 5 个规则命中；修复后以 replay ID 重放并通过 QUALITY_GATE。",
  };
  databricksTrack.topics.push({
    slug: "dbx-107-configure-unity-catalog-permissions-lineage",
    title: "第107课｜配置 Unity Catalog 权限与血缘",
    date: "07.27",
    description: "治理验收 · group ownership、service principal Run as、最小权限矩阵、继承边界、表/列血缘、影响分析与可验证证据",
  });
  databricksTrack.latest = {
    slug: "dbx-107-configure-unity-catalog-permissions-lineage",
    title: "第107课｜配置 Unity Catalog 权限与血缘",
    date: "2026.07.27",
    objective:
      "为毕业项目建立 group-owned 的生产治理边界，以 service principal 运行流水线，按 catalog/schema/table 分配最小权限；再用自动表/列血缘与 system tables 证明 Bronze→Silver→Gold→消费端的数据流和变更影响。",
    highlights: [
      "identity → inherited grants → effective access",
      "job permission ≠ Run as privilege",
      "runtime lineage → impact evidence",
    ],
    drill:
      "在 Free Edition 创建 governance_lab_107 的 source/clean/mart 三表链路，检查 owner 与 SHOW GRANTS，再从 Catalog Explorer 验证上下游；若系统表不可用，保留命名对象和验证清单作为替代证据。",
  };
  databricksTrack.topics.push({
    slug: "dbx-108-orchestrate-with-lakeflow-jobs",
    title: "第108课｜用 Lakeflow Jobs 编排",
    date: "07.27",
    description: "订单工作流 · event trigger、DAG 依赖、Pipeline/Notebook/If-else 任务、动态参数、task values、单并发队列、幂等 repair 与审计终点",
  });
  databricksTrack.latest = {
    slug: "dbx-108-orchestrate-with-lakeflow-jobs",
    title: "第108课｜用 Lakeflow Jobs 编排",
    date: "2026.07.27",
    objective:
      "把 Bronze、Silver、质量门禁、Gold、对账和审计组装为可观察 DAG：使用事件触发和版本化参数传递运行边界，以 task values 驱动分支，保持单并发与队列，并让每个任务可安全 retry/repair。",
    highlights: [
      "trigger → run context → DAG",
      "Pipeline task + quality branch + audit",
      "idempotent task → safe repair",
    ],
    drill:
      "在 Free Edition 用同一 Python notebook 的 stage 参数构建 prepare→quality→If/else→gold/blocked→audit 多任务 Job；先注入负金额验证 BLOCKED，再以新 run 修复并验证 READY 与幂等 audit MERGE。",
  };
  databricksTrack.topics.push({
    slug: "dbx-109-deploy-dev-prod-with-bundles",
    title: "第109课｜用 Bundle 部署 dev/prod",
    date: "07.27",
    description: "声明式晋级 · Declarative Automation Bundles、target modes、deploy/run identity、变量与参数、精确 commit、validate→deploy→smoke→promote",
  });
  databricksTrack.latest = {
    slug: "dbx-109-deploy-dev-prod-with-bundles",
    title: "第109课｜用 Bundle 部署 dev/prod",
    date: "2026.07.27",
    objective:
      "把订单 Pipeline、Job、源码和权限作为一个 Declarative Automation Bundle 管理，以隔离的 dev/prod targets 解析不同 catalog、workspace 与身份；先在 dev 验证，再把同一 Git commit 晋级到 production。",
    highlights: [
      "source + resource config = bundle",
      "target variable ≠ job parameter",
      "validate → deploy → smoke → promote",
    ],
    drill:
      "在 Free Edition 创建最小 smoke Job bundle，运行 validate、deploy、summary、run；验证 development 前缀和 dev catalog，再修改 PySpark 结果并重新部署，观察同一 bundle identity 更新而不是复制资源。",
  };
  databricksTrack.topics.push({
    slug: "dbx-110-monitoring-cost-dashboard",
    title: "第110课｜构建监控与成本看板",
    date: "07.27",
    description: "同一运行证据 · Jobs/Pipeline Event Log/Query/Billing System Tables、切片聚合、correction-aware 成本、SLO、AI/BI dashboard 与 drill-down",
  });
  databricksTrack.latest = {
    slug: "dbx-110-monitoring-cost-dashboard",
    title: "第110课｜构建监控与成本看板",
    date: "2026.07.27",
    objective:
      "围绕 run/update/statement IDs 建立订单项目观测数据模型，正确聚合 Job 时间切片、Pipeline 质量/积压、Query 性能和 correction-aware list cost，并在 AI/BI dashboard 中连接可靠性、质量、性能、成本与业务新鲜度。",
    highlights: [
      "run grain before dashboard",
      "usage corrections + temporal price join",
      "SLO → alert → drill-down evidence",
    ],
    drill:
      "在 Free Edition 用 VALUES 模拟 run slices、billing ORIGINAL/RETRACTION/RESTATEMENT 与价格变更，构建三张 temp views；验证两个 run、失败率50%、r1有效DBU=3和总list cost=3.30，避免切片重复计数。",
  };
  databricksTrack.topics.push({
    slug: "dbx-111-end-to-end-acceptance-performance",
    title: "第111课｜端到端验收与性能优化",
    date: "07.27",
    description: "毕业项目收口 · 可重放验收、故障注入、SLO/成本基线、Query Profile、Spark UI、Liquid Clustering 与证据化 go/no-go",
  });
  databricksTrack.latest = {
    slug: "dbx-111-end-to-end-acceptance-performance",
    title: "第111课｜端到端验收与性能优化",
    date: "2026.07.27",
    objective:
      "用同一 release candidate 完成功能、数据、幂等、恢复、权限、SLO 与成本验收，再从 Query Profile/Spark UI 的最大瓶颈出发逐项优化，并用可比较证据作出 go/no-go 决策。",
    highlights: [
      "replay → reconcile → failure injection",
      "wall clock before knobs",
      "baseline → one change → verify",
    ],
    drill:
      "在 Free Edition 构造会造成维度重复匹配的订单链，先让验收门禁暴露 count/sum 偏差，再用 current-row 约束修复；比较两组基准样本并验证 p50 从420降到260、提升38.1%。",
  };
  databricksTrack.topics.push({
    slug: "dbx-112-data-engineer-associate-2026-map",
    title: "第112课｜Data Engineer Associate 2026 考纲映射",
    date: "07.27",
    description: "2026-05-04 当前考纲 · 7大能力域、官方权重、114课映射、证据化自评、差距优先级与场景题策略",
  });
  databricksTrack.latest = {
    slug: "dbx-112-data-engineer-associate-2026-map",
    title: "第112课｜Data Engineer Associate 2026 考纲映射",
    date: "2026.07.27",
    objective:
      "把当前 Data Engineer Associate 的7个官方能力域与本路线课程、实验证据和薄弱项建立映射，按考试权重而非熟悉感安排复习，并形成可量化的 readiness backlog。",
    highlights: [
      "7 domains · official weights",
      "course ≠ evidence",
      "weighted gap × exam probability",
    ],
    drill:
      "在 Free Edition 用 SQL 建立7域自评矩阵，按0–3证据等级计算加权准备度72.7%，再自动排序前三个高权重薄弱域并为每域指定一项可运行证据。",
  };
  databricksTrack.topics.push({
    slug: "dbx-113-scenario-questions-interview-communication",
    title: "第113课｜场景题与面试表达",
    date: "07.27",
    description: "场景推理 · CLEAR表达框架、约束优先选型、CDC实证、故障恢复、治理与性能权衡、90秒结构化回答",
  });
  databricksTrack.latest = {
    slug: "dbx-113-scenario-questions-interview-communication",
    title: "第113课｜场景题与面试表达",
    date: "2026.07.27",
    objective:
      "把模糊数据工程场景拆成上下文、约束、决策、证据和恢复方案，用当前 Databricks 能力做有假设、有取舍、可验证的90秒中文主答，并能处理追问。",
    highlights: [
      "clarify before product",
      "decision + rejected alternative",
      "evidence + recovery",
    ],
    drill:
      "在 Free Edition 处理乱序且重复的订单 CDC，验证当前有效记录1行、金额120、重复change为1；随后用 CLEAR 框架录制一段90秒方案说明并做追问复盘。",
  };
  databricksTrack.topics.push({
    slug: "dbx-114-summary-next-stage-plan",
    title: "第114课｜学习总结与下一阶段规划",
    date: "07.27",
    description: "核心路线收官 · 9段能力地图、证据台账、生产差距、30/60/90天计划、持续更新机制与下一阶段分流",
  });
  databricksTrack.latest = {
    slug: "dbx-114-summary-next-stage-plan",
    title: "第114课｜学习总结与下一阶段规划",
    date: "2026.07.27",
    objective:
      "把114课从知识目录转成可审计的个人能力资产，以可重跑项目、运行证据、SLO/成本、治理和表达作品判断真实水平，并选择生产工程、认证或平台治理的下一阶段主线。",
    highlights: [
      "knowledge → evidence → ownership",
      "30 / 60 / 90 days",
      "release notes → impact lab",
    ],
    drill:
      "在 Free Edition 建立10项能力证据台账，验证示例加权准备度76.7%，识别 Streaming/Lakeflow、Spark 与 Governance 三个最高差距，并生成首个30天行动清单。",
  };
}

export const languageTracks = learningTracks.filter(
  (track) => track.category === "language",
);

export const topics = learningTracks.flatMap((track) =>
  track.topics.map((topic) => ({
    ...topic,
    trackId: track.id,
    trackTitle: track.title,
    trackNativeTitle: track.nativeTitle,
    trackEyebrow: track.eyebrow,
    accent: track.accent,
  })),
);

export const topicBySlug = Object.fromEntries(
  topics.map((topic) => [topic.slug, topic]),
);
