
// 搜索部分
// 配置baseURL
axios.defaults.baseURL = 'https://netease-cloud-music-api-zeta-bice.vercel.app'
// 搜索
let input = document.querySelector('.search input')
let span = document.querySelector('.search span')
span.addEventListener('click', function() {
    axios({
        method: 'GET',
        url: '/cloudsearch',
        params: {
            keywords: input.value
        }
    }).then(response => {
        console.log(response.data.result.songs)
        // console.log(response.data.result.songs[0])
        // console.log(response.data.result.songs[0].name)
        // console.log(response.data.result.songs[0].ar[0].name)
        // console.log(`${response.data.result.songs[0].name}-singer:${response.data.result.songs[0].ar[0].name}`);
        for (let i = 0; i < 5; i++) {
            console.log(`song:${response.data.result.songs[i].name}-singer:${response.data.result.songs[i].ar[0].name}-album:${response.data.result.songs[i].al.name}`);
        }
    })
})
// enter
input.onfocus = function () {
        input.onkeydown = function (e) {
            if (e.keyCode == 13) {
                axios({
                    method: 'GET',
                    url: '/cloudsearch',
                    params: {
                        keywords: input.value
                    }
    
                }).then(response => {
                    console.log(response.data.result.songs)
                    // console.log(response.data.result.songs[0])
                    // console.log(response.data.result.songs[0].name)
                    // console.log(response.data.result.songs[0].ar[0].name)
                    // console.log(`${response.data.result.songs[0].name}-singer:${response.data.result.songs[0].ar[0].name}`);
                    for (let i = 0; i < 5; i++) {
                        console.log(`song:${response.data.result.songs[i].name}-singer:${response.data.result.songs[i].ar[0].name}-album:${response.data.result.songs[i].al.name}`);
                    }
    
                })
            }
        }
    }
