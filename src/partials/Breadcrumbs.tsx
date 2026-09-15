import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="ნავიგაციის ბილიკი" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="size-3.5 text-slate-300 dark:text-slate-600" aria-hidden="true" />
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-700 dark:text-slate-200" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
