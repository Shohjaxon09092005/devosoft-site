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

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const tags = [
    "All",
    "AI/ML",
    "Web Development",
    "Cloud",
    "Mobile",
    "Cybersecurity",
    "DevOps",
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Software Development",
      excerpt:
        "Exploring how artificial intelligence is revolutionizing the way we build software applications.",
      content:
        "Artificial Intelligence is transforming software development in unprecedented ways...",
      author: "Alex Rodriguez",
      date: "2024-01-15",
      readTime: "5 min read",
      tags: ["AI/ML", "Software Development"],
      likes: 42,
      comments: 8,
      featured: true,
    },
    {
      id: 2,
      title: "Building Scalable Cloud Architecture",
      excerpt:
        "Best practices for designing and implementing scalable cloud solutions that grow with your business.",
      content:
        "Cloud architecture design is crucial for modern applications...",
      author: "Sarah Chen",
      date: "2024-01-12",
      readTime: "7 min read",
      tags: ["Cloud", "DevOps"],
      likes: 36,
      comments: 12,
      featured: false,
    },
    {
      id: 3,
      title: "Cybersecurity Best Practices for 2024",
      excerpt:
        "Essential security measures every organization should implement to protect against modern threats.",
      content: "As cyber threats evolve, so must our security practices...",
      author: "Michael Torres",
      date: "2024-01-10",
      readTime: "6 min read",
      tags: ["Cybersecurity"],
      likes: 28,
      comments: 5,
      featured: false,
    },
    {
      id: 4,
      title: "React Performance Optimization Techniques",
      excerpt:
        "Advanced strategies to optimize React applications for better performance and user experience.",
      content:
        "React performance optimization is critical for user satisfaction...",
      author: "Emily Johnson",
      date: "2024-01-08",
      readTime: "8 min read",
      tags: ["Web Development", "React"],
      likes: 54,
      comments: 15,
      featured: true,
    },
    {
      id: 5,
      title: "Mobile App Development Trends",
      excerpt:
        "The latest trends and technologies shaping the mobile app development landscape.",
      content:
        "Mobile development continues to evolve with new frameworks and approaches...",
      author: "Alex Rodriguez",
      date: "2024-01-05",
      readTime: "4 min read",
      tags: ["Mobile", "Development"],
      likes: 33,
      comments: 7,
      featured: false,
    },
    {
      id: 6,
      title: "DevOps Culture and Continuous Integration",
      excerpt:
        "How to build a successful DevOps culture and implement effective CI/CD pipelines.",
      content: "DevOps is more than just tools and processes...",
      author: "Sarah Chen",
      date: "2024-01-03",
      readTime: "6 min read",
      tags: ["DevOps", "CI/CD"],
      likes: 41,
      comments: 9,
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
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
                Tech Blog
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Insights
                </span>{" "}
                & Innovation
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Stay updated with the latest trends, best practices, and
                insights from the world of technology and software development.
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
                  placeholder="Search articles..."
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

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <AnimatedSection animation="fade-in" className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
                Featured Articles
              </h2>
              <p className="text-muted-foreground text-center">
                Don't miss these highlighted insights
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
                        Featured
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
                            <Button size="sm">Read More</Button>
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

      {/* All Posts */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              All Articles
            </h2>
            <p className="text-muted-foreground text-center">
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1 ? "article" : "articles"} found
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
                          Read More
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

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <Card className="bg-gradient-to-r from-primary to-purple-600 text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Stay Updated
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter and never miss the latest
                  insights, tutorials, and industry news.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white text-black border-0"
                  />
                  <Button
                    variant="secondary"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Subscribe
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
