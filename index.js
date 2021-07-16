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

}

/*
    accepts slideInfo : {
                title : String,
                text  : String, 
                image : String, (title of img in images folder)
                choices : [ {
                    link : String, 
                    text : String, 
                    img : String (title of img in images folder)
                } ... ]
    }
    // returns a choice slide with 2-6 option tiles
*/
function generateChoiceSlide(slideInfo) {

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
    // returns a deep dive slide with a full blog-style information page
*/
function generateInfoSlide(slideInfo) {

}
const templates = [
    `<div class="">`,
    ``,
    ``
]