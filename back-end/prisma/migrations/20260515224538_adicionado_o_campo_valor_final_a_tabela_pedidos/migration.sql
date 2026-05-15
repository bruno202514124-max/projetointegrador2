/*
  Warnings:

  - Added the required column `valorFinal` to the `Pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cliente" TEXT NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "valorFinal" REAL NOT NULL,
    "cartaoId" TEXT NOT NULL,
    CONSTRAINT "Pedidos_cartaoId_fkey" FOREIGN KEY ("cartaoId") REFERENCES "Cartoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pedidos" ("ativo", "cartaoId", "cliente", "dataCriacao", "id") SELECT "ativo", "cartaoId", "cliente", "dataCriacao", "id" FROM "Pedidos";
DROP TABLE "Pedidos";
ALTER TABLE "new_Pedidos" RENAME TO "Pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
