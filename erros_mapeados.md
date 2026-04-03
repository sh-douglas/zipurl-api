AuthService: 
    401 - para usuário incorreto
UserService:
    409 - e-mail já cadastrado
    404 - usuário não encontrado
UrlService: 
    404 - Link não encontrado
AuthController:
    200 - Para requisição correta
    401 - Para usuário incorreto/não encontrado
    500 - Para erro generico
UserController:
    201 - Para novo usuário
    409 - Erro que vem do Service
    500 - Para erro generico
UrlController: 
    201 - Para nova URL
    400 - Para erro do Zod
    500 - Para erro interno
    404 - Para erro ao redirecionar
    200 - Para Ok
    