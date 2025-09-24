import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Heart,
  MessageCircle,
  Search,
  Calendar,
  User,
  Tag,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
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

type BlogResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Blog[];
};
interface EmailListRequest {
  notes: string;
  email: string;
}

interface EmailListResponse {
  id: number;
  notes: string;
  email: string;
  created_at: string;
}

export default function Blog() {
  const { t } = useTranslation("blog");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const blogPosts = t("portfolio.blogPosts", { returnObjects: true }) as Blog[];
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  //API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/v1/posts/");
        if (!res.ok) {
          throw new Error(`Xatolik: ${res.status}`);
        }
        const data: BlogResponse = await res.json();
        setBlogs(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Noma’lum xatolik");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  console.log(blogs);

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  // Qidiruv va filter
  const filteredPosts = blogs.filter((post) => {
    const title =
      lang === "uz"
        ? post.title_uz || post.title
        : lang === "en"
        ? post.title_en || post.title
        : lang === "ru"
        ? post.title_ru || post.title
        : post.title;

    const context =
      lang === "uz"
        ? post.context_uz || post.context
        : lang === "en"
        ? post.context_en || post.context
        : lang === "ru"
        ? post.context_ru || post.context
        : post.context;

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      context.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      selectedTag === "all" ||
      post.tags.some((tag) => {
        const tagTitle =
          lang === "uz"
            ? tag.title_uz || tag.title
            : lang === "en"
            ? tag.title_en || tag.title
            : lang === "ru"
            ? tag.title_ru || tag.title
            : tag.title;
        return tagTitle.toLowerCase().includes(selectedTag.toLowerCase());
      });

    return matchesSearch && matchesTag;
  });

  const featuredPosts = blogs.filter((post) => post.featured);
  // POST email-list
  const handleSubscribe = async () => {
    if (!email) {
      setError("Email kiritilishi kerak!");
      return;
    }

    const body: EmailListRequest = {
      notes: "Subscribed from footer form",
      email: email,
    };

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await fetch("/api/v1/email-lists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error("Xatolik yuz berdi");
      }

      const data: EmailListResponse = await res.json();
      setSuccess("Obuna bo‘ldingiz!");
      setEmail(""); // inputni tozalash
      console.log("API javobi:", data);
    } catch (err) {
      setError("Obuna bo‘lishda xatolik yuz berdi");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-in">
              <Badge variant="outline" className="mb-4">
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  {t("hero.title")}
                </span>{" "}
                {t("hero.title2")}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t("search.placeholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  key="all"
                  variant={selectedTag === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag("all")}
                  className={
                    selectedTag === "all"
                      ? "bg-gradient-to-r from-primary to-purple-600"
                      : ""
                  }
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {t("portfolio.tags")}
                </Button>
                {blogs
                  .flatMap((post) => post.tags)
                  .map((tag) => {
                    const tagTitle =
                      lang === "uz"
                        ? tag.title_uz || tag.title
                        : lang === "en"
                        ? tag.title_en || tag.title
                        : lang === "ru"
                        ? tag.title_ru || tag.title
                        : tag.title;
                    return (
                      <Button
                        key={tag.id}
                        variant={
                          selectedTag === tagTitle ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedTag(tagTitle)}
                        className={
                          selectedTag === tagTitle
                            ? "bg-gradient-to-r from-primary to-purple-600"
                            : ""
                        }
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tagTitle}
                      </Button>
                    );
                  })}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              {t("articles.title")}
            </h2>
            <p className="text-muted-foreground text-center">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"}{" "}
              {t("articles.found")}
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => {
              const postTitle =
                lang === "uz"
                  ? post.title_uz || post.title
                  : lang === "en"
                  ? post.title_en || post.title
                  : lang === "ru"
                  ? post.title_ru || post.title
                  : post.title;

              const postContext =
                lang === "uz"
                  ? post.context_uz || post.context
                  : lang === "en"
                  ? post.context_en || post.context
                  : lang === "ru"
                  ? post.context_ru || post.context
                  : post.context;

              return (
                <AnimatedSection
                  key={post.id}
                  animation="slide-up"
                  delay={index * 100}
                >
                  <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                    <CardHeader>
                      <div className="flex flex-wrap gap-2 mb-2">
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
                              {tagTitle}
                            </Badge>
                          );
                        })}
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {postTitle}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground line-clamp-3">
                        {postContext}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          {post.tags.map((item, index) => {
                            return (
                              <div key={index} className="flex items-center">
                                <Avatar className="w-6 h-6 mr-2">
                                  <AvatarFallback className="text-xs">
                                    {item.notes.slice(0, 1)}
                                  </AvatarFallback>
                                </Avatar>
                                {item.notes}
                              </div>
                            );
                          })}

                          <span>{post.estimated_read_time} min</span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4"></div>
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/blog/${post.id}`}>
                              {t("articles.readMore")}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection animation="fade-in" className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                {t("featured.title")}
              </h2>
              <p className="text-muted-foreground text-center">
                {t("featured.subtitle")}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => {
                const postTitle =
                  lang === "uz"
                    ? post.title_uz || post.title
                    : lang === "en"
                    ? post.title_en || post.title
                    : lang === "ru"
                    ? post.title_ru || post.title
                    : post.title;

                const postContext =
                  lang === "uz"
                    ? post.context_uz || post.context
                    : lang === "en"
                    ? post.context_en || post.context
                    : lang === "ru"
                    ? post.context_ru || post.context
                    : post.context;

                return (
                  <AnimatedSection
                    key={post.id}
                    animation="slide-up"
                    delay={index * 200}
                  >
                    <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                        <Badge className="bg-gradient-to-r from-primary to-purple-600">
                          {t("featured.badge")}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex flex-wrap gap-2">
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
                                  {tagTitle}
                                </Badge>
                              );
                            })}
                          </div>
                          <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                            {postTitle}
                          </h3>
                          <p className="text-muted-foreground line-clamp-3">
                            {postContext}
                          </p>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center space-x-4">
                              {filteredPosts.map((item, index) => {
                                {
                                  return (
                                    <div key={index}>
                                      {item.tags.map((note) => {
                                        return (
                                          <div
                                            key={note.notes}
                                            className="flex items-center"
                                          >
                                            <User className="h-4 w-4 mr-1" />
                                            {note.notes}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  );
                                }
                              })}

                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {new Date(post.created_at).toLocaleDateString()}
                              </div>
                            </div>
                            <span>{post.estimated_read_time} min</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4"></div>
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/blog/${post.id}`}>
                                {t("articles.readMore")}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <Card className="bg-gradient-to-r from-primary to-purple-600 text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {t("newsletter.title")}
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  {t("newsletter.subtitle")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter.placeholder")}
                    className="text-sm"
                  />
                  <Button
                    type="button"
                    size="sm"
                    disabled={loading}
                    onClick={handleSubscribe}
                    className="bg-gradient-to-r from-primary to-purple-600"
                  >
                    {loading ? "..." : t("newsletter.button")}
                  </Button>

                  {success && (
                    <p className="text-green-500 text-sm">{success}</p>
                  )}
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
