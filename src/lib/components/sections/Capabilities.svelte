<script lang="ts">
    import Card from "../ui/Card.svelte";
    import Badge from "../ui/Badge.svelte";
</script>

<section id="capabilities" class="py-24 scroll-mt-12 md:scroll-mt-24">
    <div class="grid lg:grid-cols-2 gap-16">
        <!-- Capabilities -->
        <div class="space-y-12">
            <h2
                class="text-3xl md:text-5xl font-display font-bold tracking-tight text-neo-fg"
            >
                Capabilities
            </h2>
            <div class="space-y-8">
                <div class="flex gap-6">
                    <div
                        class="w-12 h-12 rounded-full shadow-neo-inset-deep bg-neo-bg flex items-center justify-center shrink-0 text-neo-accent font-bold pt-[1px]"
                    >
                        01
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-2">
                            System design & architecture
                        </h3>
                        <p class="text-neo-muted leading-relaxed">
                            Designing structures that support growth,
                            flexibility, and real-world usage.
                        </p>
                    </div>
                </div>
                <div class="flex gap-6">
                    <div
                        class="w-12 h-12 rounded-full shadow-neo-inset-deep bg-neo-bg flex items-center justify-center shrink-0 text-neo-accent font-bold pt-[1px]"
                    >
                        02
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-2">
                            Full-stack development
                        </h3>
                        <p class="text-neo-muted leading-relaxed">
                            Delivering complete systems across robust frontends
                            and scalable backends.
                        </p>
                    </div>
                </div>
                <div class="flex gap-6">
                    <div
                        class="w-12 h-12 rounded-full shadow-neo-inset-deep bg-neo-bg flex items-center justify-center shrink-0 text-neo-accent font-bold pt-[1px]"
                    >
                        03
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-2">
                            Automation & workflow
                        </h3>
                        <p class="text-neo-muted leading-relaxed">
                            Reducing operational load through event-driven and
                            AI-assisted systems.
                        </p>
                    </div>
                </div>
                <div class="flex gap-6">
                    <div
                        class="w-12 h-12 rounded-full shadow-neo-inset-deep bg-neo-bg flex items-center justify-center shrink-0 text-neo-accent font-bold pt-[1px]"
                    >
                        04
                    </div>
                    <div>
                        <h3 class="text-xl font-bold mb-2">
                            Global Integration
                        </h3>
                        <p class="text-neo-muted leading-relaxed">
                            Connecting services, APIs, and payment systems into
                            cohesive workflows.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Technology Stack -->
        <div>
            <Card hover padding="p-8 md:p-12" class="h-full">
                <h2
                    class="text-2xl font-display font-bold tracking-tight text-neo-fg mb-8"
                >
                    Technology Stack
                </h2>

                <div class="space-y-10">
                    <div>
                        <h4
                            class="text-sm font-bold uppercase tracking-widest text-neo-muted mb-4"
                        >
                            Core
                        </h4>
                        <div class="flex flex-wrap gap-2.5">
                            <Badge hoverable>JavaScript</Badge>
                            <Badge hoverable>TypeScript</Badge>
                            <Badge hoverable>PHP (Laravel)</Badge>
                            <Badge hoverable>Python</Badge>
                        </div>
                    </div>

                    <div>
                        <h4
                            class="text-sm font-bold uppercase tracking-widest text-neo-muted mb-4"
                        >
                            Frontend
                        </h4>
                        <div class="flex flex-wrap gap-2.5">
                            <Badge hoverable>Vue</Badge>
                            <Badge hoverable>Nuxt</Badge>
                            <Badge hoverable>Quasar</Badge>
                            <Badge hoverable>React</Badge>
                            <Badge hoverable>React Native</Badge>
                            <Badge hoverable>Next</Badge>
                            <Badge hoverable>Svelte</Badge>
                            <Badge hoverable>Tailwind CSS</Badge>
                        </div>
                    </div>

                    <div>
                        <h4
                            class="text-sm font-bold uppercase tracking-widest text-neo-muted mb-4"
                        >
                            Backend & DB
                        </h4>
                        <div class="flex flex-wrap gap-2.5">
                            <Badge hoverable>Node.js</Badge>
                            <Badge hoverable>NestJS</Badge>
                            <Badge hoverable>Express</Badge>
                            <Badge hoverable>GraphQL</Badge>
                            <Badge hoverable>MySQL</Badge>
                            <Badge hoverable>PostgreSQL</Badge>
                            <Badge hoverable>MongoDB</Badge>
                            <Badge hoverable>Prisma</Badge>
                            <Badge hoverable>Redis</Badge>
                        </div>
                    </div>

                    <div>
                        <h4
                            class="text-sm font-bold uppercase tracking-widest text-neo-muted mb-4"
                        >
                            Automation & Payments
                        </h4>
                        <div class="flex flex-wrap gap-2.5">
                            <Badge hoverable>n8n</Badge>
                            <Badge hoverable>OpenClaw</Badge>
                            <Badge hoverable>PayPal</Badge>
                            <Badge hoverable>Midtrans</Badge>
                            <Badge hoverable>Xendit</Badge>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    </div>
</section>
