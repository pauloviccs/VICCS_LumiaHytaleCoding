# GDD & Context Engineering para Google AntGravity/IDEs

Este documento descreve a estratégia de estruturação de contexto para Agentes de IA (Google AntGravity, Cursor, Copilot Workspace) focada em desenvolvimento de jogos.

O objetivo é transformar um **Game Design Document (GDD)** monolítico em uma **Base de Conhecimento Modular**, permitindo que a IA recupere informações específicas (RAG) de forma eficiente sem alucinar ou perder o foco.

---

## 1. Arquivos de Contexto Recomendados

Além dos arquivos padrão (`skills.md`, `rules.md`, `workflow.md`), recomenda-se a criação dos seguintes arquivos para cobrir o escopo de Game Design:

### A. `vision.md` (ou `project_charter.md`)

* **Propósito:** Define o "Norte Magnético" do projeto.
* **Conteúdo:** O "Elevator Pitch", o público-alvo, a "vibe" (mood) e os pilares de design.
* **Por que usar:** Evita que a IA sugira mecânicas ou estilos que fogem da proposta original (ex: sugerir realismo num jogo cartoon).

### B. `mechanics.md`

* **Propósito:** A "verdade absoluta" sobre as regras do jogo.
* **Conteúdo:** Loop principal (Core Loop), sistemas de inventário, combate, progressão.
* **Dica:** Em projetos complexos, divida em `mechanics_combat.md`, `mechanics_crafting.md`, etc.

### C. `lore.md` (ou `world_building.md`)

* **Propósito:** Contexto narrativo.
* **Conteúdo:** História do mundo, facções, geografia, biografia de personagens e glossário de termos.
* **Uso:** Essencial para gerar diálogos, descrições de itens (flavor text) e nomes de variáveis semanticamente corretos.

### D. `style_guide.md`

* **Propósito:** Padrões técnicos e artísticos.
* **Conteúdo:**
  * *Técnico:* Convenções de código (ex: "Use Composition over Inheritance", "Snake_case para variáveis").
  * *Artístico:* Paleta de cores, limitações de assets (ex: "Low poly", "Pixel Art 32x32").

### E. `roadmap.md`

* **Propósito:** Estado atual do projeto.
* **Conteúdo:** O que já está pronto, o que está em progresso (WIP) e o backlog futuro. Ajuda a IA a entender a prioridade atual.

---

## 2. Estratégia de Hierarquia de Pastas

Organizar os arquivos em pastas ajuda a IA a entender o escopo semântico. Sugestão de estrutura dentro da raiz do projeto ou pasta `.context`:

```text
/.agent
  ├── /gdd                 # Comportamento do Agente
  │     ├── gdd_"nomedoprojeto".md  # Escopo geral do projeto, o GDD Completo.
  │
  ├── /knowledge            # A "Memória" do Projeto (GDD Modular)
  │     ├── vision.md       # Resumo executivo
  │     ├── lore.md         # Narrativa
  │     ├── tech_stack.md   # Libs, versões, arquitetura
  │     └── style_guide.md  # Padrões
  │
  ├── /mechanics            # Regras Específicas
  │     ├── 01_mechanics.md
  │     ├── 02_ui_ux.md
  │     └── 03_assets.md
  │
  └── active_context.md     # Scratchpad - Foco da Sprint
