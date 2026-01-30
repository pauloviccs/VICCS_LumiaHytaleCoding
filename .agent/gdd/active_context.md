# Active Context (Scratchpad)

## Estado Atual: Fase 1 - Fundação Biológica (Investigação de API)

**Status**: 🛠️ Reverse Engineering & Probing

Estamos no processo de descobrir como spawnar entidades customizadas no Hytale Server (que é ofuscado/fechado).

### Descobertas Críticas (API Findings)

1. **Acesso ao Mundo**: `com.hypixel.hytale.server.core.universe.world.World` é a classe principal.
2. **Acesso ao Player**: `com.hypixel.hytale.server.core.entity.entities.Player`.
3. **Posicionamento (ECS)**:
    - Players não possuem métodos `getPosition()` diretos.
    - Deve-se usar: `player.getTransformComponent().getPosition()`.
4. **Sistema de Spawn**:
    - Método: `world.spawnEntity(Entity, Vector3d, Vector3f)`.
    - **Bloqueio**: Instanciar `new Entity()` ou subclasses diretas causa `IllegalArgumentException: Unknown entity`.
    - **Solução Hipotética**: O jogo exige que a entidade seja registrada no `EntityModule` ou instanciada via `PrefabSpawnerModule` usando um "Type ID" válido (JSON).

### Ferramentas Desenvolvidas

- `/mcastart`: Comando de sonda multi-uso (Reflection Probe). Atualmente configurado para inspecionar `EntityModule` e `PrefabSpawner`.
- `/mcacopy`: Comando para dump de logs de depuração para arquivo local (`mca_debug.txt`).

### Próximos Passos Imediatos

1. Analisar o dump de logs do `/mcacopy`.
2. Descobrir a assinatura exata de `EntityModule.registerEntity`.
3. Registrar `HumanEntity` com um ID válido ou criar um JSON de Prefab para ele.
