import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function render(pathname) {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  return response.text();
}

test("renders the Databricks learning section", async () => {
  const html = await render("/");
  assert.match(html, /Databricks/);
  assert.match(html, /114 \/ 114/);
  assert.match(html, /进入最新课程/);
  assert.doesNotMatch(html, /codex-preview/);
});

test("renders the latest language topics without Notion links", async () => {
  const html = await render("/");
  assert.match(html, /担当者が不在のとき、別の相手に確認を依頼する/);
  assert.match(html, /Defining Data Freshness and Staleness Contracts/);
  assert.match(html, /\/topics\/jp-confirm-with-alternate-contact-when-owner-absent/);
  assert.match(html, /\/topics\/en-data-freshness-staleness-contracts/);
  assert.doesNotMatch(
    html,
    /https?:\/\/[^"'\s>]*notion\.(?:so|site)|app\.notion\.com/i,
  );
});

test("renders the Claude Architect certification module", async () => {
  const html = await render("/");
  assert.match(html, /Claude Certified Architect/);
  assert.match(html, /Certification path · 18 \/ 18/);
  assert.match(html, /Integration/);
  assert.match(html, /63 道原创中英双语模拟题/);
  assert.match(html, /\/topics\/ccar-p-000-exam-guide/);
  assert.match(html, /\/topics\/ccar-p-017-bilingual-practice-bank/);
  assert.doesNotMatch(html, /<a\b[^>]*href=["']https?:\/\//i);
});

test("renders the official CCAR-P exam blueprint", async () => {
  const html = await render("/topics/ccar-p-000-exam-guide");
  assert.match(html, /120 minutes/);
  assert.match(html, /63 questions/);
  assert.match(html, /US\$175/);
  assert.match(html, /通过分.*720/);
  assert.match(html, /Integration（集成）— 19%/);
  assert.match(html, /Developer Productivity &amp; Operational Enablement/);
  assert.match(html, /2026 年 7 月/);
  assert.doesNotMatch(html, /<a\b[^>]*href=["']https?:\/\//i);
});

test("renders the three public official sample questions bilingually", async () => {
  const html = await render("/topics/ccar-p-016-official-samples");
  assert.match(html, /说明性示例题/);
  assert.match(html, /不是正式考试题/);
  assert.match(html, /Official sample · Domain 3 Integration/);
  assert.match(html, /English/);
  assert.match(html, /中文/);
  assert.match(html, /Q03/);
  assert.doesNotMatch(html, /<a\b[^>]*href=["']https?:\/\//i);
});

test("renders all 63 original bilingual CCAR-P practice questions", async () => {
  const html = await render("/topics/ccar-p-017-bilingual-practice-bank");
  assert.match(html, /不是正式考试原题或泄题/);
  assert.match(html, /Q01/);
  assert.match(html, /Q63/);
  assert.match(html, /Answer \/ 答案/);
  assert.match(html, /Rationale \(EN\)/);
  assert.match(html, /解析（中文）/);
  assert.equal(
    new Set((html.match(/Q\d{2} · Domain/g) ?? []).map((item) => item.slice(0, 3)))
      .size,
    63,
  );
  assert.doesNotMatch(html, /<a\b[^>]*href=["']https?:\/\//i);
});

test("renders all 18 Claude certification units as internal pages", async () => {
  const home = await render("/");
  const paths = [
    ...new Set(
      [...home.matchAll(/href="(\/topics\/ccar-p-[^"]+)"/g)].map(
        (match) => match[1],
      ),
    ),
  ];

  assert.equal(paths.length, 18);
  for (const path of paths) {
    const html = await render(path);
    assert.match(html, /关键词|考试|示例题|模拟题/);
    assert.doesNotMatch(html, /<a\b[^>]*href=["']https?:\/\//i);
  }
});

test("renders the latest Japanese topic", async () => {
  const html = await render("/topics/jp-negotiate-room-temperature-adjustments");
  assert.match(html, /体感/);
  assert.match(html, /背中が汗ばむ/);
  assert.match(html, /一概には言えない/);
  assert.match(html, /いったん.*それでも/);
  assert.match(html, /口頭・作文練習/);
  assert.match(html, /参考答案/);
  assert.doesNotMatch(
    html,
    /https?:\/\/[^"'\s>]*notion\.(?:so|site)|app\.notion\.com/i,
  );
});

test("renders the latest English topic", async () => {
  const html = await render("/topics/en-identity-configuration-drift-integration-paths");
  assert.match(html, /request equivalence/);
  assert.match(html, /effective identity/);
  assert.match(html, /configuration drift/);
  assert.match(html, /row-level filtering/);
  assert.match(html, /Stakeholder Update/);
  assert.match(html, /Code Review \/ Mentoring/);
  assert.match(html, /Speaking Drill/);
  assert.doesNotMatch(
    html,
    /https?:\/\/[^"'\s>]*notion\.(?:so|site)|app\.notion\.com/i,
  );
  assert.doesNotMatch(html, /<a\b[^>]*href=["']https?:\/\//i);
});

test("renders the first Databricks lesson", async () => {
  const html = await render("/topics/dbx-001-data-engineering-lifecycle");
  assert.match(html, /数据工程师职责与端到端数据链路/);
  assert.match(html, /Governance/);
  assert.match(html, /lesson001_paid_orders/);
});

test("renders the second Databricks lesson", async () => {
  const html = await render("/topics/dbx-002-lakehouse-data-intelligence");
  assert.match(html, /Lakehouse 与 Data Intelligence Platform/);
  assert.match(html, /Data Intelligence engine/);
  assert.match(html, /lesson002_orders/);
});

test("renders the third Databricks lesson", async () => {
  const html = await render("/topics/dbx-003-warehouse-lake-lakehouse");
  assert.match(html, /数据仓库、Data Lake 与 Lakehouse 对比/);
  assert.match(html, /Schema-on-write/);
  assert.match(html, /lesson003_sales_daily/);
});

test("renders the fourth Databricks lesson", async () => {
  const html = await render("/topics/dbx-004-sql-query-filter-null");
  assert.match(html, /SQL/);
  assert.match(html, /lesson004_orders/);
  assert.match(html, /sql-null-filter-diagram/);
});

test("renders the fifth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-005-sql-aggregation-cte-set-operations",
  );
  assert.match(html, /lesson005_orders/);
  assert.match(html, /GROUP BY/);
  assert.match(html, /sql-aggregation-cte-diagram/);
});

test("renders the sixth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-006-sql-joins-data-relationships",
  );
  assert.match(html, /lesson006_customers/);
  assert.match(html, /LEFT ANTI JOIN/);
  assert.match(html, /sql-join-relationships-diagram/);
});

test("renders the seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-007-sql-window-functions");
  assert.match(html, /lesson007_sales/);
  assert.match(html, /QUALIFY/);
  assert.match(html, /sql-window-functions-diagram/);
});

test("renders the eighth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-008-python-data-structures-functions-exceptions",
  );
  assert.match(html, /normalize_order/);
  assert.match(html, /rejected_orders/);
  assert.match(html, /python-data-flow-diagram/);
});

test("renders the ninth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-009-python-modules-environments-testing",
  );
  assert.match(html, /order_utils\.py/);
  assert.match(html, /3 tests passed/);
  assert.match(html, /python-modules-testing-diagram/);
});

test("renders the tenth Databricks lesson", async () => {
  const html = await render("/topics/dbx-010-git-branches-code-review");
  assert.match(html, /git switch -c feature\/order-null-check/);
  assert.match(html, /Pull Request/);
  assert.match(html, /git-branch-review-diagram/);
});

test("renders the eleventh Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-011-cloud-object-storage-iam-compute-separation",
  );
  assert.match(html, /DESCRIBE DETAIL lesson011_orders/);
  assert.match(html, /storage credential/);
  assert.match(html, /cloud-storage-iam-separation-diagram/);
});

test("renders the twelfth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-012-dimensional-modeling-facts-dimensions-star-schema",
  );
  assert.match(html, /lesson012_fact_order_line/);
  assert.match(html, /informational constraints/);
  assert.match(html, /dimensional-star-schema-diagram/);
});

