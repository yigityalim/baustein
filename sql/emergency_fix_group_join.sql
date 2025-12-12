-- EMERGENCY FIX: Create RPC function to bypass RLS for join_code lookup
-- This allows users to search groups by join_code without being members

CREATE OR REPLACE FUNCTION get_group_by_code(p_code text)
RETURNS TABLE (id uuid, name text, join_code text)
LANGUAGE sql
SECURITY DEFINER -- Run as function owner, bypassing RLS
AS $$
  SELECT id, name, join_code
  FROM study_groups
  WHERE join_code = p_code
  LIMIT 1;
$$;

-- Grant access to authenticated users
GRANT EXECUTE ON FUNCTION get_group_by_code(text) TO authenticated;
