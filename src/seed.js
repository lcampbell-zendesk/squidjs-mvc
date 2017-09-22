export default async function seed(db) {
  let item = db.getSchema().table("Item");

  const rows = [{"id": 1, "name": "Taste Javascript", "complete": true},
                {"id": 2, "name": "Buy a unicorn",    "complete": false}];

  return db.insertOrReplace().into(item).values(rows.map((r) => item.createRow(r))).exec();
}
