-- Function to handle XP rewards
CREATE OR REPLACE FUNCTION public.handle_xp_reward()
RETURNS TRIGGER AS $$
DECLARE
  lesson_xp INTEGER;
BEGIN
  -- Only grant XP if the lesson is completed and wasn't before
  IF NEW.is_completed = true AND (OLD.is_completed IS NULL OR OLD.is_completed = false) THEN
    -- Get XP reward from the lesson
    SELECT xp_reward INTO lesson_xp FROM public.lessons WHERE id = NEW.lesson_id;
    
    -- Update user profile
    IF lesson_xp IS NOT NULL THEN
      UPDATE public.profiles
      SET xp = COALESCE(xp, 0) + lesson_xp,
          updated_at = NOW()
      WHERE id = NEW.user_id;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger
DROP TRIGGER IF EXISTS on_lesson_complete ON public.user_progress;
CREATE TRIGGER on_lesson_complete
AFTER INSERT OR UPDATE ON public.user_progress
FOR EACH ROW
EXECUTE FUNCTION public.handle_xp_reward();
