"use client";

import { ArrowUp, ArrowDown, Ban, RotateCcw, Trash2 } from "lucide-react";
import { setUserRole, setUserSuspended, deleteUser } from "@/app/admin/users/actions";

export default function UserActions({
  id,
  role,
  suspended,
  isSelf,
}: {
  id: string;
  role: string;
  suspended: boolean;
  isSelf: boolean;
}) {
  if (isSelf) {
    return <span className="text-xs text-gray-400 italic">This is you</span>;
  }

  const btn = "inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1.5 rounded-lg border transition-colors";

  return (
    <div className="flex items-center gap-1.5 flex-wrap justify-end">
      <form action={setUserRole}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="role" value={role === "admin" ? "member" : "admin"} />
        <button
          type="submit"
          onClick={(e) => {
            if (role === "admin" && !confirm("Remove admin rights from this user?")) e.preventDefault();
          }}
          className={`${btn} bg-white text-gray-600 border-gray-200 hover:text-primary`}
        >
          {role === "admin" ? <ArrowDown className="w-3.5 h-3.5" /> : <ArrowUp className="w-3.5 h-3.5" />}
          {role === "admin" ? "Demote" : "Make admin"}
        </button>
      </form>

      <form action={setUserSuspended}>
        <input type="hidden" name="id" value={id} />
        <input type="hidden" name="suspend" value={String(!suspended)} />
        <button
          type="submit"
          className={`${btn} ${suspended ? "bg-white text-green-600 border-green-200 hover:bg-green-50" : "bg-white text-amber-600 border-amber-200 hover:bg-amber-50"}`}
        >
          {suspended ? <RotateCcw className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
          {suspended ? "Unsuspend" : "Suspend"}
        </button>
      </form>

      <form
        action={deleteUser}
        onSubmit={(e) => {
          if (!confirm("Permanently delete this user and all their listings? This cannot be undone.")) e.preventDefault();
        }}
      >
        <input type="hidden" name="id" value={id} />
        <button type="submit" aria-label="Delete user" className={`${btn} bg-white text-gray-400 border-gray-200 hover:text-red-500 hover:border-red-200`}>
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
