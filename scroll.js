const pixelsTag = document.querySelector("div.pixels")
const bodyTag = document.querySelector("body")
const progressTag = document.querySelector("div.progress")
const clientTag = document.querySelector("div.client")
const pageTag = document.querySelector("div.page")
const headerTag = document.querySelector("header")

// sections array
const sections = document.querySelectorAll("body section")

// when we scroll the page, update pixels tag to how far scrolled
document.addEventListener("scroll", function () {
    const pixels = window.pageYOffset

    pixelsTag.innerHTML = Math.floor(pixels)
})

// when we scroll, make the progress bar keep track of distance total
document.addEventListener("scroll", function() {
    const pixels = window.pageYOffset
    const pageHeight = bodyTag.getBoundingClientRect().height
    const totalScrollDistance = pageHeight - window.innerHeight

    const percentage = pixels / totalScrollDistance

    progressTag.style.width = `${percentage * 100}%`
})

// when we scroll, see how far we scrolled
// then for each section check when we pass it
// if we pass update the text header content and style
document.addEventListener("scroll", function () {
    const pixels = window.pageYOffset

    sections.forEach(section => {
        if (section.offsetTop - 50 <= pixels) {
            clientTag.innerHTML = section.getAttribute("data-client")
            pageTag.innerHTML = section.getAttribute("data-page")

            if (section.hasAttribute("data-alt")) {
                headerTag.classList.add("alt")
                progressTag.classList.add("alt")
            } else {
                headerTag.classList.remove("alt")
                progressTag.classList.remove("alt")
            }
        }
    })

})

// when we scroll, implement parallex
// move specific tags based on how far they are from anchor point
// a ratio of the middle distance scrolled relative to the middle point of achor

document.addEventListener("scroll", function () {
    const topViewport = window.pageYOffset
    const midViewport = topViewport + (window.innerHeight / 2)

    sections.forEach(section => {
        const topSection = section.offsetTop
        const midSection = topSection + (section.offsetHeight / 2)
        
        const distanceToSection = midViewport - midSection

        // here's a slower way we did it first...
        // const tag = section.querySelector("div.square")
        // const speed = parseFloat(tag.getAttribute("data-parallax"))

        // tag.style.transform = `translate(0px, ${distanceToSection * speed}px)`

        //select tag by data attribute!
        const parallaxTags = section.querySelectorAll(`[data-parallax]`)

        // loop over parallax tags

        parallaxTags.forEach(tag => {
            const speed = parseFloat(tag.getAttribute("data-parallax"))
            tag.style.transform = `translate(0px, ${distanceToSection * speed}px)`
        })
    })

})





