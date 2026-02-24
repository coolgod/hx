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
      { id: 's1', src: 'images/spring/s1.webp', alt: 'A spring memory', date: 'March 2023', location: 'Cherry Blossom Park', memory: 'The petals fell like a gentle snowstorm just for us.' },
      { id: 's2', src: 'images/spring/s2.webp', alt: 'A spring memory', date: 'April 2023', location: 'The old bridge', memory: 'You laughed so hard the pigeons flew away.' },
      { id: 's3', src: 'images/spring/s3.webp', alt: 'A spring memory', date: 'April 2023', location: 'Botanical garden', memory: 'You said the tulips were too bright — I said nothing was.' },
      { id: 's4', src: 'images/spring/s4.webp', alt: 'A spring memory', date: 'May 2023', location: 'Sunday market', memory: 'We bought flowers we had nowhere to put.' },
      { id: 's5', src: 'images/spring/s5.webp', alt: 'A spring memory', date: 'May 2023', location: 'Rooftop café', memory: 'The coffee was terrible but the view was perfect.' },
      { id: 's6', src: 'images/spring/s6.webp', alt: 'A spring memory', date: 'May 2023', location: 'Riverside walk', memory: 'I told you a terrible joke and you pretended it was funny.' },
      { id: 's7', src: 'images/spring/s7.webp', alt: 'A spring memory', date: 'June 2023', location: 'Home', memory: 'You wore that yellow dress again. I never forgot it.' },
    ],
  },
  {
    season: 'summer',
    photos: [
      { id: 'su1', src: 'images/summer/su1.webp', alt: 'A summer memory', date: 'June 2023', location: 'The beach', memory: 'Salt water and sunscreen and nowhere else to be.' },
      { id: 'su2', src: 'images/summer/su2.webp', alt: 'A summer memory', date: 'July 2023', location: 'Night market', memory: 'We stayed until every stall had closed.' },
      { id: 'su3', src: 'images/summer/su3.webp', alt: 'A summer memory', date: 'July 2023', location: 'Mountain trail', memory: 'You said it wasn\'t that steep. It was very steep.' },
      { id: 'su4', src: 'images/summer/su4.webp', alt: 'A summer memory', date: 'July 2023', location: 'Outdoor cinema', memory: 'We forgot what film it was. That was fine.' },
      { id: 'su5', src: 'images/summer/su5.webp', alt: 'A summer memory', date: 'August 2023', location: 'Ice cream shop', memory: 'You always pick the same flavour and insist on trying mine.' },
      { id: 'su6', src: 'images/summer/su6.webp', alt: 'A summer memory', date: 'August 2023', location: 'Lake house', memory: 'The fireflies came out just after sunset.' },
      { id: 'su7', src: 'images/summer/su7.webp', alt: 'A summer memory', date: 'August 2023', location: 'City rooftop', memory: 'We watched the whole skyline light up.' },
      { id: 'su8', src: 'images/summer/su8.webp', alt: 'A summer memory', date: 'September 2023', location: 'Seaside town', memory: 'Even the rain felt like summer with you.' },
    ],
  },
  {
    season: 'autumn',
    photos: [
      { id: 'a1', src: 'images/autumn/a1.webp', alt: 'An autumn memory', date: 'September 2023', location: 'Forest trail', memory: 'Every step made a sound like a secret.' },
      { id: 'a2', src: 'images/autumn/a2.webp', alt: 'An autumn memory', date: 'October 2023', location: 'Pumpkin farm', memory: 'You carried the biggest one all the way back.' },
      { id: 'a3', src: 'images/autumn/a3.webp', alt: 'An autumn memory', date: 'October 2023', location: 'Old town square', memory: 'The leaves were the same colour as your scarf.' },
      { id: 'a4', src: 'images/autumn/a4.webp', alt: 'An autumn memory', date: 'October 2023', location: 'Bookshop', memory: 'You picked three books in five minutes. I\'m still reading one.' },
      { id: 'a5', src: 'images/autumn/a5.webp', alt: 'An autumn memory', date: 'November 2023', location: 'Tea house', memory: 'We ordered too much and stayed for hours.' },
      { id: 'a6', src: 'images/autumn/a6.webp', alt: 'An autumn memory', date: 'November 2023', location: 'Hill park', memory: 'The city looked small from up there.' },
      { id: 'a7', src: 'images/autumn/a7.webp', alt: 'An autumn memory', date: 'November 2023', location: 'Home kitchen', memory: 'You made soup and I pretended to help.' },
    ],
  },
  {
    season: 'winter',
    photos: [
      { id: 'w1', src: 'images/winter/w1.webp', alt: 'A winter memory', date: 'December 2023', location: 'First snow', memory: 'You caught snowflakes on your tongue like a child. Best version.' },
      { id: 'w2', src: 'images/winter/w2.webp', alt: 'A winter memory', date: 'December 2023', location: 'Christmas market', memory: 'Hot chocolate and cold hands and your warm coat.' },
      { id: 'w3', src: 'images/winter/w3.webp', alt: 'A winter memory', date: 'December 2023', location: 'Living room', memory: 'Lights on the tree, music low, you fast asleep.' },
      { id: 'w4', src: 'images/winter/w4.webp', alt: 'A winter memory', date: 'January 2024', location: 'Snowy street', memory: 'We got lost on purpose.' },
      { id: 'w5', src: 'images/winter/w5.webp', alt: 'A winter memory', date: 'January 2024', location: 'Fireplace café', memory: 'You read to me until the fire died down.' },
      { id: 'w6', src: 'images/winter/w6.webp', alt: 'A winter memory', date: 'February 2024', location: 'The hilltop', memory: 'Cold, quiet, just us.' },
      { id: 'w7', src: 'images/winter/w7.webp', alt: 'A winter memory', date: 'February 2024', location: 'Home', memory: 'Every winter felt warmer because of you.' },
    ],
  },
]
