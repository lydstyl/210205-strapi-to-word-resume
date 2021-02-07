// import { fetchResumeData } from '../app/fetchResumeData'

// describe('fetchResumeData', () => {
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
//     }),
//   )

//   beforeEach(() => {
//     fetch.mockClear()
//   })

//   it('finds exchange', async () => {
//     const rate = await fetchResumeData('USD', 'CAD')

//     expect(rate).toEqual(1.42)
//     expect(fetch).toHaveBeenCalledTimes(1)
//   })

//   // it('show hello world', () => {
//   //   expect(fetchResumeData()).toBe('Hello world')
//   // })
// })
