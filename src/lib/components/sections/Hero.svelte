<script lang="ts">
    import Button from "../ui/Button.svelte";
</script>

<section class="pt-12 grid md:grid-cols-2 gap-16 items-center">
    <div class="space-y-8 z-10">
        <div>
            <!-- Name (MAIN FOCUS) -->
            <h1
                class="text-5xl md:text-6xl font-display font-extrabold tracking-tight text-neo-fg leading-tight"
            >
                Johan <span class="text-neo-accent">Simeon</span> <br />
                Damanik
            </h1>

            <!-- Role -->
            <h2
                class="mt-4 text-neo-muted font-semibold text-sm tracking-widest uppercase flex items-center gap-3"
            >
                <span
                    class="w-2 h-2 rounded-full shadow-neo-inset bg-neo-accent"
                ></span>
                Full-Stack Developer
            </h2>

            <!-- Positioning -->
            <h3
                class="mt-6 text-3xl md:text-4xl font-bold tracking-tight text-neo-fg leading-tight"
            >
                Systems, Automation, <br />
                <span class="text-neo-muted">built for real operations</span>
            </h3>
        </div>

        <!-- Description -->
        <p class="text-lg md:text-xl text-neo-muted max-w-lg leading-relaxed">
            I design and build systems that reduce operational friction — from
            internal platforms to automation workflows — structured to scale and
            remain maintainable over time.
        </p>

        <!-- CTA (unchanged) -->
        <div class="flex flex-col sm:flex-row gap-6 pt-4">
            <Button variant="primary" href="#work">View Work</Button>
            <Button variant="secondary" href="#contact">
                Start a conversation
            </Button>
        </div>
    </div>

    <!-- Abstract Tactile Art (Neumorphic Physics Demonstration) -->
    <div
        class="relative w-full aspect-square max-w-[400px] mx-auto flex items-center justify-center"
    >
        <!-- Outer Base Ring -->
        <div
            class="absolute w-full h-full rounded-full shadow-neo-extruded bg-neo-bg animate-float hover:shadow-neo-inset transition-all duration-1000 ease-in-out"
            style="animation-delay: 0s;"
        ></div>

        <!-- Deep Inset Well -->
        <div
            class="absolute w-[75%] h-[75%] rounded-full shadow-neo-inset-deep bg-neo-bg animate-float flex justify-center items-center hover:shadow-neo-extruded transition-all duration-1000 ease-in-out"
            style="animation-delay: 0.5s;"
        >
            <!-- Medium Lifted Ring -->
            <div
                class="w-[66%] h-[66%] rounded-full shadow-neo-extruded bg-neo-bg flex items-center justify-center animate-float hover:shadow-neo-inset-deep transition-all duration-1000 ease-in-out"
                style="animation-delay: 1.0s;"
            >
                <!-- Small Inset Accent -->
                <div
                    class="w-[30%] h-[30%] rounded-full bg-neo-accent shadow-neo-inset-small animate-float hover:shadow-neo-extruded-small transition-all duration-700 ease-in-out"
                    style="animation-delay: 1.5s;"
                ></div>
            </div>
        </div>

        <!-- Orbital small decorations -->
        <div
            class="absolute top-[10%] right-[10%] w-8 h-8 rounded-full shadow-neo-extruded bg-neo-bg hover:shadow-neo-inset-small transition-all duration-500"
        ></div>
        <div
            class="absolute bottom-[20%] left-[5%] w-12 h-12 rounded-full shadow-neo-inset bg-neo-bg hover:shadow-neo-extruded-small transition-all duration-500"
        ></div>
    </div>
</section>
