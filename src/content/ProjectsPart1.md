title: ConectaQR
folderName: conectaqr
imagesAmount: 3
linkGithub: https://github.com/AndreXime/ConnectQR
linkOnline: https://conectaqr.tech
shortDescription:
Eu desenvolvi o ConectaQR, uma plataforma web completa para ajudar pequenas e médias empresas a marcarem sua presença no mundo digital. O sistema permite que cada negócio crie sua própria página personalizada para exibir produtos, compartilhar informações de contato como WhatsApp e Instagram, e até mesmo integrar a localização do Google Maps. Uma das funcionalidades centrais é a geração de um QR Code exclusivo para cada loja, facilitando o acesso dos clientes ao catálogo de produtos diretamente de seus celulares no ambiente físico da loja, unindo o físico e o digital de forma simples e eficiente.

description:

Eu criei o ConectaQR para ser uma solução completa e acessível para comerciantes que desejam expandir sua presença para o ambiente online sem a complexidade de um e-commerce tradicional. A ideia é oferecer uma vitrine digital onde cada empresa pode ter sua própria página, totalmente personalizada com sua identidade visual.

### Principais Funcionalidades

-   **Página Exclusiva e Personalizável**: Cada empresa cadastrada tem um espaço único, com a possibilidade de alterar o layout e as cores para refletir a identidade da marca.
-   **Catálogo de Produtos**: Através de um painel administrativo intuitivo, é possível adicionar, editar e remover produtos, organizando-os em categorias para facilitar a navegação dos clientes.
-   **Geração de QR Code**: A plataforma gera automaticamente um QR Code que, ao ser escaneado, direciona os clientes para a página da loja, permitindo que consultem o catálogo e os preços de forma rápida e prática.
-   **Integração com Redes Sociais e Contato**: A página da empresa centraliza as informações de contato, com links diretos para WhatsApp, Instagram e a localização no Google Maps.

### Detalhes Técnicos

-   **Frontend**: Desenvolvido com **Next.js** e **TypeScript**, garantindo uma experiência de usuário moderna e performática. Para a estilização, utilizei **TailwindCSS** em conjunto com a biblioteca de componentes **DaisyUI**.
-   **Backend**: Construí um servidor robusto com **Express.js** e **TypeScript**, que se comunica com um banco de dados **PostgreSQL** através do ORM **Prisma**.
-   **Autenticação**: A segurança das contas é garantida por um sistema de autenticação via **JWT**, que gerencia as sessões dos usuários.
-   **Upload de Imagens**: Para o upload de imagens dos produtos, utilizei a biblioteca **Sharp**, que permite o redimensionamento e otimização das imagens, salvando-as no formato `.webp` para melhor performance.
-   **DevOps**: O projeto é totalmente containerizado com **Docker**, e o processo de integração e entrega contínua (CI/CD) é automatizado com **GitHub Actions**, que rodam testes automatizados e fazem o deploy da aplicação.

---

title: Restaurante Tech
folderName: restaurante
imagesAmount: 5
linkGithub: https://github.com/AndreXime/restaurante
linkOnline: https://restaurante.andreximenes.xyz/
shortDescription:
Eu desenvolvi um sistema de Ponto de Venda (PDV) completo para restaurantes, o "Restaurante Tech". A principal característica é sua arquitetura totalmente client-side, que utiliza IndexedDB para o armazenamento local de dados, garantindo que o sistema funcione de forma 100% offline e seja ágil em qualquer dispositivo. Implementei módulos essenciais que cobrem todo o fluxo de um restaurante, incluindo a gestão do cardápio, o controle de mesas, um painel para a cozinha, o gerenciamento de entregas e um sistema de contabilidade para o fechamento de caixa.

description:

Eu criei o "Restaurante Tech", um sistema de Ponto de Venda (PDV) para restaurantes com uma arquitetura inovadora, totalmente client-side. O projeto foi pensado para oferecer uma solução robusta e que funciona de forma 100% offline, utilizando o IndexedDB do navegador para armazenar todos os dados localmente. Isso garante que o sistema seja extremamente rápido e confiável, independentemente da qualidade da conexão com a internet.

### Principais Módulos e Funcionalidades