test("renders the thirteenth Databricks lesson", async () => {
  const html = await render("/topics/dbx-013-databricks-workspace-panorama");
  assert.match(html, /lesson013_workspace_check/);
  assert.match(html, /current_catalog/);
  assert.match(html, /databricks-workspace-panorama-diagram/);
});

test("renders the fourteenth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-014-notebooks-workspace-files-development",
  );
  assert.match(html, /order_transform\.py/);
  assert.match(html, /Databricks Connect/);
  assert.match(html, /notebook-workspace-development-diagram/);
});

test("renders the fifteenth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-015-serverless-sql-warehouse-photon",
  );
  assert.match(html, /lesson015_sales/);
  assert.match(html, /Intelligent Workload Management/);
  assert.match(html, /serverless-warehouse-photon-diagram/);
});

test("renders the sixteenth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-016-unity-catalog-three-level-namespace",
  );
  assert.match(html, /lesson016/);
  assert.match(html, /USE CATALOG/);
  assert.match(html, /unity-catalog-namespace-diagram/);
});

test("renders the seventeenth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-017-catalog-schema-table-view-volume",
  );
  assert.match(html, /landing_files/);
  assert.match(html, /\/Volumes\//);
  assert.match(html, /uc-object-selection-diagram/);
});

test("renders the eighteenth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-018-managed-external-data-assets",
  );
  assert.match(html, /managed_orders/);
  assert.match(html, /CREATE EXTERNAL VOLUME/);
  assert.match(html, /managed-external-lifecycle-diagram/);
});

