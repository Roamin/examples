// 顶点着色器程序
// Vertex shade（顶点着色器）：用来描述顶点特性（如位置、颜色等）
// 顶点是指二维或三维空间中的一个点，比如二维或者三维图像的端点或交点
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    attribute float a_PointSize;
    void main () {
        gl_Position = a_Position;
        gl_PointSize = a_PointSize;
    }
`

// 片元着色器程序
// Fragment shader（片元着色器）：进行逐片元处理过程，如光照
const FSHADER_SOURCE = `
    void main () {
        gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // 设置颜色
    }
`

const ANGLE_STEP = 45.0

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

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制三个点
    gl.drawArrays(gl.POINTS, 0, n)
}

function initVertexBuffers(gl) {
    // 顶点坐标和点的尺寸
    const verticesSizes = new Float32Array([
        0.0, 0.5, 10.0, // 第一个点
        -0.5, -0.5, 20.0, // 第二个点
        0.5, -0.5, 30.0 // 第三个点
    ])
    const n = 3

    // 创建缓冲区对象
    const vertexBuffer = gl.createBuffer()
    const sizeBuffer = gl.createBuffer()

    if (!vertexBuffer) {
        console.log('Failed to create the buffer object')

        return -1
    }

    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, verticesSizes, gl.STATIC_DRAW)

    const FSIZE = verticesSizes.BYTES_PER_ELEMENT

    // 获取 attribute 变量的存储位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')

        return
    }

    // 将缓冲区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0)
    // 连接 a_Position 变量与分配给它缓冲区对象
    gl.enableVertexAttribArray(a_Position)


    // 获取 attribute 变量的存储位置
    const a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')

    if (a_PointSize < 0) {
        console.log('Failed to get the storage location of a_PointSize')

        return
    }

    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2)
    gl.enableVertexAttribArray(a_PointSize)

    return n
}
