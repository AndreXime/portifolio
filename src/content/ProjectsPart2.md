title: Loja Gin API
folderName: lojagin
imagesAmount: 2
linkGithub: https://github.com/AndreXime/lojagin-api
shortDescription:
Construí uma API RESTful completa para um sistema de e-commerce utilizando Go com o framework Gin. Possui um sistema de autenticação com tokens JWT, operações CRUD completas para gerenciamento de usuários, produtos e categorias, organizando o código de forma modular para facilitar a manutenção. Além disso, desenvolvi toda a funcionalidade de um carrinho de compras, permitindo adicionar, remover itens e finalizar a compra (checkout), utilizando GORM para a interação com o banco de dados. Para garantir a qualidade do sistema, criei uma suíte de testes end-to-end, implementei um sistema de migrations e seeding, e documentei todos os endpoints com Swagger.

description:
Eu desenvolvi esta API RESTful como o back-end para um sistema de e-commerce, utilizando Go e o framework Gin para criar uma base performática e escalável. O projeto foi estruturado de forma modular, separando as responsabilidades em diferentes pacotes (`users`, `products`, `categories`, `cart`), o que torna o código mais limpo e de fácil manutenção.

### Principais Funcionalidades

-   **Autenticação e Autorização**: Implementei um sistema de autenticação seguro utilizando JSON Web Tokens (JWT), com rotas para registro e login de usuários. A senha dos usuários é protegida com hash usando o algoritmo bcrypt.
-   **Gerenciamento Completo**: A API oferece operações CRUD (Create, Read, Update, Delete) para as principais entidades de um e-commerce:
    -   **Usuários**: Gerenciamento de contas de clientes.
    -   **Produtos**: Controle de catálogo, incluindo detalhes como nome, descrição e preço.
    -   **Categorias**: Organização dos produtos em diferentes categorias.
-   **Carrinho de Compras**: Desenvolvi toda a lógica para o carrinho de compras, permitindo que usuários autenticados possam adicionar produtos, visualizar os itens no carrinho, remover itens e finalizar a compra (checkout).

### Detalhes Técnicos

-   **Linguagem e Framework**: **Go** com o framework web **Gin**, escolhido pela sua alta performance e simplicidade.
-   **Banco de Dados e ORM**: Utilizei **GORM** como ORM para a interação com o banco de dados **PostgreSQL**, o que abstrai as queries SQL e facilita as operações de banco.
-   **Migrations e Seeding**: O sistema conta com um mecanismo de migrations para versionar o schema do banco de dados e um seeder para popular o banco com dados iniciais, facilitando o desenvolvimento e os testes.
-   **Testes End-to-End**: Para garantir a confiabilidade da API, criei uma suíte de testes e2e utilizando o próprio sistema de testes do Go, cobrindo os principais fluxos da aplicação, como autenticação, manipulação de produtos e o ciclo de vida do carrinho de compras.
-   **Documentação**: Todos os endpoints foram documentados utilizando **Swagger**, gerando uma especificação OpenAPI que facilita o entendimento e o consumo da API por outros desenvolvedores ou por um time de frontend.
-   **Containerização**: A aplicação é totalmente containerizada com **Docker**, e o `docker-compose.yml` permite orquestrar facilmente o serviço da API e o banco de dados.

---

title: API Mockup
folderName: apimockup
imagesAmount: 1
linkGithub: https://github.com/AndreXime/api-mockup
shortDescription:
Desenvolvi uma ferramenta desktop para agilizar e simplificar o desenvolvimento de aplicações frontend. Com esta ferramenta, permiti desenvolvedores criar e servir endpoints de API falsos de forma rápida, definindo o método HTTP, o caminho, a resposta JSON e até simulando rotas que exigem autenticação. Construí o projeto com Go e Wails no backend, e desenvolvi a interface com TypeScript e TailwindCSS que permite gerenciar um servidor HTTP local com apenas um clique.

description:
Eu criei o "API Mockup", uma ferramenta desktop para acelerar o desenvolvimento de aplicações frontend. A motivação para este projeto foi a necessidade de ter uma maneira rápida e visual de criar um servidor de API falso, sem depender de serviços online ou de configurar um backend completo apenas para testes.

### Principais Funcionalidades