test("renders the nineteenth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-019-file-upload-first-delta-table",
  );
  assert.match(html, /lesson019_raw_upload/);
  assert.match(html, /try_cast/);
  assert.match(html, /file-to-delta-first-table-diagram/);
});

test("renders the twentieth Databricks lesson", async () => {
  const html = await render("/topics/dbx-020-medallion-architecture");
  assert.match(html, /lesson020_bronze/);
  assert.match(html, /orders_quarantine/);
  assert.match(html, /medallion-quality-contract-diagram/);
});

test("renders the twenty-first Databricks lesson", async () => {
  const html = await render("/topics/dbx-021-bronze-layer-design");
  assert.match(html, /lesson021_bronze/);
  assert.match(html, /source_positions/);
  assert.match(html, /bronze-ingestion-envelope-diagram/);
});

test("renders the twenty-second Databricks lesson", async () => {
  const html = await render("/topics/dbx-022-silver-cleaning-consistency");
  assert.match(html, /lesson022_silver/);
  assert.match(html, /orders_quarantine/);
  assert.match(html, /silver-consistency-refinery-diagram/);
});

test("renders the twenty-third Databricks lesson", async () => {
  const html = await render("/topics/dbx-023-gold-data-marts");
  assert.match(html, /lesson023_gold/);
  assert.match(html, /silver_revenue/);
  assert.match(html, /gold-data-mart-contract-diagram/);
});

test("renders the twenty-fourth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-024-free-edition-limits-cost-awareness",
  );
  assert.match(html, /lesson024/);
  assert.match(html, /scoped_rows/);
  assert.match(html, /free-edition-cost-loop-diagram/);
});

test("renders the twenty-fifth Databricks lesson", async () => {
  const html = await render(
    "/topics/dbx-025-spark-driver-executor-architecture",
  );
  assert.match(html, /spark_partition_id/);
  assert.match(html, /Spark Connect/);
  assert.match(html, /spark-driver-executor-architecture-diagram/);
});

test("renders the twenty-sixth Databricks lesson", async () => {
  const html = await render("/topics/dbx-026-lazy-dag-job-stage-task");
  assert.match(html, /summary\.explain/);
  assert.match(html, /EXPLAIN EXTENDED/);
  assert.match(html, /spark-lazy-dag-execution-diagram/);
});

test("renders the twenty-seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-027-spark-dataframe-schema");
  assert.match(html, /StructType/);
  assert.match(html, /Schema drift/);
  assert.match(html, /spark-dataframe-schema-contract-diagram/);
});

test("renders the twenty-eighth Databricks lesson", async () => {
  const html = await render("/topics/dbx-028-pyspark-column-expressions");
  assert.match(html, /Column Expressions/);
  assert.match(html, /eqNullSafe/);
  assert.match(html, /spark-column-expression-plan-diagram/);
});

test("renders the twenty-ninth Databricks lesson", async () => {
  const html = await render("/topics/dbx-029-filter-project-derive-aggregate");
  assert.match(html, /HashAggregate/);
  assert.match(html, /440\.00/);
  assert.match(html, /spark-relational-pipeline-diagram/);
});

test("renders the thirtieth Databricks lesson", async () => {
  const html = await render("/topics/dbx-030-complex-types-json");
  assert.match(html, /from_json/);
  assert.match(html, /explode_outer/);
  assert.match(html, /spark-complex-types-json-diagram/);
});

test("renders the thirty-first Databricks lesson", async () => {
  const html = await render("/topics/dbx-031-join-strategies-broadcast");
  assert.match(html, /BroadcastHashJoin/);
  assert.match(html, /250/);
  assert.match(html, /spark-join-strategy-diagram/);
});

test("renders the thirty-second Databricks lesson", async () => {
  const html = await render("/topics/dbx-032-shuffle-causes-costs");
  assert.match(html, /Exchange/);
  assert.match(html, /10,000/);
  assert.match(html, /spark-shuffle-mechanics-diagram/);
});

test("renders the thirty-third Databricks lesson", async () => {
  const html = await render("/topics/dbx-033-data-skew-detection-mitigation");
  assert.match(html, /90,000/);
  assert.match(html, /isSkew/);
  assert.match(html, /spark-data-skew-diagram/);
});

test("renders the thirty-fourth Databricks lesson", async () => {
  const html = await render("/topics/dbx-034-pyspark-window-functions");
  assert.match(html, /rowsBetween/);
  assert.match(html, /100\.00/);
  assert.match(html, /spark-window-spec-diagram/);
});

test("renders the thirty-fifth Databricks lesson", async () => {
  const html = await render("/topics/dbx-035-built-in-functions-vs-udf");
  assert.match(html, /regexp_replace/);
  assert.match(html, /cn13812345678/);
  assert.match(html, /spark-function-choice-diagram/);
});

test("renders the thirty-sixth Databricks lesson", async () => {
  const html = await render("/topics/dbx-036-data-read-write-file-formats");
  assert.match(html, /FAILFAST/);
  assert.match(html, /250\.00/);
  assert.match(html, /spark-read-write-contract-diagram/);
});

