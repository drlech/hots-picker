import Hero from './Hero'

let $ = window.jQuery;

class Heroes {
    constructor($collection) {
        this.heroes = [];
        $collection.each((i, element) => {
            this.heroes.push(new Hero($(element)));
        });

        let chosen = null;
    }

    choose() {
        // Get only heroes that are selected
        let selectedHeroes = this.heroes.filter(hero => {
            return true === hero.selected;
        });

        // Possibly nothing is selected
        if (!selectedHeroes.length) {
            return;
        }

        // Unpick previously chosen hero
        if (this.chosen) {
            this.chosen.unpick();
        }

        // Pick a random hero
        this.chosen = selectedHeroes[Math.floor(Math.random() * selectedHeroes.length)];
        this.chosen.pick();
    }
}

export default Heroes;