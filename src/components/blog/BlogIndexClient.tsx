"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { BlogPost } from "@/data/blogData";
import { Search, Calendar, Clock, ArrowRight, Tag, Sparkles } from "lucide-react";

interface BlogIndexClientProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export function BlogIndexClient({ initialPosts, categories }: BlogIndexClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  const featuredPost = initialPosts[0];
  const regularPosts = filteredPosts;

  return (
    <div className="space-y-16">
      {/* Featured Article Card */}
      {selectedCategory === "All" && searchQuery === "" && featuredPost && (
        <section className="relative rounded-3xl border border-surface-border bg-gradient-to-br from-card-bg via-card-bg to-surface-muted p-6 sm:p-10 shadow-2xl overflow-hidden group">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl group-hover:bg-brand-500/20 transition-all pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-brand-500/10 border border-brand-500/30 px-3 py-0.5 text-xs font-semibold text-brand-500 dark:text-brand-400">
                  Featured Pillar Guide
                </span>
                <span className="text-xs text-text-muted flex items-center gap-1 font-medium">
                  <Clock className="h-3.5 w-3.5" />
                  {featuredPost.readingTime}
                </span>
                <span className="text-xs text-text-muted flex items-center gap-1 font-medium">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(featuredPost.datePublished).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight group-hover:text-brand-500 transition-colors">
                <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
              </h2>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-2xl font-normal">
                {featuredPost.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-brand-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <div className="flex flex-wrap gap-1.5">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg bg-surface-muted px-2.5 py-1 text-[11px] font-mono text-text-muted"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="w-full h-48 sm:h-56 rounded-2xl border border-surface-border bg-surface-muted/80 p-6 flex flex-col justify-between shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-500">
                    TOPICAL CLUSTER
                  </span>
                  <Sparkles className="h-4 w-4 text-brand-500" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-text-muted font-mono uppercase tracking-wider">
                    Core Blueprint
                  </p>
                  <p className="font-display text-base font-bold text-foreground">
                    Custom Conversational AI Architecture
                  </p>
                </div>
                <div className="text-[11px] text-text-muted font-medium">
                  Author: {featuredPost.author.name}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-surface-border">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedCategory === "All"
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                : "border border-surface-border bg-surface-muted text-text-muted hover:text-foreground hover:bg-surface-elevated"
            }`}
          >
            All Articles ({initialPosts.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                  : "border border-surface-border bg-surface-muted text-text-muted hover:text-foreground hover:bg-surface-elevated"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & topics..."
            className="w-full rounded-xl border border-surface-border bg-surface-muted pl-10 pr-4 py-2 text-xs font-medium text-foreground placeholder:text-text-muted focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            aria-label="Search blog articles"
          />
        </div>
      </div>

      {/* Article Grid */}
      {regularPosts.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="font-display text-lg font-bold text-foreground">
            No articles found matching &quot;{searchQuery}&quot;
          </p>
          <p className="text-xs text-text-muted">
            Try adjusting your search terms or clearing the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="rounded-xl border border-surface-border bg-surface-muted px-4 py-2 text-xs font-semibold text-foreground hover:bg-surface-elevated"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {regularPosts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-3xl border border-surface-border bg-card-bg p-6 sm:p-7 space-y-6 shadow-sm hover:border-brand-500/40 hover:shadow-xl transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span className="rounded-full bg-brand-500/10 border border-brand-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-brand-500 dark:text-brand-400">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-[11px]">
                    <Clock className="h-3 w-3" />
                    {post.readingTime}
                  </span>
                </div>

                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground group-hover:text-brand-500 transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-text-muted leading-relaxed line-clamp-3 font-normal">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs">
                <span className="text-text-muted text-[11px] font-medium">
                  {new Date(post.datePublished).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-brand-500 dark:text-brand-400 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
