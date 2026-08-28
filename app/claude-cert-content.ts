import type { Topic } from "./content";
import {
  claudePracticeBankMarkdown,
  officialSamplesMarkdown,
} from "./claude-practice-bank";
import { detailedClaudeTutorials } from "./claude-cert-tutorials";

type Lesson = {
  title: string;
  objective: string;
  core: string;
  decisions: string[];
  glossary: Array<[string, string]>;
  drill: string;
};

function renderLesson(slug: string, lesson: Lesson) {
  return `## 学习目标
${lesson.objective}

## 核心课程
${lesson.core}

## 架构师决策清单
${lesson.decisions.map((item) => `- ${item}`).join("\n")}

## 关键词 · English → 中文
${lesson.glossary.map(([en, zh]) => `- **${en}**：${zh}`).join("\n")}

## 小练习
${lesson.drill}

${detailedClaudeTutorials[slug] ?? ""}`;
}

export const claudeCertificationTopics: Topic[] = [
  { slug: "ccar-p-000-exam-guide", title: "CCAR-P 官方考试蓝图与学习路线", date: "08.29", description: "认证导览 · 七大领域与备考规划" },
  { slug: "ccar-p-001-discovery-scoping", title: "从业务问题到可验证的 Claude 方案", date: "08.29", description: "Domain 1 · Discovery 与 Scoping" },
  { slug: "ccar-p-002-architecture-patterns", title: "Workflow、Agentic 与 Augmented LLM 架构", date: "08.29", description: "Domain 1 · 方案模式与任务分解" },
  { slug: "ccar-p-003-multi-agent-orchestration", title: "多代理、编排与端到端可靠性", date: "08.29", description: "Domain 1 · Multi-agent 与 Orchestration" },
  { slug: "ccar-p-004-model-selection", title: "Claude 模型选择与路由策略", date: "08.29", description: "Domain 2 · Model Selection" },
  { slug: "ccar-p-005-prompt-context", title: "Prompt、Context、Caching 与 Skills", date: "08.29", description: "Domain 2 · Prompting 与 Context Engineering" },
  { slug: "ccar-p-006-enterprise-integration", title: "企业集成：API、MCP、CLI 与 Agent-to-Agent", date: "08.29", description: "Domain 3 · Integration Patterns" },
  { slug: "ccar-p-007-tool-security", title: "工具授权、最小权限与渐进式发现", date: "08.29", description: "Domain 3 · Tool Security" },
  { slug: "ccar-p-008-rag", title: "RAG：分块、索引、检索与引用", date: "08.29", description: "Domain 3 · Retrieval-Augmented Generation" },
  { slug: "ccar-p-009-evaluation", title: "Evals：指标、数据集与验收门禁", date: "08.29", description: "Domain 4 · Evaluation Design" },
  { slug: "ccar-p-010-optimization-observability", title: "测试、优化、成本与可观测性", date: "08.29", description: "Domain 4 · Testing & Optimization" },
  { slug: "ccar-p-011-safety-governance", title: "安全栈、Human-in-the-loop 与失效保护", date: "08.29", description: "Domain 5 · Safety & Governance" },
  { slug: "ccar-p-012-compliance-ethics", title: "隐私、合规、公平性与证据链", date: "08.29", description: "Domain 5 · Compliance & Responsible AI" },
  { slug: "ccar-p-013-stakeholder-lifecycle", title: "利益相关者沟通、SLA 与生命周期", date: "08.29", description: "Domain 6 · Stakeholder & Lifecycle" },
  { slug: "ccar-p-014-team-enablement", title: "Claude Code、团队赋能与运营响应", date: "08.29", description: "Domain 7 · Developer Productivity" },
  { slug: "ccar-p-015-capstone", title: "综合架构案例：从 POC 到生产", date: "08.29", description: "Capstone · 跨领域架构决策" },
  { slug: "ccar-p-016-official-samples", title: "官方公开示例题 · 中英文对照", date: "08.29", description: "Official Samples · 3 题解析" },
  { slug: "ccar-p-017-bilingual-practice-bank", title: "CCAR-P 双语模拟题库 · 63 题", date: "08.29", description: "Original Practice Bank · 七大领域" },
];

