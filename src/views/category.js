export async function render(route) {
  const response = await fetch('/src/mock_db.json');
  const data = await response.json();

  const category = data.categories.find(c => c.name === route.slug);
  const products = data.products.filter(p => p.categoryIds.includes(category.id));

  return /* html */`
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>${category.name}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>${category.description}</td>
      </tr>
    </table>

    <br>

    <table>
      <tr>
        <th>Name</th>
        <th>Short Description</th>
        <th>Price per Day</th>
        <th>Search Words</th>
      </tr>
      ${products.map(p => `
        <tr>
          <td>${p.name}</td>
          <td>${p.shortDescription}</td>
          <td>${p.pricePerDay}</td>
          <td>${p.searchWords.join(', ')}</td>
        </tr>
      `).join('')}
    </table>
  `;
}