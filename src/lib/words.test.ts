import { getEditDistance, getMinPath } from './words'

describe('getEditDistance', () => {
  test('edit distance', () => {
    expect(getEditDistance('ABCDE', 'ABCDE')).toEqual(0)
    expect(getEditDistance('EABCD', 'ABCDE')).toEqual(5)
    expect(getEditDistance('ABCDE', 'EDCBA')).toEqual(4)
  })
})

describe('getMinPath', () => {
  test('min path', () => {
    expect(getMinPath('words', 'words')).toEqual([])
    expect(getMinPath('words', 'birds')).toEqual(['words'])
    expect(getMinPath('ahead', 'songs')).toEqual(['sonar', 'shear', 'ahead'])
    expect(getMinPath('three', 'human')).toEqual([
      'buran',
      'aurae',
      'agree',
      'three',
    ])
    expect(getMinPath('REACH', 'EQUAL')).toEqual([])
  })
})
