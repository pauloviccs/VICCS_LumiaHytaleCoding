import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLangStore } from '@/store/langStore';
import {
    Code,
    Layers,
    Terminal,
    Box,
    Cpu,
    Sparkles,
    ChevronRight,
    ChevronDown,
    Copy,
    Check,
    ExternalLink
} from 'lucide-react';

// Types
interface DocSection {
    id: string;
    titlePt: string;
    titleEn: string;
    icon: React.ReactNode;
    subsections?: { id: string; titlePt: string; titleEn: string }[];
}

// Documentation structure
const docSections: DocSection[] = [
    {
        id: 'getting-started',
        titlePt: 'Primeiros Passos',
        titleEn: 'Getting Started',
        icon: <Sparkles size={18} />,
        subsections: [
            { id: 'what-is-mod', titlePt: 'O que é um Mod?', titleEn: 'What is a Mod?' },
            { id: 'setup', titlePt: 'Configurando o Ambiente', titleEn: 'Environment Setup' },
            { id: 'first-plugin', titlePt: 'Seu Primeiro Plugin', titleEn: 'Your First Plugin' }
        ]
    },
    {
        id: 'core-api',
        titlePt: 'Core API',
        titleEn: 'Core API',
        icon: <Cpu size={18} />,
        subsections: [
            { id: 'hytale-server', titlePt: 'HytaleServer', titleEn: 'HytaleServer' },
            { id: 'event-bus', titlePt: 'EventBus', titleEn: 'EventBus' },
            { id: 'command-manager', titlePt: 'CommandManager', titleEn: 'CommandManager' },
            { id: 'plugin-manager', titlePt: 'PluginManager', titleEn: 'PluginManager' }
        ]
    },
    {
        id: 'plugins',
        titlePt: 'Plugins Built-in',
        titleEn: 'Built-in Plugins',
        icon: <Layers size={18} />,
        subsections: [
            { id: 'crafting-plugin', titlePt: 'CraftingPlugin', titleEn: 'CraftingPlugin' },
            { id: 'npc-plugin', titlePt: 'NPCPlugin', titleEn: 'NPCPlugin' },
            { id: 'objective-plugin', titlePt: 'ObjectivePlugin', titleEn: 'ObjectivePlugin' },
            { id: 'reputation-plugin', titlePt: 'ReputationPlugin', titleEn: 'ReputationPlugin' }
        ]
    },
    {
        id: 'server-dev',
        titlePt: 'Desenvolvimento Server',
        titleEn: 'Server Development',
        icon: <Terminal size={18} />,
        subsections: [
            { id: 'commands', titlePt: 'Comandos', titleEn: 'Commands' },
            { id: 'events', titlePt: 'Eventos', titleEn: 'Events' },
            { id: 'ecs', titlePt: 'ECS (Components)', titleEn: 'ECS (Components)' }
        ]
    },
    {
        id: 'assets',
        titlePt: 'Assets & Blocos',
        titleEn: 'Assets & Blocks',
        icon: <Box size={18} />,
        subsections: [
            { id: 'blocks', titlePt: 'Blocos', titleEn: 'Blocks' },
            { id: 'items', titlePt: 'Itens', titleEn: 'Items' },
            { id: 'textures', titlePt: 'Texturas', titleEn: 'Textures' }
        ]
    },
    {
        id: 'templates',
        titlePt: 'Templates de Projeto',
        titleEn: 'Project Templates',
        icon: <Code size={18} />,
        subsections: [
            { id: 'gradle-setup', titlePt: 'Gradle Setup', titleEn: 'Gradle Setup' },
            { id: 'manifest', titlePt: 'manifest.json', titleEn: 'manifest.json' },
            { id: 'plugin-base', titlePt: 'Plugin Base', titleEn: 'Plugin Base' }
        ]
    }
];

// Code block with copy button
const CodeBlock = ({ code, language = 'java' }: { code: string; language?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden border border-white/10 bg-black/40 my-4">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
                <span className="text-xs text-gray-400 uppercase">{language}</span>
                <button
                    onClick={handleCopy}
                    className="text-gray-400 hover:text-white transition-colors"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
            </div>
            <pre className="p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{code}</code>
            </pre>
        </div>
    );
};

