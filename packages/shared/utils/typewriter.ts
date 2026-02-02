export type IChunkItem = {
  /** text info */
  text: string;
  /** other info */
  meta: {
    [key: string]: any;
  } | null;
};

export type ITypewriterController = {
  /** add output text */
  push: (text: IChunkItem["text"], meta?: IChunkItem["meta"]) => void;
  /** pause output */
  pause: () => void;
  /** Pause after completing the current segment */
  pauseAfterSegment: () => void;
  /** Restore output */
  restore: () => void;
  /** Cancel and clear the queue */
  cancel: () => void;
  /** Set the basic delay per character (in milliseconds) */
  setSpeed: (ms: number) => void;
  /** Immediately output all queue contents */
  flush: () => void;
  /** Get whether it is running */
  isRunning: () => boolean;
};

export type ITypewriterOptions = {
  /** Do you start outputting immediately after push */
  isImmediate?: boolean;
  /** Basic latency per character (milliseconds) */
  charDelayMs?: number;
  /** Extra pause: Punctuation delay (milliseconds) */
  punctuationDelayMs?: number;
  /** Spit out multiple characters at once using punctuation as the dividing boundary */
  preferPunctuationBoundary?: boolean;
  /** Maximum number of characters vomited each time */
  maxChunkSize?: number;
  /** Output callback */
  onEmit: (text: IChunkItem["text"], meta?: IChunkItem["meta"]) => void;
  /** Start callback (from idle to running) */
  onStart?: () => void;
  /** Stop callback（Return from running to idle） */
  onStop?: () => void;
  /** Paused callback */
  onPausedStop?: () => void;
};

type IRequired = Required<
  Pick<
    ITypewriterOptions,
    "isImmediate" | "charDelayMs" | "punctuationDelayMs" | "preferPunctuationBoundary" | "maxChunkSize" | "onEmit"
  >
>;

type IOmit = Omit<
  ITypewriterOptions,
  "isImmediate" | "charDelayMs" | "punctuationDelayMs" | "preferPunctuationBoundary" | "maxChunkSize" | "onEmit"
>;

const expandConfig = (options: ITypewriterOptions) => {
  const ops = options || {};
  const defaults = {
    charDelayMs: 18,
    punctuationDelayMs: 120,
    preferPunctuationBoundary: true,
    isImmediate: true,
    maxChunkSize: 1
  } as any;
  return Object.assign(defaults, ops);
};

/**
 * @name Typewriter
 */
export class Typewriter implements ITypewriterController {
  private queue: IChunkItem[] = [];
  private baseDelay: number;
  /**Pause status flag */
  private paused: boolean;
  private pauseAfterCurrentPending: boolean = false;
  /** Timer reference */
  private timer: any = null;
  private punctuationRe = /[，。！？；、,.!?;:]/;
  private options: IOmit & IRequired;

  constructor(options: ITypewriterOptions) {
    this.options = expandConfig(options);
    this.baseDelay = Math.max(0, this.options.charDelayMs as number);
    // If not executed immediately, it defaults to a paused state
    this.paused = this.options.isImmediate ? false : true;
  }

