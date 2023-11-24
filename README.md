# Sistema de Controle de Comissões - DEC

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
- Biblioteca de componentes para react js Ant Design e MUI: React component:[https://mui.com/](https://mui.com/) | [https://ant.design/](https://ant.design/)
- Back-End da aplicação:[https://github.com/devcavalcante/DecLaravel](https://github.com/devcavalcante/DecLaravel).

Este documento de visão fornece uma visão geral do projeto e serve como referência para o desenvolvimento do Sistema de Controle de Comissões da Ufopa. Para obter informações detalhadas sobre os requisitos, funcionalidades e uso do sistema, consulte a documentação técnica e os manuais do usuário fornecidos durante o desenvolvimento e implementação do projeto.

# Projeto React em um Contêiner Docker usando Docker Compose

Este repositório contém um exemplo simples de como iniciar um projeto React em um contêiner Docker usando Docker Compose. Isso permite que você isole seu ambiente de desenvolvimento e implante facilmente seu aplicativo em qualquer lugar que suporte contêineres Docker.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte software instalado em seu sistema:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (para criar um novo projeto React)

## Inicialização

Siga as etapas abaixo para iniciar o projeto em um contêiner Docker:

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/projeto-react-docker.git
cd projeto-react-docker
```
## Construir a imagem Docker no diretório raiz do projeto:
- docker-compose build
## Iniciar o contêiner após a construção da imagem:
- docker-compose up -d
- O -d faz com o terminal continue dispinível
## Parar projeto 
-  docker-compose down / docker-compose stop
## Executar um comando dentro do contêiner (por exemplo, instalar novas dependências):
- docker-compose exec app comando
  
Se tudo ocorrer conforme o esperado, seu aplicativo React estará disponível em http://localhost:3000 no seu navegador.
