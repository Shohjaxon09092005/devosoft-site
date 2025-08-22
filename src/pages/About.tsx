import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  Briefcase,
  Linkedin,
  Twitter,
  Github
} from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Innovation First',
      description: 'We constantly push the boundaries of technology to deliver cutting-edge solutions that give our clients a competitive advantage.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Open communication and honest feedback are at the core of our client relationships. We believe in complete transparency throughout every project.'
    },
    {
      icon: Heart,
      title: 'Quality Obsessed',
      description: 'Every line of code, every design element, and every user interaction is crafted with meticulous attention to detail and quality.'
    },
    {
      icon: Users,
      title: 'Collaborative',
      description: 'We work as an extension of your team, fostering collaboration and knowledge sharing to achieve the best possible outcomes.'
    }
  ];

  const team = [
    {
      name: 'Alex Rodriguez',
      role: 'CEO & Founder',
      bio: '15+ years in tech, former Microsoft engineer, passionate about AI and digital transformation.',
      skills: ['Leadership', 'Strategy', 'AI/ML'],
      image: '/api/placeholder/400/400',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Full-stack architect with expertise in cloud technologies and scalable system design.',
      skills: ['Architecture', 'Cloud', 'DevOps'],
      image: '/api/placeholder/400/400',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Michael Torres',
      role: 'Head of AI',
      bio: 'PhD in Computer Science, specialized in machine learning and neural networks.',
      skills: ['AI/ML', 'Python', 'TensorFlow'],
      image: '/api/placeholder/400/400',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    },
    {
      name: 'Emily Johnson',
      role: 'Design Director',
      bio: 'Award-winning designer with a passion for creating intuitive and beautiful user experiences.',
      skills: ['UI/UX', 'Design Systems', 'Prototyping'],
      image: '/api/placeholder/400/400',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#'
      }
    }
  ];

  const skills = [
    { name: 'Software Development', percentage: 95 },
    { name: 'AI & Machine Learning', percentage: 90 },
    { name: 'Cloud Architecture', percentage: 92 },
    { name: 'UI/UX Design', percentage: 88 },
    { name: 'DevOps & Automation', percentage: 85 },
    { name: 'Cybersecurity', percentage: 87 }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-in">
              <Badge variant="outline" className="mb-4">About DevoSoft</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Crafting the <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Future</span> of Technology
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Founded in 2020, DevoSoft has been at the forefront of digital innovation, 
                helping businesses transform their operations through cutting-edge technology solutions.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-left">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    DevoSoft was born from a simple belief: technology should empower businesses to achieve 
                    the impossible. What started as a small team of passionate developers has grown into a 
                    full-service digital transformation partner.
                  </p>
                  <p>
                    We've helped over 150 companies across various industries leverage the power of AI, 
                    cloud computing, and modern software development practices to accelerate their growth 
                    and stay ahead of the competition.
                  </p>
                  <p>
                    Today, we continue to push the boundaries of what's possible, always staying at the 
                    cutting edge of technology trends and best practices.
                  </p>
                </div>
                <div className="flex space-x-8">
                  <div>
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">150+</div>
                    <div className="text-sm text-muted-foreground">Clients</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary">4</div>
                    <div className="text-sm text-muted-foreground">Years</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-right">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                    <div className="text-2xl font-bold text-primary">Award Winning</div>
                    <div className="text-muted-foreground">Digital Solutions</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These core principles guide everything we do and shape how we approach every project and client relationship.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} animation="slide-up" delay={index * 100}>
                <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-card to-muted/30">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slide-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Expertise</h2>
              <p className="text-muted-foreground mb-8">
                Our team combines years of experience with cutting-edge technologies to deliver 
                exceptional results across multiple domains.
              </p>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.percentage}%</span>
                    </div>
                    <Progress value={skill.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-right">
              <div className="bg-gradient-to-br from-primary/10 to-purple-600/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Technologies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">95%</div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                    <div className="text-sm text-muted-foreground">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Satisfaction</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              The brilliant minds behind DevoSoft's innovative solutions. Each team member brings 
              unique expertise and passion to every project.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={member.name} animation="slide-up" delay={index * 100}>
                <Card className="group text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {member.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Github className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}