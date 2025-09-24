import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  User,
  Tag,
  ArrowLeft,
  Clock,
  Send,
  ThumbsUp,
  Reply,
  BookOpen,
} from "lucide-react";

// Types
type Tag = {
  id: string;
  notes: string;
  created_at: string;
  updated_at: string;
  title: string;
  title_uz: string | null;
  title_en: string | null;
  title_ru: string | null;
};

type Blog = {
  id: string;
  tags: Tag[];
  notes: string;
  created_at: string;
  updated_at: string;
  title: string;
  title_uz: string;
  title_en: string;
  title_ru: string;
  context: string;
  context_uz: string;
  context_en: string;
  context_ru: string;
  estimated_read_time: number;
  featured: boolean;
  posted: boolean;
};

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [post, setPost] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);

  // Comment state
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Smith",
      content:
        "Great article! This really helped me understand the concepts better.",
      date: "2024-01-16",
      likes: 3,
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");

  // Fetch blog post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/posts/${id}`);

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data: Blog = await res.json();
        setPost(data);

        // Fetch related posts (same tags)
        await fetchRelatedPosts(data.tags);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedPosts = async (tags: Tag[]) => {
      try {
        const tagIds = tags.map((tag) => tag.id).join(",");
        const res = await fetch(`/api/v1/posts/?tags=${tagIds}&limit=3`);

        if (res.ok) {
          const data = await res.json();
          // Exclude current post from related posts
          const filteredPosts = data.results.filter((p: Blog) => p.id !== id);
          setRelatedPosts(filteredPosts.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching related posts:", err);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && commentName.trim()) {
      const comment = {
        id: comments.length + 1,
        author: commentName,
        content: newComment,
        date: new Date().toISOString().split("T")[0],
        likes: 0,
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment("");
      setCommentName("");
      setCommentEmail("");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || "",
        text: post?.context || "",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Toast yoki notification ko'rsatish mumkin
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center text-destructive">
          <p>Error: {error}</p>
          <Link
            to="/blog"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p>Post not found</p>
          <Link
            to="/blog"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Tilga mos matnlarni olish
  const title =
    lang === "uz"
      ? post.title_uz || post.title
      : lang === "en"
      ? post.title_en || post.title
      : lang === "ru"
      ? post.title_ru || post.title
      : post.title;

  const content =
    lang === "uz"
      ? post.context_uz || post.context
      : lang === "en"
      ? post.context_en || post.context
      : lang === "ru"
      ? post.context_ru || post.context
      : post.context;

  return (
    <div className="min-h-screen pt-20">
      {/* Navigation */}
      <section className="py-6 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2"  />
            
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-12">
            <article>
              {/* Article Header */}
              <AnimatedSection animation="fade-in">
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => {
                      const tagTitle =
                        lang === "uz"
                          ? tag.title_uz || tag.title
                          : lang === "en"
                          ? tag.title_en || tag.title
                          : lang === "ru"
                          ? tag.title_ru || tag.title
                          : tag.title;
                      return (
                        <Badge
                          key={tag.id}
                          variant="secondary"
                          className="text-xs"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tagTitle}
                        </Badge>
                      );
                    })}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    {title}
                  </h1>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>
                          {post.notes
                            ? post.notes.charAt(0).toUpperCase()
                            : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">
                          {post.tags[0].notes || "Unknown Author"}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.created_at).toLocaleDateString()}
                          <Clock className="h-4 w-4 ml-3 mr-1" />
                          {post.estimated_read_time} {t("blog:min")}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                     
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Featured Image Placeholder */}
              <AnimatedSection animation="slide-up" delay={200}>
                <div className="w-full h-64 md:h-96 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center mb-8">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 text-primary/50 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-primary/70">
                      {title}
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Article Content */}
              <AnimatedSection animation="slide-up" delay={400}>
                <div
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </AnimatedSection>

            </article>
          </div>

      
        </div>
      </div>
    </div>
  );
}