// 搜索提示框
// let tit = document.querySelector('.note')
// let suggestList = document.querySelector('.suggest')
// function suggest() {
//     input.addEventListener('keyup', function() {
//         let kw = this.val().trim()
//         suggestList.style.display = 'block'
//         tit.innerHTML = '搜'+kw+'相关用户'
//         _ajaxSerach(kw)
//     })
//     function _ajaxSerach(kw) {
//         axios({
//             method:'GET',
//             url:'/search/suggest?keywords='+kw
//         }).then(res => {
//             console.log(res.data)
//         })
//     }
// }
let tit = document.querySelector('#suggest-list .tit')
let suggestList = document.querySelector('#suggest-list')
function suggest() {
    input.addEventListener('keyup', function() {
        let keywords = input.value
        suggestList.style.display = 'block'
        tit.innerHTML = '搜' + keywords + '相关用户>'
        getSuggestList(keywords)

    })
    function getSuggestList(kw) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://netease-cloud-music-api-zeta-bice.vercel.app/search/suggest?keywords='+kw)
        xhr.send()
        xhr.onreadystatechange = function() {
            if(xhr.readyState === 4) {
                if(xhr.status === 200 || xhr.status === 304) {
                    // console.log(xhr.response)
                    let a = JSON.parse(xhr.response)
                    let b = JSON.parse(xhr.response)
                    let c = JSON.parse(xhr.response)
                    let d = JSON.parse(xhr.response)
                    a = result.songs
                    // console.log(a)
                    b = b.result.artists
                    c = c.result.albums
                    d = d.result.playlists
                    let rows1 = [], rows2 = [], rows3 = [], rows4 = []
                    a.forEach(function(item, i) { //循环拼接字符串
                        rows1.push('<a href="javascript:;" class="list-group-item">'+a[i].name+'</a>')
                    })
                    b.forEach(function(item, i) { //循环拼接字符串
                        rows2.push('<a href="javascript:;" class="list-group-item">'+b[i].name+'</a>')
                    })
                    c.forEach(function(item, i) { //循环拼接字符串
                        rows3.push('<a href="javascript:;" class="list-group-item">'+c[i].name+'</a>')
                    })
                    d.forEach(function(item, i) { //循环拼接字符串
                        rows4.push('<a href="javascript:;" class="list-group-item">'+d[i].name+'</a>')
                    })
                    document.querySelector('.r1').innerHTML = ''
                    document.querySelector('.r1').append(rows1.join('<br/>'))
                    document.querySelector('.r2').innerHTML = ''
                    document.querySelector('.r2').append(rows2.join('<br/>'))
                    document.querySelector('.r3').innerHTML = ''
                    document.querySelector('.r3').append(rows3.join('<br/>'))
                    document.querySelector('.r4').innerHTML = ''
                    document.querySelector('.r4').append(rows4.join('<br/>'))

                }
            }
        }
    }
}



    let cks = document.querySelectorAll('.ban .indicator i')
    let pics = document.querySelectorAll('.banner ul li')
    let next = document.querySelector('.ban .next')
    let prev = document.querySelector('.ban .prev')
    let all = document.querySelector('.ban')
    let ban = document.querySelector('.ban .bg')
    let banBgd = document.querySelector('#bg')
    let banner = document.querySelectorAll('.ban .banner img')
    // 给多个圆点绑定事件，点击某个，移除原先的active，给点击的那个加上active
    for (let i = 0; i < cks.length; i++) {
        cks[i].addEventListener('click', function() {
            document.querySelector('.indicator .active').classList.remove('active')
            this.classList.add('active')
            // 每次点击轮播图要跟着换
            document.querySelector('.banner .active').classList.remove('active')
            pics[i].classList.add('active')
            axios({
                method: 'GET',
                url: '/banner',
                params: {
                    limit:50
                }
        
            }).then(res => {
                // console.log(res.data.banners)
                
                banBgd.style.backgroundImage = `url(${res.data.banners[index].imageUrl})`
        
                
            })
            // 轮播图部分的背景图也要换;修改图片路径
            // ban.style.backgroundImage = `url(./uploads/bg${i+1}.jpg)`
            // if (i == 0) {
            //     ban.style.backgroundImage = "url(./uploads/bg1.jpg)"
            // } else if (i == 1) {
            //     ban.style.backgroundImage = "url(./uploads/bg2.jpg)"
            // } else if (i == 2) {
            //     ban.style.backgroundImage = "url(./uploads/bg3.jpg)"
            // } else if (i == 3) {
            //     ban.style.backgroundImage = "url(./uploads/bg4.jpg)"
            // } else if (i == 4) {
            //     ban.style.backgroundImage = "url(./uploads/bg5.jpg)"
            // } else if (i == 5) {
            //     ban.style.backgroundImage = "url(./uploads/bg6.jpg)"
            // } else if (i == 6) {
            //     ban.style.backgroundImage = "url(./uploads/bg7.jpg)"
            // } else if (i == 7) {
            //     ban.style.backgroundImage = "url(./uploads/bg8.jpg)"
            // }
            index = i
        })
        // 左右按钮点击
        // 需要一个索引来指示
        let index = 0
        next.addEventListener('click', function() {
            index++
            
            index = index % cks.length
            common()
        })
        prev.addEventListener('click', function() {
            index--
            //  console.log(index)
            if (index < 0) {
                index = cks.length - 1
            }
            common()
        })
        function common() {
            document.querySelector('.indicator .active').classList.remove('active')
            cks[index].classList.add('active')
            document.querySelector('.banner .active').classList.remove('active')
            pics[index].classList.add('active')
            axios({
                method: 'GET',
                url: '/banner',
                params: {
                    limit:50
                }
        
            }).then(res => {
                // console.log(res.data.banners)
                
                banBgd.style.backgroundImage = `url(${res.data.banners[index].imageUrl})`
        
                
            })
            // ban.style.backgroundImage = `url(./uploads/bg${index+1}.jpg)`

            // if (index == 0) {
            //     ban.style.backgroundImage = "url(./uploads/bg1.jpg)"
            // } else if (index == 1) {
            //     ban.style.backgroundImage = "url(./uploads/bg2.jpg)"
            // } else if (index == 2) {
            //     ban.style.backgroundImage = "url(./uploads/bg3.jpg)"
            // } else if (index == 3) {
            //     ban.style.backgroundImage = "url(./uploads/bg4.jpg)"
            // } else if (index == 4) {
            //     ban.style.backgroundImage = "url(./uploads/bg5.jpg)"
            // } else if (index == 5) {
            //     ban.style.backgroundImage = "url(./uploads/bg6.jpg)"
            // } else if (index == 6) {
            //     ban.style.backgroundImage = "url(./uploads/bg7.jpg)"
            // } else if (index == 7) {
            //     ban.style.backgroundImage = "url(./uploads/bg8.jpg)"
            // }
        }
        
        //bug:如果点小圆点切换，和按钮切换有冲突
        

    }
    //   其实定时器自动播放，就相当于点击了右侧按钮，此时只需要， next.click()
    let timer = setInterval(function () {
    // 自动调用右侧按钮的点击事件
    next.click()
    }, 3000)
    //   鼠标经过停止定时器 （清除定时器）

    all.addEventListener('mouseenter', function () {
    clearInterval(timer)
    })
    //   鼠标离开开启定时器 （开启定时器）
    all.addEventListener('mouseleave', function () {
    timer = setInterval(function () {
        // 自动调用右侧按钮的点击事件
        next.click()
    }, 3000)
    })

    // 轮播图
