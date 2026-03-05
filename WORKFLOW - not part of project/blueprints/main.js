import "./style.css";

const app = document.querySelector("#app");

// DEFINE VIEWS
const routes = {
  "/": {
    title: "Rentit",
    description: "Rentit- en app att hyra ",
    render: () => `
      <main class=" ">
        
      </main>
    `,
  },
  "/om-oss": {
    /*run view-component 

    add in every view: 
    const announcer = document.getElementById('announcer');
    announcer.textContent = `Navigerade till ${routes[path].title}`;
    }*/
  },
};

// NAVIGATION
function navigate(path) {
  const route = routes[path] || routes["/"];

  //UPDATE URL
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }

  // SEO: update: Titel and Meta
  document.title = route.title;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", route.description);

  // INJECT HTML
  app.innerHTML = route.render();

  // eventlisteners for buttons after they have been created in browser
  if (path === "/") {
    document
      .getElementById("btn-click")
      ?.addEventListener("click", () => alert("Hej!"));
  }
}

// 3. GLOBAL CLICK LISTENER
document.addEventListener("click", (e) => {
  // if link with data-link attribute is clicked
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    const href = link.getAttribute("href");
    navigate(href);
  }
});

// 4. BACK AND FORWARD BUTTONS
window.addEventListener("popstate", () => {
  navigate(window.location.pathname);
});

// START APP
navigate(window.location.pathname);


------------
Views screenreaders:

aria-labelledby behövs bara på <section> för att ge den ett namn. Allt innehåll inuti – <p>, <ul>, <img> osv. – sköter sig själva utan extra aria-attribut så länge du använder semantisk HTML.

<section aria-labelledby="about-heading">  ← "mitt namn finns på id=about-heading"
  <h2 id="about-heading">About us</h2>     ← skärmläsaren läser "About us"
</section>