<script lang="ts">
    import Card from "../ui/Card.svelte";
    import Badge from "../ui/Badge.svelte";
    import IconWell from "../ui/IconWell.svelte";
</script>

<section id="work" class="py-24 scroll-mt-12 md:scroll-mt-24">
    <div class="mb-16 max-w-3xl">
        <h2
            class="text-3xl md:text-5xl font-display font-bold tracking-tight text-neo-fg mb-6"
        >
            Selected Work
        </h2>
        <p class="text-lg text-neo-muted">
            A working portfolio of production systems and active builds. Each
            project reflects a focus on usability, structure, and long-term
            maintainability.
        </p>
    </div>

    <div class="space-y-16">
        <!-- Flagship Project: Kartel Daun -->
        <Card hover padding="p-8 md:p-12">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
                <div class="space-y-8">
                    <div class="flex flex-wrap gap-3">
                        <Badge>Internal Platform</Badge>
                        <Badge>E-Commerce</Badge>
                    </div>
                    <div>
                        <h3
                            class="text-4xl font-display font-bold mb-4 text-neo-fg tracking-tight"
                        >
                            Kartel Daun
                        </h3>
                        <p class="text-neo-muted text-lg leading-relaxed">
                            A set of internal systems designed to support daily
                            business operations across multiple workflows.
                        </p>
                    </div>

                    <div class="space-y-6 pt-4">
                        <div class="flex gap-4">
                            <div
                                class="w-1.5 bg-neo-accent rounded-full shadow-neo-extruded flex-shrink-0"
                            ></div>
                            <div>
                                <h4 class="font-bold text-neo-fg">
                                    What was done
                                </h4>
                                <p
                                    class="text-sm text-neo-muted mt-2 leading-relaxed"
                                >
                                    Translated operational processes into
                                    structured digital workflows. Refactored
                                    architecture to improve maintainability.
                                    Designed schemas and integrated payment
                                    systems.
                                </p>
                            </div>
                        </div>
                        <div class="flex gap-4">
                            <div
                                class="w-1.5 bg-neo-accent-secondary rounded-full shadow-neo-extruded flex-shrink-0"
                            ></div>
                            <div>
                                <h4 class="font-bold text-neo-fg">Outcome</h4>
                                <p
                                    class="text-sm text-neo-muted mt-2 leading-relaxed"
                                >
                                    Faster and more predictable admin workflows.
                                    Reduced dependency on manual processes with
                                    a codebase that supports ongoing iteration.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Graphic representation -->
                <div
                    class="aspect-square lg:aspect-video w-full rounded-[32px] shadow-neo-inset-deep bg-neo-bg flex flex-col items-center justify-center p-8 relative overflow-hidden"
                >
                    <div class="w-full max-w-sm flex flex-col gap-4">
                        <div
                            class="h-12 w-full bg-neo-bg rounded-2xl shadow-neo-extruded-small flex items-center px-4 gap-3"
                        >
                            <div
                                class="w-4 h-4 rounded-full shadow-neo-inset bg-neo-bg"
                            ></div>
                            <div
                                class="h-2 w-24 bg-neo-bg rounded-full shadow-neo-inset"
                            ></div>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div
                                class="h-24 bg-neo-bg rounded-2xl shadow-neo-extruded-small"
                            ></div>
                            <div
                                class="h-24 bg-neo-bg rounded-2xl shadow-neo-inset-deep relative flex items-center justify-center"
                            >
                                <div
                                    class="h-8 w-8 bg-neo-accent rounded-full shadow-neo-extruded-small"
                                ></div>
                            </div>
                        </div>
                        <div
                            class="h-16 w-full bg-neo-bg rounded-2xl shadow-neo-extruded border border-transparent flex items-center px-4 justify-between transition-transform hover:-translate-y-1"
                        >
                            <div class="flex gap-2">
                                <div
                                    class="h-2 w-16 bg-neo-bg rounded-full shadow-neo-inset-small"
                                ></div>
                            </div>
                            <div
                                class="w-8 h-8 rounded-full shadow-neo-inset-small bg-neo-bg"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- Sub Projects Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card hover padding="p-8" class="flex flex-col h-full">
                <div class="mb-8 mt-4">
                    <div class="flex items-center justify-between mb-6">
                        <IconWell size="md" raised>
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                ></path></svg
                            >
                        </IconWell>
                        <a
                            href="https://github.com/johansdamanik"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-full shadow-neo-extruded-small flex items-center justify-center text-neo-muted hover:text-neo-accent transition-all duration-300 active:translate-y-px active:shadow-neo-inset-small"
                            aria-label="View Project"
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                ></path></svg
                            >
                        </a>
                    </div>
                    <h3 class="text-2xl font-bold mb-3 text-neo-fg">Kasira</h3>
                    <p class="text-neo-muted text-sm leading-relaxed mb-6">
                        Modern POS system for operational clarity. Designed to
                        support real transaction flows with minimal friction
                        across growing business needs.
                    </p>
                </div>
                <div class="mt-auto">
                    <Badge raised>Operations</Badge>
                </div>
            </Card>

            <Card
                hover
                padding="p-8"
                class="flex flex-col h-full lg:translate-y-4"
            >
                <div class="mb-8 mt-4">
                    <div class="flex items-center justify-between mb-6">
                        <IconWell size="md" raised>
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                ></path></svg
                            >
                        </IconWell>
                        <a
                            href="https://github.com/johansdamanik"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-full shadow-neo-extruded-small flex items-center justify-center text-neo-muted hover:text-neo-accent transition-all duration-300 active:translate-y-px active:shadow-neo-inset-small"
                            aria-label="View Project"
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                ></path></svg
                            >
                        </a>
                    </div>
                    <h3 class="text-2xl font-bold mb-3 text-neo-fg">
                        YT Tools
                    </h3>
                    <p class="text-neo-muted text-sm leading-relaxed mb-6">
                        Automated live streaming infrastructure. Turns manual
                        streaming workflows into repeatable processes, ensuring
                        consistency.
                    </p>
                </div>
                <div class="mt-auto">
                    <Badge raised>Automation</Badge>
                </div>
            </Card>

            <Card
                hover
                padding="p-8"
                class="flex flex-col h-full lg:translate-y-8"
            >
                <div class="mb-8 mt-4">
                    <div class="flex items-center justify-between mb-6">
                        <IconWell size="md" raised>
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                                ></path></svg
                            >
                        </IconWell>
                        <a
                            href="https://github.com/johansdamanik"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-10 h-10 rounded-full shadow-neo-extruded-small flex items-center justify-center text-neo-muted hover:text-neo-accent transition-all duration-300 active:translate-y-px active:shadow-neo-inset-small"
                            aria-label="View Project"
                        >
                            <svg
                                class="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                ></path></svg
                            >
                        </a>
                    </div>
                    <h3 class="text-2xl font-bold mb-3 text-neo-fg">
                        AI Automation
                    </h3>
                    <p class="text-neo-muted text-sm leading-relaxed mb-6">
                        Workflow orchestration with n8n and OpenClaw. API
                        orchestration across multiple services to eliminate
                        repetitive work.
                    </p>
                </div>
                <div class="mt-auto">
                    <Badge raised>AI Pipelines</Badge>
                </div>
            </Card>
        </div>

        <!-- Additional Builds List -->
        <Card hover padding="p-8 lg:p-12">
            <h3 class="text-2xl font-display font-bold mb-8 text-neo-fg">
                Additional Builds
            </h3>
            <div class="grid md:grid-cols-2 gap-x-12 gap-y-6">
                <a
                    href="https://github.com/johansdamanik"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center justify-between p-5 rounded-2xl shadow-neo-extruded-small hover:shadow-neo-extruded hover:-translate-y-1 transition-all duration-300 bg-neo-bg"
                >
                    <div class="flex items-center gap-5">
                        <div
                            class="w-12 h-12 rounded-xl shadow-neo-inset flex items-center justify-center shrink-0 bg-neo-bg group-hover:shadow-neo-inset-deep transition-shadow"
                        >
                            <div
                                class="w-2 h-2 rounded-full bg-neo-accent shadow-[0_0_8px_var(--color-neo-accent)]"
                            ></div>
                        </div>
                        <div class="flex flex-col">
                            <span
                                class="font-bold text-neo-fg text-lg group-hover:text-neo-accent transition-colors duration-300"
                                >Vehicheck</span
                            >
                            <span
                                class="text-neo-muted text-sm font-medium mt-0.5"
                                >Vehicle inspection platform</span
                            >
                        </div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-full shadow-neo-inset-small flex items-center justify-center text-neo-muted group-hover:shadow-neo-extruded-small group-hover:text-neo-accent transition-all duration-300"
                    >
                        <svg
                            class="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path></svg
                        >
                    </div>
                </a>

                <a
                    href="https://github.com/johansdamanik"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center justify-between p-5 rounded-2xl shadow-neo-extruded-small hover:shadow-neo-extruded hover:-translate-y-1 transition-all duration-300 bg-neo-bg"
                >
                    <div class="flex items-center gap-5">
                        <div
                            class="w-12 h-12 rounded-xl shadow-neo-inset flex items-center justify-center shrink-0 bg-neo-bg group-hover:shadow-neo-inset-deep transition-shadow"
                        >
                            <div class="flex gap-1">
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-neo-muted group-hover:bg-neo-accent transition-colors"
                                ></div>
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-neo-muted opacity-50"
                                ></div>
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <span
                                class="font-bold text-neo-fg text-lg group-hover:text-neo-accent transition-colors duration-300"
                                >Rice Media</span
                            >
                            <span
                                class="text-neo-muted text-sm font-medium mt-0.5"
                                >Multi-platform news app</span
                            >
                        </div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-full shadow-neo-inset-small flex items-center justify-center text-neo-muted group-hover:shadow-neo-extruded-small group-hover:text-neo-accent transition-all duration-300"
                    >
                        <svg
                            class="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path></svg
                        >
                    </div>
                </a>

                <a
                    href="https://github.com/johansdamanik"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center justify-between p-5 rounded-2xl shadow-neo-extruded-small hover:shadow-neo-extruded hover:-translate-y-1 transition-all duration-300 bg-neo-bg"
                >
                    <div class="flex items-center gap-5">
                        <div
                            class="w-12 h-12 rounded-xl shadow-neo-inset flex items-center justify-center shrink-0 bg-neo-bg group-hover:shadow-neo-inset-deep transition-shadow"
                        >
                            <div
                                class="w-2.5 h-2.5 bg-neo-muted rounded shadow-neo-extruded-small group-hover:bg-neo-accent transition-colors"
                            ></div>
                        </div>
                        <div class="flex flex-col">
                            <span
                                class="font-bold text-neo-fg text-lg group-hover:text-neo-accent transition-colors duration-300"
                                >Dzmanga</span
                            >
                            <span
                                class="text-neo-muted text-sm font-medium mt-0.5"
                                >Realtime platform</span
                            >
                        </div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-full shadow-neo-inset-small flex items-center justify-center text-neo-muted group-hover:shadow-neo-extruded-small group-hover:text-neo-accent transition-all duration-300"
                    >
                        <svg
                            class="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path></svg
                        >
                    </div>
                </a>

                <a
                    href="https://github.com/johansdamanik"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group flex items-center justify-between p-5 rounded-2xl shadow-neo-extruded-small hover:shadow-neo-extruded hover:-translate-y-1 transition-all duration-300 bg-neo-bg"
                >
                    <div class="flex items-center gap-5">
                        <div
                            class="w-12 h-12 rounded-xl shadow-neo-inset flex items-center justify-center shrink-0 bg-neo-bg group-hover:shadow-neo-inset-deep transition-shadow"
                        >
                            <div class="grid grid-cols-2 gap-0.5">
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-neo-muted group-hover:bg-neo-accent transition-colors"
                                ></div>
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-neo-muted group-hover:bg-neo-accent opacity-70 transition-colors"
                                ></div>
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-neo-muted group-hover:bg-neo-accent opacity-40 transition-colors"
                                ></div>
                                <div
                                    class="w-1.5 h-1.5 rounded-full bg-neo-muted group-hover:bg-neo-accent opacity-10 transition-colors"
                                ></div>
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <span
                                class="font-bold text-neo-fg text-lg group-hover:text-neo-accent transition-colors duration-300"
                                >Restaurant App</span
                            >
                            <span
                                class="text-neo-muted text-sm font-medium mt-0.5"
                                >CMS & product system</span
                            >
                        </div>
                    </div>
                    <div
                        class="w-10 h-10 rounded-full shadow-neo-inset-small flex items-center justify-center text-neo-muted group-hover:shadow-neo-extruded-small group-hover:text-neo-accent transition-all duration-300"
                    >
                        <svg
                            class="w-4 h-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path></svg
                        >
                    </div>
                </a>
            </div>
        </Card>
    </div>
</section>