  /**
   * @name schedule
   * @param nextDelay Delay time (milliseconds)
   */
  private schedule(nextDelay: number) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.tick(), Math.max(0, nextDelay));
  }

  /**
   * @name Calculate the delay time of characters
   * @param ch string
   * @returns Delay time (milliseconds)
   */
  private computeDelayForChar(ch: string): number {
    if (!ch) return this.baseDelay;
    return this.punctuationRe.test(ch) ? this.baseDelay + (this.options.punctuationDelayMs as number) : this.baseDelay;
  }

  private takeNextChunk(): { out: string; meta: IChunkItem["meta"]; finished: boolean } | null {
    // Clean up the leading empty items. If the text in the array is empty, remove it
    while (this.queue.length && !this.queue[0].text) {
      this.queue.shift();
    }
    if (!this.queue.length) return null;

    const head = this.queue[0];
    const { meta } = head;

    // If the maximum block size is 1 or smaller, process word by word
    if (this.options.maxChunkSize <= 1) {
      const out = head.text[0];
      // Assign the new remaining text to the text attribute of the array element,
      // which facilitates the resumption of printing after pausing
      head.text = head.text.slice(1);
      const finished = !head.text;
      if (finished) this.queue.shift();
      return { out, meta, finished };
    }

    const sliceLen = Math.min(this.options.maxChunkSize, head.text.length);
    let cut = sliceLen;

    if (this.options.preferPunctuationBoundary) {
      const curText = head.text.slice(0, sliceLen);
      const candidates = ["，", "。", "！", "？", "；", "、", ",", ".", "!", "?", ";", ":"];
      let idx = -1;
      for (let i = 0; i < candidates.length; i++) {
        // Find the position of the last punctuation mark
        const p = curText.lastIndexOf(candidates[i]);
        if (p > idx) idx = p;
      }
      if (idx > 0) cut = idx + 1;
    }

    const out = head.text.slice(0, cut);
    head.text = head.text.slice(cut);

    const finished = !head.text;
    if (finished) this.queue.shift();

    return { out, meta, finished };
  }

  private tick() {
    if (this.paused && !this.pauseAfterCurrentPending) return;
    const next = this.takeNextChunk();
    // no next ?? exit
    if (!next) {
      clearTimeout(this.timer);
      this.timer = null;
      try {
        this.options.onStop && this.options.onStop();
        this.options.onPausedStop && this.options.onPausedStop();
      } catch (_) {
        // noop
      }
      return;
    }

    const { out, meta, finished } = next;

    let shouldPauseAfterCurrent = false;
    try {
      this.options.onEmit(out, meta);
    } finally {
      shouldPauseAfterCurrent = this.pauseAfterCurrentPending && finished;
      if (!shouldPauseAfterCurrent) {
        const delay = this.options.maxChunkSize <= 1 ? this.computeDelayForChar(out) : this.baseDelay;
        this.schedule(delay);
      }
    }

    if (shouldPauseAfterCurrent) {
      this.pauseAfterCurrentPending = false;
      this.paused = true;
      clearTimeout(this.timer);
      this.timer = null;
      try {
        this.options.onStop && this.options.onStop();
        this.options.onPausedStop && this.options.onPausedStop();
      } catch (_) {
        // noop
      }
    }
  }

  private ensureRunning() {
    // If there is no pause, no timer, and the queue is not empty, start running
    if (!this.paused && !this.timer && this.queue.length) {
      try {
        this.options.onStart && this.options.onStart();
      } catch (_) {
        // noop
      }
      this.schedule(this.baseDelay);
    }
  }

  public push(text: string, meta?: IChunkItem["meta"]) {
    if (!text) return;
    this.queue.push({ text, meta: meta || null });
    if (this.options.isImmediate) {
      this.ensureRunning();
    }
  }

  public pause() {
    this.paused = true;
    this.pauseAfterCurrentPending = false;
    clearTimeout(this.timer);
    this.timer = null;
  }

  public restore() {
    if (!this.paused) return;
    this.paused = false;
    this.pauseAfterCurrentPending = false;
    this.ensureRunning();
  }

  public cancel() {
    this.paused = false;
    this.pauseAfterCurrentPending = false;
    this.queue = [];
    clearTimeout(this.timer);
    this.timer = null;
    try {
      this.options.onStop && this.options.onStop();
    } catch (_) {
      // noop
    }
  }

  public setSpeed(ms: number) {
    this.baseDelay = Math.max(0, Number(ms) || 0);
  }

  public pauseAfterSegment() {
    if (!this.queue.length) {
      this.pause();
      return;
    }
    this.pauseAfterCurrentPending = true;
  }

  public flush() {
    clearTimeout(this.timer);
    this.timer = null;
    this.paused = false;
    const hadQueue = this.queue.length > 0;
    if (hadQueue) {
      try {
        this.options.onStart && this.options.onStart();
      } catch (_) {
        // noop
      }
    }
    while (this.queue.length) {
      const item = this.takeNextChunk();
      if (!item) break;
      this.options.onEmit(item.out, item.meta);
    }
    try {
      this.options.onStop && this.options.onStop();
    } catch (_) {
      // noop
    }
  }

  public isRunning(): boolean {
    return !this.paused && (this.timer != null || this.queue.length > 0);
  }
}

/**
 * @demo
 *
 * 打字器实例
    const controller = new Typewriter({
      charDelayMs: 18,
      punctuationDelayMs: 120,
      preferPunctuationBoundary: true,
      maxChunkSize: 1,
      onEmit: (out: string, meta?: any) => {
       // appendContent(out, meta)
      },
      onStop: () => {
        console.log('typewriter--on-stop')
      },
      onStart: () => {
        console.log('typewriter--on-start')
      },
      onPausedStop: () => {
      },
    })
 */
