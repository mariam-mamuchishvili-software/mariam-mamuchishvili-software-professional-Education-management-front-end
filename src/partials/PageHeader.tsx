interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h1>
      {description && <p className="mt-2 text-slate-500">{description}</p>}
    </div>
  );
}
