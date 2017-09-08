import 'babel-core/register';
import 'babel-polyfill';
import lf from 'lovefield';
import createItem from './schema';
import seed from './seed';
import domvm from 'domvm';

async function roundTrip() {
  const schemaBuilder = lf.schema.create('todo', 1);
  createItem(schemaBuilder);

  const db = await schemaBuilder.connect();
  const item = db.getSchema().table("Item");

  await seed(db);

  const results = await db.select().from(item).where(item.done.eq(false)).exec();

  results.forEach(function(row) {
    console.log(row['description'], 'before', row['deadline']);
  });
}

roundTrip();

function ui() {
  const el = domvm.defineElement;

  function HelloView(vm, data) {
    return el("h1", {style: "color: red;"}, "Hello " + data.name);
  }

  const data = {name: "Leon"};

  domvm.createView({render: HelloView}, data).mount(document.body);
}

ui();
