class FormularioPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.successLocator = page.locator('.success, #success');
    this.errorLocator = page.locator('.error, #error');
    this.fileInput = page.locator('input[type="file"]');
  }

  async navigate() {
    await this.page.goto('/index.html', { waitUntil: 'domcontentloaded' });
  }

  async fillNome(value) {
    await this.page.getByLabel('Nome (obrigatório)', { exact: true }).fill(value);
  }

  async fillSobrenome(value) {
    await this.page.getByLabel('Sobrenome (obrigatório)', { exact: true }).fill(value);
  }

  async fillEmail(value) {
    await this.page.getByLabel('E-mail (obrigatório)', { exact: true }).fill(value);
  }

  async fillTelefone(value) {
    await this.page.getByRole('spinbutton', { name: /Telefone/ }).fill(value);
  }

  async selectProduto(label) {
    await this.page.getByLabel('Produto', { exact: false }).selectOption({ label });
  }

  async selectTipoAtendimento(tipo) {
    await this.page.getByRole('radio', { name: tipo, exact: true }).check();
  }

  async toggleMeioContatoEmail(checked = true) {
    const cb = this.page.getByRole('checkbox', { name: 'E-mail', exact: true });
    if (checked) {
      await cb.check();
    } else {
      await cb.uncheck();
    }
  }

  async toggleMeioContatoTelefone(checked = true) {
    const cb = this.page.getByRole('checkbox', { name: 'Telefone', exact: true });
    if (checked) {
      await cb.check();
    } else {
      await cb.uncheck();
    }
  }

  async fillMensagem(value) {
    const campo = this.page.getByLabel(/Como podemos te ajudar\? Algum elogio ou feedback para nós\?/i);
    if (await campo.count()) {
      await campo.fill(value);
      return;
    }
    await this.page.getByRole('textbox', { name: /Como podemos/i }).fill(value);
  }

  async uploadArquivo(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  async arquivoSelecionadoCount() {
    return await this.fileInput.evaluate((el) => el.files ? el.files.length : 0);
  }

  async submit() {
    await this.page.getByRole('button', { name: /Enviar/i }).click();
  }

  async isSuccessVisible() {
    return await this.successLocator.isVisible();
  }

  async isErrorVisible() {
    return await this.errorLocator.isVisible();
  }
}

module.exports = { FormularioPage };
