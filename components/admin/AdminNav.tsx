"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Package, Users, Newspaper, CalendarDays } from "lucide-react";

const tabs = [
  { name: "Overview", href: "/admin", icon: LayoutGrid, exact: true },
  { name: "Listings", href: "/admin/listings", icon: Package },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Blog", href: "/admin/blog", icon: Newspaper },
  { name: "Events", href: "/admin/events", icon: CalendarDays },
];

export default function AdminNav() {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex gap-1 overflow-x-auto">
        {tabs.map((t) => {
          const active = isActive(t.href, t.exact);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-primary"
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
