# Design System — Portfolio Personal

Estética: **Cosmic Dark Navy — Cinematic Editorial**
Referencia visual: Creative Mints — Portfolio / Animation (Simon Sparks)

---

## Tokens CSS

Todos los tokens están en `src/styles/tokens.css` como CSS custom properties.
Úsalos siempre a través de `var(--token-name)`. Nunca valores hardcoded.

---

## Colores

### Base — Navy profundo

El fondo NO es negro puro. Es un azul marino oscuro que da profundidad cósmica.

| Token                      | Valor     | Uso                                      |
|----------------------------|-----------|------------------------------------------|
| `--color-bg`               | `#0B1929` | Fondo principal de la página             |
| `--color-surface`          | `#0F2035` | Cards, paneles, superficies              |
| `--color-surface-elevated` | `#152840` | Tooltips, popovers, elementos flotantes  |
| `--color-border`           | `#1E3A55` | Bordes estándar                          |
| `--color-border-subtle`    | `#152438` | Separadores, bordes muy tenues           |

### Texto

| Token                    | Valor                    | Uso                           |
|--------------------------|--------------------------|-------------------------------|
| `--color-text-primary`   | `#FFFFFF`                | Headings, nombre hero         |
| `--color-text-secondary` | `rgba(255,255,255,0.55)` | Texto de apoyo, subtítulos    |
| `--color-text-muted`     | `rgba(255,255,255,0.30)` | Labels, contadores, metadata  |
| `--color-text-inverse`   | `#0B1929`                | Texto sobre fondo de acento   |

### Acento — Ámbar cálido

El color de acento es **cálido**, contrastando con el frío del fondo navy. Se usa en
nav links (ABOUT, WORK...), labels destacados ("GENERATIVE DESIGN"), y CTAs.

| Token                  | Valor                   | Uso                                   |
|------------------------|-------------------------|---------------------------------------|
| `--color-accent`       | `#E8952A`               | Nav links, labels accent, CTAs        |
| `--color-accent-hover` | `#F5AE4D`               | Estado hover                          |
| `--color-accent-dim`   | `rgba(232,149,42,0.12)` | Fondos con tono acento                |
| `--color-accent-glow`  | `rgba(232,149,42,0.30)` | Glows de Three.js, sombras luminosas  |

> **Regla de acento:** Aparece en nav links y labels de categoría ("ILLUSTRATION",
> "GENERATIVE DESIGN"). Nunca en bloques de texto largo.

### Gradiente del objeto 3D (referencia Three.js)

El torus/objeto hero usa un gradiente de frío a cálido:

| Token               | Valor     | Posición en gradiente          |
|---------------------|-----------|--------------------------------|
| `--color-3d-blue`   | `#2563EB` | Exterior izquierdo             |
| `--color-3d-blue-light` | `#60A5FA` | Transición azul              |
| `--color-3d-orange` | `#F97316` | Centro — punto de inflexión   |
| `--color-3d-pink`   | `#EC4899` | Interior cálido               |
| `--color-3d-magenta`| `#D946EF` | Interior profundo             |

---

## Tipografía

### Familias

| Variable         | Familia             | Fuente                                       | Uso                          |
|------------------|---------------------|----------------------------------------------|------------------------------|
| `--font-display` | Cormorant Garamond  | fonts.google.com/specimen/Cormorant+Garamond | Hero name, títulos grandes   |
| `--font-body`    | DM Sans             | fonts.google.com/specimen/DM+Sans            | Nav, body copy, UI           |
| `--font-mono`    | JetBrains Mono      | fonts.google.com/specimen/JetBrains+Mono     | Contadores (01→), código     |

> **Por qué Cormorant Garamond:** Es el serif bold condensado más cercano al
> display tipográfico de la referencia. Usar en peso **800 (ExtraBold)** para
> el nombre hero y **600 (SemiBold)** para títulos de sección.

### Jerarquía de uso

