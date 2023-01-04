import {describe, expect, it} from '@jest/globals';
import {renderWithRouter} from "./lib";
import AddPost from "./AddPost";

describe('AddPost', () => {
    it('match snapshot', () => {
        const { container} = renderWithRouter(<AddPost/>)
        expect(container).toMatchSnapshot()
    })
})