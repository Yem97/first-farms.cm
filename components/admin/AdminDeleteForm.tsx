"use client";

import { Trash2 } from "lucide-react";
import { adminDeleteListing } from "@/app/admin/listings/actions";

export default function AdminDeleteForm({ id }: { id: string }) {
  return (
    <form
      action={adminDeleteListing}
      onSubmit={(e) => {
        if (!confirm("Delete this listing permanently?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label="Delete listing"
        className="inline-flex items-center gap-1.5 text-xs font-bold bg-white text-gray-400 border border-gray-200 px-3 py-2 rounded-lg hover:text-red-500 hover:border-red-200 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" /> Delete
      </button>
    </form>
  );
}
