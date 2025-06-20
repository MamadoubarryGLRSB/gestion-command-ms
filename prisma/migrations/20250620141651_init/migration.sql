-- CreateEnum
CREATE TYPE "StatusCommande" AS ENUM ('EN_ATTENTE', 'CONFIRMEE', 'EN_PREPARATION', 'PRETE', 'LIVREE', 'ANNULEE');

-- CreateEnum
CREATE TYPE "CategorieMenu" AS ENUM ('ENTREE', 'PLAT_PRINCIPAL', 'DESSERT', 'BOISSON');

-- CreateTable
CREATE TABLE "menus" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "prix" DOUBLE PRECISION NOT NULL,
    "categorie" "CategorieMenu" NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commandes" (
    "id" TEXT NOT NULL,
    "numero_commande" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "status" "StatusCommande" NOT NULL DEFAULT 'EN_ATTENTE',
    "total" DOUBLE PRECISION NOT NULL,
    "adresse" TEXT,
    "telephone" TEXT,
    "commentaires" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commandes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commande_items" (
    "id" TEXT NOT NULL,
    "commande_id" TEXT NOT NULL,
    "menu_id" TEXT NOT NULL,
    "quantite" INTEGER NOT NULL DEFAULT 1,
    "prix" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commande_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "commandes_numero_commande_key" ON "commandes"("numero_commande");

-- AddForeignKey
ALTER TABLE "commande_items" ADD CONSTRAINT "commande_items_commande_id_fkey" FOREIGN KEY ("commande_id") REFERENCES "commandes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "commande_items" ADD CONSTRAINT "commande_items_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
