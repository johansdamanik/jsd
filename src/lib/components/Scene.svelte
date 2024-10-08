<script>
	import { T, useThrelte, useTask, useLoader } from '@threlte/core';
	import { ContactShadows, OrbitControls, interactivity } from '@threlte/extras';
	import CyberpunkStore from './models/cyberpunk-store.svelte';
	import TV from './models/tv.svelte';
	import { TextureLoader } from 'three';
	import { onMount } from 'svelte';
	import {
		EffectComposer,
		EffectPass,
		RenderPass,
		SMAAEffect,
		SMAAPreset,
		BloomEffect,
		ChromaticAberrationEffect,
		KernelSize
	} from 'postprocessing';

	interactivity();

	const minPolarAngle = 1;
	const maxPolarAngle = Math.PI / 2;
	const minDistance = 5;
	const maxDistance = 20;

	const { scene, renderer, camera, size } = useThrelte();

	const composer = new EffectComposer(renderer);
	const setupEffectComposer = (camera) => {
		composer.removeAllPasses();

		// RenderPass for normal scene rendering
		composer.addPass(new RenderPass(scene, camera));

		// Bloom Effect for glow
		const bloomEffect = new BloomEffect({
			intensity: 4,
			luminanceThreshold: 0.2,
			height: 512,
			width: 512,
			luminanceSmoothing: 0.28,
			mipmapBlur: true,
			kernelSize: KernelSize.MEDIUM
		});
		composer.addPass(new EffectPass(camera, bloomEffect));

		// Chromatic Aberration for cyberpunk distortion
		const chromaticAberrationEffect = new ChromaticAberrationEffect({
			offset: [0.0008, 0.0008]
		});
		composer.addPass(new EffectPass(camera, chromaticAberrationEffect));

		// SMAA for anti-aliasing
		composer.addPass(
			new EffectPass(
				camera,
				new SMAAEffect({
					preset: SMAAPreset.LOW
				})
			)
		);
	};

	// Set up passes for the camera
	$: setupEffectComposer($camera);
	$: composer.setSize($size.width, $size.height);

	// Disable auto rendering and render via composer
	const { renderStage, autoRender } = useThrelte();
	onMount(() => {
		let before = autoRender.current;
		autoRender.set(false);
		return () => autoRender.set(before);
	});

	// Render loop using composer
	useTask(
		(delta) => {
			composer.render(delta);
		},
		{ stage: renderStage, autoInvalidate: false }
	);

	let pinkLightIntensity = 30;
	let flickerTimer = 0;
	let flickerPattern = [0.1, 0.1, 0.2, 0.4, 5]; // On, Off, On, Off, Pause
	let currentFlickerIndex = 0;
	let isFlickering = false;

	// Function to control the flicker effect
	useTask((delta) => {
		flickerTimer += delta;

		// Check if the flicker timer exceeds the current flicker duration
		if (flickerTimer >= flickerPattern[currentFlickerIndex]) {
			flickerTimer = 0;
			currentFlickerIndex = (currentFlickerIndex + 1) % flickerPattern.length;

			// Toggle light intensity based on the flicker pattern (on/off)
			if (currentFlickerIndex < 4) {
				isFlickering = !isFlickering;
				pinkLightIntensity = isFlickering ? 30 : 0;
			} else {
				// Pause at the end of the pattern (reset light to on after the pause)
				isFlickering = false;
				pinkLightIntensity = 30;
			}
		}
	});

	let yellowLightIntensity = 10;
	let time = 0;
	const speed = 1; // Adjust speed of dimming and brightening

	// Smooth fade effect for the yellow light
	useTask((delta) => {
		time += delta;
		yellowLightIntensity = 5 + Math.sin(time * speed) * 5; // Smoothly transition between 5 and 10 intensity
	});
</script>

<T.PerspectiveCamera makeDefault position={[10, 2, -10]} fov={30}>
	<OrbitControls
		enableDamping
		target.y={1.5}
		{minPolarAngle}
		{maxPolarAngle}
		{minDistance}
		{maxDistance}
	/>
</T.PerspectiveCamera>

<T.PointLight color="#ff0000" intensity={2} position={[2.85, 3.55, 0.75]}>
	<T.Mesh>
		<!-- Set radius to a very small value, for example 0.01 -->
		<T.SphereGeometry args={[0.08, 16, 16]} />
		<T.MeshBasicMaterial color="#ff0000" />
	</T.Mesh>
</T.PointLight>

<T.PointLight color="#ff0040" intensity={pinkLightIntensity} position={[0.5, 3.9, -1]}>
	<T.Mesh>
		<T.SphereGeometry args={[0.00001, 16, 16]} />
		<T.MeshBasicMaterial color="#ff0040" />
	</T.Mesh>
</T.PointLight>

<T.PointLight color="#0000ff" intensity={30} position={[4, 2.2, 3.12]}>
	<T.Mesh>
		<!-- Set radius to a very small value, for example 0.01 -->
		<T.SphereGeometry args={[0.00001, 16, 16]} />
		<T.MeshBasicMaterial color="#0000ff" />
	</T.Mesh>
</T.PointLight>

<T.PointLight color="#fdaa48" intensity={yellowLightIntensity} position={[-1.42, 2.4, -4.2]}>
	<T.Mesh>
		<!-- Set radius to a very small value, for example 0.01 -->
		<T.SphereGeometry args={[0.00001, 16, 16]} />
		<T.MeshBasicMaterial color="#fdaa48" />
	</T.Mesh>
</T.PointLight>

<!-- Cahaya ambient untuk mengisi ruang -->
<T.AmbientLight intensity={0.05} />

<ContactShadows scale={10} blur={2} far={2.5} opacity={0.5} />

<!-- Model CyberpunkStore -->
<CyberpunkStore />

<!-- <TV on:click={() => console.log('HELLO')} /> -->