test("renders the thirty-seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-037-partitions-parallelism-small-files");
  assert.match(html, /100,000/);
  assert.match(html, /coalesce\(1\)/);
  assert.match(html, /spark-partition-file-layout-diagram/);
});

test("renders the thirty-eighth Databricks lesson", async () => {
  const html = await render("/topics/dbx-038-explain-spark-ui-execution-plan");
  assert.match(html, /BroadcastHashJoin/);
  assert.match(html, /1,045,000/);
  assert.match(html, /spark-plan-runtime-diagnostics-diagram/);
});

test("renders the thirty-ninth Databricks lesson", async () => {
  const html = await render("/topics/dbx-039-cache-persist-correct-usage");
  assert.match(html, /InMemoryTableScan/);
  assert.match(html, /333,334/);
  assert.match(html, /spark-cache-lifecycle-diagram/);
});

test("renders the fortieth Databricks lesson", async () => {
  const html = await render("/topics/dbx-040-pyspark-unit-dataframe-testing");
  assert.match(html, /assertDataFrameEqual/);
  assert.match(html, /DECIMAL\(12,2\)/);
  assert.match(html, /pyspark-testing-pyramid-diagram/);
});

test("renders the forty-first Databricks lesson", async () => {
  const html = await render("/topics/dbx-041-spark-sql-pyspark-collaboration");
  assert.match(html, /IDENTIFIER/);
  assert.match(html, /200\.00/);
  assert.match(html, /spark-sql-pyspark-interop-diagram/);
});

test("renders the forty-second Databricks lesson", async () => {
  const html = await render("/topics/dbx-042-spark-errors-debugging");
  assert.match(html, /errorClass/);
  assert.match(html, /try_divide/);
  assert.match(html, /spark-debugging-funnel-diagram/);
});

test("renders the forty-third Databricks lesson", async () => {
  const html = await render("/topics/dbx-043-delta-lake-transaction-log");
  assert.match(html, /_delta_log/);
  assert.match(html, /VERSION AS OF 1/);
  assert.match(html, /delta-transaction-log-snapshot-diagram/);
});

test("renders the forty-fourth Databricks lesson", async () => {
  const html = await render("/topics/dbx-044-acid-snapshot-concurrency");
  assert.match(html, /WriteSerializable/);
  assert.match(html, /DIVIDE_BY_ZERO/);
  assert.match(html, /delta-acid-concurrency-diagram/);
});

test("renders the forty-fifth Databricks lesson", async () => {
  const html = await render("/topics/dbx-045-delta-dml-merge");
  assert.match(html, /WHEN NOT MATCHED BY SOURCE/);
  assert.match(html, /210\.00/);
  assert.match(html, /delta-dml-merge-router-diagram/);
});

test("renders the forty-sixth Databricks lesson", async () => {
  const html = await render("/topics/dbx-046-schema-enforcement-evolution");
  assert.match(html, /DELTA_METADATA_MISMATCH/);
  assert.match(html, /150\.00/);
  assert.match(html, /delta-schema-contract-gate-diagram/);
});

test("renders the forty-seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-047-time-travel-restore-history");
  assert.match(html, /RESTORE TABLE lesson047_inventory TO VERSION AS OF 1/);
  assert.match(html, /3行\/17/);
  assert.match(html, /delta-time-travel-restore-timeline/);
});

test("renders the forty-eighth Databricks lesson", async () => {
  const html = await render("/topics/dbx-048-change-data-feed");
  assert.match(html, /update_preimage/);
  assert.match(html, /190\.00/);
  assert.match(html, /delta-change-data-feed-pipeline/);
});

test("renders the forty-ninth Databricks lesson", async () => {
  const html = await render("/topics/dbx-049-idempotency-dedup-rerunnable");
  assert.match(html, /txnAppId/);
  assert.match(html, /170\.00/);
  assert.match(html, /delta-idempotent-rerun-protocol/);
});

test("renders the fiftieth Databricks lesson", async () => {
  const html = await render("/topics/dbx-050-optimistic-concurrency-control");
  assert.match(html, /WriteSerializable/);
  assert.match(html, /500\.00/);
  assert.match(html, /delta-occ-validation-race/);
});

test("renders the fifty-first Databricks lesson", async () => {
  const html = await render("/topics/dbx-051-liquid-clustering");
  assert.match(html, /CLUSTER BY AUTO/);
  assert.match(html, /300\.00/);
  assert.match(html, /delta-liquid-clustering-layout/);
});

test("renders the fifty-second Databricks lesson", async () => {
  const html = await render("/topics/dbx-052-predictive-optimization-maintenance");
  assert.match(html, /Predictive Optimization/);
  assert.match(html, /500500\.00/);
  assert.match(html, /delta-predictive-maintenance-loop/);
});

