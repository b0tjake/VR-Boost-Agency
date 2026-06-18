
** Fonctionnalités implémentées **


Les fonctionnalités actuellement développées dans ce prototype sont :


 Landing Page (Page d’accueil)
 
Présentation de la solution VR Boost Agency
Mise en avant du concept de home staging virtuel
Interface marketing orientée immobilier et mobilier


 Dashboard

Interface principale après connexion (prototype) contenant 3 modules :


Dashboard
Vue globale des activités et accès rapides
Virtual Visits
Gestion et visualisation des visites virtuelles immobilières
Furniture Catalog
Catalogue de mobilier pour le home staging virtuel
Présentation des meubles et éléments décoratifs
 
 # VR Boost Agency

Prototype d'application web pour presenter une solution de home staging virtuel, de gestion de visites immobilieres et de catalogue mobilier.

## Stack utilisee

- React 18 avec TypeScript
- Vite pour le developpement et le build
- React Router pour la navigation SPA
- Tailwind CSS pour le style global
- Radix UI et Lucide React pour certains composants et icones
- Express integre au projet, sans nouvelle API ajoutee pour ce prototype

## Choix realises

- La landing page est integree comme page React sur la route `/`.
- Le dashboard reste accessible via `/dashboard`.
- La landing page initialement fournie en HTML a ete decoupee en composants React pour faciliter la maintenance.
- Les visuels utilisent des images distantes via `api.builder.io` afin de mieux correspondre au contenu immobilier et mobilier.
- Les styles de la landing page sont isoles dans `client/pages/landing/landing.css` pour eviter les conflits avec les autres pages.

## Lancer le projet

```bash
pnpm install
pnpm dev
```

Build de production :

```bash
pnpm build
```

## Limites du prototype

- Les formulaires ne sont pas connectes a un backend.
- Les donnees affichees sont statiques et ne proviennent pas d'une base de donnees.
- Les images sont chargees depuis des URLs externes.
- L'authentification et les roles utilisateurs ne sont pas implementes.
- Certaines pages du dashboard servent encore de maquettes fonctionnelles.