// let banBgd = document.querySelector('#bg')
// let banner = document.querySelectorAll('.ban .banner img')
function _ajaxBanner() {
    axios({
        method: 'GET',
        url: '/banner',
        params: {
            limit:50
        }

    }).then(res => {
        // console.log(res.data.banners)
        for (let i = 0; i < banner.length; i++) {
            banner[i].src = res.data.banners[i].imageUrl
            // console.log(111);
            // banBgd.style.backgroundImage = `url(${res.data.banners[i].imageUrl})`
        }
        // banBgd.style.backgroundImage = `url(${res.data.banners[index].imageUrl})`

        
    })
}
// function _ajaxBg() {
//     axios({
//         method: 'GET',
//         url: '/banner',
//         params: {
//             limit:50
//         }

//     }).then(res => {
//         // console.log(res.data.banners)
        
//         banBgd.style.backgroundImage = `url(${res.data.banners[index].imageUrl})`

        
//     })
// }
_ajaxBanner()

// 新碟上架切换
let ul = document.querySelectorAll('.roll ul')
let btn1 = document.querySelector('.inner .prev')
let btn2 = document.querySelector('.inner .next')
btn1.addEventListener('click', function() {
    if (ul[0].classList.contains('active')) {
        ul[0].classList.remove('active')
        ul[1].classList.add('active')
    } else {
        ul[1].classList.remove('active')
        ul[0].classList.add('active')
    }
})
btn2.addEventListener('click', function() {
    if (ul[0].classList.contains('active')) {
        ul[0].classList.remove('active')
        ul[1].classList.add('active')
    } else {
        ul[1].classList.remove('active')
        ul[0].classList.add('active')
    }
})


// 热门推荐部分
let hotListImg = document.querySelectorAll('.content1 img')
let hotListText = document.querySelectorAll('.content1 li p')
function _ajaxHotList() {
    axios({
        method: 'GET',
        url: '/top/playlist',
        params: {
            limit:50
        }

    }).then(res => {
        // console.log(res.data.playlists)
        // console.log(res.data.playlists[0].coverImgUrl)
        // console.log(res.data.playlists[0].name)
        // hotListImg[0].src = res.data.playlists[0].coverImgUrl
        // hotListText[0].innerHTML = res.data.playlists[0].name
        for (let i = 0; i < 8; i++) {
            hotListImg[i].src = res.data.playlists[i].coverImgUrl
            hotListText[i].innerHTML = res.data.playlists[i].name
        }
        
    })
}
_ajaxHotList()

// 新碟上架
let newCDImg = document.querySelectorAll('.n-disk .cover img')
let newCDTitle = document.querySelectorAll('.n-disk .title')
let newCDSinger = document.querySelectorAll('.n-disk .singer')
function _ajaxNewCD() {
    axios({
        method: 'GET',
        url: '/album/newest',
        params: {
            limit:50
        }

    }).then(res => {
        
        for (let i = 0; i < 10; i++) {
            // 图片
            newCDImg[i].src = res.data.albums[i].picUrl
            // 文字信息
            newCDTitle[i].innerHTML = res.data.albums[i].name
            // 歌手名
            newCDSinger[i].innerHTML = res.data.albums[i].artists[0].name
        }
    })
}
// 这里有点击移动效果，不然无法显示所有新碟（未完待续）
_ajaxNewCD()

// 飙升榜
let songs1 = document.querySelectorAll('.bill .bsb .nm')
function _ajaxTopOne () {
    axios({
        method: 'GET',
        url: '/playlist/track/all',
        params: {
            id:19723756
        }
    }).then(res => {
        // console.log(res.data.songs[0].name)
        // console.log(res.data.list[0].tracks[0].first)
        for (let i = 0; i < 10; i++) {
            songs1[i].innerHTML = res.data.songs[i].name
        }
    })
}
_ajaxTopOne()
// 新歌榜
let songs2 = document.querySelectorAll('.bill .xgb .nm')
function _ajaxTopTwo () {
    axios({
        method: 'GET',
        url: '/playlist/track/all',
        params: {
            id:3779629
        }
    }).then(res => {
        // console.log(res.data)
        // console.log(res.data.list[0].tracks[0].first)
        for (let i = 0; i < 10; i++) {
            songs2[i].innerHTML = res.data.songs[i].name
        }
    })
}
_ajaxTopTwo()
// 原创榜
let songs3 = document.querySelectorAll('.bill .ycb .nm')
function _ajaxTopThree () {
    axios({
        method: 'GET',
        url: '/playlist/track/all',
        params: {
            id:2884035
        }
    }).then(res => {
        // console.log(res.data)
        // console.log(res.data.list[0].tracks[0].first)
        for (let i = 0; i < 10; i++) {
            songs3[i].innerHTML = res.data.songs[i].name
        }
    })
}
_ajaxTopThree()