test("renders the fifty-third Databricks lesson", async () => {
  const html = await render("/topics/dbx-053-delta-table-performance-diagnostics");
  assert.match(html, /Query Profile/);
  assert.match(html, /50300\.00/);
  assert.match(html, /delta-performance-diagnostic-funnel/);
});

test("renders the fifty-fourth Databricks lesson", async () => {
  const html = await render("/topics/dbx-054-delta-bronze-silver-gold");
  assert.match(html, /Silver snapshot/);
  assert.match(html, /350\.00/);
  assert.match(html, /delta-medallion-contract-pipeline/);
});

test("renders the fifty-fifth Databricks lesson", async () => {
  const html = await render("/topics/dbx-055-batch-incremental-design");
  assert.match(html, /current_high/);
  assert.match(html, /505\.00/);
  assert.match(html, /batch-incremental-boundary-loop/);
});

test("renders the fifty-sixth Databricks lesson", async () => {
  const html = await render("/topics/dbx-056-structured-streaming-model");
  assert.match(html, /AvailableNow/);
  assert.match(html, /150\.00/);
  assert.match(html, /structured-streaming-table-model/);
});

test("renders the fifty-seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-057-source-sink-trigger-microbatch");
  assert.match(html, /maxFilesPerTrigger/);
  assert.match(html, /360\.00/);
  assert.match(html, /stream-source-trigger-microbatch-sink/);
});

test("renders the fifty-eighth Databricks lesson", async () => {
  const html = await render("/topics/dbx-058-checkpoint-state-fault-tolerance");
  assert.match(html, /stateOperators/);
  assert.match(html, /300\.00/);
  assert.match(html, /stream-checkpoint-state-recovery/);
});

test("renders the fifty-ninth Databricks lesson", async () => {
  const html = await render("/topics/dbx-059-watermark-late-data");
  assert.match(html, /numRowsDroppedByWatermark/);
  assert.match(html, /80\.00/);
  assert.match(html, /watermark-late-data-timeline/);
});

test("renders the sixtieth Databricks lesson", async () => {
  const html = await render("/topics/dbx-060-streaming-dedup-stateful-processing");
  assert.match(html, /dropDuplicatesWithinWatermark/);
  assert.match(html, /150\.00/);
  assert.match(html, /streaming-dedup-state-machine/);
});

test("renders the sixty-first Databricks lesson", async () => {
  const html = await render("/topics/dbx-061-auto-loader");
  assert.match(html, /cloud_files_state/);
  assert.match(html, /210\.00/);
  assert.match(html, /auto-loader-discovery-state-pipeline/);
});

test("renders the sixty-second Databricks lesson", async () => {
  const html = await render("/topics/dbx-062-cdc-incremental-ingestion");
  assert.match(html, /table_changes/);
  assert.match(html, /230\.00/);
  assert.match(html, /cdc-incremental-contract-flow/);
});

test("renders the sixty-third Databricks lesson", async () => {
  const html = await render("/topics/dbx-063-scd-type1-type2");
  assert.match(html, /point-in-time/);
  assert.match(html, /2026-04-15/);
  assert.match(html, /scd-type1-type2-timeline/);
});

test("renders the sixty-fourth Databricks lesson", async () => {
  const html = await render("/topics/dbx-064-lakeflow-connect");
  assert.match(html, /lsn:9025/);
  assert.match(html, /1025/);
  assert.match(html, /lakeflow-connect-managed-ingestion/);
});

test("renders the sixty-fifth Databricks lesson", async () => {
  const html = await render("/topics/dbx-065-lakeflow-sdp-concepts");
  assert.match(html, /CREATE OR REFRESH STREAMING TABLE/);
  assert.match(html, /samples\.nyctaxi\.trips/);
  assert.match(html, /lakeflow-sdp-dependency-update-graph/);
});

test("renders the sixty-sixth Databricks lesson", async () => {
  const html = await render("/topics/dbx-066-streaming-table-materialized-view");
  assert.match(html, /FULL_RECOMPUTE/);
  assert.match(html, /150\.00/);
  assert.match(html, /streaming-table-materialized-view-dual-path/);
});

test("renders the sixty-seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-067-python-dp-api");
  assert.match(html, /from pyspark import pipelines as dp/);
  assert.match(html, /lesson067_daily_mv/);
  assert.match(html, /python-dp-api-planning-graph/);
});

test("renders the sixty-eighth Databricks lesson", async () => {
  const html = await render("/topics/dbx-068-sql-declarative-pipelines");
  assert.match(html, /CREATE OR REFRESH STREAMING TABLE/);
  assert.match(html, /lesson068_daily_mv/);
  assert.match(html, /sql-declarative-pipelines-plan/);
});

test("renders the sixty-ninth Databricks lesson", async () => {
  const html = await render("/topics/dbx-069-pipeline-data-quality-rules");
  assert.match(html, /ON VIOLATION FAIL UPDATE/);
  assert.match(html, /110\.00/);
  assert.match(html, /pipeline-expectations-policy-flow/);
});

