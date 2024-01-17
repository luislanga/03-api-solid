import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from './create-gym';

let usersRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {

    beforeEach(() => {
        usersRepository = new InMemoryGymsRepository();
        sut = new CreateGymUseCase(usersRepository);
    });

    it('should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'Javascript Gym',
            description: null,
            phone: null,
            latitude: -27.2092052,
            longitude: -49.6401091,
        });
    
        expect(gym.id).toEqual(expect.any(String));
    });
});