/*
  Warnings:

  - You are about to drop the `Cartoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Itens` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mesas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pedidos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ItensToPedidos` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Cartoes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Itens";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Mesas";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Pedidos";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Usuario";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_ItensToPedidos";
PRAGMA foreign_keys=on;
