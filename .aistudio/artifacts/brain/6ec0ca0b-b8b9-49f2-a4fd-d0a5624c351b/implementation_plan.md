# Plano de Atualização — Seção "About Me" e Alinhamento Visual (Opção B)

## Objetivo
Tornar o texto da seção **About Me** mais humano, próximo e natural em uma mensagem rápida de **3 linhas**, inspirada na referência enviada, usando o nome **Frank**, mencionando **18 anos** e **1 ano de experiência**, e removendo todas as palavras destacadas em rosa (`#ff0095`) de dentro do parágrafo para uma leitura limpa e agradável.

---

## Alterações Planejadas

### 1. Novo Texto "About Me" (Humano, 3 Linhas e Sem Destaques Internos)
Substituiremos o parágrafo atual com múltiplos `<span>` em rosa por um texto fluido, autêntico e dividido em 3 frases/linhas diretas, com tipografia limpa (`text-[#d6d8e0]`):

> *"Hi! My name is Frank, I'm 18 years old, and I've been passionately editing videos for the past 1 year.*
> *To me, editing goes far beyond cuts and captions—it's about truly understanding your vision, welcoming feedback, and refining every detail until the story makes sense.*
> *I love working with creators who are passionate about what they do, putting care and energy into every project to bring your best ideas to life."*

### 2. Preservação dos Destaques da Opção B (`#ff0095`) e Consistência Visual
- **Seção About Me**:
  - Manter a cor `#ff0095` apenas no ponto final do título (`About Me.`) e no subtítulo `@FrankMiind · Video Editor`.
  - O parágrafo da bio ficará 100% limpo (sem palavras soltas coloridas em `#ff0095`).
  - Manter os ícones do **Premiere Pro** e **After Effects** ampliados com fundo branco (`bg-white`), sem borda rosa no Premiere Pro, e posicionados de forma limpa acima da linha divisória.
  - Manter o card `1 Year Editing` em branco (`#f5f6f8`) e o card do **Discord** com o mesmo estilo escuro dos outros botões sociais.
- **Restante do Portfólio (Opção B)**:
  - **Hero**: Kicker `Content Video Editor` e destaque em `YouTubers.` na cor `#ff0095`.
  - **Vídeos (Short-Form & Long-Form)**: Ponto final dos títulos (`Short-Form.`, `Long-Form.`) e badges `YouTube Shorts` / `YouTube Video` em `#ff0095`, com hover branco suave nos cards de vídeo.

### 3. Sincronização de Dados (`portfolioData.ts`)
- Atualizar `bioLine1` e `bioLine2` em `src/data/portfolioData.ts` e em `src/components/AboutSection.tsx` para refletir o novo texto humano de 3 linhas sem quebrar nenhum teste ou componente do projeto.
