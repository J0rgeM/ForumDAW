import {describe, expect, it} from '@jest/globals';
import {renderWithRouter} from "./lib";
import UpdatePost from "./UpdatePost";

describe('UpdatePost', () => {
    it('match snapshot', () => {
        const { container} = renderWithRouter(<UpdatePost/>)
        expect(container).toMatchSnapshot()
    })
})