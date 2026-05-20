-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cliente" TEXT NOT NULL,
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
