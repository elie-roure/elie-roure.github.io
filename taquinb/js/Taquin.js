class Taquin {

    constructor() {
        this.nbCoups = 0;
        this.cases = [];
        this.theme = "spectacle";


        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++){
                this.cases.push(new Case(i, j, this.theme, i * 4 + j));
            }
        }

        this.cases.push(new Case(100, 100, this.theme, 16));

        for(let c of this.cases){
            c.actualiserAffichage();
        }

        for(let c of this.cases) {
            document.getElementById(c.idCase).onclick = () => {
                let cv = this.trou();
                this.nbCoups += c.permuterCase(cv);
                this.afficher();
                this.victoire();
            };
        }
        document.getElementById("melanger").onclick = () => this.melanger();
        document.getElementById("solution").onclick = () => this.solution();
        document.getElementById("themes").onchange = () => this.changerTheme(document.getElementById("themes").value);
    }

    trou() {
        for(let courant of this.cases)
            if(courant.trou())
                return courant;
    }

    melanger() {
        for (let i = 0; i < 100; i++) {
            this.cases[Math.floor(Math.random() * this.cases.length)].permuterCase(this.trou());
        }
        this.afficher();
        document.getElementById("jeu").style = "";
    }

    solution() {
        if(document.getElementById('solution').value === 'solution') {
            document.getElementById('jeu').style.display = 'none';
            document.getElementById('modele').style.display = 'flex';
            document.getElementById('solution').value = 'puzzle';
        }
        else {
            document.getElementById('jeu').style.display = 'flex';
            document.getElementById('modele').style.display = 'none';
            document.getElementById('solution').value = 'solution';
        }
    }

    nbBienPlace() {
        let compteur = 0;
        for (let i = 0; i < 16; i++)
            if(this.cases[i].image.idImage === i)
                compteur++;
        return compteur;
    }

    afficher(text) {
        let t;
        if(text !== undefined)
            t = text;
        else
            t = this.nbCoups + ' coup, ' + this.nbBienPlace() +  ' bien placés';
        document.getElementById('message').innerText = t;
    }

    changerTheme(theme) {
        this.theme = theme;
        for (let c of this.cases)
            c.changerTheme(theme);
    }

    victoire() {
        if (this.nbBienPlace() === 16) {
            document.getElementById("cadeau").style = "";

            this.afficher('Bravo, puzzle résolu en ' + this.nbCoups + ' coups.');
            let c = this.trou();
            c.image.src = 'img/'+this.theme+'/'+this.theme+'_.jpg';
            c.image.nb = '';
            c.actualiserAffichage();
            for (let c of this.cases) {
                document.getElementById(c.id).onclick = null;
            }
        }
    }

}