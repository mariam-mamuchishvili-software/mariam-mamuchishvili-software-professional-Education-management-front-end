import { Globe } from "lucide-react";
import type { ComponentType } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import type { SocialLink, SocialPlatform } from "../../types/social.types";

interface SocialLinksProps {
  links?: SocialLink[];
}

const PLATFORM_ICON: Record<SocialPlatform, ComponentType<{ className?: string }>> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  twitter: FaXTwitter,
  tiktok: FaTiktok,
  website: Globe,
};

const PLATFORM_LABEL: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  twitter: "X (Twitter)",
  tiktok: "TikTok",
  website: "ვებ-გვერდი",
};

export function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-card dark:border-slate-800 dark:bg-slate-900">
      <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase dark:text-brand-400">
        სოციალური ქსელები
      </p>

      {links && links.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {links.map((link) => {
            const Icon = PLATFORM_ICON[link.platform];

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={PLATFORM_LABEL[link.platform]}
                title={PLATFORM_LABEL[link.platform]}
                className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-card transition-colors hover:bg-brand-50 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Icon className="size-4" />
              </a>
            );
          })}
        </div>
      ) : (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">სოციალური ლინკები არ არის მითითებული.</p>
      )}
    </div>
  );
}
