const formatter = new Intl.DateTimeFormat("ka-GE", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(value?: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return formatter.format(date);
}
