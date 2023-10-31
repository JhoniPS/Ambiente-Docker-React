# Sistema de Controle de Comissões - README

## Visão Geral

Este repositório contém a documentação do projeto de desenvolvimento do Sistema de Controle de Comissões para a Universidade Federal do Oeste do Pará (Ufopa). O sistema tem como objetivo fornecer uma solução tecnológica para o controle dinâmico da quantidade, composição de membros e atividades das comissões gerenciadas pela reitoria da Ufopa. Este documento de visão detalha as principais informações sobre o projeto, suas funcionalidades e os atores envolvidos.

## Histórico de Versões

- **21/06/2023 - Versão 1.0**
  - Criação da primeira versão do documento de visão.
  - Autores: Henrique Figueiredo, Débora da Silva Cavalcante, Socorro Vânia Mota
  - Revisores: Emilly Maroto, Vania Lourenço Alves
  - Aprovado por: Socorro Vânia Lourenço Alves

- **01/10/2023 - Versão 2.0**
  - Versão atualizada do documento de visão.
  - Autores: Débora da Silva Cavalcante, Socorro Vânia Mota
  - Revisores: Vania Lourenço Alves
  - Aprovado por: Vania Lourenço Alves

## Responsáveis

- **Equipe DEC (Desenvolvimento):**
  - Coordenador: Socorro Vânia Lourenço Alves
  - Desenvolvedores: Débora Cavalcante, Emilly Maroto, Henrique Mota, Jhonicley Pereira

- **Cliente:**
  - Gestor do sistema: Pró-Reitoria

## Objetivo do Projeto

O objetivo do projeto é desenvolver um software que permita o controle eficiente das comissões internas e externas à reitoria da Ufopa. O sistema fornecerá funcionalidades para o registro de atividades, gerenciamento de membros e acompanhamento das comissões. Espera-se otimizar o processo de controle e monitoramento desses grupos, facilitando a gestão administrativa e a comunicação entre os membros.

## Descrição do Projeto

O projeto envolve o desenvolvimento de um software de controle e gerenciamento de comissões, com diferentes perfis de usuários, incluindo administradores, gerentes, representantes e visualizadores. O sistema permitirá o cadastro, controle dinâmico da quantidade, composição de membros e atividades desses grupos. Os principais tipos de grupos gerenciados são:
- Grupos Internos: Comissões, Comitês, Grupos de Trabalho, etc., criados pela administração da Ufopa.
- Grupos Externos: Comissões, Comitês, Fóruns, Conselhos, etc., nos quais a Ufopa possui representantes designados.

O sistema fornecerá uma interface amigável para visualização dos grupos em formato de tabela, facilitando a identificação e acompanhamento das informações detalhadas de cada grupo. Além disso, os usuários poderão realizar o cadastro de comissões com informações flexíveis.

## Envolvimento

### Abrangência

O projeto abrange o desenvolvimento de um software de uso interno para a Ufopa, voltado para o controle e gerenciamento de comissões da reitoria da instituição.

### Papel das Partes Interessadas

#### Cliente

- Responsável pelos requisitos funcionais e não funcionais do sistema.
- Responsável pelos testes do sistema para homologação do projeto.
- Atua como facilitador e especificador dos requisitos sistêmicos perante a equipe de desenvolvimento.
- Garante que as regras de negócio sejam suportadas pela base legal.

#### Equipe de Desenvolvimento - DEC

- Identifica os requisitos do software e desenvolve os modelos estáticos e dinâmicos do projeto.
- Levanta os requisitos funcionais e não funcionais do projeto.
- Define o que interagirá com o sistema.
- Gera um produto que atenda aos requisitos identificados junto aos usuários.

#### Atores

- Administrador: Adiciona gerentes e administradores, gerencia os tipos de usuários e usuários no sistema.
- Gerente: Cadastra grupos e adiciona representantes para as comissões.
- Representante: Gerencia informações dos grupos, membros, histórico de reuniões, atividades e documentos.
- Visualizador: Pode visualizar informações dos grupos, mas não realizar alterações.

## Necessidades e Funcionalidades

O sistema possui várias funcionalidades para atender às necessidades dos diferentes atores. Abaixo estão listadas algumas das principais funcionalidades:

1. **Login:** Permite aos atores realizar o login no sistema.

2. **Gerenciamento dos Tipos de Usuários:** Permite ao administrador cadastrar, editar, visualizar e excluir tipos de usuários (Visualizador, Representante, Gerente e Administrador).

3. **Gerenciamento de Usuários:** Permite ao administrador cadastrar, editar, visualizar, atualizar, deletar e restaurar usuários de diferentes tipos.

4. **Gerenciamento de Tipos de Grupos:** Permite ao gerente cadastrar, editar, visualizar e deletar tipos de grupos.

5. **Gerenciamento de Membros:** Permite ao representante cadastrar, editar, visualizar e deletar membros.

6. **Gerenciamento de Documentos:** Permite ao representante cadastrar, editar, visualizar e deletar documentos.

7. **Gerenciamento de Atividades:** Permite ao representante cadastrar, editar, visualizar e deletar atividades.

8. **Gerenciamento de Notas:** Permite ao representante cadastrar, editar, visualizar e deletar notas.

9. **Gerenciamento de Histórico de Reuniões:** Permite ao representante cadastrar, editar, visualizar e deletar reuniões.

10. **Gerenciamento de Grupos:** Permite ao gerente cadastrar, editar, visualizar e deletar grupos.

## Restrições Tecnológicas

- O sistema deve ser acessível via internet e utilizado em um navegador.
- O banco de dados utilizado deve ser o PostgreSQL.

## Critérios de Aceitação do Sistema

O sistema somente será implantado após a conclusão de todos os testes.

## Escopo Não Incluído no Sistema

Os usuários cadastrados serão importados por meio de uma API disponibilizada pelo CTIC, não fazendo parte do escopo do desenvolvimento do sistema.

## Premissas e Restrições

**Premissas:**

- O banco de dados utilizado será o PostgreSQL.

**Restrições:**

## Ligações com Outros Sistemas

- A autenticação dos usuários será realizada por meio de uma API externa disponibilizada pelo CTIC: [https://autenticacao.dev.ufopa.edu.br](https://autenticacao.dev.ufopa.edu.br)
- Informações sobre usuários serão obtidas de uma API disponibilizada pelo CTIC: [https://api.dev.ufopa.edu.br](https://api.dev.ufopa.edu.br)

Este documento de visão fornece uma visão geral do projeto e serve como referência para o desenvolvimento do Sistema de Controle de Comissões da Ufopa. Para obter informações detalhadas sobre os requisitos, funcionalidades e uso do sistema, consulte a documentação técnica e os manuais do usuário fornecidos durante o desenvolvimento e implementação do projeto.


# Como iniciar o projeto

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
