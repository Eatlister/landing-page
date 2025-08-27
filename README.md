# EatLister Landing Page

Landing page moderna para a plataforma EatLister, construída com Next.js 15, TypeScript e Tailwind CSS.

## 🚀 Funcionalidades

- **Design Responsivo**: Interface adaptável para todos os dispositivos
- **Sistema de Email**: Captura de emails com validação e armazenamento seguro
- **Banco de Dados**: SQLite com Prisma ORM para armazenar inscrições
- **Server Actions**: Funções seguras do lado do servidor para processamento de dados
- **Animações**: Transições suaves e efeitos visuais modernos

## 🛠️ Tecnologias

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite com Prisma ORM
- **UI Components**: Radix UI + shadcn/ui
- **Icons**: Lucide React

## 📦 Instalação

1. **Clone o repositório**

   ```bash
   git clone <repository-url>
   cd landing-page
   ```

2. **Instale as dependências**

   ```bash
   yarn install
   ```

3. **Configure o banco de dados**

   ```bash
   # O arquivo .env já está configurado com SQLite
   # Para usar outro banco, edite o arquivo .env
   ```

4. **Execute as migrações**

   ```bash
   yarn prisma migrate dev
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   yarn dev
   ```

## 🗄️ Banco de Dados

O sistema usa SQLite por padrão, mas pode ser facilmente configurado para outros bancos:

### Estrutura da Tabela

```sql
model EmailSubscription {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Configuração

- **SQLite** (padrão): `DATABASE_URL="file:./dev.db"`
- **PostgreSQL**: `DATABASE_URL="postgresql://user:password@localhost:5432/dbname"`
- **MySQL**: `DATABASE_URL="mysql://user:password@localhost:3306/dbname"`

## 🔧 API Endpoints

### POST `/api/subscribe`

Recebe emails para inscrição na newsletter.

**Request Body:**

```json
{
  "email": "usuario@exemplo.com"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email cadastrado com sucesso!",
  "id": "clx123..."
}
```

## 🎨 Componentes Principais

### HeroSection

- Input de email com design moderno
- Bordas arredondadas e tracejadas
- Botão de envio integrado ao input
- Validação em tempo real

### Server Actions

- `subscribeEmail()`: Função segura para processar emails
- Validação de dados
- Tratamento de erros
- Revalidação automática da página

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas

- **Netlify**: Compatível com Next.js
- **Railway**: Suporte nativo para Node.js
- **DigitalOcean App Platform**: Deploy simples

## 🔒 Segurança

- **Validação de Entrada**: Validação rigorosa de todos os dados de entrada
- **Sanitização de Dados**: Limpeza e validação de dados antes do processamento
- **Proteção contra SQL Injection**: Prisma ORM com queries parametrizadas
- **Rate Limiting**: Proteção contra spam e ataques de força bruta
  - Máximo 3 tentativas por IP em 15 minutos
  - Máximo 2 tentativas por email em 1 hora
- **Proteção contra Bots**:
  - Campo honeypot oculto
  - Validação de tempo de preenchimento
  - Análise de User-Agent
  - Score de confiança baseado em múltiplos fatores
- **Lista Negra de IPs**: Bloqueio de IPs suspeitos
- **Validação de Padrões**: Bloqueio de emails com padrões suspeitos
- **Logs de Segurança**: Registro de tentativas suspeitas e violações

## 📱 Responsividade

O design é totalmente responsivo e funciona em:

- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1440px+)

## 🎯 Próximos Passos

- [ ] Implementar sistema de notificações
- [ ] Adicionar analytics
- [ ] Sistema de autenticação
- [ ] Painel administrativo
- [ ] Integração com serviços de email
- [ ] Sistema de reCAPTCHA v3
- [ ] Monitoramento de segurança em tempo real
- [ ] Sistema de whitelist de IPs confiáveis

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:

- **Email**: contato@eatlister.com
- **Website**: https://eatlister.com
