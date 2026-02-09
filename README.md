# 🚗 FipeLog - Consulta de Valores FIPE

[![Deploy Status](https://img.shields.io/badge/deploy-vercel-brightgreen?style=for-the-badge&logo=vercel)](https://fipelog.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Aplicação web moderna para consulta de valores de veículos na tabela FIPE (Fundação Instituto de Pesquisas Econômicas)**

## 🌐 [Acessar Aplicação](https://fipelog.vercel.app/)

---

## 📋 Sumário

- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [🏗️ Arquitetura](#️-arquitetura)
- [📱 Responsividade](#-responsividade)
- [🚀 Como Usar](#-como-usar)
- [🔧 Instalação Local](#-instalação-local)
- [📊 API Endpoints](#-api-endpoints)
- [🎨 Design System](#-design-system)
- [🔄 Fluxo de Dados](#-fluxo-de-dados)
- [🐛 Troubleshooting](#-bug-troubleshooting)
- [📈 Melhorias Futuras](#-melhorias-futuras)
- [🤝 Contribuição](#-contribuição)

---

## ✨ Funcionalidades

### 🚗 Consulta Completa FIPE
- **Tipos de Veículos**: Carros, Motos e Caminhões
- **Seleção Encadeada**: Tipo → Marca → Modelo → Ano
- **Busca em Tempo Real**: Integração direta com API FIPE
- **Valores Atualizados**: Base de dados oficial FIPE

### 📱 Interface Responsiva
- **Mobile-First**: Otimizado para dispositivos móveis
- **Adaptativo**: Layout ajustável para tablets e desktops
- **Touch-Friendly**: Botões e selects otimizados para toque

### 🎨 Design Moderno
- **Tema Escuro**: Interface elegante e moderna
- **Gradientes**: Cards com gradientes atrativos
- **Feedback Visual**: Estados de loading e seleção
- **Animações Suaves**: Transições e micro-interações

### ⚡ Performance
- **Carregamento Rápido**: Otimizado para performance
- **Lazy Loading**: Carregamento sob demanda dos dados
- **Cache Inteligente**: Minimiza requisições repetidas

---

## 🛠️ Tecnologias

### Frontend
- **Next.js 16.1.6**: Framework React com Server-Side Rendering
- **React 19.2.3**: Biblioteca UI com hooks modernos
- **Tailwind CSS 4.0**: Framework CSS utilitário
- **JavaScript ES6+**: Sintaxe moderna e assíncrona

### Backend
- **Next.js API Routes**: Endpoints serverless
- **Fetch API**: Requisições HTTP nativas
- **CORS**: Configuração segura de cross-origin

### Deploy
- **Vercel**: Plataforma serverless deployment
- **CI/CD**: Deploy automático a cada push
- **Edge Functions**: Performance global

---

## 🏗️ Arquitetura

```
src/
├── app/
│   ├── page.js                 # Página principal
│   ├── layout.js              # Layout global
│   ├── globals.css            # Estilos globais
│   └── api/                 # API Routes
│       ├── route/             # Busca marcas
│       │   └── route.js
│       ├── models/            # Busca modelos
│       │   └── route.js
│       ├── years/             # Busca anos
│       │   └── route.js
│       └── fipe/              # Busca valor FIPE
│           └── route.js
├── components/               # Componentes reutilizáveis
└── utils/                   # Funções utilitárias
```

### Fluxo de Arquitetura

1. **Client-Side**: React gerencia estado e UI
2. **API Routes**: Next.js handle requisições
3. **External API**: Integração com API FIPE
4. **Data Flow**: Fluxo unidirecional de dados

---

## 📱 Responsividade

### Breakpoints Utilizados

| Dispositivo | Tela | Classes Tailwind |
|-------------|-------|-----------------|
| Mobile | 320px - 639px | `base` (sem prefixo) |
| Tablet | 640px - 767px | `sm:` |
| Desktop | 768px - 1023px | `md:` |
| Large | 1024px - 1279px | `lg:` |
| XLarge | 1280px+ | `xl:` |

### Estratégia Mobile-First

```jsx
// Base: Mobile (320px+)
<div className="px-4 py-6 text-sm">

// Tablet (640px+)
<div className="sm:px-6 sm:py-8 sm:text-base">

// Desktop (768px+)
<div className="md:px-8 md:py-12 md:text-lg">

// Large Desktop (1024px+)
<div className="lg:px-12 lg:py-16 lg:text-xl">
```

---

## 🚀 Como Usar

### 1. Acessar a Aplicação
Visite [https://fipelog.vercel.app/](https://fipelog.vercel.app/)

### 2. Selecionar Tipo de Veículo
- Escolha entre: Carros, Motos ou Caminhões
- O sistema automaticamente carregará as marcas disponíveis

### 3. Escolher Marca
- Após selecionar o tipo, as marcas aparecem no segundo select
- Aguarde o carregamento (indicador visual)

### 4. Selecionar Modelo
- Com a marca escolhida, os modelos são carregados
- Lista completa de modelos da marca selecionada

### 5. Escolher Ano
- Anos disponíveis para o modelo selecionado
- Inclui anos modelo e fabricação

### 6. Visualizar Valor FIPE
- O valor é automaticamente buscado e exibido
- Card completo com todas as informações

---

## 🔧 Instalação Local

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Passos

```bash
# Clonar repositório
git clone https://github.com/seu-usuario/fipelog.git

# Entrar no diretório
cd fipelog

# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev

# Acessar aplicação
# http://localhost:3000
```

### Variáveis de Ambiente

```bash
# Criar arquivo .env.local
NEXT_PUBLIC_API_URL=https://fipe.parallelum.com.br/api/v2
```

---

## 📊 API Endpoints

### Marcas
```
GET /api/route?type={vehicleType}
```

### Modelos
```
GET /api/models?type={vehicleType}&brandId={brandId}
```

### Anos
```
GET /api/years?type={vehicleType}&brandId={brandId}&modelId={modelId}
```

### Valor FIPE
```
GET /api/fipe?type={vehicleType}&brandId={brandId}&modelId={modelId}&yearId={yearId}
```

### Respostas

```json
// Marcas
[
  {
    "codigo": "1",
    "nome": "Volkswagen"
  }
]

// Valor FIPE
{
  "modelo": "Gol 1.6",
  "ano": "2020",
  "combustivel": "Gasolina",
  "codigoFipe": "005001-0",
  "mesReferencia": "janeiro de 2024",
  "valor": "R$ 45.000,00"
}
```

---

## 🎨 Design System

### Cores
- **Primária**: Gradiente azul-roxo (`from-blue-900 to-purple-900`)
- **Background**: Cinza escuro (`bg-gray-900`)
- **Texto**: Branco (`text-white`) e cinza (`text-gray-300`)
- **Acento**: Verde para valores (`text-green-400`)

### Tipografia
- **Títulos**: `font-bold` com escalonamento responsivo
- **Corpo**: `font-sans` (system fonts)
- **Tamanhos**: Mobile-first com breakpoints

### Componentes
- **Selects**: Estilo consistente com focus states
- **Cards**: Bordas arredondadas e sombras
- **Botões**: Hover states e transições suaves

---

## 🔄 Fluxo de Dados

### 1. Estado Inicial
```javascript
const [selectedVehicleType, setSelectedVehicleType] = useState("");
const [selectedBrand, setSelectedBrand] = useState("");
const [selectedModel, setSelectedModel] = useState("");
const [selectedYear, setSelectedYear] = useState("");
```

### 2. useEffect Chain
```javascript
useEffect(() => {
  if (selectedVehicleType) fetchBrands(selectedVehicleType);
}, [selectedVehicleType]);

useEffect(() => {
  if (selectedBrand) fetchModels(selectedVehicleType, selectedBrand);
}, [selectedBrand]);

useEffect(() => {
  if (selectedModel) fetchYears(selectedVehicleType, selectedBrand, selectedModel);
}, [selectedModel]);

useEffect(() => {
  if (selectedYear) fetchFipeData(selectedVehicleType, selectedBrand, selectedModel, selectedYear);
}, [selectedYear]);
```

### 3. Data Flow
```
User Selection → useEffect → API Route → External API → Data Processing → UI Update
```

---

## 🐛 Troubleshooting

### Problemas Comuns

#### Selects Não Preenchem
- **Causa**: API offline ou CORS
- **Solução**: Verificar console para erros de rede

#### Valores NaN
- **Causa**: Formatação incorreta do valor
- **Solução**: Função `formatPrice()` trata diferentes formatos

#### Layout Quebrado
- **Causa**: Cache do navegador
- **Solução**: Hard refresh (Ctrl+F5)

### Debug Tools

```javascript
// Logs detalhados no console
console.log("Buscando marcas para:", vehicleType);
console.log("Dados FIPE recebidos:", fipeInfo);
```

---

## 📈 Melhorias Futuras

### 🚀 Performance
- [ ] Implementar cache local (localStorage)
- [ ] Lazy loading de componentes
- [ ] Virtual scrolling para listas longas

### 🎨 UX/UI
- [ ] Modo claro/escuro
- [ ] Animações mais elaboradas
- [ ] Skeleton loading states

### 🔍 Funcionalidades
- [ ] Busca por nome do veículo
- [ ] Histórico de consultas
- [ ] Comparação entre veículos
- [ ] Gráfico de depreciação

### 📱 Mobile
- [ ] PWA (Progressive Web App)
- [ ] Notificações push
- [ ] Offline mode

---

## 🤝 Contribuição

### Como Contribuir

1. **Fork** o repositório
2. **Branch** para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. **Push** para o branch (`git push origin feature/nova-funcionalidade`)
5. **Pull Request** descrevendo as mudanças

### Code Style

- **JavaScript**: ES6+, arrow functions, template literals
- **React**: Hooks funcionais, componentes puros
- **CSS**: Tailwind classes, mobile-first
- **Commits**: Conventional Commits

### Issues

Reporte bugs e sugira features através do [GitHub Issues](https://github.com/seu-usuario/fipelog/issues)

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---

## 👨‍💻 Autor

**Jonathan Silva**  
[GitHub](https://github.com/JohnSilva98) | [LinkedIn](https://linkedin.com/in/jonathansilva98) | [Email](mailto:bsilva.jonathan@outlook.com)

---

## 🙏 Agradecimentos

- **FIPE** pela base de dados oficial
- **Parallelum** pela API pública
- **Vercel** pelo hosting e deploy
- **Comunidade** pelo feedback e suporte

---

<div align="center">

**[🚀 Acessar Aplicação](https://fipelog.vercel.app/)**

Made with ❤️ in Brazil

</div>
