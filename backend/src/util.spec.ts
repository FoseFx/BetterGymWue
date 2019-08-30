
import * as chai from 'chai';
import "mocha";
import {extractSessionCookies} from "./util";

const expect = chai.expect;

describe('util', function () {
    it('should extractCookies', () => {
        expect(extractSessionCookies("session=validsession; path=/; httponly, session.sig=validsig; path=/; httponly, SRVGROUP=common; path=/")).to.deep.eq({session: "validsession", sig: "validsig"});
        expect(extractSessionCookies("dasd=v; path=/; httponly, SRVGROUP=common; path=/")).to.deep.eq({session: null, sig: null});
        expect(extractSessionCookies("")).to.deep.eq({session: null, sig: null});
    });
});
