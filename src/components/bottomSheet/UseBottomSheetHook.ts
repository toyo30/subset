import { useEffect, useRef } from "react";
// import { MAX_Y, MIN_Y } from "./BottomSheet";

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number; // touchstart에서 BottomSheet의 최상단 모서리의 Y값
    touchY: number; // touchstart에서 터치 포인트의 Y값
  };
  touchMove: {
    prevTouchY?: number; // 다음 touchmove 이벤트 핸들러에서 필요한 터치 포인트 Y값을 저장
    movingDirection: "none" | "down" | "up"; // 유저가 터치를 움직이고 있는 방향
  };
  isContentAreaTouched: boolean; // 컨텐츠 영역을 터치하고 있음을 기록
}

export function useBottomSheet(MIN_Y: any, MAX_Y: any) {
  const sheetRef = useRef<any>(null);
  const content = useRef<any>(null);

  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false,
  });

  // Touch Event 핸들러들을 등록한다.
  useEffect(() => {
    sheetRef.current.style.setProperty("transform", `translateY(${MAX_Y}px)`);

    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;

      // 바텀시트에서 컨텐츠 영역이 아닌 부분을 터치하면 항상 바텀시트를 움직입니다.
      if (!isContentAreaTouched) {
        return true;
      }

      // 바텀시트가 올라와있는 상태가 아닐 때는 컨텐츠 영역을 터치해도 바텀시트를 움직이는 것이 자연스럽습니다.
      if (Math.trunc(sheetRef.current.getBoundingClientRect().y) !== MIN_Y) {
        return true;
      }

      if (
        touchMove.movingDirection === "down" &&
        Math.trunc(content.current.scrollTop) <= 0
      ) {
        // 스크롤을 더 이상 올릴 것이 없다면, 바텀시트를 움직이는 것이 자연스럽습니다.
        // Safari 에서는 bounding 효과 때문에 scrollTop 이 음수가 될 수 있습니다. 따라서 0보다 작거나 같음 (<=)으로 검사합니다.
        return true;
      }

      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;

      //지금 현재 sheetRef의 가장 상단의 값이 위에서부터 얼마나 떨어져잇는지를 의미함. y값을 의미함.
      touchStart.sheetY = sheetRef.current.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      //touch의 진행 방향을 알아냄.
      if (touchMove.prevTouchY === undefined) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      touchMove.prevTouchY = touchStart.touchY;

      // if (touchMove.prevTouchY < currentTouch.clientY) {
      //   touchMove.movingDirection = "down";
      // }

      // if (touchMove.prevTouchY > currentTouch.clientY) {
      //   touchMove.movingDirection = "up";
      // }

      //touchOffset 변화값이 양수냐 음수냐에 따라서도 down, up을 구분할 수 있다.

      if (touchMove.prevTouchY < currentTouch.clientY) {
        touchMove.movingDirection = "down";
      }

      if (touchMove.prevTouchY > currentTouch.clientY) {
        touchMove.movingDirection = "up";
      }
      if (canUserMoveBottomSheet()) {
        e.preventDefault();

        // 터치 시작점에서부터 현재 터치 포인트까지의 변화된 y값
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;
        // nextSheetY 는 MIN_Y와 MAX_Y 사이의 값으로 clamp 되어야 한다
        if (nextSheetY <= MIN_Y) {
          nextSheetY = MIN_Y;
        }

        if (nextSheetY >= MAX_Y) {
          nextSheetY = MAX_Y;
        }

        // sheet 위치 갱신.
        sheetRef.current.style.setProperty(
          "transform",
          `translateY(${nextSheetY}px)`
        );
      } else {
        // document.body.style.overflowY = "hidden";
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // document.body.style.overflowY = "auto";
      const { touchMove } = metrics.current;

      // Snap Animation
      const currentSheetY = sheetRef.current.getBoundingClientRect().y;

      if (Math.trunc(currentSheetY) !== MIN_Y) {
        if (touchMove.movingDirection === "down") {
          // sheetRef.current.style.setProperty("transform", "translateY(0)");
          sheetRef.current.style.setProperty(
            "transform",
            `translateY(${MAX_Y}px)`
          );
          document.body.style.overflow = "unset";
          localStorage.setItem("bottomSheetExpand", "DOWN");
        }

        if (touchMove.movingDirection === "up") {
          sheetRef.current.style.setProperty(
            "transform",
            `translateY(${MIN_Y}px)`
          );

          if (typeof window != "undefined" && window.document) {
            document.body.style.overflow = "hidden";
          }
          localStorage.setItem("bottomSheetExpand", "UP");
        }
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: "none",
        },
        isContentAreaTouched: false,
      };
    };

    sheetRef?.current?.addEventListener("touchstart", handleTouchStart);
    sheetRef?.current?.addEventListener("touchmove", handleTouchMove);
    sheetRef?.current?.addEventListener("touchend", handleTouchEnd);

    return () => {
      sheetRef?.current?.removeEventListener("touchstart", handleTouchStart);
      sheetRef?.current?.removeEventListener("touchmove", handleTouchMove);
      sheetRef?.current?.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const handleScroll = (event: TouchEvent) => {
    localStorage.setItem(
      "bottomSheetScrollY",
      String(content?.current?.scrollTop)
    );
  };

  // content 영역을 터치하는 것을 기록합니다.
  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current.isContentAreaTouched = true;
    };
    const { touchMove } = metrics.current;
    if (localStorage["bottomSheetExpand"] === "UP") {
      sheetRef.current.style.setProperty("transform", `translateY(${MIN_Y}px)`);

      if (typeof window != "undefined" && window.document) {
        document.body.style.overflow = "hidden";
      }
    } else {
      if (touchMove.movingDirection === "down") {
        sheetRef.current.style.setProperty(
          "transform",
          `translateY(${MAX_Y}px)`
        );
        document.body.style.overflow = "unset";
      }
    }

    content.current.scrollTo({
      top: Number(localStorage["bottomSheetScrollY"]),
    });

    content?.current?.addEventListener("touchstart", handleTouchStart);
    content?.current?.addEventListener("scroll", handleScroll);
    return () => {
      content?.current?.removeEventListener("touchstart", handleTouchStart);
      content?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { sheetRef, content };
}
