"use client";

import { cn } from "@/lib/utils";

/**
 * FormField — labelled input/select/textarea wrapper for the
 * react-hook-form powered forms.
 *
 * Wire it up by spreading `register("name")` onto the component:
 *
 *   <FormField id="phone" label="Phone number" type="tel"
 *              required error={errors.phone?.message}
 *              {...register("phone")} />
 *
 * Error/hint text is linked to the input via aria-describedby and the
 * invalid state is announced via aria-invalid (WCAG 3.3.1 / 4.1.3).
 */
type FieldAs = "input" | "textarea" | "select";

interface FormFieldProps {
  id: string;
  label: string;
  as?: FieldAs;
  required?: boolean;
  error?: string;
  hint?: string;
  /** Options (children) when `as="select"`. */
  children?: React.ReactNode;
  className?: string;
  /** Pass-through for react-hook-form's register() props + native inputs. */
  [key: string]: unknown;
}

export function FormField({
  id,
  label,
  as = "input",
  required,
  error,
  hint,
  children,
  className,
  ...rest
}: FormFieldProps) {
  const describedBy = error
    ? `${id}-error`
    : hint
      ? `${id}-hint`
      : undefined;

  const shared = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    required: required || undefined,
    ...rest,
  };

  const inputClasses = cn("input", error && "input-error");

  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="label">
        {label}
        {required && (
          <span aria-hidden="true" className="text-red-600">
            {" "}
            *
          </span>
        )}
      </label>

      {as === "textarea" ? (
        <textarea rows={4} {...shared} className={inputClasses} />
      ) : as === "select" ? (
        <select {...shared} className={cn(inputClasses, "pr-8")}>
          {children}
        </select>
      ) : (
        <input {...shared} className={inputClasses} />
      )}

      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
