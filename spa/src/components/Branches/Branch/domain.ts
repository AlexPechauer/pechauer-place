export interface Value {
  title: string
  subTitle: string
  features: string[]
}

export interface Props {
  data: Value
}

export const values: Value[] = [
  {
    title: 'A-Town Branch',
    subTitle: 'Get that back to basics feel.',
    features: [
      'Movie Reviews',
      'Delmer Deep Dives',
      'At Home Cooking'
    ]
  },
  {
    title: 'Tucson Branch',
    subTitle: 'A little heat, a lot of warmth.',
    features: [
      'Movie Reviews',
      'Guestbook'
    ]
  },
  {
    title: 'Traveling Branch',
    subTitle: 'Clear eyes, full hearts, never lost.',
    features: [
      'Coffee Bar',
      'Late night bar',
      'Guestbook'
    ]
  }
]