-   **Gestão de Cardápio**: Permite o cadastro completo de produtos, com imagens, preços, e organização por categorias.
-   **Controle de Mesas**: Oferece uma visão geral do salão, com o status de cada mesa (livre, ocupada). É possível abrir uma nova conta para uma mesa, adicionar pedidos e acompanhar o consumo.
-   **Painel da Cozinha**: Um painel em tempo real para a cozinha, onde os pedidos são recebidos e podem ser marcados como "prontos" para o garçom ser notificado.
-   **Gestão de Entregas e Retiradas**: Módulo dedicado para o gerenciamento de pedidos de delivery e para retirada no local, com acompanhamento do status de cada pedido.
-   **Contabilidade**: Um painel para o fechamento de caixa, com o resumo das vendas, transações e um relatório de desempenho do restaurante.

### Detalhes Técnicos

-   **Arquitetura Client-Side**: O sistema roda inteiramente no navegador, sem a necessidade de um servidor backend para as operações do dia a dia.
-   **Armazenamento Offline**: Utilização do **IndexedDB** para persistir todos os dados localmente no navegador, garantindo o funcionamento contínuo mesmo sem conexão com a internet.
-   **Tecnologias**: O projeto foi desenvolvido com **React** e **TypeScript**, utilizando **Zustand** para o gerenciamento de estado. A interface é reativa e atualiza em tempo real conforme os dados são alterados nos diferentes módulos do sistema.
-   **Modo Demo**: O sistema conta com um modo de demonstração, que permite testar todas as funcionalidades com dados fictícios, sem interferir nos dados reais do restaurante.

---

title: Organizador de Disciplinas
folderName: disciplinas
imagesAmount: 3
linkGithub: https://github.com/AndreXime/organiza-cc-uva
linkOnline: https://disciplina-uva.andreximenes.xyz/
shortDescription:
Para resolver um problema comum entre os alunos de Ciência da Computação na minha faculdade, criei um site que facilita o planejamento de cada semestre. A ferramenta substitui o uso de planilhas manuais, permitindo que o estudante marque as disciplinas que já concluiu. Com base nisso, o sistema calcula automaticamente quais são as próximas matérias disponíveis, respeitando a cadeia de pré-requisitos do curso. Além disso, a aplicação monta uma grade de horários visual em um calendário semanal, ajudando o aluno a organizar sua rotina e evitar conflitos. Todo o progresso é salvo diretamente no navegador para maior praticidade.

description:

Eu desenvolvi essa ferramenta para auxiliar os estudantes de Ciência da Computação da Universidade Estadual do Vale do Acaraú (UVA) a planejarem seus semestres de forma mais eficiente. A ideia surgiu da minha própria experiência e da de colegas, que sempre recorriam a planilhas para organizar as disciplinas a serem cursadas, o que era um processo manual e suscetível a erros.

### Principais Funcionalidades

-   **Visualização da Grade Curricular**: Apresento todas as disciplinas do curso, organizadas por período, facilitando a visualização da estrutura curricular.
-   **Controle de Disciplinas Cursadas**: O aluno pode marcar as disciplinas que já concluiu. O sistema salva essa informação localmente no navegador, mantendo o progresso entre as sessões.
-   **Cálculo de Pré-requisitos**: Com base nas disciplinas marcadas como concluídas, a aplicação determina e exibe automaticamente quais as próximas que estão disponíveis para serem cursadas.
-   **Organizador de Horários**: A ferramenta gera uma grade de horários em um calendário semanal com as disciplinas disponíveis, permitindo que o aluno visualize os horários de cada uma e evite conflitos ao montar sua grade para o semestre.
-   **Exportação de Horários**: É possível salvar a grade de horários gerada como uma imagem, facilitando o compartilhamento e a consulta.

### Detalhes Técnicos

-   **Frontend**: O projeto foi construído com **Next.js** e **TypeScript**, utilizando **TailwindCSS** para a estilização.
-   **Gerenciamento de Estado**: Utilizei a Context API do **React** para gerenciar o estado da aplicação, como as disciplinas selecionadas e as configurações de visualização.
-   **Dados das Disciplinas**: As informações sobre as disciplinas, como pré-requisitos e horários, são carregadas a partir de um arquivo **CSV**, o que facilita a atualização dos dados.
-   **Visualização de Horários**: A grade de horários foi implementada com a biblioteca **React Big Calendar**, que permite a exibição dos eventos em um calendário interativo.
