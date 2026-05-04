"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { ContentImage } from "@/components/shared/content-image";
import { getPostImages } from "@/lib/task-data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";
import { samplePostsByTask } from '@/config/task-sample-posts';

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);
  const samplePosts = samplePostsByTask[task] || [];

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    if (task !== 'image' && task !== 'profile') {
      samplePosts.forEach((post) => {
        if (post.slug && bySlug.has(post.slug)) return;
        combined.push(post);
      });
    }

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      const filtered = combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
      return filtered.length ? filtered : (task === 'image' || task === 'profile' ? [] : samplePosts);
    }

    const filtered = combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
    return filtered.length ? filtered : (task === 'image' || task === 'profile' ? [] : samplePosts);
  }, [category, initialPosts, localPosts, samplePosts]);

  if (!merged.length) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No posts yet for this section.
      </div>
    );
  }

  const gridClassName =
    task === "image"
      ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      : task === "profile"
        ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4";

  if (task === "image") {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {merged.map((post) => {
          const localOnly = (post as any).localOnly;
          const href = localOnly
            ? `/local/${task}/${post.slug}`
            : buildPostUrl(task, post.slug);
          const category = (post.content as any)?.category || post.tags?.[0] || 'Image';
          return (
            <Link
              key={post.id}
              href={href}
              className="group overflow-hidden rounded-[2rem] border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <ContentImage
                  src={getPostImages(post)[0] || '/placeholder.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">{category}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white leading-tight">{post.title}</h3>
                  {post.summary && (
                    <p className="mt-2 text-sm text-white/70 line-clamp-2">{post.summary}</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
