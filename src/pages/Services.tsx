import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Code, 
  Brain, 
  Rocket, 
  Shield, 
  Zap, 
  Globe,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Users
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Code,
      title: 'Software Development',
      shortDescription: 'Custom software solutions built with cutting-edge technologies and best practices.',
      fullDescription: 'Our software development team creates custom applications tailored to your specific business needs. We use modern frameworks, follow industry best practices, and ensure scalable, maintainable code that grows with your business.',
      features: ['Full-stack Development', 'API Integration', 'Database Design', 'Mobile Applications', 'Web Applications', 'Desktop Applications'],
      technologies: ['React', 'Node.js', 'Python', 'Java', 'TypeScript', 'PostgreSQL'],
      timeline: '2-6 months',
      startingPrice: '$15,000'
    },
    {
      icon: Brain,
      title: 'AI Solutions',
      shortDescription: 'Intelligent systems powered by machine learning and artificial intelligence.',
      fullDescription: 'Transform your business with AI-powered solutions. From chatbots to predictive analytics, we implement cutting-edge AI technologies that automate processes and provide valuable insights.',
      features: ['Machine Learning Models', 'Natural Language Processing', 'Computer Vision', 'Predictive Analytics', 'Chatbots & Virtual Assistants', 'AI Integration'],
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Hugging Face', 'Python', 'Azure AI'],
      timeline: '3-8 months',
      startingPrice: '$25,000'
    },
    {
      icon: Rocket,
      title: 'Digital Transformation',
      shortDescription: 'Transform your business processes with modern digital solutions.',
      fullDescription: 'Modernize your business operations with comprehensive digital transformation strategies. We help you migrate to cloud platforms, automate workflows, and implement digital-first processes.',
      features: ['Process Automation', 'Cloud Migration', 'Digital Strategy', 'Legacy System Modernization', 'Workflow Optimization', 'Change Management'],
      technologies: ['AWS', 'Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform'],
      timeline: '6-12 months',
      startingPrice: '$50,000'
    },
    {
      icon: Shield,
      title: 'Cybersecurity',
      shortDescription: 'Comprehensive security solutions to protect your digital assets.',
      fullDescription: 'Protect your business with enterprise-grade security solutions. Our cybersecurity experts conduct thorough assessments and implement robust security measures to safeguard your digital assets.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance Consulting', 'Security Training', 'Incident Response', 'Security Monitoring'],
      technologies: ['Kali Linux', 'Metasploit', 'Wireshark', 'OWASP', 'ISO 27001', 'GDPR'],
      timeline: '1-4 months',
      startingPrice: '$10,000'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      shortDescription: 'Optimize your applications for maximum speed and efficiency.',
      fullDescription: 'Boost your application performance with our optimization expertise. We analyze bottlenecks, optimize code, and implement caching strategies to ensure lightning-fast user experiences.',
      features: ['Code Optimization', 'Database Tuning', 'Caching Strategies', 'Load Balancing', 'CDN Implementation', 'Performance Monitoring'],
      technologies: ['Redis', 'Elasticsearch', 'New Relic', 'DataDog', 'CloudFlare', 'Nginx'],
      timeline: '1-3 months',
      startingPrice: '$8,000'
    },
    {
      icon: Globe,
      title: 'Cloud Services',
      shortDescription: 'Scalable cloud infrastructure and deployment solutions.',
      fullDescription: 'Leverage the power of cloud computing with our comprehensive cloud services. From migration to ongoing management, we help you build scalable, reliable cloud infrastructure.',
      features: ['Cloud Architecture', 'DevOps Implementation', 'Microservices', 'Container Orchestration', 'Serverless Computing', 'Cloud Security'],
      technologies: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker', 'Jenkins'],
      timeline: '2-6 months',
      startingPrice: '$20,000'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-in">
              <Badge variant="outline" className="mb-4">Our Services</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Comprehensive
                </span> IT Solutions
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                From concept to deployment, we provide end-to-end technology solutions 
                that drive innovation and accelerate your business growth.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} animation="slide-up" delay={index * 100}>
                <Card className="group h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        Timeline: {service.timeline}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Starting from {service.startingPrice}
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full group-hover:bg-primary/10">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center text-2xl">
                              <div className="w-8 h-8 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mr-3">
                                <service.icon className="h-4 w-4 text-white" />
                              </div>
                              {service.title}
                            </DialogTitle>
                            <DialogDescription className="text-base leading-relaxed">
                              {service.fullDescription}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center">
                                <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                Key Features
                              </h4>
                              <ul className="space-y-2">
                                {service.features.map((feature) => (
                                  <li key={feature} className="flex items-center text-sm text-muted-foreground">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center">
                                <Zap className="h-4 w-4 mr-2 text-primary" />
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {service.technologies.map((tech) => (
                                  <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                              <div className="mt-6 space-y-3">
                                <div className="flex items-center text-sm">
                                  <Clock className="h-4 w-4 mr-2 text-primary" />
                                  <span className="font-medium">Timeline:</span>
                                  <span className="ml-2 text-muted-foreground">{service.timeline}</span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <DollarSign className="h-4 w-4 mr-2 text-primary" />
                                  <span className="font-medium">Starting Price:</span>
                                  <span className="ml-2 text-muted-foreground">{service.startingPrice}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-8">
                            <Button className="flex-1 bg-gradient-to-r from-primary to-purple-600">
                              Get Quote
                            </Button>
                            <Button variant="outline" className="flex-1">
                              Schedule Consultation
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Process</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We follow a proven methodology to ensure successful project delivery and exceptional results.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'We analyze your requirements and understand your business goals.'
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Create detailed project roadmap with timelines and milestones.'
              },
              {
                step: '03',
                title: 'Development',
                description: 'Build your solution using agile methodology and best practices.'
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Deploy, test, and provide ongoing support for your solution.'
              }
            ].map((process, index) => (
              <AnimatedSection key={process.step} animation="slide-up" delay={index * 200}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                    {process.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <Card className="bg-gradient-to-r from-primary to-purple-600 text-white">
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Let's discuss your project requirements and find the perfect solution for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Portfolio
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