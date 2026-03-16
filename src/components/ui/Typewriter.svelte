<script lang="ts">
  import { onMount } from 'svelte';

  let { 
    text = '', 
    speed = 50, 
    class: className = '',
    onComplete = () => {}
  } = $props<{
    text: string;
    speed?: number;
    class?: string;
    onComplete?: () => void;
  }>();

  let displayedText = $state('');
  let currentIndex = 0;
  let isTyping = $state(true);

  onMount(() => {
    const typeNextChar = () => {
      if (currentIndex < text.length) {
        displayedText += text[currentIndex];
        currentIndex++;
        setTimeout(typeNextChar, speed + (Math.random() * 20 - 10)); // Slight random variance like real typing
      } else {
        isTyping = false;
        onComplete();
      }
    };

    // Small delay before starting
    setTimeout(typeNextChar, 300);
  });
</script>

<span class={className}>
  {displayedText}
  {#if isTyping}
    <span class="inline-block w-2 bg-retro-green h-4 ml-1 animate-pulse align-middle"></span>
  {/if}
</span>
