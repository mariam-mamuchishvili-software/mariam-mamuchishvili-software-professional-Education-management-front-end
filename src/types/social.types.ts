// types/social.types.ts

export type SocialPlatform = "facebook" | "instagram" | "linkedin" | "youtube" | "twitter" | "tiktok" | "website";

export interface SocialLink {
  id: number;
  platform: SocialPlatform;
  url: string;
}
