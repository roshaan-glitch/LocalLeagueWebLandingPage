import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="border-t py-10 px-4"
      style={{ borderColor: "hsl(var(--border))", background: "#000" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="LocalLeague" className="w-7 h-7 rounded-lg object-cover" />
          <span
            className="font-bold tracking-wider"
            style={{ fontFamily: "Rajdhani, sans-serif", color: "hsl(var(--primary))" }}
          >
            LocalLeague
          </span>
        </div>

        {/* Copyright */}
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} LocalLeague. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex gap-5">
          <Link
            to="/privacy-policy"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-200 hover:underline"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
