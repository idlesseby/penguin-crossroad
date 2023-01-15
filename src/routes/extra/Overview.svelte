<script>
    import { T, TransformableObject } from '@threlte/core'
</script>

<T.PerspectiveCamera let:ref makeDefault fov={45} >
    <TransformableObject object={ref} position={{ x: 0, y: 20, z: 25 }} lookAt={{ x: 0, y: 0, z: -10 }}/>
</T.PerspectiveCamera>