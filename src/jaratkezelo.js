export class JaratKezelo {
    constructor() {
        this.jaratok = [];
    }

    ujJarat(jaratSzam, repterHonnan, repterHova, indulas) {
        if (this.jaratok.some(jarat => jarat.jaratSzam === jaratSzam)) {
            throw new Error('A járatszám már létezik!');
        }

        const ujJarat = {
            jaratSzam,
            repterHonnan,
            repterHova,
            indulas,
            keses: 0
        };

        this.jaratok.push(ujJarat);
    }

    keses(jaratSzam, keses) {
        const jarat = this.jaratok.find(jarat => jarat.jaratSzam === jaratSzam);

        if (!jarat) {
            throw new Error('Nem létező járat!');
        }

        jarat.keses += keses;

        if (jarat.keses < 0) {
            throw new Error('Negatív késés nem lehetséges!');
        }
    }

    mikorIndul(jaratSzam) {
        const jarat = this.jaratok.find(jarat => jarat.jaratSzam === jaratSzam);

        if (!jarat) {
            throw new Error('Nem létező járat!');
        }

        const indulas = new Date(jarat.indulas.getTime() + jarat.keses * 60000);

        return indulas;
    }

    jaratokRepuloterrol(repter) {
        const jaratok = this.jaratok.filter(jarat => jarat.repterHonnan === repter);

        return jaratok.map(jarat => jarat.jaratSzam);
    }
}
