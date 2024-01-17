import { compare } from 'bcryptjs';
import { usersRepository } from '../repositories/users-repository';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { User } from '@prisma/client';

interface AuthenticatedUseCaseRequest {
    email: string;
    password: string;
}

interface AuthenticatedUseCaseResponse{
    user: User
}

export class AuthenticateUseCase {
    constructor(
        private usersRepository: usersRepository) {}

    async execute({
        email,
        password,
    }: AuthenticatedUseCaseRequest): Promise<AuthenticatedUseCaseResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatch = await compare(password, user.password_hash);

        if (!doesPasswordMatch){
            throw new InvalidCredentialsError();
        }

        return {
            user
        };
    }
}