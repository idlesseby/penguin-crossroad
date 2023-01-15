<script>
    import { T, useFrame, TransformableObject } from '@threlte/core'
    import { GLTF } from '@threlte/extras'
    import { Vector3 } from 'three'
    import { AutoColliders, RigidBody, useRapier } from '@threlte/rapier'
    import { playState } from '../stores.js'

    let player

    let jumpForce = 0
    let backwardForce = 0
    let forwardForce = 0
    let leftForce = 0
    let rightForce = 0

    let bodyPosition
    
    let gltfPosition= new Vector3()
    let gltfPositionX
    let gltfPositionY
    let gltfPositionZ


    let cameraPosition = new Vector3()
    const cameraTarget = new Vector3()
    let cameraTargetX
    let cameraTargetY
    let cameraTargetZ

    const { rapier, world } = useRapier()
    const rapierWorld = world

    function onKeyDown(e) {
        switch(e.key) {
            case " ":
                jumpForce = 0.1
                if ($playState === 'IDLE') {
                    playState.set('PLAYING')
                }
                break
            case 's':
            case 'ArrowDown':
                backwardForce = 1
                if ($playState === 'IDLE') {
                    playState.set('PLAYING')
                }
                break
            case 'w':
            case 'ArrowUp':
                forwardForce = 1
                if ($playState === 'IDLE') {
                    playState.set('PLAYING')
                }
                break
            case 'a':
            case 'ArrowLeft':
                leftForce = 1
                if ($playState === 'IDLE') {
                    playState.set('PLAYING')
                }
                break
            case 'd':
            case 'ArrowRight':
                rightForce = 1
                if ($playState === 'IDLE') {
                    playState.set('PLAYING')
                }
                break
            default:
                break
        }
    }

    function onKeyUp(e) {
        switch(e.key) {
            case " ":
                jumpForce = 0
                break
            case 's':
            case 'ArrowDown':
                backwardForce = 0
                break
            case 'w':
            case 'ArrowUp':
                forwardForce = 0
                break
            case 'a':
            case 'ArrowLeft':
                leftForce = 0
                break
            case 'd':
            case 'ArrowRight':
                rightForce = 0
                break
            default:
                break
        }
    }

    function jump(jumpStrength) {
        const origin = player.translation()
        origin.y -= 0.31
        const direction = { x: 0, y: -1, z: 0 }
        const ray = new rapier.Ray(origin, direction)
        let hit = rapierWorld.castRay(ray, 100, true)

        if(hit.toi < 0.15)
            player.applyImpulse({x: 0, y: jumpStrength, z: 0}, true)
    }
    
    function reset() {
        player.setTranslation({x: 0, y: 0, z: 0})
        player.setLinvel({x: 0, y: 0, z: 0})
        player.setAngvel({x: 0, y: 0, z: 0})
        playState.set('IDLE')
    }

    useFrame((state, delta) => {
        const impulseStrength = 0.8 * delta
        const jumpStrength = 5 * delta

        // Controls

        if(jumpForce) {
            jump(jumpStrength)
        }
        if(backwardForce) {
            player.applyImpulse({x: 0, y: 0, z: impulseStrength}, true)
        }
        if(forwardForce) {
            player.applyImpulse({x: 0, y: 0, z: -impulseStrength}, true)
        }
        if(leftForce) {
            player.applyImpulse({x: -impulseStrength, y: 0, z: 0}, true)
        }
        if(rightForce) {
            player.applyImpulse({x: impulseStrength, y: 0, z: 0}, true)
        }

        // Third person

        bodyPosition = player.translation()

        gltfPosition.copy(bodyPosition)
        gltfPositionX = gltfPosition.x
        gltfPositionY = gltfPosition.y += 0.1
        gltfPositionZ = gltfPosition.z -= 0.33

        cameraPosition.copy(bodyPosition)
        cameraPosition.y += 2.25
        cameraPosition.z += 6.65

        cameraTarget.copy(bodyPosition)
        cameraTargetX = cameraTarget.x
        cameraTargetY = cameraTarget.y += 0.25
        cameraTargetZ = cameraTarget.z

        // Out of bound

        if(bodyPosition.y < -3) {
            reset()
        }
    })

    
//position={{ x: cameraPosition.x, y: cameraPosition.y, z: cameraPosition.z }} lookAt={{ x: cameraTargetX * 0.5, y: cameraTargetY, z: cameraTargetZ }}
</script>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup={onKeyUp}/>

<T.PerspectiveCamera let:ref makeDefault fov={45}>
    <TransformableObject object={ref} position={{ x: cameraPosition.x, y: cameraPosition.y, z: cameraPosition.z }} lookAt={{ x: cameraTargetX * 0.5, y: cameraTargetY, z: cameraTargetZ }}/>
</T.PerspectiveCamera>
s
<RigidBody bind:rigidBody={player} type="dynamic" linearDamping={0.5} angularDamping={0.5}>
    <AutoColliders shape="ball">
        <T.Mesh receiveShadow>
            <T.IcosahedronGeometry args={[ 0.3, 1 ]} />
            <T.MeshStandardMaterial flatShading transparent opacity={0}/>
        </T.Mesh>
    </AutoColliders>
</RigidBody>

<GLTF url="/models/penguin.glb" useDraco="true" position={{ x: gltfPositionX, y: gltfPositionY, z: gltfPositionZ }} rotation={{x: gltfPositionY * 0.25,y: gltfPositionX * 0.1}}/>