# 🍽️ Service de Commandes - API Restaurant

API NestJS pour la gestion des commandes et du menu d'un système de restaurant.

## 🚀 Démarrage rapide

### 1. Installation
```bash
npm install
cp .env.example .env
```

### 2. Base de données
```bash
docker-compose up -d
npx prisma migrate dev
```

### 3. Lancement
```bash
npm run start:dev
```

## 📡 API Endpoints

### 📖 Menu
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/menu` | Lister tous les plats |
| GET | `/menu?categorie=PLAT_PRINCIPAL` | Filtrer par catégorie |
| POST | `/menu` | Créer un plat |
| PATCH | `/menu/:id` | Modifier un plat |
| DELETE | `/menu/:id` | Supprimer un plat |

### 🛒 Commandes
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/commandes` | Lister toutes les commandes |
| GET | `/commandes/:id` | Détail d'une commande |
| POST | `/commandes` | Créer une commande |
| PATCH | `/commandes/:id/status` | Changer le statut pour informer les services concernés |

## 📝 Exemples

### Créer une commande
```bash
POST /commandes
{
  "clientId": "client-123",
  "items": [
    { "menuId": "menu-id", "quantite": 2 }
  ],
  "adresse": "123 rue de la Paix",
  "telephone": "0123456789"
}
```

### Test avec curl
```bash
# Voir le menu
curl http://localhost:3001/menu

# Créer une commande
curl -X POST http://localhost:3001/commandes \
  -H "Content-Type: application/json" \
  -d '{"clientId":"test","items":[{"menuId":"id","quantite":1}]}'
```

## 🌐 URLs importantes

- **API** : http://localhost:3001
- **Documentation Swagger** : http://localhost:3001/api/docs


## 📊 Statuts de commande

- `EN_ATTENTE` (par défaut)
- `CONFIRMEE`
- `EN_PREPARATION`
- `PRETE`
- `LIVREE`
- `ANNULEE`