const lessons: Record<string, Lesson> = {
  "ccar-p-001-discovery-scoping": {
    title: "从业务问题到可验证的 Claude 方案",
    objective: "把含糊的业务诉求转成边界清晰、可测量、可交付的 Claude 解决方案，并形成最小参考架构。",
    core: `高级架构师不会从“选哪个模型”开始，而会先做 **structured discovery（结构化发现）**。依次确认用户、任务、输入、输出、失败代价、数据边界、时延预算、人工责任和成功指标。把“做一个客服机器人”改写为：在允许的知识范围内起草回复；高风险意图转人工；不得执行退款；以正确性、升级率、p95 延迟和单次成本验收。

用 **problem framing（问题框定）** 区分三类工作：确定性规则交给普通软件；语言理解与生成交给 Claude；高风险或不可逆判断保留人工审批。然后绘制最小 **reference architecture（参考架构）**：入口、身份、编排、模型、上下文、工具、数据、安全控制、评估、可观测性与反馈闭环。

POC 必须验证最危险的假设，而不是展示最漂亮的对话。先写明 **acceptance criteria（验收标准）** 和 **out-of-scope（范围外事项）**，再决定模型、上下文和入口。`,
    decisions: [
      "用户、任务和决策权是否具体到角色与场景？",
      "哪些步骤是确定性的，哪些需要模型判断，哪些必须人工批准？",
      "失败会造成不便、经济损失，还是合规与安全事件？",
      "是否有可测量的质量、延迟、成本、可靠性与安全门槛？",
      "POC 是否覆盖最高风险假设，并定义了退出条件？",
    ],
    glossary: [["structured discovery", "结构化发现"], ["problem framing", "问题框定"], ["scope boundary", "范围边界"], ["reference architecture", "参考架构"], ["acceptance criteria", "验收标准"], ["business value hypothesis", "业务价值假设"], ["reversibility", "可逆性"], ["entry point", "用户或系统进入方案的入口"]],
    drill: "把“用 Claude 自动审核合同”重写为 6 条可验证需求：用户、输入、输出、允许动作、人工门禁和成功指标。",
  },
  "ccar-p-002-architecture-patterns": {
    title: "Workflow、Agentic 与 Augmented LLM 架构",
    objective: "根据任务的可预测性、可逆性和探索需求，在工作流、代理和增强型 LLM 之间做出可解释的选择。",
    core: `**workflow（工作流）** 适合步骤已知、控制要求高的流程；模型只承担分类、提取、总结等局部判断。**agentic architecture（代理式架构）** 适合路径无法预先穷举、必须根据中间结果重新规划的任务，但必须配置工具白名单、步数、预算、超时和停止条件。**augmented LLM（增强型大语言模型）** 是模型加检索、工具、记忆或结构化上下文，不等于自治代理。

任务分解时使用 **planner-executor（规划器—执行器）**、**router（路由器）**、**parallelization（并行化）**、**evaluator-optimizer（评估器—优化器）** 等组合。不要为了“智能”引入循环和代理；每增加一次模型判断，都增加延迟、成本、非确定性和调试难度。

选择原则：已知路径优先确定性编排；未知路径才引入受限代理；不可逆动作必须在代理边界外验证与批准。`,
    decisions: ["任务路径能否在设计时枚举？", "错误动作是否可逆，能否补偿？", "代理的最大步数、预算、工具和停止条件是什么？", "是否可以把一个开放任务拆成多个可测的确定性阶段？", "失败后是重试、降级、转人工还是终止？"],
    glossary: [["workflow", "确定步骤的工作流"], ["agentic architecture", "代理式架构"], ["augmented LLM", "由检索、工具或记忆增强的大语言模型"], ["planner-executor", "规划器—执行器模式"], ["routing", "按条件路由"], ["bounded autonomy", "有边界的自主性"], ["stop condition", "停止条件"], ["compensating action", "补偿动作"]],
    drill: "为“员工差旅报销”和“开放式市场研究”分别选择架构模式，并用英文关键词说明选择依据。",
  },
  "ccar-p-003-multi-agent-orchestration": {
    title: "多代理、编排与端到端可靠性",
    objective: "判断何时需要多代理，并设计明确的责任、状态、协议和失败隔离。",
    core: `**multi-agent system（多代理系统）** 只有在任务可按专业能力、权限边界或并行工作流清晰拆分时才有价值。一个提示太长并不是引入多个代理的充分理由。常见模式包括 **supervisor-worker（监督者—执行者）**、**handoff（交接）**、**debate/review（辩论/复核）** 和并行扇出汇总。

编排层应拥有全局状态、关联标识、预算、超时和最终决策。代理之间传递结构化结果而非无限对话，使用契约定义输入、输出、置信度、证据和错误。共享记忆会放大隐私泄漏与陈旧状态风险，应明确作用域和保留期。

可靠性必须端到端设计：幂等工具调用、重复检测、部分完成恢复、失败隔离和人工接管。多代理的评估不只看最终答案，还要看路由正确率、交接完整性、工具调用成功率和成本。`,
    decisions: ["每个代理是否有不可重叠的责任与权限？", "谁拥有最终状态和决策？", "交接契约是否包含证据、置信度与错误？", "是否能隔离单个代理失败并安全恢复？", "多代理收益是否超过协调成本？"],
    glossary: [["multi-agent system", "多代理系统"], ["orchestration", "编排"], ["supervisor-worker", "监督者—执行者"], ["handoff contract", "交接契约"], ["shared memory", "共享记忆"], ["failure isolation", "失败隔离"], ["correlation ID", "关联标识"], ["partial completion", "部分完成"]],
    drill: "画出一个合同分析系统的监督者、条款提取代理、风险代理和人工法务之间的责任边界。",
  },
  "ccar-p-004-model-selection": {
    title: "Claude 模型选择与路由策略",
    objective: "以质量、延迟、成本、上下文和工具能力为依据选择模型，并用评估数据支持路由。",
    core: `模型选择不是“越大越好”。先建立 **capability baseline（能力基线）**，再比较准确性、复杂推理、工具使用、上下文长度、吞吐、延迟和成本。模型名称会演进，因此架构应依赖能力与评估，而不是把产品名硬编码为业务规则。

**model routing（模型路由）** 可按任务类型、风险、置信度、输入长度和服务等级分流。简单可逆任务使用满足门槛的经济模型；复杂或高风险任务升级到更强模型或人工。路由自身也必须评估，避免节省 token 却降低整体成功率。

迁移模型时运行固定评估集、回归关键工具调用和结构化输出，并设置灰度、回滚和版本可观测性。`,
    decisions: ["最低可接受质量是多少？", "p95 延迟、吞吐和单次成本预算是什么？", "模型是否支持需要的上下文、工具和结构化输出？", "升级与降级条件是否有数据依据？", "版本切换是否可灰度、观测和回滚？"],
    glossary: [["model selection", "模型选择"], ["capability baseline", "能力基线"], ["model routing", "模型路由"], ["quality threshold", "质量门槛"], ["fallback", "降级或备用路径"], ["latency budget", "延迟预算"], ["cost-performance trade-off", "成本—性能权衡"], ["regression evaluation", "回归评估"]],
    drill: "为邮件分类、合规摘要和自主运维三个任务写出模型选择矩阵，至少包含质量、延迟、成本与风险。",
  },
  "ccar-p-005-prompt-context": {
    title: "Prompt、Context、Caching 与 Skills",
    objective: "构造可维护的系统提示和上下文，控制 token、缓存稳定前缀，并判断何时使用 Skills。",
    core: `**system prompt（系统提示）** 定义角色、目标、边界、输出契约和拒绝条件；动态用户数据不应混入不可变策略。把稳定规则、示例和参考材料放在前面，把变化内容放在后面，可利用 **prompt caching（提示缓存）** 降低重复处理成本和延迟。

**zero-shot（零样本）** 先验证清晰指令是否足够；需要展示边界与格式时使用 **few-shot（少样本）**。对于复杂推理，要求模型给出可核验的结论、证据和步骤摘要，而不是把不可控的内部推理当成审计证据。

上下文工程关注“给什么、何时给、给多少”。长上下文不是知识库替代品。使用检索、摘要、分段对话和结构化状态控制 token。**Skills（技能）** 适合封装可复用的说明、资源与操作流程；需要外部实时能力时仍应使用工具或 MCP。`,
    decisions: ["指令层、业务数据层和工具结果是否分离？", "稳定前缀是否适合缓存，动态内容是否位于后部？", "示例是否覆盖关键边界而没有泄露敏感数据？", "上下文是否相关、新鲜并在 token 预算内？", "重复流程应做模板、Skill，还是外部工具？"],
    glossary: [["system prompt", "系统提示"], ["prompt template", "提示模板"], ["zero-shot", "零样本提示"], ["few-shot", "少样本提示"], ["context engineering", "上下文工程"], ["prompt caching", "提示缓存"], ["stable prefix", "稳定前缀"], ["Skills", "可复用的技能包"]],
    drill: "重构一个 8,000-token 固定策略 + 短用户消息的请求：标出稳定前缀、动态后缀、缓存点与验证指标。",
  },
  "ccar-p-006-enterprise-integration": {
    title: "企业集成：API、MCP、CLI 与 Agent-to-Agent",
    objective: "选择适合的集成入口，控制上下文膨胀，并建立身份、协议与可观测性边界。",
    core: `Claude 的 **Messages API（消息 API）** 是无状态的，应用必须显式管理对话历史、工具结果和业务状态。直接 API 适合受控服务集成；**Model Context Protocol, MCP（模型上下文协议）** 用统一方式暴露工具和资源；CLI 适合开发者工作流；**agent-to-agent（代理到代理）** 需要额外的身份、契约和信任边界。

避免 **capability bloat（能力膨胀）**：不要把所有工具说明一次性塞进上下文。使用 **progressive discovery（渐进式发现）**，先提供目录或少量高相关工具，再按任务加载详细 schema。每个调用都应有调用方身份、目标、权限、超时、重试策略、关联标识和审计记录。

架构评审要比较数据位置、网络边界、实时性、失败语义和供应方限制，而不是只比较开发便利性。`,
    decisions: ["对话与业务状态由谁持久化？", "API、MCP、CLI 或代理协议中哪个最符合运行边界？", "工具目录是否按需发现而非全量注入？", "认证、授权、超时、重试和幂等是否端到端一致？", "是否记录模型版本、请求标识、工具结果和成本但不泄露秘密？"],
    glossary: [["Messages API", "Claude 消息 API"], ["stateless", "无状态"], ["Model Context Protocol (MCP)", "模型上下文协议"], ["agent-to-agent", "代理到代理"], ["capability bloat", "能力膨胀"], ["progressive discovery", "渐进式发现"], ["schema", "结构契约"], ["trust boundary", "信任边界"]],
    drill: "为“Claude 读取工单并调用内部知识与审批服务”比较直接 API 与 MCP，两列写出优点、风险和控制。",
  },
  "ccar-p-007-tool-security": {
    title: "工具授权、最小权限与渐进式发现",
    objective: "把模型建议与系统授权分开，防止越权工具调用和提示注入。",
    core: `模型可以提出工具调用，但真正的 **authorization（授权）** 必须由确定性策略层执行。采用 **least privilege（最小权限）**：只暴露任务需要的工具、资源、参数和数据行；区分读取、写入、删除与资金动作；使用短期、可追踪的用户或服务身份。

对高影响工具实行 **policy enforcement point（策略执行点）**：验证主体、对象、动作、业务条件、速率和审批。工具描述与返回值都是潜在的不可信输入；**prompt injection（提示注入）** 可能诱导模型越权，因此不能仅靠系统提示防护。

不可逆动作采用预览、二次确认或人工批准。失败时应 **fail closed（失效关闭）**，而不是在授权服务不可用时放行。`,
    decisions: ["模型能看到的工具是否超过任务需要？", "执行层是否独立验证身份、权限、参数和资源范围？", "工具输出是否按不可信内容处理？", "高影响动作是否预览、审批、限额并可审计？", "授权或安全检查不可用时是否拒绝执行？"],
    glossary: [["authentication", "认证：确认调用者是谁"], ["authorization", "授权：决定调用者能做什么"], ["least privilege", "最小权限"], ["policy enforcement point", "策略执行点"], ["prompt injection", "提示注入"], ["tool allowlist", "工具允许列表"], ["human approval", "人工审批"], ["fail closed", "失效关闭"]],
    drill: "审查一个拥有读取工单、退款和删除账户工具的客服代理，写出新的最小权限工具集与审批门禁。",
  },
  "ccar-p-008-rag": {
    title: "RAG：分块、索引、检索与引用",
    objective: "根据数据和查询形态设计 RAG，区分检索失败与生成失败。",
    core: `**Retrieval-Augmented Generation, RAG（检索增强生成）** 把外部知识检索到上下文中。设计顺序是语料治理、解析、**chunking（分块）**、元数据、向量或关键词索引、检索、重排、上下文组装、生成与引用。

分块要保留语义边界和来源；检索策略按数据与查询形态选择。精确编号适合关键词或混合检索，语义问题适合向量检索，复杂语料常需 **hybrid search（混合检索）** 与 **reranking（重排序）**。Anthropic 不提供自有 embedding 模型，方案需评估外部嵌入供应方及其数据、成本和部署边界。

评估拆成 **retrieval quality（检索质量）** 与生成质量。语料刷新后错误激增，应先查解析、索引新鲜度、过滤和返回分块，再调整提示或模型。`,
    decisions: ["语料是否权威、去重、可追踪且有刷新策略？", "分块是否保留标题、来源、版本和访问控制？", "检索方法是否匹配精确、语义或混合查询？", "是否单独测量召回率、相关性和引用正确性？", "无证据或冲突证据时是否拒答或转人工？"],
    glossary: [["Retrieval-Augmented Generation (RAG)", "检索增强生成"], ["chunking", "分块"], ["embedding", "嵌入向量"], ["vector search", "向量检索"], ["hybrid search", "混合检索"], ["reranking", "重排序"], ["retrieval quality", "检索质量"], ["index freshness", "索引新鲜度"]],
    drill: "为 50 万页政策文档设计 RAG：说明分块、元数据、检索、重排、引用和更新后的回归测试。",
  },
  "ccar-p-009-evaluation": {
    title: "Evals：指标、数据集与验收门禁",
    objective: "把评估作为验收标准和发布门禁，覆盖质量、成本、延迟、安全与业务结果。",
    core: `**evals（评估）** 不是上线前一次性评分，而是贯穿发现、POC、发布和运营的控制系统。先从失败代价定义指标：准确性、任务成功率、引用正确性、拒答、延迟、成本、安全与业务 KPI。

测试集应包括代表性生产样本、边界案例、对抗样本和历史故障，并划分开发集与保留集，避免针对答案过拟合。评分可以结合确定性检查、人工专家、模型评分器和真实业务信号。使用模型评分器时要校准偏差，并保留人工抽检。

把门槛写成 **release gate（发布门禁）**：关键安全指标不得下降，质量达到阈值，p95 延迟和单次成本在预算内。对提示、模型、检索或工具变更执行回归和 A/B 测试。`,
    decisions: ["指标是否直接对应用户价值和失败风险？", "数据集是否代表生产分布、边界和对抗情况？", "自动评分是否经过人工校准？", "是否有固定保留集防止评估过拟合？", "发布门禁是否同时覆盖质量、延迟、成本和安全？"],
    glossary: [["evaluation (eval)", "评估"], ["golden dataset", "黄金/基准数据集"], ["holdout set", "保留测试集"], ["rubric", "评分规程"], ["LLM-as-a-judge", "以模型作为评分器"], ["release gate", "发布门禁"], ["A/B testing", "A/B 测试"], ["acceptance threshold", "验收阈值"]],
    drill: "为客服回复系统定义 8 个指标，并写出至少 2 个硬门禁和 2 个可优化指标。",
  },
  "ccar-p-010-optimization-observability": {
    title: "测试、优化、成本与可观测性",
    objective: "用证据诊断 hallucination、提示、检索和模型不匹配，并在质量约束下优化成本与延迟。",
    core: `测试采用分层策略：单元级结构验证、组件级检索与工具测试、端到端任务评估、负载与故障注入。出现错误时先分类：**hallucination（幻觉）**、指令不清、上下文缺失、检索错误、工具错误、路由错误或模型能力不匹配。

优化顺序应保质量：删除无关上下文、缓存稳定前缀、并行独立调用、减少往返、使用批处理或满足阈值的较小模型，再考虑更激进的缩短输出。每次优化都用同一评估集重测。

可观测性记录请求与追踪标识、模型和提示版本、token、缓存命中、延迟、停止原因、工具调用、错误、结果评分和成本；敏感提示、用户数据和密钥不得直接进入日志。`,
    decisions: ["错误是否按根因层分类而非统称模型问题？", "每项优化是否在固定质量门槛下比较？", "是否测量端到端与各组件的 p50/p95/p99？", "日志是否可关联模型、提示、检索和工具版本？", "监控是否有明确负责人、阈值和响应手册？"],
    glossary: [["hallucination", "幻觉：缺乏依据却生成内容"], ["observability", "可观测性"], ["distributed tracing", "分布式追踪"], ["token usage", "token 用量"], ["cache hit", "缓存命中"], ["p95 latency", "第 95 百分位延迟"], ["cost attribution", "成本归因"], ["fault injection", "故障注入"]],
    drill: "给出“回答错误但 HTTP 200”的诊断树，依次检查检索、提示、模型、工具和输出后处理。",
  },
  "ccar-p-011-safety-governance": {
    title: "安全栈、Human-in-the-loop 与失效保护",
    objective: "构建输入、输出、工具和人工控制组成的纵深安全体系。",
    core: `安全不是一个过滤器，而是 **defense in depth（纵深防御）**。输入层做身份、速率、恶意内容与提示注入检查；模型层设置清晰边界；输出层验证结构、敏感数据和政策；工具层执行授权与参数验证；运营层监控、审计和响应。

根据风险、置信度和可逆性设计 **human-in-the-loop, HITL（人在回路中）**。高金额、法律结论、医疗建议、权限变更和删除等不可逆动作需要审批。人工节点必须获得原始输入、模型建议、证据、置信度和可执行选项，不能只看到“请批准”。

定义安全失败：检查器不可用、证据缺失、模型不确定或工具超时，应拒绝、降级或转人工。所有例外都有 owner、期限和补偿控制。`,
    decisions: ["输入、输出、工具与运营控制是否分层？", "人工门禁是否与风险、置信度和可逆性关联？", "审批者是否获得足够证据和上下文？", "安全组件不可用时系统是否安全降级？", "事件、例外和控制证据是否可审计？"],
    glossary: [["defense in depth", "纵深防御"], ["input screening", "输入筛查"], ["output screening", "输出筛查"], ["Human-in-the-loop (HITL)", "人在回路中"], ["confidence threshold", "置信度阈值"], ["fail-safe", "失效安全"], ["guardrail", "安全护栏"], ["incident response", "事件响应"]],
    drill: "为自动退款场景画出输入筛查、模型、工具授权、金额门槛、人工审批、输出检查与审计。",
  },
  "ccar-p-012-compliance-ethics": {
    title: "隐私、合规、公平性与证据链",
    objective: "把 GDPR、HIPAA、FedRAMP 等义务映射为控制、负责人和可审计证据。",
    core: `合规设计从数据流与适用义务开始，而不是从法规名称开始。建立 **data inventory（数据清单）** 和数据流图，识别个人数据、健康信息、机密、处理目的、区域、保留期和第三方。执行数据最小化、加密、访问控制、删除与主体请求流程。

不同场景可能涉及 **GDPR（欧盟通用数据保护条例）**、**HIPAA（美国健康保险可携性与责任法案）** 或 **FedRAMP（美国联邦云风险与授权管理计划）**。架构师应与法务/合规确认适用性，再把义务转成技术与流程控制：owner、证据、测试频率和例外审批。

Responsible AI 还包括 **bias（偏差）**、**fairness（公平性）**、**transparency（透明性）** 和可申诉性。按相关人群切分结果、测试差异影响、说明系统限制，并为高影响决定提供人工复核。`,
    decisions: ["数据类型、目的、区域、保留和第三方是否明确？", "是否只传输并保存任务所需的最少数据？", "每项义务是否映射到控制、owner、证据和测试周期？", "是否按相关群体评估偏差与差异影响？", "用户是否知道 AI 的角色、限制和申诉渠道？"],
    glossary: [["data minimization", "数据最小化"], ["data residency", "数据驻留"], ["retention policy", "保留策略"], ["GDPR", "欧盟通用数据保护条例"], ["HIPAA", "美国健康保险可携性与责任法案"], ["FedRAMP", "美国联邦云风险与授权管理计划"], ["bias", "偏差"], ["transparency", "透明性"]],
    drill: "为医疗摘要方案建立“义务—控制—负责人—证据”四列表，至少写出 6 行。",
  },
  "ccar-p-013-stakeholder-lifecycle": {
    title: "利益相关者沟通、SLA 与生命周期",
    objective: "用结构化发现、权衡说明、交付文档和反馈闭环管理从发现到退役的完整生命周期。",
    core: `与业务沟通时先确认目标、约束、决策者和不可接受结果。架构评审应呈现 **trade-off（权衡）**，而不是单一推荐：对质量、延迟、成本、可靠性、安全和交付时间给出证据与剩余风险。

**Service Level Agreement, SLA（服务级别协议）** 要明确指标、测量窗口、排除项和违约响应；模型质量通常还需 **SLO（服务级别目标）** 与评估门禁补充。利益相关者更新采用“已知事实—影响—行动—风险—下一决策点”，避免把假设写成结论。

生命周期包括 discovery、design、POC、pilot、production、monitoring、iteration 和 retirement。交接必须包含参考架构、数据流、提示/模型/工具版本、评估、运行手册、告警、owner、回滚与已知限制。`,
    decisions: ["成功、风险和决策权是否对齐？", "方案权衡是否量化并标注假设？", "SLA/SLO 是否有测量方法和负责人？", "交接材料能否支持独立运行与故障恢复？", "反馈是否进入有优先级、有门禁的迭代流程？"],
    glossary: [["stakeholder discovery", "利益相关者发现"], ["trade-off", "权衡"], ["Service Level Agreement (SLA)", "服务级别协议"], ["Service Level Objective (SLO)", "服务级别目标"], ["handoff", "交接"], ["runbook", "运行手册"], ["feedback loop", "反馈闭环"], ["retirement criteria", "退役条件"]],
    drill: "写一段 90 秒管理层更新：试点节省时间但质量未达标，量化差距、价值、风险、下一实验和决策日期。",
  },
  "ccar-p-014-team-enablement": {
    title: "Claude Code、团队赋能与运营响应",
    objective: "建立受治理的 Claude Code 团队配置、推广指标和问题响应流程。",
    core: `团队采用 Claude Code 时，共享项目指令、权限、hooks、允许的 MCP 配置和测试命令应进入版本管理。个人环境、CI 与生产使用不同的最小权限身份，密钥不写入提示、仓库或日志。

从有边界的任务和自愿团队开始，建立开发周期、评审时间、返工、逃逸缺陷、任务成功率和开发者体验基线。代码行数与消息数只是活动量，不能代表 **developer productivity（开发者生产力）**。

异常响应遵循证据优先：保留日志与 diff，复现，缩小指令与权限，增加回归用例，记录恢复步骤，再分阶段恢复。AI 生成代码仍必须通过静态检查、测试、代码评审与供应链控制。`,
    decisions: ["共享配置和权限是否版本化与评审？", "本地、CI 和生产身份是否隔离？", "是否从低风险任务分阶段推广？", "指标是否同时覆盖速度、质量、返工和体验？", "问题是否有复现、收敛、回归和恢复手册？"],
    glossary: [["Claude Code", "Anthropic 的代理式编码工具"], ["project instructions", "项目级指令"], ["hook", "在事件点执行的自动化钩子"], ["developer productivity", "开发者生产力"], ["escaped defect", "逃逸到后续环境或生产的缺陷"], ["diff review", "差异评审"], ["regression case", "回归用例"], ["operational enablement", "运营赋能"]],
    drill: "为 20 人团队写出四阶段 Claude Code 推广计划，每阶段包含范围、权限、指标、门禁和回滚。",
  },
  "ccar-p-015-capstone": {
    title: "综合架构案例：从 POC 到生产",
    objective: "用一套参考案例串联七大考试领域，形成可复用的答题决策框架。",
    core: `案例：企业希望 Claude 读取采购请求、检索政策、给出建议并在满足条件时创建审批单。先限定系统不自动批准采购，只能生成建议与创建草稿。入口通过企业身份认证，编排层管理状态；RAG 提供政策证据；Claude 结构化输出建议、引用和风险；工具策略层验证用户、金额、成本中心与操作；高金额或低置信度转人工。

POC 使用匿名化历史请求验证检索、建议质量与升级率。生产前建立离线评估集、安全对抗集、端到端沙箱测试、p95 延迟与成本门禁。稳定政策前缀启用提示缓存；工具按需发现；所有写操作使用幂等键。日志记录模型/提示/检索版本、工具结果和审计事件，不记录密钥与不必要的采购内容。

运营阶段监控质量漂移、索引新鲜度、权限拒绝、人工推翻率与成本。政策或模型变更先回归、灰度和可回滚发布。`,
    decisions: ["Domain 1：用工作流承载固定审批，用模型处理语言判断。", "Domain 2：按评估选模型，稳定前缀缓存，输出有 schema。", "Domain 3：RAG 与工具分离；MCP/API 按边界选择；最小权限。", "Domain 4：离线、在线、对抗与端到端评估共同形成门禁。", "Domain 5：输入/输出/工具安全栈；高风险 HITL；fail closed。", "Domain 6：SLA、交接、owner、反馈与退役标准。", "Domain 7：共享配置、分阶段推广、可复现运营响应。"],
    glossary: [["proof of concept (POC)", "概念验证"], ["pilot", "受控试点"], ["production readiness", "生产就绪度"], ["reference architecture", "参考架构"], ["decision record", "架构决策记录"], ["rollback", "回滚"], ["quality drift", "质量漂移"], ["operating model", "运营模型"]],
    drill: "限时 25 分钟输出该案例的一页架构说明：范围、组件、数据流、信任边界、评估、SLA、上线门禁和五项风险。",
  },
};

