import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from "react-icons/fa";
import { FiMail, } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const socialLinks = [
  { icon: FaGithub, href: import.meta.env.VITE_SOCIAL_GITHUB, label: "GitHub" },
  { icon: FaLinkedin, href: import.meta.env.VITE_SOCIAL_LINKEDIN, label: "LinkedIn" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
];

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
//   { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="py-2">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="/contact" className="text-xl font-bold tracking-tight">
              ANURAJ
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Anuraj Mane. All rights reserved.
            </p>
          </div>

          {/* Links
          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav> */}

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
            <div>
                <Link to="/contact" className="font-semibold text-white hover:text-indigo-700">
                    <FiMail size={24}/>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};