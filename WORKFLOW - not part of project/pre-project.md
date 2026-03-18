# Pre-Project beslut

Dessa beslut fattades innan vi startat upp vårt GitHub projects och började koda så vi lägger dem i en sammlad fil för dokumentering.

---

### Beslut:
 Projektet görs som SPA (Single Page Application)
### Motivering:
För att lära oss hur SPA fungerar innan vi börjar med ramverk som React och senare Angular, vi ansåg det som en bra idé att lära sig SPA innan vi lägger på ramverk för bättre förståelse. Vi var även sugna att göra en sida där vi lätt kan byta renderingar och inte byta mellan olika html-sidor.

<br>

---

### Beslut: 
Taiwind + Vite + JavaScript Components/modulesdules som grundbas.
### Motivering:
Vi uppfattade JS Components och Views som bäst för SPA. Vi vill lära oss Tailwind och blev rekomenderade Vite för denna struktur av Tailwind + Vanilla

<br>

---

### Beslut: 
Normaliserad datastruktur med en one-to-many-relation mellan våra productTypes (metadata) och products (instanser) för att säkerställa dataintegritet och undvika redundans.
### Motivering:
Initialt övervägde vi att gruppera produkter per kategori, men insåg att det skapade redundans för produkter med flera kategoritillhörigheter. Genom att separera metadata (productTypes) från de fysiska exemplaren (products) skapar vi en "Single Source of Truth".

Detta för att vår affärslogik ska fungera: Kunden bokar en funktion (t.ex. en symaskin), medan systemet internt kan hantera tillgängligheten för specifika individer (t.ex. en Husqvarna vs. en Singer). Det gör att vi kan visa priser och bilder på typ-nivå, men registrera uthyrning och status på produkt-nivå.

<br>

---

### Beslut:
Batch bokning möjlighet
### Motivation:
Vi ville komma ifrån att kunden själv ska behöva kontrollera tilgänglighet för varje enskillt föremål innan bokning. De flesta sidor vi sett för privatkunder är sämmre på detta.

<br>

---

### Beslut: 
Kombinerad single och batch bokning med datumväljare i "varukorg".

### Motivering:
Vi väljer att göra en funktion för all bokning där man kan välja att boka en eller flera produkter i varukorgen med kryss-rutor att välja vilka produkter man vill boka samtidigt istället för att köra två olika vägar, boka eller skapa batch när man lägger till produkter. Minuset är att man nu inte kan boka olika produkter till olika datum i samma bokning. Vår "lösning" är just kryss-rutorna - Det kunden inte bokar nu (urkryssade produkter) stannar i "varukorgen" så att de lätt kan gå tillbaka och boka dessa för ett annat datum efter att en bokning är klar. 

Då det handlar om olika boknings datum så måste ändå leverans/upphämtning lösas individuellt. Vid de få tillfällen när någon bokar flera produkter med olika längd på bokning men med sama dagsleverans så levereras allt ändå vid samma tidpunkt och leveranskostnad täcker både leverans och upphämtning så den kvarstår.

Orsaken är att göra det enklare för användare, på det här sättet används samma funktion oavsett antal och valet baseras på på mest förväntade användning med acceptans för "edge cases".

<br>

---


### Beslut:
Lägga till buffer-dagar till varje bokning.
### Motivering:
För att företaget ska ha tid att se över, rengöra och möjligtvis åtgärda produkter innan nästa uthyrning.

<br>

---