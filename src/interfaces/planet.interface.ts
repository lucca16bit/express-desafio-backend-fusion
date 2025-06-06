export interface IPlanet {
    id: number;
    name: string;
    climate: string;
    terrain: string;
    population?: bigint | null;
    systemId: number;
    userId: number;
};