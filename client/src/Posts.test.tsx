import {describe, expect, it} from '@jest/globals';
import {renderWithRouter} from "./lib";
import Posts from "./Posts";

describe('Posts', () => {
    it('match snapshot', () => {
        const { container} = renderWithRouter(<Posts/>)
        expect(container).toMatchSnapshot()
    })
})