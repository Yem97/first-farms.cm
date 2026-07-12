-- ============================================================
-- Seed data — run AFTER 0001_initial_schema.sql
-- Safe to re-run: clears then re-inserts the curated tables.
-- ============================================================

-- ---------- Leadership (real board) ----------
delete from public.team_members;
insert into public.team_members (name, role, board, sort_order) values
  ('TOGUÉ TOGUÉ Laurent Ghislain', 'Chairperson — Board of Directors',            'directors',   1),
  ('Tita Pascline Wokongwo',       'Asst. Secretary / Financial Secretary',        'directors',   2),
  ('Siani Tomaha André',           'Member — Board of Directors',                  'directors',   3),
  ('Walter Ngwa Shu',              'Chairperson / Asst. Treasurer — Supervisory',  'supervisory', 1),
  ('Senge Grace Ebong',            'Secretary / Communication — Supervisory',      'supervisory', 2),
  ('Ndip Prestile Anne',           'Member — Supervisory Board',                   'supervisory', 3);

-- ---------- Testimonials ----------
delete from public.testimonials;
insert into public.testimonials (quote, farmer_name, region, featured) values
  ('Since joining AgriTech Hub, I have doubled my income by selling directly to buyers in Douala. No more middlemen taking our profits.', 'Celestin Bakam', 'Adamaoua', true),
  ('The training on soil management completely changed how I grow my tomatoes. My harvest is now three times bigger and healthier.',       'Beatrice Ngono', 'Littoral', true),
  ('AgriTech Hub gave me access to tools, storage, and markets I never thought I could reach as a small farmer in the North.',            'Ibrahim Yaya',   'Nord',     true);

-- ---------- Advert packages ----------
delete from public.advert_packages;
insert into public.advert_packages (name, price, description, features, sort_order) values
  ('Starter',  25000,  'Basic visibility for small agribusinesses.',      '["Listing on marketplace","1 featured week","WhatsApp contact button"]'::jsonb, 1),
  ('Growth',   60000,  'Expanded reach for growing suppliers.',           '["Everything in Starter","1 month featured","Homepage placement","Priority support"]'::jsonb, 2),
  ('Premium',  120000, 'Maximum exposure across the platform.',           '["Everything in Growth","Banner placement","Newsletter feature","Dedicated account manager"]'::jsonb, 3);
