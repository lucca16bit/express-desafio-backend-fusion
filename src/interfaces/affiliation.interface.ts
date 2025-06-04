export enum Affiliation {
    NEUTRAL = 'NEUTRAL',
    JEDI_ORDER = 'JEDI_ORDER',
    SITH_ORDER = 'SITH_ORDER',
    REBEL_ALLIANCE = 'REBEL_ALLIANCE',
    CIS = 'CIS',
    GALACTIC_REPUBLIC = 'GALACTIC_REPUBLIC',
    GALACTIC_EMPIRE = 'GALACTIC_EMPIRE',
    NEW_REPUBLIC = 'NEW_REPUBLIC',
    FIRST_ORDER = 'FIRST_ORDER',
    RESISTANCE = 'RESISTANCE'
}

export interface IAffiliation {
    affiliation: Affiliation;
}