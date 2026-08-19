import React from "react";
import Link from "next/link";
import { blogPosts } from "@/data/blogData";
import { BookOpen, ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";

export function BlogPreviewSection() {
  // Take the first 3 high-impact articles
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-24 sm:py-32 relative bg-surface border-t border-surface-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3.5 py-1 text-xs font-semibold text-brand-500 dark:text-brand-400">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Knowledge Hub & Operational Blueprints</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Practical Guides for <span className="text-brand-500 dark:text-brand-400">Business Leaders.</span>
            </h2>
            <p className="text-base sm:text-lg text-text-muted">
              Explore step-by-step implementation workflows, telephony architectures, and industry economic models on deploying custom AI voice agents.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-surface-border bg-card-bg px-5 py-3 text-xs font-bold text-foreground hover:border-brand-500/40 hover:text-brand-500 transition-all hover:scale-105 shrink-0"
          >
            <span>View All 15 Articles &amp; Blueprints</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-7 transition-all duration-300 hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-xl shadow-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-brand-500/10 px-3 py-1 font-semibold text-brand-600 dark:text-brand-400">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-text-muted font-medium">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3 font-normal">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-surface-border flex items-center justify-between text-xs">
                <span className="text-text-muted">{post.datePublished}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-brand-600 dark:text-brand-400 inline-flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
