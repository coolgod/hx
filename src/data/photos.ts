export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export interface Photo {
  id: string
  src: string
  alt: string
  date: string
  location: string
  memory: string
}

export interface SeasonData {
  season: Season
  photos: Photo[]
}

export const seasonsData: SeasonData[] = [
  {
    season: 'spring',
    photos: [
      { id: 's1', src: 'images/s1.webp', alt: 'A spring memory', date: '2025-04-26', location: 'Butchart Gardens', memory: 'A lazy afternoon where everything felt beautiful—one bench, the love of my life, and a gentle kiss.' },
      { id: 's2', src: 'images/s2.webp', alt: 'A spring memory', date: '2025-04-26', location: 'Butchart Gardens', memory: 'Two interesting souls finding joy in each other.' },
      { id: 's3', src: 'images/s3.webp', alt: 'A spring memory', date: '2025-04-27', location: 'Malahat SkyWalk', memory: 'The best travel partner is also the one I love most.' },
      { id: 's4', src: 'images/s4.webp', alt: 'A spring memory', date: '2025-05-03', location: 'Metrotown', memory: 'Our Volvo quietly witnessed our sweet little moments.' },
      { id: 's5', src: 'images/s5.webp', alt: 'A spring memory', date: '2025-05-11', location: 'Royal Canadian International Circus', memory: 'The circus was magical, and sharing a brand-new experience with you made it even better.' },
      { id: 's6', src: 'images/s6.webp', alt: 'A spring memory', date: '2025-05-13', location: 'Stanley Park', memory: 'I always love enjoying the outdoors with you by my side.' },
      { id: 's7', src: 'images/s7.webp', alt: 'A spring memory', date: '2025-05-10', location: 'Deer Lake', memory: 'That afternoon walk felt like a glimpse of us ten years later, still hand in hand.' },
    ],
  },
  {
    season: 'summer',
    photos: [
      { id: 'su1', src: 'images/su1.webp', alt: 'A summer memory', date: '2025-08-19', location: 'Peyto Lake', memory: 'The lake was stunning, but you were even more beautiful.' },
      { id: 'su2', src: 'images/su2.webp', alt: 'A summer memory', date: '2025-08-22', location: 'Sunshine Village', memory: 'The sky, mountains, and lakes quietly witnessed our love.' },
      { id: 'su3', src: 'images/su3.webp', alt: 'A summer memory', date: '2025-08-20', location: 'Moraine Lake', memory: 'Like a young couple by a jade-colored lake, gently tapping the water and time together.' },
      { id: 'su4', src: 'images/su4.webp', alt: 'A summer memory', date: '2025-08-17', location: 'Lake Minnewanka', memory: 'Let\'s kiss passionately by the water—I love you.' },
      { id: 'su5', src: 'images/su5.webp', alt: 'A summer memory', date: '2025-08-18', location: 'Athabasca Glacier', memory: 'Our footprints on the glacier mark the path of our love.' },
      { id: 'su6', src: 'images/su6.webp', alt: 'A summer memory', date: '2025-06-29', location: 'Richmond Night Market', memory: 'Two food lovers wandering the night market, happiest with snacks in hand.' },
      { id: 'su7', src: 'images/su7.webp', alt: 'A summer memory', date: '2025-06-22', location: 'Sumas Mountain', memory: 'Exploring the outdoors together, and quietly exploring life together too.' },
      { id: 'su8', src: 'images/su8.webp', alt: 'A summer memory', date: '2025-07-06', location: 'Spences Bridge', memory: 'Holding you tight, hugging my love close.' },
    ],
  },
  {
    season: 'autumn',
    photos: [
      { id: 'a1', src: 'images/a1.webp', alt: 'An autumn memory', date: '2025-11-09', location: 'Vancouver', memory: 'The autumn streets I see are painted in your colors.' },
      { id: 'a2', src: 'images/a2.webp', alt: 'An autumn memory', date: '2025-09-11', location: 'Home', memory: 'Love appears anywhere and anytime when I\'m with you.' },
      { id: 'a3', src: 'images/a3.webp', alt: 'An autumn memory', date: '2025-09-04', location: 'Home', memory: 'Love, love, love.' },
      { id: 'a4', src: 'images/a4.webp', alt: 'An autumn memory', date: '2025-11-09', location: 'University of British Columbia', memory: 'A mature, graceful, beautiful woman—yes, that\'s my girlfriend.' },
      { id: 'a5', src: 'images/a5.webp', alt: 'An autumn memory', date: '2025-11-23', location: 'Home', memory: 'That warm feeling is simply the taste of home.' },
      { id: 'a6', src: 'images/a6.webp', alt: 'An autumn memory', date: '2025-08-31', location: 'Home', memory: 'Even in pajamas, you\'re irresistibly adorable.' },
      { id: 'a7', src: 'images/a7.webp', alt: 'An autumn memory', date: '2025-10-18', location: 'Home', memory: 'All the love in the world, right here with you.' },
    ],
  },
  {
    season: 'winter',
    photos: [
      { id: 'w1', src: 'images/w1.webp', alt: 'A winter memory', date: '2024-12-24', location: 'Canada Place', memory: 'We had just met—nervous, a little shy, and quietly happy.' },
      { id: 'w2', src: 'images/w2.webp', alt: 'A winter memory', date: '2025-01-01', location: 'North Vancouver', memory: 'Before 2025 it was about me; after 2025, it\'s about us.' },
      { id: 'w3', src: 'images/w3.webp', alt: 'A winter memory', date: '2025-01-12', location: 'Stanley Park', memory: 'We hadn\'t known each other long, but the hug already felt right.' },
      { id: 'w4', src: 'images/w4.webp', alt: 'A winter memory', date: '2025-02-02', location: 'Central Park', memory: 'In winter, my warmth comes from you.' },
      { id: 'w5', src: 'images/w5.webp', alt: 'A winter memory', date: '2025-02-05', location: 'Burnaby', memory: 'Two little creatures stepping out into the winter together.' },
      { id: 'w6', src: 'images/w6.webp', alt: 'A winter memory', date: '2025-01-12', location: 'Stanley Park', memory: 'Even our shadows seemed to live happily side by side.' },
      { id: 'w7', src: 'images/w7.webp', alt: 'A winter memory', date: '2025-12-26', location: 'Vancouver Art Museum', memory: 'That was the day I met the right person.' },
    ],
  },
]
