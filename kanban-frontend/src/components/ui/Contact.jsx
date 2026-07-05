import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageSquareCode, Sparkles } from "lucide-react";
import Button from "./Button";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: import.meta.env.VITE_PERSONAL_EMAIL,
    href: import.meta.env.VITE_PERSONAL_MAIL_TO,
  },
  {
    icon: Phone,
    label: "Phone",
    value: import.meta.env.VITE_PERSONAL_MOBILE,
    href: import.meta.env.VITE_PERSONAL_MOBILE_TO,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: "https://maps.google.com",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null, // 'success' or 'error'
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration variables are missing. Please check your environment environment setup."
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent cleanly! I will reach back out to you shortly.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS execution exception:", err);
      setSubmitStatus({
        type: "error",
        message:
          err?.text || err?.message || "Failed to finalize pipeline message routing. Please try alternative platforms.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden bg-slate-950 text-slate-100">
      {/* Premium Ambient Background Mesh Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4 mb-6 text-white">
            Let's build{" "}
            <span className="font-serif italic font-normal bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              something great.
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Have an open opportunity, complex project, or just a simple query? Drop a line here—I usually respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-stretch">
          {/* Interactive Input Form Column */}
          <div className="backdrop-blur-md bg-slate-900/40 p-8 sm:p-10 rounded-3xl border border-slate-800 focus-within:border-indigo-500/40 transition-all duration-500 shadow-2xl flex flex-col justify-between">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-sm font-medium"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project context, timeline, or scope details..."
                  className="w-full px-4 py-3.5 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 outline-none transition-all text-sm font-medium resize-none leading-relaxed"
                />
              </div>

              <Button
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.98] text-white font-semibold rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-xl shadow-indigo-600/10 border border-indigo-500/20 disabled:opacity-50 disabled:pointer-events-none"
                type="submit"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Dispatching Payload...
                  </span>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>

              {submitStatus.type && (
                <div
                  className={`flex items-start gap-3 p-4 rounded-xl backdrop-blur-sm animate-fade-in ${
                    submitStatus.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                  }`}
                >
                  {submitStatus.type === "success" ? (
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm leading-relaxed font-medium">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Details & Extra Value Card Column */}
          <div className="flex flex-col justify-between gap-6">
            {/* Primary Details Card */}
            <div className="backdrop-blur-md bg-slate-900/40 rounded-3xl p-8 border border-slate-800 flex-1 flex flex-col justify-center">
              <h3 className="text-lg font-bold tracking-tight mb-6 text-white uppercase text-xs tracking-widest text-slate-400">
                Direct Communication Routing
              </h3>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/30 border border-slate-900 hover:border-slate-800 hover:bg-slate-950/60 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors border border-indigo-500/10 flex-shrink-0">
                      <item.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                        {item.label}
                      </div>
                      <div className="font-semibold text-sm sm:text-base text-slate-200 group-hover:text-indigo-400 transition-colors truncate">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* UX Dynamic Context Card (Balances the right layout container space) */}
            <div className="backdrop-blur-md bg-gradient-to-br from-indigo-950/20 to-slate-900/40 rounded-3xl p-8 border border-indigo-500/10 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/10 flex-shrink-0 mt-1">
                <MessageSquareCode className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Looking for custom work?</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  I specialize in structuring bespoke corporate systems, full stack React/Next platforms, optimization engineering, and pristine dashboard mockups. Skip the form if you want to jump straight to technical alignment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};