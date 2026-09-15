export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "კოლეჯები", href: "/colleges" },
  { label: "პროფესიები", href: "/professions" },
  { label: "მასწავლებლები", href: "/teachers" },
];
