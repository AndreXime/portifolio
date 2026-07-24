---
order: 99
title: "Gerenciador de apps Linux sob demanda: Flatpak, APT e fwupd num só app"
shortDescription: "Eu construí o Vekt, um gerenciador de apps sob demanda para Linux que unifica Flatpak, APT e firmware (fwupd) sem daemons em background. O núcleo é Tauri 2 com backend Rust e UI Preact: o frontend só chama comandos tipados, e processos longos emitem logs e progresso em tempo real. Fora do escopo: Snap, AppImage e serviços de sistema."
tech: ["Tauri", "Rust", "Preact", "TypeScript", "Flatpak", "APT", "fwupd"]
imageUrl: "../../../assets/projects/vekt.png"
github: "https://github.com/AndreXime/vekt"
---

## Contexto técnico

Modelei o Vekt como app desktop Linux sob demanda, no espírito do KDE Discover, mas sem serviços em background: Flatpak (catálogo Flathub via AppStream), APT (repositórios do sistema) e fwupd (firmware) só rodam enquanto a janela está aberta. Escolhi Tauri 2 para isolar o shell no backend Rust e deixar a UI em Preact/TypeScript com Vite, estado por módulos e roteamento próprio. O front só fala via `invoke` e escuta eventos de tarefa; o Rust valida argumentos, dispara `flatpak`, `apt-get`, `fwupdmgr` e elevação com PolicyKit, e mantém catálogos em memória com cache em disco.

## Desafios de engenharia (como e por quê)

- **Superfície de comando fechada:** o TypeScript nunca monta shell. IDs de app, pacote APT, remote e device fwupd passam por regex e limites de tamanho antes de virarem argv; capabilities do Tauri ficam no mínimo (core e eventos).
- **Fila de tarefas com stream:** um `TaskManager` faz spawn de processos longos, emite `task-log` e `task-progress`, guarda até 500 linhas de log e cancela com flag atômica mais `kill` do filho. Progresso vem do parse do stdout por tipo de tarefa.
- **Atualizar tudo em cadeia:** `update_everything` enfileira APT (`dist-upgrade` via `pkexec` numa chamada só), depois Flatpak e fwupd, esperando estado terminal com timeout. Se o lock do APT estiver ativo (`fuser` nos locks do dpkg/apt), pulo o APT com tarefa marcada e sigo Flatpak e firmware.
- **Catálogo AppStream local:** baixeo o XML do Flathub, descompacto, parseio, filtro e gravo em `~/.cache/vekt/` com TTL e versão de filtro. Busca e categorias rodam no backend com score por nome, id e summary, sem varrer o front.
- **APT ao lado do Flatpak:** inventário a partir dos `Packages` dos repos, cache próprio e busca pontuada; na Explore, pacotes APT entram depois dos apps Flatpak. Detalhes unificam metadados, permissões Flatpak, screenshots e reviews anônimas do ODRS quando há `app_id` compatível.