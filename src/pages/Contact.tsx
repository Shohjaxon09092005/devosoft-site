import { AnimatedSection } from '@/components/ui/animated-section';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Users,
  Building
} from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      contact: 'info@devosoft.com',
      action: 'mailto:info@devosoft.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our headquarters',
      contact: '123 Tech Street, San Francisco, CA 94102',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      description: 'Monday - Friday',
      contact: '9:00 AM - 6:00 PM PST',
      action: '#'
    }
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '123 Tech Street, San Francisco, CA 94102',
      phone: '+1 (555) 123-4567',
      email: 'sf@devosoft.com'
    },
    {
      city: 'New York',
      address: '456 Innovation Ave, New York, NY 10001',
      phone: '+1 (555) 234-5678',
      email: 'ny@devosoft.com'
    },
    {
      city: 'London',
      address: '789 Digital Lane, London EC2A 2DA, UK',
      phone: '+44 20 7123 4567',
      email: 'london@devosoft.com'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedSection animation="fade-in">
              <Badge variant="outline" className="mb-4">Get In Touch</Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Let's <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Connect</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Ready to transform your business with cutting-edge technology? 
                We'd love to hear from you and discuss your project.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <AnimatedSection key={info.title} animation="slide-up" delay={index * 100}>
                <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{info.description}</p>
                    <a 
                      href={info.action}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      {info.contact}
                    </a>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection animation="slide-left">
              <Card className="border-2 bg-gradient-to-br from-card to-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <MessageSquare className="h-6 w-6 mr-2 text-primary" />
                    Send us a Message
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" placeholder="Your Company" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="service">Service Interested In</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="software-development">Software Development</SelectItem>
                        <SelectItem value="ai-solutions">AI Solutions</SelectItem>
                        <SelectItem value="digital-transformation">Digital Transformation</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="cloud-services">Cloud Services</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your project..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Map Placeholder */}
            <AnimatedSection animation="slide-right">
              <Card className="h-full border-2 bg-gradient-to-br from-card to-muted/30">
                <CardContent className="p-0 h-full">
                  <div className="w-full h-full min-h-[500px] bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                      <h3 className="text-xl font-bold mb-2">Find Us</h3>
                      <p className="text-muted-foreground">Interactive map coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Global Offices</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We have offices around the world to better serve our clients and provide local support.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <AnimatedSection key={office.city} animation="slide-up" delay={index * 200}>
                <Card className="text-center border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Building className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-xl mb-4">{office.city}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center justify-center">
                        <Phone className="h-4 w-4 mr-2" />
                        <a href={`tel:${office.phone}`} className="hover:text-primary">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center justify-center">
                        <Mail className="h-4 w-4 mr-2" />
                        <a href={`mailto:${office.email}`} className="hover:text-primary">
                          {office.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection animation="fade-in" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get quick answers to common questions about our services and processes.
            </p>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is your typical project timeline?",
                answer: "Project timelines vary based on complexity, but most projects range from 2-6 months. We provide detailed timelines during our initial consultation."
              },
              {
                question: "Do you provide ongoing support after project completion?",
                answer: "Yes, we offer comprehensive support packages including maintenance, updates, and technical support to ensure your solution continues to perform optimally."
              },
              {
                question: "What technologies do you specialize in?",
                answer: "We work with a wide range of modern technologies including React, Node.js, Python, AI/ML frameworks, cloud platforms (AWS, Azure, GCP), and more."
              },
              {
                question: "How do you ensure project security and data privacy?",
                answer: "We follow industry best practices for security, including encrypted communications, secure development practices, and compliance with relevant data protection regulations."
              }
            ].map((faq, index) => (
              <AnimatedSection key={index} animation="slide-up" delay={index * 100}>
                <Card className="border-2 hover:border-primary/50 transition-all duration-300 bg-gradient-to-br from-card to-muted/30">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <AnimatedSection animation="fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss your ideas and see how we can help bring them to life.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
              Schedule Free Consultation
            </Button>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}