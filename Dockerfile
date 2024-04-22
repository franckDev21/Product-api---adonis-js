# Utilisez l'image officielle de Node.js 16
FROM node:18

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app

# Copiez les fichiers du projet dans le conteneur
COPY . .

# Installez les dépendances du projet
RUN npm install

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
