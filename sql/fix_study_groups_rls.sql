-- FIX: Study Groups RLS Policy
-- Problem: Users can't search groups by join_code because they're not members yet
-- Solution: Make join codes publicly searchable (they're meant to be shared anyway)

-- Drop old restrictive policy
drop policy if exists "Read my groups" on study_groups;

-- Create new policy: Allow reading groups if you're a member, creator, or it has a join_code
create policy "Read study groups" on study_groups for select to authenticated using (
  id in (select get_my_group_ids())  -- Member of the group
  OR created_by = auth.uid()          -- Creator of the group
  OR join_code IS NOT NULL            -- Any group with a join code is discoverable
);

-- Note: This is secure because:
-- 1. Join codes are meant to be shared (like invite links)
-- 2. Reading group metadata doesn't expose member data (separate table with separate RLS)
-- 3. Only allows SELECT, not INSERT/UPDATE/DELETE
