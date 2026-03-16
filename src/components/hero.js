export function renderHero() {
  return /*html*/`

<section class="relative overflow-hidden">
  
  <!-- Background pic -->
  <div class="relative w-full h-[50vh] sm:h-[60vh] md:h-[75vh]">
  <img 
    src="./img/hero/hero10.png" 
    alt="Hero bakgrund" 
    class="absolute top-0 w-full h-full object-cover"
  />
  
  <!-- Inner text -->
  <div class="absolute top-4 md:top-16 
               left-1/2 -translate-x-1/2
               md:left-16 md:translate-x-0
               px-4 md:px-0">
    <div class="px-5 py-6 sm:px-10 sm:py-10 md:px-24 md:py-16 
                w-[90vw] sm:w-[75vw] md:w-[50vw] max-w-2xl
                bg-white/50 shadow-lg">
      <h1 class="text-xl sm:text-2xl md:text-3xl font-bold font-serif leading-relaxed">Allt du behöver -</h1>
      <p class="text-lg sm:text-xl md:text-2xl leading-relaxed font-serif"><em>när du behöver det</em></p><br>
      <p class="text-sm sm:text-base md:text-lg leading-7">Hyr verktyg, köksredskap, trädgårdsmaskiner och mycket annat. Spara pengar, minska utsläpp och slipp problemet att förvara saker du bara använder en gång om året.</p>
      <button onclick="document.getElementById('info-section').scrollIntoView({behavior: 'smooth'})" 
              class="bg-stone-700 text-white px-6 py-2 sm:px-8 sm:py-3 rounded text-sm tracking-wide hover:opacity-80 transition-opacity cursor-pointer mt-5 sm:mt-6 sm:m-8">
        Så bokar du
      </button>
    </div>
  </div>
</section>
`;
}