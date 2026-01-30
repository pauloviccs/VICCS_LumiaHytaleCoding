---
title: Mecânicas Principais - VICCS Comes Alive
type: gdd
status: active
tags: [mechanics, interaction, economy, progression]
---

# Mecânicas de Gameplay

## 1. Loop de Interação Social

A base do VCA é a interação "Humano-para-Humano".

* **Interface Radial**: Menu dinâmico ao interagir com NPCs (Chat, Joke, Flirt, Gift, Command).
* **Fórmula de Sucesso**:
    $$P(Success) = (BaseChance + (Mood \times 0.2) + (TraitBonus) + (Relationship \times 0.1)) \times (1 - Fatigue)$$
* **Corações (Hearts)**: Moeda social. Acumule para melhorar o rank e casar.

## 2. Ciclo de Vida e Família

Entidades envelhecem e evoluem.

1. **Baby**: 20-40 mins. Carregável, sons fofos.
2. **Child**: 3-5 dias. Faz tarefas leves (chores), vai à escola.
3. **Adult**: Idade produtiva. Trabalha, casa, procria.
4. **Elder**: Gera influência política, move-se mais devagar. Morte natural eventual.

### Genética

* **Hereditariedade**: Pele, Cabelo, Olhos combinam os genes dos pais (com chance de mutação).
* **Traços**: Personalidades (ex: Workaholic) impactam stats e comportamento.

## 3. Sistema de Rank (Política)

O jogador progride de forasteiro a rei.

| Rank | Requisitos | Poderes |
| :--- | :--- | :--- |
| **Peasant** | Nenhum | Casar, Adotar. |
| **Citizen** | 100 Hearts, Casa | Contratar trabalhadores básicos. |
| **Merchant** | 400 Hearts, Mercado | Cobrar impostos, Rotas de Comércio. |
| **Noble** | 800 Hearts, Inn | Limite de natalidade, Guarda-Costas. |
| **Mayor** | 1200 Hearts, Pop 20 | Zoneamento, Expulsão. |
| **Monarch** | 2500 Hearts, Pop 30 | Execução, Controle Militar, Edição de Jobs. |

## 4. Economia e Construção

* **Blueprint System**: Jogador seleciona estruturas ("Architect Tool"), NPCs constroem ("Builder AI").
* **Request System**: Cadeia de suprimentos autônoma.
  * *Builder pede Madeira -> Courier busca no Armazém -> Se não tem, Forester corta árvore.*
* **Impostos**: NPCs produtivos depositam % da produção no Tesouro da cidade.
