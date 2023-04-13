# Lista de Usuários

Esse projeto foi desenvolvido durante um desafio técnico para a Colab. O desafio foi proposto foi bem aberto e só tinha como requisito:

“Listar os usuários e seus detalhes em uma interface web”

Trouxe algumas outras features listadas abaixo.

## Funcionalidades

- Listagem de Usuários [✅]
- Input para Quantidade de Usuários [✅]
- Modal com Detalhes do Usuário [✅]
- Opção de Trocar Usuários por um Outro [✅]
- Responsividade [✅]
- App em Container [✅]
- Container com Multi-Stage [✅]
- Container com Linux Alpine [❌]
- Deploy na Vercel [✅]
- Deploy na AWS [❌]
- Testes E2E [❌]

Observação: vou trazer as demais funcionalidades.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`API_USERS_URL`

Por padrão, estou utilizando `https://randomuser.me/api` que foi a API passada no desafio.

## Rodando Localmente

Clone o projeto

```bash
  git clone https://github.com/devgustavovasquez/next-antd-typescript.git
```

Entre no diretório do projeto (lembre-se de preencher as .envs)

```bash
  cd next-antd-typescript
```

Instale as dependências

```bash
  pnpm install
```

Inicie a aplicação

```bash
  pnpm dev
```

## Rodando com Docker

Clone o projeto

```bash
  git clone https://github.com/devgustavovasquez/next-antd-typescript.git
```

Entre no diretório do projeto (lembre-se de preencher as .envs)

```bash
  cd next-antd-typescript
```

Build a imagem da aplicação

```bash
  docker build -t <name> .
```

Inicie a aplicação

```bash
  docker run --env-file .env -dp <host-port>:3000 <name>
```

## Detalhes do Projeto

- 1º foi decidir quais tecnologias eu utilizaria.

**Next.js** e **Tailwind**, pois percebi que é utlizado pela Colab. Além de eu já ter conhecimento.

Optei pelo **Ant Design**, pois ainda não o conhecia e percebi que é utilizado pela Colab. Optei também pelo **pnpm** como gerenciador de pacotes, como forma de desafio.

- BUG: Instalando a lib `testing library` com o `pnpm`, parace que a tipagem da lib de alguma forma não estava sendo passada na hora de transpilar. Bastou importar o "types" da lib no `tsconfig.json`.

- IDEIA: **useCallback** no offset handle para evitar que a função seja recriada a todo momento, fazendo com que o next memorize-a.

- IDEIA: Abstraindo toda a lógica de busca pelos dados em **um hook** separado da parte estrutural da app.

- IDEIA: Abstraindo o states dos usuários para um **Context**, facilitando e tomando controle da interação entre modal, home e offset.

- IDEIA: **Docker** e **AWS**. Resolvi fazer o deploy utilizando essas tecnologias, afim de mostrar um pouco do meu conhecimento como FullStack, uma vez que é a vaga em questão.

- PROBLEMA: Tive certa dificuldade ao passar .env para a app. Mas lembrar dos conceitos de **SSR** e como o **Next.js** funciona, rapidamente esclareceu.

## Feedback

Estou satisfeito com o resultado até agora do projeto. A listagem está funcionando bem, com features interessantes e me sai bem utilizando tecnologias que não são quais eu domino, embora tenha conhecimento (minha experiência até aqui é maior com back-end). Infelizmente, o projeto ainda está sem coverage. Mas certamente estarei progredindo com isso.

Tive dificuldade a medida que o projeto foi avançando, certamente pelo que comentei acima, pensando "será que estou fazendo isso da maneira correta?". O normal é que eu procure uma segunda opinião nesse momento, então recorri ao máximo que pude à web.

Trabalhar com Ant Design é fantástico. Em determinado momento percebi que se seguisse a risca usando ele, eu não mostraria conhecimento nenhum, estaria tudo pronto haha.
