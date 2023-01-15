<script>
    import { useFrame, useThrelte } from '@threlte/core'
	import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial, Vector3 } from 'three';
    import snowVertexShader from '../../shaders/snow/vertex.glsl?raw'
    import snowFragmentShader from '../../shaders/snow/fragment.glsl?raw'

    const { renderer } = useThrelte()

    //  Geometry
    const snowGeometry = new BufferGeometry()
    const count = 10000
    let x

    let positions = new Float32Array(count * 3)
    let scales = new Float32Array(count)

    for(let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() -0.5) * 85
        scales[i] = Math.random() * 10
    }

    snowGeometry.setAttribute(
        'aScale',
        new BufferAttribute(scales, 1)
    )

    snowGeometry.setAttribute(
        'position',
        new BufferAttribute(positions, 3)
    )

    // Material
    const snowMaterial = new ShaderMaterial({
        uniforms: {
            uSize: { value: 6 * renderer.getPixelRatio() },
        },
        vertexShader: snowVertexShader,
        fragmentShader: snowFragmentShader,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending
    })

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        x = Math.sin(time) * 0.05

        for(let i = 0; i < count; i++) {
            let i3 = i * 3
            snowGeometry.attributes.position.array[i3 + 1] -= 0.01

            if(snowGeometry.attributes.position.array[i3 + 1] < -50) {
                snowGeometry.attributes.position.array[i3 + 1] = 20
            }
        }

        snowGeometry.attributes.position.needsUpdate = true

    })
</script>


<T.Points geometry={snowGeometry} material={snowMaterial} position={[x,35,-50]}>
</T.Points>