import { learningTracks } from "./content";

const databricksTrack = learningTracks.find((track) => track.id === "databricks")!;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Language Atelier 首页">
          <span className="brand-mark">LA</span>
          <span className="brand-divider" />
          <span className="brand-name">Language Atelier</span>
        </a>
        <nav className="main-nav" aria-label="学习领域">
          <a href="#about">简介</a>
          <a href="#japanese">日语</a>
          <a href="#english">英语</a>
          <a href="#databricks">Databricks</a>
          <a href="#library">话题库</a>
        </nav>
        <div className="sync-chip" title="内容每日更新">
          <span className="sync-dot" />
          内容每日更新
        </div>
      </header>

      <div className="page-shell" id="top">
        <section className="hero" id="about">
          <div className="hero-copy">
            <p className="eyebrow">Personal learning archive</p>
            <h1>
              Learn with depth.
              <br />
              Speak with clarity.
            </h1>
            <p className="hero-lead">
              一个专注于语言、架构表达与数据工程的个人学习空间。
            </p>
            <p className="hero-description">
              目前收录日语高级沟通、英语软件架构表达，以及 Databricks 数据工程课程。
              每个话题以学习目标、表达、示例和练习组织，便于系统阅读与反复查阅。
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#latest">
                阅读最新话题 <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#library">
                浏览全部话题
              </a>
            </div>
          </div>

          <aside className="hero-note" aria-label="当前学习方向">
            <p className="note-label">CURRENT FOCUS</p>
            <div className="focus-item">
              <span className="focus-number">01</span>
              <div>
                <strong>日本語</strong>
                <p>准确、自然、有分寸的高级表达</p>
              </div>
            </div>
            <div className="focus-item">
              <span className="focus-number">02</span>
              <div>
                <strong>English</strong>
                <p>Senior-architect communication</p>
              </div>
            </div>
            <div className="focus-item">
              <span className="focus-number">03</span>
              <div>
                <strong>Databricks</strong>
                <p>Data engineering foundation to production</p>
              </div>
            </div>
            <p className="note-foot">
              三条学习路径独立推进：语言表达、架构沟通与数据工程。
            </p>
          </aside>
        </section>

        <section className="section-block databricks-section" id="databricks">
          <div className="databricks-feature-copy">
              <p className="eyebrow">Data engineering path · 114 / 114</p>
            <h2>Databricks</h2>
            <p className="databricks-lead">
              从数据工程基础走向可运行、可治理、可部署的生产数据平台。
            </p>
            <p className="databricks-description">
              课程依次覆盖 SQL 与 Python 基础、Apache Spark、Delta Lake、
              Lakeflow、Unity Catalog、性能与 CI/CD，最终以一套端到端毕业项目完成验收。
            </p>
            <a
              className="primary-button databricks-button"
              href={`/topics/${databricksTrack.latest.slug}`}
            >
              进入最新课程 <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="databricks-route" aria-label="Databricks 数据工程学习路线">
            {[
              ["01", "Foundation", "SQL · Python · Modeling"],
              ["02", "Lakehouse", "Spark · Delta Lake"],
              ["03", "Lakeflow", "Batch · Streaming · Jobs"],
              ["04", "Governance", "Unity Catalog · Security"],
              ["05", "Production", "Testing · CI/CD · Performance"],
            ].map(([number, title, detail]) => (
              <div className="route-step" key={number}>
                <span>{number}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block" id="latest">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Latest topics</p>
              <h2>最新话题</h2>
            </div>
            <p>三条学习路径独立组织，并使用同一套可扩展的内容结构。</p>
          </div>

          <div className="latest-grid">
            {learningTracks.map((track) => (
              <article
                className={`latest-card ${track.accent}`}
                id={track.id}
                key={track.id}
              >
                <div className="track-heading">
                  <span className="track-symbol" aria-hidden="true">
                    {track.symbol}
                  </span>
                  <div>
                    <p className="track-label">
                      {track.eyebrow} · {track.level}
                    </p>
                    <h3>{track.latest.title}</h3>
                  </div>
                </div>
                <p className="latest-objective">{track.latest.objective}</p>
                <div className="highlight-list" aria-label="本话题重点">
                  {track.latest.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>
                <div className="drill">
                  <span>Practice</span>
                  <p>{track.latest.drill}</p>
                </div>
                <div className="card-footer">
                  <time dateTime={track.latest.date.replaceAll(".", "-")}>
                    {track.latest.date}
                  </time>
                  <a
                    href={`/topics/${track.latest.slug}`}
                    aria-label={`阅读话题 ${track.latest.title}`}
                  >
                    阅读完整话题 <span aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="library">
          <div className="section-heading library-heading">
            <div>
              <p className="eyebrow">Learning library</p>
              <h2>话题库</h2>
            </div>
            <p>按学习领域归档；新增内容会进入对应话题列表。</p>
          </div>

          <div className="library-grid">
            {learningTracks.map((track) => (
              <article className="library-column" key={track.id}>
                <div className="library-intro">
                  <div>
                    <p className="track-label">{track.eyebrow}</p>
                    <h3>
                      {track.nativeTitle}
                      <span>{track.title}</span>
                    </h3>
                  </div>
                </div>
                <p className="track-purpose">{track.purpose}</p>
                <ol className="lesson-list">
                  {track.topics
                    .slice()
                    .reverse()
                    .map((topic) => (
                      <li key={topic.slug}>
                        <a href={`/topics/${topic.slug}`}>
                          <time>{topic.date}</time>
                          <span className="lesson-copy">
                            <strong>{topic.title}</strong>
                            <small>{topic.description}</small>
                          </span>
                          <span className="lesson-arrow" aria-hidden="true">
                            →
                          </span>
                        </a>
                      </li>
                    ))}
                </ol>
              </article>
            ))}
          </div>
        </section>

        <footer>
          <div className="footer-brand">Language Atelier</div>
          <p>深度学习，清晰表达，可靠构建。</p>
          <p>Independent learning archive · Updated daily</p>
        </footer>
      </div>
    </main>
  );
}
