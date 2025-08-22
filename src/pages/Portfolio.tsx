import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ExternalLink, Github, Filter } from 'lucide-react';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Web Development', 'AI/ML', 'Mobile Apps', 'Cloud Solutions', 'E-commerce'];

  const projects = [
    {
      id: 1,
      title: 'FinTech Dashboard',
      category: 'Web Development',
      description: 'A comprehensive financial analytics dashboard with real-time data visualization.',
      fullDescription: 'Built for a leading financial services company, this dashboard provides real-time insights into market trends, portfolio performance, and risk analysis. Features include interactive charts, custom alerts, and advanced filtering capabilities.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'AWS'],
      demoUrl: '#',
      githubUrl: '#',
      challenges: 'Real-time data processing, complex visualizations, high-performance requirements',
      results: '40% improvement in decision-making speed, 60% increase in user engagement'
    },
    {
      id: 2,
      title: 'AI Customer Service Bot',
      category: 'AI/ML',
      description: 'Intelligent chatbot that handles 80% of customer inquiries automatically.',
      fullDescription: 'An advanced AI-powered customer service solution that uses natural language processing to understand and respond to customer queries. Integrated with existing CRM systems and capable of handling complex multi-turn conversations.',
      image: '/api/placeholder/600/400',
      technologies: ['OpenAI GPT', 'Python', 'Flask', 'Redis', 'Docker'],
      demoUrl: '#',
      githubUrl: '#',
      challenges: 'Natural language understanding, context management, seamless handoff to human agents',
      results: '80% reduction in support tickets, 24/7 availability, 95% customer satisfaction'
    },
    {
      id: 3,
      title: 'E-commerce Mobile App',
      category: 'Mobile Apps',
      description: 'Cross-platform mobile app with AR product visualization and secure payments.',
      fullDescription: 'A modern e-commerce mobile application featuring augmented reality product previews, one-click checkout, personalized recommendations, and social commerce features. Built with React Native for iOS and Android.',
      image: '/api/placeholder/600/400',
      technologies: ['React Native', 'ARKit', 'Stripe', 'Firebase', 'Redux'],
      demoUrl: '#',
      githubUrl: '#',
      challenges: 'AR integration, payment security, cross-platform performance',
      results: '300% increase in conversion rate, 50% longer session duration'
    },
    {
      id: 4,
      title: 'Cloud Migration Platform',
      category: 'Cloud Solutions',
      description: 'Automated cloud migration tool that reduces migration time by 70%.',
      fullDescription: 'Enterprise-grade cloud migration platform that automates the assessment, planning, and execution of cloud migrations. Features include dependency mapping, cost optimization, and zero-downtime migration capabilities.',
      image: '/api/placeholder/600/400',
      technologies: ['AWS', 'Terraform', 'Docker', 'Kubernetes', 'Python'],
      demoUrl: '#',
      githubUrl: '#',
      challenges: 'Zero-downtime migration, data integrity, cost optimization',
      results: '70% faster migration, 40% cost reduction, 99.9% uptime'
    },
    {
      id: 5,
      title: 'Healthcare Analytics Platform',
      category: 'Web Development',
      description: 'HIPAA-compliant platform for healthcare data analysis and reporting.',
      fullDescription: 'Secure healthcare analytics platform that processes patient data to provide insights for clinical decision-making. Features include predictive modeling, automated reporting, and compliance monitoring.',
      image: '/api/placeholder/600/400',
      technologies: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Azure'],
      demoUrl: '#',
      githubUrl: '#',
      challenges: 'HIPAA compliance, data security, real-time processing',
      results: '25% improvement in patient outcomes, 50% faster diagnosis'
    },
    {
      id: 6,
      title: 'Smart Retail System',
      category: 'E-commerce',
      description: 'IoT-enabled retail management system with inventory automation.',
      fullDescription: 'Comprehensive retail management system that combines IoT sensors, computer vision, and machine learning to automate inventory management, optimize store layouts, and enhance customer experience.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'IoT', 'Computer Vision', 'MongoDB', 'Node.js'],
      demoUrl: '#',
      githubUrl: '#',
      challenges: 'IoT integration, real-time processing, scalability',
      results: '90% inventory accuracy, 30% increase in sales'
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-in">
              <Badge variant="outline" className="mb-4">Our Portfolio</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Success
                </span> Stories
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Explore our portfolio of successful projects that have transformed businesses 
                and delivered exceptional results for our clients.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center mr-4">
                <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-gradient-to-r from-primary to-purple-600" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedSection key={project.id} animation="slide-up" delay={index * 100}>
                <Card className="group overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/50">
                      {project.title.split(' ').map(word => word[0]).join('')}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {project.category}
                        </Badge>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="flex-1">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                              <DialogDescription>
                                <Badge variant="secondary" className="mr-2">
                                  {project.category}
                                </Badge>
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div className="aspect-video bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                                <div className="text-6xl font-bold text-primary/50">
                                  {project.title.split(' ').map(word => word[0]).join('')}
                                </div>
                              </div>
                              <p className="text-muted-foreground leading-relaxed">
                                {project.fullDescription}
                              </p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">Technologies Used</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                      <Badge key={tech} variant="secondary">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">Key Challenges</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {project.challenges}
                                  </p>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Results & Impact</h4>
                                <p className="text-sm text-muted-foreground">
                                  {project.results}
                                </p>
                              </div>
                              <div className="flex gap-4">
                                <Button className="flex-1 bg-gradient-to-r from-primary to-purple-600">
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Live Demo
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <Github className="mr-2 h-4 w-4" />
                                  View Code
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Industries Served</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let's discuss how we can help you achieve similar success with your next project.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600">
                Get Started Today
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}