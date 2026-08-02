import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="py-12 bg-background border-b border-border/60 min-h-screen">
      <div className="container-custom max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-extrabold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
            GET IN TOUCH WITH HARDWARE ENGINEERS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground font-heading">
            Contact TechNest Support
          </h1>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Have questions about custom builds, warranties, or order delivery? Our engineering team is ready to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl border border-border bg-card space-y-6 shadow-sm">
              <h3 className="text-base font-bold text-foreground border-b border-border pb-3">
                Direct Contact Information
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Email Support</span>
                    <span className="text-muted-foreground">support@technest.store</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Phone Helpline</span>
                    <span className="text-muted-foreground">+91 (800) 123-4567 (Mon-Sat, 9 AM - 8 PM IST)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Headquarters</span>
                    <span className="text-muted-foreground">TechNest Labs, 100 Feet Road, Indiranagar, Bengaluru, KA - 560001</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-foreground block">Response Time</span>
                    <span className="text-muted-foreground">Under 2 hours for active orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl border border-border bg-card shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span>Send a Message</span>
              </h3>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 shrink-0" />
                  <div>
                    <p className="font-bold text-sm">Message Sent Successfully!</p>
                    <p className="text-[11px] text-emerald-400 mt-0.5">
                      Our hardware engineering team will reply to {formData.email} shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Shwetank Sharma"
                        required
                        className="w-full bg-background border border-border text-foreground text-xs p-3 rounded-xl focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="shwetank@company.com"
                        required
                        className="w-full bg-background border border-border text-foreground text-xs p-3 rounded-xl focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Order Inquiry / Custom PC Support"
                      className="w-full bg-background border border-border text-foreground text-xs p-3 rounded-xl focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="font-extrabold text-foreground uppercase tracking-wider block mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can our engineering team help you?"
                      required
                      className="w-full bg-background border border-border text-foreground text-xs p-3 rounded-xl focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <Button type="submit" variant="default" className="w-full font-bold text-xs py-3.5 shadow-lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Support Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
