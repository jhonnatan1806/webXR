import { loadGLTF } from './libs/loader.js';
import { mockWithVideo } from './libs/camera-mock.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
	const startRaccoon = async () => {
		mockWithVideo('/static/assets/mock-videos/musicband2.mp4');

		const mindarThree = new window.MINDAR.IMAGE.MindARThree({
			container: document.body,
			imageTargetSrc: '/static/assets/targets/musicband-raccoon.mind',
		});

		const { renderer, scene, camera } = mindarThree;

		const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		scene.add(light);

		const raccoon = await loadGLTF('/static/assets/models/musicband-raccoon/scene.gltf');
		raccoon.scene.scale.set(0.01, 0.01, 0.01);
		raccoon.scene.position.set(0, -0.4, 0);
		const anchor = mindarThree.addAnchor(0);
		anchor.group.add(raccoon.scene);

		await mindarThree.start();
		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
	};

	const startBear = async () => {
		mockWithVideo('/static/assets/mock-videos/musicband2.mp4');

		const mindarThree2 = new window.MINDAR.IMAGE.MindARThree({
			container: document.body,
			imageTargetSrc: '/static/assets/targets/musicband-bear.mind',
		});

		const { renderer, scene, camera } = mindarThree2;

		const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
		scene.add(light);

		const bear = await loadGLTF('/static/assets/models/musicband-bear/scene.gltf');
		bear.scene.scale.set(0.01, 0.01, 0.01);
		bear.scene.position.set(0, -0.4, 0);
		const anchor2 = mindarThree2.addAnchor(0);
		anchor2.group.add(bear.scene);

		await mindarThree2.start();
		renderer.setAnimationLoop(() => {
			renderer.render(scene, camera);
		});
	};

	Promise.all([startRaccoon(), startBear()]);
});
