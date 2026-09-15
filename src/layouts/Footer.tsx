import { GraduationCap } from "lucide-react";
import { Link } from "react-router";
import { NAV_LINKS } from "../constants/nav";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900">
              <span className="flex size-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <GraduationCap className="size-5" aria-hidden="true" />
              </span>
              <span className="text-lg">EduHub</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              პლატფორმა კოლეჯების, პროფესიების, მოდულების, ჯგუფების, მასწავლებლებისა და
              სტუდენტების შესახებ ინფორმაციის ცენტრალიზებული მართვისთვის.
            </p>
          </div>

          <nav aria-label="ქვედა ნავიგაცია">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:flex sm:flex-col">
              {NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-500 transition-colors hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-sm text-slate-400">
          © {new Date().getFullYear()} EduHub. ყველა უფლება დაცულია.
        </div>
      </div>
    </footer>
  );
}
