"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, Phone, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import emailjs from '@emailjs/browser';
const ContactSection = () => {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      projectBrief: '',
      budget: '',
      prototype: ''
    })
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      budget: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      // EmailJS configuration - Now loaded from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

      // Prepare template parameters for EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone_number: formData.phone,
        project_brief: formData.projectBrief,
        budget: formData.budget || 'Not specified',
        prototype: formData.prototype || 'Not provided',
        to_email: 'dipaligupta885@gmail.com',
        message: `
New Contact Form Submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Budget: ${formData.budget || 'Not specified'}
Project Brief: ${formData.projectBrief}
Prototype/Initial Version: ${formData.prototype || 'Not provided'}
        `
      };

      console.log('Sending email with EmailJS:', templateParams);

      // Initialize EmailJS (you only need to do this once)
      emailjs.init(publicKey);

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams
      );

      console.log('Email sent successfully:', result);
      
      toast.success('Message sent successfully! We\'ll be in touch soon.');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectBrief: '',
        budget: '',
        prototype: ''
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-background to-[#121212] opacity-50" />
        <div className="absolute -top-[10%] -right-[5%] w-[20%] h-[20%] rounded-full bg-primary/10 blur-3xl" />
      </div>
      <div className="container mx-auto container-padding relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 opacity-0 animate-fade-in-up">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 opacity-0 animate-fade-in-up delay-100"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Get in touch with us to bring your product idea to life. We're excited to hear about your project!
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-card rounded-xl p-6 md:p-8 opacity-0 animate-fade-in-up delay-100">
            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name <span className="text-primary">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="w-full bg-background/50"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email <span className="text-primary">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className="w-full bg-background/50"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number <span className="text-primary">*</span>
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXXXXXXX"
                  required
                  className="w-full bg-background/50"
                />
              </div>
              
              <div>
                <label htmlFor="projectBrief" className="block text-sm font-medium text-gray-300 mb-1">
                  Project Brief <span className="text-primary">*</span>
                </label>
                <Textarea
                  id="projectBrief"
                  name="projectBrief"
                  value={formData.projectBrief}
                  onChange={handleChange}
                  placeholder="Share details about your project or paste a Google Doc/Notion link"
                  required
                  className="w-full h-32 bg-background/50"
                />
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-1">
                  Estimated Budget Range
                </label>
                <Select onValueChange={handleSelectChange} value={formData.budget}>
                  <SelectTrigger className="w-full bg-background/50">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-10k">Less than $10,000</SelectItem>
                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="more-than-100k">More than $100,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="prototype" className="block text-sm font-medium text-gray-300 mb-1">
                  Prototype or Initial Version (optional)
                </label>
                <Input
                  id="prototype"
                  name="prototype"
                  value={formData.prototype}
                  onChange={handleChange}
                  placeholder="Link to prototype or initial version"
                  className="w-full bg-background/50"
                />
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-8 opacity-0 animate-fade-in-up delay-300">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8">
                Ready to transform your idea into reality? Reach out to us through any of these channels and we'll get back to you promptly.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Email</h4>
                    <a href="mailto:dipaligupta885@gmail.com" className="text-gray-300 hover:text-primary transition-colors">
                      pandaamitav01@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Phone</h4>
                    <a href="tel:+917077404655" className="text-gray-300 hover:text-primary transition-colors">
                      +91 7077404655
                    </a>
                    <br />
                    <a href="tel:+919876543210" className="text-gray-300 hover:text-primary transition-colors">
                      +91 7735490979
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Location</h4>
                    <p className="text-gray-300">
                      FortuneTower,Chandrasekharpur, Bhubaneswar
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6 md:p-8">
              <h4 className="text-xl font-semibold mb-4">FAQ</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium mb-2">How long does the development process usually take?</h5>
                  <p className="text-gray-400">
                    Our AI-powered approach typically reduces development time by 60-70%. Most projects are completed within 4-8 weeks depending on complexity.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Do you provide ongoing maintenance?</h5>
                  <p className="text-gray-400">
                    Yes, we offer flexible maintenance plans to keep your product running smoothly and up-to-date.
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">What technologies do you specialize in?</h5>
                  <p className="text-gray-400">
                    We specialize in modern web and mobile technologies, AI/ML integration, and cloud services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
  


export default ContactSection