import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {
  /*
  👉 TASK 1 - Unit Testing of sum function at the bottom of this module

  Test the following. You can create separate tests or a single test with multiple assertions.

    [1] sum() // throws an error 'pass valid numbers'
    [2] sum(2, 'seven') // throws an error 'pass valid numbers'
    [3] sum(1, 3) // returns 4
    [4] sum('1', 2) // returns 3
    [5] sum('10', '3') // returns 13
  */

    describe('unit tests for sum', ()=>{
      it('should return "pass valid numbers" when both a and b are missing', ()=>{
        expect(sum()).toBe('pass valid numbers')
      })
      it('should return "pass valid numbers" when a or b are not integers or strings of integers', ()=>{
        expect(sum(2, 'seven')).toBe('pass valid numbers')
      })
      it('should return a + b when both a and b are integers', ()=>{
        expect(sum(1, 3)).toBe(4)
      })
      it('should return a + b when  a and b are a combination of integers and strings containing integers', ()=>{
        expect(sum('1', 2)).toBe(3)
      })
      it('should return a + b when both a and b are strings of integers', ()=>{
        expect(sum('10', '3')).toBe(13)
      })
    })

  /*
  👉 TASK 2 - Integration Testing of HelloWorld component at the bottom of this module

  Test the <HelloWorld /> component found below...
    - using `screen.queryByText` to capture nodes
    - using `toBeInTheDocument` to assert their existence in the DOM

    [1] renders a link that reads "Home"
    [2] renders a link that reads "About"
    [3] renders a link that reads "Blog"
    [4] renders a text that reads "The Truth"
    [5] renders a text that reads "JavaScript is pretty awesome"
    [6] renders a text that includes "javaScript is pretty" (use exact = false)
  */
  // test('you can comment out this test', () => {
  //   expect(true).toBe(false)
  // })
   describe('RTL tests for HelloWorld', ()=>{
    it('should render HelloWorld properly', ()=>{
      render(<HelloWorld />)

      const home = screen.queryByText('Home')
      expect(home).toBeInTheDocument()
      expect(home).toHaveAttribute('href')

      const about = screen.queryByText('About')
      expect(about).toBeInTheDocument()
      expect(home).toHaveAttribute('href')

      const blog = screen.queryByText('Blog')
      expect(blog).toBeInTheDocument()
      expect(home).toHaveAttribute('href')


      const theTruth = screen.queryByText('The Truth')
      expect(theTruth).toBeInTheDocument()

      const awesome = screen.queryByText('JavaScript is pretty awesome')
      expect(awesome).toBeInTheDocument()

      const includes = screen.queryByText('javaScript is pretty', {exact: false})
      expect(includes).toBeInTheDocument()
    })
   }) 

})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
