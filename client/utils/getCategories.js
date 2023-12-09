// get all categories
const query = await fetch("/api/category", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});

var categories;

// don't do anything if query is bad
if (query.ok) {
  const response = await query.json();

  categories = response.map(function (category) { return { id: category._id, name: category.name } })
}

export default categories;
