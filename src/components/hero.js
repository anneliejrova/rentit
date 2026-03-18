// Renders the hero section with a background image, headline text and a call-to-action button
export function renderHero() {
  return /*html*/`

<section class="relative overflow-hidden">
  
  <!-- Background pic -->
  <div class="relative h-[40vw] sm:h-[60vh] md:h-[60vh]">
  <img
    src="./img/hero/hero10.png" 
    alt="Hero bakgrund" 
    class="absolute top-0 w-full h-full object-cover"
  />
  
  <!-- Inner text -->
  <div class="absolute inset-0 flex items-center px-4 md:px-16">
  <div class="px-4 py-4 sm:px-10 sm:py-8 md:px-16 md:py-12 
              w-[85vw] sm:w-[65vw] md:w-[60vw] max-w-2xl
              bg-white/50 shadow-lg">
    <h1 class="text-base sm:text-xl md:text-3xl font-bold font-serif leading-relaxed text-center">Allt du behöver -</h1>
    <p class="text-sm sm:text-lg md:text-2xl leading-relaxed font-serif text-center"><em>när du behöver det</em></p><br>
    <p class="hidden sm:block text-sm sm:text-base md:text-lg leading-7">Hyr verktyg, köksredskap, trädgårdsmaskiner och mycket annat. Spara pengar, minska utsläpp och slipp problemet att förvara saker du bara använder en gång om året.</p>
      <button onclick="document.getElementById('info-section').scrollIntoView({behavior: 'smooth'})" 
              class="bg-stone-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded text-sm tracking-wide hover:opacity-80 transition-opacity cursor-pointer mt-5 sm:mt-6 sm:m-8 block mx-auto">
        Så bokar du
      </button>
    </div>
  </div>
</section>
`;
}