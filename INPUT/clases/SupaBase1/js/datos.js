// Data layer: all Supabase queries live here.
const TABLE = "items"; // change to your table name

async function getItems() {
  const { data, error } = await db.from(TABLE).select("*").order("id");
  if (error) throw error;
  return data;
}

async function createItem(item) {
  const { data, error } = await db.from(TABLE).insert(item).select();
  if (error) throw error;
  return data[0];
}

async function updateItem(id, changes) {
  const { data, error } = await db.from(TABLE).update(changes).eq("id", id).select();
  if (error) throw error;
  return data[0];
}

async function deleteItem(id) {
  const { error } = await db.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
