
async function fetchTestimonials() {
  const randomIds = [
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1,
  ];

  const promises = randomIds.map(id =>
    fetch(`https://testimonialapi.vercel.app/api/${id}`)
      .then(res => res.json())
  );

  return Promise.all(promises);
}

// Renders testimonial cards
export async function renderTestimonials() {
  const testimonials = await fetchTestimonials();

  /*
  const translated = await Promise.all(
    testimonials.map(async (t) => ({
      ...t,
      message: await translateToSwedish(t.message),
    }))
  );
  translated (instead of testimonial under return)
  */

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

/*
// Translates text from English to Swedish using MyMemory API
async function translateToSwedish(text) {
  const response = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|sv`
  );
  const data = await response.json();
  return data.responseData.translatedText;
}*/