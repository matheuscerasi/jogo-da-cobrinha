# 🐍 Jogo da Cobrinha

Jogo da cobrinha (Snake) feito com **HTML, CSS e JavaScript**, sem bibliotecas externas.
O projeto foi criado para praticar o fluxo completo de trabalho no GitHub: repositório, GitHub Pages, GitHub Actions, issue, branch, pull request, proteção da branch principal e release.

🔗 **Jogue online:** https://matheuscerasi.github.io/jogo-da-cobrinha/

## Como jogar

| Ação | Controle |
|------|----------|
| Mover a cobra | Setas ou **W A S D** (botões na tela em celulares) |
| Pausar | **Espaço** ou botão Pausar |
| Reiniciar | Botão Reiniciar |

- Cada comida vermelha vale **10 pontos**.
- Bater na parede ou no próprio corpo encerra o jogo.
- O recorde fica salvo no navegador.

## Tecnologias

- **HTML**: estrutura da página e o tabuleiro (`canvas`)
- **CSS**: visual do jogo e botões de toque para celular
- **JavaScript**: lógica do jogo, movimento, colisões e pontuação
- **GitHub Pages + GitHub Actions**: publicação automática do site

## Estrutura do projeto

```
├── index.html
├── style.css
├── script.js
├── LICENSE
├── README.md
└── .github/
    └── workflows/
        └── pages.yml
```

## Como rodar localmente

```bash
git clone https://github.com/matheuscerasi/jogo-da-cobrinha.git
cd jogo-da-cobrinha
```

Abra o `index.html` no navegador ou use a extensão **Live Server** do VS Code.

## Fluxo do GitHub aplicado no projeto

Este projeto segue as etapas de um tutorial de GitHub, adaptadas para o jogo da cobrinha.

- [x] **Repositório** com README e licença MIT
- [x] **GitHub Pages** publicado via GitHub Actions (Settings → Pages → Source: GitHub Actions)
- [x] **Primeiro commit** enviando os arquivos do jogo
- [x] **Workflow** (`.github/workflows/pages.yml`) com três etapas:
  - `test`: verifica os arquivos obrigatórios e a sintaxe do JavaScript
  - `build`: prepara os arquivos do site
  - `deploy`: publica o site
- [x] **Issue #1**: "Adicionar controles por toque para celular"
- [x] **Branch** `feature/controles-toque` para resolver a issue
- [x] **Pull Request #2** com `Closes #1`, que fecha a issue automaticamente no merge
- [x] **Merge** na `main` e deploy automático da nova versão
- [ ] **Ruleset** protegendo a `main` (exige pull request e o check `test`)
- [ ] **Release** `v1.0.0`

## Como o workflow funciona

A cada push na `main`, o GitHub Actions executa as etapas em sequência:

1. **test**: se algo falhar, o processo para e o site não é publicado.
2. **build**: copia `index.html`, `style.css` e `script.js` para a pasta do site.
3. **deploy**: publica o resultado no GitHub Pages.

Nos pull requests, apenas a etapa **test** roda, e o botão de merge só é liberado quando ela passa.

## Como contribuir

1. Abra uma **issue** descrevendo a ideia ou o problema.
2. Faça um **fork** do repositório (ou crie uma branch, se tiver acesso).
3. Crie uma branch: `git checkout -b feature/nome-da-melhoria`
4. Faça as alterações e o commit: `git commit -m "Descrição da melhoria"`
5. Envie a branch: `git push -u origin feature/nome-da-melhoria`
6. Abra um **Pull Request** para a `main`, escrevendo `Closes #número-da-issue` na descrição.
7. Aguarde o check `test` ficar verde e o merge.

## Problemas comuns

| Problema | Solução |
|----------|---------|
| `git` não é reconhecido no terminal | Instale o Git e reabra o VS Code |
| `git push` rejeitado (`fetch first`) | O repositório remoto tem commits que você não tem; use `git pull` antes, ou `git push --force` apenas em repositório novo |
| Site não aparece no Pages | Confira se o Source é **GitHub Actions** e rode o workflow de novo na aba Actions |
| Check `test` não aparece no ruleset | O workflow precisa ter rodado ao menos uma vez |
| Erro de tag ao criar a release | Toda release precisa de uma tag: crie a `v1.0.0` em *Select tag* |
| Botões de toque não aparecem | Ative o modo celular do navegador (Ctrl + Shift + M) e atualize a página |

## Ideias de melhorias

- [x] Controles por toque para celular
- [ ] Níveis de dificuldade (velocidade)
- [ ] Efeitos sonoros

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).
