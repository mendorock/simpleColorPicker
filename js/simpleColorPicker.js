/*
let menu = document.createElement("div");
let box     = `
<div class="colors">
    <div class="boton" data-color="blue"></div>
    <div class="boton" style="background: red" data-color="red"></div>
    <div class="boton" style="background: #ff00ff" data-color="#ff00ff"></div>
</div>
`;
menu.classList.add("drop-down-menu");
menu.setAttribute("id", "myColors")
menu.innerHTML=box;


mySpan.addEventListener("click", function (e) {
    document.body.append(menu);
    botones     = document.getElementById("myColors");
    let posX    = this.offsetLeft;
    let posY    = this.offsetTop;
    let info    = menu.getBoundingClientRect();
    let tamX    = info.width;
    let tamY    = info.height;
    let calcX   = ((this.offsetWidth/2) - (tamX/2) )+ posX;
    let calcY   = ((this.offsetTop) - tamY) - 12;
    menu.style.left = calcX + 'px';
    menu.style.top  = calcY + 'px';
    //var tam = getComputedStyle(menu, null).getPropertyValue('width');
    //let tam     = this.style.width;
    console.log(tamX, calcX, posX, posY, this.offsetWidth);
    //document.body.appendChild(box);
    botones.addEventListener("click", function (e){
        if(e.target && e.target.classList=="boton"){
            console.log(e.target.dataset.color);
            menu.remove();
        }
    })

});
*/

class simpleColorPicker{
    constructor(elementId, options = {}) {
        this.element = document.getElementById(elementId);
        this.copied  = elementId;
        this.options = {
            width: 15,
            height: 15,
            borderColor: '#cccccc',
            colors: ['red', 'yellow', 'green'],
          ...options // Sobreescribe las opciones por defecto si se proporcionan
        };
    
        this.transformElements(this.element, this.options.width, this.options.height, this.options.borderColor, this.options.colors );
        //this.agregarEventos();
    }

    transformElements(element, width, height, borderColor, bgColor){
        element.type = "hidden";
        element.value = bgColor[0];
        element.insertAdjacentHTML('afterend', '<div id="selectColor-'+this.copied+'"></div>');
        let newBox = document.getElementById('selectColor-'+this.copied);
        newBox.style.width  = width+'px';
        newBox.style.height = height+'px';
        newBox.style.background = bgColor[0];
        newBox.style.borderColor = borderColor;
        newBox.style.borderWidth = '1px';
        newBox.style.borderStyle = 'solid';
        newBox.style.cursor = 'pointer';
        this.addEventBtn(newBox, element);
    }

    addEventBtn(theBox, element){
        let menu = document.createElement("div");
        let cBox = document.createElement("div");
        menu.id = 'myColors-'+this.copied;
        menu.classList.add("drop-down-menu");
        cBox.classList.add('colors');
        this.options.colors.forEach((elem) => {
            let uColor = document.createElement('div');
            uColor.classList.add('boton');
            uColor.style.background = elem;
            uColor.setAttribute("data-color", elem);
            cBox.appendChild(uColor);
        });

        //menu.setAttribute("id", 'myColors-'+this.copied)
        menu.appendChild(cBox);
        theBox.title = this.copied;
        theBox.addEventListener("click", function (e) {
            document.body.append(menu);
            let botones = document.getElementById('myColors-'+this.title);
            //console.log(this.title);
            let posX    = this.offsetLeft;
            let posY    = this.offsetTop;
            let info    = menu.getBoundingClientRect();
            let tamX    = info.width;
            let tamY    = info.height;
            let calcX   = ((this.offsetWidth/2) - (tamX/2) )+ (posX -18);
            let calcY   = ((this.offsetTop) - tamY) - 32;
            menu.style.left = calcX + 'px';
            menu.style.top  = calcY + 'px';
            //var tam = getComputedStyle(menu, null).getPropertyValue('width');
            //let tam     = this.style.width;
            //console.log(tamX, calcX, posX, posY, this.offsetWidth);
            //document.body.appendChild(box);
            botones.addEventListener("click", function (e) {
                //console.log(e);
                if(e.target && e.target.classList=="boton"){
                    let nColor = e.target.dataset.color;
                    theBox.style.background = nColor;
                    element.value = nColor;
                    menu.remove();
                }
            });
        
        });
    }
}