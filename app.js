import 'babel-core/register';
import 'babel-polyfill';
import lf from 'lovefield';
import bar from './bar';

async function foo() {
  var v = await bar();
  console.log(v);
}

foo();

// ---------------------------------------------------------------------- //

var schemaBuilder = lf.schema.create('todo', 1);

schemaBuilder.createTable('Item').
  addColumn('id', lf.Type.INTEGER).
  addColumn('description', lf.Type.STRING).
  addColumn('deadline', lf.Type.DATE_TIME).
  addColumn('done', lf.Type.BOOLEAN).
  addPrimaryKey(['id']).
  addIndex('idxDeadline', ['deadline'], false, lf.Order.DESC);

let db, item;
(async () => {
  db = await schemaBuilder.connect();

  item = db.getSchema().table("Item");

  const row = item.createRow({
    "id": 1,
    "description": "Get a cup of coffee",
    "deadline": new Date(),
    "done": false
  });

  await db.insertOrReplace().into(item).values([row]).exec();

  const results = await db.select().from(item).where(item.done.eq(false)).exec();

  results.forEach(function(row) {
    console.log(row['description'], 'before', row['deadline']);
  });
})();
