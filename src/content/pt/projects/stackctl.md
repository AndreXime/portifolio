---
order: 98
title: "Operação de stacks Docker no terminal: TUI local com git e Compose"
shortDescription: "Eu construí um painel no terminal para operar vários repositórios locais: git pull, Docker Compose, status de containers e logs, sem HTTP nem autenticação. A UI é React com Ink e o backend chama git e docker no host, com path seguro sob PROJECTS_ROOT e fallback quando o Compose falha. O build gera um binário único (~1,8 MB) instalável via npm link."
tech: ["Ink", "React", "TypeScript", "Docker Compose", "Git", "esbuild"]
imageUrl: "../../images/projects/stackctl.png"
github: "https://github.com/AndreXime/stackctl"
---

## Contexto técnico

Escolhi um CLI puro em vez de um painel web: o processo roda onde estão os projetos, fala com `git` e `docker` no host e não abre porta nem autenticação. A interface é React com Ink (context switch em tela cheia entre lista, dashboard e logs); a lógica de domínio fica em módulos que resolvem o path do projeto, leem Compose, agem nos serviços e classificam o sync do Git. Bundle com esbuild em um único `cli.js` com shebang, para instalar com `npm link` sem depender de um servidor de assets.

## Desafios de engenharia (como e por quê)

- **Path sob PROJECTS_ROOT:** resolvo o diretório do projeto e rejeito qualquer path fora da raiz configurada antes de executar git ou Compose, para evitar traversal por nome de pasta.
- **Inventário Compose resiliente:** descubro `compose.yaml`/`yml` e `docker-compose.*`, passo `--env-file .env` quando existe, e se `compose ps` quebra (env incompleto, por exemplo) caio em `docker ps` filtrado pelo label do projeto Compose.
- **Serviços vs containers reais:** listo serviços do Compose (ou parse do YAML) e fundo com o estado do Docker; serviço sem container aparece como "não criado", e start/stop/restart só aceitam nomes que existem na lista.
- **Git com status de sync:** faço `fetch`, leio porcelain e comparo `@{upstream}...HEAD` para marcar atualizado, desatualizado, divergente ou sem upstream, em paralelo com a leitura dos containers.
- **Ações destrutivas com confirmação:** pull, up/down, start/stop/restart e limpeza de volumes passam por Y/n; limpar volumes para o serviço, apaga named volumes e binds e só então reporta o resultado.
- **Detalhes de container sem corrida:** ao focar um serviço, inspeciono portas, volumes (com tamanho) e imagem com um id de requisição, descartando respostas atrasadas se o usuário já mudou de seleção.

## Limite conhecido

Os logs são um snapshot das últimas 100 linhas do container, não um stream ao vivo no terminal.