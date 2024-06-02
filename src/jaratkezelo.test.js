import { it, beforeEach, describe, expect } from "vitest";
import { JaratKezelo } from "./jaratkezelo";

describe('JaratKezelo', () => {
    let jaratKezelo;

    beforeEach(() => {
        jaratKezelo = new JaratKezelo();
    });

    it('should have a method to add a new flight', () => {
        const jarat = {
            jaratSzam: 1,
            repterHonnan: 'Budapest',
            keses: 0,
            repterHova: 'New York',
            indulas: '2022-10-01 10:00',
        };

        jaratKezelo.ujJarat(jarat.jaratSzam, jarat.repterHonnan, jarat.repterHova, jarat.indulas);

        expect(jaratKezelo.jaratok.length).toBe(1);
        expect(jaratKezelo.jaratok[0]).toEqual(jarat);
    });

    it('should have a method to add delay to a flight', () => {
        const jarat = {
            jaratSzam: 1,
            repterHonnan: 'Budapest',
            repterHova: 'New York',
            indulas: '2022-10-01 10:00',
        };
        jaratKezelo.ujJarat(jarat.jaratSzam, jarat.repterHonnan, jarat.repterHova, jarat.indulas);

        const keses = 30;
        jaratKezelo.keses(jarat.jaratSzam, keses);

        expect(jaratKezelo.jaratok[0].keses).toBe(keses);
    });

    it('should have a method to get the actual departure time of a flight', () => {
        const jarat = {
            jaratSzam: 1,
            repterHonnan: 'Budapest',
            repterHova: 'New York',
            indulas: new Date('2022-10-01 10:30'),
            keses: 30
        };
        jaratKezelo.ujJarat(jarat.jaratSzam, jarat.repterHonnan, jarat.repterHova, jarat.indulas);

        const actualDepartureTime = jaratKezelo.mikorIndul(jarat.jaratSzam);

        const expectedDepartureTime = new Date('2022-10-01 10:30');
        expect(actualDepartureTime).toEqual(expectedDepartureTime);
    });

    it('should have a method to get flights from a specific airport', () => {
        const jarat1 = {
            jaratSzam: 1,
            repterHonnan: 'Budapest',
            repterHova: 'New York',
            indulas: '2022-10-01 10:00',
            keses: 0
        };
        const jarat2 = {
            jaratSzam: 2,
            repterHonnan: 'Budapest',
            repterHova: 'London',
            indulas: '2022-10-02 12:00',
            keses: 0
        };
        jaratKezelo.ujJarat(jarat1.jaratSzam, jarat1.repterHonnan, jarat1.repterHova, jarat1.indulas);
        jaratKezelo.ujJarat(jarat2.jaratSzam, jarat2.repterHonnan, jarat2.repterHova, jarat2.indulas);

        const flightsFromAirport = jaratKezelo.jaratokRepuloterrol('Budapest');

        expect(flightsFromAirport.length).toBe(2);
        expect(flightsFromAirport).toContain(jarat1.jaratSzam);
        expect(flightsFromAirport).toContain(jarat2.jaratSzam);
    });
});
