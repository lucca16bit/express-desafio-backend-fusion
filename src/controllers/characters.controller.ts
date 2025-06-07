import { IAffiliation } from '@interfaces/affiliation.interface';
import { AuthenticatedRequest } from '@interfaces/auth.request.interface';
import Send from '@utils/response.utils';
import { prisma } from 'db';
import { Request, Response } from 'express';
import characterSchema from 'validations/character.schema';
import { z } from 'zod';

class CharactersController {
    static create = async (req: Request, res: Response) => {
        const {name, race, affiliation, homePlanetId} = req.body as z.infer<typeof characterSchema.validateSchema> & IAffiliation;
        try {
            const userId = (req as AuthenticatedRequest).userId;

            const charactersExists = await prisma.characters.findFirst({
                where: {
                    name,
                    userId
                }                
            });

            if (charactersExists) {
                return Send.error(res, null, 'O personagem já existe!');
            }

            const newChar = await prisma.characters.create({
                data: {
                    name,
                    race,
                    affiliation,
                    homePlanetId: homePlanetId || null,
                    userId
                },
                select: {
                    id: true,
                    name: true,
                    race: true,
                    affiliation: true,
                    homePlanet: {
                        select: {
                            id: true,
                            name: true,
                            climate: true,
                            terrain: true
                        }
                    },
                    user: {
                        select: {
                            id: true,
                            name: true,
                            affiliation: true
                        }
                    }
                }
            });

            return Send.success(res, {character: newChar}, 'Personagem registrado com sucesso!');
        } catch (error) {
            console.error('Falha ao criar novo personagem: ', error);
            return Send.error(res, null, 'Falha ao criar novo personagem');
        }
    };

    static list = async (req: Request, res: Response) => {
        try {
            const characters = await prisma.characters.findMany({
                select: {
                    id: true,
                    name: true,
                    race: true,
                    affiliation: true,
                    homePlanet: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });

            if (!characters) {
                return Send.notFound(res, null, 'Nenhum personagem encontrado');
            };

            return Send.success(res, {characters});
        } catch (error) {
            console.error('Falha ao mostrar todos os personagens: ', error);
            return Send.error(res, null, 'Falha ao mostrar todos os personagens');
        }
    };

    static view = async (req: Request, res: Response) => {
        try {
            const characterId = Number(req.params.id);

            const character = await prisma.characters.findUnique({
                where: {
                    id: characterId
                },
                select: {
                    id: true,
                    name: true,
                    race: true,
                    affiliation: true,
                    homePlanet: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });

            if (!character) {
                return Send.notFound(res, null, 'Personagem não encontrado');
            }

            return Send.success(res, {character});
        } catch (error) {
            console.error('Falha ao buscar informações do personagem: ', error);
            return Send.error(res, null, 'Falha ao buscar informações do personagem.');
        }
    };

    static update = async (req: Request, res: Response) => {
        const {name, race, affiliation, homePlanetId} = req.body as z.infer<typeof characterSchema.validateSchema> & IAffiliation;
        try {
            const characterId = Number(req.params.id);

            const characterExists = await prisma.spaceShips.findFirst({
                where: {
                    id: characterId
                }                
            });

            if (!characterExists) {
                return Send.error(res, null, 'A nave espacial não foi encontrada');
            }

            const character = await prisma.characters.update({
                where: {
                    id: characterId
                },
                data: {
                    name,
                    race,
                    affiliation,
                    homePlanetId
                }
                ,
                select: {
                    id: true,
                    name: true,
                    race: true,
                    affiliation: true,
                    homePlanet: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });

            if (!character) {
                return Send.notFound(res, null, 'Personagem não encontrado');
            }

            return Send.success(res, {character});
        } catch (error) {
            console.error('Falha ao buscar informações do personagem: ', error);
            return Send.error(res, null, 'Falha ao buscar informações do personagem.');
        }
    };

    static delete = async (req: Request, res: Response) => {
        try {
            const characterId = Number(req.params.id);

            
            const characterExists = await prisma.characters.findFirst({
                where: {
                    id: characterId
                }
            });

            if (!characterExists) {
                return Send.notFound(res, null, 'Nenhum personagem foi encontrado');
            }

            const character = await prisma.characters.delete({
                where: {
                    id: characterId
                }
            });

            return Send.success(res, null, 'Personagem deletado com sucesso!');
        } catch (error) {
            console.error('Falha ao buscar informações do personagem: ', error);
            return Send.error(res, null, 'Falha ao buscar informações do personagem.');
        }
    };
}

export default CharactersController;