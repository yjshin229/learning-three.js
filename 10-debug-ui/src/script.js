import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'lil-gui';


//Debug
const gui = new dat.GUI({ closed: true, width:400}); //closed.true = gui panel closed when first started

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

const parameters = {
    color: 0xff0000,
    spin : () => {
        gsap.to(mesh.rotation, {duration:1, y: mesh.rotation.y + 10,})
    },
}
/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color }) // put parameters.color instead of hexcode. will result in the same color at start
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

//Debug Mesh
gui.add(mesh.position, 'x', -3,3,0.01); // other parameters: min, max, step(precision)
gui
.add(mesh.position, 'y')
.min(-3)
.max(3)
.step(0.01)
.name('elevation') //can also write it like this

gui.add(mesh, 'visible') //creates checkbox in debug control panel for visibility of the mesh

gui.add(mesh.material, 'wireframe'); //creates checkbox in debug control panel for wireframe of the mesh


gui.addColor(parameters, 'color')
.onChange(() => {
    //update material.color
    material.color.set(parameters.color)
})

gui.add(parameters, 'spin')

//show & hide gui panel
window.addEventListener('keydown', (event) => {
    if(event.key === 'h'){
        if(gui._hidden){
            gui.show();
        }else{
            gui.hide();
        }
    }
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()