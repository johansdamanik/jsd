<script>
	import { T, forwardEventHandlers } from '@threlte/core';
	import { TextureLoader } from 'three';
	import { tweened } from 'svelte/motion'; // Import tweening helper from Svelte
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let tvTexture;
	const opacity = tweened(0.01, { duration: 300 }); // Tweened opacity

	// Load the TV screen texture
	const loader = new TextureLoader();
	loader.load('./assets/texture/tv_screen.jpg', (texture) => {
		tvTexture = texture;
	});

	// Handle the click event
	const handleClick = () => {
		// Animate opacity to 0.8 and back to 0.01
		opacity.set(0.8); // Set opacity to 0.8
		setTimeout(() => {
			opacity.set(0.01); // After 1 second, fade out back to 0.01
		}, 1000);
		dispatch('click');
	};

	const component = forwardEventHandlers();
</script>

{#await tvTexture then value}
	<T.Mesh
		position={[0.138, 0.67, -0.5]}
		scale={[2.1, 1.57, 0.05]}
		rotation={[-Math.PI, -1.858, -Math.PI]}
		on:click={handleClick}
	>
		<T.BoxGeometry args={[0.84, 0.61, 0.2]} />

		<!-- Use bind:opacity to link the opacity value to tweening -->
		<T.MeshBasicMaterial map={value} transparent={true} bind:opacity={$opacity} />
	</T.Mesh>
{/await}
