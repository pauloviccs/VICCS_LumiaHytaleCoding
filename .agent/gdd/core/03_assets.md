---
title: Assets & Recursos - VICCS Comes Alive
type: gdd
status: draft
tags: [assets, models, audio, items]
---

# Lista de Assets Necessários

## 1. Modelos de Entidade (Hytale Model Maker)

A classe `hca:human` requer variações robustas.

* **Base Models**:
  * `human_male_adult`
  * `human_female_adult`
  * `human_child` (Escala 0.6x, proporções ajustadas)
  * `human_baby` (Escala 0.3x, modelo "engatinhando" ou deitado)
* **Layers (Camadas)**:
  * Peles (Skins): Variações étnicas e de fantasia.
  * Cabelos: 10+ estilos masculinos, 10+ femininos. Cores manipuláveis via código (Tint).
  * Olhos: Textura separada para permitir heterocromia.
  * Roupas: Sets baseados em Profissão (Farmer, Guard, Miner, Noble).

## 2. Audio Design

* **Vozes**: "Simlish" ou Hytale-mumble.
  * Tons: Male Deep, Male High, Female Soft, Female Strong, Child, Baby.
* **SFX**:
  * `interaction_success`: Som de "Plim" ou risada.
  * `interaction_fail`: Som de suspiro ou resmungo.
  * `whistle`: Som de assobio para comandos (Follow/Stay).
  * `marriage_bell`: Som de sino para casamentos.

## 3. Novos Itens

* **Social**:
  * `engagement_ring`: Ouro + Diamante.
  * `wedding_ring`: Ouro puro.
  * `arrangement_whistle`: Para comandar família/aldeões.
* **Ferramentas**:
  * `architect_wand`: Abre a GUI de construção.
  * `gene_inspector`: Lupa para ver genes ocultos.
* **World**:
  * `tombstone`: Bloco gerado na morte, guarda inventário e dados do NPC.
  * `cradle`: Berço para bebês.

## 4. Estruturas (Schematics)

* Tier 1: Huts, Shacks (Peasant).
* Tier 2: Wood Houses, Farms (Citizen/Merchant).
* Tier 3: Stone Manors, Guard Towers (Noble).
* Tier 4: Castle, Cathedral, Grand Library (Monarch).
