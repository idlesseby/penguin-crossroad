<script>
    import { T } from '@threlte/core'
</script>

<T.HemisphereLight/>
<T.DirectionalLight castShadow 
    position={ [ 10, 8, -20 ] }
    intensity={ 1 }
/>
<T.AmbientLight intensity={0.1} />ds