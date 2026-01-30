-- Enable RLS
alter table auth.users enable row level security;

-- Profiles: Public profile info
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique,
  avatar_url text,
  level int default 1,
  xp int default 0,
  streak int default 0,
  currency int default 0, -- "Crystals" or similar
  updated_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Courses: The main curriculum
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  description text,
  thumbnail_url text,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.courses enable row level security;
create policy "Courses are viewable by everyone." on public.courses for select using (true);

-- Modules: Sections within a course
create table public.modules (
  id uuid default gen_random_uuid() primary key,
  course_id uuid references public.courses not null,
  title text not null,
  order_index int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.modules enable row level security;
create policy "Modules are viewable by everyone." on public.modules for select using (true);

-- Lessons: Individual learning units
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules not null,
  title text not null,
  content text, -- Markdown content
  type text default 'text', -- 'text', 'video', 'quiz', 'code'
  xp_reward int default 10,
  order_index int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
alter table public.lessons enable row level security;
create policy "Lessons are viewable by everyone." on public.lessons for select using (true);

-- User Progress: Tracking completion
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  lesson_id uuid references public.lessons(id) not null,
  is_completed boolean default false,
  completed_at timestamp with time zone,
  unique(user_id, lesson_id)
);
alter table public.user_progress enable row level security;
create policy "Users can view own progress." on public.user_progress for select using (auth.uid() = user_id);
create policy "Users can update own progress." on public.user_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own progress update." on public.user_progress for update using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to auto-create profile
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
