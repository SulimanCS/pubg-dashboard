const rewire = require("rewire")
const particles = rewire("./particles")
const pJS = particles.__get__("pJS")
const hexToRgb = particles.__get__("hexToRgb")
const clamp = particles.__get__("clamp")
const isInArray = particles.__get__("isInArray")
// @ponicode
describe("pJS", () => {
    test("0", () => {
        let callFunction = () => {
            pJS(987650, "Www.GooGle.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            pJS(12, "https://croplands.org/app/a/reset?token=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            pJS(10, "www.google.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            pJS(1, "http://base.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            pJS(12, "http://www.croplands.org/account/confirm?t=")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            pJS(-Infinity, "")
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("hexToRgb", () => {
    test("0", () => {
        let callFunction = () => {
            hexToRgb("/#00000/i")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            hexToRgb("0xb")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            hexToRgb("0x9")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            hexToRgb("/#00g000/i")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            hexToRgb("0xA")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            hexToRgb(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("clamp", () => {
    test("0", () => {
        let callFunction = () => {
            clamp(-100, -100, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            clamp(1, 0, 100)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            clamp(-100, -1, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            clamp(-1, 0, 1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            clamp(-100, 100, -1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            clamp(-Infinity, -Infinity, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("isInArray", () => {
    test("0", () => {
        let callFunction = () => {
            isInArray(["Dillenberg", "Dillenberg", "Dillenberg", "elio@example.com", "elio@example.com", "elio@example.com", "elio@example.com", "Elio"], ["foo bar", -0.353, "**text**", 4653])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            isInArray(["Elio", "Elio", "Elio", "Elio", "Dillenberg", "elio@example.com", "Elio", "Elio"], [10, -45.9, 103.5, 0.955674])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            isInArray(["Dillenberg", "elio@example.com", "Elio", "elio@example.com", "elio@example.com", "Dillenberg", "Elio", "elio@example.com"], ["a", "b", "043", "foo bar"])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            isInArray(["elio@example.com", "Dillenberg", "Dillenberg", "Elio", "Elio", "Dillenberg", "Elio", "Dillenberg"], [10, -45.9, 103.5, 0.955674])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            isInArray(["elio@example.com", "Dillenberg", "Dillenberg", "Dillenberg", "Dillenberg", "Dillenberg", "Elio", "Dillenberg"], [-1, 0.5, 1, 2, 3, 4, 5])
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            isInArray(undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
