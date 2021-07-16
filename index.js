document.onload = function () {
    generateSlides();
}

/*
    accepts slideInfo : {
                title : String,
                text  : String, 
                image : String, (title of img in images folder)
                callToAction : {
                    link : "https: url", 
                    text : "String"
                }, 
                learnMore : {
                    link : "https: url", 
                    text : "String"
                }
    }
    // returns a general info slide
*/
function generateSlide (slideId) {

    const template = 
    `<div class="slide">
        <div class="left">
            <img src="${ slideInfo.img }"
        </div>
        <div>
            <h1>${ slideInfo.id }</h1>
            <span>${ slideInfo.text }</span>
            <a class="cta" href="${ slideInfo.callToAction.link }">${ slideInfo.callToAction.text }</a>
            <a class="cta learnMore" href="${ slideInfo.learnMore.link }">${ slideInfo.learnMore.text }</a>
        </div>
    </div>
    `;
    return template;
}

/*
    accepts slideInfo : {
                title : String,
                text  : String, 
                image : String, (title of img in images folder)
                choices : [ {
                    link : String, (a valid SlideID)
                    text : String, 
                    img : String (title of img in images folder)
                } ... ]
    }
    // returns a choice slide with 2-6 option tiles
*/
function generateChoiceSlide(slideInfo) {
    var choiceTiles = "";
    for (item of slideInfo.choices) {
        choiceTiles += `
            <div class="choiceTile" onclick="loadSlide(${ item.id })">
                <img src="${ item.img }">
                <h1>${ item.title }</h1>
                <span>${ item.text }</span>
            </div>`
    }

    const template = 
            `<div class="slide">
                <div class="top">
                    <h1>${ slideInfo.id }</h1>
                    <span>${ slideInfo.text }</span>
                </div>
                <div>
                    ${ choiceTiles }
                </div>
            </div>
            `;
    return template;
}