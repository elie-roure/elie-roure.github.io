class Image {

    constructor(idImage, theme) {
        this.idImage = idImage;
        this.src = "img/" + theme + "/" + theme + "_" + idImage + ".jpg";
    }

    changerTheme(theme) {
        this.src = "img/" + theme + "/" + theme + "_" + this.idImage + ".jpg";
    }

    getImage() {
        return this.src;
    }

    trou() {
        return this.idImage === 15;
    }

}