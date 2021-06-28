# Users Management REST API

- Métodos:
  - [✅] Cria um novo usuário recebendo os dados pelo corpo da requisição: retorna os dados do usuário criado com status correspondente.

    - Se nickname já existe, retornar status e mensagem de erro.

  - [✅] Listar todos os usuários cadastrados filtrados pelos campos `nome` e/ou `sobrenome`, filtrados por parâmetros de consulta: retorna um array de usuários.

  - [] Listar um usuário pelo nickname passado como parâmetro: retorna um único usuário com nome, sobrenome e nickname.

  - [] Alterar o sobrenome e o endereço do usuário recebido no corpo da requisição, baseado no id recebido como parâmetro de rota: retorna o usuário alterado com as novas informações.

  - [] Alterar o nickname de um usuário recebido no corpo da requisição, baseado no id recebido como parâmetro de rota: retorna o usuário alterado com as novas informações.

    - Se o nickname passado já existir, deve retornar status e mensagem de erro.

  - [] Deletar um usuário baseado no id recebido como parâmetro de rota: retorna o status de sucesso.
