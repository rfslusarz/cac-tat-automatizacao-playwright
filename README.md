[![Playwright Tests](https://github.com/rfslusarz/cac-tat-automatizacao-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/rfslusarz/cac-tat-automatizacao-playwright/actions/workflows/playwright.yml)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)](https://playwright.dev/)
[![Node.js LTS](https://img.shields.io/badge/Node.js-LTS-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-2088FF?logo=githubactions&logoColor=white)](https://github.com/features/actions)
# CAC TAT – Automação E2E com Playwright (JavaScript)

## Visão Geral
- Automação End-to-End do formulário da aplicação “Central de Atendimento ao Cliente TAT”.
- Foco em validação de campos obrigatórios, regras de negócio e cenários positivos/negativos.
- Projeto pronto para uso em portfólio profissional.

## Estrutura de Pastas
```
cac-tat-automacao-playwright/
├── tests/
│   └── e2e/
│       └── formulario.spec.js          # Cenários E2E
├── pages/
│   └── FormularioPage.js               # POM do formulário
├── utils/
│   └── testData.js                     # Massa de dados fictícia
├── reports/
│   ├── html/                           # Relatórios HTML gerados pelo CI/CD
│   └── exemplo-report.html             # Exemplo versionado
├── arquivo-teste.txt                   # Fixture de upload (.txt)
├── playwright.config.js
├── package.json
└── README.md
```

## Aplicação Testada
- URL: https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html
- Formulário com campos: Nome, Sobrenome, E-mail, Telefone (condicional), Produto (select), Tipo de atendimento (radio), Meio de contato (checkbox), Mensagem (textarea), Upload de arquivo e botão Enviar.

## Tecnologias
- Linguagem: JavaScript
- Framework: Playwright (@playwright/test)
- Padrão: Page Object Model (POM)

## Pré-requisitos
- Node.js LTS instalado
- Acesso à internet para baixar browsers do Playwright

## Instalação
```bash
npm i
npx playwright install
```

## Executando os Testes
- Headless:
```bash
npm test
```
- Headed (com UI do navegador):
```bash
npm run test:headed
```
- UI mode:
```bash
npm run test:ui
```

## CI/CD
- Execução automática em push e pull request (GitHub Actions)
- Node LTS, instalação de dependências e browsers do Playwright
- Testes em modo headless e publicação do relatório HTML em GitHub Pages
- Artefatos de relatório disponíveis no job do workflow

## Relatório Público (GitHub Pages)
- Acesse o relatório publicado: https://rfslusarz.github.io/cac-tat-automatizacao-playwright/
- Exemplo versionado: [exemplo-report.html](reports/exemplo-report.html)

## Cenários Cobertos
### Positivos
- Enviar com todos os obrigatórios preenchidos
- Enviar com meio de contato E-mail
- Enviar com meio de contato Telefone e telefone válido
- Upload de arquivo .txt, validando que foi anexado
- Mensagem de sucesso após envio

### Negativos
- Falta de Nome, Sobrenome, E-mail
- E-mail inválido
- Falta de mensagem
- Telefone marcado sem preencher telefone (regra condicional)
- Sem selecionar tipo de atendimento

## Regra de Negócio – Telefone
- Quando “Telefone” é selecionado como meio de contato, o campo Telefone torna-se obrigatório.
- O envio deve falhar se estiver vazio; deve ter sucesso quando preenchido corretamente.

## Boas Práticas Aplicadas
- POM bem definido e reutilizável
- Métodos pequenos e claros
- Separação entre teste e lógica de página
- Seletores resilientes (labels/roles/placeholders), sem XPath
- Dados fictícios; sem hardcode de sensíveis
- Testes independentes entre si

## Observações para Evolução
- Adicionar reports HTML e Allure
- Cobrir validações de máscara de telefone e produto
- Pipeline CI (GitHub Actions/Azure DevOps)
