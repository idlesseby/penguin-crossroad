<script>
    import { T } from '@threlte/core'
    import { useFrame } from '@threlte/core'
    import { AutoColliders, RigidBody } from '@threlte/rapier'

    export let blockPosition = 0

    let rb
    let x
    let y
    let r = Math.random()

    const timeOffset = Math.random() * Math.PI * 2

    useFrame((state) => {
        const time = state.clock.getElapsedTime()
        
        x = Math.sin(time + timeOffset) * 3
        y = Math.sin(time * 3) * 0.08
        rb.setNextKinematicTranslation({x:x, y: y, z: 0})
    })
</script>

<RigidBody bind:rigidBody={rb} type="kinematicPosition">
    <AutoColliders shape={'cuboid'}>
        <T.Mesh receiveShadow position={[ 0, -1.5, blockPosition ]} rotation={[0,r,0]}>
            <T.BoxGeometry args={[ 4, 1, 4 ]} />
            <T.MeshStandardMaterial color="lightblue"/>
        </T.Mesh>
    </AutoColliders>d
</RigidBody>