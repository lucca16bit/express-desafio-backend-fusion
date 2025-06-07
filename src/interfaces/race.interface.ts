export enum Race {
    HUMAN = 'HUMAN',
    WOOKIEE = 'WOOKIEE',
    TWILEK = 'TWILEK',
    RODIAN = 'RODIAN',
    ZABRAK = 'ZABRAK',
    TOGRUTA = 'TOGRUTA',
    CHISS = 'CHISS',
    NAUTOLAN = 'NAUTOLAN',
    MIRIALAN = 'MIRIALAN',
    MON_CALAMARI = 'MON_CALAMARI',
    TRANDOSHAN = 'TRANDOSHAN',
    DROID = 'DROID',
    EWOK = 'EWOK',
    HUTT = 'HUTT',
    TUSKENS = 'TUSKENS',
    KAMINOAN = 'KAMINOAN',
    YODA = 'YODA',
    DATHOMIRIAN = 'DATHOMIRIAN'
}

export interface IRace {
    affiliation: Race;
}