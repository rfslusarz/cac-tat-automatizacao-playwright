# CAC TAT – Automação E2E com Playwright (JavaScript)

## Visão Geral
- Automação End-to-End do formulário da aplicação “Central de Atendimento ao Cliente TAT”.
- Foco em validação de campos obrigatórios, regras de negócio e cenários positivos/negativos.
- Projeto pronto para uso em portfólio profissional.

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
├── arquivo-teste.txt                   # Fixture de upload (.txt)
├── playwright.config.js
├── package.json
└── README.md
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

