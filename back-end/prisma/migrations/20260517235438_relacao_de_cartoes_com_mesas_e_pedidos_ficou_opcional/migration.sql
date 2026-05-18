-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cartoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "mesaId" TEXT,
    CONSTRAINT "Cartoes_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "Mesas" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Cartoes" ("id", "mesaId", "numero") SELECT "id", "mesaId", "numero" FROM "Cartoes";
DROP TABLE "Cartoes";
ALTER TABLE "new_Cartoes" RENAME TO "Cartoes";
CREATE TABLE "new_Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cliente" TEXT NOT NULL,
    "pessoas" INTEGER NOT NULL,
    "dataCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "cartaoId" TEXT,
    CONSTRAINT "Pedidos_cartaoId_fkey" FOREIGN KEY ("cartaoId") REFERENCES "Cartoes" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pedidos" ("ativo", "cartaoId", "cliente", "dataCriacao", "id", "pessoas") SELECT "ativo", "cartaoId", "cliente", "dataCriacao", "id", "pessoas" FROM "Pedidos";
DROP TABLE "Pedidos";
ALTER TABLE "new_Pedidos" RENAME TO "Pedidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
