/*
  Warnings:

  - You are about to drop the `_ItensToPedidos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pessoas` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "_ItensToPedidos_B_index";

-- DropIndex
DROP INDEX "_ItensToPedidos_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ItensToPedidos";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PedidosItens" (
    "pedidoId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "qtdItem" INTEGER NOT NULL,

    PRIMARY KEY ("pedidoId", "itemId"),
    CONSTRAINT "PedidosItens_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PedidosItens_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Itens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cliente" TEXT NOT NULL,
    "pessoas" INTEGER NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "valorFinal" REAL NOT NULL,
    "cartaoId" TEXT,
    CONSTRAINT "Pedidos_cartaoId_fkey" FOREIGN KEY ("cartaoId") REFERENCES "Cartoes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pedidos" ("ativo", "cartaoId", "cliente", "dataCriacao", "id", "valorFinal") SELECT "ativo", "cartaoId", "cliente", "dataCriacao", "id", "valorFinal" FROM "Pedidos";
DROP TABLE "Pedidos";
ALTER TABLE "new_Pedidos" RENAME TO "Pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
