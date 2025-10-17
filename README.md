<h1 align="center">Extensions Manager – Next.js + TypeScript + Tailwind CSS</h1>

<p align="center">
  <img width="90%" alt="Preview do Projeto" src="https://github.com/user-attachments/assets/330243cc-84cd-4c01-aa74-f205fc600084" />
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=0F172A" alt="Next.js"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0F172A" alt="TypeScript"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=0F172A" alt="TailwindCSS"/></a>
  <a href="https://www.framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white&labelColor=0F172A" alt="Framer Motion"/></a>
  <a href="https://dndkit.com/"><img src="https://img.shields.io/badge/DnD_Kit-FF6B6B?style=for-the-badge&logo=dragndrop&logoColor=white&labelColor=0F172A" alt="DnD Kit"/></a>
</p>

---

## Sobre o Projeto

O **Extensions Manager** é uma aplicação **Next.js moderna** para **gerenciar extensões de navegador** de forma elegante e intuitiva, com **animações suaves**, **drag & drop** e **filtros inteligentes**.

Desenvolvido com foco em **performance, usabilidade e design profissional**, oferece uma **experiência de usuário premium** para organizar e controlar suas extensões favoritas.

---

## Preview das Funcionalidades

### Tela Principal com Filtros
<p align="center">
  <img src="https://github.com/user-attachments/assets/main-screen-preview.png" width="90%" alt="Preview Tela Principal"/>
</p>

### Sistema de Drag & Drop
<p align="center">
  <img src="https://github.com/user-attachments/assets/drag-drop-preview.gif" width="90%" alt="Preview Drag & Drop"/>
</p>

### Animações e Transições
<p align="center">
  <img src="https://github.com/user-attachments/assets/animations-preview.gif" width="90%" alt="Preview Animações"/>
</p>

---

## Principais Recursos

🎯 **Filtros Inteligentes** (All, Active, Inactive, Favorites) com transições suaves  
🖱️ **Drag & Drop** para reordenar extensões facilmente  
⭐ **Sistema de Favoritos** para marcar extensões importantes  
🎨 **Animações Premium** com Framer Motion em todos os elementos  
📱 **Design 100% Responsivo** (mobile, tablet e desktop)  
🌙 **Tema Escuro Moderno** inspirado em interfaces profissionais  
🔄 **Transições de Página** suaves entre navegação  
📊 **Contador Dinâmico** de itens filtrados  
💫 **Micro-interações** em botões e elementos clicáveis  

---

## Tecnologias Utilizadas

| Stack | Descrição |
|-------|------------|
| ⚛️ **Next.js 15** | Framework React com App Router e otimização automática |
| 🧩 **TypeScript** | Tipagem estática para desenvolvimento mais seguro |
| 🎨 **Tailwind CSS** | Estilização utilitária moderna e responsiva |
| 🎭 **Framer Motion** | Animações fluidas e micro-interações premium |
| 🖱️ **DnD Kit** | Sistema completo de drag and drop |
| 🧱 **Radix UI** | Componentes acessíveis e customizáveis |
| 🎯 **Lucide React** | Ícones modernos e consistentes |

---

## Funcionalidades Detalhadas

### 🎯 Sistema de Filtros
- **Filtros dinâmicos**: All, Active, Inactive, Favorites
- **Animações de transição** entre estados
- **Contador em tempo real** de itens filtrados
- **Busca instantânea** com debounce

### 🎨 Animações e Interações
- **Page transitions** suaves entre rotas
- **Card animations** (entrada, saída e hover)
- **Button micro-interactions** com scale effects
- **Loading states** com skeleton placeholders

### 🖱️ Drag & Drop
- **Reordenamento visual** de extensões
- **Feedback visual** durante o arraste
- **Smooth animations** ao soltar elementos
- **Touch support** para dispositivos móveis

### ⭐ Gerenciamento de Estado
- **Toggle de ativação** com switch animado
- **Sistema de favoritos** persistente
- **Remoção com confirmação** via modal
- **Feedback notifications** para ações do usuário

---

## Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Página inicial
│   ├── template.tsx       # Template com animações
│   └── extensions/[id]/   # Página de detalhes
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes base (Radix UI)
│   ├── ClientOnly.tsx    # Wrapper para hidratação
│   ├── ExtensionCard.tsx # Card individual
│   ├── ExtensionGrid.tsx # Grid com filtros
│   └── PageTransition.tsx # Transições de página
├── data/                 # Dados mockados
└── lib/                  # Utilitários e configurações
```
<p align="center">
  <a href="#top">🔝 Voltar ao topo</a>
</p>
