import { renderTestimonials } from '../components/testimonials.js';

export async function render(route) {
  const testimonials = await renderTestimonials();

  return /*html*/`
    <section aria-labelledby="home-heading">
      <h2 id="home-heading">Rentit huvudsida</h2>
    </section>

    <section class="py-8">
      <h2 class="text-2xl font-bold text-center mb-4">Vad våra kunder säger</h2>
      ${testimonials}
    </section>
  `;
}
