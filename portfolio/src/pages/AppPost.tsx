import {useEffect} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {ArrowLeftIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {findPost, formatDate} from "@/posts";

function AppPost() {
    const {slug} = useParams();
    const post = findPost(slug);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (post) document.title = `${post.title} - Maksim Vasic`;
        return () => {
            document.title = "Maksim Vasic - Portfolio";
        };
    }, [post]);

    if (!post) return <Navigate to="/blog" replace />;

    return (
        <div className="p-6 md:px-10 md:py-8 bg-sidebar min-h-screen">
            <article className="mx-auto max-w-3xl font-open-sans">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeftIcon className="size-4" /> All posts
                </Link>
                <header className="mt-6 mb-10 border-b pb-8">
                    <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
                    <h1 className="mt-2 text-3xl md:text-4xl font-bold leading-tight text-balance">
                        {post.title}
                    </h1>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                </header>
                <div
                    className="prose prose-neutral dark:prose-invert max-w-none
                        prose-headings:scroll-mt-20 prose-a:underline-offset-2
                        prose-pre:bg-card prose-pre:text-card-foreground prose-pre:border prose-pre:text-[13px]
                        prose-code:before:content-none prose-code:after:content-none
                        prose-img:rounded-lg prose-img:border prose-table:text-sm"
                >
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            a: ({href, children}) =>
                                href?.startsWith("http") ? (
                                    <a href={href} target="_blank" rel="noreferrer">{children}</a>
                                ) : (
                                    <a href={href}>{children}</a>
                                ),
                            table: ({children}) => (
                                <div className="overflow-x-auto">
                                    <table>{children}</table>
                                </div>
                            ),
                        }}
                    >
                        {post.body}
                    </Markdown>
                </div>
            </article>
        </div>
    );
}

export default AppPost;
