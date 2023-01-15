<script>
    import { T, useFrame } from '@threlte/core'
    import { Color, ShaderMaterial, Vector2 } from 'three';
    import waterVertexShader from '../../shaders/water/vertex.glsl?raw'
    import waterFragmentShader from '../../shaders/water/fragment.glsl?raw'

    const waterMaterial = new ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },

            uBigWavesSpeed: { value: 0.75 },
            uBigWavesElevation: { value: 0.13 },
            uBigWavesFrequency: { value: new Vector2(160, 0.5) },

            uSmallWavesElevation: { value: 0.15 },
            uSmallWavesFrequency: { value: 3 },
            uSmallWavesSpeed: { value: 0.2 },
            uSmallWavesIteration: { value: 8.0 },

            uDepthColor: { value: new Color( 0x014182) },
            uSurfaceColor: { value: new Color( 0x2c6fbb) },
            uColorOffset: { value: 0.08 },
            uColorMultiplier: { value: 5 },
        },
        vertexShader: waterVertexShader,
        fragmentShader: waterFragmentShader,
    })

    useFrame((state) => {
        const time = state.clock.getElapsedTime()

        waterMaterial.uniforms.uTime.value = time
    })
</script>

<T.Mesh material={waterMaterial} position={[ 0, -1.3, -12 ]} rotation={[Math.PI*1.5,0,0]}>
    <T.PlaneBufferGeometry args={[ 240, 300, 512, 512 ]}/>
</T.Mesh>