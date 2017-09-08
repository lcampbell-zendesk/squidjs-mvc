import { Type, Order } from 'lovefield';

export default function schema() {
  const schemaBuilder = lf.schema.create('todo', 1);

  schemaBuilder.createTable('Item').
    addColumn('id', Type.INTEGER).
    addColumn('description', Type.STRING).
    addColumn('deadline', Type.DATE_TIME).
    addColumn('done', Type.BOOLEAN).
    addPrimaryKey(['id']).
    addIndex('idxDeadline', ['deadline'], false, Order.DESC);

  return schemaBuilder;
}
