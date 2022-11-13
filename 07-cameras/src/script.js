import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

//Perpective Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) 
//(vertical vision angle(degree),aspect ration(width), near, far) => near and far : any object closer than near or further than far will not show
// do not use extreme values like 0.0001 or 999999 -> it will make a z-fighting (glitch)

/*Orthographic Camera
const aspectRatio = sizes.width/sizes.height
const camera = new THREE.OrthographicCamera(-1 * aspectRatio ,1 * aspectRatio,1,-1,0.1,100)
//(left,right,top,bottom, near, far)
*/
//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
//camera.lookAt(mesh.position)
scene.add(camera)

// Cursor
const cursor = {
    x:0,
    y:0
}
window.addEventListener('mousemove', (event)=> {
    cursor.x = event.clientX/sizes.width -0.5
    cursor.y = -(event.clientY/sizes.height -0.5)
})

//Controls
const controls = new OrbitControls(camera, canvas) // canvas = drag and drop
//Damping
controls.enableDamping = true


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //mesh.rotation.y = elapsedTime;

    /*
    //Update camera 
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5
    camera.position.z = Math.cos(cursor.x  * Math.PI * 2) * 3
    camera.lookAt(new THREE.Vector3())
    //camera.lookAt(mesh.position) => same thing
    */

    //Update controls
    controls.update() //need to update control every frame if using damping
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()