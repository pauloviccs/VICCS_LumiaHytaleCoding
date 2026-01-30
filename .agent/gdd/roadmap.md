---
title: Roadmap de Desenvolvimento - VICCS Comes Alive
type: gdd
status: active
tags: [roadmap, planning, milestones]
---

# Roteiro de Implementação (Roadmap)

## Fase 1: A Fundação Biológica (MVP)

**Objetivo**: Ter humanos persistentes no mundo em vez de aldeões genéricos.

- [x] **Setup do Projeto**: Estrutura Gradle, Main Class, permissions.
- [x] **Core Systems**: Comandos de Debug (`/mcastart`, `/mcacopy`) e Listeners.
- [ ] **Engenharia Reversa (API)**:
  - [x] Descoberta de Classes (World, Player).
  - [x] Descoberta de ECS (TransformComponent).
  - [ ] Registro de Entidade Customizada (BLOCKER).
- [ ] Criar modelos 3D (Man, Woman, Child) no HMM.
- [ ] Implementar classe `HumanEntity` (ECS) com persistência de dados (UUID, Nome, Genes).
- [ ] Implementar `SpawnReplacement` para substituir aldeões vanilla.
- [ ] UI Básica: Character Sheet (Inspection).

## Fase 2: A Sociedade Conectada

**Objetivo**: Criar laços emocionais e famílias.

- [ ] **Interaction System**: Roda de interação e lógica de probabilidade.
- [ ] **Relationships**: Sistema de Hearts e memória de interação.
- [ ] **Ciclo de Vida**: Casamento, Gravidez, Bebês e Crescimento.
- [ ] Itens: Anéis e Presentes.

## Fase 3: A Revolução Industrial

**Objetivo**: NPCs úteis que trabalham e constroem.

- [ ] **Behavior Trees**: Implementar IA de trabalho (Farmer, Lumberjack).
- [ ] **Request System**: Lógica de cadeia de suprimentos (Warehouse).
- [ ] **Construction**: Architect Tool e Builder AI (construção bloco a bloco).
- [ ] **Rank System**: Implementar ranks iniciais (Peasant -> Merchant).

## Fase 4: Política e Polimento

**Objetivo**: Gerenciamento macro e escala.

- [ ] **Town Hall**: UI de Tesouraria e Impostos.
- [ ] **High Ranks**: Noble, Mayor, Monarch e seus poderes.
- [ ] **Otimização**: LOD de IA para vilas com 100+ NPCs.
- [ ] **Eventos**: Raids, Casamentos, Funerais.

## Fase 5: Expansão (Pós-Lançamento)

- [ ] Compatibilidade com multiplayer massivo.
- [ ] Traços de personalidade expandidos.
- [ ] Bioma-specific cultures (roupas e arquitetura diferentes por bioma).