test("renders the seventieth Databricks lesson", async () => {
  const html = await render("/topics/dbx-070-pipeline-monitoring-event-log");
  assert.match(html, /origin\.update_id/);
  assert.match(html, /event_log\(&lt;pipeline-id&gt;\)/);
  assert.match(html, /pipeline-monitoring-event-log-map/);
});

test("renders the seventy-first Databricks lesson", async () => {
  const html = await render("/topics/dbx-071-lakeflow-jobs-basics");
  assert.match(html, /lesson071_job_output/);
  assert.match(html, /2026-07-27/);
  assert.match(html, /lakeflow-jobs-basic-run-lifecycle/);
});

test("renders the seventy-second Databricks lesson", async () => {
  const html = await render("/topics/dbx-072-multitask-dependencies-parameters-scheduling");
  assert.match(html, /\{\{job\.parameters\.run_date\}\}/);
  assert.match(html, /lesson072_run_manifest/);
  assert.match(html, /jobs-multitask-parameter-schedule-dag/);
});

test("renders the seventy-third Databricks lesson", async () => {
  const html = await render("/topics/dbx-073-conditional-foreach-repair-run");
  assert.match(html, /\{\{input\.market\}\}/);
  assert.match(html, /lesson073_market_results/);
  assert.match(html, /jobs-control-flow-branch-loop-repair/);
});

test("renders the seventy-fourth Databricks lesson", async () => {
  const html = await render("/topics/dbx-074-retry-timeout-notification-recovery");
  assert.match(html, /\{\{task\.execution_count\}\}/);
  assert.match(html, /lesson074_recovery_log/);
  assert.match(html, /jobs-retry-timeout-notification-recovery/);
});

test("renders the seventy-fifth Databricks lesson", async () => {
  const html = await render("/topics/dbx-075-batch-streaming-end-to-end-lakeflow");
  assert.match(html, /CREATE OR REFRESH STREAMING TABLE lesson075_orders_bronze/);
  assert.match(html, /215\.00/);
  assert.match(html, /lakeflow-batch-streaming-end-to-end/);
});

test("renders the seventy-sixth Databricks lesson", async () => {
  const html = await render("/topics/dbx-076-unity-catalog-governance-model");
  assert.match(html, /CURRENT_METASTORE/);
  assert.match(html, /lesson076_governance_probe/);
  assert.match(html, /unity-catalog-governance-model/);
});

test("renders the seventy-seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-077-users-groups-service-principals");
  assert.match(html, /is_account_group_member/);
  assert.match(html, /lesson077_identity_probe/);
  assert.match(html, /databricks-identity-access-chain/);
});

test("renders the seventy-eighth Databricks lesson", async () => {
  const html = await render("/topics/dbx-078-grant-revoke-least-privilege");
  assert.match(html, /REVOKE SELECT ON TABLE/);
  assert.match(html, /lesson078_least_privilege/);
  assert.match(html, /unity-catalog-least-privilege-loop/);
});

test("renders the seventy-ninth Databricks lesson", async () => {
  const html = await render("/topics/dbx-079-catalog-schema-isolation-strategy");
  assert.match(html, /main\.information_schema\.schemata/);
  assert.match(html, /lesson079_isolation_probe/);
  assert.match(html, /catalog-schema-isolation-blueprint/);
});

test("renders the eightieth Databricks lesson", async () => {
  const html = await render("/topics/dbx-080-managed-storage-external-location-credential");
  assert.match(html, /CREATE EXTERNAL LOCATION IF NOT EXISTS/);
  assert.match(html, /lesson080_managed_probe/);
  assert.match(html, /unity-catalog-storage-authorization-chain/);
});

test("renders the eighty-first Databricks lesson", async () => {
  const html = await render("/topics/dbx-081-volumes-nontabular-data");
  assert.match(html, /CREATE VOLUME IF NOT EXISTS/);
  assert.match(html, /lesson081_orders/);
  assert.match(html, /unity-catalog-volume-nontabular-flow/);
});

test("renders the eighty-second Databricks lesson", async () => {
  const html = await render("/topics/dbx-082-row-filter-column-mask-dynamic-view");
  assert.match(html, /SET ROW FILTER/);
  assert.match(html, /lesson082_customers_secure/);
  assert.match(html, /unity-catalog-fine-grained-policy-flow/);
});

test("renders the eighty-third Databricks lesson", async () => {
  const html = await render("/topics/dbx-083-lineage-data-discovery");
  assert.match(html, /system\.access\.table_lineage/);
  assert.match(html, /lesson083_region_revenue/);
  assert.match(html, /unity-catalog-discovery-lineage-map/);
});

test("renders the eighty-fourth Databricks lesson", async () => {
  const html = await render("/topics/dbx-084-audit-logs-system-tables");
  assert.match(html, /system\.access\.audit/);
  assert.match(html, /lesson084_audit_sample/);
  assert.match(html, /databricks-audit-system-table-observability/);
});