-   **Criação Dinâmica de Endpoints**: A interface permite adicionar novas rotas de forma intuitiva, especificando o método HTTP (GET, POST, PUT, DELETE, etc.), o caminho do endpoint (ex: `/users`) e o corpo da resposta em formato JSON.
-   **Servidor Local Integrado**: Com um único botão, a ferramenta inicia ou para um servidor HTTP local que serve os endpoints configurados, tornando-os imediatamente disponíveis para consumo pela aplicação frontend em desenvolvimento.
-   **Simulação de Autenticação**: É possível definir quais rotas devem ser protegidas. A ferramenta permite configurar um token de autenticação (Bearer Token) que será exigido para acessar esses endpoints específicos, simulando um ambiente de produção real.
-   **Gerenciamento Visual**: Todas as rotas criadas são listadas na interface, onde podem ser editadas ou removidas a qualquer momento, proporcionando um controle completo sobre o ambiente de mock.

### Detalhes Técnicos

-   **Backend**: O coração da aplicação foi desenvolvido em **Go**, utilizando o framework **Wails** para criar uma aplicação desktop multiplataforma. O servidor HTTP que serve os endpoints foi construído com o framework **Gin**, conhecido por sua performance e simplicidade.
-   **Frontend**: A interface do usuário foi construída com **TypeScript** e estilizada com **TailwindCSS**, resultando em uma aplicação moderna e responsiva.
-   **Comunicação Backend-Frontend**: O Wails permite uma comunicação fluida entre o backend em Go e o frontend em TypeScript, possibilitando que a interface chame funções Go para iniciar o servidor, gerenciar as rotas e persistir os dados.

---

title: PixelPress
folderName: pixelpress
imagesAmount: 4
linkGithub: https://github.com/AndreXime/pixel-press
shortDescription:
Construí uma ferramenta de linha de comando (CLI) em Go para facilitar a edição de imagens em massa com uma interface interativa. Para evitar a necessidade de decorar comandos complexos do ffmpeg. A aplicação detecta automaticamente as imagens no diretório, permite selecionar múltiplos arquivos e oferece duas funções principais: conversão de formato e uma compressão inteligente, onde o usuário define um tamanho máximo (em MB) e a ferramenta ajusta a qualidade para atingir aquele objetivo.

description:
Eu criei o "Pixel Press", uma ferramenta de linha de comando (CLI) em Go para simplificar a edição de imagens em massa. A ideia surgiu da necessidade de realizar tarefas repetitivas, como converter e comprimir imagens, sem ter que lidar com a complexidade dos comandos do `ffmpeg`. Por isso, desenvolvi uma interface interativa que guia o usuário por todo o processo.

### Principais Funcionalidades

-   **Interface Interativa**: Construí a interface com a biblioteca `Bubble Tea`, o que proporciona uma experiência de usuário agradável e intuitiva diretamente no terminal.
-   **Seleção de Múltiplos Arquivos**: Ao iniciar, a ferramenta escaneia o diretório atual em busca de imagens e apresenta uma lista onde é possível selecionar múltiplos arquivos para processamento em lote.
-   **Conversão de Formato**: Ofereço a opção de converter as imagens selecionadas para diferentes formatos, como JPEG, PNG e WebP.
-   **Compressão Inteligente**: Uma das funcionalidades mais interessantes é a compressão com tamanho-alvo. O usuário pode definir um tamanho máximo em megabytes (MB), e a ferramenta ajusta a qualidade da imagem dinamicamente para que o arquivo final fique abaixo do tamanho especificado.
-   **Feedback em Tempo Real**: Durante o processamento, a aplicação exibe o progresso e o status de cada operação, mantendo o usuário informado sobre o que está acontecendo.

### Detalhes Técnicos

-   **Linguagem**: O projeto foi inteiramente desenvolvido em **Go**, aproveitando sua performance e a facilidade para criar aplicações de linha de comando.
-   **Interface**: Utilizei o framework **Bubble Tea**, que segue a arquitetura The Elm Architecture (TEA), para criar a interface interativa no terminal.
-   **Processamento de Imagem**: A manipulação das imagens é feita através de chamadas ao **ffmpeg**, que é uma dependência externa do projeto. O código em Go constrói e executa os comandos do ffmpeg de forma dinâmica com base nas escolhas do usuário.
-   **Estrutura do Projeto**: Organizei o código de forma clara, separando a lógica do modelo de dados (`model.go`), da interface (`view.go`), e da atualização de estado (`update.go`), o que é um padrão comum em aplicações que seguem a arquitetura TEA.
