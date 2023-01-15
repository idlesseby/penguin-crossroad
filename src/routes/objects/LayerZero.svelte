<script>
    import { T } from '@threlte/core'
    import { AutoColliders } from '@threlte/rapier'
</script>

<AutoColliders shape={'cuboid'}>
    <T.Mesh position={[ 0, -9, 0 ]} receiveShadow>
        <T.BoxGeometry args={[ 200, 0.1, 200 ]} />
        <T.MeshStandardMaterial transparent opacity={0.1}/>
    </T.Mesh>
</AutoColliders>