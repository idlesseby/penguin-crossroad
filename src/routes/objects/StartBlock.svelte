<script>
    import { T } from '@threlte/core'
    import { AutoColliders } from '@threlte/rapier'
</script>

<AutoColliders shape={'cuboid'}>
    <T.Mesh position={[ 0, -1.5, 0 ]} receiveShadow>
        <T.BoxGeometry args={[ 4, 1.3, 4 ]} />
        <T.MeshStandardMaterial color="white"/>
    </T.Mesh>
</AutoColliders>