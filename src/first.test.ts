import { add, sub } from "./first";
import { expect } from "chai";

describe("first test", () => {
  it("1 + 2 == 3", () => {
    expect(add(1, 2)).to.equal(3);
  });

  it("1 - 2 == -1", () => {
    expect(sub(1, 2)).to.equal(-1);
  });
});