const examGuideMarkdown = `## 认证与考试概览
**Claude Certified Architect – Professional (CCAR-P)** 用于验证在企业规模下建议、设计、构建和运营 Claude 解决方案的高级架构能力。官方考试指南为 **Version 1.0（版本 1.0）**，自 **2026 年 7 月**生效。

- 考试时长：**120 minutes / 120 分钟**
- 题量：**63 questions / 63 题**
- 题型：**multiple-choice and multiple-response / 单选与多选**
- 语言：**English / 英语**
- 费用：**US$175**
- 通过分：**720**，量表范围 **100–1000**
- 方式：线上监考或 Pearson VUE 考试中心
- 有效期：**12 months / 12 个月**；到期前可参加免费的非监考续证评估

## 七大考试领域
1. **Integration（集成）— 19%**：能力膨胀、认证授权、准确性—延迟、规模化可观测性、RAG、MCP/API/CLI/agent-to-agent、渐进式发现。
2. **Solution Design & Architecture（解决方案设计与架构）— 17%**：业务问题转化、端到端架构、workflow/agentic/augmented LLM、多代理与编排、任务分解、业务价值与 SLA。
3. **Evaluation, Testing & Optimization（评估、测试与优化）— 16%**：质量/延迟/成本/安全指标、数据集、混合评估、A/B、根因诊断、token 与成本优化、日志和可观测性。
4. **Governance, Safety & Risk Management（治理、安全与风险管理）— 14%**：护栏、失败模式、HITL、GDPR/HIPAA/FedRAMP、偏差、公平性与透明性。
5. **Stakeholder Communication & Lifecycle Management（利益相关者沟通与生命周期管理）— 14%**：发现、需求、权衡、SLA、文档、交接、监控与迭代。
6. **Claude Models, Prompting & Context Engineering（Claude 模型、提示与上下文工程）— 13%**：模型选择、系统提示、模板、零/少样本、上下文与 token 优化、缓存、模块化提示和 Skills。
7. **Developer Productivity & Operational Enablement（开发者生产力与运营赋能）— 7%**：Claude Code、团队工具与环境、工作流集成、调试和运营响应。

## 官方准备课程结构
官方免费准备课程分为五组：**Claude Platform & Solution Design（238 分钟）**、**Enterprise Integration & Production（158 分钟）**、**Responsible AI, Safety & Risk for Architects（114 分钟）**、**Stakeholder Engagement, Lifecycle & GTM（178 分钟）**、**Team Enablement & Operational Productivity（45 分钟）**。

推荐先修包括：**Claude 101**、**Claude Code in Action**、**AI Fluency: Framework & Foundations**、**Building with Claude API**、**Introduction to MCP**、**AI Capabilities and Limitations**。官方候选人画像建议具备 3 年以上系统架构或平台工程经验，以及 6 个月以上 Claude 或类似生产 LLM 经验；这些是建议，不是强制报名门槛。

## 重考与保密
首次未通过后等待 14 天，第二次后 30 天，第三次后 90 天；滚动 12 个月最多 4 次。正式考试内容受保密协议约束，复制、传播或使用泄露题目不符合认证规则。

## 本模块怎么使用
先完成 001–015 课程，再做 016 的 3 道官方公开示例题，最后在 120 分钟内完成 017 的 63 道原创双语模拟题。错题按 Domain 归类，不背选项，必须能说明为什么其他选项不成立。

## 考纲到课程的完整映射
- **Domain 1 · Integration（集成）**：006 企业集成、007 工具安全、008 RAG；同时在 010 学习生产可观测性。
- **Domain 2 · Solution Design & Architecture（解决方案设计与架构）**：001 需求发现、002 架构模式、003 多代理编排、015 综合案例。
- **Domain 3 · Evaluation, Testing & Optimization（评估、测试与优化）**：009 评估体系、010 测试优化与可观测性，并在 015 完成端到端验证设计。
- **Domain 4 · Governance, Safety & Risk Management（治理、安全与风险管理）**：007 工具信任边界、011 安全治理、012 合规伦理。
- **Domain 5 · Stakeholder Communication & Lifecycle Management（利益相关者沟通与生命周期管理）**：001 业务问题定义、013 沟通与生命周期、015 上线和运营方案。
- **Domain 6 · Claude Models, Prompting & Context Engineering（模型、提示与上下文工程）**：004 模型选择、005 提示与上下文、008 检索上下文、010 token 与缓存观测。
- **Domain 7 · Developer Productivity & Operational Enablement（开发者生产力与运营赋能）**：014 Claude Code 与团队赋能、015 生产运营。

## 四阶段学习路径
### 阶段一：先建立架构判断
完成 001–003。每遇到一个需求，先回答：真正的业务目标是什么？规则能否用确定性代码表达？是否真的需要 agent？多代理带来的收益是否大于协调成本？

### 阶段二：掌握 Claude 平台能力
完成 004–008。把 **model selection（模型选择）**、**system prompt（系统提示）**、**context window（上下文窗口）**、**prompt caching（提示缓存）**、**tool use（工具使用）**、**MCP** 与 **RAG** 放进同一套端到端数据流里理解。

### 阶段三：建立生产门禁
完成 009–014。先定义 **success criteria（成功标准）**，再设计离线评估、在线指标、对抗测试、安全护栏、人工升级、审计、SLA、交接与退役条件。

### 阶段四：综合演练
完成 015–017。先用综合案例写一页架构说明，再分析官方公开样题，最后严格计时完成模拟题。复盘时必须写出题干中的约束、正确选项解决的根因，以及每个干扰项为什么不充分。

## 八周备考计划
1. **第 1 周**：000–001。理解蓝图、候选人画像、发现访谈、范围和成功指标。
2. **第 2 周**：002–003。比较 workflow、augmented LLM、agent 与 multi-agent，练习任务分解和失败隔离。
3. **第 3 周**：004–005。模型路由、提示模板、上下文预算、缓存、结构化输出和 Skills。
4. **第 4 周**：006–008。API、MCP、CLI、agent-to-agent、工具 schema、权限、提示注入与 RAG。
5. **第 5 周**：009–010。评估数据集、混合评分、回归、A/B、延迟、成本、日志、追踪和告警。
6. **第 6 周**：011–012。分层护栏、HITL、fail closed、隐私、合规、公平性和透明度。
7. **第 7 周**：013–015。SLA、架构决策记录、版本治理、Claude Code 推广和综合方案。
8. **第 8 周**：016–017。先做官方公开示例，再做两轮 63 题模拟；第二轮只重做错题和低置信题。

## 场景题通用答题框架
1. **圈约束**：数据敏感度、动作可逆性、实时性、准确率、预算、合规和组织边界。
2. **找根因**：区分检索、模型推理、提示、工具、权限、数据新鲜度和编排问题，不被表面症状带走。
3. **选最小充分架构**：固定流程优先 workflow；开放式、需要动态选工具的任务才使用 agent；无证据时不要先拆成多代理。
4. **把确定性控制移出模型**：权限、金额阈值、schema、状态转换、幂等和审计由代码或策略层执行。
5. **为高风险动作设置 HITL**：低置信、高影响、不可逆或受监管操作需要人工批准，并定义超时和拒绝路径。
6. **要求可验证证据**：离线评估、端到端沙箱、生产指标、分布式追踪、版本记录、灰度和回滚共同构成上线依据。

## 完成标准
完成本模块后，你应能在不看答案的情况下：为一个企业 Claude 方案画出组件、数据流和信任边界；解释模型、RAG、工具与编排的取舍；定义质量、延迟、成本和安全门禁；设计人工升级与故障降级；并用中英文准确说明至少 80 个核心术语。`;

