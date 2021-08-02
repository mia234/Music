const log = console.log.bind(console)

const es = function(selector) {
    let elements = document.querySelectorAll(selector)
    if (elements.length === 0) {
        let s = `元素没找到, 选择器 ${selector} 错误`
        alert(s)
        return []
    } else {
        return elements
    }
}

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        // 关闭控制台的提示
        // let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        // alert(s)
        return null
    } else {
        return element
    }
}


// 页面的播放/暂停按钮的切换
const bindEventPlay = function(audio) {
    // 在原有代码的基础上进行修改，把播放和暂停 并在一个按钮
    let button = e('.fa-play')
    button.addEventListener('click', function() {
        // log('if', audio.paused)
        if (audio.paused) {
            // 播放
            // log('play')
            audio.play();
            //如果播放  点击暂停
            button.classList.remove('fa-play-circle')
            button.classList.add('fa-pause-circle')

            // 默认是none样式不显示的，添加动画样式
            let bars = e('.bars')
            bars.classList.remove('none')

        } else if (audio.play()) {
            //暂停
            audio.pause();
            button.classList.remove('fa-pause-circle')
            button.classList.add('fa-play-circle')

            // 删除动画样式
            let bars = e('.bars')
            bars.classList.add('none')

        }
        // switchPlayButton(audio.paused)
    })
}

// bindEventCanplay 拿到当前歌曲的总时长 显示在页面
const bindEventCanplay = function(audio) {
    audio.addEventListener('canplay', function() {
        // duration 是歌曲的总时长
        let duration = audio.duration
        let div = e('.playbar_right')
        //   Math.floor（）小数向下取整   计算分
        let minute = Math.floor(duration / 60)
        // 计算秒
        let second =  Math.floor(duration - minute * 60)
        // 把分和秒的时间添加到页面显示出来
        div.innerHTML = `<span>0${minute}:${second}</span>`
        audio.play()
    })
}

// demoTimer   获取当前播放时间   并显示在页面
const demoTimer = function(audio) {
    let clockId = setInterval(function() {
        // audio.currentTime 是当前播放时间
        let currentTime = audio.currentTime
        let duration = audio.duration
        if (currentTime === duration) {
            clearInterval(1)
        }
        let div = e('.playbar_left')
        // 计算分
        let minute = Math.floor(currentTime / 60)
        // 计算秒
        let second = Math.floor(currentTime - minute * 60)
        // 把分和秒的时间添加到页面显示出来,并且秒数在页面是 个位数时，前面加上0，不是个位数时，前面不加0
        let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,]
            if (array.includes (second)) {
                // log('if', toString(second))
                div.innerHTML = `<span>0${minute}:0${second}  </span>`
            } else {
                div.innerHTML = `<span>0${minute}:${second}  </span>`
            }
    }, 1000)
}

// 点击按钮切换下一首歌的代码
const bindEventnextsong = function(audio) {
    let button = e('.fa-step-forward')
    button.addEventListener('click', function() {
        let music = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"]
        let active = parseInt(audio.dataset.active, 10)
        let nextIndex = (active + music.length + 1) % music.length
        audio.dataset.active = nextIndex
        audio.src = music[nextIndex]
    })
}

// 切换上一首代码
const bindEventprevioussong = function(audio) {
    let button = e('.fa-step-backward')
    button.addEventListener('click', function() {
        let music = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"]
        let active = parseInt(audio.dataset.active, 10)
        let shangIndex = (active + music.length * 2 - 1) % music.length
        audio.dataset.active = shangIndex
        audio.src = music[shangIndex]
    })
}

// 随机播放
const choice = function(array) {
    let l = Math.random() * array.length
    let index = Math.floor(l)
    log('index', index)
    return array[index]

}
// 点击按钮随机播放
const random = function(audio) {
    // 笔记：在原来的随机播放的基础上改动了些逻辑
    let random = e('#id-farandom')
    random.addEventListener('click', function() {
        let array = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"]
        audio.src = choice(array)
        audio.play()
    })
}

//折叠的随机播放
const random2 = function(audio) {
    // 笔记：在原来的随机播放的基础上改动了些逻辑
    let random = e('#id-fa-random')
    // log('random', random)
    random.addEventListener('click', function() {
        // log('click', random)
        let array = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"]
        audio.src = choice(array)
        audio.play()
    })
}

// 点击按钮单曲循环
const bindEventEnded = function(audio) {
    // 在原代码基础上改了些，绑定了个按钮
    let button = e('.fa-repeat')
    button.addEventListener('click', function() {
        // 点击播放音乐，播放完之后触发ended事件继续播放当前的歌曲，当前的歌曲就是 audio.src
        audio.play()
    })
}

