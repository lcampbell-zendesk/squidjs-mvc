import { Type, Order } from 'lovefield';

var db;

export function schema() {
  const schemaBuilder = lf.schema.create('todo', 1);

  schemaBuilder.createTable('Item').
    addColumn('id',       Type.INTEGER).
    addColumn('name',     Type.STRING).
    addColumn('complete', Type.BOOLEAN).
    addColumn('editing',  Type.BOOLEAN).
    addColumn('new',      Type.BOOLEAN).
    addPrimaryKey(['id'], true);

  return schemaBuilder;
}

export async function initDb() {
  db = await schema().connect();
}

export { db };