const officialSamplesIntro = `## 题目说明
本页收录官方考试指南公开的 **3 道 illustrative sample questions（说明性示例题）** 的双语等义整理与解析。它们用于展示命题风格，不是正式考试题，也不代表完整题库。正式考试内容受保密协议保护。

## 官方公开示例题
${officialSamplesMarkdown}

## 复盘方法
每题先圈出风险、约束和真正被问的决策，再使用 **least privilege（最小权限）**、**prompt caching（提示缓存）**、**retrieval/indexing path（检索/索引链路）** 等原则排除表面正确但没有解决根因的选项。

## 三道样题的逐层解题方法
### Sample 1 · Tool security（工具安全）
题干的核心不是“如何更好地记录危险操作”，而是代理拥有超出任务所需的高影响能力。第一层控制应是缩小 **capability surface（能力面）**：移除不必要的删除工具或危险权限。日志只能事后追踪，提示确认仍可能被模型绕过，换更强模型也不会改变权限边界。考试中看到“只读任务却拥有写入/删除能力”，优先考虑 **least privilege（最小权限）** 和工具白名单。

### Sample 2 · Prompt caching（提示缓存）
题干强调大量请求共享长而稳定的说明，只在尾部附加用户输入。正确优化方向是把稳定前缀放在前面并设置缓存边界，使后续请求复用已处理的前缀。仅压缩用户输入无法消除重复处理的大块静态上下文；并行化也不会降低单次重复 token 成本。考试中看到“相同长前缀、重复请求、成本或首 token 延迟”，应联想到 **stable prefix（稳定前缀）** 和 **cache breakpoint（缓存断点）**。

### Sample 3 · RAG freshness（RAG 新鲜度）
症状是来源文档已更新，但回答仍引用旧内容。应沿 **ingestion and indexing path（采集与索引链路）** 检查：变更是否被检测、文档是否重新切分和嵌入、旧 chunk 是否删除、索引是否刷新、查询是否命中新版本。直接改提示或换模型不会让旧索引自动更新。考试中看到“知识库已变但回答陈旧”，先检查数据管道和版本，而不是先调模型。

## 干扰项识别
- **只改善观测，不降低风险**：增加日志、仪表盘或告警，却没有缩小权限或阻止危险动作。
- **用模型能力替代系统控制**：换更强模型，却没有修复 schema、授权、索引或确定性业务规则。
- **优化错误层级**：延迟来自重复长前缀，却只压缩短用户输入；陈旧答案来自索引，却只改提示。
- **过度架构**：问题可由一个明确控制解决，却引入多代理、复杂编排或新基础设施。

## 考场阅读顺序
先读最后一句，确认题目问的是 **BEST（最佳）**、**FIRST（首先）**、**MOST secure（最安全）** 还是 **MOST cost-effective（最具成本效益）**；再回到题干标记约束；最后逐项判断它解决的是根因、缓解症状，还是引入了新的风险。多选题只选各自独立必要的控制，不因为两个选项“都看起来不错”就一起选择。`;

