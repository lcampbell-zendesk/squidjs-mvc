import lf from 'lovefield';

export default function createItem(schemaBuilder) {
  return schemaBuilder.createTable('Item').
           addColumn('id', lf.Type.INTEGER).
           addColumn('description', lf.Type.STRING).
           addColumn('deadline', lf.Type.DATE_TIME).
           addColumn('done', lf.Type.BOOLEAN).
           addPrimaryKey(['id']).
           addIndex('idxDeadline', ['deadline'], false, lf.Order.DESC);
}
