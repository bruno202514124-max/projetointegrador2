-- CreateTable
CREATE TABLE "Itens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "bebida" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cliente" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "cartaoId" TEXT NOT NULL,
    CONSTRAINT "Pedidos_cartaoId_fkey" FOREIGN KEY ("cartaoId") REFERENCES "Cartoes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cartoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "mesaId" TEXT NOT NULL,
    CONSTRAINT "Cartoes_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "Mesas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Mesas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ItensToPedidos" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ItensToPedidos_A_fkey" FOREIGN KEY ("A") REFERENCES "Itens" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ItensToPedidos_B_fkey" FOREIGN KEY ("B") REFERENCES "Pedidos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ItensToPedidos_AB_unique" ON "_ItensToPedidos"("A", "B");

-- CreateIndex
CREATE INDEX "_ItensToPedidos_B_index" ON "_ItensToPedidos"("B");
