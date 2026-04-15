---
order: 3
title: "ERP Restaurante: Arquitetura Local-First"
shortDescription: "Construí um PDV para restaurantes totalmente client-side com módulos de cardápio, mesas, entregas, cozinha e caixa. O foco foi operar offline e manter dados localmente no navegador, sem depender de backend. A base segue uma arquitetura offline-first com IndexedDB e estado global para coordenar os módulos."
tech: ["TypeScript", "React", "IndexedDB", "Offline-first", "Client-side"]
imageUrl: "./images/restaurante.webp"
link: "https://restaurante.andreximenes.xyz/"
github: "https://github.com/AndreXime/restaurante"
---

# Problema
Eu precisava de um PDV que continuasse operando mesmo com internet instável e que não exigisse infraestrutura de servidor para funcionar. Em cenários pequenos e médios, a complexidade de autenticação, API, deploy e manutenção de banco costuma virar custo fixo desnecessário. Além disso, o fluxo de atendimento exige baixa latência e previsibilidade na UI para não travar a operação no balcão. O desafio foi manter consistência de dados entre módulos diferentes (mesas, cozinha, entregas e caixa) sem uma camada central de backend.

# Solução
Eu implementei um desenho offline-first onde a persistência fica no navegador via IndexedDB, isolando o acesso ao armazenamento em uma camada única para controlar conexões e migrações.

Para orquestrar a aplicação, usei um store global como fonte de verdade e acoplei a persistência automática do estado para garantir leitura inicial e gravação incremental por domínio de dados. A UI foi organizada por módulos com navegação por abas, mantendo cada fluxo com componentes e ações próprias, mas compartilhando o mesmo contrato de dados.

Também criei um modo de demonstração que injeta um dataset completo e desativa persistência, permitindo testar o sistema sem alterar o armazenamento local.

## Destaques
- Operação **offline** com persistência em **IndexedDB** e migrações controladas
- **Store global** como fonte de verdade para sincronizar mesas, cozinha, entregas e caixa
- Persistência por **fatias de domínio** para reduzir custo de escrita e acoplamento
- **Modo demo** com dataset completo sem tocar no armazenamento do usuário

# Impacto
Na prática, isso elimina dependências externas e reduz pontos de falha: a aplicação carrega e opera offline com latência previsível porque lê do armazenamento local. A separação entre estado global, persistência e módulos diminui acoplamento e facilita evoluir regras de negócio sem reescrever a base de armazenamento. A estratégia de salvar por “fatias” de domínio evita persistir dados desnecessários e ajuda a manter o custo de escrita controlado à medida que o volume cresce. O modo demo acelera validação e onboarding, porque permite simular operação completa e iterar em UX e regras sem risco para dados reais.
