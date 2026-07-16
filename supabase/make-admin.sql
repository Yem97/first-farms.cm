-- ============================================================
-- Make yourself an ADMIN
-- ------------------------------------------------------------
-- 1. First SIGN UP on the site (or the live site) with your email.
-- 2. Then open the Supabase SQL Editor, paste this, replace the
--    email below with the one you signed up with, and Run.
-- ============================================================

update public.profiles
set role = 'admin'
where id = (
  select id from auth.users
  where email = 'YOUR_EMAIL_HERE'
);

-- Verify:
-- select p.role, u.email
-- from public.profiles p join auth.users u on u.id = p.id
-- where u.email = 'YOUR_EMAIL_HERE';
