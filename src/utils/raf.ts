let raf = (callback: FrameRequestCallback) => setTimeout(callback, 16) as any;
let caf = (num: number) => clearTimeout(num);
if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
  raf = (callback: FrameRequestCallback) => window.requestAnimationFrame(callback);
  caf = (num: number) => window.cancelAnimationFrame(num);
}

let rafUUID = 0;

const rafIds = new Map<number, number>();

function cleanup(id: number) {
  rafIds.delete(id);
}

export default function wrapperRaf(callback: () => void, times = 1) {
  rafUUID++;
  const id = rafUUID;
  function callRaf(leftTime: number) {
    if (leftTime === 0) {
      cleanup(id);
      callback();
    } else {
      const realId = raf(() => {
        callRaf(leftTime - 1);
      });
      rafIds.set(id, realId);
    }
  }
  callRaf(times);
  return id;
}

wrapperRaf.cancel = (id: number) => {
  const realId = rafIds.get(id);
  if (typeof realId !== 'undefined') {
    cleanup(realId);
    return caf(realId);
  }
};
