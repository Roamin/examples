// 顶点着色器程序
// Vertex shade（顶点着色器）：用来描述顶点特性（如位置、颜色等）
// 顶点是指二维或三维空间中的一个点，比如二维或者三维图像的端点或交点
const VSHADER_SOURCE = `
    attribute vec4 a_Position;
    uniform mat4 u_ModelMatrix;
    void main () {
        gl_Position = u_ModelMatrix * a_Position;
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

    const u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix')

    // non-null
    if (!u_ModelMatrix) {
        console.log('Failed to get the storage location of u_ModelMatrix')

        return
    }

    // 三角形的当前旋转角度
    let currentAngle = 0.0
    // 模型矩阵，Matrix4 对象
    const modelMatrix = new Matrix4()

    const tick = function () {
        currentAngle = animate(currentAngle) // 更新旋转角
        draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix)
        requestAnimationFrame(tick)
    }

    tick()
}

function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ])
    const n = 3
    const vertexBuffer = gl.createBuffer()

    if (!vertexBuffer) {
        console.log('Failed to create the buffer object')

        return -1
    }

    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)


    // 获取 attribute 变量的存储位置
    const a_Position = gl.getAttribLocation(gl.program, 'a_Position')

    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position')

        return
    }

    // 将缓冲区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)


    // 连接 a_Position 变量与分配给它缓冲区对象
    gl.enableVertexAttribArray(a_Position)

    return n
}

function draw (gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
    // 设置旋转矩阵
    modelMatrix.setRotate(currentAngle, 0, 0, 1)

    // 将旋转矩阵传输给顶点着色器
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix.elements)

    // 清除 <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT)

    // 绘制三角形
    gl.drawArrays(gl.TRIANGLES, 0, n)
}

// 记录上一次调用函数的时刻
let g_last = Date.now()
function animate (angle) {
    // 计算距离上次调用经过多少时间
    const now = Date.now()
    const elapsed = now - g_last // 毫秒

    g_last = now
    // 距离上次调用的时间，更新当前旋转角度
    const newAngle = angle + (ANGLE_STEP * elapsed) / 1000.0

    return newAngle % 360
}