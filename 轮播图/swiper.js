function Swiper({img,box,list,arrow,time,loop}){
    this.img = img
    this.box = box
    this.list = list
    this.arrow = arrow
    this.index = 1
    this.time = time
    this.loop = loop
    this.next = ''
    this.prev = ''
    this.init()
}
Swiper.prototype.init = function(){
    var html,lis,imgs,a,prev,next,sliders
    var _this = this
    for (var i = 0; i < this.img.length; i++) {
        lis = document.createElement('li')
        lis.classList.add('lis')
        a = document.createElement('a')
        a.setAttribute('href','javascript:;')
        imgs = document.createElement('img')
        imgs.setAttribute('src',this.img[i])
        imgs.classList.add('swiper-img')
        lis.appendChild(a)
        a.appendChild(imgs)
        this.list.appendChild(lis)
    }
    if (this.arrow){
        prev = document.createElement('div')
        prev.classList.add('arrow-left','prev')
        next = document.createElement('div')
        next.classList.add('arrow-right','next')
        this.next = next
        this.prev = prev
        this.box.appendChild(prev)
        this.box.appendChild(next)
    }
    this.lis = document.querySelectorAll('.lis')
    this.imgs = document.querySelectorAll('.swiper-img')
    this.offset_l = this.list.offsetLeft
    this.lis_w = this.lis[0].offsetWidth
    var lis_l = this.lis.length
    this.list.style.width = (this.lis_w*lis_l) + 'px'
    sliders = document.createElement('ul')
    sliders.classList.add('sliders')
    this.box.appendChild(sliders)
    for (var i = 1; i < this.imgs.length-1; i++) {
        html = document.createElement('li')
        html.classList.add('slider-item')
        html.setAttribute('data-index',i)
        if (i==_this.index){
            html.classList.add('active')
        }
        sliders.appendChild(html)
        html.onclick = function(e){
            _this.click_item(e)
        }
    }
    if (!this.loop){
        sliders.style.display = 'none'
    }
    if (this.time){
        this.timing()
    }
    this.item = document.querySelectorAll('.slider-item')
    this.next.onclick = function(){
        _this.next_img()
    }
    this.prev.onclick = function(){
        _this.prev_img()
    }
    this.list.onmouseover = function(){
        _this.mouse()
    }
    this.list.onmouseout = function(){
        _this.out()
    }
    this.next.onmouseover = function(){
        _this.mouse()
    }
    this.next.onmouseout = function(){
        _this.out()
    }
    this.prev.onmouseover = function () {
        _this.mouse()
    }
    this.prev.onmouseout = function(){
        _this.out()
    }
}

Swiper.prototype.next_img = function(){
    var _this = this
    var slider_item = document.querySelectorAll('.slider-item')
    var offset_left
    this.index++
    if (this.index == this.img.length-1){
        this.index = 0
        offset_left = this.index*this.lis_w
        this.list.style.transition = 'all 0s'
        this.list.style.transform = 'translateX('+ -offset_left +'px'+')'
        this.index = 1
    }
    setTimeout(function(){
        offset_left = _this.index*_this.lis_w
        _this.list.style.transition = 'all .5s'
        _this.list.style.transform = 'translateX('+ -offset_left +'px'+')'
    },0)
    this.slider_active(this.index)
}
Swiper.prototype.prev_img = function(){
    var _this = this
    var offset_right
    var slider_item = document.querySelectorAll('.slider-item')
    this.index--
    if (this.index == 0){
        this.index = this.imgs.length -1
        offset_right = this.index*this.lis_w
        this.list.style.transition = 'all 0s'
        this.list.style.transform = 'translateX('+ -offset_right +'px'+')'
        this.index = this.imgs.length -2
    }
    setTimeout(function(){
        offset_right = _this.index*_this.lis_w
        _this.list.style.transition = 'all .5s'
        _this.list.style.transform = 'translateX('+ -offset_right +'px'+')'
    },0)
    this.slider_active(this.index)
}
Swiper.prototype.click_item = function(e){
   var index = e.target.getAttribute('data-index')
   this.index = index
   var offset_left = this.index*this.lis_w
   this.list.style.transform = 'translateX('+ -offset_left +'px'+')'
   this.slider_active(this.index)
}
Swiper.prototype.slider_active = function(index){
    for (var i = 0; i < this.item.length; i++) {
        this.item[i].classList.remove('active')
    }
    this.item[index-1].classList.add('active')
}
Swiper.prototype.timing=function(){
    var _this = this
    this.t = setInterval(function(){
        _this.next_img()
    },this.time || 2000)
}
Swiper.prototype.mouse = function(){
    clearInterval(this.t)
}
Swiper.prototype.out = function(){
    this.timing()
}
