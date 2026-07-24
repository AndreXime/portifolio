---
order: 4
title: "Planejamento acadêmico da UVA: progresso, grade e conflitos no navegador"
shortDescription: "Eu construí um organizador acadêmico para Ciência da Computação na UVA: progresso, fluxograma, grade semanal e planejador sem depender de planilhas. A SPA em React e Vite embute a grade via CSV validado no build e persiste múltiplos perfis no navegador com Zustand. Roda só no cliente; atualizar a grade oficial exige rebuild."
tech: ["React", "Vite", "Zustand", "TypeScript", "Tailwind CSS", "React Flow"]
imageUrl: "../../../content/images/projects/disciplina-uva.png"
link: "https://disciplina-uva.andreximenes.xyz/"
github: "https://github.com/AndreXime/organiza-cc-uva"
---

## Contexto técnico

Modelei uma SPA feature-based: cada área (gerenciador, fluxograma, horários, planejador, eventos, configurações) concentra tela e store, com Zustand no estado global e persistência no `localStorage`. Escolhi Vite e React para entregar tudo no cliente, sem backend: a grade oficial entra no bundle por um módulo virtual gerado no build a partir dos CSVs e do calendário tipado. O trade-off é óbvio e consciente: zero servidor e zero sync entre dispositivos, em troca de deploy estático simples e uso offline depois do primeiro carregamento. No pós-build, um prerender injeta o HTML inicial do `App` no `dist` fora do pipeline do Rollup do cliente, para não misturar o bundle de SSR com o JS do browser.

## Desafios de engenharia (como e por quê)

- **Grade como contrato de build:** valido cada linha de disciplinas e equivalentes no parse (ids, carga, tokens de horário dia+bloco) e falho o `npm run build` se o CSV estiver inconsistente. Assim o site nunca sobe com pré-requisito quebrado ou horário ilegível; HMR reage a mudanças nos arquivos de dados.
- **Disponibilidade por grafo de pré-requisitos:** recalculo o conjunto de disciplinas liberadas a partir do que está marcado como feito e bloqueio desmarcar um nó se outra disciplina já concluída depende dele. Equivalências ligam pelo nome oficial da grade, então o progresso continua ancorado nos ids da matriz.
- **Conflitos de horário na semana e no plano:** na grade semanal, eventos de disciplinas disponíveis somem da vista quando cruzam o intervalo de alguma selecionada; no planejador, comparo pares de intervalos por dia e semestres futuros só liberam o que os semestres anteriores (mais o histórico feito) já cumprem.
- **Preenchimento automático do percurso:** gero semestres em sequência engolindo o máximo sem conflito de horário, respeitando pré-requisitos e um teto de optativas (até sete no total, descontando as já concluídas). Serve como ponto de partida editável, não como matrícula oficial.
- **Perfis com snapshot versionado:** cada perfil guarda progresso, planejamento, seleção de grade, filtros do calendário e preferências de UI num snapshot V1 validado; trocar de perfil salva o atual, aplica o alvo e um debounce nas stores (mais flush ao esconder a aba) evita corromper o catálogo. Export/import em JSON permite backup sem conta.
- **Fluxograma com rotas de aresta:** montei o grafo por período com React Flow e roteamento próprio (lanes locais vs canal entre linhas) para pré-requisitos longos não atravessarem cards; rascunhos de caminho ficam no `localStorage` até exportar.