Beslut: Projektet görs som SPA (Single Page Application)
Motivation: För att lära oss hur SPA fungerar innan vi börjar med ramverk som React och senare Angular, vi ansåg det som en bra idé att lära sig SPA innan vi lägger på ramverk för bättre förståelse. Vi var även sugna att göra en sida där vi lätt kan byta renderingar och inte byta mellan olika html-sidor.

---

Beslut: Vi har valt att köra Taiwind + Vite + JavaScript Modules som grund bas
Motivation: Vi uppfattade Modules och Views som bäst för SPA. Vi vill lära oss Tailwind. Vi blev rekomenderade Vite för denna struktur av Tailwind + Vanilla

---

Beslut: Vi har valt en normaliserad datastruktur med en one-to-many-relation mellan våra productTypes (metadata) och products (instanser) för att säkerställa dataintegritet och undvika redundans.
Motivation: Initialt övervägde vi att gruppera produkter per kategori, men insåg att det skapade redundans för produkter med flera kategoritillhörigheter. Genom att separera metadata (productTypes) från de fysiska exemplaren (products) skapar vi en "Single Source of Truth".
Detta för att vår affärslogik ska fungera: Kunden bokar en funktion (t.ex. en symaskin), medan systemet internt kan hantera tillgängligheten för specifika individer (t.ex. en Husqvarna vs. en Singer). Det gör att vi kan visa priser och bilder på typ-nivå, men registrera uthyrning och status på produkt-nivå.

---

Beslut: Vi valde att göra en funktion för all bokning där man kan välja att boka en eller flera med rutor att välja vilka productTypes man vill boka samtidigt istället för att köra två olika vägar en för batch och en för singel bokning. Minuset är att man inte kan boka olika datum vid samma bokning men detta är somewhat löst via att man behåller allt man inte bokar nu och inte slänger i "varukorgen" och kan gå tillbaka och boka dessa för ett annat datum efter att en bokning är klar. Då det handlar om olika boknings datum så måste ändå leverans/upphämtning lösas individuellt. Vid de få tillfällen när någon bokar flera productType med sama dagsleverans men olika längd på bokning så levereras det ändå vid samma tidpunkt och leveranskostnad täcker både leverans och upphämtning så den kvarstår.

---

Beslut: Vi bestämde oss att följa WCAG i så mycket som möjligt, det enda som läggs till listan av "i mån av tid" är tangentbords styrning, att kunna tabba sig igenom sidan, då detta är något vi behöver lära oss bättre och kan bli mer komplicerat i en vanilla SPA.
Motivation: I ett riktigt projekt skulle allt inom WCAG uppfyllas men som studenter måste vi även begränsa vårt arbete på vissa håll för att nå deadline.