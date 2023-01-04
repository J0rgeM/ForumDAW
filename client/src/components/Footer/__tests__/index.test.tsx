import {describe, expect, it} from '@jest/globals';
import {render} from "@testing-library/react";
import Footer from ".."
// describe serve para descrever o teste

describe('Footer', () => {
    it('match snapshot', () => {
        const { container } = render(<Footer/>) // container vai conter o snapshot
        expect(container).toMatchSnapshot()
    })
})

