/*
  Warnings:

  - You are about to drop the column `valorFinal` on the `Pedidos` table. All the data in the column will be lost.
  - Made the column `cartaoId` on table `Pedidos` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `valorItem` to the `PedidosItens` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cliente" TEXT NOT NULL,
    "pessoas" INTEGER NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "cartaoId" TEXT NOT NULL,
    CONSTRAINT "Pedidos_cartaoId_fkey" FOREIGN KEY ("cartaoId") REFERENCES "Cartoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedidos" ("ativo", "cartaoId", "cliente", "dataCriacao", "id", "pessoas") SELECT "ativo", "cartaoId", "cliente", "dataCriacao", "id", "pessoas" FROM "Pedidos";
DROP TABLE "Pedidos";
ALTER TABLE "new_Pedidos" RENAME TO "Pedidos";
CREATE TABLE "new_PedidosItens" (
    "pedidoId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "valorItem" INTEGER NOT NULL,
    "qtdItem" INTEGER NOT NULL,

    PRIMARY KEY ("pedidoId", "itemId"),
    CONSTRAINT "PedidosItens_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PedidosItens_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Itens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PedidosItens" ("itemId", "pedidoId", "qtdItem") SELECT "itemId", "pedidoId", "qtdItem" FROM "PedidosItens";
DROP TABLE "PedidosItens";
ALTER TABLE "new_PedidosItens" RENAME TO "PedidosItens";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