test("renders the eighty-fifth Databricks lesson", async () => {
  const html = await render("/topics/dbx-085-delta-sharing");
  assert.match(html, /CREATE SHARE IF NOT EXISTS/);
  assert.match(html, /lesson085_partner_slice/);
  assert.match(html, /open-sharing-cross-organization-flow/);
});

test("renders the eighty-sixth Databricks lesson", async () => {
  const html = await render("/topics/dbx-086-data-classification-tags-sensitive-governance");
  assert.match(html, /system\.data_classification\.results/);
  assert.match(html, /lesson086_customers/);
  assert.match(html, /sensitive-data-governance-closed-loop/);
});

test("renders the eighty-seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-087-enterprise-unity-catalog-design");
  assert.match(html, /main\.lesson087_gold\.daily_revenue/);
  assert.match(html, /sales_prod/);
  assert.match(html, /enterprise-unity-catalog-blueprint/);
});

test("renders the eighty-eighth Databricks lesson", async () => {
  const html = await render("/topics/dbx-088-databricks-cli-authentication");
  assert.match(html, /databricks auth login/);
  assert.match(html, /DATABRICKS_CLIENT_ID/);
  assert.match(html, /databricks-cli-unified-auth-flow/);
});

test("renders the eighty-ninth Databricks lesson", async () => {
  const html = await render("/topics/dbx-089-python-wheel-deployable-project");
  assert.match(html, /python -m build --wheel/);
  assert.match(html, /orders_etl-0\.1\.0-py3-none-any\.whl/);
  assert.match(html, /python-wheel-deployable-project-flow/);
});

test("renders the ninetieth Databricks lesson", async () => {
  const html = await render("/topics/dbx-090-test-pyramid-integration-testing");
  assert.match(html, /assertDataFrameEqual/);
  assert.match(html, /main\.it_l090_/);
  assert.match(html, /databricks-test-pyramid-integration-loop/);
});

test("renders the ninety-first Databricks lesson", async () => {
  const html = await render("/topics/dbx-091-declarative-automation-bundles");
  assert.match(html, /databricks bundle plan -t dev/);
  assert.match(html, /environment_version: &quot;5&quot;/);
  assert.match(html, /declarative-automation-bundle-lifecycle/);
});

test("renders the ninety-second Databricks lesson", async () => {
  const html = await render("/topics/dbx-092-dev-test-prod-isolation");
  assert.match(html, /orders_prod/);
  assert.match(html, /build_sha/);
  assert.match(html, /dev-test-prod-isolation-and-promotion/);
});

test("renders the ninety-third Databricks lesson", async () => {
  const html = await render("/topics/dbx-093-ci-cd-workflow");
  assert.match(html, /DATABRICKS_AUTH_TYPE: github-oidc/);
  assert.match(html, /RELEASE_EVIDENCE=/);
  assert.match(html, /databricks-ci-cd-quality-gates/);
});

test("renders the ninety-fourth Databricks lesson", async () => {
  const html = await render("/topics/dbx-094-jobs-pipelines-observability");
  assert.match(html, /Succeeded with failures/);
  assert.match(html, /OBS_EVENT=/);
  assert.match(html, /jobs-pipelines-observability-loop/);
});

test("renders the ninety-fifth Databricks lesson", async () => {
  const html = await render("/topics/dbx-095-system-tables-monitoring");
  assert.match(html, /system\.lakeflow\.job_run_timeline/);
  assert.match(html, /PERCENTILE_APPROX/);
  assert.match(html, /system-tables-monitoring-semantic-layer/);
});

test("renders the ninety-sixth Databricks lesson", async () => {
  const html = await render("/topics/dbx-096-spark-performance-tuning-methodology");
  assert.match(html, /BatchEvalPython/);
  assert.match(html, /explain\(mode=&quot;cost&quot;\)/);
  assert.match(html, /spark-performance-hypothesis-loop/);
});

test("renders the ninety-seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-097-sql-query-profile-photon-optimization");
  assert.match(html, /LEFT SEMI JOIN/);
  assert.match(html, /QUERY_PROFILE_EXPERIMENT/);
  assert.match(html, /sql-query-profile-photon-funnel/);
});

test("renders the ninety-eighth Databricks lesson", async () => {
  const html = await render("/topics/dbx-098-serverless-cost-performance-tradeoffs");
  assert.match(html, /product_features\.performance_target/);
  assert.match(html, /dbu_per_success/);
  assert.match(html, /serverless-cost-performance-control-plane/);
});

test("renders the ninety-ninth Databricks lesson", async () => {
  const html = await render("/topics/dbx-099-data-quality-sla-alerting");
  assert.match(html, /ON VIOLATION FAIL UPDATE/);
  assert.match(html, /EMPTY_INPUT/);
  assert.match(html, /data-quality-slo-alert-closed-loop/);
});

