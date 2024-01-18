import { FastifyRequest, FastifyReply } from 'fastify';

export const hasAlreadyBeenViewed = (id: string, contentViewed: string[]) => contentViewed.includes(id);

export const getContentVisited = (request: FastifyRequest): string[] => {
  const contentViewedCookie = request.cookies.contentViewed || '[]';
  return JSON.parse(contentViewedCookie);
};

export const setContentVisited = (reply: FastifyReply, contentId: string, contentViewed: string[]) => {
  if (!hasAlreadyBeenViewed(contentId, contentViewed)) {
    contentViewed.push(contentId);
  }
  reply.setCookie('contentViewed', JSON.stringify(contentViewed), { httpOnly: true, path: '/' });
};
