export default async function seed(db) {
  let item = db.getSchema().table("Item");

  const row = item.createRow({
    "id": 1,
    "description": "Get a cup of coffee",
    "deadline": new Date(),
    "done": false
  });

  return db.insertOrReplace().into(item).values([row]).exec();
}
