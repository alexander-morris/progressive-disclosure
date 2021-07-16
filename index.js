const slides = []

function init () {
    console.log('init ran')
    assignSlides()
    showSlide(window.location.hash)
}

async function showSlide (slideId) {
    console.log('about to show slide', slideId)
    if (slideId.includes('#')) slideId = slideId.split('#').join('')
    if (!slideId ) slideId = 'genesis'
    let slide = slides[slideId]
    let newBody = {}
    if ( slide.type === "info" ) {
        newBody = await generateSlide(slides[slideId])
    } else if ( slide.type === "choice" ) {
        newBody = generateChoiceSlide(slides[slideId])
    }
    document.body.innerHTML = newBody
    window.location.hash = slideId
    window.slideId = slideId;
}

if ("onhashchange" in window) { // event supported?
    console.log('tried to check')
    window.onhashchange = function () {
        console.log('hash change detected', window.location.hash)
        showSlide(window.location.hash);
    }
}
else { // event not supported:
    var storedHash = window.location.hash;
    console.log('set interval from', storedHash)
    window.setInterval(function () {
        if (window.location.hash != storedHash) {
            console.log('hash change detected', window.location.hash, storedHash)
            storedHash = window.location.hash;
            showSlide(storedHash);
        }
    }, 100);
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
async function generateSlide (slideInfo) {
    return `
    <div class="slide">
        <div class="left">
            <img src="${ slideInfo.img }"
        </div>
        <div>
            <h1>${ slideInfo.title }</h1>
            <span>${ slideInfo.text }</span>
            <a class="cta" href="${ slideInfo.callToAction.link }">${ slideInfo.callToAction.text }</a>
            <a class="cta learnMore" href="${ slideInfo.learnMore.link }">${ slideInfo.learnMore.text }</a>
        </div>
        <a class="backButton startover" onclick="showSlide('genesis')">start over</a>
        <a class="backButton" onclick="showSlide('${ window.slideId }')">back</a>
    </div>
    `
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
            <div class="choiceTile" onclick="showSlide('${ item.link }')">
                <img src="${ item.img }">
                <span>${ item.text }</span>
            </div>`
    }

    return `
        <div class="slide">
            <div class="top">
                <span>${ slideInfo.text }</span>
                <h1>${ slideInfo.title }</h1>
            </div>
            <div class="choices">
                ${ choiceTiles }
            </div>
        </div>
        <a class="backButton startover" onclick="showSlide('genesis')">start over</a>
        `;
    
}
function assignSlides () {
    /* Question Slides */
    slides["genesis"] = {
        type : "choice",
        title : "I want to _____________.",
        text  : "Koii is a new internet How do you want to leave your mark?", 
        image : "", 
        choices : [ {
            link : "builders",
            text : "build the future", 
            img : "img/builder.png"
        }, {
            link : "artists",
            text : "NFT'ify Everything", 
            img : "img/artist.png"
        }, {
            link : "supporters",
            text : "just like to watch", 
            img : "img/watcher.png"
        }  ]
    }
    slides["builders"] = {
        type : "choice",
        title : "What are you into?",
        text  : "Koii is here to make the journey easy.", 
        image : "", 
        choices : [ {
            link : "guru",
            text : "P2P Guru", 
            img : "img/hacker.png"
        }, {
            link : "learn-p2p",
            text : "Teach Me to P2P", 
            img : "img/neophyte.png"
        }, {
            link : "innovators",
            text : "Grants Program", 
            img : "img/grants.jpg"
        }  ]
    }
    slides["artists"] = {
        type : "choice",
        title : "We're working hard to solve your problems.",
        text  : "Even as artists migrate to digital creation and distribution, barriers to a truly creator-centric experience continue to make the process harder than it has to be.", 
        image : "", 
        choices : [ {
            link : "mint-nfts-right",
            text : "NFTs don't have to be so expensive...", 
            img : "img/mint.png"
        }, {
            link : "art-ownership",
            text : "Who owns my art?", 
            img : "img/art.png"
        }, {
            link : "copyright",
            text : "Simplified Copyright Registration", 
            img : "img/copycat.jpeg"
        }  ]
    }

    /* Detail Slides*/
        slides["guru"] = {
            type : "info",
            title : "Try using storage-based consensus?",
            text  : "Koii is a more scalable way to build dApps, and supports out of the box consensus in JavaScript-based code.", 
            image : "hacker.png", 
            callToAction : {
                link : "https://docs.koii.network/", 
                text : "Hit the Docs"
            }, 
            learnMore : {
                link : "https://koii.network/gradual-consensus.pdf", 
                text : "Read theBigDoc.pdf"
            }
        }
        slides["learn-p2p"] = {
            type : "info",
            title : "Try using storage-based consensus?",
            text  : "'Blockchain' is a dirty word. We prefer to use 'consensus network' or 'p2p content'.", 
            image : "neophyte.png", 
            callToAction : {
                link : "https://docs.koii.network/", 
                text : "Hit the Docs"
            }, 
            learnMore : {
                link : "https://koii.network/gradual-consensus.pdf", 
                text : "Read theBigDoc.pdf"
            }
        }
        slides["innovators"] = {
            type : "info",
            title : "Apply to design the future?",
            text  : "", 
            image : "hacker.png", 
            callToAction : {
                link : "https://docs.koii.network/", 
                text : "Hit the Docs"
            }, 
            learnMore : {
                link : "https://koii.network/gradual-consensus.pdf", 
                text : "Read theBigDoc.pdf"
            }
        }

    /* Detail Slides - artist */
    slides["mint-nfts-right"] = {
        type : "info",
        title : "IT COSTS TOO MUCH TO MINT AN NFT!",
        text  : `
            You’re not wrong. Sometimes artists are quite literally priced out of the market for minting NFTs on the Ethereum blockchain when gas prices go through the roof.

            Darren Kleine, an artist who often sells his pieces for a fraction of an ETH, has seen prices for minting work reach $400 briefly, and “stabilize” around the $200 mark when the network is busy.

            That’s not sustainable. It’s not inclusive. And it’s not reasonable.

            Which is why the cost of minting an NFT on the Koii Network is around 1/10th of one cent.

            So now, everyone can join in.
`, 
        image : "mint.png", 
        callToAction : {
            link : "https://koii.network/getFinnie", 
            text : "Try the Finnie Wallet"
        }, 
        learnMore : {
            link : "#art-ownership", 
            text : "Learn More"
        }
    }
    slides["art-ownership"] = {
        type : "info",
        title : "I DON’T REALLY OWN MY ARTWORK IF SOMEONE ELSE DOES…",
        text  : `
        When you create an NFT, you own it - right?

Well… not so fast. Most NFTs are actually pointers to a specific place where a media file resides. And that place is most often a centralized hub.

Which means that if the hub runs out of money, or gets hacked, or the owners just decide they want to do something else with their lives - your NFT address may not resolve to a file.

In which case, do you really own anything at all?

Koii Network NFTs are (wrapped up in a smart contract with the file, help me out with this!)
`, 
        image : "art.png", 
        callToAction : {
            link : "https://docs.koii.network/", 
            text : "Hit the Docs"
        }, 
        learnMore : {
            link : "https://koii.network/gradual-consensus.pdf", 
            text : "Read theBigDoc.pdf"
        }
    }
    slides["copyright"] = {
        type : "info",
        title : "I'M TIRED OF PAYING ROYALTIES!",
        text  : `
        Our entire Internet is built on the concept that between you and your buyer we need PEOPLE IN THE MIDDLE! And they MUST GET PAID!
        
        Why would you want to go around disrupting the status quo? It’s been so successful! (For a few tech billionaires.)
        
        Yeah, okay, we’ll dispense with the fake outrage, because there’s plenty of room here for the real thing. Intermediaries take your money… lots of it. Apple’s famous 30% cut on everything in the App Store isn’t even the most egregious example.
        
        So we’re changing the paradigm. We’re removing the obstacles between creator and collector. Which means that the payments and royalties you get are the payments and royalties you earn.
        
        (If we disappear under mysterious circumstances, please tell the FBI to check under Tim Cook’s bed…)
        `, 
        image : "copycat.jpeg", 
        callToAction : {
            link : "#gallery-crash", 
            text : "What to do when your gallery shuts down.."
        }, 
        learnMore : {
            link : "https://koi.rocks/", 
            text : "Check out Koii's Open Leaderboard"
        }
    }
    slides["gallery-crash"] = {
        type : "info",
        title : "WHAT IF THE GALLERY CLOSES DOWN?",
        text  : `
        Oh, not cool. Not cool at all.

You spend months, years, curating a collection of your work. You agonize over descriptions, chronological order or based on personal importance, how to organize collections… this is your whole artistic life.

And then bam, it’s gone, no warning. Who knows what happened. The gallery ran out of money, their web host banned them, the owners went off to make wine in Tuscany.

We’re not going to harp too much on the merits of decentralization, but the fact is that every time you entrust your life’s work to a centralized entity, there’s a risk.

Not so with Koii Network. Because… (Arweave, decentralized, etc etc)

        `, 
        image : "crash.png", 
        callToAction : {
            link : "#artists", 
            text : "Learn More"
        }, 
        learnMore : {
            link : "https://koii.network/getFinnie", 
            text : "Try the New Way"
        }
    }

    console.log('assign slides success', slides)
}

// background scrolley
// setInterval( function() {
//     console.log('scrolley ran', document.body.style.backgroundPositionX )
//     document.body.style.backgroundPositionX = document.body.style.backgroundPositionX + 100;
// }, 10)
    