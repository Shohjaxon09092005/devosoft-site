import { useState } from "react";
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
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
type Blog = {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  likes: number;
  comments: number;
  featured: boolean;
};
export default function Blog() {
  const { t } = useTranslation("blog");
  const [searchTerm, setSearchTerm] = useState("");

  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const tags = t("portfolio.tags", { returnObjects: true }) as string[];
  const [selectedTag, setSelectedTag] = useState<string>(tags[0]);
  const blogPosts = t("portfolio.blogPosts", { returnObjects: true }) as Blog[];
  console.log(selectedTag);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      selectedTag === tags[0] ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(selectedTag.toLowerCase())
      );

    return matchesSearch && matchesTag;
  });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
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
                {tags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className={
                      selectedTag === tag
                        ? "bg-gradient-to-r from-primary to-purple-600"
                        : ""
                    }
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Button>
                ))}
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
            {filteredPosts.map((post, index) => (
              <AnimatedSection
                key={post.id}
                animation="slide-up"
                delay={index * 100}
              >
                <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Avatar className="w-6 h-6 mr-2">
                            <AvatarFallback className="text-xs">
                              {post.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          {post.author}
                        </div>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleLike(post.id)}
                            className={
                              likedPosts.includes(post.id) ? "text-red-500" : ""
                            }
                          >
                            <Heart
                              className="h-4 w-4 mr-1"
                              fill={
                                likedPosts.includes(post.id)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                            {post.likes +
                              (likedPosts.includes(post.id) ? 1 : 0)}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                        <Button size="sm" variant="outline">
                          {t("articles.readMore")}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
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
              {featuredPosts.slice(0, 2).map((post, index) => (
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
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground">{post.excerpt}</p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {post.author}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleLike(post.id)}
                              className={
                                likedPosts.includes(post.id)
                                  ? "text-red-500"
                                  : ""
                              }
                            >
                              <Heart
                                className="h-4 w-4 mr-1"
                                fill={
                                  likedPosts.includes(post.id)
                                    ? "currentColor"
                                    : "none"
                                }
                              />
                              {post.likes +
                                (likedPosts.includes(post.id) ? 1 : 0)}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {post.comments}
                            </Button>
                          </div>
                          <Link to={`/blog`}>
                            <Button size="sm">{t("articles.readMore")}</Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
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
                    placeholder={t("newsletter.placeholder")}
                    className="bg-white text-black border-0"
                  />
                  <Button
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    {t("newsletter.button")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
