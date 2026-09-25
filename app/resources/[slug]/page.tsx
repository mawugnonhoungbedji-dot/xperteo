import { ArticlePage, articleMeta } from "@/components/article-page";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { return articleMeta((await params).slug, "article"); }
export default async function Page({ params }: {
    params: Promise<{
        slug: string;
    }>;
}) { return <ArticlePage slug={(await params).slug} kind="article"/>; }
