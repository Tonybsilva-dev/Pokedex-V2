# 🎮 Pokédex Next.js

Uma Pokédex moderna e interativa construída com **Next.js 14**, **TypeScript** e **Tailwind CSS**. Explore todos os Pokémon com uma interface responsiva, animações suaves e funcionalidades avançadas.

![Pokédex Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-0055FF?style=for-the-badge&logo=framer)

## ✨ Funcionalidades

### 🔍 Busca e Filtros
- **Busca em tempo real** por nome do Pokémon
- **Filtros por tipo** com cores personalizadas
- **Filtros por geração** (Kanto, Johto, Hoenn, etc.)
- **Interface de filtros intuitiva** com modal responsivo

### 🎨 Design Moderno
- **Interface responsiva** para todos os dispositivos
- **Animações suaves** com Framer Motion
- **Cores temáticas** baseadas nos tipos de Pokémon
- **Gradientes e efeitos visuais** modernos
- **Dark mode** (em desenvolvimento)

### 📱 PWA Ready
- **Progressive Web App** configurado
- **Instalável** em dispositivos móveis
- **Offline support** (em desenvolvimento)
- **Manifest** otimizado

### ⚡ Performance
- **Server-side rendering** com Next.js
- **API routes** otimizadas
- **Cache inteligente** para requisições
- **Lazy loading** de imagens
- **Otimização de bundle**

### 🎯 Funcionalidades Avançadas
- **Sistema de favoritos** com localStorage
- **Paginação infinita** para melhor performance
- **Estatísticas detalhadas** de cada Pokémon
- **Informações de altura e peso**
- **Sprites oficiais** de alta qualidade

## 🚀 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações e transições
- **Axios** - Cliente HTTP
- **Lucide React** - Ícones modernos
- **PokeAPI** - API oficial dos Pokémon

## 📦 Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/pokedex-nextjs.git
   cd pokedex-nextjs
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. **Acesse no navegador**
   ```
   http://localhost:3000
   ```

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm run start

# Linting
npm run lint

# Verificação de tipos
npm run type-check
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── api/               # API Routes
│   │   ├── pokemon/       # Endpoints de Pokémon
│   │   └── types/         # Endpoints de tipos
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── components/            # Componentes React
│   ├── FilterModal.tsx    # Modal de filtros
│   ├── LoadingSpinner.tsx # Spinner de carregamento
│   ├── Navbar.tsx         # Barra de navegação
│   ├── PokemonCard.tsx    # Card do Pokémon
│   ├── PokemonList.tsx    # Lista de Pokémon
│   └── EmptyState.tsx     # Estado vazio
├── lib/                   # Utilitários e serviços
│   ├── pokemon-api.ts     # Cliente da PokeAPI
│   └── utils.ts           # Funções utilitárias
├── styles/                # Estilos CSS
│   └── globals.css        # Estilos globais
└── types/                 # Definições TypeScript
    └── pokemon.ts         # Tipos de Pokémon
```

## 🎨 Personalização

### Cores dos Tipos
As cores dos tipos de Pokémon podem ser personalizadas no arquivo `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      type: {
        fire: '#F08030',
        water: '#6890F0',
        // ... outros tipos
      }
    }
  }
}
```

### Animações
As animações podem ser ajustadas nos componentes usando Framer Motion:

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Conteúdo */}
</motion.div>
```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints otimizados:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuração da API

A aplicação utiliza a [PokeAPI](https://pokeapi.co/) como fonte de dados. As configurações da API estão em `src/lib/pokemon-api.ts`.

### Cache
O sistema implementa cache em memória para otimizar as requisições:

```typescript
private cache = new Map<string, any>();
```

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Netlify
1. Build: `npm run build`
2. Publish directory: `.next`
3. Deploy

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🙏 Agradecimentos

- [PokeAPI](https://pokeapi.co/) - API oficial dos Pokémon
- [Next.js](https://nextjs.org/) - Framework React
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações
- [Lucide](https://lucide.dev/) - Ícones

## 📞 Contato

**Antonio Silva** - [@tonybsilva-dev](https://github.com/tonybsilva-dev)

---

⭐ **Se este projeto te ajudou, considere dar uma estrela!** ⭐