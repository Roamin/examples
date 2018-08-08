// 顶点着色器程序
// Vertex shade（顶点着色器）：用来描述顶点特性（如位置、颜色等）
// 顶点是指二维或三维空间中的一个点，比如二维或者三维图像的端点或交点
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;
    varying vec2 v_TexCoord;
    void main () {
        gl_Position = a_Position; // 设置坐标
        v_TexCoord = a_TexCoord;
    }
`

// 片元着色器程序
// Fragment shader（片元着色器）：进行逐片元处理过程，如光照
const FSHADER_SOURCE = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;
    void main () {
        gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    }
`


function main() {
    const canvas = document.getElementById('webgl')
    const gl = getWebGLContext(canvas)

    if (!gl) {
        console.log('Failed to get the rendering context for ThreeJS.')

        return
    }

    // 初始化着色器
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.')

        return
    }

    // 设置顶点位置
    let n = initVertexBuffers(gl)

    if (n < 0) {
        console.log('Failed to set the positions of the vertices')

        return
    }

    // 设置 canvas 的背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0)

    if (!initTextures(gl, n)) {
        console.log('Failed to intialize the texture.')

        return
    }
}

function initVertexBuffers(gl) {
    const verticesTexCoords = new Float32Array([
        -0.5, 0.5, 0.0, 1.0,
        -0.5, -0.5, 0.0, 0.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, -0.5, 1.0, 0.0
    ])
    const n = 4
    const FSIZE = verticesTexCoords.BYTES_PER_ELEMENT
    const vertexTexCoordBuffer = gl.createBuffer()

    if (!vertexTexCoordBuffer) {
        console.log('Failed to create the buffer object')

        return -1
    }

    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer)

    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW)


    // 获取 attribute 变量的存储位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')

        return
    }

    // 将缓冲区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)
    // 连接 a_Position 变量与分配给它缓冲区对象
    gl.enableVertexAttribArray(a_Position)

    // 将纹理坐标分配给 a_TexCoord 并开启它
    const a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')
    if (!a_TexCoord) {
        console.log('Failed to get the storage location of a_TexCoord')

        return
    }
    gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)

    // 连接 a_Position 变量与分配给它缓冲区对象
    gl.enableVertexAttribArray(a_TexCoord)

    // Unbind the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, null)

    return n
}

function initTextures(gl, n) {
    const texture = gl.createTexture() // 创建纹理对象
    if (!texture) {
        console.log('Failed to create the texture.')

        return
    }

    // 获取 u_Sampler 的存储位置
    const u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler')
    if (!u_Sampler) {
        console.log('Failed to create the u_Sampler.')

        return
    }

    const image = new Image()
    if (!image) {
        console.log('Failed to create the image.')

        return
    }

    image.onload = function () {
        console.log('load')
        loadTexture(gl, n, texture, u_Sampler, image)
    }
    image.src = 'https://alpha.wallhaven.cc/wallpaper/664722'

    return true
}

function loadTexture(gl, n, texture, u_Sampler, image) {
    // 对纹理图像进行 y 轴反转
    gl.pixelStorei(Float32Array.UNPACK_FLIP_Y_WEBGL, 1)
    // 开启 0 号纹理单元
    gl.activeTexture(gl.TEXTURE0)
    // 向 target 绑定纹理对象
    gl.bindTexture(gl.TEXTURE_2D, texture)

    // 配置纹理参数
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    // 配置纹理图像
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)

    // 将 0 号纹理传递给着色器
    gl.uniform1i(u_Sampler, 0)

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Draw the rectangle
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n)
    console.log('done', n)
}
