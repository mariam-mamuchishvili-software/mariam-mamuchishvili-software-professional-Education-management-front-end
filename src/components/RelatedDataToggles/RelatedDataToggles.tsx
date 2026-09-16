interface RelatedDataTogglesProps<T extends string> {
  options: { key: T; label: string }[];
  selected: T[];
  onToggle: (include: T) => void;
}

export function RelatedDataToggles<T extends string>({ options, selected, onToggle }: RelatedDataTogglesProps<T>) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-slate-900 dark:text-white">დაკავშირებული მონაცემები</legend>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {options.map((option) => {
          const checked = selected.includes(option.key);

          return (
            <label
              key={option.key}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors has-[:checked]:border-brand-500 has-[:checked]:bg-brand-50 has-[:checked]:text-brand-700 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500 hover:border-brand-200 hover:bg-brand-50/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-brand-800 dark:hover:bg-brand-500/10 dark:has-[:checked]:border-brand-500 dark:has-[:checked]:bg-brand-500/10 dark:has-[:checked]:text-brand-300"
            >
              <input
                type="checkbox"
                className="size-4 rounded border-slate-300 text-brand-600 focus-visible:outline-none dark:border-slate-600 dark:bg-slate-800"
                checked={checked}
                onChange={() => onToggle(option.key)}
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
