<script lang="ts">
  import { onMount } from "svelte";
  import Button from "../ui/Button.svelte";

  let isMenuOpen = $state(false);
  let activeSection = $state("");
  let isNavbarVisible = $state(true);

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  function handleNavClick(sectionId: string) {
    activeSection = sectionId;
    isMenuOpen = false;
  }

  onMount(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    let lastScrollY = window.scrollY;
    let ticking = false;
    let latestScrollY = window.scrollY;
    let sectionBounds: Array<{ id: string; top: number; bottom: number }> = [];

    const recalculateSectionBounds = () => {
      sectionBounds = sections.map((section) => {
        const el = section as HTMLElement;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        return { id: el.id, top, bottom };
      });
    };

    const updateActiveSection = (scrollY: number) => {
      const markerOffset = window.innerWidth < 768 ? 140 : 160;
      const markerY = scrollY + markerOffset;
      let nextActiveSection = "";

      for (const section of sectionBounds) {
        if (markerY >= section.top && markerY < section.bottom) {
          nextActiveSection = section.id;
          break;
        }
      }

      activeSection = nextActiveSection;
    };

    const applyScrollState = () => {
      const currentScrollY = latestScrollY;
      const scrollDelta = currentScrollY - lastScrollY;

      if (currentScrollY <= 24) {
        isNavbarVisible = true;
      } else if (scrollDelta > 4) {
        isNavbarVisible = false;
        isMenuOpen = false;
      } else if (scrollDelta < -4) {
        isNavbarVisible = true;
      }

      lastScrollY = currentScrollY;
      updateActiveSection(currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      latestScrollY = window.scrollY;

      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(applyScrollState);
      }
    };

    const handleResize = () => {
      recalculateSectionBounds();
      latestScrollY = window.scrollY;
      applyScrollState();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    recalculateSectionBounds();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  });
</script>

<nav
  class={`sticky top-6 z-50 w-full px-4 sm:px-6 lg:px-8 mb-12 transition-all duration-300 ${
    isNavbarVisible
      ? "translate-y-0 opacity-100 pointer-events-auto"
      : "-translate-y-24 opacity-0 pointer-events-none"
  }`}
>
  <div
    class="max-w-7xl mx-auto h-20 px-6 sm:px-10 flex items-center justify-between bg-neo-bg/90 backdrop-blur-md rounded-full shadow-neo-extruded border border-white/20"
  >
    <a
      href="/"
      class="font-display font-bold text-xl tracking-tight text-neo-fg flex items-center gap-3 group"
    >
      <div
        class="w-10 h-10 rounded-full shadow-neo-extruded-small flex items-center justify-center bg-neo-bg group-hover:shadow-neo-inset-small transition-all duration-300"
      >
        <div
          class="w-4 h-4 rounded-full shadow-neo-inset bg-neo-accent animate-pulse"
        ></div>
      </div>
      <span class="group-hover:text-neo-accent transition-colors">SIMEON.</span>
    </a>

    <div
      class="hidden md:flex items-center gap-2 lg:gap-4 bg-neo-bg/50 p-1.5 rounded-full shadow-neo-inset-small"
    >
      <a
        href="#approach"
        class={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
          activeSection === "approach"
            ? "text-neo-fg bg-neo-bg shadow-neo-extruded-small"
            : "text-neo-muted hover:text-neo-fg hover:bg-neo-bg hover:shadow-neo-extruded-small"
        }`}
      >
        Approach
      </a>

      <a
        href="#work"
        class={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
          activeSection === "work"
            ? "text-neo-fg bg-neo-bg shadow-neo-extruded-small"
            : "text-neo-muted hover:text-neo-fg hover:bg-neo-bg hover:shadow-neo-extruded-small"
        }`}
      >
        Work
      </a>

      <a
        href="#capabilities"
        class={`px-5 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
          activeSection === "capabilities"
            ? "text-neo-fg bg-neo-bg shadow-neo-extruded-small"
            : "text-neo-muted hover:text-neo-fg hover:bg-neo-bg hover:shadow-neo-extruded-small"
        }`}
      >
        Capabilities
      </a>
    </div>

    <div class="hidden md:block">
      <Button
        href="#contact"
        variant="primary"
        class="h-11 px-8 text-sm rounded-full shadow-neo-extruded-small"
      >
        Contact Me
      </Button>
    </div>

    <button
      class="md:hidden w-12 h-12 rounded-full shadow-neo-extruded flex flex-col justify-center items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-neo-accent bg-neo-bg active:shadow-neo-inset-small transition-all"
      onclick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span
        class={`w-5 h-0.5 bg-neo-fg rounded transition-transform duration-300 ${
          isMenuOpen ? "rotate-45 translate-y-2" : ""
        }`}
      ></span>
      <span
        class={`w-5 h-0.5 bg-neo-fg rounded transition-opacity duration-300 ${
          isMenuOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        class={`w-5 h-0.5 bg-neo-fg rounded transition-transform duration-300 ${
          isMenuOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      ></span>
    </button>
  </div>

  {#if isMenuOpen}
    <div
      class="md:hidden absolute top-24 left-4 right-4 bg-neo-bg shadow-neo-extruded-hover py-6 px-6 rounded-3xl flex flex-col gap-4 border border-white/20 animate-in fade-in zoom-in duration-300"
    >
      <a
        href="#approach"
        class={`block p-4 rounded-xl transition-all duration-300 ${
          activeSection === "approach"
            ? "text-neo-fg shadow-neo-extruded-small bg-neo-bg"
            : "text-neo-fg shadow-neo-inset-small"
        }`}
        onclick={() => handleNavClick("approach")}
      >
        Approach
      </a>

      <a
        href="#work"
        class={`block p-4 rounded-xl transition-all duration-300 ${
          activeSection === "work"
            ? "text-neo-fg shadow-neo-extruded-small bg-neo-bg"
            : "text-neo-fg shadow-neo-inset-small"
        }`}
        onclick={() => handleNavClick("work")}
      >
        Work
      </a>

      <a
        href="#capabilities"
        class={`block p-4 rounded-xl transition-all duration-300 ${
          activeSection === "capabilities"
            ? "text-neo-fg shadow-neo-extruded-small bg-neo-bg"
            : "text-neo-fg shadow-neo-inset-small"
        }`}
        onclick={() => handleNavClick("capabilities")}
      >
        Capabilities
      </a>

      <a
        href="#contact"
        class="block p-4 rounded-xl text-neo-accent font-bold shadow-neo-inset-small"
        onclick={() => handleNavClick("contact")}
      >
        Contact Me
      </a>
    </div>
  {/if}
</nav>