// Content sections
const docContent: Record<string, { pt: React.ReactNode; en: React.ReactNode }> = {
    'what-is-mod': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">O que é um Mod?</h2>
                <p className="text-gray-300">
                    Um <strong>mod</strong> (modificação) é uma alteração no jogo original que adiciona novos conteúdos
                    ou modifica comportamentos existentes.
                </p>
                <div className="p-4 rounded-lg bg-liquid-primary/10 border border-liquid-primary/30">
                    <p className="text-gray-300">
                        <strong>Server-First:</strong> No Hytale, toda a lógica roda no servidor. O cliente é apenas
                        uma "tela" que exibe o que o servidor manda.
                    </p>
                </div>
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">What is a Mod?</h2>
                <p className="text-gray-300">
                    A <strong>mod</strong> (modification) is an alteration to the original game that adds new content
                    or modifies existing behaviors.
                </p>
                <div className="p-4 rounded-lg bg-liquid-primary/10 border border-liquid-primary/30">
                    <p className="text-gray-300">
                        <strong>Server-First:</strong> In Hytale, all logic runs on the server. The client is just
                        a "screen" that displays what the server sends.
                    </p>
                </div>
            </div>
        )
    },
    'setup': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Configurando o Ambiente</h2>
                <h3 className="text-xl font-semibold text-white mt-6">1. Instalar Java 25</h3>
                <p className="text-gray-300">Baixe o JDK 25 de <a href="https://adoptium.net" className="text-liquid-primary hover:underline" target="_blank" rel="noopener noreferrer">adoptium.net</a></p>
                <h3 className="text-xl font-semibold text-white mt-6">2. Instalar IntelliJ IDEA</h3>
                <p className="text-gray-300">Baixe a versão Community (gratuita) de <a href="https://jetbrains.com/idea" className="text-liquid-primary hover:underline" target="_blank" rel="noopener noreferrer">jetbrains.com/idea</a></p>
                <h3 className="text-xl font-semibold text-white mt-6">3. Verificar instalação</h3>
                <CodeBlock code="java --version\n# openjdk 25 ..." language="bash" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Environment Setup</h2>
                <h3 className="text-xl font-semibold text-white mt-6">1. Install Java 25</h3>
                <p className="text-gray-300">Download JDK 25 from <a href="https://adoptium.net" className="text-liquid-primary hover:underline" target="_blank" rel="noopener noreferrer">adoptium.net</a></p>
                <h3 className="text-xl font-semibold text-white mt-6">2. Install IntelliJ IDEA</h3>
                <p className="text-gray-300">Download the Community version (free) from <a href="https://jetbrains.com/idea" className="text-liquid-primary hover:underline" target="_blank" rel="noopener noreferrer">jetbrains.com/idea</a></p>
                <h3 className="text-xl font-semibold text-white mt-6">3. Verify installation</h3>
                <CodeBlock code="java --version\n# openjdk 25 ..." language="bash" />
            </div>
        )
    },
    'first-plugin': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Seu Primeiro Plugin</h2>
                <h3 className="text-xl font-semibold text-white mt-6">Estrutura de Pastas</h3>
                <CodeBlock code={`meu-mod/
├── build.gradle.kts
├── src/main/
│   ├── java/com/exemplo/
│   │   └── MeuPlugin.java
│   └── resources/
│       └── manifest.json`} language="text" />
                <h3 className="text-xl font-semibold text-white mt-6">Classe Principal</h3>
                <CodeBlock code={`public class MeuPlugin extends JavaPlugin {
    
    public MeuPlugin(JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        // Registrar comandos e eventos aqui
    }
}`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Your First Plugin</h2>
                <h3 className="text-xl font-semibold text-white mt-6">Folder Structure</h3>
                <CodeBlock code={`my-mod/
├── build.gradle.kts
├── src/main/
│   ├── java/com/example/
│   │   └── MyPlugin.java
│   └── resources/
│       └── manifest.json`} language="text" />
                <h3 className="text-xl font-semibold text-white mt-6">Main Class</h3>
                <CodeBlock code={`public class MyPlugin extends JavaPlugin {
    
    public MyPlugin(JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        // Register commands and events here
    }
}`} language="java" />
            </div>
        )
    },
    'hytale-server': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">HytaleServer</h2>
                <p className="text-gray-300">Classe central (Singleton) para gerenciamento do servidor.</p>
                <CodeBlock code={`HytaleServer server = HytaleServer.get();

EventBus eventBus = server.getEventBus();
PluginManager pluginManager = server.getPluginManager();
CommandManager commandManager = server.getCommandManager();

// Desligar servidor
server.shutdownServer(ShutdownReason.OPERATOR_REQUEST);`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">HytaleServer</h2>
                <p className="text-gray-300">Central singleton class for server management.</p>
                <CodeBlock code={`HytaleServer server = HytaleServer.get();

EventBus eventBus = server.getEventBus();
PluginManager pluginManager = server.getPluginManager();
CommandManager commandManager = server.getCommandManager();

// Shutdown server
server.shutdownServer(ShutdownReason.OPERATOR_REQUEST);`} language="java" />
            </div>
        )
    },
    'event-bus': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">EventBus</h2>
                <p className="text-gray-300">Centro do sistema de eventos. Registra e despacha eventos.</p>
                <CodeBlock code={`EventBus eventBus = HytaleServer.get().getEventBus();

// Registrar listener
eventBus.register(PlayerReadyEvent.class, event -> {
    Player player = event.getPlayer();
    player.sendMessage(Message.raw("Bem-vindo!"));
});`} language="java" />
                <h3 className="text-xl font-semibold text-white mt-6">Eventos Importantes</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li><code className="text-liquid-primary">BootEvent</code> - Servidor iniciou</li>
                    <li><code className="text-liquid-primary">ShutdownEvent</code> - Servidor desligando</li>
                    <li><code className="text-liquid-primary">PlayerReadyEvent</code> - Jogador pronto</li>
                    <li><code className="text-liquid-primary">PlayerChatEvent</code> - Chat (Async!)</li>
                </ul>
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">EventBus</h2>
                <p className="text-gray-300">Event system center. Registers and dispatches events.</p>
                <CodeBlock code={`EventBus eventBus = HytaleServer.get().getEventBus();

// Register listener
eventBus.register(PlayerReadyEvent.class, event -> {
    Player player = event.getPlayer();
    player.sendMessage(Message.raw("Welcome!"));
});`} language="java" />
                <h3 className="text-xl font-semibold text-white mt-6">Important Events</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li><code className="text-liquid-primary">BootEvent</code> - Server started</li>
                    <li><code className="text-liquid-primary">ShutdownEvent</code> - Server shutting down</li>
                    <li><code className="text-liquid-primary">PlayerReadyEvent</code> - Player ready</li>
                    <li><code className="text-liquid-primary">PlayerChatEvent</code> - Chat (Async!)</li>
                </ul>
            </div>
        )
    },
    'command-manager': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">CommandManager</h2>
                <p className="text-gray-300">Gerencia registro e execução de comandos.</p>
                <CodeBlock code={`CommandManager cmdManager = HytaleServer.get().getCommandManager();

// Registrar comando
cmdManager.register(new MyCommand());

// Executar comando programaticamente
cmdManager.handleCommand(sender, "/mycommand arg1");`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">CommandManager</h2>
                <p className="text-gray-300">Manages command registration and execution.</p>
                <CodeBlock code={`CommandManager cmdManager = HytaleServer.get().getCommandManager();

// Register command
cmdManager.register(new MyCommand());

// Execute command programmatically
cmdManager.handleCommand(sender, "/mycommand arg1");`} language="java" />
            </div>
        )
    },
    'plugin-manager': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">PluginManager</h2>
                <p className="text-gray-300">Gerencia ciclo de vida dos plugins.</p>
                <CodeBlock code={`PluginManager pluginManager = HytaleServer.get().getPluginManager();

// Listar plugins ativos
List<PluginBase> plugins = pluginManager.getPlugins();

// Obter plugin específico
PluginBase myPlugin = pluginManager.getPlugin(pluginIdentifier);`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">PluginManager</h2>
                <p className="text-gray-300">Manages plugin lifecycle.</p>
                <CodeBlock code={`PluginManager pluginManager = HytaleServer.get().getPluginManager();

// List active plugins
List<PluginBase> plugins = pluginManager.getPlugins();

// Get specific plugin
PluginBase myPlugin = pluginManager.getPlugin(pluginIdentifier);`} language="java" />
            </div>
        )
    },
    'crafting-plugin': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">CraftingPlugin</h2>
                <p className="text-gray-300">Sistema de crafting, receitas e bancadas.</p>
                <CodeBlock code={`CraftingPlugin crafting = CraftingPlugin.get();

// Receitas para uma bancada
List<CraftingRecipe> recipes = CraftingPlugin.getBenchRecipes(bench);

// Ensinar receita ao jogador
CraftingPlugin.learnRecipe(playerRef, "iron_sword", accessor);

// Esquecer receita
CraftingPlugin.forgetRecipe(playerRef, "iron_sword", accessor);`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">CraftingPlugin</h2>
                <p className="text-gray-300">Crafting system, recipes and workbenches.</p>
                <CodeBlock code={`CraftingPlugin crafting = CraftingPlugin.get();

// Recipes for a bench
List<CraftingRecipe> recipes = CraftingPlugin.getBenchRecipes(bench);

// Teach recipe to player
CraftingPlugin.learnRecipe(playerRef, "iron_sword", accessor);

// Forget recipe
CraftingPlugin.forgetRecipe(playerRef, "iron_sword", accessor);`} language="java" />
            </div>
        )
    },
    'npc-plugin': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">NPCPlugin</h2>
                <p className="text-gray-300">Spawnar e gerenciar NPCs com AI.</p>
                <CodeBlock code={`NPCPlugin npc = NPCPlugin.get();

// Spawnar NPC
Pair<Ref<EntityStore>, INonPlayerCharacter> result = npc.spawnNPC(
    store,
    "kweebec_guard",   // tipo/role
    "kweebec",         // grupo
    new Vector3d(x, y, z),
    new Vector3f(0, yaw, 0)
);

// Verificar se role existe
boolean exists = npc.hasRoleName("skeleton_archer");`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">NPCPlugin</h2>
                <p className="text-gray-300">Spawn and manage NPCs with AI.</p>
                <CodeBlock code={`NPCPlugin npc = NPCPlugin.get();

// Spawn NPC
Pair<Ref<EntityStore>, INonPlayerCharacter> result = npc.spawnNPC(
    store,
    "kweebec_guard",   // type/role
    "kweebec",         // group
    new Vector3d(x, y, z),
    new Vector3f(0, yaw, 0)
);

// Check if role exists
boolean exists = npc.hasRoleName("skeleton_archer");`} language="java" />
            </div>
        )
    },
    'objective-plugin': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">ObjectivePlugin</h2>
                <p className="text-gray-300">Sistema de quests e objetivos.</p>
                <CodeBlock code={`ObjectivePlugin objectives = ObjectivePlugin.get();

// Iniciar objetivo para jogadores
Objective obj = objectives.startObjective(
    "collect_wood",
    Set.of(playerUUID),
    worldUUID,
    markerUUID,
    store
);

// Marcar como completo
objectives.objectiveCompleted(objective, store);`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">ObjectivePlugin</h2>
                <p className="text-gray-300">Quest and objectives system.</p>
                <CodeBlock code={`ObjectivePlugin objectives = ObjectivePlugin.get();

// Start objective for players
Objective obj = objectives.startObjective(
    "collect_wood",
    Set.of(playerUUID),
    worldUUID,
    markerUUID,
    store
);

// Mark as complete
objectives.objectiveCompleted(objective, store);`} language="java" />
            </div>
        )
    },
    'reputation-plugin': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">ReputationPlugin</h2>
                <p className="text-gray-300">Sistema de reputação e facções.</p>
                <CodeBlock code={`ReputationPlugin reputation = ReputationPlugin.get();

// Alterar reputação
int newValue = reputation.changeReputation(
    player, "kweebec_tribe", +50, accessor
);

// Obter atitude (Friendly, Hostile, Neutral)
Attitude attitude = reputation.getAttitude(store, playerRef, npcRef);`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">ReputationPlugin</h2>
                <p className="text-gray-300">Reputation and faction system.</p>
                <CodeBlock code={`ReputationPlugin reputation = ReputationPlugin.get();

// Change reputation
int newValue = reputation.changeReputation(
    player, "kweebec_tribe", +50, accessor
);

// Get attitude (Friendly, Hostile, Neutral)
Attitude attitude = reputation.getAttitude(store, playerRef, npcRef);`} language="java" />
            </div>
        )
    },
    'commands': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Comandos</h2>
                <h3 className="text-xl font-semibold text-white mt-6">CommandBase (Simples)</h3>
                <CodeBlock code={`public class HelloCommand extends CommandBase {
    
    public HelloCommand() {
        super("hello", "Diz olá no chat");
        setPermissionGroup(GameMode.Adventure);
    }

    @Override
    protected void executeSync(CommandContext ctx) {
        ctx.sendMessage(Message.raw("Olá!"));
    }
}`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Commands</h2>
                <h3 className="text-xl font-semibold text-white mt-6">CommandBase (Simple)</h3>
                <CodeBlock code={`public class HelloCommand extends CommandBase {
    
    public HelloCommand() {
        super("hello", "Says hello in chat");
        setPermissionGroup(GameMode.Adventure);
    }

    @Override
    protected void executeSync(CommandContext ctx) {
        ctx.sendMessage(Message.raw("Hello!"));
    }
}`} language="java" />
            </div>
        )
    },
    'events': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Eventos</h2>
                <h3 className="text-xl font-semibold text-white mt-6">Tipos de Eventos</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li><strong>Sync (IEvent)</strong> - Thread principal, pode modificar mundo</li>
                    <li><strong>Async (IAsyncEvent)</strong> - Thread separada, NÃO modificar mundo!</li>
                    <li><strong>ECS (EcsEvent)</strong> - Via CommandBuffer</li>
                </ul>
                <CodeBlock code={`// No método setup() do plugin
getEventRegistry().registerGlobal(
    PlayerReadyEvent.class, 
    this::onPlayerReady
);`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Events</h2>
                <h3 className="text-xl font-semibold text-white mt-6">Event Types</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li><strong>Sync (IEvent)</strong> - Main thread, can modify world</li>
                    <li><strong>Async (IAsyncEvent)</strong> - Separate thread, DO NOT modify world!</li>
                    <li><strong>ECS (EcsEvent)</strong> - Via CommandBuffer</li>
                </ul>
                <CodeBlock code={`// In plugin's setup() method
getEventRegistry().registerGlobal(
    PlayerReadyEvent.class, 
    this::onPlayerReady
);`} language="java" />
            </div>
        )
    },
    'ecs': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">ECS (Entity Component System)</h2>
                <p className="text-gray-300">O Hytale usa ECS para gerenciar entidades.</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 mt-4">
                    <li><strong>Store</strong> - Repositório central de dados</li>
                    <li><strong>Ref</strong> - Ponteiro leve para entidade</li>
                    <li><strong>Component</strong> - Container de dados</li>
                </ul>
                <CodeBlock code={`// Obter componente de uma entidade
TransformComponent transform = store.getComponent(
    entityRef, 
    TransformComponent.getComponentType()
);

Vector3d pos = transform.getPosition();`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">ECS (Entity Component System)</h2>
                <p className="text-gray-300">Hytale uses ECS to manage entities.</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 mt-4">
                    <li><strong>Store</strong> - Central data repository</li>
                    <li><strong>Ref</strong> - Lightweight entity pointer</li>
                    <li><strong>Component</strong> - Data container</li>
                </ul>
                <CodeBlock code={`// Get component from an entity
TransformComponent transform = store.getComponent(
    entityRef, 
    TransformComponent.getComponentType()
);

Vector3d pos = transform.getPosition();`} language="java" />
            </div>
        )
    },
    'blocks': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Blocos</h2>
                <p className="text-gray-300">Blocos são definidos por arquivos JSON.</p>
                <CodeBlock code={`// resources/Hytale/Blocks/crystal_ore.json
{
  "Id": "crystal_ore",
  "DisplayName": "Minério de Cristal",
  "BlockType": "Solid",
  "Hardness": 3.0,
  "PreferredTool": "Pickaxe",
  "MinToolLevel": 2
}`} language="json" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Blocks</h2>
                <p className="text-gray-300">Blocks are defined by JSON files.</p>
                <CodeBlock code={`// resources/Hytale/Blocks/crystal_ore.json
{
  "Id": "crystal_ore",
  "DisplayName": "Crystal Ore",
  "BlockType": "Solid",
  "Hardness": 3.0,
  "PreferredTool": "Pickaxe",
  "MinToolLevel": 2
}`} language="json" />
            </div>
        )
    },
    'items': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Itens</h2>
                <p className="text-gray-300">Itens ficam no inventário e são sprites 2D.</p>
                <CodeBlock code={`// resources/Hytale/Items/crystal_ingot.json
{
  "Id": "crystal_ingot",
  "DisplayName": "Lingote de Cristal",
  "ItemType": "Resource",
  "MaxStackSize": 64,
  "Rarity": "Rare"
}`} language="json" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Items</h2>
                <p className="text-gray-300">Items are in inventory and are 2D sprites.</p>
                <CodeBlock code={`// resources/Hytale/Items/crystal_ingot.json
{
  "Id": "crystal_ingot",
  "DisplayName": "Crystal Ingot",
  "ItemType": "Resource",
  "MaxStackSize": 64,
  "Rarity": "Rare"
}`} language="json" />
            </div>
        )
    },
    'textures': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Texturas</h2>
                <p className="text-gray-300">Texturas são imagens PNG 16x16 pixels.</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 mt-4">
                    <li><strong>Blocos:</strong> resources/Hytale/Textures/Blocks/</li>
                    <li><strong>Itens:</strong> resources/Hytale/Textures/Items/</li>
                </ul>
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 mt-4">
                    <p className="text-gray-300">
                        <strong>Dica:</strong> Use o <a href="https://blockbench.net" className="text-liquid-primary hover:underline" target="_blank" rel="noopener noreferrer">Blockbench</a> para criar modelos e texturas!
                    </p>
                </div>
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Textures</h2>
                <p className="text-gray-300">Textures are 16x16 pixel PNG images.</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 mt-4">
                    <li><strong>Blocks:</strong> resources/Hytale/Textures/Blocks/</li>
                    <li><strong>Items:</strong> resources/Hytale/Textures/Items/</li>
                </ul>
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30 mt-4">
                    <p className="text-gray-300">
                        <strong>Tip:</strong> Use <a href="https://blockbench.net" className="text-liquid-primary hover:underline" target="_blank" rel="noopener noreferrer">Blockbench</a> to create models and textures!
                    </p>
                </div>
            </div>
        )
    },
    'gradle-setup': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Gradle Setup</h2>
                <h3 className="text-xl font-semibold text-white mt-6">build.gradle.kts</h3>
                <CodeBlock code={`plugins {
    id("hytale-mod") version "0.+"
}

group = "com.exemplo"
version = "1.0.0"

hytale {
    // Configurações do Hytale
}`} language="kotlin" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Gradle Setup</h2>
                <h3 className="text-xl font-semibold text-white mt-6">build.gradle.kts</h3>
                <CodeBlock code={`plugins {
    id("hytale-mod") version "0.+"
}

group = "com.example"
version = "1.0.0"

hytale {
    // Hytale configurations
}`} language="kotlin" />
            </div>
        )
    },
    'manifest': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">manifest.json</h2>
                <p className="text-gray-300">Arquivo que identifica seu mod para o servidor.</p>
                <CodeBlock code={`{
  "Group": "com.exemplo",
  "Name": "MeuMod",
  "Version": "1.0.0",
  "Description": "Meu primeiro mod!",
  "Authors": [{ "Name": "SeuNome" }],
  "Main": "com.exemplo.MeuPlugin"
}`} language="json" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">manifest.json</h2>
                <p className="text-gray-300">File that identifies your mod to the server.</p>
                <CodeBlock code={`{
  "Group": "com.example",
  "Name": "MyMod",
  "Version": "1.0.0",
  "Description": "My first mod!",
  "Authors": [{ "Name": "YourName" }],
  "Main": "com.example.MyPlugin"
}`} language="json" />
            </div>
        )
    },
    'plugin-base': {
        pt: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Plugin Base</h2>
                <p className="text-gray-300">Template completo para um plugin Hytale.</p>
                <CodeBlock code={`package com.exemplo;

import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.event.events.player.*;
import com.hypixel.hytale.server.core.plugin.*;

public class MeuPlugin extends JavaPlugin {

    public MeuPlugin(JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        // Registrar comando
        getCommandRegistry().registerCommand(new MeuComando());
        
        // Registrar evento
        getEventRegistry().registerGlobal(
            PlayerReadyEvent.class, 
            event -> {
                event.getPlayer().sendMessage(
                    Message.raw("Bem-vindo!")
                );
            }
        );
    }
}`} language="java" />
            </div>
        ),
        en: (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Plugin Base</h2>
                <p className="text-gray-300">Complete template for a Hytale plugin.</p>
                <CodeBlock code={`package com.example;

import com.hypixel.hytale.server.core.Message;
import com.hypixel.hytale.server.core.event.events.player.*;
import com.hypixel.hytale.server.core.plugin.*;

public class MyPlugin extends JavaPlugin {

    public MyPlugin(JavaPluginInit init) {
        super(init);
    }

    @Override
    protected void setup() {
        // Register command
        getCommandRegistry().registerCommand(new MyCommand());
        
        // Register event
        getEventRegistry().registerGlobal(
            PlayerReadyEvent.class, 
            event -> {
                event.getPlayer().sendMessage(
                    Message.raw("Welcome!")
                );
            }
        );
    }
}`} language="java" />
            </div>
        )
    }
};

