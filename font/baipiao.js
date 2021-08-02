{
    //找标签
    let music=document.getElementById("music");
    let playBtn=document.getElementById("playBtn");
    let preBtn=document.getElementById("preBtn");
    let nextBtn=document.getElementById("nextBtn");
    let sname=document.getElementById("sname");
    let singer=document.getElementById("singer");
    let musicpic=document.getElementById("musicpic");
    let jdtRight=document.getElementById("jdtRight");
    let gequjd=document.getElementById("gequjd");
    let jdtLeft=document.getElementById("jdtLeft");
    let gequJDBar=document.getElementById("gequJDBar");
    let volJd=document.getElementById("volJd");
    let volColor=document.getElementById("volColor");
    let volBlok=document.getElementById("volBlok");
    let musicImg=document.getElementById("musicImg");
    let text=document.getElementById("text");
    let aiXin=document.getElementById("aiXin");
    let shouCang=document.getElementById("shouCang");
    let xiaZai=document.getElementById("xiaZai");
    let fenXiang=document.getElementById("fenXiang");

    //歌曲。歌曲中的元素
    let songs=[{
        mp3:"img/six.mp3",
        singer:"胡歌",
        name:"六月的雨",
        img:"img/1.jpg",
    },
        {
            mp3:"img/ni.mp3",
            singer:"张杰",
            name:"逆战",
            img:"img/2.jpg",
        },
        {
            mp3:"img/no.mp3",
            singer:"张杰",
            name:"他不懂",
            img:"img/3.jpg",
        }];
    //切歌函数
    let changeMusic=function (index) {
        music.src=songs[index].mp3;//换歌曲
        musicpic.src=songs[index].img;//换图片
        sname.innerHTML=songs[index].name;//换名称
        singer.innerHTML=songs[index].singer;//换歌手
        gequjd.style.width=0;//切歌时进度归0
    };

    //默认加载第一首歌
    let index=0;//当前播放歌曲索引
    changeMusic(index);
    //播放按钮
    playBtn.addEventListener("click",function (event) {
        if(music.paused){
            music.play();
            event.currentTarget.innerHTML="<span class='icon iconfont icon-bofang'></span>";
        }else {
            music.pause();
            event.currentTarget.innerHTML="<span class='icon iconfont icon-zanting'></span>";
        }
    });
    //切歌
    preBtn.addEventListener("click",function (event) {
        index--;
        if(index<=-1){
            index=songs.length-1;
        }
        changeMusic(index);
    });
    nextBtn.addEventListener("click",function (event) {
        index++;
        if(index>songs.length-1){
            index=0;
        }
        changeMusic(index);
    });
    //转换时间
    function setTime(x, times) {
        if (times < 10) {
            x.innerHTML = "0:0" + Math.floor(times);
        } else if (times < 60) {
            x.innerHTML = "0:" + Math.floor(times);
        } else {
            let minute = parseInt(times / 60);
            let second = times - minute * 60;
            if (second < 10) {
                x.innerHTML = "0" + minute + ":" + "0" + parseInt(second);
            }
            else {
                x.innerHTML = "0" + minute + ":" + parseInt(second);
            }
        }
    }
    //歌曲事件
    //元数据加载，显示总时长
    music.addEventListener("loadedmetadata",function (event) {
        let times = music.duration;
        setTime(jdtRight, times);
    });
    //当歌曲可以播放的。切歌的时候就能播放
    music.addEventListener("canplay",function (event) {
        music.play();
    });
    //时间更新事件，歌曲顺利播放的时候，更新进度条和当前的时间
    music.addEventListener("timeupdate",function (event) {
        let jd=music.currentTime/music.duration;//0-1的小数
        let bfb=jd*100+"%";
        gequjd.style.width=bfb;
        let times = music.currentTime;
        setTime(jdtLeft, times);
    });
    //歌曲进度条拖动
    gequJDBar.addEventListener("click",function (event) {
        let x=event.offsetX;//获取鼠标所在位置
        let bfb=x/610*100;
        gequjd.style.width=bfb+"%";
        music.currentTime=music.duration*+bfb/100;
    });
    //音量控制拖动
    let setVol=function(event){
        let x=event.offsetX;//获取音量当前的位置
        let bfb=x/100*100;
        volColor.style.width=bfb+"%";
        volBlok.style.left=bfb+"%";
        text.innerHTML = bfb+"%" ;
        music.volume=bfb/100;
    };
    volJd.addEventListener("click",function (event) {
        setVol(event);
    });
    volJd.addEventListener("mousedown",function (event) {
        volJd.addEventListener("mousemove",setVol);
    });
    volJd.addEventListener("mouseup",function (event) {
        volJd.removeEventListener("mousemove",setVol);
    });
    // 播放完毕，自动下一首
    music.addEventListener("ended",function(){
        nextBtn.click();
    });
    //鼠标点击，爱心变红
    aiXin.addEventListener("click",function (event) {
        event.currentTarget.src = "img/aixin2.png";
    });
    //鼠标点击，已收藏
    shouCang.addEventListener("click",function (event) {
        event.currentTarget.src = "img/shoucang1.png";
    });
    //鼠标点击，已下载
    xiaZai.addEventListener("click",function (event) {
        event.currentTarget.src = "img/xiazai1.png";
    });
    //鼠标点击，已分享
    fenXiang.addEventListener("click",function (event) {
        event.currentTarget.src = "img/fenxiang1.png";
    });
}
