"use client";

import { Trash2 } from "lucide-react";
import { deleteListing } from "@/app/dashboard/listings/actions";

export default function DeleteListingButton({ id }: { id: string }) {
  return (
    <form
      action={deleteListing}
      onSubmit={(e) => {
        if (!confirm("Delete this listing? This cannot be undone.")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label="Delete listing"
        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  );
}