```
--font-display + --weight-extrabold + --text-display  →  Nombre hero ("EMMA GRANADOS")
--font-body    + --weight-medium    + --text-xs        →  Nav items en all-caps ("ABOUT")
--font-body    + --weight-medium    + --text-sm        →  Labels accent ("ILLUSTRATION")
--font-body    + --weight-regular   + --text-base      →  Texto de cuerpo
--font-mono    + --weight-regular   + --text-xs        →  Contadores ("01 ──→")
```

### Escala de tamaños (fluid)

| Token             | Rango aprox.   | Uso sugerido                     |
|-------------------|----------------|----------------------------------|
| `--text-xs`       | 11–13px        | Nav all-caps, contadores, badges |
| `--text-sm`       | 14–16px        | Labels de categoría              |
| `--text-base`     | 16–18px        | Texto de cuerpo                  |
| `--text-lg`       | 18–22px        | Lead text                        |
| `--text-xl`       | 20–26px        | Subtítulos de sección            |
| `--text-2xl`      | 24–32px        | Títulos de card                  |
| `--text-3xl`      | 32–48px        | Títulos de sección               |
| `--text-4xl`      | 40–72px        | Títulos de página secundaria     |
| `--text-5xl`      | 56–112px       | Títulos hero grandes             |
| `--text-display`  | 72–176px       | Nombre hero cinematográfico      |

### Letter spacing — reglas clave

- **Display / hero name:** `--tracking-tight` o `--tracking-tighter`
- **Labels all-caps pequeños** ("ILLUSTRATION", "ABOUT"): `--tracking-widest`
- **Body copy:** `--tracking-normal`

---

## Espaciado

Escala base **4px**. Nunca usar valores hardcoded.

| Token        | Valor  |
|--------------|--------|
| `--space-1`  | 4px    |
| `--space-2`  | 8px    |
| `--space-3`  | 12px   |
| `--space-4`  | 16px   |
| `--space-5`  | 20px   |
| `--space-6`  | 24px   |
| `--space-8`  | 32px   |
| `--space-10` | 40px   |
| `--space-12` | 48px   |
| `--space-16` | 64px   |
| `--space-20` | 80px   |
| `--space-24` | 96px   |
| `--space-32` | 128px  |
| `--space-40` | 160px  |
| `--space-48` | 192px  |
| `--space-64` | 256px  |

---

## Layout

```
--container-max:     1400px
--container-padding: clamp(1.5rem, 5vw, 5rem)
--grid-cols:         12
--grid-gap:          clamp(1rem, 2vw, 1.5rem)
```

### Nav layout (referencia)

```
[ABOUT]  [WORK]     [LOGO]     [SKIP]  [CONTACT]
  left    left      center      right     right
```

Nav absolutamente posicionada sobre el canvas 3D. Items en all-caps, `--text-xs`,
`--tracking-widest`, `--font-body`. Los links de la izquierda y derecha en
`--color-accent`, el logo en `--color-text-primary` o accent.

### Breakpoints

| Alias | Valor  |
|-------|--------|
| xs    | 375px  |
| sm    | 640px  |
| md    | 768px  |
| lg    | 1024px |
| xl    | 1280px |
| 2xl   | 1536px |

---

## Border Radius

| Token           | Valor    | Uso                              |
|-----------------|----------|----------------------------------|
| `--radius-sm`   | 4px      | Badges, chips pequeños           |
| `--radius-md`   | 8px      | Inputs, botones compactos        |
| `--radius-lg`   | 16px     | Cards                            |
| `--radius-xl`   | 24px     | Cards grandes, modales           |
| `--radius-2xl`  | 32px     | Hero cards, elementos destacados |
| `--radius-full` | 9999px   | Pills, avatars                   |

---

## Sombras

