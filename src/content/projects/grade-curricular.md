---
order: 1
title: "Gerenciador de Grade Curricular Inteligente"
shortDescription: "Construí um site para acompanhar a graduação em Ciência da Computação na UVA, com progresso em disciplinas e montagem de grade semanal com detecção de conflitos. O foco foi centralizar o planejamento do curso e eliminar checagens manuais de pré-requisitos e choques de horário. A base é uma SPA com estado global por domínio, persistência no navegador e pipeline de dados validado no build."
tech: ["TypeScript", "Vite", "React", "Zustand", "Local Storage", "Pre-rendering"]
imageUrl: "./images/disciplinas.webp"
link: "https://disciplina-uva.andreximenes.xyz/"
github: "https://github.com/AndreXime/organiza-cc-uva"
---

## Problema
O cenário exigia acompanhar evolução curricular, descobrir automaticamente quais disciplinas ficam liberadas por pré-requisitos e montar uma grade semanal sem colisões de horário. Na prática, isso costuma virar controle paralelo em planilhas e checagens manuais, o que aumenta erro e tempo gasto a cada semestre. Além disso, os dados oficiais mudam com o tempo e precisam de uma forma confiável de atualização sem quebrar o sistema. Eu também precisava manter o uso simples e offline-friendly, preservando as marcações do usuário entre sessões.

## Solução
Eu modelei o frontend como uma SPA modular, separando as áreas do produto por responsabilidade e concentrando o estado de domínio em stores independentes com uma camada de persistência.

Para os dados base (disciplinas, equivalências e eventos), eu implementei uma etapa de build que faz parsing e validação rigorosa, falhando o build quando encontra inconsistências para impedir regressões silenciosas. A lógica de disponibilidade de disciplinas foi derivada diretamente do grafo de pré-requisitos, com regras de integridade para evitar estados inválidos quando o usuário altera o progresso.

Para melhorar a experiência de carregamento e indexabilidade, eu gerei HTML estático no pós-build via renderização no servidor e injetei o markup no bundle final sem inflar o código entregue ao navegador.

## Impacto
Com essa arquitetura, eu reduzi o acoplamento entre telas e domínios, o que deixa a evolução de cada área mais previsível e fácil de testar. A persistência no navegador mantém o estado do usuário sem backend, enquanto o controle de integridade evita que o progresso fique incoerente. O pipeline de build torna a atualização dos dados um processo auditável e com falha explícita, aumentando a confiabilidade quando o currículo ou calendário mudam. A pré-renderização melhora o tempo de primeira pintura e entrega conteúdo inicial mesmo antes da hidratação completa do cliente, mantendo a aplicação leve no runtime.