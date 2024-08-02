export const loadImages = (urls) => {
    urls.forEach((url) => {
        let img = new Image();
        img.src = url
    })
}