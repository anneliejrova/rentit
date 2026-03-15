
export function renderHero() {
  return /*html*/`

<section class="relative min-h-96 overflow-hidden">
  
  <!-- Background pic -->
  <div class="relative w-full h-[75vh]">
  <img 
    src="./img/hero/hero10.png" 
    alt="Hero bakgrund" 
    class="absolute top-0 w-full h-full object-cover"
  />
  
  <!-- Overlay 
  <div class="absolute inset-0 bg-white/0">
  </div>-->
  
  <!-- Inner text -->
  <div class="absolute top-16 left-16 px-24 py-16 w-[50vw] bg-white/50 shadow-lg">
<h1 class="text-3xl font-bold font-serif leading-relaxed">Allt du behöver -</h1>
<p class="text-2xl leading-relaxed font-serif"><em>när du behöver det</em></p><br>
<p class="text-lg/7">Hyr verktyg, köksredskap, trädgårdsmaskiner och mycket annat. Spara pengar, minska utsläpp och slipp problemet att förvara saker du bara använder en gång om året.</p>
<button class="bg-stone-700 text-white px-8 py-3 rounded text-sm tracking-wide hover:opacity-80 transition-opacity cursor-pointer m-8">Så här fungerar det</button>
</div
 </section>
`;
}