// Sidebar component
const DocsSidebar = ({
    sections,
    activeSection,
    setActiveSection,
    expandedSections,
    toggleSection,
    language
}: {
    sections: DocSection[];
    activeSection: string;
    setActiveSection: (id: string) => void;
    expandedSections: Set<string>;
    toggleSection: (id: string) => void;
    language: string;
}) => (
    <nav className="w-64 flex-shrink-0 h-full overflow-y-auto pr-4 border-r border-white/10">
        <div className="space-y-1">
            {sections.map((section) => (
                <div key={section.id}>
                    <button
                        onClick={() => toggleSection(section.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all
                            ${expandedSections.has(section.id) ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        {section.icon}
                        <span className="flex-1 text-sm font-medium">
                            {language === 'en' ? section.titleEn : section.titlePt}
                        </span>
                        {section.subsections && (
                            expandedSections.has(section.id)
                                ? <ChevronDown size={16} />
                                : <ChevronRight size={16} />
                        )}
                    </button>
                    <AnimatePresence>
                        {expandedSections.has(section.id) && section.subsections && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="ml-6 mt-1 space-y-1 border-l border-white/10 pl-3">
                                    {section.subsections.map((sub) => (
                                        <button
                                            key={sub.id}
                                            onClick={() => setActiveSection(sub.id)}
                                            className={`w-full text-left px-3 py-1.5 rounded text-sm transition-all
                                                ${activeSection === sub.id
                                                    ? 'text-liquid-primary bg-liquid-primary/10'
                                                    : 'text-gray-400 hover:text-white'}`}
                                        >
                                            {language === 'en' ? sub.titleEn : sub.titlePt}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>

        {/* External link */}
        <div className="mt-8 pt-4 border-t border-white/10">
            <a
                href="https://hytalemodding.dev/en/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-liquid-primary transition-colors"
            >
                <ExternalLink size={14} />
                {language === 'en' ? 'Official Docs' : 'Docs Oficiais'}
            </a>
        </div>
    </nav>
);

// Main Knowledge Base component
export const KnowledgeBase = () => {
    const { language } = useLangStore();
    const [activeSection, setActiveSection] = useState('what-is-mod');
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['getting-started']));

    const toggleSection = (id: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedSections(newExpanded);
    };

    const content = docContent[activeSection];

    return (
        <div className="flex h-[calc(100vh-200px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Sidebar */}
            <DocsSidebar
                sections={docSections}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                language={language}
            />

            {/* Content */}
            <main className="flex-1 overflow-y-auto pl-8">
                <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {content ? (
                                language === 'en' ? content.en : content.pt
                            ) : (
                                <div className="text-gray-400">
                                    {language === 'en' ? 'Content not available' : 'Conteúdo não disponível'}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
