export default function (item) {
    try {
        if (this.isID) {
            //判断ID特殊处理情况
            for (let i = 0; i < Object.keys(item).length; i++) {
                let _key = Object.keys(item)[i];
                this[0].style[_key] = item[_key];
            }
            return this
        }
        if (this.index == 'none') {
            for (let index in this[0]) {
                for (let i = 0; i < Object.keys(item).length; i++) {
                    let _key = Object.keys(item)[i];
                    this[0][index].style[_key] = item[_key];
                }
            }
        } else {
            for (let i = 0; i < Object.keys(item).length; i++) {
                let _key = Object.keys(item)[i];
                let _eq = this.index;
                this[0][_eq].style[_key] = item[_key];
            }
        }
    } catch (e) {

    }



    return this;
}