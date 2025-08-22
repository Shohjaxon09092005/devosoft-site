import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
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
  BookOpen
} from 'lucide-react';

export default function BlogDetail() {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'John Smith',
      content: 'Great article! This really helped me understand the concepts better.',
      date: '2024-01-16',
      likes: 3,
      replies: []
    },
    {
      id: 2,
      author: 'Sarah Wilson',
      content: 'I implemented this in my project and saw immediate improvements. Thanks for sharing!',
      date: '2024-01-15',
      likes: 7,
      replies: [
        {
          id: 3,
          author: 'Alex Rodriguez',
          content: 'That\'s awesome to hear! Which part made the biggest difference?',
          date: '2024-01-15',
          likes: 2
        }
      ]
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');

  // Mock blog post data - in real app this would come from API
  const blogPost = {
    id: parseInt(id || '1'),
    title: 'The Future of AI in Software Development',
    content: `
      <p>Artificial Intelligence is transforming software development in unprecedented ways. From code generation to automated testing, AI is reshaping how we build and maintain software applications.</p>
      
      <h2>Code Generation and Assistance</h2>
      <p>Modern AI tools like GitHub Copilot and ChatGPT are revolutionizing how developers write code. These tools can:</p>
      <ul>
        <li>Generate boilerplate code from natural language descriptions</li>
        <li>Suggest completions for complex algorithms</li>
        <li>Help debug and optimize existing code</li>
        <li>Translate code between different programming languages</li>
      </ul>
      
      <h2>Automated Testing and Quality Assurance</h2>
      <p>AI-powered testing tools are making it easier to ensure code quality and catch bugs before they reach production. These tools can automatically generate test cases, identify edge cases, and even suggest improvements to existing tests.</p>
      
      <h2>Intelligent Code Review</h2>
      <p>AI is also being used to automate code reviews, helping teams maintain consistent coding standards and catch potential security vulnerabilities early in the development process.</p>
      
      <h2>The Future Landscape</h2>
      <p>As AI continues to evolve, we can expect even more sophisticated tools that will further streamline the development process. However, it's important to remember that AI is a tool to augment human creativity and problem-solving, not replace it.</p>
      
      <p>The key to success in this AI-driven future will be learning how to effectively collaborate with these tools while maintaining the critical thinking and creative problem-solving skills that make great developers.</p>
    `,
    author: 'Alex Rodriguez',
    date: '2024-01-15',
    readTime: '5 min read',
    tags: ['AI/ML', 'Software Development', 'Future Tech'],
    likes: 42,
    comments: comments.length,
    featured: true,
    excerpt: 'Exploring how artificial intelligence is revolutionizing the way we build software applications.'
  };

  const relatedPosts = [
    {
      id: 2,
      title: 'Building Scalable Cloud Architecture',
      excerpt: 'Best practices for designing and implementing scalable cloud solutions.',
      author: 'Sarah Chen',
      date: '2024-01-12',
      readTime: '7 min read',
      tags: ['Cloud', 'DevOps']
    },
    {
      id: 4,
      title: 'React Performance Optimization Techniques',
      excerpt: 'Advanced strategies to optimize React applications for better performance.',
      author: 'Emily Johnson',
      date: '2024-01-08',
      readTime: '8 min read',
      tags: ['Web Development', 'React']
    },
    {
      id: 5,
      title: 'Mobile App Development Trends',
      excerpt: 'The latest trends and technologies shaping mobile app development.',
      author: 'Alex Rodriguez',
      date: '2024-01-05',
      readTime: '4 min read',
      tags: ['Mobile', 'Development']
    }
  ];

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
        date: new Date().toISOString().split('T')[0],
        likes: 0,
        replies: []
      };
      setComments([...comments, comment]);
      setNewComment('');
      setCommentName('');
      setCommentEmail('');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blogPost.title,
        text: blogPost.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Navigation */}
      <section className="py-6 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article>
              {/* Article Header */}
              <AnimatedSection animation="fade-in">
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blogPost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                    {blogPost.title}
                  </h1>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback>
                          {blogPost.author.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{blogPost.author}</div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(blogPost.date).toLocaleDateString()}
                          <Clock className="h-4 w-4 ml-3 mr-1" />
                          {blogPost.readTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={liked ? "text-red-500" : ""}
                      >
                        <Heart className="h-4 w-4 mr-1" fill={liked ? "currentColor" : "none"} />
                        {blogPost.likes + (liked ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {comments.length}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4" />
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
                    <div className="text-2xl font-bold text-primary/70">Featured Image</div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Article Content */}
              <AnimatedSection animation="slide-up" delay={400}>
                <div 
                  className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground"
                  dangerouslySetInnerHTML={{ __html: blogPost.content }}
                />
              </AnimatedSection>

              {/* Article Footer */}
              <AnimatedSection animation="slide-up" delay={600}>
                <div className="mt-12 pt-8 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {blogPost.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLike}
                        className={liked ? "text-red-500" : ""}
                      >
                        <Heart className="h-4 w-4 mr-1" fill={liked ? "currentColor" : "none"} />
                        {blogPost.likes + (liked ? 1 : 0)}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Comments Section */}
              <AnimatedSection animation="slide-up" delay={800}>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
                  
                  {/* Comment Form */}
                  <Card className="mb-8 bg-gradient-to-br from-card to-muted/30">
                    <CardHeader>
                      <CardTitle className="text-lg">Leave a Comment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleCommentSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                              id="name"
                              value={commentName}
                              onChange={(e) => setCommentName(e.target.value)}
                              placeholder="Your name"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={commentEmail}
                              onChange={(e) => setCommentEmail(e.target.value)}
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="comment">Comment *</Label>
                          <Textarea
                            id="comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Share your thoughts..."
                            className="min-h-[100px]"
                            required
                          />
                        </div>
                        <Button type="submit" className="bg-gradient-to-r from-primary to-purple-600">
                          <Send className="h-4 w-4 mr-2" />
                          Post Comment
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Comments List */}
                  <div className="space-y-6">
                    {comments.map((comment) => (
                      <Card key={comment.id} className="bg-gradient-to-br from-card to-muted/30">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarFallback>
                                {comment.author.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <div className="font-semibold">{comment.author}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {new Date(comment.date).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Button variant="ghost" size="sm">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    {comment.likes}
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Reply className="h-4 w-4 mr-1" />
                                    Reply
                                  </Button>
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-4">{comment.content}</p>
                              
                              {/* Replies */}
                              {comment.replies && comment.replies.length > 0 && (
                                <div className="ml-8 space-y-4 border-l-2 border-border/50 pl-4">
                                  {comment.replies.map((reply) => (
                                    <div key={reply.id} className="flex items-start space-x-3">
                                      <Avatar className="w-8 h-8">
                                        <AvatarFallback className="text-xs">
                                          {reply.author.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                          <div className="font-semibold text-sm">{reply.author}</div>
                                          <div className="text-xs text-muted-foreground">
                                            {new Date(reply.date).toLocaleDateString()}
                                          </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{reply.content}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Bio */}
            <AnimatedSection animation="slide-left" delay={300}>
              <Card className="mb-8 bg-gradient-to-br from-card to-muted/30">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarFallback className="text-lg">
                      {blogPost.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h4 className="font-bold text-lg mb-2">{blogPost.author}</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    CEO & Founder at DevoSoft. Passionate about AI, software development, and digital transformation.
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    Follow Author
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Related Posts */}
            <AnimatedSection animation="slide-left" delay={500}>
              <Card className="bg-gradient-to-br from-card to-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">Related Articles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((post) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="block group">
                      <div className="space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                        <h5 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h5>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                          <Clock className="h-3 w-3 ml-3 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}