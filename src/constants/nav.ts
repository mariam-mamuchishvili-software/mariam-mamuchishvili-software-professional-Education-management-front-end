export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "მთავარი", href: "/" },
  { label: "კოლეჯები", href: "/colleges" },
  { label: "პროფესიები", href: "/professions" },
  { label: "მოდულები", href: "/modules" },
  { label: "ჯგუფები", href: "/groups" },
  { label: "მასწავლებლები", href: "/teachers" },
  { label: "სტუდენტები", href: "/students" },
];
