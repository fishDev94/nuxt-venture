import { beforeEach, describe, expect, it, vi } from "vitest";
import { shallowRef } from "vue";
import { useScrollable } from "../useScrollable";

vi.mock("~/constants", () => ({
  DEBOUNCE_TIME: 100,
  INIT_REF_NUMBER: 0,
}));

describe("useScrollable", () => {
  let mockElement = null;
  let elementRef = null;
  const scrollMove = 100;

  beforeEach(() => {
    mockElement = {
      scrollLeft: 0,
      scrollWidth: 1000,
      offsetWidth: 500,
      scrollHeight: 500,
      clientWidth: 500,
      clientHeight: 500,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      scroll: vi.fn(function (options) {
        this.scrollLeft = options.left;
      }),
    };

    elementRef = shallowRef(mockElement);
  });

  it("Init values", () => {
    const {
      isNextDisabled,
      isPrevDisabled,
      shouldShowArrows,
      updateScrollValue,
    } = useScrollable(elementRef, scrollMove);

    updateScrollValue();

    expect(isNextDisabled.value).toBe(false); // 0 < 500
    expect(isPrevDisabled.value).toBe(true); // 0 <= 0
    expect(shouldShowArrows.value).toBe(true); // 500 > 0
  });

  it("handle scroll to right", () => {
    const { handleScroll } = useScrollable(elementRef, scrollMove);
    handleScroll("right");

    expect(mockElement.scroll).toHaveBeenCalledWith({
      top: 0,
      left: 100, // 0 + 100
      behavior: "smooth",
    });
  });

  it("handle scroll to left", () => {
    mockElement.scrollLeft = 200;
    const { handleScroll } = useScrollable(elementRef, scrollMove);
    handleScroll();

    expect(mockElement.scroll).toHaveBeenCalledWith({
      top: 0,
      left: 100, // 200 - 100
      behavior: "smooth",
    });
  });

  it("update values on screen resize", async () => {
    const { shouldShowArrows, updateScrollValue } = useScrollable(
      elementRef,
      scrollMove
    );

    mockElement.offsetWidth = 800;
    mockElement.scrollWidth = 1000;

    updateScrollValue();

    expect(shouldShowArrows.value).toBe(true); // 200 > 0
  });
});
