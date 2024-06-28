import { loadGLTF } from './libs/loader.js';
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
	const start = async () => {
		const imageTargets = [
			{
				src: '/static/assets/targets/moneda5.mind',
				model: '/static/assets/models/moneda5/scene.gltf',
				scale: { x: 0.65, y: 0.65, z: 0.65 },
                position: { x: 0, y: -0.5, z: 0 },
			},
			{
				src: '/static/assets/targets/moneda50.mind',
				model: '/static/assets/models/moneda50/scene.gltf',
				scale: { x: 0.15, y: 0.15, z: 0.15 },
                position: { x: 0, y: 0, z: 0 },
			},
            {
				src: '/static/assets/targets/moneda10.mind',
				model: '/static/assets/models/moneda10/scene.gltf',
				scale: { x: 0.5, y: 0.5, z: 0.5 },
                position: { x: 0, y: -0.25, z: 0 },
			}
		];
        let count = 0;
		for (let target of imageTargets) {
			const mindarThree = new window.MINDAR.IMAGE.MindARThree({
				container: document.body,
				imageTargetSrc: target.src,
			});
			const { renderer, scene, camera } = mindarThree;

			const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
			scene.add(light);

			const model = await loadGLTF(target.model);

			model.scene.scale.set(target.scale.x, target.scale.y, target.scale.z);
			model.scene.position.set(target.position.x, target.position.y, target.position.z);
            model.scene.rotation.set(0, 0, 0);

			const anchor = mindarThree.addAnchor(count);
			anchor.group.add(model.scene);

			await mindarThree.start();
			renderer.setAnimationLoop(() => {
				renderer.render(scene, camera);
			});

            count++;
		}
	};
	start();
});
