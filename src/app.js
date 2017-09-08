import 'babel-core/register';
import 'babel-polyfill';
import lf from 'lovefield';
import createItem from './schema';
import seed from './seed';

async function roundTrip() {
  var schemaBuilder = lf.schema.create('todo', 1);
  createItem(schemaBuilder);

  let db = await schemaBuilder.connect();
  let item = db.getSchema().table("Item");

  await seed(db);

  const results = await db.select().from(item).where(item.done.eq(false)).exec();

  results.forEach(function(row) {
    console.log(row['description'], 'before', row['deadline']);
  });
}

roundTrip();
