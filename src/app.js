import schema from './schema';
import seed from './seed';
import domvm from 'domvm';

async function roundTrip() {
  const db = await schema().connect();
  await seed(db);

  const item = db.getSchema().table("Item");
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
