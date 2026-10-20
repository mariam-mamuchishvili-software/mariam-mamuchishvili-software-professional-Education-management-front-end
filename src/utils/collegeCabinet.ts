import type { College } from "../types/college.types";
import type { ProfileCompletionItem } from "../types/teacherCabinet.types";

export function getCollegeProfileCompletionItems(college: College): ProfileCompletionItem[] {
  return [
    { label: "ლოგო", done: Boolean(college.logo) },
    { label: "პოსტერი", done: Boolean(college.poster) },
    { label: "საკონტაქტო ინფორმაცია", done: Boolean(college.email && college.phone && college.website) },
    { label: "აღწერა", done: Boolean(college.detail?.description) },
    { label: "მდებარეობა რუკაზე", done: college.latitude != null && college.longitude != null },
    { label: "სოციალური ქსელები", done: (college.detail?.social_links?.length ?? 0) > 0 },
  ];
}
