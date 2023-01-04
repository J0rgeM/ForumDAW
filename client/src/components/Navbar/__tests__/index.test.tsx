import {describe, expect, it} from '@jest/globals';
import Navbar from ".."
import {renderWithRouter} from "../../../lib";

// describe serve para descrever o teste

describe('Navbar', () => {
    it('match snapshot', () => {
        const { container } = renderWithRouter(<Navbar/>)
        expect(container).toMatchSnapshot()
    })
})
