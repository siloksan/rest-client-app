export const AUTHORS = [
  {
    name: 'kurtin.name',
    github: 'https://github.com/siloksan',
    avatar: 'https://avatars.githubusercontent.com/u/107646198',
    role: 'kurtin.role',
    description: 'kurtin.description',
  },
  {
    name: 'chistiakov.name',
    github: 'https://github.com/DmitriyRim',
    avatar: 'https://avatars.githubusercontent.com/u/74590404',
    role: 'chistiakov.role',
    description: 'chistiakov.description',
  },
  {
    name: 'zubkov.name',
    github: 'https://github.com/z-e-a',
    avatar: 'https://avatars.githubusercontent.com/u/87200568',
    role: 'zubkov.role',
    description: 'zubkov.description',
  },
] as const;

export type Author = (typeof AUTHORS)[number];
