---
experiences:
  - role: "Desenvolvedor Fullstack"
    company: "Stackup Software"
    period: "10/2025 - 02/2026"
    logo: "../images/logos/stackup.webp"
    summary: >-
      Atuei no ciclo de vida completo (SDLC) de um projeto de alta complexidade para o setor
      de seguros, com interface direta ao cliente no levantamento e refinamento de requisitos.
      Em ritmo acelerado de software house, traduzi regras de domínio do mercado segurador em
      arquitetura técnica e em código sustentável, cobrindo frontend e backend desde o estágio
      inicial até a orquestração do deploy, com foco em performance e manutenibilidade.
    highlights:
      - >-
        Projetei rotinas serverless com AWS Lambda acionadas por S3 Event Notifications para
        processar OCR e conversão de documentos DOCX para PDF, isolando essas operações do fluxo
        principal da API e reduzindo o consumo de CPU do servidor em mais de 50%.
      - >-
        Modelei bancos de dados relacionais no PostgreSQL com foco em integridade referencial,
        adotando colunas JSONB para suportar documentos de schema variável sem necessidade de
        migrations estruturais frequentes.
      - >-
        Eliminei o tráfego de arquivos binários pela API principal implementando pre-signed URLs
        no AWS S3, reduzindo o tamanho médio dos payloads em cerca de 70% e aliviando a carga no
        servidor de origem.
      - >-
        Escrevi e revisei manualmente migrations críticas via Prisma ORM, garantindo
        consistência e segurança dos dados em produção durante deploys de alta sensibilidade.
      - >-
        Construí um motor de geração de contratos dinâmicos com docxtemplater, injetando variáveis
        via JSON e automatizando a conversão para PDF reduzindo o tempo de emissão de documentos
        corporativos de minutos para segundos.
---