test("renders the one-hundredth Databricks lesson", async () => {
  const html = await render("/topics/dbx-100-production-incident-response-postmortem");
  assert.match(html, /TIMESTAMPDIFF\(MINUTE/);
  assert.match(html, /NOT_RECOVERED/);
  assert.match(html, /production-incident-command-and-learning-loop/);
});

test("renders the one-hundred-first Databricks lesson", async () => {
  const html = await render("/topics/dbx-101-graduation-project-requirements-architecture");
  assert.match(html, /ARCH_READY/);
  assert.match(html, /CONTRACT_READY/);
  assert.match(html, /graduation-project-architecture-blueprint/);
});

test("renders the one-hundred-second Databricks lesson", async () => {
  const html = await render("/topics/dbx-102-build-order-bronze-ingestion");
  assert.match(html, /cloudFiles\.schemaLocation/);
  assert.match(html, /availableNow=True/);
  assert.match(html, /bronze-order-ingestion-replay-contract/);
});

test("renders the one-hundred-third Databricks lesson", async () => {
  const html = await render("/topics/dbx-103-build-silver-clean-dedup-cdc");
  assert.match(html, /create_auto_cdc_flow/);
  assert.match(html, /INVALID_QUANTITY/);
  assert.match(html, /silver-clean-dedup-cdc-decision-pipeline/);
});

test("renders the one-hundred-fourth Databricks lesson", async () => {
  const html = await render("/topics/dbx-104-build-gold-sales-subject-model");
  assert.match(html, /REFRESH POLICY AUTO/);
  assert.match(html, /GOLD_READY/);
  assert.match(html, /gold-sales-semantic-star-model/);
});

test("renders the one-hundred-fifth Databricks lesson", async () => {
  const html = await render("/topics/dbx-105-add-real-time-event-stream");
  assert.match(html, /dropDuplicatesWithinWatermark/);
  assert.match(html, /rowsPerSecond/);
  assert.match(html, /real-time-order-events-state-flow/);
});

test("renders the one-hundred-sixth Databricks lesson", async () => {
  const html = await render("/topics/dbx-106-add-data-quality-quarantine");
  assert.match(html, /expect_all_or_drop/);
  assert.match(html, /QUALITY_GATE/);
  assert.match(html, /quality-quarantine-replay-control-loop/);
});

test("renders the one-hundred-seventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-107-configure-unity-catalog-permissions-lineage");
  assert.match(html, /system\.access\.table_lineage/);
  assert.match(html, /SHOW GRANTS/);
  assert.match(html, /unity-catalog-access-lineage-evidence-map/);
});

test("renders the one-hundred-eighth Databricks lesson", async () => {
  const html = await render("/topics/dbx-108-orchestrate-with-lakeflow-jobs");
  assert.match(html, /taskValues\.set/);
  assert.match(html, /repair/);
  assert.match(html, /lakeflow-jobs-order-orchestration-run-map/);
});

test("renders the one-hundred-ninth Databricks lesson", async () => {
  const html = await render("/topics/dbx-109-deploy-dev-prod-with-bundles");
  assert.match(html, /mode: production/);
  assert.match(html, /databricks bundle validate/);
  assert.match(html, /bundle-dev-prod-promotion-control-plane/);
});

test("renders the one-hundred-tenth Databricks lesson", async () => {
  const html = await render("/topics/dbx-110-monitoring-cost-dashboard");
  assert.match(html, /system\.billing\.usage/);
  assert.match(html, /pricing\.effective_list\.default/);
  assert.match(html, /monitoring-cost-dashboard-evidence-model/);
});

test("renders the one-hundred-eleventh Databricks lesson", async () => {
  const html = await render("/topics/dbx-111-end-to-end-acceptance-performance");
  assert.match(html, /assert_true/);
  assert.match(html, /EXPLAIN FORMATTED/);
  assert.match(html, /end-to-end-acceptance-performance-loop/);
});

test("renders the one-hundred-twelfth Databricks lesson", async () => {
  const html = await render("/topics/dbx-112-data-engineer-associate-2026-map");
  assert.match(html, /Data Ingestion and Loading - 21%/);
  assert.match(html, /weighted_readiness_pct/);
  assert.match(html, /dea-2026-exam-course-evidence-matrix/);
});

test("renders the one-hundred-thirteenth Databricks lesson", async () => {
  const html = await render("/topics/dbx-113-scenario-questions-interview-communication");
  assert.match(html, /CLEAR/);
  assert.match(html, /ROW_NUMBER\(\)/);
  assert.match(html, /scenario-interview-evidence-storyboard/);
});

test("renders the one-hundred-fourteenth Databricks lesson", async () => {
  const html = await render("/topics/dbx-114-summary-next-stage-plan");
  assert.match(html, /weighted_capability_pct/);
  assert.match(html, /30 \/ 60 \/ 90/);
  assert.match(html, /databricks-114-capability-compass-roadmap/);
});
