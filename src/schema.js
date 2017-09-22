import { Type, Order } from 'lovefield';

export default function schema() {
  const schemaBuilder = lf.schema.create('todo', 1);

  schemaBuilder.createTable('Item').
    addColumn('id', Type.INTEGER).
    addColumn('name', Type.STRING).
    addColumn('complete', Type.BOOLEAN).
    addPrimaryKey(['id'], true);

  return schemaBuilder;
}
