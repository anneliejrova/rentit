export function render() {
  return `
    <section aria-labelledby="home-heading">
      <h2 id="home-heading">Rentit huvudsida</h2>
      <nav aria-label="Kategorier">
        <ul>
          <li><a href="#cleaning">Städ</a></li>
          <li><a href="#hobby">Fritid</a></li>
          <li><a href="#kitchen">Kök</a></li>
          <li><a href="#yard">Trädgård</a></li>
          <li><a href="#tools">Bygg</a></li>
        </ul>
      </nav>
    </section>
  `;
}
