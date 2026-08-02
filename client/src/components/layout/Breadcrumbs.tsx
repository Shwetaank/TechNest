import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-muted/30 border-b border-border/40">
      <div className="container-custom flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto whitespace-nowrap">
        <a
          href="/"
          className="flex items-center gap-1 hover:text-foreground transition-colors font-medium"
        >
          <Home className="w-3.5 h-3.5 text-primary" />
          <span>Home</span>
        </a>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <div key={idx} className="flex items-center gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-foreground truncate max-w-[200px]">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-foreground transition-colors font-medium"
                >
                  {item.label}
                </a>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
