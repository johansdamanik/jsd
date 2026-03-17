<script lang="ts">
    import Card from "../ui/Card.svelte";
    import Button from "../ui/Button.svelte";
</script>

<section id="contact" class="pt-24 mb-8 scroll-mt-12 md:scroll-mt-24">
    <Card
        hover
        padding="p-10 md:p-16"
        class="text-center max-w-4xl mx-auto flex flex-col items-center"
    >
        <div
            class="w-20 h-20 mb-8 rounded-full shadow-neo-inset-deep flex items-center justify-center bg-neo-bg"
        >
            <div
                class="w-12 h-12 shadow-neo-extruded rounded-full bg-neo-bg flex items-center justify-center animate-float"
                style="animation-delay: 0.5s;"
            >
                <div
                    class="w-4 h-4 bg-neo-accent rounded-full shadow-neo-inset-small"
                ></div>
            </div>
        </div>

        <h2
            class="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neo-fg mb-6"
        >
            Let's build properly.
        </h2>
        <p
            class="text-xl text-neo-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
            If you're building something that needs to work beyond just
            “launch”, I can help structure it properly from the inside out.
        </p>

        <div
            class="flex flex-col sm:flex-row gap-6 justify-center items-center w-full sm:w-auto"
        >
            <Button
                variant="primary"
                href="mailto:johansdamanik@gmail.com"
                class="min-w-[200px] h-14 text-lg w-full sm:w-auto"
            >
                Email Me
            </Button>
        </div>

        <div
            class="mt-20 pt-10 border-t border-[rgba(255,255,255,0.4)] w-full flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0_-1px_0_rgba(163,177,198,0.2)]"
        >
            <p class="text-sm text-neo-muted font-medium">
                © 2025 Johan Simeon Damanik — Full-Stack Developer
            </p>
            <div class="flex gap-5">
                <a
                    href="https://github.com/johansdamanik"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Github Profile"
                    class="w-12 h-12 shadow-neo-extruded rounded-2xl flex items-center justify-center text-neo-muted hover:text-neo-accent focus:text-neo-accent hover:-translate-y-1 transition-all duration-300 active:translate-y-px active:shadow-neo-inset-small"
                >
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"
                        ><path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                        ></path></svg
                    >
                </a>
                <a
                    href="https://www.linkedin.com/in/johan-simeon-damanik-a2a6a0253/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    class="w-12 h-12 shadow-neo-extruded rounded-2xl flex items-center justify-center text-neo-muted hover:text-neo-accent focus:text-neo-accent hover:-translate-y-1 transition-all duration-300 active:translate-y-px active:shadow-neo-inset-small"
                >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                        ><path
                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                        /></svg
                    >
                </a>
            </div>
        </div>
    </Card>
</section>
