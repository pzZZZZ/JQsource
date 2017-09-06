export default function (ele) {
    let el = ele.trim()
    let _document = document;
    let arrEl = el.match(/[^\s]+/g);
    let  TT = null;
    if (arrEl.length > 1) {
        for (let i in arrEl) {
            let el  = arrEl[i];
            if(this[0]){
                if (el.match(/^\./)) {
                    let tpl = this[0];
                    this[0] = tpl[0].getElementsByClassName(el.match(/[^\.]+/g));
                }
            }else{
                if (el.match(/^\./)) {
                    this[0] = document.getElementsByClassName(el.match(/[^\.]+/g));
                }
            }
        }
    }
    // console.log(this)
    //选择器模块
    if (el.match(/^\./)) {
        this[0] = document.getElementsByClassName(el.match(/[^\.]+/g));
        this.isID = false;
    }
    if (el.match(/^\#/)) {
        this[0] = document.getElementById(el.match(/[^#]+/g));
        this.isID = true;
    }
    if (el.match(/^[a-zA-Z0-9]+/g)) {
        this[0] = document.getElementsByTagName(el.match(/^[a-zA-Z0-9]+/g))
        this.isID = false;
    }
    console.log(this[0])
    return this;
}