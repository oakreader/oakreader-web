import Image from "next/image";
import Link from "next/link";
import { DOWNLOAD_URL, GITHUB_URL, RELEASES_URL } from "@/lib/links";

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Release Notes", href: RELEASES_URL },
      { label: "Download", href: DOWNLOAD_URL },
      { label: "Browser Extension", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help", href: "#" },
      { label: "Privacy", href: "#privacy" },
      { label: "Terms of Use", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "X", href: "#" },
      { label: "GitHub", href: GITHUB_URL },
    ],
  },
];

export function Footer() {
  return (
    <footer role="contentinfo" className="relative z-[1]">
      <div className="max-w-[120rem] mx-auto px-[2rem]">
        <nav
          aria-label="Footer links"
          className="grid grid-cols-2 gap-[4rem] md:flex md:justify-between md:gap-[8rem] lg:justify-start pb-[2rem] border-b border-black/10 w-full font-mono uppercase text-[1.3rem] leading-[1.6rem] tracking-[0.1em]"
        >
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-mono text-[1.3rem] uppercase leading-[1.7rem] tracking-[0.1em] font-normal text-black">
                {column.title}
              </h3>
              <ul className="mt-[1rem] flex flex-col gap-[1rem]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition-colors duration-200 text-black/50 hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="hidden lg:block ml-auto">
            <Image
              src="/icon.svg"
              alt="OakReader"
              width={40}
              height={40}
              className="rounded-[0.6rem] opacity-50"
            />
          </div>
        </nav>

        <div className="flex flex-col md:flex-row items-center justify-between font-mono uppercase text-[1.3rem] leading-[1.6rem] tracking-[0.1em] py-[2rem] gap-y-[2.4rem]">
          <div className="hidden lg:flex gap-[4rem] items-baseline text-black/50">
            <small>Copyright</small>
            <small>&copy; 2026</small>
          </div>
          <div className="text-center text-black/50">
            <p className="normal-case tracking-normal">
              Designed and Built by
              <br />
              <a
                href="#"
                className="text-black/70 hover:text-black transition-colors"
              >
                Oak
              </a>
            </p>
          </div>
          <div className="lg:hidden flex flex-wrap justify-center gap-x-[4rem] gap-y-[2.4rem] text-black/50">
            <small>Copyright &copy; 2026</small>
          </div>
        </div>
      </div>
    </footer>
  );
}
