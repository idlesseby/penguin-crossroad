<script>
    import { T } from '@threlte/core'
    import { GLTF } from '@threlte/extras'
    import { AutoColliders, Collider } from '@threlte/rapier'
    import { playState } from '../stores.js'
</script>

<AutoColliders shape='cuboid'>
    <T.Mesh position={[ 0, -1.5, -70 ]} receiveShadow>
        <T.BoxGeometry args={[ 8, 1, 8 ]} />
        <T.MeshStandardMaterial color="white"/>
    </T.Mesh>
</AutoColliders>


<Collider
    shape='cuboid'
    on:sensorenter={() => (playState.set('DONE'))} 
    sensor 
    position={{ x: 0, y: -1.5, z: -70 }} 
    args={[ 0.5, 1.5, 0.5 ]}
/>





<GLTF url="/models/flag.glb" useDraco="true" position={{ x: 0, y: -1, z: -70 }}/>

