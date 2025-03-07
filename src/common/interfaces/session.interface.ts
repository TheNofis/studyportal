import { FastifyRequest } from 'fastify';

export type ISession = FastifyRequest['session'] & { user: any };
