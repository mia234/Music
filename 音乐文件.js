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
       
        return null
    } else {
        return element
    }
}


// 页面的播放/暂停按钮的切换
const bindEventPlay = function(audio) {
    
    let button = e('.fa-play')
    button.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            button.classList.remove('fa-play-circle')
            button.classList.add('fa-pause-circle')
            let bars = e('.bars')
            bars.classList.remove('none')

        } else if (audio.play()) {
            audio.pause();
            button.classList.remove('fa-pause-circle')
            button.classList.add('fa-play-circle')

            let bars = e('.bars')
            bars.classList.add('none')

        }
        // switchPlayButton(audio.paused)
    })
}

// bindEventCanplay 拿到当前歌曲的总时长 显示在页面
const bindEventCanplay = function(audio) {
    audio.addEventListener('canplay', function() {
        let duration = audio.duration
        let div = e('.playbar_right')
        let minute = Math.floor(duration / 60)
        let second =  Math.floor(duration - minute * 60)
        div.innerHTML = `<span>0${minute}:${second}</span>`
        audio.play()
    })
}

// demoTimer   获取当前播放时间   并显示在页面
const demoTimer = function(audio) {
    let clockId = setInterval(function() {
        let currentTime = audio.currentTime
        let duration = audio.duration
        if (currentTime === duration) {
            clearInterval(1)
        }
        let div = e('.playbar_left')
        let minute = Math.floor(currentTime / 60)
        let second = Math.floor(currentTime - minute * 60)
        let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,]
            if (array.includes (second)) {
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
    let random = e('#id-farandom')
    random.addEventListener('click', function() {
        let array = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"]
        audio.src = choice(array)
        audio.play()
    })
}

//折叠的随机播放
const random2 = function(audio) {
    let random = e('#id-fa-random')
    random.addEventListener('click', function() {
        let array = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"]
        audio.src = choice(array)
        audio.play()
    })
}

// 点击按钮单曲循环
const bindEventEnded = function(audio) {
    let button = e('.fa-repeat')
    button.addEventListener('click', function() {
        audio.play()
    })
}

// 顺序播放
const bindEventcirculate = function(audio) {
    audio.addEventListener('ended', function (event) {
        let music = ["audio/1.mp3", "audio/2.mp3", "audio/3.mp3"]
        let self = e('.menu-content')
        let active = parseInt(self.dataset.active, 10)
        let nextIndex = (active + music.length + 1) % music.length
        self.dataset.active = nextIndex
        audio.src = music[nextIndex]
    })
}

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
        let currentTime = audio.currentTime
        let duration = audio.duration
        let time = currentTime / duration
        let OuterWidth = e('.playbar')
        let inter = e('.playbar_inner')
        let len = inter.offsetWidth / OuterWidth.offsetWidths
        let x = (OuterWidth.offsetWidth * currentTime) / duration + 'px'
        inter.style.width = x

    }, 1000)

}


const bindMouseEvents = (audio) => {
    let inner = e('.playbar_inner')
    let outer = e('.playbar')
    let dot = e('.dot')
    let max = outer.offsetWidth
    let moving = false
    let offset = 0
    dot.addEventListener('mousedown', (event) => {
        offset = event.clientX - dot.offsetLeft
        moving = true
    })

    document.addEventListener('mouseup', (event) => {
        moving = false

    })
    
    document.addEventListener('mousemove', (event) => {
        if (moving) {
            let x = event.clientX - offset
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
    bind(audio)
    nowTimer(audio)
    bindMouseEvents(audio)

}


const __main = function() {
    bindEvents()


}

__main()
