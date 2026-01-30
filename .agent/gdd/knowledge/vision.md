---
title: Visão do Projeto - VICCS Comes Alive
type: gdd
status: active
tags: [vision, core, pillars]
---

# Visão do Projeto: VICCS Comes Alive (VCA)

## 1. Introdução e Filosofia

**VICCS Comes Alive (VCA)** visa preencher a lacuna fundamental na imersão de jogos de sandbox voxel: a superficialidade das interações com Entidades Não-Jogáveis (NPCs). O objetivo é transformar "Aldeões" (dispensadores de itens) em "Humanos" com agência, memória, linhagem genética e função econômica.

O VCA propõe um **"Simulador de Sociedade Viva"**, onde o jogador evolui de um simples habitante para um monarca absoluto, governando cidadãos que parecem, fundamentalmente, vivos.

## 2. Os Três Pilares Fundamentais

A arquitetura do VCA sustenta-se sobre três pilares indissociáveis:

### I. Simulação Social Profunda (O Pilar Humano)

Substituição total da entidade "Aldeão" por "Humanos".

* **Genética Mendeliana**: Herança de traços físicos (pele, cabelo, olhos).
* **Personalidade Complexa**: Sistema baseado em MBTI simplificado e traços (ex: Trabalhador, Preguiçoso).
* **Conexão Emocional**: Relacionamentos dinâmicos, casamento, procreation e árvores genealógicas persistentes.

### II. Gerenciamento e Evolução Cívica (O Pilar Político)

Um sistema de progressão onde o jogador desbloqueia autoridade administrativa.

* **Rank de Jogador**: De Camponês (Peasant) a Monarca (Monarch).
* **Construção Assistida**: Uso de NPCs para construir vilas baseadas em schematics (Blueprints).
* **Macroeconomia**: Impostos, leis, rotas de comércio e defesa militar.

### III. Inteligência Artificial Autônoma (O Pilar Técnico)

Implementação de Behavior Trees (Árvores de Comportamento) hierárquicas.

* **Autonomia**: NPCs realizam tarefas (agricultura, construção) sozinhos.
* **Request System**: Sistema de logística onde NPCs solicitam recursos uns aos outros (inspirado em MineColonies).

## 3. O Diferencial Hytale

Aproveitando a arquitetura robusta server-side do Hytale, toda a lógica de simulação roda no servidor, permitindo complexidade sem onerar o cliente. O VCA utiliza o Entity Component System (ECS) nativo para persistência e performance.