const practiceBankIntro = `## 使用说明
这是依据官方 7 个 Domain 和占比原创编写的 **63 题 bilingual practice bank（双语模拟题库）**，不是正式考试原题或泄题。题量与正式考试一致，建议严格计时 120 分钟。

题目分布：Domain 1 共 11 题；Domain 2 共 8 题；Domain 3 共 12 题；Domain 4 共 10 题；Domain 5 共 9 题；Domain 6 共 9 题；Domain 7 共 4 题。

## 双语模拟题
${claudePracticeBankMarkdown}

## 评分与复盘
按 63 题计算原始正确率只用于学习诊断，不能换算为官方 100–1000 量表分。逐题记录错误 Domain、误判的约束、正确原则和下一次识别信号。

## 完整模拟考试方法
1. 使用 120 分钟倒计时，前 90 分钟完成首轮，20 分钟复查标记题，最后 10 分钟核对多选题与遗漏。
2. 首轮每题记录 **confidence（置信度）**：高、中、低。超过两分钟仍无法决定时先标记，避免单题吞噬全局时间。
3. 不查资料、不暂停计时。模拟结束后再打开解析，保留真实的知识缺口和时间压力证据。
4. 多选题先判断每个选项是否独立满足题干，再检查是否把“有帮助”误当成“必要且最佳”。
5. 第二轮只做错题与低置信题，但必须遮住原答案，并用一句话复述关键约束后再选。

## Domain 错题诊断
- **Domain 1 错题多**：回到 006–008，重点复习 API/MCP 边界、工具权限、渐进式发现、RAG 新鲜度和可观测性。
- **Domain 2 错题多**：回到 001–003 与 015，练习把业务问题转成最小充分架构，以及 workflow、agent 和 multi-agent 的选择。
- **Domain 3 错题多**：回到 009–010，区分指标、数据集、评分器、实验、根因诊断和生产门禁。
- **Domain 4 错题多**：回到 007、011–012，复习纵深防御、最小权限、HITL、fail closed、隐私和公平性。
- **Domain 5 错题多**：回到 001、013、015，练习需求澄清、SLA、决策记录、交接、监控和退役。
- **Domain 6 错题多**：回到 004–005，复习模型选择、提示层次、上下文预算、缓存和结构化输出。
- **Domain 7 错题多**：回到 014–015，复习 Claude Code 权限、共享配置、hooks、推广门禁和运营响应。

## 原始正确率的学习解释
- **低于 70%**：先暂停刷题，按 Domain 重学核心教程，并为每个错题写出根因和反例。
- **70%–79%**：知识框架已形成，但场景约束识别不稳定；集中复习低置信题和干扰项模式。
- **80% 及以上**：继续强化限时决策、英文题干阅读和多选题边界；这仍不是官方分数或通过保证。

## 双语复盘卡片
每道错题制作一张卡片，正面写英文信号词与场景，例如 **stale retrieval results（陈旧检索结果）**；背面写根因、首选控制、不能解决根因的干扰项，以及对应课程页。目标不是背选项，而是看到英文关键词后立即恢复完整的架构推理链。`;

export const claudeCertificationContent = {
  "ccar-p-000-exam-guide": { title: "CCAR-P 官方考试蓝图与学习路线", sourceId: "official-ccar-p-exam-guide-v1-2026-07", markdown: examGuideMarkdown },
  ...Object.fromEntries(
    Object.entries(lessons).map(([slug, lesson]) => [
      slug,
      { title: lesson.title, sourceId: `ccar-p-original-${slug}`, markdown: renderLesson(slug, lesson) },
    ]),
  ),
  "ccar-p-016-official-samples": { title: "官方公开示例题 · 中英文对照", sourceId: "official-ccar-p-samples-v1-2026-07", markdown: officialSamplesIntro },
  "ccar-p-017-bilingual-practice-bank": { title: "CCAR-P 双语模拟题库 · 63 题", sourceId: "ccar-p-original-bilingual-practice-bank-2026-08-29", markdown: practiceBankIntro },
} as const;
