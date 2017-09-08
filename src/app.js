import 'babel-core/register';
import 'babel-polyfill';
import lf from 'lovefield';
import createItem from './schema';
import seed from './seed';
import domvm from 'domvm';

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

function ui() {
  var el = domvm.defineElement;

  var HelloView = {
    render: function(vm, data) {
      return el("h1", {style: "color: red;"}, "Hello " + data.name);
    }
  };

  var data = {name: "Leon"};

  domvm.createView(HelloView, data).mount(document.body);
}

ui();
