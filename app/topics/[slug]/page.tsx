import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topicBySlug, topics } from "../../content";
import {
  notionTopicContent,
  type TopicSlug,
} from "../../notion-content";
import { getTopicSections, TopicBody } from "./topic-body";

type TopicPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = topicBySlug[slug];
  return topic
    ? {
        title: `${topic.title} · Language Atelier`,
        description: topic.description,
      }
    : { title: "话题未找到 · Language Atelier" };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = topicBySlug[slug];
  const content = notionTopicContent[slug as TopicSlug];

  if (!topic || !content) {
    notFound();
  }

  const currentIndex = topics.findIndex((item) => item.slug === slug);
  const previous = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < topics.length - 1
      ? topics[currentIndex + 1]
      : null;
  const sections = getTopicSections(content.markdown);

  return (
    <main className="topic-page">
      <header className="site-header topic-site-header">
        <a className="brand" href="/" aria-label="返回 Language Atelier 首页">
          <span className="brand-mark">LA</span>
          <span className="brand-divider" />
          <span className="brand-name">Language Atelier</span>
        </a>
        <nav className="main-nav topic-main-nav" aria-label="站内导航">
          <a href="/#about">简介</a>
          <a href="/#japanese">日语</a>
          <a href="/#english">英语</a>
          <a href="/#databricks">Databricks</a>
          <a href="/#library">话题库</a>
        </nav>
        <a className="back-link" href="/#library">
          ← 返回话题库
        </a>
      </header>

      <div className="topic-shell">
        <div className="topic-breadcrumb">
          <a href="/">首页</a>
          <span>/</span>
          <a href={`/#${topic.trackId}`}>{topic.trackNativeTitle}</a>
          <span>/</span>
          <span>{topic.description}</span>
        </div>

        <section className={`topic-hero ${topic.accent}`}>
          <div>
            <p className="eyebrow">
              {topic.trackEyebrow} · {topic.description}
            </p>
            <h1>{topic.title}</h1>
          </div>
          <div className="topic-meta">
            <span className="track-symbol" aria-hidden="true">
              {topic.trackId === "japanese"
                ? "日"
                : topic.trackId === "english"
                  ? "A"
                  : "DB"}
            </span>
            <div>
              <small>Learning topic</small>
              <time>2026.{topic.date}</time>
            </div>
          </div>
        </section>

        <div className="topic-layout">
          <aside className="topic-toc" aria-label="本话题目录">
            <p className="note-label">IN THIS TOPIC</p>
            <ol>
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </aside>

          <article className="topic-article">
            <TopicBody markdown={content.markdown} />
          </article>
        </div>

        <nav className="topic-pagination" aria-label="相邻话题">
          {previous ? (
            <a className="previous-topic" href={`/topics/${previous.slug}`}>
              <span>← 上一个话题</span>
              <strong>{previous.title}</strong>
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a className="next-topic" href={`/topics/${next.slug}`}>
              <span>下一个话题 →</span>
              <strong>{next.title}</strong>
            </a>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </main>
  );
}
