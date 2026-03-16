import { renderTestimonials } from '../components/testimonials.js';
import { renderHero } from '../components/hero.js';
import { renderValues } from '../components/values.js';
import { renderHowTo } from '../components/howTo.js';

export async function render(route) {
  const testimonials = await renderTestimonials();

  return /*html*/`
    <section>${renderHero()}</section>
    
    <!--<section aria-labelledby="home-heading">
      <h2 id="home-heading">Rentit huvudsida</h2>
    </section>-->

    <section>${renderValues()}</section>

    <section class="py-8" id="info-section">
      <h2 class="text-2xl font-bold text-center mb-4">Vad våra kunder säger</h2>
      ${testimonials}
    </section>

   
    <section >
    ${renderHowTo()}
    </section>
   
  `;
}
