/*
  Warnings:

  - You are about to alter the column `valorItem` on the `PedidosItens` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PedidosItens" (
    "pedidoId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "valorItem" REAL NOT NULL,
    "qtdItem" INTEGER NOT NULL,

    PRIMARY KEY ("pedidoId", "itemId"),
    CONSTRAINT "PedidosItens_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "Pedidos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PedidosItens_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Itens" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PedidosItens" ("itemId", "pedidoId", "qtdItem", "valorItem") SELECT "itemId", "pedidoId", "qtdItem", "valorItem" FROM "PedidosItens";
DROP TABLE "PedidosItens";
ALTER TABLE "new_PedidosItens" RENAME TO "PedidosItens";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
