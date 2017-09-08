import schema from './schema';
import seed from './seed';
import domvm from 'domvm';

const el = domvm.defineElement;

function ItemList(vm, data) {
  return (
    el("div", [
      data.length == 0
        ? el("p", "None")
        : el("ul", data.map((item) => el("li", item.description)))
    ])
  );
}

async function main() {
  // LOVEFIELD
  const db = await schema().connect();
  const item = db.getSchema().table("Item");
  const query = db.select().from(item).where(item.done.eq(false));

  // DOMVM
  const vm = domvm.createView({render: ItemList}, []).mount(document.body);

  // BOTH
  async function updateDomvm(changes) {
    const results = await query.exec();
    vm.update(results, false);
    console.log(results);
  }

  db.observe(query, updateDomvm);

  seed(db);
}

main();
