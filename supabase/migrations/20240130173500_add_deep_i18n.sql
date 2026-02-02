-- Migration: Add localized columns to lessons table

ALTER TABLE public.lessons 
ADD COLUMN IF NOT EXISTS title_pt TEXT,
ADD COLUMN IF NOT EXISTS content_pt TEXT,
ADD COLUMN IF NOT EXISTS lore_pt TEXT;

-- Seed Data using UPDATE
UPDATE public.lessons 
SET 
  title_pt = CASE 
    WHEN title = 'The Signal' THEN 'O Sinal'
    WHEN title = 'Power Levels' THEN 'Níveis de Energia'
    ELSE title 
  END,
  content_pt = CASE 
    WHEN title = 'The Signal' THEN '# O Sinal\n\nNossos scanners detectaram um sinal fraco do Vazio. Precisamos estabelecer um link.\n\nEscreva um programa Java que imprima "Hello World" no console para calibrar a frequência de transmissão.'
    WHEN title = 'Power Levels' THEN '# Níveis de Energia\n\nO portal permanece inativo. Parece que nossas reservas de energia estão criticamente baixas.\n\nERRO CRÍTICO: ENERGIA ESGOTADA\n\nO portal requer um surto de energia. Defina uma variável inteira chamada `energy` e defina-a como `100`.'
    ELSE content 
  END,
  lore_pt = CASE 
    WHEN title = 'The Signal' THEN 'A estática fala, se você souber ouvir.'
    WHEN title = 'Power Levels' THEN 'O portal permanece inativo. Parece que nossas reservas de energia estão criticamente baixas.'
    ELSE lore 
  END
WHERE title IN ('The Signal', 'Power Levels');