| Token              | Uso                                            |
|--------------------|------------------------------------------------|
| `--shadow-sm`      | Elevación mínima                               |
| `--shadow-md`      | Cards, dropdowns                               |
| `--shadow-lg`      | Modales, popovers                              |
| `--shadow-xl`      | Elementos hero, overlays                       |
| `--shadow-accent`  | Glow del acento ámbar en botones/links         |
| `--shadow-glow`    | Glow intenso para efectos luminosos            |
| `--shadow-3d-blue` | Iluminación azul del torus en Three.js         |
| `--shadow-3d-warm` | Iluminación cálida del torus en Three.js       |

---

## Animaciones

### Duraciones

| Token                | Valor  | Uso                                |
|----------------------|--------|------------------------------------|
| `--duration-instant` | 50ms   | Micro-feedbacks                    |
| `--duration-fast`    | 150ms  | Hover, focus states                |
| `--duration-normal`  | 300ms  | Transiciones de UI estándar        |
| `--duration-slow`    | 600ms  | Slide-ins, transiciones de sección |
| `--duration-slower`  | 1000ms | Animaciones de reveal de texto     |
| `--duration-slowest` | 1500ms | Intro del hero, rotación 3D        |

### Curvas de easing

| Token                  | Curva                             | Sensación                  |
|------------------------|-----------------------------------|----------------------------|
| `--ease-out-expo`      | `cubic-bezier(0.16,1,0.30,1)`    | Snappy — default para UI   |
| `--ease-in-expo`       | `cubic-bezier(0.70,0,0.84,0)`    | Aceleración dramática      |
| `--ease-in-out-expo`   | `cubic-bezier(0.87,0,0.13,1)`    | Cinematográfico — slides   |
| `--ease-spring`        | `cubic-bezier(0.34,1.56,0.64,1)` | Elástico — hover de logo   |
| `--ease-out-cubic`     | `cubic-bezier(0.33,1,0.68,1)`    | Suave — reveals de texto   |
| `--ease-in-out-cubic`  | `cubic-bezier(0.65,0,0.35,1)`    | Equilibrado                |

---

## Z-Index

| Token          | Valor | Uso                             |
|----------------|-------|---------------------------------|
| `--z-canvas`   | -1    | Canvas de Three.js (background) |
| `--z-base`     | 0     | Flujo normal                    |
| `--z-raised`   | 10    | Cards con elevación             |
| `--z-dropdown` | 100   | Menús desplegables              |
| `--z-sticky`   | 200   | Nav fija sobre el canvas        |
| `--z-overlay`  | 300   | Overlays de pantalla            |
| `--z-modal`    | 400   | Modales, dialogs                |
| `--z-toast`    | 500   | Notificaciones toast            |

---

## Principios de diseño

1. **Navy, no negro** — `#0B1929` da profundidad cósmica. El negro puro aplana.
2. **Contraste cálido/frío** — El acento ámbar `#E8952A` dialoga con el navy frío. Es la tensión visual que hace interesante el diseño.
3. **El serif es el protagonista** — Cormorant Garamond en tamaño display es el elemento visual más poderoso. Protegerlo con espacio y limpieza.
4. **All-caps con alma** — Los labels pequeños en all-caps y tracking amplio (`--tracking-widest`) son la firma tipográfica del estilo.
5. **El 3D ocupa el espacio** — El canvas de Three.js es el fondo real de la página. La UI vive encima de él con `position: fixed/absolute`.
6. **Menos UI, más impacto** — La nav es mínima, el contenido es escaso. El objeto 3D y el nombre son suficientes para el hero.

---

## Fuentes a instalar

Integrar como fuentes locales en `src/fonts/` para evitar FOUT y maximizar performance:

- **Cormorant Garamond** (weights: 600, 700, 800) → fonts.google.com/specimen/Cormorant+Garamond
- **DM Sans** (weights: 400, 500) → fonts.google.com/specimen/DM+Sans
- **JetBrains Mono** (weight: 400) → fonts.google.com/specimen/JetBrains+Mono
