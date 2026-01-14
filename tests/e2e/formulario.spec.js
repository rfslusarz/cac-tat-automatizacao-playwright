const { test, expect } = require('@playwright/test');
const path = require('path');
const { FormularioPage } = require('../../pages/FormularioPage');
const { fakeData } = require('../../utils/testData');

test.describe('CAC TAT - Formulário', () => {
  test.beforeEach(async ({ page }) => {
    const form = new FormularioPage(page);
    await form.navigate();
  });

  test('Fluxo positivo: enviar com campos obrigatórios preenchidos', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillNome(fakeData.nome);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.fillEmail(fakeData.emailValido);
    await form.selectTipoAtendimento('Ajuda');
    await form.toggleMeioContatoEmail(true);
    await form.fillMensagem(fakeData.mensagemPadrao);
    await form.submit();

    expect(await form.isSuccessVisible()).toBeTruthy();
    expect(await form.isErrorVisible()).toBeFalsy();
  });

  test('Fluxo positivo: meio de contato E-mail', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillNome(fakeData.nome);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.fillEmail(fakeData.emailValido);
    await form.selectTipoAtendimento('Feedback');
    await form.toggleMeioContatoEmail(true);
    await form.fillMensagem('Preferência por contato via e-mail.');
    await form.submit();

    expect(await form.isSuccessVisible()).toBeTruthy();
  });

  test('Fluxo positivo: meio de contato Telefone e telefone válido', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillNome(fakeData.nome);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.fillEmail(fakeData.emailValido);
    await form.selectTipoAtendimento('Elogio');
    await form.toggleMeioContatoTelefone(true);
    await form.fillTelefone(fakeData.telefoneValido);
    await form.fillMensagem('Contato preferencial por telefone.');
    await form.submit();

    expect(await form.isSuccessVisible()).toBeTruthy();
  });

  test('Fluxo positivo: upload de arquivo .txt', async ({ page }) => {
    const form = new FormularioPage(page);
    const arquivoPath = path.resolve('arquivo-teste.txt');

    await form.fillNome(fakeData.nome);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.fillEmail(fakeData.emailValido);
    await form.selectTipoAtendimento('Ajuda');
    await form.toggleMeioContatoEmail(true);
    await form.fillMensagem('Enviando com arquivo anexado.');

    await form.uploadArquivo(arquivoPath);
    await expect.poll(async () => await form.arquivoSelecionadoCount()).toBe(1);

    await form.submit();
    expect(await form.isSuccessVisible()).toBeTruthy();
  });

  test('Negativo: enviar sem preencher Nome', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.fillEmail(fakeData.emailValido);
    await form.selectTipoAtendimento('Ajuda');
    await form.fillMensagem(fakeData.mensagemPadrao);
    await form.submit();
    expect(await form.isErrorVisible()).toBeTruthy();
  });

  test('Negativo: enviar sem preencher Sobrenome', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillNome(fakeData.nome);
    await form.fillEmail(fakeData.emailValido);
    await form.selectTipoAtendimento('Ajuda');
    await form.fillMensagem(fakeData.mensagemPadrao);
    await form.submit();
    expect(await form.isErrorVisible()).toBeTruthy();
  });

  test('Negativo: enviar sem preencher E-mail', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillNome(fakeData.nome);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.selectTipoAtendimento('Ajuda');
    await form.fillMensagem(fakeData.mensagemPadrao);
    await form.submit();
    expect(await form.isErrorVisible()).toBeTruthy();
  });

  test('Negativo: e-mail em formato inválido', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillNome(fakeData.nome);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.fillEmail(fakeData.emailInvalido);
    await form.selectTipoAtendimento('Ajuda');
    await form.fillMensagem(fakeData.mensagemPadrao);
    await form.submit();
    expect(await form.isErrorVisible()).toBeTruthy();
  });

  test('Negativo: enviar sem preencher a mensagem', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillNome(fakeData.nome);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.fillEmail(fakeData.emailValido);
    await form.selectTipoAtendimento('Ajuda');
    await form.submit();
    expect(await form.isErrorVisible()).toBeTruthy();
  });

  test('Negativo: selecionar Telefone sem preencher o telefone', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillNome(fakeData.nome);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.fillEmail(fakeData.emailValido);
    await form.selectTipoAtendimento('Ajuda');
    await form.toggleMeioContatoTelefone(true);
    await form.fillMensagem(fakeData.mensagemPadrao);
    await form.submit();
    expect(await form.isErrorVisible()).toBeTruthy();
  });

  test('Enviar sem selecionar tipo de atendimento (não obrigatório)', async ({ page }) => {
    const form = new FormularioPage(page);
    await form.fillNome(fakeData.nome);
    await form.fillSobrenome(fakeData.sobrenome);
    await form.fillEmail(fakeData.emailValido);
    await form.fillMensagem(fakeData.mensagemPadrao);
    await form.submit();
    expect(await form.isSuccessVisible()).toBeTruthy();
  });
});
