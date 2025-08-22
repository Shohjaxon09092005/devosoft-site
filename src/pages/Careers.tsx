import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Search, 
  Filter,
  Heart,
  Coffee,
  Zap,
  Globe,
  Award,
  BookOpen
} from 'lucide-react';

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const jobListings = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: '5+ years',
      salary: '$120k - $180k',
      description: 'We are looking for a senior full stack developer to join our engineering team and help build the next generation of our platform.',
      requirements: [
        '5+ years of experience in full stack development',
        'Proficiency in React, Node.js, and TypeScript',
        'Experience with cloud platforms (AWS, Azure, GCP)',
        'Strong problem-solving and communication skills'
      ],
      benefits: [
        'Competitive salary and equity',
        'Health, dental, and vision insurance',
        'Flexible working hours',
        'Professional development budget'
      ]
    },
    {
      id: 2,
      title: 'AI/ML Engineer',
      department: 'AI Research',
      location: 'Remote',
      type: 'Full-time',
      experience: '3+ years',
      salary: '$130k - $200k',
      description: 'Join our AI research team to develop cutting-edge machine learning solutions for our clients.',
      requirements: [
        'Masters degree in Computer Science or related field',
        'Experience with TensorFlow, PyTorch, or similar frameworks',
        'Strong background in machine learning algorithms',
        'Python programming expertise'
      ],
      benefits: [
        'Remote-first culture',
        'Top-tier equipment',
        'Conference and training budget',
        'Flexible PTO'
      ]
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      location: 'New York, NY',
      type: 'Full-time',
      experience: '4+ years',
      salary: '$110k - $160k',
      description: 'Help us scale our infrastructure and improve our deployment processes as we grow.',
      requirements: [
        '4+ years of DevOps experience',
        'Expertise with Kubernetes and Docker',
        'Experience with CI/CD pipelines',
        'Knowledge of infrastructure as code (Terraform)'
      ],
      benefits: [
        'Stock options',
        'Generous parental leave',
        'Learning and development stipend',
        'Team building events'
      ]
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness programs.'
    },
    {
      icon: Coffee,
      title: 'Flexible Culture',
      description: 'Remote-friendly work environment with flexible hours and unlimited PTO.'
    },
    {
      icon: Zap,
      title: 'Cutting-edge Tech',
      description: 'Work with the latest technologies and tools in the industry.'
    },
    {
      icon: Globe,
      title: 'Remote First',
      description: 'Join our distributed team from anywhere in the world.'
    },
    {
      icon: Award,
      title: 'Competitive Package',
      description: 'Excellent salary, equity, and comprehensive benefits package.'
    },
    {
      icon: BookOpen,
      title: 'Growth & Learning',
      description: 'Professional development budget and continuous learning opportunities.'
    }
  ];

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === 'All' || job.location.includes(locationFilter);
    const matchesType = typeFilter === 'All' || job.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-in">
              <Badge variant="outline" className="mb-4">Join Our Team</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Build the <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Future</span> With Us
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Join a team of passionate innovators who are shaping the future of technology. 
                Find your next opportunity to make a meaningful impact.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Work With Us?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We believe in creating an environment where everyone can do their best work and grow their careers.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} animation="slide-up" delay={index * 100}>
                <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Open Positions</h2>
            <p className="text-muted-foreground text-center">
              Join our team and help shape the future of technology
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {jobListings.map((job, index) => (
              <AnimatedSection key={job.id} animation="slide-up" delay={index * 100}>
                <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold">{job.title}</h3>
                          <Badge variant="secondary">{job.department}</Badge>
                        </div>
                        <p className="text-muted-foreground">{job.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {job.type}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {job.experience}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-primary to-purple-600">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Don't See the Right Role?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're always looking for talented individuals. Send us your resume and let us know how you'd like to contribute.
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600">
                Send Your Resume
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}