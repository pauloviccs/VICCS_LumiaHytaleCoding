-- Create Courses Table
create table courses (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Modules Table
create table modules (
  id uuid default uuid_generate_v4() primary key,
  course_id uuid references courses(id) on delete cascade not null,
  title text not null,
  description text,
  order_index integer not null,
  is_locked boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table courses enable row level security;
alter table modules enable row level security;

-- Policies (Public Read for now, or Authenticated Read)
create policy "Public courses are viewable by everyone"
  on courses for select
  using ( true );

create policy "Public modules are viewable by everyone"
  on modules for select
  using ( true );

-- Seed Data
insert into courses (title, description) values
('Module 1: The Basics of Java', 'Learn primitive data types, variables, and how to print "Hello World" to the console. Essential for your first Hytale mod.');

-- Insert modules for the course (assuming we get the ID, but for seed we can use a temporary block or just manual insert instructions. 
-- Since I can't easily capture the ID in one go without a function, I will just provide the schema and let the user know, OR I can run a more complex block.)

do $$
declare
  v_course_id uuid;
begin
  select id into v_course_id from courses where title = 'Module 1: The Basics of Java' limit 1;
  
  insert into modules (course_id, title, description, order_index, is_locked) values
  (v_course_id, 'Hello World', 'Your first spell.', 0, false),
  (v_course_id, 'Control Flow & Logic', 'Making decisions with code.', 1, true),
  (v_course_id, 'Object Oriented Hytale', 'Understanding the world of objects.', 2, true);
end $$;
