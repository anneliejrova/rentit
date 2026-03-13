
async function fetchTestimonials() {
  const allIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const randomIds = allIds.sort(() => Math.random() - 0.5).slice(0, 3);

  const promises = randomIds.map(id =>
    fetch(`https://testimonialapi.vercel.app/api/${id}`)
      .then(res => res.json())
  );

  return Promise.all(promises);
}

// Renders testimonial cards
export async function renderTestimonials() {
  const testimonials = await fetchTestimonials();

  return /*html*/ `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      ${testimonials.map(t => ` 
        <div class="border rounded-lg p-4 shadow-sm">
          <img src="https://i.pravatar.cc/100?img=${t.id}" alt="${t.name}" class="w-12 h-12 rounded-full mb-2">
          <p class="text-gray-600 mt-2">${t.message}</p>
          <p class="text-yellow-500 mt-1">${'⭐'.repeat(t.rating)}</p>
        </div>
      `).join('')}
    </div>
  `;
}