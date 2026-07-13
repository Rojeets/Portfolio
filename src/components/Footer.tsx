import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full py-section-gap px-margin-mobile md:px-gutter bg-surface-deep border-t border-border-subtle">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
          <div className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight mb-2">
            Rojit Pokharel
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant text-center md:text-left">
            &copy; {new Date().getFullYear()} Rojit Pokharel. Built with Architect Precision.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">
            LinkedIn
          </Link>
          <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">
            GitHub
          </Link>
          <Link href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">
            Twitter
          </Link>
          <Link href="/contact" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">
            Email
          </Link>
        </div>
      </div>
    </footer>
  )
}