// 顺序播放
const bindEventcirculate = function(audio) {
    // 笔记：audio 是播放器   ended事件表示 结束，当一首歌播放完毕就会触发的事件
    audio.addEventListener('ended', function (event) {
        // 获取到每个点击的值    self是目前点击的值
        let music = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"]
        let self = e('.menu-content')
        // let self = event.target
        // 当前的自定义属性值,并转为数字类型
        let active = parseInt(self.dataset.active, 10)
        let nextIndex = (active + music.length + 1) % music.length
        self.dataset.active = nextIndex
        audio.src = music[nextIndex]
    })
}

// 播放完成自动切换下一首歌的代码
// const nextSong = function(audio) {
//     // let button = e('#id-button-nextsong')
//     audio.addEventListener('click', function() {
//         let music = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"]
//         // 当前播放的下标 (自定义属性值), 并转为数字类型
//         let active = parseInt(audio.dataset.active, 10)
//         // log('active', active, audio.dataset.active)
//         // 笔记： 处理边界 一开始active为0，为了避免负数所以 加上music.length + 1
//         let nextIndex = (active + music.length + 1) % music.length
//         // 把新的下标nextIndex赋值给 self.dataset.active改变 active的值
//         audio.dataset.active = nextIndex
//         // 拿到新的下标播放下一首歌
//         audio.src = music[nextIndex]
//
//     })
// }

// 点击按钮顺序播放
const music = function(audio) {
    let famusic = e('.fa-music')
    famusic.addEventListener('click', function () {
        bindEventcirculate(audio)
    })
}

const bindAll = function(elements, eventName, callback) {
    for (let i = 0; i < elements.length; i++) {
        // log('if', elements[i])
        let tag = elements[i]
        tag.addEventListener(eventName, callback)
    }
}

// 点击音乐 播放点击的音乐
const bind = function(audio) {
    let bs = es('.menu-content')
    bindAll(bs, 'click', function(event) {
        let self = event.target
        let path = self.dataset.path
        audio.src = path
    })
}

// 进度条
const nowTimer = function(audio) {
    let clockId = setInterval(function (event) {
        // audio.currentTime 是当前播放时间
        let currentTime = audio.currentTime
        // duration 是歌曲总时间
        let duration = audio.duration
        // 拿歌曲时间的比值
        let time = currentTime / duration
        // 获取进度条   outer.offsetWidth   可以获取到进度条的总长度
        let OuterWidth = e('.playbar')
        // 获取进度条元素，inter，就是绿色那一段，   然后获取绿色那一段的长度   inter.offsetWidth
        let inter = e('.playbar_inner')
        // 计算进度条比值
        // 进度条的原理是： 当前时间 / 总时间 和  小圆点移动的距离 / 总距离   两者的比值是相等的
        // 计算过程  duration / currentTime = x / outer.offsetWidth        把进度条移动的距离设置为x，求出来的x就是移动距离
        let len = inter.offsetWidth / OuterWidth.offsetWidths
        let x = (OuterWidth.offsetWidth * currentTime) / duration + 'px'
        inter.style.width = x

    }, 1000)

}


const bindMouseEvents = (audio) => {
    //  小圆点中间部分
    let inner = e('.playbar_inner')
    // 表示是 水平线
    let outer = e('.playbar')
    // 小圆点
    let dot = e('.dot')
    let max = outer.offsetWidth
    let moving = false
    // 初始偏移量
    let offset = 0
    // 笔记：当鼠标在进度条按下时 触发事件是 mousedown
    dot.addEventListener('mousedown', (event) => {
        offset = event.clientX - dot.offsetLeft
        moving = true
    })

    document.addEventListener('mouseup', (event) => {
        moving = false

    })
    //  笔记：当鼠标在进度条移动时 触发 mousemove
    document.addEventListener('mousemove', (event) => {
        if (moving) {
            let x = event.clientX - offset
            // dot 距离有一个范围, 即 0 < x < max     max=800
            if (x > max) {
                x = 0
            }
            if (x < 0) {
                x = 0
            }
            let width = (x / max) * 100
            inner.style.width = String(width) + '%'
            audio.currentTime = audio.duration * width / 100

        }
    })
}





const bindEvents = function() {
    let audio = e('#id-audio-player')
    bindEventPlay(audio)
    bindEventcirculate(audio)
    bindEventCanplay(audio)
    bindEventnextsong(audio)
    bindEventprevioussong(audio)
    random(audio)
    bindEventEnded(audio)
    random2(audio)
    music(audio)
    demoTimer(audio)
    // music2(audio)
    bind(audio)
    nowTimer(audio)
    bindMouseEvents(audio)

}


const __main = function() {
    bindEvents()


}

__main()