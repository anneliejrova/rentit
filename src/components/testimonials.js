import { escapeHtml } from '../utils/helpers.js';

// Fetches 3 random testimonials from the API. Creates an array of all available IDs, then shuffles them randomly and picks the first 3 to ensure no duplicate testimonials are shown.
async function fetchTestimonials() {
  const allIds = [1, 2, 3, 5, 6, 7, 8, 9, 10]; // ID 4 is terribly wrong translated, so we skip it to avoid laughter
  const randomIds = allIds.sort(() => Math.random() - 0.5).slice(0, 3);

  // Maps over the 3 random IDs and creates a fetch request for each one, converting the response to JSON. Returns an array of promises that all run simultaneously.
  const promises = randomIds.map(id =>
    fetch(`https://testimonialapi.vercel.app/api/${id}`)
      .then(res => res.json())
  );

  // Waits for all fetch requests to complete and returns the results as an array
  return Promise.all(promises);
}

// Renders the testimonial cards. Fetches all testimonials, then translates each message to Swedish simultaneously using Promise.all. The spread operator (...t) copies all original testimonial data and replaces only the message with the translated version.
export async function renderTestimonials() {
  try {
    const testimonials = await fetchTestimonials();

    const translated = await Promise.all(
      testimonials.map(async (t) => ({
        ...t,
        message: await translateToSwedish(t.message),
      }))
    );

    // Returns the HTML for the testimonials section. Maps over the translated testimonials and builds a card for each one displaying the avatar, name, message and star rating. The join('') combines all cards into a single string. The grid layout shows one column on mobile and three columns on desktop.
    return /*html*/ `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      ${translated.map(t => /*html*/`
        <div class="border rounded-lg p-4 shadow-sm">
            <img src="https://i.pravatar.cc/100?img=${escapeHtml(String(t.id))}" alt="${escapeHtml(t.name)}" class="w-12 h-12 rounded-full mb-2">
            <p class="font-bold">${escapeHtml(t.name)}</p>
            <p class="mt-2 line-clamp-3">${escapeHtml(t.message)}</p>
            <p class="text-yellow-500 mt-1">${'⭐'.repeat(t.rating)}</p>
        </div>
        `).join('')}
      </div>
    `;
  } 
    // If anything in the try block fails, catches the error and logs it to the console. Returns a fallback HTML message in Swedish informing the user that the reviews could not be  loaded and to try again later.
    catch (error) {
    console.error("Could not load testimonials:", error);
    return /*html*/ `
      <div class="p-4 text-center">
        <p>Kunde inte ladda recensioner just nu. Försök igen senare.</p>
      </div>
    `;
  }
}

// Translates a text string from English to Swedish using the MyMemory API. Encodes the text to handle special characters in the URL, then returns the translated text. If the translation fails, logs the error and returns the original English text as a fallback.
async function translateToSwedish(text) {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|sv`
    );
    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error("Could not translate text:", error);
    return text; // Returns original English text if translation fails
  }
}