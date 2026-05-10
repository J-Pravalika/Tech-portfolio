import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-border/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="font-mono text-sm text-muted-foreground">
              Built with <Heart className="w-3.5 h-3.5 inline text-primary mx-1" /> by{' '}
              <span className="text-foreground font-medium">Pravalika</span>
            </p>
            <p className="font-mono text-xs text-muted-foreground/50 mt-1">
              © {new Date().getFullYear()} — All rights reserved
            </p>
          </div>

          <div className="flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg glass text-muted-foreground hover:text-primary transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg glass text-muted-foreground hover:text-accent transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:pravalika081205@gmail.com"
              className="p-2.5 rounded-lg glass text-muted-foreground hover:text-primary transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}