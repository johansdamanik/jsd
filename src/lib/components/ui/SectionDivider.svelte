<script lang="ts">
    let { class: className = "" } = $props<{ class?: string }>();
</script>

<div class="flex items-center gap-4 w-full py-12 px-4 opacity-70 {className}">
    <!-- Left Track -->
    <div class="flex-1 h-1.5 rounded-full shadow-neo-inset-small bg-neo-bg"></div>
    
    <!-- Central Accent (Raised "Joint") -->
    <div class="w-10 h-10 rounded-full shadow-neo-extruded flex items-center justify-center bg-neo-bg shrink-0">
        <div class="w-2.5 h-2.5 rounded-full shadow-neo-inset bg-neo-accent/60"></div>
    </div>
    
    <!-- Right Track -->
    <div class="flex-1 h-1.5 rounded-full shadow-neo-inset-small bg-neo-bg"></div>
</div>
