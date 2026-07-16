"use client";

/**
 * Wraps a server action in a <form> with a JS confirm() gate and a hidden id.
 * Reusable for admin delete buttons across blog / events / listings.
 */
export default function ConfirmForm({
  action,
  id,
  message,
  className,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  message: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      className={className}
      onSubmit={(e) => {
        if (!confirm(message)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      {children}
    </form>
  );
}
