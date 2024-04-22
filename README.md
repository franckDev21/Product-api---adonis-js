# E-Commerce API

Bienvenue dans la documentation de l'API E-Commerce. Cette API vous permet de gérer les produits, les catégories et les paniers pour une application de commerce électronique.

## Getting Started

Pour commencer à utiliser l'API E-Commerce, suivez les étapes ci-dessous :

### Installation

1. Assurez-vous d'avoir Node.js et npm installés sur votre machine.
2. Clonez ce dépôt : git clone <https://github.com/franckDev21/Product-api---adonis-js.git>
3. Accédez au répertoire du projet : cd Product-api---adonis-js
4. Installez les dépendances du projet : pnpm install (ou npm install ou yarn install)


### Configuration

1. Créez un fichier `.env` à la racine du projet et configurez les variables d'environnement nécessaires en suivant le modèle du fichier `.env.example`.

### Démarrage du serveur

1. Démarrez le serveur en mode développement : pnpm run dev (ou npm run dev ou yarn run dev)

2. L'API sera disponible à l'adresse `http://localhost:8000`.

### Utilisation de l'API

Consultez la documentation ci-dessous pour connaître les endpoints disponibles et leurs fonctionnalités.

## Endpoints

### Authentification

- `POST /api/v1/auth/login` : Authentification de l'utilisateur.
- `POST /api/v1/auth/register` : Inscription d'un nouvel utilisateur.
- `DELETE /api/v1/auth/logout` : Déconnexion de l'utilisateur (nécessite une authentification).

### Profil Utilisateur

- `GET /api/v1/user-info` : Récupération des informations sur l'utilisateur connecté (nécessite une authentification).

### Produits

- `GET /api/v1/products` : Récupération de la liste des produits.
- `POST /api/v1/products` : Ajout d'un nouveau produit (nécessite une authentification).
- `PATCH /api/v1/products/:id` : Mise à jour des informations d'un produit spécifique (nécessite une authentification).
- `GET /api/v1/products/search` : Recherche de produits par mots-clés (nécessite une authentification).
Exemple: `http://localhost:8000/api/v1/products/search?q=Appl&limit=5`

### Catégories

- `GET /api/v1/categories` : Récupération de la liste des catégories.
- `POST /api/v1/categories` : Ajout d'une nouvelle catégorie (nécessite une authentification).
- `PATCH /api/v1/categories/:id` : Mise à jour des informations d'une catégorie spécifique (nécessite une authentification).

### Paniers

- `GET /api/v1/carts` : Récupération du contenu du panier de l'utilisateur connecté (nécessite une authentification).
- `POST /api/v1/carts` : Ajout d'un nouveau produit au panier de l'utilisateur connecté (nécessite une authentification).

