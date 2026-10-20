import { ArrowLeft, Building2, Eye, EyeOff, LogIn } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { ApiError } from "../../api/client";
import { loginCollege } from "../../api/collegeCabinet.api";
import { Field, FormMessage, INPUT, SubmitButton } from "../../components/StudentCabinet/CabinetForm";
import { ThemeToggle } from "../../components/ThemeToggle/ThemeToggle";
import { COLLEGE_CABINET_BASE } from "../../constants/collegeCabinet";
import { useTheme } from "../../hooks/useTheme";
import { getCollegeToken, setCollegeToken } from "../../utils/collegeSession";
import { fieldErrors, invalidProps } from "../../utils/studentCabinet";

/** Sign-in for the college cabinet: exchanges email + password for a Sanctum token. */
export function CollegeLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>();
  const [isPending, setIsPending] = useState(false);
  const sessionExpired = (location.state as { expired?: boolean } | null)?.expired === true;

  if (getCollegeToken()) return <Navigate to={COLLEGE_CABINET_BASE} replace />;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!email.trim()) nextErrors.email = "მიუთითეთ ელ-ფოსტა.";
    if (!password) nextErrors.password = "მიუთითეთ პაროლი.";
    setErrors(nextErrors);
    setFormError(undefined);
    if (Object.keys(nextErrors).length > 0) return;

    setIsPending(true);
    try {
      const { token } = await loginCollege(email.trim(), password);
      setCollegeToken(token);
      navigate(COLLEGE_CABINET_BASE, { replace: true });
    } catch (error) {
      if (error instanceof ApiError && error.status === 422) setErrors(fieldErrors(error));
      else if (error instanceof ApiError && error.status === 429)
        setFormError("ძალიან ბევრი მცდელობა. სცადეთ ერთ წუთში.");
      else setFormError(error instanceof ApiError ? error.message : "შესვლა ვერ მოხერხდა.");
      setIsPending(false);
    }
  }

  return (
    <div className="flex min-h-svh flex-col bg-slate-50 dark:bg-slate-950">
      <header className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          EduHub-ზე დაბრუნება
        </Link>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>

      <main className="flex flex-1 items-center justify-center px-4 pb-16">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md shadow-brand-600/25">
              <Building2 className="size-6" aria-hidden="true" />
            </span>
            <h1 className="mt-4 text-2xl font-bold">კოლეჯის კაბინეტი</h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              შედით კოლეჯის ადმინისტრაციის ელ-ფოსტით და პაროლით.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            {sessionExpired && !formError && (
              <p className="rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
                სესიას ვადა გაუვიდა. გთხოვთ, თავიდან შეხვიდეთ.
              </p>
            )}

            <Field label="ელ-ფოსტა" htmlFor="login-email" error={errors.email}>
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                className={INPUT}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                {...invalidProps("login-email", errors.email)}
              />
            </Field>

            <Field label="პაროლი" htmlFor="login-password" error={errors.password}>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`${INPUT} pr-11`}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  {...invalidProps("login-password", errors.password)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((shown) => !shown)}
                  aria-label={showPassword ? "პაროლის დამალვა" : "პაროლის ჩვენება"}
                  aria-pressed={showPassword}
                  className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </Field>

            {formError && <FormMessage kind="error">{formError}</FormMessage>}

            <SubmitButton isPending={isPending}>
              {!isPending && <LogIn className="size-4" aria-hidden="true" />}
              შესვლა
            </SubmitButton>
          </form>
        </div>
      </main>
    </div>
  );
}
