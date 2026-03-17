<script lang="ts">
    import Card from "../ui/Card.svelte";
    import IconWell from "../ui/IconWell.svelte";
</script>

<section id="approach" class="py-24 scroll-mt-12 md:scroll-mt-24">
    <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <h2
            class="text-3xl md:text-5xl font-display font-bold tracking-tight text-neo-fg"
        >
            Systems built for real operations
        </h2>
        <p class="text-lg text-neo-muted">
            Most systems don’t fail because of missing features — they fail
            because they don’t fit how people actually work.
        </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card hover padding="p-8" class="flex flex-col gap-6">
            <IconWell size="md" deep>
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    ></path></svg
                >
            </IconWell>
            <div>
                <h3 class="font-bold text-xl mb-3 text-neo-fg tracking-tight">
                    Internal Platforms
                </h3>
                <p class="text-neo-muted text-sm leading-relaxed">
                    Simplify operational workflows and structure digital
                    processes to remove ambiguity.
                </p>
            </div>
        </Card>

        <Card hover padding="p-8" class="flex flex-col gap-6 lg:translate-y-4">
            <IconWell size="md" deep>
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                    ></path></svg
                >
            </IconWell>
            <div>
                <h3 class="font-bold text-xl mb-3 text-neo-fg tracking-tight">
                    Product Systems
                </h3>
                <p class="text-neo-muted text-sm leading-relaxed">
                    Balance speed, clarity, and scalability for systems accessed
                    directly by end customers.
                </p>
            </div>
        </Card>

        <Card hover padding="p-8" class="flex flex-col gap-6 lg:translate-y-8">
            <IconWell size="md" deep>
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path></svg
                >
            </IconWell>
            <div>
                <h3 class="font-bold text-xl mb-3 text-neo-fg tracking-tight">
                    Automation
                </h3>
                <p class="text-neo-muted text-sm leading-relaxed">
                    Reduce repetitive tasks and human dependency across daily
                    operation cycles.
                </p>
            </div>
        </Card>

        <Card hover padding="p-8" class="flex flex-col gap-6 lg:translate-y-12">
            <IconWell size="md" deep>
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path></svg
                >
            </IconWell>
            <div>
                <h3 class="font-bold text-xl mb-3 text-neo-fg tracking-tight">
                    Integrations
                </h3>
                <p class="text-neo-muted text-sm leading-relaxed">
                    Connect fragmented tools and pipelines into one continuous,
                    reliable flow.
                </p>
            </div>
        </Card>
    </div>

    <div class="mt-32 text-center">
        <div class="inline-block px-10 py-6 rounded-[32px] shadow-neo-inset">
            <p class="text-neo-fg font-medium text-lg lg:text-xl">
                The goal is always the same: <br class="md:hidden" />
                <span
                    class="text-neo-accent font-bold mt-2 md:mt-0 md:ml-2 inline-block"
                    >make systems easier to use, easier to maintain, and harder
                    to break.</span
                >
            </p>
        </div>
    </div>
</section>
