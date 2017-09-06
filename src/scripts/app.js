
import _prototype from '../module/_prototype.js'
(function () {
    const JQ = function (el) {
        return JQ.prototype.fn(el)
    }
    JQ.prototype = _prototype;
    JQ.prototype.fn.prototype = JQ.prototype;
    window.$ = JQ;
})(window)

// $('.a').eq(0).css({ 'width': '500px' })

// $('#abc').css({ 'background': 'red' })

// $('div').eq(2).css({ 'background': 'green' })
// $('#abc').css({ 'background': 'blue' })
// let c = document.getElementsByClassName('c')[0];
// let d = c.getElementsByClassName('d')[0];
// let e = d.getElementsByClassName('e')[0]
// console.log(e)
// d.innerHTML = '123'
$('.c').css({'width':'200px','height':'300px','background':'red'})