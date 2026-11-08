import {Link} from "react-router-dom";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {formatDate, posts} from "@/posts";

function AppBlog() {
    return (
        <div className="p-8 md:px-10 bg-sidebar min-h-screen">
            <h1 className="font-open-sans text-2xl font-bold">Blog</h1>
            <div className="flex flex-col gap-4 py-8 max-w-3xl">
                {posts.map((post) => (
                    <Link key={post.slug} to={`/blog/${post.slug}`} className="group">
                        <Card className="transition-colors group-hover:border-foreground/30">
                            <CardHeader>
                                <CardDescription className="font-open-sans">
                                    {formatDate(post.date)}
                                </CardDescription>
                                <CardTitle className="font-open-sans text-xl group-hover:underline">
                                    {post.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <p className="font-open-sans text-muted-foreground">{post.summary}</p>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default AppBlog;
