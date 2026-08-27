import { Fragment, type ReactNode } from "react";

function renderInline(text: string): ReactNode[] {
  return text
    .split(/(\*\*.*?\*\*|`.*?`|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const [, label, href] = link;
        const external = href.startsWith("http");
        if (external) {
          return <span key={index}>{label}</span>;
        }
        return (
          <a
            href={href}
            key={index}
          >
            {label}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
}

function sectionId(text: string, index: number) {
  const readable = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 44);

  return `section-${index}-${readable || "topic"}`;
}

export function getTopicSections(markdown: string) {
  return markdown
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line, index) => ({
      title: line.slice(3).trim(),
      id: sectionId(line.slice(3).trim(), index),
    }));
}

export function TopicBody({ markdown }: { markdown: string }) {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let sectionIndex = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line || line === "<empty-block/>") {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      index += 1;
      blocks.push(
        <pre className="topic-code" key={`code-${index}`}>
          <span className="code-language">{language || "code"}</span>
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    if (line === "[[databricks-pipeline-diagram]]") {
      const stages = [
        ["Source", "数据库 · SaaS · 文件 · 事件"],
        ["Ingest", "Batch · Streaming · CDC"],
        ["Transform", "Bronze → Silver → Gold"],
        ["Serve", "Delta Tables · SQL"],
        ["Consume", "BI · AI/ML · Apps"],
      ];
      blocks.push(
        <figure className="pipeline-diagram" key={`diagram-${index}`}>
          <div className="pipeline-flow">
            {stages.map(([stage, detail], stageIndex) => (
              <div className="pipeline-stage-wrap" key={stage}>
                <div className="pipeline-stage">
                  <strong>{stage}</strong>
                  <span>{detail}</span>
                </div>
                {stageIndex < stages.length - 1 ? (
                  <span className="pipeline-arrow" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
          <div className="pipeline-foundation">
            <strong>Governance · Orchestration · Observability</strong>
            <span>
              Unity Catalog 管理权限、血缘与审计 · Lakeflow Jobs 编排 ·
              持续监控质量、SLA、失败和成本
            </span>
          </div>
          <figcaption>
            数据工程师负责的不只是转换代码，而是整条链路的可靠交付。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[lakehouse-intelligence-diagram]]") {
      const workloads = [
        ["Lakeflow", "接入 · 转换 · 编排"],
        ["Databricks SQL", "DWH · BI"],
        ["MLflow / AI", "训练 · 评估 · 服务"],
        ["Apps / Sharing", "应用 · 协作"],
      ];
      blocks.push(
        <figure
          className="lakehouse-intelligence-diagram"
          key={`lakehouse-diagram-${index}`}
        >
          <div className="lakehouse-workloads">
            {workloads.map(([name, detail]) => (
              <div className="lakehouse-workload" key={name}>
                <strong>{name}</strong>
                <span>{detail}</span>
              </div>
            ))}
          </div>
          <div className="intelligence-band">
            <span>Data Intelligence engine</span>
            <strong>利用元数据、语义与 AI，辅助发现、开发、治理和优化</strong>
          </div>
          <div className="lakehouse-core">
            <div>
              <span className="diagram-kicker">统一计算</span>
              <strong>Apache Spark · Photon · Serverless</strong>
              <small>一套平台承载 Batch、Streaming、SQL 与 AI</small>
            </div>
            <div>
              <span className="diagram-kicker">统一治理</span>
              <strong>Unity Catalog</strong>
              <small>权限 · 元数据 · 血缘 · 审计 · 发现</small>
            </div>
          </div>
          <div className="lakehouse-storage">
            <span>开放数据基础</span>
            <strong>云对象存储 · Delta Lake · Apache Iceberg</strong>
            <small>结构化、半结构化与非结构化数据</small>
          </div>
          <figcaption>
            Lakehouse 是数据管理架构；Data Intelligence Platform
            在其上增加统一工作负载、治理与智能能力。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[storage-patterns-comparison]]") {
      const patterns = [
        {
          className: "warehouse",
          title: "Data Warehouse",
          subtitle: "先建模，再服务分析",
          rows: [
            ["数据", "结构化、业务化"],
            ["Schema", "Schema-on-write"],
            ["强项", "稳定 BI 与报表"],
            ["边界", "原始与多模态数据适配成本"],
          ],
        },
        {
          className: "lake",
          title: "Data Lake",
          subtitle: "先开放落地，再按需解释",
          rows: [
            ["数据", "原始、多格式"],
            ["Schema", "常见 Schema-on-read"],
            ["强项", "低成本规模化与探索"],
            ["边界", "可靠性、治理和性能需补齐"],
          ],
        },
        {
          className: "lakehouse",
          title: "Lakehouse",
          subtitle: "开放底座 + 可靠表能力",
          rows: [
            ["数据", "原始到业务化"],
            ["Schema", "按层选择并可演进"],
            ["强项", "BI、Streaming、AI/ML 共用"],
            ["边界", "仍需分层、建模与治理"],
          ],
        },
      ];
      blocks.push(
        <figure
          className="storage-patterns-diagram"
          key={`storage-patterns-${index}`}
        >
          <div className="storage-pattern-cards">
            {patterns.map((pattern) => (
              <div
                className={`storage-pattern-card ${pattern.className}`}
                key={pattern.title}
              >
                <div className="storage-pattern-heading">
                  <strong>{pattern.title}</strong>
                  <span>{pattern.subtitle}</span>
                </div>
                <dl>
                  {pattern.rows.map(([term, detail]) => (
                    <div key={term}>
                      <dt>{term}</dt>
                      <dd>{detail}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
          <div className="storage-pattern-convergence">
            <span>Warehouse 的可靠服务能力</span>
            <strong>＋</strong>
            <span>Lake 的开放与扩展能力</span>
            <strong>→ Lakehouse</strong>
          </div>
          <figcaption>
            这是典型设计倾向，不是产品能力的绝对边界；选型应以数据与工作负载为准。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[notebook-workspace-development-diagram]]") {
      const developmentStages = [
        ["01 · EXPLORE", "Notebook", "小输入 · 解释 · 快速反馈"],
        ["02 · EXTRACT", "Workspace File", ".py module · 显式输入输出"],
        ["03 · VERIFY", "Tests", "正常 · 边界 · 坏数据"],
        ["04 · VERSION", "Git folder", "branch · diff · review"],
        ["05 · AUTOMATE", "Lakeflow Job", "参数 · 重试 · 运行证据"],
      ];
      blocks.push(
        <figure
          className="notebook-workspace-development-diagram"
          key={`notebook-workspace-development-${index}`}
        >
          <div className="development-lifecycle">
            {developmentStages.map(([label, title, detail], stageIndex) => (
              <div className="development-stage-wrap" key={label}>
                <div className="development-stage">
                  <span>{label}</span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </div>
                {stageIndex < developmentStages.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="development-runtime-boundary">
            <div className="development-source-contract">
              <span>VERSIONED SOURCE</span>
              <strong>Notebook + module + tests</strong>
              <small>只读入执行环境，不保存业务输出</small>
            </div>
            <i aria-hidden="true">↓</i>
            <div className="development-compute-core">
              <span>SERVERLESS COMPUTE</span>
              <strong>import · transform · validate</strong>
              <div>
                <small>fresh session</small>
                <small>explicit parameters</small>
                <small>repeatable run</small>
              </div>
            </div>
            <i aria-hidden="true">⇄</i>
            <div className="development-data-contract">
              <span>GOVERNED DATA</span>
              <strong>Unity Catalog table / Volume</strong>
              <small>输入输出与源码分离</small>
            </div>
          </div>
          <div className="development-mode-strip">
            <span>Workspace 开发</span>
            <i aria-hidden="true">→</i>
            <strong>Git folder 团队协作</strong>
            <i aria-hidden="true">→</i>
            <span>Local IDE + Databricks Connect</span>
          </div>
          <figcaption>
            Notebook 负责薄编排，共享 module 承载转换；源码经测试和 Git 进入自动化，
            运行数据始终落在受治理的数据资产中。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[serverless-warehouse-photon-diagram]]") {
      const computePaths = [
        {
          className: "notebook",
          entry: "Notebook · Python · %sql",
          compute: "Serverless notebook compute",
          purpose: "交互探索 · PySpark · 混合语言",
        },
        {
          className: "warehouse",
          entry: "SQL editor · BI · JDBC/ODBC",
          compute: "Serverless SQL Warehouse",
          purpose: "SQL 服务 · 并发 · dashboard",
        },
      ];
      blocks.push(
        <figure
          className="serverless-warehouse-photon-diagram"
          key={`serverless-warehouse-photon-${index}`}
        >
          <div className="serverless-compute-paths">
            {computePaths.map((path) => (
              <div
                className={`serverless-compute-path ${path.className}`}
                key={path.compute}
              >
                <div className="compute-entry">
                  <span>WORKLOAD ENTRY</span>
                  <strong>{path.entry}</strong>
                </div>
                <i aria-hidden="true">↓</i>
                <div className="compute-resource">
                  <span>COMPUTE PRODUCT</span>
                  <strong>{path.compute}</strong>
                  <small>{path.purpose}</small>
                </div>
              </div>
            ))}
          </div>
          <div className="serverless-managed-shell">
            <div className="serverless-managed-heading">
              <span>SERVERLESS · Databricks managed</span>
              <strong>provision · scale · patch · release</strong>
            </div>
            <div className="photon-execution-flow">
              <div>
                <span>PLAN</span>
                <strong>Catalyst / query optimizer</strong>
                <small>SQL 与 DataFrame expression → physical plan</small>
              </div>
              <i aria-hidden="true">→</i>
              <div className="photon-core">
                <span>EXECUTE</span>
                <strong>Photon</strong>
                <small>native C++ · columnar batch · SIMD</small>
              </div>
              <i aria-hidden="true">↘</i>
              <div>
                <span>FALLBACK</span>
                <strong>Spark runtime</strong>
                <small>处理 Photon 暂不支持的 operation</small>
              </div>
            </div>
          </div>
          <div className="compute-data-foundation">
            <span>GOVERNED DATA</span>
            <strong>Unity Catalog · Delta tables · Volumes</strong>
            <small>SQL Warehouse 与 Notebook compute 读取同一资产；compute 不保存 table</small>
          </div>
          <div className="compute-responsibility-strip">
            <div>
              <span>平台负责</span>
              <strong>基础设施、弹性、运行环境、执行引擎</strong>
            </div>
            <div>
              <span>工程师负责</span>
              <strong>代码、权限、数据布局、语义、成本与验证</strong>
            </div>
          </div>
          <figcaption>
            Serverless 是资源管理边界，SQL Warehouse 是计算产品，Photon
            是执行引擎；三者可以叠加，却不能互相替代。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[unity-catalog-namespace-diagram]]") {
      const catalogBranches = [
        {
          catalog: "dev",
          schema: "sales",
          objects: ["orders · table", "net_revenue · view"],
          note: "开发环境",
        },
        {
          catalog: "prod",
          schema: "sales",
          objects: ["orders · table", "landing · volume"],
          note: "生产隔离",
        },
        {
          catalog: "workspace_catalog",
          schema: "lesson016",
          objects: ["orders · table", "check_quality · function"],
          note: "个人练习",
        },
      ];
      const resolutionRules = [
        ["orders", "current catalog + current schema"],
        ["sales.orders", "current catalog + sales"],
        ["prod.sales.orders", "exact asset coordinate"],
      ];
      blocks.push(
        <figure
          className="unity-catalog-namespace-diagram"
          key={`unity-catalog-namespace-${index}`}
        >
          <div className="namespace-metastore">
            <span>REGIONAL GOVERNANCE ROOT</span>
            <strong>Unity Catalog Metastore</strong>
            <small>catalogs · identities · grants · storage access · lineage</small>
          </div>
          <div className="namespace-tree-line" aria-hidden="true">
            ↓
          </div>
          <div className="namespace-catalog-grid">
            {catalogBranches.map((branch) => (
              <div className="namespace-catalog-card" key={branch.catalog}>
                <div>
                  <span>CATALOG</span>
                  <strong>{branch.catalog}</strong>
                  <small>{branch.note}</small>
                </div>
                <i aria-hidden="true">↓</i>
                <div>
                  <span>SCHEMA</span>
                  <strong>{branch.schema}</strong>
                  <small>logical category</small>
                </div>
                <i aria-hidden="true">↓</i>
                <ul>
                  {branch.objects.map((object) => (
                    <li key={object}>{object}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="namespace-coordinate">
            <span>FULLY QUALIFIED NAME</span>
            <div>
              <strong>prod</strong>
              <i>.</i>
              <strong>sales</strong>
              <i>.</i>
              <strong>orders</strong>
            </div>
            <small>catalog · schema · object</small>
          </div>
          <div className="namespace-resolution-grid">
            {resolutionRules.map(([name, resolution]) => (
              <div key={name}>
                <code>{name}</code>
                <span>→</span>
                <small>{resolution}</small>
              </div>
            ))}
          </div>
          <div className="namespace-permission-gates">
            <div>
              <span>GATE 01</span>
              <strong>USE CATALOG</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>GATE 02</span>
              <strong>USE SCHEMA</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>GATE 03</span>
              <strong>SELECT / MODIFY / EXECUTE</strong>
            </div>
          </div>
          <figcaption>
            三层名称提供精确坐标；父容器 usage privileges 与对象权限共同决定能否真正使用资产。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[uc-object-selection-diagram]]") {
      const objectContracts = [
        {
          className: "volume",
          question: "需要保留文件 / 目录？",
          object: "Volume",
          contract: "/Volumes path · any format",
          examples: "CSV · JSON · PDF · image · wheel",
        },
        {
          className: "table",
          question: "需要行列、schema 与事务？",
          object: "Table",
          contract: "catalog.schema.table · SQL / DataFrame",
          examples: "Bronze · Silver · Gold datasets",
        },
        {
          className: "view",
          question: "需要复用 query，不复制数据？",
          object: "View",
          contract: "saved query · virtual relation",
          examples: "semantic interface · secure projection",
        },
      ];
      blocks.push(
        <figure
          className="uc-object-selection-diagram"
          key={`uc-object-selection-${index}`}
        >
          <div className="uc-container-frame">
            <span>GOVERNANCE CONTAINERS</span>
            <strong>Catalog → Schema</strong>
            <small>命名 · 发现 · owner · grants · lineage</small>
          </div>
          <div className="uc-object-contracts">
            {objectContracts.map((contract) => (
              <div
                className={`uc-object-contract ${contract.className}`}
                key={contract.object}
              >
                <span>{contract.question}</span>
                <strong>{contract.object}</strong>
                <code>{contract.contract}</code>
                <small>{contract.examples}</small>
              </div>
            ))}
          </div>
          <div className="uc-data-lifecycle">
            <div>
              <span>LAND</span>
              <strong>Volume</strong>
              <small>raw files</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>PROCESS</span>
              <strong>Table</strong>
              <small>governed rows</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>SERVE</span>
              <strong>View</strong>
              <small>stable query interface</small>
            </div>
          </div>
          <div className="uc-object-privileges">
            <div>
              <span>TABLE / VIEW</span>
              <strong>SELECT · MODIFY</strong>
            </div>
            <div>
              <span>VOLUME</span>
              <strong>READ VOLUME · WRITE VOLUME</strong>
            </div>
            <div>
              <span>PARENT PATH</span>
              <strong>USE CATALOG · USE SCHEMA</strong>
            </div>
          </div>
          <figcaption>
            Catalog/schema 是共同容器；Volume、Table、View 分别提供文件、结构化数据与保存查询三种访问契约。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[managed-external-lifecycle-diagram]]") {
      const lifecycleLanes = [
        {
          className: "managed",
          title: "Managed asset",
          steps: [
            ["CREATE", "no LOCATION"],
            ["STORE", "UC managed storage"],
            ["OPERATE", "UC layout · optimize · govern"],
            ["DROP", "metadata + managed deletion lifecycle"],
          ],
          owner: "Unity Catalog controls file lifecycle",
        },
        {
          className: "external",
          title: "External asset",
          steps: [
            ["CREATE", "LOCATION cloud URI"],
            ["STORE", "external location + credential"],
            ["OPERATE", "UC governs · external owner lays out files"],
            ["DROP", "metadata removed · files remain"],
          ],
          owner: "External owner controls file lifecycle",
        },
      ];
      blocks.push(
        <figure
          className="managed-external-lifecycle-diagram"
          key={`managed-external-lifecycle-${index}`}
        >
          <div className="asset-governance-band">
            <span>BOTH ARE UNITY CATALOG SECURABLE OBJECTS</span>
            <strong>privileges · audit · lineage · discovery · ownership</strong>
          </div>
          <div className="asset-lifecycle-lanes">
            {lifecycleLanes.map((lane) => (
              <div
                className={`asset-lifecycle-lane ${lane.className}`}
                key={lane.title}
              >
                <div className="asset-lane-heading">
                  <span>
                    {lane.className === "managed"
                      ? "RECOMMENDED DEFAULT"
                      : "EXPLICIT INTEROPERABILITY"}
                  </span>
                  <strong>{lane.title}</strong>
                </div>
                <div className="asset-lane-steps">
                  {lane.steps.map(([phase, detail], stepIndex) => (
                    <div className="asset-step-wrap" key={phase}>
                      <div className="asset-step">
                        <span>{phase}</span>
                        <strong>{detail}</strong>
                      </div>
                      {stepIndex < lane.steps.length - 1 ? (
                        <i aria-hidden="true">↓</i>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="asset-lane-owner">{lane.owner}</div>
              </div>
            ))}
          </div>
          <div className="asset-storage-boundary">
            <div>
              <span>DATA OWNERSHIP</span>
              <strong>Files remain in your cloud account</strong>
            </div>
            <div>
              <span>DO NOT CONFUSE</span>
              <strong>managed asset ≠ MANAGE privilege</strong>
            </div>
          </div>
          <figcaption>
            两类资产都受 Unity Catalog 治理；分界线是底层路径由谁选择，以及文件最终由谁删除。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[file-to-delta-first-table-diagram]]") {
      const uploadStages = [
        ["01 · FILE", "orders.csv", "raw bytes · local"],
        ["02 · PREVIEW", "header · delimiter", "all STRING · sample"],
        ["03 · RAW", "Managed Delta", "source values · 4 rows"],
        ["04 · VALIDATE", "count · NULL · duplicate", "bad amount visible"],
        ["05 · TYPED", "Delta table", "explicit schema · 3 valid rows"],
      ];
      blocks.push(
        <figure
          className="file-to-delta-first-table-diagram"
          key={`file-to-delta-first-table-${index}`}
        >
          <div className="first-delta-flow">
            {uploadStages.map(([label, title, detail], stageIndex) => (
              <div className="first-delta-stage-wrap" key={label}>
                <div className="first-delta-stage">
                  <span>{label}</span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </div>
                {stageIndex < uploadStages.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="delta-contract-checks">
            <div>
              <span>NAMESPACE</span>
              <strong>catalog.schema.table</strong>
            </div>
            <div>
              <span>FORMAT</span>
              <strong>Delta + transaction log</strong>
            </div>
            <div>
              <span>QUALITY</span>
              <strong>row count · parse · keys</strong>
            </div>
            <div>
              <span>ACCESS</span>
              <strong>object name, not internal path</strong>
            </div>
          </div>
          <div className="upload-production-upgrade">
            <div>
              <span>ONE-TIME ONBOARDING</span>
              <strong>Upload UI</strong>
              <small>small files · human preview</small>
            </div>
            <i aria-hidden="true">↘</i>
            <div>
              <span>RECURRING INGESTION</span>
              <strong>Volume / external location</strong>
              <small>Auto Loader · COPY INTO · Lakeflow</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>RELIABLE PIPELINE</span>
              <strong>state · idempotency · monitoring</strong>
              <small>production evidence</small>
            </div>
          </div>
          <figcaption>
            上传成功只完成入口；显式 schema、坏数据处理与验收查询，才把文件变成可依赖的 Delta table。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[databricks-114-capability-compass-roadmap]]") {
      const courseArcs = [
        ["FOUNDATION", "001–012"],
        ["LAKEHOUSE", "013–024"],
        ["SPARK", "025–042"],
        ["DELTA", "043–054"],
        ["LAKEFLOW", "055–075"],
        ["GOVERN", "076–087"],
        ["PRODUCTION", "088–100"],
        ["CAPSTONE", "101–111"],
        ["EVIDENCE", "112–114"],
      ];
      const evidenceCore = [
        ["CODE", "versioned + tested"],
        ["RUN", "run/update/version IDs"],
        ["TRUST", "quality + governance"],
        ["OPERATE", "SLO + cost + recovery"],
      ];
      blocks.push(
        <figure
          className="databricks-114-capability-compass-roadmap"
          key={`capability-roadmap-${index}`}
        >
          <div className="capability-roadmap-header">
            <span>114-LESSON CORE COMPLETE</span>
            <strong>knowledge → evidence → ownership</strong>
            <small>one maintained portfolio</small>
          </div>
          <div className="capability-course-arc">
            {courseArcs.map(([label, range]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{range}</strong>
              </article>
            ))}
          </div>
          <div className="capability-evidence-core">
            <div className="capability-core-label">
              <span>EVIDENCE CORE</span>
              <strong>reproducible · recoverable · hand-off ready</strong>
            </div>
            <section>
              {evidenceCore.map(([label, detail]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
              ))}
            </section>
          </div>
          <div className="capability-90day-roadmap">
            <section>
              <span>DAY 1–30 · HARDEN</span>
              <strong>replay · failure injection · top gaps</strong>
              <small>score 1 → 2</small>
            </section>
            <i aria-hidden="true">→</i>
            <section>
              <span>DAY 31–60 · SCALE</span>
              <strong>10× data · profile · unit cost</strong>
              <small>repeatable baseline</small>
            </section>
            <i aria-hidden="true">→</i>
            <section>
              <span>DAY 61–90 · OWN</span>
              <strong>handoff · rollback · portfolio</strong>
              <small>score 2 → 3</small>
            </section>
          </div>
          <div className="capability-maintenance-loop">
            <div>
              <span>RELEASE NOTES</span>
              <strong>relevant change only</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>IMPACT HYPOTHESIS</span>
              <strong>code · state · access · cost</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>DEV LAB + GATE</span>
              <strong>same workload · evidence</strong>
            </div>
            <i aria-hidden="true">↺</i>
            <div>
              <span>UPDATE</span>
              <strong>ADR · runbook · score</strong>
            </div>
          </div>
          <figcaption>
            九段课程汇入同一个证据核心，再由 30/60/90 天依次提升可靠性、规模和交接能力。
            路线完成后不再追求课程数量，而以 release notes 触发小型影响实验，
            持续维护可重现的个人工程资产。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[scenario-interview-evidence-storyboard]]") {
      const constraints = [
        ["GRAIN", "one row / order"],
        ["SLA", "freshness · p95"],
        ["ORDER", "sequence · late data"],
        ["SCALE", "volume · frequency"],
        ["SECURITY", "principal · visibility"],
        ["FAILURE", "boundary · partial write"],
      ];
      blocks.push(
        <figure
          className="scenario-interview-evidence-storyboard"
          key={`scenario-storyboard-${index}`}
        >
          <div className="scenario-prompt-header">
            <span>AMBIGUOUS SCENARIO</span>
            <strong>“How would you design, operate, and defend this pipeline?”</strong>
            <small>clarify before product</small>
          </div>
          <div className="scenario-constraint-grid">
            {constraints.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="scenario-decision-fork">
            <section>
              <span>CHOOSE</span>
              <strong>one primary design</strong>
              <small>mechanism + why now</small>
            </section>
            <div>
              <span>DECISION BOUNDARY</span>
              <strong>assumption · rejected option · switch condition</strong>
            </div>
            <section>
              <span>REJECT</span>
              <strong>one plausible alternative</strong>
              <small>which constraint it violates</small>
            </section>
          </div>
          <div className="scenario-evidence-recovery-lanes">
            <section>
              <span>ACCEPTANCE EVIDENCE</span>
              <strong>count/sum · quality · p95 · cost · run/update/statement ID</strong>
            </section>
            <section>
              <span>RECOVERY EVIDENCE</span>
              <strong>checkpoint · idempotent sink · quarantine · repair · rollback</strong>
            </section>
          </div>
          <div className="scenario-answer-timeline">
            <div>
              <span>0–15s · C/L</span>
              <strong>context + limits</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>15–55s · E</span>
              <strong>decision + trade-off</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>55–75s · A</span>
              <strong>measurable evidence</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>75–90s · R</span>
              <strong>recovery + switch</strong>
            </div>
          </div>
          <figcaption>
            CLEAR 将模糊题干压缩为可改变架构的约束，再要求一个主方案、一个被拒绝方案、
            可计算验收证据和恢复路径。90 秒结束时，面试官能清楚判断你的假设、决策边界与工程责任。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[dea-2026-exam-course-evidence-matrix]]") {
      const examDomains = [
        ["PLATFORM", "6%", "002–018"],
        ["INGEST", "21%", "019 · 055 · 061–064"],
        ["TRANSFORM", "22%", "004–041 · 063–069"],
        ["JOBS", "16%", "071–075 · 108"],
        ["CI/CD", "10%", "088–093 · 109"],
        ["TROUBLESHOOT", "10%", "032–053 · 094–111"],
        ["GOVERNANCE", "15%", "076–087 · 107"],
      ];
      blocks.push(
        <figure
          className="dea-2026-exam-course-evidence-matrix"
          key={`dea-exam-map-${index}`}
        >
          <div className="dea-exam-header">
            <span>LIVE EXAM · 04 MAY 2026</span>
            <strong>7 official domains · 45 scored MCQ · 90 minutes</strong>
            <small>re-check before booking</small>
          </div>
          <div className="dea-domain-grid">
            {examDomains.map(([label, weight, lessons]) => (
              <article key={label}>
                <div>
                  <span>{label}</span>
                  <strong>{weight}</strong>
                </div>
                <i style={{ width: weight }} aria-hidden="true" />
                <small>{lessons}</small>
              </article>
            ))}
          </div>
          <div className="dea-evidence-layers">
            <section>
              <span>01 · COURSE</span>
              <strong>concept + current terminology</strong>
            </section>
            <i aria-hidden="true">→</i>
            <section>
              <span>02 · EXECUTE</span>
              <strong>notebook · SQL · bundle · grant</strong>
            </section>
            <i aria-hidden="true">→</i>
            <section>
              <span>03 · DIAGNOSE</span>
              <strong>failure · trade-off · counterexample</strong>
            </section>
            <i aria-hidden="true">→</i>
            <section>
              <span>04 · EVIDENCE</span>
              <strong>output · run ID · profile · validation</strong>
            </section>
          </div>
          <div className="dea-readiness-loop">
            <div>
              <span>WEIGHTED GAP</span>
              <strong>weight × (3-score)</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>20-MIN LAB</span>
              <strong>one objective · one artifact</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>SCENARIO CARD</span>
              <strong>object · invariant · constraint</strong>
            </div>
            <i aria-hidden="true">↺</i>
            <div>
              <span>RE-SCORE</span>
              <strong>evidence before confidence</strong>
            </div>
          </div>
          <figcaption>
            官方权重决定学习预算，课程编号提供入口，但 readiness 只由可复现证据提升。
            高权重低分域进入 20 分钟实验和场景卡；考试前约两周再次核对 guide，
            任何考纲变化都回写矩阵。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[end-to-end-acceptance-performance-loop]]") {
      const acceptanceGates = [
        ["DATA", "count · sum · keys"],
        ["IDEMPOTENCY", "replay · no drift"],
        ["RECOVERY", "failure · repair"],
        ["SECURITY", "allow + deny"],
        ["SLO", "freshness · p95"],
        ["COST", "per accepted row"],
        ["RELEASE", "SHA · run IDs"],
      ];
      const optimizationSteps = [
        ["BASELINE", "same boundary × ≥3"],
        ["PROFILE", "largest wall-clock node"],
        ["ONE CHANGE", "semantic → layout → compute"],
        ["VERIFY", "gate + p50/p95 + cost"],
      ];
      blocks.push(
        <figure
          className="end-to-end-acceptance-performance-loop"
          key={`acceptance-performance-${index}`}
        >
          <div className="acceptance-candidate-header">
            <span>FIXED RELEASE CANDIDATE</span>
            <strong>Git SHA · target · source boundary · rule version</strong>
            <small>one comparable workload</small>
          </div>
          <div className="acceptance-gate-grid">
            {acceptanceGates.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="acceptance-blocking-rail">
            <span>BLOCKING CONTRACT</span>
            <strong>any FAIL → stop · diagnose · repair · replay</strong>
            <small>green tasks ≠ accepted data</small>
          </div>
          <div className="performance-experiment-loop">
            {optimizationSteps.map(([label, detail], step) => (
              <div className="performance-experiment-step" key={label}>
                <article>
                  <span>{String(step + 1).padStart(2, "0")} · {label}</span>
                  <strong>{detail}</strong>
                </article>
                {step < optimizationSteps.length - 1 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="acceptance-verdict-grid">
            <section className="acceptance-no-go">
              <span>NO-GO</span>
              <strong>correctness/recovery regressed</strong>
              <small>restore candidate · preserve evidence</small>
            </section>
            <section className="acceptance-go">
              <span>GO</span>
              <strong>all gates + measurable benefit</strong>
              <small>release manifest → production</small>
            </section>
          </div>
          <figcaption>
            同一候选版本先通过七类 blocking gates，再进入单变量性能实验。每轮都回到同一
            acceptance contract；只有正确性不回退且 wall-clock、SLO 或单位成本有可重复收益，
            才能用 release manifest 做出 GO 决策。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[monitoring-cost-dashboard-evidence-model]]") {
      const monitoringSources = [
        ["JOB TIMELINE", "run · task · result"],
        ["PIPELINE LOG", "update · quality · backlog"],
        ["QUERY HISTORY", "statement · duration · profile"],
        ["BILLING + PRICE", "usage · correction · list cost"],
      ];
      const monitoringViews = [
        ["RUN HEALTH", "one row / run"],
        ["QUALITY", "rule × update"],
        ["QUERY HEALTH", "one row / statement"],
        ["COST BY RUN", "run × product × SKU"],
      ];
      blocks.push(
        <figure
          className="monitoring-cost-dashboard-evidence-model"
          key={`monitoring-cost-${index}`}
        >
          <div className="monitoring-evidence-header">
            <span>ORDERS OBSERVABILITY CONTRACT</span>
            <strong>SLO → alert → stable ID → evidence → action</strong>
            <small>freshness · reliability · quality · performance · cost</small>
          </div>
          <div className="monitoring-source-grid">
            {monitoringSources.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="monitoring-id-rail">
            <span>JOIN CONTRACT</span>
            <strong>workspace + job/run · pipeline/update · statement_id</strong>
            <small>never infer identity from overlapping timestamps</small>
          </div>
          <div className="monitoring-view-grid">
            {monitoringViews.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="monitoring-dashboard-pages">
            <section>
              <span>01 · EXECUTIVE SLO</span>
              <strong>freshness · success · p95 · unit cost</strong>
            </section>
            <section>
              <span>02 · RUN DRILL-DOWN</span>
              <strong>task · update · statement · correction</strong>
            </section>
            <section>
              <span>03 · QUALITY</span>
              <strong>expectation · quarantine · backlog</strong>
            </section>
            <section>
              <span>04 · COST</span>
              <strong>DBU · list price · unallocated</strong>
            </section>
          </div>
          <div className="monitoring-action-loop">
            <div>
              <span>ALERT</span>
              <strong>window + threshold</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>OWNER + RUNBOOK</span>
              <strong>one accountable action</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>EVIDENCE</span>
              <strong>run/update/statement IDs</strong>
            </div>
            <i aria-hidden="true">↺</i>
            <div>
              <span>REVIEW</span>
              <strong>SLO + threshold tuning</strong>
            </div>
          </div>
          <figcaption>
            原始系统证据先按正确粒度形成受控 views，再驱动 AI/BI dashboard。
            稳定 ID 让每个红色 SLO 都能下钻到运行与费用记录；watermark 和 unavailable
            状态避免把延迟或无权限误读为零。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[bundle-dev-prod-promotion-control-plane]]") {
      const bundleParts = [
        ["SOURCE", "Python · SQL · notebook"],
        ["RESOURCES", "Pipeline · Job · permissions"],
        ["TESTS", "unit · integration · smoke"],
      ];
      const identityControls = [
        ["DEPLOY ID", "create/update resources"],
        ["RUN AS", "least-privilege workflow"],
        ["STATE + LOCK", "one bundle identity"],
      ];
      blocks.push(
        <figure
          className="bundle-dev-prod-promotion-control-plane"
          key={`bundle-promotion-${index}`}
        >
          <div className="bundle-source-header">
            <span>REVIEWED GIT COMMIT</span>
            <strong>one declarative project · one immutable SHA</strong>
            <small>orders-lakehouse</small>
          </div>
          <div className="bundle-part-grid">
            {bundleParts.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="bundle-target-lanes">
            <section className="bundle-dev-lane">
              <div>
                <span>DEV TARGET</span>
                <strong>mode: development</strong>
                <small>orders_dev · prefixed · triggers paused</small>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>VALIDATE + DEPLOY</span>
                <strong>resolved config</strong>
                <small>same bundle identity</small>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>SMOKE EVIDENCE</span>
                <strong>quality · lineage · reconcile</strong>
                <small>run ID + assertions</small>
              </div>
            </section>
            <div className="bundle-promotion-gate">
              <span>PROMOTE EXACT SHA</span>
              <strong>reviewed · tested · no rebuild drift</strong>
            </div>
            <section className="bundle-prod-lane">
              <div>
                <span>PROD TARGET</span>
                <strong>mode: production</strong>
                <small>orders_prod · main branch gate</small>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>LOCKED DEPLOY</span>
                <strong>CI service principal</strong>
                <small>permissions + resource IDs</small>
              </div>
              <i aria-hidden="true">→</i>
              <div>
                <span>CANARY RUN</span>
                <strong>workflow service principal</strong>
                <small>source version + audit gate</small>
              </div>
            </section>
          </div>
          <div className="bundle-identity-grid">
            {identityControls.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="bundle-release-gate">
            <span>RELEASE_EVIDENCE</span>
            <strong>Git SHA · target · workspace · resource IDs · deploy/run identities · run result</strong>
          </div>
          <figcaption>
            同一 Git SHA 先由 dev target 解析、部署并产生 smoke evidence，再由 production target
            解析到独立 catalog/workspace，以 CI identity 部署、service principal 运行。
            Bundle state 与 deployment lock 保护资源身份，但业务数据回滚仍需单独设计。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[lakeflow-jobs-order-orchestration-run-map]]") {
      const runContext = [
        ["RUN ID", "{{job.run_id}}"],
        ["SOURCE", "version · file boundary"],
        ["POLICY", "rule version · environment"],
      ];
      const recoveryControls = [
        ["RETRY", "transient only · bounded"],
        ["REPAIR", "failed task + dependents"],
        ["QUEUE", "single concurrency · ≤48h"],
      ];
      blocks.push(
        <figure
          className="lakeflow-jobs-order-orchestration-run-map"
          key={`jobs-order-run-${index}`}
        >
          <div className="jobs-orchestration-header">
            <span>EVENT / SCHEDULE / MANUAL TRIGGER</span>
            <strong>one bounded order-processing run</strong>
            <small>file arrival · table update · replay</small>
          </div>
          <div className="jobs-run-context-grid">
            {runContext.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="jobs-main-dag">
            <article>
              <span>1 · PIPELINE</span>
              <strong>ingest_bronze</strong>
              <small>checkpoint + commit</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>2 · PIPELINE</span>
              <strong>build_silver</strong>
              <small>valid + quarantine</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>3 · NOTEBOOK</span>
              <strong>evaluate_quality</strong>
              <small>task values</small>
            </article>
          </div>
          <div className="jobs-quality-branch">
            <div className="jobs-condition-node">
              <span>IF / ELSE</span>
              <strong>critical_count == 0</strong>
            </div>
            <div className="jobs-branch-lanes">
              <div>
                <span>TRUE · READY</span>
                <strong>build_gold → reconcile_gold</strong>
                <small>Pipeline + SQL gate</small>
              </div>
              <div>
                <span>FALSE · BLOCKED</span>
                <strong>report_quarantine</strong>
                <small>owner + action + evidence</small>
              </div>
            </div>
          </div>
          <div className="jobs-audit-convergence">
            <span>NONE FAILED · AT LEAST ONE BRANCH RAN</span>
            <strong>finalize_audit · MERGE by run_key</strong>
            <small>READY / BLOCKED · source version · counts · timestamps</small>
          </div>
          <div className="jobs-recovery-grid">
            {recoveryControls.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="jobs-orchestration-gate">
            <span>ORCHESTRATION_GATE</span>
            <strong>dependencies explicit · parameters resolved · writes idempotent · audit terminal</strong>
          </div>
          <figcaption>
            Trigger 只启动一次有界 run；DAG 明确 Bronze、Silver、质量分支、Gold/blocked
            和审计终点。Task values 只承载控制信息，业务数据留在 Unity Catalog；retry、repair
            和 queue 能恢复调度，但不会替 task 自动提供幂等性。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[unity-catalog-access-lineage-evidence-map]]") {
      const principals = [
        ["GROUP OWNER", "orders-platform-admins"],
        ["RUN AS", "sp-orders-pipeline-prod"],
        ["CONSUMER", "sales-analysts"],
      ];
      const accessGates = [
        ["CATALOG", "USE CATALOG"],
        ["SCHEMA", "USE SCHEMA"],
        ["OBJECT", "SELECT · MODIFY · CREATE"],
      ];
      const lineageEvidence = [
        ["TABLE LINEAGE", "source · target · run"],
        ["COLUMN LINEAGE", "net_amount → net_revenue"],
        ["WORKLOAD", "Job · Pipeline · Query · Dashboard"],
      ];
      blocks.push(
        <figure
          className="unity-catalog-access-lineage-evidence-map"
          key={`uc-access-lineage-${index}`}
        >
          <div className="uc-governance-header">
            <span>UNITY CATALOG GOVERNANCE CONTRACT</span>
            <strong>WHO may do WHAT · WHAT actually flowed WHERE</strong>
            <small>orders_prod · group-owned</small>
          </div>
          <div className="uc-principal-grid">
            {principals.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="uc-access-path">
            <div className="uc-effective-access-card">
              <span>EFFECTIVE ACCESS</span>
              <strong>direct grant + group + inheritance + ownership</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div className="uc-access-gates">
              {accessGates.map(([label, detail]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
              ))}
            </div>
          </div>
          <div className="uc-runtime-lineage-flow">
            <article>
              <span>RUN AS IDENTITY</span>
              <strong>production service principal</strong>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>BRONZE</span>
              <strong>source evidence</strong>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>SILVER</span>
              <strong>trusted orders</strong>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>GOLD</span>
              <strong>sales mart</strong>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>CONSUMER</span>
              <strong>dashboard · query</strong>
            </article>
          </div>
          <div className="uc-lineage-evidence-grid">
            {lineageEvidence.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="uc-governance-compare">
            <div>
              <span>ALLOWED GRAPH</span>
              <strong>SHOW GRANTS · owner · memberships</strong>
            </div>
            <i aria-hidden="true">↔</i>
            <div>
              <span>OBSERVED GRAPH</span>
              <strong>table/column lineage · created_by · run</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>GOVERNANCE_GATE</span>
              <strong>least privilege · expected edges · known blind spots</strong>
            </div>
          </div>
          <figcaption>
            权限链要求 principal 逐层通过 catalog、schema 和 object gate；运行链则记录 service
            principal 实际产生的 Bronze→Silver→Gold→consumer 血缘。比较 allowed 与 observed
            两张图，才能证明生产访问既足够又不过度。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[quality-quarantine-replay-control-loop]]") {
      const qualityRules = [
        ["STRUCTURE", "key · schema · timestamp"],
        ["DOMAIN", "status · amount · relation"],
        ["CONTROL", "freshness · reconcile · owner"],
      ];
      const qualitySignals = [
        ["EVENT LOG", "pass · fail · drop rate"],
        ["BACKLOG", "OPEN count · oldest age"],
        ["GOLD GATE", "freshness · totals · severity"],
      ];
      blocks.push(
        <figure
          className="quality-quarantine-replay-control-loop"
          key={`quality-control-${index}`}
        >
          <div className="quality-contract-header">
            <span>VERSIONED RULE REGISTRY</span>
            <strong>stable ID · expression · severity · action · owner · effective date</strong>
            <small>orders-v3 · reviewed as code</small>
          </div>
          <div className="quality-rule-grid">
            {qualityRules.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="quality-routing-flow">
            <article className="quality-source-card">
              <span>BRONZE EVIDENCE</span>
              <strong>raw payload + source identity</strong>
              <small>file / topic · partition · offset</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="quality-prepare-card">
              <span>PREPARED ONCE</span>
              <strong>_quality_reasons[]</strong>
              <small>_is_valid · _rule_version</small>
            </article>
            <i aria-hidden="true">↗↘</i>
            <div className="quality-branch-stack">
              <article>
                <span>VALID PATH</span>
                <strong>trusted Silver</strong>
                <small>expect_all_or_drop</small>
              </article>
              <article>
                <span>QUARANTINE PATH</span>
                <strong>immutable evidence</strong>
                <small>reason · first seen · replay status</small>
              </article>
            </div>
          </div>
          <div className="quality-observability-grid">
            {qualitySignals.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="quality-replay-loop">
            <div>
              <span>1 · TRIAGE</span>
              <strong>assign owner + bounded range</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>2 · REPAIR</span>
              <strong>source / rule fix + replay ID</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>3 · REPLAY</span>
              <strong>same prepared rules</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>4 · RECONCILE</span>
              <strong>rows · amount · disposition</strong>
            </div>
          </div>
          <div className="quality-release-gate">
            <span>QUALITY_GATE</span>
            <strong>READY only when critical=0 · reconciliation=0 · freshness within SLO</strong>
          </div>
          <figcaption>
            规则只在 prepared 层判定一次：合法行进入可信 Silver，无效行连同原始证据进入隔离区；
            指标触发修复，稳定 replay ID 把同一批记录重新送回相同规则，最终由对账门禁控制 Gold 发布。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[real-time-order-events-state-flow]]") {
      const clocks = [
        ["EVENT", "business happened"],
        ["BROKER", "message accepted"],
        ["INGEST", "Bronze received"],
        ["PROCESS", "operator handled"],
      ];
      const stateControls = [
        ["WATERMARK", "max event time − delay"],
        ["DEDUP STATE", "event IDs in horizon"],
        ["CHECKPOINT", "identity · offsets · recovery"],
      ];
      const outputs = [
        ["SILVER EVENTS", "valid · unique"],
        ["LIVE METRICS", "windowed SLI"],
        ["LATE PATH", "audit · reconcile"],
      ];
      blocks.push(
        <figure
          className="real-time-order-events-state-flow"
          key={`real-time-events-${index}`}
        >
          <div className="real-time-event-header">
            <span>ORDER EVENT ENVELOPE</span>
            <strong>event ID · key · type · event time · sequence · version · payload</strong>
            <small>topic · partition · offset</small>
          </div>
          <div className="real-time-clock-grid">
            {clocks.map(([label, detail]) => (
              <article key={label}>
                <span>{label} TIME</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="real-time-ingestion-flow">
            <article>
              <span>MESSAGE BUS</span>
              <strong>Kafka · Kinesis · Pub/Sub</strong>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>BRONZE STREAM</span>
              <strong>raw payload + offsets</strong>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>PARSE + CONTRACT</span>
              <strong>typed event + reason</strong>
            </article>
          </div>
          <div className="real-time-state-plane">
            {stateControls.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="real-time-output-grid">
            {outputs.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="real-time-join-caveat">
            <div>
              <span>STREAM</span>
              <strong>new event micro-batch</strong>
            </div>
            <i aria-hidden="true">×</i>
            <div>
              <span>STATIC DELTA</span>
              <strong>latest valid snapshot</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>REPLAY CAVEAT</span>
              <strong>dimension change can change result</strong>
            </div>
          </div>
          <div className="real-time-slo-gate">
            <span>5-MINUTE EVENT SLO</span>
            <strong>freshness · backlog · duplicate rate · late-drop rate · state size</strong>
          </div>
          <figcaption>
            Event-time watermark 决定有界 state，checkpoint 保存查询恢复身份；两者与消息 offset
            共同形成可恢复流。实时输出之外仍保留 late/reconciliation 路径，避免 watermark
            外的数据永久失去审计。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[gold-sales-semantic-star-model]]") {
      const dimensions = [
        ["DIM DATE", "calendar · fiscal"],
        ["DIM CUSTOMER", "SCD version · region"],
        ["DIM CHANNEL", "web · store"],
        ["DIM PRODUCT", "category · brand"],
      ];
      const metrics = [
        ["GROSS", "Σ quantity × price"],
        ["REFUND", "Σ confirmed refund"],
        ["NET", "gross − refund"],
        ["ORDERS", "COUNT DISTINCT order"],
        ["AOV", "net / orders"],
      ];
      const gates = [
        ["GRAIN", "one row / order line"],
        ["RELATION", "no orphan keys"],
        ["RECONCILE", "Silver ↔ Gold"],
        ["FRESHNESS", "consumer SLO"],
      ];
      blocks.push(
        <figure
          className="gold-sales-semantic-star-model"
          key={`gold-star-${index}`}
        >
          <div className="gold-contract-header">
            <span>SALES DATA PRODUCT CONTRACT</span>
            <strong>grain · formula · filter · time attribution · owner · SLO</strong>
            <small>one definition, many consumers</small>
          </div>
          <div className="gold-star-layout">
            <div className="gold-dimension-grid">
              {dimensions.map(([label, detail]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
              ))}
            </div>
            <i aria-hidden="true">→</i>
            <div className="gold-fact-core">
              <span>FACT ORDER LINE</span>
              <strong>order_id + line_id</strong>
              <small>quantity · gross · refund · net · dimension keys</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="gold-mart-card">
              <span>DAILY SALES MART</span>
              <strong>date × channel × region</strong>
              <small>Materialized View · batch-equivalent</small>
            </div>
          </div>
          <div className="gold-metric-strip">
            {metrics.map(([label, formula]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{formula}</strong>
              </article>
            ))}
          </div>
          <div className="gold-consumer-row">
            <article>
              <span>FINANCE</span>
              <strong>reconciled net revenue</strong>
            </article>
            <article>
              <span>OPERATIONS</span>
              <strong>channel · region · freshness</strong>
            </article>
            <article>
              <span>LEADERSHIP</span>
              <strong>orders · net · AOV</strong>
            </article>
          </div>
          <div className="gold-gate-grid">
            {gates.map(([label, check]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{check}</strong>
              </article>
            ))}
          </div>
          <div className="gold-ready-gate">
            <span>GOLD READY</span>
            <strong>all checks pass · metric contract versioned · refresh observed</strong>
          </div>
          <figcaption>
            事实表固定订单行 grain，维度提供稳定筛选语义，数据集市从可加分子与正确分母计算指标。
            PK/FK 描述关系，独立 quality gate 才证明唯一、覆盖、对账和时效满足消费契约。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[silver-clean-dedup-cdc-decision-pipeline]]") {
      const preparationSteps = [
        ["PARSE", "TRY_CAST · timestamp"],
        ["NORMALIZE", "trim · upper · enum"],
        ["VALIDATE", "key · amount · sequence"],
      ];
      const cdcInputs = [
        ["EVENT KEY", "change ID"],
        ["ENTITY KEY", "order + line"],
        ["TOTAL ORDER", "time + sequence"],
      ];
      const outputChecks = [
        ["CURRENT STATE", "one row / key"],
        ["QUARANTINE", "reason + replay"],
        ["RECONCILE", "counts + amounts"],
      ];
      blocks.push(
        <figure
          className="silver-clean-dedup-cdc-decision-pipeline"
          key={`silver-cdc-${index}`}
        >
          <div className="silver-cdc-header">
            <span>BRONZE CHANGE FEED</span>
            <strong>source values · metadata · rescued data</strong>
            <small>append facts, including duplicates</small>
          </div>
          <div className="silver-preparation-flow">
            {preparationSteps.map(([label, detail], stepIndex) => (
              <div className="silver-preparation-step" key={label}>
                <article>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
                {stepIndex < preparationSteps.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="silver-quality-fork">
            <div>
              <span>QUALITY GATE</span>
              <strong>valid?</strong>
            </div>
            <i aria-hidden="true">↙</i>
            <article className="silver-valid-route">
              <span>VALID</span>
              <strong>continue to event dedup</strong>
            </article>
            <i aria-hidden="true">↘</i>
            <article className="silver-quarantine-route">
              <span>INVALID</span>
              <strong>reason code + raw evidence</strong>
            </article>
          </div>
          <div className="silver-cdc-key-grid">
            {cdcInputs.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="silver-cdc-core">
            <div>
              <span>EVENT DEDUP</span>
              <strong>remove duplicate delivery</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>AUTO CDC</span>
              <strong>upsert · delete · SCD 1/2</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>SILVER</span>
              <strong>trusted entity state</strong>
            </div>
          </div>
          <div className="silver-output-checks">
            {outputChecks.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="silver-replay-loop">
            <span>RULE VERSION CHANGED</span>
            <strong>fix → replay quarantine/Bronze → apply idempotently → reconcile</strong>
            <i aria-hidden="true">↺</i>
          </div>
          <figcaption>
            Validation 决定行能否进入受信层，event dedup 删除重复投递，AUTO CDC
            再按 entity key 与 total order 应用版本。三者顺序清晰，坏记录才能重放，当前态才能确定且可对账。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[bronze-order-ingestion-replay-contract]]") {
      const inputFiles = [
        ["FILE 001", "orders · immutable"],
        ["FILE 002", "late arrival"],
        ["FILE 003", "new column"],
      ];
      const bronzeEvidence = [
        ["SOURCE VALUES", "preserve meaning"],
        ["FILE METADATA", "path · size · modified"],
        ["INGEST CLOCK", "timestamp · date"],
        ["RESCUED DATA", "drift · mismatch"],
      ];
      const evolutionRoutes = [
        ["ADD", "update schema → stop → restart"],
        ["RESCUE", "keep schema → JSON evidence"],
        ["FAIL", "stop → explicit decision"],
      ];
      blocks.push(
        <figure
          className="bronze-order-ingestion-replay-contract"
          key={`bronze-ingestion-${index}`}
        >
          <div className="bronze-ingestion-header">
            <span>ORDER LANDING CONTRACT</span>
            <strong>immutable files · unique names · source ownership</strong>
            <small>batch every 15 min</small>
          </div>
          <div className="bronze-ingestion-flow">
            <div className="bronze-file-stack">
              {inputFiles.map(([label, detail]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
              ))}
            </div>
            <i aria-hidden="true">→</i>
            <div className="bronze-autoloader-core">
              <span>AUTO LOADER · cloudFiles</span>
              <strong>discover only new files</strong>
              <small>availableNow → drain backlog → stop</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="bronze-state-stack">
              <article>
                <span>SCHEMA LOCATION</span>
                <strong>inference + evolution history</strong>
              </article>
              <article>
                <span>CHECKPOINT</span>
                <strong>stream identity + processed files</strong>
              </article>
            </div>
          </div>
          <div className="bronze-schema-router">
            {evolutionRoutes.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="bronze-delta-store">
            <div>
              <span>BRONZE DELTA</span>
              <strong>append source facts + ingestion evidence</strong>
            </div>
            <div className="bronze-evidence-grid">
              {bronzeEvidence.map(([label, detail]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
              ))}
            </div>
          </div>
          <div className="bronze-replay-rail">
            <span>REPLAY CONTRACT</span>
            <strong>Bronze remains stable → rebuild Silver with new rules → reconcile</strong>
            <i aria-hidden="true">↺</i>
          </div>
          <figcaption>
            Auto Loader 用 checkpoint 记住“哪些文件已处理”，schema location
            记住“输入长什么样”；Bronze 同时保存源值与摄取证据。业务规则变化时，从稳定 Bronze
            重建 Silver，而不是删除 checkpoint 或重写原文件。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[graduation-project-architecture-blueprint]]") {
      const sources = [
        ["ORDERS", "batch snapshot", "order_id + line_id"],
        ["CUSTOMERS", "CDC", "customer_id"],
        ["EVENTS", "append stream", "event_id + event_time"],
      ];
      const layers = [
        ["BRONZE", "raw + metadata", "replay truth"],
        ["SILVER", "validate · dedup · CDC", "trusted detail"],
        ["GOLD", "facts · dimensions · marts", "consumer contract"],
      ];
      const consumers = [
        ["FINANCE", "reconciliation"],
        ["OPERATIONS", "fresh metrics"],
        ["SUPPORT", "order state"],
      ];
      const controls = [
        ["UNITY CATALOG", "access · lineage · tags"],
        ["LAKEFLOW", "ingest · transform · orchestrate"],
        ["CI/CD", "bundle · tests · dev/prod"],
        ["OBSERVABILITY", "SLO · event log · cost"],
      ];
      blocks.push(
        <figure
          className="graduation-project-architecture-blueprint"
          key={`graduation-project-${index}`}
        >
          <div className="graduation-contract-header">
            <span>ORDER-TO-REVENUE DATA PRODUCT</span>
            <strong>requirement → decision → asset → evidence</strong>
            <small>grain · semantics · owner · SLO · acceptance</small>
          </div>
          <div className="graduation-source-grid">
            {sources.map(([label, mode, key]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{mode}</strong>
                <small>{key}</small>
              </article>
            ))}
          </div>
          <div className="graduation-ingest-bridge">
            <span>SOURCE</span>
            <i aria-hidden="true">↓</i>
            <strong>Lakeflow Connect · Auto Loader · Structured Streaming</strong>
            <i aria-hidden="true">↓</i>
            <span>DELTA</span>
          </div>
          <div className="graduation-medallion-flow">
            {layers.map(([label, process, promise], layerIndex) => (
              <div className="graduation-layer-wrap" key={label}>
                <article className={`graduation-layer ${label.toLowerCase()}`}>
                  <span>{label}</span>
                  <strong>{process}</strong>
                  <small>{promise}</small>
                </article>
                {layerIndex < layers.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="graduation-consumer-grid">
            {consumers.map(([label, need]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{need}</strong>
              </article>
            ))}
          </div>
          <div className="graduation-control-plane">
            {controls.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="graduation-acceptance-gate">
            <span>ACCEPTANCE GATE</span>
            <strong>correctness · uniqueness · freshness · idempotency · permission · recovery · unit cost</strong>
          </div>
          <figcaption>
            三类源数据先以可重放形式进入 Bronze，再逐层形成可信明细和消费契约；Unity
            Catalog、Lakeflow、CI/CD 与可观测性横切全链路。只有需求、实现资产和验收证据一一对应，架构才是可交付蓝图。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[production-incident-command-and-learning-loop]]") {
      const commandSteps = [
        ["DETECT", "impact · scope · severity"],
        ["CONTAIN", "pause · isolate · preserve"],
        ["DIAGNOSE", "hypothesis · evidence"],
        ["RESTORE", "repair · rollback · replay"],
        ["VERIFY", "quality · SLO · consumer"],
      ];
      const evidenceChain = [
        ["RELEASE", "commit · target"],
        ["RUN", "job · task"],
        ["UPDATE", "pipeline · flow"],
        ["QUERY", "statement · profile"],
        ["DATA", "version · lineage"],
      ];
      const learningActions = [
        ["PREVENT", "contract · test"],
        ["DETECT", "SLI · alert"],
        ["MITIGATE", "quarantine · fallback"],
        ["RECOVER", "idempotent replay"],
      ];
      blocks.push(
        <figure
          className="production-incident-command-and-learning-loop"
          key={`incident-command-${index}`}
        >
          <div className="incident-command-header">
            <div>
              <span>INCIDENT COMMAND</span>
              <strong>correctness first · UTC timeline · single owner</strong>
            </div>
            <small>facts · unknowns · next update</small>
          </div>
          <div className="incident-command-track">
            {commandSteps.map(([label, detail], stepIndex) => (
              <div className="incident-command-step" key={label}>
                <article>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
                {stepIndex < commandSteps.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="incident-evidence-rail">
            <div className="incident-evidence-title">
              <span>EVIDENCE RAIL</span>
              <strong>last-good ↔ first-bad</strong>
            </div>
            <div className="incident-evidence-grid">
              {evidenceChain.map(([label, detail]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
              ))}
            </div>
          </div>
          <div className="incident-repair-gate">
            <article>
              <span>REPAIR SAFETY</span>
              <strong>partial output?</strong>
              <small>current config · rerun from start</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="incident-idempotency-card">
              <span>IDEMPOTENT WRITE</span>
              <strong>MERGE · window overwrite · reconciliation</strong>
              <small>record parameters + repair ID</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>RECOVERY GATE</span>
              <strong>backlog · freshness · quality · consumer</strong>
              <small>all pass or NOT_RECOVERED</small>
            </article>
          </div>
          <div className="incident-learning-loop">
            <div>
              <span>BLAMELESS POSTMORTEM</span>
              <strong>trigger ≠ symptom ≠ root cause ≠ contributing factor</strong>
            </div>
            <i aria-hidden="true">↘</i>
            <div className="incident-learning-actions">
              {learningActions.map(([label, detail]) => (
                <article key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
              ))}
            </div>
            <i aria-hidden="true">↺</i>
          </div>
          <div className="incident-action-contract">
            <span>ACTION CONTRACT</span>
            <strong>owner · due date · verification · effectiveness review</strong>
          </div>
          <figcaption>
            上轨控制影响并恢复，下轨固定 release、run、update、query 与 data
            身份；Repair 只有通过幂等检查才能进入恢复闸门。复盘再把证据转成可验证的预防、检测、缓解和恢复控制。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[data-quality-slo-alert-closed-loop]]") {
      const qualityDimensions = [
        ["VALIDITY", "合法值 / 总行"],
        ["COMPLETENESS", "非空 / 期望量"],
        ["UNIQUENESS", "重复 key / 总 key"],
        ["CONSISTENCY", "对账差异 / coverage"],
        ["FRESHNESS", "now − publish time"],
        ["VOLUME", "actual / expected"],
      ];
      const ruleActions = [
        ["WARN", "保留 + metrics"],
        ["DROP", "丢弃 + evidence"],
        ["QUARANTINE", "隔离 + replay"],
        ["FAIL", "rollback + stop"],
      ];
      const incidentSteps = [
        ["DETECT", "rule · anomaly · reconcile"],
        ["NOTIFY", "severity · owner · dedup"],
        ["TRIAGE", "scope · root cause"],
        ["MITIGATE", "isolate · rollback · backfill"],
        ["VERIFY", "reconcile · freshness · observe"],
      ];
      blocks.push(
        <figure className="data-quality-slo-alert-closed-loop" key={`quality-slo-loop-${index}`}>
          <div className="quality-contract-header">
            <span>DATA CONTRACT</span>
            <strong>dataset grain · schema · semantics · producer · consumer · owner</strong>
            <small>rule version + compatibility + response expectation</small>
          </div>
          <div className="quality-dimension-grid">
            {qualityDimensions.map(([label, metric]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{metric}</strong>
              </article>
            ))}
          </div>
          <div className="quality-sli-window">
            <article>
              <span>SLI WINDOW</span>
              <strong>grain · denominator · UTC window · EMPTY_INPUT</strong>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>SLO + ERROR BUDGET</span>
              <strong>threshold · severity · allowed misses</strong>
            </article>
          </div>
          <div className="quality-action-grid">
            {ruleActions.map(([label, outcome]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{outcome}</strong>
              </article>
            ))}
          </div>
          <div className="quality-signal-rails">
            <article>
              <span>INLINE</span>
              <strong>expectations · constraints</strong>
              <small>prevent bad state</small>
            </article>
            <article>
              <span>POST-WRITE</span>
              <strong>Bronze ↔ Silver ↔ Gold</strong>
              <small>reconcile totals and keys</small>
            </article>
            <article>
              <span>HISTORICAL</span>
              <strong>freshness · completeness · drift</strong>
              <small>detect abnormal change</small>
            </article>
          </div>
          <div className="quality-alert-interface">
            <div>
              <span>ONE-ROW ALERT CONTRACT</span>
              <strong>window · total · failed · rate · lag · status · owner · runbook</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>OK / TRIGGERED / ERROR</span>
              <strong>empty-state · schedule · recovery notification</strong>
            </div>
          </div>
          <div className="quality-incident-loop">
            {incidentSteps.map(([label, detail], stepIndex) => (
              <div className="quality-incident-step" key={label}>
                <article>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
                {stepIndex < incidentSteps.length - 1 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="quality-recovery-gate">
            <span>RECOVERY GATE</span>
            <strong>backlog = 0 · backfill complete · reconciliation passes · freshness restored · observation window</strong>
          </div>
          <figcaption>
            质量可靠性从 contract 到可计算 SLI，再由 SLO 与 error budget 决定动作。规则、对账和历史异常提供互补证据；
            告警只有进入 owner 明确的处置链，并以回补、对账和持续恢复验证结束，才形成真正闭环。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[serverless-cost-performance-control-plane]]") {
      const workloadRoutes = [
        ["NOTEBOOK", "human waiting", "optimized only"],
        ["JOB", "deadline + slack", "optimized / standard"],
        ["PIPELINE", "freshness chain", "optimized / standard"],
        ["SQL", "latency + concurrency", "IWM"],
      ];
      const guardrails = [
        ["USAGE POLICY", "cost_center · owner · env"],
        ["BUDGET", "scope · threshold · recipient"],
        ["ALERT", "trend · anomaly · runbook"],
        ["TIMEOUT", "runaway execution guard"],
      ];
      blocks.push(
        <figure className="serverless-cost-performance-control-plane" key={`serverless-economics-${index}`}>
          <div className="serverless-economics-intent">
            <span>WORKLOAD INTENT + SLO</span>
            <strong>interactive latency · batch deadline · dataset freshness · recovery window</strong>
            <small>先定义业务价值与可用 slack</small>
          </div>
          <div className="serverless-economics-router">
            {workloadRoutes.map(([label, intent, target]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{intent}</strong>
                <small>{target}</small>
              </article>
            ))}
          </div>
          <div className="serverless-economics-modes">
            <article className="serverless-mode-fast">
              <span>PERFORMANCE OPTIMIZED</span>
              <strong>warm capacity · fast startup</strong>
              <small>紧 deadline / interactive</small>
            </article>
            <b>VS</b>
            <article className="serverless-mode-value">
              <span>STANDARD</span>
              <strong>4–6 min typical startup</strong>
              <small>有 slack 的 scheduled batch</small>
            </article>
            <i aria-hidden="true">+</i>
            <article className="serverless-mode-iwm">
              <span>SQL IWM</span>
              <strong>admission · queue · autoscale</strong>
              <small>size = single query · clusters = concurrency</small>
            </article>
          </div>
          <div className="serverless-economics-observation">
            <article><span>STARTUP</span><strong>p50 · p95</strong></article>
            <i aria-hidden="true">→</i>
            <article><span>EXECUTION</span><strong>profile · rows · bytes</strong></article>
            <i aria-hidden="true">→</i>
            <article><span>OUTCOME</span><strong>success · freshness · quality</strong></article>
          </div>
          <div className="serverless-economics-billing">
            <article>
              <span>USAGE FRAGMENTS</span>
              <strong>DBU · job/run · warehouse · tags</strong>
              <small>sum every relevant record</small>
            </article>
            <i aria-hidden="true">×</i>
            <article>
              <span>EFFECTIVE LIST PRICE</span>
              <strong>cloud · SKU · valid time range</strong>
              <small>historical price, not today only</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>UNIT ECONOMICS</span>
              <strong>cost / success · rows · fresh dataset</strong>
              <small>actual contract price may differ</small>
            </article>
          </div>
          <div className="serverless-economics-guardrails">
            {guardrails.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="serverless-economics-verdict">
            <span>DECISION LOOP</span>
            <strong>SLO passes?</strong>
            <i aria-hidden="true">→</i>
            <strong>lower repeatable unit cost?</strong>
            <i aria-hidden="true">→</i>
            <strong>adopt · rollback · next experiment</strong>
          </div>
          <figcaption>
            Serverless 决策从业务 SLO 开始，而不是从模式名称开始。Jobs/Pipelines 的 performance target 与 SQL IWM 分流处理，
            执行后再把完整 usage、历史有效价格和成功结果组合成单位经济指标；标签、预算、告警和 timeout 提供治理反馈。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[sql-query-profile-photon-funnel]]") {
      const dagOperators = [
        ["SCAN", "files · bytes", "pruning?"],
        ["FILTER", "rows in → out", "selectivity"],
        ["JOIN", "left + right → out", "amplification"],
        ["SHUFFLE", "bytes moved", "skew · spill"],
        ["AGGREGATE", "groups · memory", "result"],
      ];
      const evidencePaths = [
        ["FULL SCAN", "列/谓词 · stats · clustering", "SQL + LAYOUT"],
        ["EXPLODING JOIN", "key uniqueness · grain · predicate", "SEMANTICS"],
        ["DATA SPILL", "先减行列，再看 warehouse size", "MEMORY"],
        ["QUEUE", "Peak Queued Queries · max clusters", "CONCURRENCY"],
        ["PHOTON GAP", "UDF / unsupported operation", "COVERAGE"],
      ];
      blocks.push(
        <figure className="sql-query-profile-photon-funnel" key={`query-profile-photon-${index}`}>
          <div className="query-profile-identity">
            <span>QUERY IDENTITY</span>
            <strong>statement ID · source · warehouse · input · parameters</strong>
          </div>
          <div className="query-profile-clock">
            <article>
              <span>QUEUE</span>
              <strong>admission · concurrency</strong>
            </article>
            <article>
              <span>PLAN + PRUNE</span>
              <strong>optimizer · metadata</strong>
            </article>
            <article>
              <span>EXECUTION</span>
              <strong>operator critical path</strong>
            </article>
            <b>WALL-CLOCK</b>
          </div>
          <div className="query-profile-drilldown">
            <span>SUMMARY</span>
            <i aria-hidden="true">→</i>
            <span>TOP OPERATORS</span>
            <i aria-hidden="true">→</i>
            <span>DAG + DETAILS</span>
            <i aria-hidden="true">→</i>
            <span>HYPOTHESIS</span>
          </div>
          <div className="query-profile-dag">
            {dagOperators.map(([label, metric, question], operatorIndex) => (
              <div className="query-profile-dag-node" key={label}>
                <article>
                  <span>{label}</span>
                  <strong>{metric}</strong>
                  <small>{question}</small>
                </article>
                {operatorIndex < dagOperators.length - 1 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="query-profile-evidence-grid">
            {evidencePaths.map(([signal, evidence, owner]) => (
              <article key={signal}>
                <span>{signal}</span>
                <strong>{evidence}</strong>
                <small>{owner}</small>
              </article>
            ))}
          </div>
          <div className="query-profile-photon-layer">
            <div>
              <span>CATALYST PLAN</span>
              <strong>logical → physical</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div className="query-profile-photon-native">
              <span>PHOTON</span>
              <strong>native C++ · columnar · SIMD</strong>
              <small>purple operators · task-time coverage</small>
            </div>
            <b>或</b>
            <div className="query-profile-photon-fallback">
              <span>STANDARD RUNTIME</span>
              <strong>unsupported operation fallback</strong>
              <small>结果正确，关键路径需评估</small>
            </div>
          </div>
          <div className="query-profile-verdict">
            <article><span>CORRECTNESS</span><strong>same rows · totals · grain</strong></article>
            <i aria-hidden="true">+</i>
            <article><span>PROFILE DELTA</span><strong>time · rows · bytes · spill</strong></article>
            <i aria-hidden="true">+</i>
            <article><span>DECISION</span><strong>adopt · reject · investigate</strong></article>
          </div>
          <figcaption>
            Query Profile 的漏斗从可复现的 statement identity 开始：先拆 wall-clock，再锁定 Top operator，
            沿 DAG 观察基数与数据移动，最后判断 Photon coverage。SQL、布局和 compute 分别处理不同证据，不能互相替代。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-performance-hypothesis-loop]]") {
      const bottlenecks = [
        ["SCAN", "bytes · files · pruning", "先少读"],
        ["SHUFFLE", "exchange · join · window", "先少移动"],
        ["SKEW / SPILL", "task 分布 · disk · GC", "先修分布"],
        ["CPU / UDF", "Python boundary · expression", "先用 native"],
        ["DRIVER / STARTUP", "collect · queue · cold start", "分离测量"],
      ];
      const optimizationLadder = [
        ["01", "ELIMINATE WORK", "filter · project · incremental"],
        ["02", "REDUCE MOVEMENT", "pre-aggregate · broadcast"],
        ["03", "NATIVE EXPRESSIONS", "SQL / Column functions"],
        ["04", "LAYOUT + STATS", "Delta · clustering · ANALYZE"],
        ["05", "COMPUTE", "只在证据证明资源饱和后"],
      ];
      blocks.push(
        <figure className="spark-performance-hypothesis-loop" key={`spark-performance-loop-${index}`}>
          <div className="spark-performance-contract">
            <span>PERFORMANCE CONTRACT</span>
            <strong>correctness + latency + throughput + cost</strong>
            <small>先固定目标、输入、环境与可接受 trade-off</small>
          </div>
          <div className="spark-performance-baseline">
            <span>REPRODUCIBLE BASELINE</span>
            <strong>commit · input version · Runtime · compute · cache state · ≥ 3 runs</strong>
          </div>
          <div className="spark-performance-critical-path">
            <article>
              <span>JOB / QUERY</span>
              <strong>end-to-end wall time</strong>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>LONGEST STAGE</span>
              <strong>critical path first</strong>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>TASK DISTRIBUTION</span>
              <strong>bytes · duration · spill</strong>
            </article>
          </div>
          <div className="spark-performance-bottleneck-grid">
            {bottlenecks.map(([label, evidence, action]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{evidence}</strong>
                <small>{action}</small>
              </article>
            ))}
          </div>
          <div className="spark-performance-hypothesis">
            <span>ONE HYPOTHESIS</span>
            <strong>“如果瓶颈证据是 X，只改变 Y，指标 Z 应改善”</strong>
          </div>
          <div className="spark-performance-ladder">
            {optimizationLadder.map(([step, label, detail]) => (
              <article key={step}>
                <b>{step}</b>
                <div>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </div>
              </article>
            ))}
          </div>
          <div className="spark-performance-validation">
            <article>
              <span>VERIFY RESULT</span>
              <strong>schema · rows · totals · invariants</strong>
            </article>
            <article>
              <span>MEASURE</span>
              <strong>median · p95 · scan · shuffle · cost</strong>
            </article>
            <article>
              <span>DECIDE</span>
              <strong>adopt · rollback · next hypothesis</strong>
            </article>
          </div>
          <figcaption>
            Spark 调优是一条可审计的假设循环：先锁定性能契约与基线，再沿关键路径把瓶颈分类；每次只验证一个高价值改动，
            同时守住结果正确性、延迟、吞吐与成本。资源扩容位于梯子的最后一级。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[system-tables-monitoring-semantic-layer]]") {
      const rawSources = [
        ["LAKEFLOW", "jobs · tasks · timelines", "regional"],
        ["BILLING", "usage · list_prices", "global"],
        ["QUERY", "history · source IDs", "regional · preview"],
        ["ACCESS", "audit · lineage", "regional / global"],
      ];
      const semanticFacts = [
        ["LATEST DIM", "SCD2 → one resource"],
        ["RUN FACT", "hourly slices → one run"],
        ["TASK / UPDATE", "bottleneck · outcome"],
        ["COST FACT", "attributed usage → list cost"],
      ];
      blocks.push(
        <figure className="system-tables-monitoring-semantic-layer" key={`system-table-semantic-${index}`}>
          <div className="system-table-governance-boundary">
            <span>UNITY CATALOG GOVERNANCE BOUNDARY</span>
            <strong>system catalog · read-only · least privilege · regional context</strong>
          </div>
          <div className="system-table-raw-grid">
            {rawSources.map(([label, detail, scope]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
                <small>{scope}</small>
              </article>
            ))}
          </div>
          <div className="system-table-normalize-gate">
            <span>NORMALIZE GRAIN + TIME</span>
            <strong>workspace composite keys · latest SCD2 · clock-hour slices · terminal state · coverage</strong>
          </div>
          <div className="system-table-semantic-grid">
            {semanticFacts.map(([label, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
              </article>
            ))}
          </div>
          <div className="system-table-consumers">
            <article><span>DASHBOARD</span><strong>success · p95 · trend</strong></article>
            <i aria-hidden="true">+</i>
            <article><span>ALERT</span><strong>window · threshold · owner</strong></article>
            <i aria-hidden="true">+</i>
            <article><span>RUNBOOK</span><strong>drill to run / task / query</strong></article>
          </div>
          <div className="system-table-realtime-rail">
            <span>REAL-TIME PATH</span>
            <strong>native Job / Pipeline notifications</strong>
            <i aria-hidden="true">∥</i>
            <span>HISTORICAL PATH</span>
            <strong>System Tables trends and attribution</strong>
          </div>
          <figcaption>
            原始 System Tables 不是直接面向所有消费者的 dashboard 模型。规范化层先固定粒度、复合键、时间与字段覆盖，
            再以受控 views 暴露 KPI。即时故障走 native notifications，System Tables 提供跨 workspace 的历史趋势、归因和审计。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[jobs-pipelines-observability-loop]]") {
      const signalGroups = [
        ["CONTROL", "status · queue · retry", "job_run_id"],
        ["EXECUTION", "timeline · query · compute", "task_run_id"],
        ["DATA", "rows · quality · freshness", "flow_name"],
        ["STREAM", "throughput · backlog · state", "update_id"],
      ];
      blocks.push(
        <figure className="jobs-pipelines-observability-loop" key={`jobs-pipelines-observability-${index}`}>
          <div className="observability-release-context">
            <span>RELEASE CONTEXT</span>
            <strong>environment · target · build_sha · business_date</strong>
            <small>the change that explains the run</small>
          </div>
          <div className="observability-runtime-chain">
            <article>
              <span>LAKEFLOW JOB</span>
              <strong>run → DAG → task</strong>
              <small>matrix · graph · timeline · logs</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>PIPELINE UPDATE</span>
              <strong>update → flow → dataset</strong>
              <small>event log · expectations · lineage</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>BUSINESS OUTPUT</span>
              <strong>fresh · complete · correct</strong>
              <small>Gold contract · consumer SLO</small>
            </article>
          </div>
          <div className="observability-signal-grid">
            {signalGroups.map(([label, detail, key]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
                <small>correlate: {key}</small>
              </article>
            ))}
          </div>
          <div className="observability-action-loop">
            <article><span>OBSERVE</span><strong>metrics + logs + events</strong></article>
            <i aria-hidden="true">→</i>
            <article><span>DECIDE</span><strong>SLO breach + owner</strong></article>
            <i aria-hidden="true">→</i>
            <article><span>ACT</span><strong>runbook + source fix</strong></article>
            <i aria-hidden="true">↺</i>
          </div>
          <figcaption>
            发布上下文沿 Job、Pipeline 和业务输出传播；四组信号用 run/task/update/flow 关联成一条证据链。
            告警只负责唤醒正确 owner，排错必须能回到具体运行实体，修复再通过源码与 CI/CD 进入下一次可验证运行。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[databricks-ci-cd-quality-gates]]") {
      const pipelineStages = [
        {
          label: "PR / CI",
          detail: "lint · unit · build",
          evidence: "commit + wheel hash",
          boundary: "no production credential",
          tone: "ci",
        },
        {
          label: "TEST",
          detail: "plan · deploy · E2E",
          evidence: "plan + test run ID",
          boundary: "federated test identity",
          tone: "test",
        },
        {
          label: "APPROVAL",
          detail: "risk · diff · evidence",
          evidence: "protected environment",
          boundary: "same artifact only",
          tone: "approval",
        },
        {
          label: "PROD",
          detail: "deploy · smoke · observe",
          evidence: "run ID + business metrics",
          boundary: "federated prod identity",
          tone: "prod",
        },
      ];
      blocks.push(
        <figure className="databricks-ci-cd-quality-gates" key={`ci-cd-gates-${index}`}>
          <div className="ci-cd-trigger">
            <span>TRUNK-BASED SOURCE</span>
            <strong>Pull Request → reviewed main commit</strong>
            <small>one release candidate · immutable evidence</small>
          </div>
          <div className="ci-cd-gate-lane">
            {pipelineStages.map((stage, stageIndex) => (
              <Fragment key={stage.label}>
                <article className={`ci-cd-stage ${stage.tone}`}>
                  <header>
                    <span>GATE {stageIndex + 1}</span>
                    <strong>{stage.label}</strong>
                  </header>
                  <p>{stage.detail}</p>
                  <dl>
                    <div><dt>EVIDENCE</dt><dd>{stage.evidence}</dd></div>
                    <div><dt>BOUNDARY</dt><dd>{stage.boundary}</dd></div>
                  </dl>
                </article>
                {stageIndex < pipelineStages.length - 1 ? (
                  <div className="ci-cd-pass-arrow">
                    <span>PASS</span>
                    <i aria-hidden="true">→</i>
                    <small>same SHA</small>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="ci-cd-evidence-rail">
            <span>RELEASE MANIFEST</span>
            <strong>commit_sha · artifact_digest · target · plan · deployer · run_id · smoke_metrics</strong>
          </div>
          <div className="ci-cd-recovery-loop">
            <article><span>FAIL CLOSED</span><strong>stop promotion</strong><small>fix in source · rerun gates</small></article>
            <i aria-hidden="true">↺</i>
            <article><span>RECOVERY</span><strong>known-good deploy</strong><small>code/resource plane</small></article>
            <i aria-hidden="true">+</i>
            <article><span>DATA REPAIR</span><strong>restore / compensate</strong><small>independent data plane</small></article>
          </div>
          <figcaption>
            每道门禁只在证据完整时放行同一 release candidate。OIDC federation 为 TEST 与 PROD 分别换取短期身份；
            失败先停止晋级，再回到受评审源码修复。上线恢复拆成资源配置与数据两个平面，不能用一次旧代码部署替代数据修复。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[dev-test-prod-isolation-and-promotion]]") {
      const environments = [
        {
          name: "DEV",
          tone: "dev",
          layers: [
            ["WORKSPACE", "developer boundary"],
            ["DATA", "orders_dev · masked"],
            ["IDENTITY", "current user"],
            ["STATE", "personal root"],
            ["SCHEDULE", "paused"],
          ],
        },
        {
          name: "TEST",
          tone: "test",
          layers: [
            ["WORKSPACE", "shared staging"],
            ["DATA", "orders_test · sanitized"],
            ["IDENTITY", "test Service Principal"],
            ["STATE", "stable CI root"],
            ["SCHEDULE", "on demand"],
          ],
        },
        {
          name: "PROD",
          tone: "prod",
          layers: [
            ["WORKSPACE", "production only"],
            ["DATA", "orders_prod · governed"],
            ["IDENTITY", "prod Service Principal"],
            ["STATE", "protected CI root"],
            ["SCHEDULE", "approved + monitored"],
          ],
        },
      ];
      blocks.push(
        <figure className="dev-test-prod-isolation-and-promotion" key={`environment-isolation-${index}`}>
          <div className="environment-artifact-source">
            <span>IMMUTABLE RELEASE UNIT</span>
            <strong>Git commit + wheel SHA-256 + reviewed configuration</strong>
            <small>build once · record evidence · never rebuild between gates</small>
          </div>
          <div className="environment-promotion-lane" aria-label="DEV to TEST to PROD promotion">
            {environments.map((environment, environmentIndex) => (
              <Fragment key={environment.name}>
                <article className={`environment-column ${environment.tone}`}>
                  <header>
                    <span>ENVIRONMENT {environmentIndex + 1}</span>
                    <strong>{environment.name}</strong>
                  </header>
                  <div>
                    {environment.layers.map(([label, detail]) => (
                      <p key={label}>
                        <span>{label}</span>
                        <strong>{detail}</strong>
                      </p>
                    ))}
                  </div>
                  <footer>
                    {environment.name === "DEV" ? "unit + integration" : environment.name === "TEST" ? "E2E + negative tests" : "SLA + audit evidence"}
                  </footer>
                </article>
                {environmentIndex < environments.length - 1 ? (
                  <div className="environment-gate" aria-label="promotion gate">
                    <span>PASS</span>
                    <i aria-hidden="true">→</i>
                    <small>same hash</small>
                  </div>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="environment-deny-lane">
            <span>DENY CROSS-ENVIRONMENT WRITES</span>
            <strong>least privilege + workspace binding + separate credential + fail-closed invariant</strong>
          </div>
          <figcaption>
            同一不可变制品只沿左到右晋级；每个环境拥有独立的数据、身份和部署状态。晋级箭头表示门禁通过，不表示环境之间可以直接读写；
            下方拒绝带由 Unity Catalog、workspace binding、云 IAM 与任务入口共同落实。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[declarative-automation-bundle-lifecycle]]") {
      const lifecycleSteps = [
        ["VALIDATE", "schema · references", "no remote changes"],
        ["PLAN", "create · update · delete", "review target diff"],
        ["DEPLOY", "build · sync · apply", "write deployment state"],
        ["RUN", "Job / pipeline / script", "assert output evidence"],
      ];
      blocks.push(
        <figure className="declarative-automation-bundle-lifecycle" key={`bundle-lifecycle-${index}`}>
          <div className="bundle-source-graph">
            <header><span>VERSIONED BUNDLE PROJECT</span><strong>Git commit → resource graph</strong></header>
            <div>
              <article><span>SOURCE</span><strong>src/ · notebooks</strong><small>business logic</small></article>
              <article><span>ARTIFACT</span><strong>pyproject → wheel</strong><small>version · hash</small></article>
              <article><span>RESOURCES</span><strong>jobs · pipelines</strong><small>resources/*.yml</small></article>
              <article><span>POLICY</span><strong>variables · permissions</strong><small>run_as · targets</small></article>
            </div>
          </div>
          <div className="bundle-lifecycle-steps">
            {lifecycleSteps.map(([label, detail, note], stageIndex) => (
              <Fragment key={label}>
                <article>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                  <small>{note}</small>
                </article>
                {stageIndex < lifecycleSteps.length - 1 ? <i aria-hidden="true">→</i> : null}
              </Fragment>
            ))}
          </div>
          <div className="bundle-target-branches">
            <article>
              <span>DEV TARGET</span>
              <strong>current user · prefixed resources</strong>
              <small>paused triggers · personal root/state · rapid iteration</small>
            </article>
            <article>
              <span>PROD TARGET</span>
              <strong>Service Principal · stable resources</strong>
              <small>explicit permissions · locked owner · approvals</small>
            </article>
          </div>
          <div className="bundle-state-identity">
            <span>DEPLOYMENT IDENTITY</span>
            <strong>bundle.name + target + workspace ⇄ managed state ⇄ remote resource IDs</strong>
          </div>
          <figcaption>
            顶层项目只定义一次共享资源图；target 注入环境差异。每次发布先解析与预览，再应用到独立
            workspace/state。部署成功后仍需运行并验证业务证据，不能把 state 或绿色状态当成结果正确。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[databricks-test-pyramid-integration-loop]]") {
      const pyramidLevels = [
        ["E2E SMOKE", "deployed Job · run_as · parameters · output evidence", "少量 · 数分钟 · 最高真实度"],
        ["INTEGRATION", "Delta · Unity Catalog · Runtime · permissions", "适量 · 隔离 DEV schema"],
        ["UNIT", "pure Python · small DataFrame · boundary cases", "大量 · 秒级 · 精确定位"],
        ["STATIC / CONFIG", "lint · type · wheel metadata · bundle validate", "每次变更 · 最快反馈"],
      ];
      blocks.push(
        <figure className="databricks-test-pyramid-integration-loop" key={`test-pyramid-${index}`}>
          <div className="test-pyramid-shell">
            <aside>
              <span>TEST DATA</span>
              <strong>tiny · deterministic</strong>
              <small>null · duplicate · boundary · error</small>
            </aside>
            <div className="test-pyramid-levels">
              {pyramidLevels.map(([label, detail, note], levelIndex) => (
                <article className={`test-pyramid-level level-${levelIndex + 1}`} key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                  <small>{note}</small>
                </article>
              ))}
            </div>
            <aside>
              <span>ISOLATION + EVIDENCE</span>
              <strong>unique schema · teardown</strong>
              <small>commit · wheel hash · run ID</small>
            </aside>
          </div>
          <div className="test-pyramid-gates">
            <article><span>PR GATE</span><strong>static + unit</strong><small>fail fast</small></article>
            <i aria-hidden="true">→</i>
            <article><span>DEV GATE</span><strong>integration</strong><small>real boundaries</small></article>
            <i aria-hidden="true">→</i>
            <article><span>DEPLOY GATE</span><strong>E2E smoke</strong><small>observable output</small></article>
            <i aria-hidden="true">→</i>
            <article><span>PRODUCTION</span><strong>contracts + monitors</strong><small>continuous proof</small></article>
          </div>
          <figcaption>
            越向上越真实，也越慢、越贵且越难定位；确定性测试数据与资源隔离贯穿每一层。
            门禁只在前一层通过后升级成本，生产监控接续测试证据而不是取代测试。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[python-wheel-deployable-project-flow]]") {
      const deliveryStages = [
        ["TEST SOURCE", "unit · lint · type", "fail fast"],
        ["BUILD WHEEL", "pyproject.toml", "immutable artifact"],
        ["CLEAN INSTALL", "fresh environment", "test packaged code"],
        ["PUBLISH", "Volume / workspace", "version + hash"],
        ["RUN JOB", "package + entry point", "external parameters"],
      ];
      blocks.push(
        <figure className="python-wheel-deployable-project-flow" key={`python-wheel-project-${index}`}>
          <div className="wheel-source-layout">
            <header>
              <span>REVIEWABLE SOURCE TREE</span>
              <strong>orders-etl @ Git commit</strong>
            </header>
            <div>
              <article><span>METADATA</span><strong>pyproject.toml</strong><small>name · version · dependencies · scripts</small></article>
              <article><span>IMPORT PACKAGE</span><strong>src/orders_etl/</strong><small>transforms.py · main.py</small></article>
              <article><span>TEST CONTRACT</span><strong>tests/</strong><small>pure logic · Spark fixtures · errors</small></article>
              <article><span>DEPLOY CONFIG</span><strong>resources/</strong><small>Job · parameters · environment</small></article>
            </div>
          </div>
          <div className="wheel-boundary-label">build boundary ↓ source tree 不能成为生产依赖</div>
          <div className="wheel-delivery-pipeline">
            {deliveryStages.map(([label, detail, note], stageIndex) => (
              <Fragment key={label}>
                <article>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                  <small>{note}</small>
                </article>
                {stageIndex < deliveryStages.length - 1 ? <i aria-hidden="true">→</i> : null}
              </Fragment>
            ))}
          </div>
          <div className="wheel-artifact-contract">
            <article><span>IDENTITY</span><strong>orders_etl 0.1.0</strong></article>
            <article><span>ENTRY POINT</span><strong>run_orders → main()</strong></article>
            <article><span>EVIDENCE</span><strong>commit · tests · SHA-256</strong></article>
            <article><span>PROMOTION</span><strong>DEV → TEST → PROD</strong></article>
          </div>
          <figcaption>
            Source tree 用于编辑和评审；构建边界之后只有经过 clean-install 验证的 wheel 能晋级。
            Job 通过稳定 package/entry point 调用同一 artifact，环境差异由参数与部署配置承担。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[databricks-cli-unified-auth-flow]]") {
      const configurationSources = [
        ["1", "Bundle target", "host · profile · 非秘密设置"],
        ["2", "Environment", "DATABRICKS_HOST · CLIENT_ID · SECRET"],
        ["3", "Profile", ".databrickscfg · DEV / PROD / FREE"],
      ];
      blocks.push(
        <figure className="databricks-cli-unified-auth-flow" key={`databricks-cli-auth-${index}`}>
          <div className="cli-auth-principal-row">
            <article>
              <span>HUMAN · INTERACTIVE</span>
              <strong>OAuth U2M</strong>
              <small>浏览器登录 · OS secure storage</small>
            </article>
            <article>
              <span>CI / JOB · UNATTENDED</span>
              <strong>OAuth M2M</strong>
              <small>Service Principal · secret manager</small>
            </article>
          </div>
          <div className="cli-auth-direction" aria-hidden="true">↓ 选择身份与流程</div>
          <section className="cli-auth-unified-layer">
            <header>
              <span>UNIFIED AUTHENTICATION</span>
              <strong>按优先级解析第一个完整配置</strong>
            </header>
            <div>
              {configurationSources.map(([order, label, detail]) => (
                <article key={label}>
                  <b>{order}</b>
                  <span>{label}</span>
                  <small>{detail}</small>
                </article>
              ))}
            </div>
          </section>
          <div className="cli-auth-direction" aria-hidden="true">↓ OAuth token exchange · short-lived access token</div>
          <div className="cli-auth-endpoint-row">
            <article>
              <span>WORKSPACE ENDPOINT</span>
              <strong>catalogs · jobs · workspace files</strong>
              <small>https://&lt;workspace-host&gt;</small>
            </article>
            <article>
              <span>ACCOUNT ENDPOINT</span>
              <strong>users · groups · workspaces</strong>
              <small>account host + account_id</small>
            </article>
          </div>
          <div className="cli-auth-direction" aria-hidden="true">↓ 第二道门：authorization</div>
          <div className="cli-auth-authorization-row">
            <article><span>IDENTITY</span><strong>current-user me</strong></article>
            <article><span>ASSIGNMENT</span><strong>workspace access</strong></article>
            <article><span>PRIVILEGES</span><strong>least grants</strong></article>
            <article><span>REST API</span><strong>command executes</strong></article>
          </div>
          <figcaption>
            先按执行者选择 U2M 或 M2M，再由 unified authentication 解析配置并向正确 endpoint
            换取短时 token；认证成功后，workspace assignment 与资源权限仍会独立决定命令是否执行。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[enterprise-unity-catalog-blueprint]]") {
      const domains = [
        ["SALES_PROD", "bronze · silver · gold"],
        ["CUSTOMER_PROD", "PII · ABAC · curated views"],
        ["FINANCE_PROD", "restricted · audit evidence"],
      ];
      blocks.push(
        <figure className="enterprise-unity-catalog-blueprint" key={`enterprise-uc-${index}`}>
          <div className="enterprise-region-row">
            <article><span>APAC REGION</span><strong>one Unity Catalog metastore</strong><small>regional storage · residency</small></article>
            <article><span>EU REGION</span><strong>one Unity Catalog metastore</strong><small>regional storage · residency</small></article>
          </div>
          <div className="enterprise-workspace-row">
            <article><span>DEV</span><strong>dev catalogs only</strong></article>
            <article><span>PROD</span><strong>read-write bindings</strong></article>
            <article><span>ANALYTICS</span><strong>read-only prod bindings</strong></article>
          </div>
          <div className="enterprise-domain-row">
            {domains.map(([label, detail]) => <article key={label}><span>{label}</span><strong>{detail}</strong></article>)}
          </div>
          <div className="enterprise-guardrail-row">
            <article><span>IDENTITY</span><strong>account groups · service principals</strong></article>
            <article><span>STORAGE</span><strong>managed roots · bound locations</strong></article>
            <article><span>POLICY</span><strong>governed tags · ABAC</strong></article>
            <article><span>EVIDENCE</span><strong>lineage · audit · system tables</strong></article>
          </div>
          <figcaption>
            Region 划定 metastore 与数据驻留；workspace binding 控制处理环境；catalog 表达 domain/environment，
            schema 表达数据层。Identity、storage、policy 与 evidence 是贯穿所有数据域的企业 guardrails。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[sensitive-data-governance-closed-loop]]") {
      const governanceStages = [
        ["DISCOVER", "AI scan · custom rules", "class · confidence · sample"],
        ["VALIDATE", "Data Steward review", "accept · exclude · enrich"],
        ["TAG", "governed / system tags", "allowed values · ASSIGN"],
        ["PROTECT", "ABAC · mask · least grant", "share · retention · delete"],
        ["MONITOR", "audit · lineage · coverage", "drift · access · review SLA"],
      ];
      blocks.push(
        <figure
          className="sensitive-data-governance-closed-loop"
          key={`sensitive-governance-${index}`}
        >
          <div className="sensitive-governance-stages">
            {governanceStages.map(([label, detail, note], stageIndex) => (
              <Fragment key={label}>
                <article>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                  <small>{note}</small>
                </article>
                {stageIndex < governanceStages.length - 1 ? <i aria-hidden="true">→</i> : null}
              </Fragment>
            ))}
          </div>
          <div className="sensitive-governance-feedback" aria-hidden="true">
            <span>↖ reclassify · remediate · policy review ↙</span>
          </div>
          <section className="sensitive-tag-boundary">
            <article><span>DETECTION</span><strong>可能是 email · HIGH</strong><small>signal, not final truth</small></article>
            <i aria-hidden="true">→</i>
            <article><span>GOVERNED ATTRIBUTE</span><strong>data_class = email</strong><small>policy + allowed values + ASSIGN</small></article>
            <i aria-hidden="true">→</i>
            <article><span>ENFORCEMENT</span><strong>mask unless approved</strong><small>ABAC at query time</small></article>
          </section>
          <div className="sensitive-governance-evidence">
            <article><span>COVERAGE</span><strong>classified / total</strong></article>
            <article><span>ACCESS</span><strong>masked / unmasked users</strong></article>
            <article><span>FLOW</span><strong>sensitive lineage growth</strong></article>
            <article><span>DRIFT</span><strong>unverified age · tag change</strong></article>
          </div>
          <figcaption>
            自动检测只是起点。Steward 把可信 detection 转成 governed attribute，策略层据此
            执行最小披露；Audit、Lineage 与 coverage 指标再把 drift 送回分类和 remediation，
            形成持续闭环。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[open-sharing-cross-organization-flow]]") {
      const providerAssets = [
        ["TABLE", "Delta / Iceberg"],
        ["VIEW", "filtered contract"],
        ["VOLUME", "governed files"],
        ["AI / NOTEBOOK", "D2D assets"],
      ];
      const openConsumers = [
        ["SPARK", "open connector"],
        ["PANDAS", "Python client"],
        ["POWER BI", "BI connector"],
      ];
      blocks.push(
        <figure
          className="open-sharing-cross-organization-flow"
          key={`open-sharing-${index}`}
        >
          <div className="sharing-provider-assets">
            {providerAssets.map(([label, detail]) => (
              <article key={label}><span>{label}</span><strong>{detail}</strong></article>
            ))}
          </div>
          <section className="sharing-control-plane">
            <article>
              <span>PROVIDER METASTORE</span>
              <strong>Unity Catalog assets stay at source</strong>
              <small>owner · classification · dynamic view</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>SHARE</span>
              <strong>explicit asset contract</strong>
              <small>read-only · alias · history · audit</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>RECIPIENT GRANT</span>
              <strong>identity + protocol + revoke</strong>
              <small>one consumer boundary</small>
            </article>
          </section>
          <div className="sharing-protocol-branches">
            <section>
              <span>DATABRICKS-TO-DATABRICKS</span>
              <strong>sharing identifier</strong>
              <article><b>SHARED CATALOG</b><em>read-only Unity Catalog</em></article>
            </section>
            <section>
              <span>DATABRICKS-TO-OPEN</span>
              <strong>OIDC federation / token</strong>
              <div>
                {openConsumers.map(([label, detail]) => (
                  <article key={label}><b>{label}</b><em>{detail}</em></article>
                ))}
              </div>
            </section>
          </div>
          <div className="sharing-guardrails">
            <article><span>CONTRACT TEST</span><strong>rows · columns · freshness</strong></article>
            <article><span>OBSERVE</span><strong>provider + recipient audit</strong></article>
            <article><span>REVOKE</span><strong>stop future access</strong></article>
          </div>
          <figcaption>
            Provider 数据保留在原 metastore，Share 只定义明确的数据产品边界；Recipient
            grant 再选择 D2D shared catalog 或 Open connector。更新近实时可见，访问始终
            read-only，并由 contract test、audit 与 revoke 共同保护。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[databricks-audit-system-table-observability]]") {
      const auditActors = [
        ["USER", "interactive action"],
        ["SERVICE PRINCIPAL", "automation / CI"],
        ["SYSTEM-USER", "platform action"],
      ];
      const auditDimensions = [
        ["WHO", "user_identity · run_by/run_as"],
        ["WHAT", "service_name · action_name"],
        ["WHERE", "workspace · region · source IP"],
        ["RESULT", "status_code · error_message"],
      ];
      const auditOutcomes = [
        ["INVESTIGATE", "incident timeline"],
        ["DETECT", "dashboard + alert"],
        ["EVIDENCE", "audit + lineage + history"],
      ];
      blocks.push(
        <figure
          className="databricks-audit-system-table-observability"
          key={`audit-system-table-${index}`}
        >
          <div className="audit-actor-row">
            {auditActors.map(([label, detail]) => (
              <article key={label}><span>{label}</span><strong>{detail}</strong></article>
            ))}
          </div>
          <div className="audit-event-arrow" aria-hidden="true">↓ platform events ↓</div>
          <section className="audit-system-core">
            <span>READ-ONLY ACCOUNT OBSERVABILITY</span>
            <strong>system.access.audit</strong>
            <small>regional workspace events · global account events · 365-day free retention</small>
            <div>
              {auditDimensions.map(([label, detail]) => (
                <article key={label}><b>{label}</b><em>{detail}</em></article>
              ))}
            </div>
          </section>
          <div className="audit-curation-flow">
            <article><span>FILTER</span><strong>event_date · workspace · service</strong></article>
            <i aria-hidden="true">→</i>
            <article><span>NORMALIZE</span><strong>actor · resource · result</strong></article>
            <i aria-hidden="true">→</i>
            <article><span>BASELINE</span><strong>count · rate · high-risk action</strong></article>
          </div>
          <div className="audit-outcome-row">
            {auditOutcomes.map(([label, detail]) => (
              <article key={label}><span>{label}</span><strong>{detail}</strong></article>
            ))}
          </div>
          <figcaption>
            平台操作进入只读 audit fact table；先按 event_date 与 scope 缩小范围，再规范化
            who/what/where/result，最终服务调查、检测和证据保全。Lineage、Query History
            与 Delta History 为同一时间线补齐依赖和数据变更。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[unity-catalog-discovery-lineage-map]]") {
      const discoverySignals = [
        ["SEARCH", "name · column · comment"],
        ["CLASSIFY", "domain · tag · owner"],
        ["DISCOVER", "BROWSE · request access"],
        ["TRUST", "schema · freshness · lineage"],
      ];
      const lineageNodes = [
        ["SOURCE", "lesson083_orders", "amount · refund_amount"],
        ["TRANSFORM", "SQL / Notebook / Job", "group + derive metric"],
        ["GOLD", "region_revenue", "net_revenue"],
        ["CONSUMER", "view · dashboard · team", "decision + SLA"],
      ];
      blocks.push(
        <figure
          className="unity-catalog-discovery-lineage-map"
          key={`discovery-lineage-${index}`}
        >
          <div className="lineage-discovery-funnel">
            {discoverySignals.map(([label, detail], signalIndex) => (
              <Fragment key={label}>
                <article>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
                {signalIndex < discoverySignals.length - 1 ? <i aria-hidden="true">→</i> : null}
              </Fragment>
            ))}
          </div>
          <div className="lineage-graph-track">
            {lineageNodes.map(([label, detail, note], nodeIndex) => (
              <Fragment key={label}>
                <article>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                  <small>{note}</small>
                </article>
                {nodeIndex < lineageNodes.length - 1 ? <i aria-hidden="true">→</i> : null}
              </Fragment>
            ))}
          </div>
          <div className="lineage-column-proof">
            <section><span>COLUMN SOURCE</span><strong>amount</strong></section>
            <section><span>COLUMN SOURCE</span><strong>refund_amount</strong></section>
            <i aria-hidden="true">↘</i>
            <article><span>DERIVED METRIC</span><strong>net_revenue</strong><small>column-level evidence</small></article>
          </div>
          <div className="lineage-action-row">
            <article><span>IMPACT</span><strong>谁会受变更影响？</strong></article>
            <article><span>ROOT CAUSE</span><strong>异常最早出现在哪？</strong></article>
            <article><span>ACCESS</span><strong>向谁申请读取？</strong></article>
          </div>
          <figcaption>
            Discovery 通过名称、comments、tags 与 BROWSE 收敛候选资产；Lineage
            将 source、transformation、Gold 与 consumer 连成运行时证据。Column
            lineage 进一步说明两个输入字段如何生成 net_revenue。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[unity-catalog-fine-grained-policy-flow]]") {
      const policyPaths = [
        ["TABLE POLICY", "Row Filter + Column Mask", "single table · SQL UDF"],
        ["DYNAMIC VIEW", "WHERE + CASE + JOIN", "curated multi-table contract"],
        ["ABAC", "governed tags + policy", "catalog / schema scale"],
      ];
      blocks.push(
        <figure
          className="unity-catalog-fine-grained-policy-flow"
          key={`fine-grained-policy-${index}`}
        >
          <div className="fine-grained-request">
            <article>
              <span>QUERY PRINCIPAL</span>
              <strong>user · group · service principal</strong>
              <small>session_user() · is_account_group_member()</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>OBJECT GATE</span>
              <strong>USE CATALOG · USE SCHEMA · SELECT</strong>
              <small>policy restricts; it never grants access</small>
            </article>
          </div>
          <div className="fine-grained-policy-paths">
            {policyPaths.map(([label, detail, note]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{detail}</strong>
                <small>{note}</small>
              </article>
            ))}
          </div>
          <div className="fine-grained-enforcement">
            <section>
              <span>ROW DECISION</span>
              <strong>predicate → TRUE rows only</strong>
            </section>
            <section>
              <span>COLUMN DECISION</span>
              <strong>original → masked value</strong>
            </section>
            <i aria-hidden="true">→</i>
            <article>
              <span>SECURE RESULT</span>
              <strong>same data · identity-aware output</strong>
              <small>runtime enforcement · auditable access</small>
            </article>
          </div>
          <figcaption>
            细粒度控制不会复制数据：请求先经过对象权限，再由 table UDF、Dynamic View SQL
            或 ABAC policy 计算可见行和列值。身份函数按查询者求值，最终结果随 principal
            动态变化。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[unity-catalog-volume-nontabular-flow]]") {
      const fileSources = [
        ["LANDING", "CSV · JSON · Parquet"],
        ["DOCUMENT", "PDF · DOCX · text"],
        ["MEDIA", "image · audio · video"],
        ["ARTIFACT", "model · library · archive"],
      ];
      const volumeConsumers = [
        ["SPARK", "parse + schema"],
        ["PYTHON / OSS", "POSIX file access"],
        ["AI / ML", "documents + media"],
        ["OPERATIONS", "logs + artifacts"],
      ];
      blocks.push(
        <figure
          className="unity-catalog-volume-nontabular-flow"
          key={`volume-flow-${index}`}
        >
          <div className="volume-source-grid">
            {fileSources.map(([label, detail]) => (
              <article key={label}><span>{label}</span><strong>{detail}</strong></article>
            ))}
          </div>
          <div className="volume-core">
            <article className="volume-managed-card">
              <span>MANAGED VOLUME</span>
              <strong>UC location + lifecycle</strong>
              <small>no LOCATION clause</small>
            </article>
            <section>
              <span>GOVERNED FILE INTERFACE</span>
              <strong>/Volumes/catalog/schema/volume/path</strong>
              <div><b>READ VOLUME</b><b>WRITE VOLUME</b></div>
              <small>USE CATALOG + USE SCHEMA · audit · discovery</small>
            </section>
            <article className="volume-external-card">
              <span>EXTERNAL VOLUME</span>
              <strong>existing cloud subpath</strong>
              <small>external lifecycle</small>
            </article>
          </div>
          <div className="volume-consumer-grid">
            {volumeConsumers.map(([label, detail]) => (
              <article key={label}><span>{label}</span><strong>{detail}</strong></article>
            ))}
          </div>
          <div className="volume-promotion-flow">
            <article><span>INBOX</span><strong>raw source evidence</strong><small>replayable files</small></article>
            <i aria-hidden="true">→</i>
            <article><span>PARSE + QUALITY</span><strong>schema · corrupt rows</strong><small>quarantine failures</small></article>
            <i aria-hidden="true">→</i>
            <article className="volume-delta-target"><span>DELTA TABLE</span><strong>catalog.schema.table</strong><small>SQL · BI · pipeline contract</small></article>
          </div>
          <figcaption>
            Volume 统一治理文件，但不把文件自动变成 table。图片、文档和 artifacts 可直接由应用消费；
            需要分析的 CSV/JSON 则保留 raw evidence，经 parse/quality 写入独立 Delta table，
            table path 与 volume path 永不重叠。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[unity-catalog-storage-authorization-chain]]") {
      const locationPrivileges = [
        ["MANAGED", "CREATE MANAGED STORAGE"],
        ["TABLE", "CREATE EXTERNAL TABLE"],
        ["VOLUME", "CREATE EXTERNAL VOLUME"],
        ["FILES", "READ / WRITE FILES"],
      ];
      blocks.push(
        <figure
          className="unity-catalog-storage-authorization-chain"
          key={`storage-auth-${index}`}
        >
          <div className="storage-auth-cloud">
            <article>
              <span>CLOUD IDENTITY</span>
              <strong>AWS IAM role</strong>
              <small>least bucket / prefix policy</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>UNITY CATALOG</span>
              <strong>storage credential</strong>
              <small>workspace-bound · no secret in code</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>PATH BOUNDARY</span>
              <strong>external location</strong>
              <small>s3://bucket/prefix + credential</small>
            </article>
          </div>
          <div className="storage-auth-privileges">
            {locationPrivileges.map(([label, privilege]) => (
              <article key={label}><span>{label}</span><strong>{privilege}</strong></article>
            ))}
          </div>
          <div className="storage-auth-lifecycle">
            <article className="storage-managed-lane">
              <header><span>MANAGED LIFECYCLE</span><strong>catalog / schema storage root</strong></header>
              <div><b>MANAGED TABLE</b><b>MANAGED VOLUME</b></div>
              <small>UC chooses hashed path · optimizes · deletes by managed lifecycle</small>
            </article>
            <i aria-hidden="true">or</i>
            <article className="storage-external-lane">
              <header><span>EXTERNAL LIFECYCLE</span><strong>explicit subpath</strong></header>
              <div><b>EXTERNAL TABLE</b><b>EXTERNAL VOLUME</b></div>
              <small>UC governs metadata/access · external system owns files</small>
            </article>
          </div>
          <div className="storage-auth-consumer">
            <article><span>TABLE ACCESS</span><strong>catalog.schema.table</strong><small>never internal storage path</small></article>
            <article><span>FILE ACCESS</span><strong>/Volumes/catalog/schema/volume</strong><small>prefer Volume over raw URI</small></article>
            <article className="storage-auth-deny"><span>BLOCK BYPASS</span><strong>no direct IAM · no DBFS mount</strong><small>audit + lineage remain complete</small></article>
          </div>
          <figcaption>
            Storage credential 封装 cloud identity，external location 把它收窄到 path；
            同一 location 可服务 managed root 或 external assets，但两条生命周期不同。
            消费者只使用 table/Volume 接口，不直接接触 role、managed internal path 或 DBFS mount。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[catalog-schema-isolation-blueprint]]") {
      const catalogLayers = [
        ["BRONZE", "raw contracts", "ingest writers"],
        ["SILVER", "validated models", "engineers"],
        ["GOLD", "business products", "readers"],
      ];
      const boundaryChecks = [
        ["OWNER", "account group"],
        ["GRANTS", "inherit deliberately"],
        ["STORAGE", "environment/domain prefix"],
        ["EVIDENCE", "binding + access tests"],
      ];
      blocks.push(
        <figure
          className="catalog-schema-isolation-blueprint"
          key={`catalog-isolation-${index}`}
        >
          <div className="catalog-isolation-metastore">
            <span>REGION METASTORE</span>
            <strong>one governance plane · multiple workspaces and catalogs</strong>
          </div>
          <div className="catalog-isolation-workspaces">
            <article>
              <span>DEV WORKSPACE</span>
              <strong>engineers · read/write</strong>
              <small>bound only to dev catalogs</small>
            </article>
            <article>
              <span>PROD WORKSPACE</span>
              <strong>service principals · read/write</strong>
              <small>bound only to prod catalogs</small>
            </article>
            <article>
              <span>BI WORKSPACE</span>
              <strong>analysts · read-only</strong>
              <small>prod catalog read-only binding</small>
            </article>
          </div>
          <div className="catalog-isolation-bindings">
            <span>WORKSPACE-CATALOG BINDINGS</span>
            <div><b>DEV ↔ sales_dev</b><b>PROD ↔ sales_prod</b><b>BI → sales_prod · RO</b></div>
          </div>
          <div className="catalog-isolation-catalogs">
            <article className="catalog-dev-card">
              <header><span>CATALOG</span><strong>sales_dev</strong><small>development boundary</small></header>
              <section>
                {catalogLayers.map(([layer, purpose, access]) => (
                  <div key={`dev-${layer}`}><b>{layer}</b><strong>{purpose}</strong><small>{access}</small></div>
                ))}
              </section>
            </article>
            <article className="catalog-prod-card">
              <header><span>CATALOG</span><strong>sales_prod</strong><small>production boundary</small></header>
              <section>
                {catalogLayers.map(([layer, purpose, access]) => (
                  <div key={`prod-${layer}`}><b>{layer}</b><strong>{purpose}</strong><small>{access}</small></div>
                ))}
              </section>
            </article>
          </div>
          <div className="catalog-isolation-controls">
            {boundaryChecks.map(([label, detail]) => (
              <article key={label}><span>{label}</span><strong>{detail}</strong></article>
            ))}
          </div>
          <figcaption>
            Catalog 同时表达 domain + environment 主边界，workspace binding 阻断跨环境可达性；
            schema 再组织 Bronze/Silver/Gold。Ownership、grants、managed storage 与验证证据都沿同一边界落地。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[unity-catalog-least-privilege-loop]]") {
      const privilegeSteps = [
        ["01", "ACTION", "read · write · create"],
        ["02", "PRIVILEGE", "SELECT · MODIFY · CREATE"],
        ["03", "SCOPE", "table → schema → catalog"],
        ["04", "PRINCIPAL", "account group"],
      ];
      const effectiveSources = [
        ["EXPLICIT", "object GRANT"],
        ["INHERITED", "schema / catalog"],
        ["MEMBERSHIP", "other groups"],
        ["IMPLICIT", "owner capability"],
      ];
      blocks.push(
        <figure
          className="unity-catalog-least-privilege-loop"
          key={`least-privilege-${index}`}
        >
          <div className="least-privilege-design">
            <span>DESIGN · NARROW BEFORE GRANT</span>
            <section>
              {privilegeSteps.map(([step, label, detail], stepIndex) => (
                <Fragment key={label}>
                  <article>
                    <b>{step}</b>
                    <span>{label}</span>
                    <strong>{detail}</strong>
                  </article>
                  {stepIndex < privilegeSteps.length - 1 ? (
                    <i aria-hidden="true">→</i>
                  ) : null}
                </Fragment>
              ))}
            </section>
          </div>
          <div className="least-privilege-grant-path">
            <article>
              <span>PREREQUISITES</span>
              <strong>USE CATALOG + USE SCHEMA</strong>
              <small>traverse parents</small>
            </article>
            <i aria-hidden="true">+</i>
            <article className="least-privilege-action-card">
              <span>OBJECT ACTION</span>
              <strong>SELECT / MODIFY</strong>
              <small>only the required capability</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>VERIFY</span>
              <strong>SHOW GRANTS + test</strong>
              <small>allowed and rejected path</small>
            </article>
          </div>
          <div className="least-privilege-revoke">
            <header>
              <span>REVOKE INVESTIGATION · COMMAND SUCCEEDED BUT ACCESS REMAINS</span>
              <strong>REVOKE ≠ DENY</strong>
            </header>
            <section>
              {effectiveSources.map(([source, detail]) => (
                <article key={source}>
                  <b>{source}</b>
                  <strong>{detail}</strong>
                </article>
              ))}
            </section>
            <small>remove the real grant source → retest as effective principal → record evidence</small>
          </div>
          <div className="least-privilege-risk-scale">
            <article><span>LOWER BLAST RADIUS</span><strong>TABLE</strong><small>one object</small></article>
            <i aria-hidden="true">→</i>
            <article><strong>SCHEMA</strong><small>current + future children</small></article>
            <i aria-hidden="true">→</i>
            <article><span>HIGHER BLAST RADIUS</span><strong>CATALOG</strong><small>many domains</small></article>
          </div>
          <figcaption>
            最小权限先缩小 action，再缩小 scope，并把 grants 绑定到稳定 account group。
            REVOKE 后仍可访问时，沿 explicit、inherited、membership 和 ownership 四条来源回溯；
            Unity Catalog 不支持用 DENY 覆盖父级允许。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[databricks-identity-access-chain]]") {
      const identities = [
        ["USER", "alice@company", "interactive human"],
        ["SERVICE", "sp_orders_prod", "automated workload"],
      ];
      const roleGroups = [
        ["orders_dev_engineers", "build + test"],
        ["orders_prod_readers", "read Gold"],
        ["orders_prod_runners", "run workload"],
      ];
      const accessGates = [
        ["01", "ACCOUNT", "identity active"],
        ["02", "WORKSPACE", "assignment + entitlement"],
        ["03", "RUN AS", "effective principal"],
        ["04", "UNITY CATALOG", "usage + action"],
      ];
      blocks.push(
        <figure
          className="databricks-identity-access-chain"
          key={`identity-access-${index}`}
        >
          <div className="identity-source-rail">
            <article>
              <span>SOURCE OF TRUTH</span>
              <strong>Enterprise IdP</strong>
              <small>SSO · automatic identity management / SCIM</small>
            </article>
            <i aria-hidden="true">→</i>
            <section>
              {identities.map(([type, name, detail]) => (
                <article key={type}>
                  <b>{type}</b>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </article>
              ))}
            </section>
          </div>
          <div className="identity-role-layer">
            <span>STABLE RBAC LAYER · ACCOUNT GROUPS</span>
            <section>
              {roleGroups.map(([name, detail]) => (
                <article key={name}>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </article>
              ))}
            </section>
            <small>people / service principals become members · resources grant to roles</small>
          </div>
          <div className="identity-access-gates">
            {accessGates.map(([step, label, detail], gateIndex) => (
              <Fragment key={label}>
                <article>
                  <b>{step}</b>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </article>
                {gateIndex < accessGates.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="identity-outcome-grid">
            <article>
              <span>HUMAN PATH</span>
              <strong>user → group → governed data</strong>
              <small>membership changes with role</small>
            </article>
            <article>
              <span>WORKLOAD PATH</span>
              <strong>Job → Run as service principal</strong>
              <small>stable identity · OAuth M2M</small>
            </article>
            <article>
              <span>EVIDENCE</span>
              <strong>run by · run as · action</strong>
              <small>auditable without personal coupling</small>
            </article>
          </div>
          <figcaption>
            IdP 管理身份事实，account groups 承载稳定角色；workspace assignment 决定能否进入，
            Run as 决定实际执行者，Unity Catalog 再按该 principal 判定数据权限。人员变动只改变
            membership，生产 workload 不依赖个人账号。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[unity-catalog-governance-model]]") {
      const principals = [
        ["USER", "analyst"],
        ["GROUP", "sales_readers"],
        ["SERVICE", "orders_job"],
      ];
      const hierarchy = [
        ["METASTORE", "region-level governance"],
        ["CATALOG", "sales_prod"],
        ["SCHEMA", "curated"],
        ["OBJECT", "orders"],
      ];
      const decisions = [
        ["IDENTITY", "principal resolved"],
        ["BOUNDARY", "workspace allowed"],
        ["USAGE", "USE CATALOG + SCHEMA"],
        ["ACTION", "SELECT / MODIFY"],
      ];
      blocks.push(
        <figure
          className="unity-catalog-governance-model"
          key={`unity-governance-${index}`}
        >
          <div className="uc-governance-principals">
            <span>WHO · PRINCIPALS</span>
            <section>
              {principals.map(([type, name]) => (
                <article key={type}>
                  <b>{type}</b>
                  <strong>{name}</strong>
                </article>
              ))}
            </section>
          </div>
          <div className="uc-governance-access-path">
            <article className="uc-workspace-gate">
              <span>WHERE</span>
              <strong>workspace binding</strong>
              <small>unbound = denied even with grants</small>
            </article>
            <i aria-hidden="true">→</i>
            <section>
              {hierarchy.map(([level, object], levelIndex) => (
                <Fragment key={level}>
                  <article>
                    <span>{level}</span>
                    <strong>{object}</strong>
                  </article>
                  {levelIndex < hierarchy.length - 1 ? (
                    <i aria-hidden="true">↓</i>
                  ) : null}
                </Fragment>
              ))}
            </section>
            <i aria-hidden="true">→</i>
            <article className="uc-action-card">
              <span>ACTION</span>
              <strong>SELECT</strong>
              <small>governed result</small>
            </article>
          </div>
          <div className="uc-governance-decisions">
            {decisions.map(([label, check], decisionIndex) => (
              <article key={label}>
                <b>{String(decisionIndex + 1).padStart(2, "0")}</b>
                <span>{label}</span>
                <strong>{check}</strong>
              </article>
            ))}
          </div>
          <div className="uc-governance-foundation">
            <article>
              <span>STORAGE</span>
              <strong>Managed / External</strong>
              <small>governance + lifecycle boundary</small>
            </article>
            <article>
              <span>EVIDENCE</span>
              <strong>lineage · audit · discovery</strong>
              <small>who · what · where · when</small>
            </article>
          </div>
          <figcaption>
            一次访问要同时满足身份、workspace、父级 usage 与对象 action 四道门。Securable hierarchy
            让授权可以继承，但 ownership 与显式 grants 仍需分别检查；成功或拒绝的交互都应进入 lineage
            与 audit 证据链。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[lakeflow-batch-streaming-end-to-end]]") {
      const datasetStages = [
        ["BRONZE", "Streaming Table", "4 source rows", "incremental commits"],
        ["SILVER", "Streaming Table", "3 → 4 valid", "quality + batch join"],
        ["GOLD", "Materialized View", "4 orders · 215.00", "current aggregate"],
      ];
      blocks.push(
        <figure
          className="lakeflow-batch-streaming-end-to-end"
          key={`lakeflow-e2e-${index}`}
        >
          <div className="lakeflow-e2e-job">
            <article><b>01</b><span>NOTEBOOK TASK</span><strong>prepare_batch_dimension</strong><small>customer tiers · current snapshot</small></article>
            <i aria-hidden="true">→</i>
            <article className="lakeflow-e2e-pipeline-task"><b>02</b><span>PIPELINE TASK</span><strong>triggered update</strong><small>single concurrent update</small></article>
            <i aria-hidden="true">→</i>
            <article><b>03</b><span>VALIDATION TASK</span><strong>validate_gold</strong><small>rows · totals · freshness</small></article>
          </div>
          <div className="lakeflow-e2e-inputs">
            <article className="lakeflow-stream-input">
              <span>STREAMING FACT</span>
              <strong>orders commits</strong>
              <div><b>1</b><b>2</b><b>3</b><b className="bad">4</b><b className="new">5</b></div>
              <small>STREAM source · checkpointed progress</small>
            </article>
            <i aria-hidden="true">+</i>
            <article className="lakeflow-batch-input">
              <span>BATCH DIMENSION</span>
              <strong>customer tiers</strong>
              <div><b>c1 GOLD</b><b>c2 SILVER</b><b>c3 BRONZE</b></div>
              <small>static snapshot read</small>
            </article>
          </div>
          <div className="lakeflow-e2e-datasets">
            {datasetStages.map(([layer, kind, result, mechanism], stageIndex) => (
              <Fragment key={layer}>
                <article>
                  <span>{layer}</span>
                  <strong>{kind}</strong>
                  <b>{result}</b>
                  <small>{mechanism}</small>
                </article>
                {stageIndex < datasetStages.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="lakeflow-e2e-evidence">
            <article><span>DATA</span><strong>4 valid · 1 dropped</strong><small>quality evidence</small></article>
            <article><span>STATE</span><strong>run_id ↔ update_id</strong><small>orchestration evidence</small></article>
            <article><span>RECOVERY</span><strong>no new commit = no duplicate</strong><small>idempotency evidence</small></article>
          </div>
          <figcaption>
            外层 Job 过程式编排批量准备、triggered pipeline 和验收；内层 pipeline
            声明式维护增量事实、质量与聚合。Streaming Table 保留处理状态但不要求计算持续运行，Gold
            Materialized View 在每次 refresh 后提供当前正确结果。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[jobs-retry-timeout-notification-recovery]]") {
      const attemptTimeline = [
        ["00s", "ATTEMPT 1", "simulated 503", "FAILED"],
        ["02s", "RETRY WAIT", "bounded interval", "WAITING"],
        ["14s", "ATTEMPT 2", "MERGE one row", "SUCCESS"],
      ];
      const recoveryDecisions = [
        ["TRANSIENT", "有界 retry", "503 · network · capacity"],
        ["DETERMINISTIC", "fail fast", "code · schema · assertion"],
        ["PERMISSION", "stop + owner", "Unauthorized · missing path"],
      ];
      blocks.push(
        <figure
          className="jobs-retry-timeout-notification-recovery"
          key={`jobs-reliability-${index}`}
        >
          <div className="jobs-retry-policy">
            {recoveryDecisions.map(([kind, action, examples]) => (
              <article key={kind}>
                <span>{kind}</span>
                <strong>{action}</strong>
                <small>{examples}</small>
              </article>
            ))}
          </div>
          <div className="jobs-attempt-timeline">
            {attemptTimeline.map(([time, attempt, detail, state], attemptIndex) => (
              <Fragment key={attempt}>
                <article className={state.toLowerCase()}>
                  <b>{time}</b>
                  <span>{attempt}</span>
                  <strong>{detail}</strong>
                  <small>{state}</small>
                </article>
                {attemptIndex < attemptTimeline.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="jobs-threshold-scale">
            <article>
              <span>EXPECTED</span>
              <strong>0–10s</strong>
              <small>正常窗口</small>
            </article>
            <article className="jobs-warning-zone">
              <span>WARNING</span>
              <strong>&gt; 10s</strong>
              <small>发事件 · 继续运行</small>
            </article>
            <article className="jobs-timeout-zone">
              <span>TIMEOUT</span>
              <strong>&gt; 60s</strong>
              <small>终止当前 attempt</small>
            </article>
          </div>
          <div className="jobs-recovery-loop">
            <article><span>SIGNAL</span><strong>Task / Job notification</strong><small>run_id · task · error</small></article>
            <i aria-hidden="true">→</i>
            <article><span>TRIAGE</span><strong>first failure + partial writes</strong><small>分类与影响范围</small></article>
            <i aria-hidden="true">→</i>
            <article><span>RECOVER</span><strong>retry / Repair / stop</strong><small>幂等验证 + runbook</small></article>
          </div>
          <div className="jobs-recovery-evidence">
            <code>{"{{task.execution_count}}"}</code>
            <strong>2 · RECOVERED</strong>
            <small>lesson074_recovery_log · one business key</small>
          </div>
          <figcaption>
            故障类型决定动作：瞬时错误可进入有界 retry，确定性与权限错误应快速停止。Warning
            在慢运行时发出信号但不终止；Timeout 限制每个 attempt。最终通知必须进入包含分诊、幂等验证和
            owner 的恢复闭环。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[jobs-control-flow-branch-loop-repair]]") {
      const marketIterations = [
        ["CN", "100", "SUCCESS"],
        ["JP", "200", "SUCCESS"],
        ["SG", "300", "SUCCESS"],
      ];
      blocks.push(
        <figure
          className="jobs-control-flow-branch-loop-repair"
          key={`jobs-control-flow-${index}`}
        >
          <div className="jobs-control-source">
            <article>
              <span>NOTEBOOK</span>
              <strong>inspect_batch</strong>
              <small>bad_records = 0 · markets = [CN, JP, SG]</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="jobs-ifelse-node">
              <span>IF / ELSE CONDITION</span>
              <strong>bad_records == 0</strong>
              <small>字符串等值比较 · result = true</small>
            </article>
          </div>
          <div className="jobs-branch-grid">
            <section className="jobs-true-branch">
              <header><span>TRUE</span><strong>For each · concurrency 2</strong></header>
              <div>
                {marketIterations.map(([market, amount, state]) => (
                  <article key={market}>
                    <b>{market}</b>
                    <strong>{amount}</strong>
                    <small>{state}</small>
                  </article>
                ))}
              </div>
              <footer>
                <code>{"{{input.market}}"}</code>
                <span>MERGE by market</span>
              </footer>
            </section>
            <section className="jobs-false-branch">
              <header><span>FALSE</span><strong>quarantine_batch</strong></header>
              <div>
                <b>EXCLUDED</b>
                <small>条件未命中，不是失败</small>
              </div>
            </section>
          </div>
          <div className="jobs-repair-path">
            <article>
              <span>VERIFY</span>
              <strong>expected 4 · actual 3</strong>
              <b>FAILED</b>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>FIX ROOT CAUSE</span>
              <strong>expected_markets = 3</strong>
              <small>确认已有结果可幂等</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="jobs-repair-success">
              <span>REPAIR RUN</span>
              <strong>verify only</strong>
              <b>SUCCESS</b>
            </article>
          </div>
          <div className="jobs-repair-evidence">
            <article><span>SUCCESS TASKS</span><strong>not rerun</strong><small>节省计算</small></article>
            <article><span>RESULT TABLE</span><strong>3 rows</strong><small>MERGE 防重复</small></article>
            <article><span>RUN HISTORY</span><strong>repair_count = 1</strong><small>保留恢复证据</small></article>
          </div>
          <figcaption>
            If/else 根据 task value 选择分支，For each 把同一逻辑应用到三个市场。末端参数错误导致原
            Run 失败；修正参数并确认 MERGE 可安全重入后，Repair 只恢复失败验证，成功迭代保持原状态。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[jobs-multitask-parameter-schedule-dag]]") {
      const dagTasks = [
        ["01", "ingest_orders", "All succeeded", "stage · 3 rows"],
        ["02", "build_daily_sales", "All succeeded", "daily · 1 row"],
        ["03", "publish_manifest", "LEAF TASK", "manifest · run_id"],
      ];
      const runtimeValues = [
        ["CONFIG TIME", "{{job.parameters.run_date}}", "保存引用模板"],
        ["RUN TIME", "2026-07-26", "解析公共业务日期"],
        ["RUN CONTEXT", "{{job.run_id}}", "生成实际运行标识"],
      ];
      blocks.push(
        <figure
          className="jobs-multitask-parameter-schedule-dag"
          key={`jobs-multitask-${index}`}
        >
          <div className="jobs-multitask-trigger">
            <article>
              <span>SCHEDULED / MANUAL</span>
              <strong>Trigger</strong>
              <small>timezone · frequency · override</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>JOB RUN</span>
              <strong>run_date = 2026-07-26</strong>
              <small>同一次 Run 的公共输入</small>
            </article>
          </div>
          <div className="jobs-multitask-dag">
            {dagTasks.map(([order, task, condition, output], taskIndex) => (
              <Fragment key={task}>
                <article>
                  <b>{order}</b>
                  <span>NOTEBOOK TASK</span>
                  <strong>{task}</strong>
                  <em>{condition}</em>
                  <small>{output}</small>
                </article>
                {taskIndex < dagTasks.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="jobs-multitask-runtime">
            {runtimeValues.map(([phase, value, detail]) => (
              <article key={phase}>
                <span>{phase}</span>
                <code>{value}</code>
                <small>{detail}</small>
              </article>
            ))}
          </div>
          <div className="jobs-multitask-results">
            <article><span>STAGE</span><strong>3 rows</strong><small>lesson072_orders_stage</small></article>
            <article><span>DAILY</span><strong>3 · 60.00</strong><small>lesson072_daily_sales</small></article>
            <article><span>MANIFEST</span><strong>PUBLISHED</strong><small>lesson072_run_manifest</small></article>
          </div>
          <figcaption>
            Trigger 创建 Job Run；公共参数随 Run 进入每个 Task Run。DAG 箭头是执行顺序的唯一声明，默认
            All succeeded 让下游只在上游成功后启动。动态引用在运行时解析，最终把 run_id
            留在发布清单中形成可追踪证据。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[lakeflow-jobs-basic-run-lifecycle]]") {
      const jobConfig = [
        ["TASK", "build_daily_output", "Notebook"],
        ["COMPUTE", "serverless", "managed"],
        ["PARAMETER", "run_date", "2026-07-26"],
        ["TRIGGER", "manual", "validated first"],
      ];
      const jobRuns = [
        ["RUN 101", "2026-07-26", "SUCCESS", "1 row · 3 · 60.00"],
        ["RUN 102", "2026-07-27", "SUCCESS", "replace · no duplicate"],
      ];
      blocks.push(
        <figure
          className="lakeflow-jobs-basic-run-lifecycle"
          key={`jobs-basics-${index}`}
        >
          <div className="jobs-resource-head">
            <span>SAVED JOB RESOURCE</span>
            <strong>lesson071_jobs_basics</strong>
            <small>配置持续存在 · 历史 Run 不被改写</small>
          </div>
          <div className="jobs-config-grid">
            {jobConfig.map(([label, value, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{detail}</small>
              </article>
            ))}
          </div>
          <div className="jobs-trigger-flow">
            <article>
              <span>MANUAL TRIGGER</span>
              <strong>Run now</strong>
              <small>创建新的 Job Run</small>
            </article>
            <i aria-hidden="true">→</i>
            <section>
              {jobRuns.map(([run, date, state, result]) => (
                <article key={run}>
                  <span>{run}</span>
                  <strong>{date}</strong>
                  <b>{state}</b>
                  <small>{result}</small>
                  <div>
                    <em>TASK RUN</em>
                    <code>build_daily_output</code>
                  </div>
                </article>
              ))}
            </section>
            <i aria-hidden="true">→</i>
            <article className="jobs-target-card">
              <span>UNITY CATALOG TARGET</span>
              <strong>lesson071_job_output</strong>
              <small>1 current row · idempotent replace</small>
            </article>
          </div>
          <div className="jobs-boundary-grid">
            <article><span>CODE ASSET</span><strong>Notebook</strong><small>业务逻辑</small></article>
            <article><span>JOB CONFIG</span><strong>Task + compute</strong><small>如何运行</small></article>
            <article><span>RUN INSTANCE</span><strong>run_id + parameter</strong><small>这一次执行</small></article>
            <article><span>DATA RESULT</span><strong>UC table</strong><small>持久输出</small></article>
          </div>
          <figcaption>
            同一个 Job 配置可产生多个独立 Runs；每个 Run 都有自己的参数、Task Run、日志与状态。Target 使用 replace 语义，因此第二次运行更新业务日期而不追加重复行。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[pipeline-monitoring-event-log-map]]") {
      const eventTypes = [
        ["09:00:00", "create_update", "update u-070"],
        ["09:00:02", "flow_definition", "orders_checked"],
        ["09:00:04", "flow_progress", "STARTING"],
        ["09:00:08", "flow_progress", "COMPLETED"],
        ["09:00:09", "update_progress", "COMPLETED"],
      ];
      const evidenceCards = [
        ["STATUS", "COMPLETED", "update + flow final state"],
        ["THROUGHPUT", "4 output rows", "input / output / upsert"],
        ["QUALITY", "2 dropped rows", "pass / fail / dropped"],
        ["BACKLOG", "metric available?", "null is not zero"],
      ];
      blocks.push(
        <figure
          className="pipeline-monitoring-event-log-map"
          key={`pipeline-monitoring-${index}`}
        >
          <div className="monitor-event-stream">
            <span>STRUCTURED EVENT TIMELINE</span>
            <div>
              {eventTypes.map(([time, type, detail]) => (
                <article key={`${time}-${type}`}>
                  <small>{time}</small>
                  <strong>{type}</strong>
                  <b>{detail}</b>
                </article>
              ))}
            </div>
          </div>
          <div className="monitor-correlation-row">
            <article>
              <span>1 · SCOPE RUN</span>
              <strong>origin.update_id = u-070</strong>
              <small>不要混合前后两次 update</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>2 · LOCATE COMPONENT</span>
              <strong>origin.flow_name</strong>
              <small>lesson069_orders_checked</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>3 · PARSE DETAILS</span>
              <strong>event_type-specific JSON</strong>
              <small>TRY_CAST · FROM_JSON · EXPLODE</small>
            </article>
          </div>
          <div className="monitor-evidence-grid">
            {evidenceCards.map(([label, value, meaning]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{meaning}</small>
              </article>
            ))}
          </div>
          <div className="monitor-action-row">
            <article>
              <span>OBSERVE</span>
              <strong>UI · Event Log · Query History</strong>
              <small>事实、趋势、执行计划</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>DECIDE</span>
              <strong>window · threshold · consecutive</strong>
              <small>区分瞬时波动与持续异常</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>ACT</span>
              <strong>owner · runbook · dedupe</strong>
              <small>event hook / workflow notification</small>
            </article>
          </div>
          <figcaption>
            Event Log 不是一堆孤立日志：update_id 划定一次运行，flow_name 锁定组件，details 提供多维证据。告警只在窗口与阈值成立时触发，并必须指向明确 owner 与 runbook。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[pipeline-expectations-policy-flow]]") {
      const qualityRows = [
        ["1", "valid", "10"],
        ["2", "valid", "20"],
        ["3", "warn", "30"],
        ["4", "drop", "-5"],
        ["5", "drop", "40"],
        ["6", "valid", "50"],
      ];
      const policies = [
        ["WARN", "customer_id_present", "keep + metric", "5 pass · 1 fail"],
        ["DROP", "amount / status", "discard + metric", "2 unique rows"],
        ["FAIL", "order_id_required", "rollback flow", "6 pass · 0 fail"],
      ];
      blocks.push(
        <figure
          className="pipeline-expectations-policy-flow"
          key={`expectations-${index}`}
        >
          <div className="expectation-source">
            <span>6 SOURCE ROWS</span>
            <div>
              {qualityRows.map(([id, state, amount]) => (
                <b className={state} key={id}>
                  <em>#{id}</em>
                  <strong>{amount}</strong>
                  <small>{state}</small>
                </b>
              ))}
            </div>
          </div>
          <div className="expectation-policy-grid">
            {policies.map(([policy, rule, action, metric]) => (
              <article className={policy.toLowerCase()} key={policy}>
                <span>{policy}</span>
                <strong>{rule}</strong>
                <b>{action}</b>
                <small>{metric}</small>
              </article>
            ))}
          </div>
          <div className="expectation-outcome-flow">
            <section className="expectation-target">
              <span>TARGET COMMIT</span>
              <div>
                <b>1</b><b>2</b><b className="warn">3</b><b>6</b>
              </div>
              <strong>4 rows · 110.00</strong>
              <small>#3 retained with warn · #4/#5 dropped</small>
            </section>
            <i aria-hidden="true">+</i>
            <section className="expectation-metrics">
              <span>EVENT LOG · flow_progress</span>
              <div>
                <b><small>passed_records</small><strong>per rule</strong></b>
                <b><small>failed_records</small><strong>per rule</strong></b>
                <b><small>dropped_records</small><strong>dataset</strong></b>
              </div>
            </section>
          </div>
          <div className="expectation-evidence-row">
            <article>
              <span>METRICS</span>
              <strong>多少行违反规则？</strong>
              <small>趋势 · 比率 · SLO · 告警</small>
            </article>
            <b aria-hidden="true">≠</b>
            <article>
              <span>QUARANTINE</span>
              <strong>哪些行、为什么失败？</strong>
              <small>原始记录 · reason · 修复与重放</small>
            </article>
          </div>
          <figcaption>
            同一批数据可对不同风险采用不同 policy：warn 保留第3行，drop 阻断第4与第5行，fail 规则全部通过所以 target 原子提交。Event log 记录数量，但隔离表才保存待修复证据。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[sql-declarative-pipelines-plan]]") {
      const sqlDefinitions = [
        ["gold.sql · line 1", "MATERIALIZED VIEW", "lesson068_daily_mv"],
        ["bronze.sql · line 18", "STREAMING TABLE", "lesson068_orders_st"],
        ["silver.sql · line 7", "TEMPORARY VIEW", "lesson068_valid_orders"],
      ];
      const sqlPlannerSteps = [
        ["1", "PARSE", "读取全部 CREATE definitions"],
        ["2", "RESOLVE", "对象引用变成 graph edges"],
        ["3", "PLAN", "选择 checkpoint / refresh"],
      ];
      blocks.push(
        <figure
          className="sql-declarative-pipelines-plan"
          key={`sql-declarative-${index}`}
        >
          <div className="sql-dp-source-grid">
            {sqlDefinitions.map(([file, kind, dataset]) => (
              <article key={file}>
                <span>{file}</span>
                <strong>CREATE OR REFRESH</strong>
                <b>{kind}</b>
                <code>{dataset}</code>
              </article>
            ))}
          </div>
          <div className="sql-dp-stream-contract">
            <span>READ SEMANTICS</span>
            <code>FROM <b>STREAM</b> main.default.lesson068_source_orders</code>
            <strong>STREAM 只标记这一次 source read</strong>
          </div>
          <div className="sql-dp-planning-flow">
            <section>
              <span>PLANNER · NOT A LINE-BY-LINE SCRIPT</span>
              <div>
                {sqlPlannerSteps.map(([step, label, detail]) => (
                  <article key={step}>
                    <b>{step}</b>
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </article>
                ))}
              </div>
            </section>
            <i aria-hidden="true">→</i>
            <section className="sql-dp-dag">
              <span>EXECUTION DAG</span>
              <article className="source">
                <small>APPEND SOURCE</small>
                <strong>5 rows</strong>
              </article>
              <i aria-hidden="true">↓</i>
              <article className="streaming">
                <small>STREAMING TABLE</small>
                <strong>lesson068_orders_st</strong>
              </article>
              <i aria-hidden="true">↓</i>
              <article className="temporary">
                <small>TEMPORARY VIEW</small>
                <strong>lesson068_valid_orders</strong>
              </article>
              <i aria-hidden="true">↓</i>
              <article className="materialized">
                <small>MATERIALIZED VIEW</small>
                <strong>2 days · 4 orders · 100.00</strong>
              </article>
            </section>
          </div>
          <div className="sql-dp-order-proof">
            <article>
              <span>SOURCE ORDER</span>
              <strong>Gold → Bronze → Silver</strong>
              <small>只表示 definitions 被求值的位置</small>
            </article>
            <b aria-hidden="true">≠</b>
            <article>
              <span>EXECUTION ORDER</span>
              <strong>Bronze → Silver → Gold</strong>
              <small>由 dependency graph 的拓扑顺序决定</small>
            </article>
          </div>
          <figcaption>
            即使 Gold definition 出现在第一个 source file，planner 仍会先更新它依赖的 Bronze 与内部 Temporary View。`STREAM` 决定输入怎样读，DAG 决定对象怎样执行。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[python-dp-api-planning-graph]]") {
      const dpDefinitions = [
        ["@dp.table", "spark.readStream", "lesson067_orders_st"],
        ["@dp.temporary_view", "spark.read", "lesson067_valid_orders"],
        ["@dp.materialized_view", "spark.read", "lesson067_daily_mv"],
      ];
      const dpPlanner = [
        ["01", "REGISTER", "收集 decorator"],
        ["02", "EVALUATE", "获取 DataFrame plans"],
        ["03", "RESOLVE", "构建 dependency DAG"],
        ["04", "UPDATE", "执行并原子提交"],
      ];
      blocks.push(
        <figure
          className="python-dp-api-planning-graph"
          key={`python-dp-${index}`}
        >
          <div className="dp-api-file-head">
            <span>PYTHON SOURCE · DEFINITIONS</span>
            <code>from pyspark import pipelines as dp</code>
          </div>
          <div className="dp-api-main-flow">
            <section className="dp-api-definition-stack">
              {dpDefinitions.map(([decorator, frame, dataset], definitionIndex) => (
                <article key={decorator}>
                  <span>{decorator}</span>
                  <strong>{dataset}</strong>
                  <small>
                    {frame}
                    <i aria-hidden="true"> → </i>
                    return DataFrame
                  </small>
                  <b>{definitionIndex + 1}</b>
                </article>
              ))}
            </section>
            <i className="dp-api-flow-arrow" aria-hidden="true">→</i>
            <section className="dp-api-planner">
              <span>LAKEFLOW PLANNER</span>
              <div>
                {dpPlanner.map(([step, label, detail]) => (
                  <article key={step}>
                    <b>{step}</b>
                    <strong>{label}</strong>
                    <small>{detail}</small>
                  </article>
                ))}
              </div>
            </section>
            <i className="dp-api-flow-arrow" aria-hidden="true">→</i>
            <section className="dp-api-object-stack">
              <article>
                <span>STREAMING TABLE</span>
                <strong>5 source rows</strong>
                <small>checkpoint managed</small>
              </article>
              <article className="temporary">
                <span>TEMPORARY VIEW</span>
                <strong>4 valid rows</strong>
                <small>pipeline internal</small>
              </article>
              <article className="materialized">
                <span>MATERIALIZED VIEW</span>
                <strong>2 days · 100.00</strong>
                <small>refresh managed</small>
              </article>
            </section>
          </div>
          <div className="dp-api-contract-row">
            <article className="allowed">
              <span>DATASET FUNCTION</span>
              <strong>只描述 query 并 return DataFrame</strong>
              <small>transformations · deterministic definition · no manual write</small>
            </article>
            <article className="forbidden">
              <span>禁止穿透声明边界</span>
              <strong>collect · count · saveAsTable · start</strong>
              <small>函数可能在 planning / update 中被多次求值</small>
            </article>
          </div>
          <figcaption>
            Python 文件注册“是什么”，planner 决定“怎样运行”。三层函数只返回 DataFrame plans；读取、checkpoint、刷新与提交由 Lakeflow update 执行，验证 action 留到 update 完成之后。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[streaming-table-materialized-view-dual-path]]") {
      const stRows = [
        ["1", "07.25", "10"],
        ["2", "07.25", "20"],
        ["3", "07.26", "30"],
        ["4", "07.26", "40"],
        ["5", "07.26", "50"],
      ];
      const datasetQuestions = [
        ["INGEST", "append-only rows", "ST"],
        ["CDC", "I/U/D current state", "AUTO CDC → ST"],
        ["AGGREGATE", "always-correct result", "MV"],
        ["JOIN", "dimension can change", "MV"],
      ];
      blocks.push(
        <figure
          className="streaming-table-materialized-view-dual-path"
          key={`st-mv-${index}`}
        >
          <div className="st-mv-source">
            <span>APPEND-ONLY SOURCE</span>
            <div>
              {stRows.map(([id, day, amount], rowIndex) => (
                <b className={rowIndex < 3 ? "batch-one" : "batch-two"} key={id}>
                  <em>#{id}</em><small>{day}</small><strong>{amount}</strong>
                </b>
              ))}
            </div>
            <small><i>BATCH 1 · rows 1–3</i><i>BATCH 2 · rows 4–5</i></small>
          </div>
          <div className="st-mv-path-grid">
            <article className="st-path-card">
              <span>STREAMING TABLE · PROCESS ROWS</span>
              <div className="st-checkpoint-row">
                <b><small>UPDATE 1</small><strong>offset 3</strong><em>3 rows · 60</em></b>
                <i aria-hidden="true">→</i>
                <b><small>UPDATE 2</small><strong>offset 5</strong><em>+2 only</em></b>
              </div>
              <div className="st-target-strip"><b>1</b><b>2</b><b>3</b><b>4</b><b>5</b><strong>5 rows · 150</strong></div>
              <p>记住“处理到哪里” · query change 默认不回写旧行</p>
            </article>
            <article className="mv-path-card">
              <span>MATERIALIZED VIEW · MAINTAIN ANSWER</span>
              <div className="mv-planner-row">
                <b><small>CHANGE SET</small><strong>rows 4–5</strong><em>07.26 affected</em></b>
                <i aria-hidden="true">→</i>
                <b><small>PLANNER</small><strong>incremental?</strong><em>or full recompute</em></b>
              </div>
              <div className="mv-result-strip">
                <b><small>07.25</small><strong>2 · 30</strong></b>
                <b><small>07.26</small><strong>1 · 30 → 3 · 120</strong></b>
              </div>
              <p>维护“现在答案是什么” · refresh 后等价于 batch query</p>
            </article>
          </div>
          <div className="st-mv-refresh-matrix">
            <article><span>DEFAULT REFRESH</span><strong>ST: new rows</strong><small>MV: incremental or full</small></article>
            <article><span>FULL REFRESH</span><strong>ST: clear + replay</strong><small>MV: recompute all</small></article>
            <article><span>RESET CHECKPOINT</span><strong>ST only: keep target</strong><small>replay can duplicate</small></article>
          </div>
          <div className="st-mv-decision-grid">
            {datasetQuestions.map(([label, need, choice]) => (
              <article key={label}><span>{label}</span><strong>{need}</strong><b>{choice}</b></article>
            ))}
          </div>
          <figcaption>
            ST 的 checkpoint 把第二轮限定为新增两行；MV 的 planner 只需更新受影响日期时可以增量计算，但无论采用哪条计算路径，结果都必须与完整 batch query 一致。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[lakeflow-sdp-dependency-update-graph]]") {
      const sdpDefinitions = [
        ["SQL", "bronze.sql", "streaming table"],
        ["SQL", "gold.sql", "materialized view"],
        ["PY", "quality.py", "private view"],
      ];
      const sdpPlanner = [
        ["1", "ANALYZE", "collect definitions"],
        ["2", "DAG", "resolve dependencies"],
        ["3", "PLAN", "incremental / full"],
        ["4", "RUN", "parallel + ordered"],
        ["5", "COMMIT", "state + metrics"],
      ];
      blocks.push(
        <figure
          className="lakeflow-sdp-dependency-update-graph"
          key={`lakeflow-sdp-${index}`}
        >
          <div className="sdp-definition-row">
            <span>PIPELINE SOURCE DEFINITIONS</span>
            <div>
              {sdpDefinitions.map(([lang, file, object]) => (
                <article key={file}><b>{lang}</b><strong>{file}</strong><small>{object}</small></article>
              ))}
            </div>
            <small>书写顺序 ≠ 执行顺序</small>
          </div>
          <div className="sdp-pipeline-boundary">
            <span>LAKEFLOW SDP PIPELINE · DEVELOPMENT + EXECUTION UNIT</span>
            <div className="sdp-dag-row">
              <article className="sdp-source-node"><b>SOURCE</b><strong>samples trips</strong><small>append-only input</small></article>
              <i aria-hidden="true">→ <em>default append flow</em> →</i>
              <article className="sdp-stream-node"><b>STREAMING TABLE</b><strong>trips_bronze</strong><small>Delta · incremental state</small></article>
              <i aria-hidden="true">→ <em>default flow</em> →</i>
              <article className="sdp-mv-node"><b>MATERIALIZED VIEW</b><strong>daily_trips</strong><small>cached query result</small></article>
            </div>
            <div className="sdp-flow-types">
              <b>APPEND</b><b>AUTO CDC</b><b>UPDATE <small>Preview</small></b><b>EXPLICIT BACKFILL</b>
            </div>
          </div>
          <div className="sdp-update-planner">
            <span>ONE PIPELINE UPDATE</span>
            <div>
              {sdpPlanner.map(([step, name, detail]) => (
                <article key={step}><b>{step}</b><strong>{name}</strong><small>{detail}</small></article>
              ))}
            </div>
          </div>
          <div className="sdp-mode-grid">
            <article>
              <span>TRIGGERED MODE</span>
              <strong>refresh available data → stop</strong>
              <small>分钟 / 小时 / 每日 · 较省资源</small>
            </article>
            <article>
              <span>CONTINUOUS MODE</span>
              <strong>keep graph fresh → stay running</strong>
              <small>十秒到几分钟 · 更低延迟</small>
            </article>
            <article>
              <span>REFRESH PATH</span>
              <strong>incremental when possible</strong>
              <small>full refresh 是重算策略，不是 mode</small>
            </article>
          </div>
          <figcaption>
            Pipeline 先收集定义、再按引用关系生成 DAG；flow 更新 target，update 执行整张图，mode 只决定运行何时停止。声明式减少的是手工编排，不是业务设计责任。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[lakeflow-connect-managed-ingestion]]") {
      const connectSources = [
        ["SAAS API", "OAuth · cursor"],
        ["DATABASE", "snapshot · CDC log"],
        ["FILE SERVICE", "metadata · content"],
        ["EVENT BUS", "partition · offset"],
      ];
      const connectLayers = [
        ["MANAGED", "source-specific automation", "most managed"],
        ["PIPELINES", "declarative ingestion", "more control"],
        ["STREAMING", "custom Spark source", "most control"],
      ];
      blocks.push(
        <figure
          className="lakeflow-connect-managed-ingestion"
          key={`lakeflow-connect-${index}`}
        >
          <div className="connect-source-grid">
            {connectSources.map(([name, detail]) => (
              <article key={name}><span>{name}</span><strong>{detail}</strong></article>
            ))}
          </div>
          <div className="connect-layer-ladder">
            <span>START MANAGED · DROP DOWN ONLY FOR A GAP</span>
            <div>
              {connectLayers.map(([name, detail, control]) => (
                <article key={name}><b>{name}</b><strong>{detail}</strong><small>{control}</small></article>
              ))}
            </div>
          </div>
          <div className="connect-core-flow">
            <article className="connect-uc-card">
              <span>UNITY CATALOG CONNECTION</span>
              <strong>endpoint · auth · USE CONNECTION</strong>
              <small>凭据不进入 Notebook</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="connect-pipeline-card">
              <span>INGESTION PIPELINE</span>
              <strong>incremental · retry · schema</strong>
              <small>serverless Lakeflow pipeline</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="connect-target-card">
              <span>DESTINATION</span>
              <strong>UC streaming tables</strong>
              <small>Delta · lineage · downstream</small>
            </article>
          </div>
          <div className="connect-special-lanes">
            <article>
              <span>DATABASE CDC LANE</span>
              <div><b>gateway</b><i aria-hidden="true">→</i><b>staging</b><i aria-hidden="true">→</i><b>pipeline</b></div>
              <small>classic network path · log retention · continuous gateway</small>
            </article>
            <article>
              <span>QUERY-BASED LANE</span>
              <div><b>source query</b><i aria-hidden="true">→</i><b>cursor</b><i aria-hidden="true">→</i><b>pipeline</b></div>
              <small>no gateway / staging · high-watermark semantics</small>
            </article>
          </div>
          <div className="connect-governance-rail">
            <span>CONTROL + EVIDENCE</span>
            <div>
              <b>UC permissions</b><b>Jobs schedules</b><b>source position</b><b>freshness + rows</b><b>event logs + cost</b>
            </div>
            <small>last success: lsn:9025 · failure does not advance recovery position</small>
          </div>
          <figcaption>
            Lakeflow Connect 把来源适配、受治理连接、增量 pipeline 与 Delta 目标串成一条可恢复链路；database CDC 的 gateway / staging 是专用组件，不应套到 SaaS 或 query-based connector。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[scd-type1-type2-timeline]]") {
      const scdChecks = [
        ["CURRENT", "每个 customer = 1 行", "valid_to IS NULL"],
        ["NO OVERLAP", "前一 end ≤ 后一 start", "半开区间"],
        ["CHANGE ONLY", "tracked hash 不同", "不制造假历史"],
      ];
      blocks.push(
        <figure
          className="scd-type1-type2-timeline"
          key={`scd-timeline-${index}`}
        >
          <div className="scd-source-change">
            <span>BUSINESS CHANGE · CUSTOMER 1</span>
            <article>
              <b><em>01.01</em><strong>Standard</strong><small>source_seq 100</small></b>
              <i aria-hidden="true">→</i>
              <b><em>03.01</em><strong>Gold</strong><small>source_seq 200</small></b>
            </article>
          </div>
          <div className="scd-compare-grid">
            <article className="scd-type1-card">
              <span>SCD TYPE 1 · OVERWRITE</span>
              <div><b>customer_sk A</b><strong>Gold</strong><small>只保留现在</small></div>
              <p>Standard 被覆盖 · 历史无法还原</p>
            </article>
            <article className="scd-type2-card">
              <span>SCD TYPE 2 · VERSION</span>
              <div className="scd-axis-labels"><b>01.01</b><b>03.01</b><b>∞</b></div>
              <div className="scd-validity-axis">
                <b><em>sk A1</em><strong>Standard</strong><small>[01.01, 03.01)</small></b>
                <b><em>sk A2</em><strong>Gold</strong><small>[03.01, ∞)</small></b>
              </div>
              <p>旧行关闭 + 新行插入 · current 的 end = NULL</p>
            </article>
          </div>
          <div className="scd-fact-joins">
            <span>POINT-IN-TIME JOIN</span>
            <article><b>订单 · 02.15</b><i aria-hidden="true">→</i><strong>sk A1 · Standard</strong></article>
            <article><b>订单 · 04.15</b><i aria-hidden="true">→</i><strong>sk A2 · Gold</strong></article>
          </div>
          <div className="scd-integrity-grid">
            {scdChecks.map(([label, rule, evidence]) => (
              <article key={label}>
                <span>{label}</span><strong>{rule}</strong><small>{evidence}</small>
              </article>
            ))}
          </div>
          <figcaption>
            Type 1 将变化压成一行，Type 2 将变化展开成时间区间；事实表按事件时间选择版本，才能让历史报表在维度继续变化后仍保持一致。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[cdc-incremental-contract-flow]]") {
      const cdcEvents = [
        ["100", "I", "order 1", "100.00"],
        ["104", "U", "order 1", "120.00"],
        ["104", "U", "replay", "120.00"],
        ["102", "U", "late old", "999.00"],
        ["105", "D", "order 2", "tombstone"],
      ];
      const cdcRules = [
        ["KEY", "order_id", "定位实体"],
        ["ORDER", "source_seq", "拒绝旧值覆盖"],
        ["DEDUP", "key + sequence", "重放不改结果"],
        ["DELETE", "tombstone", "在目标应用"],
      ];
      blocks.push(
        <figure
          className="cdc-incremental-contract-flow"
          key={`cdc-contract-${index}`}
        >
          <div className="cdc-main-flow">
            <article className="cdc-source-card">
              <span>OLTP CHANGE LOG</span>
              <strong>WAL · binlog · redo</strong>
              <small>INSERT · UPDATE · DELETE</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="cdc-bronze-card">
              <span>BRONZE · APPEND ONLY</span>
              <div>
                {cdcEvents.map(([seq, op, key, value]) => (
                  <b key={`${seq}-${op}-${key}-${value}`}>
                    <em>{seq}</em><mark>{op}</mark><small>{key}</small><strong>{value}</strong>
                  </b>
                ))}
              </div>
            </article>
            <i aria-hidden="true">→</i>
            <article className="cdc-apply-card">
              <span>APPLY CONTRACT</span>
              <div>
                {cdcRules.map(([label, value, detail]) => (
                  <b key={label}>
                    <em>{label}</em><strong>{value}</strong><small>{detail}</small>
                  </b>
                ))}
              </div>
            </article>
          </div>
          <div className="cdc-strategy-grid">
            <article>
              <span>FULL SNAPSHOT</span>
              <strong>scan + compare</strong>
              <small>可推断删除 · 成本随全量增长</small>
            </article>
            <article>
              <span>HIGH-WATERMARK</span>
              <strong>updated_at &gt; cursor</strong>
              <small>轻量 · 通常看不到删除</small>
            </article>
            <article>
              <span>LOG-BASED CDC</span>
              <strong>I / U / D + source position</strong>
              <small>完整变化 · 需管理顺序与保留期</small>
            </article>
          </div>
          <div className="cdc-target-fork">
            <div className="cdc-fork-label">
              <span>DETERMINISTIC RESULT</span>
              <strong>每个 key 只让更高 sequence 生效</strong>
            </div>
            <i aria-hidden="true">↙</i>
            <article>
              <span>SILVER CURRENT</span>
              <strong>1 · 120.00 · seq 104</strong>
              <small>SCD Type 1 · 只看现在</small>
            </article>
            <article>
              <span>HISTORY / CDF</span>
              <strong>preimage · postimage · delete</strong>
              <small>SCD Type 2 或下游增量消费</small>
            </article>
          </div>
          <div className="cdc-position-rail">
            <span>SOURCE POSITION / CHECKPOINT</span>
            <div><b>read 105</b><i aria-hidden="true">→</i><b>commit Delta</b><i aria-hidden="true">→</i><b>ack 105</b></div>
            <small>目标提交成功后才推进；失败时从已确认位置安全重放</small>
          </div>
          <figcaption>
            CDC 的可靠性来自“原始变化不丢、应用顺序可确定、消费位置后提交”：到达晚不等于版本新，重复出现也不等于重复生效。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[auto-loader-discovery-state-pipeline]]") {
      const discoveryModes = [
        ["DIRECTORY", "incremental listing", "simple · small scale"],
        ["FILE EVENTS", "managed cache", "recommended · scalable"],
        ["CLASSIC", "queue per stream", "more cloud resources"],
      ];
      const landingFiles = ["batch_001", "batch_002", "batch_003"];
      blocks.push(
        <figure
          className="auto-loader-discovery-state-pipeline"
          key={`auto-loader-${index}`}
        >
          <div className="auto-loader-flow">
            <article className="landing-card">
              <span>LANDING · IMMUTABLE FILES</span>
              <strong>Unity Catalog Volume / cloud storage</strong>
              <div>{landingFiles.map((file) => <b key={file}>{file}.json</b>)}</div>
              <small>arrival order不保证 · default allowOverwrites=false</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="cloudfiles-card">
              <span>STRUCTURED STREAMING SOURCE</span>
              <strong>format(&quot;cloudFiles&quot;)</strong>
              <small>discover → parse → admit micro-batch</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="bronze-card">
              <span>DELTA BRONZE</span>
              <strong>6 rows · 210.00</strong>
              <small>source file · ingest time · rescued data</small>
            </article>
          </div>
          <div className="auto-loader-discovery-grid">
            {discoveryModes.map(([label, title, detail]) => (
              <article key={label}>
                <span>{label}</span><strong>{title}</strong><small>{detail}</small>
              </article>
            ))}
          </div>
          <div className="auto-loader-state-rails">
            <article>
              <span>SCHEMA LOCATION</span>
              <strong>_schemas · inferred fields · evolution history</strong>
              <small>回答“文件应怎样解析”</small>
            </article>
            <i aria-hidden="true">≠</i>
            <article>
              <span>CHECKPOINT LOCATION</span>
              <strong>file state · offsets · commits · query identity</strong>
              <small>回答“哪些文件已经安全提交”</small>
            </article>
          </div>
          <div className="auto-loader-quality-branch">
            <span>SCHEMA + QUALITY</span>
            <div>
              <article><strong>EXPECTED</strong><small>typed columns → Bronze</small></article>
              <article><strong>NEW COLUMN</strong><small>evolve + restart / rescue</small></article>
              <article><strong>TYPE MISMATCH</strong><small>_rescued_data → inspect</small></article>
              <article><strong>MALFORMED</strong><small>parser policy → quarantine</small></article>
            </div>
          </div>
          <figcaption>
            Auto Loader把文件发现、schema tracking与processing progress拆成清晰契约；file events只优化发现层，质量仍由pipeline负责。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[streaming-dedup-state-machine]]") {
      const dedupState = [
        ["order-a", "10:00", "remembered"],
        ["order-b", "10:01", "evictable"],
        ["order-c", "10:20", "remembered"],
      ];
      const decisions = [
        ["order-b · 10:03", "TOO LATE", "drop"],
        ["order-c · 10:22", "KEY EXISTS", "suppress"],
        ["order-d · 10:25", "NEW KEY", "emit"],
        ["order-e · 10:40", "NEW KEY", "emit"],
      ];
      blocks.push(
        <figure
          className="streaming-dedup-state-machine"
          key={`dedup-state-${index}`}
        >
          <div className="dedup-contract-row">
            <div>
              <span>BUSINESS KEY</span>
              <strong>event_id</strong>
              <small>重试保持稳定</small>
            </div>
            <i aria-hidden="true">+</i>
            <div>
              <span>RETENTION BOUNDARY</span>
              <strong>Watermark 10 min</strong>
              <small>限定key记忆范围</small>
            </div>
            <i aria-hidden="true">+</i>
            <div>
              <span>RECOVERY</span>
              <strong>unique checkpoint</strong>
              <small>跨run恢复State Store</small>
            </div>
          </div>
          <div className="dedup-engine-grid">
            <section>
              <span>STATE STORE · AFTER RUN 1</span>
              <div className="dedup-state-keys">
                {dedupState.map(([key, time, status]) => (
                  <article className={status} key={key}>
                    <strong>{key}</strong><small>{time}</small>
                  </article>
                ))}
              </div>
              <small>order-a duplicate已Suppress；Watermark推进后旧key可evict</small>
            </section>
            <section>
              <span>RUN 2 · DECISION TABLE</span>
              <div className="dedup-decision-list">
                {decisions.map(([event, reason, outcome]) => (
                  <article className={outcome} key={event}>
                    <strong>{event}</strong><small>{reason}</small><b>{outcome.toUpperCase()}</b>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <div className="dedup-state-machine-row">
            <article><span>01</span><strong>CHECK TIME</strong><small>event_time ≥ Watermark?</small></article>
            <i aria-hidden="true">→</i>
            <article><span>02</span><strong>LOOKUP KEY</strong><small>event_id exists?</small></article>
            <i aria-hidden="true">→</i>
            <article className="dedup-emit"><span>03A</span><strong>EMIT + REMEMBER</strong><small>new acceptable key</small></article>
            <i aria-hidden="true">/</i>
            <article className="dedup-stop"><span>03B</span><strong>SUPPRESS / DROP</strong><small>duplicate or too late</small></article>
          </div>
          <div className="dedup-sink-summary">
            <span>DELTA SINK</span>
            <strong>order-a · order-b · order-c · order-d · order-e</strong>
            <small>5 business events · 150.00；每个event_id恰好一行</small>
          </div>
          <figcaption>
            流式去重是一个有时间边界的key-state machine：Watermark先约束可接受时间，再由State Store决定Emit或Suppress。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[watermark-late-data-timeline]]") {
      const firstRunEvents = [
        ["10:01", "10.00", "on-time"],
        ["10:04", "20.00", "on-time"],
        ["10:25", "40.00", "future"],
      ];
      const secondRunEvents = [
        ["10:08", "100.00", "dropped"],
        ["10:18", "50.00", "accepted"],
        ["10:35", "60.00", "future"],
      ];
      blocks.push(
        <figure
          className="watermark-late-data-timeline"
          key={`watermark-timeline-${index}`}
        >
          <div className="watermark-formula">
            <span>EVENT-TIME FRONTIER</span>
            <strong>max observed 10:25</strong>
            <i aria-hidden="true">−</i>
            <strong>delay 10 min</strong>
            <i aria-hidden="true">=</i>
            <strong className="watermark-value">Watermark 10:15</strong>
          </div>
          <div className="watermark-run-grid">
            <article>
              <span>RUN 1 · ADVANCE</span>
              <strong>建立Watermark</strong>
              <div>
                {firstRunEvents.map(([time, amount, status]) => (
                  <b className={status} key={time}>
                    <small>{time}</small>{amount}
                  </b>
                ))}
              </div>
              <small>关闭 [10:00, 10:10) → 2 events · 30.00</small>
            </article>
            <article>
              <span>RUN 2 · CLASSIFY</span>
              <strong>迟到event按已有边界判断</strong>
              <div>
                {secondRunEvents.map(([time, amount, status]) => (
                  <b className={status} key={time}>
                    <small>{time}</small>{amount}
                  </b>
                ))}
              </div>
              <small>10:08过期 · 10:18接纳 · 10:35推进frontier</small>
            </article>
          </div>
          <div className="watermark-event-axis">
            <span>EVENT TIME</span>
            <div className="watermark-axis-line">
              <b>10:00</b>
              <b>10:10</b>
              <em>WM 10:15</em>
              <b>10:20</b>
              <em>WM 10:25</em>
              <b>10:30</b>
              <b>10:40</b>
            </div>
            <div className="watermark-window-row">
              <strong className="closed">[10:00, 10:10)<small>FINAL · 30.00</small></strong>
              <strong className="closed">[10:10, 10:20)<small>FINAL · 50.00</small></strong>
              <strong className="open">[10:20, 10:30)<small>IN STATE · 40.00</small></strong>
              <strong className="open">[10:30, 10:40)<small>IN STATE · 60.00</small></strong>
            </div>
          </div>
          <div className="watermark-outcome-band">
            <span>SECOND RUN</span>
            <strong className="dropped">10:08 → DROP</strong>
            <i aria-hidden="true">·</i>
            <strong className="accepted">10:18 → ACCEPT</strong>
            <i aria-hidden="true">·</i>
            <small>sink已finalize 3 events · 80.00；后续windows仍等待Watermark</small>
          </div>
          <figcaption>
            Watermark沿event-time轴单向推进：它关闭旧state并决定append结果何时finalize，而不是跟随Notebook执行时钟。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[stream-checkpoint-state-recovery]]") {
      const checkpointEvidence = [
        ["OFFSETS", "source ranges", "[0,5) · [5,7)"],
        ["COMMITS", "sink batches", "batch 0 · batch 1"],
        ["STATE", "operator memory", "CN · JP aggregates"],
        ["METADATA", "query identity", "id · config contract"],
      ];
      blocks.push(
        <figure
          className="stream-checkpoint-state-recovery"
          key={`stream-recovery-${index}`}
        >
          <div className="checkpoint-runtime-row">
            <article>
              <span>REPLAYABLE SOURCE</span>
              <strong>Delta events</strong>
              <small>offset range [5, 7)</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="stateful-operator-card">
              <span>STATEFUL OPERATOR</span>
              <strong>groupBy(region)</strong>
              <div><b>CN · 130</b><b>JP · 170</b></div>
              <small>State Store跨micro-batch保留keys</small>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>TRANSACTIONAL SINK</span>
              <strong>Delta totals</strong>
              <small>7 events · 300.00</small>
            </article>
          </div>
          <div className="checkpoint-evidence-grid">
            {checkpointEvidence.map(([label, title, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{title}</strong>
                <small>{detail}</small>
              </article>
            ))}
          </div>
          <div className="checkpoint-failure-window">
            <span>FAILURE WINDOW</span>
            <strong>Sink commit ✓</strong>
            <i aria-hidden="true">⚡</i>
            <strong>Checkpoint commit pending</strong>
            <small>恢复时可能重试同一range；目标写入必须transactional或idempotent</small>
          </div>
          <div className="checkpoint-recovery-path">
            <span>RESTART</span>
            <i aria-hidden="true">→</i>
            <strong>读取最后commit</strong>
            <i aria-hidden="true">→</i>
            <strong>恢复State Store</strong>
            <i aria-hidden="true">→</i>
            <strong>从next offset继续</strong>
          </div>
          <figcaption>
            Checkpoint将进度证据与operator state绑定到同一query identity；恢复不是“重新计算一切”，也不是“只记一个offset”。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[stream-source-trigger-microbatch-sink]]") {
      const batchLifecycle = [
        ["01", "DISCOVER", "发现source终点"],
        ["02", "BOUND", "切分有限range"],
        ["03", "PROCESS", "执行DataFrame plan"],
        ["04", "COMMIT SINK", "结果变为可见"],
        ["05", "CHECKPOINT", "推进offset与commit"],
      ];
      blocks.push(
        <figure
          className="stream-source-trigger-microbatch-sink"
          key={`stream-components-${index}`}
        >
          <div className="stream-component-flow">
            <article className="source-card">
              <span>SOURCE · PROGRESS</span>
              <strong>Delta commits 0…8</strong>
              <div>{[0, 1, 2, 3, 4, 5, 6, 7].map((offset) => <b key={offset}>{offset}</b>)}</div>
              <small>报告可用终点，不决定何时运行</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="microbatch-card">
              <span>MICRO-BATCH</span>
              <strong>finite ranges</strong>
              <div><b>[0, 6)</b><b>[6, 8)</b></div>
              <small>按source limit接纳有限工作</small>
            </article>
            <i aria-hidden="true">→</i>
            <article className="sink-card">
              <span>SINK · COMMIT</span>
              <strong>Delta target</strong>
              <div><b>6 rows</b><b>8 rows</b></div>
              <small>成功提交后checkpoint才推进</small>
            </article>
          </div>
          <div className="stream-trigger-band">
            <div>
              <span>TRIGGER CADENCE</span>
              <strong>AvailableNow</strong>
              <small>何时检查与启动处理</small>
            </div>
            <i aria-hidden="true">≠</i>
            <div>
              <span>ADMISSION CONTROL</span>
              <strong>maxFiles / maxBytes</strong>
              <small>本批最多接纳多少</small>
            </div>
          </div>
          <div className="microbatch-lifecycle">
            {batchLifecycle.map(([number, title, detail], stepIndex) => (
              <Fragment key={number}>
                <article>
                  <span>{number}</span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </article>
                {stepIndex < batchLifecycle.length - 1 ? <i aria-hidden="true">→</i> : null}
              </Fragment>
            ))}
          </div>
          <div className="stream-recovery-band">
            <span>FAILURE REPLAY</span>
            <strong>sink committed · checkpoint pending</strong>
            <i aria-hidden="true">→</i>
            <small>恢复时重试同一range；sink必须支持事务或业务幂等</small>
          </div>
          <figcaption>
            Trigger决定“何时”，admission control决定“多少”；每个micro-batch只有在Sink与Checkpoint依次提交后才成为可恢复进度。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[structured-streaming-table-model]]") {
      const streamingStages = [
        ["SOURCE", "Input Table", "rows不断追加"],
        ["ENGINE", "Micro-batch", "offset range → plan"],
        ["LOGIC", "Result Table", "增量更新"],
        ["OUTPUT", "Mode + Sink", "append / complete"],
      ];
      blocks.push(
        <figure className="structured-streaming-table-model" key={`stream-model-${index}`}>
          <div className="stream-model-input">
            <span>UNBOUNDED INPUT TABLE</span>
            <div>{["e1", "e2", "e3", "e4", "…"].map((event) => <b key={event}>{event}</b>)}</div>
            <small>每个新event像一行追加到table</small>
          </div>
          <div className="stream-model-flow">
            {streamingStages.map(([label, title, detail], stageIndex) => (
              <Fragment key={label}>
                <article>
                  <span>{label}</span><strong>{title}</strong><small>{detail}</small>
                </article>
                {stageIndex < streamingStages.length - 1 ? <i aria-hidden="true">→</i> : null}
              </Fragment>
            ))}
          </div>
          <div className="stream-model-checkpoint">
            <span>CHECKPOINT</span>
            <strong>offsets · commits · query metadata · state</strong>
            <small>sink commit成功后才推进；每条query使用独立路径</small>
          </div>
          <div className="stream-model-cycles">
            <div><span>BATCH 0</span><strong>[0, 3)</strong><small>sink: 3 rows</small></div>
            <i aria-hidden="true">→</i>
            <div><span>BATCH 1</span><strong>[3, 5)</strong><small>sink: 5 rows</small></div>
            <i aria-hidden="true">→</i>
            <div><span>RECOVERY</span><strong>resume at 5</strong><small>不重扫已commit range</small></div>
          </div>
          <figcaption>Structured Streaming表模型：声明一次query，engine按checkpoint把unbounded input切成可恢复的增量批次。</figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[batch-incremental-boundary-loop]]") {
      const processingPatterns = [
        ["FULL BATCH", "all available data", "simple · repeat scan"],
        ["INCREMENTAL BATCH", "(last, high]", "bounded · scheduled"],
        ["STREAMING", "checkpoint → new data", "triggered or continuous"],
      ];
      const commitSteps = [
        ["01", "CAPTURE HIGH", "freeze 7"],
        ["02", "READ RANGE", "(5, 7]"],
        ["03", "DEDUP + MERGE", "idempotent target"],
        ["04", "VALIDATE", "rows · amount"],
        ["05", "COMMIT STATE", "last = 7"],
      ];
      blocks.push(
        <figure
          className="batch-incremental-boundary-loop"
          key={`batch-incremental-boundary-${index}`}
        >
          <div className="incremental-boundary-header">
            <span>RUN BOUNDARY</span>
            <strong>last_processed = 5</strong>
            <i aria-hidden="true">→</i>
            <strong>current_high = 7</strong>
            <small>本轮输入集合在开始时冻结</small>
          </div>
          <div className="incremental-timeline">
            <span>SOURCE SEQUENCE</span>
            <div>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sequence) => (
                <b
                  className={
                    sequence <= 5
                      ? "processed"
                      : sequence <= 7
                        ? "current"
                        : "future"
                  }
                  key={sequence}
                >
                  {sequence}
                </b>
              ))}
            </div>
            <small>
              1–5 已提交 · <strong>6–7 本轮处理</strong> · 8 留给下一轮
            </small>
          </div>
          <div className="processing-pattern-grid">
            {processingPatterns.map(([name, input, tradeoff]) => (
              <article
                className={name === "INCREMENTAL BATCH" ? "selected" : ""}
                key={name}
              >
                <span>{name}</span>
                <strong>{input}</strong>
                <small>{tradeoff}</small>
              </article>
            ))}
          </div>
          <div className="incremental-commit-protocol">
            {commitSteps.map(([step, name, detail], stepIndex) => (
              <Fragment key={step}>
                <article>
                  <span>{step}</span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </article>
                {stepIndex < commitSteps.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="incremental-replay-band">
            <span>FAIL BEFORE STEP 05?</span>
            <strong>checkpoint仍为5</strong>
            <i aria-hidden="true">↺</i>
            <strong>重放(5,7]</strong>
            <small>deduplicated MERGE让target收敛，不丢数据、不重复业务状态</small>
          </div>
          <figcaption>
            Incremental batch commit protocol：先冻结输入上界，目标写入与验证成功后才推进checkpoint。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-medallion-contract-pipeline]]") {
      const medallionLayers = [
        {
          className: "bronze",
          label: "BRONZE · RAW",
          grain: "1 source record",
          contract: "raw fidelity · provenance · append",
          count: "7 rows",
          consumer: "audit · replay",
        },
        {
          className: "silver",
          label: "SILVER · VALIDATED",
          grain: "1 latest valid order",
          contract: "parse · validate · dedup · constraints",
          count: "4 rows",
          consumer: "engineering · analytics",
        },
        {
          className: "gold",
          label: "GOLD · BUSINESS",
          grain: "date × region",
          contract: "paid_orders · paid_sales",
          count: "2 rows",
          consumer: "BI · applications",
        },
      ];
      blocks.push(
        <figure
          className="delta-medallion-contract-pipeline"
          key={`delta-medallion-contract-${index}`}
        >
          <div className="medallion-source-band">
            <span>SOURCE EVENTS</span>
            <strong>files · messages · database changes</strong>
            <small>源字段可能漂移、重复或无法转换</small>
          </div>
          <div className="medallion-pipeline-row">
            {medallionLayers.map((layer, layerIndex) => (
              <Fragment key={layer.label}>
                <article className={`medallion-layer-card ${layer.className}`}>
                  <span>{layer.label}</span>
                  <h4>{layer.grain}</h4>
                  <strong>{layer.contract}</strong>
                  <div>
                    <b>{layer.count}</b>
                    <small>{layer.consumer}</small>
                  </div>
                </article>
                {layerIndex < medallionLayers.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </Fragment>
            ))}
          </div>
          <div className="medallion-quality-branch">
            <span>↳ SILVER QUALITY GATE</span>
            <article>
              <strong>QUARANTINE · 2 rows</strong>
              <p>invalid_amount · missing_key</p>
              <small>保留raw payload与rejection reason，修复后可重新处理</small>
            </article>
            <div>
              <strong>DEDUP · 1 row removed</strong>
              <small>order_id + deterministic latest order</small>
            </div>
          </div>
          <div className="medallion-replay-lane">
            <span>REPLAY LANE</span>
            <strong>Bronze snapshot</strong>
            <i aria-hidden="true">→</i>
            <strong>deterministic Silver</strong>
            <i aria-hidden="true">→</i>
            <strong>rebuild affected Gold</strong>
          </div>
          <div className="medallion-reconciliation">
            <span>ROW RECONCILIATION</span>
            <strong>7 Bronze = 2 Quarantine + 1 Duplicate + 4 Silver</strong>
            <small>Gold是业务投影：2 paid orders · 350.00</small>
          </div>
          <figcaption>
            三层Delta contract：主链路逐层提升质量，旁路隔离坏数据，replay lane用稳定Bronze重建下游。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-performance-diagnostic-funnel]]") {
      const evidenceLenses = [
        {
          step: "01 · QUERY",
          title: "执行证据",
          tool: "Query Profile",
          signals: "Top operator · scanned bytes · pruning · spill · queue",
          question: "时间到底花在哪里？",
        },
        {
          step: "02 · TABLE",
          title: "快照证据",
          tool: "DESCRIBE DETAIL",
          signals: "numFiles · sizeInBytes · partitions · clustering · features",
          question: "当前物理状态是什么？",
        },
        {
          step: "03 · WRITE",
          title: "变化证据",
          tool: "DESCRIBE HISTORY",
          signals: "operation · parameters · files · bytes · job",
          question: "哪次操作造成了变化？",
        },
      ];
      const diagnosisBranches = [
        ["SCAN / LAYOUT", "裁剪不足 · 文件过碎 · keys不匹配", "stats / clustering / compaction"],
        ["STATISTICS", "Delta stats或optimizer stats缺失", "只补对应的一类statistics"],
        ["SQL / COMPUTE", "exploding join · shuffle · spill", "先修query，再考虑compute"],
        ["OUTSIDE TABLE", "queue · fetch · cache · concurrent load", "不要改table layout"],
      ];
      blocks.push(
        <figure
          className="delta-performance-diagnostic-funnel"
          key={`delta-performance-diagnostic-${index}`}
        >
          <div className="diagnostic-symptom">
            <span>OBSERVED SYMPTOM</span>
            <strong>SLA变慢 · scanned bytes上升 · 成本异常</strong>
            <small>先固定query、snapshot、compute与并发口径</small>
          </div>
          <div className="diagnostic-arrow" aria-hidden="true">
            <span>↓</span> 建立三层证据链
          </div>
          <div className="diagnostic-evidence-grid">
            {evidenceLenses.map((lens) => (
              <article key={lens.step}>
                <span>{lens.step}</span>
                <h4>{lens.title}</h4>
                <strong>{lens.tool}</strong>
                <p>{lens.signals}</p>
                <small>{lens.question}</small>
              </article>
            ))}
          </div>
          <div className="diagnostic-arrow" aria-hidden="true">
            <span>↓</span> 证据分流，而不是猜测
          </div>
          <div className="diagnostic-cause-grid">
            {diagnosisBranches.map(([name, evidence, action]) => (
              <article key={name}>
                <span>{name}</span>
                <strong>{evidence}</strong>
                <small>{action}</small>
              </article>
            ))}
          </div>
          <div className="diagnostic-verify-loop">
            <div>
              <span>BASELINE</span>
              <strong>保存原始证据</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>ONE CHANGE</span>
              <strong>只验证一个假设</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>RERUN</span>
              <strong>同一口径复测</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>DECIDE</span>
              <strong>保留、回滚或再诊断</strong>
            </div>
          </div>
          <figcaption>
            Delta表性能诊断漏斗：从SLA症状进入执行、快照与写入证据，再把根因分流到正确的修复路径。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-predictive-maintenance-loop]]") {
      const maintenanceActions = [
        ["OPTIMIZE", "compact / cluster", "files · bytes · scan"],
        ["ANALYZE", "refresh statistics", "staleness · plans"],
        ["VACUUM", "delete old files", "storage · recovery window"],
        ["SKIP", "benefit < cost", "valid cost decision"],
      ];
      blocks.push(
        <figure
          className="delta-predictive-maintenance-loop"
          key={`delta-predictive-maintenance-${index}`}
        >
          <div className="predictive-telemetry">
            <span>TABLE TELEMETRY</span>
            <strong>writes · file layout · query filters · statistics · storage age</strong>
            <small>Unity Catalog managed table · historical workload evidence</small>
          </div>
          <div className="predictive-guardrails">
            <div>
              <span>RETENTION</span>
              <strong>time travel · compliance · legal hold</strong>
            </div>
            <div>
              <span>BUDGET</span>
              <strong>serverless maintenance cost</strong>
            </div>
            <div>
              <span>SLA</span>
              <strong>latency · freshness · concurrency</strong>
            </div>
          </div>
          <div className="predictive-decision-engine">
            <span>COST-AWARE DECISION ENGINE</span>
            <strong>Which operation is worth running now?</strong>
            <small>account → catalog → schema → table inheritance · asynchronous evaluation</small>
          </div>
          <div className="predictive-action-grid">
            {maintenanceActions.map(([action, purpose, evidence]) => (
              <div className={action === "SKIP" ? "is-predictive-skip" : ""} key={action}>
                <span>{action}</span>
                <strong>{purpose}</strong>
                <small>{evidence}</small>
              </div>
            ))}
          </div>
          <div className="predictive-feedback-row">
            <div>
              <span>OPERATION EVIDENCE</span>
              <strong>history · system.storage metrics · skip reason</strong>
            </div>
            <div>
              <span>USER OUTCOME</span>
              <strong>bytes scanned · latency · reliability · cost</strong>
            </div>
            <i aria-hidden="true">↺ feedback to the next decision</i>
          </div>
          <div className="predictive-manual-auto-band">
            <span>ONE OWNER FOR MAINTENANCE</span>
            <strong>Predictive Optimization enabled → remove duplicate scheduled maintenance</strong>
            <small>manual SQL remains useful for experiments, exceptions, and explicitly planned FULL reclustering</small>
          </div>
          <figcaption>
            Predictive Optimization不是固定日历，而是带retention、budget与SLA约束的反馈控制循环。执行或跳过都必须能用成本和用户查询效果解释。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-liquid-clustering-layout]]") {
      const scatteredFiles = [
        ["F1", "c-101…c-302", "07-24…07-26"],
        ["F2", "c-101…c-301", "07-24…07-26"],
        ["F3", "c-102…c-302", "07-25…07-26"],
        ["F4", "c-101…c-201", "07-24…07-26"],
      ];
      const clusteredFiles = [
        ["C1", "c-101", "07-24…07-26", "SCAN"],
        ["C2", "c-102…c-201", "07-24…07-26", "SKIP"],
        ["C3", "c-301", "07-25", "SKIP"],
        ["C4", "c-302", "07-26", "SKIP"],
      ];
      blocks.push(
        <figure
          className="delta-liquid-clustering-layout"
          key={`delta-liquid-clustering-${index}`}
        >
          <div className="liquid-layout-before">
            <div className="liquid-layout-heading">
              <span>BEFORE · OVERLAPPING FILE RANGES</span>
              <strong>customer and date values are scattered</strong>
            </div>
            <div>
              {scatteredFiles.map(([file, customerRange, dateRange]) => (
                <section key={file}>
                  <span>{file}</span>
                  <strong>{customerRange}</strong>
                  <small>{dateRange}</small>
                </section>
              ))}
            </div>
          </div>
          <div className="liquid-policy-engine">
            <span>LAYOUT POLICY</span>
            <strong>CLUSTER BY (customer_id, order_date)</strong>
            <small>new writes + incremental OPTIMIZE · no fixed partition directories</small>
          </div>
          <div className="liquid-layout-after">
            <div className="liquid-layout-heading">
              <span>AFTER · NARROWER STATISTICS</span>
              <strong>predicate customer_id=c-101 can skip unrelated ranges</strong>
            </div>
            <div>
              {clusteredFiles.map(([file, customerRange, dateRange, action]) => (
                <section className={action === "SCAN" ? "is-liquid-scan" : ""} key={file}>
                  <span>{file}</span>
                  <strong>{customerRange}</strong>
                  <small>{dateRange} · {action}</small>
                </section>
              ))}
            </div>
          </div>
          <div className="liquid-key-evolution">
            <div>
              <span>POLICY v1</span>
              <strong>customer_id · order_date</strong>
            </div>
            <i aria-hidden="true">→ ALTER →</i>
            <div>
              <span>POLICY v2</span>
              <strong>region · order_date</strong>
            </div>
            <small>old and new layouts can coexist until later OPTIMIZE converges them</small>
          </div>
          <div className="liquid-auto-feedback">
            <span>CLUSTER BY AUTO</span>
            <strong>query history + data distribution + cost model</strong>
            <small>predictive optimization may select, evolve, or intentionally keep no keys</small>
          </div>
          <div className="liquid-evidence-strip">
            <div>
              <span>CONFIG</span>
              <strong>DESCRIBE DETAIL</strong>
            </div>
            <div>
              <span>MAINTENANCE</span>
              <strong>HISTORY · OPTIMIZE</strong>
            </div>
            <div>
              <span>QUERY</span>
              <strong>files / bytes scanned</strong>
            </div>
            <div>
              <span>COST</span>
              <strong>rewrite vs skipping saved</strong>
            </div>
          </div>
          <figcaption>
            Liquid Clustering通过更窄的file value ranges改善data skipping。它是可演进的layout policy，不是固定目录，也不是ALTER后立刻完成的全表排序。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-occ-validation-race]]") {
      const validationChecks = [
        ["METADATA", "schema · property · protocol"],
        ["READ SET", "files / rows observed"],
        ["WRITE SET", "rows / files modified"],
        ["ISOLATION", "WriteSerializable / Serializable"],
      ];
      blocks.push(
        <figure
          className="delta-occ-validation-race"
          key={`delta-occ-validation-${index}`}
        >
          <div className="occ-shared-snapshot">
            <span>SHARED STARTING SNAPSHOT</span>
            <strong>Delta table v20</strong>
            <small>both writers read a consistent state · no table lock during compute</small>
          </div>
          <div className="occ-writer-lanes">
            <div>
              <span>WRITER A</span>
              <strong>read JP scope → stage changes</strong>
              <small>readVersion=20 · not committed yet</small>
            </div>
            <div>
              <span>WRITER B</span>
              <strong>read CN scope → stage → COMMIT v21</strong>
              <small>B wins the first log version</small>
            </div>
          </div>
          <div className="occ-v050-validation-gate">
            <div className="occ-v050-gate-heading">
              <span>A VALIDATES v20 → v21</span>
              <strong>Can A still produce a safe serial order?</strong>
            </div>
            <div>
              {validationChecks.map(([check, detail]) => (
                <section key={check}>
                  <span>{check}</span>
                  <strong>{detail}</strong>
                </section>
              ))}
            </div>
          </div>
          <div className="occ-validation-results">
            <div className="occ-safe-result">
              <span>NO RELEVANT CONFLICT</span>
              <strong>A commits v22</strong>
              <small>history has a valid serial order</small>
            </div>
            <div className="occ-conflict-result">
              <span>OVERLAP / GLOBAL CHANGE</span>
              <strong>abort staged result · error condition</strong>
              <small>fresh read v21 → recompute → bounded backoff retry</small>
            </div>
          </div>
          <div className="occ-conflict-granularity">
            <div>
              <span>FILE-LEVEL PATH</span>
              <strong>different rows can still share a conflicting file</strong>
            </div>
            <div>
              <span>ROW-LEVEL CONCURRENCY</span>
              <strong>eligible unpartitioned + deletion vectors → finer validation</strong>
            </div>
            <div>
              <span>SAME BUSINESS ROW</span>
              <strong>still conflicts · define one winner</strong>
            </div>
          </div>
          <div className="occ-prevention-strip">
            <span>PREVENTION BEFORE RETRY</span>
            <strong>explicit predicates · disjoint writer scope · shorter transactions · single writer when required</strong>
          </div>
          <figcaption>
            OCC允许并行stage，但最终只有通过validation gate的事务才能成为新version。失败writer必须从fresh snapshot重算，不能复用旧读取结果强行覆盖。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-idempotent-rerun-protocol]]") {
      const rerunStages = [
        ["1", "IMMUTABLE INPUT", "batch key · source range"],
        ["2", "EVENT DEDUP", "event_id winner"],
        ["3", "BUSINESS WINNER", "key + sequence + tie-breaker"],
        ["4", "IDEMPOTENT WRITE", "MERGE guard · txn identity"],
        ["5", "VERIFY + LEDGER", "assertions → SUCCESS"],
      ];
      blocks.push(
        <figure
          className="delta-idempotent-rerun-protocol"
          key={`delta-idempotent-rerun-${index}`}
        >
          <div className="rerun-stage-line">
            {rerunStages.map(([step, title, detail], stageIndex) => (
              <div key={step}>
                <span>{step}</span>
                <strong>{title}</strong>
                <small>{detail}</small>
                {stageIndex < rerunStages.length - 1 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="rerun-failure-loop">
            <span>FAILURE CAN HAPPEN AFTER ANY STAGE</span>
            <strong>propagate error → orchestrator retries the same batch key from immutable input</strong>
            <small>do not advance cursor until target assertions pass</small>
          </div>
          <div className="rerun-dedup-layers">
            <div>
              <span>WITHIN TRANSPORT</span>
              <strong>event_id</strong>
              <small>remove exact delivery retries</small>
            </div>
            <div>
              <span>WITHIN BUSINESS KEY</span>
              <strong>event_ts · sequence · tie-breaker</strong>
              <small>choose one deterministic winner</small>
            </div>
            <div>
              <span>ACROSS TARGET HISTORY</span>
              <strong>MERGE match + newer-event guard</strong>
              <small>block duplicates and state regression</small>
            </div>
          </div>
          <div className="rerun-write-identities">
            <div>
              <span>STATE UPSERT</span>
              <strong>business key + event sequence</strong>
              <small>same input → same latest state</small>
            </div>
            <div>
              <span>DELTA APPEND</span>
              <strong>txnAppId + txnVersion=batchId</strong>
              <small>same transaction identity → duplicate skipped</small>
            </div>
            <div>
              <span>EXTERNAL SINK</span>
              <strong>idempotency key + receipt</strong>
              <small>end-to-end guarantee must be designed</small>
            </div>
          </div>
          <div className="rerun-success-evidence">
            <span>SUCCESS EVIDENCE</span>
            <strong>input count · unique events · winners · output count · target version · rejected rows</strong>
            <small>ledger status changes to SUCCESS only after business invariants pass</small>
          </div>
          <figcaption>
            可重跑并不是“失败时再试一次”，而是一套稳定输入、确定计算、幂等写入和成功证据组成的协议。任何阶段失败都能安全回到同一batch起点。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-change-data-feed-pipeline]]") {
      const changeEvents = [
        ["insert", "new row", "upsert / append"],
        ["update_preimage", "before", "audit / diff"],
        ["update_postimage", "after", "upsert latest"],
        ["delete", "removed row", "delete / tombstone"],
      ];
      blocks.push(
        <figure
          className="delta-change-data-feed-pipeline"
          key={`delta-change-data-feed-${index}`}
        >
          <div className="cdf-source-commits">
            <span>DELTA SOURCE COMMITS</span>
            <div>
              <strong>v1 WRITE</strong>
              <i aria-hidden="true">→</i>
              <strong>v2 UPDATE</strong>
              <i aria-hidden="true">→</i>
              <strong>v3 DELETE</strong>
              <i aria-hidden="true">→</i>
              <strong>v4 WRITE</strong>
            </div>
            <small>each version is an atomic change batch</small>
          </div>
          <div className="cdf-api-gate">
            <span>CHANGE DATA FEED API</span>
            <strong>table_changes() · readChangeFeed=true</strong>
            <small>_commit_version · _commit_timestamp · _change_type</small>
          </div>
          <div className="cdf-event-grid">
            {changeEvents.map(([type, image, action]) => (
              <div className={`cdf-event-${type.replace("_", "-")}`} key={type}>
                <span>{type}</span>
                <strong>{image}</strong>
                <small>{action}</small>
              </div>
            ))}
          </div>
          <div className="cdf-progress-paths">
            <div>
              <span>BATCH CURSOR</span>
              <strong>last_successful_version + 1 → high watermark</strong>
              <small>commit target first · advance cursor after success</small>
            </div>
            <div>
              <span>STREAM CHECKPOINT</span>
              <strong>startingVersion once → checkpoint thereafter</strong>
              <small>initial snapshot is insert unless an explicit start is chosen</small>
            </div>
          </div>
          <div className="cdf-consumer-grid">
            <div>
              <span>AUDIT HISTORY</span>
              <strong>keep all four event types</strong>
            </div>
            <div>
              <span>LATEST STATE</span>
              <strong>upsert after-image · apply delete</strong>
            </div>
            <div>
              <span>EXTERNAL SINK</span>
              <strong>idempotency key · retries</strong>
            </div>
          </div>
          <div className="cdf-retention-warning">
            <span>TRANSIENT FEED</span>
            <strong>retention expires versions · schema changes can split readable ranges</strong>
            <small>archive changes continuously when permanent row history is required</small>
          </div>
          <figcaption>
            CDF把每个Delta commit展开为行级事件。可靠消费者既要理解事件语义，也要把version progress与目标写入放进可重放的提交协议。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-time-travel-restore-timeline]]") {
      const historyVersions = [
        ["v0", "CREATE", "schema only"],
        ["v1", "WRITE", "3 rows · qty 17"],
        ["v2", "UPDATE", "3 rows · qty 11"],
        ["v3", "DELETE", "2 rows · qty 6"],
        ["v4", "RESTORE v1", "3 rows · qty 17"],
      ];
      blocks.push(
        <figure
          className="delta-time-travel-restore-timeline"
          key={`delta-time-travel-restore-${index}`}
        >
          <div className="delta-history-version-line">
            {historyVersions.map(([version, operation, state], versionIndex) => (
              <div className={version === "v4" ? "is-restored-version" : ""} key={version}>
                <span>{version}</span>
                <strong>{operation}</strong>
                <small>{state}</small>
                {versionIndex < historyVersions.length - 1 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="delta-history-two-lenses">
            <div className="time-travel-read-lens">
              <span>READ LENS · NO COMMIT</span>
              <strong>SELECT … VERSION AS OF 1</strong>
              <small>investigate v1 while latest stays v3</small>
            </div>
            <div className="restore-write-lens">
              <span>RECOVERY WRITE · NEW COMMIT</span>
              <strong>RESTORE … TO VERSION AS OF 1</strong>
              <small>v1 file set becomes new latest v4</small>
            </div>
          </div>
          <div className="delta-history-retention-rails">
            <div>
              <span>LOG RETENTION</span>
              <strong>history actions · default 30 days</strong>
            </div>
            <div className="retention-intersection">
              <span>TIME TRAVEL WINDOW</span>
              <strong>log ∩ required data files</strong>
            </div>
            <div>
              <span>DELETED FILE RETENTION</span>
              <strong>VACUUM boundary · default 7 days</strong>
            </div>
          </div>
          <div className="delta-restore-consumer-warning">
            <span>STREAMING CONSUMERS</span>
            <strong>RESTORE file actions carry dataChange=true</strong>
            <small>pause · deduplicate · validate checkpoints · prevent duplicate outputs</small>
          </div>
          <div className="delta-history-evidence-row">
            <div>
              <span>BEFORE</span>
              <strong>freeze writer · save current version</strong>
            </div>
            <div>
              <span>VERIFY</span>
              <strong>rows · sums · keys · samples</strong>
            </div>
            <div>
              <span>AFTER</span>
              <strong>history · metrics · consumer SLA</strong>
            </div>
          </div>
          <figcaption>
            Time travel只是切换读取镜头；RESTORE会提交新的latest。可恢复窗口取决于transaction log与目标
            snapshot所需data files的共同保留时间。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-schema-contract-gate-diagram]]") {
      const contractChecks = [
        ["列名", "column exists"],
        ["类型", "safe compatibility"],
        ["可空性", "NOT NULL"],
        ["值规则", "CHECK / quality"],
      ];
      const evolutionPaths = [
        ["ADD COLUMN", "metadata commit", "旧行读取为 NULL"],
        ["RENAME / DROP", "DDL + column mapping", "检查消费者引用"],
        ["TYPE WIDENING", "table feature", "验证客户端兼容"],
        ["OTHER TYPE", "full rewrite", "profile + overwriteSchema"],
      ];
      blocks.push(
        <figure
          className="delta-schema-contract-gate-diagram"
          key={`delta-schema-contract-gate-${index}`}
        >
          <div className="schema-contract-input">
            <span>INCOMING SCHEMA</span>
            <strong>order_id · amount · order_date · currency</strong>
            <small>producer change request · source evidence</small>
          </div>
          <div className="schema-contract-gate">
            <div className="schema-gate-title">
              <span>WRITE CONTRACT GATE</span>
              <strong>Schema Enforcement</strong>
              <small>compare against current Delta metadata</small>
            </div>
            <div className="schema-gate-checks">
              {contractChecks.map(([label, detail]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="schema-contract-branches">
            <div className="schema-reject-branch">
              <span>未批准 / 不兼容</span>
              <strong>ERROR · no new snapshot</strong>
              <small>DELTA_METADATA_MISMATCH · quarantine · review</small>
            </div>
            <div className="schema-approve-branch">
              <span>已批准的结构变化</span>
              <strong>Schema Evolution</strong>
              <small>choose the smallest compatible path</small>
            </div>
          </div>
          <div className="schema-evolution-paths">
            {evolutionPaths.map(([change, mechanism, consequence]) => (
              <div key={change}>
                <span>{change}</span>
                <strong>{mechanism}</strong>
                <small>{consequence}</small>
              </div>
            ))}
          </div>
          <div className="schema-contract-evidence">
            <div>
              <span>METADATA</span>
              <strong>DESCRIBE TABLE · HISTORY</strong>
            </div>
            <div>
              <span>DATA</span>
              <strong>NULL rate · backfill · constraints</strong>
            </div>
            <div>
              <span>CONSUMERS</span>
              <strong>explicit columns · tests · stream restart</strong>
            </div>
          </div>
          <figcaption>
            写入守门负责拒绝意外变化；演进只处理已批准的 contract change。每条路径都必须同时验收
            metadata、数据质量与消费者兼容性。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-dml-merge-router-diagram]]") {
      const dmlIntents = [
        ["INSERT", "new rows", "append"],
        ["UPDATE", "matched target", "change columns"],
        ["DELETE", "matched target", "logical remove"],
      ];
      blocks.push(
        <figure
          className="delta-dml-merge-router-diagram"
          key={`delta-dml-merge-router-${index}`}
        >
          <div className="dml-intent-grid">
            {dmlIntents.map(([statement, scope, action]) => (
              <div key={statement}>
                <span>{statement}</span>
                <strong>{scope}</strong>
                <small>{action} · one atomic commit</small>
              </div>
            ))}
          </div>
          <div className="merge-source-dedup">
            <div>
              <span>SOURCE RAW</span>
              <strong>o-101@10:30 · o-101@11:00 · o-102 · o-105</strong>
              <small>4 rows · 3 distinct business keys</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>ROW_NUMBER WINNER</span>
              <strong>PARTITION BY key ORDER BY event_ts DESC</strong>
              <small>one deterministic source row per target key</small>
            </div>
          </div>
          <div className="merge-router-core">
            <div className="merge-on-gate">
              <span>MERGE ON</span>
              <strong>t.order_id = s.order_id</strong>
              <small>match relation · not an automatic deduplicator</small>
            </div>
            <div className="merge-route-grid">
              {[
                ["MATCHED + delete", "DELETE", "o-102 removed"],
                ["MATCHED + newer", "UPDATE", "o-101 → 110.00"],
                ["NOT MATCHED + upsert", "INSERT", "o-105 → 70.00"],
                ["NO CLAUSE / old event", "KEEP", "target unchanged"],
              ].map(([condition, action, result]) => (
                <div key={condition}>
                  <span>{condition}</span>
                  <strong>{action}</strong>
                  <small>{result}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="merge-not-by-source-warning">
            <span>WHEN NOT MATCHED BY SOURCE</span>
            <strong>target row has no source match</strong>
            <small>use bounded date/scope condition; an incremental source is not a full snapshot</small>
          </div>
          <div className="merge-target-evidence">
            <div>
              <span>FINAL KEYS</span>
              <strong>o-101 · o-104 · o-105</strong>
            </div>
            <div>
              <span>BUSINESS ASSERTION</span>
              <strong>3 rows · amount 210.00</strong>
            </div>
            <div>
              <span>RERUN</span>
              <strong>same state · event_ts guard</strong>
            </div>
            <div>
              <span>HISTORY</span>
              <strong>operationMetrics · MERGE</strong>
            </div>
          </div>
          <figcaption>
            MERGE前先把source压成每个key一个winner，再按匹配关系和有序clauses路由。
            最终用业务断言与history共同验收，而不是猜测底层重写了多少文件。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-acid-concurrency-diagram]]") {
      const acidGuarantees = [
        ["A", "ATOMIC", "all actions or none"],
        ["C", "CONSISTENT", "declared rules hold"],
        ["I", "ISOLATED", "stable snapshot + conflicts"],
        ["D", "DURABLE", "committed version persists"],
      ];
      blocks.push(
        <figure
          className="delta-acid-concurrency-diagram"
          key={`delta-acid-concurrency-${index}`}
        >
          <div className="acid-guarantee-grid">
            {acidGuarantees.map(([letter, label, detail]) => (
              <div key={letter}>
                <b>{letter}</b>
                <span>{label}</span>
                <strong>{detail}</strong>
              </div>
            ))}
          </div>
          <div className="acid-reader-snapshot">
            <span>READER</span>
            <strong>snapshot v7 stays stable</strong>
            <div>
              <b>f1</b>
              <b>f2</b>
              <b>f3</b>
            </div>
            <small>v8 commit does not mix into this scan</small>
          </div>
          <div className="occ-writer-lanes">
            <div>
              <span>WRITER A</span>
              <div>
                <strong>READ v7</strong>
                <i aria-hidden="true">→</i>
                <strong>STAGE a*</strong>
                <i aria-hidden="true">→</i>
                <strong>VALIDATE ✓</strong>
                <i aria-hidden="true">→</i>
                <strong>COMMIT v8</strong>
              </div>
            </div>
            <div>
              <span>WRITER B</span>
              <div>
                <strong>READ v7</strong>
                <i aria-hidden="true">→</i>
                <strong>STAGE b*</strong>
                <i aria-hidden="true">→</i>
                <strong className="occ-conflict">CONFLICT ×</strong>
                <i aria-hidden="true">↻</i>
                <strong>FRESH v8 → v9</strong>
              </div>
            </div>
          </div>
          <div className="occ-validation-gate">
            <span>VALIDATE-AND-COMMIT GATE</span>
            <strong>new commits since readVersion overlap my read/write set?</strong>
            <div>
              <b>NO → atomic next version</b>
              <b>YES → fail safely · recompute · bounded retry</b>
            </div>
          </div>
          <div className="acid-isolation-band">
            <div>
              <span>DEFAULT</span>
              <strong>WriteSerializable</strong>
              <small>writes serializable · balanced concurrency</small>
            </div>
            <div>
              <span>STRONGEST</span>
              <strong>Serializable</strong>
              <small>reads + writes follow history order</small>
            </div>
            <div>
              <span>REDUCE CONFLICTS</span>
              <strong>row-level concurrency</strong>
              <small>requires eligible table + operation</small>
            </div>
          </div>
          <figcaption>
            OCC不先锁整表：writers并行准备，在commit gate验证冲突。
            冲突writer必须基于fresh snapshot重算；reader始终保持自己的完整snapshot。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[delta-transaction-log-snapshot-diagram]]") {
      const commitVersions = [
        ["v0", "protocol · metaData · add f1 · add f2"],
        ["v1", "commitInfo · add f3"],
        ["v2", "commitInfo · remove f2 · add f4"],
      ];
      blocks.push(
        <figure
          className="delta-transaction-log-snapshot-diagram"
          key={`delta-transaction-log-snapshot-${index}`}
        >
          <div className="delta-writer-stage">
            <div>
              <span>WRITER</span>
              <strong>write candidate Parquet first</strong>
              <small>f3.parquet · f4.parquet</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>ATOMIC COMMIT</span>
              <strong>publish next version</strong>
              <small>actions become visible together</small>
            </div>
          </div>
          <div className="delta-log-timeline">
            <span>_delta_log / CONTIGUOUS VERSIONS</span>
            <div>
              {commitVersions.map(([version, actions], versionIndex) => (
                <div key={version}>
                  <b>{version}</b>
                  <strong>{actions}</strong>
                  <small>
                    {String(versionIndex).padStart(20, "0")}.json
                  </small>
                </div>
              ))}
            </div>
          </div>
          <div className="delta-replay-path">
            <div>
              <span>CHECKPOINT ≤ TARGET</span>
              <strong>compact table state</strong>
              <small>Parquet checkpoint · not backup</small>
            </div>
            <i aria-hidden="true">+</i>
            <div>
              <span>FOLLOWING COMMITS</span>
              <strong>replay JSON in version order</strong>
              <small>reconcile metadata · protocol · files</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>SNAPSHOT v2</span>
              <strong>one consistent logical state</strong>
              <small>reader never sees staged files</small>
            </div>
          </div>
          <div className="delta-file-state">
            <div>
              <span>ACTIVE FILE SET · SCAN</span>
              <strong>f1</strong>
              <strong>f3</strong>
              <strong>f4</strong>
            </div>
            <div>
              <span>TOMBSTONE · NO NORMAL SCAN</span>
              <strong>f2</strong>
              <small>physical file may remain for retention/time travel</small>
            </div>
          </div>
          <div className="delta-reader-snapshots">
            <div>
              <span>READER A</span>
              <strong>snapshot v1 → f1 · f2 · f3</strong>
            </div>
            <div>
              <span>READER B</span>
              <strong>snapshot v2 → f1 · f3 · f4</strong>
            </div>
          </div>
          <figcaption>
            Writer先写候选data files，再原子发布commit。Reader通过checkpoint与后续actions
            重建目标snapshot，只扫描active files；旧reader仍可保持自己的完整版本视图。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-debugging-funnel-diagram]]") {
      const debugLayers = [
        ["API", "types · arguments"],
        ["ANALYSIS", "schema · names · syntax"],
        ["EXECUTION", "data · UDF · ANSI"],
        ["DISTRIBUTED", "task · shuffle · memory"],
      ];
      const funnelSteps = [
        ["CLASSIFY", "errorClass + SQLSTATE", "哪一层失败？"],
        ["REPRODUCE", "3–10 rows + fixed schema", "哪条输入触发？"],
        ["EXPLAIN", "plan + action boundary", "哪个算子暴露？"],
        ["PROVE", "assertions + runtime evidence", "修复是否成立？"],
      ];
      blocks.push(
        <figure
          className="spark-debugging-funnel-diagram"
          key={`spark-debugging-funnel-${index}`}
        >
          <div className="debug-failure-signal">
            <span>RAW SIGNAL</span>
            <strong>“Spark job failed” + long mixed stack trace</strong>
            <small>先保存run、输入批次、代码版本与触发action</small>
          </div>
          <div className="debug-layer-grid">
            {debugLayers.map(([layer, clues]) => (
              <div key={layer}>
                <span>{layer}</span>
                <strong>{clues}</strong>
              </div>
            ))}
          </div>
          <div className="debug-funnel">
            {funnelSteps.map(([step, evidence, question], stepIndex) => (
              <div
                key={step}
                style={{ width: `${100 - stepIndex * 12}%` }}
              >
                <b>{stepIndex + 1}</b>
                <span>{step}</span>
                <strong>{evidence}</strong>
                <small>{question}</small>
              </div>
            ))}
          </div>
          <div className="debug-observability-split">
            <div>
              <span>FREE EDITION · SERVERLESS</span>
              <strong>See performance → Query Insights → Query Profile</strong>
              <small>client logs · Query History · quality counters</small>
            </div>
            <div>
              <span>CLASSIC COMPUTE</span>
              <strong>Spark UI → Stage → Task → Executor</strong>
              <small>Driver logs · Executor logs · Event log</small>
            </div>
          </div>
          <div className="debug-closure-loop">
            {[
              ["FIX", "local semantics"],
              ["QUARANTINE", "bad rows visible"],
              ["TEST", "regression guard"],
              ["MONITOR", "same signal alerts"],
            ].map(([stage, result], stageIndex) => (
              <div key={stage}>
                <span>{stage}</span>
                <strong>{result}</strong>
                {stageIndex < 3 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <figcaption>
            从模糊失败信号开始，先分层、再最小复现，最后用运行证据和回归断言收口。
            Serverless与classic compute的观测入口不同，但调试推理链相同。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-sql-pyspark-interop-diagram]]") {
      blocks.push(
        <figure
          className="spark-sql-pyspark-interop-diagram"
          key={`spark-sql-pyspark-interop-${index}`}
        >
          <div className="interop-entry-lanes">
            <div className="interop-lane interop-sql-lane">
              <span>SQL TEXT</span>
              <strong>SELECT · WHERE · GROUP BY</strong>
              <small>分析师友好 · 声明式 · 适合查询表达</small>
            </div>
            <div className="interop-lane interop-pyspark-lane">
              <span>PYSPARK DATAFRAME API</span>
              <strong>filter · groupBy · agg</strong>
              <small>工程组合 · 函数封装 · 适合复杂控制流</small>
            </div>
          </div>
          <div className="interop-temp-view-bridge">
            <span>SESSION BRIDGE</span>
            <strong>createOrReplaceTempView(&quot;orders&quot;)</strong>
            <small>把DataFrame注册为当前SparkSession可查询的临时关系，不复制数据</small>
          </div>
          <div className="interop-plan-pipeline">
            {[
              ["LOGICAL PLAN", "两种入口汇合"],
              ["ANALYZED PLAN", "解析列名与类型"],
              ["CATALYST", "规则与代价优化"],
              ["PHYSICAL PLAN", "同一Spark执行引擎"],
            ].map(([stage, detail], stageIndex) => (
              <div key={stage}>
                <b>{stageIndex + 1}</b>
                <span>{stage}</span>
                <strong>{detail}</strong>
                {stageIndex < 3 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="interop-parameter-guard">
            <div>
              <span>VALUE</span>
              <strong>WHERE status = :status</strong>
              <small>Parameter Marker安全绑定值</small>
            </div>
            <div>
              <span>OBJECT NAME</span>
              <strong>IDENTIFIER(:table_name)</strong>
              <small>对象名需要IDENTIFIER，不要拼接不可信字符串</small>
            </div>
          </div>
          <div className="interop-equivalence-evidence">
            {[
              ["ROWS", "assertDataFrameEqual"],
              ["SCHEMA", "assertSchemaEqual"],
              ["PLAN", "explain()对照"],
            ].map(([label, evidence]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{evidence}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            SQL与PySpark只是结构化查询的两种表达入口；最终都会形成执行计划。
            Temp View负责会话内互通，Parameter Markers负责把代码结构与运行值分开。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[pyspark-testing-pyramid-diagram]]") {
      const testLayers = [
        ["E2E", "few · jobs + permissions"],
        ["INTEGRATION", "Delta / UC boundaries"],
        ["DATAFRAME UNIT", "transform + tiny DataFrame"],
        ["PURE UNIT", "many · Python rules"],
      ];
      blocks.push(
        <figure
          className="pyspark-testing-pyramid-diagram"
          key={`pyspark-testing-pyramid-${index}`}
        >
          <div className="testing-pyramid">
            {testLayers.map(([layer, detail], layerIndex) => (
              <div
                key={layer}
                style={{ width: `${52 + layerIndex * 16}%` }}
              >
                <span>{layer}</span>
                <strong>{detail}</strong>
              </div>
            ))}
          </div>
          <div className="testing-aaa-flow">
            {[
              ["ARRANGE", "3–10 explicit rows", "schema · boundaries · NULL"],
              ["ACT", "transform(source)", "no production I/O"],
              ["ASSERT", "actual vs expected", "rows · schema · invariants"],
            ].map(([step, action, evidence], stepIndex) => (
              <div key={step}>
                <b>{stepIndex + 1}</b>
                <span>{step}</span>
                <strong>{action}</strong>
                <small>{evidence}</small>
                {stepIndex < 2 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="testing-contract-evidence">
            {[
              ["ROWS", "assertDataFrameEqual"],
              ["SCHEMA", "assertSchemaEqual"],
              ["INVARIANTS", "keys · NULL · totals"],
              ["FAILURE", "readable diff"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="testing-isolation-band">
            <span>ISOLATION</span>
            <strong>fixture SparkSession · fixed timezone/seed · no production tables</strong>
            <small>integration tests use unique temporary assets and reliable cleanup</small>
          </div>
          <figcaption>
            大量快速unit tests验证规则，少量integration/E2E确认平台边界。
            每个DataFrame测试用AAA结构把输入、转换和三类证据清楚分开。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-cache-lifecycle-diagram]]") {
      const cacheBlocks = Array.from({ length: 8 }, (_, block) => `b${block}`);
      blocks.push(
        <figure
          className="spark-cache-lifecycle-diagram"
          key={`spark-cache-lifecycle-${index}`}
        >
          <div className="cache-expensive-lineage">
            {[
              ["SCAN", "Delta / Parquet"],
              ["JOIN", "shared dimensions"],
              ["AGG", "expensive shared result"],
            ].map(([operator, detail], operatorIndex) => (
              <div key={operator}>
                <span>{operator}</span>
                <strong>{detail}</strong>
                {operatorIndex < 2 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="cache-materialize-node">
            <span>FIRST ACTION · MATERIALIZE</span>
            <strong>compute lineage + store partition blocks</strong>
            <div>
              {cacheBlocks.map((block) => (
                <b key={block}>{block}</b>
              ))}
            </div>
            <small>StorageLevel: MEMORY_AND_DISK_DESER</small>
          </div>
          <div className="cache-reuse-branches">
            {[
              ["QUALITY", "count · NULL · keys"],
              ["SUMMARY", "grouped metrics"],
              ["SAMPLE", "top anomalies"],
            ].map(([consumer, workload]) => (
              <div key={consumer}>
                <span>InMemoryTableScan</span>
                <strong>{consumer}</strong>
                <small>{workload}</small>
              </div>
            ))}
          </div>
          <div className="cache-unpersist-node">
            <span>LAST CONSUMER FINISHED</span>
            <strong>unpersist(blocking=True)</strong>
            <small>release memory/disk blocks · future action recomputes lineage</small>
          </div>
          <div className="cache-decision-compare">
            <div>
              <span>GOOD CACHE</span>
              <strong>expensive + reused + fits + bounded</strong>
            </div>
            <div>
              <span>NO CACHE</span>
              <strong>one action · cheap scan · huge result</strong>
            </div>
          </div>
          <figcaption>
            Cache的收益来自后续消费者，而不是cache调用本身。
            第一个action负责填充，最后一个消费者负责释放，整个生命周期都应有计划和资源证据。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-plan-runtime-diagnostics-diagram]]") {
      const planLayers = [
        ["PARSED", "unresolved syntax tree"],
        ["ANALYZED", "typed catalog objects"],
        ["OPTIMIZED", "Catalyst relational rewrites"],
        ["PHYSICAL", "operators + exchanges"],
      ];
      blocks.push(
        <figure
          className="spark-plan-runtime-diagnostics-diagram"
          key={`spark-plan-runtime-diagnostics-${index}`}
        >
          <div className="plan-layer-stack">
            {planLayers.map(([label, value], layerIndex) => (
              <div key={label}>
                <b>{layerIndex + 1}</b>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="physical-operator-flow">
            {[
              ["SCAN", "columns · filters"],
              ["FILTER", "rows ↓"],
              ["BROADCAST JOIN", "small side → all"],
              ["EXCHANGE", "group keys"],
              ["HASH AGG", "partial → final"],
            ].map(([operator, detail], operatorIndex) => (
              <div key={operator}>
                <span>{operator}</span>
                <strong>{detail}</strong>
                {operatorIndex < 4 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="plan-action-bridge">
            <span>ACTION</span>
            <strong>count · collect · write</strong>
            <small>lazy plan becomes jobs → stages → tasks</small>
          </div>
          <div className="runtime-stage-grid">
            <div>
              <span>STAGE 1 · SCAN</span>
              <strong>input 24 GB</strong>
              <small>128 tasks · balanced</small>
            </div>
            <div className="longest-stage">
              <span>STAGE 2 · EXCHANGE/JOIN</span>
              <strong>shuffle read 18 GB</strong>
              <small>p50 2s · max 160s · spill</small>
            </div>
            <div>
              <span>STAGE 3 · AGG</span>
              <strong>output 110 rows</strong>
              <small>8 tasks · healthy</small>
            </div>
          </div>
          <div className="runtime-task-distribution">
            <span>TASK DURATION DISTRIBUTION</span>
            <div>
              {[18, 20, 19, 22, 21, 20, 23, 100].map((height, task) => (
                <i
                  className={task === 7 ? "task-outlier" : ""}
                  key={task}
                  style={{ height: `${height}%` }}
                >
                  <b>t{task}</b>
                </i>
              ))}
            </div>
            <strong>outlier task → inspect bytes · rows · spill · GC</strong>
          </div>
          <div className="diagnostic-feedback-loop">
            <div>
              <span>MAP BACK</span>
              <strong>Stage 2 → Exchange / Join</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>HYPOTHESIS</span>
              <strong>hot key or wrong join grain</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>ONE CHANGE</span>
              <strong>fix · rerun · compare</strong>
            </div>
          </div>
          <figcaption>
            Explain提供算子地图；运行时页面揭示最长stage与异常task。
            将runtime证据映射回physical operator，才能提出可验证的根因假设。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-partition-file-layout-diagram]]") {
      const executionPartitions = Array.from({ length: 8 }, (_, partition) => `p${partition}`);
      const smallFiles = Array.from({ length: 12 }, (_, file) => `f${file + 1}`);
      blocks.push(
        <figure
          className="spark-partition-file-layout-diagram"
          key={`spark-partition-file-layout-${index}`}
        >
          <div className="partition-execution-head">
            <div>
              <span>EXECUTION PARTITIONS</span>
              <strong>8 partitions</strong>
              <small>current DataFrame layout</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>STAGE TASKS</span>
              <strong>up to 8 concurrent tasks</strong>
              <small>bounded by available compute</small>
            </div>
          </div>
          <div className="partition-task-grid">
            {executionPartitions.map((partition) => (
              <div key={partition}>
                <span>{partition}</span>
                <strong>task {partition.slice(1)}</strong>
              </div>
            ))}
          </div>
          <div className="partition-write-fanout">
            <span>OVER-PARTITIONED WRITE</span>
            <strong>tasks × static directories → many tiny files</strong>
            <small>high-cardinality keys and frequent micro-batches multiply file count</small>
          </div>
          <div className="small-file-grid" aria-label="小文件布局示意">
            {smallFiles.map((file, fileIndex) => (
              <div className={fileIndex % 4 === 0 ? "new-directory" : ""} key={file}>
                <span>{file}</span>
                <small>{12 + (fileIndex % 4) * 4} KB</small>
              </div>
            ))}
          </div>
          <div className="file-layout-remedy">
            <div>
              <span>WRITE LAYOUT</span>
              <strong>optimized writes</strong>
            </div>
            <i aria-hidden="true">＋</i>
            <div>
              <span>MAINTENANCE</span>
              <strong>compaction / OPTIMIZE</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div className="large-files">
              {["128 MB", "116 MB", "132 MB"].map((size) => (
                <b key={size}>{size}</b>
              ))}
            </div>
          </div>
          <div className="partition-layout-evidence">
            {[
              ["PARALLELISM", "tasks · bytes/task"],
              ["DISTRIBUTION", "min · median · max"],
              ["FILES", "numFiles · avg size"],
              ["QUERY", "planning · scan time"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            计算分区用于并行执行，文件布局用于长期读取。合并小文件应在保持计算并行度的同时改善存储，
            而不是把所有任务压进 coalesce(1)。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-read-write-contract-diagram]]") {
      const sourceFormats = [
        ["CSV", "exchange · text"],
        ["JSON", "nested · semi-structured"],
        ["PARQUET", "columnar · schema footer"],
      ];
      blocks.push(
        <figure
          className="spark-read-write-contract-diagram"
          key={`spark-read-write-contract-${index}`}
        >
          <div className="read-write-source-formats">
            {sourceFormats.map(([format, purpose]) => (
              <div key={format}>
                <span>{format}</span>
                <strong>{purpose}</strong>
              </div>
            ))}
          </div>
          <i className="read-write-arrow" aria-hidden="true">↓</i>
          <div className="read-contract-gate">
            <span>READ CONTRACT · DataFrameReader</span>
            <div>
              {[
                ["FORMAT", "csv / json / parquet"],
                ["SCHEMA", "names · types · nullable"],
                ["OPTIONS", "header · date · delimiter"],
                ["FAILURE", "fail · rescue · quarantine"],
              ].map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="read-write-dataframe">
            <span>VALIDATED DATAFRAME</span>
            <strong>typed rows + source metadata</strong>
            <small>transform · quality rules · business grain</small>
          </div>
          <div className="write-contract-gate">
            <span>WRITE CONTRACT · DataFrameWriter</span>
            <div>
              {[
                ["TARGET", "path or catalog.schema.table"],
                ["MODE", "error · append · overwrite"],
                ["LAYOUT", "partition · compression · files"],
                ["ASSERT", "count · schema · keys · totals"],
              ].map(([label, value]) => (
                <div key={label}>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="read-write-targets">
            <div>
              <span>PARQUET FILES</span>
              <strong>columnar exchange</strong>
              <small>files only</small>
            </div>
            <i aria-hidden="true">or</i>
            <div>
              <span>DELTA TABLE</span>
              <strong>Parquet + transaction log</strong>
              <small>ACID · schema · versions</small>
            </div>
          </div>
          <figcaption>
            读写成功不等于数据可交付：入口契约、提交意图和结果断言缺一不可。
            Delta 在 Parquet 数据文件之上增加事务表语义。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-function-choice-diagram]]") {
      const functionChoices = [
        ["1", "DIRECT BUILT-IN", "regexp_replace · from_json", "Spark understands semantics"],
        ["2", "COMPOSE COLUMNS", "when · transform · coalesce", "one expression graph"],
        ["3", "SQL FUNCTION", "named SQL expression", "reuse + governance"],
        ["4", "PANDAS / ARROW", "vector or efficient transfer", "measure batch + types"],
        ["5", "SCALAR PYTHON UDF", "custom row logic", "last justified option"],
      ];
      blocks.push(
        <figure
          className="spark-function-choice-diagram"
          key={`spark-function-choice-${index}`}
        >
          <div className="function-choice-native">
            <div>
              <span>NATIVE EXPRESSION GRAPH</span>
              <strong>trim → lower → regexp_replace</strong>
              <small>Catalyst sees functions, inputs and types</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>SPARK EXECUTION</span>
              <strong>Project · Filter · Aggregate</strong>
              <small>no unnecessary Python boundary</small>
            </div>
          </div>
          <div className="function-choice-ladder">
            {functionChoices.map(([step, label, example, evidence], choiceIndex) => (
              <div
                className={choiceIndex < 3 ? "native-choice" : "python-choice"}
                key={step}
              >
                <b>{step}</b>
                <span>{label}</span>
                <strong>{example}</strong>
                <small>{evidence}</small>
              </div>
            ))}
          </div>
          <div className="function-choice-boundary">
            <span>SPARK / PYTHON BOUNDARY</span>
            <strong>serialization · worker · dependencies · NULL contract</strong>
            <small>Cross only when native expressions cannot express the requirement</small>
          </div>
          <div className="function-choice-evidence">
            {[
              ["CORRECTNESS", "eqNullSafe · edge cases"],
              ["PLAN", "native expressions · Python evaluation"],
              ["PERFORMANCE", "representative benchmark"],
              ["OPERATIONS", "types · versions · failures"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            选择从 Spark 能理解的表达式开始。越向右，执行边界和运维责任越多；
            是否跨入 Python 必须由功能缺口与测量证据共同决定。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-window-spec-diagram]]") {
      const customerA = [
        ["A1", "10:00 · t1", "10"],
        ["A2", "10:00 · t2", "20"],
        ["A3", "11:00 · t3", "30"],
        ["A4", "12:00 · t4", "40"],
      ];
      const customerB = [
        ["B1", "09:00 · t5", "50"],
        ["B2", "13:00 · t6", "60"],
      ];
      blocks.push(
        <figure
          className="spark-window-spec-diagram"
          key={`spark-window-spec-${index}`}
        >
          <div className="window-spec-head">
            {[
              ["PARTITION", "customer_id"],
              ["ORDER", "event_ts, txn_id"],
              ["FRAME", "UNBOUNDED PRECEDING → CURRENT ROW"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="window-customer-lanes">
            <div>
              <span>CUSTOMER A · logical partition</span>
              <div>
                {customerA.map(([row, order, amount], rowIndex) => (
                  <div className={rowIndex <= 2 ? "in-frame" : ""} key={row}>
                    <b>{row}</b>
                    <small>{order}</small>
                    <strong>{amount}</strong>
                    {rowIndex === 2 ? <i>CURRENT</i> : null}
                  </div>
                ))}
              </div>
              <p>frame(A3) = A1 + A2 + A3 · lag(A3) = A2</p>
            </div>
            <div>
              <span>CUSTOMER B · isolated partition</span>
              <div>
                {customerB.map(([row, order, amount]) => (
                  <div key={row}>
                    <b>{row}</b>
                    <small>{order}</small>
                    <strong>{amount}</strong>
                  </div>
                ))}
              </div>
              <p>B rows never enter A frame</p>
            </div>
          </div>
          <div className="window-functions-band">
            {[
              ["ROW_NUMBER", "1 · 2 · 3 · 4"],
              ["LAG", "NULL · 10 · 20 · 30"],
              ["RUNNING SUM", "10 · 30 · 60 · 100"],
              ["PLAN", "Exchange → Sort → Window"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            Partition 决定谁可互相看到，Order 决定组内先后，Frame 决定聚合窗口范围。
            相同时间的 A1/A2 由 txn_id 打破并列，保证重跑可重复。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-data-skew-diagram]]") {
      const saltedBuckets = Array.from({ length: 8 }, (_, bucket) => `HOT#${bucket}`);
      blocks.push(
        <figure
          className="spark-data-skew-diagram"
          key={`spark-data-skew-${index}`}
        >
          <div className="skew-distribution-head">
            <span>BEFORE · HASH(customer_key)</span>
            <strong>90% HOT → one reduce partition</strong>
            <small>更多 partitions 仍不会自动拆开同一 key</small>
          </div>
          <div className="skew-partition-bars" aria-label="倾斜分区示意">
            {[12, 9, 90, 11, 8, 10, 7, 13].map((height, partition) => (
              <div key={partition}>
                <span style={{ height: `${height}%` }}></span>
                <small>p{partition}</small>
                {partition === 2 ? <b>HOT</b> : null}
              </div>
            ))}
          </div>
          <div className="skew-salt-node">
            <span>DETERMINISTIC SALT</span>
            <strong>pmod(xxhash64(event_id), 8)</strong>
            <small>只拆热点；可重复、可测试</small>
          </div>
          <div className="skew-salted-grid">
            {saltedBuckets.map((bucket) => (
              <div key={bucket}>
                <span>{bucket}</span>
                <strong>≈ 1 / 8 HOT</strong>
              </div>
            ))}
          </div>
          <div className="skew-two-stage-flow">
            <div>
              <span>STAGE 1</span>
              <strong>groupBy(key, salt)</strong>
              <small>parallel partial totals</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>STAGE 2</span>
              <strong>groupBy(key)</strong>
              <small>restore business grain</small>
            </div>
          </div>
          <div className="skew-evidence-band">
            {[
              ["PROFILE", "HOT = 90,000 / 100,000"],
              ["TAIL", "max task ≫ median"],
              ["AQE", "final plan · isSkew"],
              ["EQUIVALENCE", "total remains 100,000"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            Salting 改变物理分布，不改变业务 key。第一阶段拆热点并行计算，第二阶段去盐合并；
            处理前后必须用逐 key totals 与 task 分布共同验收。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-shuffle-mechanics-diagram]]") {
      const mapPartitions = ["MAP p0", "MAP p1", "MAP p2", "MAP p3"];
      const reducePartitions = ["REDUCE k0–2", "REDUCE k3–5", "REDUCE k6–9"];
      blocks.push(
        <figure
          className="spark-shuffle-mechanics-diagram"
          key={`spark-shuffle-mechanics-${index}`}
        >
          <div className="shuffle-stage-row">
            <span>STAGE N · MAP SIDE</span>
            <strong>8 input partitions · local partial aggregate</strong>
            <small>计算目标 partition id，并生成 shuffle blocks</small>
          </div>
          <div className="shuffle-map-grid">
            {mapPartitions.map((partition) => (
              <div key={partition}>
                <span>{partition}</span>
                <strong>bucket A · B · C</strong>
                <small>memory → spill → local files</small>
              </div>
            ))}
          </div>
          <div className="shuffle-exchange-band">
            <span>EXCHANGE · ALL-TO-ALL</span>
            <strong>network fetch · serialize · sort · retry boundary</strong>
            <div aria-hidden="true">↘ ↓ ↙ &nbsp; ↗ ↑ ↖</div>
          </div>
          <div className="shuffle-reduce-grid">
            {reducePartitions.map((partition) => (
              <div key={partition}>
                <span>{partition}</span>
                <strong>fetch from every map</strong>
                <small>merge + final aggregate</small>
              </div>
            ))}
          </div>
          <div className="shuffle-cost-band">
            {[
              ["NETWORK", "shuffle read/write bytes"],
              ["MEMORY", "hash/sort buffers + GC"],
              ["DISK", "spill + intermediate files"],
              ["TAIL", "skewed slow task gates stage"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            每个 reduce partition 都可能从全部 map partitions 拉取属于自己的 blocks。
            Exchange 解释“为何移动”，bytes、spill 与 task 分布解释“移动有多贵”。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-join-strategy-diagram]]") {
      const executorPartitions = [
        ["EXECUTOR A", "facts p0", "local hash lookup"],
        ["EXECUTOR B", "facts p1", "local hash lookup"],
        ["EXECUTOR C", "facts p2", "local hash lookup"],
      ];
      blocks.push(
        <figure
          className="spark-join-strategy-diagram"
          key={`spark-join-strategy-${index}`}
        >
          <div className="join-strategy-head">
            <div>
              <span>STREAM SIDE</span>
              <strong>large facts · distributed partitions</strong>
              <small>不按 join key 重新 shuffle</small>
            </div>
            <i aria-hidden="true">+</i>
            <div>
              <span>BUILD SIDE</span>
              <strong>small projected dimension</strong>
              <small>unique keys · measured bytes</small>
            </div>
          </div>
          <div className="broadcast-exchange-node">
            <span>BROADCAST EXCHANGE</span>
            <strong>serialize once → copy hash relation to executors</strong>
          </div>
          <div className="broadcast-executor-grid">
            {executorPartitions.map(([executor, partition, action]) => (
              <div key={executor}>
                <span>{executor}</span>
                <strong>{partition}</strong>
                <small>{action}</small>
                <b>dimension hash</b>
              </div>
            ))}
          </div>
          <div className="join-strategy-compare">
            <div>
              <span>BROADCAST HASH JOIN</span>
              <strong>small side → every executor</strong>
              <small>大侧通常免 join shuffle / sort</small>
            </div>
            <div>
              <span>SORT MERGE JOIN</span>
              <strong>both sides → Exchange + Sort</strong>
              <small>两侧都大时的通用 equi-join</small>
            </div>
          </div>
          <div className="join-evidence-band">
            {[
              ["SEMANTICS", "left · inner · semi · anti"],
              ["CARDINALITY", "1,000 → 1,000"],
              ["QUALITY", "250 unmatched"],
              ["PLAN", "BroadcastHashJoin BuildRight"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            Broadcast 只改变小侧如何抵达 executors；join type、key uniqueness、NULL
            与输出行数仍由逻辑契约决定。优化前后都要保留 cardinality 证据。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-complex-types-json-diagram]]") {
      const complexNodes = [
        ["STRUCT", "customer", "id · region"],
        ["ARRAY<STRUCT>", "items", "sku · qty · price"],
        ["MAP", "attrs", "dynamic string keys"],
      ];
      blocks.push(
        <figure
          className="spark-complex-types-json-diagram"
          key={`spark-complex-types-json-${index}`}
        >
          <div className="complex-json-source">
            <span>RAW BOUNDARY</span>
            <strong>JSON STRING + ingestion metadata</strong>
            <small>原始载荷可重放；解析失败不能静默丢弃</small>
          </div>
          <div className="complex-json-parser">
            <i aria-hidden="true">↓</i>
            <div>
              <span>FROM_JSON</span>
              <strong>显式、版本化 Schema</strong>
              <small>unparseable → NULL → quarantine</small>
            </div>
          </div>
          <div className="complex-type-tree">
            {complexNodes.map(([type, name, detail]) => (
              <div key={type}>
                <span>{type}</span>
                <strong>{name}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
          <div className="complex-grain-branches">
            <div>
              <span>KEEP EVENT GRAIN</span>
              <strong>transform · filter · aggregate</strong>
              <small>2 valid events → 2 output rows</small>
            </div>
            <i aria-hidden="true">OR</i>
            <div>
              <span>CHANGE TO ITEM GRAIN</span>
              <strong>explode_outer(items)</strong>
              <small>2 valid events → 3 item rows</small>
            </div>
          </div>
          <div className="complex-evidence-band">
            {[
              ["PARSE", "1 invalid raw row"],
              ["NESTED SCHEMA", "types + nullability"],
              ["PARENT COVERAGE", "2 / 2 events"],
              ["NEW GRAIN", "event_id + sku"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            同一 typed tree 可以沿两条路径处理：高阶函数保持父级粒度，explode
            切换到元素粒度。选择由下游契约决定，并用解析率、父级覆盖率与新 grain 共同验证。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-relational-pipeline-diagram]]") {
      const pipelineSteps = [
        ["SOURCE", "6 rows · 5 columns", "订单明细"],
        ["FILTER", "4 rows · 5 columns", "限定输入域"],
        ["PROJECT", "4 rows · 4 columns", "固定列契约"],
        ["AGGREGATE", "3 rows · 6 columns", "日 × 渠道粒度"],
      ];
      blocks.push(
        <figure
          className="spark-relational-pipeline-diagram"
          key={`spark-relational-pipeline-${index}`}
        >
          <div className="relational-pipeline-head">
            <span>RELATIONAL TRANSFORMATION</span>
            <strong>Rows → Columns → Grain</strong>
            <small>每个边界都有可验证的输入与输出契约</small>
          </div>
          <div className="relational-pipeline-flow">
            {pipelineSteps.map(([label, value, note], stepIndex) => (
              <div className="relational-step-wrap" key={label}>
                <div className={`relational-step step-${stepIndex}`}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <small>{note}</small>
                </div>
                {stepIndex < pipelineSteps.length - 1 ? <i aria-hidden="true">→</i> : null}
              </div>
            ))}
          </div>
          <div className="relational-contract-grid">
            {[
              ["RANGE", "6 input = 4 accepted + 2 rejected"],
              ["SCHEMA", "event_date · channel · metrics"],
              ["GRAIN", "event_date + channel unique"],
              ["METRIC", "revenue total = 440.00"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <div className="relational-physical-band">
            <span>FORMATTED PLAN</span>
            <strong>Filter → Project → partial HashAggregate → Exchange → final HashAggregate</strong>
          </div>
          <figcaption>
            Filter 收窄行，Project 固定列，Aggregate 改变粒度；Range、Schema、Grain
            与 Metric 四类证据共同证明这条转换链路没有悄悄改变业务口径。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-column-expression-plan-diagram]]") {
      const expressionNodes = [
        ["col", "unit_price", "字段引用"],
        ["col", "qty", "字段引用"],
        ["×", "gross", "算术节点"],
        ["when", "quality_status", "条件节点"],
      ];
      const planSteps = [
        ["ANALYZE", "解析名称与类型"],
        ["OPTIMIZE", "折叠常量、裁剪列"],
        ["PROJECT", "一次投影多个结果"],
      ];
      blocks.push(
        <figure
          className="spark-column-expression-plan-diagram"
          key={`spark-column-expression-${index}`}
        >
          <div className="column-expression-inputs">
            {[
              ["COLUMN REF", "col('unit_price')", "来自 DataFrame schema"],
              ["LITERAL", "lit(0.10)", "每一行共享的常量"],
              ["FUNCTION", "when · round · cast", "Spark SQL 内置节点"],
            ].map(([label, value, note]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <small>{note}</small>
              </div>
            ))}
          </div>
          <div className="column-expression-tree">
            <div className="expression-tree-card">
              <span>DECLARATIVE EXPRESSION TREE</span>
              <strong>描述“计算什么”，此时尚未扫描数据</strong>
              <div>
                {expressionNodes.map(([kind, value, note], nodeIndex) => (
                  <div className={`expression-node node-${nodeIndex}`} key={`${kind}-${value}`}>
                    <b>{kind}</b>
                    <code>{value}</code>
                    <small>{note}</small>
                  </div>
                ))}
              </div>
            </div>
            <i aria-hidden="true">→</i>
            <div className="expression-plan-card">
              <span>CATALYST PLAN</span>
              <strong>Schema 为表达式提供解析上下文</strong>
              <div>
                {planSteps.map(([label, note]) => (
                  <div key={label}>
                    <b>{label}</b>
                    <small>{note}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="column-partition-output">
            <div>
              <span>PARTITION 0</span>
              <strong>Row → expressions → Row</strong>
            </div>
            <div>
              <span>PARTITION 1</span>
              <strong>同一计划，并行求值</strong>
            </div>
            <div>
              <span>OUTPUT CONTRACT</span>
              <strong>amount · status · quality flags</strong>
            </div>
          </div>
          <figcaption>
            Python API 负责组装表达式；Analyzer 与 Optimizer 理解表达式；Executors
            才在各 partition 上真正求值。一次清晰的 Project 让规则、计划和输出契约能够对应起来。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-dataframe-schema-contract-diagram]]") {
      const schemaFields = [
        ["order_id", "STRING", "nullable = false"],
        ["amount", "DECIMAL(12,2)", "nullable = true"],
        ["event_time", "TIMESTAMP", "nullable = true"],
      ];
      blocks.push(
        <figure
          className="spark-dataframe-schema-contract-diagram"
          key={`spark-dataframe-schema-${index}`}
        >
          <div className="schema-source-row">
            <div>
              <span>SOURCE VALUES</span>
              <strong>CSV · JSON · Python rows · Delta</strong>
              <small>bytes and values need interpretation</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>READER CONTRACT</span>
              <strong>explicit schema / governed source schema</strong>
              <small>inference only when consciously accepted</small>
            </div>
          </div>
          <div className="dataframe-contract-body">
            <div className="schema-tree-card">
              <span>STRUCTTYPE</span>
              <strong>ordered StructFields</strong>
              <div>
                {schemaFields.map(([name, type, nullable]) => (
                  <div key={name}>
                    <code>{name}</code>
                    <b>{type}</b>
                    <small>{nullable}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="dataframe-partition-card">
              <span>DATAFRAME</span>
              <strong>distributed rows · named typed columns</strong>
              <div>
                {["PARTITION 0", "PARTITION 1", "PARTITION 2"].map((partition) => (
                  <div key={partition}>
                    <b>{partition}</b>
                    <small>Row · Row · Row</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="schema-transformation-row">
            <div>
              <span>IMMUTABLE TRANSFORMATION</span>
              <strong>select · cast · withColumn → new DataFrame</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>TYPED OUTPUT</span>
              <strong>optimized expressions + predictable table contract</strong>
            </div>
          </div>
          <div className="schema-validation-band">
            {[
              ["STRUCTURE", "name · order · type"],
              ["NULLABILITY", "schema claim"],
              ["CONTENT", "NULL count · range · enum"],
              ["EVOLUTION", "compatible change + version"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            Schema 贯穿读取、表达式分析和写入；结构断言与内容质量检查共同构成可依赖的数据契约。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-lazy-dag-execution-diagram]]") {
      const lazyOperators = [
        ["SOURCE", "range / table"],
        ["FILTER", "narrow"],
        ["PROJECT", "narrow"],
        ["GROUP BY", "wide dependency"],
        ["SORT", "distribution required"],
      ];
      blocks.push(
        <figure
          className="spark-lazy-dag-execution-diagram"
          key={`spark-lazy-dag-${index}`}
        >
          <div className="lazy-plan-head">
            <span>LAZY TRANSFORMATIONS</span>
            <strong>build intent · no full data execution yet</strong>
          </div>
          <div className="lazy-operator-row">
            {lazyOperators.map(([title, detail], operatorIndex) => (
              <div className="lazy-operator-wrap" key={title}>
                <div className={detail.includes("wide") ? "wide" : ""}>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </div>
                {operatorIndex < lazyOperators.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="lazy-action-gate">
            <div>
              <span>ACTION</span>
              <strong>display · count · write</strong>
            </div>
            <i aria-hidden="true">↓</i>
            <div>
              <span>DRIVER</span>
              <strong>optimize + schedule physical DAG</strong>
            </div>
          </div>
          <div className="dag-stage-flow">
            <div className="dag-stage-card">
              <span>JOB · STAGE 0</span>
              <strong>Range → Filter → Project</strong>
              <div>
                {["task p0", "task p1", "task p2", "task p3"].map((task) => (
                  <small key={task}>{task}</small>
                ))}
              </div>
            </div>
            <div className="dag-exchange">
              <span>EXCHANGE</span>
              <strong>shuffle by bucket</strong>
              <i aria-hidden="true">⇢</i>
            </div>
            <div className="dag-stage-card final">
              <span>JOB · STAGE 1</span>
              <strong>Aggregate → Sort → Result</strong>
              <div>
                {["task q0", "task q1", "task q2", "task q3"].map((task) => (
                  <small key={task}>{task}</small>
                ))}
              </div>
            </div>
          </div>
          <div className="dag-adaptive-band">
            <div>
              <span>AQE</span>
              <strong>runtime statistics may coalesce partitions or change strategy</strong>
            </div>
            <div>
              <span>SECOND ACTION</span>
              <strong>may submit another execution unless result is materialized</strong>
            </div>
          </div>
          <figcaption>
            Transformations 先组成可优化 DAG；action 触发 Job，Exchange 切 stages，stage 再按 partitions 创建并行 tasks。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[spark-driver-executor-architecture-diagram]]") {
      const executors = [
        ["EXECUTOR A", "task p0 · task p1", "memory · shuffle"],
        ["EXECUTOR B", "task p2 · task p3", "memory · shuffle"],
        ["EXECUTOR C", "task p4 · task p5", "memory · shuffle"],
      ];
      blocks.push(
        <figure
          className="spark-driver-executor-architecture-diagram"
          key={`spark-driver-executor-${index}`}
        >
          <div className="spark-client-row">
            <div>
              <span>CLIENT</span>
              <strong>Notebook · IDE · Job</strong>
              <small>DataFrame operations → logical plan</small>
            </div>
            <i aria-hidden="true">⇄</i>
            <div>
              <span>SPARK CONNECT</span>
              <strong>plan via gRPC · bounded result back</strong>
            </div>
          </div>
          <div className="spark-control-plane">
            <div className="spark-driver-card">
              <span>DRIVER · CONTROL PLANE</span>
              <strong>SparkSession / SparkContext</strong>
              <ul>
                <li>analyze + optimize plan</li>
                <li>Job → Stage → Task</li>
                <li>schedule + track + recover</li>
              </ul>
            </div>
            <div className="spark-manager-card">
              <span>CLUSTER MANAGER</span>
              <strong>allocate resources</strong>
              <small>serverless hides infrastructure choices</small>
            </div>
          </div>
          <div className="spark-task-arrow">
            <span>tasks + code</span>
            <i aria-hidden="true">↓</i>
            <small>status + small results ↑</small>
          </div>
          <div className="spark-executor-grid">
            {executors.map(([title, tasks, memory]) => (
              <div key={title}>
                <span>{title}</span>
                <strong>{tasks}</strong>
                <small>{memory}</small>
              </div>
            ))}
          </div>
          <div className="spark-data-plane">
            <div>
              <span>PERSISTENT DATA</span>
              <strong>Delta tables · object storage</strong>
            </div>
            <i aria-hidden="true">⇄</i>
            <div>
              <span>EXECUTOR DATA PLANE</span>
              <strong>read partitions · compute · shuffle · write</strong>
            </div>
          </div>
          <div className="spark-failure-zones">
            <div>
              <span>DRIVER RISK</span>
              <strong>collect · metadata · local loop</strong>
            </div>
            <div>
              <span>EXECUTOR RISK</span>
              <strong>skew · spill · fetch · task retry</strong>
            </div>
          </div>
          <figcaption>
            Driver 协调控制流，Executors 处理分区数据；先判断压力位于哪一侧，再选择缩小结果、调整分布或优化表达式。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[free-edition-cost-loop-diagram]]") {
      const learningLoop = [
        ["01", "BOUND", "small data · time filter"],
        ["02", "PROJECT", "needed columns only"],
        ["03", "EXECUTE", "one controlled run"],
        ["04", "OBSERVE", "profile · rows · shuffle"],
        ["05", "CLEAN", "drop objects · stop resources"],
      ];
      blocks.push(
        <figure
          className="free-edition-cost-loop-diagram"
          key={`free-edition-cost-loop-${index}`}
        >
          <div className="free-boundary-head">
            <div>
              <span>FREE EDITION</span>
              <strong>no-cost · serverless-only · fair-usage quota</strong>
            </div>
            <small>learning / teaching / non-commercial · no SLA</small>
          </div>
          <div className="free-learning-loop">
            {learningLoop.map((step, stepIndex) => (
              <div className="free-loop-wrap" key={step[1]}>
                <div className="free-loop-step">
                  <span>{step[0]}</span>
                  <strong>{step[1]}</strong>
                  <small>{step[2]}</small>
                </div>
                {stepIndex < learningLoop.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="free-evidence-band">
            <div>
              <span>LOGICAL EVIDENCE</span>
              <strong>input scope · output rows · reconciliation</strong>
            </div>
            <div>
              <span>PHYSICAL EVIDENCE</span>
              <strong>duration · scan · shuffle · query profile</strong>
            </div>
            <div>
              <span>QUOTA RESPONSE</span>
              <strong>wait for reset · reduce workload · never invent limits</strong>
            </div>
          </div>
          <div className="free-boundary-grid">
            <div>
              <span>DIRECT PRACTICE</span>
              <strong>SQL · Python · Delta · UC · small Lakeflow</strong>
            </div>
            <div>
              <span>ADAPT</span>
              <strong>managed data · batch simulation · audit table</strong>
            </div>
            <div>
              <span>DESIGN ONLY</span>
              <strong>private network · SSO/SCIM · SLA · classic compute</strong>
            </div>
          </div>
          <figcaption>
            在明确边界内循环练习：先缩小问题，再执行、观察和清理；受限企业能力用设计题替代并明确未验证部分。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[gold-data-mart-contract-diagram]]") {
      blocks.push(
        <figure
          className="gold-data-mart-contract-diagram"
          key={`gold-data-mart-contract-${index}`}
        >
          <div className="gold-source-band">
            <span>SILVER FOUNDATION</span>
            <strong>validated facts + conformed dimensions</strong>
            <small>orders · customers · dates · channels</small>
          </div>
          <div className="gold-mart-model">
            <div className="gold-dimension gold-date">
              <span>DIM DATE</span>
              <strong>day · week · fiscal period</strong>
            </div>
            <div className="gold-dimension gold-customer">
              <span>DIM CUSTOMER</span>
              <strong>segment · region · owner</strong>
            </div>
            <div className="gold-fact">
              <span>GOLD SALES MART</span>
              <strong>order_date × channel × region</strong>
              <ul>
                <li>order_count</li>
                <li>customer_count</li>
                <li>net_revenue</li>
              </ul>
            </div>
            <div className="gold-dimension gold-channel">
              <span>DIM CHANNEL</span>
              <strong>web · store · partner</strong>
            </div>
            <div className="gold-dimension gold-region">
              <span>DIM REGION</span>
              <strong>market · currency · timezone</strong>
            </div>
          </div>
          <div className="gold-semantic-layer">
            <div>
              <span>SEMANTIC CONTRACT</span>
              <strong>fields · measures · filters · joins</strong>
              <small>one KPI definition across every grouping</small>
            </div>
            <div>
              <span>SERVICE CONTRACT</span>
              <strong>owner · freshness · SLA · access</strong>
              <small>Unity Catalog · lineage · reconciliation</small>
            </div>
          </div>
          <div className="gold-consumers">
            {[
              ["AI/BI", "dashboard"],
              ["SQL", "analyst"],
              ["APP", "data product"],
              ["AI", "agent context"],
            ].map(([title, detail]) => (
              <div key={title}>
                <strong>{title}</strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
          <figcaption>
            Gold 将 Silver 事实组织为明确粒度的数据集市，并由共享语义与服务契约向多种消费者交付同一答案。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[silver-consistency-refinery-diagram]]") {
      const silverGates = [
        ["01", "PARSE", "try_cast · schema"],
        ["02", "CANONICALIZE", "trim · case · UTC"],
        ["03", "VALIDATE", "required · range · enum"],
        ["04", "DEDUPLICATE", "key · sequence · tie"],
        ["05", "CONFORM", "reference · code · entity"],
      ];
      blocks.push(
        <figure
          className="silver-consistency-refinery-diagram"
          key={`silver-consistency-refinery-${index}`}
        >
          <div className="silver-refinery-input">
            <span>BRONZE INPUT</span>
            <strong>raw records + source evidence</strong>
            <small>6 arrivals · mixed types · duplicate versions</small>
          </div>
          <div className="silver-refinery-flow">
            {silverGates.map((gate, gateIndex) => (
              <div className="silver-gate-wrap" key={gate[1]}>
                <div className="silver-gate">
                  <span>{gate[0]}</span>
                  <strong>{gate[1]}</strong>
                  <small>{gate[2]}</small>
                </div>
                {gateIndex < silverGates.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="silver-output-split">
            <div className="silver-valid-output">
              <span>VALID + WINNER</span>
              <strong>SILVER DETAIL</strong>
              <small>typed · stable grain · non-aggregated</small>
            </div>
            <div className="silver-conservation">
              <span>ROW CONSERVATION</span>
              <strong>input = valid candidates + invalid</strong>
              <small>valid candidates = winner + dedup loser</small>
            </div>
            <div className="silver-quarantine-output">
              <span>RULE VIOLATION</span>
              <strong>QUARANTINE</strong>
              <small>reason · payload · source · detected_at</small>
            </div>
          </div>
          <div className="silver-contract-bar">
            {[
              ["GRAIN", "one order current row"],
              ["KEY", "order_id"],
              ["SCHEMA", "DECIMAL · TIMESTAMP"],
              ["VALIDITY", "required · range · enum"],
              ["REPLAY", "rebuild from Bronze"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
          <figcaption>
            五道闸门逐步收紧契约；质量失败与去重淘汰分开计数，任何结果都可回到 Bronze 证据。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[bronze-ingestion-envelope-diagram]]") {
      const envelopeFields = [
        {
          className: "payload",
          label: "01 · PAYLOAD",
          title: "Source fidelity",
          rows: ["raw columns / raw_json", "STRING · VARIANT · binary", "_rescued_data"],
        },
        {
          className: "identity",
          label: "02 · SOURCE IDENTITY",
          title: "Provenance",
          rows: ["file + row", "topic · partition · offset", "source event id"],
        },
        {
          className: "ingestion",
          label: "03 · INGESTION",
          title: "Arrival evidence",
          rows: ["ingest_ts", "batch / run id", "source modified time"],
        },
      ];
      blocks.push(
        <figure
          className="bronze-ingestion-envelope-diagram"
          key={`bronze-ingestion-envelope-${index}`}
        >
          <div className="bronze-source-strip">
            <span>SOURCE ARRIVALS</span>
            <div>
              <strong>FILES</strong>
              <small>JSON · CSV · Parquet</small>
            </div>
            <div>
              <strong>EVENTS</strong>
              <small>Kafka · Kinesis · Pub/Sub</small>
            </div>
            <div>
              <strong>DATABASE</strong>
              <small>CDC · snapshot</small>
            </div>
          </div>
          <div className="bronze-direction" aria-hidden="true">
            <span>incremental ingest</span>
            <i>↓</i>
          </div>
          <div className="bronze-envelope-shell">
            <div className="bronze-envelope-title">
              <span>BRONZE DELTA TABLE</span>
              <strong>One arrival = one durable record</strong>
              <small>append-oriented · governed · replayable</small>
            </div>
            <div className="bronze-envelope-grid">
              {envelopeFields.map((field) => (
                <div
                  className={`bronze-envelope-card ${field.className}`}
                  key={field.label}
                >
                  <span>{field.label}</span>
                  <strong>{field.title}</strong>
                  <ul>
                    {field.rows.map((row) => (
                      <li key={row}>{row}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="bronze-evidence-row">
              <div>
                <span>SCHEMA DRIFT</span>
                <strong>observe + rescue</strong>
                <small>never silently drop</small>
              </div>
              <div>
                <span>DUPLICATE ARRIVAL</span>
                <strong>preserve source position</strong>
                <small>dedupe later by contract</small>
              </div>
              <div>
                <span>BATCH AUDIT</span>
                <strong>count + time + status</strong>
                <small>backfill and replay evidence</small>
              </div>
            </div>
          </div>
          <div className="bronze-state-boundaries">
            <div>
              <span>LANDING</span>
              <strong>files / bytes waiting</strong>
            </div>
            <i aria-hidden="true">≠</i>
            <div>
              <span>CHECKPOINT</span>
              <strong>processing progress</strong>
            </div>
            <i aria-hidden="true">≠</i>
            <div className="active">
              <span>BRONZE</span>
              <strong>historical records</strong>
            </div>
          </div>
          <div className="bronze-to-silver">
            <span>replay source</span>
            <i aria-hidden="true">→</i>
            <div>
              <strong>SILVER VALIDATION GATE</strong>
              <small>cast · dedupe · CDC · quarantine</small>
            </div>
          </div>
          <figcaption>
            Bronze 用三类字段封装每次到达；Landing、checkpoint 与历史记录边界清晰，Silver 才负责业务有效性。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[medallion-quality-contract-diagram]]") {
      const medallionLayers = [
        {
          className: "bronze",
          label: "BRONZE · RAW",
          title: "Fidelity + Replay",
          details: ["append source", "ingest metadata", "minimal loss"],
          audience: "engineers · audit",
        },
        {
          className: "silver",
          label: "SILVER · VALIDATED",
          title: "Validity + Conformance",
          details: ["schema + cast", "dedupe + CDC", "detail grain"],
          audience: "engineering · analytics · ML",
        },
        {
          className: "gold",
          label: "GOLD · ENRICHED",
          title: "Fitness for Purpose",
          details: ["business model", "aggregate + optimize", "consumer contract"],
          audience: "BI · apps · executives",
        },
      ];
      blocks.push(
        <figure
          className="medallion-quality-contract-diagram"
          key={`medallion-quality-contract-${index}`}
        >
          <div className="medallion-source-row">
            <div>
              <span>SOURCES</span>
              <strong>files · APIs · CDC · events</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>OPTIONAL LANDING</span>
              <strong>Volume / cloud object storage</strong>
            </div>
          </div>
          <div className="medallion-main-flow">
            {medallionLayers.map((layer, layerIndex) => (
              <div className="medallion-layer-wrap" key={layer.label}>
                <div className={`medallion-layer-card ${layer.className}`}>
                  <span>{layer.label}</span>
                  <strong>{layer.title}</strong>
                  <ul>
                    {layer.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <small>{layer.audience}</small>
                </div>
                {layerIndex < medallionLayers.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="medallion-silver-branch">
            <span aria-hidden="true">↘</span>
            <div>
              <strong>QUARANTINE</strong>
              <small>rejected row · reason · source metadata · repair path</small>
            </div>
            <span aria-hidden="true">↺</span>
            <small>fix rule → replay from Bronze</small>
          </div>
          <div className="medallion-contract-bands">
            <div>
              <span>TRUST</span>
              <strong>source fidelity → technical validity → business readiness</strong>
            </div>
            <div>
              <span>REBUILD</span>
              <strong>Silver from Bronze · Gold from Silver</strong>
            </div>
            <div>
              <span>CROSS-CUTTING</span>
              <strong>Unity Catalog · quality · lineage · observability</strong>
            </div>
          </div>
          <figcaption>
            每一跳提高质量并收紧契约；Bronze 保留重放点，Silver 侧向隔离坏数据，Gold 面向明确消费者。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[databricks-workspace-panorama-diagram]]") {
      const workspaceSurfaces = [
        ["develop", "01 · DEVELOP", "Notebook · Files · Git", "代码与协作对象"],
        ["catalog", "02 · DATA", "Catalog · Table · Volume", "受治理数据资产"],
        ["query", "03 · SERVE", "SQL query · Dashboard", "探索与交付结果"],
        ["compute", "04 · COMPUTE", "Serverless · Warehouse", "临时执行资源"],
        ["observe", "06 · OBSERVE", "Run · Query history", "运行证据与诊断"],
        ["orchestrate", "05 · ORCHESTRATE", "Lakeflow Jobs · Pipelines", "调度、依赖与重试"],
      ];
      const executionPath = ["Asset", "Context", "Compute", "Data", "Orchestrate", "Observe"];
      blocks.push(
        <figure
          className="databricks-workspace-panorama-diagram"
          key={`databricks-workspace-panorama-${index}`}
        >
          <div className="workspace-panorama-shell">
            <div className="workspace-panorama-bar">
              <div>
                <span>TEAM ENVIRONMENT</span>
                <strong>Databricks Workspace</strong>
              </div>
              <small>统一入口 · 多种对象 · 独立生命周期</small>
            </div>
            <div className="workspace-surface-map">
              {workspaceSurfaces.map(([position, label, title, detail]) => (
                <div
                  className={`workspace-surface-card ${position}`}
                  key={label}
                >
                  <span>{label}</span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </div>
              ))}
              <div className="workspace-command-hub">
                <span>WORKSPACE HUB</span>
                <strong>搜索 · 路径 · 权限 · 上下文</strong>
                <div>
                  <small>代码不是数据</small>
                  <small>计算不是存储</small>
                  <small>交互不是编排</small>
                </div>
              </div>
            </div>
          </div>
          <div className="workspace-execution-path">
            {executionPath.map((step, stepIndex) => (
              <div key={step}>
                <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {stepIndex < executionPath.length - 1 ? (
                  <i aria-hidden="true">→</i>
                ) : null}
              </div>
            ))}
          </div>
          <div className="workspace-scope-strip">
            <span>ACCOUNT · 组织与 Workspace</span>
            <i aria-hidden="true">↔</i>
            <strong>WORKSPACE · 团队工作环境</strong>
            <i aria-hidden="true">↔</i>
            <span>METASTORE · 治理数据资产</span>
          </div>
          <figcaption>
            Workspace 是把六个功能面连接起来的控制台；源码、表、计算和运行记录仍由各自的
            scope、名称与权限管理。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[dimensional-star-schema-diagram]]") {
      const starDimensions = [
        ["north", "DIM_DATE", "date_key", "日期 · 周 · 月 · 财季"],
        ["west", "DIM_CUSTOMER", "customer_key", "城市 · 分群 · 等级"],
        ["east", "DIM_PRODUCT", "product_key", "商品 · 类别 · 品牌"],
        ["south", "DIM_CHANNEL", "channel_key", "门店 · Web · Partner"],
      ];
      blocks.push(
        <figure
          className="dimensional-star-schema-diagram"
          key={`dimensional-star-schema-${index}`}
        >
          <div className="star-model-map">
            {starDimensions.map(([position, table, keyName, attributes]) => (
              <div
                className={`star-dimension ${position}`}
                key={table}
              >
                <span>DIMENSION · ONE</span>
                <strong>{table}</strong>
                <code>{keyName}</code>
                <small>{attributes}</small>
              </div>
            ))}
            <i className="star-link north" aria-hidden="true">↓</i>
            <i className="star-link west" aria-hidden="true">→</i>
            <i className="star-link east" aria-hidden="true">←</i>
            <i className="star-link south" aria-hidden="true">↑</i>
            <div className="star-fact">
              <span>FACT · MANY</span>
              <strong>FACT_ORDER_LINE</strong>
              <div>
                <code>order_id · line_number</code>
                <small>声明 grain</small>
              </div>
              <div>
                <code>dimension keys</code>
                <small>关联分析上下文</small>
              </div>
              <div>
                <code>quantity · net_amount</code>
                <small>可聚合 measure</small>
              </div>
            </div>
          </div>
          <div className="star-grain-band">
            <div>
              <span>GRAIN CONTRACT</span>
              <strong>每个 order_id + line_number 恰好一行</strong>
            </div>
            <i aria-hidden="true">1 → ∞</i>
            <div>
              <span>FILTER PATH</span>
              <strong>维度筛选，事实聚合</strong>
            </div>
          </div>
          <figcaption>
            四个维度从 one 侧直接连接订单行事实的 many 侧；中心事实只保存当前
            grain 下的键与度量，描述属性留在可复用维度中。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[cloud-storage-iam-separation-diagram]]") {
      const computeEngines = [
        ["SERVERLESS", "Notebook / Job", "按任务启动 · 完成后释放"],
        ["SQL", "SQL Warehouse", "独立并发 · 按查询伸缩"],
      ];
      const storedObjects = ["part-0001.parquet", "part-0002.parquet", "_delta_log/"];
      blocks.push(
        <figure
          className="cloud-storage-iam-separation-diagram"
          key={`cloud-storage-iam-separation-${index}`}
        >
          <div className="cloud-access-chain">
            <div className="cloud-access-node principal">
              <span>PRINCIPAL</span>
              <strong>用户 · 组 · Job identity</strong>
              <small>提出数据访问请求</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="cloud-access-node governance">
              <span>UNITY CATALOG</span>
              <strong>表与路径权限</strong>
              <small>可审计的治理门禁</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="cloud-access-node credential">
              <span>CLOUD IAM</span>
              <strong>Storage credential</strong>
              <small>临时身份 · 最小范围</small>
            </div>
          </div>
          <div className="cloud-separation-stage">
            <div className="cloud-compute-stack">
              <div className="cloud-stage-heading">
                <span>EPHEMERAL COMPUTE</span>
                <strong>计算可以替换与停止</strong>
              </div>
              {computeEngines.map(([label, name, detail]) => (
                <div className="cloud-compute-card" key={label}>
                  <span>{label}</span>
                  <strong>{name}</strong>
                  <small>{detail}</small>
                </div>
              ))}
            </div>
            <div className="cloud-data-bridge">
              <span>READ</span>
              <i aria-hidden="true">⇄</i>
              <span>WRITE</span>
              <small>网络 · 缓存 · 文件布局</small>
            </div>
            <div className="cloud-object-store">
              <div className="cloud-stage-heading">
                <span>DURABLE STORAGE</span>
                <strong>S3 · ADLS Gen2 · GCS</strong>
              </div>
              <div className="cloud-object-bucket">
                <span>orders/</span>
                {storedObjects.map((objectName) => (
                  <div key={objectName}>
                    <i aria-hidden="true">◆</i>
                    <strong>{objectName}</strong>
                  </div>
                ))}
              </div>
              <small>compute 停止后，对象与表历史继续存在</small>
            </div>
          </div>
          <div className="cloud-access-scope">
            <span>EXTERNAL LOCATION</span>
            <strong>credential + cloud URI</strong>
            <i aria-hidden="true">→</i>
            <span>限定到 bucket / container / prefix</span>
          </div>
          <figcaption>
            用户先通过 Unity Catalog；平台再用受控的 cloud identity 访问对象。
            计算生命周期很短，数据与治理边界持续存在。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[git-branch-review-diagram]]") {
      const reviewGates = [
        ["TEST", "规则与边界通过"],
        ["DIFF", "变更小且可解释"],
        ["SAFETY", "重跑与回滚明确"],
      ];
      blocks.push(
        <figure
          className="git-branch-review-diagram"
          key={`git-branch-review-${index}`}
        >
          <div className="git-branch-lanes">
            <div className="git-lane-label">
              <span>DEFAULT</span>
              <strong>main</strong>
            </div>
            <div className="git-commit-path main">
              <span>A</span>
              <i aria-hidden="true">→</i>
              <span>B</span>
              <i aria-hidden="true" className="git-path-gap">
                ─────────→
              </i>
              <span className="merged">M</span>
            </div>
            <div className="git-lane-label feature">
              <span>TOPIC</span>
              <strong>feature/order-null-check</strong>
            </div>
            <div className="git-commit-path feature">
              <span className="branch-point">↳</span>
              <span>C</span>
              <i aria-hidden="true">→</i>
              <span>D</span>
              <i aria-hidden="true">→</i>
              <strong>Pull Request</strong>
              <i aria-hidden="true">↗</i>
            </div>
          </div>
          <div className="git-review-gates">
            <div className="git-review-heading">
              <span>REVIEW GATE</span>
              <strong>合并前必须留下可验证证据</strong>
            </div>
            <div className="git-review-grid">
              {reviewGates.map(([label, detail]) => (
                <div key={label}>
                  <span>{label}</span>
                  <strong>{detail}</strong>
                  <i aria-hidden="true">✓</i>
                </div>
              ))}
            </div>
          </div>
          <figcaption>
            feature branch 从 B 分叉，C 与 D 保存小步变更；测试、差异和数据安全检查通过后，
            Pull Request 才在 M 回到 main。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[python-modules-testing-diagram]]") {
      const projectFiles = [
        ["order_utils.py", "MODULE", "纯函数 · 业务规则"],
        ["lesson009.py", "NOTEBOOK", "参数 · 编排 · 展示"],
        ["test_order_utils.py", "TEST", "输入 · 调用 · 断言"],
      ];
      blocks.push(
        <figure
          className="python-modules-testing-diagram"
          key={`python-modules-testing-${index}`}
        >
          <div className="python-environment-shell">
            <div className="python-environment-heading">
              <div>
                <span>SERVERLESS ENVIRONMENT</span>
                <strong>Base environment + pinned dependencies</strong>
              </div>
              <small>代码与运行契约一起版本化</small>
            </div>
            <div className="python-project-files">
              {projectFiles.map(([file, role, detail], fileIndex) => (
                <div className="python-project-file-wrap" key={file}>
                  <div className="python-project-file">
                    <span>{role}</span>
                    <strong>{file}</strong>
                    <small>{detail}</small>
                  </div>
                  {fileIndex < projectFiles.length - 1 ? (
                    <i aria-hidden="true">→</i>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="python-testing-loop">
            <div>
              <span>01 · ARRANGE</span>
              <strong>准备小型输入</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>02 · ACT</span>
              <strong>import 并调用函数</strong>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>03 · ASSERT</span>
              <strong>验证输出或异常</strong>
            </div>
            <i aria-hidden="true">↺</i>
          </div>
          <figcaption>
            Module 保存规则，Notebook 负责编排，测试定义可执行契约；Environment
            固定它们实际运行的依赖组合。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[python-data-flow-diagram]]") {
      const derivedStructures = [
        ["dict", "客户 → 金额", "按 key 汇总"],
        ["set", "new · vip · web", "标签唯一化"],
        ["tuple", "(web, vip)", "稳定标签组合"],
      ];
      blocks.push(
        <figure
          className="python-data-flow-diagram"
          key={`python-data-flow-${index}`}
        >
          <div className="python-flow-main">
            <div className="python-flow-node input">
              <span>INPUT · list</span>
              <strong>raw_orders</strong>
              <small>每个元素是一条 dict 记录</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="python-flow-node function">
              <span>FUNCTION</span>
              <strong>normalize_order(raw)</strong>
              <small>解析 · 验证 · 返回新 dict</small>
            </div>
            <i aria-hidden="true">→</i>
            <div className="python-flow-branches">
              <div className="python-flow-node valid">
                <span>RETURN</span>
                <strong>valid_orders</strong>
                <small>成功结果 list</small>
              </div>
              <div className="python-flow-node rejected">
                <span>EXCEPT</span>
                <strong>rejected_orders</strong>
                <small>原始行 + 失败原因</small>
              </div>
            </div>
          </div>
          <div className="python-derived-band">
            <div>
              <span>仅从有效记录派生</span>
              <strong>结构表达业务语义</strong>
            </div>
            <div className="python-derived-grid">
              {derivedStructures.map(([type, example, purpose]) => (
                <div key={type}>
                  <span>{type}</span>
                  <strong>{example}</strong>
                  <small>{purpose}</small>
                </div>
              ))}
            </div>
          </div>
          <figcaption>
            函数把单条转换变成可测试边界；成功与预期失败分流，异常不会被静默吞掉。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[sql-window-functions-diagram]]") {
      const partitions = [
        {
          label: "East partition",
          rows: [
            ["#1001", "120", "earlier"],
            ["#1002", "200", "in-frame"],
            ["#1003", "200", "current"],
            ["#1004", "80", "in-frame"],
          ],
        },
        {
          label: "West partition",
          rows: [
            ["#2001", "300", "earlier"],
            ["#2002", "180", "in-frame"],
            ["#2003", "180", "current"],
            ["#2004", "50", "in-frame"],
          ],
        },
      ];
      blocks.push(
        <figure
          className="sql-window-functions-diagram"
          key={`sql-window-functions-${index}`}
        >
          <div className="window-anatomy">
            <div>
              <span>01 · PARTITION BY</span>
              <strong>按 region 分组</strong>
              <small>窗口不会跨地区</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>02 · ORDER BY</span>
              <strong>日期 + 订单号</strong>
              <small>建立稳定顺序</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>03 · ROWS FRAME</span>
              <strong>1 前 · 当前 · 1 后</strong>
              <small>选择本行可见范围</small>
            </div>
            <i aria-hidden="true">→</i>
            <div>
              <span>04 · FUNCTION</span>
              <strong>排名或聚合</strong>
              <small>结果写回当前行</small>
            </div>
          </div>
          <div className="window-partition-grid">
            {partitions.map((partition) => (
              <div className="window-partition" key={partition.label}>
                <div className="window-partition-title">
                  <span>{partition.label}</span>
                  <small>ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING</small>
                </div>
                <div className="window-row-stack">
                  {partition.rows.map(([order, amount, state]) => (
                    <div className={`window-row ${state}`} key={order}>
                      <b>{order}</b>
                      <span>¥ {amount}</span>
                      <small>
                        {state === "current"
                          ? "CURRENT ROW"
                          : state === "in-frame"
                            ? "参与 frame"
                            : "frame 之外"}
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <figcaption>
            Partition 划定边界，ORDER BY 建立顺序，frame
            选择当前行可见的子集；窗口结果增加列，但不折叠明细。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[sql-join-relationships-diagram]]") {
      const joinModes = [
        ["INNER", "只保留匹配组合", "C001 × 2 · C002 × 1"],
        ["LEFT", "左侧客户全部保留", "C003、C004 补 NULL"],
        ["SEMI", "左侧存在匹配", "只输出 C001、C002"],
        ["ANTI", "左侧没有匹配", "只输出 C003、C004"],
      ];
      blocks.push(
        <figure
          className="sql-join-relationships-diagram"
          key={`sql-join-relationships-${index}`}
        >
          <div className="join-cardinality-map">
            <div className="join-relation-card">
              <span>左侧 · 客户粒度</span>
              <strong>customers</strong>
              <div className="join-key-row">
                <b>C001</b>
                <small>林岚</small>
              </div>
              <div className="join-key-row">
                <b>C002</b>
                <small>陈曦</small>
              </div>
              <div className="join-key-row muted">
                <b>C003 · C004</b>
                <small>无已支付订单</small>
              </div>
            </div>
            <div className="join-condition-rail">
              <span>1 : N</span>
              <strong>ON customer_id</strong>
              <small>C001 一行匹配两笔订单</small>
              <i aria-hidden="true">→</i>
            </div>
            <div className="join-relation-card orders">
              <span>右侧 · 订单粒度</span>
              <strong>paid_orders</strong>
              <div className="join-key-row">
                <b>C001</b>
                <small>#1001 · #1002</small>
              </div>
              <div className="join-key-row">
                <b>C002</b>
                <small>#1003</small>
              </div>
              <div className="join-key-row warning">
                <b>C999 · NULL</b>
                <small>孤儿或缺失键</small>
              </div>
            </div>
          </div>
          <div className="join-retention-grid">
            {joinModes.map(([mode, meaning, example]) => (
              <div key={mode}>
                <span>{mode}</span>
                <strong>{meaning}</strong>
                <small>{example}</small>
              </div>
            ))}
          </div>
          <figcaption>
            基数决定一行会匹配多少行；JOIN 类型决定哪些行最终被保留。先验证键，再选择保留范围。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[sql-aggregation-cte-diagram]]") {
      const stages = [
        ["01", "明细输入", "订单、事件或文件行"],
        ["02", "WHERE", "先过滤不合格明细"],
        ["03", "GROUP BY", "按业务粒度分桶"],
        ["04", "Aggregate", "COUNT · SUM · AVG"],
        ["05", "HAVING", "再过滤分组结果"],
        ["06", "结果集", "排序、交付或继续组合"],
      ];
      const setOperations = [
        ["UNION ALL", "全部保留"],
        ["UNION", "并集去重"],
        ["INTERSECT", "只取共有"],
        ["EXCEPT", "只取左侧独有"],
      ];
      blocks.push(
        <figure
          className="sql-aggregation-cte-diagram"
          key={`sql-aggregation-cte-${index}`}
        >
          <div className="aggregation-cte-frame">
            <div className="aggregation-cte-heading">
              <span>WITH · CTE</span>
              <strong>为每个查询阶段命名，并逐层验证</strong>
            </div>
            <div className="aggregation-stage-flow">
              {stages.map(([number, title, detail], stageIndex) => (
                <div className="aggregation-stage-wrap" key={number}>
                  <div className="aggregation-stage">
                    <span>{number}</span>
                    <strong>{title}</strong>
                    <small>{detail}</small>
                  </div>
                  {stageIndex < stages.length - 1 ? (
                    <span className="aggregation-stage-arrow" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="set-operation-band">
            <div>
              <span>兼容列契约</span>
              <strong>多个结果集如何组合？</strong>
            </div>
            <div className="set-operation-options">
              {setOperations.map(([operation, meaning]) => (
                <div key={operation}>
                  <strong>{operation}</strong>
                  <small>{meaning}</small>
                </div>
              ))}
            </div>
          </div>
          <figcaption>
            明细行先过滤再分组；聚合结果再过滤。CTE 组织步骤，Set
            operators 组合结构兼容的结果集。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (line === "[[sql-null-filter-diagram]]") {
      const outcomes = [
        {
          state: "TRUE",
          className: "truthy",
          action: "保留这行",
          example: "status = 'paid'",
        },
        {
          state: "FALSE",
          className: "falsy",
          action: "过滤这行",
          example: "amount >= 100 不成立",
        },
        {
          state: "UNKNOWN",
          className: "unknown",
          action: "过滤这行",
          example: "country = NULL",
        },
      ];
      blocks.push(
        <figure
          className="sql-null-filter-diagram"
          key={`sql-null-filter-${index}`}
        >
          <div className="sql-filter-input">
            <span>输入</span>
            <strong>FROM 产生的每一行</strong>
            <small>包含完整值，也可能包含 NULL</small>
          </div>
          <div className="sql-filter-gate">
            <span>WHERE</span>
            <strong>计算 boolean_expression</strong>
            <small>结果进入 SQL 三值逻辑</small>
          </div>
          <div className="sql-filter-outcomes">
            {outcomes.map((outcome) => (
              <div
                className={`sql-filter-outcome ${outcome.className}`}
                key={outcome.state}
              >
                <span>{outcome.state}</span>
                <strong>{outcome.action}</strong>
                <small>{outcome.example}</small>
              </div>
            ))}
          </div>
          <figcaption>
            `WHERE` 只让 TRUE 通过；FALSE 与 UNKNOWN 都不会进入最终结果。
          </figcaption>
        </figure>,
      );
      index += 1;
      continue;
    }

    if (
      line.startsWith("|") &&
      index + 1 < lines.length &&
      /^\|(?:\s*:?-+:?\s*\|)+$/.test(lines[index + 1].trim())
    ) {
      const tableLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index].trim());
        index += 1;
      }
      const parseRow = (row: string) =>
        row
          .slice(1, -1)
          .split("|")
          .map((cell) => cell.trim());
      const headers = parseRow(tableLines[0]);
      const rows = tableLines.slice(2).map(parseRow);
      blocks.push(
        <div className="topic-table-scroll" key={`table-${index}`}>
          <table className="topic-table">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{renderInline(header)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={`h3-${index}`}>{renderInline(line.slice(4))}</h3>,
      );
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      const title = line.slice(3).trim();
      blocks.push(
        <h2 id={sectionId(title, sectionIndex)} key={`h2-${index}`}>
          {renderInline(title)}
        </h2>,
      );
      sectionIndex += 1;
      index += 1;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(<h2 key={`h1-${index}`}>{renderInline(line.slice(2))}</h2>);
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(
        <ul key={`ul-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (
        index < lines.length &&
        /^\d+\.\s/.test(lines[index].trim())
      ) {
        items.push(lines[index].trim().replace(/^\d+\.\s/, ""));
        index += 1;
      }
      blocks.push(
        <ol key={`ol-${index}`}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item)}</li>
          ))}
        </ol>,
      );
      continue;
    }

    if (line.startsWith("> ")) {
      const quotes: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quotes.push(lines[index].trim().slice(2));
        index += 1;
      }
      blocks.push(
        <blockquote key={`quote-${index}`}>
          {quotes.map((quote, quoteIndex) => (
            <p key={quoteIndex}>{renderInline(quote)}</p>
          ))}
        </blockquote>,
      );
      continue;
    }

    const correctionClass = line.startsWith("❌")
      ? "correction wrong"
      : line.startsWith("✅")
        ? "correction right"
        : undefined;

    blocks.push(
      <p className={correctionClass} key={`p-${index}`}>
        {renderInline(line)}
      </p>,
    );
    index += 1;
  }

  return <div className="topic-body">{blocks}</div>;
}
