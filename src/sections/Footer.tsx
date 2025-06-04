import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg"
import GithubIcon from "@/assets/icons/github.svg"
import LinkedInIcon from "@/assets/icons/github.svg"
import InstagramIcon from "@/assets/icons/github.svg"
import TwitterIcon from "@/assets/icons/github.svg"

const footerLinks = [
  {
    title: 'Github',
    href: 'https://github.com/Swagat-D',
    icon: GithubIcon
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/swagatdash15',
    icon: LinkedInIcon
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/_swagat_dash_',
    icon: InstagramIcon
  },
  {
    title: 'Twitter',
    href: 'https://x.com/swagatdash164',
    icon: TwitterIcon
  }
]

export const Footer = () => {
  return <footer className="relative -z-10 overflow-x-clip">
    <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
    <div className="container">
      <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
        <div className="text-white/40">&copy; 2025 All rights reserved</div>
        <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
          {footerLinks.map(link => (
            <a 
              href={link.href} 
              key={link.title} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <link.icon className="size-5 opacity-60 group-hover:opacity-100 transition-opacity" />
              <span className="font-medium text-white/60 group-hover:text-white transition-colors">{link.title}</span>
              <ArrowUpRightIcon className="size-4 opacity-0 group-hover:opacity-60 transition-opacity" />
            </a>
          ))}
        </nav>
      </div>
    </div>
  </footer>;
};